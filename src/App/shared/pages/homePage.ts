import { FooterComponent } from "../UI/Footer/footer";
import { HeaderComponent } from "../UI/Header/header";
import { Main } from "../../../../fox/main";;
import { BaseModel } from "../../../../fox/core/src/module/utils/base.model";

type cadastroProps = Record<string, unknown>

export class HomePage extends Main<cadastroProps> {
    private readonly container: HTMLElement;

    constructor() {
        super(new BaseModel("div", ""), {});
        this.container = document.createElement("div");
        this.setupStyles();
        return;
    }

    private setupStyles(): void {
        this.container.classList.add("responsive-page");
        return;
    }

    override mount(parent: HTMLElement): void {
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

    override unmount(): void {
        super.unmount()
    }

}

