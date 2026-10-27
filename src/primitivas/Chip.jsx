/**
 * Chip — un filtro que está puesto, y cómo quitarlo.
 *
 * Una lista filtrada sin decir por qué está filtrada se lee como «faltan
 * datos». El chip deja escrito el filtro activo («Estatus: Vencida») y lo
 * quita con un clic. El botón de quitar tiene nombre propio («Quitar filtro
 * Estatus: Vencida»): una «x» sola no le dice nada a un lector de pantalla.
 *
 * `BarraFiltros` es la fila que agrupa los controles de filtro (selectores,
 * periodo, buscador) y debajo los chips activos con «Limpiar todo». Envuelve
 * en angosto: los controles bajan de renglón, nunca se aprietan ni empujan
 * la página de lado.
 */
import React from "react";

export default function Chip({ texto, valor, onQuitar, estilo }) {
  const nombre = valor !== undefined && valor !== null && valor !== "" ? `${texto}: ${valor}` : texto;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, maxWidth: "100%",
      background: "var(--ds-accent-soft)", color: "var(--ds-ink)",
      border: "1px solid var(--ds-accent-ring)", borderRadius: "var(--ds-r-pill)",
      padding: onQuitar ? "3px 4px 3px 12px" : "3px 12px",
      fontSize: "var(--ds-t-small)", fontWeight: 600, ...estilo,
    }}>
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
        {valor !== undefined && valor !== null && valor !== ""
          ? <><span style={{ color: "var(--ds-ink-2)" }}>{texto}:</span> <strong style={{ fontWeight: 700 }}>{valor}</strong></>
          : <strong style={{ fontWeight: 700 }}>{texto}</strong>}
      </span>
      {onQuitar && (
        <button type="button" onClick={onQuitar} aria-label={`Quitar filtro ${nombre}`}
          style={{ width: 22, height: 22, flexShrink: 0, display: "grid", placeItems: "center",
            border: "none", borderRadius: "var(--ds-r-pill)", cursor: "pointer",
            background: "transparent", color: "var(--ds-accent-tinta)",
            transition: "background var(--ds-t-state) var(--ds-ease)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ds-surface)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="3" strokeLinecap="round" aria-hidden><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      )}
    </span>
  );
}

/**
 * `activos`: [{ clave, texto, valor }]. `onQuitar(clave)` y `onLimpiar()`.
 * `resultado`: texto opcional a la derecha («128 facturas»).
 */
export function BarraFiltros({ children, activos = [], onQuitar, onLimpiar, resultado, estilo }) {
  return (
    <div role="search" style={{ marginBottom: "var(--ds-4)", ...estilo }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--ds-2)" }}>
        {children}
        {resultado && (
          <span className="ds-num" style={{ marginLeft: "auto", fontSize: "var(--ds-t-small)",
            fontWeight: 600, color: "var(--ds-ink-3)", whiteSpace: "nowrap" }}>
            {resultado}
          </span>
        )}
      </div>
      {activos.length > 0 && (
        <div aria-live="polite" style={{ display: "flex", flexWrap: "wrap", alignItems: "center",
          gap: "var(--ds-2)", marginTop: "var(--ds-3)" }}>
          {activos.map((f) => (
            <Chip key={f.clave} texto={f.texto} valor={f.valor}
              onQuitar={onQuitar ? () => onQuitar(f.clave) : undefined} />
          ))}
          {onLimpiar && activos.length > 1 && (
            <button type="button" onClick={onLimpiar}
              style={{ border: "none", background: "transparent", cursor: "pointer", padding: "4px 8px",
                fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 600,
                color: "var(--ds-accent-tinta)", borderRadius: 8 }}>
              Limpiar todo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
