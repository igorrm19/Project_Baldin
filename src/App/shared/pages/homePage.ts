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

        const div2 = document.createElement("div");
        div2.classList.add("home-content-box-2", "flex", "flex-col", "items-center", "justify-center", "bg-black", "w-1/2", "h-1/2");
        div.appendChild(div2);

        const text = new TextHTML("Home", "text-zinc-100 font-serif text-lg");
        text.mountText(div2);

        this.container.appendChild(div);
        parent.appendChild(this.container);
    }

    unmount(): void {
        console.log("[Router] Unmounting HomePage and clearing listeners");
    }
}

