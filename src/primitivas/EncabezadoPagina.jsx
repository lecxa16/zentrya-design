/**
 * EncabezadoPagina — la parte de arriba de cada pantalla: dónde estoy, qué
 * es esto y qué puedo hacer aquí.
 *
 * Todas las pantallas titulan igual —misma escala, mismo sitio para las
 * acciones— para que al cambiar de producto (finanzas, compras, logística)
 * la persona no tenga que volver a aprender dónde está el botón principal.
 *
 *   migas        la ruta (usa `Migas`; en angosto queda sólo «Volver a…»)
 *   titulo       el nombre de la pantalla: uno solo, sin eyebrow encima
 *   descripcion  una línea que dice para qué sirve, no lo que ya dice el título
 *   meta         datos de contexto junto al título: pastillas de estado,
 *                «Actualizado hace 5 min», el periodo
 *   acciones     a la derecha; en angosto bajan debajo del título en vez de
 *                apretarse contra él
 *
 * En el teléfono el título es grande (Large Title de Apple) y, cuando se sale
 * por arriba al hacer scroll, aparece compacto en la barra del Armazón (v2.9).
 */
import React, { useContext, useEffect, useRef } from "react";
import Migas from "./Migas";
import { useAngosto } from "../ancho";
import { TituloBarraCtx } from "../tituloBarra";
import { ALTO_CABECERA_MOVIL } from "../Armazon";

export default function EncabezadoPagina({
  titulo, descripcion, migas, meta, acciones, estilo,
}) {
  const angosto = useAngosto();
  const ponerEnBarra = useContext(TituloBarraCtx);
  const h1 = useRef(null);
  useEffect(() => {
    const el = h1.current;
    if (!angosto || !ponerEnBarra || !el || typeof IntersectionObserver === "undefined") return undefined;
    /* La barra tapa los primeros ALTO_CABECERA_MOVIL px: ahí el título ya «se fue». */
    const obs = new IntersectionObserver(([e]) => ponerEnBarra(e.isIntersecting ? null : titulo),
      { rootMargin: `-${ALTO_CABECERA_MOVIL}px 0px 0px 0px` });
    obs.observe(el);
    return () => { obs.disconnect(); ponerEnBarra(null); };
  }, [angosto, ponerEnBarra, titulo]);
  return (
    <header style={{ marginBottom: "var(--ds-6)", ...estilo }}>
      {migas?.length > 0 && <Migas ruta={migas} />}
      <div style={{
        display: "flex", gap: "var(--ds-4)",
        flexDirection: angosto ? "column" : "row",
        alignItems: angosto ? "stretch" : "flex-end",
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 ref={h1} style={{
            margin: 0, fontSize: angosto ? "var(--ds-t-display)" : "var(--ds-num-l)", fontWeight: 700,
            letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--ds-ink)",
            overflowWrap: "anywhere",
          }}>
            {titulo}
          </h1>
          {descripcion && (
            <p style={{ margin: "var(--ds-2) 0 0", fontSize: "var(--ds-t-body)", color: "var(--ds-ink-2)",
              maxWidth: "68ch", lineHeight: 1.5 }}>
              {descripcion}
            </p>
          )}
          {meta && (
            <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-2)", flexWrap: "wrap",
              marginTop: "var(--ds-3)", fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)",
              fontWeight: 600 }}>
              {meta}
            </div>
          )}
        </div>
        {acciones && (
          <div style={{ display: "flex", gap: "var(--ds-2)", flexWrap: "wrap", flexShrink: 0,
            justifyContent: angosto ? "flex-start" : "flex-end" }}>
            {acciones}
          </div>
        )}
      </div>
    </header>
  );
}
