import { InputHTML } from "../components/input/input";
import { ButtonHTML } from "../components/button/button";
import { ImageHTML } from "../components/image/image";
import { TextHTML } from "../components/Text/text";

class AboutPage {
    private readonly container: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.setupStyles();
    }

    private setupStyles() {
        this.container.classList.add("responsive-page");
    }

    mount(parent: HTMLElement) {
        parent.appendChild(this.container);

        const formBox = document.createElement("div");
        formBox.className = "about-form-box";

        const header = document.createElement("div");
        header.className = "flex items-center justify-center flex-col";

        const logo = new ImageHTML("/fox-face.png", "fox logo");
        logo.mountImage(header);

        const titleHeader = document.createElement("div");
        titleHeader.className = "flex";

        const textH1 = new TextHTML("Create", "text-4xl text-orange-700 mb-1 font-medium");
        textH1.mountText(titleHeader);

        const spanH1 = new TextHTML("Mother", "text-4xl text-amber-900 mb-1 font-medium");
        spanH1.mountText(titleHeader);

        header.appendChild(titleHeader);

        const subtitle = new TextHTML("Modify your preferences", "text-zinc-600 font-serif text-lg");
        subtitle.mountText(header);

        formBox.appendChild(header);

        const emailInput = new InputHTML("email", "email", "Email Address", "EMAIL_ADDRESS");
        const passInput = new InputHTML("password", "password", "Password", "********");

        emailInput.mountInput(formBox);
        passInput.mountInput(formBox);

        const loginButton = new ButtonHTML("Save Settings", "button_save", "submit");
        loginButton.mountButton(formBox);

        this.container.appendChild(formBox);
    }

    unmount(): void {
        console.log("[Router] Unmounting AboutPage and clearing listeners");
    }
}

export { AboutPage };
