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