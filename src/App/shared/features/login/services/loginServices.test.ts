import { LoginServices } from './loginServices';

// Mock fetch globally
// @ts-ignore
(globalThis as any).fetch = jest.fn();

describe('LoginServices', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('can be initialized', () => {
        const service = new LoginServices('test@example.com', 'password123');
        expect(service).toBeDefined();
    });

    it('postUser makes a POST request', async () => {
        // @ts-ignore
        ((globalThis as any).fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1 })
        });

        const service = new LoginServices('test@example.com', 'password123');
        await service.postUser();

        expect((globalThis as any).fetch).toHaveBeenCalledWith(
            expect.stringContaining('/users'),
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({
                    email: 'test@example.com',
                    password: 'password123'
                })
            })
        );
    });

    it('putUser makes a PUT request', async () => {
        // @ts-ignore
        ((globalThis as any).fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 1 })
        });

        const service = new LoginServices('test@example.com', 'password123');
        await service.putUser();

        expect((globalThis as any).fetch).toHaveBeenCalledWith(
            expect.stringContaining('/users'),
            expect.objectContaining({
                method: 'PUT'
            })
        );
    });

    it('handles fetch errors', async () => {
        // @ts-ignore
        ((globalThis as any).fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        const service = new LoginServices('test@example.com', 'password123');
        await expect(service.postUser()).rejects.toThrow('Failed to create user');
    });

    it('getUser makes a GET request and handles ok: false', async () => {
        // @ts-ignore
        ((globalThis as any).fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        const service = new LoginServices('test@example.com', 'password123');
        await expect(service.getUser()).rejects.toThrow('Failed to create user');
    });

    it('getUser makes a GET request and handles success', async () => {
        // @ts-ignore
        ((globalThis as any).fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({}) });
        const service = new LoginServices('test@example.com', 'password123');
        await service.getUser();
        expect((globalThis as any).fetch).toHaveBeenCalledWith(expect.stringContaining('http://localhost:3000/users'));
    });

    it('deleteUser makes a DELETE request', async () => {
        // @ts-ignore
        ((globalThis as any).fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({}) });
        const service = new LoginServices('test@example.com', 'password123');
        await service.deleteUser();
        expect((globalThis as any).fetch).toHaveBeenCalledWith(expect.stringContaining('http://localhost:3000/users'), expect.objectContaining({ method: 'DELETE' }));
    });

    it('handles ok: false for putUser', async () => {
        // @ts-ignore
        ((globalThis as any).fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        const service = new LoginServices('test@example.com', 'password123');
        await expect(service.putUser()).rejects.toThrow('Failed to create user');
    });

    it('handles ok: false for postUser', async () => {
        // @ts-ignore
        ((globalThis as any).fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        const service = new LoginServices('test@example.com', 'password123');
        await expect(service.postUser()).rejects.toThrow('Failed to create user');
    });

    it('handles ok: false for deleteUser', async () => {
        // @ts-ignore
        ((globalThis as any).fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        const service = new LoginServices('test@example.com', 'password123');
        await expect(service.deleteUser()).rejects.toThrow('Failed to create user');
    });
});
