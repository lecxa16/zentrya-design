/**
 * MenuUsuario — el avatar de quien usa la app y su menú: quién es, las
 * opciones de su cuenta, la apariencia y cerrar sesión.
 *
 * El avatar es un `Retrato`: la foto si la hay (y carga), si no las
 * iniciales. Va en `derecha` del Armazón junto a `Notificaciones`, y sustituye
 * a los botones sueltos de tema y de salir: en el menú lateral no cabían
 * (Carlos, 2026-10-23).
 *
 * `opciones`: lo propio de cada app (`{ texto, icono, onClick }`), p. ej. «Mi
 * cuenta». Apariencia y Cerrar sesión las pone el sistema, siempre en el mismo
 * sitio. `saliendo` muestra que la sesión se está cerrando. `figura`: sin
 * foto, el avatar es la figura del nombre en vez de las iniciales.
 */
import React, { useRef, useState } from "react";
import Flotante from "./primitivas/Flotante";
import { Retrato } from "./primitivas/Fila";
import { Giro } from "./primitivas/Boton";
import { ModalApariencia, ENGRANE } from "./Apariencia";

const SALIR = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" />
  </svg>
);

function Opcion({ icono, children, onClick, esperando }) {
  return (
    <button type="button" role="menuitem" onClick={onClick} disabled={esperando} aria-busy={esperando || undefined}
      style={{
        display: "flex", alignItems: "center", gap: "var(--ds-3)", width: "100%", minHeight: 40,
        padding: "8px 10px", border: "none", borderRadius: "var(--ds-r-item)", cursor: "pointer",
        background: "transparent", color: "var(--ds-ink-2)", textAlign: "left",
        fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 700,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ds-surface-2)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      onFocus={(e) => { e.currentTarget.style.background = "var(--ds-surface-2)"; }}
      onBlur={(e) => { e.currentTarget.style.background = "transparent"; }}>
      <span style={{ display: "grid", placeItems: "center", width: 18, color: "var(--ds-ink-3)" }}>{icono}</span>
      <span style={{ flex: 1 }}>{children}</span>
    </button>
  );
}

const Separador = () => <div role="separator" style={{ height: 1, background: "var(--ds-line)", margin: "4px 6px" }} />;

export default function MenuUsuario({ nombre = "", correo, foto, opciones = [], onSalir, saliendo = false, figura = false }) {
  const [abierto, setAbierto] = useState(false);
  const [apariencia, setApariencia] = useState(false);
  const boton = useRef(null);
  const elegir = (fn) => () => { setAbierto(false); fn?.(); };
  /* Con figura (y sin foto) las iniciales no se ven: no van en la etiqueta. */
  const verIniciales = !(figura && !foto && nombre.trim());
  const iniciales = !verIniciales ? "" : nombre.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();

  return (
    <>
      <button ref={boton} type="button" onClick={() => setAbierto((v) => !v)}
        /* Las iniciales se VEN: van en el nombre para que quien usa control por voz
           pueda decirlas (WCAG 2.5.3). */
        aria-label={`Cuenta de ${nombre}${iniciales ? ` · ${iniciales}` : ""}`} aria-haspopup="menu" aria-expanded={abierto}
        style={{
          display: "grid", placeItems: "center", width: 40, height: 40, padding: 0, flexShrink: 0,
          borderRadius: "var(--ds-r-pill)", border: "none", cursor: "pointer", background: "transparent",
          boxShadow: abierto ? "0 0 0 2px var(--ds-accent-trazo)" : "none",
          transition: "box-shadow var(--ds-t-state) var(--ds-ease)",
        }}>
        <Retrato src={foto} nombre={nombre} tamano={34} figura={figura} />
      </button>

      <Flotante ancla={boton} abierto={abierto} onCerrar={() => setAbierto(false)}
        etiqueta={`Cuenta de ${nombre}`} minAncho={250}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-3)", padding: "6px 10px 10px" }}>
          <Retrato src={foto} nombre={nombre} tamano={40} figura={figura} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: "var(--ds-t-small)", color: "var(--ds-ink)",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{nombre}</div>
            {correo && (
              <div style={{ fontSize: "var(--ds-t-micro)", color: "var(--ds-ink-2)",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{correo}</div>
            )}
          </div>
        </div>
        <Separador />
        {opciones.map((o) => (
          <Opcion key={o.texto} icono={o.icono} onClick={elegir(o.onClick)}>{o.texto}</Opcion>
        ))}
        <Opcion icono={ENGRANE} onClick={elegir(() => setApariencia(true))}>Apariencia</Opcion>
        {onSalir && (
          <>
            <Separador />
            <Opcion icono={saliendo ? <Giro /> : SALIR} esperando={saliendo} onClick={() => onSalir()}>
              {saliendo ? "Cerrando sesión…" : "Cerrar sesión"}
            </Opcion>
          </>
        )}
      </Flotante>

      <ModalApariencia abierto={apariencia} onCerrar={() => setApariencia(false)} />
    </>
  );
}
