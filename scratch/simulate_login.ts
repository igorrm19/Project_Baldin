import 'dotenv/config';
import connectDB from '../backEnd/src/config/DBconfig.js';
import User from '../backEnd/src/model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function simulateLogin(email, password) {
    try {
        await connectDB();
        console.log('Searching for:', email);
        const user = await User.findOne({ email: { $eq: email } });
        
        if (!user) {
            console.log('User not found');
            return;
        }
        
        console.log('User found, comparing password...');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid);
        
        const secret = process.env['JWT_SECRET'];
        console.log('JWT_SECRET exists:', !!secret);
        
        const userRole = (user as any).role;
        const payload = {
            id: user._id.toString(),
            email: user.email,
            role: userRole
        };
        
        console.log('Signing token with payload:', payload);
        const token = jwt.sign(payload, secret as string, { expiresIn: "1h" });
        console.log('Token signed successfully');
        
    } catch (err) {
        console.error('SIMULATION ERROR:', err);
    } finally {
        process.exit(0);
    }
}

// Using one of the emails found in the previous step
simulateLogin('igorrodriguesmachado23@gmail.com', 'some_password'); 
