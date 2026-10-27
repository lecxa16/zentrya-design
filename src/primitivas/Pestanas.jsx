/**
 * Pestañas — secciones de una misma pantalla.
 *
 * La activa se marca con relleno de tinta, igual que la sección activa de
 * la navegación: es la misma idea —dónde estoy— y en un sistema no puede
 * tener dos formas.
 *
 * Se recorre con las flechas del teclado, que es lo que un lector de
 * pantalla espera de un `tablist`.
 */
import React, { useRef } from "react";

export default function Pestanas({ pestanas = [], activa, onCambio, estilo }) {
  const refs = useRef([]);

  const alTeclear = (e) => {
    const i = pestanas.findIndex((p) => p.id === activa);
    const salto = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!salto) return;
    e.preventDefault();
    const siguiente = (i + salto + pestanas.length) % pestanas.length;
    onCambio?.(pestanas[siguiente].id);
    refs.current[siguiente]?.focus();
  };

  return (
    <div role="tablist" onKeyDown={alTeclear}
      style={{ display: "flex", gap: "var(--ds-1)", flexWrap: "wrap",
        padding: 4, borderRadius: "var(--ds-r-pill)", width: "fit-content", maxWidth: "100%",
        background: "var(--ds-surface-2)", border: "1px solid var(--ds-line)", ...estilo }}>
      {pestanas.map((p, i) => {
        const esta = p.id === activa;
        return (
          <button key={p.id} role="tab" aria-selected={esta} tabIndex={esta ? 0 : -1}
            ref={(el) => { refs.current[i] = el; }}
            onClick={() => onCambio?.(p.id)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
              fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 600,
              padding: "8px 15px", borderRadius: "var(--ds-r-pill)", border: "none",
              cursor: "pointer",
              background: esta ? "var(--ds-ink)" : "transparent",
              color: esta ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
              transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)",
            }}>
            {p.icono}{p.texto}
            {p.cuenta !== undefined && (
              <span className="ds-num" style={{
                fontSize: "var(--ds-t-micro)", fontWeight: 700, padding: "1px 6px",
                borderRadius: "var(--ds-r-pill)",
                background: esta ? "rgba(255,255,255,0.18)" : "var(--ds-surface)",
                color: esta ? "var(--ds-surface-solid)" : "var(--ds-ink-3)",
              }}>{p.cuenta}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Cargando — la espera, sin saltos de layout. */
export function Cargando({ texto = "Cargando…", alto = 200 }) {
  return (
    <div role="status" style={{ display: "grid", placeItems: "center", gap: "var(--ds-3)",
      minHeight: alto, color: "var(--ds-ink-3)", fontSize: "var(--ds-t-small)" }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2.4" strokeLinecap="round" aria-hidden
        style={{ animation: "ds-girar 900ms linear infinite", color: "var(--ds-accent-trazo)" }}>
        <path d="M12 3a9 9 0 019 9" />
      </svg>
      {texto}
    </div>
  );
}
