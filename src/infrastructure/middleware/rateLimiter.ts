import { NextFunction, Request, Response } from "express";

import redisClient from "../config/redis";

export interface RateLimiterRule {
    endpoint: string;
    rate_limit: {
        time: number;
        limit: number;
    }
};



export const rateLimiter = (rule: RateLimiterRule) => {

    const { endpoint, rate_limit } = rule;
    return async (request: Request, response: Response, next: NextFunction) => {

        const ipAddress = request.ip;
        const redisId = `${endpoint}/${ipAddress}`;

        const requests = await redisClient?.incr(redisId);

        if (requests === 1) {
            await redisClient?.expire(redisId, rate_limit.time);
        }

        if (requests && requests > rate_limit.limit) {
            return response.status(429).send({
                message: "to much request"
            });
        }
        next();
    };
};