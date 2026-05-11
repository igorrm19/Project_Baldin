import type { Request, Response } from 'express';
import User from '../model/user.model.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { MESSAGES_USER } from '../constants/user.constants.js';

const getUsers = async (req: Request, res: Response) =>{
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
        console.error(MESSAGES_USER.ERROR);
        res.status(500).json({ message: MESSAGES_USER.ERROR });
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params['id']).select('-password');

        if (!user) {
            console.error(MESSAGES_USER.ERROR);
            return res.status(404).send({ message: MESSAGES_USER.ERROR });
        }

        console.log(MESSAGES_USER.GET);
        res.status(200).json(user);

    } catch (err) {
        console.error(err);

        if ((err as any).name === "CastError") {
            console.error(MESSAGES_USER.ERROR);
            return res.status(400).json({ message: MESSAGES_USER.ERROR });
        }

        console.error(MESSAGES_USER.ERROR);
        res.status(500).json({ message: MESSAGES_USER.ERROR });
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

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

        if ((err as any).name === "ValidationError") {
            console.error(MESSAGES_USER.ERROR);
            return res.status(400).json({
                message: MESSAGES_USER.ERROR,
                details: err as unknown as Error
            });
        }

        if ((err as any).code === 11000) {
            console.error(MESSAGES_USER.ERROR);
            return res.status(409).json({
                message: MESSAGES_USER.ERROR
            });
        }

        console.error(MESSAGES_USER.ERROR);
        return res.status(500).json({ message: MESSAGES_USER.ERROR });
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const updateData: any = {};
        const id = req.params['id'];

        if (name !== undefined) {
            if (typeof name !== 'string' || name.trim() === '') {
                return res.status(400).json({ message: "Invalid name" });
            }
            updateData.name = name;
        }

        if (email !== undefined) {
            if (typeof email !== 'string' || email.trim() === '') {
                return res.status(400).json({ message: "Invalid email" });
            }
            updateData.email = email;
        }

        if (password !== undefined) {
            if (typeof password !== 'string' || password.trim() === '') {
                return res.status(400).json({ message: "Invalid password" });
            }
            updateData.password = await bcrypt.hash(password, 10);
        }

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: "ID not provided" });
        }

        if (req.params['id'] !== (req as Request & { user: { id: string } }).user.id) {
            return res.status(403).json({ message: "Access forbidden" });
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
            return res.status(404).send({ message: MESSAGES_USER.ERROR });
        }

        console.log(MESSAGES_USER.UPDATE);
        res.status(200).json(result);

    } catch (err) {

        if ((err as any).name === "ValidationError") {
            console.error(MESSAGES_USER.ERROR);
            return res.status(400).json({
                message: MESSAGES_USER.ERROR,
                details: (err as any).errors
            });
        }

        if ((err as any).name === "CastError") {
            console.error(MESSAGES_USER.ERROR);
            return res.status(400).json({ message: MESSAGES_USER.ERROR });
        }

        if ((err as any).code === 11000) {
            console.error(MESSAGES_USER.ERROR);
            return res.status(409).json({
                message: MESSAGES_USER.ERROR
            });
        }

        console.error(MESSAGES_USER.ERROR);
        return res.status(500).json({ message: MESSAGES_USER.ERROR });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await User.findByIdAndDelete(req.params['id']);

        if (!result) {
            console.error(MESSAGES_USER.ERROR);
            return res.status(404).send({ message: MESSAGES_USER.ERROR });
        }

        console.log(MESSAGES_USER.DELETE);
        res.status(200).send(MESSAGES_USER.DELETE);

    } catch (err) {
        if ((err as any).name === "CastError") {
            console.error(MESSAGES_USER.ERROR);
            return res.status(400).json({
                message: MESSAGES_USER.ERROR
            });
        }
        console.error(MESSAGES_USER.ERROR);
        res.status(500).json({ message: MESSAGES_USER.ERROR });
    }
}
const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: "Invalid request payload" });
        }

        // Use .lean() para obter um objeto simples e evitar problemas com o JWT payload
        const user = await User.findOne({ email: { $eq: email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const secret = process.env['JWT_SECRET'];

        if (!secret) {
            console.error("ERRO: JWT_SECRET não encontrada no .env");
            return res.status(500).json({ message: "Internal server configuration error" });
        }

        const payload = {
            id: user._id.toString(),
            email: user.email,
            role: (user as any).role 
        };

        const token = jwt.sign(payload, secret, { expiresIn: "1h" });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: (user as any).role
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Error during login process" });
    }
}


export { getUsers, getUserById, createUser, updateUser, deleteUser, login };