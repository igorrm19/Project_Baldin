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

    const setupResponse = (ok: boolean, data: any) => {
        globalFetch.fetch.mockResolvedValueOnce({
            ok,
            json: () => Promise.resolve(data)
        });
    };

    it('getUser success', async () => {
        setupResponse(true, { name: 'T' });
        await new LoginServices('t@t.com', 'p').getUser();
    });

    it('postUser success', async () => {
        setupResponse(true, { id: 1 });
        await new LoginServices('t@t.com', 'p').postUser();
    });

    it('putUser success', async () => {
        setupResponse(true, { ok: true });
        await new LoginServices('t@t.com', 'p').putUser();
    });

    it('deleteUser success', async () => {
        setupResponse(true, { deleted: true });
        await new LoginServices('t@t.com', 'p').deleteUser();
    });

    it('error response with message', async () => {
        setupResponse(false, { message: 'FAIL' });
        await expect(new LoginServices('t@t.com', 'p').getUser()).rejects.toThrow('FAIL');
    });

    it('error response without message', async () => {
        setupResponse(false, {});
        await expect(new LoginServices('t@t.com', 'p').getUser()).rejects.toThrow();
        setupResponse(false, {});
        await expect(new LoginServices('t@t.com', 'p').putUser()).rejects.toThrow();
        setupResponse(false, {});
        await expect(new LoginServices('t@t.com', 'p').deleteUser()).rejects.toThrow();
    });

    it('network errors', async () => {
        globalFetch.fetch.mockRejectedValue(new Error('Network error'));
        const s = new LoginServices('t@t.com', 'p');
        await expect(s.getUser()).rejects.toThrow();
        await expect(s.postUser()).rejects.toThrow();
        await expect(s.putUser()).rejects.toThrow();
        await expect(s.deleteUser()).rejects.toThrow();
    });

    it('other errors', async () => {
        globalFetch.fetch.mockRejectedValue(new Error('Other'));
        const s = new LoginServices('t@t.com', 'p');
        await expect(s.getUser()).rejects.toThrow('Other');
    });

    it('CSRF failures', async () => {
        document.head.innerHTML = '';
        await expect(new LoginServices('t@t.com', 'p').getUser()).rejects.toThrow('Sessão Expirada');
    });
});
