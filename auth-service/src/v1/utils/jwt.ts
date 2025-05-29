import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { MyJwtPayload  } from '../types';
import { config } from '../config/index';

// Generic function to generate JWT
export function generateJwtToken(
  payload: MyJwtPayload,
  secret: Secret,
  expiresIn: string | number
): string {
  const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };
  return jwt.sign(payload, secret, options);
}

// Function to verify JWT
export async function verifyJwtToken(token: string): Promise<MyJwtPayload | null> {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as MyJwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}


// Specific function to generate access token
export function generateAccessToken(payload: MyJwtPayload): string {
  return generateJwtToken(
    payload,
    config.jwtSecret,
    config.tokenExpiresIn
  );
}

// You can add a refresh token generator as well
export function generateRefreshToken(payload: MyJwtPayload): string {
  return generateJwtToken(
    payload,
    config.jwtSecret,
    config.refreshTokenExpiresIn
  );
}
