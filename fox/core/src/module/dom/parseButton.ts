import type { ActionItem } from "./@types/dom.types"

/**
 * parseButton
 *
 * Receives a real DOM element (container) and an array of functions.
 * Finds all <button> elements within the container, reads the onclick attribute,
 * matches by function name, and binds an addEventListener('click').
 *
 * This way, functions are only executed upon clicking — not during the parse phase.
 *
 * @param container - HTML element already inserted into the real DOM
 * @param externalFunctions - Functions to be bound (use .bind(this) when passing)
 */
export function parseButton(container: HTMLElement, externalFunctions: Array<() => void> = []): ActionItem[] {
    const buttons = container.querySelectorAll('button')

    const stack: ActionItem[] = []

    buttons.forEach(button => {
        const onClickAttr = button.getAttribute('onclick')

        stack.push({
            button: button,
            id: button.id,
            class: button.className,
            style: button.style,
            children: button.children,
            parent: button.parentElement,
            onClick: onClickAttr,
            text: button.textContent
        })

        // When using .bind(this), JS changes the function name to "bound functionName".
        // We need to remove "bound " to correctly match the HTML.
        const match = externalFunctions.find(fn => {
            const realName = fn.name.replace(/^bound /, '')
            return realName + '()' === onClickAttr?.trim()
        })

        if (match) {
            // Remove inline onclick to avoid duplication and context errors
            button.removeAttribute('onclick')

            // Bind the real event to the DOM button
            button.addEventListener('click', () => match())
        }
    })

    return stack
}


// Goal: receive the real DOM container and bind addEventListener to the buttons found
//
// Results:
// 1 - The user creates a function and passes it with .bind(this) in the externalFunctions array
// 2 - If the function name matches the button's onclick, the listener is bound
// 3 - The function only executes on click — not during parsing
// 4 - Functions without a match in the HTML are simply ignored
