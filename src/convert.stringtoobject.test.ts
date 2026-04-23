import { htmlStringToObject } from './convert.stringtoobject';

describe('htmlStringToObject', () => {
  it('parses a simple HTML fragment into object nodes', () => {
    const result = htmlStringToObject('<div id="test"><span>Hi</span></div>');

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      type: 'element',
      tagName: 'div',
      attributes: { id: 'test' },
    });
    expect(result[0].children?.[0]).toMatchObject({
      type: 'element',
      tagName: 'span',
    });
  });
});
