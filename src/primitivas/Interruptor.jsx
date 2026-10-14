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
 */
import React from "react";

export default function Interruptor({
  encendido = false, onCambio, etiqueta, deshabilitado = false, estilo,
}) {
  return (
    <button
      type="button" role="switch" aria-checked={encendido} aria-label={etiqueta}
      title={etiqueta} disabled={deshabilitado}
      onClick={() => onCambio?.(!encendido)}
      style={{
        position: "relative", flexShrink: 0, width: 42, height: 25,
        borderRadius: "var(--ds-r-pill)", cursor: deshabilitado ? "not-allowed" : "pointer",
        border: `1px solid ${encendido ? "transparent" : "var(--ds-line-firm)"}`,
        background: encendido ? "var(--ds-accent-trazo)" : "var(--ds-surface-sunk)",
        opacity: deshabilitado ? 0.5 : 1,
        transition: "background var(--ds-t-state) var(--ds-ease)",
        padding: 0,
      }}
    >
      <span aria-hidden style={{
        position: "absolute", top: 2, left: encendido ? 19 : 2,
        width: 19, height: 19, borderRadius: "var(--ds-r-pill)",
        background: encendido ? "var(--ds-ink-on-accent)" : "var(--ds-surface-solid)",
        boxShadow: "var(--ds-lift-1)",
        transition: "left var(--ds-t-state) var(--ds-ease)",
        ...estilo,
      }} />
    </button>
  );
}
