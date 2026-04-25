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

  it('escapes HTML entities for template values and handles missing component slots', () => {
    const model = new BaseModel('div', '<div>{{ message }}</div><Axe id="missing"></Axe>');

    model.addProps({ message: '<script>&"\' </script>' });

    const html = model.getHTML();
    expect(html).toContain('&lt;script&gt;&amp;&quot;&#039; &lt;/script&gt;');
    expect(html).toContain('<div>');
    expect(html).toContain('</div>');
    expect(html).not.toContain('<Axe id="missing"></Axe>');
  });

  it('returns non-string values unchanged in escapeHtml', () => {
    const model = new BaseModel('div', '');
    const escapeHtml = (model as unknown as { escapeHtml(text: unknown): unknown }).escapeHtml;
    expect(escapeHtml(123)).toBe(123);
  });
});
