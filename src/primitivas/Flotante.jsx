/**
 * Flotante — el panel que se abre desde un botón (menús, selectores).
 *
 * Existe para que ninguna pieza vuelva a pagar las tres trampas de GUIA.md:
 *   · se dibuja en un PORTAL a `body`: dentro de una tarjeta con `overflow`
 *     un panel absoluto se recorta y «no aparece»;
 *   · se ancla al lado donde HAY sitio (abajo si cabe, si no arriba) y se
 *     ajusta al borde de la ventana: anclado siempre igual se sale de la
 *     pantalla en la última fila o en el teléfono;
 *   · `position: fixed` calculado con la caja del botón, y se recalcula con
 *     scroll y cambio de tamaño: nada de `sticky`.
 *
 * Escape y un clic fuera lo cierran, y el foco vuelve al botón que lo abrió:
 * quien navega con teclado no se queda en ninguna parte.
 *
 * El tema y los tokens viven en <html>, así que el portal los hereda; la
 * fuente no (el `body` del proyecto anfitrión puede tener otra), por eso se
 * declara aquí.
 */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const MARGEN = 8;

export default function Flotante({
  ancla, abierto, onCerrar, children, rol = "menu", etiqueta, minAncho = 200, estilo, lado = "abajo",
}) {
  const panel = useRef(null);
  const [sitio, setSitio] = useState(null);
  /* En una ref: si quien lo usa pasa una función nueva en cada render, el
     efecto de abajo se volvería a montar y el foco saltaría al primero. */
  const alCerrar = useRef(onCerrar);
  alCerrar.current = onCerrar;

  useLayoutEffect(() => {
    if (!abierto) { setSitio(null); return undefined; }
    const ubicar = () => {
      const a = ancla?.current?.getBoundingClientRect();
      const p = panel.current?.getBoundingClientRect();
      if (!a) return;
      const w = p?.width || minAncho;
      const h = p?.height || 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      /* `lado="derecha"`: junto al botón, no debajo —el riel contraído del menú
         lateral—. Si no cabe a la derecha, se queda abajo. */
      if (lado === "derecha" && a.right + 8 + w <= vw - MARGEN) {
        const top = Math.max(MARGEN, Math.min(a.top, vh - h - MARGEN));
        setSitio({ izq: a.right + 8, top, haciaArriba: false });
        return;
      }
      const abajo = vh - a.bottom;
      const haciaArriba = h > 0 && abajo < h + MARGEN && a.top > abajo;
      const top = haciaArriba ? Math.max(MARGEN, a.top - h - 6) : a.bottom + 6;
      /* Alineado al borde izquierdo del botón; si no cabe, al derecho; y
         siempre dentro de la ventana. */
      let izq = a.left;
      if (izq + w > vw - MARGEN) izq = a.right - w;
      izq = Math.max(MARGEN, Math.min(izq, vw - w - MARGEN));
      setSitio({ izq, top, haciaArriba });
    };
    ubicar();
    const segunda = requestAnimationFrame(ubicar);
    window.addEventListener("resize", ubicar);
    window.addEventListener("scroll", ubicar, true);
    return () => {
      cancelAnimationFrame(segunda);
      window.removeEventListener("resize", ubicar);
      window.removeEventListener("scroll", ubicar, true);
    };
  }, [abierto, ancla, minAncho, lado]);

  useEffect(() => {
    if (!abierto) return undefined;
    const cerrar = (devolverFoco) => {
      alCerrar.current?.();
      if (devolverFoco) ancla?.current?.focus?.();
    };
    const alTeclear = (e) => {
      if (e.key === "Escape") { e.stopPropagation(); cerrar(true); }
    };
    const alClic = (e) => {
      if (panel.current?.contains(e.target) || ancla?.current?.contains(e.target)) return;
      cerrar(false);
    };
    document.addEventListener("keydown", alTeclear, true);
    document.addEventListener("mousedown", alClic, true);
    /* El foco entra al panel: al primer elemento marcado o al primero que
       se pueda pulsar. */
    const t = requestAnimationFrame(() => {
      const p = panel.current;
      /* Por prioridad, no por orden en el documento: la elegida primero. */
      const el = p?.querySelector('[aria-checked="true"]') || p?.querySelector("[data-foco]")
        || p?.querySelector('button, [tabindex="0"]');
      el?.focus?.();
    });
    return () => {
      cancelAnimationFrame(t);
      document.removeEventListener("keydown", alTeclear, true);
      document.removeEventListener("mousedown", alClic, true);
    };
  }, [abierto, ancla]);

  if (!abierto || typeof document === "undefined") return null;

  return createPortal((
    <div ref={panel} role={rol} aria-label={etiqueta} className="ds-capa"
      onKeyDown={(e) => {
        /* Flechas entre opciones, como en cualquier menú del sistema. */
        if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
        const items = [...(panel.current?.querySelectorAll("button:not([disabled])") || [])];
        const i = items.indexOf(document.activeElement);
        if (!items.length) return;
        e.preventDefault();
        const sig = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
        items[sig].focus();
      }}
      style={{
        position: "fixed", left: sitio?.izq ?? -9999, top: sitio?.top ?? -9999, zIndex: 80,
        minWidth: minAncho, maxWidth: `calc(100vw - ${MARGEN * 2}px)`,
        maxHeight: `calc(100vh - ${MARGEN * 2}px)`, overflowY: "auto",
        padding: 5, borderRadius: 12,
        background: "var(--ds-panel)", border: "1px solid var(--ds-line)",
        backdropFilter: "var(--ds-blur)", WebkitBackdropFilter: "var(--ds-blur)",
        boxShadow: "var(--ds-lift-3)", fontFamily: "var(--ds-font)", color: "var(--ds-ink)",
        visibility: sitio ? "visible" : "hidden",
        animation: sitio
          ? `${sitio.haciaArriba ? "ds-sube" : "ds-baja"} var(--ds-t-state) var(--ds-ease) both`
          : undefined,
        ...estilo,
      }}>
      {children}
    </div>
  ), document.body);
}

/** Opción de un Flotante: renglón pulsable con palomita cuando está elegida. */
export function OpcionFlotante({ children, elegida, onClick, rol = "menuitemradio", nota, peligro }) {
  return (
    <button type="button" role={rol} aria-checked={rol === "menuitemradio" ? !!elegida : undefined}
      onClick={onClick} className="ds-menu-opcion" data-peligro={peligro ? "" : undefined}
      style={{
        display: "flex", alignItems: "center", gap: "var(--ds-3)", width: "100%", minHeight: 34,
        fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 500,
        padding: "6px 10px", borderRadius: 7, border: "none",
        cursor: "pointer", textAlign: "left",
        background: elegida ? "var(--ds-accent-soft)" : "transparent",
        color: peligro ? "var(--ds-risk)" : elegida ? "var(--ds-accent-tinta)" : "var(--ds-ink)",
      }}>
      <span style={{ flex: 1, minWidth: 0 }}>
        {children}
        {nota && (
          <span className="ds-num" style={{ display: "block", fontSize: "var(--ds-t-micro)",
            fontWeight: 600, color: "var(--ds-ink-3)", marginTop: 1 }}>{nota}</span>
        )}
      </span>
      {/* La palomita dice cuál está puesta sin depender del color. */}
      {elegida && (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )}
    </button>
  );
}
