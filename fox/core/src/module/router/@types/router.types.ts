export interface Page {
    mount(parent: HTMLElement): void;
}

export type PageClass = new () => Page;
