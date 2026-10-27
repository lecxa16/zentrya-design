/**
 * Pastilla — etiqueta de estado, e insignia con icono.
 *
 * El color de una pastilla SIEMPRE significa algo (un estado), nunca decora.
 * Para categorías sin estado va la variante neutra.
 */
import React from "react";

const TONOS = {
  neutro: ["var(--ds-surface-sunk)", "var(--ds-ink-2)"],
  acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)"],
  ok:     ["var(--ds-ok-soft)", "var(--ds-ok)"],
  aviso:  ["var(--ds-warn-soft)", "var(--ds-warn)"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)"],
};

export function Pastilla({ children, tono = "neutro", icono, estilo, ...resto }) {
  const [fondo, tinta] = TONOS[tono] || TONOS.neutro;
  return (
    <span {...resto} style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: fondo, color: tinta,
      fontSize: "var(--ds-t-micro)", fontWeight: 600, letterSpacing: "0.02em",
      padding: "4px 10px", borderRadius: "var(--ds-r-pill)", whiteSpace: "nowrap",
      ...estilo,
    }}>
      {icono}
      {children}
    </span>
  );
}

/** Insignia: el icono en su círculo suave, como en la referencia. */
export function Insignia({ children, tono = "acento", tamano = 38, estilo }) {
  const [fondo, tinta] = TONOS[tono] || TONOS.acento;
  return (
    <div style={{
      width: tamano, height: tamano, flexShrink: 0, borderRadius: "var(--ds-r-pill)",
      background: fondo, color: tinta,
      display: "flex", alignItems: "center", justifyContent: "center",
      ...estilo,
    }}>
      {children}
    </div>
  );
}
