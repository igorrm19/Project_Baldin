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
        // Sends properties to BaseModel to compile the template {{name}}, {{type}}, etc.
        this.addProps({
            name: this.name,
            type: this.type,
            label: this.label,
            placeholder: this.placeholder,
            value: this.value
        })

        // getHTML() applies properties to the template and returns the ready string
        const html = this.getHTML();
        const fragment = new DOMParser().parseFromString(html, 'text/html').body;
        this.containerText.replaceChildren(...Array.from(fragment.childNodes));
        domContainer.appendChild(this.containerText)
    }
}
