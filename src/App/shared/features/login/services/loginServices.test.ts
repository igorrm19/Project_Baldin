import { LoginServices } from './loginServices';

const globalFetch = globalThis as unknown as { fetch: jest.Mock };
globalFetch.fetch = jest.fn();

describe('LoginServices', () => {
    let logSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        document.head.innerHTML = '<meta name="csrf-token" content="test-token">';
    });

    afterEach(() => {
        logSpy.mockRestore();
    });

    const setupResponse = (ok: boolean, data: unknown) => {
        globalFetch.fetch.mockResolvedValueOnce({
            ok,
            json: () => ok ? Promise.resolve(data) : (data === "FAIL" ? Promise.reject(new Error("REJECT")) : Promise.resolve(data))
        });
    };

    it('success paths', async () => {
        const s = new LoginServices('t@t.com', 'password123', 'Test');
        setupResponse(true, { name: 'T' }); await s.getUser();
        setupResponse(true, { token: 't', user: {} }); await s.loginUser();
        setupResponse(true, { id: 1 }); await s.postUser();
        setupResponse(true, { ok: true }); await s.putUser();
        setupResponse(true, { deleted: true }); await s.deleteUser();
        
        // localStorage should have been called
        expect(localStorage.getItem('token')).toBe('t');
    });

    it('JSON fail paths', async () => {
        const s = new LoginServices('t@t.com', 'password123', 'Test');
        setupResponse(false, 'FAIL'); await expect(s.getUser()).rejects.toThrow();
        setupResponse(false, 'FAIL'); await expect(s.loginUser()).rejects.toThrow();
        setupResponse(false, 'FAIL'); await expect(s.postUser()).rejects.toThrow();
        setupResponse(false, 'FAIL'); await expect(s.putUser()).rejects.toThrow();
        setupResponse(false, 'FAIL'); await expect(s.deleteUser()).rejects.toThrow();
    });

    it('error response with message', async () => {
        setupResponse(false, { message: 'FAIL' });
        await expect(new LoginServices('t@t.com', 'password123').getUser()).rejects.toThrow('FAIL');
        
        setupResponse(false, { error: 'LOGIN_FAIL' });
        await expect(new LoginServices('t@t.com', 'password123').loginUser()).rejects.toThrow('LOGIN_FAIL');
    });

    it('network and other errors', async () => {
        globalFetch.fetch.mockRejectedValue(new Error('Network error'));
        const s = new LoginServices('t@t.com', 'password123', 'Test');
        await expect(s.getUser()).rejects.toThrow();
        await expect(s.loginUser()).rejects.toThrow();
        await expect(s.postUser()).rejects.toThrow();
        await expect(s.putUser()).rejects.toThrow();
        await expect(s.deleteUser()).rejects.toThrow();
        
        globalFetch.fetch.mockRejectedValue(new Error('Other'));
        await expect(new LoginServices('t@t.com', 'password123').getUser()).rejects.toThrow('Other');
    });

    it('postUser network error triggers service fallback', async () => {
        globalFetch.fetch.mockRejectedValueOnce(new Error('Network error'));
        await expect(new LoginServices('t@t.com', 'password123').postUser()).rejects.toThrow('Failed to create user');
    });

    it('postUser non-Error rejection triggers service fallback', async () => {
        globalFetch.fetch.mockRejectedValueOnce('STRING_FAIL');
        await expect(new LoginServices('t@t.com', 'password123').postUser()).rejects.toThrow('Failed to create user');
        
        globalFetch.fetch.mockRejectedValueOnce('STRING_FAIL');
        await expect(new LoginServices('t@t.com', 'password123').putUser()).rejects.toThrow('Failed to create user');

        globalFetch.fetch.mockRejectedValueOnce('STRING_FAIL');
        await expect(new LoginServices('t@t.com', 'password123').loginUser()).rejects.toThrow('Failed to create user');
    });

    it('CSRF placeholder does not throw', async () => {
        document.head.innerHTML = '<meta name="csrf-token" content="{{ csrf_token() }}">';
        setupResponse(true, {});
        await new LoginServices('t@t.com', 'password123').postUser();
    });
});
