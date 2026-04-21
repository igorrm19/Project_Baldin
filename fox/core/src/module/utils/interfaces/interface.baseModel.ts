export interface IBaseModel {
    addProps(props: { [key: string]: any }): void;
    addComponent(component: { [key: string]: any }): void;
    getHTML(): HTMLElement;
    mount?(parent: HTMLElement): void;
}