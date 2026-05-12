import { HomePage } from './homePage';

// jest.mock('../UI/Header/header');

describe('HomePage', () => {
    let parent: HTMLElement;
    let logSpy: jest.SpyInstance;

    beforeEach(() => {
        parent = document.createElement('div');
        document.body.appendChild(parent);
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.clearAllMocks();
    });

    afterEach(() => {
        if (parent.parentNode) {
            document.body.removeChild(parent);
        }
        logSpy.mockRestore();
    });

    it('should initialize and setup styles', () => {
        const page = new HomePage();
        // Accessing private container for test purposes
        const container = (page as unknown as { container: HTMLElement }).container;
        expect(container.classList.contains('responsive-page')).toBe(true);
    });

    it('should mount with header and content box', () => {
        const page = new HomePage();
        page.mount(parent);

        // Verify Header exists in the DOM
        expect(parent.querySelector('header')).toBeTruthy();

        // Verify content box
        expect(parent.querySelector('.home-content-box')).toBeTruthy();
        expect(parent.innerHTML).toContain('Welcome to Fox Mother');
    });

    it('should unmount and log message', () => {
        const page = new HomePage();
        page.unmount();
        expect(logSpy).toHaveBeenCalledWith("[Router] Unmounting HomePage and clearing listeners");
    });
});
