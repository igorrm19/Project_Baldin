import type{ Request, Response, NextFunction } from 'express';

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if ((req as Request & { user?: { role?: string } }).user?.role !== "admin") {
        res.status(403).json({ error: "Access forbidden" });
        return;
    }
    next();
};

export default isAdmin;