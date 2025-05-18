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
