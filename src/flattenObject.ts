/**
 * Flattens a deeply nested object into a single-level object with dot-notated keys.
 * 
 * Nested properties are converted into keys using dot notation (e.g., `"a.b.c"`), while arrays and null values
 * are preserved as-is without flattening their internal structure.
 *
 * @param {Record<string, any>} obj - The input object to flatten.
 * @param {string} [parentKey] - Internal: used to build the full key path during recursion.
 * @param {Record<string, any>} [result={}] - Internal: accumulator object used to collect flattened key-value pairs.
 * @returns {Record<string, any>} - A flattened object where each key represents a full path to a value.
 *
 * @example
 * flattenObject({ a: { b: { c: 1 } }, d: 2 })
 * // ➜ { 'a.b.c': 1, 'd': 2 }
 *
 * @example
 * flattenObject({ user: { name: 'Alice', age: 30 } })
 * // ➜ { 'user.name': 'Alice', 'user.age': 30 }
 */
export function flattenObject(
    obj:Record<string, any>,
    parentKey?: string,
    result: Record<string, any>={}):Record<string, any>
    {
        for (const key in obj) {
            const path = parentKey ? `${parentKey}.${key}` : key;
            if (
                typeof obj[key] === 'object' &&
                obj[key] !== null &&
                !Array.isArray(obj[key])
              ) {
              flattenObject(obj[key], path, result);
            } else{
              result[path] = obj[key];
            }
          }
          return result;
}
