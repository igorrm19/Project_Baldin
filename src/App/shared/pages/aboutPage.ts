import { InputHTML } from "../components/input/input";
import { ButtonHTML } from "../components/button/button";
import { ImageHTML } from "../components/image/image";
import { TextHTML } from "../components/Text/text";
import { HeaderComponent } from "../UI/Header/header";
import { FooterComponent } from "../UI/Footer/footer";

class AboutPage {
    private readonly container: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.setupStyles();
    }

    private setupStyles(): void {
        this.container.classList.add("responsive-page");
    }

    mount(parent: HTMLElement): void {
        parent.appendChild(this.container);

        const header = new HeaderComponent();
        void header.mount(this.container);

        const formBox = document.createElement("div");
        formBox.className = "about-form-box";

        const headerBox = document.createElement("div");
        headerBox.className = "flex items-center justify-center flex-col";

        const logo = new ImageHTML("/fox-face.png", "fox logo");
        logo.mountImage(headerBox);

        const titleHeader = document.createElement("div");
        titleHeader.className = "flex";

        const textH1 = new TextHTML("Create", "text-4xl text-orange-700 mb-1 font-medium");
        textH1.mountText(titleHeader);

        const spanH1 = new TextHTML("Mother", "text-4xl text-amber-900 mb-1 font-medium");
        spanH1.mountText(titleHeader);

        headerBox.appendChild(titleHeader);

        const subtitle = new TextHTML("Modify your preferences", "text-zinc-600 font-serif text-lg");
        subtitle.mountText(headerBox);

        formBox.appendChild(headerBox);

        const emailInput = new InputHTML("email", "email", "Email Address", "EMAIL_ADDRESS", "w-full px-7 py-4 rounded-lg focus:outline-none border-none placeholder-gray-500 bg-transparent text-[#1e1e1e]");
        const passInput = new InputHTML("password", "password", "Password", "********", "w-full px-7 py-4 rounded-lg focus:outline-none border-none placeholder-gray-500 bg-transparent text-[#1e1e1e]");

        emailInput.mountInput(formBox);
        passInput.mountInput(formBox);

        const loginButton = new ButtonHTML("Save Settings", "button_save", "submit");
        loginButton.mountButton(formBox);

        //Footer component
        const footer = new FooterComponent();
        footer.mount(this.container);

        this.container.appendChild(formBox);
    }

    unmount(): void {
        console.log("[Router] Unmounting AboutPage and clearing listeners");
    }
}

export { AboutPage };
