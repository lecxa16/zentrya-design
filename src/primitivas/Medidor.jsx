/**
 * Medidor — lo consumido contra lo disponible, en una línea.
 *
 * `Anillo` cuando el progreso ES la información; `Medidor` cuando acompaña a
 * una cifra que ya la dice. Una barra sin número al lado no informa de nada:
 * por eso el componente no dibuja el número, lo exige arriba.
 */
import React from "react";

const TONOS = {
  acento: "var(--ds-accent)",
  ok:     "var(--ds-ok)",
  aviso:  "var(--ds-warn)",
  riesgo: "var(--ds-risk)",
};

export default function Medidor({
  valor = 0, total = 100, tono = "acento", alto = 6, etiqueta, estilo,
}) {
  const pct = total > 0 ? Math.max(0, Math.min(100, (valor / total) * 100)) : 0;
  return (
    <div role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0}
      aria-valuemax={100} aria-label={etiqueta}
      style={{ height: alto, borderRadius: 99, overflow: "hidden",
        background: "var(--ds-surface-sunk)", ...estilo }}>
      <div style={{
        height: "100%", width: `${pct}%`, borderRadius: 99,
        background: TONOS[tono] || TONOS.acento,
        transition: "width var(--ds-t-move) var(--ds-ease)",
      }} />
    </div>
  );
}
