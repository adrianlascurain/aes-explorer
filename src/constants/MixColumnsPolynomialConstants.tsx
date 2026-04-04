import type { JSX } from "react";

// Reduction for x^10
const x10: JSX.Element = (
    <div>
        <span>x<sup>10</sup></span>
        <span className="mcpc-procedure-arrow">→</span>
        <span>x<sup>2</sup><span className="mcpc-separator">•</span>x<sup>8</sup></span>
        <span className="mcpc-procedure-arrow">→</span>
        <span>x<sup>2</sup><span className="mcpc-separator">•</span><span className="mcpc-parenthesis">(</span> x<sup>4</sup> + x<sup>3</sup> + x + 1 <span className="mcpc-parenthesis">)</span></span>
        <span className="mcpc-procedure-arrow">→</span>
        <span>x<sup>6</sup> + x<sup>5</sup> + x<sup>3</sup> + x<sup>2</sup></span>
    </div>
);

// Reduction for x^9
const x9: JSX.Element = (
    <div>
        <span>x<sup>9</sup></span>
        <span className="mcpc-procedure-arrow">→</span>
        <span>x<span className="mcpc-separator">•</span>x<sup>8</sup></span>
        <span className="mcpc-procedure-arrow">→</span>
        <span>x<span className="mcpc-separator">•</span><span className="mcpc-parenthesis">(</span> x<sup>4</sup> + x<sup>3</sup> + x + 1 <span className="mcpc-parenthesis">)</span></span>
        <span className="mcpc-procedure-arrow">→</span>
        <span>x<sup>5</sup> + x<sup>4</sup> + x<sup>2</sup> + x</span>
    </div>
);

// Reduction for x^8
const x8: JSX.Element = (
    <div>
        <span>x<sup>8</sup></span>
        <span className="mcpc-procedure-arrow">→</span>
        <span> x<sup>4</sup> + x<sup>3</sup> + x + 1</span>
    </div>
);

// Base reductions map
export const baseReductions: Map<number, JSX.Element> = new Map([
    [8, x8],
    [9, x9],
    [10, x10],
]);
