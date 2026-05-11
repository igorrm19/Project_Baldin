import type { Request, Response, NextFunction } from 'express';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!(req as Request & { user: { role: string } }).user || (req as Request & { user: { role: string } }).user.role !== "admin") {
        return res.status(403).json({ message: "Access forbidden" });
    }
    next();
};

export default isAdmin;