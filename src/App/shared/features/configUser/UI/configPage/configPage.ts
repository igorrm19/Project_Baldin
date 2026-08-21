import { BaseModel } from "../../../../../../../fox/core/src/module/utils/base.model";
import template from "./configPage.html?raw";
import { LoginServices } from "../../../login/services/loginServices";
import { parseButton } from "../../../../../../../fox/core/src/module/dom/parseButton";
import { parseInput } from "../../../../../../../fox/core/src/module/dom/parseInput";

type TUserColor = "bg-gradient-to-r from-rose-700 via-red-700 to-orange-600" | "bg-gradient-to-r from-violet-700 via-blue-700 to-cyan-600" | "bg-gradient-to-r from-emerald-700 via-green-700 to-teal-600" | "bg-gradient-to-r from-fuchsia-700 via-pink-700 to-rose-600" | "bg-gradient-to-r from-amber-700 via-yellow-700 to-orange-600" | "bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600" | "bg-gradient-to-r from-cyan-700 via-blue-700 to-purple-600" | "bg-gradient-to-r from-lime-700 via-green-700 to-teal-600" | "bg-gradient-to-r from-red-700 via-orange-700 to-pink-600";
const ColorsUser: TUserColor[] = ["bg-gradient-to-r from-rose-700 via-red-700 to-orange-600", "bg-gradient-to-r from-violet-700 via-blue-700 to-cyan-600", "bg-gradient-to-r from-emerald-700 via-green-700 to-teal-600", "bg-gradient-to-r from-fuchsia-700 via-pink-700 to-rose-600", "bg-gradient-to-r from-amber-700 via-yellow-700 to-orange-600", "bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600", "bg-gradient-to-r from-cyan-700 via-blue-700 to-purple-600", "bg-gradient-to-r from-lime-700 via-green-700 to-teal-600", "bg-gradient-to-r from-red-700 via-orange-700 to-pink-600"];

class UserConfigComponent extends BaseModel {

    private _userName: string = "User";
    private _userEmail: string = "";
    private _userPassword: string = "";
    private activeDomContainer?: HTMLElement
    private isSubmitting: boolean = false;
    private bindButtons!: (domContainer: HTMLElement) => void;
    private saveNewInfoUser!: () => Promise<void>;

    constructor() {
        super("div", template)
    }

    override mount(parent: HTMLElement): void {
        void this.init(parent);
    }

    private async init(parent: HTMLElement): Promise<void> {
        const randomColor = Math.floor(Math.random() * ColorsUser.length);
        // eslint-disable-next-line security/detect-object-injection
        const color = ColorsUser[randomColor];

        const service = new LoginServices();
        try {
            const userResponse = await service.getUser() as { name?: string, email?: string } | null;
            if (userResponse?.name != null && userResponse.name !== "") {
                this._userName = userResponse.name;
            }
            if (userResponse?.email != null && userResponse.email !== "") {
                this._userEmail = userResponse.email;
            }
        } catch (error) {
            console.error("[UserConfigComponent] Failed to fetch user info:", error);
        }

        this.addProps({
            color,
            user: this._userName,
            emailUser: this._userEmail,
            passwordUser: this._userPassword,
        })

        this.saveNewInfoUser = async () => {
            if (this.isSubmitting) {
                return;
            }

            try {
                this.isSubmitting = true;

                // CORREÇÃO: Passando os dados modificados no construtor da classe de serviço
                // Ordem do construtor: LoginServices(email, password, name)
                const service = new LoginServices(
                    this._userEmail,
                    this._userPassword,
                    this._userName
                );

                // Agora o putUser() terá acesso às propriedades corretas para enviar no body
                const userResponse = await service.putUser() as { name?: string, email?: string } | null;

                if (userResponse?.name != null && userResponse.name !== "") {
                    this._userName = userResponse.name;
                }
                if (userResponse?.email != null && userResponse.email !== "") {
                    this._userEmail = userResponse.email;
                }

                this.addProps({
                    user: this._userName,
                    emailUser: this._userEmail,
                    passwordUser: this._userPassword,
                });

                alert("Deu certo");

            } catch (error) {
                console.error("[UserConfigComponent] Failed to update user info:", error);
                alert("Deu errado");
                throw error;

            } finally {
                this.isSubmitting = false;
            }
        }


        this.bindButtons = (domContainer: HTMLElement): void => {
            this.activeDomContainer = domContainer;
            parseButton(domContainer, [{ id: "saveButton", callback: this.saveNewInfoUser.bind(this) }])

            parseInput(domContainer, (data) => {
                if (data.id === "userName") {
                    this._userName = data.value ?? ""

                } else if (data.id === "userEmail") {
                    this._userEmail = data.value ?? ""

                } else if (data.id === "userPassword") {
                    this._userPassword = data.value ?? ""
                }

                this.addProps({
                    user: this._userName,
                    emailUser: this._userEmail,
                    passwordUser: this._userPassword,
                })

                console.log("User name: ", this._userName, "User email: ", this._userEmail, "User password: ", this._userPassword)

                const outputUserName = domContainer.querySelector("#user-name-value")
                const outputUserEmail = domContainer.querySelector("#user-email-value")
                const outputUserPassword = domContainer.querySelector("#user-password-value")

                if (outputUserName) {
                    /* istanbul ignore next */
                    outputUserName.textContent = this._userName || "Value not found"
                }
                if (outputUserEmail) {
                    /* istanbul ignore next */
                    outputUserEmail.textContent = this._userEmail || "Value not found"
                }
                if (outputUserPassword) {
                    /* istanbul ignore next */
                    outputUserPassword.textContent = this._userPassword || "Value not found"
                }
            })
        }

        super.mount(parent)
        this.bindButtons(parent)
        return;
    }
}

export { UserConfigComponent };

