/**
 * Las piezas de una sección de ajustes, a la manera de Configuración de Apple
 * (v2.9, Carlos 2026-10-27).
 *
 *   SeccionAjustes  un grupo redondeado: el título arriba, fuera del grupo; sus
 *                   renglones adentro, separados por una línea fina; la
 *                   explicación abajo, en letra chica. Si es un formulario, su
 *                   propio botón de guardar va al pie del grupo (nunca un
 *                   «Guardar todo»: cada sección se guarda sola).
 *   FilaAjuste      el renglón: qué es y por qué a la izquierda, el control a
 *                   la derecha (en el teléfono, uno debajo del otro). Con
 *                   `icono`, un icono de un solo color (gris; `color` para
 *                   teñirlo) y la línea de separación empieza después de él. Con
 *                   `onClick`, el renglón entero es un botón con `valor` y ›.
 *                   Sin cuadritos de color (Carlos, 2026-10-27: no combinaban).
 *   EstadoGuardado  para lo que se guarda solo (un interruptor): «Guardando…» y
 *                   «Guardado» visibles y anunciados. Sin ese aviso, quien cambia
 *                   algo no sabe si se quedó.
 */
import React from "react";
import { useAngosto } from "../ancho";

const FLECHA = (
  <svg width="8" height="13" viewBox="0 0 8 13" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M1.5 1.5 6.5 6.5 1.5 11.5" /></svg>
);

export function SeccionAjustes({ id, titulo, descripcion, estado, children, pie }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-titulo` : undefined}>
      <header style={{ display: "flex", alignItems: "flex-end", gap: "var(--ds-3)", padding: "0 var(--ds-4) 7px" }}>
        <h2 id={id ? `${id}-titulo` : undefined} style={{ flex: 1, minWidth: 0, margin: 0, fontSize: "var(--ds-t-small)",
          fontWeight: 600, color: "var(--ds-ink-2)" }}>{titulo}</h2>
        {estado}
      </header>
      <div style={{
        background: "var(--ds-surface-solid)", border: "1px solid var(--ds-line)", borderRadius: 12,
        boxShadow: "var(--ds-lift-1)", padding: "0 var(--ds-4)",
      }}>
        {children}
        {pie && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--ds-2)", flexWrap: "wrap",
            borderTop: "1px solid var(--ds-line)", padding: "var(--ds-3) 0" }}>{pie}</div>
        )}
      </div>
      {descripcion && (
        <p style={{ margin: "7px var(--ds-4) 0", fontSize: "var(--ds-t-small)", lineHeight: 1.45,
          color: "var(--ds-ink-2)" }}>{descripcion}</p>
      )}
    </section>
  );
}

/** El icono de un renglón: de un solo color, en el gris del texto secundario (o `color`). */
export function IconoAjuste({ children, color }) {
  return (
    <span aria-hidden style={{
      display: "grid", placeItems: "center", flexShrink: 0, width: 22, lineHeight: 0,
      color: color || "var(--ds-ink-2)",
    }}>{children}</span>
  );
}

export function FilaAjuste({ titulo, descripcion, children, primera = false, icono, color, onClick, valor }) {
  const angosto = useAngosto();
  const boton = !!onClick;
  const texto = (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: "var(--ds-t-body)", fontWeight: 500, color: "var(--ds-ink)" }}>{titulo}</div>
      {descripcion && <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", marginTop: 2, lineHeight: 1.4 }}>{descripcion}</div>}
    </div>
  );
  const cuerpo = boton ? (
    <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: "var(--ds-3)" }}>
      <div style={{ flex: 1, minWidth: 0 }}>{texto}</div>
      {valor && <span style={{ fontSize: "var(--ds-t-body)", color: "var(--ds-ink-2)", whiteSpace: "nowrap" }}>{valor}</span>}
      <span style={{ color: "var(--ds-ink-3)", lineHeight: 0 }}>{FLECHA}</span>
    </div>
  ) : (
    <div style={{
      flex: 1, minWidth: 0, display: "grid", gap: angosto ? "var(--ds-2)" : "var(--ds-5)", alignItems: "center",
      gridTemplateColumns: angosto ? "minmax(0, 1fr)" : "minmax(0, 1fr) minmax(0, 1.2fr)",
    }}>
      {texto}
      <div style={{ minWidth: 0, display: "flex", justifyContent: angosto ? "flex-start" : "flex-end" }}>
        {valor && <span style={{ fontSize: "var(--ds-t-body)", color: "var(--ds-ink-2)" }}>{valor}</span>}
        {children}
      </div>
    </div>
  );
  /* La línea de separación va en el cuerpo, no en el renglón: con icono empieza después de él, como en iOS. */
  const interior = (
    <>
      {icono && <IconoAjuste color={color}>{icono}</IconoAjuste>}
      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", minHeight: 50, padding: "11px 0",
        borderTop: primera ? "none" : "1px solid var(--ds-line)" }}>{cuerpo}</div>
    </>
  );
  const fila = { display: "flex", alignItems: "center", gap: "var(--ds-3)", width: "100%" };
  if (!boton) return <div style={fila}>{interior}</div>;
  return (
    <button type="button" onClick={onClick} style={{
      ...fila, padding: 0, margin: 0, border: "none", background: "transparent", textAlign: "left", cursor: "pointer",
      font: "inherit", color: "inherit", borderRadius: 8,
    }}
      onPointerDown={(e) => { e.currentTarget.style.background = "var(--ds-surface-2)"; }}
      onPointerUp={(e) => { e.currentTarget.style.background = "transparent"; }}
      onPointerLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
      {interior}
    </button>
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
      fontSize: "var(--ds-t-small)", fontWeight: 600,
      color: estado === "error" ? "var(--ds-risk)" : estado === "guardado" ? "var(--ds-ok)" : "var(--ds-ink-2)",
    }}>
      {estado === "guardado" && PALOMITA}
      {estado ? textos[estado] : ""}
    </span>
  );
}
