import type { ActionItem } from "./@types/dom.types"

export function parseButton(html: string): ActionItem[] {
    // Use DOMParser to convert HTML string to an HTML document
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const buttons = doc.querySelectorAll('button')

    // Use a stack to store views
    const stack: ActionItem[] = []
    buttons.forEach(button => {

        stack.push(
            {
                button: button,
                id: button.id,
                class: button.className,
                style: button.style,
                children: button.children,
                parent: button.parentElement,
                onClick: button.getAttribute('onclick'),
                text: button.textContent

            })
    })

    const functions: Function[] = []
    functions.push(on)

    // Issue: Cannot use function name only, must find all functions
    // The way it works now, the user has to call push whenever they want to execute their function
    function on() {
        alert("Success") // executed
    }

    function on2() {
        alert("Success 2") // executed
    }

    functions.push(on2)

    function on3() {
        alert("Success 3") // not executed because it doesn't exist in HTML
    }

    functions.push(on3)

    console.log(functions)

    // Compare all found functions with all functions in the TS file
    let n = 0
    stack.forEach(fun => {
        if (fun.onClick === functions[n].name + '()') {
            functions[n]()
        } else {
            n++
        }
        n++
    });

    // Return the object with the view
    // Issue: build an object as tags are found
    return stack
}


// Mission: Store all functions of a TS file in an array and compare it with all functions found in HTML

/*

  Final result: 
  1 - The user creates a function for the button's onClick and stores it with push
  2 - If the function exists in the TS file, it will be executed
  3 - If the function does not exist in the TS file, it will not be executed

*/