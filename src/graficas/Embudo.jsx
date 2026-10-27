/**
 * Embudo — cuánto sobrevive de una etapa a la siguiente.
 *
 * Prospectos → cotizaciones → pedidos → cobrados; solicitudes → entrevistas
 * → contratados; requisiciones → órdenes → recibidas. Lo que importa no es el
 * tamaño de cada etapa sino DÓNDE se pierde la gente: por eso cada renglón
 * dice su conversión contra la etapa anterior (dónde está la fuga) y contra
 * la primera (cuánto llega al final).
 *
 * Las etapas usan la rampa de magnitud, de la más oscura a la más clara: es
 * un orden, no categorías distintas, y la rampa lo dice sin inventar seis
 * colores. El largo de la barra es proporcional a su valor, centrada para
 * que se lea como embudo.
 *
 * En angosto la etiqueta y las cifras suben encima de la barra en vez de
 * apretarse a los lados.
 */
import React from "react";
import { MarcoGrafica, useMedida, SinDatos, fmt } from "./base";
import { porcentaje } from "../formato";

/* Pasos de la rampa ordinal: el más claro (2) sigue separándose del lienzo. */
const RAMPA = [5, 4, 3, 2];
const paso = (i, n) => RAMPA[n <= 1 ? 0 : Math.round((i / (n - 1)) * (RAMPA.length - 1))];

export default function Embudo({ etapas = [], formato = "numero", titulo, estilo }) {
  const [ref, ancho] = useMedida();
  const validas = etapas.filter((e) => Number.isFinite(Number(e.valor)));
  const max = Math.max(0, ...validas.map((e) => Number(e.valor)));
  const primero = Number(validas[0]?.valor);
  const angosto = ancho > 0 && ancho < 460;

  const tabla = {
    columnas: ["Etapa", "Valor", "vs anterior", "vs inicio"],
    filas: validas.map((e, i) => [
      e.etiqueta, fmt(e.valor, formato),
      i === 0 ? "—" : porcentaje(Number(validas[i - 1].valor) ? Number(e.valor) / Number(validas[i - 1].valor) : null),
      i === 0 ? "—" : porcentaje(primero ? Number(e.valor) / primero : null),
    ]),
  };

  return (
    <MarcoGrafica titulo={titulo} tabla={max > 0 ? tabla : null} estilo={estilo}>
      <div ref={ref} style={{ minWidth: 0 }}>
        {max <= 0 ? <SinDatos /> : (
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: angosto ? 12 : 6 }}>
            {validas.map((e, i) => {
              const v = Number(e.valor);
              const anterior = i > 0 ? Number(validas[i - 1].valor) : null;
              const vsAnt = anterior ? v / anterior : null;
              const vsIni = primero ? v / primero : null;
              const barra = (
                <div style={{ height: 30, display: "flex", justifyContent: "center",
                  background: "var(--ds-surface-sunk)", borderRadius: "var(--ds-r-item)", overflow: "hidden" }}>
                  <div style={{ width: `${Math.max(1.5, (v / max) * 100)}%`, height: "100%",
                    background: `var(--ds-sec-${paso(i, validas.length)})`, borderRadius: "var(--ds-r-item)",
                    transition: "width var(--ds-t-move) var(--ds-ease)" }} />
                </div>
              );
              const cifras = (
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, justifyContent: angosto ? "flex-start" : "flex-end", flexWrap: "wrap" }}>
                  <span className="ds-num" style={{ fontWeight: 700, color: "var(--ds-ink)", fontSize: "var(--ds-t-body)" }}>
                    {fmt(v, formato)}
                  </span>
                  {i > 0 && (
                    <span className="ds-num" style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, color: "var(--ds-ink-3)", whiteSpace: "nowrap" }}>
                      {porcentaje(vsAnt)} de la anterior · {porcentaje(vsIni)} del inicio
                    </span>
                  )}
                </div>
              );
              const etiqueta = (
                <div style={{ fontSize: "var(--ds-t-small)", fontWeight: 600, color: "var(--ds-ink-2)",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={e.etiqueta}>
                  {e.etiqueta}
                </div>
              );
              return (
                <li key={i} aria-label={`${e.etiqueta}: ${fmt(v, formato)}${i > 0 ? `, ${porcentaje(vsAnt)} de la etapa anterior` : ""}`}>
                  {angosto ? (
                    <div style={{ display: "grid", gap: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                        {etiqueta}{cifras}
                      </div>
                      {barra}
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "minmax(90px, 22%) 1fr minmax(150px, 28%)",
                      alignItems: "center", gap: 14 }}>
                      {etiqueta}{barra}{cifras}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </MarcoGrafica>
  );
}
