/**
 * PantallaAcceso — el login (y registro, recuperar contraseña…) de todos los
 * productos: «Vitrina», elegida por Carlos el 2026-10-23.
 *
 *   izquierda  el héroe de la paleta con una aurora, la marca, el lema y la
 *              `vitrina`: tarjetas de la app que entran flotando
 *   derecha    el formulario sobre vidrio, con entrada escalonada
 *
 * En el teléfono el héroe se vuelve una franja arriba (sin vitrina) y el
 * formulario queda al alcance del pulgar.
 *
 * Movimiento con propósito y accesible. Todo lo que se mueve solo TERMINA en
 * menos de 5 s (la aurora, 4.2 s; la vitrina, ~1.6 s) y después queda quieto:
 * una animación en bucle exigiría un botón de pausa (WCAG 2.2.2), y respetar
 * «reducir movimiento» no basta. La vitrina se inclina un poco con el puntero,
 * pero sólo mientras la persona lo mueve. `error` sacude el formulario una vez
 * cada que cambia, para que el fallo se sienta además de leerse.
 *
 * La vitrina es decorativa (`aria-hidden`): ilustra el producto, no informa.
 */
import React, { useEffect, useRef, useState } from "react";
import { useAngosto } from "./ancho";
import { Vidrio } from "./primitivas/Heroe";

const CSS = `
@keyframes ds-aurora {
  0%   { opacity: 0; transform: translate3d(-8%, 6%, 0) scale(0.9); }
  35%  { opacity: 1; }
  100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes ds-flota {
  from { opacity: 0; transform: translate3d(0, 28px, 0) rotate(-3deg) scale(0.96); }
  to   { opacity: 1; transform: none; }
}
@keyframes ds-sacude-a { 0%, 100% { translate: 0 0; } 20% { translate: -8px 0; } 40% { translate: 7px 0; } 60% { translate: -5px 0; } 80% { translate: 3px 0; } }
@keyframes ds-sacude-b { 0%, 100% { translate: 0 0; } 20% { translate: -8px 0; } 40% { translate: 7px 0; } 60% { translate: -5px 0; } 80% { translate: 3px 0; } }
.ds-acceso-aurora { position: absolute; border-radius: 50%; filter: blur(48px); pointer-events: none;
  animation: ds-aurora 4.2s var(--ds-ease) both; }
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
  const [golpe, setGolpe] = useState(0);

  /* Cada error nuevo sacude una vez. Se alterna entre dos animaciones iguales
     para reiniciarla sin desmontar el formulario (perdería el foco y lo escrito). */
  useEffect(() => { if (error) setGolpe((g) => g + 1); }, [error]);

  /* La vitrina sigue al puntero apenas (±4°), sólo con un ratón y sin «reducir
     movimiento». Se escribe directo en el estilo: no re-renderiza nada. */
  const inclinar = (e) => {
    const el = vitrinaRef.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(-y * 8).toFixed(2)}deg)`;
  };
  const soltar = () => { if (vitrinaRef.current) vitrinaRef.current.style.transform = "none"; };

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
        {/* La aurora: tres luces que se acomodan una sola vez y se quedan. Blancas y
            translúcidas, así sirven para cualquier paleta sin escribir colores. */}
        <span aria-hidden className="ds-acceso-aurora" style={{ width: "62%", height: "70%", top: "-18%", right: "-12%",
          background: "rgba(255,255,255,0.30)", zIndex: -1 }} />
        <span aria-hidden className="ds-acceso-aurora" style={{ width: "48%", height: "55%", bottom: "-20%", left: "-10%",
          background: "rgba(255,255,255,0.18)", zIndex: -1, animationDelay: "200ms" }} />
        <span aria-hidden className="ds-acceso-aurora" style={{ width: "30%", height: "34%", top: "38%", left: "42%",
          background: "rgba(255,255,255,0.12)", zIndex: -1, animationDelay: "400ms" }} />

        <div>
          <div style={{ fontSize: angosto ? "var(--ds-t-title)" : "var(--ds-t-display)", fontWeight: 800,
            letterSpacing: "-0.03em", lineHeight: 1.02 }}>{marca}</div>
          {lema && <p style={{ margin: "var(--ds-3) 0 0", fontSize: "var(--ds-t-body)", maxWidth: 440 }}>{lema}</p>}
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
