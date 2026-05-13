/**
 * @jest-environment node
 */
import type { Request, Response, NextFunction } from 'express';
import auth from './auth.js';
import * as jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

interface AuthRequest extends Request {
    user?: { id: string; role: string; email: string };
}

describe('Auth Middleware', () => {
    let req: Partial<AuthRequest>;
    let res: {
        status: jest.Mock;
        json: jest.Mock;
    };
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
        jest.clearAllMocks();
        process.env['JWT_SECRET'] = 'test-secret';
    });

    it('should call next() if token is valid', () => {
        req.headers = { authorization: 'Bearer valid-token' };
        (jwt.verify as jest.Mock).mockReturnValue({ id: '123', role: 'user', email: 'test@test.com' });

        auth(req as unknown as AuthRequest, res as unknown as Response, next);

        expect(next).toHaveBeenCalled();
        expect(req.user).toBeDefined();
        expect(req.user!.id).toBe('123');
    });

    it('should return 401 if authorization header is missing', () => {
        auth(req as unknown as AuthRequest, res as unknown as Response, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should return 401 if token structure is invalid', () => {
        req.headers = { authorization: 'Bearer invalid-token' };
        (jwt.verify as jest.Mock).mockReturnValue({ foo: 'bar' }); // missing id/role

        auth(req as unknown as AuthRequest, res as unknown as Response, next);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should return 401 if token is expired or invalid', () => {
        req.headers = { authorization: 'Bearer bad-token' };
        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error('JsonWebTokenError');
        });

        auth(req as unknown as AuthRequest, res as unknown as Response, next);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should return 500 if JWT_SECRET is missing', () => {
        req.headers = { authorization: 'Bearer token' };
        delete process.env['JWT_SECRET'];

        auth(req as unknown as AuthRequest, res as unknown as Response, next);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});
