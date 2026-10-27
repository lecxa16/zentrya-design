/**
 * GraficaBarras — comparar cantidades entre categorías.
 *
 * Es la gráfica de «¿quién vende más?», «¿en qué se fue el gasto?», «¿qué
 * ruta cuesta más?». Una barra se compara por su largo, y el largo sólo dice
 * la verdad si arranca en cero: por eso la base es siempre 0 y los negativos
 * bajan de ella en vez de mover el origen.
 *
 *   · Vertical para pocas categorías ordenadas (meses, trimestres).
 *   · `horizontal` para rankings: los nombres largos (clientes, productos,
 *     rutas) se leen de corrido a la izquierda en vez de girarse.
 *   · Varias series van `agrupadas` (comparar series dentro de una categoría)
 *     o `apiladas` (partes que suman un total).
 *
 * Sólo el extremo del dato se redondea; la base queda recta y pegada al eje,
 * para que la barra se lea como medida y no como píldora flotante. Entre
 * barras y segmentos queda un hueco de 2 px del color de la superficie.
 */
import React, { useState } from "react";
import {
  MarcoGrafica, Globo, useMedida, marcasBonitas, escala, TEXTO_EJE, colorSerie, SinDatos, fmt,
} from "./base";

const ANCHO_CARACTER = 6.6;
const R = 4;
const HUECO = 2;

/** Rectángulo con sólo un lado redondeado: el del extremo del dato. */
function rect(x, y, w, h, lado) {
  if (w <= 0 || h <= 0) return "";
  const r = Math.min(R, w / 2, h / 2);
  if (lado === "arriba") {
    return `M${x},${y + h} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h} Z`;
  }
  if (lado === "abajo") {
    return `M${x},${y} L${x + w},${y} L${x + w},${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} L${x + r},${y + h} Q${x},${y + h} ${x},${y + h - r} Z`;
  }
  if (lado === "derecha") {
    return `M${x},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} L${x},${y + h} Z`;
  }
  if (lado === "izquierda") {
    return `M${x + w},${y} L${x + w},${y + h} L${x + r},${y + h} Q${x},${y + h} ${x},${y + h - r} L${x},${y + r} Q${x},${y} ${x + r},${y} Z`;
  }
  return `M${x},${y} h${w} v${h} h${-w} Z`;
}

const recortar = (texto, ancho) => {
  const t = String(texto ?? "");
  const cabe = Math.max(3, Math.floor(ancho / ANCHO_CARACTER));
  return t.length > cabe ? `${t.slice(0, cabe - 1)}…` : t;
};

export default function GraficaBarras({
  datos, categorias: categoriasProp, series: seriesProp, horizontal = false, apiladas = false,
  etiquetas = false, resaltar, alto: altoProp, formato = "numero", titulo, estilo,
}) {
  const [ref, ancho] = useMedida();
  const [activo, setActivo] = useState(null);

  /* Dos formas de pasar datos: `datos` [{etiqueta, valor}] para una serie, o
     `categorias` + `series` para varias. */
  const categorias = datos ? datos.map((d) => d.etiqueta) : (categoriasProp || []);
  const series = datos
    ? [{ clave: "valor", nombre: titulo || "Valor", valores: datos.map((d) => d.valor),
         color: datos[0]?.color }]
    : (seriesProp || []);
  const nCat = categorias.length;
  const nSer = series.length;
  const val = (si, ci) => {
    const v = series[si]?.valores?.[ci];
    return v === null || v === undefined || !Number.isFinite(Number(v)) ? null : Number(v);
  };

  let minD = 0;
  let maxD = 0;
  for (let ci = 0; ci < nCat; ci++) {
    if (apiladas) {
      let pos = 0; let neg = 0;
      for (let si = 0; si < nSer; si++) { const v = val(si, ci) ?? 0; if (v >= 0) pos += v; else neg += v; }
      maxD = Math.max(maxD, pos); minD = Math.min(minD, neg);
    } else {
      for (let si = 0; si < nSer; si++) {
        const v = val(si, ci); if (v !== null) { maxD = Math.max(maxD, v); minD = Math.min(minD, v); }
      }
    }
  }
  const hayDatos = nCat > 0 && nSer > 0 && series.some((s, si) => categorias.some((_, ci) => val(si, ci) !== null));
  /* En horizontal las marcas viven a lo ancho: en un teléfono cuatro marcas
     de moneda («$7.5 M») no caben y se enciman. Una marca cada ~72 px. */
  const anchoMedida = horizontal
    ? ancho - Math.min(ancho * 0.38, 170) - 10 - (etiquetas ? 64 : 12) : 0;
  const cuantas = horizontal ? Math.max(2, Math.min(4, Math.floor(anchoMedida / 72))) : 4;
  const { marcas, min, max } = marcasBonitas(minD, maxD, cuantas);
  const formatoEje = formato === "moneda" ? "monedaCompacta" : formato === "numero" ? "compacto" : formato;

  const alto = altoProp ?? (horizontal ? Math.max(120, nCat * (nSer > 1 && !apiladas ? 18 * nSer + 14 : 34) + 34) : 240);

  /* Geometría. En vertical, `banda` es el ancho de cada categoría; en
     horizontal, su alto. `valorA` pasa un valor a la coordenada del eje de
     medida. */
  const anchoEtiquetaH = horizontal ? Math.min(ancho * 0.38, 170) : 0;
  const reservaValor = etiquetas ? 64 : 12;
  const izq = horizontal
    ? anchoEtiquetaH + 10
    : Math.max(...marcas.map((m) => String(fmt(m, formatoEje)).length)) * ANCHO_CARACTER + 12;
  const der = horizontal ? reservaValor : 6;
  const arriba = etiquetas && !horizontal ? 18 : 8;
  /* Con negativos, la etiqueta de una barra que baja cae justo donde va el
     nombre de la categoría: se reserva un renglón más abajo para ella. */
  const hayNegativos = series.some((se) => (se.valores || []).some((v) => Number(v) < 0));
  const abajo = horizontal ? 22 : 24 + (etiquetas && hayNegativos ? 16 : 0);
  const anchoPlot = Math.max(10, ancho - izq - der);
  const altoPlot = alto - arriba - abajo;

  const banda = (horizontal ? altoPlot : anchoPlot) / Math.max(1, nCat);
  const relleno = banda * (horizontal ? 0.22 : 0.26);
  const interior = banda - relleno;
  const grueso = apiladas || nSer === 1 ? interior : (interior - HUECO * (nSer - 1)) / nSer;
  const valorA = horizontal ? escala(min, max, izq, izq + anchoPlot) : escala(min, max, arriba + altoPlot, arriba);
  const cero = valorA(0);

  const opacidad = (ci) => (resaltar === undefined || resaltar === null || resaltar === ci ? 1 : 0.35);

  /* Barras de una categoría. Cada una: [posición en banda, desde, hasta, serie, es extremo]. */
  const barras = (ci) => {
    const out = [];
    const inicioBanda = (horizontal ? arriba : izq) + ci * banda + relleno / 2;
    if (apiladas) {
      let pos = 0; let neg = 0;
      const ultimoPos = [...series.keys()].reverse().find((si) => (val(si, ci) ?? 0) > 0);
      const ultimoNeg = [...series.keys()].reverse().find((si) => (val(si, ci) ?? 0) < 0);
      series.forEach((_, si) => {
        const v = val(si, ci) ?? 0;
        if (v === 0) return;
        const desde = v > 0 ? pos : neg;
        const hasta = desde + v;
        if (v > 0) pos = hasta; else neg = hasta;
        out.push({ off: inicioBanda, grueso, desde, hasta, si, extremo: si === (v > 0 ? ultimoPos : ultimoNeg) });
      });
    } else {
      series.forEach((_, si) => {
        const v = val(si, ci);
        if (v === null) return;
        out.push({ off: inicioBanda + si * (grueso + HUECO), grueso, desde: 0, hasta: v, si, extremo: true });
      });
    }
    return out;
  };

  const path = (b) => {
    const a = valorA(b.desde);
    const c = valorA(b.hasta);
    const positivo = b.hasta >= b.desde;
    /* El hueco entre segmentos apilados se resta del lado que toca al
       siguiente, para que el total siga cayendo en su marca. */
    const recorte = apiladas && !b.extremo ? HUECO : 0;
    if (horizontal) {
      const x0 = Math.min(a, c); const w = Math.abs(c - a);
      const lado = b.extremo ? (positivo ? "derecha" : "izquierda") : "ninguno";
      return positivo ? rect(x0, b.off, w - recorte, b.grueso, lado) : rect(x0 + recorte, b.off, w - recorte, b.grueso, lado);
    }
    const y0 = Math.min(a, c); const h = Math.abs(c - a);
    const lado = b.extremo ? (positivo ? "arriba" : "abajo") : "ninguno";
    return positivo ? rect(b.off, y0 + recorte, b.grueso, h - recorte, lado) : rect(b.off, y0, b.grueso, h - recorte, lado);
  };

  const totalCategoria = (ci) => series.reduce((s, _, si) => s + (val(si, ci) ?? 0), 0);

  const tabla = {
    columnas: ["", ...series.map((s) => s.nombre)],
    filas: categorias.map((c, ci) => [c, ...series.map((_, si) => fmt(val(si, ci), formato))]),
  };

  const centroBanda = (ci) => (horizontal ? arriba : izq) + ci * banda + banda / 2;
  const globoXY = (() => {
    if (activo === null) return { x: 0, y: 0 };
    if (horizontal) return { x: Math.min(ancho - 10, valorA(Math.max(0, apiladas ? totalCategoria(activo) : Math.max(...series.map((_, si) => val(si, activo) ?? 0))))), y: centroBanda(activo) };
    return { x: centroBanda(activo), y: arriba + altoPlot / 3 };
  })();

  const pasoEtiquetaV = Math.max(1, Math.ceil((nCat * 44) / Math.max(1, anchoPlot)));

  return (
    <MarcoGrafica titulo={titulo} series={nSer > 1 ? series : []} tabla={hayDatos ? tabla : null}
      estilo={estilo} alto={alto}>
      <div ref={ref} style={{ position: "relative", minWidth: 0 }}>
        {!hayDatos ? <SinDatos alto={alto} /> : ancho > 0 && (
          // v2.5.4: la gráfica es un grupo y cada barra una imagen con su nombre. Antes el svg era role="img" y las
          // barras <g aria-label> sin rol: axe lo marca (aria-prohibited-attr) y el lector no anunciaba la barra
          // enfocada (lo cachó el panel de Apple Connect, 2026-10-26).
          <svg width={ancho} height={alto} role="group" style={{ display: "block", overflow: "visible" }}
            aria-label={`${titulo ? `${titulo}: ` : ""}${nCat} categorías`}>
            {marcas.map((m) => (horizontal ? (
              <g key={m}>
                <line x1={valorA(m)} x2={valorA(m)} y1={arriba} y2={arriba + altoPlot}
                  stroke={m === 0 ? "var(--ds-eje)" : "var(--ds-grid)"} />
                <text x={valorA(m)} y={alto - 6} textAnchor="middle" style={TEXTO_EJE}>{fmt(m, formatoEje)}</text>
              </g>
            ) : (
              <g key={m}>
                <line x1={izq} x2={izq + anchoPlot} y1={valorA(m)} y2={valorA(m)}
                  stroke={m === 0 ? "var(--ds-eje)" : "var(--ds-grid)"} />
                <text x={izq - 8} y={valorA(m)} dy="0.32em" textAnchor="end" style={TEXTO_EJE}>{fmt(m, formatoEje)}</text>
              </g>
            )))}

            {categorias.map((cat, ci) => (
              <g key={ci} tabIndex={0} opacity={opacidad(ci)} role="img"
                aria-label={`${cat}: ${series.map((s, si) => `${nSer > 1 ? `${s.nombre} ` : ""}${fmt(val(si, ci), formato)}`).join(", ")}`}
                onMouseEnter={() => setActivo(ci)} onMouseLeave={() => setActivo(null)}
                onFocus={() => setActivo(ci)} onBlur={() => setActivo(null)}
                style={{ outline: "none", transition: "opacity var(--ds-t-state) var(--ds-ease)" }}>
                {/* Zona de toque más grande que la barra. */}
                {horizontal
                  ? <rect x={izq} y={arriba + ci * banda} width={anchoPlot} height={banda}
                      fill={activo === ci ? "var(--ds-surface-sunk)" : "transparent"} />
                  : <rect x={izq + ci * banda} y={arriba} width={banda} height={altoPlot}
                      fill={activo === ci ? "var(--ds-surface-sunk)" : "transparent"} />}
                {barras(ci).map((b, k) => (
                  <path key={k} d={path(b)} fill={colorSerie(series[b.si], b.si)} />
                ))}
                {horizontal ? (
                  <text x={izq - 10} y={centroBanda(ci)} dy="0.32em" textAnchor="end"
                    style={{ ...TEXTO_EJE, fontSize: 12, fill: "var(--ds-ink-2)" }}>
                    <title>{cat}</title>
                    {recortar(cat, anchoEtiquetaH)}
                  </text>
                ) : (ci % pasoEtiquetaV === 0 && (
                  <text x={centroBanda(ci)} y={alto - 6} textAnchor="middle" style={TEXTO_EJE}>
                    <title>{cat}</title>
                    {recortar(cat, banda * pasoEtiquetaV - 4)}
                  </text>
                ))}
                {etiquetas && (() => {
                  const total = apiladas || nSer === 1 ? (apiladas ? totalCategoria(ci) : val(0, ci)) : null;
                  if (total === null) return null;
                  /* Compacta, como en la cascada y en los ejes: la cifra completa
                     amontona las barras vecinas y ya está en el globo y la tabla. */
                  const texto = fmt(total, formatoEje);
                  if (horizontal) {
                    const xv = valorA(total);
                    return (
                      <text x={total >= 0 ? xv + 6 : xv - 6} y={centroBanda(ci)} dy="0.32em"
                        textAnchor={total >= 0 ? "start" : "end"}
                        style={{ ...TEXTO_EJE, fill: "var(--ds-ink)", fontWeight: 800 }}>{texto}</text>
                    );
                  }
                  if (banda < 34) return null;
                  const yv = valorA(total);
                  return (
                    <text x={centroBanda(ci)} y={total >= 0 ? yv - 6 : yv + 14} textAnchor="middle"
                      style={{ ...TEXTO_EJE, fill: "var(--ds-ink)", fontWeight: 800 }}>{texto}</text>
                  );
                })()}
              </g>
            ))}
            {/* La línea de cero va encima de las barras: es la referencia. */}
            {horizontal
              ? <line x1={cero} x2={cero} y1={arriba} y2={arriba + altoPlot} stroke="var(--ds-eje)" />
              : <line x1={izq} x2={izq + anchoPlot} y1={cero} y2={cero} stroke="var(--ds-eje)" />}
          </svg>
        )}
        <Globo visible={activo !== null} x={globoXY.x} y={globoXY.y} ancho={ancho}
          titulo={activo === null ? "" : categorias[activo]}
          renglones={activo === null ? [] : [
            ...series.map((s, si) => ({ color: colorSerie(s, si), nombre: s.nombre, valor: fmt(val(si, activo), formato) })),
            ...(apiladas && nSer > 1 ? [{ nombre: "Total", valor: fmt(totalCategoria(activo), formato) }] : []),
          ]} />
      </div>
    </MarcoGrafica>
  );
}
