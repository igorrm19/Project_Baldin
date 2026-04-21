import { CardLogin } from "../features/login/ui/cardLogin/card";
import { BaseModel } from "../../../../fox/core/src/module/utils/base.model";
import { html } from "../features/login/ui/cardLogin/card";

export class MainPage {
    container: HTMLDivElement;

    constructor() {
        this.container = document.createElement("div");
        this.container.className = "h-screen w-screen bg-gradient-to-br from-neutral-950 via-orange-800 to-orange-600 flex items-center justify-center flex-col";
    }

    mount(parent: HTMLElement) {
        parent.appendChild(this.container);


        const card = new CardLogin(new BaseModel("div", html), {}) // creates a div
        const loginHTML = card.mountCardLogin(this.container)
        card.addComponent({
            primary_component: loginHTML,
        })
        card.mount(this.container) // mounts on the screen
    }
}

