import { BaseModel } from "../../../../fox/core/src/module/utils/base.model";
import { CardLogin, html } from "../features/login/ui/cardLogin/card";
import type { ActionItem } from "../../../action.stack";
import { actionStack } from "../../../action.stack";

class AboutPage {
    // Em vez de pegar o 'app', criamos um container próprio para a página
    private readonly container: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.setupStyles();
    }

    private setupStyles() {
        this.container.style.cssText = `
            height: 100vh; 
            width: 100vw; 
            display: flex; 
            flex-direction: column;
            justify-content: center; 
            align-items: center; 
            background: linear-gradient(135deg, #1a1a1a, #ff6600, #ff9900); 
            color: white; 
            font-family: Arial, sans-serif;
        `;
    }

    mount(parent: HTMLElement) {
        parent.appendChild(this.container);

        const card = new CardLogin(new BaseModel("div", html), {});
        const loginHTML = card.mountCardLogin(this.container);

        card.addComponent({
            primary_component: loginHTML,
        });

        card.mount(this.container);

        const button = document.createElement("button")
        button.textContent = "Click"
        button.className = "bg-blue-600 text-white px-4 py-2 mt-4 cursor-pointer hover:bg-blue-700 transition-colors rounded-full w-[15vh] h-[5vh]"
        button.onclick = () => {
            const actionItem: ActionItem = {
                id: "primary_component",
                action: "click",
                tagName: "button"
            }
            actionStack.push(actionItem)
            console.log(actionStack.getAll())
        }
        this.container.appendChild(button)
    }
}

export { AboutPage };
