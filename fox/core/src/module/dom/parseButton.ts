import type { ActionItem } from "./@types/dom.types"

/**
 * parseButton
 *
 * Recebe um elemento do DOM real (container) e um array de funções.
 * Encontra todos os <button> dentro do container, lê o atributo onclick,
 * faz o match pelo nome da função e vincula um addEventListener('click').
 *
 * Dessa forma, as funções só são executadas ao clicar — não na hora do parse.
 *
 * @param container - Elemento HTML já inserido no DOM real
 * @param externalFunctions - Funções a serem vinculadas (use .bind(this) ao passar)
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

        // Quando usamos .bind(this), o JS altera o nome da função para "bound nomeDaFuncao".
        // Precisamos remover "bound " para fazer o match correto com o HTML.
        const match = externalFunctions.find(fn => {
            const realName = fn.name.replace(/^bound /, '')
            return realName + '()' === onClickAttr?.trim()
        })

        if (match) {
            // Remove inline onclick para evitar duplicação e erros de contexto
            button.removeAttribute('onclick')

            // Vincula o evento real no botão do DOM
            button.addEventListener('click', () => match())
        }
    })

    return stack
}


// Missão: receber o container DOM real e vincular addEventListener nos botões encontrados
//
// Resultado:
// 1 - O usuário cria uma função e passa com .bind(this) no array externalFunctions
// 2 - Se o nome da função bater com o onclick do botão, o listener é vinculado
// 3 - A função só executa ao clicar — não na hora do parse
// 4 - Funções sem match no HTML são simplesmente ignoradas
