/**
 * Actividad — lo que ha pasado recientemente, y quién lo hizo.
 *
 * Distinta de `LineaTiempo`: ésa es la historia de UNA cosa (un pedido);
 * ésta es el movimiento de MUCHAS (todo lo que pasó hoy en compras). Por eso
 * aquí el protagonista es quién y qué, y se agrupa por día: «Hoy», «Ayer» y
 * luego la fecha.
 *
 * Cada evento: { id, actor, accion, objeto?, fecha, retrato?, icono?, tono?,
 * detalle? }. Se lee como una frase: «**Ana López** aprobó la orden OC-1042».
 * El actor va en negrita porque es lo primero que se busca.
 *
 * Con `icono` el evento lleva una Insignia (eventos del sistema, que no
 * tienen persona); si no, el Retrato con las iniciales del actor.
 *
 * La hora es relativa («hace 5 min») el mismo día, y exacta en días
 * anteriores: «hace 3 días» obliga a contar; «12:40» no.
 */
import React from "react";
import { Retrato } from "./Fila";
import { Insignia } from "./Pastilla";
import { fecha as fFecha, fechaRelativa } from "../formato";

const aDate = (f) => (f instanceof Date ? f
  : new Date(typeof f === "string" && f.length === 10 ? `${f}T00:00:00` : f));
const mismoDia = (a, b) => a.getFullYear() === b.getFullYear()
  && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

function nombreDia(d, ahora) {
  if (Number.isNaN(d.getTime())) return "Sin fecha";
  if (mismoDia(d, ahora)) return "Hoy";
  const ayer = new Date(ahora); ayer.setDate(ahora.getDate() - 1);
  if (mismoDia(d, ayer)) return "Ayer";
  return fFecha(d, "larga");
}

export default function Actividad({
  eventos = [], ahora: ahoraProp, agrupar = true, vacio = "Sin actividad reciente.", estilo,
}) {
  const ahora = ahoraProp ? aDate(ahoraProp) : new Date();
  if (eventos.length === 0) {
    return (
      <div style={{ color: "var(--ds-ink-3)", fontSize: "var(--ds-t-small)", fontWeight: 600,
        padding: "var(--ds-4) 0", ...estilo }}>
        {vacio}
      </div>
    );
  }

  let previo = null;
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, ...estilo }}>
      {eventos.map((e, i) => {
        const d = aDate(e.fecha);
        const grupo = agrupar ? nombreDia(d, ahora) : null;
        const encabezado = agrupar && grupo !== previo;
        previo = grupo;
        const valida = !Number.isNaN(d.getTime());
        const hoy = valida && mismoDia(d, ahora);
        const cuando = !valida ? "" : hoy ? fechaRelativa(d, ahora)
          : agrupar ? fFecha(d, "hora") : fFecha(d, "fechaHora");
        return (
          <React.Fragment key={e.id ?? i}>
            {encabezado && (
              <li style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, letterSpacing: "0.05em",
                textTransform: "uppercase", color: "var(--ds-ink-3)",
                padding: i === 0 ? "0 0 var(--ds-2)" : "var(--ds-4) 0 var(--ds-2)" }}>
                {grupo}
              </li>
            )}
            <li style={{ display: "flex", gap: "var(--ds-3)", alignItems: "flex-start",
              padding: "var(--ds-2) 0" }}>
              {e.icono
                ? <Insignia tono={e.tono || "neutro"} tamano={34}>{e.icono}</Insignia>
                : <Retrato nombre={e.actor || ""} src={e.retrato} tamano={34} tono="neutro" />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", lineHeight: 1.45 }}>
                  {e.actor && <strong style={{ color: "var(--ds-ink)", fontWeight: 700 }}>{e.actor}</strong>}
                  {e.actor ? " " : ""}{e.accion}
                  {e.objeto && <> <strong style={{ color: "var(--ds-ink)", fontWeight: 600 }}>{e.objeto}</strong></>}
                </div>
                {e.detalle && (
                  <div style={{ fontSize: "var(--ds-t-micro)", color: "var(--ds-ink-3)", marginTop: 2,
                    fontWeight: 600 }}>
                    {e.detalle}
                  </div>
                )}
              </div>
              {cuando && (
                <time className="ds-num" dateTime={valida ? d.toISOString() : undefined}
                  style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, color: "var(--ds-ink-3)",
                    whiteSpace: "nowrap", paddingTop: 2 }}>
                  {cuando}
                </time>
              )}
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
}
