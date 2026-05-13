
interface ActionItem {
    state: string;
    label: string;
    action: () => void;
}

export class PushdownAutomaton {
    private currentState: number = 0
    private name: string = ""
    private stack: ActionItem[] = []
    private acceptedName: string = "igor"


    constructor(name: string) {
        this.name = name
    }

    private setStack(): void {

        this.stack = [...this.name].map((char, index) => {
            return {
                state: `q${index}`,
                label: char,
                action: () => { }
            }
        })
    }

    getStack(): ActionItem[] {
        return this.stack
    }

    view(): void {
        this.setStack()

        console.log(`Automaton: ${this.name}`)
        if (this.acceptedName === this.name) {
            console.log("Automaton accepted")
        } else {
            console.log("Automaton not accepted")
        }
        console.log("Stack:")

        this.stack.forEach(item => {
            console.log(`State: ${item.state}, Label: ${item.label}`)
            this.currentState++
        })

        console.log(`Current State: q${this.currentState}`)
    }
}
