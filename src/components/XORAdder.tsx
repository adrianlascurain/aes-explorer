import { convert2System } from "../utilities/conversor";
import type {JSX} from "react"
import "./XORAdder.css"
import xorIcon from "../assets/xorop.svg";

function XORAdder({operands,leftAttachable, rightAttachable} : {operands: number[], leftAttachable?: JSX.Element[], rightAttachable?: JSX.Element[]}){
    const xorResult = operands.reduce((accumulator,current) => accumulator ^current,0);
    return(
        <div className="xora-wrapper">
            <table className="xora-operation-table">
                {operands.map((operand,index) => {
                    return(
                        <tr>
                            <td>{leftAttachable? leftAttachable[index] : null}</td>
                            <td className="xora-bit-chain">{convert2System(operand,"8bitBin")}</td>
                            <td>{rightAttachable? rightAttachable[index] : null}</td>
                        </tr>
                    )
                })}
                <tr>
                    <td className="xora-xor-cell">
                        <figure className="xora-xor-icon-figure"><img src={xorIcon} alt="" /></figure>
                    </td>
                    <td><hr className="xora-result-hr"/></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td className="xora-bit-chain">{convert2System(xorResult,"8bitBin")}</td>
                    <td></td>
                </tr>
            </table>
            <div className="xora-result-bit-chain">
                <span>{convert2System(xorResult,"8bitBin")}</span>
                <span className="xora-result-arrow">⟶</span>
                <span className="xora-row-col-result">{convert2System(xorResult,"hexPadded")}</span>
            </div>
        </div>
    )
}

export default XORAdder;