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

        const header = new HeaderComponent();
        void header.mount(this.container);

        //Config component
        const config = new UserConfigComponent();
        void config.mount(this.container);

        //Footer component
        const footer = new FooterComponent();
        footer.mount(this.container);

    }

    unmount(): void {
        console.log("[Router] Unmounting AboutPage and clearing listeners");
    }
}

export { UserConfigPage };
