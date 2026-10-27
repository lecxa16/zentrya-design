/**
 * GraficaDestacada — una cifra y su historia, a la manera de las apps Salud y
 * Bolsa de Apple (v2.9, Carlos 2026-10-27).
 *
 * Arriba, el periodo (D / S / M / A); debajo, qué se mide, la cifra grande y
 * su fecha o rango; abajo, la línea. Al recorrer la gráfica —ratón, dedo o
 * flechas— la cifra de arriba enseña el valor de ese punto y su fecha, en vez
 * de un globo encima de la línea. Al soltar, vuelve al resumen.
 *
 *   <GraficaDestacada titulo="Patrimonio" formato="moneda" serie={{ nombre, valores }}
 *     etiquetas={meses} resumen="Hoy" detalle="Octubre de 2026"
 *     periodos={[{ valor: "m", texto: "M" }, …]} periodo={p} onPeriodo={setP} />
 *
 * Sin `valor`, el resumen es el último dato de la serie. El eje no arranca en
 * cero, como en Bolsa: lo que se lee aquí es la variación, no la proporción.
 */
import React, { useState } from "react";
import GraficaLinea from "./GraficaLinea";
import Segmentado from "../primitivas/Segmentado";
import { fmt } from "./base";

export default function GraficaDestacada({
  titulo, serie, etiquetas = [], formato = "numero", unidad, resumen, valor, detalle,
  periodos, periodo, onPeriodo, alto = 200, area = true, estilo,
}) {
  const [activo, setActivo] = useState(null);
  const valores = serie?.valores || [];
  const ultimo = [...valores].reverse().find((v) => v !== null && v !== undefined);
  const viendo = activo !== null && valores[activo] !== null && valores[activo] !== undefined;
  const cifra = viendo ? valores[activo] : valor ?? ultimo;

  return (
    <section aria-label={titulo} style={{
      background: "var(--ds-surface-solid)", border: "1px solid var(--ds-line)", borderRadius: 16,
      boxShadow: "var(--ds-lift-1)", padding: "var(--ds-4) var(--ds-5) var(--ds-5)", minWidth: 0, ...estilo,
    }}>
      {periodos?.length > 0 && (
        <Segmentado opciones={periodos} valor={periodo} onCambio={onPeriodo} tamano="s" pleno
          etiqueta={`Periodo de ${titulo}`} estilo={{ marginBottom: "var(--ds-4)" }} />
      )}
      <div style={{ fontSize: "var(--ds-t-small)", fontWeight: 600, color: "var(--ds-ink-2)" }}>
        {viendo ? titulo : resumen ? `${titulo} · ${resumen}` : titulo}
      </div>
      <div className="ds-num" style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 2 }}>
        <span style={{ fontSize: "var(--ds-num-l)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1,
          color: "var(--ds-ink)" }}>{cifra === undefined ? "—" : fmt(cifra, formato)}</span>
        {unidad && <span style={{ fontSize: "var(--ds-t-body)", fontWeight: 600, color: "var(--ds-ink-2)" }}>{unidad}</span>}
      </div>
      <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", minHeight: "1.4em", marginTop: 2 }}>
        {viendo ? etiquetas[activo] : detalle}
      </div>
      <GraficaLinea series={serie ? [serie] : []} etiquetas={etiquetas} formato={formato} area={area}
        alto={alto} titulo={titulo} onActivo={setActivo} globo={false} cero={false}
        estilo={{ marginTop: "var(--ds-3)" }} />
    </section>
  );
}
