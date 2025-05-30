import { Request, Response } from 'express';
import { generateAccessToken } from '../utils/jwt';
import { RefreshToken } from '../models/refreshToken.model';
import { User } from '../models/user.model';
import { MyJwtPayload,RequestWithUser } from '../types';

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  const existingToken = await RefreshToken.findOne({ where: { token } });

  if (!existingToken) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const user = await User.findByPk(existingToken.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const payload: MyJwtPayload = {
    userId: String(user.id),
    email: user.email,
    role: user.role,
  };

  const newAccessToken = generateAccessToken(payload);

  return res.json({ accessToken: newAccessToken });
};

export const logout = async (req: Request, res: Response) => {
  const { token } = req.body;


  if (!token) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  const deleted = await RefreshToken.destroy({ where: { token } });

  if (!deleted) {
    return res.status(404).json({ message: 'Refresh token not found' });
  }

  return res.json({ message: 'Logged out successfully' });
};

export const getMe = (req: RequestWithUser, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.json({ user });
};

export const checkToken = (req: Request, res: Response) => {
  // This assumes you already have a middleware that verifies token
  return res.status(200).json({ message: 'Token is valid' });
};

// Export all controllers as a single object
export const authController = {
  refreshAccessToken,
  logout,
  getMe,
  checkToken,
};
