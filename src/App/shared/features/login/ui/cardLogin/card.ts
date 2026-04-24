import { Login } from "../login/login"
import type { LoginProps } from "../../@types/LoginProps"
import { Main } from "../../../../../../../fox/main"
import { BaseModel } from "../../../../../../../fox/core/src/module/utils/base.model"
import type { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import loginTemplate from "../login/login.html?raw"
import template from "./card.html?raw"
import { parseHTML } from "../../../../../../../fox/core/src/module/dom/parserDiv"
export const html = template

export type CardProps = Record<string, unknown>;

export class CardLogin extends Main<CardProps> {
    containerCardLogin: HTMLElement
    private loginInstance: Login | null = null
    nome: string = ""

    constructor(baseModel: IBaseModel, props: CardProps) {
        super(baseModel, props)
        this.containerCardLogin = document.createElement("div")
    }

    mountCardLogin(): string {
        const props: LoginProps = {
            h1_primaryText: `Fox ${this.nome}`,
            h3_secondaryText: "Please login to continue",
            label_thirdText: "Email",
            label_fourthText: "Password",
        };

        const login = new Login(new BaseModel("form", loginTemplate), props)
        login.mountLogin()

        // Guarda a instância para usar no bindLoginButtons
        this.loginInstance = login

        const loginHTML = login.getHTML()
        // Teste do parseHTML movido para dentro do método (não pode ficar solto na classe)
        parseHTML(loginHTML).forEach(div => {
            console.log(div.parent?.innerText)
            this.nome = div.parent?.innerText || ""

        })

        return loginHTML
    }

    bindLoginButtons(domContainer: HTMLElement) {
        if (this.loginInstance) {
            this.loginInstance.bindButtons(domContainer)
        }
    }
}
