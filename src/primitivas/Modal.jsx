/**
 * Modal — lo que interrumpe el trabajo.
 *
 * Se cierra con `Escape` y con un clic fuera, y devuelve el foco a donde
 * estaba: un diálogo que deja el foco perdido obliga a volver al principio
 * de la página con el teclado.
 *
 * En el teléfono deja de ser un cuadro flotante y sube como HOJA desde abajo:
 * a todo lo ancho, al alcance del pulgar y con la acción donde cae la mano.
 * Un cuadro centrado a 390 px es un cuadro angosto con márgenes que no sirven.
 * Como en iOS (v2.9), la hoja se cierra arrastrándola hacia abajo desde la
 * barrita o el título; si no se suelta lo bastante abajo, regresa.
 *
 * `Aviso` es su variante de notificación: centrada, con icono de severidad
 * y **sin cierre automático**. Un resultado que se va solo antes de que
 * alguien lo lea no informó de nada.
 */
import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Boton from "./Boton";
import { useAngosto } from "../ancho";

/**
 * `lado="derecha"`: el cuadro se ancla al borde derecho y NO lleva fondo. Existe
 * para cuando lo que hay detrás ES parte de la lectura — el mapa con la ruta
 * del viaje cuyo detalle se está viendo, y la lista de donde se eligió —.
 * Lo de atrás sigue vivo: se hace scroll y se elige otro renglón sin cerrar
 * (un fondo, aunque fuera transparente, se comía el scroll y los clics). Por
 * eso trae su propio botón de cerrar, además de Escape. No es una captura.
 */
export default function Modal({
  abierto, onCerrar, titulo, nota, children, acciones, ancho = 560, estilo, lado,
}) {
  /* En el teléfono no hay «lo de atrás sigue vivo»: no cabe al lado. */
  const hoja = useAngosto();
  const derecha = lado === "derecha" && !hoja;
  const caja = useRef(null);
  const focoPrevio = useRef(null);
  /* `onCerrar` suele llegar como función nueva en cada render de quien abre
     el modal. Si fuera dependencia del efecto, cada render volvería a robar el
     foco: con lo de atrás vivo (`lado="derecha"`) no se podría ni escribir. */
  const cerrarRef = useRef(onCerrar);
  cerrarRef.current = onCerrar;
  /* Arrastre de la hoja. Se mueve con `translate` (propiedad aparte), no con
     `transform`: la animación de entrada termina con `both` y le ganaría. */
  const arrastre = useRef(null);
  const empezar = (e) => {
    if (!hoja || e.button > 0) return;
    arrastre.current = { y0: e.clientY, t0: performance.now(), dy: 0 };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    if (caja.current) caja.current.style.transition = "none";
  };
  const mover = (e) => {
    const a = arrastre.current;
    if (!a || !caja.current) return;
    a.dy = Math.max(0, e.clientY - a.y0);
    caja.current.style.translate = `0 ${a.dy}px`;
  };
  const soltar = () => {
    const a = arrastre.current, el = caja.current;
    arrastre.current = null;
    if (!a || !el) return;
    const rapido = a.dy / Math.max(1, performance.now() - a.t0) > 0.6;
    el.style.transition = "translate var(--ds-t-state) var(--ds-ease)";
    if (a.dy > 110 || (rapido && a.dy > 30)) {
      el.style.translate = "0 100%";
      setTimeout(() => cerrarRef.current?.(), 180);
    } else {
      el.style.translate = "0 0";
    }
  };
  const asa = hoja ? { onPointerDown: empezar, onPointerMove: mover, onPointerUp: soltar, onPointerCancel: soltar,
    style: { touchAction: "none", cursor: "grab" } } : {};

  useEffect(() => {
    if (!abierto) return undefined;
    focoPrevio.current = document.activeElement;
    const alTeclear = (e) => { if (e.key === "Escape") { e.stopPropagation(); cerrarRef.current?.(); } };
    document.addEventListener("keydown", alTeclear, true);
    const t = setTimeout(() => caja.current?.focus(), 40);
    return () => {
      document.removeEventListener("keydown", alTeclear, true);
      clearTimeout(t);
      try { focoPrevio.current?.focus?.(); } catch (e) { /* se fue de la página */ }
    };
  }, [abierto]);

  if (!abierto || typeof document === "undefined") return null;

  /* En un PORTAL, como Flotante: un ancestro con `backdrop-filter` (el menú lateral
     del Armazón) se vuelve el contenedor de los `fixed` de dentro, y un modal abierto
     desde ahí salía encogido dentro de la barra (v2.0.2). */
  return createPortal((
    <div className="ds-capa">
      {!derecha && (
        <div onClick={onCerrar} aria-hidden="true"
          style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(6,8,10,0.46)",
            backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)",
            animation: "ds-fade var(--ds-t-state) var(--ds-ease) both" }} />
      )}
      <div ref={caja} role="dialog" aria-modal={derecha ? "false" : "true"} aria-label={titulo} tabIndex={-1}
        style={{
          position: "fixed", zIndex: 61, outline: "none",
          display: "flex", flexDirection: "column", overflow: "hidden",
          /* Sólido, no vidrio: translúcido sobre el velo oscuro, el panel quedaba más oscuro
             que una tarjeta y todo `ink-3` de adentro bajaba de 4.5:1 (etiquetas de campos,
             notas: 4.35, lo cachó axe). Sobre la superficie sólida vale lo medido (v2.4). */
          background: "var(--ds-surface-solid)", border: "1px solid var(--ds-line)",
          boxShadow: "var(--ds-lift-3)",
          ...(hoja
            ? {
              left: 0, right: 0, bottom: 0, width: "100%", boxSizing: "border-box",
              maxHeight: "calc(100dvh - var(--ds-8))",
              borderRadius: "var(--ds-r-frame) var(--ds-r-frame) 0 0", borderBottom: "none",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
              animation: "ds-hoja var(--ds-t-move) var(--ds-ease) both",
            }
            : {
              ...(derecha
                ? { right: "var(--ds-4)", top: "50%", transform: "translateY(-50%)" }
                : { left: "50%", top: "50%", transform: "translate(-50%, -50%)" }),
              width: `min(${ancho}px, calc(100% - var(--ds-8)))`,
              maxHeight: "calc(100dvh - var(--ds-12))",
              borderRadius: "var(--ds-r-frame)",
              /* `ds-modal`, no `ds-rise`: ésa termina en `transform: none` y le
                 borraría el centrado al acabar. */
              animation: `${derecha ? "ds-modal-lado" : "ds-modal"} var(--ds-t-move) var(--ds-ease) both`,
            }),
          ...estilo,
        }}>
        {hoja && (
          <div aria-hidden {...asa} style={{ ...asa.style, flexShrink: 0, display: "grid", placeItems: "center", height: 22 }}>
            <div style={{ width: 38, height: 5, borderRadius: 3, background: "var(--ds-line-firm)" }} />
          </div>
        )}
        {derecha && (
          <button type="button" onClick={onCerrar} aria-label="Cerrar" title="Cerrar (Esc)"
            style={{ position: "absolute", top: "var(--ds-4)", right: "var(--ds-4)", zIndex: 1,
              display: "grid", placeItems: "center", width: 34, height: 34, cursor: "pointer",
              borderRadius: "var(--ds-r-pill)", border: "1px solid var(--ds-line)",
              background: "var(--ds-surface)", color: "var(--ds-ink-2)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        )}
        {titulo && (
          <div {...(hoja ? { onPointerDown: asa.onPointerDown, onPointerMove: mover, onPointerUp: soltar,
            onPointerCancel: soltar } : null)}
            style={{ padding: hoja ? "var(--ds-2) var(--ds-5) 0" : "var(--ds-5) var(--ds-5) 0", flexShrink: 0,
              paddingRight: derecha ? 64 : undefined, touchAction: hoja ? "none" : undefined }}>
            <h2 style={{ margin: 0, fontSize: "var(--ds-t-title)", fontWeight: 700,
              letterSpacing: "-0.02em", color: "var(--ds-ink)" }}>{titulo}</h2>
            {nota && (
              <p style={{ margin: "5px 0 0", fontSize: "var(--ds-t-small)",
                /* ink-2, no ink-3: el panel es translúcido sobre el velo oscuro y
                   queda más oscuro que el lienzo; ink-3 daba 4.36:1 (v2.0.3, axe). */
                color: "var(--ds-ink-2)" }}>{nota}</p>
            )}
          </div>
        )}
        <div style={{ padding: "var(--ds-5)", overflowY: "auto", flex: 1, minHeight: 0 }}>
          {children}
        </div>
        {acciones && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--ds-2)",
            padding: "0 var(--ds-5) var(--ds-5)", flexShrink: 0, flexWrap: "wrap" }}>
            {acciones}
          </div>
        )}
      </div>
    </div>
  ), document.body);
}

const SEVERIDAD = {
  ok:     { tono: "var(--ds-ok)",   suave: "var(--ds-ok-soft)",   titulo: "Listo",
            d: "M20 6L9 17l-5-5" },
  error:  { tono: "var(--ds-risk)", suave: "var(--ds-risk-soft)", titulo: "No se pudo",
            d: "M12 8v5M12 16h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" },
  aviso:  { tono: "var(--ds-warn)", suave: "var(--ds-warn-soft)", titulo: "Atención",
            d: "M12 8v5M12 16h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" },
  info:   { tono: "var(--ds-accent-tinta)", suave: "var(--ds-accent-soft)", titulo: "Aviso",
            d: "M12 16v-5M12 8h.01" },
};

/**
 * Aviso — el resultado de una acción. Centrado, se cierra a mano.
 *
 * Nunca una notificación de esquina con cierre automático: el mensaje se va
 * antes de que nadie lo lea, y con él la única explicación de qué pasó.
 */
/**
 * El aviso: lo único que sigue siendo un cuadro flotante (las capturas van en
 * su propia vista). Cierra quien lo lee, nunca solo.
 *
 * Por omisión trae su propio «Entendido», porque casi siempre informa de algo
 * ya ocurrido y las `acciones` son un después opcional. Cuando el aviso es una
 * DECISIÓN —eliminar o no—, una de sus acciones se marca `cierra: true` y el
 * «Entendido» desaparece: ante una pregunta de dos respuestas, un tercer botón
 * que no dice cuál elige sólo siembra la duda de qué acaba de pasar.
 *
 *   acciones={[
 *     { texto: "Eliminar", primaria: true, onClick: borrar },
 *     { texto: "Dejarlo como está", cierra: true },
 *   ]}
 */
export function Aviso({ abierto, severidad = "info", titulo, mensaje, onCerrar, acciones }) {
  const cfg = SEVERIDAD[severidad] || SEVERIDAD.info;
  const cerrar = useCallback(() => onCerrar?.(), [onCerrar]);
  const tieneSalida = (acciones || []).some((a) => a.cierra);

  return (
    <Modal abierto={abierto} onCerrar={cerrar} ancho={420}>
      <div style={{ textAlign: "center", padding: "var(--ds-2) 0" }}>
        <div style={{ display: "grid", placeItems: "center", width: 54, height: 54,
          margin: "0 auto var(--ds-4)", borderRadius: "var(--ds-r-pill)",
          background: cfg.suave, color: cfg.tono }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {severidad === "info" && <circle cx="12" cy="12" r="9" />}
            <path d={cfg.d} />
          </svg>
        </div>
        <div style={{ fontSize: "var(--ds-t-title)", fontWeight: 700,
          letterSpacing: "-0.03em", color: "var(--ds-ink)" }}>
          {titulo || cfg.titulo}
        </div>
        {mensaje && (
          <div style={{ fontSize: "var(--ds-t-body)", color: "var(--ds-ink-2)",
            marginTop: 8, lineHeight: 1.5 }}>{mensaje}</div>
        )}
        <div style={{ display: "flex", gap: "var(--ds-2)", justifyContent: "center",
          marginTop: "var(--ds-5)", flexWrap: "wrap" }}>
          {(acciones || []).map((a, i) => (
            <Boton key={i} variante={a.primaria ? "solido" : "contorno"}
              onClick={() => { a.onClick?.(); cerrar(); }}>{a.texto}</Boton>
          ))}
          {!tieneSalida && (
            <Boton variante={(acciones || []).length ? "fantasma" : "solido"} onClick={cerrar}>
              Entendido
            </Boton>
          )}
        </div>
      </div>
    </Modal>
  );
}
