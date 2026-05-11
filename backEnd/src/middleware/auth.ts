
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

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env['JWT_SECRET'];
    if (!secret) {
      console.error("JWT_SECRET environment variable is not defined");
      return res.status(500).json({ message: "Internal authentication error" });
    }

    const decodedRaw = jwt.verify(token as string, secret);

    const result = TokenPayloadSchema.safeParse(decodedRaw);

    if (!result.success) {

      console.error("Payload of token invalid:", result.error.format());
      return res.status(401).json({ message: "Invalid token structure" });
    }

    (req as any).user = result.data;
    
    next();

  } catch (err: unknown) {
    console.error("Auth Error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default auth;
