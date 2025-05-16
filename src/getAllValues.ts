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