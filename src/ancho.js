/**
 * ¿La pantalla es angosta?
 *
 * Existe porque hay decisiones de estructura que el CSS no puede tomar: cuándo
 * una cuadrícula de mes deja de ser legible y tiene que volverse una lista,
 * cuándo una miga de pan se colapsa. Eso no es un estilo alternativo, es otro
 * árbol de elementos, y eso se decide en React.
 *
 * Todo lo que SÍ pueda resolver una media query en CSS, que la resuelva ahí:
 * este hook re-renderiza, el CSS no.
 *
 * El valor por omisión, 760px, es el mismo que usa el chasis para comprimir la
 * navegación; quien necesite otro umbral lo pasa.
 *
 *   const angosto = useAngosto();        // 760
 *   const muyAngosto = useAngosto(640);  // para una cuadrícula ancha
 */
import { useEffect, useState } from "react";

export function useAngosto(px = 760) {
  const [angosto, setAngosto] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= px);

  useEffect(() => {
    /* En un entorno sin `matchMedia` —una prueba, un render en servidor— no
       se rompe: se queda con lo que se calculó al iniciar. */
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia(`(max-width: ${px}px)`);
    const alCambiar = (e) => setAngosto(e.matches);
    setAngosto(mq.matches);
    mq.addEventListener("change", alCambiar);
    return () => mq.removeEventListener("change", alCambiar);
  }, [px]);

  return angosto;
}

/**
 * Tamaño de una cifra que nunca se parte en dos renglones.
 *
 * «$38,400,000» / «.00» en dos líneas ya no es una cifra. En vez de dejarla
 * envolver, la letra baja lo necesario para caber en su columna: el tamaño
 * del token es el techo y el ancho del contenedor el límite (unidades `cqi`).
 * Quien la usa envuelve la cifra en un elemento con `CONTENEDOR_CIFRA`.
 * 0.62 em es el ancho medio de un numeral tabular de Manrope a peso 800.
 */
export const CONTENEDOR_CIFRA = { containerType: "inline-size", minWidth: 0 };
export function cabe(token, texto) {
  const n = Math.max(4, String(texto ?? "").length);
  return `min(${token}, calc(100cqi / ${(n * 0.62).toFixed(2)}))`;
}
