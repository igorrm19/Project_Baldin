
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod'; 
import dotenv from 'dotenv';
dotenv.config();

const TokenPayloadSchema = z.object({
  id: z.string(),
  role: z.string(),
  email: z.string().email().optional()
});

interface AuthRequest extends Request { user?: { id: string; role: string; email?: string | undefined } };
const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env['JWT_SECRET'];
    if (typeof secret !== 'string' || secret === '') {
      console.error("JWT_SECRET environment variable is not defined");
      res.status(500).json({ message: "Internal authentication error" });
      return;
    }

    const decodedRaw = jwt.verify(token as string, secret);

    const result = TokenPayloadSchema.safeParse(decodedRaw);

    if (!result.success) {

      console.error("Payload of token invalid:", result.error.format());
      res.status(401).json({ message: "Invalid token structure" });
      return;
    }

    req.user = result.data;
    
    next();

  } catch (err: unknown) {
    console.error("Auth Error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};

export default auth;
