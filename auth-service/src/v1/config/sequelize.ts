// src/v1/config/sequelize.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' }); // adjust path if needed

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
