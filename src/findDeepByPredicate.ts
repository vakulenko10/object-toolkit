/**
 * Recursively searches through a deeply nested object or array and returns all key-value pairs 
 * where the provided predicate function returns true.
 *
 * @param {any} obj - The object or array to search through.
 * @param {(key: string, value: any) => boolean} predicate - A function that determines if a key-value pair should be included.
 * @param {string} [parentKey=''] - Internal: used to construct the full dot-notated path during recursion.
 * @param {Record<string, any>} [accumulatedResult={}] - Internal: stores matching key-value pairs with their paths.
 * @param {WeakSet<object>} [seen=new WeakSet()] - Internal: tracks visited objects to safely handle circular references.
 * @returns {Record<string, any>} - An object where each key is the dot-notated path to a matching value, and the value is the matched data.
 *
 * @example
 * findDeepByPredicate(
 *   {
 *     user: { name: 'Alice', age: 30 },
 *     meta: { name: 'Admin', active: true }
 *   },
 *   (key, value) => key === 'name'
 * );
 * // ➜ {
 * //   "user.name": "Alice",
 * //   "meta.name": "Admin"
 * // }
 */
export function findDeepByPredicate(
  obj: any,
  predicate: (key: string, value: any) => boolean,
  parentKey: string = '',
  accumulatedResult: Record<string, any> = {},
  seen: WeakSet<object> = new WeakSet()
): Record<string, any> {
  if (typeof obj !== 'object' || obj === null) return accumulatedResult;

  seen.add(obj);

  for (const key in obj) {
    const value = obj[key];
    const path = parentKey ? `${parentKey}.${key}` : key;

    if (predicate(key, value)) {
      accumulatedResult[path] = value;
    }
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) continue;
      findDeepByPredicate(value, predicate, path, accumulatedResult, seen);
    }
  }

  return accumulatedResult;
}
