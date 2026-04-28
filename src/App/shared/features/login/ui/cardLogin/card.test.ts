import { CardLogin } from './card';
import { IBaseModel } from '../../../../../../../fox/core/src/@types/base.model.interface';

describe('CardLogin', () => {
    let mockBaseModel: IBaseModel;
    let card: CardLogin;
    let logSpy: jest.SpyInstance;

    beforeEach(() => {
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        mockBaseModel = {
            addProps: jest.fn(),
            addComponent: jest.fn(),
            getHTML: () => '<div><span>P</span><div id="c"></div></div>'
        } as IBaseModel;
        card = new CardLogin(mockBaseModel, {});
    });

    afterEach(() => {
        logSpy.mockRestore();
    });

    it('mounts and coverage', () => {
        card.mountCardLogin();
        expect(card.name).toBeDefined();
        
        const div = document.createElement('div');
        card.bindLoginButtons(div);
    });
});
