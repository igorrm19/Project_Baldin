import template from "./button.html?raw"
import { BaseModel } from "../../../../../fox/core/src/module/utils/base.model"

export class ButtonHTML extends BaseModel {
    containerButton: HTMLElement
    text: string
    id: string
    type: string

    constructor(text: string, id: string = "button", type: string = "button") {
        /* istanbul ignore next */
        super("div", ((template as any)?.default ?? template) || "<div></div>")
        this.containerButton = document.createElement("div")
        // Since the button is already the full tag and has w-full, the div can cover it 100%
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

        // Applies the already compiled template
        const html = this.getHTML();
        const fragment = new DOMParser().parseFromString(html, 'text/html').body;
        this.containerButton.replaceChildren(...Array.from(fragment.childNodes));
        domContainer.appendChild(this.containerButton)
    }
}
