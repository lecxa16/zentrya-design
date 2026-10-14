/**
 * Tableros por giro: la prueba de que las piezas sirven a cualquier negocio.
 * Cada tablero responde «¿qué decide quien lo abre?» (GUIA.md §1) y tiene un
 * solo protagonista. Todas las cifras son de EJEMPLO.
 */
import React, { useState } from "react";
import {
  Bento, Celda, Superficie, Seccion, Heroe, Cifra, Pastilla, Segmentado, EncabezadoPagina,
  TarjetaKpi, FilaKpis, TarjetaMeta, TarjetaRanking, TarjetaComparativa, Llamado, Pasos, Kanban,
  LineaTiempo, GraficaLinea, GraficaBarras, Dona, Embudo, Cascada, MapaCalor, Bala,
  BarraDistribucion, Variacion, moneda, SelectorPeriodo,
} from "../../src/index.js";

export const meta = { id: "tableros", titulo: "Tableros por giro", orden: 60 };

const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct"];

function Finanzas() {
  return (
    <Bento>
      <Celda ancho={12} anchoMd={7}>
        <Heroe>
          {/* Sobre el gradiente la tinta se redefine con .ds-sobre-foto: la
              Cifra no necesita saber que está encima del héroe. */}
          <div className="ds-sobre-foto">
            <Cifra etiqueta="Flujo libre del mes" valor={moneda(4820000, { compacto: true })} tamano="xl"
              nota="Cubre 2.4 meses de gasto fijo" />
          </div>
        </Heroe>
      </Celda>
      <Celda ancho={12} anchoMd={5}>
        <TarjetaComparativa titulo="Ingresos del trimestre" formato="moneda" sentido="sube"
          valores={[{ etiqueta: "Real", valor: 38400000 }, { etiqueta: "Presupuesto", valor: 36000000 },
            { etiqueta: "Año anterior", valor: 31200000 }]} />
      </Celda>
      <Celda ancho={12}>
        <FilaKpis indicadores={[
          { etiqueta: "Caja y bancos", valor: 12750000, formato: "moneda", variacion: 0.06, sentido: "sube", contra: "vs sep" },
          { etiqueta: "Cuentas por cobrar", valor: 22100000, formato: "moneda", variacion: 0.11, sentido: "baja", contra: "vs sep" },
          { etiqueta: "Cuentas por pagar", valor: 15300000, formato: "moneda", variacion: -0.04, sentido: "neutro" },
          { etiqueta: "Margen bruto", valor: 0.184, formato: "porcentaje", variacion: 0.9, enPuntos: true, sentido: "sube" },
        ]} />
      </Celda>
      <Celda ancho={12} anchoMd={7}><Superficie>
        <Seccion titulo="De ingresos a utilidad" nota="Octubre">
          <Cascada formato="moneda" pasos={[
            { etiqueta: "Ingresos", valor: 12800000, tipo: "total" }, { etiqueta: "Costo de venta", valor: -9900000 },
            { etiqueta: "Gastos de operación", valor: -1450000 }, { etiqueta: "Financieros", valor: -210000 },
            { etiqueta: "Utilidad", tipo: "total" }]} />
        </Seccion>
      </Superficie></Celda>
      <Celda ancho={12} anchoMd={5}><Superficie>
        <Seccion titulo="Antigüedad de cartera">
          <BarraDistribucion formato="moneda" segmentos={[
            { etiqueta: "Al corriente", valor: 14200000, tono: "ok" }, { etiqueta: "1–30 días", valor: 4800000, tono: "neutro" },
            { etiqueta: "31–60 días", valor: 2100000, tono: "aviso" }, { etiqueta: "+60 días", valor: 1000000, tono: "riesgo" }]} />
        </Seccion>
      </Superficie></Celda>
    </Bento>
  );
}

function Logistica() {
  return (
    <Bento>
      <Celda ancho={12}>
        <Llamado tono="aviso" titulo="7 entregas en riesgo de llegar tarde">
          Tres unidades llevan más de 2 h detenidas en patio. Revisa la ruta Norte antes de las 14:00.
        </Llamado>
      </Celda>
      <Celda ancho={12} anchoMd={4}>
        <TarjetaKpi etiqueta="Entregas a tiempo" valor={0.932} formato="porcentaje" variacion={-1.8} enPuntos
          sentido="sube" contra="vs semana pasada" serie={[95, 96, 94, 95, 93, 94, 93.2]} />
      </Celda>
      <Celda ancho={12} anchoMd={4}>
        <TarjetaKpi etiqueta="Costo por entrega" valor={1840} formato="moneda" variacion={0.042} sentido="baja"
          contra="vs semana pasada" serie={[1720, 1760, 1790, 1800, 1830, 1840]} />
      </Celda>
      <Celda ancho={12} anchoMd={4}>
        <TarjetaKpi etiqueta="Unidades en ruta" valor={46} nota="de 58 disponibles" estado="ok" textoEstado="Normal" />
      </Celda>
      <Celda ancho={12} anchoMd={7}><Superficie>
        <Seccion titulo="Entregas por día" nota="Últimas 10 semanas">
          <GraficaLinea etiquetas={["S32", "S33", "S34", "S35", "S36", "S37", "S38", "S39", "S40", "S41"]}
            series={[{ clave: "t", nombre: "A tiempo", valores: [410, 432, 425, 450, 470, 465, 480, 492, 488, 501] },
              { clave: "r", nombre: "Con retraso", valores: [32, 28, 35, 30, 26, 31, 29, 24, 33, 36] }]} />
        </Seccion>
      </Superficie></Celda>
      <Celda ancho={12} anchoMd={5}><Superficie>
        <Seccion titulo="Ocupación del andén" nota="Día × hora">
          <MapaCalor filas={["Lun", "Mar", "Mié", "Jue", "Vie"]} columnas={["7", "9", "11", "13", "15", "17"]}
            valores={[[3, 8, 9, 6, 4, 2], [4, 9, 10, 7, 5, 2], [2, 7, 8, 8, 6, 3], [5, 10, 9, 7, 5, 1], [6, 9, 7, 5, 3, 1]]} />
        </Seccion>
      </Superficie></Celda>
    </Bento>
  );
}

function Ventas() {
  return (
    <Bento>
      <Celda ancho={12} anchoMd={5}>
        <TarjetaMeta titulo="Ventas del mes" logrado={7350000} meta={10000000} formato="moneda"
          diaActual={14} diasPeriodo={31} />
      </Celda>
      <Celda ancho={12} anchoMd={7}><Superficie>
        <Seccion titulo="Embudo comercial" nota="Oportunidades abiertas en octubre">
          <Embudo etapas={[{ etiqueta: "Prospectos", valor: 820 }, { etiqueta: "Contactados", valor: 510 },
            { etiqueta: "Cotización enviada", valor: 214 }, { etiqueta: "Negociación", valor: 96 },
            { etiqueta: "Cerradas", valor: 41 }]} />
        </Seccion>
      </Superficie></Celda>
      <Celda ancho={12} anchoMd={6}>
        <TarjetaRanking titulo="Mejores clientes" nota="Por venta acumulada" formato="moneda" participacion
          total={58200000} elementos={[
            { nombre: "Grupo Norte", subtitulo: "12 sucursales", valor: 9400000 },
            { nombre: "Distribuidora del Golfo", subtitulo: "8 sucursales", valor: 7100000 },
            { nombre: "Comercial Bajío", subtitulo: "5 sucursales", valor: 5300000 },
            { nombre: "Abastos del Pacífico", subtitulo: "4 sucursales", valor: 4100000 },
            { nombre: "Servicios Centro", subtitulo: "3 sucursales", valor: 2900000 }]} />
      </Celda>
      <Celda ancho={12} anchoMd={6}><Superficie>
        <Seccion titulo="Venta por línea">
          <Dona formato="moneda" datos={[{ etiqueta: "Industrial", valor: 21400000 },
            { etiqueta: "Comercial", valor: 16800000 }, { etiqueta: "Gobierno", valor: 9200000 },
            { etiqueta: "Mostrador", valor: 4100000 }]} />
        </Seccion>
      </Superficie></Celda>
    </Bento>
  );
}

function Compras() {
  return (
    <Bento>
      <Celda ancho={12}><Superficie>
        <Seccion titulo="Orden de compra OC-1042" nota="Material eléctrico · Proveedora Industrial">
          <Pasos pasos={[{ titulo: "Solicitud", estado: "hecho", fecha: "2026-10-02" },
            { titulo: "Aprobación", estado: "hecho", fecha: "2026-10-03" },
            { titulo: "Orden emitida", estado: "hecho", fecha: "2026-10-04" },
            { titulo: "Recepción", estado: "actual", texto: "Faltan 40 de 200 piezas" },
            { titulo: "Pago", estado: "pendiente" }]} />
        </Seccion>
      </Superficie></Celda>
      <Celda ancho={12}><Superficie>
        <Seccion titulo="Requisiciones en curso">
          <Kanban formatoValor="moneda" columnas={[
            { id: "nueva", titulo: "Por aprobar", tarjetas: [
              { id: 1, titulo: "Llantas 11R22.5", subtitulo: "Taller · 12 piezas", valor: 86400 },
              { id: 2, titulo: "Papelería trimestral", subtitulo: "Administración", valor: 7300 }] },
            { id: "cot", titulo: "Cotizando", tarjetas: [
              { id: 3, titulo: "Bombas de trasvase", subtitulo: "Planta · 2 piezas", valor: 142000, etiquetas: ["Urgente"] }] },
            { id: "oc", titulo: "Con orden", tarjetas: [
              { id: 4, titulo: "Material eléctrico", subtitulo: "OC-1042", valor: 58200 }] },
            { id: "rec", titulo: "Recibido", tarjetas: [] }]} />
        </Seccion>
      </Superficie></Celda>
      <Celda ancho={12} anchoMd={6}><Superficie>
        <Seccion titulo="Gasto por categoría" nota="Año en curso">
          <GraficaBarras horizontal formato="moneda" datos={[
            { etiqueta: "Refacciones y llantas", valor: 3120000 }, { etiqueta: "Combustibles y lubricantes", valor: 2480000 },
            { etiqueta: "Servicios de mantenimiento", valor: 1350000 }, { etiqueta: "Equipo de seguridad", valor: 640000 },
            { etiqueta: "Papelería y oficina", valor: 180000 }]} />
        </Seccion>
      </Superficie></Celda>
      <Celda ancho={12} anchoMd={6}><Superficie>
        <Seccion titulo="Proveedores contra meta">
          <Bala formato="porcentaje" items={[
            { etiqueta: "Entrega a tiempo", valor: 0.88, meta: 0.95, rangos: [0.8, 0.9, 1] },
            { etiqueta: "Pedidos completos", valor: 0.94, meta: 0.97, rangos: [0.85, 0.93, 1] },
            { etiqueta: "Rechazos de calidad", valor: 0.03, meta: 0.02, rangos: [0.06, 0.04, 0.1], menorEsMejor: true }]} />
        </Seccion>
      </Superficie></Celda>
    </Bento>
  );
}

function Contabilidad() {
  return (
    <Bento>
      <Celda ancho={12}>
        <FilaKpis indicadores={[
          { etiqueta: "Pólizas del mes", valor: 1284, variacion: 0.05, sentido: "neutro" },
          { etiqueta: "Por contabilizar", valor: 37, estado: "aviso", textoEstado: "Revisar" },
          { etiqueta: "Cuentas sin conciliar", valor: 4, estado: "riesgo", textoEstado: "Bloquea cierre" },
          { etiqueta: "Días para el cierre", valor: 6 }]} />
      </Celda>
      <Celda ancho={12} anchoMd={7}><Superficie>
        <Seccion titulo="Gastos por mes" nota="Operación vs administración">
          <GraficaBarras apiladas formato="moneda" categorias={MESES}
            series={[{ clave: "op", nombre: "Operación", valores: [8.1, 7.9, 8.4, 8.8, 9.1, 8.7, 9.4, 9.0, 9.6, 9.8].map((v) => v * 1e6) },
              { clave: "adm", nombre: "Administración", valores: [2.1, 2.0, 2.2, 2.1, 2.3, 2.2, 2.4, 2.3, 2.3, 2.5].map((v) => v * 1e6) }]} />
        </Seccion>
      </Superficie></Celda>
      <Celda ancho={12} anchoMd={5}><Superficie>
        <Seccion titulo="Cierre de septiembre">
          <LineaTiempo eventos={[
            { id: 1, fecha: "2026-10-01T09:10:00", titulo: "Se abrió el cierre", actor: "Contabilidad" },
            { id: 2, fecha: "2026-10-03T12:30:00", titulo: "Conciliación bancaria terminada", actor: "Tesorería", tono: "ok" },
            { id: 3, fecha: "2026-10-06T17:45:00", titulo: "Provisión de nómina capturada", actor: "Nómina", tono: "ok" },
            { id: 4, fecha: "2026-10-08T10:00:00", titulo: "4 cuentas con diferencia", actor: "Auditoría interna", tono: "aviso" }]} />
        </Seccion>
      </Superficie></Celda>
    </Bento>
  );
}

function Inventario() {
  return (
    <Bento>
      <Celda ancho={12} anchoMd={4}>
        <TarjetaKpi etiqueta="Valor del inventario" valor={18400000} formato="moneda" variacion={0.03} sentido="neutro" />
      </Celda>
      <Celda ancho={12} anchoMd={4}>
        <TarjetaKpi etiqueta="Rotación" valor={6.2} nota="veces al año" variacion={0.08} sentido="sube" />
      </Celda>
      <Celda ancho={12} anchoMd={4}>
        <TarjetaKpi etiqueta="Artículos bajo mínimo" valor={23} estado="riesgo" textoEstado="Reordenar" />
      </Celda>
      <Celda ancho={12}><Superficie>
        <Seccion titulo="Existencias por almacén" nota="Litros, últimos 10 meses">
          <GraficaLinea area etiquetas={MESES} formato="compacto"
            series={[{ clave: "n", nombre: "Norte", valores: [120, 118, 131, 140, 128, 122, 135, 142, 150, 146].map((v) => v * 1000) },
              { clave: "c", nombre: "Centro", valores: [90, 95, 92, 88, 101, 99, 104, 98, 96, 103].map((v) => v * 1000) },
              { clave: "s", nombre: "Sur", valores: [60, 58, 63, 61, 66, 64, 70, 68, 72, 75].map((v) => v * 1000) }]} />
        </Seccion>
      </Superficie></Celda>
    </Bento>
  );
}

const GIROS = [
  { valor: "fin", texto: "Finanzas", Vista: Finanzas, pregunta: "¿Alcanza el dinero y quién nos debe?" },
  { valor: "log", texto: "Logística", Vista: Logistica, pregunta: "¿Qué entrega está en riesgo hoy?" },
  { valor: "ven", texto: "Ventas", Vista: Ventas, pregunta: "¿Llegamos a la meta y dónde se cae el embudo?" },
  { valor: "com", texto: "Compras", Vista: Compras, pregunta: "¿Qué está atorado y qué proveedor falla?" },
  { valor: "con", texto: "Contabilidad", Vista: Contabilidad, pregunta: "¿Qué impide cerrar el mes?" },
  { valor: "inv", texto: "Inventario", Vista: Inventario, pregunta: "¿Qué hay que reordenar?" },
];

export default function Tableros() {
  const [giro, setGiro] = useState("fin");
  const [periodo, setPeriodo] = useState(null);
  const actual = GIROS.find((g) => g.valor === giro);
  const Vista = actual.Vista;
  return (
    <div>
      <EncabezadoPagina titulo={`Tablero de ${actual.texto.toLowerCase()}`} descripcion={actual.pregunta}
        meta={<Pastilla>Datos de ejemplo</Pastilla>}
        acciones={<SelectorPeriodo valor={periodo?.clave} onCambio={setPeriodo} />} />
      <div style={{ margin: "var(--ds-4) 0 var(--ds-6)", overflowX: "auto" }}>
        <Segmentado etiqueta="Giro" opciones={GIROS.map(({ valor, texto }) => ({ valor, texto }))}
          valor={giro} onCambio={setGiro} />
      </div>
      <Vista />
    </div>
  );
}
