import { getAllKeys } from '../src/getAllKeys';
import { describe, it, expect } from 'vitest';
describe('getAllKeys', () => {
  it('should return top-level keys', () => {
    const obj = { a: 1, b: 2 };
    expect(getAllKeys(obj)).toEqual(['a', 'b']);
  });

  it('should return nested keys with dot notation', () => {
    const obj = { a: { b: 2 }, c: 3 };
    expect(getAllKeys(obj)).toEqual(['a', 'a.b', 'c']);
  });

  it('should handle deep nesting', () => {
    const obj = { a: { b: { c: { d: 5 } } }, e: 10 };
    expect(getAllKeys(obj)).toEqual(['a', 'a.b', 'a.b.c', 'a.b.c.d', 'e']);
  });

  it('should return empty array for empty object', () => {
    expect(getAllKeys({})).toEqual([]);
  });

  it('should ignore arrays and treat them as values', () => {
    const obj = { a: [1, 2, 3], b: { c: 5 } };
    expect(getAllKeys(obj)).toEqual(['a', 'b', 'b.c']);
  });

  it('should ignore null and undefined as children', () => {
    const obj = { a: null, b: undefined, c: { d: 1 } };
    expect(getAllKeys(obj)).toEqual(['a', 'b', 'c', 'c.d']);
  });

  it('should skip functions and treat them as leaf values', () => {
    const obj = {
      a: () => {},
      b: {
        c: function () {},
        d: 1
      }
    };
    expect(getAllKeys(obj)).toEqual(['a', 'b', 'b.c', 'b.d']);
  });
  it('should use dot as default separator', () => {
    const obj = { a: { b: 1 }, c: 2 };
    expect(getAllKeys(obj)).toEqual(['a', 'a.b', 'c']);
  });

  it('should support custom separator "/"', () => {
    const obj = { a: { b: { c: 1 } }, d: 2 };
    expect(getAllKeys(obj, '', '/')).toEqual(['a', 'a/b', 'a/b/c', 'd']);
  });

  it('should support custom separator "_"', () => {
    const obj = { x: { y: 5 }, z: 9 };
    expect(getAllKeys(obj, '', '_')).toEqual(['x', 'x_y', 'z']);
  });

  it('should work correctly when parentKey is non-empty', () => {
    const obj = { foo: { bar: 1 } };
    expect(getAllKeys(obj, 'root', '/')).toEqual(['root/foo', 'root/foo/bar']);
  });
});
