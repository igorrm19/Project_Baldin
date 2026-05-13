/**
 * @jest-environment node
 */
import auth from './auth.js';
import * as jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
    let req: any;
    let res: any;
    let next: jest.Mock;

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
        req.headers.authorization = 'Bearer valid-token';
        (jwt.verify as jest.Mock).mockReturnValue({ id: '123', role: 'user', email: 'test@test.com' });

        auth(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.user).toBeDefined();
        expect(req.user.id).toBe('123');
    });

    it('should return 401 if authorization header is missing', () => {
        auth(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should return 401 if token structure is invalid', () => {
        req.headers.authorization = 'Bearer invalid-token';
        (jwt.verify as jest.Mock).mockReturnValue({ foo: 'bar' }); // missing id/role

        auth(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should return 401 if token is expired or invalid', () => {
        req.headers.authorization = 'Bearer bad-token';
        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error('JsonWebTokenError');
        });

        auth(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should return 500 if JWT_SECRET is missing', () => {
        req.headers.authorization = 'Bearer token';
        delete process.env['JWT_SECRET'];

        auth(req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});
