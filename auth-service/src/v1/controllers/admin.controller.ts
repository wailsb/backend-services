/*
POST	/auth/admin-login	Login for an admin
*/
import { Request, Response } from 'express';
import { AdminUser } from '../types';
export const adminLogin = (req: Request, res: Response) => {
  // Logic to login an admin
  const { username, password } = req.body ;

  res.status(200).send('Admin logged in successfully');
};