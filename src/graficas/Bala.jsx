/**
 * Bala — lo logrado contra la meta, con el contexto de qué es «bien».
 *
 * Entregas a tiempo 91 % contra meta 95 %; cobranza del mes contra
 * presupuesto; ocupación de flota. Un medidor circular gasta un cuadrado
 * entero para un número; la bala cabe en un renglón, se apila en lista y se
 * compara de un vistazo con las de abajo.
 *
 *   · La barra delgada es el real (acento). La marca vertical es la meta.
 *   · Las bandas del fondo dicen qué es malo, regular y bueno. Son grises a
 *     propósito: el juicio lo da la posición de la barra contra la meta, y
 *     tres colores de estado detrás de cada renglón convierten la lista en
 *     un semáforo que grita aunque todo vaya bien.
 *   · `menorEsMejor` invierte la lectura de las bandas (costos, días de
 *     cartera, mermas): la más oscura queda a la derecha.
 */
import React from "react";
import { MarcoGrafica, useMedida, SinDatos, fmt } from "./base";

/* Tres bandas, de la peor (más marcada) a la mejor (más tenue). */
const BANDAS = ["var(--ds-line-firm)", "var(--ds-esqueleto-brillo)", "var(--ds-surface-sunk)"];

function Renglon({ item, formato, angosto, anchoEtiqueta }) {
  const { etiqueta, valor, meta, rangos = [], menorEsMejor = false, nota } = item;
  const v = Number(valor);
  const tope = Math.max(...[...rangos, v, Number(meta)].filter(Number.isFinite), 1);
  const pct = (x) => `${Math.max(0, Math.min(100, (x / tope) * 100))}%`;
  const cortes = [0, ...rangos.slice(0, 2), tope];
  const bandas = menorEsMejor ? [...BANDAS].reverse() : BANDAS;
  const sinDato = !Number.isFinite(v);

  const pista = (
    <div style={{ position: "relative", height: 22, borderRadius: "var(--ds-r-mini)", overflow: "hidden", background: bandas[2] }}>
      {rangos.length > 0 && cortes.slice(0, -1).map((c, i) => (
        <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: pct(c),
          width: `calc(${pct(cortes[i + 1])} - ${pct(c)})`, background: bandas[i] }} />
      ))}
      {!sinDato && (
        <div style={{ position: "absolute", left: 0, top: "32%", height: "36%", width: pct(v),
          background: "var(--ds-accent-trazo)", borderRadius: "0 var(--ds-r-mini) var(--ds-r-mini) 0",
          transition: "width var(--ds-t-move) var(--ds-ease)" }} />
      )}
      {Number.isFinite(Number(meta)) && (
        <div style={{ position: "absolute", top: 3, bottom: 3, width: 3, borderRadius: "var(--ds-r-mini)",
          left: `calc(${pct(Number(meta))} - 1.5px)`, background: "var(--ds-ink)" }} />
      )}
    </div>
  );

  const cifras = (
    <div className="ds-num" style={{ textAlign: angosto ? "left" : "right", whiteSpace: "nowrap" }}>
      <span style={{ fontWeight: 700, color: "var(--ds-ink)" }}>{sinDato ? "Sin dato" : fmt(v, formato)}</span>
      {Number.isFinite(Number(meta)) && (
        <span style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, color: "var(--ds-ink-3)", marginLeft: 6 }}>
          meta {fmt(meta, formato)}
        </span>
      )}
    </div>
  );

  const texto = (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: "var(--ds-t-small)", fontWeight: 600, color: "var(--ds-ink-2)",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={etiqueta}>{etiqueta}</div>
      {nota && <div style={{ fontSize: "var(--ds-t-micro)", color: "var(--ds-ink-3)" }}>{nota}</div>}
    </div>
  );

  return (
    <li aria-label={`${etiqueta}: ${sinDato ? "sin dato" : fmt(v, formato)}${Number.isFinite(Number(meta)) ? `, meta ${fmt(meta, formato)}` : ""}`}>
      {angosto ? (
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>{texto}{cifras}</div>
          {pista}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: `${anchoEtiqueta}px 1fr auto`, alignItems: "center", gap: 14 }}>
          {texto}{pista}{cifras}
        </div>
      )}
    </li>
  );
}

export default function Bala({ items, item, formato = "numero", titulo, estilo }) {
  const [ref, ancho] = useMedida();
  const lista = items || (item ? [item] : []);
  const angosto = ancho > 0 && ancho < 460;
  const anchoEtiqueta = Math.min(180, Math.max(90, ancho * 0.26));
  const tabla = {
    columnas: ["", "Real", "Meta"],
    filas: lista.map((i) => [i.etiqueta, fmt(i.valor, formato), fmt(i.meta, formato)]),
  };
  return (
    <MarcoGrafica titulo={titulo} tabla={lista.length ? tabla : null} estilo={estilo}>
      <div ref={ref} style={{ minWidth: 0 }}>
        {!lista.length ? <SinDatos alto={100} /> : (
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: angosto ? 16 : 12 }}>
            {lista.map((i, k) => (
              <Renglon key={k} item={i} formato={formato} angosto={angosto} anchoEtiqueta={anchoEtiqueta} />
            ))}
          </ul>
        )}
      </div>
    </MarcoGrafica>
  );
}
