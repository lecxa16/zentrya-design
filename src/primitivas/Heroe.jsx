/**
 * Héroe — la pieza protagonista, la única que lleva el gradiente.
 *
 * Regla del sistema: **un héroe por pantalla**. Si el gradiente aparece dos
 * veces deja de señalar qué importa y pasa a ser decoración.
 *
 * Sobre el gradiente —y sólo ahí— vive el vidrio: las pastillas translúcidas
 * con blur necesitan algo que difuminar. Sobre blanco no difuminan nada y se
 * ven como un rectángulo gris.
 */
import React from "react";

export default function Heroe({
  children, imagen, imagenChica, encuadre = "center", alt = "", intensidad = 0.26,
  soloFoto = false,
  radio = "var(--ds-r-card)", relleno = "var(--ds-8)", estilo, entrada, ...resto
}) {
  const [rota, setRota] = React.useState(false);
  /* Si la foto no carga, el héroe vuelve a ser el gradiente: la pieza
     protagonista de una pantalla no puede quedarse en un rectángulo negro. */
  const puraFoto = soloFoto && imagen && !rota;

  return (
    <div
      {...resto}
      style={{
        position: "relative",
        overflow: "hidden",
        background: puraFoto ? "#0B0C12" : "var(--ds-hero)",
        borderRadius: radio,
        padding: relleno,
        color: "var(--ds-ink-on-accent)",
        boxShadow: puraFoto ? "var(--ds-lift-3)" : "var(--ds-lift-accent), var(--ds-lift-2)",
        ...(entrada !== undefined
          ? { animation: `ds-rise var(--ds-t-scene) var(--ds-ease) both`,
              animationDelay: `${Math.min(entrada * 55, 240)}ms` }
          : null),
        ...estilo,
      }}
    >
      {/* La fotografía entra en modo `luminosity`: toma su luz y el color lo
          sigue poniendo el gradiente. Así el héroe gana materia sin dejar de
          ser la pieza de marca, y el texto blanco encima nunca se pelea con
          una zona clara de la foto. */}
      {imagen && (
        <img
          aria-hidden={alt ? undefined : "true"} alt={alt}
          src={imagen}
          srcSet={imagenChica ? `${imagenChica} 800w, ${imagen} 1600w` : undefined}
          sizes={imagenChica ? "(max-width: 760px) 100vw, 900px" : undefined}
          loading="lazy" decoding="async"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: encuadre,
            pointerEvents: "none",
            ...(puraFoto
              ? { filter: "saturate(1.08)" }
              : { mixBlendMode: "luminosity", opacity: intensidad }),
          }}
          onError={() => setRota(true)} />
      )}

      {/* Sin gradiente, el velo es lo único que sostiene el texto blanco. Y
          el contenido del héroe vive arriba, en medio y abajo, así que no
          sirve una rampa de un solo lado: va un velo parejo, reforzado en
          los dos extremos. */}
      {puraFoto && (
        <>
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(8,9,15,0.58) 0%, rgba(8,9,15,0.30) 26%, rgba(8,9,15,0.34) 60%, rgba(8,9,15,0.78) 100%)",
          }} />
          {/* Y uno lateral: el contenido del héroe se alinea a la izquierda,
              así que ahí es donde hace falta el apoyo. Oscurecer la foto
              entera para proteger una columna de texto es pagar de más. */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(to right, rgba(8,9,15,0.52) 0%, rgba(8,9,15,0.26) 38%, rgba(8,9,15,0) 68%)",
          }} />
        </>
      )}

      {/* Dos focos de luz: el gradiente plano se ve impreso, éste se ve
          iluminado. Sobre una fotografía sobra — la lavaría. */}
      {!puraFoto && (
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "var(--ds-hero-glow)", pointerEvents: "none" }} />
      )}
      <div style={{ position: "relative", display: "flex", flexDirection: "column",
        height: "100%" }}>{children}</div>
    </div>
  );
}

/** Vidrio: existe únicamente encima del héroe. */
export function Vidrio({ children, interactivo = false, estilo, ...resto }) {
  return (
    <div
      {...resto}
      style={{
        background: "rgba(255,255,255,0.15)",
        border: "1px solid var(--ds-line-glass)",
        backdropFilter: "blur(14px) saturate(150%)",
        WebkitBackdropFilter: "blur(14px) saturate(150%)",
        borderRadius: "var(--ds-r-item)",
        padding: "var(--ds-3) var(--ds-4)",
        color: "var(--ds-ink-on-accent)",
        transition: `background var(--ds-t-state) var(--ds-ease), transform var(--ds-t-state) var(--ds-ease)`,
        cursor: interactivo ? "pointer" : undefined,
        ...estilo,
      }}
      onMouseEnter={interactivo ? (e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.24)";
        e.currentTarget.style.transform = "translateY(-2px)";
      } : undefined}
      onMouseLeave={interactivo ? (e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.15)";
        e.currentTarget.style.transform = "none";
      } : undefined}
    >
      {children}
    </div>
  );
}
