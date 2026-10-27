/**
 * Botón — cuatro variantes, y ninguna más.
 *
 *   solido    la acción principal de la pantalla. Una sola por vista.
 *   contorno  acciones secundarias
 *   fantasma  acciones terciarias o dentro de una fila
 *   claro     sobre el héroe, donde el sólido se pierde contra el gradiente
 *
 * Esperando (`esperando`): el texto se queda —para que el ancho no salte— y
 * un círculo girando toma el lugar del ícono. El botón no se ve apagado: un
 * botón gris parece roto o deshabilitado, uno que gira dice «estoy en ello»
 * (Carlos, 2026-10-13). Con `prefers-reduced-motion` el círculo late en vez
 * de girar.
 */
import React from "react";

const BASE = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
  fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-body)", fontWeight: 600,
  letterSpacing: "-0.005em", borderWidth: 1, borderStyle: "solid", borderColor: "transparent",
  borderRadius: "var(--ds-r-item)", padding: "10px 18px", cursor: "pointer",
  transition: "transform var(--ds-t-tap) var(--ds-ease), background var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease)",
};

const VARIANTES = {
  solido: {
    background: "var(--ds-accent)", color: "var(--ds-ink-on-accent)",
    boxShadow: "var(--ds-lift-accent)",
  },
  contorno: {
    background: "var(--ds-surface)", color: "var(--ds-ink)",
    borderColor: "var(--ds-line-firm)", boxShadow: "var(--ds-lift-1)",
  },
  fantasma: { background: "transparent", color: "var(--ds-ink-2)" },
  /* Para lo que no se deshace (borrar la cuenta). La tinta es la superficie sólida:
     blanco sobre el rojo claro (5.0:1) y casi negro sobre el rojo del tema oscuro. */
  peligro: { background: "var(--ds-risk)", color: "var(--ds-surface-solid)" },
  claro: {
    background: "var(--ds-velo)", color: "var(--ds-ink-on-hero)",
    borderColor: "var(--ds-line-glass)",
    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
  },
};

const CSS_GIRO = `
@keyframes ds-boton-gira { to { transform: rotate(360deg); } }
@keyframes ds-boton-late { 50% { opacity: .35; } }
.ds-boton-giro { width: 15px; height: 15px; flex-shrink: 0; border-radius: 50%;
  border: 2px solid currentColor; border-right-color: transparent;
  animation: ds-boton-gira .7s linear infinite; }
@media (prefers-reduced-motion: reduce) { .ds-boton-giro { animation: ds-boton-late 1.2s ease-in-out infinite; } }
`;

/** El círculo de espera, del color del texto del botón. */
export function Giro({ estilo }) {
  return (
    <>
      <style>{CSS_GIRO}</style>
      <span className="ds-boton-giro" aria-hidden style={estilo} />
    </>
  );
}

export default function Boton({
  children, variante = "contorno", icono, esperando = false, disabled,
  pleno = false, estilo, ...resto
}) {
  const inactivo = disabled || esperando;
  return (
    <button
      {...resto}
      disabled={inactivo}
      aria-busy={esperando || undefined}
      style={{
        ...BASE, ...VARIANTES[variante],
        width: pleno ? "100%" : undefined,
        opacity: esperando ? 0.88 : disabled ? 0.55 : 1,
        cursor: esperando ? "progress" : disabled ? "not-allowed" : "pointer",
        ...estilo,
      }}
      onMouseDown={(e) => { if (!inactivo) e.currentTarget.style.transform = "scale(0.98)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "none"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
    >
      {esperando ? <Giro /> : icono}
      {children}
    </button>
  );
}
