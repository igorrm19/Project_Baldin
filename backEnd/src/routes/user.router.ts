import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, login } from '../controller/user.contrller.js';
import validateLogin from '../middlware/validateLogin..js';
import { userSchema } from '../middlware/validateUser.js';
import auth from '../middlware/auth.js';
import isAdmin from '../middlware/isAdmim.js';

const router = express.Router();

router.get(['/', '/api'], (req, res) => {
    res.send('Hello World!');
    req.accepts('json') ? res.json({ message: 'Hello World!' }) : res.send('Hello World!');
});

router.get('/users', getUsers);
router.get('/users/:id', auth, getUserById);
router.post('/users', userSchema, createUser);
router.put('/users/:id', userSchema, updateUser);
router.delete('/users/:id', auth, isAdmin, deleteUser);
router.post('/login', validateLogin, login);

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






























