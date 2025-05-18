import { describe, it, expect } from 'vitest';
import { countOccurrences } from '../src/countOccurrences';

describe("countOccurrences", () => {
  it("counts repeated string values", () => {
    const input = ['a', 'b', 'a'];
    const output = countOccurrences(input);
    expect(output).toEqual({ a: 2, b: 1 });
  });

  it("counts repeated number values", () => {
    const input = [1, 2, 2, 3, 3, 3];
    const output = countOccurrences(input);
    expect(output).toEqual({ 1: 1, 2: 2, 3: 3 });
  });

  it("handles empty array", () => {
    const input = [];
    const output = countOccurrences(input);
    expect(output).toEqual({});
  });

  it("counts values, treating number 1 and string '1' as the same key", () => {
  const input = [1, '1', 1, 'a', 'a'];
  const output = countOccurrences(input);
  expect(output).toEqual({ "1": 3, "a": 2 });
});

  it("counts boolean values", () => {
    const input = [true, false, true, true];
    const output = countOccurrences(input);
    expect(output).toEqual({ true: 3, false: 1 });
  });

  it("counts null and undefined", () => {
    const input = [null, undefined, null];
    const output = countOccurrences(input);
    expect(output).toEqual({ null: 2, undefined: 1 });
  });
  it("handles objects as keys (stringifies them)", () => {
  const input = [{ a: 1 }, { a: 1 }];
  expect(countOccurrences(input)).toEqual({ '[object Object]': 2 });
  });
});