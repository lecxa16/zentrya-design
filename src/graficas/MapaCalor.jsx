/**
 * MapaCalor — dónde se concentra algo en una matriz.
 *
 * Ocupación de andenes por día y hora, ventas por sucursal y mes, incidencias
 * por ruta y semana. La pregunta es «¿cuándo / dónde se junta la carga?», y
 * una tabla de números no la contesta de un vistazo; una cuadrícula con la
 * rampa de magnitud sí.
 *
 *   · Un solo tono, de claro a oscuro, en cinco cubetas (ver rampa.jsx). La
 *     celda sin dato es otra cosa que la celda en cero y se pinta distinto.
 *   · Las celdas tienen un mínimo de ancho para seguir siendo tocables: si la
 *     matriz no cabe, se desplaza DENTRO de su tarjeta, nunca la página.
 *   · Se recorre con el teclado (flechas) desde la propia cuadrícula: una
 *     matriz de 7×24 con 168 paradas de tabulador no se puede usar.
 */
import React, { useRef, useState } from "react";
import { MarcoGrafica, Globo, SinDatos, fmt } from "./base";
import { rangoDe, cubeta, colorCubeta, LeyendaRampa } from "./rampa";

export default function MapaCalor({
  filas = [], columnas = [], valores = [], formato = "numero", celdaMinima = 28, altoCelda = 28,
  titulo, estilo,
}) {
  const caja = useRef(null);
  const [activo, setActivo] = useState(null); // [f, c]
  const plano = valores.flat();
  const rango = rangoDe(plano);
  const anchoEtiqueta = Math.min(140, Math.max(36, ...filas.map((f) => String(f).length * 7 + 12)));

  const valor = (f, c) => valores?.[f]?.[c];
  const posicion = (f, c) => ({
    x: anchoEtiqueta + (c + 0.5) * (caja.current ? (caja.current.scrollWidth - anchoEtiqueta) / Math.max(1, columnas.length) : celdaMinima),
    y: 22 + f * (altoCelda + 3),
  });

  const mover = (df, dc) => setActivo((a) => {
    const [f, c] = a || [0, 0];
    return [Math.max(0, Math.min(filas.length - 1, f + df)), Math.max(0, Math.min(columnas.length - 1, c + dc))];
  });
  const alTeclear = (e) => {
    const k = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key];
    if (k) { e.preventDefault(); mover(...k); }
    if (e.key === "Escape") setActivo(null);
  };

  const tabla = {
    columnas: ["", ...columnas],
    filas: filas.map((f, i) => [f, ...columnas.map((_, j) => fmt(valor(i, j), formato))]),
  };

  const p = activo ? posicion(...activo) : { x: 0, y: 0 };

  return (
    <MarcoGrafica titulo={titulo} tabla={rango ? tabla : null} estilo={estilo}>
      {!rango ? <SinDatos /> : (
        <>
          <div ref={caja} tabIndex={0} role="grid"
            aria-label={`${titulo ? `${titulo}: ` : ""}${filas.length} por ${columnas.length}. Flechas para recorrer.`}
            onKeyDown={alTeclear} onFocus={() => setActivo((a) => a || [0, 0])} onBlur={() => setActivo(null)}
            onMouseLeave={() => setActivo(null)}
            style={{ position: "relative", overflowX: "auto", paddingBottom: 4, outlineOffset: 2 }}>
            <div style={{ display: "grid", minWidth: anchoEtiqueta + columnas.length * celdaMinima,
              gridTemplateColumns: `${anchoEtiqueta}px repeat(${columnas.length}, minmax(${celdaMinima}px, 1fr))`,
              gap: 3 }}>
              <div />
              {columnas.map((c, j) => (
                <div key={j} style={{ fontSize: 11, fontWeight: 600, color: "var(--ds-ink-3)", textAlign: "center",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", height: 19 }}
                  title={String(c)}>
                  {columnas.length > 16 && j % 2 ? "" : c}
                </div>
              ))}
              {filas.map((f, i) => (
                <React.Fragment key={i}>
                  <div style={{ fontSize: "var(--ds-t-small)", fontWeight: 600, color: "var(--ds-ink-2)",
                    display: "flex", alignItems: "center", whiteSpace: "nowrap", overflow: "hidden",
                    textOverflow: "ellipsis", paddingRight: 6 }} title={String(f)}>
                    {f}
                  </div>
                  {columnas.map((_, j) => {
                    const es = activo && activo[0] === i && activo[1] === j;
                    return (
                      <div key={j} role="gridcell" aria-selected={!!es}
                        onMouseEnter={() => setActivo([i, j])}
                        style={{ height: altoCelda, borderRadius: "var(--ds-r-mini)", background: colorCubeta(cubeta(valor(i, j), rango)),
                          boxShadow: es ? "0 0 0 2px var(--ds-ink)" : "none",
                          transition: "box-shadow var(--ds-t-tap) var(--ds-ease-out)" }} />
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
            <Globo visible={!!activo} x={p.x} y={p.y} ancho={caja.current?.scrollWidth || 0}
              titulo={activo ? `${filas[activo[0]]} · ${columnas[activo[1]]}` : ""}
              renglones={activo ? [{ nombre: titulo || "Valor", valor: fmt(valor(...activo), formato) }] : []} />
          </div>
          <LeyendaRampa rango={rango} formato={formato} />
        </>
      )}
    </MarcoGrafica>
  );
}
