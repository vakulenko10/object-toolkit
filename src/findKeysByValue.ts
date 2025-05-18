/**
 * Recursively searches a deeply nested object or array and returns all dot-notated paths
 * where the value strictly equals the specified target value.
 *
 * @param {any} obj - The object or array to search.
 * @param {any} value - The value to search for (strict equality is used).
 * @param {string} [parentKey=''] - Internal: used to build full dot-notated paths during recursion.
 * @param {string[]} [accumulatedResult=[]] - Internal: collects all matching paths.
 * @param {WeakSet<object>} [seen=new WeakSet()] - Internal: prevents infinite loops caused by circular references.
 * @returns {string[]} - An array of dot-notated paths where the value equals the specified target value.
 *
 * @example
 * findKeysByValue({ a: 1, b: { c: 1 } }, 1);
 * // ➜ ['a', 'b.c']
 *
 * @example
 * findKeysByValue({
 *   user: { status: 'active' },
 *   meta: { status: 'inactive' }
 * }, 'active');
 * // ➜ ['user.status']
 */
export function findKeysByValue(
  obj: any,
  value: any,
  parentKey: string = '',
  accumulatedResult: string[] = [],
  seen: WeakSet<object> = new WeakSet()
): string[] {
  if (typeof obj !== 'object' || obj === null) return accumulatedResult;
  if (seen.has(obj)) return accumulatedResult;

  seen.add(obj);

  for (const key in obj) {
    const path = parentKey ? `${parentKey}.${key}` : key;

    if (obj[key] === value) {
      accumulatedResult.push(path);
    }

    const child = obj[key];
    if (typeof child === 'object' && child !== null) {
      findKeysByValue(child, value, path, accumulatedResult, seen);
    }
  }

  return accumulatedResult;
}
