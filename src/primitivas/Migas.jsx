/**
 * Migas — dónde estoy y cómo salgo.
 *
 * El «volver» apunta al PADRE en la jerarquía, no al historial del
 * navegador. `history.back()` parece más listo y es peor: quien llegó por un
 * enlace directo, desde el buscador o desde otro producto termina fuera de
 * la aplicación al pulsar «volver». El padre siempre existe y siempre es el
 * mismo, así que el destino es predecible — y por eso se puede nombrar:
 * «Volver al padrón» dice a dónde va, una flecha sola no.
 *
 * En pantalla angosta la ruta completa no cabe y no tiene sentido apretarla:
 * se queda sólo el volver, que es la parte accionable. La ruta informa; el
 * volver resuelve.
 */
import React, { useEffect, useState } from "react";
import { useAngosto } from "../ancho";

const SEPARADOR = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
    style={{ flexShrink: 0, opacity: 0.55 }}><path d="M9 18l6-6-6-6" /></svg>
);
const ATRAS = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
    style={{ flexShrink: 0 }}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
);


const enlace = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 600,
  background: "transparent", border: "none", padding: "4px 6px",
  borderRadius: 8, cursor: "pointer", color: "var(--ds-ink-3)",
  whiteSpace: "nowrap", maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis",
  transition: "color var(--ds-t-state) var(--ds-ease)",
};

export default function Migas({ ruta = [], estilo }) {
  const angosto = useAngosto();
  if (ruta.length === 0) return null;

  const actual = ruta[ruta.length - 1];
  const padre = ruta.length > 1 ? ruta[ruta.length - 2] : null;

  const Volver = padre && padre.ir ? (
    <button onClick={padre.ir} style={{ ...enlace, color: "var(--ds-ink-2)", fontWeight: 600 }}
      onMouseEnter={(ev) => { ev.currentTarget.style.color = "var(--ds-accent-tinta)"; }}
      onMouseLeave={(ev) => { ev.currentTarget.style.color = "var(--ds-ink-2)"; }}>
      {ATRAS} Volver a {padre.texto}
    </button>
  ) : null;

  /* Angosto: sólo el volver. Una ruta de cuatro niveles apretada en 390 px
     no se lee, y la parte que sirve es la que lleva a algún lado. */
  if (angosto) {
    return Volver ? (
      <div style={{ marginBottom: "var(--ds-3)", ...estilo }}>{Volver}</div>
    ) : null;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-3)",
      flexWrap: "wrap", marginBottom: "var(--ds-3)", ...estilo }}>
      {Volver}
      {Volver && (
        <span aria-hidden style={{ width: 1, height: 16,
          background: "var(--ds-line-firm)", opacity: 0.7 }} />
      )}
      <nav aria-label="Ruta">
        <ol style={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap",
          listStyle: "none", margin: 0, padding: 0 }}>
          {ruta.map((m, i) => {
            const ultima = i === ruta.length - 1;
            return (
              <li key={`${m.texto}-${i}`} style={{ display: "inline-flex", alignItems: "center",
                gap: 2, minWidth: 0 }}>
                {i > 0 && <span style={{ color: "var(--ds-ink-3)", display: "inline-flex" }}>{SEPARADOR}</span>}
                {ultima || !m.ir ? (
                  /* Sin `ir` es un grupo sin página propia: se nombra, no se enlaza. */
                  <span aria-current={ultima ? "page" : undefined} style={{ ...enlace, cursor: "default",
                    color: ultima ? "var(--ds-ink)" : "var(--ds-ink-3)", fontWeight: ultima ? 700 : 600 }}>
                    {m.texto}
                  </span>
                ) : (
                  <button onClick={m.ir} style={enlace}
                    onMouseEnter={(ev) => { ev.currentTarget.style.color = "var(--ds-ink)"; }}
                    onMouseLeave={(ev) => { ev.currentTarget.style.color = "var(--ds-ink-3)"; }}>
                    {m.texto}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {/* El título de la pantalla lo pone la pantalla; aquí sólo la ruta. */}
      <span style={{ flex: 1 }} />
      {actual?.accion}
    </div>
  );
}
