import { Main } from "../../../../../../../fox/main"
import { TextHTML } from "../../../../components/Text/text"
import type { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { parseButton } from "../../../../../../../fox/core/src/module/dom/parseButton"
import { parseInput } from "../../../../../../../fox/core/src/module/dom/parseInput"
import { LoginServices } from "../../services/loginServices"
import type { LoginProps } from "../../@types/LoginProps"

export class Login extends Main<LoginProps> {
    protected readonly loginContainer: HTMLElement
    protected emailValue: string = ""
    protected passwordValue: string = ""

    constructor(baseModel: IBaseModel, props: LoginProps) {
        super(baseModel, props)
        this.loginContainer = document.createElement("div")
    }

    async handleSubmit() {
        const errorMessage = this.loginContainer.querySelector("#error-message");

        try {
            if (errorMessage instanceof HTMLElement) {
                errorMessage.classList.add("hidden");
                errorMessage.textContent = "";
            }

            const loginServices = new LoginServices(this.emailValue, this.passwordValue)
            await loginServices.putUser()

            history.pushState({}, "", "/home")
            window.dispatchEvent(new Event('popstate'))

        } catch (error) {
            console.error("Login error:", error)

            // Keeping for now
            history.pushState({}, "", "/home")
            window.dispatchEvent(new Event('popstate'))

            if (errorMessage instanceof HTMLElement) {
                errorMessage.classList.remove("hidden");
                errorMessage.textContent = "Failed to login. Please check your email and password.";
            }
        }
    }

    handleAdminAccess(domContainer: HTMLElement) {
        const successFeedback = document.createElement("p")
        if (typeof this.props.value === "string" && this.props.value.length > 0) {
            successFeedback.textContent = this.props.value
        } else {
            successFeedback.textContent = "Value not found"
        }
        successFeedback.className = "text-green-500"
        domContainer.appendChild(successFeedback)
    }

    mountLogin() {
        const text = new TextHTML("")
        text.addProps({ text: this.props.h1_primaryText })
        text.addComponent({ par: text.getHTML() })
        text.mount(this.loginContainer)
    }

    bindButtons(domContainer: HTMLElement) {
        parseButton(domContainer, [
            this.handleSubmit.bind(this),
            this.handleAdminAccess.bind(this, domContainer)
        ])

        parseInput(domContainer, (data) => {

            if (data.id === "email") {
                this.emailValue = data.value ?? ""
            } else if (data.id === "password") {
                this.passwordValue = data.value ?? ""
            }

            console.log("Email:", this.emailValue, "Password:", this.passwordValue)

            const output = domContainer.querySelector("#email-input-value")

            if (output) {
                output.textContent = this.emailValue || "Value not found"
            }
        })
    }
}


