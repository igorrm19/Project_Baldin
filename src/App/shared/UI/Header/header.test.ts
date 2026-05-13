import { HeaderComponent } from './header';

// Mock the template import
jest.mock('./header.html?raw', () => 'Mock Template Content', { virtual: true });

// Mock global fetch
const globalFetch = globalThis as unknown as { fetch: jest.Mock };
globalFetch.fetch = jest.fn();

describe('HeaderComponent', () => {
    let parent: HTMLElement;

    beforeEach(() => {
        parent = document.createElement('div');
        globalFetch.fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ name: 'Test User' })
        });
    });

    it('should initialize with default template if none provided', () => {
        const header = new HeaderComponent();
        expect(header).toBeDefined();
    });

    it('should mount and set innerHTML', async () => {
        const header = new HeaderComponent();
        header.mount(parent);
        // Wait for the async init to complete
        await new Promise(resolve => setTimeout(resolve, 0));
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
