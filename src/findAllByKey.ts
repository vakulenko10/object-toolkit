/**
 * Recursively searches through a deeply nested object or array and returns all values associated with the specified key.
 *
 * @param {any} obj - The input object or array to search.
 * @param {string} targetKey - The key name to look for during traversal.
 * @param {any[]} [accumulatedResult=[]] - Internal: used to collect matching values during recursion.
 * @param {WeakSet<object>} [seen=new WeakSet()] - Internal: used to prevent infinite loops from circular references.
 * @returns {any[]} - An array of all values found for the specified key, in the order they were encountered.
 *
 * @example
 * findAllByKey(
 *   {
 *     users: [{ name: 'Alice' }, { name: 'Bob' }],
 *     meta: { name: 'System' }
 *   },
 *   'name'
 * );
 * // ➜ ['Alice', 'Bob', 'System']
 */
export function findAllByKey(obj:any, targetKey:string, accumulatedResult:any[] = [], seen = new WeakSet()):any[]{
  if (typeof obj !== 'object' || obj === null) return [];
  seen.add(obj);
  for (const key in obj) {
    const value = obj[key];
    if (key === targetKey) {
        accumulatedResult.push(value);
    }
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) continue;

      findAllByKey(value, targetKey, accumulatedResult, seen);
    }
  }
  return accumulatedResult
}