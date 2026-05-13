import type { Request, Response } from 'express';
import User from '../model/user.model.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { MESSAGES_USER } from '../constants/user.constants.js';
import { isErrorWithName, isMongoDupError } from '../utils/errorGuards.js';

const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().select('-password');

        if (users.length === 0) {
            console.log(MESSAGES_USER.GET);
            res.status(200).json([]);
            return;
        }

        console.log(MESSAGES_USER.GET);
        res.status(200).json(users);
        return;

    } catch (err) {
        console.error(MESSAGES_USER.ERROR, err);
        res.status(500).json({ error: MESSAGES_USER.ERROR });
    }
}

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params['id']).select('-password');

        if (user == null) {
            console.error(MESSAGES_USER.ERROR);
            res.status(404).json({ error: MESSAGES_USER.ERROR });
            return;
        }

        console.log(MESSAGES_USER.GET);
        res.status(200).json(user);

    } catch (err) {
        console.error(err);

        if (isErrorWithName(err, "CastError")) {
            console.error(MESSAGES_USER.ERROR);
            res.status(400).json({ error: MESSAGES_USER.ERROR });
        }

        console.error(MESSAGES_USER.ERROR);
        res.status(500).json({ error: MESSAGES_USER.ERROR });
    }
}

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body as { name?: string; email?: string; password?: string };

        if (typeof password !== 'string' || typeof name !== 'string' || typeof email !== 'string') {
            res.status(400).json({ error: "Invalid payload" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        const userResponse = await User.findById(savedUser._id)
            .select('-password');

        console.log(MESSAGES_USER.SUCCESS);
        res.status(201).json(userResponse);

    } catch (err) {

        if (isErrorWithName(err, "ValidationError")) {
            console.error(MESSAGES_USER.ERROR);
            res.status(400).json({
                error: MESSAGES_USER.ERROR,
                details: err as unknown as Error
            });
        }

        if (isMongoDupError(err)) {
            console.error(MESSAGES_USER.ERROR);
            res.status(409).json({
                error: MESSAGES_USER.ERROR
            });
        }

        console.error(MESSAGES_USER.ERROR);
        res.status(500).json({ error: MESSAGES_USER.ERROR });
    }
}

const validateUpdatePayload = async (req: Request, res: Response, updateData: Record<string, unknown>): Promise<boolean> => {
    const { name, email, password } = req.body as { name?: unknown; email?: unknown; password?: unknown };

    if (typeof name !== 'undefined') {
        if (typeof name !== 'string' || name.trim() === '') { res.status(400).json({ error: "Invalid name" }); return false; }
        updateData['name'] = name;
    }

    if (typeof email !== 'undefined') {
        if (typeof email !== 'string' || email.trim() === '') { res.status(400).json({ error: "Invalid email" }); return false; }
        updateData['email'] = email;
    }

    if (typeof password !== 'undefined') {
        if (typeof password !== 'string' || password.trim() === '') { res.status(400).json({ error: "Invalid password" }); return false; }
        updateData['password'] = await bcrypt.hash(password, 10);
    }
    return true;
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const updateData: Record<string, unknown> = {};
        const id = req.params['id'];

        if (!(await validateUpdatePayload(req, res, updateData))) return;

        if (typeof id !== 'string' || id.trim() === '') {
            res.status(400).json({ error: "ID not provided" });
            return;
        }

        if (req.params['id'] !== (req as Request & { user?: { id: string } }).user?.id) {
            res.status(403).json({ error: "Access forbidden" });
            return;
        }

        const result = await User.findByIdAndUpdate(
            req.params['id'],
            updateData,
            {
                new: true,
                runValidators: true,
                context: "query",
            }

        ).select('-password');


        if (!result) {
            console.error(MESSAGES_USER.ERROR);
            res.status(404).json({ error: MESSAGES_USER.ERROR });
            return;
        }

        console.log(MESSAGES_USER.UPDATE);
        res.status(200).json(result);

    } catch (err) {

        if (isErrorWithName(err, "ValidationError")) {
            console.error(MESSAGES_USER.ERROR);
            res.status(400).json({
                error: MESSAGES_USER.ERROR,
                // details omitted to avoid any type
            });
            return;
        }

        if (isErrorWithName(err, "CastError")) {
            console.error(MESSAGES_USER.ERROR);
            res.status(400).json({ error: MESSAGES_USER.ERROR });
            return;
        }

        if (isMongoDupError(err)) {
            console.error(MESSAGES_USER.ERROR);
            res.status(409).json({
                error: MESSAGES_USER.ERROR
            });
            return;
        }

        console.error(MESSAGES_USER.ERROR);
        res.status(500).json({ error: MESSAGES_USER.ERROR });
        return;
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await User.findByIdAndDelete(req.params['id']);

        if (!result) {
            console.error(MESSAGES_USER.ERROR);
            res.status(404).json({ error: MESSAGES_USER.ERROR });
        }

        console.log(MESSAGES_USER.DELETE);
        res.status(200).json({ message: MESSAGES_USER.DELETE });

    } catch (err) {
        if (isErrorWithName(err, "CastError")) {
            console.error(MESSAGES_USER.ERROR);
            res.status(400).json({
                error: MESSAGES_USER.ERROR
            });
        }
        console.error(MESSAGES_USER.ERROR);
        res.status(500).json({ error: MESSAGES_USER.ERROR });
    }
}
const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body as { email?: string; password?: string };

        if (typeof email !== 'string' || typeof password !== 'string') {
            res.status(400).json({ error: "Invalid request payload" });
            return;
        }

        const user = await User.findOne({ email: { $eq: email } });

        if (user == null) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
        }

        const secret = process.env['JWT_SECRET'];

        if (typeof secret !== 'string' || secret === '') {
            console.error("ERROR: JWT_SECRET not found in .env");
            res.status(500).json({ error: "Internal server configuration error" });
            return;
        }

        const userRole = (user as unknown as { role?: string }).role; 
        const payload = {
            id: user._id.toString(),
            email: user.email,
            role: userRole
        };

        const token = jwt.sign(payload, secret, { expiresIn: "1h" });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: userRole
            }
        });
        return;

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Error during login process" });
        return;
    }
}

const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as Request & { user?: { id: string } }).user?.id;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            res.status(404).json({ error: MESSAGES_USER.ERROR });
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        console.error("GetCurrentUser Error:", err);
        res.status(500).json({ error: MESSAGES_USER.ERROR });
    }
}

export { getUsers, getUserById, createUser, updateUser, deleteUser, login, getCurrentUser };