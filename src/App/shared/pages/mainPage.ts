import { CardLogin, html } from "../features/login/ui/cardLogin/card";
import { BaseModel } from "../../../../fox/core/src/module/utils/base.model";
import { Main } from "../../../../fox/main";
import { containerChild, containerMount } from "../utils/functionsDOM"

type MainProps = Record<string, unknown>

export class MainPage extends Main<MainProps> {
    container: HTMLDivElement;

    constructor() {
        super(new BaseModel("div", ""), {})
        this.container = document.createElement("div");
        this.setupStyles();
    }

    setupStyles(): void {
        this.container.classList.add("responsive-page");
    }

    override mount(parent: HTMLElement): void {
        parent.appendChild(this.container);


        const card = new CardLogin(new BaseModel("div", html), {})
        const loginHTML = card.mountCardLogin()
        card.addComponent({
            primary_component: loginHTML,
        })

        const wrapperChild = containerChild("flex flex-grow items-center justify-center w-full", this.container)

        containerMount(card, wrapperChild)
        card.bindLoginButtons(wrapperChild)
    }

    override unmount() {
        super.unmount()
    }
}
