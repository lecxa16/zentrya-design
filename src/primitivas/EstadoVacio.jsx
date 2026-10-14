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
 */
import React from "react";
import { Insignia } from "./Pastilla";

export default function EstadoVacio({
  titulo = "Aún no hay nada aquí", children, acciones, icono, compacto = false, estilo,
}) {
  return (
    <div role="status" style={{
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      gap: compacto ? "var(--ds-2)" : "var(--ds-3)",
      padding: compacto ? "var(--ds-6) var(--ds-4)" : "var(--ds-12) var(--ds-6)",
      border: "1px dashed var(--ds-line-firm)", borderRadius: compacto ? "var(--ds-r-item)" : "var(--ds-r-card)",
      ...estilo,
    }}>
      {icono && <Insignia tono="neutro" tamano={compacto ? 36 : 48}>{icono}</Insignia>}
      <div style={{ fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ds-ink)",
        fontSize: compacto ? "var(--ds-t-body)" : "var(--ds-t-title)" }}>
        {titulo}
      </div>
      {children && (
        <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", maxWidth: 420,
          lineHeight: 1.5 }}>
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
