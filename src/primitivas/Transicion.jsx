/**
 * Transición — el cambio de vista, animado.
 *
 * Cinco decisiones que valen más que el efecto:
 *
 * 1. **La memoria de dónde venías vive FUERA de React.** Cada ruta monta su
 *    propia pantalla —y con ella su chasis—, así que un `useRef` nace vacío
 *    justo cuando hace falta y no animaría nunca. Medido: al navegar, la
 *    entrada no se disparaba. Un mapa a nivel de módulo, por `ambito`,
 *    sobrevive al remontaje. Dos ámbitos distintos —la ruta y las pestañas de
 *    una pantalla— no se pisan.
 *
 * 2. **Sólo hay animación de ENTRADA.** Para cruzar dos vistas habría que
 *    mantener viva la anterior; eso duplica consultas y foco por un efecto.
 *    Lo que entra se anuncia; lo que se fue, ya se fue.
 *
 * 3. **Anima `top`/`left`, NO `transform`.** ⚠️ Un `transform` en un ancestro
 *    convierte a sus descendientes `position: fixed` en `absolute` respecto a
 *    él: la barra de acciones de un `Formulario` se iría al final del
 *    documento durante la animación y volvería de golpe al acabar. Un
 *    desplazamiento con `top`/`left` sobre un contenedor `relative` no crea
 *    bloque contenedor, así que lo fijo se queda fijo.
 *
 * 4. **La dirección sale de la RUTA.** Si la vista nueva es más profunda que
 *    la anterior —más escalones— entra desde la derecha; si es más somera (un
 *    «volver»), desde la izquierda; si están al mismo nivel, dos secciones
 *    hermanas, sube. El movimiento CUENTA a dónde fue la navegación en vez de
 *    decorarla. Con `eje="y"` siempre sube: entre pestañas no hay profundidad.
 *
 * 5. **No anima cuando el sistema pide menos movimiento**, ni si el navegador
 *    no trae `element.animate`: aparece y ya. Nunca se queda a medias.
 */
import React, { useLayoutEffect, useRef } from "react";

/* La última vista de cada ámbito. A nivel de módulo a propósito: ver (1). */
const ultimas = new Map();

const escalones = (v) => String(v ?? "").split("/").filter(Boolean).length;

/** El token manda: duración y curva se leen del sistema, no se copian aquí. */
function duracion(el, nombre, porOmision) {
  const v = getComputedStyle(el).getPropertyValue(nombre).trim();
  if (v.endsWith("ms")) return parseFloat(v);
  if (v.endsWith("s")) return parseFloat(v) * 1000;
  return porOmision;
}

export default function Transicion({ vista, eje = "auto", ambito = "vista", children, estilo }) {
  const caja = useRef(null);

  useLayoutEffect(() => {
    const el = caja.current;
    const antes = ultimas.get(ambito);
    ultimas.set(ambito, vista);

    /* Primera pantalla de la sesión: no hay de dónde venir, y además cada
       tarjeta ya entra con su propia escalonada (`entrada`). */
    if (!el || vista === undefined || antes === undefined || antes === vista) return;
    if (typeof el.animate !== "function") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;

    const salto = eje === "y" ? 0 : escalones(vista) - escalones(antes);
    const desde = salto > 0 ? { left: "24px", top: "0px" }
      : salto < 0 ? { left: "-24px", top: "0px" }
        : { left: "0px", top: "14px" };

    /* Sin limpieza que la cancele: en desarrollo, `StrictMode` monta, limpia y
       vuelve a montar, así que una cancelación en la limpieza mataba la
       animación en el primer intento y el segundo ya no veía cambio de vista
       —no animaba nunca—. Si el elemento se va, su animación se va con él. */
    el.animate(
      [{ opacity: 0, ...desde }, { opacity: 1, left: "0px", top: "0px" }],
      {
        duration: duracion(el, "--ds-t-vista", 320),
        easing: getComputedStyle(el).getPropertyValue("--ds-ease").trim()
          || "cubic-bezier(0.16, 1, 0.3, 1)",
        /* `fill: none`: al acabar no queda ningún valor pegado al contenedor. */
        fill: "none",
      });
  }, [vista, eje, ambito]);

  return (
    <div ref={caja} style={{ position: "relative", minWidth: 0, ...estilo }}>
      {children}
    </div>
  );
}
