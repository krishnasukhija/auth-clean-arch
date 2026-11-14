import { userValidationSchema } from "../utils/validationSchema";
import { Middleware } from "../utils/general.types";

// import type { Request, Response, NextFunction } from "express";

const userValidationMiddleware: Middleware = (req, res, next) => {
    const { user } = req.body;
    const { error, value } = userValidationSchema.validate(user);
    // console.dir(error, { showHidden: true });
    if (error) {
        const errMessage = (error.details?.map((err: any) => err.message).join(','));
        return res.status(400).json({
            message: 'error',
            errMessage
        });
    }
    else if (value) {
        return next();
    }
}

export default userValidationMiddleware;
