
// Mock DOM
const documentMock = {
    querySelector: (selector: string) => ({
        innerHTML: "",
        appendChild: () => { },
    }),
};
const windowMock = {
    location: { pathname: "/" },
    addEventListener: () => { },
};
const historyMock = {
    pushState: () => { },
};

const globalContext = globalThis as unknown as {
    document: typeof documentMock;
    window: typeof windowMock;
    history: typeof historyMock;
};

globalContext.document = documentMock;
globalContext.window = windowMock;
globalContext.history = historyMock;

import { FoxRouter, Page } from "./fox/core/src/module/router/router";

class MockPage implements Page {
    mount(parent: HTMLElement) {
        console.log("MockPage mounted!");
    }
}

const routes = {
    "/": MockPage,
};

console.log("Initializing Router...");
const router = new FoxRouter(routes);
router.start();

console.log("Navigating to /...");
router.navigate("/");
