import { BaseModel } from "../../../../../../../fox/core/src/module/utils/base.model";
import templete from "./configPage.html?raw";


class UserConfigComponent extends BaseModel {

    constructor() {
        super("div", templete)
    }

    override mount(parent: HTMLElement) {
        super.mount(parent)
    }

}

export { UserConfigComponent };