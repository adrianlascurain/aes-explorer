import type { JSX } from "react";

// Convert binary string to polynomio
const getPolynomialTerms = (binary: string) => {
    const terms: JSX.Element[] = [];
    const reversedBinary = binary.split('').reverse(); // Invert string to start from grade 0

    reversedBinary.forEach((bit, index) => {
        if (bit === '1') {
            // Construir el término
            if (index === 0) {
                // Término constante
                terms.push(<span key={index}>1</span>);
            } else if (index === 1) {
                // Término x
                terms.push(<span key={index}>x</span>);
            } else {
                // Término x^n
                terms.push(
                    <span key={index}>
                        x<sup>{index}</sup>
                    </span>
                );
            }
        }
    });

    return terms;
};

export default getPolynomialTerms;