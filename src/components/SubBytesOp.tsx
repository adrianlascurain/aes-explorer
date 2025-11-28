import AesCipher from "../cipher/AesCipher";
import type { Matrix4x4, SBox } from "../types/matrix";
import StateGrid from "./StateGrid";
import "./SubBytes.css"
import { useState } from "react";
import { convert2System } from '../utilities/conversor';
import type { numericSystem } from "../types/numericSystems";
import circleIcon from "../assets/circle.svg";
import pentagonIcon from "../assets/pentagon.svg";

function SubBytesOp({state,sBox, stateTitle,resultTitle,representation,lowNibbleTitle,highNibbleTitle,stateContainerTitle}: {state:Matrix4x4,sBox: SBox, stateTitle:string,resultTitle:string,representation:numericSystem,lowNibbleTitle:string,highNibbleTitle:string,stateContainerTitle:string}){
    const [selectedRow, setSelectedRow] = useState<number>(0);
    const [selectedCol, setSelectedCol] = useState<number>(0);
    const [lowNibble, setLowNibble] = useState<number>(() => {
        return state[0][0] & 0x0F;
    });
    const [highNibble, setHighNibble] = useState<number>(() => {
        return (state[0][0] & 0xF0) >> 4;
    });

    const handleClickOnElement = (_e: React.MouseEvent, rowIndex: number, colIndex: number) => {
        setSelectedRow(rowIndex);
        setSelectedCol(colIndex);
        let stateValue = state[rowIndex][colIndex];  
        setLowNibble(stateValue & 0x0F);
        setHighNibble((stateValue & 0xF0) >> 4);
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
    const isCellSelected = (row: number, col: number) => selectedRow === row && selectedCol === col;

    representation = representation === "hex" ? "hexPadded": representation;
    
    return (
        <div className="sub-bytes-container">
            <div className="grids-container-sb">
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
                        selectedColor="linear-gradient(to right, #D65757 50%, #2A58AD 50%)"
                        representation={representation}
                    />
                </div>
                <div className="grid-group-container">
                    <div className="title-container">
                        <img src={circleIcon} alt="" className="title-icon" />
                        <h3 className="grid-title">{resultTitle}</h3>    
                    </div>
                    <StateGrid
                        state={AesCipher.subBytes(state,sBox)}
                        isCellSelected={isCellSelected}
                        handleClickOnElement={handleClickOnElement}
                        handleOnMouseEnter={handleOnMouseEnter}
                        handleOnMouseLeave={handleOnMouseLeave}
                        selectedColor="#0FD53D"
                        representation={representation}
                />
                </div>
                
            </div>
            <div className="nibbles-wrapper">
                <div className="nibble-container">
                    <h3>{stateContainerTitle}</h3>
                    <div className="nibble-value-container">
                        <h3>{convert2System(state[selectedRow][selectedCol],representation)}</h3>
                    </div>
                </div>
                <div className="nibble-container">
                    <h3>{highNibbleTitle}</h3>
                    <div className="nibble-value-container">
                        <h3 style={{background: "#D65757"}}>
                            {convert2System((highNibble << 4), representation === "hexPadded" ? "invHexPadded" : representation)}
                        </h3>
                    </div>
                </div>
                <div className="nibble-container">
                    <h3>{lowNibbleTitle}</h3>
                    <div className="nibble-value-container">
                        <h3 style={{background: "#2A58AD"}}>{convert2System(lowNibble,representation)}</h3>
                    </div>
                </div>
            </div>
            <div className="sbox-header">
                <h2>Sbox</h2>
                <div className="sbox-container">
                {
                    Array.from({length: 17}, (_,i) => (
                        Array.from({length: 17}, (_,j) => {
                            let valueToShow: number | null;
                            let paintBorder = "";
                            if(i === 0 && j === 0){
                                valueToShow = null;
                                paintBorder = "not-paint-border";
                            } else if (i === 0 && j > 0){
                                valueToShow = j-1;
                                paintBorder = "not-paint-border";
                            } else if (j === 0 && i > 0){
                                valueToShow = (i-1) << 4 ;
                                paintBorder = "not-paint-border";
                            } else {
                                valueToShow = sBox[i-1][j-1];
                            }

                            let isHighNibbleSelected: boolean = i-1 === highNibble && j <= lowNibble;
                            let isLowNibbleSelected: boolean = j-1 === lowNibble && i <= highNibble;
                            let isResultSelected: boolean = i === highNibble + 1 && j === lowNibble + 1;
                            const getBackgroundColor = () => {
                                if (isHighNibbleSelected) return "#D65757";
                                if (isLowNibbleSelected) return "#2A58AD";
                                if (isResultSelected) return "#0FD53D";
                                return "";
                            };

                            return(
                                <div key={`${i}-${j}`} className={paintBorder? `sbox-element ${paintBorder}` : "sbox-element"} style={{
                                    background: getBackgroundColor()
                                }}>
                                    {convert2System(valueToShow,representation)}
                                </div>
                            )
                        })
                    ))   
                }
                </div>
            </div>
            
        </div>
    );
}

export default SubBytesOp;