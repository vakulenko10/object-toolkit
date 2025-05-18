import { getAllValues } from '../src/getAllValues';
import { describe, it, expect } from 'vitest';
describe('getAllValues', () => {
  it('should collect all primitive values from nested object', () => {
    const obj = { a: { b: 2 }, c: 3 };
    expect(getAllValues(obj)).toEqual([2, 3]);
  });

  it('should handle deep nesting', () => {
    const obj = { a: { b: { c: { d: 5 } } }, e:"1" };
    expect(getAllValues(obj)).toEqual([5, "1"]);
  });

  it('should skip null values by default', () => {
    const obj = { a: null, b: { c: 4 } };
    expect(getAllValues(obj)).toEqual([4]);
  });

  it('should include null values if skipNullableValues is false', () => {
    const obj = { a: null, b: { c: null }, d: 3 };
    expect(getAllValues(obj, [], false)).toEqual([null, null, 3]);
  });

  it('should ignore arrays and functions by default', () => {
    const obj = {
      a: [1, 2],
      b: () => {},
      c: 5,
    };
    expect(getAllValues(obj)).toEqual([5]);
  });

  it('should include arrays and functions if includeOtherValues is true', () => {
    const fn = () => {};
    const obj = {
      a: [1, 2],
      b: fn,
      c: 6,
    };
    expect(getAllValues(obj, [], true, true)).toEqual([[1, 2], fn, 6]);
  });

  it('should return empty array for empty input', () => {
    expect(getAllValues({})).toEqual([]);
  });
});
