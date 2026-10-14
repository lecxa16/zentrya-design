/**
 * Superficie — la tarjeta del sistema.
 *
 * Tres niveles de presencia, no una escala de sombras infinita:
 *   plana      el contenido descansa sobre el lienzo
 *   elevada    la tarjeta normal del bento
 *   flotante   lo que se despega: menús, cosas arrastrables
 *
 * `interactiva` sólo se enciende cuando la tarjeta ENTERA es un destino;
 * una tarjeta que se levanta al pasar el cursor pero no lleva a ningún lado
 * es una promesa falsa.
 */
import React from "react";

const NIVEL = { plana: "var(--ds-lift-1)", elevada: "var(--ds-lift-2)", flotante: "var(--ds-lift-3)" };

export default function Superficie({
  children, nivel = "elevada", interactiva = false, hundida = false, solida = false,
  radio = "var(--ds-r-card)", relleno = "var(--ds-5)", estilo, entrada, ...resto
}) {
  return (
    <div
      {...resto}
      style={{
        background: solida ? "var(--ds-surface-solid)"
                  : hundida ? "var(--ds-surface-sunk)" : "var(--ds-surface)",
        backdropFilter: solida ? undefined : "var(--ds-blur)",
        WebkitBackdropFilter: solida ? undefined : "var(--ds-blur)",
        border: "1px solid var(--ds-line)",
        borderRadius: radio,
        padding: relleno,
        boxShadow: hundida ? "none" : NIVEL[nivel],
        transition: `transform var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease)`,
        cursor: interactiva ? "pointer" : undefined,
        ...(entrada !== undefined
          ? { animation: `ds-rise var(--ds-t-move) var(--ds-ease) both`,
              animationDelay: `${Math.min(entrada * 55, 240)}ms` }
          : null),
        ...estilo,
      }}
      onMouseEnter={interactiva ? (e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "var(--ds-lift-3)";
      } : undefined}
      onMouseLeave={interactiva ? (e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = NIVEL[nivel];
      } : undefined}
    >
      {children}
    </div>
  );
}
