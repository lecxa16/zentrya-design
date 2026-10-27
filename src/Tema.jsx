/**
 * Proveedor de tema del sistema. Cambia una variable en el elemento raíz;
 * no re-renderiza el árbol, así que alternar claro/oscuro es instantáneo.
 *
 * Recuerda la preferencia de quien usa la app y, si nunca eligió, sigue la
 * del sistema operativo — también cuando éste cambia con la app abierta.
 *
 * Solo se guarda lo que la persona ELIGE (`alternar`, `fijar`). Hasta la v1.4.0
 * se guardaba también el tema inicial, y desde la primera visita la app dejaba
 * de seguir al sistema; con `forzar`, una pantalla además contaminaba la
 * preferencia de todas las demás.
 */
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import "./tokens.css";
import "./marcas.css";

const LLAVE = "ds-theme";
const LLAVE_PALETA = "ds-paleta";

/**
 * Paletas que la persona puede elegir. Cada una es una marca de marcas.css
 * (Zentrya no pone atributo). `muestra` es el acento de cada tema, sólo para
 * pintar el selector: dentro de la app los colores salen de los tokens.
 */
export const PALETAS = [
  { id: "zentrya", nombre: "Turquesa", muestra: { light: "#0B7D75", dark: "#3FD3C7" } },
  { id: "oceano", nombre: "Océano", muestra: { light: "#1F5BD1", dark: "#7DAEFF" } },
  { id: "workos", nombre: "Violeta", muestra: { light: "#6D3FD9", dark: "#B79CFF" } },
  { id: "nykza", nombre: "Grafito", muestra: { light: "#111111", dark: "#F2F2F2" } },
  { id: "fucsia", nombre: "Fucsia", muestra: { light: "#B5257E", dark: "#F58BC8" } },
  { id: "pizarra", nombre: "Pizarra", muestra: { light: "#3D5875", dark: "#A3B8D2" } },
];

const TemaCtx = createContext({
  tema: "light", alternar: () => {}, fijar: () => {},
  paleta: "zentrya", paletas: [], fijarPaleta: () => {},
});

function eligio() {
  try { return !!localStorage.getItem(LLAVE); } catch (e) { return false; }
}

function guardar(t) {
  try { localStorage.setItem(LLAVE, t); } catch (e) { /* sin persistencia: dura lo que la pestaña */ }
}

function paletaGuardada(validas) {
  try {
    const p = localStorage.getItem(LLAVE_PALETA);
    return validas.some((v) => v.id === p) ? p : null;
  } catch (e) { return null; }
}

function preferenciaInicial() {
  try {
    const guardado = localStorage.getItem(LLAVE);
    if (guardado === "light" || guardado === "dark") return guardado;
  } catch (e) { /* almacenamiento bloqueado: se sigue al sistema */ }
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

/**
 * `marca`: identidad de otro producto (ver marcas.css), p. ej. "nykza" o "workos".
 * Sin ella se ve Zentrya. Va en el elemento raíz, junto al tema, para que
 * los portales (Modal, Aviso, Flotante) la hereden igual que el tema.
 *
 * `paletas`: deja que la persona elija entre `PALETAS` (`true`) o entre las que
 * se listen por id. La `marca` es con la que arranca; lo que la persona elija
 * se recuerda y manda. Sin `paletas`, la marca es fija como siempre.
 */
export function ProveedorTema({ children, forzar, marca, paletas }) {
  const [tema, setTema] = useState(() => forzar || preferenciaInicial());
  const disponibles = !paletas ? []
    : paletas === true ? PALETAS : PALETAS.filter((p) => paletas.includes(p.id));
  const [elegida, setElegida] = useState(() => paletaGuardada(disponibles));
  const paleta = (disponibles.length && elegida) || marca || "zentrya";
  const atributo = paleta === "zentrya" ? undefined : paleta;

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.setAttribute("data-ds-theme", tema);
    raiz.style.colorScheme = tema;
  }, [tema]);

  useEffect(() => {
    if (!atributo) return undefined;
    const raiz = document.documentElement;
    raiz.setAttribute("data-ds-marca", atributo);
    // Al salir de una pantalla con marca no se queda pegada en las demás.
    return () => raiz.removeAttribute("data-ds-marca");
  }, [atributo]);

  // Mientras no haya elegido a mano, sigue al sistema cuando éste cambie. Se
  // pregunta en cada cambio (no una vez al montar): si elige a media sesión,
  // su elección manda desde ese momento.
  useEffect(() => {
    if (forzar || typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const alCambiar = (e) => { if (!eligio()) setTema(e.matches ? "dark" : "light"); };
    mq.addEventListener("change", alCambiar);
    return () => mq.removeEventListener("change", alCambiar);
  }, [forzar]);

  const fijar = useCallback((t) => { guardar(t); setTema(t); }, []);
  const alternar = useCallback(() => fijar(tema === "dark" ? "light" : "dark"), [tema, fijar]);
  const fijarPaleta = useCallback((p) => {
    try { localStorage.setItem(LLAVE_PALETA, p); } catch (e) { /* dura lo que la pestaña */ }
    setElegida(p);
  }, []);

  return (
    <TemaCtx.Provider value={{ tema, alternar, fijar, paleta, paletas: disponibles, fijarPaleta }}>
      <div className="ds-root">{children}</div>
    </TemaCtx.Provider>
  );
}

export const useTema = () => useContext(TemaCtx);
