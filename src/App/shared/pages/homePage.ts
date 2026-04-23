import { TextHTML } from "../components/Text/text";

export class HomePage {
    private readonly container: HTMLElement;

    constructor() {
        this.container = document.createElement("div");
        this.setupStyles();
    }

    private setupStyles() {
        this.container.classList.add("h-screen", "w-screen", "bg-gradient-to-br", "from-neutral-950", "via-orange-800", "to-orange-600", "flex", "items-center", "justify-center", "flex-col");
    }

    mount(parent: HTMLElement) {

        const div = document.createElement("div");
        div.classList.add("flex", "items-center", "justify-center", "flex-col", "gap-2", "p-4", "rounded-lg", "bg-white", "w-1/2", "h-1/2");

        const text = new TextHTML("Home", "text-zinc-600 font-serif text-lg");
        text.mountText(div);

        this.container.appendChild(div);
        parent.appendChild(this.container);
    }
}

