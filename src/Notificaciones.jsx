/**
 * Notificaciones — la campana con lo que no se ha leído y su panel.
 *
 * No sabe de dónde salen los avisos: los recibe (`avisos`) y avisa qué se hizo
 * con ellos (`onAbrir`, `onMarcarTodas`, `onVerTodas`). Cada aviso:
 *   { id, titulo, texto?, fecha?, leido?, tono? }   tono: ok | warn | risk | info
 *
 * El número de la campana dice cuántos faltan por leer, no cuántos hay. En el
 * escritorio el panel se abre bajo la campana; en el teléfono, como hoja desde
 * abajo, donde alcanza el pulgar. Lo no leído se distingue con un punto Y con
 * texto más fuerte: no sólo con color.
 */
import React, { useRef, useState } from "react";
import Flotante from "./primitivas/Flotante";
import Modal from "./primitivas/Modal";
import { useAngosto } from "./ancho";
import { fechaRelativa } from "./formato";

const CAMPANA = (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);

const TONOS = { ok: "var(--ds-ok)", warn: "var(--ds-warn)", risk: "var(--ds-risk)", info: "var(--ds-accent-trazo)" };

function Aviso({ a, onAbrir }) {
  const nuevo = !a.leido;
  return (
    <button type="button" onClick={() => onAbrir?.(a)}
      style={{
        display: "flex", gap: "var(--ds-3)", width: "100%", padding: "10px", textAlign: "left",
        border: "none", borderRadius: "var(--ds-r-item)", cursor: "pointer",
        background: nuevo ? "var(--ds-surface-2)" : "transparent", fontFamily: "var(--ds-font)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ds-surface-solid)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = nuevo ? "var(--ds-surface-2)" : "transparent"; }}>
      <span aria-hidden style={{ width: 8, height: 8, marginTop: 6, flexShrink: 0, borderRadius: "var(--ds-r-pill)",
        background: nuevo ? TONOS[a.tono] || TONOS.info : "transparent" }} />
      <span style={{ flex: 1, minWidth: 0 }}>
        {nuevo && <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Sin leer: </span>}
        <span style={{ display: "block", fontSize: "var(--ds-t-small)", fontWeight: nuevo ? 800 : 600,
          color: "var(--ds-ink)" }}>{a.titulo}</span>
        {a.texto && <span style={{ display: "block", fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)",
          marginTop: 2 }}>{a.texto}</span>}
        {a.fecha && <span className="ds-num" style={{ display: "block", fontSize: "var(--ds-t-micro)",
          color: "var(--ds-ink-2)", marginTop: 4 }}>{fechaRelativa(a.fecha)}</span>}
      </span>
    </button>
  );
}

function Lista({ avisos, onAbrir, onMarcarTodas, onVerTodas, sinLeer }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {avisos.length === 0 ? (
        <p style={{ margin: 0, padding: "var(--ds-6) var(--ds-3)", textAlign: "center",
          fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)" }}>
          No tienes notificaciones. Aquí aparecerá lo que necesite tu atención.
        </p>
      ) : avisos.map((a) => <Aviso key={a.id} a={a} onAbrir={onAbrir} />)}
      {(onVerTodas || (onMarcarTodas && sinLeer > 0)) && (
        <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--ds-2)",
          borderTop: "1px solid var(--ds-line)", marginTop: 4, paddingTop: 6 }}>
          {onMarcarTodas && sinLeer > 0 ? <Enlace onClick={onMarcarTodas}>Marcar todas como leídas</Enlace> : <span />}
          {onVerTodas && <Enlace onClick={onVerTodas}>Ver todas</Enlace>}
        </div>
      )}
    </div>
  );
}

function Enlace({ children, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{
      border: "none", background: "transparent", cursor: "pointer", padding: "8px 10px",
      borderRadius: "var(--ds-r-item)", fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)",
      fontWeight: 600, color: "var(--ds-accent-tinta)",
    }}>{children}</button>
  );
}

export default function Notificaciones({ avisos = [], onAbrir, onMarcarTodas, onVerTodas }) {
  const [abierto, setAbierto] = useState(false);
  const boton = useRef(null);
  const hoja = useAngosto();
  const sinLeer = avisos.filter((a) => !a.leido).length;
  const cerrar = () => setAbierto(false);
  const lista = (
    <Lista avisos={avisos} sinLeer={sinLeer}
      onAbrir={onAbrir && ((a) => { cerrar(); onAbrir(a); })}
      onMarcarTodas={onMarcarTodas} onVerTodas={onVerTodas && (() => { cerrar(); onVerTodas(); })} />
  );

  return (
    <>
      <button ref={boton} type="button" onClick={() => setAbierto((v) => !v)}
        aria-label={sinLeer ? `Notificaciones, ${sinLeer} sin leer` : "Notificaciones"}
        aria-haspopup="dialog" aria-expanded={abierto}
        style={{
          position: "relative", display: "grid", placeItems: "center", width: 40, height: 40, flexShrink: 0,
          border: "none", borderRadius: "var(--ds-r-pill)", cursor: "pointer",
          background: abierto ? "var(--ds-surface-solid)" : "transparent", color: "var(--ds-ink-2)",
        }}>
        {CAMPANA}
        {sinLeer > 0 && (
          <span className="ds-num" aria-hidden style={{
            position: "absolute", top: 3, right: 1, minWidth: 18, height: 18, padding: "0 5px",
            boxSizing: "border-box", borderRadius: "var(--ds-r-pill)", background: "var(--ds-risk)",
            color: "var(--ds-surface-solid)", fontSize: "0.66rem", fontWeight: 700, lineHeight: "18px",
            textAlign: "center", boxShadow: "0 0 0 2px var(--ds-surface-solid)",
          }}>{sinLeer > 99 ? "99+" : sinLeer}</span>
        )}
      </button>

      {hoja ? (
        <Modal abierto={abierto} onCerrar={cerrar} titulo="Notificaciones">{lista}</Modal>
      ) : (
        <Flotante ancla={boton} abierto={abierto} onCerrar={cerrar} rol="dialog" etiqueta="Notificaciones"
          minAncho={360} estilo={{ width: 380 }}>
          <div style={{ padding: "4px 10px 8px", fontWeight: 700, fontSize: "var(--ds-t-body)",
            color: "var(--ds-ink)" }}>Notificaciones</div>
          {lista}
        </Flotante>
      )}
    </>
  );
}
