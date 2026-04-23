import { parseHTML } from '../../../core/src/module/dom/parserDiv';

describe('parseHTML', () => {
  it('returns a stack of divs with correct parent references', () => {
    const html = '<div id="outer"><div id="inner"></div></div><div id="sibling"></div>';
    const result = parseHTML(html);

    expect(result).toHaveLength(3);
    expect(result.map(item => item.id)).toEqual(['outer', 'inner', 'sibling']);
    const innerNode = result.find(item => item.id === 'inner');
    expect(innerNode?.parent?.id).toBe('outer');
  });
});
