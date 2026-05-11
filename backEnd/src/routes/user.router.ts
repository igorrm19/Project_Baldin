import express from 'express';
import rateLimit from 'express-rate-limit';
import { getUsers, getUserById, createUser, updateUser, deleteUser, login } from '../controller/user.contrller.js';
import validateLogin from '../middlware/validateLogin.js';
import  { validateCreateUser, validateUpdateUser } from '../middlware/validateUser.js';
import auth from '../middlware/auth.js';
import isAdmin from '../middlware/isAdmim.js';

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

router.get(['/', '/api'], (req, res) => {
    res.send('Hello World!');
    req.accepts('json') ? res.json({ message: 'Hello World!' }) : res.send('Hello World!');
});

router.get('/users', userUpdateLimiter, getUsers);
router.get('/users/:id', auth, userUpdateLimiter, getUserById);
router.post('/users', validateCreateUser, createUserLimiter, createUser);
router.put('/users/:id', userUpdateLimiter, validateUpdateUser, auth, isAdmin, updateUser);
router.delete('/users/:id', auth, isAdmin, deleteUser);
router.post('/login', validateLogin, loginLimiter, login);

router.put("/users", (req, res) => {
    res.json({ message: "Route not allowed, add an id" });
    req.accepts('json') ? res.json({ message: "Route not allowed, add an id" }) : res.send('Route not allowed, add an id');
});
router.delete("/users", (req, res) => {
    res.json({ message: "Route not allowed, add an id" });
    req.accepts('json') ? res.json({ message: "Route not allowed, add an id" }) : res.send('Route not allowed, add an id');
});

router.all('/users', (req, res) => {
    res.json({ message: "Route not allowed, add an id" });
    req.accepts('json') ? res.json({ message: "Route not allowed, add an id" }) : res.send('Route not allowed, add an id');
});

export default router;






























