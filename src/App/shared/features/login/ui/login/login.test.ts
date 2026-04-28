import { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { Login } from './login';
import type { LoginProps } from '../../@types/LoginProps';

class TestLogin extends Login {
    public get exposedLoginContainer(): HTMLElement {
        return this.loginContainer;
    }

    public set exposedEmailValue(value: string) {
        this.emailValue = value;
    }

    public setSubmitting(value: boolean) {
        Object.defineProperty(this, 'isSubmitting', {
            value,
            configurable: true,
            writable: true,
        });
    }

    public setPropsValue(value: string | null) {
        (this.props as LoginProps & { value: string | null }).value = value;
    }
}

const globalFetch = globalThis as unknown as { fetch: jest.Mock };
globalFetch.fetch = jest.fn();

describe('Login', () => {
    let mockBaseModel: IBaseModel;
    let login: TestLogin;
    let container: HTMLElement;
    let logSpy: jest.SpyInstance;
    let errorSpy: jest.SpyInstance;

    beforeEach(() => {
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockBaseModel = {
            addProps: jest.fn(),
            addComponent: jest.fn(),
            getHTML: () => '<div></div>',
            page: { mount: () => document.createElement('div') }
        } as IBaseModel;
        login = new TestLogin(mockBaseModel, {
            value: 'V',
            h1_primaryText: 'T',
            h3_secondaryText: '',
            label_thirdText: '',
            label_fourthText: ''
        });
        container = login.exposedLoginContainer;
        const err = document.createElement('div');
        err.id = 'error-message';
        container.appendChild(err);
        document.head.innerHTML = '<meta name="csrf-token" content="T">';
    });

    afterEach(() => {
        logSpy.mockRestore();
        errorSpy.mockRestore();
    });

    it('all branches', async () => {
        login.mountLogin();
        
        const d = document.createElement('div');
        const email = document.createElement('input');
        email.id = 'email';
        d.appendChild(email);
        
        const pass = document.createElement('input');
        pass.id = 'password';
        d.appendChild(pass);
        
        const output = document.createElement('div');
        output.id = 'email-input-value';
        d.appendChild(output);

        login.bindButtons(d);
        
        email.value = 'test@t.com';
        email.dispatchEvent(new Event('input', { bubbles: true }));
        pass.value = 'password123';
        pass.dispatchEvent(new Event('input', { bubbles: true }));

        // HandleSubmit Success
        globalFetch.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });
        await login.handleSubmit();
        
        // HandleSubmit Error
        globalFetch.fetch.mockRejectedValueOnce(new Error('F'));
        await login.handleSubmit();
        
        login.exposedEmailValue = "";
        await login.handleSubmit();
        
        login.setSubmitting(true);
        await login.handleSubmit();
        
        // Output element missing branch (re-bind and re-dispatch)
        const d2 = document.createElement('div');
        const email2 = document.createElement('input');
        email2.id = 'email';
        d2.appendChild(email2);
        login.bindButtons(d2); // Bind AFTER appending
        email2.dispatchEvent(new Event('input', { bubbles: true }));
    });

    it('admin access branches', () => {
        const d = document.createElement('div');
        login.handleAdminAccess(d);
        expect(d.children.length).toBeGreaterThan(0);
        
        const d2 = document.createElement('div');
        login.setPropsValue(null); // trigger else branch
        login.handleAdminAccess(d2);
        expect(d2.textContent).toContain('Value not found');
    });
});
