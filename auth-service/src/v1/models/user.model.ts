// src/v1/models/user.model.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

export interface IUserAttributes {
  id?: number;
  username: string;
  email: string;
  passwordHash: string;
  role?: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Model<IUserAttributes> implements IUserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public passwordHash!: string;
  public role!: 'admin' | 'user';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  }
);
