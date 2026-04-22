import { Main } from "../../../../../../../fox/main"
import { TextHTML } from "../../../../components/Text/text"
import type { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { parseButton } from "../../../../../../../fox/core/src/module/dom/parseButton"

export interface LoginProps extends Record<string, unknown> {
    h1_primaryText: string;
    h3_secondaryText: string;
    label_thirdText: string;
    label_fourthText: string;
}

export class Login extends Main<LoginProps> {
    protected readonly containerLogin: HTMLElement

    constructor(baseModel: IBaseModel, props: LoginProps) {
        super(baseModel, props)
        this.containerLogin = document.createElement("div")
    }

    // Evento de clique real para navegação SPA (Login)
    myButton() {
        history.pushState({}, "", "/about")
        window.dispatchEvent(new Event('popstate'))
    }

    myButton2(domContainer: HTMLElement) {
        const sucesso = document.createElement("p")
        sucesso.textContent = "Sucesso 2"
        sucesso.className = "text-green-500"
        domContainer.appendChild(sucesso)
    }

    mountLogin() {
        const text = new TextHTML()
        text.addProps({ text: "" })
        text.addComponent({ par: text.getHTML() })
        text.mount(this.containerLogin)
    }

    /**
     * bindButtons deve ser chamado APÓS o HTML ser inserido no DOM real.
     * Recebe o container do DOM real (ex: o elemento #app ou o div do card),
     * e vincula os event listeners nos botões encontrados.
     */
    bindButtons(domContainer: HTMLElement) {
        parseButton(domContainer, [
            this.myButton.bind(this),
            this.myButton2.bind(this, domContainer)
        ])
    }

}
