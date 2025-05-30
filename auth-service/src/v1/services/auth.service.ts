import { User } from "../models/user.model";
import { RefreshToken} from "../models/refreshToken.model";
import { CreationAttributes, WhereOptions } from "sequelize";
import {verifyJwtToken} from "../utils/jwt";
import { MyJwtPayload } from "../types";
const bcrypt = require('bcryptjs');
async function verifyToken(token: string): Promise<User | null> {
  try {
    const decoded: MyJwtPayload | null = await verifyJwtToken(token);  // explicitly typed
    if (!decoded) return null;

    const user = await User.findOne({
      where: { id: decoded.userId, email: decoded.email },
      attributes: { exclude: ['password'] }
    });
    return user ?? null;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
async function getUserById(userId: string): Promise<User[] | null> {
    const users = await User.findAll({
        where: { id: userId },
    });
    return users.length > 0 ? users : null;
}
async function getUserByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({
        where: { email },
    });
    return user ? user : null;
}
async function createUser(userData: CreationAttributes<User>): Promise<number> {
  try {
    await User.create(userData);
    return 0;
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      return 1;
    }
    return 2;
  }
}
async function ValidateUserData(email: string,password: string): Promise<number> {
    try {
        if (!email || !password) {
            return 1; // Missing fields
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser && await bcrypt.compare(password, existingUser.passwordHash)) {
            return 0; // Valid
        }
    } catch (error) {
        console.error("Error validating user data:", error);
        return 2; // Error
    }
    return 3; // Error
}
async function updateUser(userId: string, userData: Partial<CreationAttributes<User>>): Promise<number> {
    try {
        const [updatedRows] = await User.update(userData, {
            where: { id: userId },
        });
        return updatedRows > 0 ? 0 : 1;
    } catch (error) {
        return 2;
    }
}
async function deleteUser(userId: string): Promise<number> {
    try {
        const deletedRows = await User.destroy({
            where: { id: userId },
        });
        return deletedRows > 0 ? 0 : 1;
    } catch (error) {
        return 2;
    }
}
async function createRefreshToken(tokenData: CreationAttributes<RefreshToken>): Promise<number> {
    try {
        await RefreshToken.create(tokenData);
        return 0;
    } catch (error: any) {
        if (error.name === 'SequelizeValidationError') {
            return 1;
        }
        return 2;
    }
}
async function getRefreshTokenByUserId(userId: string): Promise<RefreshToken | null> {
    const token = await RefreshToken.findOne({
        where: { userId },
    });
    return token ? token : null;
}
async function deleteRefreshTokenByUserId(userId: string): Promise<number> {
    try {
        const deletedRows = await RefreshToken.destroy({
            where: { userId },
        });
        return deletedRows > 0 ? 0 : 1;
    } catch (error) {
        return 2;
    }
}
async function filterByAnyParams(params: WhereOptions<User>): Promise<User[] | null> {
    const users = await User.findAll({
        where: params,
    });
    return users.length > 0 ? users : null;
}

export {
    verifyToken,
    getUserById,
    ValidateUserData,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    createRefreshToken,
    getRefreshTokenByUserId,
    deleteRefreshTokenByUserId,
    filterByAnyParams
};