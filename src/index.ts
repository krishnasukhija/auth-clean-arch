// src/index.ts
import dotenv from "dotenv";

dotenv.config();

import sequelize from './infrastructure/database'

import "reflect-metadata";
import { app } from "./app";



const PORT = process.env.PORT || 3000;


sequelize.sync()
  .then(() => {
    console.log(`Server is running on post ${PORT}`)
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database', err.message);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
