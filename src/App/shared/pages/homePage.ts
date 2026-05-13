import { FooterComponent } from "../UI/Footer/footer";
import { HeaderComponent } from "../UI/Header/header";

export class HomePage {
    private readonly container: HTMLElement;

    constructor() {
        this.container = document.createElement("div");
        this.setupStyles();
        return;
    }

    private setupStyles(): void {
        this.container.classList.add("responsive-page");
        return;
    }

    mount(parent: HTMLElement): void {
        const header = new HeaderComponent();
        header.mount(this.container);

        const footer = new FooterComponent();
        footer.mount(this.container);

        parent.appendChild(this.container);
        return;
    }

    unmount(): void {
        console.log("[Router] Unmounting HomePage and clearing listeners");
        return;
    }
}

