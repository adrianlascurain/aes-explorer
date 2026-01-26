import type { Matrix4x4 } from '../types/matrix';
import StateGrid, { type StateGridHandle } from './StateGrid';
import xorIcon from "../assets/xorop.svg";
import pentagonIcon from "../assets/pentagon.svg";
import triangleIcon from "../assets/triangle.svg";
import multiplicationIcon from "../assets/multiplication.svg";
import circleIcon from "../assets/circle.svg";
import {useEffect, useRef, useState} from "react";
import './MixColumns.css'
import VisualMultiplication from './VisualMultiplication';
import GFMatrixMultiplier from './GFMatrixMultiplier';
import AesCipher from '../cipher/AesCipher';
import PolynomialExp from './PolynomialExp';

function MixColumnsOp({state,fixedPolynomios} : {state: Matrix4x4, fixedPolynomios: Matrix4x4}){
    const stateGrid1Ref = useRef<StateGridHandle>(null);
    const lastGrid1Ref = useRef<HTMLElement>(null);
    const lastGrid1SelectedRow = useRef<number>(0);
    const lastGrid1SelectedCol = useRef<number>(0);

    const stateGrid2Ref = useRef<StateGridHandle>(null);
    const lastGrid2Ref = useRef<HTMLElement>(null);
    const lastGrid2SelectedRow = useRef<number>(0);
    const lastGrid2SelectedCol = useRef<number>(0);

    const [g1SelectedRow, setG1SelectedRow] = useState<number>(0);
    const [g1SelectedCol, setG1SelectedCol] = useState<number>(0);
    const [g1SelectedCell, setG1SelectedCell] = useState<HTMLElement>();

    const [g2SelectedRow, setG2SelectedRow] = useState<number>(0);
    const [g2SelectedCol, setG2SelectedCol] = useState<number>(0);
    const [g2SelectedCell, setG2SelectedCell] = useState<HTMLElement>();
    
    useEffect(() => {
        getCells(g1SelectedRow, g1SelectedCol, g2SelectedRow, g2SelectedCol);
    },[g1SelectedRow, g1SelectedCol, g2SelectedRow, g2SelectedCol]);

    const handleClickOnElementG1 = (_e: React.MouseEvent, colIndex: number, rowIndex: number) => {        
        setG1SelectedRow(rowIndex);
        setG1SelectedCol(colIndex);
        setG2SelectedCol(rowIndex);
    };

    const handleClickOnElementG2 = (_e: React.MouseEvent, colIndex: number, rowIndex: number) => {        
        setG1SelectedRow(colIndex);
        setG2SelectedRow(rowIndex);
        setG2SelectedCol(colIndex);
    };

    const highlightStyles: React.CSSProperties = {
        background: "#00FF00"
    }

    const g1notHighlightStyles: React.CSSProperties = {
        background: "#2A58AD"
    }

    const g2notHighlightStyles: React.CSSProperties = {
        background: "#D65757"
    }
    
    const getCells = (i1: number,j1 :number, i2: number,j2 :number) => {
        if(g1SelectedCell){
            if(lastGrid1SelectedRow.current != g1SelectedRow && lastGrid1SelectedCol.current == g1SelectedCol){
                Object.assign(g1SelectedCell.style,g1notHighlightStyles);
            }
            lastGrid1Ref.current = g1SelectedCell;
        }

        if(g2SelectedCell){
            if(lastGrid2SelectedCol.current != g2SelectedCol && lastGrid2SelectedRow.current == g2SelectedRow){
                Object.assign(g2SelectedCell.style,g2notHighlightStyles)
            }
            lastGrid2Ref.current = g2SelectedCell;
        }

        const g1Cell = stateGrid1Ref.current?.getElement(j1,i1);
        const g2Cell = stateGrid2Ref.current?.getElement(j2,i2);

        if(g1Cell){
            lastGrid1SelectedRow.current = g1SelectedRow;
            lastGrid1SelectedCol.current = g1SelectedCol;
            setG1SelectedCell(g1Cell)
            Object.assign(g1Cell.style,highlightStyles);
        }

        if(g2Cell){
            lastGrid2SelectedRow.current = g2SelectedRow;
            lastGrid2SelectedCol.current = g2SelectedCol;
            setG2SelectedCell(g2Cell)
            Object.assign(g2Cell.style,highlightStyles);
        }
    }

    const handleOnMouseEnter = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains("selected-element")) target.classList.add("hover-on-element");
    };

    const handleOnMouseLeave = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        target.classList.remove("hover-on-element");
    };

    // Función que indica si una celda está seleccionada
    const isG1RowSelected = (col: number, _row: number) => g1SelectedCol === col ;
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
                        ref={stateGrid1Ref}
                        isCellSelected={isG1RowSelected}
                        handleClickOnElement={handleClickOnElementG1}
                        handleOnMouseEnter={() => {}}
                        handleOnMouseLeave={() => {}}
                        selectedColor="#2A58AD"
                        representation={'hexPadded'}
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
                        ref={stateGrid2Ref}
                        isCellSelected={isG2ColSelected}
                        handleClickOnElement={handleClickOnElementG2}
                        handleOnMouseEnter={() => {}}
                        handleOnMouseLeave={() => {}}
                        selectedColor="#D65757"
                        representation={'hexPadded'}
                    />
                </div>
            </div>
            <div className='mco-operations-container'>
                <div className='mco-xor-mul-container'>
                    <figure className='mco-xor-icon-figure'>
                        <img src={xorIcon} alt="" />
                    </figure>
                    <div className='mco-multi-visual-mul-container'>
                        <VisualMultiplication g1Row={g1SelectedCol} g1Col={0} g1Value={fixedPolynomios[g1SelectedCol][0]} g2Row={0} g2Col={g2SelectedRow} g2Value={state[0][g2SelectedRow]} representation='hexPadded' g1Img={triangleIcon} g2Img={pentagonIcon}></VisualMultiplication>
                        <VisualMultiplication g1Row={g1SelectedCol} g1Col={1} g1Value={fixedPolynomios[g1SelectedCol][1]} g2Row={1} g2Col={g2SelectedRow} g2Value={state[1][g2SelectedRow]} representation='hexPadded' g1Img={triangleIcon} g2Img={pentagonIcon}></VisualMultiplication>
                        <VisualMultiplication g1Row={g1SelectedCol} g1Col={2} g1Value={fixedPolynomios[g1SelectedCol][2]} g2Row={2} g2Col={g2SelectedRow} g2Value={state[2][g2SelectedRow]} representation='hexPadded' g1Img={triangleIcon} g2Img={pentagonIcon}></VisualMultiplication>
                        <VisualMultiplication g1Row={g1SelectedCol} g1Col={3} g1Value={fixedPolynomios[g1SelectedCol][3]} g2Row={3} g2Col={g2SelectedRow} g2Value={state[3][g2SelectedRow]} representation='hexPadded' g1Img={triangleIcon} g2Img={pentagonIcon}></VisualMultiplication>
                        <hr />
                    </div>
                </div>
                
                <GFMatrixMultiplier binaryTitle='Binario' hexTitle='Hex' polynomialTitle='Polinomio' g1Col={g1SelectedRow} g1Row={g1SelectedCol} g2Col={g2SelectedRow} g2Row={g2SelectedCol} g1Img={triangleIcon} g2Img={pentagonIcon} g1Value={fixedPolynomios[g1SelectedCol][g1SelectedRow]} g2Value={state[g2SelectedCol][g2SelectedRow]}/>

                <div className='mco-multiplication-container'>
                    {<PolynomialExp value={AesCipher.galoisMultiply(fixedPolynomios[g1SelectedCol][g1SelectedRow],state[g2SelectedCol][g2SelectedRow]) }></PolynomialExp> }
                </div>

                <div>
                    {AesCipher.nonReducedGaloisMultiply(fixedPolynomios[g1SelectedCol][g1SelectedRow],state[g2SelectedCol][g2SelectedRow])}
                </div>
            </div>
            

        </>
        
    );
}

export default MixColumnsOp;