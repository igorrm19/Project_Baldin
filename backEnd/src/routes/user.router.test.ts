import request from 'supertest';
import express from 'express';
import router from './user.router.js';
import mongoose from 'mongoose';

// Mock controllers
jest.mock('../controller/user.controller.js', () => ({
    getUsers: jest.fn((_req: express.Request, res: express.Response) => res.status(200).send()),
    getUserById: jest.fn((_req: express.Request, res: express.Response) => res.status(200).send()),
    createUser: jest.fn((_req: express.Request, res: express.Response) => res.status(201).send()),
    updateUser: jest.fn((_req: express.Request, res: express.Response) => res.status(200).send()),
    deleteUser: jest.fn((_req: express.Request, res: express.Response) => res.status(200).send()),
    login: jest.fn((_req: express.Request, res: express.Response) => res.status(200).send()),
    getCurrentUser: jest.fn((_req: express.Request, res: express.Response) => res.status(200).send()),
}));

// Mock middlewares to just pass through
jest.mock('../middleware/auth.js', () => jest.fn((_req: express.Request, _res: express.Response, next: express.NextFunction) => next()));
jest.mock('../middleware/isAdmin.js', () => jest.fn((_req: express.Request, _res: express.Response, next: express.NextFunction) => next()));
jest.mock('../validity/validityLogin.js', () => jest.fn((_req: express.Request, _res: express.Response, next: express.NextFunction) => next()));
jest.mock('../validity/validityUser.js', () => ({
    validityCreateUser: jest.fn((_req: express.Request, _res: express.Response, next: express.NextFunction) => next()),
    validityUpdateUser: jest.fn((_req: express.Request, _res: express.Response, next: express.NextFunction) => next())
}));

// Create a mock express app to test the router
const app = express();
app.use(express.json());
app.use('/', router);

describe('User Router', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return health status', async () => {
        const response: request.Response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect((response.body as { status: string }).status).toBe('ok');
    });

    it('should return hello world', async () => {
        const response: request.Response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect((response.body as { message: string }).message).toBe('Hello World!');
    });

    it('should return mongo status connected', async () => {
        (mongoose.connections as unknown as { readyState: number }[]) = [{ readyState: 1 }];
        const response: request.Response = await request(app).get('/mongo-status');
        expect(response.status).toBe(200);
        expect((response.body as { connected: boolean }).connected).toBe(true);
    });

    it('should return mongo status disconnected', async () => {
        (mongoose.connections as unknown as { readyState: number }[]) = [{ readyState: 0 }];
        const response: request.Response = await request(app).get('/mongo-status');
        expect(response.status).toBe(200);
        expect((response.body as { connected: boolean }).connected).toBe(false);
    });

    it('should return 405 on PUT /users', async () => {
        const response: request.Response = await request(app).put('/users');
        expect(response.status).toBe(405);
        expect((response.body as { error: string }).error).toBe('Route not allowed, add an id');
    });

    it('should return 405 on DELETE /users', async () => {
        const response: request.Response = await request(app).delete('/users');
        expect(response.status).toBe(405);
        expect((response.body as { error: string }).error).toBe('Route not allowed, add an id');
    });

    it('should return 405 on generic unhandled methods for /users', async () => {
        const response: request.Response = await request(app).patch('/users');
        expect(response.status).toBe(405);
        expect((response.body as { error: string }).error).toBe('Method not allowed on /users collection');
    });

    // Test the rate limiter for login
    it('should trigger login rate limiter handler when limit exceeded', async () => {
        // We hit the endpoint 101 times to trigger the custom rate limit handler
        let response: request.Response | undefined;
        for (let i = 0; i < 101; i++) {
            response = await request(app).post('/login');
        }
        expect(response!.status).toBe(429);
        expect((response!.body as { error: string }).error).toBe('Too many login attempts, please try again later.');
    });
});
