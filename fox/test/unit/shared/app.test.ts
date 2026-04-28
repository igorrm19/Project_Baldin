import { App } from '../../../app';

describe('App', () => {
  it('loads a page into the container', () => {
    const container = document.createElement('div');
    const app = new App(container);

    app.loadPage({
      mount(parent: HTMLElement) {
        const span = document.createElement('span');
        span.textContent = 'loaded';
        parent.replaceChildren(span);
      },
    });

    expect(container.textContent).toContain('loaded');
  });
});
