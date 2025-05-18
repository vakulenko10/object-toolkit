/**
 * Counts how many times each unique value appears in an array.
 *
 * @param {any[]} arr - The input array containing values to count. Can include strings, numbers, booleans, etc.
 * @returns {Record<any, number>} - An object where each key is a unique value from the array, and its value is the number of occurrences.
 *
 * @example
 * countOccurrences(['a', 'b', 'a'])
 * // ➜ { a: 2, b: 1 }
 *
 * @example
 * countOccurrences([1, 2, 2, 3])
 * // ➜ { 1: 1, 2: 2, 3: 1 }
 */
export function countOccurrences(arr:any[]):Record<any, number>{
    let result:Record<any, number> = {}
    arr.forEach((item)=>{
        if(result.hasOwnProperty(item)){
            result[item] +=1;
        }
        else{
            result[item] = 1;
        }
    })
    return result
}