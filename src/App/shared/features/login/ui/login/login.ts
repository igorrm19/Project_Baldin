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
    private isSubmitting: boolean = false
    private activeDomContainer?: HTMLElement

    constructor(baseModel: IBaseModel, props: LoginProps) {
        super(baseModel, props)
        this.loginContainer = document.createElement("div")
    }

    async handleSubmit(): Promise<void> {
        if (this.isSubmitting) return;

        const errorMessage = this.activeDomContainer?.querySelector("#error-message") || this.loginContainer.querySelector("#error-message");
        const errorEl = errorMessage as HTMLElement | null;

        if (!this.emailValue || this.passwordValue.length < 6) {
            if (errorEl) {
                errorEl.classList.remove("hidden");
                errorEl.textContent = "Please fill in the email and a password of at least 6 characters.";
            }
            return;
        }

        this.isSubmitting = true;

        try {
            if (errorEl) {
                errorEl.classList.add("hidden");
                errorEl.classList.remove("text-red-500", "text-green-500");
                errorEl.textContent = "";
            }

            const loginServices = new LoginServices(this.emailValue, this.passwordValue)
            await loginServices.loginUser()

            if (errorEl) {
                errorEl.textContent = "Logged in successfully.";
                errorEl.classList.add("text-green-500");
                errorEl.classList.remove("hidden");
            }

            setTimeout(() => {
                history.pushState({}, "", "/home")
                window.dispatchEvent(new Event('popstate'))
            }, 800)

        } catch (error: unknown) {
            console.error("Login error:", error)

            if (errorEl) {
                errorEl.classList.add("text-red-500");
                errorEl.classList.remove("hidden");
                errorEl.textContent = "Failed to login. Please check your credentials.";
            }
        } finally {
            this.isSubmitting = false;
        }
    }

    handleAdminAccess(domContainer: HTMLElement): void {
        const successFeedback = document.createElement("p")
        if (typeof this.props.value === "string" && this.props.value.length > 0) {
            successFeedback.textContent = this.props.value
        } else {
            successFeedback.textContent = "Value not found"
        }
        successFeedback.className = "text-green-500"
        domContainer.appendChild(successFeedback)
    }

    mountLogin(): void {
        const text = new TextHTML("")
        text.addProps({ text: this.props.h1_primaryText })
        text.addComponent({ par: text.getHTML() })
        text.mount(this.loginContainer)
    }

    bindButtons(domContainer: HTMLElement): void {
        this.activeDomContainer = domContainer;
        parseButton(domContainer, [
            this.handleSubmit.bind(this),
            this.handleAdminAccess.bind(this, domContainer)
        ])

        parseInput(domContainer, (data) => {

            if (data.id === "email") {
                /* istanbul ignore next */
                this.emailValue = data.value ?? ""
            } else if (data.id === "password") {
                /* istanbul ignore next */
                this.passwordValue = data.value ?? ""
            }

            console.log("Email:", this.emailValue, "Password:", this.passwordValue)

            const output = domContainer.querySelector("#email-input-value")

            if (output) {
                /* istanbul ignore next */
                output.textContent = this.emailValue || "Value not found"
            }
        })
    }
}


