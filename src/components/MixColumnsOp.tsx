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
import MultiplicationSummaryTable from './MultiplicationSummaryTable';
import AesCipher from '../cipher/AesCipher';
import PolynomialOperation from './PolynomialOperation';
import GFRowColMultiplicationExp from './GFRowColMultiplicationExp';
import ChainedPolynomialExp from './ChainedPolynomialExp';
import MixColumnsPolynomialDevelop from './MixColumnsPolynomialDevelop';
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

    const stateGrid3Ref = useRef<StateGridHandle>(null);

    const [g1SelectedRow, setG1SelectedRow] = useState<number>(0);
    const [g1SelectedCol, setG1SelectedCol] = useState<number>(0);
    const [g1SelectedCell, setG1SelectedCell] = useState<HTMLElement>();

    const [g2SelectedRow, setG2SelectedRow] = useState<number>(0);
    const [g2SelectedCol, setG2SelectedCol] = useState<number>(0);
    const [g2SelectedCell, setG2SelectedCell] = useState<HTMLElement>();

    const [g3SelectedRow, setG3SelectedRow] = useState<number>(0);
    const [g3SelectedCol, setG3SelectedCol] = useState<number>(0);
    
    useEffect(() => {
        getCells(g1SelectedRow, g1SelectedCol, g2SelectedRow, g2SelectedCol);
    },[g1SelectedRow, g1SelectedCol, g2SelectedRow, g2SelectedCol]);

    const handleClickOnElementG1 = (_e: React.MouseEvent, rowIndex: number, colIndex: number) => {        
        setG1SelectedRow(rowIndex);
        setG1SelectedCol(colIndex);

        setG2SelectedRow(colIndex);
        setG3SelectedRow(rowIndex);
    };

    const handleClickOnElementG2 = (_e: React.MouseEvent, rowIndex: number, colIndex: number) => {        
        setG1SelectedCol(rowIndex);
        setG2SelectedRow(rowIndex);

        setG2SelectedCol(colIndex);
        setG3SelectedCol(colIndex);
    };

    const handleClickOnElementG3 = (_e: React.MouseEvent, rowIndex: number, colIndex: number) => {        
        setG3SelectedRow(rowIndex);
        setG3SelectedCol(colIndex);

        setG1SelectedRow(rowIndex);
        setG2SelectedCol(colIndex);
    };

    const highlightStyles: React.CSSProperties = {
        background: "#FFA500"
    }

    const g1notHighlightStyles: React.CSSProperties = {
        background: "#2A58AD"
    }

    const g2notHighlightStyles: React.CSSProperties = {
        background: "#D65757"
    }
    
    const getCells = (i1: number,j1 :number, i2: number,j2 :number) => {
        if(g1SelectedCell){
            if(lastGrid1SelectedCol.current != g1SelectedCol && lastGrid1SelectedRow.current == g1SelectedRow){
                Object.assign(g1SelectedCell.style,g1notHighlightStyles);
            }
            lastGrid1Ref.current = g1SelectedCell;
        }

        if(g2SelectedCell){
            if(lastGrid2SelectedRow.current != g2SelectedRow && lastGrid2SelectedCol.current == g2SelectedCol){
                Object.assign(g2SelectedCell.style,g2notHighlightStyles)
            }
            lastGrid2Ref.current = g2SelectedCell;
        }

        const g1Cell = stateGrid1Ref.current?.getElement(i1,j1);
        const g2Cell = stateGrid2Ref.current?.getElement(i2,j2);

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

    const handleOnMouseEnterG1Row = (e: React.MouseEvent) => {
        handleOnMouseEnter(e,true,g1SelectedRow,g1SelectedCol,"#2A58AD",stateGrid1Ref);
    }

     const handleOnMouseLeaveG1Row = (e: React.MouseEvent) => {
        handleOnMouseLeave(e,true,g1SelectedRow,g1SelectedCol,stateGrid1Ref);
    }

    const handleOnMouseEnterG2Row = (e: React.MouseEvent) => {
        handleOnMouseEnter(e,false,g2SelectedRow,g2SelectedCol,"#D65757",stateGrid2Ref);
    }

    const handleOnMouseLeaveG2Row = (e: React.MouseEvent) => {
        handleOnMouseLeave(e,false,g2SelectedRow,g2SelectedCol,stateGrid2Ref);
    }

    const handleOnMouseEnterG3 = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const index = target.classList[1].split("-");
        if(index){
            const row = parseInt(index[0]);
            const col = parseInt(index[1]);

            let element = stateGrid3Ref.current?.getElement(row,col);
            if(element){
                element.style.background = "#00FF00";
            }
        }
    }

    const handleOnMouseLeaveG3 = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const index = target.classList[1].split("-");
        if(index){
            const row = parseInt(index[0]);
            const col = parseInt(index[1]);

            if(g3SelectedRow == row && g3SelectedCol == col) return;

            let element = stateGrid3Ref.current?.getElement(row,col);
            if(element){
                element.style.background = "transparent";
            }
        }
    }

    const handleOnMouseEnter = (e: React.MouseEvent, isRowBased: boolean, selectedRow: number, selectedCol: number, color: string, stateGridRef: React.RefObject<StateGridHandle | null>) => {
        const target = e.target as HTMLElement;
        const index = target.classList[1].split("-");
        if(index && stateGridRef){
            const row = parseInt(index[0]);
            const col = parseInt(index[1]);
            
            if(isRowBased && row === selectedRow){
                return;
            }else if(!isRowBased && col === selectedCol){
                return;
            }

            const elements: Array<HTMLElement | null | undefined> = Array(4); 
            for(let i =0; i < 4; i++){
                if(isRowBased){
                    if(selectedRow == row){
                        elements[i] = selectedCol != i ? stateGridRef.current?.getElement(row,i) : null;
                    }else{
                        elements[i] =  stateGridRef.current?.getElement(row,i);
                    }
                    
                }else{
                    if(selectedCol == col){
                        elements[i] = selectedRow != i ? stateGridRef.current?.getElement(i,col) : null;
                    }else{
                        elements[i] = stateGridRef.current?.getElement(i,col);
                    }
                }   
            }
            elements.forEach(element => {
                if(element){
                    element.style.background = color;
                }
            });   
        }   
    };

    const handleOnMouseLeave = (e: React.MouseEvent, isRowBased: boolean, selectedRow: number, selectedCol: number, stateGridRef: React.RefObject<StateGridHandle | null>) => {
        const target = e.target as HTMLElement;
        const index = target.classList[1].split("-");
        if(index){
            const row = parseInt(index[0]);
            const col = parseInt(index[1]);
            
            if(isRowBased && row === selectedRow){
                return;
            }else if(!isRowBased && col === selectedCol){
                return;
            }
            
            const elements: Array<HTMLElement | null | undefined> = Array(4); 
            for(let i =0; i < 4; i++){
                if(isRowBased){
                    elements[i] = stateGridRef.current?.getElement(row,i);    
                }else{
                    elements[i] = stateGridRef.current?.getElement(i,col);
                }   
            }

            elements.forEach(element => {
                if(element){
                    element.style.background = "transparent";
                }
            });   
        }        
    };

    // Función que indica si una celda está seleccionada
    const isG1RowSelected = (row: number, _col: number) => g1SelectedRow === row;
    const isG2ColSelected = (_row: number, col: number) => g2SelectedCol === col;
    const isG3ColSelected = (row: number, col: number) => g3SelectedRow == row && g3SelectedCol === col;

    return(
        <>
            <div className='mco-component-wrapper'>
                <div className='mco-quick-visualization'>
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
                            handleOnMouseEnter={handleOnMouseEnterG1Row}
                            handleOnMouseLeave={handleOnMouseLeaveG1Row}
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
                            handleOnMouseEnter={handleOnMouseEnterG2Row}
                            handleOnMouseLeave={handleOnMouseLeaveG2Row}
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
                            <VisualMultiplication g1Row={g1SelectedRow} g1Col={0} g1Value={fixedPolynomios[g1SelectedRow][0]} g2Row={0} g2Col={g2SelectedCol} g2Value={state[0][g2SelectedCol]} representation='hexPadded' g1Img={triangleIcon} g2Img={pentagonIcon}></VisualMultiplication>
                            <VisualMultiplication g1Row={g1SelectedRow} g1Col={1} g1Value={fixedPolynomios[g1SelectedRow][1]} g2Row={1} g2Col={g2SelectedCol} g2Value={state[1][g2SelectedCol]} representation='hexPadded' g1Img={triangleIcon} g2Img={pentagonIcon}></VisualMultiplication>
                            <VisualMultiplication g1Row={g1SelectedRow} g1Col={2} g1Value={fixedPolynomios[g1SelectedRow][2]} g2Row={2} g2Col={g2SelectedCol} g2Value={state[2][g2SelectedCol]} representation='hexPadded' g1Img={triangleIcon} g2Img={pentagonIcon}></VisualMultiplication>
                            <VisualMultiplication g1Row={g1SelectedRow} g1Col={3} g1Value={fixedPolynomios[g1SelectedRow][3]} g2Row={3} g2Col={g2SelectedCol} g2Value={state[3][g2SelectedCol]} representation='hexPadded' g1Img={triangleIcon} g2Img={pentagonIcon}></VisualMultiplication>
                            <hr />
                        </div>
                    </div>

                    <div className='mco-matrix-multiplication-summary'>
                            <GFRowColMultiplicationExp polynomios={fixedPolynomios} polynomiosRow={g1SelectedRow} state={state} stateCol={g2SelectedCol} representation='hexPadded'></GFRowColMultiplicationExp>
                    </div>

                    <div className="mco-grid-group-container">
                        <div className="mco-title-container">
                            <img src={circleIcon} alt=""/>
                            <h3 className="mco-grid-title">Resultado</h3>    
                        </div>
                        <StateGrid
                            state={AesCipher.invMixColumns(state) as Matrix4x4}
                            ref={stateGrid3Ref}
                            isCellSelected={isG3ColSelected}
                            handleClickOnElement={handleClickOnElementG3}
                            handleOnMouseEnter={handleOnMouseEnterG3}
                            handleOnMouseLeave={handleOnMouseLeaveG3}
                            selectedColor="#00FF00"
                            representation={'hexPadded'}
                        />
                    </div>
                </div>
                </div>
                

                <div className='mco-operation-procedure'>
                    <MultiplicationSummaryTable binaryTitle='Binario' hexTitle='Hex' polynomialTitle='Polinomio' g1Row={g1SelectedRow} g1Col={g1SelectedCol} g2Row={g2SelectedRow} g2Col={g2SelectedCol} g1Img={triangleIcon} g2Img={pentagonIcon} g1Value={fixedPolynomios[g1SelectedRow][g1SelectedCol]} g2Value={state[g2SelectedRow][g2SelectedCol]}/>

                    <div className='mco-multiplication-terms-container'>
                        <span>Multiplicación</span>
                        <PolynomialOperation 
                            firstPoly={fixedPolynomios[g1SelectedRow][g1SelectedCol]}
                            secondPoly={state[g2SelectedRow][g2SelectedCol]}
                            operationChar='•'
                        ></PolynomialOperation>
                    </div>

                    <div className='mco-multiplication-container'>
                        <ChainedPolynomialExp nonReducedCoeffcients={AesCipher.nonReducedGaloisMultiply(fixedPolynomios[g1SelectedRow][g1SelectedCol],state[g2SelectedRow][g2SelectedCol])}></ChainedPolynomialExp>
                    </div>

                    <div>
                        <MixColumnsPolynomialDevelop nonReducedCoefficients={AesCipher.nonReducedGaloisMultiply(fixedPolynomios[g1SelectedRow][g1SelectedCol],state[g2SelectedRow][g2SelectedCol])}></MixColumnsPolynomialDevelop>
                    </div>

                    <div>
                        <PolynomialExp value={AesCipher.galoisMultiply(fixedPolynomios[g1SelectedRow][g1SelectedCol],state[g2SelectedRow][g2SelectedCol])}></PolynomialExp>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default MixColumnsOp;