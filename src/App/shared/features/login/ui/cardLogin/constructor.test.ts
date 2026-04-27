import { ConstructorCardLogin } from './constructor';

describe('ConstructorCardLogin', () => {
    it('can be initialized', () => {
        const component = new ConstructorCardLogin('div', '<span>Test</span>');
        expect(component).toBeDefined();
        expect(component.getHTML()).toContain('Test');
    });
});
