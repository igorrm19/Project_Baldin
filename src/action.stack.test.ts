import { actionStack } from './action.stack';

describe('actionStack', () => {
  beforeEach(() => {
    actionStack.clear();
  });

  it('should push items and pop them in LIFO order', () => {
    const itemA = { id: 'a', action: 'click', tagName: 'button' };
    const itemB = { id: 'b', action: 'submit', tagName: 'form' };

    actionStack.push(itemA);
    actionStack.push(itemB);

    expect(actionStack.getAll()).toEqual([itemA, itemB]);
    expect(actionStack.pop()).toBe(itemB);
    expect(actionStack.pop()).toBe(itemA);
    expect(actionStack.pop()).toBeUndefined();
  });

  it('should notify subscribers when a new action is pushed', () => {
    const callback = jest.fn();
    const unsubscribe = actionStack.subscribe(callback);

    const item = { id: 'x', action: 'click', tagName: 'div' };
    actionStack.push(item);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(item);

    unsubscribe();
    actionStack.push({ id: 'y', action: 'hover', tagName: 'span' });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should clear all stored actions', () => {
    actionStack.push({ id: 'one', action: 'type', tagName: 'input' });
    actionStack.clear();

    expect(actionStack.getAll()).toHaveLength(0);
  });
});
