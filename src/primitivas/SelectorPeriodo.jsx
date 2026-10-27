/**
 * SelectorPeriodo — el «¿de cuándo?» de todo tablero y reporte.
 *
 * Casi todas las consultas de negocio piden uno de nueve periodos, y
 * escribirlos a mano con dos `CampoFecha` cada vez es lento y se presta a
 * errores (el 31 de un mes de 30, el trimestre mal contado). Aquí se elige
 * con un clic y la pieza entrega el rango ya calculado:
 *
 *   onCambio({ clave, desde: "AAAA-MM-DD", hasta: "AAAA-MM-DD", etiqueta })
 *
 * «Este mes», «Este trimestre» y «Este año» abarcan el periodo de calendario
 * COMPLETO (del primer al último día), no «hasta hoy»: así el rango coincide
 * con el de un cierre o una declaración. Si una pantalla necesita «a la
 * fecha», recorta `hasta` con hoy — es su regla, no la del selector.
 *
 * Fechas como texto local (sin zona horaria): un `toISOString()` en México
 * después de las 18:00 ya es «mañana» y corre el rango un día.
 *
 * `fechaBase` fija el «hoy» (para pruebas y para ver periodos de otro
 * momento). `opciones` limita las claves disponibles.
 *
 * Para un rango libre, la pantalla pone dos `CampoFecha` junto al selector:
 * esta pieza resuelve los atajos, no reemplaza al calendario.
 */
import React, { useRef, useState } from "react";
import Flotante, { OpcionFlotante } from "./Flotante";
import { fecha as fFecha } from "../formato";

const dos = (n) => String(n).padStart(2, "0");
const iso = (d) => `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`;
const deIso = (s) => { const [a, m, d] = String(s).slice(0, 10).split("-").map(Number); return new Date(a, m - 1, d); };
const sumaDias = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

export const PERIODOS = [
  { clave: "hoy", etiqueta: "Hoy" },
  { clave: "ayer", etiqueta: "Ayer" },
  { clave: "7d", etiqueta: "Últimos 7 días" },
  { clave: "30d", etiqueta: "Últimos 30 días" },
  { clave: "mes", etiqueta: "Este mes" },
  { clave: "mesAnterior", etiqueta: "Mes anterior" },
  { clave: "trimestre", etiqueta: "Este trimestre" },
  { clave: "anio", etiqueta: "Este año" },
  { clave: "anioAnterior", etiqueta: "Año anterior" },
];

/** Rango de un periodo. Puro: se prueba sin montar nada. */
export function rangoPeriodo(clave, base = new Date()) {
  const hoy = base instanceof Date ? new Date(base.getFullYear(), base.getMonth(), base.getDate()) : deIso(base);
  const a = hoy.getFullYear();
  const m = hoy.getMonth();
  let desde;
  let hasta;
  switch (clave) {
    case "hoy": desde = hoy; hasta = hoy; break;
    case "ayer": desde = sumaDias(hoy, -1); hasta = desde; break;
    /* «Últimos 7 días» incluye hoy: hoy y los seis anteriores. */
    case "7d": desde = sumaDias(hoy, -6); hasta = hoy; break;
    case "30d": desde = sumaDias(hoy, -29); hasta = hoy; break;
    case "mes": desde = new Date(a, m, 1); hasta = new Date(a, m + 1, 0); break;
    case "mesAnterior": desde = new Date(a, m - 1, 1); hasta = new Date(a, m, 0); break;
    case "trimestre": {
      const q = Math.floor(m / 3) * 3;
      desde = new Date(a, q, 1); hasta = new Date(a, q + 3, 0); break;
    }
    case "anio": desde = new Date(a, 0, 1); hasta = new Date(a, 11, 31); break;
    case "anioAnterior": desde = new Date(a - 1, 0, 1); hasta = new Date(a - 1, 11, 31); break;
    default: return null;
  }
  const def = PERIODOS.find((p) => p.clave === clave);
  return { clave, desde: iso(desde), hasta: iso(hasta), etiqueta: def?.etiqueta ?? clave };
}

/** «1 oct 2026 – 31 oct 2026», o un solo día. */
export function textoRango(desde, hasta) {
  if (!desde) return "";
  return desde === hasta ? fFecha(desde, "media") : `${fFecha(desde, "media")} – ${fFecha(hasta, "media")}`;
}

export default function SelectorPeriodo({
  valor, onCambio, opciones, fechaBase, etiqueta = "Periodo", estilo,
}) {
  const ref = useRef(null);
  const [abierto, setAbierto] = useState(false);
  const base = fechaBase ?? new Date();
  const lista = PERIODOS.filter((p) => !opciones || opciones.includes(p.clave));
  const actual = valor ? rangoPeriodo(valor, base) : null;

  return (
    <>
      <button ref={ref} type="button" aria-haspopup="menu" aria-expanded={abierto}
        onClick={() => setAbierto((v) => !v)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8, maxWidth: "100%",
          height: 38, padding: "0 14px", borderRadius: "var(--ds-r-item)", cursor: "pointer",
          background: "var(--ds-surface)", border: "1px solid var(--ds-line-firm)",
          boxShadow: "var(--ds-lift-1)", fontFamily: "var(--ds-font)", color: "var(--ds-ink)",
          ...estilo,
        }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
          style={{ color: "var(--ds-ink-3)", flexShrink: 0 }}>
          <rect x="3" y="5" width="18" height="16" rx="3" /><path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
        <span style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, color: "var(--ds-ink-3)",
          textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {etiqueta}
        </span>
        <span style={{ fontSize: "var(--ds-t-small)", fontWeight: 700, whiteSpace: "nowrap",
          overflow: "hidden", textOverflow: "ellipsis" }}>
          {actual ? actual.etiqueta : "Elegir"}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
          style={{ color: "var(--ds-ink-3)", flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <Flotante ancla={ref} abierto={abierto} onCerrar={() => setAbierto(false)}
        etiqueta={etiqueta} minAncho={250}>
        {lista.map((p) => {
          const r = rangoPeriodo(p.clave, base);
          return (
            <OpcionFlotante key={p.clave} elegida={p.clave === valor}
              nota={textoRango(r.desde, r.hasta)}
              onClick={() => { setAbierto(false); onCambio?.(r); }}>
              {p.etiqueta}
            </OpcionFlotante>
          );
        })}
      </Flotante>
    </>
  );
}
