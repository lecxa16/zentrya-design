/**
 * Segmentado — elegir UNA entre pocas opciones que cambian cómo se ve lo
 * mismo: Día / Semana / Mes, Lista / Tablero, Pesos / Litros.
 *
 * No es `Pestanas`: las pestañas cambian de contenido (otra sección); el
 * segmentado cambia la lente sobre el mismo contenido. Por eso es compacto
 * y vive junto a lo que modifica, no encima de la pantalla.
 *
 * Accesible como grupo de radio: Tab entra al elegido y las flechas cambian
 * (y eligen) — el comportamiento que espera un lector de pantalla.
 *
 * El indicador se desliza con `left`/`width` medidos, no con transform: en
 * esta casa un transform en un contenedor rompe los `fixed` de dentro
 * (trampa de GUIA.md), y aquí no cuesta nada evitarlo.
 *
 * Más de cinco opciones ya no es un segmentado: es un `Selector`.
 *
 * Forma de Apple (v2.9): rectángulo redondeado (no cápsula), riel gris y la
 * elegida en blanco con sombra; al presionar, la elegida se encoge apenas.
 */
import React, { useLayoutEffect, useRef, useState } from "react";

export default function Segmentado({
  opciones = [], valor, onCambio, etiqueta, tamano = "m", pleno = false, estilo,
}) {
  const refs = useRef([]);
  const caja = useRef(null);
  const [marca, setMarca] = useState(null);
  const [presionado, setPresionado] = useState(false);
  const i = Math.max(0, opciones.findIndex((o) => o.valor === valor));

  useLayoutEffect(() => {
    const medir = () => {
      const b = refs.current[i];
      if (b) setMarca({ izq: b.offsetLeft, ancho: b.offsetWidth });
    };
    medir();
    if (typeof ResizeObserver === "undefined" || !caja.current) return undefined;
    const ro = new ResizeObserver(medir);
    ro.observe(caja.current);
    return () => ro.disconnect();
  }, [i, opciones.length]);

  const alTeclear = (e) => {
    const salto = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!salto || opciones.length === 0) return;
    e.preventDefault();
    const sig = (i + salto + opciones.length) % opciones.length;
    onCambio?.(opciones[sig].valor);
    refs.current[sig]?.focus();
  };

  const alto = tamano === "s" ? 30 : 36;

  return (
    <div ref={caja} role="radiogroup" aria-label={etiqueta} onKeyDown={alTeclear}
      style={{
        position: "relative", display: pleno ? "flex" : "inline-flex", padding: 3, gap: 2,
        background: "var(--ds-surface-sunk)", border: "1px solid var(--ds-line)",
        borderRadius: 9, maxWidth: "100%", overflowX: "auto", ...estilo,
      }}>
      {marca && (
        <span aria-hidden style={{
          position: "absolute", top: 3, bottom: 3, left: marca.izq, width: marca.ancho,
          background: "var(--ds-surface-solid)", borderRadius: 7,
          boxShadow: "0 3px 8px rgba(0,0,0,0.10), 0 1px 1px rgba(0,0,0,0.06)", border: "0.5px solid var(--ds-line)",
          scale: presionado ? "0.96" : "1",
          transition: "left var(--ds-t-state) var(--ds-ease), width var(--ds-t-state) var(--ds-ease), scale var(--ds-t-tap) var(--ds-ease)",
        }} />
      )}
      {opciones.map((o, j) => {
        const elegida = j === i;
        return (
          <button key={o.valor} ref={(el) => { refs.current[j] = el; }} type="button" role="radio"
            aria-checked={elegida} tabIndex={elegida ? 0 : -1}
            onClick={() => onCambio?.(o.valor)}
            onPointerDown={() => { if (elegida) setPresionado(true); }} onPointerUp={() => setPresionado(false)}
            onPointerLeave={() => setPresionado(false)}
            style={{
              position: "relative", zIndex: 1, flex: pleno ? 1 : "0 0 auto",
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
              height: alto, padding: tamano === "s" ? "0 12px" : "0 16px",
              border: "none", background: "transparent", cursor: "pointer",
              fontFamily: "var(--ds-font)", fontSize: tamano === "s" ? "var(--ds-t-micro)" : "var(--ds-t-small)",
              fontWeight: elegida ? 600 : 500, whiteSpace: "nowrap", borderRadius: 7,
              color: elegida ? "var(--ds-ink)" : "var(--ds-ink-2)",
              transition: "color var(--ds-t-state) var(--ds-ease)",
            }}>
            {o.icono}
            {o.texto}
          </button>
        );
      })}
    </div>
  );
}
