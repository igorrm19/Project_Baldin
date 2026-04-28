import { Login } from './login';

describe('Login', () => {
    let login: Login;
    let container: HTMLElement;
    let fetchMock: jest.Mock;

    const mockBaseModel = {
        getHTML: jest.fn().mockReturnValue('<div></div>'),
        mount: jest.fn(),
        addProps: jest.fn(),
        addComponent: jest.fn()
    };
    const mockProps = {
        h1_primaryText: 'Login Page',
        value: 'Admin Access',
        h3_secondaryText: 'Login',
        label_thirdText: 'Email',
        label_fourthText: 'Password'
    };

    beforeEach(() => {
        fetchMock = jest.fn();
        globalThis.fetch = fetchMock;

        login = new Login(mockBaseModel, mockProps);
        container = document.createElement('div');
        
        const internalContainer = Reflect.get(login, 'loginContainer') as HTMLElement;
        internalContainer.innerHTML = `
            <div id="error-message"></div>
            <div id="email-input-value"></div>
            <input id="email">
            <input id="password">
            <button id="btn-submit">Login</button>
            <button id="btn-admin">Admin</button>
        `;
        
        container.appendChild(internalContainer);
        document.body.appendChild(container);
        login.mountLogin();
        login.bindButtons(internalContainer);
    });

    afterEach(() => {
        document.body.removeChild(container);
        window.history.replaceState({}, '', '/');
        jest.clearAllMocks();
    });

    it('handles successful login', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ token: 'mock-token' })
        });

        const emailInput = container.querySelector('#email') as HTMLInputElement;
        emailInput.value = 'test@example.com';
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));

        const passInput = container.querySelector('#password') as HTMLInputElement;
        passInput.value = 'password123';
        passInput.dispatchEvent(new Event('input', { bubbles: true }));

        await login.handleSubmit();

        expect(fetchMock).toHaveBeenCalled();
        const fetchArgs = fetchMock.mock.calls[0] as [string, RequestInit];
        expect(fetchArgs[1]?.method).toBe('PUT');
        const body = JSON.parse((fetchArgs[1]?.body as string) ?? '{}') as { email: string };
        expect(body.email).toBe('test@example.com');
        
        expect(window.location.pathname).toBe('/cadastro');
    });

    it('handles login error', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        fetchMock.mockRejectedValueOnce(new Error('Network error'));

        await login.handleSubmit();

        expect(consoleErrorSpy).toHaveBeenCalled();
        const errorMessage = container.querySelector('#error-message');
        expect(errorMessage?.textContent).toBe('Failed to login. Please check your email and password.');
        consoleErrorSpy.mockRestore();
    });

    it('handles admin access', () => {
        const adminContainer = document.createElement('div');
        login.handleAdminAccess(adminContainer);
        expect(adminContainer.textContent).toContain('Admin Access');
    });

    it('handles admin access with missing value', () => {
        const adminContainer = document.createElement('div');
        const loginNoProps = new Login(mockBaseModel, { h1_primaryText: 'Test', h3_secondaryText: '', label_thirdText: '', label_fourthText: '' });
        loginNoProps.handleAdminAccess(adminContainer);
        expect(adminContainer.textContent).toContain('Value not found');
    });

    it('updates email and password values on input', () => {
        const emailInput = container.querySelector('#email') as HTMLInputElement;
        emailInput.value = 'user@test.com';
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));

        // Test output div updates
        const output = container.querySelector('#email-input-value');
        expect(output?.textContent).toBe('user@test.com');
    });
});
