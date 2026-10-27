/**
 * Panel de inicio — el lanzador que se abre desde el dock.
 *
 * Misma idea que el menú Inicio de un escritorio: quién eres arriba, lo
 * reciente a la izquierda, los destinos en mosaicos a la derecha y un
 * buscador abajo que atraviesa todo. Escribir filtra las tres cosas a la
 * vez y sustituye las columnas por resultados: quien ya sabe a dónde va
 * teclea, quien no, mira.
 *
 * No sabe nada del producto que lo usa: todo entra por props.
 */
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import Azulejo from "./primitivas/Azulejo";

const lupa = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
);
const flecha = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

function Titulo({ children }) {
  return (
    <div style={{ fontSize: "var(--ds-t-small)", fontWeight: 700, color: "var(--ds-ink-2)",
      letterSpacing: "-0.01em", margin: "0 0 var(--ds-3)" }}>
      {children}
    </div>
  );
}

/** Renglón compacto: lo reciente y los resultados comparten forma. */
function Renglon({ item, onIr }) {
  const [encima, setEncima] = React.useState(false);
  const c = item.color || "var(--ds-ink-2)";
  return (
    <button
      onClick={() => { onIr(item); }}
      onMouseEnter={() => setEncima(true)} onMouseLeave={() => setEncima(false)}
      style={{
        display: "flex", alignItems: "center", gap: "var(--ds-3)", width: "100%",
        padding: "9px 10px", borderRadius: "var(--ds-r-item)", border: "none",
        cursor: "pointer", textAlign: "left", fontFamily: "var(--ds-font)",
        background: encima ? "var(--ds-surface-2)" : "transparent",
        transition: "background var(--ds-t-state) var(--ds-ease)",
      }}>
      <span style={{ display: "grid", placeItems: "center", width: 30, height: 30,
        flexShrink: 0, borderRadius: 9, background: `${c}1F`, color: c,
        overflow: "hidden" }}>
        {item.retrato
          ? <img src={item.retrato} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : item.icono}
      </span>
      <span style={{ minWidth: 0, flex: 1 }}>
        <span style={{ display: "block", fontSize: "var(--ds-t-small)", fontWeight: 600,
          color: "var(--ds-ink)", whiteSpace: "nowrap", overflow: "hidden",
          textOverflow: "ellipsis" }}>{item.texto}</span>
        {item.subtitulo && (
          <span style={{ display: "block", fontSize: "var(--ds-t-micro)", fontWeight: 600,
            color: "var(--ds-ink-3)", whiteSpace: "nowrap", overflow: "hidden",
            textOverflow: "ellipsis" }}>{item.subtitulo}</span>
        )}
      </span>
      <span style={{ color: "var(--ds-ink-3)", opacity: encima ? 1 : 0, flexShrink: 0,
        transition: "opacity var(--ds-t-state) var(--ds-ease)" }}>{flecha}</span>
    </button>
  );
}

export default function PanelInicio({
  abierto, onCerrar, usuario, acciones,
  recientes = [], tituloRecientes = "Reciente",
  grupos = [], busqueda = "", onBusqueda, resultados = null,
  marcadorBusqueda = "Buscar…", onIr,
}) {
  const campo = useRef(null);
  const caja = useRef(null);

  // Escape cierra; el foco entra al buscador para que se pueda teclear de una.
  useEffect(() => {
    if (!abierto) return undefined;
    const alTeclear = (e) => { if (e.key === "Escape") { e.stopPropagation(); onCerrar?.(); } };
    document.addEventListener("keydown", alTeclear, true);
    const t = setTimeout(() => campo.current?.focus(), 90);
    return () => { document.removeEventListener("keydown", alTeclear, true); clearTimeout(t); };
  }, [abierto, onCerrar]);

  const ir = useCallback((item) => { onCerrar?.(); (item.onIr || onIr)?.(item); }, [onCerrar, onIr]);

  const buscando = busqueda.trim().length > 0;
  const vacio = buscando && resultados && resultados.length === 0;
  const indices = useMemo(() => {
    let n = 0;
    return grupos.map((g) => g.items.map(() => n++));
  }, [grupos]);

  if (!abierto) return null;

  return (
    <>
      {/* Telón: un clic fuera cierra, como cualquier menú de escritorio. */}
      <div onClick={onCerrar} aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(8,9,15,0.28)",
          backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)",
          animation: "ds-fade var(--ds-t-state) var(--ds-ease) both" }} />

      <div ref={caja} role="dialog" aria-modal="true" aria-label="Menú de inicio"
        style={{
          position: "fixed", zIndex: 51, left: "50%",
          bottom: "calc(64px + env(safe-area-inset-bottom, 0px) + var(--ds-3))",
          transform: "translateX(-50%)",
          width: "min(800px, calc(100% - var(--ds-8)))",
          maxHeight: "min(660px, calc(100dvh - 150px))",
          display: "flex", flexDirection: "column",
          borderRadius: "var(--ds-r-frame)", overflow: "hidden",
          background: "var(--ds-panel)", border: "1px solid var(--ds-line-glass)",
          backdropFilter: "var(--ds-blur)", WebkitBackdropFilter: "var(--ds-blur)",
          boxShadow: "var(--ds-lift-3)",
          animation: "ds-inicio var(--ds-t-move) var(--ds-ease) both",
        }}>

        {/* ---- Cabecera: quién eres y las dos salidas ---- */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-3)",
          padding: "var(--ds-4) var(--ds-5) var(--ds-3)" }}>
          {usuario}
          <div style={{ flex: 1 }} />
          {acciones}
        </div>

        {/* ---- Cuerpo ---- */}
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto",
          padding: "var(--ds-2) var(--ds-5) var(--ds-4)" }}>
          {buscando ? (
            <div>
              <Titulo>{vacio ? "Sin coincidencias" : "Resultados"}</Titulo>
              {vacio ? (
                <div style={{ padding: "var(--ds-8) 0", textAlign: "center",
                  color: "var(--ds-ink-3)", fontSize: "var(--ds-t-body)" }}>
                  Nada coincide con «{busqueda}».
                </div>
              ) : (resultados || []).map((r) => (
                <Renglon key={r.id} item={r} onIr={ir} />
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "var(--ds-5)", alignItems: "flex-start",
              flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 200px", minWidth: 190 }}>
                <Titulo>{tituloRecientes}</Titulo>
                {recientes.length > 0
                  ? recientes.map((r) => <Renglon key={r.id} item={r} onIr={ir} />)
                  : (
                    <div style={{ padding: "var(--ds-3) 10px", fontSize: "var(--ds-t-small)",
                      color: "var(--ds-ink-3)", lineHeight: 1.5 }}>
                      Lo que vayas abriendo aparece aquí.
                    </div>
                  )}
              </div>
              <div style={{ flex: "2 1 420px", minWidth: 280,
                display: "flex", flexDirection: "column", gap: "var(--ds-5)" }}>
                {grupos.map((g, gi) => (
                  <div key={g.titulo}>
                    <Titulo>{g.titulo}</Titulo>
                    <div style={{ display: "grid", gap: "var(--ds-3)",
                      gridTemplateColumns: "repeat(auto-fill, minmax(136px, 1fr))" }}>
                      {g.items.map((it, ii) => (
                        <Azulejo key={it.id} icono={it.icono} etiqueta={it.texto}
                          nota={it.subtitulo} color={it.color} ancho={it.ancho}
                          entrada={indices[gi][ii]} onClick={() => ir(it)} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ---- Buscador ---- */}
        <div style={{ padding: "var(--ds-3) var(--ds-5) var(--ds-5)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-3)",
            padding: "0 var(--ds-4)", height: 48, borderRadius: "var(--ds-r-pill)",
            background: "var(--ds-surface)", border: "1px solid var(--ds-line)",
            boxShadow: "var(--ds-lift-1)" }}>
            <span style={{ color: "var(--ds-ink-3)", display: "grid", placeItems: "center" }}>{lupa}</span>
            <input ref={campo} value={busqueda} onChange={(e) => onBusqueda?.(e.target.value)}
              placeholder={marcadorBusqueda} aria-label={marcadorBusqueda}
              style={{ flex: 1, minWidth: 0, background: "transparent", border: "none",
                outline: "none", fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-body)",
                fontWeight: 600, color: "var(--ds-ink)" }} />
            {busqueda && (
              <button onClick={() => onBusqueda?.("")} aria-label="Limpiar búsqueda"
                style={{ background: "transparent", border: "none", cursor: "pointer",
                  color: "var(--ds-ink-3)", display: "grid", placeItems: "center", padding: 2 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
