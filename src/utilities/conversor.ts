import type { numericSystem } from "../types/numericSystems";

export const convert2System = (n: number | null, toSystem:numericSystem) =>{
    if(n === null){
        return "";
    }
    
    switch(toSystem){
        case "bin":
            return n.toString(2);
        case "8bitBin":
            return n.toString(2).padStart(8,'0');
        case "dec":
            return n.toString(10);
        case "invHexPadded":
            return n.toString(16).padEnd(2,'0');
        case "hexPadded":
            return n.toString(16).padStart(2,'0');
        case "hex":
            return n.toString(16);
        default:
            return n.toString(10);
    }
}

