import template from "./button.html?raw"
import { BaseModel } from "../../../../../fox/core/src/module/utils/base.model"

export class ButtonHTML extends BaseModel {
    containerButton: HTMLElement
    text: string
    id: string
    type: string

    constructor(text: string, id: string = "button", type: string = "button") {
        super("div", template)
        this.containerButton = document.createElement("div")
        // Como o botão já é a tag completa e tem o w-full, a div pode cobri-lo 100%
        this.containerButton.className = "w-full"
        this.text = text
        this.id = id
        this.type = type
    }

    mountButton(domContainer: HTMLElement) {
        this.addProps({
            text: this.text,
            id: this.id,
            type: this.type
        })

        // Aplica o template já compilado
        this.containerButton.innerHTML = this.getHTML()
        domContainer.appendChild(this.containerButton)
    }
}
