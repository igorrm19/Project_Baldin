import type { ActionItem } from "../dom/@types/dom.types";

export function parseHTML(container: HTMLElement, callback: (data: ActionItem) => void): void {
    const elementHTML = container.querySelectorAll("*");

    elementHTML.forEach((element) => {
        if (element.tagName === "SCRIPT") return;

        callback({
            id: element.id,
            class: element.className,
            style: element.outerHTML,
            parent: element.parentElement,
            children: element.children,
            value: element.textContent,
            placeholder: element.getAttribute("placeholder"),
            name: element.getAttribute("name"),
            type: element.tagName,
            action: "parseHTML"
        });
    });
}
