// 

export type ActionItem = {
    div: string | HTMLElement
    id: string
    class: string
    style: string | HTMLElement | any
    children: string | HTMLElement | any
    parent: string | HTMLElement | any
}

export function parseHTML(html: string): Record<string, any> {
    // Use DOMParser to convert HTML string to an HTML document
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const divs = doc.querySelectorAll('div')

    // Use a stack to store views
    const stack: ActionItem[] = []
    divs.forEach(div => {
        stack.push(
            {
                div: div,
                id: div.id,
                class: div.className,
                style: div.style,
                children: div.children,
                parent: div.parentElement
            })
    })

    // Return the object with the view
    // Issue: build an object as tags are found
    return stack
}

