/**
 * Capa opcional sobre MUI.
 *
 * El núcleo del sistema (`src/design`) no importa nada más que React: ésa
 * es la razón por la que se puede copiar a otro proyecto. Pero dos
 * controles del navegador no se pueden estilar por dentro y hay que
 * sustituirlos:
 *
 *   · el `<input type="date">` — distinto en cada navegador, no respeta
 *     es-MX y dispara `onChange` en cada segmento;
 *   · el `<select>` — su lista la dibuja el sistema operativo, así que en
 *     tema oscuro sale un menú blanco.
 *
 * Por eso viven APARTE: quien se lleve el sistema a un proyecto sin MUI
 * copia `design/` y deja esta carpeta. Se ven idénticos a los propios
 * porque salen de los mismos tokens.
 *
 * Requiere: `@mui/material`, `@mui/x-date-pickers` y `dayjs`.
 */
export { default as CampoFecha } from "./Fecha";
export { default as Selector } from "./Selector";
export { default as Buscable } from "./Buscable";
