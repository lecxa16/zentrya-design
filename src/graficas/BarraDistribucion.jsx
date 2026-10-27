/**
 * BarraDistribucion — un total partido en tramos, en un solo renglón.
 *
 * Antigüedad de cartera (0–30, 31–60, 61–90, +90 días), pedidos por estado,
 * inventario por rotación. Cabe en una tarjeta donde una dona no cabría y se
 * apila con otras para comparar repartos entre clientes o almacenes.
 *
 *   · Cada tramo puede traer `tono` (ok/aviso/riesgo/neutro) cuando el tramo
 *     ES un estado —la cartera a +90 días es riesgo—, o `color` propio. Sin
 *     ninguno toma el color de serie de su lugar.
 *   · La leyenda de abajo lleva valor y porcentaje: el color nunca es la
 *     única forma de saber qué tramo es cuál.
 *   · Un tramo chico no desaparece: conserva un mínimo visible para que se
 *     sepa que existe, y el número exacto está en la leyenda.
 */
import React, { useState } from "react";
import { MarcoGrafica, Globo, Muestra, useMedida, colorSerie, SinDatos, fmt } from "./base";
import { porcentaje } from "../formato";

const TONOS = {
  ok: "var(--ds-ok)", aviso: "var(--ds-warn)", riesgo: "var(--ds-risk)", neutro: "var(--ds-ink-3)",
  acento: "var(--ds-accent-trazo)",
};

export default function BarraDistribucion({
  segmentos = [], formato = "numero", alto = 14, leyenda = true, titulo, estilo,
}) {
  const [ref, ancho] = useMedida();
  const [activo, setActivo] = useState(null);
  const lista = segmentos
    .map((s, i) => ({ ...s, valor: Number(s.valor), color: s.color || TONOS[s.tono] || colorSerie(null, i) }))
    .filter((s) => Number.isFinite(s.valor) && s.valor > 0);
  const total = lista.reduce((t, s) => t + s.valor, 0);

  /* Centro de cada tramo, para colocar el globo encima. */
  let acum = 0;
  const centros = lista.map((s) => {
    const c = acum + s.valor / 2;
    acum += s.valor;
    return total ? (c / total) * ancho : 0;
  });

  const tabla = {
    columnas: ["", "Valor", "%"],
    filas: lista.map((s) => [s.etiqueta, fmt(s.valor, formato), porcentaje(s.valor / total)]),
  };

  return (
    <MarcoGrafica titulo={titulo} tabla={total > 0 ? tabla : null} estilo={estilo}>
      <div ref={ref} style={{ position: "relative", minWidth: 0 }}>
      {total <= 0 ? <SinDatos alto={60} /> : (
        <>
          <div role="list" style={{ display: "flex", gap: 2, height: alto, borderRadius: "var(--ds-r-pill)",
            overflow: "hidden" }}>
            {lista.map((s, i) => (
              <div role="listitem" key={i} tabIndex={0}
                aria-label={`${s.etiqueta}: ${fmt(s.valor, formato)}, ${porcentaje(s.valor / total)}`}
                onMouseEnter={() => setActivo(i)} onMouseLeave={() => setActivo(null)}
                onFocus={() => setActivo(i)} onBlur={() => setActivo(null)}
                style={{ flex: `${s.valor} 1 0`, minWidth: 4, background: s.color,
                  opacity: activo === null || activo === i ? 1 : 0.45, outlineOffset: -2,
                  transition: "opacity var(--ds-t-state) var(--ds-ease)" }} />
            ))}
          </div>
          <Globo visible={activo !== null} ancho={ancho} x={activo === null ? 0 : centros[activo]} y={alto + 6}
            titulo={activo === null ? "" : lista[activo].etiqueta}
            renglones={activo === null ? [] : [
              { color: lista[activo].color, nombre: "Valor", valor: fmt(lista[activo].valor, formato) },
              { nombre: "Del total", valor: porcentaje(lista[activo].valor / total) },
            ]} />
          {leyenda && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "8px 16px", marginTop: "var(--ds-4)" }}>
              {lista.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, minWidth: 0 }}>
                  <span style={{ marginTop: 4 }}><Muestra color={s.color} /></span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, color: "var(--ds-ink-3)",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={s.etiqueta}>
                      {s.etiqueta}
                    </div>
                    <div className="ds-num" style={{ fontSize: "var(--ds-t-small)", fontWeight: 700, color: "var(--ds-ink)" }}>
                      {fmt(s.valor, formato)}
                      <span style={{ fontWeight: 600, color: "var(--ds-ink-3)", marginLeft: 6, fontSize: "var(--ds-t-micro)" }}>
                        {porcentaje(s.valor / total)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      </div>
    </MarcoGrafica>
  );
}
