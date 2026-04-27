import { ButtonHTML } from './button';

describe('ButtonHTML', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('initializes with text and default id/type', () => {
        const button = new ButtonHTML('Click Me');
        expect(button.text).toBe('Click Me');
        expect(button.id).toBe('button');
        expect(button.type).toBe('button');
    });

    it('initializes with custom parameters', () => {
        const button = new ButtonHTML('Submit', 'submit-btn', 'submit');
        expect(button.text).toBe('Submit');
        expect(button.id).toBe('submit-btn');
        expect(button.type).toBe('submit');
    });

    it('mounts the button into a container', () => {
        const button = new ButtonHTML('Action');
        button.mountButton(container);

        console.log("container innerHTML:", container.innerHTML);
        
        const btnElement = container.querySelector('button');
        expect(btnElement).toBeTruthy();
        expect(btnElement?.textContent?.trim()).toBe('Action');
    });

    it('replaces content on multiple mounts', () => {
        const button = new ButtonHTML('First');
        button.mountButton(container);
        
        button.text = 'Second';
        button.mountButton(container);

        const btnElement = container.querySelector('button');
        expect(btnElement?.textContent?.trim()).toBe('Second');
        expect(container.children).toHaveLength(1); // containerButton
    });
});
