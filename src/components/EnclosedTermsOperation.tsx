import { Fragment } from "react";
import { convert2System } from "../utilities/conversor";
import type { numericSystem } from "../types/numericSystems";
import "./EnclosedTermsOperation.css";

function EnclosedTermsOperation({values, representation, iconSrc}:{values: number[], representation: numericSystem, iconSrc: string}){
    
    const valuesLen = values.length;
    return (
            <div className="eto-component-wrapper">
                <span className="eto-left-parenthesis">(</span>
                {values.map((value, i) => (
                    <Fragment key={`eto-val-${i}`}>
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
                    </Fragment>
                ))}
                <span className="eto-right-parenthesis">)</span>
            </div>
    );
}

export default EnclosedTermsOperation;