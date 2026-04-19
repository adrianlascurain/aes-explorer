import type {JSX} from "react";
import { baseReductions } from "../constants/MixColumnsPolynomialConstants";
import "../constants/MixColumnsPolynomialConstants.css";
import "./MixColumnsPolynomialProcess.css";
import ChainedPolynomialExp from "./ChainedPolynomialExp";
import { modularGFReduction } from "../utilities/MixColumnUtils";

function MixColumnsPolynomialProcess({nonReducedCoefficients} : {nonReducedCoefficients: number[]}){
    const polynomiosSubstitutes: Array<JSX.Element> = new Array();
    let needsSubstitution: boolean = false;
    let needsAddition = false;
    let tempRed;
    const modularGFReductionArray = modularGFReduction(nonReducedCoefficients); 
    
    for(let i = 0; i < modularGFReductionArray.length; i++){
        if(modularGFReductionArray[i] > 1){
            needsAddition = true;
            break;
        }
    }

    if(nonReducedCoefficients.length > 8){
        needsSubstitution = true;
            
        let delta = nonReducedCoefficients.length - 8;
        let initialTerm = nonReducedCoefficients.length - 1;
        for(let i = 0; i < delta; i++){
            if(nonReducedCoefficients[i] > 0){
                tempRed = baseReductions.get(initialTerm);
                if(tempRed){
                    polynomiosSubstitutes.push(tempRed);
                }
            }
            initialTerm--;
        }
        polynomiosSubstitutes.reverse()
    }

    

    return (
        <>  
            <div className="mcpd-polynomial-multiplication" style={needsSubstitution? {display:"block"} : {display:"none"}}>
                <p className="mcpd-polynomial-multiplication-description">Sustitución</p>
                <div className="mcpd-polynomial-substitution-content">
                    {polynomiosSubstitutes}
                </div>

                <div className="mcpd-polynomial-multiplication-substitution-content">
                    <ChainedPolynomialExp replaceWithReduction nonReducedCoeffcients={nonReducedCoefficients}></ChainedPolynomialExp>
                </div>
            </div>

            <div className="mcpd-polynomial-xor-addition" style={needsAddition? {display:"block"} : {display:"none"}}>
                <p className="mcpd-polynomial-xor-addition-description">Adicion (XOR)</p>
                <div className="mcpd-polynomial-xor-addition-content">
                    <ChainedPolynomialExp applyXOR nonReducedCoeffcients={nonReducedCoefficients}></ChainedPolynomialExp>
                </div>
            </div>
        </>
        
    )
}

export default MixColumnsPolynomialProcess;