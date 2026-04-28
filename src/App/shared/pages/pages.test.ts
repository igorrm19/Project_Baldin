import { HomePage } from './homePage';
import { MainPage } from './mainPage';
import { AboutPage } from './aboutPage';
import { CadastroPage } from './cadastroPage';

describe('Pages', () => {
    let parent: HTMLElement;

    beforeEach(() => {
        parent = document.createElement('div');
        document.body.appendChild(parent);
    });

    afterEach(() => {
        document.body.removeChild(parent);
    });

    it('mounts HomePage', () => {
        const page = new HomePage();
        page.mount(parent);
        expect(parent.innerHTML).toContain('home-content-box');
        page.unmount();
    });

    it('mounts MainPage', () => {
        const page = new MainPage();
        page.mount(parent);
        expect(parent.querySelector('.responsive-page')).toBeTruthy();
        page.unmount();
    });

    it('mounts AboutPage', () => {
        const page = new AboutPage();
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
