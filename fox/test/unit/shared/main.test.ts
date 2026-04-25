import type { IBaseModel } from '../../../core/src/@types/base.model.interface';
import { Main } from '../../../main';

describe('Main', () => {
  it('delegates addProps, addComponent, getHTML and mount to the underlying base model', () => {
    const baseModel: IBaseModel = {
      addProps: jest.fn(),
      addComponent: jest.fn(),
      getHTML: jest.fn(() => '<div>ok</div>'),
      mount: jest.fn()
    };

    const main = new Main(baseModel, { test: 'value' });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(baseModel.addProps).toHaveBeenCalledWith({ test: 'value' });

    main.addComponent({ slot: '<div>slot</div>' });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(baseModel.addComponent).toHaveBeenCalledWith({ slot: '<div>slot</div>' });

    expect(main.getHTML()).toBe('<div>ok</div>');

    const parent = document.createElement('div');
    main.mount(parent);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(baseModel.mount).toHaveBeenCalledWith(parent);
  });

});
