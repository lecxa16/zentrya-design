/**
 * PantallaCuenta — «Mi cuenta»: quién eres arriba y tus ajustes por secciones.
 *
 * Decidido con Carlos (2026-10-23) tras revisar cómo lo hacen los productos que
 * lo hacen bien: UNA pantalla, con la cabecera del perfil (portada de la
 * paleta, foto, nombre, correo) y debajo un menú propio de secciones —Perfil,
 * Seguridad, Notificaciones, Apariencia, Zona de peligro—. Cada sección tiene
 * su URL (la app navega con `onIr`), para que soporte pueda mandar un enlace
 * directo a «Seguridad». En el teléfono el menú pasa a una fila deslizable.
 *
 * La pantalla no guarda nada: cada sección trae sus propias piezas
 * (`SeccionAjustes`, `FilaAjuste`, `ZonaPeligro`).
 */
import React from "react";
import { useAngosto } from "../ancho";
import { Retrato } from "../primitivas/Fila";

function Cabecera({ usuario, accion, angosto, figura }) {
  const tam = angosto ? 72 : 96;
  return (
    <div style={{
      borderRadius: "var(--ds-r-card)", overflow: "hidden", background: "var(--ds-surface)",
      border: "1px solid var(--ds-line)", boxShadow: "var(--ds-lift-1)",
      backdropFilter: "var(--ds-blur)", WebkitBackdropFilter: "var(--ds-blur)",
    }}>
      {/* La portada es el héroe de la paleta: con cambiar de paleta cambia, sin escribir colores. */}
      <div aria-hidden className="ds-heroe" style={{ height: angosto ? 84 : 120, background: "var(--ds-hero)" }} />
      <div style={{ display: "flex", alignItems: angosto ? "flex-start" : "flex-end", flexWrap: "wrap",
        gap: "var(--ds-4)", padding: angosto ? "0 var(--ds-4) var(--ds-4)" : "0 var(--ds-6) var(--ds-5)" }}>
        <div style={{ marginTop: -tam / 2, borderRadius: "var(--ds-r-pill)", lineHeight: 0,
          boxShadow: "0 0 0 4px var(--ds-surface-solid), var(--ds-lift-2)" }}>
          <Retrato src={usuario.foto} nombre={usuario.nombre} tamano={tam} figura={figura} />
        </div>
        <div style={{ flex: "1 1 220px", minWidth: 0, paddingTop: angosto ? 0 : "var(--ds-3)" }}>
          <h1 style={{ margin: 0, fontSize: "var(--ds-t-title)", fontWeight: 800, letterSpacing: "-0.02em",
            overflowWrap: "anywhere" }}>{usuario.nombre}</h1>
          <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", overflowWrap: "anywhere" }}>
            {usuario.correo}
          </div>
          {usuario.detalle && (
            <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", marginTop: 2 }}>{usuario.detalle}</div>
          )}
        </div>
        {accion}
      </div>
    </div>
  );
}

function Opcion({ s, esta, onIr, angosto }) {
  const riesgo = s.peligro;
  return (
    <button type="button" onClick={() => onIr?.(s)} aria-current={esta ? "page" : undefined}
      style={{
        display: "flex", alignItems: "center", gap: 10, flexShrink: 0, textAlign: "left",
        width: angosto ? "auto" : "100%", minHeight: 40, padding: angosto ? "0 14px" : "0 12px",
        border: angosto ? "1px solid var(--ds-line)" : "none",
        borderRadius: angosto ? "var(--ds-r-pill)" : "var(--ds-r-item)", cursor: "pointer",
        fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 700, whiteSpace: "nowrap",
        background: esta ? "var(--ds-surface-solid)" : "transparent",
        boxShadow: esta ? "var(--ds-lift-1)" : "none",
        color: riesgo ? "var(--ds-risk)" : esta ? "var(--ds-ink)" : "var(--ds-ink-2)",
      }}>
      {s.icono && <span style={{ lineHeight: 0, color: riesgo ? "inherit" : esta ? "var(--ds-accent-tinta)" : "inherit" }}>{s.icono}</span>}
      {s.texto}
    </button>
  );
}

export default function PantallaCuenta({ usuario, accion, secciones = [], activa, onIr, figura = false, children }) {
  const angosto = useAngosto();
  return (
    <div style={{ display: "grid", gap: "var(--ds-5)" }}>
      <Cabecera usuario={usuario} accion={accion} angosto={angosto} figura={figura} />
      <div style={{ display: "grid", gap: "var(--ds-5)", alignItems: "start",
        gridTemplateColumns: angosto ? "minmax(0, 1fr)" : "220px minmax(0, 1fr)" }}>
        <nav aria-label="Secciones de la cuenta" style={{
          display: "flex", flexDirection: angosto ? "row" : "column", gap: angosto ? 6 : 2,
          overflowX: angosto ? "auto" : "visible", paddingBottom: angosto ? 4 : 0,
        }}>
          {secciones.map((s) => <Opcion key={s.id} s={s} esta={s.id === activa} onIr={onIr} angosto={angosto} />)}
        </nav>
        <div style={{ display: "grid", gap: "var(--ds-5)", minWidth: 0 }}>{children}</div>
      </div>
    </div>
  );
}
