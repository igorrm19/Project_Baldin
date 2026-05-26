import validateLogin from './validityLogin.js';
import type { Request, Response, NextFunction } from 'express';

describe('validityLogin middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    it('should call next if payload is valid', () => {
        req.body = { email: 'test@test.com', password: 'password123' };
        validateLogin(req as Request, res as Response, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 400 if payload is invalid', () => {
        req.body = { email: 'invalid', password: 'short' };
        validateLogin(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Login data is invalid',
            errors: expect.any(Array) as unknown
        }));
        expect(next).not.toHaveBeenCalled();
    });
});
