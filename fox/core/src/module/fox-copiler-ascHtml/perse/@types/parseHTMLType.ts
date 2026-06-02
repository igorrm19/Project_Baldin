export interface ParsedHTMLNode {
    type: "element" | "text" | "comment" | "doctype" | "instruction" | "tag.close" | "tag.open" | "tag.void";
    tag?: string | null;
    text?: string | null;
    attrs?: Record<string, string> | null;
    children?: ParsedHTMLNode[] | null;
    id?: string | null;
    className?: string | null;
    nodeValue?: string | null;
    textContent?: string | null;
    tagName?: string | null;
    nodeName?: string | null;
    nodeType?: number;
    attributes?: Attr[] | null;
    ownerDocument?: Document | null;
    avaliationFitness?: number | null;
}
