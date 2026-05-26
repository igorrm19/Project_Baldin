import connectDB from './DBconfig.js';
import mongoose from 'mongoose';

jest.mock('mongoose', () => {
    return {
        connections: [{ readyState: 0 }],
        connect: jest.fn(),
    };
});

describe('connectDB', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
        (mongoose.connections as unknown as { readyState: number }[])[0]!.readyState = 0;
        jest.clearAllMocks();
        // mock console.log and console.error
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        process.env = originalEnv;
        jest.restoreAllMocks();
    });

    it('should return if already connected', async () => {
        (mongoose.connections as unknown as { readyState: number }[])[0]!.readyState = 1;
        await connectDB();
        expect(mongoose.connect).not.toHaveBeenCalled();
    });

    it('should connect using custom URI', async () => {
        (mongoose.connect as jest.Mock).mockResolvedValue({ connection: { host: 'localhost' } });
        await connectDB('mongodb://localhost:27017/test');
        expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost:27017/test', expect.any(Object));
    });

    it('should connect using MONGODB_URI env variable', async () => {
        process.env['MONGODB_URI'] = 'mongodb://env-uri';
        (mongoose.connect as jest.Mock).mockResolvedValue({ connection: { host: 'env-host' } });
        await connectDB();
        expect(mongoose.connect).toHaveBeenCalledWith('mongodb://env-uri', expect.any(Object));
    });

    it('should throw error if URI is missing', async () => {
        delete process.env['MONGODB_URI'];
        await expect(connectDB()).rejects.toThrow('MONGODB_URI is not defined in .env file');
        expect(mongoose.connect).not.toHaveBeenCalled();
    });

    it('should handle and re-throw connection error', async () => {
        process.env['MONGODB_URI'] = 'mongodb://fail-uri';
        const error = new Error('Connection failed');
        (mongoose.connect as jest.Mock).mockRejectedValue(error);
        await expect(connectDB()).rejects.toThrow('Connection failed');
        expect(console.error).toHaveBeenCalled();
    });
});
