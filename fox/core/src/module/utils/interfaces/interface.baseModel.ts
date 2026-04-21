export interface IBaseModel {
    addProps<P extends Record<string, unknown>>(props: P): void;
    addComponent(component: { [key: string]: string }): void;
    getHTML(): string;
    mount?(parent: HTMLElement): void;
}