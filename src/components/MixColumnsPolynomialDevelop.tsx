import type {JSX} from "react";
import { baseReductions } from "../constants/MixColumnsPolynomialConstants";
import "../constants/MixColumnsPolynomialConstants.css";
import "./MixColumnsPolynomialDevelop.css";

function MixColumnsPolynomialDevelop({nonReducedCoefficients} : {nonReducedCoefficients: number[]}){
    const polynomiosSubstitutes: Array<JSX.Element> = new Array();
    let needsSubstitution: boolean = false;
    let tempRed;
    
    if(nonReducedCoefficients.length > 8){
        needsSubstitution = true;
        console.log(nonReducedCoefficients);
            
        let delta = nonReducedCoefficients.length - 8; // 11 - 8 -> 3
        let initialTerm = nonReducedCoefficients.length - 1; //10
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
            <div className="mcpd-polynomial-substitution" style={needsSubstitution? {display:"block"} : {display:"none"}}>
                <p className="mcpd-polynomial-substitution-description">Substitución</p>
                <div className="mcpd-polynomial-substitution-content">
                    {polynomiosSubstitutes}
                </div>

            </div>
            <div className="mcpd-polynomial-xor-addition">

            </div>
        </>
        
    )
}

export default MixColumnsPolynomialDevelop;