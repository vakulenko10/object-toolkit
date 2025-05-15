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
 