import { parseInput } from '../../../core/src/module/dom/parseInput';

describe('parseInput', () => {
  it('calls callback with input details when an input event occurs', () => {
    const container = document.createElement('div');
    const template = '<input id="input-1" placeholder="Test" name="email" type="text" value="initial">';
    container.replaceChildren(...Array.from(new DOMParser().parseFromString(template, 'text/html').body.childNodes));

    const callback = jest.fn();
    parseInput(container, callback);

    const input = container.querySelector('#input-1') as HTMLInputElement;
    expect(input).not.toBeNull();

    input.value = 'updated';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'input-1',
        action: 'input',
        value: 'updated',
        placeholder: 'Test',
        name: 'email',
        type: 'text',
      })
    );
  });
});
