import { describe, it, expect } from 'vitest';
import { flattenObject } from '../src/flattenObject';

describe('flattenObject', () => {
  it('flattens a flat object', () => {
    const input = { a: 1, b: 2 };
    const output = flattenObject(input);
    expect(output).toEqual({ a: 1, b: 2 });
  });

  it('flattens a deeply nested object', () => {
    const input = { a: { b: { c: { d: 5 } } } };
    const output = flattenObject(input);
    expect(output).toEqual({ 'a.b.c.d': 5 });
  });

  it('flattens multiple branches', () => {
    const input = {
      user: {
        name: 'Alice',
        profile: {
          age: 30,
          city: 'London',
        }
      },
      active: true
    };
    const output = flattenObject(input);
    expect(output).toEqual({
      'user.name': 'Alice',
      'user.profile.age': 30,
      'user.profile.city': 'London',
      'active': true
    });
  });

  it('preserves arrays as values', () => {
    const input = {
      tags: ['react', 'typescript'],
      author: {
        name: 'Eugene',
        skills: ['TS', 'JS']
      }
    };
    const output = flattenObject(input);
    expect(output).toEqual({
      'tags': ['react', 'typescript'],
      'author.name': 'Eugene',
      'author.skills': ['TS', 'JS']
    });
  });

  it('supports custom prefix', () => {
    const input = { c: 1 };
    const output = flattenObject(input, 'a.b');
    expect(output).toEqual({ 'a.b.c': 1 });
  });

  it('handles null and undefined safely', () => {
    const input = { a: null, b: { c: undefined } };
    const output = flattenObject(input);
    expect(output).toEqual({ a: null, 'b.c': undefined });
  });
});
