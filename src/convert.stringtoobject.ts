import { actionStack } from '../fox/action.stack';

export interface HtmlNodeDetail {
    type: 'element' | 'text' | 'comment';
    tagName?: string;
    attributes?: Record<string, string>;
    content?: string;
    children?: HtmlNodeDetail[];
}

export function htmlStringToObject(html: string): HtmlNodeDetail[] {
    actionStack.clear(); // Clear stack before new parse
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    // We iterate over the body's children to avoid getting the <html>, <head>, and <body> tags themselves
    // unless the user input specifically contains them. 
    // For partial HTML fragments, body.childNodes is usually what we want.
    return Array.from(doc.body.childNodes).map(node => domNodeToObject(node));
}

function domNodeToObject(node: Node): HtmlNodeDetail {
    const detail: HtmlNodeDetail = {
        type: 'element' // default, will be overwritten
    };

    if (node.nodeType === Node.ELEMENT_NODE) {
        detail.type = 'element';
        const element = node as Element;
        detail.tagName = element.tagName.toLowerCase();

        if (element.hasAttributes()) {
            detail.attributes = {};
            for (let i = 0; i < element.attributes.length; i++) {
                const attr = element.attributes[i];
                detail.attributes[attr.name] = attr.value;
            }

            // Check for onclick and add to stack
            if (detail.attributes['onclick']) {
                const action = detail.attributes['onclick'];
                // Ensure element has an ID for reference, or use a generated one if you prefer not to mutate DOM
                // For this example, we'll just use the existing ID or "unknown"
                const id = detail.attributes['id'] || `generated-${Math.random().toString(36).substr(2, 9)}`;

                actionStack.push({
                    id: id,
                    action: action,
                    tagName: detail.tagName
                });
            }
        }

        if (element.hasChildNodes()) {
            detail.children = Array.from(element.childNodes).map(child => domNodeToObject(child));
        }
    } else if (node.nodeType === Node.TEXT_NODE) {
        detail.type = 'text';
        detail.content = node.textContent?.trim() || '';
        // If text node is empty (just whitespace), we might want to ignore it or keep it. 
        // For "detailed" view, keeping it is safer, but trimming helps readability.
    } else if (node.nodeType === Node.COMMENT_NODE) {
        detail.type = 'comment';
        detail.content = node.textContent || '';
    }

    return detail;
}

const htmlExample = `
<div id="main-container" class="p-4">
    <h1>Test Title</h1>
    <button id="btn-1" onclick="alert('Clicked!')">Click Here</button>
    <p data-info="example" onclick="console.log('Paragraph clicked')">Test paragraph with <strong>bold</strong> text.</p>
    <!-- A comment -->
</div>`;

export function test(): void {
    console.log("Original HTML:", htmlExample);
    const result = htmlStringToObject(htmlExample);
    console.log("Detailed Object:", JSON.stringify(result, null, 2));
    console.log("Action Stack:", actionStack.getAll());
}
