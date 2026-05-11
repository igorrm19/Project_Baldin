import loginSchema from "../validaty/login.schelma.js";
import type { ZodIssue } from "zod";
import type { Request, Response, NextFunction } from 'express';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Login data is invalid",
            errors: result.error.issues.map((err: ZodIssue) => ({
                field: err.path[0],
                message: err.message
            }))
        });
    }

    req.body = result.data;
    next();
};

export default validateLogin;