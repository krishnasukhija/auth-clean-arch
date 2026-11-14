"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/database.ts
const sequelize_1 = require("sequelize");
// import dotenv from 'dotenv';
// dotenv.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false,
});
exports.default = sequelize;
