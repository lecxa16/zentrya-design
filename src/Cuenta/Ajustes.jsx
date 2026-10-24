/**
 * Las piezas de una sección de ajustes.
 *
 *   SeccionAjustes  una tarjeta con título, explicación, sus renglones y, si es
 *                   un formulario, su propio botón de guardar abajo (nunca un
 *                   «Guardar todo»: cada sección se guarda sola).
 *   FilaAjuste      el renglón de siempre: qué es y por qué a la izquierda, el
 *                   control a la derecha (en el teléfono, uno debajo del otro).
 *   EstadoGuardado  para lo que se guarda solo (un interruptor): «Guardando…» y
 *                   «Guardado» visibles y anunciados. Sin ese aviso, quien cambia
 *                   algo no sabe si se quedó.
 */
import React from "react";
import { useAngosto } from "../ancho";

export function SeccionAjustes({ id, titulo, descripcion, estado, children, pie }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-titulo` : undefined} style={{
      background: "var(--ds-surface)", border: "1px solid var(--ds-line)", borderRadius: "var(--ds-r-card)",
      boxShadow: "var(--ds-lift-1)", backdropFilter: "var(--ds-blur)", WebkitBackdropFilter: "var(--ds-blur)",
      padding: "var(--ds-5) var(--ds-6)",
    }}>
      <header style={{ display: "flex", alignItems: "flex-start", gap: "var(--ds-3)", marginBottom: "var(--ds-2)" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 id={id ? `${id}-titulo` : undefined} style={{ margin: 0, fontSize: "var(--ds-t-body)", fontWeight: 800,
            letterSpacing: "-0.01em" }}>{titulo}</h2>
          {descripcion && <p style={{ margin: "4px 0 0", fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)" }}>{descripcion}</p>}
        </div>
        {estado}
      </header>
      <div>{children}</div>
      {pie && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--ds-2)", flexWrap: "wrap",
          borderTop: "1px solid var(--ds-line)", marginTop: "var(--ds-3)", paddingTop: "var(--ds-4)" }}>{pie}</div>
      )}
    </section>
  );
}

export function FilaAjuste({ titulo, descripcion, children, primera = false }) {
  const angosto = useAngosto();
  return (
    <div style={{
      display: "grid", gap: angosto ? "var(--ds-2)" : "var(--ds-5)", alignItems: "center",
      gridTemplateColumns: angosto ? "minmax(0, 1fr)" : "minmax(0, 1fr) minmax(0, 1.2fr)",
      padding: "var(--ds-4) 0", borderTop: primera ? "none" : "1px solid var(--ds-line)",
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "var(--ds-t-small)", fontWeight: 700, color: "var(--ds-ink)" }}>{titulo}</div>
        {descripcion && <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", marginTop: 2 }}>{descripcion}</div>}
      </div>
      <div style={{ minWidth: 0, display: "flex", justifyContent: angosto ? "flex-start" : "flex-end" }}>{children}</div>
    </div>
  );
}

const PALOMITA = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6L9 17l-5-5" /></svg>
);

/** `estado`: "guardando" | "guardado" | "error" | null. */
export function EstadoGuardado({ estado }) {
  const textos = { guardando: "Guardando…", guardado: "Guardado", error: "No se pudo guardar" };
  return (
    <span role="status" aria-live="polite" style={{
      display: "inline-flex", alignItems: "center", gap: 6, minHeight: 24, whiteSpace: "nowrap",
      fontSize: "var(--ds-t-small)", fontWeight: 700,
      color: estado === "error" ? "var(--ds-risk)" : estado === "guardado" ? "var(--ds-ok)" : "var(--ds-ink-2)",
    }}>
      {estado === "guardado" && PALOMITA}
      {estado ? textos[estado] : ""}
    </span>
  );
}
