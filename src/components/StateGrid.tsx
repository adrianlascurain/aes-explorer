import './StateGrid.css';
import type { Matrix4x4 } from '../types/matrix';
import type { numericSystem } from '../types/numericSystems';

type StateGridProps = {
    state: Matrix4x4;
    isCellSelected: (col: number, row: number) => boolean;
    handleClickOnElement: (e: React.MouseEvent, i: number, j: number) => void;
    handleOnMouseEnter: (e: React.MouseEvent, i: number, j: number) => void;
    handleOnMouseLeave: (e: React.MouseEvent, i: number, j: number) => void;
    selectedColor: string;
    representation: numericSystem;
};

const convert2System = (n: number, toSystem:numericSystem) =>{
    switch(toSystem){
        case "dec":
            return n.toString(10);
        case "hex":
            return n.toString(16).padStart(2,'0');
        default:
            return n.toString(10);
    }
}

function StateGrid({
    state,
    isCellSelected,
    handleClickOnElement,
    handleOnMouseEnter,
    handleOnMouseLeave,
    selectedColor,
    representation
}: StateGridProps) {
    return (
        <div className="state-wrapper">
            {state.map((row, i) =>
                row.map((_value, j) => {
                    const selected = isCellSelected(i, j);
                    return (
                        <div
                            key={`${i}-${j}`}
                            className="state-element"
                            style={{ backgroundColor: selected? selectedColor : '' }}
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