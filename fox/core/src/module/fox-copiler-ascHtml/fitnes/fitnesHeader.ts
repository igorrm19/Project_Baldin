import type { ParsedHTMLNode } from "../perse/@types/parseHTMLType";
import { tag } from "./@types/tagArray";
import { nodeChildrenORTwe, nodeChildrenOROne } from "../utils/nodeChildren";

export default function fitness(
    tree: ParsedHTMLNode[]
): number {

    //pontuação final
    let score = 0;

    //puxa o primeiro e ultimo nó
    const firstTag = tree[0];
    const lastTag = tree[tree.length - 1];

    function walk(node: ParsedHTMLNode) {
        const nodeTag = node.tag?.toLowerCase()

        //Pula outros tipos de nó que não seja element
        if (node.type !== "element") {
            return;
        }

        if (nodeTag === "header") {
            tag.header = 15;
            if (firstTag?.tag?.toLowerCase() === "header" && lastTag?.tag?.toLowerCase() === "header") {
                tag.header = 20;
            }
        }

        if (nodeTag === "nav") {
            tag.nav = 5;

            const hasOlUl = nodeChildrenORTwe(node.children || [], "ol", "ul");

            if (hasOlUl) {
                tag.ol = 5;

                const hasLi = nodeChildrenOROne(node.children || [], "li");

                if (hasLi) {
                    tag.li = 5;

                    const hasA = nodeChildrenOROne(node.children || [], "a");

                    if (hasA) {
                        tag.a = 5;
                    }
                }
            }
        }

        //Percorre todos os elemntos do node.children
        node.children?.forEach(walk);
    }


    // Percorre a árvore de nós
    tree.forEach(walk);


    //Calcula a pontuação total
    score = Object.values(tag).reduce(
        (acc, value) => acc + value,
        0
    );

    console.log("Score ", score);
    console.log("TAG", tag);
    return score;
}

