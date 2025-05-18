/**
 * Reconstructs a nested object from a flattened object with dot-notated keys.
 *
 * Takes an object where keys represent paths (e.g., `'user.profile.name'`) and builds a deeply nested structure.
 * You can customize the key separator used for nesting (default is a dot).
 *
 * @param {Record<string, any>} flatObj - The flattened object with dot-notated (or custom-separated) keys.
 * @param {string} [separator='.'] - The string used to split keys into nested levels.
 * @returns {Record<string, any>} - A reconstructed nested object based on the flattened key paths.
 *
 * @example
 * unflattenObject({ 'user.name': 'Alice', 'user.age': 30 })
 * // ➜ { user: { name: 'Alice', age: 30 } }
 *
 * @example
 * unflattenObject({ 'a_b_c': 1, 'a_b_d': 2 }, '_')
 * // ➜ { a: { b: { c: 1, d: 2 } } }
 */
export function unflattenObject(
   flatObj: Record<string, any>,
   separator: string = '.'
 ): Record<string, any> {
   const result: Record<string, any> = {};
 
   for (const flatKey in flatObj) {
     const parts = flatKey.split(separator);
     let current = result;
 
     for (let i = 0; i < parts.length; i++) {
       const part = parts[i];
 
       // If it's the last part, assign the value
       if (i === parts.length - 1) {
         current[part] = flatObj[flatKey];
       } else {
         // If the key doesn’t exist or isn’t an object, create an object
         if (!(part in current) || typeof current[part] !== 'object') {
           current[part] = {};
         }
 
         // Go deeper
         current = current[part];
       }
     }
   }
 
   return result;
 }
 