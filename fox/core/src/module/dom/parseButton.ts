import type { ActionItem } from "./@types/dom.types"

// Novo tipo que aceita tanto a função pura quanto o objeto de configuração
export type TParseButtonItem = (() => void) | { id: string; callback: () => void };

/**
 * parseButton
 *
 * Recebe um elemento DOM real (container) e um array de funções ou objetos de configuração.
 * Suporta o mapeamento legado via atributo 'onclick' ou o novo mapeamento via 'id'.
 */
export function parseButton(container: HTMLElement, externalFunctions: TParseButtonItem[] = []): ActionItem[] {
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

        // Tenta encontrar o match usando as duas estratégias (Legada por nome ou Nova por ID)
        const match = externalFunctions.find(item => {
            // Se for um objeto com ID, compara diretamente com o ID do botão HTML
            if (typeof item === 'object' && item !== null && 'id' in item) {
                return item.id === button.id;
            }

            // Lógica legada para funções puras (usando o bind)
            if (typeof item === 'function') {
                const realName = item.name.replace(/^bound /, '')
                return realName + '()' === onClickAttr?.trim()
            }

            return false;
        })

        if (match) {
            // Remove o inline onclick se ele existir para evitar duplicações
            button.removeAttribute('onclick')

            // Executa o callback correto dependendo do formato passado
            if (typeof match === 'function') {
                button.addEventListener('click', () => match())
            } else {
                button.addEventListener('click', () => match.callback())
            }
        }
    })

    return stack;
}
