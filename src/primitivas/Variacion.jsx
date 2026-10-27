/**
 * Variación — cuánto cambió una cifra contra otra (periodo anterior, meta,
 * presupuesto).
 *
 * Subir no siempre es bueno: ventas que suben es bueno, costos que suben no,
 * días de cobranza que suben tampoco. Por eso la pieza no decide el color por
 * la flecha sino por `sentido`:
 *   "sube"     subir es bueno (ventas, utilidad, entregas a tiempo)
 *   "baja"     bajar es bueno (costos, días de cartera, mermas, devoluciones)
 *   "neutro"   sólo informa, sin juicio (inventario, plantilla)
 *
 * La flecha y el signo llevan el significado; el color lo refuerza. Nunca el
 * color solo: quien no distingue rojo de verde lee la flecha.
 *
 * Sin dato que comparar sale «sin comparativo», no un 0 %: un cero inventado
 * dice «no cambió», que es otra afirmación.
 */
import React from "react";
import { porcentaje } from "../formato";

export default function Variacion({
  valor, sentido = "sube", contra, decimales = 1, enPuntos = false, tamano = "s", estilo,
}) {
  const sinDato = valor === null || valor === undefined || Number.isNaN(Number(valor));
  const v = sinDato ? 0 : Number(valor);
  const dir = sinDato || v === 0 ? 0 : v > 0 ? 1 : -1;
  const bueno = sentido === "neutro" || dir === 0 ? null
    : (sentido === "sube" ? dir > 0 : dir < 0);
  const tinta = bueno === null ? "var(--ds-ink-2)" : bueno ? "var(--ds-ok)" : "var(--ds-risk)";
  const fondo = bueno === null ? "var(--ds-surface-sunk)" : bueno ? "var(--ds-ok-soft)" : "var(--ds-risk-soft)";
  const flecha = dir > 0 ? "▲" : dir < 0 ? "▼" : "●";
  const fs = tamano === "m" ? "var(--ds-t-small)" : "var(--ds-t-micro)";

  if (sinDato) {
    return (
      <span style={{ fontSize: fs, fontWeight: 600, color: "var(--ds-ink-3)", ...estilo }}>
        Sin comparativo
      </span>
    );
  }

  const texto = enPuntos
    ? `${v > 0 ? "+" : ""}${v.toFixed(decimales)} pts`
    : porcentaje(v, { decimales, signo: true });

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, flexWrap: "wrap", ...estilo }}>
      <span className="ds-num" style={{
        display: "inline-flex", alignItems: "center", gap: 4, background: fondo, color: tinta,
        fontSize: fs, fontWeight: 700, padding: "2px 8px", borderRadius: "var(--ds-r-pill)",
        whiteSpace: "nowrap",
      }}
        aria-label={`${dir > 0 ? "Sube" : dir < 0 ? "Baja" : "Sin cambio"} ${texto}${
          bueno === null ? "" : bueno ? ", favorable" : ", desfavorable"}`}>
        <span aria-hidden="true" style={{ fontSize: "0.8em" }}>{flecha}</span>
        {texto}
      </span>
      {contra && (
        <span style={{ fontSize: fs, fontWeight: 600, color: "var(--ds-ink-3)" }}>{contra}</span>
      )}
    </span>
  );
}
