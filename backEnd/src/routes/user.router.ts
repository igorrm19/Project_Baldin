import express from 'express';
import rateLimit from 'express-rate-limit';
import { getUsers, getUserById, createUser, updateUser, deleteUser, login } from '../controller/user.controller.js';
import validateLogin from '../validity/validityLogin.js';
import  { validityCreateUser, validityUpdateUser } from '../validity/validityUser.js';
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

router.get(['/', '/api'], (req, res): void => {

    if (req.accepts('json') !== false) {
        res.json({ message: 'Hello World!' });
    }
    
    res.send('Hello World!');
});

router.get('/users', userUpdateLimiter, getUsers);
router.get('/users/:id', userUpdateLimiter, auth, getUserById);
router.post('/users', validityCreateUser, createUserLimiter, createUser);
router.put('/users/:id', userUpdateLimiter, validityUpdateUser, auth, isAdmin, updateUser);
router.delete('/users/:id', userUpdateLimiter, auth, isAdmin, deleteUser);
router.post('/login', validateLogin, loginLimiter, login);

router.put("/users", (req, res) => {
  if (req.accepts('json') !== false) {
    res.json({ message: "Route not allowed, add an id" });
  } else {
    res.send('Route not allowed, add an id');
  }
});

router.delete("/users", (req, res) => {
  if (req.accepts('json') !== false) {
    res.json({ message: "Route not allowed, add an id" });
  } else {
    res.send('Route not allowed, add an id');
  }
});

router.all('/users', (req, res) => {
  if (req.accepts('json') !== false) {
    res.json({ message: "Route not allowed, add an id" });
  } else {
    res.send('Route not allowed, add an id');
  }
});

export default router;






























