import { TextHTML } from './text';

describe('TextHTML', () => {
    it('initializes with default parameters', () => {
        const textComponent = new TextHTML('Hello World');
        expect(textComponent.styleClass).toBe('text-base text-gray-950');
    });

    it('initializes with custom parameters', () => {
        const textComponent = new TextHTML('Hello World', 'text-lg text-red-500');
        expect(textComponent.styleClass).toBe('text-lg text-red-500');
    });

    it('mounts the component', () => {
        const container = document.createElement('div');
        const textComponent = new TextHTML('Test Mount');
        textComponent.mountText(container);
        expect(container.childNodes.length).toBeGreaterThan(0);
    });
});
