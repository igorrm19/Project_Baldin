import { HeaderComponent } from "../UI/Header/header";
import { FooterComponent } from "../UI/Footer/footer";
import { UserConfigComponent } from "../features/configUser/UI/configPage/configPage";
import { BaseModel } from "../../../../fox/core/src/module/utils/base.model";
import { Main } from "../../../../fox/main";
import { containerChild, containerMount } from "../utils/functionsDOM"

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

        const headerChild = containerChild("w-full z-50 sticky top-0", this.container)
        const configChild = containerChild("flex flex-grow items-center justify-center w-full py-16", this.container)
        const footerChild = containerChild("w-full mt-auto", this.container)

        containerMount(new HeaderComponent(), headerChild)
        containerMount(new UserConfigComponent(), configChild)
        containerMount(new FooterComponent(), footerChild)
    }

    override unmount() {
        super.unmount()
    }
}

export { UserConfigPage };
