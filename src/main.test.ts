import { FoxRouter } from '../fox/core/src/module/router/router';
import { actionStack } from '../fox/action.stack';

jest.mock('../fox/core/src/module/router/router');
jest.mock('./App/shared/pages/mainPage');
jest.mock('./App/shared/pages/aboutPage');
jest.mock('./App/shared/pages/cadastroPage');
jest.mock('./App/shared/pages/homePage');
jest.mock('./convert.stringtoobject');

describe('Main Entry Point', () => {
    it('sets up unhandledrejection listener', () => {
    });

    it('subscribes to actionStack clicks', () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation();
        actionStack.push({ action: 'click', tagName: 'button', id: 'my-btn' });
        expect(alertSpy).toHaveBeenCalledWith('Action Triggered: click on button (ID: my-btn)');
        alertSpy.mockRestore();
    });

    let domContentLoadedCallback: () => void;

    beforeEach(() => {
        jest.spyOn(document, 'addEventListener').mockImplementation((event, callback) => {
            if (event === 'DOMContentLoaded') {
                domContentLoadedCallback = callback as () => void;
            }
        });
        
        // Reset the module to re-run the code
        jest.isolateModules(async () => {
            await import('./main');
        });
    });

    it('initializes the router on DOMContentLoaded', () => {
        domContentLoadedCallback();
        expect(FoxRouter).toHaveBeenCalled();
        const mockRouter = FoxRouter as jest.Mock;
        const routerInstance = mockRouter.mock.instances[0];
        expect(routerInstance.start).toHaveBeenCalled();
    });
});
