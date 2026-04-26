import { TextHTML } from "../components/Text/text";

export class HomePage {
    private readonly container: HTMLElement;

    constructor() {
        this.container = document.createElement("div");
        this.setupStyles();
    }

    private setupStyles() {
        this.container.classList.add("responsive-page");
    }

    mount(parent: HTMLElement) {

        const div = document.createElement("div");
        div.classList.add("home-content-box");

        const text = new TextHTML("Home", "text-zinc-600 font-serif text-lg");
        text.mountText(div);

        this.container.appendChild(div);
        parent.appendChild(this.container);
    }
}

