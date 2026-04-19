import type { CSSProperties, JSX } from "react";
import {getPolynomialTermsByArray} from "../utilities/polyCreator"
import { createLineThroughOfNonReducedCoefficients, expandCoefficients, modularGFReduction } from "../utilities/MixColumnUtils";


function ChainedPolynomialExp({nonReducedCoeffcients,replaceWithReduction = false, applyXOR = false} : {nonReducedCoeffcients: number[], replaceWithReduction?: boolean, applyXOR?: boolean}){
    
    let termsArray = [];
    const cssStyleForReduction: CSSProperties = {"border": "solid 2px orange"};
    let lineThroughArray: boolean[][];
    let terms: JSX.Element[][] = [];
    
    if(applyXOR && replaceWithReduction){
        const modularReducedCoefficients= modularGFReduction(nonReducedCoeffcients);      
        termsArray = expandCoefficients([...nonReducedCoeffcients].reverse());
        lineThroughArray = createLineThroughOfNonReducedCoefficients([...modularReducedCoefficients]);
        terms = termsArray.map((layer,index) => {return getPolynomialTermsByArray(layer,cssStyleForReduction,replaceWithReduction,lineThroughArray[index],lineThroughArray)})  
    }else if(applyXOR){
        nonReducedCoeffcients = modularGFReduction(nonReducedCoeffcients);        
        termsArray = expandCoefficients([...nonReducedCoeffcients].reverse());
        lineThroughArray = createLineThroughOfNonReducedCoefficients([...nonReducedCoeffcients]);
        terms = termsArray.map((layer,index) => {return getPolynomialTermsByArray(layer,cssStyleForReduction,replaceWithReduction,lineThroughArray[index])})
    }else{
        termsArray = expandCoefficients([...nonReducedCoeffcients].reverse());
        terms = termsArray.map((layer) => {return getPolynomialTermsByArray(layer,cssStyleForReduction,replaceWithReduction)})    
    }
    

    // Renderizar con separadores "+"
    const renderedTerms = terms.map((layer, layerIndex) => (
        layer.reverse().map((element,index) => {
            return(
                <span key={`term-${index}`}>
                {(layerIndex > 0 || index > 0) && ' + '}
                {element}
                </span>
            )
        })
    ));

    return (
        <div className="polynomio-container" style={{textAlign: "center"}}>
            {renderedTerms.length > 0 ? renderedTerms : <span>0</span>}
        </div>
    );
}

export default ChainedPolynomialExp;