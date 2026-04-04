import type { CSSProperties } from "react";
import {getPolynomialTermsByArray} from "../utilities/polyCreator"


function ChainedPolynomialExp({termsArray,replaceWithReduction = false} : {termsArray: (0|1)[][], replaceWithReduction?: boolean}){
    
    const cssStyleForReduction: CSSProperties = {"border": "solid 2px orange"};
    const terms = termsArray.map((layer) => {return getPolynomialTermsByArray(layer,cssStyleForReduction,replaceWithReduction)})

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