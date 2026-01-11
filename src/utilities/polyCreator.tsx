import type { JSX } from "react";

export default function createPolynomialExpressions(binValue: string) {
  let grade = binValue.length;
  const full: JSX.Element[] = [];
  const reduced: JSX.Element[] = [];

  for (const digit of binValue) {
    grade--;

    // --- Construcción del término completo ---
    if (grade > 0) {
      full.push(
        <span key={full.length}>
          {digit}
          x<sup>{grade}</sup>
          {" + "}
        </span>
      );

      // --- Construcción del término reducido ---
      if (digit === "1") {
        reduced.push(
          <span key={`r-${reduced.length}`}>
            x<sup>{grade}</sup>
            {" + "}
          </span>
        );
      }

    } else {
      // grado 0
      full.push(
        <span key={full.length}>{digit}</span>
      );

      if (digit === "1") {
        reduced.push(
          <span key={`r-${reduced.length}`}>1</span>
        );
      }
    }
  }

  // Quitar el último '+' en ambos polinomios (si existe)
  const cleanLastPlus = (elements: JSX.Element[]) => {
    if (elements.length === 0) return elements;

    const last = elements[elements.length - 1];

    // Clona sin el " + "
    const fixedLast = (
      <span key={last.key}>
        {String((last as any).props.children).replace(" + ", "")}
      </span>
    );

    return [...elements.slice(0, -1), fixedLast];
  };

  const fullCleaned = cleanLastPlus(full);
  const reducedCleaned = cleanLastPlus(reduced);

  return {
    fullPolynomial: <>{fullCleaned}</>,
    reducedPolynomial: <>{reducedCleaned}</>
  };
}
