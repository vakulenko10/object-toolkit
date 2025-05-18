/**
 * Recursively collects all primitive values from a deeply nested object.
 *
 * By default, the function skips `null` values and does not include arrays or functions.
 * You can configure this behavior using optional flags.
 *
 * @param {Record<string, any>} obj - The object to extract values from.
 * @param {any[]} [result=[]] - Internal: an array used to accumulate results during recursion.
 * @param {boolean} [skipNullableValues=true] - Whether to skip `null` values. Defaults to `true`.
 * @param {boolean} [includeOtherValues=false] - Whether to include arrays and functions in the result. Defaults to `false`.
 * @returns {any[]} - A flat array of collected values.
 *
 * @example
 * getAllValues({ a: 1, b: { c: 2, d: null } })
 * // ➜ [1, 2]
 *
 * @example
 * getAllValues({ a: [1, 2], b: () => {}, c: null }, [], false, true)
 * // ➜ [[1, 2], [Function], null]
 */
export function getAllValues(
  obj: Record<string, any>,
  result: any[] = [],
  skipNullableValues = true,
  includeOtherValues = false
): any[] {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const value = obj[key];

    if (value === null && skipNullableValues) continue;

    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        if (includeOtherValues) result.push(value);
        continue;
      }
      getAllValues(value, result, skipNullableValues, includeOtherValues);
    } else if (typeof value === 'function') {
      if (includeOtherValues) result.push(value);
    } else {
      result.push(value);
    }
  }

  return result;
}