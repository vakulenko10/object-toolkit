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
