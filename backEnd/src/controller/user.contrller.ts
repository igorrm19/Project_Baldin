import type { Request, Response } from 'express';
import User from '../model/user.model.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { MESSAGES_USER } from '../constants/user.constants.js';


const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password');

        if (users.length === 0) {
            console.log(MESSAGES_USER.GET);
            return res.status(200).json([]);
        }

        console.log(MESSAGES_USER.GET);
        res.status(200).json(users);

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
        if (name) updateData.name = name;
        if (email) updateData.email = email;

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
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

        const user = await User.findOne({ email });

        if (!user) {
            console.error(MESSAGES_USER.ERROR);
            return res.status(401).json({ message: MESSAGES_USER.ERROR });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.error(MESSAGES_USER.ERROR);
            return res.status(401).json({ message: MESSAGES_USER.ERROR });
        }

        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        const secret = process.env['JWT_SECRET'];

        if (!secret) {
            console.error(MESSAGES_USER.ERROR);
            return res.status(500).json({ message: MESSAGES_USER.ERROR });
        }

        const token = jwt.sign(payload, secret, { expiresIn: "1h" });

        console.log(MESSAGES_USER.LOGIN);
        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (err) {
        console.error(MESSAGES_USER.ERROR, err);
        res.status(500).json({ message: MESSAGES_USER.ERROR });
    }
}

export { getUsers, getUserById, createUser, updateUser, deleteUser, login };