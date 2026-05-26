import { BaseModel } from "../../../../../../../fox/core/src/module/utils/base.model";
import templete from "./configPage.html?raw";
import { LoginServices } from "../../../login/services/loginServices";

type TUserColor = "bg-gradient-to-r from-rose-700 via-red-700 to-orange-600" | "bg-gradient-to-r from-violet-700 via-blue-700 to-cyan-600" | "bg-gradient-to-r from-emerald-700 via-green-700 to-teal-600" | "bg-gradient-to-r from-fuchsia-700 via-pink-700 to-rose-600" | "bg-gradient-to-r from-amber-700 via-yellow-700 to-orange-600" | "bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600" | "bg-gradient-to-r from-cyan-700 via-blue-700 to-purple-600" | "bg-gradient-to-r from-lime-700 via-green-700 to-teal-600" | "bg-gradient-to-r from-red-700 via-orange-700 to-pink-600";
const ColorsUser: TUserColor[] = ["bg-gradient-to-r from-rose-700 via-red-700 to-orange-600", "bg-gradient-to-r from-violet-700 via-blue-700 to-cyan-600", "bg-gradient-to-r from-emerald-700 via-green-700 to-teal-600", "bg-gradient-to-r from-fuchsia-700 via-pink-700 to-rose-600", "bg-gradient-to-r from-amber-700 via-yellow-700 to-orange-600", "bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600", "bg-gradient-to-r from-cyan-700 via-blue-700 to-purple-600", "bg-gradient-to-r from-lime-700 via-green-700 to-teal-600", "bg-gradient-to-r from-red-700 via-orange-700 to-pink-600"];

class UserConfigComponent extends BaseModel {

    private _userName: string = "User";
    private _userEmail: string = "";

    constructor() {
        super("div", templete)
    }

    override mount(parent: HTMLElement) {
        void this.init(parent);
    }

    private async init(parent: HTMLElement) {
        const randomColor = Math.floor(Math.random() * ColorsUser.length);
        const color = ColorsUser[randomColor];

        const service = new LoginServices();
        try {
            const userResponse = await service.getUser() as { name?: string, email?: string } | null;
            if (userResponse?.name) {
                this._userName = userResponse.name;
            }
            if (userResponse?.email) {
                this._userEmail = userResponse.email;
            }
        } catch (error) {
            console.error("[UserConfigComponent] Failed to fetch user info:", error);
        }

        this.addProps({
            color,
            user: this._userName,
            emailUser: this._userEmail

        })

        super.mount(parent)
        return;
    }

}

export { UserConfigComponent };
