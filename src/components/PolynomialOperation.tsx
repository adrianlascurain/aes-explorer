import PolynomialExp from "./PolynomialExp";
import "../components/PolynomialOperation.css"
import EnclosedOperation from "./EnclosedOperation";

function PolynomialOperation({firstPoly, secondPoly, operationChar} : {firstPoly: number, secondPoly: number, operationChar: string}){
    return (
    <div className='pm-polynomial-operation'>
        <EnclosedOperation firstEncloseChar="(" secondEncloseChar=")" operationContent={<PolynomialExp value={firstPoly} />}></EnclosedOperation>
        <span className='pm-separator'>{operationChar}</span>
        <EnclosedOperation firstEncloseChar="(" secondEncloseChar=")" operationContent={<PolynomialExp value={secondPoly} />}></EnclosedOperation>
    </div>
    );
}

export default PolynomialOperation;

