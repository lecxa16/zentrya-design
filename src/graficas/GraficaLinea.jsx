/**
 * GraficaLinea — cómo se mueve una cifra en el tiempo.
 *
 * Es la gráfica de «¿vamos mejor o peor que antes?»: ventas por mes, litros
 * por semana, cartera vencida por día. Por eso el eje X es el tiempo y el eje
 * Y uno solo: dos medidas de distinta escala no se pintan aquí juntas —se
 * hacen dos gráficas—, porque un segundo eje deja que cualquier par de líneas
 * parezca cruzarse donde uno quiera.
 *
 * Decisiones que sostiene:
 *   · Un hueco (null) corta la línea. Unir por encima de un día sin dato
 *     inventa los valores intermedios.
 *   · Con cuatro series o menos, cada línea lleva su nombre al final: el ojo
 *     no tiene que ir y volver a la leyenda.
 *   · `apilada` sólo tiene sentido con área (partes de un todo); apilar
 *     líneas sueltas hace que la de arriba parezca más grande de lo que es.
 *   · En angosto se dejan menos marcas en el eje X, nunca texto girado.
 *   · Se recorre con el ratón, con el dedo (deslizando de lado; el scroll
 *     vertical sigue funcionando) y con las flechas. `onActivo(i | null)` avisa
 *     qué punto se está viendo, y `globo={false}` lo quita cuando quien la usa
 *     ya enseña el valor arriba, como la app Salud (v2.9).
 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MarcoGrafica, Globo, useMedida, marcasBonitas, escala, TEXTO_EJE, colorSerie, SinDatos, fmt,
} from "./base";

const ANCHO_CARACTER = 6.6;

/* Ancho estimado de un texto del eje a 11 px y peso 700: las mayúsculas miden
   más que el promedio, y «VALERO NUSTAR NLD» se salía de la reserva. */
const anchoTexto = (t) => [...String(t ?? "")]
  .reduce((a, c) => a + (c >= "A" && c <= "Z" ? 8 : c === " " ? 3.4 : ANCHO_CARACTER), 0);

/** La etiqueta final de una serie: completa si cabe, si no con «…». El nombre
 *  entero sigue en la leyenda y en el globo. */
const RESERVA_DIRECTA = 140;
const recortarA = (t, max) => {
  const s = String(t ?? "");
  if (anchoTexto(s) <= max) return s;
  let r = s;
  while (r.length > 1 && anchoTexto(r + "…") > max) r = r.slice(0, -1);
  return r.trimEnd() + "…";
};

export default function GraficaLinea({
  series = [], etiquetas = [], alto = 240, formato = "numero", area = false, apilada = false,
  meta, titulo, cero = true, estilo, onActivo, globo = true,
}) {
  const [ref, ancho] = useMedida();
  const [activo, setActivo] = useState(null);
  const avisar = useRef(onActivo);
  avisar.current = onActivo;
  useEffect(() => { avisar.current?.(activo); }, [activo]);

  const n = Math.max(etiquetas.length, ...series.map((s) => (s.valores || []).length), 0);
  const apilar = apilada && area;
  const metaValor = meta === undefined || meta === null ? null
    : typeof meta === "object" ? meta.valor : meta;
  const metaTexto = meta && typeof meta === "object" && meta.texto ? meta.texto : "Meta";

  /* Valores a pintar: en apilada, cada serie trae su base (la suma de las de
     abajo). Un null en apilada cuenta como 0: un hueco en una pila la rompe. */
  const capas = useMemo(() => {
    const acumulado = Array(n).fill(0);
    return series.map((s) => {
      const v = Array.from({ length: n }, (_, i) => {
        const x = s.valores?.[i];
        return x === null || x === undefined || !Number.isFinite(Number(x)) ? null : Number(x);
      });
      if (!apilar) return { abajo: null, arriba: v, crudo: v };
      const abajo = acumulado.slice();
      const arriba = v.map((x, i) => (acumulado[i] += x ?? 0));
      return { abajo, arriba: arriba.slice(), crudo: v };
    });
  }, [series, n, apilar]);

  const todos = capas.flatMap((c) => c.arriba.filter((v) => v !== null));
  if (metaValor !== null) todos.push(Number(metaValor));
  const hayDatos = todos.length > 0 && n > 0;

  const minDato = hayDatos ? Math.min(...todos) : 0;
  const maxDato = hayDatos ? Math.max(...todos) : 1;
  const { marcas, min, max } = marcasBonitas(cero ? Math.min(0, minDato) : minDato,
    cero ? Math.max(0, maxDato) : maxDato, alto < 200 ? 3 : 4);

  /* El eje habla en compacto ($1.2 M, 48 mil): las cifras completas van en el
     globo y en la tabla. */
  const formatoEje = formato === "moneda" ? "monedaCompacta" : formato === "numero" ? "compacto" : formato;
  const etiquetaDirecta = series.length > 1 && series.length <= 4 && ancho >= 420 && !apilar;
  const izq = Math.max(...marcas.map((m) => String(fmt(m, formatoEje)).length))
    * ANCHO_CARACTER + 12;
  const der = etiquetaDirecta
    ? Math.min(RESERVA_DIRECTA, Math.max(...series.map((s) => anchoTexto(s.nombre))) + 14)
    : 10;
  const arriba = 10;
  const abajo = 24;
  const anchoPlot = Math.max(10, ancho - izq - der);
  const altoPlot = alto - arriba - abajo;

  const x = (i) => izq + (n <= 1 ? anchoPlot / 2 : (i / (n - 1)) * anchoPlot);
  const y = escala(min, max, arriba + altoPlot, arriba);

  /* Marcas del eje X: las que caben a ~70 px; en angosto, cuatro como mucho. */
  /* Cuántas etiquetas caben depende de cuánto mide la MÁS LARGA: «Ene» cabe
     cada 40 px, «2026-07-16» necesita ~75. Con un tope fijo, las fechas
     completas se enciman en un teléfono. */
  const largoX = Math.max(3, ...Array.from({ length: n }, (_, i) => String(etiquetas[i] ?? i + 1).length));
  const anchoEtiquetaX = largoX * ANCHO_CARACTER + 12;
  const maxMarcasX = Math.max(2, Math.min(ancho < 420 ? 4 : Infinity, Math.floor(anchoPlot / anchoEtiquetaX)));
  const pasoX = Math.max(1, Math.ceil(n / maxMarcasX));

  /* El paso solo no basta: la primera etiqueta va anclada a la izquierda (se
     extiende entera hacia la derecha) y la última a la derecha, así que sus
     vecinas necesitan más aire que dos etiquetas centradas. Cada candidata
     calcula su caja y se omite si invadiría a la anterior. */
  const marcasEjeX = [];
  let finPrevio = -Infinity;
  for (let i = 0; i < n; i += pasoX) {
    const largo = String(etiquetas[i] ?? i + 1).length * ANCHO_CARACTER;
    const ancla = n > 1 && i === 0 ? "start" : (n > 1 && i >= n - 1 ? "end" : "middle");
    const ini = ancla === "start" ? x(i) : ancla === "end" ? x(i) - largo : x(i) - largo / 2;
    if (ini >= finPrevio + 8) {
      marcasEjeX.push({ i, ancla });
      finPrevio = ini + largo;
    }
  }

  const tramos = (vals) => {
    const out = [];
    let t = [];
    vals.forEach((v, i) => {
      if (v === null) { if (t.length) out.push(t); t = []; } else t.push(i);
    });
    if (t.length) out.push(t);
    return out;
  };

  const tabla = {
    columnas: ["", ...series.map((s) => s.nombre)],
    filas: Array.from({ length: n }, (_, i) => [
      etiquetas[i] ?? i + 1, ...capas.map((c) => fmt(c.crudo[i], formato)),
    ]),
  };

  const alMover = (e) => {
    if (!hayDatos) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - r.left;
    const i = n <= 1 ? 0 : Math.round(((px - izq) / anchoPlot) * (n - 1));
    setActivo(Math.max(0, Math.min(n - 1, i)));
  };
  const alTeclear = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); setActivo((a) => Math.min(n - 1, (a ?? -1) + 1)); }
    if (e.key === "ArrowLeft") { e.preventDefault(); setActivo((a) => Math.max(0, (a ?? n) - 1)); }
    if (e.key === "Escape") setActivo(null);
  };

  const yGlobo = activo === null ? 0
    : Math.min(...capas.map((c) => (c.arriba[activo] === null ? arriba + altoPlot : y(c.arriba[activo]))));

  return (
    <MarcoGrafica titulo={titulo} series={series} formaLeyenda="linea" tabla={hayDatos ? tabla : null}
      estilo={estilo} alto={alto}>
      <div ref={ref} style={{ position: "relative", minWidth: 0 }}>
        {!hayDatos ? <SinDatos alto={alto} /> : ancho > 0 && (
          <svg width={ancho} height={alto} role="img" tabIndex={0}
            aria-label={`${titulo ? `${titulo}: ` : ""}${series.length} serie(s), ${n} puntos. Flechas para recorrer.`}
            style={{ display: "block", overflow: "visible", outline: "none", touchAction: "pan-y" }}
            onPointerDown={alMover} onPointerMove={alMover} onPointerLeave={() => setActivo(null)}
            onFocus={() => setActivo((a) => (a === null ? n - 1 : a))} onBlur={() => setActivo(null)}
            onKeyDown={alTeclear}>
            {marcas.map((m) => (
              <g key={m}>
                <line x1={izq} x2={izq + anchoPlot} y1={y(m)} y2={y(m)}
                  stroke={m === 0 ? "var(--ds-eje)" : "var(--ds-grid)"} strokeWidth="1" />
                <text x={izq - 8} y={y(m)} dy="0.32em" textAnchor="end" style={TEXTO_EJE}>
                  {fmt(m, formatoEje)}
                </text>
              </g>
            ))}
            {marcasEjeX.map(({ i, ancla }) => (
              <text key={i} x={x(i)} y={alto - 6} textAnchor={ancla} style={TEXTO_EJE}>
                {etiquetas[i] ?? i + 1}
              </text>
            ))}

            {area && capas.map((c, si) => tramos(c.arriba).map((t, ti) => {
              const base = (i) => (c.abajo ? y(c.abajo[i]) : y(Math.max(min, Math.min(0, max))));
              const d = `M${x(t[0])},${base(t[0])} `
                + t.map((i) => `L${x(i)},${y(c.arriba[i])}`).join(" ")
                + ` ${[...t].reverse().map((i) => `L${x(i)},${base(i)}`).join(" ")} Z`;
              return <path key={`a${si}-${ti}`} d={d} fill={colorSerie(series[si], si)}
                fillOpacity={apilar ? 0.55 : 0.12} stroke="none" />;
            }))}

            {capas.map((c, si) => tramos(c.arriba).map((t, ti) => (
              t.length === 1
                ? <circle key={`p${si}-${ti}`} cx={x(t[0])} cy={y(c.arriba[t[0]])} r="3"
                    fill={colorSerie(series[si], si)} />
                : <path key={`l${si}-${ti}`} fill="none" stroke={colorSerie(series[si], si)}
                    strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
                    d={t.map((i, j) => `${j ? "L" : "M"}${x(i)},${y(c.arriba[i])}`).join(" ")} />
            )))}

            {metaValor !== null && (
              <g>
                <line x1={izq} x2={izq + anchoPlot} y1={y(metaValor)} y2={y(metaValor)}
                  stroke="var(--ds-ink-2)" strokeWidth="1.5" strokeDasharray="5 4" />
                <text x={izq + 6} y={y(metaValor) - 6}
                  style={{ ...TEXTO_EJE, fill: "var(--ds-ink-2)", fontWeight: 600 }}>
                  {metaTexto} · {fmt(metaValor, formato)}
                </text>
              </g>
            )}

            {etiquetaDirecta && (() => {
              /* Las etiquetas al final se separan si se enciman: 14 px mínimo. */
              const pos = capas.map((c, si) => {
                const iUlt = c.arriba.map((v, i) => (v === null ? -1 : i)).filter((i) => i >= 0).pop();
                return iUlt === undefined ? null : { si, yv: y(c.arriba[iUlt]), xv: x(iUlt) };
              }).filter(Boolean).sort((a, b) => a.yv - b.yv);
              for (let k = 1; k < pos.length; k++) {
                if (pos[k].yv - pos[k - 1].yv < 14) pos[k].yv = pos[k - 1].yv + 14;
              }
              return pos.map((p) => (
                <text key={p.si} x={izq + anchoPlot + 8} y={p.yv} dy="0.32em"
                  style={{ ...TEXTO_EJE, fill: "var(--ds-ink-2)", fontWeight: 600 }}>
                  <title>{series[p.si].nombre}</title>
                  {recortarA(series[p.si].nombre, der - 12)}
                </text>
              ));
            })()}

            {activo !== null && (
              <g pointerEvents="none">
                <line x1={x(activo)} x2={x(activo)} y1={arriba} y2={arriba + altoPlot}
                  stroke="var(--ds-eje)" strokeWidth="1" />
                {capas.map((c, si) => c.arriba[activo] !== null && (
                  <circle key={si} cx={x(activo)} cy={y(c.arriba[activo])} r="4.5"
                    fill={colorSerie(series[si], si)} stroke="var(--ds-surface-solid)" strokeWidth="2" />
                ))}
              </g>
            )}
            <rect x={izq} y={arriba} width={anchoPlot} height={altoPlot} fill="transparent" />
          </svg>
        )}
        <Globo visible={globo && activo !== null} x={activo === null ? 0 : x(activo)} y={yGlobo} ancho={ancho}
          titulo={activo === null ? "" : etiquetas[activo]}
          renglones={activo === null ? [] : series.map((s, si) => ({
            color: colorSerie(s, si), nombre: s.nombre, valor: fmt(capas[si].crudo[activo], formato),
          }))} />
      </div>
    </MarcoGrafica>
  );
}
