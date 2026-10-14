/**
 * Fila — la unidad de lista del sistema.
 *
 * Reemplaza a la tabla cuando cada renglón es una persona, un documento o un
 * movimiento: con retrato, un cuerpo que respira y el dato duro a la derecha.
 * Para matrices de números sigue siendo mejor una tabla.
 */
import React from "react";

export default function Fila({
  izquierda, titulo, subtitulo, derecha, extremo, onClick, estilo, entrada, ...resto
}) {
  const clicable = !!onClick;
  return (
    <div
      {...resto}
      onClick={onClick}
      role={clicable ? "button" : undefined}
      tabIndex={clicable ? 0 : undefined}
      onKeyDown={clicable ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(e); } } : undefined}
      style={{
        display: "flex", alignItems: "center", gap: "var(--ds-3)",
        padding: "var(--ds-3) var(--ds-4)", borderRadius: "var(--ds-r-item)",
        cursor: clicable ? "pointer" : undefined,
        transition: "background var(--ds-t-state) var(--ds-ease)",
        ...(entrada !== undefined
          ? { animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
              animationDelay: `${Math.min(entrada * 28, 260)}ms` }
          : null),
        ...estilo,
      }}
      onMouseEnter={clicable ? (e) => { e.currentTarget.style.background = "var(--ds-surface-2)"; } : undefined}
      onMouseLeave={clicable ? (e) => { e.currentTarget.style.background = "transparent"; } : undefined}
    >
      {izquierda}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "var(--ds-t-body)", fontWeight: 700, color: "var(--ds-ink)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {titulo}
        </div>
        {subtitulo && (
          <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {subtitulo}
          </div>
        )}
      </div>
      {derecha && <div style={{ flexShrink: 0, textAlign: "right" }}>{derecha}</div>}
      {extremo && <div style={{ flexShrink: 0 }}>{extremo}</div>}
    </div>
  );
}

/** Retrato: avatar con iniciales de respaldo, en el tono del sistema. */
export function Retrato({ src, nombre = "", tamano = 40, tono = "acento" }) {
  const [roto, setRoto] = React.useState(false);
  const iniciales = nombre.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
  const fondo = tono === "acento" ? "var(--ds-accent-soft)" : "var(--ds-surface-sunk)";
  const tinta = tono === "acento" ? "var(--ds-accent)" : "var(--ds-ink-2)";
  return (
    <div style={{
      width: tamano, height: tamano, flexShrink: 0, borderRadius: "var(--ds-r-pill)",
      background: fondo, color: tinta, overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: tamano * 0.34, fontWeight: 800, letterSpacing: "-0.02em",
    }}>
      {src && !roto
        ? <img src={src} alt="" onError={() => setRoto(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : iniciales}
    </div>
  );
}
