import loginSchema from "./login.schelma.js";
import type{ Request, Response, NextFunction } from 'express';

import type{ ZodIssue } from "zod"; 

const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            message: "Login data is invalid",
            
            errors: result.error.issues.map((err: ZodIssue) => ({
                field: err.path[0],
                message: err.message
            }))
        });
        return;
    }

    req.body = result.data;
    next();
};

export default validateLogin;