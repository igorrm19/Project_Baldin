
export interface ActionItem {
    id: string;
    action: string;
    tagName: string;
}

class ActionStack {
    private stack: ActionItem[] = [];

    push(item: ActionItem) {
        this.stack.push(item);
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


