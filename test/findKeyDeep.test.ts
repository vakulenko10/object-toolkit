import { describe, it, expect } from 'vitest';
import { findKeyDeep } from '../src/findKeyDeep';
import { performance } from 'node:perf_hooks';

function timedFind(input: any, key: string, label: string) {
  const start = performance.now();
  const result = findKeyDeep(input, key);
  const duration = performance.now() - start;
  console.log(`⏱ ${label.padEnd(40)} ➜ ${duration.toFixed(3)} ms`);
  return result;
}

describe('findKeyDeep', () => {
  it('finds a key at the first level', () => {
    const input = { name: 'Alice', age: 30 };
    const result = timedFind(input, 'name', 'first level key');
    expect(result).toBe('Alice');
  });

  it('finds a key nested multiple levels deep', () => {
    const input = {
      user: {
        profile: {
          contact: {
            email: 'alice@example.com'
          }
        }
      }
    };
    const result = timedFind(input, 'email', 'nested key (3 levels)');
    expect(result).toBe('alice@example.com');
  });

  it('returns undefined if key does not exist', () => {
    const input = { a: 1, b: { c: 2 } };
    const result = timedFind(input, 'z', 'missing key');
    expect(result).toBeUndefined();
  });

  it('stops at the first match in depth-first order', () => {
    const input = {
      a: { target: 'first' },
      b: { target: 'second' }
    };
    const result = timedFind(input, 'target', 'depth-first match');
    expect(result).toBe('first');
  });

  it('works with nested null values', () => {
    const input = {
      a: null,
      b: {
        c: {
          target: 'found'
        }
      }
    };
    const result = timedFind(input, 'target', 'null in path');
    expect(result).toBe('found');
  });

  it('returns undefined for non-object input', () => {
    expect(timedFind(null, 'key', 'null input')).toBeUndefined();
    expect(timedFind(undefined, 'key', 'undefined input')).toBeUndefined();
    expect(timedFind(42, 'key', 'number input')).toBeUndefined();
  });

  it('ignores arrays (unless objects inside)', () => {
    const input = {
      arr: [
        { key: 'value1' },
        { key: 'value2' }
      ]
    };
    const result = timedFind(input, 'key', 'array of objects');
    expect(result).toBe('value1');
  });
  it('handles complex array of mixed values with nested "bambuk" key', () => {
  const input = {
    data: [
      'random string',
      null,
      42,
      false,
      {
        other: {
          nested: {
            objects: [
              { random: true },
              { stuff: [1, 2, 3] }
            ]
          }
        }
      },
      {
        other: {
          nested: {
            objects: [
              { random: true },
              { stuff: [1, 2, 3] }
            ]
          }
        }
      },
      {
        other: {
          nested: {
            objects: [
              { random: true },
              { stuff: [1, 2, 3] }
            ]
          }
        }
      },
      {
        other: {
          nested: {
            objects: [
              { random: true },
              { stuff: [1, 2, 3] }
            ]
          }
        }
      },
      [
        { x: 1 },
        [
          [
            { y: 'nope' },
            {
              z: [
                { alpha: 'still nothing' },
                {
                  klucz: {
                    key: {
                      bambuk: '🎯 FOUND IT!'
                    }
                  }
                }
              ]
            }
          ]
        ]
      ],
      {
        other: {
          nested: {
            objects: [
              { random: true },
              { stuff: [1, 2, 3] }
            ]
          }
        }
      }
    ],
    junk: {
      clutter: [
        undefined,
        [{ broken: null }],
        'noise',
        { more: { nonsense: [true, false, null] } }
      ]
    }
  };

  const result = timedFind(input, 'bambuk', 'complex mixed array with deeply nested bambuk');
  expect(result).toBe('🎯 FOUND IT!');
  });
  it('finds a deeply nested field in a simulated user profile response', () => {
    const input = {
      status: 'ok',
      data: {
        users: [
          {
            id: 1,
            info: {
              profile: {
                details: {
                  name: 'Alice'
                }
              }
            }
          },
          {
            id: 2,
            info: {
              profile: {
                details: {
                  name: 'Bob'
                }
              }
            }
          }
        ]
      }
    };
    const result = timedFind(input, 'name', 'realistic user profile');
    expect(result).toBe('Alice');
  });

  it('finds the first matching product title in an e-commerce catalog', () => {
    const input = {
      store: {
        products: [
          {
            id: 'p1',
            data: {
              meta: {
                title: 'Wireless Mouse',
                price: 25
              }
            }
          },
          {
            id: 'p2',
            data: {
              meta: {
                title: 'Mechanical Keyboard',
                price: 100
              }
            }
          }
        ]
      }
    };
    const result = timedFind(input, 'title', 'product catalog');
    expect(result).toBe('Wireless Mouse');
  });

  it('finds nested comment text in a blog post response', () => {
    const input = {
      post: {
        id: '123',
        comments: [
          {
            user: 'john',
            body: {
              text: 'First comment',
              timestamp: '2023-01-01'
            }
          },
          {
            user: 'jane',
            body: {
              text: 'Second comment',
              timestamp: '2023-01-02'
            }
          }
        ]
      }
    };
    const result = timedFind(input, 'text', 'nested blog comment');
    expect(result).toBe('First comment');
  });

  it('finds the role field in a deeply nested company structure', () => {
    const input = {
      company: {
        departments: {
          engineering: {
            teams: {
              backend: {
                lead: {
                  name: 'Vitalii',
                  role: 'Tech Lead'
                }
              }
            }
          }
        }
      }
    };
    const result = timedFind(input, 'role', 'company structure');
    expect(result).toBe('Tech Lead');
  });

  it('returns undefined when target key is deeply missing in realistic object', () => {
    const input = {
      apiResponse: {
        result: {
          items: [
            { id: 1, value: 'A' },
            { id: 2, value: 'B' }
          ]
        }
      }
    };
    const result = timedFind(input, 'email', 'missing in real data');
    expect(result).toBeUndefined();
  });
});
