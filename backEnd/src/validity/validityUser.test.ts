import { validityCreateUser, validityUpdateUser } from './validityUser.js';
import type { Request, Response, NextFunction } from 'express';

describe('validityUser middlewares', () => {
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

    describe('validityCreateUser', () => {
        it('should call next if payload is valid', () => {
            req.body = { name: 'Test', email: 'test@test.com', password: 'password123' };
            validityCreateUser(req as Request, res as Response, next);
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect((req.body as { name: string }).name).toBe('test');
        });

        it('should return 400 if payload is invalid', () => {
            req.body = { name: '', email: 'invalid', password: 'short' };
            validityCreateUser(req as Request, res as Response, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                errors: expect.any(Array) as unknown
            }));
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('validityUpdateUser', () => {
        it('should call next if payload is valid', () => {
            req.body = { name: 'Test' };
            validityUpdateUser(req as Request, res as Response, next);
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect((req.body as { name: string }).name).toBe('test');
        });

        it('should return 400 if payload is invalid', () => {
            req.body = { email: 'invalid' };
            validityUpdateUser(req as Request, res as Response, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                errors: expect.any(Array) as unknown
            }));
            expect(next).not.toHaveBeenCalled();
        });
    });
});
