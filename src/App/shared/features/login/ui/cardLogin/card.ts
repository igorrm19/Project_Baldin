import { Login } from "../login/login"
import type { LoginProps } from "../login/login"
import { Main } from "../../../../../../../fox/main"
import { BaseModel } from "../../../../../../../fox/core/src/module/utils/base.model"
import type { IBaseModel } from "../../../../../../../fox/core/src/module/utils/interfaces/interface.baseModel"
import loginTemplate from "../login/login.html?raw"
import template from "./card.html?raw"
export const html = template

export interface CardProps extends Record<string, unknown> { }

export class CardLogin extends Main<CardProps> {
    containerCardLogin: HTMLElement

    constructor(baseModel: IBaseModel, props: CardProps) {
        super(baseModel, props)
        this.containerCardLogin = document.createElement("div")
    }

    mountCardLogin(parent: HTMLElement): string {
        parent.appendChild(this.containerCardLogin)

        const props: LoginProps = {
            h1_primaryText: "Fox",
            h3_secondaryText: "Please login to continue",
            label_thirdText: "Email",
            label_fourthText: "Password",
        };

        const login = new Login(new BaseModel("form", loginTemplate), props)

        login.mountLogin(this.containerCardLogin)

        const loginHTML = login.getHTML()

        return loginHTML
    }


}

