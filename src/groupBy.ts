/**
 * Groups an array of objects by a specified key.
 *
 * Creates an object where each key corresponds to a unique value from the specified property in the array,
 * and its value is an array of all objects that share that key's value.
 *
 * @param {any[]} arr - The array of objects to group.
 * @param {string} key - The key to group the objects by (must exist on each object).
 * @returns {Record<string, any[]>} - An object with grouped entries based on the key's value.
 *
 * @example
 * groupBy(
 *   [{ age: 20 }, { age: 30 }, { age: 20 }],
 *   'age'
 * );
 * // ➜ {
 * //   '20': [{ age: 20 }, { age: 20 }],
 * //   '30': [{ age: 30 }]
 * // }
 *
 * @example
 * groupBy(
 *   [{ type: 'fruit', name: 'apple' }, { type: 'vegetable', name: 'carrot' }],
 *   'type'
 * );
 * // ➜ {
 * //   fruit: [{ type: 'fruit', name: 'apple' }],
 * //   vegetable: [{ type: 'vegetable', name: 'carrot' }]
 * // }
 */
export function groupBy(arr:any[], key:string):Record<string, any> {
  return arr.reduce((acc, obj) => {
    const groupKey = obj[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(obj);
    return acc;
  }, {});
}