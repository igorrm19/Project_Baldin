import type { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { Main } from "../../../../../../../fox/main"
import template from "./cadastro.html?raw"
import type { ActionItem } from "../../../../../../../fox/core/src/module/dom/@types/dom.types"
import { parseButton } from "../../../../../../../fox/core/src/module/dom/parseButton"
import { parseInput } from "../../../../../../../fox/core/src/module/dom/parseInput"
import { LoginServices } from "../../services/loginServices"

/* istanbul ignore next */
export const html: string = (typeof template === 'string' ? template : (template as unknown as { default: string })?.default) || "<div></div>"

export type CardProps = Record<string, unknown>;

export class Cadastro extends Main<CardProps> {
    registrationContainer: HTMLElement
    emailValue: string = ""
    passwordValue: string = ""
    private isSubmitting: boolean = false

    constructor(baseModel: IBaseModel, props: CardProps) {
        super(baseModel, props)
        this.registrationContainer = document.createElement("div")
    }

    mountRegistration() {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        this.registrationContainer.replaceChildren(...Array.from(doc.body.childNodes));
    }

    async handleSubmit() {
        if (this.isSubmitting) return;

        const errorMessage = this.registrationContainer.querySelector("#error-message");
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
                errorEl.textContent = "";
            }

            const loginServices = new LoginServices(this.emailValue, this.passwordValue)
            await loginServices.postUser();

            history.pushState({}, "", "/home")
            window.dispatchEvent(new Event('popstate'))
        } catch (error: unknown) {
            console.error("Error on register:", error)

            if (errorEl) {
                errorEl.classList.remove("hidden");
                errorEl.textContent = error instanceof Error && error.message !== "Network error"
                    ? error.message
                    : "Failed to register. Please check your credentials and try again.";
            }
        } finally {
            this.isSubmitting = false;
        }
    }

    bindButtons(domContainer: HTMLElement) {
        // Bind primary and secondary button clicks
        parseButton(domContainer, [
            this.handleSubmit.bind(this),
            this.handleAdminAccess.bind(this)
        ])

        // Sync input values with class properties
        parseInput(domContainer, (data: ActionItem) => {
            if (data.id === "email") {
                /* istanbul ignore next */
                this.emailValue = data.value ?? ""
            } else if (data.id === "password") {
                /* istanbul ignore next */
                this.passwordValue = data.value ?? ""
            }
        })
    }

    handleAdminAccess() {
        console.log("Admin access triggered")
    }
}
