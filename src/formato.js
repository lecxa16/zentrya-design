/**
 * Formato de cifras, fechas y variaciones.
 *
 * Un tablero de finanzas, uno de logística y uno de ventas muestran lo mismo
 * —dinero, cantidades, porcentajes, fechas— y cada pantalla que lo formatea a
 * mano lo hace un poco distinto: «$1,234.5» aquí, «1234.50 MXN» allá. Todo
 * pasa por aquí para que una cifra se lea igual en cualquier producto.
 *
 * Idioma y moneda por omisión: es-MX y MXN. Un proyecto de otro país llama a
 * `configurarFormato` una vez al arrancar y no toca nada más.
 *
 * Un valor ausente NO se vuelve cero: sale «—». Un cero inventado en un
 * tablero es una cifra falsa que alguien va a usar para decidir.
 */

let CONFIG = { idioma: "es-MX", moneda: "MXN", zonaHoraria: undefined };

export function configurarFormato(cambios = {}) {
  CONFIG = { ...CONFIG, ...cambios };
}

export const SIN_DATO = "—";

const vacio = (v) => v === null || v === undefined || v === "" || Number.isNaN(Number(v));

/** 1234.5 → «1,234.5». `decimales` fija; si no, hasta 2 sin ceros de relleno. */
export function numero(v, { decimales, minimo } = {}) {
  if (vacio(v)) return SIN_DATO;
  return new Intl.NumberFormat(CONFIG.idioma, {
    minimumFractionDigits: decimales ?? minimo ?? 0,
    maximumFractionDigits: decimales ?? 2,
  }).format(Number(v));
}

/** 1234.5 → «$1,234.50». `compacto` → «$1.2 M». */
export function moneda(v, { moneda: m = CONFIG.moneda, decimales = 2, compacto = false } = {}) {
  if (vacio(v)) return SIN_DATO;
  if (compacto) {
    return new Intl.NumberFormat(CONFIG.idioma, {
      style: "currency", currency: m, notation: "compact", maximumFractionDigits: 1,
    }).format(Number(v));
  }
  return new Intl.NumberFormat(CONFIG.idioma, {
    style: "currency", currency: m,
    minimumFractionDigits: decimales, maximumFractionDigits: decimales,
  }).format(Number(v));
}

/** 1250000 → «1.3 M». Para ejes y tarjetas donde el ancho manda. */
export function compacto(v, { decimales = 1 } = {}) {
  if (vacio(v)) return SIN_DATO;
  return new Intl.NumberFormat(CONFIG.idioma, {
    notation: "compact", maximumFractionDigits: decimales,
  }).format(Number(v));
}

/**
 * Porcentaje. Recibe la FRACCIÓN (0.124 → «12.4 %»), como lo devuelve casi
 * cualquier cálculo. Si el dato ya viene en puntos (12.4), `enPuntos: true`.
 */
export function porcentaje(v, { decimales = 1, enPuntos = false, signo = false } = {}) {
  if (vacio(v)) return SIN_DATO;
  const f = enPuntos ? Number(v) / 100 : Number(v);
  return new Intl.NumberFormat(CONFIG.idioma, {
    style: "percent", minimumFractionDigits: 0, maximumFractionDigits: decimales,
    signDisplay: signo ? "exceptZero" : "auto",
  }).format(f);
}

/* Una cadena «2026-10-14» se lee como medianoche UTC y en México se pinta un
   día antes. Las fechas sin hora se construyen en hora local. */
function aFecha(v) {
  if (v instanceof Date) return v;
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
    const [a, m, d] = v.split("-").map(Number);
    return new Date(a, m - 1, d);
  }
  return new Date(v);
}

const ESTILOS_FECHA = {
  corta: { day: "2-digit", month: "2-digit", year: "numeric" },        // 14/10/2026
  media: { day: "numeric", month: "short", year: "numeric" },          // 14 oct 2026
  larga: { weekday: "long", day: "numeric", month: "long", year: "numeric" },
  dia:   { day: "numeric", month: "short" },                           // 14 oct
  mes:   { month: "long", year: "numeric" },                           // octubre de 2026
  mesCorto: { month: "short" },                                        // oct
  hora:  { hour: "2-digit", minute: "2-digit" },
  fechaHora: { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" },
};

export function fecha(v, estilo = "media") {
  if (v === null || v === undefined || v === "") return SIN_DATO;
  const f = aFecha(v);
  if (Number.isNaN(f.getTime())) return SIN_DATO;
  return new Intl.DateTimeFormat(CONFIG.idioma, {
    ...(ESTILOS_FECHA[estilo] || ESTILOS_FECHA.media), timeZone: CONFIG.zonaHoraria,
  }).format(f).replace(/\.$/, "");
}

/** «hace 3 días», «en 2 h». Para bitácoras y vencimientos. */
export function fechaRelativa(v, ahora = new Date()) {
  if (v === null || v === undefined || v === "") return SIN_DATO;
  const f = aFecha(v);
  if (Number.isNaN(f.getTime())) return SIN_DATO;
  const seg = (f.getTime() - ahora.getTime()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(CONFIG.idioma, { numeric: "auto" });
  const pasos = [["year", 31536000], ["month", 2592000], ["week", 604800],
    ["day", 86400], ["hour", 3600], ["minute", 60]];
  for (const [unidad, s] of pasos) {
    if (Math.abs(seg) >= s) return rtf.format(Math.round(seg / s), unidad);
  }
  return rtf.format(0, "minute");
}

/**
 * Variación entre dos valores. Devuelve la fracción (0.12 = +12 %) o `null`
 * cuando no se puede calcular: con anterior en cero no hay porcentaje que
 * signifique algo, y un «+∞ %» o un «+100 %» inventado engaña.
 */
export function variacion(actual, anterior) {
  if (vacio(actual) || vacio(anterior) || Number(anterior) === 0) return null;
  return (Number(actual) - Number(anterior)) / Math.abs(Number(anterior));
}

/**
 * Elige el formateador por nombre: las piezas reciben `formato="moneda"` y
 * no una función, para que un tablero entero se configure con texto.
 * Una función también vale, para casos propios.
 */
export function formatear(v, formato = "numero", opciones) {
  if (typeof formato === "function") return formato(v);
  switch (formato) {
    case "moneda": return moneda(v, opciones);
    case "monedaCompacta": return moneda(v, { ...opciones, compacto: true });
    case "compacto": return compacto(v, opciones);
    case "porcentaje": return porcentaje(v, opciones);
    case "texto": return v === null || v === undefined || v === "" ? SIN_DATO : String(v);
    default: return numero(v, opciones);
  }
}
