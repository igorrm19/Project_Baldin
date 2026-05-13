import { BaseModel } from "../../../../../fox/core/src/module/utils/base.model"
import { InputHTML } from "../../components/input/input"
import template from "./header.html?raw"
import { LoginServices } from "../../features/login/services/loginServices";

export class HeaderComponent extends BaseModel {
    protected override axe: Map<string, string> = new Map();

    constructor() {
        const rawTemplate = template as string | { default: string };
        /* istanbul ignore next */
        const finalTemplate = typeof rawTemplate === 'string' ? rawTemplate : (rawTemplate?.default || "<header></header>");
        super("div", finalTemplate);
        return;
    }

    override mount(parent: HTMLElement): void {
        void this.init(parent);
    }

    private async init(parent: HTMLElement): Promise<void> {
        const inputSearch = new InputHTML("search-input", "text", "Search", "", "w-full px-7 py-4 rounded-lg focus:outline-none border-none placeholder-gray-500 bg-transparent text-[#1e1e1e]");
        const service = new LoginServices();
        let userName = "User";

        try {
            const userResponse = await service.getUser() as { name?: string } | null;
            if (userResponse !== null && typeof userResponse.name === 'string' && userResponse.name !== '') {
                userName = userResponse.name;
            }
        } catch (error) {
            console.error("[HeaderComponent] Failed to fetch user info:", error);
        }

        this.addComponent({
            primary_component: inputSearch.getHTML()
        })
        this.addProps({
            user: userName
        })
        super.mount(parent);
        this.onMount();
    }

    onMount(): void {
        console.log("[HeaderComponent] Header component mounted");
        return;
    }
}
