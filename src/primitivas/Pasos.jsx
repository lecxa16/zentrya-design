/**
 * Pasos — un proceso y en qué paso va: compras (solicitud → aprobación →
 * orden → recepción → pago), un embarque, un alta de cliente, un onboarding.
 *
 * Cada paso dice su estado con ICONO y PALABRA, no sólo con color: una
 * palomita, un número, una cruz; y debajo «Hecho», «En curso», «Pendiente»,
 * «Con problema», «Omitido». Quien no distingue verde de rojo lee la palabra.
 *
 * Horizontal cabe cuando hay ancho y pocos pasos; en pantalla angosta la
 * horizontal NO se aprieta: pasa a vertical (es otra forma, no la misma más
 * chica — regla de GUIA.md). La vertical además tiene sitio para la fecha y
 * el responsable de cada paso, que en horizontal se recortarían.
 *
 * `onPaso` vuelve pulsables los pasos (por ejemplo, para abrir el detalle de
 * la aprobación). Sin él, la pieza sólo informa y no finge ser botón.
 */
import React from "react";
import { useAngosto } from "../ancho";
import { fecha as fFecha } from "../formato";

const ESTADOS = {
  hecho:     { palabra: "Hecho", fondo: "var(--ds-ok)", tinta: "var(--ds-ink-on-accent)", borde: "var(--ds-ok)", texto: "var(--ds-ink-2)" },
  actual:    { palabra: "En curso", fondo: "var(--ds-accent)", tinta: "var(--ds-ink-on-accent)", borde: "var(--ds-accent-trazo)", texto: "var(--ds-accent-tinta)" },
  pendiente: { palabra: "Pendiente", fondo: "var(--ds-surface-solid)", tinta: "var(--ds-ink-3)", borde: "var(--ds-line-firm)", texto: "var(--ds-ink-3)" },
  error:     { palabra: "Con problema", fondo: "var(--ds-risk)", tinta: "var(--ds-ink-on-accent)", borde: "var(--ds-risk)", texto: "var(--ds-ink)" },
  omitido:   { palabra: "Omitido", fondo: "var(--ds-surface-sunk)", tinta: "var(--ds-ink-3)", borde: "var(--ds-line-firm)", texto: "var(--ds-ink-3)" },
};

/* El texto de estado va en tinta (salvo «En curso», en acento, que pasa AA):
   el verde y el rojo de estado no llegan a 4.5:1 como texto chico sobre el
   lienzo claro. El color lo lleva la marca; la palabra, el significado. */
const ICONO = {
  hecho: <path d="M20 6L9 17l-5-5" />,
  error: <path d="M18 6L6 18M6 6l12 12" />,
  omitido: <path d="M5 12h14" />,
};

function Marca({ estado, numero, tamano = 30 }) {
  const e = ESTADOS[estado] || ESTADOS.pendiente;
  return (
    <span style={{
      width: tamano, height: tamano, flexShrink: 0, borderRadius: "var(--ds-r-pill)",
      background: e.fondo, color: e.tinta, border: `2px solid ${e.borde}`,
      display: "grid", placeItems: "center", fontSize: "var(--ds-t-small)", fontWeight: 700,
      boxShadow: estado === "actual" ? "0 0 0 4px var(--ds-accent-ring)" : "none",
      transition: "background var(--ds-t-state) var(--ds-ease)",
    }}>
      {ICONO[estado] ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {ICONO[estado]}
        </svg>
      ) : <span className="ds-num">{numero}</span>}
    </span>
  );
}

function Contenedor({ onPaso, paso, i, children, estilo }) {
  if (!onPaso) return <div style={estilo}>{children}</div>;
  return (
    <button type="button" onClick={() => onPaso(paso, i)}
      style={{ ...estilo, background: "transparent", border: "none", cursor: "pointer",
        font: "inherit", color: "inherit", textAlign: "inherit", padding: estilo?.padding ?? 0,
        borderRadius: "var(--ds-r-item)" }}>
      {children}
    </button>
  );
}

export default function Pasos({ pasos = [], orientacion = "horizontal", onPaso, estilo }) {
  const angosto = useAngosto();
  const vertical = orientacion === "vertical" || angosto;
  const descripcion = (p) => [
    p.fecha ? fFecha(p.fecha, "media") : null,
    p.responsable,
  ].filter(Boolean).join(" · ");

  if (vertical) {
    return (
      <ol style={{ listStyle: "none", margin: 0, padding: 0, ...estilo }}>
        {pasos.map((p, i) => {
          const e = ESTADOS[p.estado] || ESTADOS.pendiente;
          const ultimo = i === pasos.length - 1;
          return (
            <li key={p.id ?? i} aria-current={p.estado === "actual" ? "step" : undefined}
              style={{ display: "grid", gridTemplateColumns: "30px 1fr", columnGap: "var(--ds-3)" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Marca estado={p.estado} numero={i + 1} />
                {!ultimo && (
                  <span aria-hidden style={{ flex: 1, width: 2, minHeight: 16, margin: "4px 0",
                    borderRadius: 2,
                    background: p.estado === "hecho" ? "var(--ds-ok)" : "var(--ds-line-firm)" }} />
                )}
              </div>
              <Contenedor onPaso={onPaso} paso={p} i={i}
                estilo={{ display: "block", paddingBottom: ultimo ? 0 : "var(--ds-4)", minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: "var(--ds-ink)", lineHeight: "30px" }}>
                  {p.titulo}
                </div>
                <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, color: e.texto,
                  letterSpacing: "0.02em" }}>
                  {e.palabra}
                </div>
                {descripcion(p) && (
                  <div className="ds-num" style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)",
                    marginTop: 2 }}>
                    {descripcion(p)}
                  </div>
                )}
                {p.texto && (
                  <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", marginTop: 2 }}>
                    {p.texto}
                  </div>
                )}
              </Contenedor>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", ...estilo }}>
      {pasos.map((p, i) => {
        const e = ESTADOS[p.estado] || ESTADOS.pendiente;
        const ultimo = i === pasos.length - 1;
        return (
          <li key={p.id ?? i} aria-current={p.estado === "actual" ? "step" : undefined}
            style={{ flex: 1, minWidth: 0, position: "relative" }}>
            {/* El tramo que une con el siguiente sale del centro de la marca. */}
            {!ultimo && (
              <span aria-hidden style={{ position: "absolute", top: 14, left: "calc(50% + 21px)",
                right: "calc(-50% + 21px)", height: 2, borderRadius: 2,
                background: p.estado === "hecho" ? "var(--ds-ok)" : "var(--ds-line-firm)" }} />
            )}
            <Contenedor onPaso={onPaso} paso={p} i={i}
              estilo={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%",
                textAlign: "center", padding: "0 var(--ds-1)" }}>
              <Marca estado={p.estado} numero={i + 1} />
              <div style={{ fontWeight: 600, color: "var(--ds-ink)", marginTop: "var(--ds-2)",
                fontSize: "var(--ds-t-small)", lineHeight: 1.25 }}>
                {p.titulo}
              </div>
              <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, color: e.texto, marginTop: 2 }}>
                {e.palabra}
              </div>
              {descripcion(p) && (
                <div className="ds-num" style={{ fontSize: "var(--ds-t-micro)", color: "var(--ds-ink-3)",
                  marginTop: 2 }}>
                  {descripcion(p)}
                </div>
              )}
            </Contenedor>
          </li>
        );
      })}
    </ol>
  );
}
