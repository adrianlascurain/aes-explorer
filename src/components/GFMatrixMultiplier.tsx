import { convert2System } from '../utilities/conversor';
import createPolynomialExpressions from '../utilities/polyCreator';
import './GFMatrixMultiplier.css'
import VisualMultiplication from './VisualMultiplication';
import type { JSX } from "react";

function GFMatrixMultiplier({g1Row,g1Col,g1Value,g2Row,g2Col,g2Value,hexTitle,binaryTitle,polynomialTitle, g1Img, g2Img} : {g1Row: number,g1Col: number, g1Value: number,g2Row: number,g2Col: number, g2Value: number, hexTitle: string, binaryTitle: string, polynomialTitle: string,g1Img: string, g2Img: string}){


    return(
        <div className='matrix-multiplication-container'>
            <hr />
            <VisualMultiplication g1Row={g1Row} g1Col={g1Col} g2Row={g2Row} g2Col={g2Col} representation='matrixPosition' g1Img={g1Img} g2Img={g2Img}/>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>{hexTitle}</th>
                        <th>{binaryTitle}</th>
                        <th>{polynomialTitle}</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <figure className='table-icon-figure'>
                                <img src={g1Img} alt="" />
                            </figure>
                        </td>
                        <td>{convert2System(g1Value,"hex")}</td>
                        <td>{convert2System(g1Value,"8bitBin")}</td>
                        <td>{}</td>
                    </tr>
                    <tr>
                        <td>
                            <figure className='table-icon-figure'>
                                <img src={g2Img} alt="" />
                            </figure>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default GFMatrixMultiplier;