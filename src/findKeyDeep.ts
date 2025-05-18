/**
 * Recursively searches through a deeply nested object or array and returns the value of the first key
 * that matches the specified key name, using depth-first traversal.
 *
 * @param {any} obj - The object or array to search through.
 * @param {string} targetKey - The name of the key to search for.
 * @param {WeakSet<object>} [seen=new WeakSet()] - Internal: used to track visited objects and prevent infinite recursion from circular references.
 * @returns {any} - The value associated with the first matching key found, or undefined if not found.
 *
 * @example
 * findKeyDeep({
 *   user: {
 *     profile: {
 *       name: 'Alice'
 *     }
 *   }
 * }, 'name');
 * // ➜ 'Alice'
 *
 * @example
 * findKeyDeep({
 *   a: { b: { c: { target: 42 } } },
 *   d: { e: 'skip' }
 * }, 'target');
 * // ➜ 42
 */
export function findKeyDeep(obj: any, targetKey: string, seen = new WeakSet()): any {
  if (typeof obj !== 'object' || obj === null) return undefined;

  seen.add(obj);

  for (const key in obj) {
    if (key === targetKey) return obj[key];

    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) continue;

      const result = findKeyDeep(value, targetKey, seen);
      if (result !== undefined) return result;
    }
  }

  return undefined;
}