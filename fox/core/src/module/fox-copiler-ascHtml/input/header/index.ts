import { parseHTML } from "../../perse/parseHTML";
import type { ParsedHTMLNode } from "../../perse/@types/parseHTMLType";
import geration1 from "./geration1.html?raw";
import geration2 from "./geration2.html?raw";
import geration3 from "./geration3.html?raw";

export const header: ParsedHTMLNode[] = parseHTML(geration1)
export const header2: ParsedHTMLNode[] = parseHTML(geration2)
export const header3: ParsedHTMLNode[] = parseHTML(geration3)


export const headerGeneration: ParsedHTMLNode[][] = [
    header,
    header2,
    header3
]
