import { InputHTML } from './input';

describe('InputHTML', () => {
    it('initializes with default parameters', () => {
        const inputComponent = new InputHTML('username', 'text', 'Username');
        expect(inputComponent.placeholder).toBe('');
        expect(inputComponent.value).toBe('');
    });

    it('initializes with custom parameters', () => {
        const inputComponent = new InputHTML('username', 'text', 'Username', 'Enter name', 'admin');
        expect(inputComponent.placeholder).toBe('Enter name');
        expect(inputComponent.value).toBe('admin');
    });

    it('mounts the component', () => {
        const container = document.createElement('div');
        const inputComponent = new InputHTML('username', 'text', 'Username');
        inputComponent.mountInput(container);
        expect(container.childNodes.length).toBeGreaterThan(0);
    });
});
