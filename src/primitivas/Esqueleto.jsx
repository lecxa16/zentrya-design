/**
 * Esqueleto — la espera con la forma de lo que viene.
 *
 * Un spinner dice «espera» y nada más; al llegar los datos la página salta
 * porque nadie reservó el sitio. El esqueleto reserva ese sitio y adelanta
 * la forma, así que la llegada no mueve nada.
 *
 * Sólo sirve cuando la forma se conoce de antemano. Para una espera de
 * forma desconocida sigue estando `Cargando`.
 *
 * `prefers-reduced-motion` apaga el brillo globalmente desde `tokens.css`:
 * ahí se queda como un bloque quieto, que sigue reservando el sitio.
 */
import React from "react";

export default function Esqueleto({
  alto = 14, ancho = "100%", radio = 7, circulo = false, estilo,
}) {
  const lado = circulo ? alto : undefined;
  return (
    <span aria-hidden style={{
      display: "block", flexShrink: 0,
      width: circulo ? lado : ancho,
      height: alto,
      borderRadius: circulo ? "var(--ds-r-pill)" : radio,
      /* El pulso suave de iOS (v2.9), no un barrido: lo que carga respira. */
      background: "var(--ds-esqueleto)",
      animation: "ds-pulso 1.6s ease-in-out infinite alternate",
      ...estilo,
    }} />
  );
}

/**
 * La espera de una lista de personas: retrato, nombre y una línea debajo.
 * Es la forma que más se repite en este producto.
 */
export function EsqueletoFila({ retrato = true, lineas = 2, derecha = true }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-3)",
      padding: "var(--ds-3) var(--ds-4)" }}>
      {retrato && <Esqueleto circulo alto={40} />}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 7 }}>
        <Esqueleto alto={12} ancho="42%" />
        {lineas > 1 && <Esqueleto alto={10} ancho="26%" />}
      </div>
      {derecha && <Esqueleto alto={12} ancho={78} />}
    </div>
  );
}

/** Varias filas seguidas, con anchos que varían para que no parezca una reja. */
export function EsqueletoLista({ filas = 5, ...resto }) {
  return (
    <div>
      {Array.from({ length: filas }, (_, i) => (
        <div key={i} style={{ opacity: 1 - i * 0.12 }}>
          <EsqueletoFila {...resto} />
        </div>
      ))}
    </div>
  );
}
