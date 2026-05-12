import express from 'express';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import { getUsers, getUserById, createUser, updateUser, deleteUser, login } from '../controller/user.controller.js';
import validateLogin from '../validity/validityLogin.js';
import { validityCreateUser, validityUpdateUser } from '../validity/validityUser.js';
import auth from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

const userUpdateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
});

const createUserLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
});

router.get('/health', (_req, res): void => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.get('/', (_req, res): void => {
    res.json({ message: 'Hello World!' });
});

router.get('/mongo-status', (_req, res) => {
    res.json({
        connected: mongoose.connections[0]?.readyState === 1 as unknown,
        state: mongoose.connections[0]?.readyState
    });
});

router.get('/users', userUpdateLimiter, auth, isAdmin, getUsers); //failure 404
router.get('/users/:id', userUpdateLimiter, auth, getUserById);
router.post('/users', validityCreateUser, createUserLimiter, createUser); //successfull
router.put('/users/:id', userUpdateLimiter, validityUpdateUser, auth, isAdmin, updateUser); //failure 500
router.delete('/users/:id', userUpdateLimiter, auth, isAdmin, deleteUser);
router.post('/login', validateLogin, loginLimiter, login); //successfull

router.put("/users", (_req, res) => {
    res.status(405).json({ error: "Route not allowed, add an id" });
});

router.delete("/users", (_req, res) => {
    res.status(405).json({ error: "Route not allowed, add an id" });
});

router.all('/users', (_req, res) => {
    res.status(405).json({ error: "Method not allowed on /users collection" });
});

export default router;






























