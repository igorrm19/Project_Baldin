import express from 'express';
import morgan from 'morgan';
import router from './src/routes/user.router.js';
import connectDB from './src/config/DBconfig.js';

void connectDB();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(['/', '/api'], router);

export default app
