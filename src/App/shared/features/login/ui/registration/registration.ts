import type { IBaseModel } from "../../../../../../../fox/core/src/@types/base.model.interface"
import { Main } from "../../../../../../../fox/main"
import template from "./registration.html?raw"
import type { ActionItem } from "../../../../../../../fox/core/src/module/dom/@types/dom.types"
import { parseButton } from "../../../../../../../fox/core/src/module/dom/parseButton"
import { parseInput } from "../../../../../../../fox/core/src/module/dom/parseInput"
import { LoginServices } from "../../services/loginServices"

export const html = template

export type CardProps = Record<string, unknown>;

export class Registration extends Main<CardProps> {
    registrationContainer: HTMLElement
    emailValue: string = ""
    passwordValue: string = ""

    constructor(baseModel: IBaseModel, props: CardProps) {
        super(baseModel, props)
        this.registrationContainer = document.createElement("div")
    }

    mountRegistration() {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        this.registrationContainer.replaceChildren(...Array.from(doc.body.childNodes));
    }

    async handleSubmit() {
        const errorMessage = this.registrationContainer.querySelector("#error-message");

        try {
            if (errorMessage instanceof HTMLElement) {
                errorMessage.classList.add("hidden");
                errorMessage.textContent = "";
            }

            const loginServices = new LoginServices(this.emailValue, this.passwordValue)
            await loginServices.postUser();

            history.pushState({}, "", "/home")
            window.dispatchEvent(new Event('popstate'))
        } catch (error) {
            console.error("Error on register:", error)

            if (errorMessage instanceof HTMLElement) {
                errorMessage.classList.remove("hidden");
                errorMessage.textContent = "Failed to register. Please check your credentials and try again.";
            }
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
                this.emailValue = data.value ?? ""
            } else if (data.id === "password") {
                this.passwordValue = data.value ?? ""
            }
        })
    }

    handleAdminAccess() {
        console.log("Admin access triggered")
    }
}
