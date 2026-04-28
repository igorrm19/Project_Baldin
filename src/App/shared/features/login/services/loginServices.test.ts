import { LoginServices } from './loginServices';

const globalFetch = globalThis as unknown as { fetch: jest.Mock };
globalFetch.fetch = jest.fn();

describe('LoginServices', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.head.innerHTML = '';
    });

    it('can be initialized', () => {
        const service = new LoginServices('test@example.com', 'password123');
        expect(service).toBeDefined();
    });

    it('postUser makes a POST request and extracts CSRF token', async () => {
        const meta = document.createElement('meta');
        meta.name = 'csrf-token';
        meta.content = 'super-secret-token';
        document.head.appendChild(meta);

        globalFetch.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ id: 1 })
        });

        const service = new LoginServices('test@example.com', 'password123');
        await service.postUser();

        expect(globalFetch.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/users'),
            expect.objectContaining({
                method: 'POST',
                credentials: 'include',
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': 'super-secret-token'
                }),
                body: JSON.stringify({
                    email: 'test@example.com',
                    password: 'password123'
                })
            })
        );
        
        // Assert memory string destruction
        expect((service as unknown as { password: string }).password).toBe("");
    });

    it('putUser makes a PUT request', async () => {
        globalFetch.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ id: 1 })
        });

        const service = new LoginServices('test@example.com', 'password123');
        await service.putUser();

        expect(globalFetch.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/users'),
            expect.objectContaining({
                method: 'PUT',
                credentials: 'include'
            })
        );

        expect((service as unknown as { password: string }).password).toBe("");
    });

    it('handles fetch errors and still wipes memory', async () => {
        globalFetch.fetch.mockRejectedValueOnce(new Error('Network error'));

        const service = new LoginServices('test@example.com', 'password123');
        await expect(service.postUser()).rejects.toThrow('Failed to create user');
        expect((service as unknown as { password: string }).password).toBe("");
    });

    it('getUser makes a GET request and handles ok: false', async () => {
        globalFetch.fetch.mockResolvedValueOnce({ ok: false });
        const service = new LoginServices('test@example.com', 'password123');
        await expect(service.getUser()).rejects.toThrow('Failed to create user');
        expect((service as unknown as { email: string }).email).toBe("");
    });

    it('getUser makes a GET request, handles success and wipes credentials', async () => {
        globalFetch.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });
        const service = new LoginServices('test@example.com', 'password123');
        await service.getUser();
        expect(globalFetch.fetch).toHaveBeenCalledWith(expect.stringContaining('http://localhost:3000/users'), expect.objectContaining({ method: 'GET', credentials: 'include' }));
        expect((service as unknown as { password: string }).password).toBe("");
    });

    it('deleteUser makes a DELETE request', async () => {
        globalFetch.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });
        const service = new LoginServices('test@example.com', 'password123');
        await service.deleteUser();
        expect(globalFetch.fetch).toHaveBeenCalledWith(expect.stringContaining('http://localhost:3000/users'), expect.objectContaining({ method: 'DELETE', credentials: 'include' }));
    });

    it('handles ok: false for putUser', async () => {
        globalFetch.fetch.mockResolvedValueOnce({ ok: false });
        const service = new LoginServices('test@example.com', 'password123');
        await expect(service.putUser()).rejects.toThrow('Failed to create user');
    });

    it('handles ok: false for postUser', async () => {
        globalFetch.fetch.mockResolvedValueOnce({ ok: false });
        const service = new LoginServices('test@example.com', 'password123');
        await expect(service.postUser()).rejects.toThrow('Failed to create user');
    });

    it('handles ok: false for deleteUser', async () => {
        globalFetch.fetch.mockResolvedValueOnce({ ok: false });
        const service = new LoginServices('test@example.com', 'password123');
        await expect(service.deleteUser()).rejects.toThrow('Failed to create user');
    });

    it('handles missing content attribute on csrf meta tag', async () => {
        const meta = document.createElement('meta');
        meta.name = 'csrf-token';
        document.head.appendChild(meta);

        globalFetch.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

        const service = new LoginServices('test@example.com', 'password123');
        await service.postUser();

        expect(globalFetch.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/users'),
            expect.objectContaining({
                headers: expect.objectContaining({
                    'X-CSRF-Token': ''
                })
            })
        );
    });
});
