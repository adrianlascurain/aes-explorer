import "../components/EnclosedOperation.css"
import type {JSX} from "react"

function EnclosedOperation({operationContent,firstEncloseChar,secondEncloseChar} : {operationContent: JSX.Element, firstEncloseChar: string,secondEncloseChar: string}){
    return (
    <div className='eo-general-operation'>
        <span className="eo-left-enclose-char">{firstEncloseChar}</span>
        <span className='eo-operation-content'>
            {operationContent}
        </span>
        <span className="eo-right-enclose-char">{secondEncloseChar}</span>
    </div>
    );
}

export default EnclosedOperation;