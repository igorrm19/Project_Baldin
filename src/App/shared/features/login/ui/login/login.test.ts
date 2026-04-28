import { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { Login } from './login';
import { LoginProps } from '../../@types/LoginProps';

const globalFetch = globalThis as unknown as { fetch: jest.Mock };
globalFetch.fetch = jest.fn();

const defaultProps: LoginProps = {
    value: 'AdminFeedback',
    h1_primaryText: 'X',
    h3_secondaryText: 'X',
    label_thirdText: 'X',
    label_fourthText: 'X'
};

describe('Login', () => {
    let mockBaseModel: IBaseModel;
    let login: Login;
    let container: HTMLElement;
    let logSpy: jest.SpyInstance;
    let errorSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockBaseModel = {
            addProps: jest.fn(),
            addComponent: jest.fn(),
            page: { mount: () => document.createElement('div') }
        } as unknown as IBaseModel;
        login = new Login(mockBaseModel, defaultProps);
        container = (login as any).loginContainer;
        const err = document.createElement('div');
        err.id = 'error-message';
        container.appendChild(err);
        document.head.innerHTML = '<meta name="csrf-token" content="T">';
    });

    afterEach(() => {
        logSpy.mockRestore();
        errorSpy.mockRestore();
    });

    it('smoke test', () => {
        login.mountLogin();
        expect(container).toBeDefined();
    });

    it('full handleSubmit coverage', async () => {
        const s = (login as any);
        s.emailValue = 'test@t.com';
        s.passwordValue = '123456';
        
        // Success
        globalFetch.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });
        await login.handleSubmit();
        
        // Error
        s.emailValue = 'test@t.com';
        s.passwordValue = '123456';
        globalFetch.fetch.mockRejectedValueOnce(new Error('FAIL'));
        await login.handleSubmit();
        
        // Validation
        s.passwordValue = '1';
        await login.handleSubmit();
        
        // Debounce
        s.isSubmitting = true;
        await login.handleSubmit();
    });

    it('admin access adds feedback', () => {
        const d = document.createElement('div');
        login.handleAdminAccess(d);
        expect(d.children.length).toBeGreaterThan(0);
        
        // Test "Value not found" branch
        const d2 = document.createElement('div');
        (login as any).props.value = "";
        login.handleAdminAccess(d2);
        expect(d2.textContent).toContain('Value not found');
    });

    it('inputs coverage', () => {
        const email = document.createElement('input');
        email.id = 'email';
        container.appendChild(email);
        const pass = document.createElement('input');
        pass.id = 'password';
        container.appendChild(pass);
        
        login.bindButtons(container);
        
        email.value = 'E';
        email.dispatchEvent(new Event('input', { bubbles: true }));
        pass.value = 'P';
        pass.dispatchEvent(new Event('input', { bubbles: true }));
        
        expect((login as any).emailValue).toBe('E');
        expect((login as any).passwordValue).toBe('P');
    });
});
