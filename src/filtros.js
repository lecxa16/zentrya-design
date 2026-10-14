/**
 * Filtros que sobreviven a salir de la pantalla.
 *
 * Una lista con filtros puestos es trabajo: alguien eligió empresa, área y
 * estatus para encontrar a diez personas entre trescientas. Si al abrir una
 * de esas diez y volver la lista aparece en blanco, ese trabajo se tira y hay
 * que rehacerlo — y se rehace cada vez, todo el día.
 *
 * Se guarda en `sessionStorage`, no en la URL ni en `localStorage`, y la
 * elección importa:
 *
 *   · La URL obligaría a que CADA camino de regreso —la miga de pan, el botón
 *     «Volver», el atrás del navegador, un enlace desde otra pantalla— cargara
 *     los filtros consigo. El que olvidara hacerlo volvería a vaciar la lista,
 *     y sería un olvido invisible hasta que alguien se quejara.
 *   · `localStorage` los dejaría puestos mañana, la semana que viene y tras
 *     cerrar el navegador. Un filtro olvidado que esconde media plantilla es
 *     peor que no tener filtros: nadie sospecha de lo que no ve.
 *
 * La sesión es exactamente la vida útil de ese trabajo.
 *
 *   const [f, ponerF, limpiarF, hayFiltro] = useFiltros("rh-empleados", {
 *     empresa: "", area: "", estatus: "Activo",
 *   });
 *   <Selector valor={f.area} onCambio={(v) => ponerF("area", v)} />
 *   {hayFiltro && <Boton onClick={limpiarF}>Limpiar filtros</Boton>}
 *
 * `limpiar` devuelve a los valores por omisión que se declararon, no a vacío:
 * si la lista nace enseñando sólo a los activos, limpiar la deja así otra vez.
 */
import { useCallback, useEffect, useRef, useState } from "react";

const LLAVE = (nombre) => `ds-filtros:${nombre}`;

/* En navegación privada, con el almacenamiento bloqueado o dentro de un iframe
   sin permisos, leer o escribir LANZA. Un filtro que no se pudo recordar no es
   motivo para tumbar la pantalla: se sigue sin memoria. */
const leer = (nombre) => {
  try {
    const crudo = sessionStorage.getItem(LLAVE(nombre));
    return crudo ? JSON.parse(crudo) : null;
  } catch (e) { return null; }
};
const escribir = (nombre, valor) => {
  try { sessionStorage.setItem(LLAVE(nombre), JSON.stringify(valor)); }
  catch (e) { /* sin memoria, pero la pantalla funciona */ }
};

export function useFiltros(nombre, porOmision) {
  /* Los valores por omisión se congelan en el primer render: si el objeto
     llega en línea —y casi siempre llega así— cambia de identidad en cada
     render, y compararse contra él haría que «limpiar» nunca coincidiera. */
  const base = useRef(porOmision);

  const [valores, setValores] = useState(() => {
    const guardado = leer(nombre);
    /* Sólo se recupera lo que la pantalla sigue reconociendo: si un filtro se
       quitó del código, lo que quedó guardado de él se ignora en vez de
       revivir un filtro que ya no existe. */
    if (!guardado) return { ...base.current };
    const limpio = { ...base.current };
    Object.keys(base.current).forEach((k) => {
      if (guardado[k] !== undefined) limpio[k] = guardado[k];
    });
    return limpio;
  });

  useEffect(() => { escribir(nombre, valores); }, [nombre, valores]);

  const poner = useCallback((llave, valor) => {
    setValores((v) => ({ ...v, [llave]: valor }));
  }, []);

  const limpiar = useCallback(() => { setValores({ ...base.current }); }, []);

  const hayFiltro = Object.keys(base.current)
    .some((k) => String(valores[k] ?? "") !== String(base.current[k] ?? ""));

  return [valores, poner, limpiar, hayFiltro, setValores];
}
