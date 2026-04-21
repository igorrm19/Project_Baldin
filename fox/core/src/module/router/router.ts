import type { PageClass } from "./@types/router.types"

export class FoxRouter {
    private routes: Record<string, PageClass>;
    private containerId: string;

    constructor(routes: Record<string, PageClass>, containerId: string = "#app") {
        this.routes = routes;
        this.containerId = containerId;

        window.addEventListener("popstate", () => this.loadRoute(window.location.pathname));
    }

    public navigate(path: string) {
        history.pushState({}, "", path);
        this.loadRoute(path);
    }

    public loadRoute(path: string) {
        const PageCtor = this.routes[path] || this.routes["/"];

        if (!PageCtor) {
            console.error(`No route found for ${path} and no default route defined.`);
            return;
        }

        const instance = new PageCtor();

        const container = document.querySelector(this.containerId) as HTMLElement | null;
        if (!container) throw new Error(`${this.containerId} not found in DOM`);

        container.innerHTML = "";
        instance.mount(container);
    }

    public start() {
        this.loadRoute(window.location.pathname);
    }
}
