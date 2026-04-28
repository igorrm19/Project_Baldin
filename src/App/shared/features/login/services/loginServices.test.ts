import { LoginServices } from './loginServices';

const globalFetch = globalThis as unknown as { fetch: jest.Mock };
globalFetch.fetch = jest.fn();

describe('LoginServices', () => {
    let logSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
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
        const s = new LoginServices('t@t.com', 'p');
        setupResponse(true, { name: 'T' }); await s.getUser();
        setupResponse(true, { id: 1 }); await s.postUser();
        setupResponse(true, { ok: true }); await s.putUser();
        setupResponse(true, { deleted: true }); await s.deleteUser();
    });

    it('JSON fail paths', async () => {
        const s = new LoginServices('t@t.com', 'p');
        setupResponse(false, 'FAIL'); await expect(s.postUser()).rejects.toThrow();
        setupResponse(false, 'FAIL'); await expect(s.putUser()).rejects.toThrow();
        setupResponse(false, 'FAIL'); await expect(s.deleteUser()).rejects.toThrow();
    });

    it('error response with message', async () => {
        setupResponse(false, { message: 'FAIL' });
        await expect(new LoginServices('t@t.com', 'p').getUser()).rejects.toThrow('FAIL');
    });

    it('network and other errors', async () => {
        globalFetch.fetch.mockRejectedValue(new Error('Network error'));
        const s = new LoginServices('t@t.com', 'p');
        await expect(s.getUser()).rejects.toThrow();
        await expect(s.postUser()).rejects.toThrow();
        await expect(s.deleteUser()).rejects.toThrow();
        
        globalFetch.fetch.mockRejectedValue(new Error('Other'));
        await expect(new LoginServices('t@t.com', 'p').getUser()).rejects.toThrow('Other');
    });

    it('postUser network error triggers service fallback', async () => {
        globalFetch.fetch.mockRejectedValueOnce(new Error('Network error'));
        await expect(new LoginServices('t@t.com', 'p').postUser()).rejects.toThrow('Failed to create user');
    });

    it('postUser non-Error rejection triggers service fallback', async () => {
        globalFetch.fetch.mockRejectedValueOnce('STRING_FAIL');
        await expect(new LoginServices('t@t.com', 'p').postUser()).rejects.toThrow('Failed to create user');
    });

    it('CSRF failures', async () => {
        document.head.innerHTML = '';
        await expect(new LoginServices('t@t.com', 'p').getUser()).rejects.toThrow('Sessão Expirada');
    });
});
