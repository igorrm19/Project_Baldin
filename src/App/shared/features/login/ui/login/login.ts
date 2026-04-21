
import template from "./login.html?raw"
import { Main } from "../../../../../../../fox/main"    
import { TextHTML } from "../../../../components/Text/text"
//import { BaseModel } from "../../../../../../../fox/core/src/module/utils/base.model"

// responsavel por implementar outros componentes

export class Login extends Main {
    containerLogin: HTMLElement

    constructor() {
        super("form", template)
        this.containerLogin = document.createElement("div")
        //this.baseModel = new BaseModel("form", template);
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

