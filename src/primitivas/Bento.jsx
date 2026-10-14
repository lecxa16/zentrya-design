/**
 * Bento — la retícula del sistema, y su marco oscuro.
 *
 * El marco es lo que hace que el conjunto se lea como UNA pieza y no como
 * tarjetas sueltas flotando. Es opcional: en pantallas densas de tabla
 * estorba, y ahí el bento va sin marco.
 *
 * Las celdas declaran cuánto ocupan en una retícula de 12; en móvil todas
 * pasan a ancho completo, sin excepciones que haya que recordar.
 */
import React from "react";

export function Bento({ children, marco = false, columnas = 12, hueco = "var(--ds-4)", estilo }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columnas}, minmax(0, 1fr))`,
        gap: hueco,
        ...(marco
          ? { background: "var(--ds-frame)", padding: "var(--ds-3)",
              borderRadius: "var(--ds-r-frame)", boxShadow: "var(--ds-lift-3)" }
          : null),
        ...estilo,
      }}
    >
      {children}
    </div>
  );
}

export function Celda({ children, ancho = 12, anchoMd, alto, estilo }) {
  const md = anchoMd ?? ancho;
  return (
    <div
      className="ds-celda"
      style={{
        gridColumn: `span ${md}`,
        minWidth: 0,
        ...(alto ? { gridRow: `span ${alto}` } : null),
        ...estilo,
      }}
    >
      <style>{`@media (max-width: 900px) { .ds-celda { grid-column: span 12 !important; } }`}</style>
      {children}
    </div>
  );
}
