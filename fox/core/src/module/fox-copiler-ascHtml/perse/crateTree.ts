import type { ParsedHTMLNode } from "./@types/parseHTMLType";

function createTree(node: Node): ParsedHTMLNode {
    if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;

        return {
            type: "element",
            tag: element.tagName,
            id: element.id,
            className: element.className,
            nodeValue: element.nodeValue,
            textContent: element.textContent,
            tagName: element.tagName,
            nodeName: element.nodeName,
            nodeType: element.nodeType,
            attributes: [...element.attributes],
            ownerDocument: element.ownerDocument,
            attrs: [...element.attributes].reduce((acc, attr) => {
                acc[attr.name] = attr.value;
                return acc;
            }, {} as Record<string, string>),
            children: [...element.childNodes].map(createTree)
        };
    }

    if (node.nodeType === Node.TEXT_NODE) {
        return {
            type: "text",
            text: node.textContent,
        };
    }

    if (node.nodeType === Node.COMMENT_NODE) {
        return {
            type: "comment",
            text: node.textContent
        };
    }

    if (node.nodeType === Node.DOCUMENT_TYPE_NODE) {
        return {
            type: "doctype",
            text: node.textContent
        };
    }

    return {
        type: "instruction",
        text: node.textContent
    };
}

export { createTree }
