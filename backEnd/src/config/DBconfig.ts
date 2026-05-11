import mongoose from 'mongoose';
import dns from 'dns';

if (process.env['NODE_ENV'] !== 'production') {
    if (typeof dns.setDefaultResultOrder === 'function') {
        dns.setDefaultResultOrder('ipv4first');
    }
}

const connectDB = async (customUri?: string): Promise<void> => {
    try {
        if (mongoose.connections[0]?.readyState === 1 as unknown) {
            return;
        }

        const options = {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
            family: process.env['NODE_ENV'] !== 'production' ? 4 : undefined
        };

        const uri = (customUri != null && customUri !== '') ? customUri : process.env['MONGODB_URI'];

        if (typeof uri !== 'string' || uri === '') {
            throw new Error("MONGODB_URI is not defined in .env file");
        }

        const conn = await mongoose.connect(uri, options);

        console.log(` MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        const err = error as Error;
        console.error(` MongoDB Connection Error: ${err.message}`);

        throw err;
    }
};

export default connectDB;
