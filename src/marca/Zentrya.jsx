/**
 * El símbolo de Zentrya: el del lockup oficial (D), un cuadro redondeado con la Z
 * y el punto cian. Originales en `marca/originales/` (Carlos, 2026-10-23).
 *
 * Es un componente y no un archivo porque así sigue al tema sin dos versiones:
 * el cuadro es la tinta y la Z la superficie —en claro, cuadro negro y Z clara
 * (como el original); en oscuro, al revés (como su versión «dark»), sin el
 * rectángulo de fondo que traían esos archivos—. El punto cian es de la marca y
 * no cambia. Es decorativo: el nombre del producto va al lado, en texto.
 */
import React from "react";

export const CIAN_ZENTRYA = "#00E5FF";

export function SimboloZentrya({ tamano = 28 }) {
  return (
    <svg width={tamano} height={tamano} viewBox="20 40 80 80" aria-hidden focusable="false" style={{ display: "block", flexShrink: 0 }}>
      <rect x="20" y="40" width="80" height="80" rx="16" fill="var(--ds-ink)" />
      <path d="M 42 68 L 78 68 L 42 96 L 78 96" fill="none" stroke="var(--ds-surface-solid)" strokeWidth="5" strokeLinecap="square" />
      <circle cx="78" cy="96" r="3" fill={CIAN_ZENTRYA} />
    </svg>
  );
}
