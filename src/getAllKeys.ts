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