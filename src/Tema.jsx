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
import "./fuentes.css";
import "./tokens.css";
import "./marcas.css";

const LLAVE = "ds-theme";
const TemaCtx = createContext({ tema: "light", alternar: () => {}, fijar: () => {} });

function eligio() {
  try { return !!localStorage.getItem(LLAVE); } catch (e) { return false; }
}

function guardar(t) {
  try { localStorage.setItem(LLAVE, t); } catch (e) { /* sin persistencia: dura lo que la pestaña */ }
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
 */
export function ProveedorTema({ children, forzar, marca }) {
  const [tema, setTema] = useState(() => forzar || preferenciaInicial());

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.setAttribute("data-ds-theme", tema);
    raiz.style.colorScheme = tema;
  }, [tema]);

  useEffect(() => {
    if (!marca) return undefined;
    const raiz = document.documentElement;
    raiz.setAttribute("data-ds-marca", marca);
    // Al salir de una pantalla con marca no se queda pegada en las demás.
    return () => raiz.removeAttribute("data-ds-marca");
  }, [marca]);

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

  return (
    <TemaCtx.Provider value={{ tema, alternar, fijar }}>
      <div className="ds-root">{children}</div>
    </TemaCtx.Provider>
  );
}

export const useTema = () => useContext(TemaCtx);
