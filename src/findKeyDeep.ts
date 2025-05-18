export function findKeyDeep(obj: any, targetKey: string, seen = new WeakSet()): any {
  if (typeof obj !== 'object' || obj === null) return undefined;

  seen.add(obj);

  for (const key in obj) {
    if (key === targetKey) return obj[key];

    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) continue;

      const result = findKeyDeep(value, targetKey, seen);
      if (result !== undefined) return result;
    }
  }

  return undefined;
}