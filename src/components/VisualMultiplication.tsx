import multiplicationIcon from "../assets/multiplication.svg";
import './VisualMultiplication.css'
import type { numericSystem } from "../types/numericSystems";
import { convert2System } from "../utilities/conversor";

function VisualMultiplication({g1Row,g1Col,g1Value,g2Row,g2Col,g2Value,representation,g1Img,g2Img} : {g1Row: number,g1Col: number,g1Value: number,g2Row: number,g2Col: number, g2Value:number, representation: numericSystem, g1Img?: string, g2Img?: string}){

    let g1ValueToShow = representation === "matrixPosition" ? `(${g1Row + 1},${g1Col + 1})` : convert2System(g1Value? g1Value : 0,representation);
    let g2ValueToShow = representation === "matrixPosition" ? `(${g2Row + 1},${g2Col + 1})` : convert2System(g2Value? g2Value : 0,representation);
    let showG1Img = g1Img && true;
    let showG2Img = g2Img && true;
    return(
        <div className="vm-multiplication-container">
            <div className="vm-multiplication-grid-container">
                <figure style={showG1Img? {display: "block"}: {display: "none"}} className="vm-icon-figure">
                    <img src={g1Img} alt="" />
                </figure>
                <div style={showG1Img? {} : {minWidth: "max-content"}} className="vm-matrix-value-container">
                    {g1ValueToShow}
                </div>
            </div>
            <figure className="vm-multiplication-icon-figure">
                <img src={multiplicationIcon} alt="" />
            </figure>
            <div className="vm-multiplication-grid-container">
                <figure style={showG2Img? {display: "block"} : {display: "none"}} className="vm-icon-figure">
                    <img src={g2Img} alt="" />
                </figure>
                <div style={showG2Img? {} : {minWidth: "max-content"}} className="vm-matrix-value-container">
                    {g2ValueToShow}
                </div>
            </div>
        </div>
    )
}

export default VisualMultiplication;