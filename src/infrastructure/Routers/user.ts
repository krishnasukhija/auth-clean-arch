import express from 'express';

const router = express.Router({ mergeParams: true });

import userValidationMiddleware from '../middleware/userValidationMiddleware';
import { asyncErrorHandler } from '../utils/catchAsync';
import { container } from '../inversify/container';
import { TYPES } from '../inversify/types';
import { AuthController } from '../../controllers/AuthController';
import { rateLimiter, RateLimiterRule } from '../middleware/rateLimiter';
const authController = container.get<AuthController>(TYPES.AuthController);

const rate_limit = {
    time: 60,
    limit: 3
}

const userLoginRateLimitRule: RateLimiterRule = {
    endpoint: 'userLogin',
    rate_limit
}

const userPostRateLimitRule: RateLimiterRule = {
    endpoint: 'userPost',
    rate_limit
}


router.post("/register", userValidationMiddleware, rateLimiter(userLoginRateLimitRule), asyncErrorHandler(authController.register));
router.post("/login", userValidationMiddleware, rateLimiter(userPostRateLimitRule), asyncErrorHandler(authController.login));

export default router;