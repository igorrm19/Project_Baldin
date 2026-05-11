import express, { type Request, type Response, type NextFunction } from 'express';
import morgan from 'morgan';
import router from './src/routes/user.router.js';
import connectDB from './src/config/DBconfig.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Global MongoDB Connection Middleware for Vercel
app.use(async (_req: Request, _res: Response, next: NextFunction) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
});

app.use(['/', '/api'], router);

// Global 404 Handler (Always return JSON)
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
});

// Global Error Handler (Always return JSON)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Global Error Handler:", err);
    res.status(500).json({ 
        error: "Internal server error", 
        message: process.env['NODE_ENV'] !== 'production' ? err.message : undefined 
    });
});

export default app;
