import { parseButton } from '../../../core/src/module/dom/parseButton';

describe('parseButton', () => {
  it('binds matching onclick functions and removes inline onclick attributes', () => {
    const container = document.createElement('div');
    container.innerHTML = '<button id="btn-1" onclick="foo()">Click</button><button id="btn-2" onclick="bar()">Skip</button>';

    let clicked = false;
    function foo() {
      clicked = true;
    }

    const stack = parseButton(container, [foo.bind(null)]);

    expect(stack).toHaveLength(2);
    expect(container.querySelector('#btn-1')?.getAttribute('onclick')).toBeNull();
    expect(container.querySelector('#btn-2')?.getAttribute('onclick')).toBe('bar()');

    container.querySelector<HTMLButtonElement>('#btn-1')?.click();
    expect(clicked).toBe(true);
  });

  it('returns stack and preserves onclick when no matching external function exists', () => {
    const container = document.createElement('div');
    container.innerHTML = '<button id="btn-1" onclick="foo()">Click</button><button id="btn-2">No click</button>';

    function bar() {}

    const stack = parseButton(container, [bar.bind(null)]);

    expect(stack).toHaveLength(2);
    expect(container.querySelector('#btn-1')?.getAttribute('onclick')).toBe('foo()');
    expect(container.querySelector('#btn-2')?.getAttribute('onclick')).toBeNull();
  });
  it('works with default externalFunctions parameter', () => {
    const container = document.createElement('div');
    container.innerHTML = '<button id="btn-1" onclick="foo()">Click</button>';
    const stack = parseButton(container);
    expect(stack).toHaveLength(1);
    expect(container.querySelector('#btn-1')?.getAttribute('onclick')).toBe('foo()');
  });
});
