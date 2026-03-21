
import { convert2System } from "../utilities/conversor";
import type { numericSystem } from "../types/numericSystems";
import "./EnclosedTermsOperation.css";

function EnclosedTermsOperation({values, representation, iconSrc}:{values: number[], representation: numericSystem, iconSrc: string}){
    
    const valuesLen = values.length;
    return (
            <div className="eto-component-wrapper">
                <span className="eto-left-parenthesis">(</span>
                {values.map((value, i) => (
                    <> 
                        {i < valuesLen-1 ? (
                            <>
                                <span className="eto-value">
                                    {convert2System(value, representation)}
                                </span>
                                <figure className="eto-operation-figure">
                                    <img src={iconSrc} alt="" />
                                </figure>
                            </>
                        ): (
                                <span className="eto-value">
                                    {convert2System(value, representation)}
                                </span>
                        )}
                    </>
                ))}
                <span className="eto-right-parenthesis">)</span>
            </div>
    );
}

export default EnclosedTermsOperation;

{/* <div className="eto-row-col-multiplication">
                        <span className="eto-first-grid-value">
                            {convert2System(value, representation)}
                        </span>
                        <figure className="eto-multiplication-figure">
                            <img src={iconSrc} alt="" />
                        </figure>
                        <span className="eto-second-grid-value">
                            {}
                        </span>
                    </div> */}