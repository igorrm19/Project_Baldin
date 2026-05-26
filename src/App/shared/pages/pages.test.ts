import { HomePage } from './homePage';
import { MainPage } from './mainPage';
import { UserConfigPage } from './UserConfigPage';
import { CadastroPage } from './cadastroPage';

describe('Pages', () => {
    let parent: HTMLElement;
    let logSpy: jest.SpyInstance;

    beforeEach(() => {
        parent = document.createElement('div');
        document.body.appendChild(parent);
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        if (parent.parentNode) {
            document.body.removeChild(parent);
        }
        logSpy.mockRestore();
    });

    it('mounts HomePage', () => {
        const page = new HomePage();
        page.mount(parent);
        expect(parent.querySelector('header')).toBeTruthy();
        page.unmount();
    });

    it('mounts MainPage', () => {
        const page = new MainPage();
        page.mount(parent);
        expect(parent.querySelector('.responsive-page')).toBeTruthy();
        page.unmount();
    });

    it('mounts UserConfigPage', () => {
        const page = new UserConfigPage();
        page.mount(parent);
        expect(parent.querySelector('.responsive-page')).toBeTruthy();
        page.unmount();
    });

    it('mounts CadastroPage', () => {
        const page = new CadastroPage();
        page.mount(parent);
        expect(parent.querySelector('.responsive-page')).toBeTruthy();
        page.unmount();
    });
});
