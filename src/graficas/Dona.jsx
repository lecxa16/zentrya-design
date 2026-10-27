/**
 * Dona — cómo se reparte un total.
 *
 * Sirve para UNA pregunta: «¿de qué está hecho este total?» (ventas por
 * canal, gasto por categoría, flota por estado). Para comparar cantidades
 * entre sí, una barra se lee mejor: el ojo compara largos, no ángulos.
 *
 *   · Seis rebanadas como mucho. Con más, las chicas son astillas que nadie
 *     distingue: se ordenan de mayor a menor y lo que pasa de cinco se junta
 *     en «Otros», en gris, porque «Otros» no es una categoría con identidad.
 *   · El total vive en el centro; al pasar sobre una rebanada, el centro dice
 *     esa rebanada. Así el número exacto está donde se mira.
 *   · La leyenda trae valor y porcentaje: la dona da la forma, la leyenda las
 *     cifras. Los valores negativos o en cero no caben en un reparto y se omiten.
 */
import React, { useState } from "react";
import { MarcoGrafica, Muestra, colorSerie, SinDatos, fmt } from "./base";
import { porcentaje } from "../formato";

const MAX = 6;

function sector(cx, cy, r0, r1, a0, a1) {
  const p = (r, a) => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
  const grande = a1 - a0 > Math.PI ? 1 : 0;
  const [x0, y0] = p(r1, a0); const [x1, y1] = p(r1, a1);
  const [x2, y2] = p(r0, a1); const [x3, y3] = p(r0, a0);
  return `M${x0},${y0} A${r1},${r1} 0 ${grande} 1 ${x1},${y1} L${x2},${y2} A${r0},${r0} 0 ${grande} 0 ${x3},${y3} Z`;
}

export default function Dona({
  datos = [], formato = "numero", totalEtiqueta = "Total", tamano = 200, grosor = 26,
  titulo, estilo,
}) {
  const [activo, setActivo] = useState(null);

  const positivos = datos
    .map((d, i) => ({ ...d, propio: d.color, color: d.color || colorSerie(null, i), valor: Number(d.valor) }))
    .filter((d) => Number.isFinite(d.valor) && d.valor > 0);
  let rebanadas = positivos;
  if (positivos.length > MAX) {
    const orden = [...positivos].sort((a, b) => b.valor - a.valor);
    const resto = orden.slice(MAX - 1);
    /* Con más de seis el lugar original ya no sirve de color (el séptimo
       repetiría el azul del primero): las cinco que quedan toman los cinco
       primeros tonos por tamaño, salvo que traigan el suyo. */
    rebanadas = [...orden.slice(0, MAX - 1).map((d, k) => ({ ...d, color: d.propio || colorSerie(null, k) })),
      { etiqueta: `Otros (${resto.length})`, valor: resto.reduce((s, d) => s + d.valor, 0),
        color: "var(--ds-ink-3)", otros: true }];
  }
  const total = rebanadas.reduce((s, d) => s + d.valor, 0);

  const cx = tamano / 2; const cy = tamano / 2;
  const r1 = tamano / 2 - 4; const r0 = r1 - grosor;
  /* Hueco de 2 px medido en el borde exterior, convertido a ángulo. */
  const hueco = rebanadas.length > 1 ? 2 / r1 : 0;
  let a = 0;
  const arcos = rebanadas.map((d) => {
    const ang = (d.valor / total) * Math.PI * 2;
    const arco = { a0: a + hueco / 2, a1: a + ang - hueco / 2 };
    a += ang;
    return arco;
  });

  const tabla = {
    columnas: ["", "Valor", "%"],
    filas: rebanadas.map((d) => [d.etiqueta, fmt(d.valor, formato), porcentaje(d.valor / total)]),
  };

  const centro = activo === null ? { t: totalEtiqueta, v: fmt(total, formato) }
    : { t: rebanadas[activo].etiqueta, v: fmt(rebanadas[activo].valor, formato) };

  return (
    <MarcoGrafica titulo={titulo} tabla={total > 0 ? tabla : null} estilo={estilo} alto={tamano}>
      {total <= 0 ? <SinDatos alto={tamano} /> : (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--ds-5)" }}>
          <div style={{ position: "relative", width: tamano, height: tamano, flexShrink: 0, margin: "0 auto" }}>
            <svg width={tamano} height={tamano} role="img" style={{ display: "block" }}
              aria-label={`${titulo ? `${titulo}: ` : ""}${rebanadas.map((d) => `${d.etiqueta} ${porcentaje(d.valor / total)}`).join(", ")}`}>
              {rebanadas.length === 1 ? (
                <path d={`${sector(cx, cy, r0, r1, 0, Math.PI)} ${sector(cx, cy, r0, r1, Math.PI, Math.PI * 2)}`}
                  fill={rebanadas[0].color} />
              ) : rebanadas.map((d, i) => (
                <path key={i} d={sector(cx, cy, activo === i ? r0 - 3 : r0, activo === i ? r1 + 2 : r1,
                  arcos[i].a0, arcos[i].a1)}
                  fill={d.color} opacity={activo === null || activo === i ? 1 : 0.4}
                  onMouseEnter={() => setActivo(i)} onMouseLeave={() => setActivo(null)}
                  style={{ transition: "opacity var(--ds-t-state) var(--ds-ease)", cursor: "default" }} />
              ))}
            </svg>
            <div style={{ position: "absolute", inset: grosor + 10, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", textAlign: "center", pointerEvents: "none" }}>
              <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, color: "var(--ds-ink-3)",
                textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1.2,
                overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%", whiteSpace: "nowrap" }}>
                {centro.t}
              </div>
              <div className="ds-num" style={{ fontSize: "var(--ds-num-m)", fontWeight: 700,
                letterSpacing: "-0.03em", color: "var(--ds-ink)", lineHeight: 1.1, marginTop: 2,
                maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {centro.v}
              </div>
              {activo !== null && (
                <div className="ds-num" style={{ fontSize: "var(--ds-t-small)", fontWeight: 600, color: "var(--ds-ink-2)" }}>
                  {porcentaje(rebanadas[activo].valor / total)}
                </div>
              )}
            </div>
          </div>
          {/* La leyenda es también el control de teclado: cada renglón se
              enfoca y resalta su rebanada. */}
          <div role="list" style={{ flex: "1 1 180px", minWidth: 0, display: "grid", gap: 2 }}>
            {rebanadas.map((d, i) => (
              <div role="listitem" key={i} tabIndex={0}
                onMouseEnter={() => setActivo(i)} onMouseLeave={() => setActivo(null)}
                onFocus={() => setActivo(i)} onBlur={() => setActivo(null)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 8px",
                  borderRadius: "var(--ds-r-item)", outlineOffset: 0,
                  background: activo === i ? "var(--ds-surface-sunk)" : "transparent",
                  transition: "background var(--ds-t-state) var(--ds-ease)" }}>
                <Muestra color={d.color} />
                <span style={{ flex: 1, minWidth: 0, fontSize: "var(--ds-t-small)", fontWeight: 600,
                  color: "var(--ds-ink-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  title={d.etiqueta}>
                  {d.etiqueta}
                </span>
                <span className="ds-num" style={{ fontSize: "var(--ds-t-small)", fontWeight: 700, color: "var(--ds-ink)" }}>
                  {fmt(d.valor, formato)}
                </span>
                <span className="ds-num" style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600,
                  color: "var(--ds-ink-3)", minWidth: 44, textAlign: "right" }}>
                  {porcentaje(d.valor / total)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </MarcoGrafica>
  );
}
