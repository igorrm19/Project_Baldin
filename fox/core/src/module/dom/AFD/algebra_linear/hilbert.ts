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


    constructor(nome: string){
        this.nome = nome
    }

    setPilha(){
        
        this.pilha = [...this.nome].map((caractere, index) => {
        return {
            estado: `q${index}`,              // Atribui um ID baseado na posição
            label: caractere,        // Armazena a letra no label
            action: () => {}         // Define uma função vazia ou padrão
        } as ActionItem;             // Garante que o objeto segue o contrato do seu tipo
        });
    }

    getPilha(){
        return this.pilha
    }

    view(){
        console.log(`Automato: ${this.nome}`)
        console.log(`Estado Atual: q${this.estadoAtual}`)
        console.log("Pilha:")
        this.pilha.forEach(item => {
            console.log(`Estado: ${item.estado}, Label: ${item.label}`)
        })
    }
}