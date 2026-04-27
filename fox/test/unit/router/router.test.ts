import { FoxRouter } from '../../../core/src/module/router/router';
import type { Page } from '../../../core/src/module/router/@types/router.types';

describe('FoxRouter', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    window.history.pushState({}, '', '/');
  });

  it('initializes with default container selector', () => {
    const router = new FoxRouter({});
    expect((router as unknown as { containerSelector: string }).containerSelector).toBe('#app');
  });

  it('loads the initial route and navigates to another route', () => {
    const container = document.querySelector('#app') as HTMLElement;
    let mountedFirst = false;
    let mountedSecond = false;
    let unmountedFirst = false;

    class FirstPage implements Page {
      mount(parent: HTMLElement) {
        mountedFirst = true;
        parent.innerHTML = '<div>first</div>';
      }
      unmount() {
        unmountedFirst = true;
      }
    }

    class SecondPage implements Page {
      mount(parent: HTMLElement) {
        mountedSecond = true;
        parent.innerHTML = '<div>second</div>';
      }
    }

    const router = new FoxRouter({ '/': FirstPage, '/second': SecondPage }, '#app');
    router.start();

    expect(mountedFirst).toBe(true);
    expect(container.innerHTML).toContain('first');

    router.navigate('/second');

    expect(unmountedFirst).toBe(true);
    expect(mountedSecond).toBe(true);
    expect(container.innerHTML).toContain('second');
  });

  it('logs an error when no route is found and no default route exists', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
    const router = new FoxRouter({}, '#app');

    router.loadRoute('/missing');

    expect(consoleError).toHaveBeenCalledWith('No route found for /missing and no default route defined.');
    consoleError.mockRestore();
  });

  it('throws when the target container cannot be found', () => {
    const router = new FoxRouter({ '/': class implements Page { mount() { } } }, '#missing');

    expect(() => router.loadRoute('/')).toThrow('#missing not found in DOM');
  });

  it('intercepts internal anchor clicks and navigates instead of performing a full page load', () => {
    const container = document.querySelector('#app') as HTMLElement;
    let mountedInternal = false;

    class DefaultPage implements Page {
      mount(parent: HTMLElement) {
        parent.innerHTML = '<div>home</div>';
      }
    }

    class InternalPage implements Page {
      mount(parent: HTMLElement) {
        mountedInternal = true;
        parent.innerHTML = '<div>internal</div>';
      }
    }

    const anchor = document.createElement('a');
    anchor.href = '/internal';
    anchor.textContent = 'Internal Link';
    document.body.appendChild(anchor);

    const router = new FoxRouter({ '/': DefaultPage, '/internal': InternalPage }, '#app');
    router.start();

    anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(mountedInternal).toBe(true);
    expect(container.innerHTML).toContain('internal');
  });

  it('does not intercept external links', () => {
    const anchor = document.createElement('a');
    anchor.href = 'https://example.com/path';
    anchor.textContent = 'External Link';
    document.body.appendChild(anchor);

    class DefaultPage implements Page {
      mount(parent: HTMLElement) {
        parent.innerHTML = '<div>home</div>';
      }
    }

    const router = new FoxRouter({ '/': DefaultPage }, '#app');
    router.start();

    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const eventNotPrevented = anchor.dispatchEvent(clickEvent);

    expect(eventNotPrevented).toBe(true);
    expect(document.body.innerHTML).toContain('External Link');
  });

  it('handles trailing slashes in navigation', () => {
    const container = document.querySelector('#app') as HTMLElement;
    class HomePage implements Page {
      mount(parent: HTMLElement) {
        parent.innerHTML = 'home';
      }
    }
    const router = new FoxRouter({ '/': HomePage }, '#app');
    router.start();

    router.navigate('/about/');
    // Should fallback to default route '/' if '/about' not found
    expect(container.innerHTML).toBe('home');
  });

  it('handles pages without unmount method', () => {
    class NoUnmountPage implements Page {
      mount(parent: HTMLElement) {
        parent.innerHTML = 'no unmount';
      }
    }
    const router = new FoxRouter({ '/': NoUnmountPage, '/next': NoUnmountPage }, '#app');
    router.start();

    // Navigating away should not crash
    expect(() => router.navigate('/next')).not.toThrow();
  });

  it('ignores clicks on anchors without href', () => {
    const router = new FoxRouter({ '/': class { mount(p: HTMLElement) { p.innerHTML = 'home' } } }, '#app');
    router.start();

    const anchor = document.createElement('a');
    document.body.appendChild(anchor);

    const navigateSpy = jest.spyOn(router, 'navigate');
    anchor.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
