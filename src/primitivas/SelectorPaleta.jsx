/**
 * SelectorPaleta — la persona elige con qué color se ve la app.
 *
 * Una rejilla de dos por dos con la muestra del acento de cada paleta en el
 * tema activo. Empezó como un `Segmentado`, pero a 390 px cuatro nombres no
 * caben en una fila y la última quedaba cortada; dos columnas caben igual en
 * el modal de escritorio que en el teléfono (v2.0.2).
 *
 * Solo aparece si el `ProveedorTema` recibió `paletas`. Accesible como grupo de
 * radio: Tab entra a la elegida y las flechas cambian (y eligen). Normalmente
 * vive dentro de `BotonApariencia`, no suelto en la barra.
 */
import React, { useRef } from "react";
import { useTema } from "../Tema";

export default function SelectorPaleta({ etiqueta = "Paleta de color", estilo }) {
  const { tema, paleta, paletas, fijarPaleta } = useTema();
  const refs = useRef([]);
  if (!paletas.length) return null;
  const i = Math.max(0, paletas.findIndex((p) => p.id === paleta));

  const alTeclear = (e) => {
    const salto = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!salto) return;
    e.preventDefault();
    const sig = (i + salto + paletas.length) % paletas.length;
    fijarPaleta(paletas[sig].id);
    refs.current[sig]?.focus();
  };

  return (
    <div role="radiogroup" aria-label={etiqueta} onKeyDown={alTeclear}
      style={{ display: "grid", gap: "var(--ds-2)", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", ...estilo }}>
      {paletas.map((p, j) => {
        const elegida = j === i;
        return (
          <button key={p.id} ref={(el) => { refs.current[j] = el; }} type="button" role="radio"
            aria-checked={elegida} tabIndex={elegida ? 0 : -1} onClick={() => fijarPaleta(p.id)}
            style={{
              display: "flex", alignItems: "center", gap: 10, minHeight: 44, padding: "0 14px",
              cursor: "pointer", fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 600,
              borderRadius: "var(--ds-r-item)", textAlign: "left",
              color: elegida ? "var(--ds-ink)" : "var(--ds-ink-2)",
              background: elegida ? "var(--ds-surface-solid)" : "var(--ds-surface-sunk)",
              border: `1px solid ${elegida ? "var(--ds-accent-trazo)" : "var(--ds-line)"}`,
              boxShadow: elegida ? "var(--ds-lift-1)" : "none",
              transition: "border-color var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease)",
            }}>
            <span aria-hidden style={{
              width: 16, height: 16, borderRadius: "var(--ds-r-pill)", flex: "0 0 auto",
              background: p.muestra[tema], boxShadow: "inset 0 0 0 1px var(--ds-line-firm)",
            }} />
            {p.nombre}
          </button>
        );
      })}
    </div>
  );
}
