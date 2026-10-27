/**
 * Fila — la unidad de lista del sistema.
 *
 * Reemplaza a la tabla cuando cada renglón es una persona, un documento o un
 * movimiento: con retrato, un cuerpo que respira y el dato duro a la derecha.
 * Para matrices de números sigue siendo mejor una tabla.
 */
import React from "react";
import { blobatar } from "blobatar/blob";

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
        <div style={{ fontSize: "var(--ds-t-body)", fontWeight: 600, color: "var(--ds-ink)",
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

/**
 * Retrato: la foto de la persona; sin foto, sus iniciales.
 *
 * `generico`: sin foto (o si la foto no carga) dibuja la silueta de una
 * persona en lugar de iniciales. Para productos donde casi nadie tiene foto y
 * un muro de iniciales se lee como una lista de siglas.
 *
 * `figura`: sin foto dibuja la figura (blobatar) que sale del nombre: la misma
 * persona es la misma figura en todas partes, sin guardar nada. Si también
 * viene `generico`, gana la figura. Sin nombre no hay figura: iniciales.
 */
export function Retrato({ src, nombre = "", tamano = 40, tono = "acento", generico = false, figura = false }) {
  const [roto, setRoto] = React.useState(false);
  React.useEffect(() => { setRoto(false); }, [src]);
  const iniciales = nombre.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
  const conFoto = src && !roto;
  const conFigura = figura && !conFoto && !!nombre.trim();
  /* Como <img> con data URI: un nodo por retrato aunque la lista traiga
     cientos. alt vacío porque el nombre siempre va al lado (o en la etiqueta
     del botón), igual que la foto. */
  const srcFigura = React.useMemo(
    () => (conFigura ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(blobatar(nombre))}` : null),
    [conFigura, nombre],
  );
  const silueta = generico && !conFigura;
  /* Opaco a propósito: `--ds-surface-sunk` es translúcido, y en un grupo
     encimado (GrupoRetratos) el retrato de abajo se transparentaba y sobre
     una tarjeta blanca el círculo desaparecía. */
  const fondo = silueta && !conFoto ? "var(--ds-retrato-neutro)"
    : tono === "acento" ? "var(--ds-accent-soft)" : "var(--ds-retrato-neutro)";
  /* La silueta es dibujo (ink-3); las iniciales en neutro son texto y en
     ink-3 daban 3.93:1 en claro (lo cachó axe): ink-2. */
  const tinta = silueta ? "var(--ds-ink-3)" : tono === "acento" ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)";
  return (
    <div style={{
      width: tamano, height: tamano, flexShrink: 0, borderRadius: "var(--ds-r-pill)",
      background: fondo, color: tinta, overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: tamano * 0.34, fontWeight: 700, letterSpacing: "-0.02em",
    }}>
      {conFoto
        ? <img src={src} alt="" onError={() => setRoto(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : conFigura
          /* blobatar ya trae margen en su lienzo: al 90 % llena el círculo sin que
             lo toque la figura más ancha (la cápsula). */
          ? <img src={srcFigura} alt="" draggable={false}
              style={{ width: "90%", height: "90%", display: "block" }} />
        : silueta ? (
          /* La silueta llena el círculo hasta abajo, como un retrato de verdad:
             cabeza arriba, hombros cortados por el borde. */
          <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden style={{ display: "block" }}>
            <circle cx="20" cy="15.5" r="7.2" fill="currentColor" opacity="0.55" />
            <path d="M5.5 40c0-8.6 6.5-14.2 14.5-14.2S34.5 31.4 34.5 40z" fill="currentColor" opacity="0.55" />
          </svg>
        ) : iniciales}
    </div>
  );
}
