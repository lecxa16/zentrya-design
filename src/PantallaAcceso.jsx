/**
 * PantallaAcceso — el login (y registro, recuperar contraseña…) de todos los
 * productos.
 *
 * v2.8 (Carlos, 2026-10-27: «se sigue viendo demasiado sencillo y genérico…
 * implementa un login tipo Apple»): una sola columna centrada, sin panel de
 * color ni tarjeta alrededor del formulario. Arriba a la izquierda la marca
 * del producto; al centro el símbolo de Zentrya dibujándose, el título y el
 * formulario (lo natural es `EntradaCuenta`: correo y luego contraseña en un
 * mismo grupo, como Apple). Detrás, en pantallas anchas, la Z grande grabada
 * en líneas finas, tenue, a la izquierda de la columna. La letra es la del
 * sistema (SF en Apple), como en sus pantallas de cuenta.
 *
 * `vitrina` ya no se pinta (v2.7 la dejó opcional y los productos la
 * quitaron: las tarjetas se veían genéricas). `TarjetaVitrina` se sigue
 * exportando para no romper a quien la importe.
 *
 * Movimiento con propósito y accesible. Todo lo que se mueve solo TERMINA en
 * menos de 5 s (el símbolo y la Z, ~2.3 s) y después queda quieto: una
 * animación en bucle exigiría un botón de pausa (WCAG 2.2.2). La Z de fondo
 * se desplaza unos pixeles con el ratón, sólo mientras se mueve. Con
 * «reducir movimiento» todo aparece ya dibujado. `error` sacude el formulario
 * una vez cada que cambia, para que el fallo se sienta además de leerse.
 */
import React, { useEffect, useRef, useState } from "react";
import { useAngosto } from "./ancho";
import { Vidrio } from "./primitivas/Heroe";
import { CIAN_ZENTRYA } from "./marca/Zentrya";

const CSS = `
/* La Z. Las rutas llevan pathLength="100": el guion se mide en por ciento del
   trazo. La luz (14 de largo) va justo en la punta de la línea central porque
   comparten duración, curva y retraso; las demás líneas salen un poco después
   según qué tan lejos están del centro. */
@keyframes ds-z-traza { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
@keyframes ds-z-luz {
  0%   { stroke-dashoffset: 14; opacity: 1; }
  80%  { opacity: 1; }
  100% { stroke-dashoffset: -86; opacity: 0; }
}
@keyframes ds-z-punto { from { transform: scale(0); } 60% { transform: scale(1.35); } to { transform: scale(1); } }
@keyframes ds-z-onda { from { transform: scale(1); opacity: 0.9; } to { transform: scale(4.5); opacity: 0; } }
.ds-z-traza { stroke-dasharray: 100; animation: ds-z-traza 1500ms var(--ds-ease) 250ms both; }
.ds-z-luz { stroke-dasharray: 14 200; animation: ds-z-luz 1500ms var(--ds-ease) 250ms both; }
.ds-z-punto, .ds-z-onda { transform-box: fill-box; transform-origin: center; }
.ds-z-punto { animation: ds-z-punto 460ms var(--ds-ease-out) 1450ms both; }
.ds-z-onda { animation: ds-z-onda 820ms var(--ds-ease-out) 1520ms both; }
.ds-z-capa { transition: transform 900ms var(--ds-ease); }
@keyframes ds-sacude-a { 0%, 100% { translate: 0 0; } 20% { translate: -8px 0; } 40% { translate: 7px 0; } 60% { translate: -5px 0; } 80% { translate: 3px 0; } }
@keyframes ds-sacude-b { 0%, 100% { translate: 0 0; } 20% { translate: -8px 0; } 40% { translate: 7px 0; } 60% { translate: -5px 0; } 80% { translate: 3px 0; } }
.ds-acceso-columna > * { animation: ds-rise var(--ds-t-scene) var(--ds-ease) both; }
.ds-acceso-columna > *:nth-child(2) { animation-delay: 90ms; }
.ds-acceso-columna > *:nth-child(3) { animation-delay: 160ms; }
.ds-acceso-columna > *:nth-child(n+4) { animation-delay: 230ms; }
@media (prefers-reduced-motion: reduce) {
  /* La regla global ya las lleva a su final; sin retraso, la Z aparece dibujada de una vez. */
  .ds-z-traza, .ds-z-luz, .ds-z-punto, .ds-z-onda, .ds-acceso-columna > * { animation-delay: 0ms !important; }
}
`;

/* La letra del sistema (SF en Apple). Desde v2.9 es la de todo el sistema (`--ds-font`); se exporta por compatibilidad. */
export const LETRA_SISTEMA = "var(--ds-font)";

/* La Z del símbolo (M 42 68 → 78 96, trazo 5): viewBox recortado a su trazo,
   con el medio grueso de margen. El punto cian va al final, como en el logo. */
const Z = [[42, 68], [78, 68], [42, 96], [78, 96]];
const VISTA_Z = "39.5 65.5 41 33";

/* La misma Z corrida `d` unidades a su derecha, con las esquinas a inglete
   (corte de las dos rectas corridas): así siete corridas llenan el grueso del
   trazo como un grabado de líneas paralelas. */
function corrida(d) {
  const normal = ([a, b]) => { const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy); return [-dy / l, dx / l]; };
  const tramos = Z.slice(1).map((b, i) => {
    const a = Z[i], [nx, ny] = normal([a, b]);
    return [[a[0] + nx * d, a[1] + ny * d], [b[0] + nx * d, b[1] + ny * d]];
  });
  const corte = ([p1, p2], [p3, p4]) => {
    const den = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
    const t = ((p1[0] - p3[0]) * (p3[1] - p4[1]) - (p1[1] - p3[1]) * (p3[0] - p4[0])) / den;
    return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])];
  };
  const puntos = [tramos[0][0], ...tramos.slice(1).map((t, i) => corte(tramos[i], t)), tramos[tramos.length - 1][1]];
  return "M " + puntos.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(" L ");
}
const LINEAS_Z = [-2.25, -1.5, -0.75, 0, 0.75, 1.5, 2.25].map((d) => ({ d, ruta: corrida(d) }));

/** La Z grande: líneas finas, una luz por la central y el punto. Los gruesos van en unidades del dibujo y no con
    `non-scaling-stroke`: con él, Chrome mide los guiones en pixeles y el trazo se rompía. */
function GrabadoZ({ color }) {
  return (
    <svg aria-hidden focusable="false" viewBox={VISTA_Z} preserveAspectRatio="xMaxYMax meet"
      style={{ display: "block", width: "100%", height: "100%", overflow: "visible" }}>
      {LINEAS_Z.map(({ d, ruta }) => (
        <path key={d} className="ds-z-traza" d={ruta} pathLength="100" fill="none" stroke={color}
          strokeOpacity={d === 0 ? 0.55 : 0.3} strokeWidth="0.08" strokeLinejoin="miter"
          style={{ animationDelay: `${250 + Math.abs(d) * 80}ms` }} />
      ))}
      <path className="ds-z-luz" d={LINEAS_Z[3].ruta} pathLength="100" fill="none" stroke={color}
        strokeWidth="0.2" strokeLinecap="round" />
      <circle className="ds-z-onda" cx="78" cy="96" r="1.1" fill="none" stroke={CIAN_ZENTRYA} strokeWidth="1.5"
        vectorEffect="non-scaling-stroke" />
      <circle className="ds-z-punto" cx="78" cy="96" r="1.1" fill={CIAN_ZENTRYA} />
    </svg>
  );
}

/** El símbolo de Zentrya dibujándose: el cuadro aparece y la Z se traza encima, con el punto al final. */
function SimboloQueSeDibuja({ tamano }) {
  const ruta = "M " + Z.map((p) => p.join(" ")).join(" L ");
  return (
    <svg aria-hidden focusable="false" width={tamano} height={tamano} viewBox="20 40 80 80"
      style={{ display: "block", overflow: "visible" }}>
      <rect x="20" y="40" width="80" height="80" rx="18" fill="var(--ds-ink)" />
      <path className="ds-z-traza" d={ruta} pathLength="100" fill="none" stroke="var(--ds-surface-solid)"
        strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" />
      <circle className="ds-z-onda" cx="78" cy="96" r="3" fill="none" stroke={CIAN_ZENTRYA} strokeWidth="1.5"
        vectorEffect="non-scaling-stroke" />
      <circle className="ds-z-punto" cx="78" cy="96" r="3" fill={CIAN_ZENTRYA} />
    </svg>
  );
}

/** Una tarjeta de vitrina. Ya no la pinta PantallaAcceso (v2.8); se exporta para no romper importaciones. */
export function TarjetaVitrina({ titulo, cifra, detalle, children, ancho = 260 }) {
  return (
    <Vidrio estilo={{ width: ancho, maxWidth: "100%", boxSizing: "border-box", padding: "var(--ds-4)",
      boxShadow: "0 18px 40px -18px rgba(0,0,0,0.45)" }}>
      {titulo && <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, letterSpacing: "0.04em",
        textTransform: "uppercase", opacity: 0.85 }}>{titulo}</div>}
      {cifra && <div className="ds-num" style={{ fontSize: "var(--ds-t-title)", fontWeight: 700,
        letterSpacing: "-0.02em", marginTop: 4 }}>{cifra}</div>}
      {detalle && <div style={{ fontSize: "var(--ds-t-small)", marginTop: 2 }}>{detalle}</div>}
      {children}
    </Vidrio>
  );
}

export default function PantallaAcceso({ marca, lema, titulo, nota, error, children, pie }) {
  const angosto = useAngosto();
  const zRef = useRef(null);
  const [golpe, setGolpe] = useState(0);

  /* Cada error nuevo sacude una vez. Se alterna entre dos animaciones iguales
     para reiniciarla sin desmontar el formulario (perdería el foco y lo escrito). */
  useEffect(() => { if (error) setGolpe((g) => g + 1); }, [error]);

  /* La Z de fondo va al revés del puntero, apenas: sólo con ratón y sin «reducir
     movimiento». Se escribe directo en el estilo: no re-renderiza nada. */
  const mover = (e) => {
    if (!zRef.current || e.pointerType !== "mouse") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5;
    zRef.current.style.transform = `translate3d(${(-x * 22).toFixed(1)}px, ${(-y * 16).toFixed(1)}px, 0)`;
  };

  return (
    <main onPointerMove={angosto ? undefined : mover}
      style={{
        position: "relative", isolation: "isolate", overflow: "hidden",
        minHeight: "100dvh", boxSizing: "border-box", display: "grid", gridTemplateRows: "auto 1fr auto",
        fontFamily: LETRA_SISTEMA, color: "var(--ds-ink)",
      }}>
      <style>{CSS}</style>

      {/* La Z grande, tenue, a la izquierda de la columna (termina 56 px antes de ella).
          Sólo donde cabe: en una pantalla angosta quedaría debajo del formulario. */}
      {!angosto && (
        <div ref={zRef} aria-hidden className="ds-z-capa" style={{
          position: "absolute", zIndex: -1, pointerEvents: "none",
          top: "16%", bottom: "9%", left: "-6%", right: "calc(50% + 256px)",
        }}>
          <GrabadoZ color="var(--ds-accent-trazo)" />
        </div>
      )}

      <header style={{ display: "flex", alignItems: "center", gap: 10,
        padding: angosto ? "18px 20px" : "24px 32px", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>
        {marca}
      </header>

      <div style={{ display: "grid", placeItems: angosto ? "start center" : "center",
        padding: angosto ? "12px 20px 32px" : "24px 32px 48px" }}>
        <div className="ds-acceso-columna" style={{
          width: "100%", maxWidth: 380, display: "grid", justifyItems: "center", textAlign: "center",
        }}>
          <SimboloQueSeDibuja tamano={angosto ? 56 : 64} />
          <h1 style={{ margin: angosto ? "22px 0 0" : "28px 0 0", fontSize: angosto ? 28 : 34, lineHeight: 1.12,
            fontWeight: 600, letterSpacing: "-0.015em", textWrap: "balance" }}>{titulo}</h1>
          {(nota || lema) && (
            <p style={{ margin: "10px 0 0", fontSize: 17, lineHeight: 1.45, color: "var(--ds-ink-2)",
              textWrap: "pretty", maxWidth: 360 }}>{nota || lema}</p>
          )}
          <div style={{
            width: "100%", marginTop: angosto ? 28 : 36, textAlign: "left",
            animation: golpe ? `${golpe % 2 ? "ds-sacude-a" : "ds-sacude-b"} 420ms var(--ds-ease-out)` : undefined,
          }}>
            {children}
          </div>
        </div>
      </div>

      {pie && (
        <footer style={{ padding: angosto ? "16px 20px 24px" : "20px 32px 28px", textAlign: "center",
          fontSize: 13, color: "var(--ds-ink-2)" }}>{pie}</footer>
      )}
    </main>
  );
}
