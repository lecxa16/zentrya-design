/**
 * Barras — serie vertical con estado.
 *
 * Cada barra tiene su pista detrás: así se lee lo logrado contra lo posible,
 * no sólo un valor suelto. Las barras entran creciendo desde la base, una
 * tras otra, con el retraso total acotado: es un gráfico, no una intro.
 *
 * `alto="auto"` hace que ocupe todo el alto y ancho que le den. Una gráfica
 * de tamaño fijo dentro de una tarjeta que crece deja un hueco debajo, y ese
 * hueco se lee como un recorte, no como espacio.
 */
import React from "react";

export default function Barras({
  datos = [], alto = 132, tono = "var(--ds-accent-trazo)",
  pista = "var(--ds-surface-sunk)", ancho = 7, hueco = 5, animar = true, ejeX = false,
}) {
  const llena = alto === "auto";
  const max = Math.max(1, ...datos.map((d) => d.total ?? d.valor ?? 0));

  /* Al llenar, cada columna reparte el ancho disponible y sólo se limita
     para que seis barras en una tarjeta ancha no se vuelvan bloques. */
  const columna = llena
    ? { flex: "1 1 0", minWidth: 0, maxWidth: ancho * 2 }
    : { width: ancho, flexShrink: 0 };
  /* Una barra ancha con radio de píldora deja de ser barra y es una cápsula.
     Al llenar, el redondeo baja al de cualquier pieza interior. */
  const radio = llena ? "var(--ds-r-item)" : 99;

  return (
    <div style={{ display: "flex", flexDirection: "column",
      height: llena ? "100%" : undefined, minHeight: 0 }}>

      <div style={{ display: "flex", alignItems: "flex-end", gap: hueco,
        justifyContent: "space-between",
        ...(llena ? { flex: 1, minHeight: 72 } : { height: alto }) }}
        role="img" aria-label={`Serie de ${datos.length} valores`}>
        {datos.map((d, i) => {
          const total = d.total ?? d.valor ?? 0;
          const valor = d.valor ?? 0;
          /* En porcentaje, no en píxeles: así la barra sigue al contenedor. */
          const pTotal = (total / max) * 100;
          const pValor = (valor / max) * 100;
          return (
            <div key={i} title={d.etiqueta}
              style={{ position: "relative", height: "100%", ...columna }}>
              <div style={{ position: "absolute", inset: "auto 0 0 0",
                height: `max(3px, ${pTotal}%)`, background: pista, borderRadius: radio }} />
              <div style={{
                position: "absolute", inset: "auto 0 0 0",
                height: valor > 0 ? `max(3px, ${pValor}%)` : 0,
                background: d.tono || tono, borderRadius: radio, transformOrigin: "bottom",
                ...(animar ? {
                  animation: "ds-grow var(--ds-t-move) var(--ds-ease) both",
                  animationDelay: `${Math.min(i * 22, 300)}ms`,
                } : null),
              }} />
            </div>
          );
        })}
      </div>

      {/* El eje comparte el mismo ancho y hueco que las barras: una etiqueta
          que no cae debajo de su barra no es un eje, es texto suelto. */}
      {ejeX && (
        <div style={{ display: "flex", gap: hueco, marginTop: 8, flexShrink: 0,
          justifyContent: "space-between" }}>
          {datos.map((d, i) => (
            <div key={i} style={{
              ...columna, textAlign: "center",
              fontSize: "var(--ds-t-micro)", fontWeight: 600, color: "var(--ds-ink-3)",
            }}>
              {d.eje ?? ""}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
