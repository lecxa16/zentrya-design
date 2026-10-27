/**
 * EntradaCuenta — el formulario de inicio de sesión, a la manera de Apple
 * (Carlos, 2026-10-27). Va dentro de `PantallaAcceso`.
 *
 * Un solo grupo de campos: primero el correo, con una flecha dentro del
 * campo; al continuar se despliega la contraseña debajo, en el mismo grupo, y
 * la flecha pasa a ella. Las etiquetas viven dentro del campo y suben al
 * escribir: aquí sí, porque son dos campos que todo mundo reconoce (en un
 * expediente de 40 datos, `Campo` las deja fuera a propósito).
 *
 *   <EntradaCuenta onEntrar={({ correo, clave, recordar }) => …} esperando={…}
 *     error={mensaje} recordar enlaces={<a …>¿Olvidaste tu contraseña?</a>} />
 *
 * - `error`: el texto del fallo (lo dice debajo, con role="alert"). Cada error
 *   nuevo vacía la contraseña y le regresa el foco, como Apple.
 * - `recordar`: muestra «Mantener la sesión iniciada»; su valor llega en
 *   `onEntrar`. Sin él, no se pinta.
 * - Si el gestor de contraseñas llena las dos de golpe, la contraseña se
 *   despliega sola.
 */
import React, { useEffect, useId, useRef, useState } from "react";
import { Giro } from "./primitivas/Boton";

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CSS = `
.ds-entrada-fila { position: relative; background: var(--ds-surface-solid);
  border: 1px solid var(--ds-ink-3); transition: border-color var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease); }
.ds-entrada-fila:focus-within { z-index: 1; border-color: var(--ds-accent-trazo);
  box-shadow: 0 0 0 1px var(--ds-accent-trazo), 0 0 0 5px var(--ds-accent-ring); }
.ds-entrada-fila[data-error="si"] { border-color: var(--ds-risk); }
.ds-entrada-fila[data-error="si"]:focus-within { border-color: var(--ds-risk);
  box-shadow: 0 0 0 1px var(--ds-risk), 0 0 0 5px color-mix(in srgb, var(--ds-risk) 22%, transparent); }
.ds-entrada-fila input { display: block; width: 100%; box-sizing: border-box; height: 56px; margin: 0;
  padding: 22px 56px 6px 16px; border: 0; outline: 0; background: transparent;
  font-family: inherit; font-size: 17px; font-weight: 400; line-height: 1.2; color: var(--ds-ink); letter-spacing: -0.01em; }
.ds-entrada-fila input::placeholder { color: transparent; }
.ds-entrada-fila label { position: absolute; left: 17px; top: 50%; transform: translateY(-50%);
  font-size: 17px; color: var(--ds-ink-3); pointer-events: none; transform-origin: left center;
  transition: top var(--ds-t-move) var(--ds-ease), transform var(--ds-t-move) var(--ds-ease), font-size var(--ds-t-move) var(--ds-ease); }
.ds-entrada-fila input:focus + label, .ds-entrada-fila input:not(:placeholder-shown) + label {
  top: 9px; transform: none; font-size: 12px; }
.ds-entrada-flecha { position: absolute; right: 12px; top: 50%; translate: 0 -50%;
  display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border-radius: 50%;
  border: 1.5px solid var(--ds-ink-3); background: transparent; color: var(--ds-ink-3); cursor: pointer;
  transition: color var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease); }
.ds-entrada-flecha[data-listo="si"] { border-color: var(--ds-ink); color: var(--ds-ink); }
.ds-entrada-flecha[data-listo="si"]:hover { background: var(--ds-ink); color: var(--ds-surface-solid); }
.ds-entrada-flecha:disabled { cursor: default; }
.ds-entrada-pliegue { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 420ms var(--ds-ease); }
.ds-entrada-pliegue[data-abierto="si"] { grid-template-rows: 1fr; }
/* Recorta sólo mientras se despliega: abierto, el anillo de foco y el borde de error salen del campo. */
.ds-entrada-pliegue > div { overflow: hidden; }
.ds-entrada-pliegue[data-listo="si"] > div { overflow: visible; }
.ds-entrada-recordar { display: inline-flex; align-items: center; gap: 10px; font-size: 15px; color: var(--ds-ink-2); cursor: pointer; }
.ds-entrada-recordar input { width: 18px; height: 18px; margin: 0; accent-color: var(--ds-accent); }
`;

const FLECHA = (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

function Flecha({ texto, listo, esperando }) {
  return (
    <button type="submit" className="ds-entrada-flecha" aria-label={texto} data-listo={listo ? "si" : undefined}
      disabled={esperando} aria-busy={esperando || undefined}>
      {esperando ? <Giro /> : FLECHA}
    </button>
  );
}

export default function EntradaCuenta({
  onEntrar, esperando = false, error, recordar: conRecordar = false, enlaces, correoInicial = "",
  etiquetaCorreo = "Correo", etiquetaClave = "Contraseña",
}) {
  const id = useId();
  const [paso, setPaso] = useState(correoInicial ? 2 : 1);
  const [correo, setCorreo] = useState(correoInicial);
  const [clave, setClave] = useState("");
  const [recordar, setRecordar] = useState(false);
  const [aviso, setAviso] = useState(null);
  const [desplegado, setDesplegado] = useState(!!correoInicial);
  const refCorreo = useRef(null);
  const refClave = useRef(null);

  /* Respaldo de `onTransitionEnd`, por si el navegador no lo dispara. */
  useEffect(() => {
    if (paso !== 2 || desplegado) return;
    const t = setTimeout(() => setDesplegado(true), 480);
    return () => clearTimeout(t);
  }, [paso, desplegado]);

  /* Un error del servidor vacía la contraseña y le devuelve el foco. También al
     terminar cada espera con error: dos fallos seguidos traen el mismo texto y
     el efecto de `error` no volvería a correr. */
  const esperaba = useRef(esperando);
  useEffect(() => {
    const termino = esperaba.current && !esperando;
    esperaba.current = esperando;
    if (!error || (!termino && esperando)) return;
    setClave("");
    refClave.current?.focus();
  }, [error, esperando]);

  const continuar = () => {
    if (!CORREO.test(correo.trim())) {
      setAviso("Escribe un correo válido, por ejemplo nombre@empresa.com.");
      refCorreo.current?.focus();
      return;
    }
    setAviso(null);
    setPaso(2);
    /* Después de quitarle `inert` al pliegue: antes no acepta el foco. */
    requestAnimationFrame(() => refClave.current?.focus());
  };

  const enviar = (e) => {
    e.preventDefault();
    if (esperando) return;
    if (paso === 1) return continuar();
    if (!CORREO.test(correo.trim())) return continuar();
    if (!clave) { setAviso("Escribe tu contraseña."); refClave.current?.focus(); return; }
    setAviso(null);
    onEntrar?.({ correo: correo.trim(), clave, recordar });
  };

  const mensaje = aviso || error;
  const idMensaje = `${id}-mensaje`;
  const abierto = paso === 2;

  return (
    <form noValidate onSubmit={enviar} style={{ display: "grid", gap: 20 }}>
      <style>{CSS}</style>

      <div>
        <div className="ds-entrada-fila" data-error={mensaje && !abierto ? "si" : undefined}
          style={{ borderRadius: abierto ? "12px 12px 0 0" : 12 }}>
          <input ref={refCorreo} id={`${id}-correo`} type="email" name="email" autoComplete="username"
            inputMode="email" autoCapitalize="none" spellCheck={false} placeholder=" " value={correo}
            aria-invalid={aviso && !abierto ? true : undefined} aria-describedby={mensaje ? idMensaje : undefined}
            onChange={(e) => { setCorreo(e.target.value); if (aviso) setAviso(null); }} />
          <label htmlFor={`${id}-correo`}>{etiquetaCorreo}</label>
          {!abierto && <Flecha texto="Continuar" listo={CORREO.test(correo.trim())} />}
        </div>

        <div className="ds-entrada-pliegue" data-abierto={abierto ? "si" : undefined}
          data-listo={abierto && desplegado ? "si" : undefined}
          onTransitionEnd={(e) => { if (e.target === e.currentTarget && abierto) setDesplegado(true); }}>
          <div inert={!abierto ? true : undefined}>
            <div className="ds-entrada-fila" data-error={mensaje && abierto ? "si" : undefined}
              style={{ borderRadius: "0 0 12px 12px", marginTop: -1 }}>
              <input ref={refClave} id={`${id}-clave`} type="password" name="password" autoComplete="current-password"
                placeholder=" " value={clave} aria-invalid={mensaje && abierto ? true : undefined}
                aria-describedby={mensaje ? idMensaje : undefined}
                onChange={(e) => {
                  setClave(e.target.value);
                  if (aviso) setAviso(null);
                  /* El gestor de contraseñas llenó las dos: se despliega sola. */
                  if (!abierto && e.target.value) setPaso(2);
                }} />
              <label htmlFor={`${id}-clave`}>{etiquetaClave}</label>
              {abierto && <Flecha texto="Entrar" listo={!!clave} esperando={esperando} />}
            </div>
          </div>
        </div>

        {mensaje && (
          <p id={idMensaje} role="alert" style={{ margin: "12px 2px 0", fontSize: 14, lineHeight: 1.4, color: "var(--ds-risk)" }}>
            {mensaje}
          </p>
        )}
      </div>

      {conRecordar && (
        <label className="ds-entrada-recordar" style={{ justifySelf: "center" }}>
          <input type="checkbox" checked={recordar} onChange={(e) => setRecordar(e.target.checked)} />
          Mantener la sesión iniciada
        </label>
      )}

      {enlaces && (
        <div style={{ display: "grid", justifyItems: "center", gap: 8, fontSize: 15 }}>{enlaces}</div>
      )}
    </form>
  );
}
