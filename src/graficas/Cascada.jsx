/**
 * Cascada — de dónde sale una cifra final.
 *
 * Ventas − costo de lo vendido − gastos − intereses = utilidad. Inventario
 * inicial + compras − salidas − merma = inventario final. Una tabla da el
 * resultado; la cascada enseña QUÉ paso se comió más, que es la pregunta de
 * quien la abre.
 *
 *   · Cada paso flota donde terminó el anterior; un conector punteado los une
 *     para que el ojo siga el acumulado.
 *   · Lo que suma va en verde, lo que resta en rojo y los subtotales
 *     (`tipo: "total"`) en el primer tono de serie: son de otra naturaleza,
 *     no «otro paso». El color aquí sí es estado (a favor / en contra), y el
 *     signo de la etiqueta lo repite para quien no distingue colores.
 *   · Un total sin `valor` toma el acumulado; con `valor`, manda el que se da
 *     (el cierre contable que hay que cuadrar), y se pinta donde dice.
 */
import React, { useState } from "react";
import {
  MarcoGrafica, Globo, useMedida, marcasBonitas, escala, TEXTO_EJE, SinDatos, fmt,
} from "./base";

const ANCHO_CARACTER = 6.6;
const R = 4;

export default function Cascada({
  pasos = [], alto = 260, formato = "numero", etiquetas = true, titulo, estilo,
}) {
  const [ref, ancho] = useMedida();
  const [activo, setActivo] = useState(null);

  let acumulado = 0;
  const barras = pasos.map((p) => {
    const v = Number(p.valor);
    if (p.tipo === "total") {
      const fin = Number.isFinite(v) && p.valor !== null && p.valor !== undefined ? v : acumulado;
      acumulado = fin;
      return { ...p, desde: 0, hasta: fin, delta: fin, total: true };
    }
    const d = Number.isFinite(v) ? v : 0;
    const desde = acumulado;
    acumulado += d;
    return { ...p, desde, hasta: acumulado, delta: d, total: false };
  });

  const hayDatos = barras.length > 0;
  const extremos = barras.flatMap((b) => [b.desde, b.hasta]);
  const { marcas, min, max } = marcasBonitas(Math.min(0, ...extremos), Math.max(0, ...extremos), 4);
  const formatoEje = formato === "moneda" ? "monedaCompacta" : formato === "numero" ? "compacto" : formato;

  const izq = Math.max(...marcas.map((m) => String(fmt(m, formatoEje)).length)) * ANCHO_CARACTER + 12;
  const arriba = etiquetas ? 20 : 8;
  const abajo = 24;
  const anchoPlot = Math.max(10, ancho - izq - 6);
  const altoPlot = alto - arriba - abajo;
  const banda = anchoPlot / Math.max(1, barras.length);
  const grueso = banda * 0.62;
  const y = escala(min, max, arriba + altoPlot, arriba);

  const color = (b) => (b.total ? "var(--ds-serie-1)" : b.delta >= 0 ? "var(--ds-ok)" : "var(--ds-risk)");
  const texto = (b, f = formato) => (b.total ? fmt(b.hasta, f) : `${b.delta > 0 ? "+" : ""}${fmt(b.delta, f)}`);
  const recortar = (t, w) => {
    const c = Math.max(3, Math.floor(w / ANCHO_CARACTER));
    return t.length > c ? `${t.slice(0, c - 1)}…` : t;
  };

  const tabla = {
    columnas: ["Paso", "Movimiento", "Acumulado"],
    filas: barras.map((b) => [b.etiqueta, b.total ? "—" : texto(b), fmt(b.hasta, formato)]),
  };

  return (
    <MarcoGrafica titulo={titulo} tabla={hayDatos ? tabla : null} estilo={estilo} alto={alto}>
      <div ref={ref} style={{ position: "relative", minWidth: 0 }}>
        {!hayDatos ? <SinDatos alto={alto} /> : ancho > 0 && (
          <svg width={ancho} height={alto} role="img" style={{ display: "block", overflow: "visible" }}
            aria-label={`${titulo ? `${titulo}: ` : ""}${barras.length} pasos, resultado ${fmt(acumulado, formato)}`}>
            {marcas.map((m) => (
              <g key={m}>
                <line x1={izq} x2={izq + anchoPlot} y1={y(m)} y2={y(m)}
                  stroke={m === 0 ? "var(--ds-eje)" : "var(--ds-grid)"} />
                <text x={izq - 8} y={y(m)} dy="0.32em" textAnchor="end" style={TEXTO_EJE}>{fmt(m, formatoEje)}</text>
              </g>
            ))}
            {barras.map((b, i) => {
              const x0 = izq + i * banda + (banda - grueso) / 2;
              const yA = y(Math.max(b.desde, b.hasta));
              const yB = y(Math.min(b.desde, b.hasta));
              const h = Math.max(1, yB - yA);
              const sube = b.hasta >= b.desde;
              const r = Math.min(R, grueso / 2, h / 2);
              /* El extremo redondeado es el lado hacia donde se movió el acumulado. */
              const d = sube
                ? `M${x0},${yA + h} L${x0},${yA + r} Q${x0},${yA} ${x0 + r},${yA} L${x0 + grueso - r},${yA} Q${x0 + grueso},${yA} ${x0 + grueso},${yA + r} L${x0 + grueso},${yA + h} Z`
                : `M${x0},${yA} L${x0 + grueso},${yA} L${x0 + grueso},${yA + h - r} Q${x0 + grueso},${yA + h} ${x0 + grueso - r},${yA + h} L${x0 + r},${yA + h} Q${x0},${yA + h} ${x0},${yA + h - r} Z`;
              const siguiente = barras[i + 1];
              return (
                <g key={i} tabIndex={0} style={{ outline: "none" }}
                  aria-label={`${b.etiqueta}: ${texto(b)}, acumulado ${fmt(b.hasta, formato)}`}
                  onMouseEnter={() => setActivo(i)} onMouseLeave={() => setActivo(null)}
                  onFocus={() => setActivo(i)} onBlur={() => setActivo(null)}>
                  <rect x={izq + i * banda} y={arriba} width={banda} height={altoPlot}
                    fill={activo === i ? "var(--ds-surface-sunk)" : "transparent"} />
                  <path d={d} fill={color(b)} />
                  {siguiente && (
                    <line x1={x0 + grueso} x2={izq + (i + 1) * banda + (banda - grueso) / 2}
                      y1={y(b.hasta)} y2={y(b.hasta)} stroke="var(--ds-eje)" strokeDasharray="3 3" />
                  )}
                  {etiquetas && banda >= 40 && (
                    <text x={x0 + grueso / 2} y={yA - 6} textAnchor="middle"
                      style={{ ...TEXTO_EJE, fill: "var(--ds-ink)", fontWeight: 700 }}>
                      {/* Sobre la barra va la cifra compacta: la completa, con
                          centavos, se amontona entre barras vecinas y ya está
                          en el globo y en la tabla. */}
                      {texto(b, formatoEje)}
                    </text>
                  )}
                  <text x={izq + i * banda + banda / 2} y={alto - 6} textAnchor="middle"
                    style={{ ...TEXTO_EJE, fontWeight: b.total ? 800 : 600, fill: b.total ? "var(--ds-ink-2)" : "var(--ds-ink-3)" }}>
                    <title>{b.etiqueta}</title>
                    {recortar(String(b.etiqueta ?? ""), banda - 4)}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
        <Globo visible={activo !== null} ancho={ancho}
          x={activo === null ? 0 : izq + activo * banda + banda / 2}
          y={activo === null ? 0 : y(Math.max(barras[activo].desde, barras[activo].hasta))}
          titulo={activo === null ? "" : barras[activo].etiqueta}
          renglones={activo === null ? [] : [
            ...(barras[activo].total ? [] : [{ color: color(barras[activo]), nombre: "Movimiento", valor: texto(barras[activo]) }]),
            { nombre: barras[activo].total ? "Total" : "Acumulado", valor: fmt(barras[activo].hasta, formato) },
          ]} />
      </div>
    </MarcoGrafica>
  );
}
