/**
 * EstadoVacio — lo que se ve cuando no hay nada.
 *
 * El vacío es una pantalla más (GUIA §1), no un descuido. Dice tres cosas:
 * qué no hay, por qué puede ser («no hay órdenes con estos filtros» no es lo
 * mismo que «todavía no se ha capturado ninguna») y qué se puede hacer.
 *
 *   compacto   dentro de una tarjeta o una tabla
 *   normal     ocupa la página o una sección grande
 *
 * Sin fotos de archivo ni ilustraciones genéricas: un icono del sistema, si
 * acaso. La foto de stock junto a un vacío promete un producto que no es.
 *
 * A la manera de `ContentUnavailableView` de Apple (v2.9): icono grande sin
 * recuadro, título, una línea y las acciones, centrados y con aire. Sin borde
 * punteado: eso se lee como «suelta un archivo aquí».
 */
import React from "react";

export default function EstadoVacio({
  titulo = "Aún no hay nada aquí", children, acciones, icono, compacto = false, estilo,
}) {
  return (
    <div role="status" style={{
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      gap: compacto ? 6 : "var(--ds-2)",
      padding: compacto ? "var(--ds-6) var(--ds-4)" : "var(--ds-12) var(--ds-6)",
      ...estilo,
    }}>
      {icono && (
        <div aria-hidden style={{ display: "grid", placeItems: "center", color: "var(--ds-ink-3)", lineHeight: 1,
          fontSize: compacto ? 32 : 48, fontWeight: 300, marginBottom: compacto ? 2 : 6 }}>{icono}</div>
      )}
      <div style={{ fontWeight: 700, letterSpacing: "-0.015em", color: "var(--ds-ink)",
        fontSize: compacto ? "var(--ds-t-body)" : "var(--ds-t-title)" }}>
        {titulo}
      </div>
      {children && (
        <div style={{ fontSize: compacto ? "var(--ds-t-small)" : "var(--ds-t-body)", color: "var(--ds-ink-2)",
          maxWidth: 400, lineHeight: 1.45, textWrap: "pretty" }}>
          {children}
        </div>
      )}
      {acciones && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center",
          marginTop: compacto ? 4 : "var(--ds-2)" }}>
          {acciones}
        </div>
      )}
    </div>
  );
}
