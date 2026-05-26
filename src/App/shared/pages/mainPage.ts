import { CardLogin, html } from "../features/login/ui/cardLogin/card";
import { BaseModel } from "../../../../fox/core/src/module/utils/base.model";

export class MainPage {
    container: HTMLDivElement;

    constructor() {
        this.container = document.createElement("div");
        this.setupStyles();
    }

    setupStyles(): void {
        this.container.classList.add("responsive-page");
    }

    mount(parent: HTMLElement): void {
        parent.appendChild(this.container);


        const card = new CardLogin(new BaseModel("div", html), {})
        const loginHTML = card.mountCardLogin()
        card.addComponent({
            primary_component: loginHTML,
        })
        const wrapper = document.createElement("div");
        wrapper.className = "flex flex-grow items-center justify-center w-full";
        this.container.appendChild(wrapper);

        card.mount(wrapper)
        card.bindLoginButtons(wrapper)
    }

    unmount(): void {
        console.log("[Router] Unmounting MainPage and clearing listeners");
    }
}
