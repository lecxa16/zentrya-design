/**
 * FilaKpis — varios indicadores en UNA tira.
 *
 * Cinco tarjetas idénticas en fila son la estructura más gastada de un
 * tablero, y además compiten entre sí: cinco sombras, cinco bordes, ninguna
 * jerarquía. Aquí los indicadores comparten una sola superficie y se separan
 * con una línea de pelo; se leen como un renglón de resumen, no como cinco
 * objetos.
 *
 * En angosto pasa a dos columnas (y la línea se vuelve horizontal entre
 * renglones): seis cifras apretadas en 390 px caben pero no se leen.
 *
 *   <FilaKpis indicadores={[{ etiqueta, valor, formato, variacion, … }]} />
 *
 * Cada indicador acepta lo mismo que `TarjetaKpi` (sin `serie`: en una tira
 * la tendencia no tiene sitio para leerse).
 */
import React from "react";
import Superficie from "./Superficie";
import { CuerpoKpi } from "./TarjetaKpi";
import { useAngosto } from "../ancho";

export default function FilaKpis({ indicadores = [], cargando = false, estilo, entrada }) {
  const angosto = useAngosto();
  const n = Math.max(1, indicadores.length);
  const columnas = angosto ? Math.min(2, n) : n;

  return (
    <Superficie relleno="0" entrada={entrada} estilo={{ overflow: "hidden", ...estilo }}>
      <div role="list" style={{ display: "grid",
        gridTemplateColumns: `repeat(${columnas}, minmax(0, 1fr))` }}>
        {indicadores.map((ind, i) => {
          const col = i % columnas;
          const fila = Math.floor(i / columnas);
          return (
            <div role="listitem" key={ind.clave ?? ind.etiqueta ?? i} style={{
              padding: "var(--ds-4) var(--ds-5)", minWidth: 0,
              borderLeft: col > 0 ? "1px solid var(--ds-line)" : "none",
              borderTop: fila > 0 ? "1px solid var(--ds-line)" : "none",
            }}>
              <CuerpoKpi {...ind} serie={undefined} compacta cargando={cargando || ind.cargando} />
            </div>
          );
        })}
      </div>
    </Superficie>
  );
}
