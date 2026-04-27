import template from "./image.html?raw"
import { BaseModel } from "../../../../../fox/core/src/module/utils/base.model"

export class ImageHTML extends BaseModel {
    containerImage: HTMLElement
    src: string
    alt: string

    constructor(src: string, alt: string = "image") {
        /* istanbul ignore next */
        super("img", (typeof template === 'string' ? template : (template as unknown as { default: string })?.default) || "<div></div>")
        this.containerImage = document.createElement("div")
        this.containerImage.className = "flex justify-center"
        this.src = src
        this.alt = alt
    }

    mountImage(domContainer: HTMLElement) {
        this.addProps({
            src: this.src,
            alt: this.alt
        })

        // Applies compiled properties to the local Image HTML
        const html = this.getHTML();
        const fragment = new DOMParser().parseFromString(html, 'text/html').body;
        this.containerImage.replaceChildren(...Array.from(fragment.childNodes));
        domContainer.appendChild(this.containerImage)
    }
}
