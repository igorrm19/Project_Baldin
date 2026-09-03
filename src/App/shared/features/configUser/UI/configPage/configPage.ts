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

                const outputStatus = document.querySelector("#Status")
                if (outputStatus) {
                    /* istanbul ignore next */

                    outputStatus.textContent = "sucesso"
                    outputStatus.classList = "text-green-500 m-2"

                    setTimeout(() => {
                        outputStatus.textContent = ""
                        outputStatus.classList = "hidden"
                    }, 3000)
                }

            } catch (error) {
                const outputStatus = document.querySelector("#Status")
                if (outputStatus) {
                    /* istanbul ignore next */
                    outputStatus.textContent = "Failed"
                    outputStatus.classList = "text-red-500 m2"
                }

                setTimeout(() => {
                    if (outputStatus) {
                        outputStatus.textContent = ""
                        outputStatus.classList = "hidden"
                    }

                }, 3000)

                console.error("[UserConfigComponent] Failed to update user info:", error);
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

            })
        }

        super.mount(parent)
        this.bindButtons(parent)
        return;
    }

    override unmount(): void {
        super.unmount()
    }
}

export { UserConfigComponent };

