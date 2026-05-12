import '../src/style.css'

export class App {
  container: HTMLElement

  constructor(containerId: HTMLElement) {
    this.container = containerId
  }


  loadPage(page: { mount: (parent: HTMLElement) => void }): void {
    this.container.innerHTML = ""

    page.mount(this.container)
  }
}