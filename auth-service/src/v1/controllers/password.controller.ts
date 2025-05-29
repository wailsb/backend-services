/*
POST	/auth/forgot-password	Send password reset email
POST	/auth/reset-password	Actually reset the password
PUT	/auth/update-password	Change password while logged in
*/
import { Request, Response } from 'express';

export const forgotPassword = (req: Request, res: Response) => {
  // Logic to send password reset email
  res.status(200).send('Password reset email sent');
};
export const resetPassword = (req: Request, res: Response) => {
  // Logic to reset the password
  res.status(200).send('Password has been reset');
};
export const updatePassword = (req: Request, res: Response) => {
  // Logic to update the password while logged in
  res.status(200).send('Password has been updated');
};
export const passwordController = {
  forgotPassword,
  resetPassword,
  updatePassword,
};