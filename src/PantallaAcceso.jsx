/**
 * PantallaAcceso — el login (y registro, recuperar contraseña…) de todos los
 * productos: «Vitrina», elegida por Carlos el 2026-10-23.
 *
 *   izquierda  el héroe de la paleta con la Z de Zentrya en grande, la marca,
 *              el lema y, si la app la trae, la `vitrina`: tarjetas que entran
 *              flotando
 *   derecha    el formulario sobre vidrio, con entrada escalonada
 *
 * En el teléfono el héroe se vuelve una franja arriba (sin vitrina, con la Z
 * chica junto a la marca) y el formulario queda al alcance del pulgar.
 *
 * La Z (v2.7, Carlos 2026-10-26: «se ve muy de IA genérico»): sustituye a la
 * aurora. Es la geometría exacta del símbolo, monumental y grabada en siete
 * líneas finas que llenan su grueso: una luz recorre la central dibujándola,
 * las demás la siguen y al llegar al final aparece el punto cian con una sola
 * onda. Sigue a cualquier paleta: el trazo es
 * `--ds-ink-on-hero`; el cian es de la marca y no cambia.
 *
 * Movimiento con propósito y accesible. Todo lo que se mueve solo TERMINA en
 * menos de 5 s (la Z, ~2.3 s; la vitrina, ~1.6 s) y después queda quieto:
 * una animación en bucle exigiría un botón de pausa (WCAG 2.2.2), y respetar
 * «reducir movimiento» no basta. La vitrina se inclina un poco con el puntero,
 * y la Z se desplaza unos pixeles (profundidad), sólo mientras la persona lo
 * mueve. `error` sacude el formulario una vez
 * cada que cambia, para que el fallo se sienta además de leerse.
 *
 * La vitrina es decorativa (`aria-hidden`): ilustra el producto, no informa.
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
@media (prefers-reduced-motion: reduce) {
  /* La regla global ya las lleva a su final; sin retraso, la Z aparece dibujada de una vez. */
  .ds-z-traza, .ds-z-luz, .ds-z-punto, .ds-z-onda { animation-delay: 0ms !important; }
}
@keyframes ds-flota {
  from { opacity: 0; transform: translate3d(0, 28px, 0) rotate(-3deg) scale(0.96); }
  to   { opacity: 1; transform: none; }
}
@keyframes ds-sacude-a { 0%, 100% { translate: 0 0; } 20% { translate: -8px 0; } 40% { translate: 7px 0; } 60% { translate: -5px 0; } 80% { translate: 3px 0; } }
@keyframes ds-sacude-b { 0%, 100% { translate: 0 0; } 20% { translate: -8px 0; } 40% { translate: 7px 0; } 60% { translate: -5px 0; } 80% { translate: 3px 0; } }
.ds-acceso-vitrina > * { animation: ds-flota var(--ds-t-scene) var(--ds-ease) both; }
.ds-acceso-vitrina > *:nth-child(1) { animation-delay: 360ms; }
.ds-acceso-vitrina > *:nth-child(2) { animation-delay: 520ms; margin-left: 18%; }
.ds-acceso-vitrina > *:nth-child(3) { animation-delay: 680ms; margin-left: 6%; }
.ds-acceso-vitrina > *:nth-child(4) { animation-delay: 840ms; margin-left: 24%; }
.ds-acceso-form > * { animation: ds-rise var(--ds-t-scene) var(--ds-ease) both; }
.ds-acceso-form > *:nth-child(1) { animation-delay: 80ms; }
.ds-acceso-form > *:nth-child(2) { animation-delay: 140ms; }
.ds-acceso-form > *:nth-child(3) { animation-delay: 200ms; }
.ds-acceso-form > *:nth-child(n+4) { animation-delay: 260ms; }
`;

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

/** La Z grande del héroe: líneas finas, una luz por la central y el punto. Los gruesos van en unidades del
    dibujo y no con `non-scaling-stroke`: con él, Chrome mide los guiones en pixeles y el trazo se rompía. */
function GrabadoZ() {
  return (
    <svg aria-hidden focusable="false" viewBox={VISTA_Z} preserveAspectRatio="xMaxYMax meet"
      style={{ display: "block", width: "100%", height: "100%", overflow: "visible" }}>
      {LINEAS_Z.map(({ d, ruta }) => (
        <path key={d} className="ds-z-traza" d={ruta} pathLength="100" fill="none" stroke="var(--ds-ink-on-hero)"
          strokeOpacity={d === 0 ? 0.55 : 0.3} strokeWidth="0.08" strokeLinejoin="miter" style={{ animationDelay: `${250 + Math.abs(d) * 80}ms` }} />
      ))}
      <path className="ds-z-luz" d={LINEAS_Z[3].ruta} pathLength="100" fill="none" stroke="var(--ds-ink-on-hero)"
        strokeWidth="0.2" strokeLinecap="round" />
      <circle className="ds-z-onda" cx="78" cy="96" r="1.1" fill="none" stroke={CIAN_ZENTRYA} strokeWidth="1.5"
        vectorEffect="non-scaling-stroke" />
      <circle className="ds-z-punto" cx="78" cy="96" r="1.1" fill={CIAN_ZENTRYA} />
    </svg>
  );
}

/** La Z chica del teléfono: el símbolo tal cual (trazo sólido), dibujándose igual. */
function TrazoZ({ estilo }) {
  const ruta = "M " + Z.map((p) => p.join(" ")).join(" L ");
  return (
    <svg aria-hidden focusable="false" viewBox={VISTA_Z} style={{ display: "block", overflow: "visible", ...estilo }}>
      <path className="ds-z-traza" d={ruta} pathLength="100" fill="none" stroke="var(--ds-ink-on-hero)"
        strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" />
      <circle className="ds-z-onda" cx="78" cy="96" r="3" fill="none" stroke={CIAN_ZENTRYA} strokeWidth="1.2"
        vectorEffect="non-scaling-stroke" />
      <circle className="ds-z-punto" cx="78" cy="96" r="3" fill={CIAN_ZENTRYA} />
    </svg>
  );
}

/** Una tarjeta de la vitrina: vidrio sobre el héroe, con un dato de ejemplo. */
export function TarjetaVitrina({ titulo, cifra, detalle, children, ancho = 260 }) {
  return (
    <Vidrio estilo={{ width: ancho, maxWidth: "100%", boxSizing: "border-box", padding: "var(--ds-4)",
      boxShadow: "0 18px 40px -18px rgba(0,0,0,0.45)" }}>
      {titulo && <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 700, letterSpacing: "0.04em",
        textTransform: "uppercase", opacity: 0.85 }}>{titulo}</div>}
      {cifra && <div className="ds-num" style={{ fontSize: "var(--ds-t-title)", fontWeight: 800,
        letterSpacing: "-0.02em", marginTop: 4 }}>{cifra}</div>}
      {detalle && <div style={{ fontSize: "var(--ds-t-small)", marginTop: 2 }}>{detalle}</div>}
      {children}
    </Vidrio>
  );
}

export default function PantallaAcceso({ marca, lema, vitrina, titulo, nota, error, children, pie }) {
  const angosto = useAngosto();
  const vitrinaRef = useRef(null);
  const zRef = useRef(null);
  const [golpe, setGolpe] = useState(0);

  /* Cada error nuevo sacude una vez. Se alterna entre dos animaciones iguales
     para reiniciarla sin desmontar el formulario (perdería el foco y lo escrito). */
  useEffect(() => { if (error) setGolpe((g) => g + 1); }, [error]);

  /* La vitrina sigue al puntero apenas (±4°), sólo con un ratón y sin «reducir
     movimiento». Se escribe directo en el estilo: no re-renderiza nada. */
  const inclinar = (e) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const el = vitrinaRef.current;
    if (el) el.style.transform = `perspective(900px) rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(-y * 8).toFixed(2)}deg)`;
    /* La Z va al revés del puntero: queda «detrás» de la vitrina y del texto. */
    if (zRef.current) zRef.current.style.transform = `translate3d(${(-x * 18).toFixed(1)}px, ${(-y * 14).toFixed(1)}px, 0)`;
  };
  const soltar = () => {
    if (vitrinaRef.current) vitrinaRef.current.style.transform = "none";
    if (zRef.current) zRef.current.style.transform = "none";
  };

  return (
    <main style={{
      minHeight: "100dvh", boxSizing: "border-box", display: "grid",
      gridTemplateColumns: angosto ? "1fr" : "minmax(0, 1.15fr) minmax(380px, 0.85fr)",
      gridTemplateRows: angosto ? "auto 1fr" : "1fr",
      gap: angosto ? "var(--ds-4)" : "var(--ds-6)", padding: angosto ? "var(--ds-3)" : "var(--ds-4)",
    }}>
      <style>{CSS}</style>

      <section className="ds-heroe" onPointerMove={angosto ? undefined : inclinar}
        onPointerLeave={angosto ? undefined : soltar}
        style={{
          position: "relative", overflow: "hidden", isolation: "isolate",
          background: "var(--ds-hero)", color: "var(--ds-ink-on-hero)",
          borderRadius: "var(--ds-r-frame)", boxShadow: "var(--ds-lift-accent), var(--ds-lift-2)",
          padding: angosto ? "var(--ds-5)" : "var(--ds-10) var(--ds-8)",
          display: "flex", flexDirection: "column", gap: "var(--ds-6)",
          animation: "ds-rise var(--ds-t-scene) var(--ds-ease) both",
        }}>
        {/* La Z grande, debajo del texto: anclada abajo a la derecha, y si el héroe es
            angosto sale por la izquierda (el punto, que es el final, siempre se ve). */}
        {!angosto && (
          <div ref={zRef} aria-hidden className="ds-z-capa"
            style={{ position: "absolute", inset: "34% 8% 8% -24%", zIndex: -1, pointerEvents: "none" }}>
            <GrabadoZ />
          </div>
        )}

        <div style={angosto ? { display: "flex", alignItems: "flex-start", gap: "var(--ds-4)" } : undefined}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: angosto ? "var(--ds-t-title)" : "var(--ds-t-display)", fontWeight: 800,
              letterSpacing: "-0.03em", lineHeight: 1.02 }}>{marca}</div>
            {lema && <p style={{ margin: "var(--ds-3) 0 0", fontSize: "var(--ds-t-body)", maxWidth: 440 }}>{lema}</p>}
          </div>
          {angosto && <TrazoZ estilo={{ width: 46, height: 37, flexShrink: 0, marginTop: 4 }} />}
        </div>

        {vitrina && !angosto && (
          <div ref={vitrinaRef} aria-hidden className="ds-acceso-vitrina"
            style={{ display: "flex", flexDirection: "column", gap: "var(--ds-4)", marginTop: "auto",
              transition: "transform var(--ds-t-move) var(--ds-ease)", transformOrigin: "center" }}>
            {vitrina}
          </div>
        )}
      </section>

      {/* En el teléfono va pegado a la franja: centrado dejaba un hueco y empujaba el botón lejos del pulgar. */}
      <div style={{ display: "grid", alignItems: angosto ? "start" : "center", justifyItems: "center",
        padding: angosto ? "var(--ds-2) 0 0" : "var(--ds-4)" }}>
        <div className="ds-acceso-form" style={{
          width: "100%", maxWidth: 420, display: "grid", gap: "var(--ds-5)",
          animation: golpe ? `${golpe % 2 ? "ds-sacude-a" : "ds-sacude-b"} 420ms var(--ds-ease-out)` : undefined,
        }}>
          <header>
            <h1 style={{ margin: 0, fontSize: "var(--ds-t-title)", fontWeight: 800, letterSpacing: "-0.02em" }}>{titulo}</h1>
            {nota && <p style={{ margin: "var(--ds-2) 0 0", fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)" }}>{nota}</p>}
          </header>
          <div style={{
            background: "var(--ds-surface)", border: "1px solid var(--ds-line)",
            backdropFilter: "var(--ds-blur)", WebkitBackdropFilter: "var(--ds-blur)",
            borderRadius: "var(--ds-r-card)", boxShadow: "var(--ds-lift-2)", padding: "var(--ds-6)",
          }}>
            {children}
          </div>
          {pie && <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", textAlign: "center" }}>{pie}</div>}
        </div>
      </div>
    </main>
  );
}
