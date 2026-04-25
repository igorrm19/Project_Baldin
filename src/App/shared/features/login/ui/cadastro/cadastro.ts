import type { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { Main } from "../../../../../../../fox/main"
import template from "./cadastro.html?raw"
import { parseButton } from "../../../../../../../fox/core/src/module/dom/parseButton"

export const html = template

export type CardProps = Record<string, unknown>;

export class Cadastro extends Main<CardProps> {
    containerCadastro: HTMLElement

    constructor(baseModel: IBaseModel, props: CardProps) {
        super(baseModel, props)
        this.containerCadastro = document.createElement("div")
    }

    mountCadastro() {
        // The template comes from a static HTML asset imported at build time.
        // eslint-disable-next-line no-unsanitized/property
        this.containerCadastro.innerHTML = html
    }

    // Navega para a rota /about programativamente no SPA
    myButton() {
        history.pushState({}, "", "/about")
        window.dispatchEvent(new Event('popstate'))
    }

    // Vincula o myButton aos botões renderizados no DOM
    bindButtons(domContainer: HTMLElement) {
        parseButton(domContainer, [
            this.myButton.bind(this)
        ])
    }
}
