const mongoose = require('mongoose');
const dns = require('dns');
import dotenv from 'dotenv';
dotenv.config();


if (process.env['NODE_ENV'] !== 'production') {
    if (dns.setDefaultResultOrder) {
        dns.setDefaultResultOrder('ipv4first');
    }
}

const connectDB = async (customUri: string) => {
    try {
        const options = {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        };

        if (process.env['NODE_ENV'] !== 'production') {
            (options as any).family = 4;
        }

        const uri = customUri || process.env['MONGODB_URI'];
        const conn = await mongoose.connect(uri, options);

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(`MongoDB Connection Error: ${error as unknown as Error}.message}`);
        if (!customUri) process.exit(1);
        throw error as unknown as Error;
    }
};

export default connectDB;
