import { describe, it, expect } from 'vitest';
import { unflattenObject } from '../src/unflattenObject';

describe('unflattenObject', () => {
  it('handles single-level keys', () => {
    const input = { a: 1, b: 2 };
    const result = unflattenObject(input);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('handles deeply nested keys', () => {
    const input = { 'a.b.c.d.e': 5 };
    const result = unflattenObject(input);
    expect(result).toEqual({ a: { b: { c: { d: { e: 5 } } } } });
  });

  it('handles multiple nested branches', () => {
    const input = {
      'user.name.first': 'John',
      'user.name.last': 'Doe',
      'user.profile.age': 30,
      'user.profile.city': 'Berlin'
    };
    const result = unflattenObject(input);
    expect(result).toEqual({
      user: {
        name: {
          first: 'John',
          last: 'Doe'
        },
        profile: {
          age: 30,
          city: 'Berlin'
        }
      }
    });
  });

  it('handles custom separator', () => {
    const input = {
      'settings-theme-color': 'blue',
      'settings-theme-font': 'sans',
      'settings-layout-sidebar': true
    };
    const result = unflattenObject(input, '-');
    expect(result).toEqual({
      settings: {
        theme: {
          color: 'blue',
          font: 'sans'
        },
        layout: {
          sidebar: true
        }
      }
    });
  });

  it('overwrites values if needed (conflict)', () => {
    const input = {
      'a': 1,
      'a.b': 2 // 'a' was a number, now trying to make it an object
    };
    const result = unflattenObject(input);
    // Depending on implementation, this may overwrite or ignore the second key
    // Here we assume it overwrites `a = 1` with `a = { b: 2 }`
    expect(result).toEqual({ a: { b: 2 } });
  });

  it('handles numeric key names as object properties', () => {
    const input = {
      'root.0.key': 'value',
      'root.1.key': 'another'
    };
    const result = unflattenObject(input);
    expect(result).toEqual({
      root: {
        0: { key: 'value' },
        1: { key: 'another' }
      }
    });
  });
});
