/**
 * Anillo — progreso circular, con el dato adentro.
 *
 * Se usa cuando el avance ES la información principal de la tarjeta. Para un
 * avance secundario está la Barra: un anillo cuesta mucho espacio y sólo se
 * gana si el número del centro es lo que la persona vino a ver.
 *
 * Se dibuja una vez al entrar; con movimiento reducido aparece completo.
 */
import React from "react";

export default function Anillo({
  valor = 0, tamano = 132, grosor = 10, tono = "var(--ds-accent-trazo)",
  pista = "var(--ds-surface-sunk)", children, animar = true,
}) {
  const pct = Math.max(0, Math.min(100, valor));
  const r = (tamano - grosor) / 2;
  const vuelta = 2 * Math.PI * r;
  const resto = vuelta * (1 - pct / 100);

  return (
    <div style={{ position: "relative", width: tamano, height: tamano, flexShrink: 0 }}>
      <svg width={tamano} height={tamano} style={{ transform: "rotate(-90deg)" }} aria-hidden>
        <circle cx={tamano / 2} cy={tamano / 2} r={r} fill="none" stroke={pista} strokeWidth={grosor} />
        <circle
          cx={tamano / 2} cy={tamano / 2} r={r} fill="none"
          stroke={tono} strokeWidth={grosor} strokeLinecap="round"
          strokeDasharray={vuelta} strokeDashoffset={resto}
          style={animar ? {
            "--ds-dash": vuelta,
            animation: `ds-sweep var(--ds-t-scene) var(--ds-ease) 120ms both`,
          } : undefined}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 1,
      }}>
        {children}
      </div>
    </div>
  );
}
