import type { CSSProperties, JSX } from "react";
import { arrayToBinaryString, reducedEquivalent } from "./MixColumnUtils";

// Convert binary string to polynomio
export const getPolynomialTerms = (binary: string, need2reductStyle?: CSSProperties, replaceWithReduction: boolean = false, setLineThrough?: boolean[]) => {
    if(!setLineThrough){
        setLineThrough = new Array(binary.length).fill(false);
    }
    
    const terms: JSX.Element[] = [];
    const reversedBinary = binary.split('').reverse(); // Invert string to start from grade 0
    let equivalent: number[] | undefined;
    let replacements: JSX.Element[];
    let isLineThrough = false;
    reversedBinary.forEach((bit, index) => {
        if (bit === '1') {
            // Construir el término
            if (index === 0) {
                // Término constante
                terms.push(<span key={index} style={isLineThrough? {textDecoration: "line-through"}: {textDecoration: "none"}}>1</span>);
            } else if (index === 1) {
                // Término x
                terms.push(<span key={index} style={isLineThrough? {textDecoration: "line-through"}: {textDecoration: "none"}}>x</span>);
            } else {
                // Término x^n
                if(replaceWithReduction && index >= 8){
                    equivalent = reducedEquivalent.get(index);
                    if(equivalent){
                        replacements = getPolynomialTermsByArray(equivalent.reverse(),need2reductStyle,false).reverse();
                        replacements = replacements.map((term, internalIndex) => (
                        <span key={`inner-term-${index}-${internalIndex}`}>
                            {internalIndex > 0 && ' + '}
                            {term}
                        </span>
                    ));
                    }
                }

                terms.push(
                    <span key={index} style={index >= 8 ? need2reductStyle : {}}>
                        {
                            replaceWithReduction && index >= 8? <>{replacements}</> : <>x<sup>{index}</sup></>
                        }
                    </span>
                );
            }
        }
    });

    return terms;
};

export const getPolynomialTermsByArray = (termsArray: number[], need2reductStyle?: CSSProperties, replaceWithReduction: boolean = false, setLineThrough?: boolean[]) => {
    const binaryString = arrayToBinaryString(termsArray.reverse());
    return getPolynomialTerms(binaryString,need2reductStyle,replaceWithReduction,setLineThrough);
};