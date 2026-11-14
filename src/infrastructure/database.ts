import 'dotenv/config';

// src/infrastructure/database.ts
import { Sequelize } from 'sequelize';
import type { Dialect } from 'sequelize';

// console.log(process.env.DB_USER);

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  String(process.env.DB_PASSWORD)!,
  {
    host: process.env.DB_HOST!,
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT || '5432', 10)!,
    logging: false,
  }
);

export default sequelize;
