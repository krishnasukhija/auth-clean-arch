// src/app.ts
import "reflect-metadata";
import express, { Request, Response, NextFunction, urlencoded, response } from "express";
import { container } from "./infrastructure/inversify/container";
import { AuthController } from "./controllers/AuthController";
import { TYPES } from "./infrastructure/inversify/types";
import userVaidationMiddleware from './infrastructure/middleware/userValidationMiddleware';
import { asyncErrorHandler } from "./infrastructure/utils/catchAsync";
import { RequestHandler } from "express";
import ExpressError from './infrastructure/utils/ExpressError';
import helmet from "helmet";
// import LoginLimiter from "./infrastructure/config/rateLimiter";
import userRouter from './infrastructure/Routers/user';


const app = express();

app.use(helmet());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use('/api/user', userRouter);

// app.use(LoginLimiter);

// Resolve controller from DI container
const authController = container.get<AuthController>(TYPES.AuthController);

// Routes

// app.post("/api/register", userVaidationMiddleware, asyncErrorHandler(authController.register));
// app.post("/api/login", userVaidationMiddleware, asyncErrorHandler(authController.login));

// Simple health check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.all('/*/', (req: Request, res: Response, next: NextFunction) => {
  next(new ExpressError(404, 'Webpage not Found'));
});


// Global error handler (optional)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // console.log('Working')
  const { statusCode = 500, message = "Something went Wrong" } = err;
  // console.error(err);
  res.status(statusCode).json({ message });
});


export { app };
