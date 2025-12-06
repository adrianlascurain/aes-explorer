import pentagonIcon from "../assets/pentagon.svg";
import circleIcon from "../assets/circle.svg";
import './ShiftRows.css'
import StateGrid from "./StateGrid";
import type { Matrix4x4 } from "../types/matrix";
import type { Shift } from "../types/Shift";
import { useState } from "react";
import { convert2System } from '../utilities/conversor';
import type { numericSystem } from "../types/numericSystems";
import AesCipher from "../cipher/AesCipher";

function ShiftRowsOp({state, shiftType, representation} : {state: Matrix4x4, shiftType: Shift, representation: numericSystem}){
        const [selectedRow, setSelectedRow] = useState<number>(0);
        const [selectedCol, setSelectedCol] = useState<number>(0);
    
        const handleClickOnElement = (_e: React.MouseEvent, rowIndex: number, colIndex: number) => {
            setSelectedRow(rowIndex);
            setSelectedCol(colIndex);
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
        const isCellSelected = (row: number, _col: number) => selectedRow === row;
        
        const isCellSelectedV2 = (row: number, _col: number) => selectedRow === row && selectedCol === 3;

    const shiftMatrix = (state: Matrix4x4, shiftType: Shift) => {
        const outMatrix: number[][] = Array.from({length:4}, () => 
            Array.from({length:7}, () => -1));
        
        let offSet;
        let directionSetter;
        if(shiftType == "normal"){
            offSet = 3;
            directionSetter = -1;
        } else{ // Inverse shift
            offSet = 0;
            directionSetter = 1;
        }

        let shiftAmount = 0;
        for(let i=0; i < 4; i++){
            for(let j=0; j < 4; j++){
                shiftAmount = offSet + (i*directionSetter);
                outMatrix[i][j + shiftAmount] = state[i][j];
            }
        }

        return outMatrix;
    }

    return(
        <div className="sr-container">
            <div className="grid-group-container">
                <div className="title-container">
                    <img src={pentagonIcon} alt="" className="title-icon" />
                    <h3 className="grid-title">{"state"}</h3>    
                </div>
                <StateGrid
                        state={state}
                        isCellSelected={isCellSelected}
                        handleClickOnElement={handleClickOnElement}
                        handleOnMouseEnter={handleOnMouseEnter}
                        handleOnMouseLeave={handleOnMouseLeave}
                        selectedColor="#2A58AD"
                        representation={representation}
                />
            </div>
            <div className="grid-group-container">
                <div className="title-container">
                    <img src={pentagonIcon} alt="" className="title-icon" />
                    <h3 className="grid-title">{"state"}</h3>    
                </div>
                <div className="operation-step-container">
                {
                    shiftMatrix(state,shiftType).map((row, rowIndex) => (
                        row.map((value, colIndex) => {
                            let classesToAdd = 'state-element';
                            let rcAddition;
                            let rcSubtraction;
                            if (shiftType === "normal"){
                                rcAddition = rowIndex + colIndex;
                                classesToAdd += !(rcAddition <= 2) ? '' : ' non-display';
                                classesToAdd += rcAddition === 2 ? ' mark-right-border': '';
                                classesToAdd += rcAddition >= 7 ? ' displaced-empty-element' : '';
                                classesToAdd += rcAddition >=3 && rcAddition <=5 && rowIndex >=1 && colIndex <=2 ? ' displaced-element' : '';
                            } else {
                                rcSubtraction = colIndex - rowIndex;
                                classesToAdd += !(rcSubtraction >= 4) ? '' : ' non-display';
                                classesToAdd += rcSubtraction === 4? ' mark-left-border': '';
                                classesToAdd += rcSubtraction <= -1 ? ' displaced-empty-element' : '';
                                classesToAdd += rcSubtraction <= 3 && rowIndex >=1 && colIndex >= 4 ? ' displaced-element' : '';
                            }
                            return(
                                <div key={`${rowIndex}-${colIndex}`} className={classesToAdd}>
                                    {value === -1? "" : value}
                                </div>
                            )
                        })

                    ))
                }
            </div>
            </div>
            
            <div className="grid-group-container">
                <div className="title-container">
                    <img src={pentagonIcon} alt="" className="title-icon" />
                    <h3 className="grid-title">{"state"}</h3>    
                </div>
                <StateGrid
                        state={shiftType === "normal"? AesCipher.shiftRows(state) : AesCipher.invShiftRows(state)}
                        isCellSelected={isCellSelectedV2}
                        handleClickOnElement={handleClickOnElement}
                        handleOnMouseEnter={handleOnMouseEnter}
                        handleOnMouseLeave={handleOnMouseLeave}
                        selectedColor="#2A58AD"
                        representation={representation}
                />
            </div>
        </div>
    );
}

export default ShiftRowsOp;