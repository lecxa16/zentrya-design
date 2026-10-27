/**
 * Campo — la entrada de datos del sistema.
 *
 * Etiqueta siempre visible, nunca flotando dentro del campo: en un
 * expediente de 40 datos, una etiqueta que desaparece al escribir obliga a
 * recordar qué se estaba capturando. A la manera de Apple (v2.9): la etiqueta
 * en letra normal y peso medio —no en mayúsculas chicas, que se leen como
 * tablero genérico— y la caja de 44 px, el mínimo táctil de sus guías.
 *
 * El error se dice debajo y con palabras. Un borde rojo sin texto informa
 * de que algo está mal, no de qué.
 */
import React, { useId } from "react";

export const CAJA = {
  width: "100%", boxSizing: "border-box",
  fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-body)", fontWeight: 400,
  color: "var(--ds-ink)", background: "var(--ds-surface-2)",
  border: "1px solid var(--ds-line-firm)", borderRadius: 10,
  minHeight: 44, padding: "11px 14px", lineHeight: 1.35, outline: "none",
  transition: "border-color var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease)",
};

/** `etiquetaOculta`: la etiqueta existe (el lector la anuncia) pero no se ve, porque ya la
    dice algo al lado —el título de un `FilaAjuste`—. Repetirla a la vista es ruido. */
const OCULTA = { position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden",
  clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 };

export function Envoltura({ id, etiqueta, requerido, error, ayuda, children, estilo, etiquetaOculta = false }) {
  return (
    /* `data-error` es cómo el formulario encuentra el primer campo con
       problema para llevarle el foco: un id no serviría igual, porque los
       campos de MUI no exponen el suyo. */
    <div data-error={error ? "si" : undefined}
      style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0, ...estilo }}>
      {etiqueta && (
        /* La etiqueta lleva su propio id: un control de MUI no es un `input`
           —el `Select` dibuja un `div`— y `htmlFor` no lo alcanza. Con el id
           puesto, esos controles se cuelgan de ella con `aria-labelledby`. */
        <label htmlFor={id} id={id ? `${id}-etiqueta` : undefined} style={etiquetaOculta ? OCULTA : {
          fontSize: "var(--ds-t-small)", fontWeight: 500, color: "var(--ds-ink-2)", paddingLeft: 2,
        }}>
          {etiqueta}{requerido && <span style={{ color: "var(--ds-risk)" }}> *</span>}
        </label>
      )}
      {children}
      {(error || ayuda) && (
        <div style={{ fontSize: "var(--ds-t-small)",
          color: error ? "var(--ds-risk)" : "var(--ds-ink-3)" }}>
          {error || ayuda}
        </div>
      )}
    </div>
  );
}

/**
 * `adorno`: un control dentro de la caja, a la derecha (mostrar la contraseña,
 * limpiar). La caja le deja su sitio para que el texto no corra por debajo.
 */
export default function Campo({
  etiqueta, valor, onCambio, onSalir, tipo = "text", marcador, requerido, error, ayuda,
  deshabilitado, multilinea = false, filas = 3, estilo, adorno, id: idPropio, etiquetaOculta, ...resto
}) {
  const idAuto = useId();
  const id = idPropio || idAuto;
  const Etiqueta = multilinea ? "textarea" : "input";
  const entrada = (
      <Etiqueta
        id={id} type={multilinea ? undefined : tipo} rows={multilinea ? filas : undefined}
        value={valor ?? ""} onChange={(e) => onCambio?.(e.target.value)}
        placeholder={marcador} disabled={deshabilitado}
        aria-invalid={error ? "true" : undefined}
        style={{
          ...CAJA,
          borderColor: error ? "var(--ds-risk)" : "var(--ds-line-firm)",
          opacity: deshabilitado ? 0.55 : 1,
          cursor: deshabilitado ? "not-allowed" : undefined,
          resize: multilinea ? "vertical" : undefined,
          fontFamily: "var(--ds-font)",
          paddingRight: adorno ? 46 : undefined,
        }}
        onFocus={(e) => {
          if (!error) e.target.style.borderColor = "var(--ds-accent-trazo)";
          e.target.style.boxShadow = error
            ? "0 0 0 4px color-mix(in srgb, var(--ds-risk) 22%, transparent)" : "0 0 0 4px var(--ds-accent-ring)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? "var(--ds-risk)" : "var(--ds-line-firm)";
          e.target.style.boxShadow = "none";
          /* Aquí es donde el formulario se entera de que este campo ya se
             capturó y puede juzgarlo. Va DESPUÉS del estilo: si quien lo
             escucha vuelve a pintar, que encuentre la caja ya en reposo. */
          onSalir?.();
        }}
        {...resto}
      />
  );
  return (
    <Envoltura id={id} etiqueta={etiqueta} requerido={requerido} error={error}
      ayuda={ayuda} estilo={estilo} etiquetaOculta={etiquetaOculta}>
      {adorno ? (
        <div style={{ position: "relative" }}>
          {entrada}
          <div style={{ position: "absolute", top: 0, right: 4, bottom: 0, display: "flex", alignItems: "center" }}>
            {adorno}
          </div>
        </div>
      ) : entrada}
    </Envoltura>
  );
}

/** Selector — misma caja que `Campo`, para que una fila de filtros se alinee. */
export function Selector({
  etiqueta, valor, onCambio, onSalir, opciones = [], vacio, requerido, error, ayuda,
  deshabilitado, estilo, ...resto
}) {
  const id = useId();
  return (
    <Envoltura id={id} etiqueta={etiqueta} requerido={requerido} error={error}
      ayuda={ayuda} estilo={estilo}>
      <select id={id} value={valor ?? ""} disabled={deshabilitado}
        /* En un selector, elegir ES terminar: no hay un «después» en el que
           juzgarlo, así que se marca aquí mismo. */
        onChange={(e) => { onCambio?.(e.target.value); onSalir?.(); }}
        aria-invalid={error ? "true" : undefined}
        {...resto}
        style={{
          ...CAJA,
          borderColor: error ? "var(--ds-risk)" : "var(--ds-line-firm)",
          opacity: deshabilitado ? 0.55 : 1,
          cursor: deshabilitado ? "not-allowed" : "pointer",
          /* La flecha del sistema operativo no sigue al tema; se dibuja aquí. */
          appearance: "none", WebkitAppearance: "none", paddingRight: 34,
          backgroundImage: "linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)",
          backgroundPosition: "calc(100% - 18px) 51%, calc(100% - 13px) 51%",
          backgroundSize: "5px 5px, 5px 5px",
          backgroundRepeat: "no-repeat",
        }}>
        {vacio !== undefined && <option value="">{vacio}</option>}
        {opciones.map((o) => (
          <option key={o.valor} value={o.valor}>{o.texto}</option>
        ))}
      </select>
    </Envoltura>
  );
}

/** Buscador — la caja con lupa que encabeza un listado. */
export function Buscador({ valor, onCambio, marcador = "Buscar…", estilo }) {
  return (
    <div style={{ position: "relative", minWidth: 0, ...estilo }}>
      <span aria-hidden style={{ position: "absolute", left: 12, top: "50%",
        transform: "translateY(-50%)", color: "var(--ds-ink-3)", lineHeight: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
      </span>
      <input value={valor ?? ""} onChange={(e) => onCambio?.(e.target.value)}
        placeholder={marcador} aria-label={marcador}
        style={{ ...CAJA, paddingLeft: 36, borderRadius: "var(--ds-r-pill)" }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--ds-accent-trazo)";
          e.target.style.boxShadow = "0 0 0 4px var(--ds-accent-ring)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--ds-line-firm)";
          e.target.style.boxShadow = "none";
        }} />
    </div>
  );
}
