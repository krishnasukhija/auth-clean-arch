// src/index.ts
import dotenv from "dotenv";
dotenv.config();

import envVarValidator from "./infrastructure/utils/envVarValidator";

envVarValidator();

import sequelize from './infrastructure/config/database'

import "reflect-metadata";
import { app } from "./app";


const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error('Unable to connect to the database', err.message);
    }
  }
})()

// sequelize.sync()
//   .then(() => {
//     console.log(`Server is running on post ${PORT}`);
//     app.listen(PORT, () => {
//       console.log(`🚀 Server listening on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err: Error) => {
//     console.error('Unable to connect to the database', err.message);
//   });


