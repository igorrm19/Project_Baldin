import { z } from "zod";
import type{ Request, Response, NextFunction } from "express";

export const userSchema = z.object({
    name: z.string()
        .min(1, { message: "Name and surname are required" })
        .max(100, { message: "Name and surname are too long" })
        .trim()
        .transform((val: string) => val.toLowerCase()),
    
    email: z.string()
        .trim()
        .toLowerCase()
        .email({ message: "Invalid email address" }),
    
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
});

export const updateUserSchema = userSchema.partial();


export const validityCreateUser = (req: Request, res: Response, next: NextFunction): void => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ errors: result.error.issues });
        return;
    }
    req.body = result.data; 
    next();
};

export const validityUpdateUser = (req: Request, res: Response, next: NextFunction): void => {
    const result = updateUserSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ errors: result.error.issues });
        return;
    }
    req.body = result.data;
    next();
};
