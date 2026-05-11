import type { Page, PageClass, RouteConfig } from "./@types/router.types";
import { actionStack } from "../../../../action.stack";

export class FoxRouter {
    private routes: Map<string, RouteConfig>;
    private containerSelector: string;
    private containerElement: HTMLElement | null = null;
    private currentPage: Page | null = null;

    constructor(routes: Record<string, RouteConfig | PageClass>, containerSelector: string = "#app") {
        this.routes = new Map();
        for (const [path, config] of Object.entries(routes)) {
            if (typeof config === 'function') {
                this.routes.set(path, { page: config });
            } else {
                this.routes.set(path, config);
            }
        }
        this.containerSelector = containerSelector;

        window.addEventListener("popstate", () => this.loadRoute(window.location.pathname));
    }

    public navigate(path: string): void {
        history.pushState({}, "", path);
        this.loadRoute(path);
    }

    public loadRoute(path: string): void {
        const normalizedPath = path.replace(/\/+$/, '') || '/';
        const routeConfig = this.routes.get(normalizedPath) || this.routes.get("/");

        if (!routeConfig) {
            console.error(`No route found for ${path} and no default route defined.`);
            return;
        }

        if (routeConfig.private === true && localStorage.getItem("token") === null) {
            console.warn("Unauthorized access to private route, redirecting to login.");
            this.navigate("/");
            return;
        }

        if (this.currentPage !== null && typeof this.currentPage.unmount === "function") {
            this.currentPage.unmount();
        }
        
        actionStack.clear();

        const PageCtor = routeConfig.page;
        const instance = new PageCtor();
        this.currentPage = instance;

        if (!this.containerElement) {
            this.containerElement = document.querySelector<HTMLElement>(this.containerSelector);
            if (!this.containerElement) throw new Error(`${this.containerSelector} not found in DOM`);
        }

        this.containerElement.replaceChildren();
        instance.mount(this.containerElement);
    }

    private setupLinkInterception(): void {
        document.addEventListener("click", (event) => {
            const target = event.target as HTMLElement;
            const anchor = target.closest("a");

            if (anchor && anchor.href) {
                const url = new URL(anchor.href);
                const isInternal = url.origin === window.location.origin;

                if (isInternal) {
                    event.preventDefault();
                    this.navigate(url.pathname);
                }
            }
        });
    }

    public start(): void {
        this.setupLinkInterception();
        this.loadRoute(window.location.pathname);
    }
}
