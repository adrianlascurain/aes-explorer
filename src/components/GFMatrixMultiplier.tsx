import { convert2System } from '../utilities/conversor';
import './GFMatrixMultiplier.css'
import PolynomialExp from './PolynomialExp';
import VisualMultiplication from './VisualMultiplication';

function GFMatrixMultiplier({g1Row,g1Col,g1Value,g2Row,g2Col,g2Value,hexTitle,binaryTitle,polynomialTitle, g1Img, g2Img} : {g1Row: number,g1Col: number, g1Value: number,g2Row: number,g2Col: number, g2Value: number, hexTitle: string, binaryTitle: string, polynomialTitle: string,g1Img: string, g2Img: string}){

    return(
        <div className='matrix-multiplication-container'>
            <hr />
            <VisualMultiplication g1Row={g1Row} g1Col={g1Col} g1Value={g1Value} g2Row={g2Row} g2Col={g2Col} g2Value={g2Value} representation='matrixPosition' g1Img={g1Img} g2Img={g2Img}/>
            <table className="gfmm-multiplication-resume-table">
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
                        <td><PolynomialExp value={g1Value}></PolynomialExp></td>
                    </tr>
                    <tr>
                        <td>
                            <figure className='table-icon-figure'>
                                <img src={g2Img} alt="" />
                            </figure>
                        </td>
                        <td>{convert2System(g2Value,"hex")}</td>
                        <td>{convert2System(g2Value,"8bitBin")}</td>
                        <td><PolynomialExp value={g2Value}></PolynomialExp></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default GFMatrixMultiplier;