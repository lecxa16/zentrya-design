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
 *
 * **Subniveles (v2.1).** Una sección puede traer `hijos` (mismo formato, sin
 * nietos: un tercer nivel son `Pestanas` dentro de la pantalla). `activa`
 * puede ser el id de un hijo y entonces el padre también se marca. El padre
 * tiene página propia sólo si trae `ruta` (o `navegable`): ahí su texto
 * navega y la flechita abre a los hijos; sin ella, cualquier clic los abre.
 * Su insignia es la suma de la suya y la de sus hijos. Cómo se abren,
 * según el chasis (decidido con Carlos, 2026-10-23):
 *   arriba    desplegable debajo de la píldora
 *   lateral   acordeón en su sitio (flotante si el riel está contraído)
 *   dock      panel hacia arriba
 *   teléfono  hoja desde abajo
 * `onIr(seccion)` recibe al hijo tal como vino; la app navega con su `ruta`.
 *
 * **Ruta y volver (v2.3).** Con `migas` como LISTA, el armazón arma solo el
 * tronco —sección › subsección, de `secciones` y `activa`— y la pantalla sólo
 * agrega sus escalones extra (`[{ texto: "Nueva tarea" }]`): la jerarquía se
 * escribe en un solo sitio. En el escritorio se ve la ruta con «Volver a …»; en
 * el teléfono el volver pasa a la cabecera, arriba a la izquierda, donde lo
 * busca el pulgar. Con `migas` como elemento (antes de la v2.3) se pinta tal cual.
 */
import React, { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Transicion from "./primitivas/Transicion";
import Modal from "./primitivas/Modal";
import Flotante from "./primitivas/Flotante";
import Migas from "./primitivas/Migas";
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
function Contador({ n, sobre = false, en }) {
  const v = Number(n) || 0;
  if (v <= 0) return null;
  /* El número se ve pero no se lee: el lector oye «, 3 pendientes» (texto oculto). Así el
     texto visible de un botón queda dentro de su nombre accesible (WCAG 2.5.3, axe). */
  return (
    <span className="ds-num" style={{
      ...(sobre ? { position: "absolute", top: -6, right: -9 } : {}),
      /* `en`: encima del icono pero DESPUÉS del nombre en el documento, para que el
         nombre accesible («Piezas, 3 pendientes») contenga el texto visible en orden. */
      ...(en ? { position: "absolute", ...en } : {}),
      minWidth: 18, height: 18, padding: "0 5px", boxSizing: "border-box",
      borderRadius: "var(--ds-r-pill)", background: "var(--ds-risk)",
      color: "var(--ds-surface-solid)", fontSize: "0.66rem", fontWeight: 800,
      lineHeight: "18px", textAlign: "center", flexShrink: 0,
      boxShadow: sobre ? "0 0 0 2px var(--ds-surface-solid)" : "none",
    }}><span aria-hidden>{v > 99 ? "99+" : v}</span><span style={OCULTO}>, {v} pendientes</span></span>
  );
}

/** Para el lector de pantalla, invisible en la página. */
const OCULTO = { position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden",
  clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 };
/** El nombre de un botón que sólo enseña icono: con sus pendientes, si los hay. */
const nombreCon = (texto, n) => ((Number(n) || 0) > 0 ? `${texto}, ${n} pendientes` : texto);

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

/* ---------------- subniveles ---------------- */

const conHijos = (s) => Array.isArray(s?.hijos) && s.hijos.length > 0;
/** La sección está activa si lo está ella o uno de sus hijos. */
const contiene = (s, activa) => s.id === activa || (conHijos(s) && s.hijos.some((h) => h.id === activa));
/** Un padre sólo tiene página si la trae; una sección sin hijos siempre la tiene. */
const navegable = (s) => !conHijos(s) || Boolean(s.ruta || s.navegable);
const suma = (lista) => lista.reduce((n, x) => n + (Number(x.insignia) || 0), 0);
/** El padre lleva la suma de sus pendientes y los de sus hijos: cerrado, sigue avisando. */
const conInsigniaTotal = (s) => (conHijos(s)
  ? { ...s, insigniaPropia: s.insignia, insignia: (Number(s.insignia) || 0) + suma(s.hijos) } : s);

function Flecha({ abierta, tam = 13 }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden
      style={{ flexShrink: 0, transform: abierta ? "rotate(180deg)" : "none",
        transition: "transform var(--ds-t-state) var(--ds-ease)" }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/** Renglón de un menú de navegación: dice cuál es la página actual sin depender del color. */
function OpcionNav({ texto, nota, insignia, esta, onClick }) {
  return (
    <button type="button" role="menuitem" onClick={onClick} aria-current={esta ? "page" : undefined}
      data-foco={esta ? "" : undefined}
      style={{
        display: "flex", alignItems: "center", gap: "var(--ds-3)", width: "100%", minHeight: 38,
        fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 700,
        padding: "8px 10px", borderRadius: "var(--ds-r-item)", border: "none",
        cursor: "pointer", textAlign: "left",
        background: esta ? "var(--ds-accent-soft)" : "transparent",
        color: esta ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)",
      }}
      onMouseEnter={(e) => { if (!esta) e.currentTarget.style.background = "var(--ds-surface-2)"; }}
      onMouseLeave={(e) => { if (!esta) e.currentTarget.style.background = "transparent"; }}
      onFocus={(e) => { if (!esta) e.currentTarget.style.background = "var(--ds-surface-2)"; }}
      onBlur={(e) => { if (!esta) e.currentTarget.style.background = "transparent"; }}>
      <span style={{ flex: 1, minWidth: 0 }}>
        {texto}
        {nota && <span style={{ display: "block", fontSize: "var(--ds-t-micro)", fontWeight: 600,
          color: "var(--ds-ink-3)" }}>{nota}</span>}
      </span>
      <Contador n={insignia} />
    </button>
  );
}

/** Los hijos de una sección en un `Flotante`: el desplegable de la barra, el
    panel del dock y el del riel contraído. Si el padre tiene página, va
    primero como «Resumen». */
function MenuHijos({ s, ancla, abierto, onCerrar, activa, onIr, lado }) {
  const ir = (x) => { onCerrar(); onIr?.(x); };
  return (
    <Flotante ancla={ancla} abierto={abierto} onCerrar={onCerrar} etiqueta={s.texto} minAncho={220} lado={lado}>
      {navegable(s) && (
        <>
          <OpcionNav texto={s.texto} nota="Resumen" esta={s.id === activa} onClick={() => ir(s)} />
          <div role="separator" style={{ height: 1, background: "var(--ds-line)", margin: "4px 6px" }} />
        </>
      )}
      {s.hijos.map((h) => (
        <OpcionNav key={h.id} texto={h.texto} insignia={h.insignia} esta={h.id === activa}
          onClick={() => ir(h)} />
      ))}
    </Flotante>
  );
}

/** `encoge`: en la cabecera del teléfono la marca cede antes que los
    controles — un nombre recortado se sigue reconociendo, un botón cortado
    no se puede pulsar. */
/** Un logo puede llegar como ruta de imagen o como componente (un SVG en línea). */
function ImagenLogo({ fuente, alt, alto }) {
  if (!fuente) return null;
  return typeof fuente === "string"
    ? <img src={fuente} alt={alt} style={{ height: alto, width: "auto", maxWidth: 180, display: "block", flexShrink: 0 }} />
    : <span style={{ display: "inline-flex", height: alto, flexShrink: 0 }}>{fuente}</span>;
}

/** Sin logo, la inicial del producto sobre el acento: el par acento / tinta del acento está
    medido (≥ 4.5) en todas las paletas, el degradado del héroe no. */
function Monograma({ texto = "", alto = 28 }) {
  return (
    /* La letra va en `::before` (tokens.css), no como texto: es decoración, y como texto
       visible tendría que estar en el nombre del botón que la contiene (WCAG 2.5.3). */
    <span aria-hidden className="ds-monograma" data-inicial={texto.trim().charAt(0).toUpperCase()} style={{
      display: "grid", placeItems: "center", width: alto, height: alto, flexShrink: 0,
      borderRadius: 8, background: "var(--ds-accent)", color: "var(--ds-ink-on-accent)",
      fontSize: alto * 0.5, fontWeight: 800, letterSpacing: "-0.02em",
    }} />
  );
}

/**
 * La marca del producto en el chasis: `logo={{ completo, icono }}`.
 *   completo  logo con nombre, donde hay sitio (barra de arriba, menú lateral abierto)
 *   icono     sólo el símbolo, donde no (riel contraído, dock, teléfono); sin él, monograma
 * Sin `completo` se pinta el icono y el nombre en texto. `onInicio` la vuelve un botón que
 * lleva al inicio de la app, como en cualquier producto. `encoge`: en la cabecera del
 * teléfono la marca cede antes que los controles —un nombre recortado se sigue
 * reconociendo, un botón cortado no se puede pulsar—.
 */
function Marca({ marca, logo, iconoApp, compacto = false, encoge = false, onInicio }) {
  const texto = typeof marca === "string" ? marca : "";
  /* El símbolo para donde no cabe el nombre: el `logo.icono`; si no, el `icono` que la app ya le da al
     armazón (el del botón de inicio del dock, como Nykza); si no, la inicial; y si la marca no es texto,
     nada (v2.5.2: un monograma sin letra salía como un cuadro vacío). */
  const icono = logo?.icono ? <ImagenLogo fuente={logo.icono} alt="" alto={28} />
    : iconoApp ? <span aria-hidden style={{ display: "inline-flex", flexShrink: 0 }}>{iconoApp}</span>
      : texto ? <Monograma texto={texto} /> : null;
  if (compacto && !icono) return null;
  /* Sin `logo`, donde hay sitio la marca va tal cual (como antes de la v2.4: una app como Nykza ya trae su
     propio símbolo dentro de `marca` y un monograma delante la duplicaba); el monograma sólo cubre donde no
     cabe el nombre. */
  const nombre = <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>{marca}</span>;
  const contenido = compacto ? icono
    : logo?.completo ? <ImagenLogo fuente={logo.completo} alt={texto} alto={28} />
      : logo?.icono ? <>{icono}{nombre}</> : nombre;
  const estilo = {
    display: "flex", alignItems: "center", gap: 10,
    flexShrink: encoge ? 1 : 0, minWidth: 0, overflow: encoge ? "hidden" : "visible",
    fontWeight: 800, fontSize: "var(--ds-t-body)", letterSpacing: "-0.02em",
    color: "var(--ds-ink)", whiteSpace: "nowrap",
  };
  if (!onInicio) return <div style={estilo}>{contenido}</div>;
  return (
    <button type="button" onClick={onInicio}
      /* Con el nombre a la vista, el nombre accesible lo contiene (WCAG 2.5.3). */
      aria-label={compacto ? `Ir al inicio de ${texto}` : `${texto}, ir al inicio`}
      style={{ ...estilo, border: "none", background: "transparent", padding: 0, cursor: "pointer",
        fontFamily: "var(--ds-font)", borderRadius: 8 }}>
      {contenido}
    </button>
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

/** Píldora de una sección con hijos. Con página propia son dos botones en
    una misma cápsula —el texto navega, la flecha abre—; sin ella, uno solo
    que abre. El desplegable se ancla al botón que lo abre, para que el foco
    vuelva ahí al cerrarlo. */
function PildoraGrupo({ s, activa, onIr }) {
  const [abierto, setAbierto] = useState(false);
  const abre = useRef(null);
  const esta = contiene(s, activa);
  const propia = navegable(s);
  const boton = {
    display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
    fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 700,
    padding: "9px 0", border: "none", background: "transparent", color: "inherit", cursor: "pointer",
    borderRadius: "var(--ds-r-pill)",
  };
  const fondo = esta ? "var(--ds-ink)" : "var(--ds-surface)";
  return (
    <span title={s.texto} style={{
      display: "inline-flex", alignItems: "center", padding: "0 6px 0 16px",
      borderRadius: "var(--ds-r-pill)", border: "1px solid transparent",
      background: fondo, color: esta ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
      boxShadow: esta ? "var(--ds-lift-2)" : "none",
      transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)",
    }}
      onMouseEnter={(e) => { if (!esta) { e.currentTarget.style.background = "var(--ds-surface-solid)"; e.currentTarget.style.color = "var(--ds-ink)"; } }}
      onMouseLeave={(e) => { if (!esta) { e.currentTarget.style.background = fondo; e.currentTarget.style.color = "var(--ds-ink-2)"; } }}>
      {propia ? (
        <>
          <button type="button" onClick={() => onIr?.(s)} aria-current={s.id === activa ? "page" : undefined}
            style={boton}>
            {s.icono}{s.texto}<Contador n={s.insignia} />
          </button>
          <button type="button" ref={abre} onClick={() => setAbierto((v) => !v)}
            aria-label={`Subsecciones de ${s.texto}`} aria-haspopup="menu" aria-expanded={abierto}
            style={{ ...boton, padding: "9px 10px 9px 8px" }}>
            <Flecha abierta={abierto} />
          </button>
        </>
      ) : (
        <button type="button" ref={abre} onClick={() => setAbierto((v) => !v)}
          aria-haspopup="menu" aria-expanded={abierto} style={{ ...boton, paddingRight: 10 }}>
          {s.icono}{s.texto}<Contador n={s.insignia} /><Flecha abierta={abierto} />
        </button>
      )}
      <MenuHijos s={s} ancla={abre} abierto={abierto} onCerrar={() => setAbierto(false)}
        activa={activa} onIr={onIr} />
    </span>
  );
}

/** Un renglón de la hoja. `sangria`: un hijo bajo el nombre de su grupo. */
function RenglonHoja({ s, texto, esta, sangria = false, onClick }) {
  return (
    <button type="button" onClick={onClick} aria-current={esta ? "page" : undefined}
      style={{
        display: "flex", alignItems: "center", gap: "var(--ds-3)", width: "100%",
        minHeight: sangria ? 44 : 48, padding: sangria ? "0 var(--ds-3) 0 42px" : "0 var(--ds-3)",
        border: "none", cursor: "pointer",
        borderRadius: "var(--ds-r-item)", textAlign: "left",
        fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-body)", fontWeight: sangria ? 600 : 700,
        background: esta ? "var(--ds-accent-soft)" : "transparent",
        color: esta ? "var(--ds-accent-tinta)" : "var(--ds-ink)",
      }}>
      {!sangria && <IconoSeccion s={{ ...s, insignia: 0 }} />}
      <span style={{ flex: 1, minWidth: 0 }}>
        {texto ?? s.texto}
        {s.nota && (
          <span style={{ display: "block", fontSize: "var(--ds-t-small)", fontWeight: 500,
            color: "var(--ds-ink-3)" }}>{s.nota}</span>
        )}
      </span>
      <Contador n={s.insignia} />
    </button>
  );
}

/** Lo que no cupo en la barra, en una lista; y en el teléfono, los hijos de
    una pestaña. En el teléfono el Modal ya llega como hoja desde abajo; en el
    escritorio, como un cuadro. Un grupo va con su nombre y sus hijos
    sangrados debajo; si la hoja es de UN solo grupo, el título ya lo nombra
    y sus hijos van sin sangría (con «Resumen» primero si el padre tiene página). */
function HojaMas({ abierto, onCerrar, secciones, activa, onIr, titulo = "Más" }) {
  const ir = (x) => { onCerrar(); onIr?.(x); };
  const solo = secciones.length === 1 && conHijos(secciones[0]) ? secciones[0] : null;
  return (
    <Modal abierto={abierto} onCerrar={onCerrar} titulo={titulo} ancho={420}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, margin: "calc(var(--ds-2) * -1) 0" }}>
        {solo ? (
          <>
            {navegable(solo) && (
              <RenglonHoja s={{ ...solo, insignia: solo.insigniaPropia }} texto="Resumen"
                esta={solo.id === activa} onClick={() => ir(solo)} />
            )}
            {solo.hijos.map((h) => (
              <RenglonHoja key={h.id} s={{ icono: solo.icono, ...h }} esta={h.id === activa} onClick={() => ir(h)} />
            ))}
          </>
        ) : secciones.map((s) => (conHijos(s) ? (
          <div key={s.id} role="group" aria-label={s.texto} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {navegable(s) ? (
              <RenglonHoja s={{ ...s, insignia: s.insigniaPropia }} esta={s.id === activa} onClick={() => ir(s)} />
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-3)", minHeight: 40,
                padding: "0 var(--ds-3)", fontSize: "var(--ds-t-small)", fontWeight: 800,
                color: "var(--ds-ink-2)" }}>
                <IconoSeccion s={{ ...s, insignia: 0 }} />{s.texto}
              </div>
            )}
            {s.hijos.map((h) => (
              <RenglonHoja key={h.id} s={h} sangria esta={h.id === activa} onClick={() => ir(h)} />
            ))}
          </div>
        ) : (
          <RenglonHoja key={s.id} s={s} esta={s.id === activa} onClick={() => ir(s)} />
        )))}
      </div>
    </Modal>
  );
}

/* ---------------- los tres modos ---------------- */

function ModoTopbar({ marca, logo, onInicio, icono, secciones, activa, onIr, derecha, children }) {
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
        <div style={{ paddingLeft: 8, paddingRight: 8 }}><Marca marca={marca} logo={logo} iconoApp={icono} onInicio={onInicio} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-2)",
          flexWrap: "wrap", flex: 1, minWidth: 0 }}>
          {secciones.map((s) => (conHijos(s)
            ? <PildoraGrupo key={s.id} s={s} activa={activa} onIr={onIr} />
            : <Pildora key={s.id} s={s} esta={s.id === activa} onIr={onIr} />))}
        </div>
        <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "flex-end" }}>
          {derecha}
        </div>
      </header>
      <main style={{ paddingTop: alto + 20 }}>{children}</main>
    </div>
  );
}

/** Un renglón del menú lateral. `riel`: desplegado (con nombre) o contraído
    (sólo icono). `hijo`: va sangrado bajo su padre, sin icono. `marcado`: el
    padre de la página actual, que se tiñe sin elevarse (la elevada es una). */
function RenglonLateral({ s, esta, marcado, riel, bajo, hijo = false, enFila = false, onClick, botonRef,
  insignia, extra, ...aria }) {
  const n = insignia ?? s.insignia;
  return (
    <button ref={botonRef} type="button" onClick={onClick} title={s.texto}
      aria-current={esta ? "page" : undefined} {...aria}
      style={{
        display: "flex", alignItems: "center", gap: 11, minWidth: 0,
        /* En la lista no crece (es una columna: crecería a lo alto); junto a la flecha, sí. */
        flex: enFila ? "1 1 0" : "0 0 auto",
        justifyContent: riel ? "flex-start" : "center",
        fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: hijo ? 600 : 700,
        padding: hijo ? `${bajo ? 6 : 8}px 13px ${bajo ? 6 : 8}px 42px` : `${bajo ? 8 : 11}px ${riel ? 13 : 0}px`,
        borderRadius: "var(--ds-r-item)", border: "none",
        cursor: "pointer", textAlign: "left", width: "100%",
        /* El activo se ELEVA en una tarjeta sólida, como en la referencia:
           no se marca con una línea de color al costado. */
        background: esta ? "var(--ds-surface-solid)" : "transparent",
        color: esta || marcado ? "var(--ds-ink)" : "var(--ds-ink-2)",
        boxShadow: esta ? "var(--ds-lift-1)" : "none",
        transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)",
      }}
      onMouseEnter={(e) => { if (!esta) e.currentTarget.style.background = "var(--ds-surface-2)"; }}
      onMouseLeave={(e) => { if (!esta) e.currentTarget.style.background = "transparent"; }}
    >
      {!hijo && (
        <span style={{ color: esta || marcado ? "var(--ds-accent-tinta)" : "inherit", lineHeight: 0 }}>
          <IconoSeccion s={riel ? { ...s, insignia: 0 } : s} />
        </span>
      )}
      {riel && <span style={{ flex: 1, minWidth: 0, overflow: "hidden",
        textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.texto}</span>}
      {riel && <Contador n={n} />}
      {riel && extra}
    </button>
  );
}

/** Una sección con hijos en el menú lateral: acordeón en su sitio, abierto de
    entrada si la página actual está dentro. Con el riel contraído no hay
    sitio para sangrar, y los hijos salen en un menú flotante. Cerrado, el
    padre lleva la suma de pendientes; abierto, cada hijo dice los suyos. */
function GrupoLateral({ s, activa, riel, bajo, onIr }) {
  const dentro = contiene(s, activa);
  const [abierto, setAbierto] = useState(dentro);
  const [flota, setFlota] = useState(false);
  const boton = useRef(null);
  const idLista = useId();
  /* Llegar a un hijo desde otro lado (un enlace, el lanzador) abre su grupo. */
  useEffect(() => { if (dentro) setAbierto(true); }, [dentro]);

  if (!riel) {
    return (
      <>
        <RenglonLateral s={s} esta={dentro} riel={false} bajo={bajo} botonRef={boton}
          onClick={() => setFlota((v) => !v)} aria-haspopup="menu" aria-expanded={flota} />
        <MenuHijos s={s} ancla={boton} abierto={flota} onCerrar={() => setFlota(false)}
          activa={activa} onIr={onIr} lado="derecha" />
      </>
    );
  }

  const propia = navegable(s);
  const alternar = () => setAbierto((v) => !v);
  return (
    <div style={{ display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <RenglonLateral s={s} esta={s.id === activa} marcado={dentro} riel bajo={bajo} enFila
          insignia={abierto ? Number(s.insigniaPropia) || 0 : s.insignia}
          onClick={propia ? () => onIr?.(s) : alternar}
          aria-expanded={propia ? undefined : abierto} aria-controls={propia ? undefined : idLista}
          extra={propia ? null : <span style={{ color: "var(--ds-ink-3)", lineHeight: 0 }}><Flecha abierta={abierto} /></span>} />
        {propia && (
          <button type="button" onClick={alternar} aria-expanded={abierto} aria-controls={idLista}
            aria-label={`Subsecciones de ${s.texto}`}
            style={{ display: "grid", placeItems: "center", width: 32, height: 32, flexShrink: 0,
              border: "none", background: "transparent", cursor: "pointer", color: "var(--ds-ink-3)",
              borderRadius: "var(--ds-r-item)" }}>
            <Flecha abierta={abierto} />
          </button>
        )}
      </div>
      {/* Siempre montados: abrir anima la ALTURA real (filas de 0fr a 1fr, sin medir) y
          los hijos entran con un fundido corto. Montar y desmontar los hacía aparecer de
          golpe y empujar todo lo de abajo de un salto (Carlos, 2026-10-23). Cerrado es
          `inert`: ni el teclado ni el lector entran a lo que no se ve. */}
      <div id={idLista} role="group" aria-label={s.texto} inert={!abierto}
        style={{
          display: "grid", gridTemplateRows: abierto ? "1fr" : "0fr",
          transition: "grid-template-rows var(--ds-t-move) var(--ds-ease)",
        }}>
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div style={{
            display: "flex", flexDirection: "column", gap: bajo ? 0 : 2, paddingTop: bajo ? 0 : 2,
            opacity: abierto ? 1 : 0,
            translate: abierto ? "0 0" : "0 -6px",
            transition: abierto
              ? "opacity var(--ds-t-move) var(--ds-ease) 60ms, translate var(--ds-t-move) var(--ds-ease) 60ms"
              : "opacity var(--ds-t-state) var(--ds-ease), translate var(--ds-t-state) var(--ds-ease)",
          }}>
            {s.hijos.map((h) => (
              <RenglonLateral key={h.id} s={h} hijo esta={h.id === activa} riel bajo={bajo}
                onClick={() => onIr?.(h)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModoSidebar({ marca, logo, onInicio, icono, secciones, activa, onIr, derecha, children }) {
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
        {/* Abierto: logo completo y el botón al lado. Contraído: el símbolo arriba y el botón
            debajo, para que el riel no se quede sin marca. */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: abierto ? "space-between" : "center",
          flexDirection: abierto ? "row" : "column", gap: abierto ? 8 : 10,
          padding: bajo ? "4px 8px 4px" : "6px 8px 10px", flexShrink: 0, minWidth: 0 }}>
          <Marca marca={marca} logo={logo} iconoApp={icono} onInicio={onInicio} compacto={!abierto} />
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
          {secciones.map((s) => (conHijos(s)
            ? <GrupoLateral key={s.id} s={s} activa={activa} riel={abierto} bajo={bajo} onIr={onIr} />
            : <RenglonLateral key={s.id} s={s} esta={s.id === activa} riel={abierto} bajo={bajo}
              onClick={() => onIr?.(s)} />))}
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

function BotonDock({ s, esta, conTexto, onIr, botonRef, ...aria }) {
  return (
    <button ref={botonRef} type="button" onClick={() => onIr?.(s)} title={s.texto}
      aria-label={conTexto ? undefined : nombreCon(s.texto, s.insignia)}
      aria-current={esta && !aria["aria-haspopup"] ? "page" : undefined} {...aria}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
        position: "relative", fontFamily: "var(--ds-font)", fontSize: "0.66rem", fontWeight: 700,
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
      <IconoSeccion s={conTexto ? { ...s, insignia: 0 } : s} alto={19} />
      {conTexto && s.texto}
      {conTexto && <Contador n={s.insignia} en={{ top: 1, left: "calc(50% + 3px)" }} />}
    </button>
  );
}

/** Una sección con hijos en el dock: el botón abre un panel hacia arriba
    (Flotante sube solo cuando abajo no cabe), como las pilas de un dock. */
function GrupoDock({ s, activa, conTexto, onIr }) {
  const [abierto, setAbierto] = useState(false);
  const boton = useRef(null);
  return (
    <>
      <BotonDock s={s} esta={contiene(s, activa)} conTexto={conTexto} botonRef={boton}
        onIr={() => setAbierto((v) => !v)} aria-haspopup="menu" aria-expanded={abierto} />
      <MenuHijos s={s} ancla={boton} abierto={abierto} onCerrar={() => setAbierto(false)}
        activa={activa} onIr={onIr} />
    </>
  );
}

function ModoDock({
  marca, logo, onInicio, icono, secciones, activa, onIr, derecha,
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
            {inicio ? (
              <BotonInicio abierto={inicioAbierto} icono={icono}
                onClick={() => onInicioAbierto?.(!inicioAbierto)} />
            ) : <Marca marca={marca} logo={logo} iconoApp={icono} onInicio={onInicio} compacto />}
          </div>
        </div>

        <div style={{ flex: "0 1 auto", minWidth: 0, display: "flex", alignItems: "center",
          justifyContent: "center", gap: "var(--ds-1)", position: "relative" }}>
          {visibles.map((s) => (conHijos(s)
            ? <GrupoDock key={s.id} s={s} activa={activa} conTexto={escalon === 0} onIr={onIr} />
            : <BotonDock key={s.id} s={s} esta={s.id === activa} conTexto={escalon === 0} onIr={onIr} />))}
          {resto.length > 0 && (
            <BotonMas activo={resto.some((s) => contiene(s, activa))}
              insignia={suma(resto)}
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
    <button onClick={onClick} title="Más secciones" aria-label={nombreCon("Más secciones", insignia)}
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
  marca, logo, onInicio, icono, secciones, activa, onIr, derecha,
  inicio, inicioAbierto = false, onInicioAbierto, volver, children,
}) {
  const [hojaMas, setHojaMas] = useState(false);
  /* La pestaña de una sección con hijos abre su propia hoja. */
  const [grupo, setGrupo] = useState(null);
  const todasCaben = secciones.length <= PESTANAS_MAX;
  const visibles = todasCaben ? secciones : secciones.slice(0, PESTANAS_MAX - 1);
  const resto = todasCaben ? [] : secciones.slice(PESTANAS_MAX - 1);
  const arriba = `calc(${ALTO_CABECERA_MOVIL}px + env(safe-area-inset-top, 0px) + var(--ds-3))`;
  const abajo = `calc(${ALTO_DOCK}px + env(safe-area-inset-bottom, 0px) + var(--ds-4))`;
  useReserva(arriba, abajo);

  const pestana = (s, { esta, onClick, etiqueta }) => (
    <button key={s.id} onClick={onClick} aria-current={esta ? "page" : undefined}
      style={{
        position: "relative", flex: "1 1 0", minWidth: 0, height: ALTO_DOCK, border: "none", cursor: "pointer",
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
        <IconoSeccion s={{ ...s, insignia: 0 }} />
      </span>
      <span style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis",
        whiteSpace: "nowrap" }}>{etiqueta}</span>
      <Contador n={s.insignia} en={{ top: 4, left: "calc(50% + 5px)" }} />
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
        {/* En una pantalla profunda, el volver ocupa el sitio de la marca: arriba a la
            izquierda, donde lo busca quien usa cualquier app del teléfono. */}
        {volver ? (
          <button type="button" onClick={volver.ir} aria-label={`Volver a ${volver.texto}`}
            style={{ display: "flex", alignItems: "center", gap: 2, minHeight: 44, minWidth: 0,
              flex: "0 1 auto", overflow: "hidden", padding: "0 8px 0 0", marginLeft: -6,
              border: "none", background: "transparent", cursor: "pointer",
              color: "var(--ds-accent-tinta)", fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-body)",
              fontWeight: 700, WebkitTapHighlightColor: "transparent" }}>
            {FLECHA_ATRAS}
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{volver.texto}</span>
          </button>
        ) : inicio ? (
          <button onClick={() => onInicioAbierto?.(!inicioAbierto)} aria-label="Menú de inicio"
            aria-expanded={inicioAbierto}
            style={{ display: "flex", alignItems: "center", gap: 6, minHeight: 44, minWidth: 0,
              flex: "0 1 auto", overflow: "hidden",
              padding: "0 6px 0 2px", border: "none", background: "transparent", cursor: "pointer",
              color: "var(--ds-ink)", fontFamily: "var(--ds-font)", WebkitTapHighlightColor: "transparent" }}>
            <Marca marca={marca} logo={logo} encoge />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" aria-hidden
              style={{ color: "var(--ds-ink-3)", flexShrink: 0, transform: inicioAbierto ? "rotate(180deg)" : "none",
                transition: "transform var(--ds-t-state) var(--ds-ease)" }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        ) : <Marca marca={marca} logo={logo} onInicio={onInicio} encoge />}
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
          esta: contiene(s, activa), etiqueta: s.texto,
          onClick: conHijos(s) ? () => setGrupo(s) : () => onIr?.(s),
        }))}
        {resto.length > 0 && pestana(
          { id: "__mas", icono: ICONO_MAS, insignia: suma(resto) },
          { esta: resto.some((s) => contiene(s, activa)), onClick: () => setHojaMas(true), etiqueta: "Más" })}
      </nav>

      <HojaMas abierto={hojaMas} onCerrar={() => setHojaMas(false)}
        secciones={resto} activa={activa} onIr={onIr} />
      <HojaMas abierto={!!grupo} onCerrar={() => setGrupo(null)} titulo={grupo?.texto}
        secciones={grupo ? [grupo] : []} activa={activa} onIr={onIr} />
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

/** El tronco de la ruta: la sección activa y, si es un hijo, su padre antes. */
function troncoDe(secciones, activa, onIr) {
  for (const s of secciones) {
    if (s.id === activa) return [{ texto: s.texto, ir: () => onIr?.(s) }];
    const h = conHijos(s) ? s.hijos.find((x) => x.id === activa) : null;
    if (h) {
      return [{ texto: s.texto, ir: navegable(s) ? () => onIr?.(s) : undefined },
        { texto: h.texto, ir: () => onIr?.(h) }];
    }
  }
  return [];
}

const FLECHA_ATRAS = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ flexShrink: 0 }}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export default function Armazon({
  marca, logo, onInicio, icono, secciones = [], activa, onIr, derecha,
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
  const ruta = Array.isArray(migas) ? [...troncoDe(secciones, activa, onIr), ...migas] : null;
  const padre = ruta && ruta.length > 1 ? ruta[ruta.length - 2] : null;
  const bloqueMigas = ruta ? (!movil && ruta.length > 1 ? <Migas ruta={ruta} /> : null) : migas;
  const cuerpo = <Transicion vista={vista}>{bloqueMigas}{children}</Transicion>;
  const conTotales = secciones.map(conInsigniaTotal);
  const props = { marca, logo, onInicio, icono, secciones: conTotales, activa, onIr, derecha, inicio,
    inicioAbierto, onInicioAbierto, children: cuerpo,
    volver: padre?.ir ? { texto: padre.texto, ir: padre.ir } : null };
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
        <div role="menu" ref={menu} className="ds-capa" style={{
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
