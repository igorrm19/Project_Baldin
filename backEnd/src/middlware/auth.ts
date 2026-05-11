import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env['JWT_SECRET'] as string;

    if (!secret) {
      console.error("JWT_SECRET environment variable is not defined");
      return res.status(500).json({ message: "Internal authentication error" });
    }

    const decoded = jwt.verify(token as string, secret as string) as unknown as { id: string; role: string };
    (req as Request & { user: { id: string; role: string } }).user = decoded;
    next();

  } catch (err: unknown) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;