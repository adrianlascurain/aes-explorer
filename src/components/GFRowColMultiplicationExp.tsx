import { Fragment } from "react";
import type { Matrix4x4 } from "../types/matrix";
import multiplicationIcon from "../assets/multiplication.svg";
import "./GFRowColMultiplicationExp.css"
import type { numericSystem } from "../types/numericSystems";
import { convert2System } from "../utilities/conversor";
import xorIcon from "../assets/xorop.svg";
import EnclosedTermsOperation from "./EnclosedTermsOperation";
import AesCipher from "../cipher/AesCipher";

function GFRowColMultiplicationExp({polynomios, polynomiosRow, state, stateCol, representation, inverseMixColumns = true} : {polynomios : Matrix4x4, polynomiosRow: number, state: Matrix4x4, stateCol: number, representation: numericSystem, inverseMixColumns?: boolean}){
    
    const pairValues = (firstArray: number[][], firstArrayRow: number, secondArray: number[][], secondArrayColumn: number) : [number,number][] => {
        return firstArray[firstArrayRow].map((value,i) => {
            return [value,secondArray[i][secondArrayColumn]]
        })
    }

    let pairedValues = pairValues(polynomios,polynomiosRow,state,stateCol);
    let pairedValuesLen = pairValues.length;

    return (
        <div className="gfrcme-component-wrapper">
            {pairedValues.map((values,i) => (
                <Fragment key={i}>
                    {i < pairedValuesLen - 1 ? (
                        <>
                            <EnclosedTermsOperation values={values} iconSrc={multiplicationIcon} representation={representation}></EnclosedTermsOperation>
                            <figure className="gfrcme-addition-figure">
                                <img src={xorIcon} alt="" />
                            </figure>
                        </>
                    ) : (
                        <>
                            <EnclosedTermsOperation values={values} iconSrc={multiplicationIcon} representation={representation}></EnclosedTermsOperation>
                        </>
                    )}
                </Fragment>
            ))}
            <span className="gfrcme-equal-sign">=</span>
            <span className="gfrcme-multiplication-result">{convert2System(AesCipher.generalMixColumns(state,inverseMixColumns? AesCipher.MIX_COLUMNS_INVERSE_MATRIX: AesCipher.MIX_COLUMNS_MATRIX)[polynomiosRow][stateCol],representation)}</span>

        </div>
    )
}

export default GFRowColMultiplicationExp;