/**
 * Cifra — el número es el protagonista.
 *
 * En la referencia de este sistema, cada dato se lee primero como número y
 * después como etiqueta. Por eso la cifra tiene su propia escala tipográfica
 * y siempre usa numerales de ancho fijo: varias cifras en columna deben
 * alinearse sin que nadie lo piense.
 *
 * `tono` pinta SÓLO el número, nunca el fondo de la tarjeta: el color aquí
 * significa estado, y un fondo de color lo convertiría en decoración.
 */
import React from "react";

const TONO = {
  neutro: "var(--ds-ink)",
  acento: "var(--ds-accent-tinta)",
  ok:     "var(--ds-ok)",
  aviso:  "var(--ds-warn)",
  riesgo: "var(--ds-risk)",
};
const TAMANO = { m: "var(--ds-num-m)", l: "var(--ds-num-l)", xl: "var(--ds-num-xl)" };

export default function Cifra({
  valor, etiqueta, nota, tono = "neutro", tamano = "l", icono, alineacion = "left", estilo,
}) {
  return (
    <div style={{ minWidth: 0, textAlign: alineacion, ...estilo }}>
      {etiqueta && (
        <div style={{
          fontSize: "var(--ds-t-micro)", fontWeight: 600, letterSpacing: "0.05em",
          textTransform: "uppercase", color: "var(--ds-ink-3)",
          /* En una columna estrecha la etiqueta se cortaba contra el icono.
             Al envolver, el icono se queda arriba y la palabra baja entera:
             una etiqueta recortada no es una etiqueta. */
          display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
          minWidth: 0,
          justifyContent: alineacion === "right" ? "flex-end" : "flex-start",
        }}>
          {icono}
          {etiqueta}
        </div>
      )}
      <div className="ds-num" style={{
        fontSize: TAMANO[tamano], fontWeight: 700, lineHeight: 1.05,
        letterSpacing: "-0.035em", color: TONO[tono], marginTop: 2,
      }}>
        {valor}
      </div>
      {nota && (
        <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", marginTop: 3 }}>
          {nota}
        </div>
      )}
    </div>
  );
}
