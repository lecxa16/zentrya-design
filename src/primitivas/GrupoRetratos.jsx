/**
 * GrupoRetratos — varias personas en el espacio de una.
 *
 * Responsables de una orden, participantes de una ruta, el equipo de una
 * cuenta. Se enciman un poco y un «+N» resume el resto: cuántos son importa
 * más que ver a todos. El nombre completo de todos queda en `title` y en la
 * etiqueta accesible, no se pierde.
 *
 *   <GrupoRetratos personas={[{ nombre, imagen }]} maximo={4} />
 */
import React from "react";
import { Retrato } from "./Fila";

export default function GrupoRetratos({ personas = [], maximo = 4, tamano = 32, generico = false, figura = false, estilo }) {
  const visibles = personas.slice(0, maximo);
  const resto = personas.length - visibles.length;
  const nombres = personas.map((p) => p.nombre).filter(Boolean).join(", ");

  return (
    <div role="img" aria-label={`${personas.length} personas: ${nombres}`} title={nombres}
      style={{ display: "inline-flex", alignItems: "center", ...estilo }}>
      {visibles.map((p, i) => (
        <div key={p.clave ?? p.nombre ?? i} style={{
          marginLeft: i ? -tamano * 0.28 : 0, borderRadius: 99,
          boxShadow: "0 0 0 2px var(--ds-surface-solid)", position: "relative", zIndex: maximo - i,
        }}>
          <Retrato src={p.imagen} nombre={p.nombre || ""} tamano={tamano} tono={i % 2 ? "neutro" : "acento"} generico={generico} figura={figura} />
        </div>
      ))}
      {resto > 0 && (
        <div className="ds-num" style={{
          marginLeft: -tamano * 0.28, width: tamano, height: tamano, borderRadius: 99,
          background: "var(--ds-retrato-neutro)", color: "var(--ds-ink-2)",
          boxShadow: "0 0 0 2px var(--ds-surface-solid)", display: "flex",
          alignItems: "center", justifyContent: "center", fontSize: tamano * 0.34, fontWeight: 800,
        }}>
          +{resto}
        </div>
      )}
    </div>
  );
}
