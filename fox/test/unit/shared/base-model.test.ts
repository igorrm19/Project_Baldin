import { BaseModel } from '../../../core/src/module/utils/base.model';

describe('BaseModel', () => {
  it('renders template props and child components correctly', () => {
    const parent = document.createElement('div');
    const model = new BaseModel('div', '<div>{{ message }}</div><Axe id="slot"></Axe>');
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    model.addProps({ message: 'Hello' });
    model.addComponent({ slot: '<span>slot content</span>' });

    expect(model.getHTML()).toContain('Hello');
    expect(model.getHTML()).toContain('<span>slot content</span>');

    model.mount(parent);
    expect(parent.innerHTML).toContain('Hello');
    expect(parent.innerHTML).toContain('<span>slot content</span>');

    model.mount(parent);
    expect(parent.childElementCount).toBe(1);

    warnSpy.mockRestore();
  });
});
