import { ImageHTML } from './image';

describe('ImageHTML', () => {
    it('initializes with default parameters', () => {
        const imageComponent = new ImageHTML('/test.png');
        expect(imageComponent.alt).toBe('image');
    });

    it('initializes with custom parameters', () => {
        const imageComponent = new ImageHTML('/test.png', 'custom alt');
        expect(imageComponent.alt).toBe('custom alt');
    });

    it('mounts the component', () => {
        const container = document.createElement('div');
        const imageComponent = new ImageHTML('/test.png');
        imageComponent.mountImage(container);
        expect(container.childNodes.length).toBeGreaterThan(0);
    });
});
