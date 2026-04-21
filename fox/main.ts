import type { IBaseModel, ComponentMap } from "./core/src/@types/base.model.interface";

export class Main<P extends Record<string, unknown>> implements IBaseModel {
    protected readonly baseModel: IBaseModel;
    protected readonly props: P;

    constructor(
        baseModel: IBaseModel,
        props: P
    ) {
        if (baseModel === this) {
            throw new Error("Main cannot receive itself as a baseModel to avoid infinite recursion.");
        }
        this.baseModel = baseModel;
        this.props = props;
        this.addProps(this.props);
    }

    addProps<T extends Record<string, unknown>>(props: T): void {
        this.baseModel.addProps(props);
    }

    addComponent(component: ComponentMap): void {
        this.baseModel.addComponent(component);
    }

    getHTML(): string {
        return this.baseModel.getHTML();
    }

    mount(parent: HTMLElement): void {
        this.baseModel.mount?.(parent);
    }
}


