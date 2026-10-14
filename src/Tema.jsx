/**
 * Proveedor de tema del sistema. Cambia una variable en el elemento raíz;
 * no re-renderiza el árbol, así que alternar claro/oscuro es instantáneo.
 *
 * Recuerda la preferencia de quien usa la app y, si nunca eligió, sigue la
 * del sistema operativo.
 */
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import "./fuentes.css";
import "./tokens.css";

const LLAVE = "ds-theme";
const TemaCtx = createContext({ tema: "light", alternar: () => {}, fijar: () => {} });

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

export function ProveedorTema({ children, forzar }) {
  const [tema, setTema] = useState(() => forzar || preferenciaInicial());

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.setAttribute("data-ds-theme", tema);
    raiz.style.colorScheme = tema;
    try { localStorage.setItem(LLAVE, tema); } catch (e) { /* sin persistencia */ }
  }, [tema]);

  // Si nunca eligió a mano, sigue al sistema cuando éste cambie.
  useEffect(() => {
    if (forzar) return undefined;
    let eligió = false;
    try { eligió = !!localStorage.getItem(LLAVE); } catch (e) { /* ignorar */ }
    if (eligió) return undefined;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const alCambiar = (e) => setTema(e.matches ? "dark" : "light");
    mq.addEventListener("change", alCambiar);
    return () => mq.removeEventListener("change", alCambiar);
  }, [forzar]);

  const alternar = useCallback(() => setTema((t) => (t === "dark" ? "light" : "dark")), []);

  return (
    <TemaCtx.Provider value={{ tema, alternar, fijar: setTema }}>
      <div className="ds-root">{children}</div>
    </TemaCtx.Provider>
  );
}

export const useTema = () => useContext(TemaCtx);
