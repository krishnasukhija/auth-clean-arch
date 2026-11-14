import { Request, Response, NextFunction, RequestHandler } from "express";
import { Err } from "joi";

export type asyncfunc = (req: Request, res: Response, next: NextFunction) => Promise<any>;


export const asyncErrorHandler = (fn: asyncfunc): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(fn(req, res, next).catch(next));
    }
}
