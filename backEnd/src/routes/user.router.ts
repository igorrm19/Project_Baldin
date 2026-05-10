import express from 'express';
import { getUsers, UserById, createUser, updateUser, deleteUser, login } from '../controller/user.contrller.js';

const router = express.Router();

router.get(['/', '/api'], (req, res) => {
    res.send('Hello World!');
});

router.get('/users', getUsers);
router.get('/users/:id', UserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', login);

export default router;
