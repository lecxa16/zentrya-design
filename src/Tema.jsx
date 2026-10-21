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
import "./marcas.css";

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
    try { localStorage.setItem(LLAVE, tema); } catch (e) { /* sin persistencia */ }
  }, [tema]);

  useEffect(() => {
    if (!marca) return undefined;
    const raiz = document.documentElement;
    raiz.setAttribute("data-ds-marca", marca);
    // Al salir de una pantalla con marca no se queda pegada en las demás.
    return () => raiz.removeAttribute("data-ds-marca");
  }, [marca]);

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
