/**
 * Detalles — la lista de «campo: valor» de un expediente.
 *
 * El encabezado de una orden de compra, los datos fiscales de un cliente, la
 * ficha de un vehículo: siempre es una lista de etiquetas con su valor. Va en
 * `<dl>` (lo que es, semánticamente) y en 1 a 3 columnas.
 *
 * Un dato que falta se SEÑALA con «Sin capturar», nunca se deja vacío ni se
 * rellena: un hueco en blanco no se distingue de un dato que no cargó, y un
 * valor inventado termina en un documento oficial.
 *
 *   <Detalles columnas={2} elementos={[
 *     { etiqueta: "RFC", valor: "ABC010101XY2", copiable: true },
 *     { etiqueta: "Límite de crédito", valor: 500000, formato: "moneda" },
 *     { etiqueta: "Dirección fiscal", valor: "…", ancho: 2 },
 *   ]} />
 *
 * `copiable` agrega un botón para copiar el valor (folios, RFC, CLABE, UUID)
 * que confirma con texto, no sólo con un icono.
 */
import React, { useState } from "react";
import { Pastilla } from "./Pastilla";
import { formatear } from "../formato";
import { useAngosto } from "../ancho";

const falta = (v) => v === null || v === undefined || v === "";

function Copiar({ texto, etiqueta }) {
  const [hecho, setHecho] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(String(texto));
      setHecho(true);
      setTimeout(() => setHecho(false), 1600);
    } catch (e) { /* sin portapapeles (http, permisos): el valor sigue seleccionable */ }
  };
  return (
    <button type="button" onClick={copiar} aria-label={`Copiar ${etiqueta}`}
      style={{ border: "1px solid var(--ds-line-firm)", background: "transparent",
        color: hecho ? "var(--ds-ok)" : "var(--ds-ink-2)", cursor: "pointer",
        fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-micro)", fontWeight: 600,
        padding: "2px 8px", borderRadius: "var(--ds-r-pill)", flexShrink: 0 }}>
      <span aria-live="polite">{hecho ? "Copiado" : "Copiar"}</span>
    </button>
  );
}

export default function Detalles({ elementos = [], columnas = 2, estilo }) {
  const angosto = useAngosto(560);
  const cols = angosto ? 1 : Math.max(1, Math.min(3, columnas));

  return (
    <dl style={{ margin: 0, display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      columnGap: "var(--ds-6)", rowGap: "var(--ds-4)", ...estilo }}>
      {elementos.map((e, i) => {
        const vacio = falta(e.valor);
        const texto = vacio ? null
          : (React.isValidElement(e.valor) ? e.valor : formatear(e.valor, e.formato || "texto", e.opciones));
        return (
          <div key={e.etiqueta ?? i} style={{ minWidth: 0,
            gridColumn: `span ${Math.min(cols, e.ancho || 1)}` }}>
            <dt style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, letterSpacing: "0.05em",
              textTransform: "uppercase", color: "var(--ds-ink-3)" }}>
              {e.etiqueta}
            </dt>
            <dd style={{ margin: "4px 0 0", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              {vacio ? (
                <Pastilla tono="aviso">Sin capturar</Pastilla>
              ) : (
                <>
                  <span className={e.formato && e.formato !== "texto" ? "ds-num" : undefined}
                    style={{ fontWeight: 600, color: "var(--ds-ink)", overflowWrap: "anywhere",
                      minWidth: 0 }}>
                    {texto}
                  </span>
                  {e.copiable && <Copiar texto={e.valor} etiqueta={e.etiqueta} />}
                </>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
