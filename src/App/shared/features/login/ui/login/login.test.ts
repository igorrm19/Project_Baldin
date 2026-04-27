import { Login } from './login';
import { LoginServices } from '../../services/loginServices';
import type { IBaseModel } from '../../../../../../../fox/core/src/@types/base.model.interface';
import type { LoginProps } from '../../@types/LoginProps';

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
        login = new Login(mockBaseModel as unknown as IBaseModel, mockProps as unknown as LoginProps);
        // @ts-expect-error
        login.loginContainer = document.createElement('div');
        // @ts-expect-error
        login.loginContainer.innerHTML = '<div id="error-message"></div><div id="email-input-value"></div><input id="email"><input id="password">';
        container = document.createElement('div');
        document.body.appendChild(container);
        login.mountLogin();
        // @ts-expect-error - access private for testing
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

        // @ts-expect-error
        login.emailValue = 'test@example.com';
        // @ts-expect-error
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
        // @ts-expect-error
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
        const loginNoProps = new Login(mockBaseModel as unknown as IBaseModel, { h1_primaryText: 'Test' } as unknown as LoginProps);
        loginNoProps.handleAdminAccess(adminContainer);
        expect(adminContainer.textContent).toContain('Value not found');
    });

    it('updates email and password values on input', () => {
        // @ts-expect-error
        const emailInput = login.loginContainer.querySelector('#email') as HTMLInputElement;
        emailInput.value = 'user@test.com';
        emailInput.dispatchEvent(new Event('input'));
        // @ts-expect-error
        expect(login.emailValue).toBe('user@test.com');

        // @ts-expect-error
        const passInput = login.loginContainer.querySelector('#password') as HTMLInputElement;
        passInput.value = 'secret';
        passInput.dispatchEvent(new Event('input'));
        // @ts-expect-error
        expect(login.passwordValue).toBe('secret');
    });
});
