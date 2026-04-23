
export interface ActionItem {
    id: string;
    action: string;
    tagName: string;
    value: string | null;
    placeholder: string | null;
    name: string | null;
    parent: HTMLElement | null;
    children: HTMLCollection;
    type: string;
    style: string;
    class: string;
}

class ActionStack {
    private stack: ActionItem[] = [];
    private listeners: ((item: ActionItem) => void)[] = [];

    push(item: ActionItem) {
        this.stack.push(item);
        this.listeners.forEach(listener => listener(item));
    }

    subscribe(listener: (item: ActionItem) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    pop(): ActionItem | undefined {
        return this.stack.pop();
    }

    getAll(): ActionItem[] {
        return [...this.stack];
    }

    clear() {
        this.stack = [];
    }
}

export const actionStack = new ActionStack();


