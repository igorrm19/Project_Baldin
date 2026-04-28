export interface Page {
    mount(parent: HTMLElement): void;
    unmount(): void;
}

export type PageClass = new () => Page;
