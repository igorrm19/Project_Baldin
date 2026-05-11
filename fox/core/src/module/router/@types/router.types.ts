export interface Page {
    mount(parent: HTMLElement): void;
    unmount(): void;
}

export type PageClass = new () => Page;

export type RouteConfig = {
    page: PageClass;
    private?: boolean;
};
