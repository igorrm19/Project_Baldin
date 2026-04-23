import type { ActionItem } from "./@types/dom.types";

export function parseInput(
    container: HTMLElement,
    callback: (data: ActionItem) => void
) {
    const elementInput = container.querySelectorAll("input");

    elementInput.forEach((input) => {
        const elementInput = input as HTMLInputElement;

        elementInput.addEventListener("input", () => {
            callback({
                id: elementInput.id,
                class: elementInput.className,
                style: elementInput.style.cssText,
                parent: elementInput.parentElement,
                children: elementInput.children,
                value: elementInput.value,
                placeholder: elementInput.placeholder,
                name: elementInput.name,
                type: elementInput.type,
                action: "input"
            });
        });
    });
}