import dotenv from 'dotenv';

dotenv.config({path:".env"}); // Load variables from .env
// Appconfig interface
export interface AppConfig {
  port: number;
  env: string;
  databaseUrl: string;
  jwtSecret: string;
  refreshTokenSecret: string;
  tokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

// Validate required env vars and export app config
export const config: AppConfig = {
  port: Number(process.env.PORT) || 5000,
  env: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || '',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
  tokenExpiresIn: process.env.TOKEN_EXPIRES_IN || '15m',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
};