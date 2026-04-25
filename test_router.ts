
// Mock DOM
const documentMock = {
    querySelector: () => ({
        innerHTML: "",
        appendChild: () => { },
    }),
    addEventListener: () => { },
};
const windowMock = {
    location: { pathname: "/", origin: "http://localhost" },
    addEventListener: () => { },
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
import type { Page } from "./fox/core/src/module/router/@types/router.types";

let unmountCalled = false;

class MockPage implements Page {
    mount() {
        console.log("MockPage mounted!");
    }
    unmount() {
        console.log("MockPage unmounted!");
        unmountCalled = true;
    }
}

class AnotherPage implements Page {
    mount() {
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

