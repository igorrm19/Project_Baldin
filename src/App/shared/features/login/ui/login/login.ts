import { Main } from "../../../../../../../fox/main"
import { TextHTML } from "../../../../components/Text/text"
import type { IBaseModel } from "../../../../../../../fox/core/src/module/utils/interfaces/interface.baseModel"

export interface LoginProps extends Record<string, unknown> {
    h1_primaryText: string;
    h3_secondaryText: string;
    label_thirdText: string;
    label_fourthText: string;
}

export class Login extends Main<LoginProps> {
    containerLogin: HTMLElement

    constructor(baseModel: IBaseModel, props: LoginProps) {
        super(baseModel, props)
        this.containerLogin = document.createElement("div")
    }


    mountLogin(parent: HTMLElement) {
        parent.appendChild(this.containerLogin.cloneNode(true))

        const text = new TextHTML()
        text.addProps({
            text: ""
        })


        text.addComponent({
            par: text.getHTML()
        })

        text.mount(this.containerLogin)
    }

}

