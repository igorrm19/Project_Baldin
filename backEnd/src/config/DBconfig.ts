import mongoose from 'mongoose';
import dns from 'dns';

if (process.env['NODE_ENV'] !== 'production') {
    if (dns.setDefaultResultOrder) {
        dns.setDefaultResultOrder('ipv4first');
    }
}

const connectDB = async (customUri?: string) => {
    try {
        const options = {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
            family: process.env['NODE_ENV'] !== 'production' ? 4 : undefined
        };

        const uri = customUri || process.env['MONGODB_URI']!; 

        if (!uri) {
            throw new Error("MONGODB_URI is not defined in .env file");
        }

        const conn = await mongoose.connect(uri, options);

        console.log(` MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        const err = error as Error;
        console.error(` MongoDB Connection Error: ${err.message}`);
        
        if (!customUri) process.exit(1);
        throw err;
    }
};

export default connectDB;
