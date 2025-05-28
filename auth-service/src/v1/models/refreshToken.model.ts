// src/v1/models/refreshToken.model.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import { User } from './user.model';

export class RefreshToken extends Model {
  public id!: number;
  public userId!: number;
  public token!: string;
  public expiresAt!: Date;
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'refresh_tokens',
    modelName: 'RefreshToken',
  }
);

// Define relation
User.hasMany(RefreshToken, { foreignKey: 'userId' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });
