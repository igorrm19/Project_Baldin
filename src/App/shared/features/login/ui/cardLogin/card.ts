
import template from "./card.html?raw"
//import { ContrutorCardLogin } from "./construtor"
import { Login } from "../login/login"
import { Main } from "../../../../../../../fox/main"

// responsavel por implementar outros componentes

export interface Template {
    template: string
}

export const html = template

export class CardLogin extends Main {
    containerCardLogin: HTMLElement

    constructor() {
        super("div", template)
        this.containerCardLogin = document.createElement("div")
    }

    mountCardLogin(parent: HTMLElement): string {
        parent.appendChild(this.containerCardLogin)

        const login = new Login()

        login.addProps({
            h1_primaryText: "Fox",
            h3_secondaryText: "Please login to continue",
            label_thirdText: "Email",
            label_fourthText: "Password",
        })

        login.mountLogin(this.containerCardLogin)


        const loginHTML = login.getHTML()

        return loginHTML
    }


}

