/*
POST	/auth/forgot-password	Send password reset email
POST	/auth/reset-password	Actually reset the password
PUT	/auth/update-password	Change password while logged in
*/
import { Request, Response } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import * as Service from '../services/auth.service';
import { MyJwtPayload } from '../types';
import { generateAccessToken } from '../utils/jwt';
const bcrypt = require('bcryptjs');
export const forgotPassword = (req: Request, res: Response) => {
  // Logic to send password reset email
  const { email } = req.body;
  if (!email) {
    return res.status(400).send('Email is required');
  }
  

  res.status(200).send('Password reset email sent');
};
export const resetPassword = async (req: Request, res: Response) => {
  // Logic to reset the password
  

  res.status(200).send('Password has been reset');
};
export const updatePassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).send('Email and new password are required');
  }

  try {
    const user = await Service.getUserByEmail(email);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 8);
    const updatedCount = await Service.updateUser(user.id, { passwordHash: hashedPassword });

    if (updatedCount === 0) {
      return res.status(500).send('Error updating password');
    }

    return res.status(200).send('Password has been updated');
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).send('Internal server error');
  }
};

export const passwordController = {
  forgotPassword,
  resetPassword,
  updatePassword,
};