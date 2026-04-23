import { Main } from "../../../../../../../fox/main"
import { TextHTML } from "../../../../components/Text/text"
import type { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { parseButton } from "../../../../../../../fox/core/src/module/dom/parseButton"
import { parseInput } from "../../../../../../../fox/core/src/module/dom/parseInput"

export interface LoginProps extends Record<string, unknown> {
    h1_primaryText: string;
    h3_secondaryText: string;
    label_thirdText: string;
    label_fourthText: string;
}

export class Login extends Main<LoginProps> {
    protected readonly containerLogin: HTMLElement
    protected valueEmail: string = ""
    protected valuePassword: string = ""

    constructor(baseModel: IBaseModel, props: LoginProps) {
        super(baseModel, props)
        this.containerLogin = document.createElement("div")
    }

    myButton() {
        history.pushState({}, "", "/home")
        window.dispatchEvent(new Event('popstate'))

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.valueEmail,
                password: this.valuePassword
            })
        }).then((response) => {
            console.log(this.valueEmail, this.valuePassword)
            if (response.ok) {
                console.log("Login successful")
            } else {
                console.log("Login failed")
            }
        })
    }

    myButton2(domContainer: HTMLElement) {
        const sucesso = document.createElement("p")
        if (this.props.value) {
            sucesso.textContent = this.props.value as string
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


