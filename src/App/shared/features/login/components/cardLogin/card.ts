import { Login } from "../../ui/login/login"
import type { LoginProps } from "../../@types/LoginProps"
import { Main } from "../../../../../../../fox/main"
import { BaseModel } from "../../../../../../../fox/core/src/module/utils/base.model"
import type { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import loginTemplate from "../../ui/login/login.html?raw"
import template from "./card.html?raw"
import { parseHTML } from "../../../../../../../fox/core/src/module/dom/parserDiv"
export const html = template

export type CardProps = Record<string, unknown>;

export class CardLogin extends Main<CardProps> {
    containerCardLogin: HTMLElement
    private loginInstance: Login | null = null
    name: string = ""

    constructor(baseModel: IBaseModel, props: CardProps) {
        super(baseModel, props)
        this.containerCardLogin = document.createElement("div")
    }

    mountCardLogin(): string {
        const props: LoginProps = {
            h1_primaryText: `Fox ${this.name}`,
            h3_secondaryText: "Please login to continue",
            label_thirdText: "Email",
            label_fourthText: "Password",
        };

        const login = new Login(new BaseModel("form", loginTemplate), props)
        login.mountLogin()

        // Keep the instance for use in bindLoginButtons
        this.loginInstance = login

        const loginHTML = login.getHTML()
        // Test parseHTML inside the method
        parseHTML(loginHTML).forEach(div => {
            console.log(div.parent?.innerText)
            this.name = div.parent?.innerText ?? ""

        })

        return loginHTML
    }

    bindLoginButtons(domContainer: HTMLElement) {
        if (this.loginInstance) {
            this.loginInstance.bindButtons(domContainer)
        }
    }
}
