/**
 * Recursively finds all paths to keys in a nested object or array that match the specified target key name.
 *
 * Each result is returned as a dot-notated string path, indicating the location of the matched key in the structure.
 * Supports circular reference protection via a WeakSet.
 *
 * @param {any} obj - The object or array to search through.
 * @param {string} targetKey - The key name to look for.
 * @param {string} [parentKey=''] - Internal: used to build full dot-paths during recursion.
 * @param {string[]} [accumulatedResult=[]] - Internal: collects all matching paths found so far.
 * @param {WeakSet<object>} [seen=new WeakSet()] - Internal: used to track visited objects and prevent infinite recursion in circular structures.
 * @returns {string[]} - An array of dot-notated paths pointing to all instances of the target key.
 *
 * @example
 * getPathsToKey({ user: { profile: { name: 'Alice' }, name: 'Admin' } }, 'name')
 * // ➜ ['user.profile.name', 'user.name']
 *
 * @example
 * getPathsToKey({ a: { b: { c: 1 } }, d: { c: 2 } }, 'c')
 * // ➜ ['a.b.c', 'd.c']
 */
export function getPathsToKey(
  obj: any,
  targetKey: string,
  parentKey: string = '',
  accumulatedResult: string[] = [],
  seen: WeakSet<object> = new WeakSet()
): string[] {
  if (typeof obj !== 'object' || obj === null) return accumulatedResult;
  if (seen.has(obj)) return accumulatedResult;

  seen.add(obj);

  for (const key in obj) {
    const path = parentKey ? `${parentKey}.${key}` : key;

    if (key === targetKey) {
      accumulatedResult.push(path);
    }

    const child = obj[key];
    if (typeof child === 'object' && child !== null) {
      getPathsToKey(child, targetKey, path, accumulatedResult, seen);
    }
  }

  return accumulatedResult;
}
