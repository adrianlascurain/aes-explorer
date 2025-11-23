import {useState, useRef } from "react";
import StateGrid from "./StateGrid";
import type { Matrix4x4 } from "../types/matrix";
import "./AddRoundKey.css";
import xorIcon from "../assets/xorop.svg";
import pentagonIcon from "../assets/pentagon.svg";
import triangleIcon from "../assets/triangle.svg";
import circleIcon from "../assets/circle.svg";

function AddRoundKeyOp({state,roundKey,stateTitle,roundKeyTitle,resultTitle}: {state: Matrix4x4, 
    roundKey: Matrix4x4,
    stateTitle: string,
    roundKeyTitle: string,
    resultTitle: string}){

    const [selectedRow, setSelectedRow] = useState<number>(0);
    const [selectedCol, setSelectedCol] = useState<number>(0);
    const [firstByte, setFirstByte] = useState<number>(state[0][0]);
    const [secondByte, setSecondByte] = useState<number>(roundKey[0][0]);

    const handleClickOnElement = (_e: React.MouseEvent, colIndex: number, rowIndex: number) => {
        setSelectedRow(rowIndex);
        setSelectedCol(colIndex);
        setFirstByte(state[colIndex][rowIndex]);
        setSecondByte(roundKey[colIndex][rowIndex]);
    };

    const calculateState = (state: Matrix4x4, roundKey: Matrix4x4) : Matrix4x4 => {
        const tmpMatrix: Matrix4x4 = Array.from({ length: 4 }, () => [0, 0, 0, 0]) as Matrix4x4;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                tmpMatrix[i][j] = state[i][j] ^ roundKey[i][j];
            }
        }
        return tmpMatrix;
    }

    const format8bitNumber = (n: number) : String => {
        return n.toString(2).padStart(8,'0');
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
    const isCellSelected = (col: number, row: number) => selectedRow === row && selectedCol === col;

    return (
        <div className="ark-container">
            <div className="grids-container">
                <div className="grid-group-container">
                    <div className="title-container">
                        <img src={pentagonIcon} alt="" className="title-icon" />
                        <h3 className="grid-title">{stateTitle}</h3>    
                    </div>
                    <StateGrid
                        state={state}
                        isCellSelected={isCellSelected}
                        handleClickOnElement={handleClickOnElement}
                        handleOnMouseEnter={handleOnMouseEnter}
                        handleOnMouseLeave={handleOnMouseLeave}
                        selectedColor="#D65757"
                        representation="hex"
                    />
                </div>
                <img className="xor-icon" src={xorIcon} alt="" />
                <div className="grid-group-container">
                    <div className="title-container">
                        <img src={triangleIcon} alt="" className="title-icon" />
                        <h3 className="grid-title">{roundKeyTitle}</h3>    
                    </div>
                    <StateGrid
                        state={roundKey}
                        isCellSelected={isCellSelected}
                        handleClickOnElement={handleClickOnElement}
                        handleOnMouseEnter={handleOnMouseEnter}
                        handleOnMouseLeave={handleOnMouseLeave}
                        selectedColor="#2A58AD"
                        representation="hex"
                    />
                </div>
            </div>
            <div className="bit-operation-container">
                <img src={xorIcon} alt="" className="xor-operation-icon" />
                <div className="operation-container">
                    <div className="byte-operation-container">
                        <span key="byte-span-n1" className="byte-span">
                            {format8bitNumber(firstByte)}
                        </span>

                    </div>
                    <div className="byte-operation-container">
                        <span key="byte-span-n2" className="byte-span">
                            {format8bitNumber(secondByte)}
                        </span>
                    </div>
                    <hr className="ark-sum-separator" />
                    <div className="byte-operation-container">
                        <span key="byte-span-n3" className="byte-span">
                            {format8bitNumber(firstByte ^ secondByte)}
                        </span>
                    </div>
                </div>
                <div className="operation-icons-container">
                    <img src={pentagonIcon} alt="" className="operation-icon state-icon" />
                    <img src={triangleIcon} alt="" className="operation-icon round-key-icon" />
                    <img src={circleIcon} alt="" className="operation-icon result-icon" />
                </div>
            </div>

            <div className="grids-container result-container">
                <div className="grid-group-container">
                    <div className="title-container">
                        <img src={circleIcon} alt="" className="title-icon" />
                        <h3 className="grid-title">{resultTitle}</h3>    
                    </div>
                    <StateGrid
                        state={calculateState(state,roundKey)}
                        isCellSelected={isCellSelected}
                        handleClickOnElement={handleClickOnElement}
                        handleOnMouseEnter={handleOnMouseEnter}
                        handleOnMouseLeave={handleOnMouseLeave}
                        selectedColor="#0FD53D"
                        representation="hex"
                    />
                </div>
            </div>
        </div>
    );
}

export default AddRoundKeyOp;