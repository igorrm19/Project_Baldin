import type { ParsedHTMLNode } from "./@types/parseHTMLType";
import { createTree } from "./crateTree";

export function parseHTML(HTML: string): ParsedHTMLNode[] {

    const template = document.createElement("template");
    template.innerHTML = HTML;

    const treeDocument = [...template.content.childNodes].map(createTree);

    return treeDocument;
}
