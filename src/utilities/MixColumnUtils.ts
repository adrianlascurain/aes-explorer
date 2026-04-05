export const reducedEquivalent: Map<number,number[]> = new Map([
    [10,[1,1,0,1,1,0,0]],
    [9,[1,1,0,1,1,0]],
    [8,[1,1,0,1,1]]
]);

export function arrayToBinaryString(array: number[]): string{
    const outStr: string[] = [];
    array.forEach((element) => {
        outStr.push(element === 1 ? '1' : '0');
    })
    
    return outStr.join('');
}

export function expandCoefficients(coeffs: number[]): (0|1)[][] {
    const max = Math.max(...coeffs);
    const layers: (0|1)[][] = [];

    for (let k = 0; k < max; k++) {
        layers.push(
            coeffs.map(c => (c > k ? 1 : 0) as (0|1))
        );
    }

    return layers;
}

export function modularGFReduction(array: number[]): number[]{
    if(array.length < 8) return array;
    let outArray: number[] = [...array];
    
    for(let i = array.length - 1; i >= 8; i--){
        for(let j = 0; j < array[array.length - i - 1]; j++){
        let equivalent = reducedEquivalent.get(i);
            if(equivalent){
                outArray = addCoefficients(outArray,equivalent);
            }
        }
    }

    for(let i = 0; i < array.length - 8; i++){
        outArray[i] = 0;
    }

    return outArray;
}

export function addCoefficients(sumDestinationArray: number[], sourceArray: number[]){
    let minLen = Math.min(sumDestinationArray.length,sourceArray.length);
    let maxLen = Math.max(sumDestinationArray.length,sourceArray.length);
    let deltaLen = maxLen - minLen;
    let outArray = [...sumDestinationArray];

    for(let i = maxLen - 1; i >= deltaLen; i--){
        outArray[i] = sumDestinationArray[i] + sourceArray[i - deltaLen];
    }

    return outArray;
}

export function createLineThroughOfNonReducedCoefficients(nonReducedCoefficients: number[]){    
    const maxTerm = Math.max(...nonReducedCoefficients);
    const lastArray = maxTerm;
    
    // Initialize 2D array with all false values
    const outArray: boolean[][] = Array(maxTerm)
    .fill(null)
    .map(() => Array(nonReducedCoefficients.length).fill(false));

    // Set true where coefficient is grater than one and is not the last array to expand
    for(let i = 0; i < nonReducedCoefficients.length; i++){
        const currentElement = nonReducedCoefficients[i];
        if(currentElement > 1){
            if(currentElement % 2 === 0){
                for(let j = 0; j < lastArray; j++){
                    outArray[j][i] = true;
                }    
            } else {
                for(let j = 0; j < lastArray; j++){
                    if(j < currentElement - 1){
                        outArray[j][i] = true;
                    }
                }   
            }
        }
    }

    return outArray;
}