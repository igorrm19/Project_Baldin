/**
 * @jest-environment node
 */
import isAdmin from './isAdmin.js';

describe('isAdmin Middleware', () => {
    let req: any;
    let res: any;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            user: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    it('should call next() if user is admin', () => {
        req.user.role = 'admin';
        isAdmin(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it('should return 403 if user is not admin', () => {
        req.user.role = 'user';
        isAdmin(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
    });

    it('should return 401 if user is not authenticated', () => {
        req.user = undefined;
        isAdmin(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
    });
});
