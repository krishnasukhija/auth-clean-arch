"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./infrastructure/database"));
require("reflect-metadata");
const app_1 = require("./app");
const PORT = process.env.PORT || 3000;
database_1.default.sync()
    .then(() => {
    console.log(`Server is running on post ${PORT}`);
})
    .catch((err) => {
    console.error('Unable to connect to the database', err.message);
});
app_1.app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
