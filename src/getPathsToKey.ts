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
