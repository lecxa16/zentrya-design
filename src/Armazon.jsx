/**
 * Armazón — el esqueleto de la aplicación, en tres modos intercambiables.
 *
 *   topbar   barra arriba y el contenido a todo lo ancho
 *   sidebar  columna a la izquierda, contenido a la derecha
 *   dock     barra flotante abajo, estilo escritorio
 *
 * El modo es una preferencia de quien usa la app, no una decisión de cada
 * pantalla: se guarda igual que el tema y todas lo respetan. Una pantalla
 * escribe su contenido una sola vez y sirve para los tres.
 *
 * El armazón también es el dueño del **cambio de vista**: con `vista` (la ruta
 * actual) anima la entrada del contenido y lo lleva al principio de la página.
 * Así ninguna pantalla tiene que acordarse de hacerlo, y el chasis —barra,
 * riel o dock— se queda quieto mientras cambia lo de dentro, que es
 * justamente lo que lo vuelve un chasis.
 */
import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Transicion from "./primitivas/Transicion";
import { useAngosto } from "./ancho";

const LLAVE = "ds-nav";
const MODOS = ["topbar", "sidebar", "dock"];
/* Exportado porque cualquier pieza que se fije abajo tiene que saber cuánto
   sitio ocupa el dock: si no, queda debajo y no se puede pulsar. */
export const ALTO_DOCK = 64;
const ArmazonCtx = createContext({ modo: "topbar", fijarModo: () => {} });
export const useArmazon = () => useContext(ArmazonCtx);

/* Debajo de 760px los tres modos se comprimen, pero NINGUNO se sustituye por
   otro: la elección de quien usa la app se respeta a cualquier tamaño. La
   barra pasa a dos filas, el menú lateral se queda en iconos y el dock ya nace
   preparado para lo angosto. El hook vive en `ancho.js` — lo comparten el
   chasis, las migas y cualquier pantalla que cambie de forma, no de estilo. */

function inicial() {
  try {
    const g = localStorage.getItem(LLAVE);
    if (MODOS.includes(g)) return g;
  } catch (e) { /* sin almacenamiento */ }
  return "topbar";
}

/* ---------------- piezas compartidas ---------------- */

const vidrio = {
  background: "var(--ds-frame)",
  backdropFilter: "var(--ds-blur)",
  WebkitBackdropFilter: "var(--ds-blur)",
  border: "1px solid var(--ds-line)",
};

function Marca({ marca }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
      fontWeight: 800, fontSize: "var(--ds-t-body)", letterSpacing: "-0.02em",
      color: "var(--ds-ink)" }}>
      {marca}
    </div>
  );
}

/** Píldora de navegación: la activa se rellena, como en la referencia. */
function Pildora({ s, esta, onIr, conTexto = true }) {
  return (
    <button onClick={() => onIr?.(s)} aria-current={esta ? "page" : undefined} title={s.texto}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
        fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 700,
        padding: conTexto ? "9px 16px" : "10px", borderRadius: "var(--ds-r-pill)",
        border: "1px solid transparent", cursor: "pointer",
        background: esta ? "var(--ds-ink)" : "var(--ds-surface)",
        color: esta ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
        boxShadow: esta ? "var(--ds-lift-2)" : "none",
        transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease), transform var(--ds-t-tap) var(--ds-ease)",
      }}
      onMouseEnter={(e) => { if (!esta) { e.currentTarget.style.background = "var(--ds-surface-solid)"; e.currentTarget.style.color = "var(--ds-ink)"; } }}
      onMouseLeave={(e) => { if (!esta) { e.currentTarget.style.background = "var(--ds-surface)"; e.currentTarget.style.color = "var(--ds-ink-2)"; } }}
      onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.96)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "none"; }}
    >
      {s.icono}{conTexto && s.texto}
    </button>
  );
}

/* ---------------- los tres modos ---------------- */

function ModoTopbar({ marca, secciones, activa, onIr, derecha, migas, children }) {
  const angosto = useAngosto();
  const barra = useRef(null);
  const [alto, setAlto] = useState(56);

  /* `position: fixed`, no `sticky`.
     `sticky` se ancla al contenedor de scroll más cercano, y aquí el `body`
     de la aplicación lleva `overflow: hidden auto`: eso lo convierte en ese
     contenedor, pero quien scrollea de verdad es `html`. La barra quedaba
     anclada a algo que nunca se mueve, así que se iba con el contenido.
     `fixed` se ancla al viewport y no depende de ancestros ajenos.
     El alto se mide porque cambia: en angosto la barra pasa a dos filas. */
  useLayoutEffect(() => {
    const el = barra.current;
    if (!el) return undefined;
    const medir = () => setAlto(el.getBoundingClientRect().height);
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [angosto]);

  /* Las píldoras, en su propia fila deslizable cuando no caben. */
  const pildoras = (
    <div style={{
      display: "flex", alignItems: "center", gap: "var(--ds-2)",
      flexWrap: angosto ? "nowrap" : "wrap",
      overflowX: angosto ? "auto" : "visible",
      scrollbarWidth: "none", minWidth: 0,
      ...(angosto ? { width: "100%", paddingBottom: 2 } : { flex: 1 }),
    }}>
      {secciones.map((s) => <Pildora key={s.id} s={s} esta={s.id === activa} onIr={onIr} />)}
    </div>
  );

  return (
    <div style={{ minHeight: "100%", padding: "var(--ds-4)" }}>
      <header ref={barra} style={{
        ...vidrio, display: "flex", alignItems: "center", gap: "var(--ds-2)",
        padding: angosto ? "var(--ds-3)" : "var(--ds-2) var(--ds-3)",
        borderRadius: angosto ? "var(--ds-r-card)" : "var(--ds-r-pill)",
        boxShadow: "var(--ds-lift-2)",
        position: "fixed", top: "var(--ds-4)",
        left: "var(--ds-4)", right: "var(--ds-4)", zIndex: 30,
        flexWrap: "wrap", rowGap: "var(--ds-3)",
      }}>
        <div style={{ paddingLeft: angosto ? 2 : 8, paddingRight: 8 }}><Marca marca={marca} /></div>
        {!angosto && pildoras}
        <div style={{ flex: angosto ? 1 : "0 0 auto", display: "flex", justifyContent: "flex-end" }}>
          {derecha}
        </div>
        {angosto && pildoras}
      </header>
      <main style={{ paddingTop: alto + 20 }}>{migas}{children}</main>
    </div>
  );
}

function ModoSidebar({ marca, secciones, activa, onIr, derecha, migas, children }) {
  const angosto = useAngosto();
  const [desplegado, setDesplegado] = useState(true);
  /* En una pantalla angosta un riel de 244px se come el contenido. */
  const abierto = desplegado && !angosto;
  const ancho = abierto ? 244 : 64;
  const HUECO = 16;   // var(--ds-4), en número porque hay que sumarlo

  /* `position: fixed`, no `sticky`, por lo mismo que la barra de arriba: el
     `body` de la aplicación lleva `overflow: auto`, así que él pasa a ser el
     contenedor de scroll aunque quien scrollea sea `html`, y el `sticky`
     queda anclado a algo que nunca se mueve. El contenido reserva el ancho
     con un margen, que sigue al riel cuando se contrae. */
  return (
    <div style={{ minHeight: "100%", padding: "var(--ds-4)" }}>
      <aside style={{
        ...vidrio, width: ancho, borderRadius: "var(--ds-r-frame)",
        padding: "var(--ds-3)", boxShadow: "var(--ds-lift-2)",
        position: "fixed", top: "var(--ds-4)", left: "var(--ds-4)",
        bottom: "var(--ds-4)", zIndex: 30,
        overflowY: "auto", overflowX: "hidden",
        transition: "width var(--ds-t-move) var(--ds-ease)",
        display: "flex", flexDirection: "column", gap: "var(--ds-2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "6px 8px 10px" }}>
          {abierto && <Marca marca={marca} />}
          {!angosto && <button onClick={() => setDesplegado((v) => !v)} aria-label="Contraer menú"
            style={{ background: "transparent", border: "none", cursor: "pointer",
              color: "var(--ds-ink-3)", padding: 4, borderRadius: 8, lineHeight: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round">
              <path d={abierto ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
            </svg>
          </button>}
        </div>

        {secciones.map((s) => {
          const esta = s.id === activa;
          return (
            <button key={s.id} onClick={() => onIr?.(s)} title={s.texto}
              aria-current={esta ? "page" : undefined}
              style={{
                display: "flex", alignItems: "center", gap: 11,
                justifyContent: abierto ? "flex-start" : "center",
                fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 700,
                padding: abierto ? "11px 13px" : "11px 0", borderRadius: "var(--ds-r-item)", border: "none",
                cursor: "pointer", textAlign: "left", width: "100%",
                /* El activo se ELEVA en una tarjeta sólida, como en la referencia:
                   no se marca con una línea de color al costado. */
                background: esta ? "var(--ds-surface-solid)" : "transparent",
                color: esta ? "var(--ds-ink)" : "var(--ds-ink-2)",
                boxShadow: esta ? "var(--ds-lift-1)" : "none",
                transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)",
              }}
              onMouseEnter={(e) => { if (!esta) e.currentTarget.style.background = "var(--ds-surface-2)"; }}
              onMouseLeave={(e) => { if (!esta) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ display: "grid", placeItems: "center", width: 18, height: 18,
                flexShrink: 0, color: esta ? "var(--ds-accent-tinta)" : "inherit" }}>
                {s.icono || "•"}
              </span>
              {abierto && s.texto}
            </button>
          );
        })}

        <div style={{ flex: 1 }} />
        {derecha ? (
          <div style={{
            paddingTop: "var(--ds-3)", marginTop: "var(--ds-1)",
            borderTop: "1px solid var(--ds-line)",
            display: "flex", flexWrap: "wrap", gap: "var(--ds-2)",
            justifyContent: abierto ? "flex-start" : "center",
          }}>{derecha}</div>
        ) : null}
      </aside>

      <main style={{ minWidth: 0, marginLeft: ancho + HUECO,
        transition: "margin-left var(--ds-t-move) var(--ds-ease)" }}>
        {migas}{children}
      </main>
    </div>
  );
}

function ModoDock({
  marca, icono, secciones, activa, onIr, derecha,
  inicio, inicioAbierto = false, onInicioAbierto, migas, children,
}) {
  return (
    <div style={{ minHeight: "100%", padding: "var(--ds-4)",
      paddingBottom: `calc(${ALTO_DOCK}px + var(--ds-6))` }}>
      <main>{migas}{children}</main>

      {/* Barra de tareas: de borde a borde y pegada abajo, como la del
          escritorio que imita. El inicio a la izquierda, las secciones al
          centro y los controles a la derecha — que es donde los busca
          quien ya usó un escritorio. */}
      <nav aria-label="Navegación principal" style={{
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40,
        height: ALTO_DOCK, boxSizing: "border-box",
        display: "flex", alignItems: "center", gap: "var(--ds-2)",
        padding: "0 var(--ds-4)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        background: "var(--ds-panel)",
        borderTop: "1px solid var(--ds-line)",
        backdropFilter: "var(--ds-blur)", WebkitBackdropFilter: "var(--ds-blur)",
        boxShadow: "var(--ds-lift-3)",
      }}>
        {/* Tres columnas con los extremos del MISMO peso: así el grupo del
            centro queda centrado en la pantalla y no a medio camino entre
            el inicio y los controles, que ocupan anchos distintos. */}
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", alignItems: "center",
          gap: "var(--ds-1)" }}>
          {inicio && (
            <BotonInicio abierto={inicioAbierto} icono={icono}
              onClick={() => onInicioAbierto?.(!inicioAbierto)} />
          )}
        </div>

        {/* Las secciones se deslizan si no caben. El centrado va con
            `margin: auto` en el interior: con `justify-content: center`, lo
            que desborda se sale por el borde de INICIO, que no es
            alcanzable con scroll — las primeras secciones desaparecían. */}
        <div style={{ flex: "0 1 auto", minWidth: 0, display: "flex", alignItems: "center",
          justifyContent: "flex-start", overflowX: "auto", scrollbarWidth: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-1)",
            margin: "0 auto" }}>
          {secciones.map((s) => {
            const esta = s.id === activa;
            return (
              <button key={s.id} onClick={() => onIr?.(s)} title={s.texto}
                aria-current={esta ? "page" : undefined}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                  fontFamily: "var(--ds-font)", fontSize: "0.66rem", fontWeight: 700,
                  padding: "7px 15px", borderRadius: "var(--ds-r-item)", border: "none",
                  cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                  background: esta ? "var(--ds-ink)" : "transparent",
                  color: esta ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
                  transition: "transform var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  if (!esta) {
                    e.currentTarget.style.background = "var(--ds-surface-2)";
                    e.currentTarget.style.color = "var(--ds-ink)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  if (!esta) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--ds-ink-2)";
                  }
                }}
              >
                <span style={{ display: "grid", placeItems: "center", height: 19 }}>
                  {s.icono || "\u2022"}
                </span>
                {s.texto}
              </button>
            );
          })}
          </div>
        </div>

        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", alignItems: "center",
          justifyContent: "flex-end", gap: "var(--ds-2)" }}>
          {derecha}
        </div>
      </nav>

      {inicio}
    </div>
  );
}

/** El botón que abre el lanzador. Su marca gira un poco al abrirse. */
function BotonInicio({ abierto, onClick, icono }) {
  return (
    <button onClick={onClick} aria-label="Menú de inicio" aria-expanded={abierto}
      title="Inicio"
      style={{
        display: "grid", placeItems: "center", width: 44, height: 44, flexShrink: 0,
        borderRadius: "var(--ds-r-item)", border: "none", cursor: "pointer",
        background: abierto ? "var(--ds-surface-solid)" : "transparent",
        boxShadow: abierto ? "var(--ds-lift-1)" : "none",
        transition: "background var(--ds-t-state) var(--ds-ease), transform var(--ds-t-state) var(--ds-ease)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}>
      <span style={{
        display: "grid", placeItems: "center", width: 26, height: 26,
        transform: abierto ? "scale(0.92)" : "none",
        transition: "transform var(--ds-t-move) var(--ds-ease)",
      }}>
        {/* Sin icono del producto, la marca del sistema. */}
        {icono || (
          <span style={{ width: 22, height: 22, borderRadius: 7,
            background: "var(--ds-hero)", boxShadow: "var(--ds-lift-accent)",
            display: "block" }} />
        )}
      </span>
    </button>
  );
}

/* ---------------- el armazón ---------------- */

export default function Armazon({
  marca, icono, secciones = [], activa, onIr, derecha,
  inicio, inicioAbierto, onInicioAbierto, migas, modo: modoFijo, vista, children,
}) {
  const [modo, setModo] = useState(() => modoFijo || inicial());

  /* La vista nueva empieza arriba. Llegar a un expediente a media página
     —con el scroll donde lo dejó la lista— es de las cosas que más
     desorientan, y no hay pantalla que pueda resolverlo por su cuenta. */
  useEffect(() => {
    if (vista === undefined) return;
    window.scrollTo({ top: 0, left: 0 });
  }, [vista]);

  useEffect(() => {
    if (modoFijo) { setModo(modoFijo); return; }
    try { localStorage.setItem(LLAVE, modo); } catch (e) { /* sin persistencia */ }
  }, [modo, modoFijo]);

  const fijarModo = useCallback((m) => { if (MODOS.includes(m)) setModo(m); }, []);

  /* Las migas entran en la transición con el contenido: son parte de la vista
     —cambian con ella— y dejarlas fuera las haría saltar mientras lo demás
     aparece. */
  const cuerpo = <Transicion vista={vista}>{migas}{children}</Transicion>;
  const props = { marca, icono, secciones, activa, onIr, derecha, inicio,
    inicioAbierto, onInicioAbierto, migas: null, children: cuerpo };
  const Elegido = modo === "sidebar" ? ModoSidebar : modo === "dock" ? ModoDock : ModoTopbar;

  return (
    <ArmazonCtx.Provider value={{ modo, fijarModo, modos: MODOS }}>
      <Elegido {...props} />
    </ArmazonCtx.Provider>
  );
}

/** Selector de modo, para probar los tres sin tocar código. */
export function SelectorArmazon() {
  const { modo, fijarModo } = useArmazon();
  const [abierto, setAbierto] = useState(false);
  const [sitio, setSitio] = useState(null);
  const caja = useRef(null);
  const menu = useRef(null);

  const opciones = [
    { id: "topbar",  texto: "Barra arriba", icono: "M3 5h18M3 5v14h18V5" },
    { id: "sidebar", texto: "Menú lateral", icono: "M3 5h18v14H3zM9 5v14" },
    { id: "dock",    texto: "Dock abajo",   icono: "M3 5h18v14H3zM3 15h18" },
  ];
  const actual = opciones.find((o) => o.id === modo) || opciones[0];

  /* En el dock el botón vive pegado al borde inferior, así que el menú sólo
     cabe hacia arriba. En los otros dos modos está arriba y cae hacia
     abajo: un menú que se abre fuera de la pantalla no es un menú. */
  const haciaArriba = modo === "dock";

  /* El menú se dibuja en un PORTAL con posición fija, no dentro del botón.
     En el modo lateral el botón vive en un `aside` con `overflow`, y un
     menú absoluto ahí dentro se recorta: no se veía nada. Un portal no
     depende de ningún ancestro. */
  useLayoutEffect(() => {
    if (!abierto) return undefined;
    const MARGEN = 8;
    const ubicar = () => {
      const r = caja.current?.getBoundingClientRect();
      if (!r) return;
      /* Se ancla al lado donde HAY sitio. Alinear siempre a la derecha del
         botón mandaba el menú fuera de la pantalla cuando el botón vivía
         a la izquierda, como en el menú lateral. */
      const ancho = menu.current?.offsetWidth || 190;
      const alto = menu.current?.offsetHeight || 160;
      const alaIzquierda = r.left + r.width / 2 < window.innerWidth / 2;

      let izq = alaIzquierda ? r.left : r.right - ancho;
      izq = Math.min(Math.max(MARGEN, izq), window.innerWidth - ancho - MARGEN);

      let arriba = haciaArriba ? r.top - alto - 10 : r.bottom + 10;
      arriba = Math.min(Math.max(MARGEN, arriba), window.innerHeight - alto - MARGEN);

      setSitio({ izq, arriba });
    };
    ubicar();
    const segundaPasada = requestAnimationFrame(ubicar);
    window.addEventListener("resize", ubicar);
    window.addEventListener("scroll", ubicar, true);
    return () => {
      cancelAnimationFrame(segundaPasada);
      window.removeEventListener("resize", ubicar);
      window.removeEventListener("scroll", ubicar, true);
    };
  }, [abierto, haciaArriba]);

  useEffect(() => {
    if (!abierto) return undefined;
    const alTeclear = (e) => { if (e.key === "Escape") { e.stopPropagation(); setAbierto(false); } };
    const alClic = (e) => {
      if (caja.current?.contains(e.target) || menu.current?.contains(e.target)) return;
      setAbierto(false);
    };
    document.addEventListener("keydown", alTeclear, true);
    document.addEventListener("mousedown", alClic, true);
    return () => {
      document.removeEventListener("keydown", alTeclear, true);
      document.removeEventListener("mousedown", alClic, true);
    };
  }, [abierto]);

  const dibujo = (d) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
  );

  return (
    <div ref={caja} style={{ position: "relative", flexShrink: 0 }}>
      <button onClick={() => setAbierto((v) => !v)}
        aria-haspopup="menu" aria-expanded={abierto}
        title={`Navegación: ${actual.texto}`} aria-label={`Navegación: ${actual.texto}`}
        style={{
          display: "grid", placeItems: "center", width: 36, height: 36,
          borderRadius: "var(--ds-r-pill)", cursor: "pointer",
          background: abierto ? "var(--ds-surface-solid)" : "var(--ds-surface)",
          border: "1px solid var(--ds-line)",
          color: abierto ? "var(--ds-ink)" : "var(--ds-ink-2)",
          transition: "background var(--ds-t-state) var(--ds-ease)",
        }}>
        {dibujo(actual.icono)}
      </button>

      {abierto && sitio && createPortal((
        <div role="menu" ref={menu} style={{
          position: "fixed", left: sitio.izq, top: sitio.arriba, zIndex: 70, minWidth: 186,
          padding: "var(--ds-2)", borderRadius: "var(--ds-r-card)",
          background: "var(--ds-panel)", border: "1px solid var(--ds-line)",
          backdropFilter: "var(--ds-blur)", WebkitBackdropFilter: "var(--ds-blur)",
          boxShadow: "var(--ds-lift-3)",
          animation: `${haciaArriba ? "ds-sube" : "ds-baja"} var(--ds-t-state) var(--ds-ease) both`,
        }}>
          <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 700,
            letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ds-ink-3)",
            padding: "4px 10px 7px" }}>
            Navegación
          </div>
          {opciones.map((o) => {
            const esta = o.id === modo;
            return (
              <button key={o.id} role="menuitemradio" aria-checked={esta}
                onClick={() => { fijarModo(o.id); setAbierto(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: "var(--ds-3)", width: "100%",
                  fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 700,
                  padding: "9px 10px", borderRadius: "var(--ds-r-item)", border: "none",
                  cursor: "pointer", textAlign: "left", whiteSpace: "nowrap",
                  background: esta ? "var(--ds-accent-soft)" : "transparent",
                  color: esta ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)",
                  transition: "background var(--ds-t-state) var(--ds-ease)",
                }}
                onMouseEnter={(ev) => { if (!esta) ev.currentTarget.style.background = "var(--ds-surface-2)"; }}
                onMouseLeave={(ev) => { if (!esta) ev.currentTarget.style.background = "transparent"; }}>
                {dibujo(o.icono)}
                <span style={{ flex: 1 }}>{o.texto}</span>
                {/* La palomita dice cuál está puesto sin depender del color. */}
                {esta && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      ), document.body)}
    </div>
  );
}
