import type { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { Main } from "../../../../../../../fox/main"
import template from "./cadastro.html?raw"

export const html = template

export interface CardProps extends Record<string, unknown> { }

export class Cadastro extends Main<CardProps> {
    containerCadastro: HTMLElement

    constructor(baseModel: IBaseModel, props: CardProps) {
        super(baseModel, props)
        this.containerCadastro = document.createElement("div")
    }

    mountCadastro() {
        this.containerCadastro.innerHTML = html
    }
}
