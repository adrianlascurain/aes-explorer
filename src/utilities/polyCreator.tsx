import type { CSSProperties, JSX } from "react";
import { arrayToBinaryString, reducedEquivalent } from "./MixColumnUtils";

// Convert binary string to polynomio
export const getPolynomialTerms = (binary: string, need2reduceStyle?: CSSProperties, replaceWithReduction: boolean = false, setLineThrough?: boolean[],setLineThroughBidimensional?: boolean[][]) => {
    if(!setLineThrough){
        setLineThrough = new Array(binary.length).fill(false);
    }
    
    const terms: JSX.Element[] = [];
    const reversedBinary = binary.split('').reverse();
    const reversedSetLineThrough = [...setLineThrough].reverse()
    let isLineThrough = false;
    let equivalent: number[] | undefined;
    let replacements: JSX.Element[];
    
    reversedBinary.forEach((bit, index) => {    
        if (bit === '1') {
    
            isLineThrough = reversedSetLineThrough[index];
            // Construir el término
            if (index === 0) {            
                // Término constante
                terms.push(<span key={index} style={isLineThrough? {textDecoration: "line-through red 4px"}: {textDecoration: "none"}}>1</span>);
                
            } else if (index === 1) {
                // Término x
                terms.push(<span key={index} style={isLineThrough? {textDecoration: "line-through red 4px"}: {textDecoration: "none"}}>x</span>);
                
            } else {
                // Término x^n
                if(replaceWithReduction && index >= 8){
                    equivalent = reducedEquivalent.get(index);
                    if(equivalent){
                        replacements = getPolynomialTermsByArray(equivalent,need2reduceStyle,false,setLineThrough,setLineThroughBidimensional).reverse();
                        replacements = replacements.map((term, internalIndex) => (
                        <span key={`inner-term-${index}-${internalIndex}`}>
                            {internalIndex > 0 && ' + '}
                            {term}
                        </span>
                    ));
                    }
                }

                terms.push(
                    <span key={index} style={index >= 8 ? need2reduceStyle : {}}>
                        {
                            replaceWithReduction && index >= 8? <>{replacements}</> : <span style={{textDecoration: isLineThrough? "line-through red 4px": "none"}}>x<sup>{index}</sup></span>
                        }
                    </span>
                );
            }
        }
    });

    return terms;
};

export const getPolynomialTermsByArray = (termsArray: number[], need2reduceStyle?: CSSProperties, replaceWithReduction: boolean = false, setLineThrough?: boolean[],setLineThroughBidimensional?: boolean[][]) => {
    termsArray.reverse()
    const binaryString = arrayToBinaryString(termsArray);
    return getPolynomialTerms(binaryString,need2reduceStyle,replaceWithReduction,setLineThrough,setLineThroughBidimensional);
};