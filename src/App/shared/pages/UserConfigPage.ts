import { HeaderComponent } from "../UI/Header/header";
import { FooterComponent } from "../UI/Footer/footer";
import { UserConfigComponent } from "../features/configUser/UI/configPage/configPage";


class UserConfigPage {
    private readonly container: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.setupStyles();
    }

    private setupStyles(): void {
        this.container.classList.add("responsive-page");
    }

    mount(parent: HTMLElement): void {
        parent.appendChild(this.container);

        const headerWrapper = document.createElement("div");
        headerWrapper.className = "w-full z-50 sticky top-0";
        this.container.appendChild(headerWrapper);

        const configWrapper = document.createElement("div");
        configWrapper.className = "flex flex-grow items-center justify-center w-full py-10";
        this.container.appendChild(configWrapper);

        const footerWrapper = document.createElement("div");
        footerWrapper.className = "w-full mt-auto";
        this.container.appendChild(footerWrapper);

        const header = new HeaderComponent();
        void header.mount(headerWrapper);

        const config = new UserConfigComponent();
        void config.mount(configWrapper);

        const footer = new FooterComponent();
        footer.mount(footerWrapper);

    }

    unmount(): void {
        console.log("[Router] Unmounting AboutPage and clearing listeners");
    }
}

export { UserConfigPage };
