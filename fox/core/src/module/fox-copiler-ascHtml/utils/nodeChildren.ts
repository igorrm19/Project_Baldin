import type { ParsedHTMLNode } from "../perse/@types/parseHTMLType";

export function nodeChildrenORTwe(node: ParsedHTMLNode[], tagUm: string, tagDois?: string): boolean {
    const hasNode = node.some(
        child =>
            child.type === "element" &&
            child.tag?.toLowerCase() === tagUm || child.tag?.toLowerCase() === tagDois
    )

    return hasNode;
}

export function nodeChildrenAndTwo(node: ParsedHTMLNode[], tagUm: string, tagDois: string): boolean {
    const hasNode = node.some(
        child =>
            child.type === "element" &&
            child.tag?.toLowerCase() === tagUm && child.tag?.toLowerCase() === tagDois
    )

    return hasNode;
}

export function nodeChildrenAndOne(node: ParsedHTMLNode[], tagUm: string): boolean {
    const hasNode = node.some(
        child =>
            child.type === "element" &&
            child.tag?.toLowerCase() === tagUm
    )

    return hasNode;
}

export function nodeChildrenOROne(node: ParsedHTMLNode[], tagUm: string): boolean {
    const hasNode = node.some(
        child =>
            child.type === "element" ||
            child.tag?.toLowerCase() === tagUm
    )

    return hasNode;
}


// const hasLi = node.children?.some(
//     child =>
//         child.type === "element" &&
//         child.tag?.toLowerCase() === "li");

