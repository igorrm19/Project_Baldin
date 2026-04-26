import { BaseModel } from "../../../../fox/core/src/module/utils/base.model";
import { Registration, html as registrationHTML } from "../features/login/ui/registration/registration";
import { CardLogin, html as cardHTML } from "../features/login/components/cardLogin/card";
import { TextHTML } from "../components/Text/text";
import { Main } from "../../../../fox/main";

export type RegistrationProps = Record<string, unknown>;

export class RegistrationPage extends Main<RegistrationProps> {
    private readonly container: HTMLDivElement;

    constructor() {
        super(new BaseModel("div", ""), {});
        this.container = document.createElement("div");
        this.setupStyles();
    }

    setupStyles() {
        this.container.classList.add("responsive-page");
    }

    mount(parent: HTMLElement) {
        parent.appendChild(this.container);

        const registration = new Registration(new BaseModel("div", registrationHTML), {});
        registration.mountRegistration();

        const subtitle = new TextHTML("Modify your preferences", "text-zinc-600 font-serif text-lg");
        subtitle.mountText(this.container);

        const cardLogin = new CardLogin(new BaseModel("div", cardHTML), {});
        cardLogin.addComponent({
            primary_component: registration.getHTML(),
            secondary_component: subtitle.getHTML(),
        });

        cardLogin.mount(this.container);

        registration.bindButtons(this.container);
    }
}
