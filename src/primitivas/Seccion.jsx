/**
 * Sección — encabezado de bloque.
 *
 * Todas las tarjetas titulan igual: misma escala, mismo peso, misma regla
 * que se desvanece y el mismo sitio para la acción. Un tablero donde cada
 * tarjeta titula a su manera se lee como tres tableros pegados.
 *
 * Sin eyebrows: el título carga su propio peso. `nota` es la línea
 * secundaria —un conteo, un periodo— y va debajo, nunca encima.
 */
import React from "react";

export default function Seccion({ titulo, nota, accion, children, estilo }) {
  return (
    <div style={{ ...estilo }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-3)",
        marginBottom: "var(--ds-4)" }}>
        <div style={{ minWidth: 0 }}>
          <h2 style={{
            margin: 0, fontSize: "var(--ds-t-title)", fontWeight: 700,
            letterSpacing: "-0.03em", lineHeight: 1.15, color: "var(--ds-ink)",
          }}>
            {titulo}
          </h2>
          {nota && (
            <div style={{ fontSize: "var(--ds-t-small)", fontWeight: 600,
              color: "var(--ds-ink-3)", marginTop: 3 }}>
              {nota}
            </div>
          )}
        </div>
        {/* Colapsa a cero cuando no hay sitio: media regla se lee como un
            guion suelto, no como una regla. */}
        <div style={{ flex: 1, height: 1, minWidth: 0,
          background: "linear-gradient(90deg, var(--ds-line-firm), transparent)" }} />
        {accion}
      </div>
      {children}
    </div>
  );
}
