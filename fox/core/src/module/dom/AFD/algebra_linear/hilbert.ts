// Automatos com pilha

interface ActionItem {
    estado: string;
    label: string;
    action: () => void;
}

export class AutomatoPilha{
    private estadoAtual: number = 0
    private nome: string = ""
    private pilha: ActionItem[] = []
    private aceita = "igor"


    constructor(nome: string){
        this.nome = nome
    }

    private setPilha(){
        
        this.pilha = [...this.nome].map((caractere, index) => {
            return {
                estado: `q${index}`,
                label: caractere,
                action: () => {}
            }
        })
    }

    getPilha(){
        return this.pilha
    }

    view(){
        this.setPilha()

        console.log(`Automato: ${this.nome}`)
        if (this.aceita === this.nome) {
            console.log("Automato aceito")
        } else {
            console.log("Automato não aceito")
        }
        console.log("Pilha:")

        this.pilha.forEach(item => {
            console.log(`Estado: ${item.estado}, Label: ${item.label}`)
            this.estadoAtual++
        })
        
        console.log(`Estado Atual: q${this.estadoAtual}`)
    }
}
