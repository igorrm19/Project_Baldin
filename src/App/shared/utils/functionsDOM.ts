
function containerChild(classList: string, container: HTMLElement): HTMLElement {
    const div = document.createElement("div");

    div.className = classList
    container.appendChild(div)
    return div
}

function containerMount(component: any, container: HTMLElement): void {

    void component.mount(container);
}

export { containerChild, containerMount }