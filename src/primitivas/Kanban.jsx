/**
 * Kanban — trabajo agrupado por etapa: un pipeline de ventas, órdenes de
 * compra, tickets de soporte, entregas del día, candidatos.
 *
 * Cada columna dice cuántas tarjetas tiene y, si las tarjetas traen valor,
 * cuánto suman: en un pipeline lo que importa no es «12 oportunidades» sino
 * «$1.4 M en negociación».
 *
 * Mover tiene DOS caminos y los dos hacen lo mismo (`onMover`):
 *   · arrastrar con el ratón (HTML5 drag and drop), y
 *   · el botón «Mover a…» de cada tarjeta, que abre la lista de columnas.
 * El segundo existe porque arrastrar no se puede con teclado, ni con lector
 * de pantalla, ni cómodamente en un teléfono. Un tablero que sólo se mueve
 * arrastrando deja fuera a quien no usa ratón.
 *
 * Sin `onMover` el tablero es de sólo lectura: nada se arrastra y no aparece
 * el botón. La pieza NO mueve la tarjeta por su cuenta: avisa, y la pantalla
 * decide (guardar en el servidor, pedir confirmación, rechazar). Un tablero
 * que se reordena solo y luego falla al guardar miente.
 *
 * Las columnas se desplazan en horizontal DENTRO del tablero: la página
 * nunca gana scroll lateral.
 */
import React, { useRef, useState } from "react";
import Flotante, { OpcionFlotante } from "./Flotante";
import { Pastilla } from "./Pastilla";
import { useAngosto } from "../ancho";
import { formatear } from "../formato";

function BotonMover({ tarjeta, columna, columnas, onMover }) {
  const ref = useRef(null);
  const [abierto, setAbierto] = useState(false);
  return (
    <>
      <button ref={ref} type="button" aria-haspopup="menu" aria-expanded={abierto}
        aria-label={`Mover «${tarjeta.titulo}» a otra columna`}
        onClick={(e) => { e.stopPropagation(); setAbierto((v) => !v); }}
        style={{ border: "1px solid var(--ds-line)", background: "transparent", cursor: "pointer",
          color: "var(--ds-ink-3)", fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-micro)",
          fontWeight: 600, padding: "3px 9px", borderRadius: "var(--ds-r-pill)", flexShrink: 0 }}>
        Mover a…
      </button>
      <Flotante ancla={ref} abierto={abierto} onCerrar={() => setAbierto(false)}
        etiqueta="Mover a columna" minAncho={190}>
        <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, letterSpacing: "0.05em",
          textTransform: "uppercase", color: "var(--ds-ink-3)", padding: "4px 10px 7px" }}>
          Mover a
        </div>
        {columnas.filter((c) => c.id !== columna.id).map((c) => (
          <OpcionFlotante key={c.id} rol="menuitem"
            onClick={() => { setAbierto(false); onMover(tarjeta, c.id, columna.id); }}>
            {c.titulo}
          </OpcionFlotante>
        ))}
      </Flotante>
    </>
  );
}

function TarjetaPorOmision({ tarjeta, formatoValor }) {
  return (
    <>
      <div style={{ fontWeight: 600, color: "var(--ds-ink)", fontSize: "var(--ds-t-small)",
        lineHeight: 1.3 }}>
        {tarjeta.titulo}
      </div>
      {tarjeta.subtitulo && (
        <div style={{ fontSize: "var(--ds-t-micro)", color: "var(--ds-ink-3)", marginTop: 2,
          fontWeight: 600 }}>
          {tarjeta.subtitulo}
        </div>
      )}
      {(tarjeta.valor !== undefined || tarjeta.etiquetas?.length > 0) && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
          marginTop: "var(--ds-2)" }}>
          {tarjeta.valor !== undefined && (
            <span className="ds-num" style={{ fontWeight: 700, color: "var(--ds-ink)",
              fontSize: "var(--ds-t-small)", marginRight: "auto" }}>
              {formatear(tarjeta.valor, formatoValor)}
            </span>
          )}
          {tarjeta.etiquetas?.map((et, i) => (
            <Pastilla key={i} tono={et.tono}>{et.texto}</Pastilla>
          ))}
        </div>
      )}
    </>
  );
}

export default function Kanban({
  columnas = [], onMover, onTarjeta, renderTarjeta, formatoValor = "moneda",
  anchoColumna = 280, vacioColumna = "Sin elementos en esta etapa.", estilo,
}) {
  const angosto = useAngosto();
  const [arrastrando, setArrastrando] = useState(null);
  const [sobre, setSobre] = useState(null);
  const movible = typeof onMover === "function";
  const ancho = angosto ? `min(${anchoColumna}px, 82vw)` : anchoColumna;

  return (
    <div role="list" aria-label="Tablero" style={{
      display: "flex", gap: "var(--ds-3)", overflowX: "auto", alignItems: "flex-start",
      /* minWidth 0: dentro de una celda flex o grid, sin esto el tablero
         empuja a su padre y el scroll pasa a la página. */
      minWidth: 0, maxWidth: "100%",
      paddingBottom: "var(--ds-2)", scrollSnapType: angosto ? "x mandatory" : undefined,
      ...estilo }}>
      {columnas.map((col) => {
        const tarjetas = col.tarjetas || [];
        const conValor = tarjetas.some((t) => t.valor !== undefined && t.valor !== null);
        const total = tarjetas.reduce((s, t) => s + (Number(t.valor) || 0), 0);
        const esDestino = sobre === col.id && arrastrando && arrastrando.origen !== col.id;
        return (
          <section key={col.id} role="listitem" aria-label={`${col.titulo}, ${tarjetas.length}`}
            onDragOver={movible ? (e) => { e.preventDefault(); if (sobre !== col.id) setSobre(col.id); } : undefined}
            onDragLeave={movible ? (e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setSobre(null);
            } : undefined}
            onDrop={movible ? (e) => {
              e.preventDefault();
              setSobre(null);
              const a = arrastrando;
              setArrastrando(null);
              if (!a || a.origen === col.id) return;
              const t = columnas.find((c) => c.id === a.origen)?.tarjetas?.find((x) => x.id === a.id);
              if (t) onMover(t, col.id, a.origen);
            } : undefined}
            style={{
              flex: "0 0 auto", width: ancho, scrollSnapAlign: "start",
              background: esDestino ? "var(--ds-accent-soft)" : "var(--ds-surface-sunk)",
              border: `1px ${esDestino ? "dashed" : "solid"} ${esDestino ? "var(--ds-accent-trazo)" : "var(--ds-line)"}`,
              borderRadius: "var(--ds-r-card)", padding: "var(--ds-3)",
              transition: "background var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease)",
            }}>
            <header style={{ display: "flex", alignItems: "baseline", gap: "var(--ds-2)",
              padding: "2px 4px var(--ds-3)" }}>
              <h3 style={{ margin: 0, fontSize: "var(--ds-t-small)", fontWeight: 700, color: "var(--ds-ink)",
                letterSpacing: "-0.01em", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis",
                whiteSpace: "nowrap" }}>
                {col.titulo}
              </h3>
              <span className="ds-num" style={{ fontSize: "var(--ds-t-micro)", fontWeight: 700,
                color: "var(--ds-ink-3)", background: "var(--ds-surface)", borderRadius: "var(--ds-r-pill)",
                padding: "1px 8px" }}>
                {tarjetas.length}
              </span>
              {conValor && (
                <span className="ds-num" style={{ marginLeft: "auto", fontSize: "var(--ds-t-micro)",
                  fontWeight: 600, color: "var(--ds-ink-2)", whiteSpace: "nowrap" }}>
                  {formatear(total, formatoValor === "moneda" ? "monedaCompacta" : formatoValor)}
                </span>
              )}
            </header>

            <div role="list" style={{ display: "grid", gap: "var(--ds-2)" }}>
              {tarjetas.length === 0 && (
                <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", fontWeight: 600,
                  textAlign: "center", padding: "var(--ds-5) var(--ds-3)",
                  border: "1px dashed var(--ds-line-firm)", borderRadius: "var(--ds-r-item)" }}>
                  {vacioColumna}
                </div>
              )}
              {tarjetas.map((t) => {
                const seMueve = arrastrando?.id === t.id;
                return (
                  <article key={t.id} role="listitem"
                    draggable={movible}
                    onDragStart={movible ? (e) => {
                      e.dataTransfer.effectAllowed = "move";
                      /* Firefox no inicia el arrastre sin datos. */
                      e.dataTransfer.setData("text/plain", String(t.id));
                      setArrastrando({ id: t.id, origen: col.id });
                    } : undefined}
                    onDragEnd={movible ? () => { setArrastrando(null); setSobre(null); } : undefined}
                    style={{
                      background: "var(--ds-surface-solid)", border: "1px solid var(--ds-line)",
                      borderRadius: "var(--ds-r-item)", padding: "var(--ds-3)",
                      boxShadow: "var(--ds-lift-1)", opacity: seMueve ? 0.45 : 1,
                      cursor: movible ? "grab" : undefined,
                      transition: "opacity var(--ds-t-state) var(--ds-ease)",
                    }}>
                    {onTarjeta ? (
                      <button type="button" onClick={() => onTarjeta(t, col)}
                        style={{ display: "block", width: "100%", textAlign: "left", background: "transparent",
                          border: "none", padding: 0, cursor: "pointer", font: "inherit", color: "inherit" }}>
                        {renderTarjeta ? renderTarjeta(t, col)
                          : <TarjetaPorOmision tarjeta={t} formatoValor={formatoValor} />}
                      </button>
                    ) : (renderTarjeta ? renderTarjeta(t, col)
                      : <TarjetaPorOmision tarjeta={t} formatoValor={formatoValor} />)}
                    {movible && columnas.length > 1 && (
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--ds-2)" }}>
                        <BotonMover tarjeta={t} columna={col} columnas={columnas} onMover={onMover} />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
