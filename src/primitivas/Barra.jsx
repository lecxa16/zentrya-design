/**
 * Barra — la navegación del producto.
 *
 * Vive fuera del contenido, como en la referencia del sistema: una banda
 * oscura que no compite con las tarjetas. Es la pieza que impide que una
 * pantalla quede sin salida.
 */
import React from "react";

export default function Barra({ marca, secciones = [], activa, onIr, derecha, estilo }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "var(--ds-2)",
      background: "var(--ds-frame)", color: "var(--ds-ink-on-dark)",
      borderRadius: "var(--ds-r-pill)", padding: "var(--ds-2)",
      boxShadow: "var(--ds-lift-3)", flexWrap: "wrap",
      ...estilo,
    }}>
      {marca && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 10px",
          fontWeight: 700, fontSize: "var(--ds-t-body)", letterSpacing: "-0.02em" }}>
          {marca}
        </div>
      )}

      {secciones.map((s) => {
        const esta = s.id === activa;
        return (
          <button key={s.id} onClick={() => onIr?.(s)}
            aria-current={esta ? "page" : undefined}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 600,
              padding: "8px 14px", borderRadius: "var(--ds-r-pill)", border: "none",
              cursor: "pointer",
              background: esta ? "rgba(255,255,255,0.14)" : "transparent",
              color: esta ? "#FFFFFF" : "rgba(255,255,255,0.62)",
              transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)",
            }}
            onMouseEnter={(e) => { if (!esta) e.currentTarget.style.color = "#FFFFFF"; }}
            onMouseLeave={(e) => { if (!esta) e.currentTarget.style.color = "rgba(255,255,255,0.62)"; }}
          >
            {s.icono}{s.texto}
          </button>
        );
      })}

      <div style={{ flex: 1 }} />
      {derecha}
    </div>
  );
}
