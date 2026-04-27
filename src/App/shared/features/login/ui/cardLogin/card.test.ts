import { CardLogin } from './card';

import type { IBaseModel } from '../../../../../../../fox/core/src/@types/base.model.interface';
import type { CardProps } from './card';

describe('CardLogin', () => {
    let mockBaseModel: IBaseModel;
    let props: CardProps;

    beforeEach(() => {
        mockBaseModel = {
            addProps: jest.fn(),
            addComponent: jest.fn(),
            getHTML: jest.fn().mockReturnValue('<div></div>'),
            mount: jest.fn()
        };
        props = {
            h1_primaryText: 'Login',
            h2_secondaryText: 'Enter details'
        };
    });

    it('initializes correctly', () => {
        const card = new CardLogin(mockBaseModel, props);
        expect(card).toBeDefined();
    });

    it('mounts card login', () => {
        const card = new CardLogin(mockBaseModel, props);
        const result = card.mountCardLogin();
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
    });
});
