import { convert2System } from "../utilities/conversor";
import getPolynomialTerms from "../utilities/polyCreator"

function PolynomialExp({value} : {value:number}){
    const binaryString: string = convert2System(value,"8bitBin");
    const terms = getPolynomialTerms(binaryString).reverse();

    // Renderizar con separadores "+"
    const renderedTerms = terms.map((term, index) => (
        <span key={`term-${index}`}>
            {index > 0 && ' + '}
            {term}
        </span>
    ));

    return (
        <div className="polynomio-container" style={{textAlign: "center"}}>
            {renderedTerms.length > 0 ? renderedTerms : <span>0</span>}
        </div>
    );
}

export default PolynomialExp;