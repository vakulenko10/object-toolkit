/**
 * Recursively retrieves all keys from a deeply nested object as dot-notated paths.
 *
 * Each key represents the full path to a property in the object, using a customizable separator.
 * Arrays are ignored and not traversed.
 *
 * @param {Record<string, any>} object - The object to extract keys from.
 * @param {string} [parentKey=''] - Internal: used to build the path during recursion.
 * @param {string} [separator='.'] - The string used to separate nested key levels in the output.
 * @returns {string[]} - An array of all key paths found in the object.
 *
 * @example
 * getAllKeys({ user: { profile: { name: 'Alice' } }, age: 30 })
 * // ➜ ['user', 'user.profile', 'user.profile.name', 'age']
 *
 * @example
 * getAllKeys({ a: { b: 1, c: 2 } }, '', '_')
 * // ➜ ['a', 'a_b', 'a_c']
 */
export function getAllKeys(object: Record<string, any>, parentKey = '', separator: string = '.'): string[] {
  const result: string[] = [];

  for (const key in object) {
    if (!object.hasOwnProperty(key)) continue;

    const fullKey = parentKey ? `${parentKey}${separator}${key}` : key;
    result.push(fullKey);

    const value = object[key];
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result.push(...getAllKeys(value, fullKey, separator));
    }
  }

  return result;
}