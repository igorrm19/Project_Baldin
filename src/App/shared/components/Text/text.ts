import template from "./text.html?raw"
import { BaseModel } from "../../../../../fox/core/src/module/utils/base.model"

export class TextHTML extends BaseModel {
    containerText: HTMLElement
    text: string
    styleClass: string

    constructor(text: string, styleClass: string = "text-base text-gray-950") {
        super("div", template)
        this.containerText = document.createElement("div")
        // O container pode ser inline se necessário, mas o block principal já lida com o tamanho
        this.text = text
        this.styleClass = styleClass
    }

    mountText(domContainer: HTMLElement) {
        this.addProps({
            text: this.text,
            styleClass: this.styleClass
        })

        this.containerText.innerHTML = this.getHTML()
        domContainer.appendChild(this.containerText)
    }
}