import { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { Cadastro } from "./cadastro"

const globalFetch = globalThis as unknown as { fetch: jest.Mock };
globalFetch.fetch = jest.fn();

describe('Cadastro', () => {
    let mockBaseModel: IBaseModel;
    let cadastro: Cadastro;
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
        cadastro = new Cadastro(mockBaseModel, {});
        container = (cadastro as any).registrationContainer;
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
        expect(container).toBeDefined();
    });

    it('full handleSubmit coverage', async () => {
        const s = (cadastro as any);
        s.emailValue = 'test@t.com';
        s.passwordValue = '123456';
        
        // Success
        globalFetch.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });
        await cadastro.handleSubmit();
        
        // Custom Error Message
        s.emailValue = 'test@t.com';
        s.passwordValue = '123456';
        globalFetch.fetch.mockRejectedValueOnce(new Error('CUSTOM_FAIL'));
        await cadastro.handleSubmit();
        expect(container.querySelector('#error-message')?.textContent).toBe('CUSTOM_FAIL');

        // Network/Generic Error -> serviceMessage.error fallback
        globalFetch.fetch.mockRejectedValueOnce(new Error('Network error'));
        await cadastro.handleSubmit();
        expect(container.querySelector('#error-message')?.textContent).toBe('Failed to create user');

        // Validation Fail
        s.passwordValue = '1';
        await cadastro.handleSubmit();
        
        // Debounce Branch
        s.isSubmitting = true;
        await cadastro.handleSubmit();
    });

    it('inputs coverage', () => {
        const s = (cadastro as any);
        const email = document.createElement('input');
        email.id = 'email';
        container.appendChild(email);
        const pass = document.createElement('input');
        pass.id = 'password';
        container.appendChild(pass);
        
        cadastro.bindButtons(container);
        
        email.value = 'E';
        email.dispatchEvent(new Event('input', { bubbles: true }));
        pass.value = 'P';
        pass.dispatchEvent(new Event('input', { bubbles: true }));
        
        expect(s.emailValue).toBe('E');
        expect(s.passwordValue).toBe('P');
    });

    it('admin access logout', () => {
        cadastro.handleAdminAccess();
        expect(logSpy).toHaveBeenCalled();
    });
});
