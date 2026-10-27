/**
 * Sistema de diseño — punto de entrada único.
 *
 * Paquete @zentrya/design. No importa nada fuera de esta carpeta salvo React;
 * la fuente va incrustada en los estilos. La capa sobre MUI vive aparte en
 * @zentrya/design/mui.
 */
export { ProveedorTema, useTema, PALETAS } from "./Tema";
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
export { default as Campo, Selector, Buscador, Envoltura, CAJA } from "./primitivas/Campo";
export { default as Interruptor } from "./primitivas/Interruptor";
export { default as Tabla } from "./primitivas/Tabla";
export { Casilla, BarraSeleccion } from "./primitivas/Seleccion";
export { default as Modal, Aviso } from "./primitivas/Modal";
export { default as Formulario, Campos } from "./primitivas/Formulario";
export { default as Transicion } from "./primitivas/Transicion";
export {
  useFormulario, requerido, maximo, minimo, numero, digitos, soloDigitos, correo,
  patron, condicion,
} from "./validacion";
export { useFiltros } from "./filtros";
export { useAngosto, useMedia } from "./ancho";
export { default as Pestanas, Cargando } from "./primitivas/Pestanas";
export { default as PanelInicio } from "./PanelInicio";
export { default as Armazon, SelectorArmazon, useArmazon, ALTO_DOCK, ALTO_CABECERA_MOVIL } from "./Armazon";

/* ---------- v1.1: formato, tarjetas, gráficas, operación y estructura ---------- */
/* `numero` ya es una regla de validación (useFormulario): el formateador de
   números se usa como `formato.numero(…)` o vía `formatear(v, "numero")`. */
export * as formato from "./formato";
export {
  configurarFormato, formatear, moneda, compacto, porcentaje, fecha, fechaRelativa,
  variacion, SIN_DATO,
} from "./formato";

export { default as Variacion } from "./primitivas/Variacion";
export { default as TarjetaKpi, CuerpoKpi } from "./primitivas/TarjetaKpi";
export { default as FilaKpis } from "./primitivas/FilaKpis";
export { default as TarjetaMeta } from "./primitivas/TarjetaMeta";
export { default as TarjetaComparativa } from "./primitivas/TarjetaComparativa";
export { default as TarjetaRanking } from "./primitivas/TarjetaRanking";
export { default as TarjetaEntidad } from "./primitivas/TarjetaEntidad";
export { default as Detalles } from "./primitivas/Detalles";
export { default as Llamado } from "./primitivas/Llamado";
export { default as EstadoVacio } from "./primitivas/EstadoVacio";
export { default as GrupoRetratos } from "./primitivas/GrupoRetratos";

export { default as Flotante, OpcionFlotante } from "./primitivas/Flotante";
export { default as LineaTiempo } from "./primitivas/LineaTiempo";
export { default as Pasos } from "./primitivas/Pasos";
export { default as Kanban } from "./primitivas/Kanban";
export { default as Actividad } from "./primitivas/Actividad";
export { default as Calendario } from "./primitivas/Calendario";
export { default as EncabezadoPagina } from "./primitivas/EncabezadoPagina";
export { default as Segmentado } from "./primitivas/Segmentado";
export { default as SelectorPaleta } from "./primitivas/SelectorPaleta";
export { default as BotonApariencia, ModalApariencia } from "./Apariencia";
export { default as MenuUsuario } from "./Cuenta";
export { default as Notificaciones } from "./Notificaciones";
export { default as PantallaAcceso, TarjetaVitrina, LETRA_SISTEMA } from "./PantallaAcceso";
export { default as EntradaCuenta } from "./EntradaCuenta";
export { default as CampoClave } from "./primitivas/CampoClave";
export { default as PantallaCuenta } from "./Cuenta/PantallaCuenta";
export { SeccionAjustes, FilaAjuste, IconoAjuste, EstadoGuardado } from "./Cuenta/Ajustes";
export { default as CargaFoto } from "./Cuenta/CargaFoto";
export { default as ZonaPeligro } from "./Cuenta/ZonaPeligro";
export { SimboloZentrya, CIAN_ZENTRYA } from "./marca/Zentrya";
export { default as SelectorPeriodo, PERIODOS, rangoPeriodo, textoRango } from "./primitivas/SelectorPeriodo";
export { default as Chip, BarraFiltros } from "./primitivas/Chip";

export { default as Sparkline } from "./graficas/Sparkline";
export { default as GraficaLinea } from "./graficas/GraficaLinea";
export { default as GraficaDestacada } from "./graficas/GraficaDestacada";
export { default as GraficaBarras } from "./graficas/GraficaBarras";
export { default as Dona } from "./graficas/Dona";
export { default as Embudo } from "./graficas/Embudo";
export { default as Cascada } from "./graficas/Cascada";
export { default as MapaCalor } from "./graficas/MapaCalor";
export { default as CalendarioCalor } from "./graficas/CalendarioCalor";
export { default as Bala } from "./graficas/Bala";
export { default as BarraDistribucion } from "./graficas/BarraDistribucion";
export { SERIES, Leyenda, Globo, MarcoGrafica, SinDatos, useMedida } from "./graficas/base";
