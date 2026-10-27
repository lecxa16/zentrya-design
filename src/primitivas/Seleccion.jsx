/**
 * Selección de renglones: la casilla y la barra de acciones por lote.
 *
 * La GUIA prohíbe el checkbox para ENCENDER algo (eso es `Interruptor`). Elegir renglones para actuar sobre varios es
 * otra cosa: no cambia el dato, junta un conjunto. Por eso existe esta casilla, y no es un `<input type="checkbox">`:
 * el nativo no se pinta con los tokens y en oscuro sale blanco.
 *
 *   <Casilla marcada={true | false | "mixta"} onCambio etiqueta />      role="checkbox", aria-checked
 *   <BarraSeleccion cantidad={3} onQuitar={…}>{acciones}</BarraSeleccion>
 *
 * La barra va fija abajo (como la de `Formulario`: `fixed`, no `sticky`) y sólo existe con algo elegido: una barra que
 * dice «0 seleccionados» es ruido. En modo dock se sube para no quedar debajo de la barra de tareas.
 */
import React from "react";
import Boton from "./Boton";
import { useArmazon, ALTO_DOCK } from "../Armazon";

export function Casilla({ marcada = false, onCambio, etiqueta, deshabilitado = false }) {
  const mixta = marcada === "mixta";
  const llena = marcada === true || mixta;
  return (
    <button
      type="button" role="checkbox" aria-checked={mixta ? "mixed" : !!marcada} aria-label={etiqueta}
      title={etiqueta} disabled={deshabilitado}
      onClick={(e) => { e.stopPropagation(); onCambio?.(!(marcada === true)); }}
      style={{
        display: "inline-grid", placeItems: "center", width: 20, height: 20, padding: 0, flexShrink: 0,
        borderRadius: "var(--ds-r-mini)", cursor: deshabilitado ? "not-allowed" : "pointer",
        border: `1.5px solid ${llena ? "var(--ds-accent-trazo)" : "var(--ds-line-firm)"}`,
        background: llena ? "var(--ds-accent)" : "var(--ds-surface-solid)",
        color: "var(--ds-ink-on-accent)", opacity: deshabilitado ? 0.5 : 1,
        transition: "background var(--ds-t-tap) var(--ds-ease), border-color var(--ds-t-tap) var(--ds-ease)",
      }}
    >
      {llena && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d={mixta ? "M6 12h12" : "M20 6L9 17l-5-5"} />
        </svg>
      )}
    </button>
  );
}

export function BarraSeleccion({ cantidad = 0, onQuitar, children, singular = "seleccionado", plural = "seleccionados" }) {
  const { modo } = useArmazon();
  if (!cantidad) return null;
  const piso = modo === "dock" ? ALTO_DOCK : 0;
  return (
    <div role="region" aria-label="Acciones sobre la selección" style={{
      position: "fixed", left: 0, right: 0, bottom: piso, zIndex: 25,
      display: "flex", justifyContent: "center", padding: "var(--ds-3) var(--ds-4)",
      paddingBottom: "calc(var(--ds-3) + env(safe-area-inset-bottom, 0px))",
      background: "var(--ds-panel)", borderTop: "1px solid var(--ds-line)",
      backdropFilter: "var(--ds-blur)", WebkitBackdropFilter: "var(--ds-blur)",
      animation: "ds-sube var(--ds-t-move) var(--ds-ease) both",
    }}>
      <div style={{ width: "100%", maxWidth: 1200, display: "flex", alignItems: "center", gap: "var(--ds-2)",
        flexWrap: "wrap" }}>
        <span className="ds-num" aria-live="polite" style={{ fontWeight: 700, color: "var(--ds-ink)",
          fontSize: "var(--ds-t-body)", marginRight: "var(--ds-2)" }}>
          {cantidad} {cantidad === 1 ? singular : plural}
        </span>
        <span style={{ flex: 1 }} />
        {children}
        <Boton variante="fantasma" onClick={onQuitar}>Quitar selección</Boton>
      </div>
    </div>
  );
}
