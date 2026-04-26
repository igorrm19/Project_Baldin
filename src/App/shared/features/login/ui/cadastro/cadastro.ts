import type { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { Main } from "../../../../../../../fox/main"
import template from "./cadastro.html?raw"
import { parseButton } from "../../../../../../../fox/core/src/module/dom/parseButton"
import { LoginServices } from "../../services/loginServices"

export const html = template

export type CardProps = Record<string, unknown>;

export class Cadastro extends Main<CardProps> {
    containerCadastro: HTMLElement
    valueEmail: string = ""
    valuePassword: string = ""

    constructor(baseModel: IBaseModel, props: CardProps) {
        super(baseModel, props)
        this.containerCadastro = document.createElement("div")
    }

    mountCadastro() {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        this.containerCadastro.replaceChildren(...Array.from(doc.body.childNodes));
    }

    myButton() {
        history.pushState({}, "", "/home")
        window.dispatchEvent(new Event('popstate'))

        const loginServices = new LoginServices(this.valueEmail, this.valuePassword)
        void loginServices.postUser();
    }

    bindButtons(domContainer: HTMLElement) {
        parseButton(domContainer, [
            this.myButton.bind(this)
        ])
    }
}
