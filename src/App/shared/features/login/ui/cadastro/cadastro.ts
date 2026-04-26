import type { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { Main } from "../../../../../../../fox/main"
import template from "./cadastro.html?raw"
import type { ActionItem } from "../../../../../../../fox/core/src/module/dom/@types/dom.types"
import { parseButton } from "../../../../../../../fox/core/src/module/dom/parseButton"
import { parseInput } from "../../../../../../../fox/core/src/module/dom/parseInput"
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

    async myButton() {
        try {
            const loginServices = new LoginServices(this.valueEmail, this.valuePassword)
            await loginServices.postUser();

            history.pushState({}, "", "/home")
            window.dispatchEvent(new Event('popstate'))
        } catch (error) {
            console.error("Error on register:", error)
            alert("Failed to register. Please check your credentials and try again.")
        }
    }

    bindButtons(domContainer: HTMLElement) {
        parseButton(domContainer, [
            this.myButton.bind(this)
        ])

        parseInput(domContainer, (data: ActionItem) => {
            if (data.id === "email") {
                this.valueEmail = data.value ?? ""
            } else if (data.id === "password") {
                this.valuePassword = data.value ?? ""
            }
        })
    }
}
