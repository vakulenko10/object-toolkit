export function findAllByKey(obj:any, targetKey:string, accumulatedResult:any[] = [], seen = new WeakSet()):any[]{
  if (typeof obj !== 'object' || obj === null) return [];
  seen.add(obj);
  for (const key in obj) {
    const value = obj[key];
    if (key === targetKey) {
        accumulatedResult.push(value);
    }
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) continue;

      findAllByKey(value, targetKey, accumulatedResult, seen);
    }
  }
  return accumulatedResult
}