export interface IBaseModel {
    addProps(props: { [key: string]: unknown }): void;
    addComponent(component: { [key: string]: string }): void;
    getHTML(): string;
    mount?(parent: HTMLElement): void;
}