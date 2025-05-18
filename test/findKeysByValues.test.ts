import { describe, it, expect } from 'vitest';
import { findKeysByValue } from '../src/findKeysByValue';

describe('findKeysByValue - basic and advanced use', () => {

  // 🟢 BASIC TESTS

  it('returns single match at root level', () => {
    const input = { a: 1, b: 2 };
    expect(findKeysByValue(input, 1)).toEqual(['a']);
  });

  it('returns multiple matches at root level', () => {
    const input = { a: 1, b: 1, c: 2 };
    expect(findKeysByValue(input, 1)).toEqual(['a', 'b']);
  });

  it('finds nested key path', () => {
    const input = { a: { b: { c: 3 } } };
    expect(findKeysByValue(input, 3)).toEqual(['a.b.c']);
  });

  it('returns empty array when no match', () => {
    const input = { a: 5, b: { c: 10 } };
    expect(findKeysByValue(input, 100)).toEqual([]);
  });

  it('matches falsy values: 0, false, null, ""', () => {
    const input = {
      a: 0,
      b: false,
      c: null,
      d: '',
      e: { f: 0, g: '' }
    };
    expect(findKeysByValue(input, 0)).toEqual(['a', 'e.f']);
    expect(findKeysByValue(input, false)).toEqual(['b']);
    expect(findKeysByValue(input, null)).toEqual(['c']);
    expect(findKeysByValue(input, '')).toEqual(['d', 'e.g']);
  });

  // 🟡 INTERMEDIATE TESTS

  it('returns all paths to repeated values in a nested structure', () => {
    const input = {
      x: 1,
      y: { a: 2, b: 1 },
      z: [{ m: 0}, { n: 1 }]
    };
    expect(findKeysByValue(input, 1)).toEqual(['x', 'y.b', 'z.1.n']);
  });

  it('includes numeric indices for array paths', () => {
    const input = {
      users: [
        { name: 'Alice' },
        { name: 'Bob' },
        { name: 'Alice' }
      ]
    };
    expect(findKeysByValue(input, 'Alice')).toEqual(['users.0.name', 'users.2.name']);
  });

  it('supports matching objects and arrays mixed', () => {
    const input = {
      root: {
        items: [
          { type: 'error', code: 500 },
          { type: 'success', code: 200 },
          { type: 'error', code: 404 }
        ],
        meta: {
          lastStatus: 'error'
        }
      }
    };
    expect(findKeysByValue(input, 'error')).toEqual([
      'root.items.0.type',
      'root.items.2.type',
      'root.meta.lastStatus'
    ]);
  });

  // 🔴 ADVANCED REAL-LIFE TESTS

  it('finds all keys that match a specific user role', () => {
    const input = {
      org: {
        teamA: { lead: 'admin', members: ['user', 'user'] },
        teamB: { lead: 'user', members: ['user', 'admin'] },
        meta: {
          primaryRole: 'admin'
        }
      }
    };
    expect(findKeysByValue(input, 'admin')).toEqual([
      'org.teamA.lead',
      'org.teamB.members.1',
      'org.meta.primaryRole'
    ]);
  });

  it('detects all null fields in a form-like structure', () => {
    const input = {
      form: {
        name: null,
        email: 'test@example.com',
        address: {
          street: null,
          city: 'NY'
        },
        tags: [null, 'active', null]
      }
    };
    expect(findKeysByValue(input, null)).toEqual([
      'form.name',
      'form.address.street',
      'form.tags.0',
      'form.tags.2'
    ]);
  });

  it('works with very deep and wide configuration trees', () => {
    const input = {
      config: {
        a: { b: { c: { d: { match: 'X' }, skip: true } } },
        unused: {
          key1: 'Y',
          key2: 'X',
          key3: 'Z'
        },
        array: [
          { val: 'X' },
          { val: 'Y' },
          { val: 'X' }
        ]
      },
      match: 'X'
    };
    expect(findKeysByValue(input, 'X')).toEqual([
      'config.a.b.c.d.match',
      'config.unused.key2',
      'config.array.0.val',
      'config.array.2.val',
      'match'
    ]);
  });
  it('handles circular references safely and still finds correct matches', () => {
    const nodeA: any = { label: 'A' };
    const nodeB: any = { label: 'B', next: nodeA };
    nodeA.next = nodeB; // circular reference

    const data = {
      start: nodeA,
      end: {
        label: 'A'
      }
    };

    expect(() => findKeysByValue(data, 'A')).not.toThrow();
    expect(findKeysByValue(data, 'A')).toEqual(['start.label', 'end.label']);
  });

  it('finds deeply buried values in nested arrays and object mixes', () => {
    const data = {
      logs: [
        {
          type: 'info',
          messages: [
            { level: 'low', code: 'NOTICE' },
            { level: 'high', code: 'ERROR' }
          ]
        },
        {
          type: 'error',
          messages: [
            { level: 'medium', code: 'ERROR' }
          ]
        }
      ],
      summary: {
        latest: { code: 'ERROR' }
      }
    };

    expect(findKeysByValue(data, 'ERROR')).toEqual([
      'logs.0.messages.1.code',
      'logs.1.messages.0.code',
      'summary.latest.code'
    ]);
  });

  it('handles duplicate values under different keys correctly', () => {
    const config = {
      a: 'MATCH',
      b: { x: 'MATCH' },
      c: { y: 'MATCH', z: 'SKIP' },
      d: ['MATCH', { inside: 'MATCH' }]
    };

    expect(findKeysByValue(config, 'MATCH')).toEqual([
      'a',
      'b.x',
      'c.y',
      'd.0',
      'd.1.inside'
    ]);
  });

  it('can distinguish between value types when matching numbers vs strings', () => {
    const input = {
      one: 1,
      strOne: '1',
      nested: {
        num: 1,
        str: '1'
      }
    };

    expect(findKeysByValue(input, 1)).toEqual(['one', 'nested.num']);
    expect(findKeysByValue(input, '1')).toEqual(['strOne', 'nested.str']);
  });

  it('handles complex menu schemas like UI builders', () => {
    const menu = {
      pages: [
        {
          title: 'Home',
          children: [
            { title: 'Dashboard' },
            { title: 'Analytics' }
          ]
        },
        {
          title: 'Settings',
          children: [
            { title: 'Profile' },
            { title: 'Security' },
            { title: 'Dashboard' }
          ]
        }
      ],
      footer: {
        links: [{ label: 'Dashboard' }, { label: 'Help' }]
      }
    };

    expect(findKeysByValue(menu, 'Dashboard')).toEqual([
      'pages.0.children.0.title',
      'pages.1.children.2.title',
      'footer.links.0.label'
    ]);
  });

  it('finds boolean values even when mixed with other types', () => {
    const settings = {
      system: {
        enabled: true,
        debug: false
      },
      user: {
        options: [
          { enabled: false },
          { enabled: true }
        ]
      },
      flags: [true, false, true]
    };

    expect(findKeysByValue(settings, true)).toEqual([
      'system.enabled',
      'user.options.1.enabled',
      'flags.0',
      'flags.2'
    ]);

    expect(findKeysByValue(settings, false)).toEqual([
      'system.debug',
      'user.options.0.enabled',
      'flags.1'
    ]);
  });
});
