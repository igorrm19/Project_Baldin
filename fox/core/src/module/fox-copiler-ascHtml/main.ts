import { parseHTML } from "./perse/parseHTML";
import type { ParsedHTMLNode } from "./perse/@types/parseHTMLType";

export default function generarAleatorio(html: string): void {
    const ALVO: ParsedHTMLNode[] = parseHTML(html)
    const TAMANHO_POPULACAO: number = 100;
    const TAXA_MUTACAO: number = 0.05;
    const CARACTERES: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";

    console.log("ALVO ", ALVO)
    console.log("TAMANHO_POPULACAO ", TAMANHO_POPULACAO)
    console.log("TAXA_MUTACAO ", TAXA_MUTACAO)
    console.log("CARACTERES ", CARACTERES)

    return
}
