export function findKeyDeep(obj:Record<string, any>|any, targetKey:string):any{
    // console.log(obj, "of type", typeof(obj))
    if(typeof obj != 'object'){
        return undefined
    }
    for(let key in obj){
        // console.log('key is: ', key)
        if(key == targetKey){
            // console.log('we are returning from first if check')
            // console.log('the obj[key] found value is: ',obj[key])
            return obj[key]
        }
        if(typeof obj[key] == 'object' && obj[key]!=null){
            // console.log("type of:", obj[key], 'is', typeof(obj[key]))
            // console.log('we are moving deeper into recursion')
            const result = findKeyDeep(obj[key], targetKey);
             if (result !== undefined) {
                return result;}
        }
        
        
    }
    // console.log('we are returning default undefined')
    return undefined
}
const input = {
      a: null,
      b: {
        c: {
          target: 'found'
        }
      }
    };
console.log('the returned value is', findKeyDeep(input, 'target'));