/**
 * Lámina — tarjeta con imagen.
 *
 * Las referencias de este sistema usan fotografía como parte del diseño, no
 * como relleno: el edificio, la unidad, el retrato. Una lámina es una imagen
 * con su contenido encima o debajo, siempre con un degradado que garantiza
 * que el texto se lea sobre cualquier foto.
 */
import React from "react";

export default function Lamina({
  imagen, imagenChica, alt = "", alto = 200, children, pie,
  radio = "var(--ds-r-card)", encima = true, encuadre = "center", fondo = false,
  estilo, entrada, ...resto
}) {
  const [rota, setRota] = React.useState(false);

  const Imagen = ({ estiloExtra }) => (
    <img
      src={imagen}
      srcSet={imagenChica ? `${imagenChica} 800w, ${imagen} 1600w` : undefined}
      sizes={imagenChica ? "(max-width: 760px) 100vw, 640px" : undefined}
      alt={alt} loading="lazy" decoding="async"
      onError={() => setRota(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover",
        objectPosition: encuadre, display: "block", ...estiloExtra }} />
  );

  /* Modo fondo: la foto es la tarjeta. El velo cubre todo —más denso abajo,
     donde vive el texto— y el contenido entra en `.ds-sobre-foto`, que
     reescribe los tokens de tinta para ese subárbol. */
  if (fondo) {
    return (
      <div
        {...resto}
        style={{
          /* Sin filete: en modo fondo la fotografía ya define el canto de la
             tarjeta, y un borde encima sólo la encierra. La sombra se queda
             —es lo que la apoya en el lienzo— pero el marco es la imagen. */
          position: "relative", overflow: "hidden", borderRadius: radio,
          display: "flex", flexDirection: "column",
          background: "var(--ds-hero)", border: "none",
          boxShadow: "var(--ds-lift-2)", isolation: "isolate",
          ...(entrada !== undefined
            ? { animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
                animationDelay: `${Math.min(entrada * 55, 240)}ms` }
            : null),
          ...estilo,
        }}
      >
        {imagen && !rota && (
          /* Bajo un velo denso los colores se apagan y la foto se vuelve una
             mancha. Se compensa saturando por debajo: la escena se reconoce
             sin aclarar el velo, que es lo que sostiene la lectura. */
          <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0,
            filter: "saturate(1.35) contrast(1.06)" }}>
            <Imagen />
          </div>
        )}
        <div aria-hidden style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to bottom, rgba(8,9,15,0.26) 0%, rgba(8,9,15,0.58) 32%, rgba(8,9,15,0.82) 66%, rgba(8,9,15,0.92) 100%)",
        }} />
        <div className="ds-sobre-foto"
          style={{ position: "relative", zIndex: 2, padding: "var(--ds-5)",
            display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      {...resto}
      style={{
        position: "relative", overflow: "hidden", borderRadius: radio,
        background: "var(--ds-surface)",
        backdropFilter: "var(--ds-blur)", WebkitBackdropFilter: "var(--ds-blur)",
        border: "1px solid var(--ds-line)", boxShadow: "var(--ds-lift-2)",
        ...(entrada !== undefined
          ? { animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
              animationDelay: `${Math.min(entrada * 55, 240)}ms` }
          : null),
        ...estilo,
      }}
    >
      <div style={{ position: "relative", height: alto, flexShrink: 0, overflow: "hidden" }}>
        {imagen && !rota ? (
          <Imagen />
        ) : (
          /* Sin imagen no se finge una: el hueco se resuelve con el material
             del sistema, no con una foto de archivo. */
          <div style={{ width: "100%", height: "100%", background: "var(--ds-hero)" }} />
        )}

        {encima && children && (
          <>
            <div aria-hidden style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(8,9,15,0.90) 0%, rgba(8,9,15,0.68) 28%, rgba(8,9,15,0.28) 58%, rgba(8,9,15,0) 88%)",
            }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0,
              padding: "var(--ds-4)", color: "#FFFFFF" }}>
              {children}
            </div>
          </>
        )}
      </div>

      {(pie || (!encima && children)) && (
        <div style={{ padding: "var(--ds-4)" }}>{pie || children}</div>
      )}
    </div>
  );
}
