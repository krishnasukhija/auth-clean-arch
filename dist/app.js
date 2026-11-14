"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// src/app.ts
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const container_1 = require("./infrastructure/container");
const types_1 = require("./infrastructure/types");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
// Resolve controller from DI container
const authController = container_1.container.get(types_1.TYPES.AuthController);
// Routes
app.post("/api/register", (req, res) => authController.register(req, res));
app.post("/api/login", (req, res) => authController.login(req, res));
// Simple health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});
// Global error handler (optional)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});
