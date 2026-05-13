/**
 * @jest-environment node
 */
import type { Request, Response, NextFunction } from 'express';
import isAdmin from './isAdmin.js';

interface AuthRequest extends Request { 
    user?: { id: string; role: string; email?: string } 
}

describe('isAdmin Middleware', () => {
    let req: Partial<AuthRequest>;
    let res: {
        status: jest.Mock;
        json: jest.Mock;
    };
    let next: NextFunction;

    beforeEach(() => {
        req = {
            user: { id: '123', role: 'user' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    it('should call next() if user is admin', () => {
        req.user!.role = 'admin';
        isAdmin(req as unknown as Request, res as unknown as Response, next);
        expect(next).toHaveBeenCalled();
    });

    it('should return 403 if user is not admin', () => {
        req.user!.role = 'user';
        isAdmin(req as unknown as Request, res as unknown as Response, next);
        expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should return 401 if user is not authenticated', () => {
        req.user = undefined as unknown as { id: string; role: string; email?: string };
        isAdmin(req as unknown as Request, res as unknown as Response, next);
        expect(res.status).toHaveBeenCalledWith(403);
    });
});
