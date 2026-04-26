import { CardLogin, html } from "../features/login/ui/cardLogin/card";
import { BaseModel } from "../../../../fox/core/src/module/utils/base.model";

export class MainPage {
    container: HTMLDivElement;

    constructor() {
        this.container = document.createElement("div");
        this.setupStyles();
    }

    setupStyles() {
        this.container.classList.add("responsive-page");
    }

    mount(parent: HTMLElement) {
        parent.appendChild(this.container);


        const card = new CardLogin(new BaseModel("div", html), {})
        const loginHTML = card.mountCardLogin()
        card.addComponent({
            primary_component: loginHTML,
        })
        card.mount(this.container)
        card.bindLoginButtons(this.container)
    }
}

