import type { JSX } from "react";
import AesCipher from "../cipher/AesCipher";

function PolynomialMultiplication({coefficients, reducedVersion} : {coefficients: number[], reducedVersion: boolean}){
    const expandedPolynomio = AesCipher.expandCoefficients(coefficients);
    return (
        expandedPolynomio.map((coeffs) => {
            coeffs.map((coeff, index) => (
                <span key={`term-${index}`}>
                    {index > 0 && ' + '}
                    {coeff}
                </span>
            ))
        })
    );
}

export default PolynomialMultiplication;

