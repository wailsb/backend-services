import * as Services from '../services/auth.service';
import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../types';
import { MyJwtPayload } from '../types';
export const authenticate = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const user = await Services.verifyToken(token);
    if (!user) return res.status(401).json({ message: 'Invalid token' });

    req.user = user;  // <-- assign user model instance, not JWT payload
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};
