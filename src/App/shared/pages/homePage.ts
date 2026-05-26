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
        parent.appendChild(this.container);

        const headerWrapper = document.createElement("div");
        headerWrapper.className = "w-full z-50 sticky top-0";
        this.container.appendChild(headerWrapper);

        const mainWrapper = document.createElement("main");
        mainWrapper.className = "flex flex-grow items-center justify-center w-full";
        this.container.appendChild(mainWrapper);

        const footerWrapper = document.createElement("div");
        footerWrapper.className = "w-full mt-auto";
        this.container.appendChild(footerWrapper);

        const header = new HeaderComponent();
        void header.mount(headerWrapper);

        const footer = new FooterComponent();
        footer.mount(footerWrapper);
        
        return;
    }

    unmount(): void {
        console.log("[Router] Unmounting HomePage and clearing listeners");
        return;
    }
}

