import { App } from '../../../app';

describe('App', () => {
  it('loads a page into the container', () => {
    const container = document.createElement('div');
    const app = new App(container);

    app.loadPage({
      mount(parent: HTMLElement) {
        parent.innerHTML = '<span>loaded</span>';
      },
    });

    expect(container.innerHTML).toContain('loaded');
  });
});
