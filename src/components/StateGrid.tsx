import './StateGrid.css';
import type { Matrix4x4 } from '../types/matrix';
import type { numericSystem } from '../types/numericSystems';
import { convert2System } from '../utilities/conversor';
import { useImperativeHandle, useRef } from 'react';

type StateGridProps = {
    state: Matrix4x4;
    isCellSelected: (col: number, row: number) => boolean;
    handleClickOnElement: (e: React.MouseEvent, i: number, j: number) => void;
    handleOnMouseEnter: (e: React.MouseEvent, i: number, j: number) => void;
    handleOnMouseLeave: (e: React.MouseEvent, i: number, j: number) => void;
    selectedColor: string;
    representation: numericSystem;
    ref?: React.Ref<StateGridHandle>;
};

export type StateGridHandle = {
    getElement: (i: number, j: number) => HTMLElement | null;
    getAllElements: () => Map<string, HTMLElement>;
    highlightCell: (i: number, j: number, styles: React.CSSProperties) => void;
    clearHighlight: (i: number, j: number, styles: React.CSSProperties) => void;
};

function StateGrid({
    state,
    isCellSelected,
    handleClickOnElement,
    handleOnMouseEnter,
    handleOnMouseLeave,
    selectedColor,
    representation,
    ref
}: StateGridProps) {
    const elementsRef = useRef<Map<string,HTMLElement>>(new Map());

    useImperativeHandle(ref, () => ({
        getElement: (i: number, j: number) => {
            return elementsRef.current.get(`${i}-${j}`) || null;
        },
        getAllElements: () => {
            return elementsRef.current;
        },
        highlightCell: (i: number, j: number, styles: React.CSSProperties) => {
            const element = elementsRef.current.get(`${i}-${j}`);
            if (element) {
                Object.assign(element.style, styles);
            }
        },
        clearHighlight: (i: number, j: number, styles: React.CSSProperties) => {
            const element = elementsRef.current.get(`${i}-${j}`);
            if (element) {
                Object.assign(element.style, styles);
            }
        }
    }), [])

    return (
        <div className="state-wrapper">
            {state.map((row, i) =>
                row.map((_value, j) => {
                    const selected = isCellSelected(i, j);
                    const key = `${i}-${j}`;
                    return (
                        <div
                            key={key}
                            ref={(el) => {
                                if(el) {
                                    elementsRef.current.set(key,el);
                                }else {
                                    elementsRef.current.delete(key)
                                }
                            }}
                            className="state-element"
                            style={{ background: selected? selectedColor : '' }}
                            onClick={(e) => handleClickOnElement(e, i, j)}
                            onMouseEnter={(e) => handleOnMouseEnter(e, i, j)}
                            onMouseLeave={(e) => handleOnMouseLeave(e, i, j)}
                        >{
                            convert2System(state[i][j],representation)
                        }</div>
                    );
                })
            )}
        </div>
    );
}

export default StateGrid;