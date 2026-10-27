/**
 * LineaTiempo — el historial de algo: un pedido, un embarque, una factura,
 * un expediente.
 *
 * Responde «¿qué le ha pasado a esto y en qué va?». Por eso el evento
 * `actual` (o, si nadie lo dice, el más reciente) se resalta: es el que
 * explica el estado de hoy; los demás son contexto.
 *
 * Orden: el que traigan los eventos. La pieza no reordena — un historial de
 * auditoría se lee de viejo a nuevo y un feed de seguimiento de nuevo a
 * viejo, y sólo la pantalla sabe cuál es cuál.
 *
 * `agrupar` parte la lista por día con un encabezado: en un historial largo
 * la fecha repetida en cada renglón es ruido; una vez por día, orienta.
 *
 * Un evento sin fecha se muestra igual, con «Sin fecha»: esconderlo haría
 * pensar que no ocurrió.
 */
import React from "react";
import { fecha as fFecha, fechaRelativa } from "../formato";

const TONOS = {
  neutro: ["var(--ds-surface-solid)", "var(--ds-ink-3)", "var(--ds-line-firm)"],
  acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)", "var(--ds-accent-trazo)"],
  ok:     ["var(--ds-ok-soft)", "var(--ds-ok)", "var(--ds-ok)"],
  aviso:  ["var(--ds-warn-soft)", "var(--ds-warn)", "var(--ds-warn)"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)", "var(--ds-risk)"],
};

const claveDia = (f) => {
  if (!f) return "sin-fecha";
  const d = f instanceof Date ? f : new Date(typeof f === "string" && f.length === 10 ? `${f}T00:00:00` : f);
  if (Number.isNaN(d.getTime())) return "sin-fecha";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/* Con hora si la trae; sólo día si es una fecha pura. */
const tieneHora = (f) => !(typeof f === "string" && /^\d{4}-\d{2}-\d{2}$/.test(f));

export default function LineaTiempo({
  eventos = [], actual, agrupar = false, relativa = false, vacio = "Todavía no hay movimientos.",
  estilo,
}) {
  if (eventos.length === 0) {
    return (
      <div style={{ color: "var(--ds-ink-3)", fontSize: "var(--ds-t-small)", fontWeight: 600,
        padding: "var(--ds-4) 0", ...estilo }}>
        {vacio}
      </div>
    );
  }

  /* Si nadie dice cuál es el actual, es el de fecha más reciente — sin
     suponer el orden de la lista. `actual={null}` apaga el resalte. */
  const ms = (f) => {
    if (!f) return -Infinity;
    const d = new Date(typeof f === "string" && f.length === 10 ? `${f}T00:00:00` : f);
    return Number.isNaN(d.getTime()) ? -Infinity : d.getTime();
  };
  const iActual = actual === null ? -1
    : actual !== undefined ? eventos.findIndex((e, i) => (e.id ?? i) === actual)
      : eventos.reduce((m, e, i) => (ms(e.fecha) > ms(eventos[m]?.fecha) ? i : m), 0);

  let diaPrevio = null;
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0, ...estilo }}>
      {eventos.map((e, i) => {
        const esActual = i === iActual;
        const [fondo, tinta, linea] = TONOS[e.tono] || (esActual ? TONOS.acento : TONOS.neutro);
        const dia = claveDia(e.fecha);
        const encabezado = agrupar && dia !== diaPrevio;
        diaPrevio = dia;
        const ultimo = i === eventos.length - 1;
        const cuando = !e.fecha ? "Sin fecha"
          : relativa ? fechaRelativa(e.fecha)
            : agrupar ? (tieneHora(e.fecha) ? fFecha(e.fecha, "hora") : null)
              : fFecha(e.fecha, tieneHora(e.fecha) ? "fechaHora" : "media");
        return (
          <React.Fragment key={e.id ?? i}>
            {encabezado && (
              <li aria-hidden={false} style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600,
                letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ds-ink-3)",
                padding: i === 0 ? "0 0 var(--ds-2)" : "var(--ds-3) 0 var(--ds-2)" }}>
                {dia === "sin-fecha" ? "Sin fecha" : fFecha(e.fecha, "larga")}
              </li>
            )}
            <li aria-current={esActual ? "step" : undefined}
              style={{ display: "grid", gridTemplateColumns: "28px 1fr", columnGap: "var(--ds-3)" }}>
              {/* La columna del punto lleva también la línea que lo une con el
                  siguiente: así la línea no depende de medir alturas. */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{
                  width: esActual ? 24 : 18, height: esActual ? 24 : 18, marginTop: esActual ? 0 : 3,
                  flexShrink: 0, borderRadius: "var(--ds-r-pill)", background: fondo, color: tinta,
                  border: `2px solid ${linea}`, display: "grid", placeItems: "center",
                  boxShadow: esActual ? "0 0 0 4px var(--ds-accent-ring)" : "none",
                }}>
                  {e.icono}
                </span>
                {!ultimo && (
                  <span aria-hidden style={{ flex: 1, width: 2, minHeight: 14, marginTop: 4,
                    background: "var(--ds-line-firm)", borderRadius: 2 }} />
                )}
              </div>
              <div style={{ paddingBottom: ultimo ? 0 : "var(--ds-4)", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "var(--ds-2)",
                  flexWrap: "wrap" }}>
                  <span style={{ fontWeight: esActual ? 800 : 700, color: "var(--ds-ink)",
                    fontSize: "var(--ds-t-body)" }}>
                    {e.titulo}
                  </span>
                  {cuando && (
                    <span className="ds-num" style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600,
                      color: "var(--ds-ink-3)", whiteSpace: "nowrap" }}>
                      {cuando}
                    </span>
                  )}
                </div>
                {e.texto && (
                  <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", marginTop: 2 }}>
                    {e.texto}
                  </div>
                )}
                {e.actor && (
                  <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, color: "var(--ds-ink-3)",
                    marginTop: 3 }}>
                    {e.actor}
                  </div>
                )}
              </div>
            </li>
          </React.Fragment>
        );
      })}
    </ol>
  );
}
