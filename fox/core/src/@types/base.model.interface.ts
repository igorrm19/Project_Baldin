export type ComponentMap = Record<string, string>;

export interface IBaseModel {
    addProps<P extends Record<string, unknown>>(props: P): void;
    addComponent(component: ComponentMap): void;
    getHTML(): string;
    mount?(parent: HTMLElement): void;
}