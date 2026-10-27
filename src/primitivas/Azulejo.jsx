/**
 * Azulejo — el mosaico de un lanzador: icono grande, etiqueta abajo y un
 * tinte que identifica el destino.
 *
 * Es la única pieza del sistema donde el color NO significa estado, y es a
 * propósito: un lanzador es un mapa, no una lectura de datos. Aquí el tinte
 * es la identidad del lugar al que se va, igual que el color de un icono de
 * escritorio. Fuera del lanzador la regla sigue intacta.
 */
import React from "react";

export default function Azulejo({
  icono, etiqueta, nota, color, onClick, ancho = 1, entrada, estilo,
}) {
  const [encima, setEncima] = React.useState(false);
  const c = color || "var(--ds-accent)";
  /* El tinte del fondo es el color crudo; el texto va por la mezcla, que
     es lo único que tiene que sobrevivir al tema oscuro. */
  const tinta = `color-mix(in oklab, ${c}, var(--ds-mezcla-tono))`;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setEncima(true)}
      onMouseLeave={() => setEncima(false)}
      style={{
        gridColumn: `span ${ancho}`,
        display: "flex", flexDirection: "column", alignItems: "flex-start",
        justifyContent: "space-between", gap: "var(--ds-3)",
        minHeight: 132, padding: "var(--ds-4)", textAlign: "left",
        fontFamily: "var(--ds-font)", cursor: "pointer",
        borderRadius: "var(--ds-r-card)",
        border: `1px solid ${encima ? c + "55" : "var(--ds-line)"}`,
        background: `linear-gradient(150deg, ${c}${encima ? "30" : "1F"} 0%, ${c}0D 100%), var(--ds-surface)`,
        boxShadow: encima ? "var(--ds-lift-2)" : "none",
        transform: encima ? "translateY(-3px)" : "none",
        transition: "transform var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease)",
        animation: entrada !== undefined
          ? `ds-rise var(--ds-t-move) var(--ds-ease) ${Math.min(entrada * 28, 220)}ms both` : undefined,
        ...estilo,
      }}
    >
      <span style={{
        display: "grid", placeItems: "center", width: 46, height: 46,
        borderRadius: "var(--ds-r-item)", background: `${c}2E`, color: tinta,
        boxShadow: encima ? `0 6px 16px -6px ${c}88` : "none",
        transition: "box-shadow var(--ds-t-state) var(--ds-ease)",
      }}>
        {icono}
      </span>
      <span style={{ display: "block", minWidth: 0, width: "100%" }}>
        <span style={{ display: "block", fontSize: "var(--ds-t-small)", fontWeight: 600,
          color: tinta, letterSpacing: "-0.01em", lineHeight: 1.25 }}>
          {etiqueta}
        </span>
        {nota && (
          <span style={{ display: "block", fontSize: "var(--ds-t-micro)", fontWeight: 600,
            color: "var(--ds-ink-3)", marginTop: 2 }}>
            {nota}
          </span>
        )}
      </span>
    </button>
  );
}
