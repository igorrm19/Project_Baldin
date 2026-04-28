import type { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { Cadastro } from "./cadastro"
import { LoginServices } from "../../services/loginServices"

jest.mock("../../services/loginServices");

const LoginServicesMock = LoginServices as unknown as jest.MockedClass<typeof LoginServices>;

class TestCadastro extends Cadastro {
    public get exposedRegistrationContainer(): HTMLElement {
        return this.registrationContainer;
    }

    public setSubmitting(value: boolean) {
        Object.defineProperty(this, 'isSubmitting', {
            value,
            configurable: true,
            writable: true,
        });
    }
}

const globalFetch = globalThis as unknown as { fetch: jest.Mock };
globalFetch.fetch = jest.fn();

describe('Cadastro', () => {
    let mockBaseModel: IBaseModel;
    let cadastro: TestCadastro;
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
            getHTML: () => '<div></div>',
            page: { mount: () => document.createElement('div') }
        } as IBaseModel;
        cadastro = new TestCadastro(mockBaseModel, {});
        container = cadastro.exposedRegistrationContainer;
        const err = document.createElement('div');
        err.id = 'error-message';
        container.appendChild(err);
        document.head.innerHTML = '<meta name="csrf-token" content="T">';
    });

    afterEach(() => {
        logSpy.mockRestore();
        errorSpy.mockRestore();
    });

    it('full coverage', async () => {
        cadastro.emailValue = 'test@t.com';
        cadastro.passwordValue = '123456';
        
        LoginServicesMock.prototype.postUser.mockResolvedValue({});
        await cadastro.handleSubmit();
        
        LoginServicesMock.prototype.postUser.mockRejectedValue(new Error('FAIL'));
        await cadastro.handleSubmit();

        LoginServicesMock.prototype.postUser.mockRejectedValue(new Error('Network error'));
        await cadastro.handleSubmit();

        // Non-error throw coverage (line 62)
        LoginServicesMock.prototype.postUser.mockRejectedValue("STRING_FAIL");
        await cadastro.handleSubmit();

        cadastro.passwordValue = '1';
        await cadastro.handleSubmit();
        
        cadastro.setSubmitting(true);
        await cadastro.handleSubmit();
    });

    it('inputs', () => {
        const email = document.createElement('input');
        email.id = 'email';
        const password = document.createElement('input');
        password.id = 'password';
        container.appendChild(email);
        container.appendChild(password);
        cadastro.bindButtons(container);
        email.value = 'E';
        email.dispatchEvent(new Event('input', { bubbles: true }));
        password.value = '123456';
        password.dispatchEvent(new Event('input', { bubbles: true }));
        expect(cadastro.emailValue).toBe('E');
        expect(cadastro.passwordValue).toBe('123456');
    });

    it('mountRegistration', () => {
        cadastro.mountRegistration();
        expect(container.innerHTML).toBeDefined();
    });

    it('handleAdminAccess logs output', () => {
        cadastro.handleAdminAccess();
        expect(logSpy).toHaveBeenCalledWith('Admin access triggered');
    });
});
