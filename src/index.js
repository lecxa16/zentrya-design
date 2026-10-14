/**
 * Sistema de diseño — punto de entrada único.
 *
 * Paquete @zentrya/design. No importa nada fuera de esta carpeta salvo React;
 * la fuente va incrustada en los estilos. La capa sobre MUI vive aparte en
 * @zentrya/design/mui.
 */
export { ProveedorTema, useTema } from "./Tema";
export { default as Superficie } from "./primitivas/Superficie";
export { Bento, Celda } from "./primitivas/Bento";
export { default as Heroe, Vidrio } from "./primitivas/Heroe";
export { default as Cifra } from "./primitivas/Cifra";
export { default as Anillo } from "./primitivas/Anillo";
export { default as Medidor } from "./primitivas/Medidor";
export { default as Esqueleto, EsqueletoFila, EsqueletoLista } from "./primitivas/Esqueleto";
export { default as Barras } from "./primitivas/Barras";
export { Pastilla, Insignia } from "./primitivas/Pastilla";
export { default as Boton, Giro } from "./primitivas/Boton";
export { default as Fila, Retrato } from "./primitivas/Fila";
export { default as Seccion } from "./primitivas/Seccion";
export { default as Migas } from "./primitivas/Migas";
export { default as Barra } from "./primitivas/Barra";
export { default as Lamina } from "./primitivas/Lamina";
export { default as Azulejo } from "./primitivas/Azulejo";
export { default as Campo, Selector, Buscador } from "./primitivas/Campo";
export { default as Interruptor } from "./primitivas/Interruptor";
export { default as Tabla } from "./primitivas/Tabla";
export { default as Modal, Aviso } from "./primitivas/Modal";
export { default as Formulario, Campos } from "./primitivas/Formulario";
export { default as Transicion } from "./primitivas/Transicion";
export {
  useFormulario, requerido, maximo, minimo, numero, digitos, soloDigitos, correo,
  patron, condicion,
} from "./validacion";
export { useFiltros } from "./filtros";
export { useAngosto } from "./ancho";
export { default as Pestanas, Cargando } from "./primitivas/Pestanas";
export { default as PanelInicio } from "./PanelInicio";
export { default as Armazon, SelectorArmazon, useArmazon } from "./Armazon";
