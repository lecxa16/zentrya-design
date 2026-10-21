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
 * En el teléfono (≤ 760 px) los tres se vuelven UNO: cabecera compacta arriba
 * y pestañas abajo, al alcance del pulgar. La preferencia no se pierde —vuelve
 * en cuanto hay ancho—, pero en una pantalla de bolsillo tres formas de
 * navegar son tres maneras de quitarle sitio al contenido (Carlos, 2026-10-21).
 *
 * Ningún modo depende de cuántas secciones tenga el producto: el menú lateral
 * desliza la lista y deja fijos sus controles, y el dock pasa a sólo iconos y
 * después a «Más» cuando no le caben. Un chasis que se corta con once
 * secciones no es un chasis.
 *
 * El armazón también es el dueño del **cambio de vista**: con `vista` (la ruta
 * actual) anima la entrada del contenido y lo lleva al principio de la página.
 * Así ninguna pantalla tiene que acordarse de hacerlo, y el chasis —barra,
 * riel o dock— se queda quieto mientras cambia lo de dentro, que es
 * justamente lo que lo vuelve un chasis.
 *
 * Cada modo publica cuánto sitio ocupa en `--ds-reserva-arriba` y
 * `--ds-reserva-abajo`. Una pantalla que tiene que llenar exactamente lo que
 * queda —un chat, con su caja de escribir pegada abajo— mide con eso:
 *   height: calc(100dvh - var(--ds-reserva-arriba) - var(--ds-reserva-abajo))
 *
 * Cada sección puede traer `insignia`: un número de pendientes (mensajes sin
 * leer, por ejemplo). Se dibuja igual en los cuatro chasis.
 */
import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Transicion from "./primitivas/Transicion";
import Modal from "./primitivas/Modal";
import { useAngosto, useMedia } from "./ancho";

const LLAVE = "ds-nav";
const MODOS = ["topbar", "sidebar", "dock"];
/* Exportado porque cualquier pieza que se fije abajo tiene que saber cuánto
   sitio ocupa el dock: si no, queda debajo y no se puede pulsar. Las pestañas
   del teléfono miden lo mismo, y por eso el lanzador cabe encima de las dos. */
export const ALTO_DOCK = 64;
/* La cabecera del teléfono: sólo marca y acciones, sin segunda fila. */
export const ALTO_CABECERA_MOVIL = 52;
const ArmazonCtx = createContext({ modo: "topbar", movil: false, fijarModo: () => {} });
export const useArmazon = () => useContext(ArmazonCtx);

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

/** Publica el sitio que ocupa el chasis. Va en el elemento raíz porque las
    pantallas lo leen desde cualquier profundidad, incluso desde un portal. */
function useReserva(arriba, abajo) {
  useLayoutEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--ds-reserva-arriba", arriba);
    r.setProperty("--ds-reserva-abajo", abajo);
    return () => {
      r.removeProperty("--ds-reserva-arriba");
      r.removeProperty("--ds-reserva-abajo");
    };
  }, [arriba, abajo]);
}

/** Los pendientes de una sección. Es un ESTADO —algo espera—, por eso va en el
    tono de riesgo; la tinta de encima es la superficie, que contrasta en los
    dos temas (4.8:1 en claro, 7:1 en oscuro). */
function Contador({ n, sobre = false }) {
  const v = Number(n) || 0;
  if (v <= 0) return null;
  return (
    <span className="ds-num" aria-label={`${v} pendientes`} style={{
      ...(sobre ? { position: "absolute", top: -6, right: -9 } : {}),
      minWidth: 18, height: 18, padding: "0 5px", boxSizing: "border-box",
      borderRadius: "var(--ds-r-pill)", background: "var(--ds-risk)",
      color: "var(--ds-surface-solid)", fontSize: "0.66rem", fontWeight: 800,
      lineHeight: "18px", textAlign: "center", flexShrink: 0,
      boxShadow: sobre ? "0 0 0 2px var(--ds-surface-solid)" : "none",
    }}>{v > 99 ? "99+" : v}</span>
  );
}

/** El icono de una sección con su contador encima. */
function IconoSeccion({ s, alto = 18 }) {
  return (
    <span style={{ position: "relative", display: "grid", placeItems: "center",
      width: 18, height: alto, flexShrink: 0 }}>
      {s.icono || "•"}
      <Contador n={s.insignia} sobre />
    </span>
  );
}

/** `encoge`: en la cabecera del teléfono la marca cede antes que los
    controles — un nombre recortado se sigue reconociendo, un botón cortado
    no se puede pulsar. */
function Marca({ marca, encoge = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10,
      flexShrink: encoge ? 1 : 0, minWidth: 0, overflow: encoge ? "hidden" : "visible",
      textOverflow: "ellipsis",
      fontWeight: 800, fontSize: "var(--ds-t-body)", letterSpacing: "-0.02em",
      color: "var(--ds-ink)", whiteSpace: "nowrap" }}>
      {marca}
    </div>
  );
}

/** Píldora de navegación: la activa se rellena, como en la referencia. */
function Pildora({ s, esta, onIr }) {
  return (
    <button onClick={() => onIr?.(s)} aria-current={esta ? "page" : undefined} title={s.texto}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
        fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 700,
        padding: "9px 16px", borderRadius: "var(--ds-r-pill)",
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
      {s.icono}{s.texto}<Contador n={s.insignia} />
    </button>
  );
}

/** Lo que no cupo en la barra, en una lista. En el teléfono el Modal ya llega
    como hoja desde abajo; en el escritorio, como un cuadro. */
function HojaMas({ abierto, onCerrar, secciones, activa, onIr }) {
  return (
    <Modal abierto={abierto} onCerrar={onCerrar} titulo="Más" ancho={420}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, margin: "calc(var(--ds-2) * -1) 0" }}>
        {secciones.map((s) => {
          const esta = s.id === activa;
          return (
            <button key={s.id} onClick={() => { onCerrar(); onIr?.(s); }}
              aria-current={esta ? "page" : undefined}
              style={{
                display: "flex", alignItems: "center", gap: "var(--ds-3)", width: "100%",
                minHeight: 48, padding: "0 var(--ds-3)", border: "none", cursor: "pointer",
                borderRadius: "var(--ds-r-item)", textAlign: "left",
                fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-body)", fontWeight: 700,
                background: esta ? "var(--ds-accent-soft)" : "transparent",
                color: esta ? "var(--ds-accent-tinta)" : "var(--ds-ink)",
              }}>
              <IconoSeccion s={{ ...s, insignia: 0 }} />
              <span style={{ flex: 1, minWidth: 0 }}>
                {s.texto}
                {s.nota && (
                  <span style={{ display: "block", fontSize: "var(--ds-t-small)", fontWeight: 500,
                    color: "var(--ds-ink-3)" }}>{s.nota}</span>
                )}
              </span>
              <Contador n={s.insignia} />
            </button>
          );
        })}
      </div>
    </Modal>
  );
}

/* ---------------- los tres modos ---------------- */

function ModoTopbar({ marca, secciones, activa, onIr, derecha, children }) {
  const barra = useRef(null);
  const [alto, setAlto] = useState(56);

  /* `position: fixed`, no `sticky`.
     `sticky` se ancla al contenedor de scroll más cercano, y aquí el `body`
     de la aplicación lleva `overflow: hidden auto`: eso lo convierte en ese
     contenedor, pero quien scrollea de verdad es `html`. La barra quedaba
     anclada a algo que nunca se mueve, así que se iba con el contenido.
     `fixed` se ancla al viewport y no depende de ancestros ajenos.
     El alto se mide porque cambia: con muchas secciones las píldoras pasan
     a una segunda fila. */
  useLayoutEffect(() => {
    const el = barra.current;
    if (!el) return undefined;
    const medir = () => setAlto(el.getBoundingClientRect().height);
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* 16 del margen superior + la barra + 20 de aire hasta el contenido. */
  useReserva(`${Math.round(alto) + 36}px`, "var(--ds-4)");

  return (
    <div style={{ minHeight: "100%", padding: "var(--ds-4)" }}>
      <header ref={barra} style={{
        ...vidrio, display: "flex", alignItems: "center", gap: "var(--ds-2)",
        padding: "var(--ds-2) var(--ds-3)",
        borderRadius: "var(--ds-r-pill)",
        boxShadow: "var(--ds-lift-2)",
        position: "fixed", top: "var(--ds-4)",
        left: "var(--ds-4)", right: "var(--ds-4)", zIndex: 30,
      }}>
        <div style={{ paddingLeft: 8, paddingRight: 8 }}><Marca marca={marca} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-2)",
          flexWrap: "wrap", flex: 1, minWidth: 0 }}>
          {secciones.map((s) => <Pildora key={s.id} s={s} esta={s.id === activa} onIr={onIr} />)}
        </div>
        <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "flex-end" }}>
          {derecha}
        </div>
      </header>
      <main style={{ paddingTop: alto + 20 }}>{children}</main>
    </div>
  );
}

function ModoSidebar({ marca, secciones, activa, onIr, derecha, children }) {
  const [desplegado, setDesplegado] = useState(true);
  /* En una laptop con barra de marcadores el alto se acaba antes que el ancho:
     ahí los renglones se aprietan para que entren más sin deslizar. */
  const bajo = useMedia("(max-height: 760px)");
  const abierto = desplegado;
  const ancho = abierto ? 244 : 64;
  const HUECO = 16;   // var(--ds-4), en número porque hay que sumarlo

  useReserva("var(--ds-4)", "var(--ds-4)");

  /* `position: fixed`, no `sticky`, por lo mismo que la barra de arriba: el
     `body` de la aplicación lleva `overflow: auto`, así que él pasa a ser el
     contenedor de scroll aunque quien scrollea sea `html`, y el `sticky`
     queda anclado a algo que nunca se mueve. El contenido reserva el ancho
     con un margen, que sigue al riel cuando se contrae.

     Tres pisos: la marca arriba y los controles abajo NO se mueven; sólo la
     lista de en medio se desliza. Antes deslizaba el riel entero, y con muchas
     secciones lo que quedaba fuera de la vista eran justo los controles. */
  return (
    <div style={{ minHeight: "100%", padding: "var(--ds-4)" }}>
      <aside style={{
        ...vidrio, width: ancho, borderRadius: "var(--ds-r-frame)",
        padding: "var(--ds-3)", boxShadow: "var(--ds-lift-2)", boxSizing: "border-box",
        position: "fixed", top: "var(--ds-4)", left: "var(--ds-4)",
        bottom: "var(--ds-4)", zIndex: 30, overflow: "hidden",
        transition: "width var(--ds-t-move) var(--ds-ease)",
        display: "flex", flexDirection: "column", gap: "var(--ds-2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: bajo ? "4px 8px 4px" : "6px 8px 10px", flexShrink: 0, minWidth: 0 }}>
          {abierto && <Marca marca={marca} />}
          <button onClick={() => setDesplegado((v) => !v)}
            aria-label={abierto ? "Contraer menú" : "Desplegar menú"}
            style={{ background: "transparent", border: "none", cursor: "pointer",
              color: "var(--ds-ink-3)", padding: 4, borderRadius: 8, lineHeight: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round">
              <path d={abierto ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
            </svg>
          </button>
        </div>

        <nav aria-label="Navegación principal" style={{ flex: 1, minHeight: 0,
          overflowY: "auto", overflowX: "hidden", scrollbarWidth: "thin",
          display: "flex", flexDirection: "column", gap: bajo ? 0 : 2,
          margin: "0 calc(var(--ds-1) * -1)", padding: "2px var(--ds-1)" }}>
          {secciones.map((s) => {
            const esta = s.id === activa;
            return (
              <button key={s.id} onClick={() => onIr?.(s)} title={s.texto}
                aria-current={esta ? "page" : undefined}
                style={{
                  display: "flex", alignItems: "center", gap: 11, flexShrink: 0,
                  justifyContent: abierto ? "flex-start" : "center",
                  fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 700,
                  padding: `${bajo ? 8 : 11}px ${abierto ? 13 : 0}px`,
                  borderRadius: "var(--ds-r-item)", border: "none",
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
                <span style={{ color: esta ? "var(--ds-accent-tinta)" : "inherit", lineHeight: 0 }}>
                  <IconoSeccion s={abierto ? { ...s, insignia: 0 } : s} />
                </span>
                {abierto && <span style={{ flex: 1, minWidth: 0, overflow: "hidden",
                  textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.texto}</span>}
                {abierto && <Contador n={s.insignia} />}
              </button>
            );
          })}
        </nav>

        {derecha ? (
          <div style={{
            paddingTop: "var(--ds-3)", flexShrink: 0,
            borderTop: "1px solid var(--ds-line)",
            display: "flex", flexWrap: "wrap", gap: "var(--ds-2)",
            justifyContent: abierto ? "flex-start" : "center",
          }}>{derecha}</div>
        ) : null}
      </aside>

      <main style={{ minWidth: 0, marginLeft: ancho + HUECO,
        transition: "margin-left var(--ds-t-move) var(--ds-ease)" }}>
        {children}
      </main>
    </div>
  );
}

/* El dock se acomoda solo, en tres escalones, según lo que le quepa:
     0  icono y nombre
     1  sólo icono (el nombre queda en el `title`)
     2  sólo icono, y lo que no cabe se va a «Más»
   Antes deslizaba la franja de en medio, y con un trackpad nadie desliza de
   lado: las secciones del final simplemente no existían. Y los controles de
   la derecha, apretados, bajaban a una segunda fila fuera de la barra.

   El escalón se calcula, no se descubre: una fila invisible con TODOS los
   nombres mide lo que haría falta, y los dos lados ocupan lo mismo —el más
   ancho de los dos— para que el centro quede centrado. Lo que sobra es el
   sitio de las secciones. */
const ANCHO_ICONO_DOCK = 48;

function BotonDock({ s, esta, conTexto, onIr }) {
  return (
    <button onClick={() => onIr?.(s)} title={s.texto} aria-label={s.texto}
      aria-current={esta ? "page" : undefined}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
        fontFamily: "var(--ds-font)", fontSize: "0.66rem", fontWeight: 700,
        padding: conTexto ? "7px 15px" : 0, minWidth: conTexto ? 0 : ANCHO_ICONO_DOCK,
        height: conTexto ? "auto" : 44, boxSizing: "border-box",
        borderRadius: "var(--ds-r-item)", border: "none",
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
      <IconoSeccion s={s} alto={19} />
      {conTexto && s.texto}
    </button>
  );
}

function ModoDock({
  marca, icono, secciones, activa, onIr, derecha,
  inicio, inicioAbierto = false, onInicioAbierto, children,
}) {
  const barra = useRef(null);
  const izq = useRef(null);
  const der = useRef(null);
  const medida = useRef(null);
  const [escalon, setEscalon] = useState(0);
  const [caben, setCaben] = useState(secciones.length);
  const [hojaMas, setHojaMas] = useState(false);

  useReserva("var(--ds-4)", `calc(${ALTO_DOCK}px + var(--ds-6) + env(safe-area-inset-bottom, 0px))`);

  const medir = useCallback(() => {
    const n = barra.current;
    if (!n) return;
    const cs = getComputedStyle(n);
    const interior = n.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const lados = 2 * Math.max(izq.current?.scrollWidth || 0, der.current?.scrollWidth || 0);
    const hueco = 2 * (parseFloat(cs.columnGap) || 8);
    const disponible = interior - lados - hueco;
    const unidad = ANCHO_ICONO_DOCK + 4;
    if ((medida.current?.scrollWidth || 0) <= disponible) { setEscalon(0); return; }
    if (secciones.length * unidad <= disponible) { setEscalon(1); return; }
    setEscalon(2);
    setCaben(Math.max(1, Math.floor(disponible / unidad) - 1));
  }, [secciones]);

  /* En el layout, antes de pintar: el escalón cambia sin parpadeo. Se observa
     la barra (cambia el ancho de la ventana) y los dos lados (un producto
     puede agregar o quitar controles en vivo). */
  useLayoutEffect(() => {
    medir();
    const ro = new ResizeObserver(medir);
    [barra.current, izq.current, der.current].forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [medir]);

  const visibles = escalon === 2 ? secciones.slice(0, caben) : secciones;
  const resto = escalon === 2 ? secciones.slice(caben) : [];

  /* Los lados no se encogen por debajo de lo que traen: si se apretaran, sus
     controles bajarían a una segunda fila fuera de la barra. Quien cede es el
     centro, por escalones. */
  const lado = { flex: "1 1 0", minWidth: "max-content", display: "flex", alignItems: "center" };
  const interiorLado = { display: "flex", alignItems: "center", gap: "var(--ds-2)",
    width: "max-content", flexWrap: "nowrap" };

  return (
    <div style={{ minHeight: "100%", padding: "var(--ds-4)",
      paddingBottom: `calc(${ALTO_DOCK}px + var(--ds-6))` }}>
      <main>{children}</main>

      {/* Barra de tareas: de borde a borde y pegada abajo, como la del
          escritorio que imita. El inicio a la izquierda, las secciones al
          centro y los controles a la derecha — que es donde los busca
          quien ya usó un escritorio. */}
      <nav ref={barra} aria-label="Navegación principal" style={{
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40,
        height: `calc(${ALTO_DOCK}px + env(safe-area-inset-bottom, 0px))`, boxSizing: "border-box",
        display: "flex", alignItems: "center", gap: "var(--ds-2)",
        padding: "0 var(--ds-4)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        background: "var(--ds-panel)",
        borderTop: "1px solid var(--ds-line)",
        backdropFilter: "var(--ds-blur)", WebkitBackdropFilter: "var(--ds-blur)",
        boxShadow: "var(--ds-lift-3)",
      }}>
        <div style={lado}>
          <div ref={izq} style={interiorLado}>
            {inicio && (
              <BotonInicio abierto={inicioAbierto} icono={icono}
                onClick={() => onInicioAbierto?.(!inicioAbierto)} />
            )}
          </div>
        </div>

        <div style={{ flex: "0 1 auto", minWidth: 0, display: "flex", alignItems: "center",
          justifyContent: "center", gap: "var(--ds-1)", position: "relative" }}>
          {visibles.map((s) => (
            <BotonDock key={s.id} s={s} esta={s.id === activa} conTexto={escalon === 0} onIr={onIr} />
          ))}
          {resto.length > 0 && (
            <BotonMas activo={resto.some((s) => s.id === activa)}
              insignia={resto.reduce((n, s) => n + (Number(s.insignia) || 0), 0)}
              onClick={() => setHojaMas(true)} alto={44} />
          )}
        </div>

        <div style={{ ...lado, justifyContent: "flex-end" }}>
          <div ref={der} style={interiorLado}>{derecha}</div>
        </div>

        {/* La fila de medida: todos los nombres, invisible y fuera del flujo. */}
        <div ref={medida} aria-hidden style={{ position: "absolute", left: 0, top: 0,
          visibility: "hidden", pointerEvents: "none", display: "flex", gap: "var(--ds-1)",
          width: "max-content" }}>
          {secciones.map((s) => <BotonDock key={s.id} s={s} esta={false} conTexto />)}
        </div>
      </nav>

      <HojaMas abierto={hojaMas} onCerrar={() => setHojaMas(false)}
        secciones={resto} activa={activa} onIr={onIr} />
      {inicio}
    </div>
  );
}

function BotonMas({ activo, insignia, onClick, alto }) {
  return (
    <button onClick={onClick} title="Más secciones" aria-label="Más secciones"
      style={{
        display: "grid", placeItems: "center", minWidth: ANCHO_ICONO_DOCK, height: alto,
        borderRadius: "var(--ds-r-item)", border: "none", cursor: "pointer", flexShrink: 0,
        background: activo ? "var(--ds-ink)" : "transparent",
        color: activo ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
      }}>
      <IconoSeccion s={{ insignia, icono: ICONO_MAS }} />
    </button>
  );
}

const ICONO_MAS = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" />
  </svg>
);

/* ---------------- el teléfono ---------------- */

/* Cinco pestañas es lo que cabe con el pulgar a 320 px sin que los nombres se
   corten; con más, cuatro y «Más». */
const PESTANAS_MAX = 5;

function ModoMovil({
  marca, icono, secciones, activa, onIr, derecha,
  inicio, inicioAbierto = false, onInicioAbierto, children,
}) {
  const [hojaMas, setHojaMas] = useState(false);
  const todasCaben = secciones.length <= PESTANAS_MAX;
  const visibles = todasCaben ? secciones : secciones.slice(0, PESTANAS_MAX - 1);
  const resto = todasCaben ? [] : secciones.slice(PESTANAS_MAX - 1);
  const arriba = `calc(${ALTO_CABECERA_MOVIL}px + env(safe-area-inset-top, 0px) + var(--ds-3))`;
  const abajo = `calc(${ALTO_DOCK}px + env(safe-area-inset-bottom, 0px) + var(--ds-4))`;
  useReserva(arriba, abajo);

  const pestana = (s, { esta, onClick, etiqueta }) => (
    <button key={s.id} onClick={onClick} aria-current={esta ? "page" : undefined}
      aria-label={etiqueta}
      style={{
        flex: "1 1 0", minWidth: 0, height: ALTO_DOCK, border: "none", cursor: "pointer",
        background: "transparent", padding: "8px 2px 6px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
        fontFamily: "var(--ds-font)", fontSize: "0.66rem", fontWeight: 700,
        color: esta ? "var(--ds-accent-tinta)" : "var(--ds-ink-3)",
        WebkitTapHighlightColor: "transparent",
      }}>
      {/* La activa se marca con una cápsula detrás del icono, no sólo con el
          color: así se distingue también sin percibir el tono. */}
      <span style={{ display: "grid", placeItems: "center", width: 52, height: 28,
        borderRadius: "var(--ds-r-pill)",
        background: esta ? "var(--ds-accent-soft)" : "transparent",
        transition: "background var(--ds-t-state) var(--ds-ease)" }}>
        <IconoSeccion s={s} />
      </span>
      <span style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis",
        whiteSpace: "nowrap" }}>{etiqueta}</span>
    </button>
  );

  return (
    <div style={{ minHeight: "100%", paddingTop: arriba, paddingBottom: abajo,
      paddingLeft: "var(--ds-3)", paddingRight: "var(--ds-3)" }}>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        height: `calc(${ALTO_CABECERA_MOVIL}px + env(safe-area-inset-top, 0px))`,
        paddingTop: "env(safe-area-inset-top, 0px)", boxSizing: "border-box",
        display: "flex", alignItems: "center", gap: "var(--ds-2)",
        paddingLeft: "var(--ds-3)", paddingRight: "var(--ds-3)",
        background: "var(--ds-panel)", borderBottom: "1px solid var(--ds-line)",
        backdropFilter: "var(--ds-blur)", WebkitBackdropFilter: "var(--ds-blur)",
      }}>
        {/* La marca es la puerta al lanzador, como el botón de inicio del dock. */}
        {inicio ? (
          <button onClick={() => onInicioAbierto?.(!inicioAbierto)} aria-label="Menú de inicio"
            aria-expanded={inicioAbierto}
            style={{ display: "flex", alignItems: "center", gap: 6, minHeight: 44, minWidth: 0,
              flex: "0 1 auto", overflow: "hidden",
              padding: "0 6px 0 2px", border: "none", background: "transparent", cursor: "pointer",
              color: "var(--ds-ink)", fontFamily: "var(--ds-font)", WebkitTapHighlightColor: "transparent" }}>
            <Marca marca={marca} encoge />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" aria-hidden
              style={{ color: "var(--ds-ink-3)", flexShrink: 0, transform: inicioAbierto ? "rotate(180deg)" : "none",
                transition: "transform var(--ds-t-state) var(--ds-ease)" }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        ) : <Marca marca={marca} encoge />}
        <div style={{ flex: 1, minWidth: 0 }} />
        <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-2)", flexShrink: 0 }}>
          {derecha}
        </div>
      </header>

      <main>{children}</main>

      <nav aria-label="Navegación principal" style={{
        position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        display: "flex", alignItems: "stretch",
        background: "var(--ds-panel)", borderTop: "1px solid var(--ds-line)",
        backdropFilter: "var(--ds-blur)", WebkitBackdropFilter: "var(--ds-blur)",
      }}>
        {visibles.map((s) => pestana(s, {
          esta: s.id === activa, onClick: () => onIr?.(s), etiqueta: s.texto,
        }))}
        {resto.length > 0 && pestana(
          { id: "__mas", icono: ICONO_MAS, insignia: resto.reduce((n, s) => n + (Number(s.insignia) || 0), 0) },
          { esta: resto.some((s) => s.id === activa), onClick: () => setHojaMas(true), etiqueta: "Más" })}
      </nav>

      <HojaMas abierto={hojaMas} onCerrar={() => setHojaMas(false)}
        secciones={resto} activa={activa} onIr={onIr} />
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
  const movil = useAngosto();

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
    inicioAbierto, onInicioAbierto, children: cuerpo };
  const Elegido = movil ? ModoMovil
    : modo === "sidebar" ? ModoSidebar : modo === "dock" ? ModoDock : ModoTopbar;

  return (
    /* En el teléfono `modo` vale "dock": la geometría ES la del dock —una barra
       de ALTO_DOCK abajo—, y lo que ya sube sus piezas flotantes por encima
       del dock (`modo === "dock"`) sigue funcionando sin cambiar nada. Quien
       necesite distinguirlo pregunta por `movil`. */
    <ArmazonCtx.Provider value={{ modo: movil ? "dock" : modo, preferencia: modo, movil, fijarModo, modos: MODOS }}>
      <Elegido {...props} />
    </ArmazonCtx.Provider>
  );
}


/** Selector de modo, para probar los tres sin tocar código. */
export function SelectorArmazon() {
  const { preferencia: modo, fijarModo, movil } = useArmazon();
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

  /* En el teléfono hay un solo chasis: elegir entre tres no cambiaría nada. */
  if (movil) return null;

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
