// src/v1/types/index.d.ts

// Base User fields (shared)
export interface BaseUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Admin user extends BaseUser
export interface AdminUser extends BaseUser {
  role: "admin"; // fixed admin role
  // You can add admin-specific fields here if needed
}

// Normal user extends BaseUser
export interface NormalUser extends BaseUser {
  role: "user";  // fixed normal user role
  // You can add user-specific fields here if needed
}

// Union type for any user
export type User = AdminUser | NormalUser;

// JWT payload includes user id, email, and role
export interface JwtPayload {
  userId: string;
  email: string;
  role: "admin" | "user";
  iat?: number;
  exp?: number;
}

// Payload for registering new user (always normal user)
export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

// Payload for login (same for all users)
export interface LoginInput {
  email: string;
  password: string;
}

// Extend Express Request to add authenticated user info
import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: JwtPayload;
}
