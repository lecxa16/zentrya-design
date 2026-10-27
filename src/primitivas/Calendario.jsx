/**
 * Calendario — el mes de un vistazo: entregas programadas, vencimientos de
 * facturas, citas, turnos, mantenimientos.
 *
 * La semana empieza en LUNES, como se trabaja en México y casi toda
 * Hispanoamérica; un calendario que empieza en domingo se lee corrido un día.
 *
 * Cada día muestra hasta `maxPorDia` eventos; los demás se resumen en
 * «+N más», que abre la lista completa de ese día. Encoger la letra para que
 * quepan todos sólo los vuelve ilegibles.
 *
 * En pantalla angosta la cuadrícula NO se aprieta (siete columnas en 375 px
 * son celdas de 40 px donde no se lee nada — trampa medida en GUIA.md):
 * cambia de FORMA a una lista de los días que tienen eventos.
 *
 * Fechas como texto «AAAA-MM-DD» y en hora local, para no correrse un día
 * por la zona horaria.
 *
 * Mes controlado (`mes="2026-10"` + `onCambioMes`) o libre (`mesInicial`).
 */
import React, { useMemo, useRef, useState } from "react";
import Flotante from "./Flotante";
import { useAngosto } from "../ancho";
import { fecha as fFecha } from "../formato";

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const TONOS = {
  neutro: ["var(--ds-surface-sunk)", "var(--ds-ink-3)"],
  acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)"],
  ok:     ["var(--ds-ok-soft)", "var(--ds-ok)"],
  aviso:  ["var(--ds-warn-soft)", "var(--ds-warn)"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)"],
};

const dos = (n) => String(n).padStart(2, "0");
const iso = (d) => `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`;
const deIso = (s) => { const [a, m, d] = s.split("-").map(Number); return new Date(a, m - 1, d || 1); };
const claveMes = (d) => `${d.getFullYear()}-${dos(d.getMonth() + 1)}`;

/** Un evento: barra de color a la izquierda (estado) y el texto en tinta. */
function Evento({ e, onEvento, compacto }) {
  const [fondo, borde] = TONOS[e.tono] || TONOS.acento;
  const cuerpo = (
    <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
      {e.hora && <span className="ds-num" style={{ fontWeight: 700, marginRight: 4 }}>{e.hora}</span>}
      {e.titulo}
    </span>
  );
  const estilo = {
    display: "block", width: "100%", textAlign: "left", minWidth: 0,
    background: fondo, color: "var(--ds-ink)",
    borderRadius: 6, padding: compacto ? "2px 6px" : "6px 10px",
    borderTop: "none", borderRight: "none", borderBottom: "none",
    borderLeft: `3px solid ${borde}`,
    fontFamily: "var(--ds-font)", fontSize: compacto ? "var(--ds-t-micro)" : "var(--ds-t-small)",
    fontWeight: 600, lineHeight: 1.35,
  };
  return onEvento ? (
    <button type="button" onClick={(ev) => { ev.stopPropagation(); onEvento(e); }}
      title={e.titulo} style={{ ...estilo, cursor: "pointer" }}>{cuerpo}</button>
  ) : <div title={e.titulo} style={estilo}>{cuerpo}</div>;
}

function MasEventos({ resto, dia, onEvento }) {
  const ref = useRef(null);
  const [abierto, setAbierto] = useState(false);
  return (
    <>
      <button ref={ref} type="button" aria-haspopup="dialog" aria-expanded={abierto}
        onClick={(ev) => { ev.stopPropagation(); setAbierto((v) => !v); }}
        style={{ background: "transparent", border: "none", padding: "1px 4px", cursor: "pointer",
          fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-micro)", fontWeight: 700,
          color: "var(--ds-accent-tinta)", textAlign: "left", borderRadius: 6 }}>
        +{resto.length} más
      </button>
      <Flotante ancla={ref} abierto={abierto} onCerrar={() => setAbierto(false)} rol="dialog"
        etiqueta={`Eventos del ${fFecha(dia, "larga")}`} minAncho={240}>
        <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, letterSpacing: "0.05em",
          textTransform: "uppercase", color: "var(--ds-ink-3)", padding: "4px 6px 8px" }}>
          {fFecha(dia, "larga")}
        </div>
        <div style={{ display: "grid", gap: 6, padding: "0 4px 4px" }}>
          {resto.map((e, i) => <Evento key={e.id ?? i} e={e} onEvento={onEvento} />)}
        </div>
      </Flotante>
    </>
  );
}

const botonNav = {
  border: "1px solid var(--ds-line-firm)", background: "var(--ds-surface)", color: "var(--ds-ink-2)",
  borderRadius: "var(--ds-r-pill)", cursor: "pointer", fontFamily: "var(--ds-font)",
  fontWeight: 600, fontSize: "var(--ds-t-small)", height: 34, minWidth: 34, padding: "0 12px",
  display: "inline-grid", placeItems: "center",
};

export default function Calendario({
  eventos = [], mes, mesInicial, onCambioMes, onDia, onEvento, maxPorDia = 3, hoy: hoyProp,
  vacio = "No hay eventos este mes.", estilo,
}) {
  const angosto = useAngosto(700);
  const hoy = hoyProp ? deIso(hoyProp) : new Date();
  const [mesLibre, setMesLibre] = useState(mesInicial || claveMes(hoy));
  const mesActual = mes || mesLibre;
  const primero = deIso(`${mesActual}-01`);

  const irA = (d) => {
    const k = claveMes(d);
    if (!mes) setMesLibre(k);
    onCambioMes?.(k);
  };

  const porDia = useMemo(() => {
    const m = new Map();
    eventos.forEach((e) => {
      if (!e.fecha) return;
      const k = String(e.fecha).slice(0, 10);
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(e);
    });
    return m;
  }, [eventos]);

  /* La cuadrícula arranca en el lunes de la semana del día 1 y cubre semanas
     completas: los días de los meses vecinos se ven, pero apagados. */
  const desplaz = (primero.getDay() + 6) % 7;
  const inicio = new Date(primero); inicio.setDate(1 - desplaz);
  const ultimo = new Date(primero.getFullYear(), primero.getMonth() + 1, 0);
  const semanas = Math.ceil((desplaz + ultimo.getDate()) / 7);
  const dias = Array.from({ length: semanas * 7 }, (_, i) => {
    const d = new Date(inicio); d.setDate(inicio.getDate() + i); return d;
  });

  const titulo = fFecha(primero, "mes");
  const cabecera = (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-2)", flexWrap: "wrap",
      marginBottom: "var(--ds-4)" }}>
      <h3 aria-live="polite" style={{ margin: 0, fontSize: "var(--ds-t-title)", fontWeight: 700,
        letterSpacing: "-0.03em", color: "var(--ds-ink)", marginRight: "auto",
        textTransform: "capitalize" }}>
        {titulo}
      </h3>
      <button type="button" style={botonNav} aria-label="Mes anterior"
        onClick={() => irA(new Date(primero.getFullYear(), primero.getMonth() - 1, 1))}>‹</button>
      <button type="button" style={botonNav} onClick={() => irA(hoy)}>Hoy</button>
      <button type="button" style={botonNav} aria-label="Mes siguiente"
        onClick={() => irA(new Date(primero.getFullYear(), primero.getMonth() + 1, 1))}>›</button>
    </div>
  );

  if (angosto) {
    const delMes = dias.filter((d) => d.getMonth() === primero.getMonth() && porDia.has(iso(d)));
    return (
      <div style={estilo}>
        {cabecera}
        {delMes.length === 0 && (
          <div style={{ color: "var(--ds-ink-3)", fontSize: "var(--ds-t-small)", fontWeight: 600,
            padding: "var(--ds-4) 0" }}>{vacio}</div>
        )}
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--ds-3)" }}>
          {delMes.map((d) => {
            const k = iso(d);
            const esHoy = k === iso(hoy);
            return (
              <li key={k} style={{ display: "grid", gridTemplateColumns: "52px 1fr", gap: "var(--ds-3)" }}>
                <button type="button" onClick={onDia ? () => onDia(k, porDia.get(k)) : undefined}
                  disabled={!onDia} aria-label={fFecha(k, "larga")}
                  style={{ border: "none", background: "transparent", padding: 0, textAlign: "center",
                    cursor: onDia ? "pointer" : "default", fontFamily: "var(--ds-font)" }}>
                  <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, textTransform: "uppercase",
                    color: esHoy ? "var(--ds-accent-tinta)" : "var(--ds-ink-3)" }}>
                    {DIAS[(d.getDay() + 6) % 7]}
                  </div>
                  <div className="ds-num" style={{ fontSize: "var(--ds-num-m)", fontWeight: 700, lineHeight: 1.1,
                    color: esHoy ? "var(--ds-accent-tinta)" : "var(--ds-ink)" }}>
                    {d.getDate()}
                  </div>
                </button>
                <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
                  {porDia.get(k).map((e, i) => <Evento key={e.id ?? i} e={e} onEvento={onEvento} />)}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  return (
    <div style={estilo}>
      {cabecera}
      {/* Sin roles de «grid»: un grid ARIA exige filas y navegación con
          flechas. Cada día con acción es un botón, y eso basta para teclado. */}
      <div role="group" aria-label={titulo} style={{ display: "grid",
        gridTemplateColumns: "repeat(7, minmax(0, 1fr))", border: "1px solid var(--ds-line)",
        borderRadius: "var(--ds-r-item)", overflow: "hidden" }}>
        {DIAS.map((d) => (
          <div key={d} aria-hidden style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600,
            letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ds-ink-3)",
            padding: "8px 10px", borderBottom: "1px solid var(--ds-line)", background: "var(--ds-surface-2)" }}>
            {d}
          </div>
        ))}
        {dias.map((d, i) => {
          const k = iso(d);
          const delMes = d.getMonth() === primero.getMonth();
          const esHoy = k === iso(hoy);
          const lista = porDia.get(k) || [];
          const visibles = lista.length > maxPorDia ? lista.slice(0, maxPorDia - 1) : lista;
          const resto = lista.slice(visibles.length);
          return (
            <div key={k}
              style={{
                minHeight: 104, padding: 6, minWidth: 0, display: "flex", flexDirection: "column", gap: 4,
                borderRight: (i + 1) % 7 ? "1px solid var(--ds-line)" : "none",
                borderBottom: i < dias.length - 7 ? "1px solid var(--ds-line)" : "none",
                background: delMes ? "transparent" : "var(--ds-surface-sunk)",
              }}>
              <button type="button" className="ds-num" disabled={!onDia}
                onClick={onDia ? () => onDia(k, lista) : undefined}
                aria-label={`${fFecha(k, "larga")}${lista.length ? `, ${lista.length} eventos` : ", sin eventos"}`}
                style={{
                alignSelf: "flex-start", fontSize: "var(--ds-t-small)", fontWeight: 700,
                border: "none", padding: 0, fontFamily: "var(--ds-font)",
                cursor: onDia ? "pointer" : "default",
                width: 26, height: 26, display: "grid", placeItems: "center", borderRadius: "var(--ds-r-pill)",
                background: esHoy ? "var(--ds-accent)" : "transparent",
                color: esHoy ? "var(--ds-ink-on-accent)" : delMes ? "var(--ds-ink)" : "var(--ds-ink-3)",
              }}>
                {d.getDate()}
              </button>
              {visibles.map((e, j) => <Evento key={e.id ?? j} e={e} onEvento={onEvento} compacto />)}
              {resto.length > 0 && <MasEventos resto={lista} dia={k} onEvento={onEvento} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
