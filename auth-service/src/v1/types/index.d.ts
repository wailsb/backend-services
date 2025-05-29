// src/v1/types/index.d.ts
import { Request } from "express";
import { UserAttributes } from "../models/user.model";


// JWT payload includes user id, email, and role
export interface MyJwtPayload  {
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


export interface RequestWithUser extends Request {
  user?: UserAttributes | null; // user can be null if not authenticated
}
