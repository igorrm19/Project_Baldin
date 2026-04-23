import { parseInput } from '../../../core/src/module/dom/parseInput';

describe('parseInput', () => {
  it('calls callback with input details when an input event occurs', () => {
    const container = document.createElement('div');
    container.innerHTML = '<input id="input-1" placeholder="Test" name="email" type="text" value="initial">';

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
