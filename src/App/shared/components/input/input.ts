import template from "./input.html?raw"
import { BaseModel } from "../../../../../fox/core/src/module/utils/base.model"

export class InputHTML extends BaseModel {
    containerText: HTMLElement
    name: string
    type: string
    label: string
    placeholder: string
    value: string

    constructor(name: string, type: string, label: string, placeholder: string = "", value: string = "") {
        super("div", template)
        this.containerText = document.createElement("div")
        this.name = name
        this.type = type
        this.label = label
        this.placeholder = placeholder
        this.value = value
    }

    mountInput(domContainer: HTMLElement) {
        // Envia as propriedades para o BaseModel compilar o template {{name}}, {{type}}, etc
        this.addProps({
            name: this.name,
            type: this.type,
            label: this.label,
            placeholder: this.placeholder,
            value: this.value
        })

        // getHTML() aplica as properties ao template e retorna a string pronta
        const html = this.getHTML();
        const fragment = new DOMParser().parseFromString(html, 'text/html').body;
        this.containerText.replaceChildren(...Array.from(fragment.childNodes));
        domContainer.appendChild(this.containerText)
    }
}
