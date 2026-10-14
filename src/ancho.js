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
