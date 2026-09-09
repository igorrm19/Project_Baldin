import { HeaderComponent } from "../UI/Header/header";
import { FooterComponent } from "../UI/Footer/footer";
import { UserConfigComponent } from "../features/configUser/UI/configPage/configPage";
import { BaseModel } from "../../../../fox/core/src/module/utils/base.model";
import { Main } from "../../../../fox/main";

type UserConfig = Record<string, unknown>

class UserConfigPage extends Main<UserConfig> {
    private readonly container: HTMLElement;

    constructor() {
        super(new BaseModel("div", ""), {})
        this.container = document.createElement('div');
        this.setupStyles();
    }

    private setupStyles(): void {
        this.container.classList.add("responsive-page");
    }

    override mount(parent: HTMLElement): void {
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

    override unmount() {
        super.unmount()
    }
}

export { UserConfigPage };
