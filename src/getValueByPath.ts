/**
 * Retrieves the value at a given path within a nested object using a custom separator.
 *
 * @template T - The expected return type.
 * @param {object} obj - The object to search through.
 * @param {string} path - The path string (e.g., "a.b.c" or "a/b/c").
 * @param {string} [separator='.'] - Optional custom separator to split the path (default is dot '.').
 * @returns {T | undefined} - The value found at the path, or `undefined` if not found.
 *
 * @example
 * const data = { a: { b: { c: 42 } } };
 * getValueByPath<number>(data, 'a.b.c'); // ➜ 42
 * getValueByPath<number>(data, 'a/b/c', '/'); // ➜ 42
 */
export function getValueByPath<T = unknown>(
  obj: any,
  path: string,
  separator: string = '.'
): T | undefined {
  if (!path) return obj;
  return path.split(separator).reduce((acc, key) => acc?.[key], obj) as T | undefined;
}