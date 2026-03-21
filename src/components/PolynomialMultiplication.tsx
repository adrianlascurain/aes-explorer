import PolynomialExp from "./PolynomialExp";
import "../components/PolynomialMultiplication.css"

function PolynomialMultiplication({firstPoly, secondPoly} : {firstPoly: number, secondPoly: number}){
    return (
    <div className='pm-polynomial-multiplication'>
        <span className="pm-left-parenthesis">(</span>
        <span className='pm-polynomial-term'>
            <PolynomialExp value={firstPoly} />
        </span>
        <span className="pm-right-parenthesis">)</span>
        <span className='pm-separator'>•</span>
        <span className="pm-left-parenthesis">(</span>
        <span className='pm-polynomial-term'>
            <PolynomialExp value={secondPoly} />
        </span>
        <span className="pm-right-parenthesis">)</span>
    </div>
    );
}

export default PolynomialMultiplication;

