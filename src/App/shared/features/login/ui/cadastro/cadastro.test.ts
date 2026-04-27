import { Cadastro } from './cadastro';
import { LoginServices } from '../../services/loginServices';

jest.mock('../../services/loginServices');

describe('Cadastro', () => {
    let mockBaseModel: any;
    let props: any;

    beforeEach(() => {
        mockBaseModel = {
            addProps: jest.fn(),
            addComponent: jest.fn(),
            getHTML: jest.fn().mockReturnValue('<div></div>'),
            mount: jest.fn()
        };
        props = {};
        jest.clearAllMocks();
    });

    it('initializes correctly', () => {
        const cadastro = new Cadastro(mockBaseModel, props);
        expect(cadastro).toBeDefined();
    });

    it('mounts registration container', () => {
        const cadastro = new Cadastro(mockBaseModel, props);
        cadastro.mountRegistration();
        expect(cadastro.registrationContainer.childNodes.length).toBeGreaterThan(0);
    });

    it('handles successful submit', async () => {
        const cadastro = new Cadastro(mockBaseModel, props);
        cadastro.mountRegistration();
        
        (LoginServices.prototype.postUser as jest.Mock).mockResolvedValueOnce({});
        
        await cadastro.handleSubmit();
        expect(LoginServices.prototype.postUser).toHaveBeenCalled();
    });

    it('handles submit error', async () => {
        const cadastro = new Cadastro(mockBaseModel, props);
        // Add error message div to container
        cadastro.registrationContainer.innerHTML = '<div id="error-message"></div>';
        
        (LoginServices.prototype.postUser as jest.Mock).mockRejectedValueOnce(new Error('Failed'));
        
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        await cadastro.handleSubmit();
        
        const errorMessage = cadastro.registrationContainer.querySelector('#error-message');
        expect(errorMessage?.textContent).toContain('Failed to register');
        consoleSpy.mockRestore();
    });

    it('binds buttons and handles inputs', () => {
        const cadastro = new Cadastro(mockBaseModel, props);
        const container = document.createElement('div');
        container.innerHTML = `
            <input id="email">
            <input id="password">
            <button id="btn1">Submit</button>
            <button id="btn2">Admin</button>
        `;
        
        cadastro.bindButtons(container);
        
        const emailInput = container.querySelector('#email') as HTMLInputElement;
        emailInput.value = 'test@example.com';
        emailInput.dispatchEvent(new Event('input'));
        
        const passInput = container.querySelector('#password') as HTMLInputElement;
        passInput.value = 'password123';
        passInput.dispatchEvent(new Event('input'));
        
        // @ts-ignore
        expect(cadastro.emailValue).toBe('test@example.com');
        // @ts-ignore
        expect(cadastro.passwordValue).toBe('password123');
    });

    it('handles admin access', () => {
        const cadastro = new Cadastro(mockBaseModel, props);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        cadastro.handleAdminAccess();
        expect(consoleSpy).toHaveBeenCalledWith('Admin access triggered');
        consoleSpy.mockRestore();
    });
});
