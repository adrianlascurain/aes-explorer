import type { Matrix4x4 } from '../types/matrix';
import StateGrid from './StateGrid';
import xorIcon from "../assets/xorop.svg";
import pentagonIcon from "../assets/pentagon.svg";
import triangleIcon from "../assets/triangle.svg";
import multiplicationIcon from "../assets/multiplication.svg";
import circleIcon from "../assets/circle.svg";
import {useState} from "react";
import './MixColumns.css'
import VisualMultiplication from './VisualMultiplication';
import GFMatrixMultiplier from './GFMatrixMultiplier';

function MixColumnsOp({state,fixedPolynomios} : {state: Matrix4x4, fixedPolynomios: Matrix4x4}){


    const [g1SelectedRow, setG1SelectedRow] = useState<number>(0);
    const [g1SelectedCol, setG1SelectedCol] = useState<number>(0);
    const [g2SelectedRow, setG2SelectedRow] = useState<number>(0);
    const [g2SelectedCol, setG2SelectedCol] = useState<number>(0);
    
    
    const handleClickOnElementG1 = (_e: React.MouseEvent, colIndex: number, rowIndex: number) => {        
        setG1SelectedRow(rowIndex);
        setG1SelectedCol(colIndex);
    };

    const handleClickOnElementG2 = (_e: React.MouseEvent, colIndex: number, rowIndex: number) => {        
        setG2SelectedRow(rowIndex);
        setG2SelectedCol(colIndex);
    };

    const handleOnMouseEnter = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains("selected-element")) target.classList.add("hover-on-element");
    };

    const handleOnMouseLeave = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        target.classList.remove("hover-on-element");
    };

    // Función que indica si una celda está seleccionada
    const isG1RowSelected = (col: number, _row: number) => g1SelectedCol === col;
    const isG2ColSelected = (_col: number, row: number) => g2SelectedRow === row;

    return(
        <>
            <div className="mco-grid-multiplication-container">
                <div className="mco-grid-group-container">
                    <div className="mco-title-container">
                        <img src={triangleIcon} alt=""/>
                        <h3 className="mco-grid-title">Polinomios</h3>    
                    </div>
                    <StateGrid
                        state={fixedPolynomios}
                        isCellSelected={isG1RowSelected}
                        handleClickOnElement={handleClickOnElementG1}
                        handleOnMouseEnter={() => {}}
                        handleOnMouseLeave={() => {}}
                        selectedColor="#2A58AD"
                        representation={'dec'}
                    />
                </div>
                <figure className="mco-multiplication-figure">
                    <img src={multiplicationIcon} alt="" />
                </figure>
                
                <div className="mco-grid-group-container">
                    <div className="mco-title-container">
                        <img src={pentagonIcon} alt=""/>
                        <h3 className="mco-grid-title">Estado</h3>    
                    </div>
                    <StateGrid
                        state={state}
                        isCellSelected={isG2ColSelected}
                        handleClickOnElement={handleClickOnElementG2}
                        handleOnMouseEnter={() => {}}
                        handleOnMouseLeave={() => {}}
                        selectedColor="#D65757"
                        representation={'dec'}
                    />
                </div>
            </div>
            <div className='mco-operations-container'>
                <div className='mco-xor-mul-container'>
                    <figure className='mco-xor-icon-figure'>
                        <img src={xorIcon} alt="" />
                    </figure>
                    <div className='mco-multi-visual-mul-container'>
                        <VisualMultiplication g1Row={g1SelectedCol} g1Col={0} g1Value={fixedPolynomios[g1SelectedCol][0]} g2Row={0} g2Col={g2SelectedRow} g2Value={state[0][g2SelectedRow]} representation='8bitBin' g1Img={triangleIcon} g2Img={pentagonIcon}></VisualMultiplication>
                        <VisualMultiplication g1Row={g1SelectedCol} g1Col={1} g1Value={fixedPolynomios[g1SelectedCol][1]} g2Row={1} g2Col={g2SelectedRow} g2Value={state[1][g2SelectedRow]} representation='8bitBin' g1Img={triangleIcon} g2Img={pentagonIcon}></VisualMultiplication>
                        <VisualMultiplication g1Row={g1SelectedCol} g1Col={2} g1Value={fixedPolynomios[g1SelectedCol][2]} g2Row={2} g2Col={g2SelectedRow} g2Value={state[2][g2SelectedRow]} representation='8bitBin' g1Img={triangleIcon} g2Img={pentagonIcon}></VisualMultiplication>
                        <VisualMultiplication g1Row={g1SelectedCol} g1Col={3} g1Value={fixedPolynomios[g1SelectedCol][3]} g2Row={3} g2Col={g2SelectedRow} g2Value={state[3][g2SelectedRow]} representation='8bitBin' g1Img={triangleIcon} g2Img={pentagonIcon}></VisualMultiplication>
                        <hr />
                    </div>
                </div>
                
                <GFMatrixMultiplier binaryTitle='Binario' hexTitle='Hex' polynomialTitle='Polinomio' g1Col={g1SelectedRow} g1Row={g1SelectedCol} g2Col={g2SelectedRow} g2Row={g2SelectedCol} g1Img={triangleIcon} g2Img={pentagonIcon} g1Value={fixedPolynomios[g1SelectedCol][g1SelectedRow]} g2Value={state[g2SelectedCol][g2SelectedRow]}/>
            </div>
            

        </>
        
    );
}

export default MixColumnsOp;