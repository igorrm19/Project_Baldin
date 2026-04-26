import { Main } from "../../../../../../../fox/main"
import { TextHTML } from "../../../../components/Text/text"
import type { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { parseButton } from "../../../../../../../fox/core/src/module/dom/parseButton"
import { parseInput } from "../../../../../../../fox/core/src/module/dom/parseInput"
import { LoginServices } from "../../services/loginServices"
import type { LoginProps } from "../../@types/LoginProps"

export class Login extends Main<LoginProps> {
    protected readonly containerLogin: HTMLElement
    protected valueEmail: string = ""
    protected valuePassword: string = ""

    constructor(baseModel: IBaseModel, props: LoginProps) {
        super(baseModel, props)
        this.containerLogin = document.createElement("div")
    }

    async myButton() {
        try {
            const loginServices = new LoginServices(this.valueEmail, this.valuePassword)
            await loginServices.putUser()

            history.pushState({}, "", "/home")
            window.dispatchEvent(new Event('popstate'))
        } catch (error) {
            console.error("Erro no login:", error)
            alert("Falha ao realizar o login. Verifique seu email e senha.")
        }
    }

    myButton2(domContainer: HTMLElement) {
        const sucesso = document.createElement("p")
        if (typeof this.props.value === "string" && this.props.value.length > 0) {
            sucesso.textContent = this.props.value
        } else {
            sucesso.textContent = "Value not found"
        }
        sucesso.className = "text-green-500"
        domContainer.appendChild(sucesso)
    }

    mountLogin() {
        const text = new TextHTML("")
        text.addProps({ text: this.props.h1_primaryText })
        text.addComponent({ par: text.getHTML() })
        text.mount(this.containerLogin)
    }

    bindButtons(domContainer: HTMLElement) {
        parseButton(domContainer, [
            this.myButton.bind(this),
            this.myButton2.bind(this, domContainer)
        ])

        parseInput(domContainer, (data) => {

            if (data.id === "email") {
                this.valueEmail = data.value ?? ""
            } else if (data.id === "password") {
                this.valuePassword = data.value ?? ""
            }

            console.log("Email:", this.valueEmail, "Password:", this.valuePassword)

            const output = domContainer.querySelector("#valor_input_email")

            if (output) {
                output.textContent = this.valueEmail || "Value not found"
            }
        })
    }
}


