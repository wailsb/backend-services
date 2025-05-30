/*
POST	/auth/signup	Register a new normal user
POST	/auth/login	Login for a normal user

GET	/auth/users	Admin: list users (maybe paginated)
PATCH	/auth/users/:id/role	Admin: update user role (e.g. promote)
DELETE	/auth/users/:id	Admin: delete user account
*/
import { Request, Response } from 'express';
import * as Service from '../services/auth.service'; 
import { User } from '../models/user.model'; 

import { authenticate, authorize } from '../middlewares/auth.middleware';
const bcrypt = require('bcryptjs');
export const signup = async (req: Request, res: Response) => {
  // Logic to register a new user
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send('Username, email, and password are required');
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = await User.create({
    username,
    email,
    passwordHash: hashedPassword,
    role: 'user' // Default role for normal users
  });
  if (!newUser) {
    return res.status(500).send('Error creating user');
  }
  res.status(201).send('User registered successfully');
};
export const login = async (req: Request, res: Response) => {
  // Logic to login a user
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).send('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).send('Invalid password');
  }

  res.status(200).send('User logged in successfully');
};
export const listUsers = async (req: Request, res: Response) => {
  // Logic to list users (admin only)
  const users = await User.findAll();
  if (!users) {
    return res.status(500).send('Error retrieving users');
  }

  res.status(200).send({
    users: users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }))
  });
};
export const updateUserRole = async (req: Request, res: Response) => {
  // Logic to update user role (admin only)
  const { id } = req.params;
  const { role } = req.body;

  if (!id || !role) {
    return res.status(400).send('User ID and role are required');
  }

  try {
    const user = await Service.getUserById(id) as User;
    if (!user) {
      return res.status(404).send('User not found');
    }

    const updatedUser = await user.update({ role: role });
    if (!updatedUser) {
      return res.status(500).send('Error updating user role');
    }

    return res.status(200).send('User role updated successfully');
  } catch (error) {
    console.error('Error updating user role:', error);
    return res.status(500).send('Internal server error');
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  // Logic to delete user account (admin only)
  const { id } = req.params;

  if (!id) {
    return res.status(400).send('User ID is required');
  }

  try {
    const user = await Service.getUserById(id) as User;
    if (!user) {
      return res.status(404).send('User not found');
    }

    const deletedUser = await user.destroy();
    
    return res.status(200).send('User account deleted successfully');
  } catch (error) {
    console.error('Error deleting user account:', error);
    return res.status(500).send('Internal server error');
  }
};
export const userController = {
  signup,
  login,
  listUsers,
  updateUserRole,
  deleteUser,
};