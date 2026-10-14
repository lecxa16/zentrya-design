/**
 * Rampa de magnitud compartida por los mapas de calor.
 *
 * Cinco cubetas iguales entre el mínimo y el máximo, más la cubeta 0 para
 * «sin dato». Cubetas y no un degradado continuo: con cinco tonos el ojo
 * puede decir «esto es del nivel 4»; con un continuo sólo «más o menos».
 */
import React from "react";
import { fmt } from "./base";

export const NIVELES = 5;

export function rangoDe(valores) {
  const nums = valores.filter((v) => v !== null && v !== undefined && Number.isFinite(Number(v))).map(Number);
  if (!nums.length) return null;
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

/** 0 = sin dato; 1…5 = magnitud. Un cero real cae en la cubeta 1, no en «sin dato». */
export function cubeta(v, rango) {
  if (v === null || v === undefined || !Number.isFinite(Number(v)) || !rango) return 0;
  if (rango.max === rango.min) return 3;
  const f = (Number(v) - rango.min) / (rango.max - rango.min);
  return Math.min(NIVELES, 1 + Math.floor(f * NIVELES));
}

export const colorCubeta = (c) => `var(--ds-sec-${c})`;

/** Leyenda de la rampa: «poco … mucho» con el rango de cada cubeta. */
export function LeyendaRampa({ rango, formato }) {
  if (!rango) return null;
  const paso = (rango.max - rango.min) / NIVELES;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginTop: "var(--ds-3)",
      fontSize: "var(--ds-t-micro)", fontWeight: 600, color: "var(--ds-ink-3)" }}>
      <span className="ds-num">{fmt(rango.min, formato)}</span>
      {Array.from({ length: NIVELES }, (_, i) => (
        <span key={i} title={`${fmt(rango.min + paso * i, formato)} – ${fmt(rango.min + paso * (i + 1), formato)}`}
          style={{ width: 22, height: 10, borderRadius: "var(--ds-r-mini)", background: colorCubeta(i + 1) }} />
      ))}
      <span className="ds-num">{fmt(rango.max, formato)}</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, marginLeft: 10 }}>
        <span style={{ width: 10, height: 10, borderRadius: "var(--ds-r-mini)", background: colorCubeta(0) }} />
        Sin dato
      </span>
    </div>
  );
}
