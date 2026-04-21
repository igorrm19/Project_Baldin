
// Mock DOM
const documentMock = {
    querySelector: (selector: string) => ({
        innerHTML: "",
        appendChild: () => { },
    }),
    addEventListener: (type: string, listener: any) => { },
};
const windowMock = {
    location: { pathname: "/", origin: "http://localhost" },
    addEventListener: (type: string, listener: any) => { },
};
const historyMock = {
    pushState: () => { },
};

const globalContext = globalThis as unknown as {
    document: typeof documentMock;
    window: typeof windowMock;
    history: typeof historyMock;
    URL: typeof URL;
};

globalContext.document = documentMock;
globalContext.window = windowMock;
globalContext.history = historyMock;
globalContext.URL = URL;

import { FoxRouter } from "./fox/core/src/module/router/router";
import { Page } from "./fox/core/src/module/router/@types/router.types";

let unmountCalled = false;

class MockPage implements Page {
    mount(parent: HTMLElement) {
        console.log("MockPage mounted!");
    }
    unmount() {
        console.log("MockPage unmounted!");
        unmountCalled = true;
    }
}

class AnotherPage implements Page {
    mount(parent: HTMLElement) {
        console.log("AnotherPage mounted!");
    }
}

const routes = {
    "/": MockPage,
    "/another": AnotherPage,
};

console.log("Initializing Router...");
const router = new FoxRouter(routes);
router.start();

console.log("Navigating to /another...");
router.navigate("/another");

if (unmountCalled) {
    console.log("Verification SUCCESS: unmount() was called!");
} else {
    throw new Error("Verification FAILURE: unmount() was NOT called!");
}

