import { BaseModel } from "../fox/core/src/module/utils/base.model"
import type{ IBaseModel } from "../fox/core/src/module/utils/interfaces/interface.baseModel"

export class Main implements IBaseModel {
    protected baseModel: BaseModel;


    constructor(element: string, template: string) {
        this.baseModel = new BaseModel(element, template);
    }


    addProps(props: { [key: string]: any; }) {
        return this.baseModel.addProps(props);

    }


    addComponent(component: { [key: string]: any; }) {
        return this.baseModel.addComponent(component);

    }


    getHTML(): any {
        return this.baseModel.getHTML()
    }

    mount(parent: HTMLElement): void {
        this.baseModel.mount(parent);
    }
}

