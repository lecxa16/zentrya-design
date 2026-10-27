/**
 * Llamado — un aviso que vive EN la página, no encima de ella.
 *
 * `Aviso` es modal: interrumpe para dar el resultado de una acción. El
 * Llamado es lo contrario: un estado que hay que tener presente mientras se
 * trabaja —«el periodo de marzo está cerrado», «faltan 3 documentos del
 * proveedor», «el tipo de cambio es de ayer»— y que no debe tapar nada.
 *
 *   tono   info · ok · aviso · riesgo   (el color refuerza; el título dice)
 *
 * No se cierra solo nunca (regla del sistema: lo que se va antes de leerse no
 * informó). Si se puede descartar, se pasa `onCerrar` y aparece un botón con
 * nombre accesible; quien lo cierra decide que ya lo leyó.
 */
import React from "react";

const TONOS = {
  info:   ["var(--ds-info-soft)", "var(--ds-info)", "i"],
  ok:     ["var(--ds-ok-soft)", "var(--ds-ok)", "✓"],
  aviso:  ["var(--ds-warn-soft)", "var(--ds-warn)", "!"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)", "!"],
};

export default function Llamado({
  tono = "info", titulo, children, acciones, icono, onCerrar, estilo,
}) {
  const [fondo, color, marca] = TONOS[tono] || TONOS.info;
  return (
    <div role={tono === "riesgo" || tono === "aviso" ? "alert" : "status"} style={{
      display: "flex", alignItems: "flex-start", gap: "var(--ds-3)",
      background: fondo, borderRadius: "var(--ds-r-item)",
      border: `1px solid color-mix(in oklab, ${color} 22%, transparent)`,
      padding: "var(--ds-3) var(--ds-4)", ...estilo,
    }}>
      <span aria-hidden style={{ width: 24, height: 24, flexShrink: 0, borderRadius: 99,
        background: color, color: "var(--ds-surface-solid)", display: "flex",
        alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13,
        marginTop: 1 }}>
        {icono || marca}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {titulo && (
          <div style={{ fontWeight: 700, color: "var(--ds-ink)", letterSpacing: "-0.01em" }}>
            {titulo}
          </div>
        )}
        {children && (
          <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", lineHeight: 1.5,
            marginTop: titulo ? 2 : 0 }}>
            {children}
          </div>
        )}
        {acciones && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "var(--ds-3)" }}>
            {acciones}
          </div>
        )}
      </div>
      {onCerrar && (
        <button type="button" onClick={onCerrar} aria-label="Cerrar aviso"
          style={{ border: "none", background: "transparent", color: "var(--ds-ink-2)",
            cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 4, borderRadius: 8,
            flexShrink: 0 }}>
          ×
        </button>
      )}
    </div>
  );
}
