/**
 * CampoClave — la contraseña, con lo que todo login necesita y casi nadie trae:
 *
 *   · mostrarla u ocultarla (un botón con `aria-pressed`, dentro de la caja);
 *   · avisar si Bloq Mayús está activado, que es la causa más común de «mi
 *     contraseña no entra». El aviso va en `ayuda` y se anuncia (`aria-live`).
 *
 * Mismo contrato que `Campo`. Arranca oculta y sólo se muestra mientras la
 * persona lo pide.
 */
import React, { useId, useState } from "react";
import Campo from "./Campo";

const OJO = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const OJO_TACHADO = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-2.6 3.5M6.1 6.1A17.4 17.4 0 0 0 2 12s3.6 7 10 7a10 10 0 0 0 5.9-1.9" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" />
  </svg>
);

export default function CampoClave({ ayuda, ...props }) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const [mayus, setMayus] = useState(false);
  const revisar = (e) => setMayus(Boolean(e.getModifierState?.("CapsLock")));

  return (
    <Campo {...props} id={id} tipo={visible ? "text" : "password"}
      autoCapitalize="off" autoCorrect="off" spellCheck={false}
      onKeyDown={revisar} onKeyUp={revisar}
      ayuda={mayus ? <span aria-live="polite">Bloq Mayús está activado.</span> : ayuda}
      adorno={(
        <button type="button" onClick={() => setVisible((v) => !v)} aria-controls={id}
          aria-pressed={visible} aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          style={{
            display: "grid", placeItems: "center", width: 38, height: 34, border: "none",
            borderRadius: "var(--ds-r-item)", background: "transparent", cursor: "pointer",
            color: "var(--ds-ink-3)",
          }}>
          {visible ? OJO_TACHADO : OJO}
        </button>
      )} />
  );
}
