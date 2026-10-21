// src/app.ts
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { container } from "./infrastructure/container";
import { AuthController } from "./controllers/AuthController";
import { TYPES } from "./infrastructure/types";

const app = express();
app.use(express.json());

// Resolve controller from DI container
const authController = container.get<AuthController>(TYPES.AuthController);

// Routes
app.post("/api/register", (req: Request, res: Response) => authController.register(req, res));
app.post("/api/login", (req: Request, res: Response) => authController.login(req, res));

// Simple health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Global error handler (optional)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

export { app };
