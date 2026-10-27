/**
 * Interruptor — encender o apagar una fila de un catálogo.
 *
 * Existe porque un catálogo administrable es una lista de treinta renglones y
 * cada uno se prende o se apaga: treinta botones que dicen «Desactivar» son
 * treinta verbos compitiendo, y la casilla nativa (`<input type=checkbox>`) la
 * dibuja el sistema operativo, así que en tema oscuro sale una caja blanca.
 *
 * Es un `button` con `role="switch"`, no una casilla: se recorre con el
 * teclado, se acciona con espacio o Enter y un lector de pantalla anuncia
 * encendido/apagado. La etiqueta viaja en `etiqueta` — un interruptor sin
 * nombre accesible es un interruptor que nadie ciego puede usar.
 *
 * Medidas de iOS (v2.9): 51 × 31 y perilla de 27; al presionarlo la perilla se
 * estira hacia donde va a ir, como en el iPhone.
 */
import React, { useState } from "react";

export default function Interruptor({
  encendido = false, onCambio, etiqueta, deshabilitado = false, estilo,
}) {
  const [presionado, setPresionado] = useState(false);
  const perilla = presionado && !deshabilitado ? 33 : 27;
  return (
    <button
      type="button" role="switch" aria-checked={encendido} aria-label={etiqueta}
      title={etiqueta} disabled={deshabilitado}
      onClick={() => onCambio?.(!encendido)}
      onPointerDown={() => setPresionado(true)} onPointerUp={() => setPresionado(false)}
      onPointerLeave={() => setPresionado(false)} onPointerCancel={() => setPresionado(false)}
      style={{
        position: "relative", flexShrink: 0, width: 51, height: 31,
        borderRadius: "var(--ds-r-pill)", cursor: deshabilitado ? "not-allowed" : "pointer",
        border: `1px solid ${encendido ? "transparent" : "var(--ds-line-firm)"}`,
        background: encendido ? "var(--ds-accent-trazo)" : "var(--ds-surface-sunk)",
        opacity: deshabilitado ? 0.5 : 1,
        transition: "background var(--ds-t-state) var(--ds-ease)",
        padding: 0,
      }}
    >
      <span aria-hidden style={{
        position: "absolute", top: 1, left: encendido ? 49 - 1 - perilla : 1,
        width: perilla, height: 27, borderRadius: "var(--ds-r-pill)",
        background: encendido ? "var(--ds-ink-on-accent)" : "var(--ds-surface-solid)",
        boxShadow: "0 3px 8px rgba(0,0,0,0.15), 0 1px 1px rgba(0,0,0,0.12)",
        transition: "left var(--ds-t-state) var(--ds-ease), width var(--ds-t-state) var(--ds-ease)",
        ...estilo,
      }} />
    </button>
  );
}
