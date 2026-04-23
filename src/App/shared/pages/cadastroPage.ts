import { BaseModel } from "../../../../fox/core/src/module/utils/base.model";
import { Cadastro, html as cadastroHTML } from "../features/login/ui/cadastro/cadastro";
import { CardLogin, html as cardHTML } from "../features/login/ui/cardLogin/card";
import { TextHTML } from "../components/Text/text";
import { Main } from "../../../../fox/main";

export interface CadastroProps extends Record<string, unknown> { }

export class CadastroPage extends Main<CadastroProps> {
    private readonly container: HTMLDivElement;

    constructor() {
        super(new BaseModel("div", ""), {});
        // Utilizamos a mesma estrutura que MainPage ou as demais pages
        this.container = document.createElement("div");
        this.setupStyles();
    }

    setupStyles() {
        this.container.classList.add("h-screen", "w-screen", "bg-gradient-to-br", "from-neutral-950", "via-orange-800", "to-orange-600", "flex", "items-center", "justify-center", "flex-col");
    }

    mount(parent: HTMLElement) {
        parent.appendChild(this.container);

        // 1. Instancia o componente de cadastro
        const cadastro = new Cadastro(new BaseModel("div", cadastroHTML), {});
        cadastro.mountCadastro();

        const subtitle = new TextHTML("Modify your preferences", "text-zinc-600 font-serif text-lg");
        subtitle.mountText(this.container);

        // 2. Instancia o invólucro (Card wrapper) e substitui o conteúdo interno dele
        // chamando addComponent e injetando o HTML do cadastro lá dentro
        const cardLogin = new CardLogin(new BaseModel("div", cardHTML), {});
        cardLogin.addComponent({
            primary_component: cadastro.getHTML(),
            secondary_component: subtitle.getHTML(),
        });

        // 3. Renderiza o card, que já contém o cadastro lá dentro, no DOM
        cardLogin.mount(this.container);

        // 4. Vincula os botões renderizados no DOM às funções mapeadas pelo componente
        cadastro.bindButtons(this.container);
    }
}
