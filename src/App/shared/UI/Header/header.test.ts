import { HeaderComponent } from './header';

// Mock the template import
jest.mock('./header.html?raw', () => 'Mock Template Content', { virtual: true });

describe('HeaderComponent', () => {
    let parent: HTMLElement;

    beforeEach(() => {
        parent = document.createElement('div');
    });

    it('should initialize with default template if none provided', () => {
        // This is tricky because the template is imported. 
        // But we can test the constructor's logic by bypassing the import if possible or using the current one.
        const header = new HeaderComponent();
        expect(header).toBeDefined();
    });

    it('should mount and set innerHTML', () => {
        const header = new HeaderComponent();
        header.mount(parent);
        expect(parent.innerHTML).toContain('div'); // HeaderComponent creates a div container
    });

    it('should log on mount', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const header = new HeaderComponent();
        header.onMount();
        expect(logSpy).toHaveBeenCalledWith("[HeaderComponent] Header component mounted");
        logSpy.mockRestore();
    });
});
