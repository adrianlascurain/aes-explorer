import pentagonIcon from "../assets/pentagon.svg";
import triangleIcon from "../assets/triangle.svg";
import multiplicationIcon from "../assets/multiplication.svg";
import './VisualMultiplication.css'
import type { Matrix4x4 } from "../types/matrix";
import type { numericSystem } from "../types/numericSystems";
import { convert2System } from "../utilities/conversor";

function VisualMultiplication({g1Row,g1Col,g2Row,g2Col,state,representation,g1Img,g2Img} : {g1Row: number,g1Col: number,g2Row: number,g2Col: number, state?: Matrix4x4, representation: numericSystem, g1Img: string, g2Img: string}){

    let g1ValueToShow = representation === "matrixPosition" ? `(${g1Row + 1},${g1Col + 1})` : convert2System(state? state[g1Row][g1Col] : 0,representation);
    let g2ValueToShow = representation === "matrixPosition" ? `(${g2Row + 1},${g2Col + 1})` : convert2System(state? state[g2Row][g2Col] : 0,representation);

    return(
        // Considerar extraer componente para reutilizar en múltiples operaciones
        <div className="vm-multiplication-container">
            <div className="multiplication-grid-container">
                <figure className="icon-figure">
                    <img src={g1Img} alt="" />
                </figure>
                <div className="matrix-value-container">
                    {g1ValueToShow}
                </div>
            </div>
            <figure className="multiplication-icon-figure">
                <img src={multiplicationIcon} alt="" />
            </figure>
            <div className="multiplication-grid-container">
                <figure className="icon-figure">
                    <img src={g2Img} alt="" />
                </figure>
                <div className="matrix-value-container">
                    {g2ValueToShow}
                </div>
            </div>
        </div>
    )
}

export default VisualMultiplication;