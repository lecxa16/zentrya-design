/**
 * TarjetaEntidad — la ficha corta de algo con nombre: un cliente, un
 * proveedor, una unidad, un empleado, un almacén.
 *
 * Cada producto acaba haciendo su propia «tarjeta de cliente» con datos
 * distintos en lugares distintos. Ésta fija el orden: quién es (retrato o
 * iniciales, nombre, subtítulo), en qué estado está (pastilla con texto), dos
 * a cuatro cifras que lo resumen y lo que se puede hacer con él.
 *
 *   <TarjetaEntidad nombre="Transportes del Norte" subtitulo="RFC TNO010101AB1"
 *     estado={{ tono: "ok", texto: "Al corriente" }}
 *     metricas={[{ etiqueta: "Saldo", valor: 182000, formato: "moneda" }]}
 *     acciones={<Boton>Ver expediente</Boton>} />
 *
 * Una métrica sin valor se señala («Sin capturar»), no se rellena.
 */
import React from "react";
import Superficie from "./Superficie";
import { Retrato } from "./Fila";
import { Pastilla } from "./Pastilla";
import Esqueleto from "./Esqueleto";
import { formatear } from "../formato";

const falta = (v) => v === null || v === undefined || v === "";

export default function TarjetaEntidad({
  nombre, subtitulo, imagen, estado, metricas = [], acciones, onClick, cargando = false,
  estilo, entrada,
}) {
  const clicable = !!onClick;
  const lista = metricas.slice(0, 4);

  return (
    <Superficie entrada={entrada} interactiva={clicable}
      role={clicable ? "button" : undefined} tabIndex={clicable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={clicable ? (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(e); }
      } : undefined}
      estilo={{ height: "100%", display: "flex", flexDirection: "column", gap: "var(--ds-4)", ...estilo }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-3)", minWidth: 0 }}>
        {cargando ? <Esqueleto circulo alto={48} /> : <Retrato src={imagen} nombre={nombre || ""} tamano={48} />}
        <div style={{ flex: 1, minWidth: 0 }}>
          {cargando ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <Esqueleto alto={13} ancho="60%" /><Esqueleto alto={10} ancho="40%" />
            </div>
          ) : (
            <>
              <div style={{ fontWeight: 700, fontSize: "var(--ds-t-body)", letterSpacing: "-0.02em",
                color: "var(--ds-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {nombre}
              </div>
              {subtitulo && (
                <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {subtitulo}
                </div>
              )}
            </>
          )}
        </div>
        {estado && !cargando && <Pastilla tono={estado.tono}>{estado.texto}</Pastilla>}
      </div>

      {lista.length > 0 && (
        <div style={{ display: "grid", gap: "var(--ds-3)",
          gridTemplateColumns: `repeat(${Math.min(2, lista.length)}, minmax(0, 1fr))`,
          padding: "var(--ds-3)", borderRadius: "var(--ds-r-item)", background: "var(--ds-surface-sunk)" }}>
          {lista.map((m, i) => (
            <div key={m.etiqueta ?? i} style={{ minWidth: 0 }}>
              <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, letterSpacing: "0.05em",
                textTransform: "uppercase", color: "var(--ds-ink-3)" }}>{m.etiqueta}</div>
              {cargando ? <Esqueleto alto={16} ancho="70%" estilo={{ marginTop: 5 }} /> : falta(m.valor) ? (
                <div style={{ marginTop: 4 }}><Pastilla tono="aviso">Sin capturar</Pastilla></div>
              ) : (
                <div className="ds-num" style={{ fontWeight: 700, color: "var(--ds-ink)", marginTop: 2,
                  overflowWrap: "anywhere" }}>
                  {formatear(m.valor, m.formato || "texto", m.opciones)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {acciones && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}
          onClick={(e) => e.stopPropagation()}>
          {acciones}
        </div>
      )}
    </Superficie>
  );
}
