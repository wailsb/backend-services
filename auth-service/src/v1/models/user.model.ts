// src/v1/models/user.model.ts
import sequelize from '../config/sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

// Define user attributes
export interface UserAttributes {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

// For creation (id is usually generated)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define User model
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public passwordHash!: string;
  public role!: 'admin' | 'user';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Init schema
User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);
