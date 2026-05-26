import { BaseModel } from "../../../../fox/core/src/module/utils/base.model";
import { Cadastro, html as registrationHTML } from "../features/login/ui/cadastro/cadastro";
import { CardLogin, html as cardHTML } from "../features/login/ui/cardLogin/card";
import { TextHTML } from "../components/Text/text";
import { Main } from "../../../../fox/main";

export type CadastroProps = Record<string, unknown>;

export class CadastroPage extends Main<CadastroProps> {
    private readonly container: HTMLDivElement;

    constructor() {
        super(new BaseModel("div", ""), {});
        this.container = document.createElement("div");
        this.setupStyles();
    }

    setupStyles(): void {
        this.container.classList.add("responsive-page");
    }

    override mount(parent: HTMLElement): void {
        parent.appendChild(this.container);

        const cadastro = new Cadastro(new BaseModel("div", registrationHTML), {});
        cadastro.mountRegistration();

        const subtitle = new TextHTML("Modify your preferences", "text-zinc-600 font-serif text-lg");
        subtitle.mountText(this.container);

        const cardLogin = new CardLogin(new BaseModel("div", cardHTML), {});
        cardLogin.addComponent({
            primary_component: cadastro.getHTML(),
            secondary_component: subtitle.getHTML(),
        });

        const wrapper = document.createElement("div");
        wrapper.className = "flex flex-grow items-center justify-center w-full py-10";
        this.container.appendChild(wrapper);

        cardLogin.mount(wrapper);

        cadastro.bindButtons(wrapper);
    }

    unmount(): void {
        console.log("[Router] Unmounting CadastroPage and clearing listeners");
    }
}
