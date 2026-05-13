/**
 * @jest-environment node
 */
import type { Request, Response } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, login, getCurrentUser } from './user.controller.js';
import User from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MESSAGES_USER } from '../constants/user.constants.js';

jest.mock('../model/user.model.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
    let req: Partial<Request> & { user?: { id: string } };
    let res: {
        status: jest.Mock;
        json: jest.Mock;
    };

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            headers: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    describe('getUsers', () => {
        it('should return 200 and an empty array if no users found', async () => {
            (User.find as jest.Mock).mockReturnValue({
                select: jest.fn().mockResolvedValue([])
            });

            await getUsers(req as unknown as Request, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });

        it('should return 200 and users if found', async () => {
            const mockUsers = [{ name: 'test' }];
            (User.find as jest.Mock).mockReturnValue({
                select: jest.fn().mockResolvedValue(mockUsers)
            });

            await getUsers(req as unknown as Request, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });

        it('should return 500 on error', async () => {
            (User.find as jest.Mock).mockReturnValue({
                select: jest.fn().mockRejectedValue(new Error('DB Error'))
            });

            await getUsers(req as unknown as Request, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: MESSAGES_USER.ERROR });
        });
    });

    describe('getUserById', () => {
        it('should return 200 and user if found', async () => {
            req.params!['id'] = '123';
            const mockUser = { name: 'test' };
            (User.findById as jest.Mock).mockReturnValue({
                select: jest.fn().mockResolvedValue(mockUser)
            });

            await getUserById(req as unknown as Request, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 if user not found', async () => {
            req.params!['id'] = '123';
            (User.findById as jest.Mock).mockReturnValue({
                select: jest.fn().mockResolvedValue(null)
            });

            await getUserById(req as unknown as Request, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: MESSAGES_USER.ERROR });
        });

        it('should return 400 on CastError', async () => {
            req.params!['id'] = 'invalid';
            const error = new Error('CastError');
            error.name = 'CastError';
            (User.findById as jest.Mock).mockReturnValue({
                select: jest.fn().mockRejectedValue(error)
            });

            await getUserById(req as unknown as Request, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

    describe('createUser', () => {
        it('should create a user and return 201', async () => {
            req.body = { name: 'test', email: 'test@test.com', password: 'password' };
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
            const mockSavedUser = { _id: '123' };
            jest.spyOn(User.prototype, 'save').mockResolvedValue(mockSavedUser);
            (User.findById as jest.Mock).mockReturnValue({
                select: jest.fn().mockResolvedValue({ name: 'test', email: 'test@test.com' })
            });

            await createUser(req as unknown as Request, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(201);
        });

        it('should return 400 if invalid payload', async () => {
            req.body = { name: 'test' }; // missing email/password
            await createUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should return 400 on ValidationError', async () => {
            req.body = { name: 'test', email: 'test@test.com', password: 'password' };
            const error = new Error('ValidationError');
            error.name = 'ValidationError';
            (bcrypt.hash as jest.Mock).mockResolvedValue('hash');
            jest.spyOn(User.prototype, 'save').mockRejectedValue(error);

            await createUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

    describe('getCurrentUser', () => {
        it('should return 200 and current user', async () => {
            req.user = { id: '123' };
            const mockUser = { name: 'Igor', email: 'igor@test.com' };
            (User.findById as jest.Mock).mockReturnValue({
                select: jest.fn().mockResolvedValue(mockUser)
            });

            await getCurrentUser(req as unknown as Request, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 401 if no user in req', async () => {
            await getCurrentUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(401);
        });

        it('should return 404 if user not in DB', async () => {
            req.user = { id: '123' };
            (User.findById as jest.Mock).mockReturnValue({
                select: jest.fn().mockResolvedValue(null)
            });

            await getCurrentUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(404);
        });

        it('should return 500 on DB error', async () => {
            req.user = { id: '123' };
            (User.findById as jest.Mock).mockReturnValue({
                select: jest.fn().mockRejectedValue(new Error('Fatal'))
            });

            await getCurrentUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    describe('login', () => {
        it('should return 200 and token on success', async () => {
            req.body = { email: 'test@test.com', password: 'password' };
            const mockUser = { _id: '123', email: 'test@test.com', password: 'hashed', name: 'test' };
            (User.findOne as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            process.env['JWT_SECRET'] = 'secret';
            (jwt.sign as jest.Mock).mockReturnValue('mockToken');

            await login(req as unknown as Request, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                token: 'mockToken',
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                user: expect.objectContaining({ name: 'test' })
            });
        });

        it('should return 401 if user not found', async () => {
            req.body = { email: 'wrong@test.com', password: 'password' };
            (User.findOne as jest.Mock).mockResolvedValue(null);

            await login(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(401);
        });

        it('should return 401 if password invalid', async () => {
            req.body = { email: 'test@test.com', password: 'wrong' };
            (User.findOne as jest.Mock).mockResolvedValue({ password: 'hash' });
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await login(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(401);
        });

        it('should return 400 if invalid request payload', async () => {
            req.body = { email: 'test@test.com' }; // missing password
            await login(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should return 500 if JWT_SECRET is missing', async () => {
            req.body = { email: 'test@test.com', password: 'password' };
            (User.findOne as jest.Mock).mockResolvedValue({ password: 'hash' });
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            const oldSecret = process.env['JWT_SECRET'];
            delete process.env['JWT_SECRET'];

            await login(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(500);
            process.env['JWT_SECRET'] = oldSecret;
        });

        it('should return 500 on unexpected error', async () => {
            req.body = { email: 'test@test.com', password: 'password' };
            (User.findOne as jest.Mock).mockRejectedValue(new Error('Fatal'));

            await login(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    describe('updateUser', () => {
        it('should update user and return 200', async () => {
            req.params!['id'] = '123';
            req.body = { name: 'updated', email: 'u@u.com', password: 'newpassword123' };
            req.user = { id: '123' };
            (bcrypt.hash as jest.Mock).mockResolvedValue('newHash');
            (User.findByIdAndUpdate as jest.Mock).mockReturnValue({
                select: jest.fn().mockResolvedValue({ name: 'updated' })
            });

            await updateUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should return 400 if ID is missing or invalid', async () => {
            req.params!['id'] = ' ';
            await updateUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should return 403 if updating different user', async () => {
            req.params!['id'] = '123';
            req.user = { id: '456' };
            await updateUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(403);
        });

        it('should return 404 if user not found', async () => {
            req.params!['id'] = '123';
            req.user = { id: '123' };
            (User.findByIdAndUpdate as jest.Mock).mockReturnValue({
                select: jest.fn().mockResolvedValue(null)
            });
            await updateUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(404);
        });

        it('should return 400 on ValidationError', async () => {
            req.params!['id'] = '123';
            req.user = { id: '123' };
            const error = new Error('ValidationError');
            error.name = 'ValidationError';
            (User.findByIdAndUpdate as jest.Mock).mockReturnValue({
                select: jest.fn().mockRejectedValue(error)
            });
            await updateUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should return 409 on MongoDupError', async () => {
            req.params!['id'] = '123';
            req.user = { id: '123' };
            const error = new Error('Duplicate');
            (error as Error & { code?: number }).code = 11000;
            (User.findByIdAndUpdate as jest.Mock).mockReturnValue({
                select: jest.fn().mockRejectedValue(error)
            });
            await updateUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(409);
        });

        it('should return 400 on CastError', async () => {
            req.params!['id'] = '123';
            req.user = { id: '123' };
            const error = new Error('CastError');
            error.name = 'CastError';
            (User.findByIdAndUpdate as jest.Mock).mockReturnValue({
                select: jest.fn().mockRejectedValue(error)
            });
            await updateUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

    describe('deleteUser', () => {
        it('should delete user and return 200', async () => {
            req.params!['id'] = '123';
            (User.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: '123' });

            await deleteUser(req as unknown as Request, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            expect(res.json).toHaveBeenCalledWith({ message: expect.any(String) });
        });

        it('should return 400 on CastError', async () => {
            req.params!['id'] = 'invalid';
            const error = new Error('CastError');
            error.name = 'CastError';
            (User.findByIdAndDelete as jest.Mock).mockRejectedValue(error);

            await deleteUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should return 500 on unexpected error', async () => {
            req.params!['id'] = '123';
            (User.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Fatal'));

            await deleteUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    describe('updateUser - unexpected error', () => {
        it('should return 500 on unexpected error', async () => {
            req.params!['id'] = '123';
            req.user = { id: '123' };
            (User.findByIdAndUpdate as jest.Mock).mockReturnValue({
                select: jest.fn().mockRejectedValue(new Error('Fatal'))
            });

            await updateUser(req as unknown as Request, res as unknown as Response);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
});
