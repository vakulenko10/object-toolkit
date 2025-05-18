import { groupBy } from '../src/groupBy';
import { describe, it, expect } from 'vitest';
describe("groupBy", () => {
  it("groups by a numeric key", () => {
    const input = [{ age: 20 }, { age: 30 }, { age: 20 }];
    const output = groupBy(input, 'age');
    expect(output).toEqual({
      "20": [{ age: 20 }, { age: 20 }],
      "30": [{ age: 30 }]
    });
  });

  it("groups by a string key", () => {
    const input = [{ type: 'fruit' }, { type: 'vegetable' }, { type: 'fruit' }];
    const output = groupBy(input, 'type');
    expect(output).toEqual({
      "fruit": [{ type: 'fruit' }, { type: 'fruit' }],
      "vegetable": [{ type: 'vegetable' }]
    });
  });

  it("returns empty object when input is empty", () => {
    const output = groupBy([], 'key');
    expect(output).toEqual({});
  });

  it("groups undefined values when key is missing", () => {
    const input = [{ a: 1 }, { b: 2 }];
    const output = groupBy(input, 'a');
    expect(output).toEqual({
      "1": [{ a: 1 }],
      "undefined": [{ b: 2 }]
    });
  });

  it("groups mixed types as string keys", () => {
    const input = [{ val: 1 }, { val: true }, { val: null }];
    const output = groupBy(input, 'val');
    expect(output).toEqual({
      "1": [{ val: 1 }],
      "true": [{ val: true }],
      "null": [{ val: null }]
    });
  });
});
