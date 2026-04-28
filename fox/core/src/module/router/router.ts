import type { Page, PageClass } from "./@types/router.types";

export class FoxRouter {
    private routes: Map<string, PageClass>;
    private containerSelector: string;
    private containerElement: HTMLElement | null = null;
    private currentPage: Page | null = null;

    constructor(routes: Record<string, PageClass>, containerSelector: string = "#app") {
        this.routes = new Map(Object.entries(routes));
        this.containerSelector = containerSelector;

        window.addEventListener("popstate", () => this.loadRoute(window.location.pathname));
    }

    public navigate(path: string) {
        history.pushState({}, "", path);
        this.loadRoute(path);
    }

    public loadRoute(path: string) {
        const normalizedPath = path.replace(/\/+$/, '') || '/';
        const PageCtor = this.routes.get(normalizedPath) || this.routes.get("/");

        if (!PageCtor) {
            console.error(`No route found for ${path} and no default route defined.`);
            return;
        }

        if (this.currentPage && this.currentPage.unmount) {
            this.currentPage.unmount();
        }

        const instance = new PageCtor();
        this.currentPage = instance;

        if (!this.containerElement) {
            this.containerElement = document.querySelector<HTMLElement>(this.containerSelector);
            if (!this.containerElement) throw new Error(`${this.containerSelector} not found in DOM`);
        }

        this.containerElement.replaceChildren();
        instance.mount(this.containerElement);
    }

    private setupLinkInterception() {
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

    public start() {
        this.setupLinkInterception();
        this.loadRoute(window.location.pathname);
    }
}
