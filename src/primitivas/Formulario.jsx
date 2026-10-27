/**
 * Formulario — el chasis de TODA captura.
 *
 * Regla de Carlos (2026-09-26): **un formulario nunca vive en un modal; lleva
 * su propia vista.** Un modal encima del trabajo obliga a recordar lo que
 * tapa, no se puede enlazar ni volver a él, se pierde al recargar y en un
 * teléfono deja el teclado encima del campo. Una vista tiene ruta, tiene
 * «volver» y cabe entera.
 *
 * Lo que SÍ sigue siendo modal es el `Aviso`: no es una captura, es el
 * resultado de una — y ése se cierra a mano, nunca solo. `Modal` se queda en
 * el sistema para eso y para lo que interrumpe sin pedir datos.
 *
 * La barra de acciones va fija abajo: en una ficha de treinta campos, un
 * botón «Guardar» al final del scroll es un botón que no se encuentra.
 *
 * Y **el botón nunca se deshabilita** (regla de Carlos, 2026-09-26): al
 * pulsarlo con algo incompleto, cada campo dice su regla y aquí arriba
 * aparece el resumen de lo que falta. Un botón gris no explica nada.
 */
import React from "react";
import Superficie from "./Superficie";
import Boton from "./Boton";
import { useArmazon, ALTO_DOCK } from "../Armazon";

/** «Asunto», «Categoría» → «Asunto y Categoría». Una lista se lee, una
    enumeración con comas hasta el final se deletrea. */
function enumerar(lista) {
  if (lista.length <= 1) return lista[0] || "";
  return `${lista.slice(0, -1).join(", ")} y ${lista[lista.length - 1]}`;
}

export default function Formulario({
  titulo, nota, children, onCancelar, cancelarTexto = "Cancelar",
  accion, ancho = 820, problemas = [], refCuerpo,
}) {
  /* En el modo dock la barra de tareas ya ocupa el borde inferior: sin esto
     la de acciones queda DEBAJO de ella y el botón de guardar no se puede
     pulsar. Medido en navegador, no supuesto. */
  const { modo } = useArmazon();
  const piso = modo === "dock" ? ALTO_DOCK : 0;

  return (
    <div style={{ maxWidth: ancho, margin: "0 auto", paddingBottom: 96 + piso }}>
      <div style={{ marginBottom: "var(--ds-6)", padding: "0 var(--ds-2)" }}>
        <h1 style={{ margin: 0, fontSize: "var(--ds-t-display)", fontWeight: 700,
          letterSpacing: "-0.045em", lineHeight: 1.02, color: "var(--ds-ink)" }}>
          {titulo}
        </h1>
        {nota && (
          <p style={{ margin: "6px 0 0", fontSize: "var(--ds-t-body)",
            color: "var(--ds-ink-3)", maxWidth: 620 }}>{nota}</p>
        )}
      </div>

      {problemas.length > 0 && (
        /* `role="alert"` para que un lector de pantalla lo anuncie en cuanto
           aparece: quien no ve el rojo tiene que enterarse igual. */
        <div role="alert" style={{
          display: "flex", gap: "var(--ds-3)", alignItems: "flex-start",
          padding: "var(--ds-4)", marginBottom: "var(--ds-4)",
          borderRadius: "var(--ds-r-item)", background: "var(--ds-risk-soft)",
          color: "var(--ds-risk)", fontSize: "var(--ds-t-small)", fontWeight: 600,
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
            style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" />
          </svg>
          <span>
            {problemas.length === 1
              ? <>Falta revisar <b>{problemas[0]}</b>.</>
              : <>Faltan {problemas.length} datos: <b>{enumerar(problemas)}</b>.</>}
            {" "}Cada campo dice abajo qué necesita.
          </span>
        </div>
      )}

      <Superficie entrada={0}><div ref={refCuerpo} style={{ display: "grid", gap: "var(--ds-5)" }}>{children}</div></Superficie>

      {/* `fixed`, no `sticky`: el `body` de la aplicación lleva `overflow`, así
          que `sticky` se ancla a algo que nunca se mueve. El relleno inferior
          del contenedor reserva el sitio para que la barra no tape el último
          campo. */}
      <div style={{
        position: "fixed", left: 0, right: 0, bottom: piso, zIndex: 25,
        display: "flex", justifyContent: "center",
        padding: "var(--ds-3) var(--ds-4)",
        paddingBottom: "calc(var(--ds-3) + env(safe-area-inset-bottom, 0px))",
        background: "var(--ds-panel)", borderTop: "1px solid var(--ds-line)",
        backdropFilter: "var(--ds-blur)", WebkitBackdropFilter: "var(--ds-blur)",
      }}>
        <div style={{ width: "100%", maxWidth: ancho, display: "flex",
          justifyContent: "flex-end", gap: "var(--ds-2)", flexWrap: "wrap" }}>
          <Boton variante="fantasma" onClick={onCancelar}>{cancelarTexto}</Boton>
          {accion}
        </div>
      </div>
    </div>
  );
}

/** Rejilla de campos: una columna en angosto, dos o tres cuando hay sitio. */
export function Campos({ children, minimo = 220, estilo }) {
  return (
    <div style={{ display: "grid", gap: "var(--ds-4)",
      gridTemplateColumns: `repeat(auto-fit, minmax(${minimo}px, 1fr))`, ...estilo }}>
      {children}
    </div>
  );
}
