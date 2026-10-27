/**
 * Base compartida de las gráficas: medida, escalas, leyenda, globo y vista
 * de tabla.
 *
 * Todas las gráficas del sistema son SVG propio, sin librería: así pesan
 * poco, toman los tokens directamente y cambian de tema sin re-renderizar.
 * Lo que tienen en común vive aquí para que ninguna lo resuelva a su manera.
 *
 * Reglas que esta base sostiene (y que cada gráfica hereda):
 *   · Un solo eje vertical. Dos medidas de distinta escala van en dos gráficas.
 *   · El color sigue a la serie, no a su posición: `color` fijo por serie.
 *   · Con dos series o más hay leyenda; con una, el título la nombra.
 *   · Toda gráfica tiene globo al pasar el cursor y su vista de tabla.
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { formatear } from "../formato";

/** Los seis colores de serie, en su orden validado. */
export const SERIES = [1, 2, 3, 4, 5, 6].map((i) => `var(--ds-serie-${i})`);

/** El color de la serie i: el que traiga la serie o el de su lugar. */
export const colorSerie = (s, i) => s?.color || SERIES[i % SERIES.length];

/**
 * Ancho real del contenedor. Una gráfica de ancho fijo dentro de una tarjeta
 * que se encoge se desborda; ésta se vuelve a dibujar a la medida.
 */
export function useMedida() {
  /* Callback ref, no useRef: si el contenedor aparece después del primer
     render (una gráfica que esperaba datos), un useRef no se entera y el
     ancho se queda en 0 para siempre. */
  const [ancho, setAncho] = useState(0);
  const obs = useRef(null);
  const ref = useCallback((el) => {
    if (obs.current) { obs.current.disconnect(); obs.current = null; }
    if (!el) return;
    setAncho(el.getBoundingClientRect().width);
    if (typeof ResizeObserver === "undefined") return;
    obs.current = new ResizeObserver(([e]) => setAncho(e.contentRect.width));
    obs.current.observe(el);
  }, []);
  return [ref, ancho];
}

/**
 * Marcas «redondas» del eje: 0, 250, 500… y no 0, 237, 474. Devuelve también
 * el máximo y mínimo redondeados para que la última marca cierre la escala.
 */
export function marcasBonitas(min, max, cuantas = 4) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return { marcas: [0, 1], min: 0, max: 1 };
  if (min === max) { max = min === 0 ? 1 : max + Math.abs(max) * 0.1; }
  const rango = max - min;
  const paso0 = rango / cuantas;
  const mag = 10 ** Math.floor(Math.log10(paso0));
  const norm = paso0 / mag;
  const paso = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const lo = Math.floor(min / paso) * paso;
  const hi = Math.ceil(max / paso) * paso;
  const marcas = [];
  for (let v = lo; v <= hi + paso / 2; v += paso) marcas.push(Number(v.toFixed(10)));
  return { marcas, min: lo, max: hi };
}

/** Escala lineal: dominio → rango. */
export const escala = (d0, d1, r0, r1) => (v) =>
  (d1 === d0 ? (r0 + r1) / 2 : r0 + ((v - d0) / (d1 - d0)) * (r1 - r0));

/** Estilo de texto de eje: pequeño, tenue, numerales en columna. */
export const TEXTO_EJE = {
  fontSize: 11, fontWeight: 600, fill: "var(--ds-ink-3)", fontFamily: "var(--ds-font)",
  fontVariantNumeric: "tabular-nums",
};

/** Muestra rotada: una marca de color + texto en tinta, nunca texto de color. */
export function Muestra({ color, forma = "cuadro" }) {
  const base = { flexShrink: 0, background: color };
  if (forma === "linea") return <span style={{ ...base, width: 14, height: 3, borderRadius: "var(--ds-r-mini)" }} />;
  return <span style={{ ...base, width: 10, height: 10, borderRadius: "var(--ds-r-mini)" }} />;
}

/** Leyenda: en una fila arriba de la gráfica, que envuelve si no cabe. */
export function Leyenda({ series = [], forma, valores, estilo }) {
  if (series.length < 2) return null;
  return (
    <div role="list" style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px",
      marginBottom: "var(--ds-3)", ...estilo }}>
      {series.map((s, i) => (
        <span role="listitem" key={s.clave ?? s.nombre ?? i} style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          fontSize: "var(--ds-t-small)", fontWeight: 600, color: "var(--ds-ink-2)" }}>
          <Muestra color={colorSerie(s, i)} forma={forma} />
          {s.nombre}
          {valores && valores[i] !== undefined && (
            <span className="ds-num" style={{ color: "var(--ds-ink)", fontWeight: 600 }}>
              {valores[i]}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

/**
 * Globo de la gráfica. Se coloca dentro del contenedor de la gráfica (que va
 * en `position: relative`) y se voltea al lado contrario cuando no cabe: un
 * globo cortado por el borde de la tarjeta no se lee.
 */
export function Globo({ x, y, ancho, titulo, renglones = [], visible }) {
  const ref = useRef(null);
  const [medida, setMedida] = useState({ w: 160, h: 60 });
  useEffect(() => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      if (Math.abs(r.width - medida.w) > 1 || Math.abs(r.height - medida.h) > 1) {
        setMedida({ w: r.width, h: r.height });
      }
    }
  });
  if (!visible) return null;
  const margen = 12;
  const izquierda = x + margen + medida.w > ancho ? x - margen - medida.w : x + margen;
  const arriba = Math.max(0, y - medida.h / 2);
  return (
    <div ref={ref} role="status" style={{
      position: "absolute", left: Math.max(0, izquierda), top: arriba, zIndex: 3,
      pointerEvents: "none", minWidth: 140, maxWidth: 260,
      background: "var(--ds-panel)", border: "1px solid var(--ds-line-firm)",
      boxShadow: "var(--ds-lift-3)", borderRadius: "var(--ds-r-item)",
      padding: "10px 12px", fontFamily: "var(--ds-font)",
      transition: "left var(--ds-t-tap) var(--ds-ease-out), top var(--ds-t-tap) var(--ds-ease-out)",
    }}>
      {titulo && (
        <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, color: "var(--ds-ink-3)",
          letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>
          {titulo}
        </div>
      )}
      {renglones.map((r, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8,
          fontSize: "var(--ds-t-small)", lineHeight: 1.6 }}>
          {r.color && <Muestra color={r.color} />}
          <span style={{ color: "var(--ds-ink-2)", fontWeight: 600, flex: 1, minWidth: 0 }}>
            {r.nombre}
          </span>
          <span className="ds-num" style={{ color: "var(--ds-ink)", fontWeight: 700 }}>
            {r.valor}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Interruptor gráfica ↔ tabla. La tabla no es un extra: es la forma de leer
 * los valores exactos y la única que sirve a quien no distingue colores o
 * usa lector de pantalla.
 */
export function VistaTabla({ columnas, filas }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--ds-font)",
        fontSize: "var(--ds-t-small)" }}>
        <thead>
          <tr>
            {columnas.map((c, i) => (
              <th key={i} scope="col" style={{ textAlign: i === 0 ? "left" : "right",
                padding: "6px 8px", color: "var(--ds-ink-3)", fontWeight: 600,
                fontSize: "var(--ds-t-micro)", textTransform: "uppercase", letterSpacing: "0.05em",
                borderBottom: "1px solid var(--ds-line)", whiteSpace: "nowrap" }}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={i}>
              {f.map((v, j) => (
                <td key={j} className={j ? "ds-num" : undefined} style={{
                  textAlign: j === 0 ? "left" : "right", padding: "6px 8px",
                  color: j === 0 ? "var(--ds-ink-2)" : "var(--ds-ink)",
                  fontWeight: j === 0 ? 600 : 700, borderBottom: "1px solid var(--ds-line)",
                  whiteSpace: "nowrap" }}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Marco común de toda gráfica: botón «Ver tabla», leyenda y el contenido.
 * La gráfica pasa su `tabla` ({columnas, filas}) y el marco decide qué ver.
 */
export function MarcoGrafica({ titulo, series, formaLeyenda, tabla, children, estilo, alto }) {
  const [verTabla, setVerTabla] = useState(false);
  return (
    <figure style={{ margin: 0, minWidth: 0, ...estilo }} aria-label={titulo}>
      {(series?.length > 1 || tabla) && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--ds-3)" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {!verTabla && <Leyenda series={series || []} forma={formaLeyenda} />}
          </div>
          {tabla && (
            <button type="button" onClick={() => setVerTabla((v) => !v)}
              aria-pressed={verTabla}
              style={{ flexShrink: 0, border: "1px solid var(--ds-line-firm)",
                background: "transparent", color: "var(--ds-ink-2)", cursor: "pointer",
                fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-micro)", fontWeight: 600,
                padding: "4px 10px", borderRadius: "var(--ds-r-pill)", marginBottom: "var(--ds-3)" }}>
              {verTabla ? "Ver gráfica" : "Ver tabla"}
            </button>
          )}
        </div>
      )}
      {verTabla && tabla
        ? <div style={{ minHeight: alto }}><VistaTabla {...tabla} /></div>
        : children}
    </figure>
  );
}

/** Formatea con la convención del sistema (nombre o función). */
/** Texto que lee el lector de pantalla y no se ve (anuncios de la celda activa). */
export const SOLO_LECTOR = {
  position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden",
  clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0,
};

export const fmt = (v, formato, opciones) => formatear(v, formato, opciones);

/** Vacío de una gráfica: dice qué falta, no un lienzo en blanco. */
export function SinDatos({ alto = 160, texto = "Sin datos para este periodo." }) {
  return (
    <div style={{ height: alto, display: "flex", alignItems: "center", justifyContent: "center",
      border: "1px dashed var(--ds-line-firm)", borderRadius: "var(--ds-r-item)",
      color: "var(--ds-ink-3)", fontSize: "var(--ds-t-small)", fontWeight: 600,
      textAlign: "center", padding: "var(--ds-4)" }}>
      {texto}
    </div>
  );
}
