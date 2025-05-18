import { describe, it, expect } from 'vitest';
import { findAllByKey } from '../src/findAllByKey';

describe('findAllByKey', () => {

  it('extracts all "id" fields from a complex API-like response', () => {
    const apiResponse = {
      users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob', meta: { id: 'meta-1' } }
      ],
      admin: {
        id: 99,
        permissions: ['read', 'write']
      },
      meta: {
        generatedId: 'sys-001',
        id: 'meta-root'
      }
    };

    const result = findAllByKey(apiResponse, 'id');
    expect(result).toEqual([1, 2, 'meta-1', 99, 'meta-root']);
  });

  it('collects "title" fields from a CMS-style page tree', () => {
    const pages = {
      title: 'Home',
      children: [
        {
          title: 'About Us',
          children: [
            { title: 'Team' },
            { title: 'History' }
          ]
        },
        {
          title: 'Services',
          children: [
            { title: 'Consulting' },
            { title: 'Development' }
          ]
        }
      ]
    };

    const result = findAllByKey(pages, 'title');
    expect(result).toEqual(['Home', 'About Us', 'Team', 'History', 'Services', 'Consulting', 'Development']);
  });

  it('returns empty array if the object is deeply unrelated to the target key', () => {
    const irrelevant = {
      settings: {
        enabled: true,
        options: {
          alpha: 123,
          beta: 456
        }
      },
      list: [{ a: 1 }, { b: 2 }]
    };

    const result = findAllByKey(irrelevant, 'secret');
    expect(result).toEqual([]);
  });

  it('handles extremely deep nesting with mixed types and still finds all values', () => {
    const data = {
      layer1: {
        layer2: {
          layer3: {
            config: {
              name: 'Deep Config'
            },
            misc: {
              items: [
                { name: 'Array Item 1' },
                { name: 'Array Item 2' }
              ]
            }
          },
          other: {
            notes: [
              { content: 'irrelevant' },
              { config: { name: 'Nested Again' } }
            ]
          }
        }
      },
      name: 'Top-Level Name'
    };

    const result = findAllByKey(data, 'name');
    expect(result).toEqual(['Deep Config', 'Array Item 1', 'Array Item 2', 'Nested Again', 'Top-Level Name']);
  });

  it('still finds values when there are repeated keys on the same level', () => {
    const input = {
      section1: {
        name: 'A',
        name2: 'should not match'
      },
      section2: {
        name: 'B',
        name3: 'also skip this'
      }
    };

    const result = findAllByKey(input, 'name');
    expect(result).toEqual(['A', 'B']);
  });

  it('treats falsy values as valid and includes them', () => {
    const input = {
      name: '',
      child: {
        name: 0,
        grandchild: {
          name: false
        }
      }
    };

    const result = findAllByKey(input, 'name');
    expect(result).toEqual(['', 0, false]);
  });

  it('handles objects with cycles (circular references)', () => {
    const a: any = { name: 'Root' };
    const b: any = { name: 'Child', child: a };
    a.child = b; // circular

    const result = findAllByKey(a, 'name');
    expect(result).toEqual(['Root', 'Child']);
  });

});
