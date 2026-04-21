import type { IBaseModel } from "../fox/core/src/module/utils/interfaces/interface.baseModel"

export class Main<P extends Record<string, unknown>> implements IBaseModel {
    protected baseModel: IBaseModel;
    protected props: P;

    constructor(baseModel: IBaseModel, props: P) {
        this.baseModel = baseModel;
        this.props = props;
        this.addProps(this.props);
    }

    addProps<T extends Record<string, unknown>>(props: T) {
        return this.baseModel.addProps(props);
    }

    addComponent(component: { [key: string]: string; }) {
        return this.baseModel.addComponent(component);
    }

    getHTML(): string {
        return this.baseModel.getHTML()
    }

    mount(parent: HTMLElement): void {
        this.baseModel.mount?.(parent);
    }
}
