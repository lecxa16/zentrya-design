/**
 * Validación de formularios — las reglas y el enganche con los campos.
 *
 * Regla de Carlos (2026-09-26): **el botón de guardar NO se deshabilita.** Un
 * botón gris no dice qué falta; quien captura se queda mirándolo sin saber si
 * el sistema se trabó o si hizo algo mal. Aquí el botón siempre se puede
 * pulsar: al pulsarlo, cada campo que no cumple **se marca en rojo y dice su
 * regla debajo**, arriba aparece el resumen de lo que hay que revisar, y el
 * foco se va al primer campo con problema.
 *
 * Cuándo se enseña el error:
 *   · al salir de un campo que se tocó, o
 *   · al intentar guardar (entonces se revisan todos).
 * Nunca mientras se escribe la primera letra: eso sería regañar a alguien por
 * no haber terminado de escribir.
 *
 * La ayuda (`ayuda`) dice la regla ANTES de romperla —«de 14 a 16 dígitos»— y
 * el error la sustituye cuando se rompe. Es el mismo patrón de Material UI
 * (`error` + `helperText`), con las piezas del sistema: el núcleo no importa
 * MUI, por eso se puede copiar a otro proyecto.
 */
import { useCallback, useMemo, useRef, useState } from "react";

/* ---------- Reglas ----------
   Cada regla recibe el valor y devuelve un mensaje o `null`.
   Salvo `requerido`, TODAS ignoran el vacío: un campo opcional en blanco no
   tiene nada que reclamar. */

const vacio = (v) => v === undefined || v === null || String(v).trim() === "";

export const requerido = (mensaje = "Este dato es obligatorio.") =>
  (v) => (vacio(v) ? mensaje : null);

export const maximo = (n, mensaje) => (v) => (
  !vacio(v) && String(v).trim().length > n
    ? (mensaje || `No puede pasar de ${n} caracteres; llevas ${String(v).trim().length}.`)
    : null);

export const minimo = (n, mensaje) => (v) => (
  !vacio(v) && String(v).trim().length < n
    ? (mensaje || `Necesita al menos ${n} caracteres.`)
    : null);

/** Número, con mínimo opcional. El importe de un costo, por ejemplo. */
export const numero = ({ desde = null, hasta = null, mensaje } = {}) => (v) => {
  if (vacio(v)) return null;
  const n = Number(String(v).replace(/,/g, ""));
  if (Number.isNaN(n)) return mensaje || "Tiene que ser un número.";
  if (desde !== null && n < desde) {
    return mensaje || `Tiene que ser un número mayor o igual a ${desde}.`;
  }
  if (hasta !== null && n > hasta) return mensaje || `No puede pasar de ${hasta}.`;
  return null;
};

/** Sólo dígitos, entre un mínimo y un máximo. El IMEI de un celular. */
export const digitos = (desde, hasta, mensaje) => (v) => {
  if (vacio(v)) return null;
  const n = String(v).replace(/\D/g, "").length;
  return (n < desde || n > hasta)
    ? (mensaje || `Debe tener de ${desde} a ${hasta} dígitos.`)
    : null;
};

/**
 * Exactamente N dígitos y NADA más: ni espacios, ni guiones, ni paréntesis.
 *
 * No es lo mismo que `digitos`, y la diferencia importa: `digitos` limpia los
 * separadores antes de contar, así que «81-1234-5678» le parece bien. Cuando
 * el servidor guarda el dato crudo y lo compara entre registros —un teléfono,
 * un NSS, una CLABE— esa limpieza convierte al formulario en un mentiroso:
 * acepta lo que el servidor va a rechazar. Úsala cuando la forma exacta del
 * dato es la regla, no sólo su longitud.
 */
export const soloDigitos = (n, mensaje) => (v) => (
  !vacio(v) && !new RegExp(`^\\d{${n}}$`).test(String(v).trim())
    ? (mensaje || `Debe tener exactamente ${n} dígitos, sin espacios ni guiones.`)
    : null);

/** Un correo con arroba y dominio. No verifica que exista: eso no se sabe aquí. */
export const correo = (mensaje = "El correo debe llevar arroba y dominio, como nombre@dominio.com.") =>
  (v) => (!vacio(v) && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim()) ? mensaje : null);

export const patron = (expresion, mensaje) => (v) => (
  !vacio(v) && !expresion.test(String(v).trim()) ? mensaje : null);

/** Una regla escrita a mano, cuando depende de otros campos. */
export const condicion = (prueba, mensaje) => (v, valores) => (
  prueba(v, valores) ? null : mensaje);

/**
 * El formulario: valores, errores y el intento de guardar.
 *
 * Cada campo se declara con su etiqueta, su valor inicial, sus reglas y su
 * ayuda — juntos, porque separarlos es la forma más fácil de que una etiqueta
 * diga una cosa y la regla exija otra.
 *
 *   const f = useFormulario({
 *     titulo: { etiqueta: "Asunto", reglas: [requerido(), maximo(200)] },
 *     imei:   { etiqueta: "IMEI", ayuda: "En el celular se marca *#06#",
 *               reglas: [digitos(14, 16)] },
 *   });
 *   <Campo {...f.campo("titulo")} marcador="…" />
 *   <Boton onClick={() => f.intentar(guardar)}>Crear</Boton>
 */
export function useFormulario(definicion) {
  const inicial = useMemo(() => Object.fromEntries(
    Object.entries(definicion).map(([k, d]) => [k, d.valor ?? ""])), []); // eslint-disable-line react-hooks/exhaustive-deps

  const [valores, setValores] = useState(inicial);
  const [tocados, setTocados] = useState({});
  const [intentado, setIntentado] = useState(false);
  const cuerpo = useRef(null);

  const errores = useMemo(() => {
    const e = {};
    Object.entries(definicion).forEach(([nombre, d]) => {
      for (const regla of (d.reglas || [])) {
        const m = regla(valores[nombre], valores);
        if (m) { e[nombre] = m; break; }
      }
    });
    return e;
  }, [valores, definicion]);

  const poner = useCallback((nombre) => (v) => {
    setValores((x) => ({ ...x, [nombre]: v }));
  }, []);

  /* Un campo se juzga cuando quien captura TERMINA con él, no mientras
     escribe: marcar en rojo un teléfono de diez dígitos durante las nueve
     primeras pulsaciones no corrige a nadie, sólo regaña. Por eso el error
     espera a `onSalir` —el blur en un campo de texto, la elección en un
     selector— o al intento de guardar. Ya marcado, sí se actualiza en vivo:
     quien está corrigiendo quiere ver cuándo quedó bien. */
  const marcar = useCallback((nombre) => () => {
    setTocados((t) => (t[nombre] ? t : { ...t, [nombre]: true }));
  }, []);

  /** Props listos para `Campo`, `Selector` y `CampoFecha`: los tres hablan el
      mismo idioma (`valor`, `onCambio`, `error`, `ayuda`, `requerido`). */
  const campo = useCallback((nombre) => {
    const d = definicion[nombre] || {};
    const seVe = intentado || tocados[nombre];
    return {
      etiqueta: d.etiqueta,
      valor: valores[nombre] ?? "",
      onCambio: poner(nombre),
      onSalir: marcar(nombre),
      error: seVe ? errores[nombre] : undefined,
      ayuda: d.ayuda,
      /* Obligatorio = alguna de sus reglas se queja del vacío. Se pregunta a
         la regla en vez de pedir una bandera aparte, que es la forma fácil de
         que el asterisco y la validación acaben diciendo cosas distintas. */
      requerido: (d.reglas || []).some((r) => {
        try { return r("", valores) !== null; } catch (e) { return false; }
      }),
    };
  }, [definicion, valores, errores, tocados, intentado, poner, marcar]);

  /** Lo que hay que revisar, con el NOMBRE que ve quien captura. */
  const problemas = useMemo(() => (intentado
    ? Object.keys(errores).map((n) => definicion[n]?.etiqueta || n)
    : []), [intentado, errores, definicion]);

  /**
   * El intento de guardar. Si algo no cumple: marca todo, lleva el foco al
   * primer campo con problema y NO llama al servidor. Devuelve si pasó.
   */
  const intentar = useCallback((alEnviar) => {
    setIntentado(true);
    if (Object.keys(errores).length > 0) {
      /* Después del repintado: los campos que nadie había tocado acaban de
         enterarse de que tienen error, así que sus marcadores todavía no
         existen en este punto.
         El primero se busca por el marcador que pone `Envoltura`, no por un
         id: así funciona igual con los tres campos, incluidos los de MUI, que
         no exponen su input. */
      requestAnimationFrame(() => {
        const primero = cuerpo.current?.querySelector('[data-error="si"]');
        primero?.scrollIntoView({ block: "center", behavior: "smooth" });
        const foco = primero?.querySelector("input, textarea, select, [role='combobox']");
        try { foco?.focus({ preventScroll: true }); } catch (e) { /* no enfocable */ }
      });
      return false;
    }
    alEnviar(valores);
    return true;
  }, [errores, valores]);

  const limpiar = useCallback(() => {
    setValores(inicial); setTocados({}); setIntentado(false);
  }, [inicial]);

  return { valores, errores, problemas, intentado, campo, poner, marcar, intentar, limpiar,
    cuerpo, setValores };
}
