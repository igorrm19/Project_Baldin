import { Login } from './login';
import { LoginServices } from '../../services/loginServices';

jest.mock('../../services/loginServices');

describe('Login', () => {
    let login: Login;
    let container: HTMLElement;
    const mockBaseModel = {
        getHTML: jest.fn().mockReturnValue('<div id="login-form"> <input id="email"> <input id="password"> <button id="submit">Login</button> <button id="admin">Admin</button> <div id="error-message"></div> <div id="email-input-value"></div> </div>'),
        mount: jest.fn(),
        addProps: jest.fn(),
        addComponent: jest.fn()
    };
    const mockProps = {
        h1_primaryText: 'Login Page',
        value: 'Admin Access'
    };

    beforeEach(() => {
        login = new Login(mockBaseModel as any, mockProps as any);
        // @ts-ignore
        login.loginContainer = document.createElement('div');
        // @ts-ignore
        login.loginContainer.innerHTML = '<div id="error-message"></div><div id="email-input-value"></div><input id="email"><input id="password">';
        container = document.createElement('div');
        document.body.appendChild(container);
        login.mountLogin();
        // @ts-ignore - access private for testing
        login.bindButtons(login.loginContainer);
    });

    afterEach(() => {
        document.body.removeChild(container);
        jest.clearAllMocks();
    });

    it('handles successful login', async () => {
        const putUserMock = jest.fn().mockResolvedValue({});
        (LoginServices as jest.Mock).mockImplementation(() => ({
            putUser: putUserMock
        }));

        // @ts-ignore
        login.emailValue = 'test@example.com';
        // @ts-ignore
        login.passwordValue = 'password';

        await login.handleSubmit();

        expect(putUserMock).toHaveBeenCalled();
        expect(window.location.pathname).toBe('/cadastro');
    });

    it('handles login error', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        (LoginServices as jest.Mock).mockImplementation(() => ({
            putUser: jest.fn().mockRejectedValue(new Error('Login failed'))
        }));

        await login.handleSubmit();

        expect(consoleErrorSpy).toHaveBeenCalled();
        // @ts-ignore
        const errorMessage = login.loginContainer.querySelector('#error-message');
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
        const loginNoProps = new Login(mockBaseModel as any, { h1_primaryText: 'Test' } as any);
        loginNoProps.handleAdminAccess(adminContainer);
        expect(adminContainer.textContent).toContain('Value not found');
    });

    it('updates email and password values on input', () => {
        // @ts-ignore
        const emailInput = login.loginContainer.querySelector('#email') as HTMLInputElement;
        emailInput.value = 'user@test.com';
        emailInput.dispatchEvent(new Event('input'));
        // @ts-ignore
        expect(login.emailValue).toBe('user@test.com');

        // @ts-ignore
        const passInput = login.loginContainer.querySelector('#password') as HTMLInputElement;
        passInput.value = 'secret';
        passInput.dispatchEvent(new Event('input'));
        // @ts-ignore
        expect(login.passwordValue).toBe('secret');
    });
});
