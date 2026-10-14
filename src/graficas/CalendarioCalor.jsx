/**
 * CalendarioCalor — la actividad de cada día en un periodo largo.
 *
 * Entregas por día del año, cobranza diaria, tickets atendidos. Responde
 * «¿qué días se mueve el negocio?» y deja ver patrones que una línea esconde:
 * los lunes cargados, la quincena, la semana muerta de diciembre.
 *
 *   · Semanas en columnas, días de lunes a domingo en filas (la semana
 *     laboral de México empieza en lunes), meses marcados arriba.
 *   · Misma rampa de cinco cubetas que MapaCalor; el día sin registro se pinta
 *     como «sin dato», no como cero.
 *   · Las celdas no se encogen hasta volverse puntos: si el año no cabe, el
 *     calendario se desplaza dentro de su tarjeta y arranca mostrando lo más
 *     reciente.
 *   · Teclado con flechas sobre la cuadrícula (un año son 365 celdas: no
 *     pueden ser 365 paradas de tabulador).
 */
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { MarcoGrafica, Globo, SinDatos, fmt } from "./base";
import { rangoDe, cubeta, colorCubeta, LeyendaRampa } from "./rampa";
import { fecha as formatoFecha } from "../formato";

const CELDA = 13;
const HUECO = 3;
const DIAS = ["L", "", "M", "", "V", "", ""];

const aLocal = (s) => {
  if (s instanceof Date) return new Date(s.getFullYear(), s.getMonth(), s.getDate());
  const [a, m, d] = String(s).slice(0, 10).split("-").map(Number);
  return new Date(a, m - 1, d);
};
const clave = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export default function CalendarioCalor({ datos = [], desde, hasta, formato = "numero", titulo, estilo }) {
  const caja = useRef(null);
  const [activo, setActivo] = useState(null); // índice de día

  const { dias, semanas, mapa, rango } = useMemo(() => {
    const m = new Map(datos.map((d) => [String(d.fecha).slice(0, 10), d.valor]));
    const fechas = datos.map((d) => aLocal(d.fecha)).sort((a, b) => a - b);
    const ini = desde ? aLocal(desde) : fechas[0];
    const fin = hasta ? aLocal(hasta) : fechas[fechas.length - 1];
    if (!ini || !fin || fin < ini) return { dias: [], semanas: 0, mapa: m, rango: null };
    /* Arranca el lunes de la semana del primer día. */
    const lunes = new Date(ini);
    lunes.setDate(lunes.getDate() - ((lunes.getDay() + 6) % 7));
    const lista = [];
    for (let d = new Date(lunes); d <= fin; d.setDate(d.getDate() + 1)) {
      const k = clave(d);
      lista.push({ fecha: new Date(d), k, fuera: d < ini, valor: m.get(k) });
    }
    const valores = lista.filter((d) => !d.fuera).map((d) => d.valor);
    return { dias: lista, semanas: Math.ceil(lista.length / 7), mapa: m, rango: rangoDe(valores) };
  }, [datos, desde, hasta]);

  /* Lo reciente a la vista: el scroll empieza a la derecha. */
  useLayoutEffect(() => {
    if (caja.current) caja.current.scrollLeft = caja.current.scrollWidth;
  }, [semanas]);

  const izq = 18;
  const arriba = 18;
  const pos = (i) => ({
    x: izq + Math.floor(i / 7) * (CELDA + HUECO),
    y: arriba + (i % 7) * (CELDA + HUECO),
  });

  const meses = [];
  dias.forEach((d, i) => {
    if (i % 7 === 0) {
      const sem = i / 7;
      const primero = dias.slice(i, i + 7).find((x) => x.fecha.getDate() === 1) || (i === 0 ? d : null);
      if (primero && (!meses.length || sem - meses[meses.length - 1].sem >= 3)) {
        meses.push({ sem, texto: formatoFecha(primero.fecha, "mesCorto") });
      }
    }
  });

  const alTeclear = (e) => {
    const paso = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -7, ArrowRight: 7 }[e.key];
    if (paso) {
      e.preventDefault();
      setActivo((a) => {
        let n = (a ?? dias.length - 1) + paso;
        n = Math.max(0, Math.min(dias.length - 1, n));
        while (dias[n]?.fuera && n < dias.length - 1) n += 1;
        return n;
      });
    }
    if (e.key === "Escape") setActivo(null);
  };

  const anchoTotal = izq + semanas * (CELDA + HUECO);
  const altoTotal = arriba + 7 * (CELDA + HUECO);
  const tabla = {
    columnas: ["Fecha", "Valor"],
    filas: dias.filter((d) => !d.fuera && d.valor !== undefined).map((d) => [formatoFecha(d.fecha, "media"), fmt(d.valor, formato)]),
  };
  const a = activo !== null ? dias[activo] : null;
  const p = activo !== null ? pos(activo) : { x: 0, y: 0 };

  return (
    <MarcoGrafica titulo={titulo} tabla={rango ? tabla : null} estilo={estilo}>
      {!rango ? <SinDatos /> : (
        <>
          <div ref={caja} tabIndex={0} role="grid"
            aria-label={`${titulo ? `${titulo}: ` : ""}calendario de ${semanas} semanas. Flechas para recorrer.`}
            onKeyDown={alTeclear} onFocus={() => setActivo((x) => x ?? dias.length - 1)} onBlur={() => setActivo(null)}
            onMouseLeave={() => setActivo(null)}
            style={{ position: "relative", overflowX: "auto", paddingBottom: 4, outlineOffset: 2 }}>
            <svg width={anchoTotal} height={altoTotal} style={{ display: "block" }}>
              {meses.map((m) => (
                <text key={m.sem} x={izq + m.sem * (CELDA + HUECO)} y={11}
                  style={{ fontSize: 11, fontWeight: 600, fill: "var(--ds-ink-3)", fontFamily: "var(--ds-font)" }}>
                  {m.texto}
                </text>
              ))}
              {DIAS.map((t, i) => t && (
                <text key={i} x={0} y={arriba + i * (CELDA + HUECO) + CELDA - 2}
                  style={{ fontSize: 10, fontWeight: 600, fill: "var(--ds-ink-3)", fontFamily: "var(--ds-font)" }}>
                  {t}
                </text>
              ))}
              {dias.map((d, i) => {
                if (d.fuera) return null;
                const { x, y } = pos(i);
                return (
                  <rect key={d.k} x={x} y={y} width={CELDA} height={CELDA} rx="3"
                    fill={colorCubeta(cubeta(d.valor, rango))}
                    stroke={activo === i ? "var(--ds-ink)" : "none"} strokeWidth="2"
                    onMouseEnter={() => setActivo(i)} />
                );
              })}
            </svg>
            <Globo visible={!!a} x={p.x + CELDA / 2} y={p.y} ancho={anchoTotal}
              titulo={a ? formatoFecha(a.fecha, "larga") : ""}
              renglones={a ? [{ nombre: titulo || "Valor", valor: a.valor === undefined ? "Sin dato" : fmt(a.valor, formato) }] : []} />
          </div>
          <LeyendaRampa rango={rango} formato={formato} />
        </>
      )}
    </MarcoGrafica>
  );
}
