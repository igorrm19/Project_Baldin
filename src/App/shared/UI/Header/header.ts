import { BaseModel } from "../../../../../fox/core/src/module/utils/base.model"
import { InputHTML } from "../../components/input/input"
import template from "./header.html?raw"
import { LoginServices } from "../../features/login/services/loginServices";

export let userName: string | undefined = undefined;

export class HeaderComponent extends BaseModel {
    protected override axe: Map<string, string> = new Map();
    private cleanupEffects: (() => void)[] = [];
    private mounting = false;

    constructor() {
        const rawTemplate = template as string | { default: string };
        /* istanbul ignore next */
        const finalTemplate = typeof rawTemplate === 'string' ? rawTemplate : (rawTemplate?.default || "<header></header>");
        super("div", finalTemplate);
        return;
    }

    override mount(parent: HTMLElement): void {
        this.mounting = true;
        void this.init(parent);
    }

    private async init(parent: HTMLElement): Promise<void> {
        const inputSearch = new InputHTML("search-input", "text", "Search", "", "w-full px-7 py-4 rounded-lg focus:outline-none border-none placeholder-gray-500 bg-transparent text-[#1e1e1e]");
        const service = new LoginServices();

        try {
            const userResponse = await service.getUser() as { name?: string, email?: string } | null;

            if (!this.mounting) {
                return;
            }

            if (userResponse !== null && typeof userResponse.name === 'string' && userResponse.name !== '') {
                userName = userResponse.name;
            }
        } catch (error) {
            console.error("[HeaderComponent] Failed to fetch user info:", error);

            if (!this.mounting) {
                return;
            }
        }

        this.addComponent({
            primary_component: inputSearch.getHTML()
        })

        this.addProps({
            user: userName,
        })

        if (!this.mounting) {
            return;
        }

        super.mount(parent);
    }

    override unmount(): void {
        this.mounting = false;
        super.unmount()
    }
}
