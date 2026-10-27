/**
 * PantallaCuenta — «Mi cuenta»: quién eres y tus ajustes por secciones.
 *
 * Decidido con Carlos (2026-10-23): UNA pantalla con un menú propio de
 * secciones —Perfil, Seguridad, Notificaciones, Apariencia, Zona de peligro—,
 * cada una con su URL (la app navega con `onIr`), para que soporte pueda mandar
 * un enlace directo a «Seguridad».
 *
 * v2.9, a la manera de la cuenta de Apple (Carlos, 2026-10-27: la portada «es
 * carga de diseño y no tiene funcionalidad», y los iconos de color no
 * combinaban): sin portada. La identidad —foto o figura, nombre, correo— va
 * arriba de la barra lateral; las secciones debajo, con iconos de un solo color
 * y la elegida sobre un gris suave. El contenido abre con el nombre de la
 * sección como título grande. En el teléfono la identidad va centrada arriba y
 * las secciones pasan a una fila deslizable.
 *
 * La pantalla no guarda nada: cada sección trae sus propias piezas
 * (`SeccionAjustes`, `FilaAjuste`, `ZonaPeligro`).
 */
import React from "react";
import { useAngosto } from "../ancho";
import { Retrato } from "../primitivas/Fila";

function Identidad({ usuario, accion, angosto, figura }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: angosto ? "center" : "flex-start",
      textAlign: angosto ? "center" : "left", gap: 2, padding: angosto ? "var(--ds-2) 0 var(--ds-4)" : "0 8px var(--ds-5)",
    }}>
      <div style={{ marginBottom: "var(--ds-3)", lineHeight: 0 }}>
        <Retrato src={usuario.foto} nombre={usuario.nombre} tamano={angosto ? 76 : 64} figura={figura} />
      </div>
      <div style={{ fontSize: angosto ? "var(--ds-t-title)" : "1.0625rem", fontWeight: 700, letterSpacing: "-0.015em",
        overflowWrap: "anywhere" }}>{usuario.nombre}</div>
      <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", overflowWrap: "anywhere" }}>{usuario.correo}</div>
      {usuario.detalle && <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)" }}>{usuario.detalle}</div>}
      {accion && <div style={{ marginTop: "var(--ds-3)" }}>{accion}</div>}
    </div>
  );
}

function Opcion({ s, esta, onIr, angosto }) {
  const riesgo = s.peligro;
  if (angosto) {
    /* En el teléfono, cápsulas deslizables: la elegida en tinta, las demás en gris suave. */
    return (
      <button type="button" onClick={() => onIr?.(s)} aria-current={esta ? "page" : undefined}
        style={{
          display: "flex", alignItems: "center", gap: 7, flexShrink: 0, minHeight: 36, padding: "0 14px",
          border: "none", borderRadius: "var(--ds-r-pill)", cursor: "pointer", whiteSpace: "nowrap",
          fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 600,
          background: esta ? "var(--ds-ink)" : "var(--ds-surface-2)",
          color: esta ? "var(--ds-surface-solid)" : riesgo ? "var(--ds-risk)" : "var(--ds-ink)",
        }}>
        {s.icono && <span style={{ lineHeight: 0 }}>{s.icono}</span>}
        {s.texto}
      </button>
    );
  }
  return (
    <button type="button" onClick={() => onIr?.(s)} aria-current={esta ? "page" : undefined}
      style={{
        display: "flex", alignItems: "center", gap: 11, width: "100%", textAlign: "left",
        minHeight: 38, padding: "0 10px", border: "none", borderRadius: 9, cursor: "pointer",
        fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-body)", fontWeight: esta ? 600 : 500,
        background: esta ? "var(--ds-surface-2)" : "transparent",
        color: riesgo ? "var(--ds-risk)" : "var(--ds-ink)",
        transition: "background var(--ds-t-tap) var(--ds-ease)",
      }}
      onMouseEnter={(e) => { if (!esta) e.currentTarget.style.background = "var(--ds-surface-2)"; }}
      onMouseLeave={(e) => { if (!esta) e.currentTarget.style.background = "transparent"; }}>
      {s.icono && (
        <span aria-hidden style={{ display: "grid", placeItems: "center", width: 20, lineHeight: 0, flexShrink: 0,
          color: riesgo ? "inherit" : esta ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)" }}>{s.icono}</span>
      )}
      {s.texto}
    </button>
  );
}

export default function PantallaCuenta({ usuario, accion, secciones = [], activa, onIr, figura = false, children }) {
  const angosto = useAngosto();
  const actual = secciones.find((s) => s.id === activa);
  const menu = (
    <nav aria-label="Secciones de la cuenta" style={{
      display: "flex", flexDirection: angosto ? "row" : "column", gap: angosto ? 6 : 2,
      overflowX: angosto ? "auto" : "visible", paddingBottom: angosto ? 4 : 0,
    }}>
      {secciones.map((s) => <Opcion key={s.id} s={s} esta={s.id === activa} onIr={onIr} angosto={angosto} />)}
    </nav>
  );
  return (
    <div style={{ display: "grid", gap: angosto ? "var(--ds-4)" : "var(--ds-10)", alignItems: "start",
      gridTemplateColumns: angosto ? "minmax(0, 1fr)" : "232px minmax(0, 1fr)" }}>
      <aside style={angosto ? undefined : { position: "sticky", top: "var(--ds-reserva-arriba, var(--ds-6))" }}>
        <Identidad usuario={usuario} accion={accion} angosto={angosto} figura={figura} />
        {menu}
      </aside>
      <div style={{ display: "grid", gap: "var(--ds-6)", minWidth: 0, maxWidth: 760 }}>
        {actual && (
          <h1 style={{ margin: angosto ? "var(--ds-2) 0 0" : 0, fontSize: angosto ? "var(--ds-t-title)" : "var(--ds-num-m)",
            fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{actual.texto}</h1>
        )}
        {children}
      </div>
    </div>
  );
}
