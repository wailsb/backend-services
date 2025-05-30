/*
POST	/auth/admin-login	Login for an admin
*/
import { Request, Response } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { MyJwtPayload } from '../types';
import { generateAccessToken } from '../utils/jwt';
import * as Service from '../services/auth.service';
export const adminLogin = async (req: Request, res: Response) => {
  // Logic to login an admin
  const { email, password } = req.body ;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const user = await Service.getUserByEmail(email);
  if (!user || !(await Service.ValidateUserData(email, password))) {
    return res.status(401).send('Invalid email or password');
  }
  if (user.role !== 'admin') {
    return res.status(403).send('Access denied: Admins only');
  }
  const payload: MyJwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };
  const token = generateAccessToken(payload);
  res.status(200).json({ token });
};