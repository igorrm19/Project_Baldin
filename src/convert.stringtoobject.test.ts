import { htmlStringToObject, test as runExampleTest } from './convert.stringtoobject';
import { actionStack } from '../fox/action.stack';

describe('htmlStringToObject', () => {
    beforeEach(() => {
        actionStack.clear();
        document.body.innerHTML = '';
    });

    it('converts a simple div to object', () => {
        const html = '<div id="test">Hello</div>';
        const result = htmlStringToObject(html);

        expect(result).toHaveLength(1);
        expect(result[0]!.type).toBe('element');
        expect(result[0]!.tagName).toBe('div');
        expect(result[0]!.attributes?.['id']).toBe('test');
        expect(result[0]!.children).toBeDefined();
        const children = result[0]!.children!;
        expect(children[0]!.type).toBe('text');
        expect(children[0]!.content).toBe('Hello');
    });

    it('handles nested elements', () => {
        const html = '<div><span>Inner</span></div>';
        const result = htmlStringToObject(html);

        expect(result[0]!.children![0]!.tagName).toBe('span');
        expect(result[0]!.children![0]!.children![0]!.content).toBe('Inner');
    });

    it('handles comments', () => {
        const html = '<div><!-- comment --></div>';
        const result = htmlStringToObject(html);

        expect(result[0]!.children![0]!.type).toBe('comment');
        expect(result[0]!.children![0]!.content).toBe(' comment ');
    });

    it('pushes to actionStack when onclick is present', () => {
        const html = '<button id="btn" onclick="handleClick()">Click</button>';
        htmlStringToObject(html);

        const actions = actionStack.getAll();
        expect(actions).toHaveLength(1);
        expect(actions[0]!).toEqual({
            id: 'btn',
            action: 'handleClick()',
            tagName: 'button'
        });
    });

    it('generates an ID if onclick is present but id is missing', () => {
        const html = '<button onclick="handleClick()">Click</button>';
        htmlStringToObject(html);

        const actions = actionStack.getAll();
        expect(actions).toHaveLength(1);
        expect(actions[0]!.id).toMatch(/^generated-/);
    });

    it('handles empty text nodes', () => {
        const html = '<div> </div>';
        const result = htmlStringToObject(html);
        expect(result[0]!.children![0]!.content).toBe('');
    });

    it('the test function runs without crashing', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        runExampleTest();
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});
