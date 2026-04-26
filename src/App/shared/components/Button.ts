// src/components/Button.ts
export class Button {
  element: HTMLButtonElement

  constructor(text: string, onClick?: () => void) {
    // Creates the element
    this.element = document.createElement('button')
    this.element.textContent = text
    this.element.className = "flex items-center justify-center w-full bg-gray-900 text-white py-4 px-4 rounded-lg hover:bg-blue-700 transition"

    // Adds the event listener if it exists
    if (onClick) {
      this.element.addEventListener('click', onClick)
    }
  }

  // Method to attach the button to a container
  mount(container: HTMLElement) {
    container.appendChild(this.element)
  }

  // Method to change the text later
  setText(newText: string) {
    this.element.textContent = newText
  }

  // Method to add/remove classes dynamically
  addClass(className: string) {
    this.element.classList.add(className)
  }

  removeClass(className: string) {
    this.element.classList.remove(className)
  }
}
