/**
 * Operación: piezas que siguen trabajo en movimiento — historiales, procesos,
 * tableros por etapa, actividad del equipo y calendario.
 * Todos los datos de esta página son de EJEMPLO.
 */
import React, { useState } from "react";
import { Bento, Celda, Superficie, Seccion, Pastilla } from "../../src/index.js";
import LineaTiempo from "../../src/primitivas/LineaTiempo.jsx";
import Pasos from "../../src/primitivas/Pasos.jsx";
import Kanban from "../../src/primitivas/Kanban.jsx";
import Actividad from "../../src/primitivas/Actividad.jsx";
import Calendario from "../../src/primitivas/Calendario.jsx";

export const meta = { id: "operacion", titulo: "Operación", orden: 40 };

const Ejemplo = () => <Pastilla>Datos de ejemplo</Pastilla>;
const icono = (d) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

/* Fechas relativas a hoy para que «Hoy» y «Ayer» tengan sentido siempre. */
const hace = (min) => new Date(Date.now() - min * 60000);
const dos = (n) => String(n).padStart(2, "0");
const hoyIso = (() => { const d = new Date(); return `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`; })();
const diaDelMes = (n) => `${hoyIso.slice(0, 8)}${dos(n)}`;

const EMBARQUE = [
  { id: 1, fecha: "2026-10-12T08:10:00", titulo: "Pedido recibido", texto: "Pedido PV-20931 · 3 tarimas", actor: "Portal de clientes" },
  { id: 2, fecha: "2026-10-12T13:42:00", titulo: "Surtido en almacén", texto: "Almacén Monterrey, andén 4", actor: "Luis Garza", tono: "ok", icono: icono("M20 6L9 17l-5-5") },
  { id: 3, fecha: "2026-10-13T06:05:00", titulo: "En ruta", texto: "Unidad 118 · placas ABC-12-34", actor: "Transportes del Norte" },
  { id: 4, fecha: "2026-10-13T17:20:00", titulo: "Retraso en caseta", texto: "Revisión de documentos, 45 min", tono: "aviso", icono: icono("M12 8v5M12 17h.01") },
  { id: 5, fecha: "2026-10-14T09:30:00", titulo: "Llegó a destino", texto: "Firma de recibido pendiente", actor: "Cliente: Abarrotes La Fe" },
];

const COMPRA = [
  { titulo: "Solicitud", estado: "hecho", fecha: "2026-10-01", responsable: "Compras" },
  { titulo: "Aprobación", estado: "hecho", fecha: "2026-10-02", responsable: "Dirección" },
  { titulo: "Orden de compra", estado: "actual", fecha: "2026-10-03", responsable: "M. Ruiz" },
  { titulo: "Recepción", estado: "pendiente" },
  { titulo: "Pago", estado: "pendiente" },
];

const ALTA_PROVEEDOR = [
  { titulo: "Datos fiscales", estado: "hecho", fecha: "2026-09-20", responsable: "Proveedor" },
  { titulo: "Validación de RFC", estado: "error", texto: "La constancia no coincide con la razón social." },
  { titulo: "Cuenta bancaria", estado: "pendiente" },
  { titulo: "Contrato", estado: "omitido", texto: "No aplica a compras menores." },
];

const PIPELINE_INICIAL = [
  { id: "prospecto", titulo: "Prospecto", tarjetas: [
    { id: "o1", titulo: "Ferretería El Clavo", subtitulo: "Monterrey · Ana López", valor: 185000 },
    { id: "o2", titulo: "Clínica Santa Fe", subtitulo: "CDMX · Jorge Pérez", valor: 420000, etiquetas: [{ texto: "Nuevo" }] },
  ] },
  { id: "propuesta", titulo: "Propuesta enviada", tarjetas: [
    { id: "o3", titulo: "Hotel Mirador", subtitulo: "Cancún · Ana López", valor: 960000, etiquetas: [{ texto: "Vence viernes", tono: "aviso" }] },
  ] },
  { id: "negociacion", titulo: "Negociación", tarjetas: [
    { id: "o4", titulo: "Constructora Alfa", subtitulo: "Querétaro · Luis Ríos", valor: 1450000 },
    { id: "o5", titulo: "Escuela Montessori", subtitulo: "Puebla · Jorge Pérez", valor: 230000, etiquetas: [{ texto: "Sin respuesta", tono: "riesgo" }] },
  ] },
  { id: "ganada", titulo: "Ganada", tarjetas: [] },
];

const TICKETS = [
  { id: "abierto", titulo: "Abiertos", tarjetas: [
    { id: "t1", titulo: "No llega el correo de factura", subtitulo: "#4821 · Prioridad alta", etiquetas: [{ texto: "Alta", tono: "riesgo" }] },
    { id: "t2", titulo: "Cambiar dirección de entrega", subtitulo: "#4822", etiquetas: [{ texto: "Media" }] },
  ] },
  { id: "proceso", titulo: "En proceso", tarjetas: [
    { id: "t3", titulo: "Error al descargar estado de cuenta", subtitulo: "#4810 · Soporte N2" },
  ] },
  { id: "cerrado", titulo: "Resueltos", tarjetas: [] },
];

const ACTIVIDAD = [
  { id: 1, actor: "Ana López", accion: "aprobó la orden de compra", objeto: "OC-1042", fecha: hace(4), detalle: "Papelería y consumibles · $18,420.00" },
  { id: 2, actor: "Luis Garza", accion: "registró la recepción de", objeto: "42 cajas", fecha: hace(38) },
  { id: 3, accion: "Se timbró la factura", objeto: "A-3391", fecha: hace(95), icono: icono("M20 6L9 17l-5-5"), tono: "ok" },
  { id: 4, actor: "Marta Ruiz", accion: "comentó en", objeto: "Ticket #4821", fecha: hace(60 * 26), detalle: "«Ya lo revisó sistemas, esperamos respuesta del cliente.»" },
  { id: 5, accion: "Pago rechazado por el banco:", objeto: "Proveedor Delta", fecha: hace(60 * 27), icono: icono("M18 6L6 18M6 6l12 12"), tono: "riesgo" },
  { id: 6, actor: "Jorge Pérez", accion: "dio de alta al empleado", objeto: "Diana Soto", fecha: hace(60 * 24 * 4) },
];

const EVENTOS_MES = [
  { id: 1, fecha: diaDelMes(2), titulo: "Entrega Hotel Mirador", tono: "acento", hora: "09:00" },
  { id: 2, fecha: diaDelMes(5), titulo: "Vence factura A-3310", tono: "aviso" },
  { id: 3, fecha: diaDelMes(5), titulo: "Mantenimiento unidad 118", tono: "neutro" },
  { id: 4, fecha: diaDelMes(9), titulo: "Pago de nómina", tono: "ok" },
  { id: 5, fecha: diaDelMes(12), titulo: "Auditoría de inventario", tono: "acento" },
  { id: 6, fecha: diaDelMes(12), titulo: "Entrega Clínica Santa Fe", tono: "acento", hora: "11:30" },
  { id: 7, fecha: diaDelMes(12), titulo: "Vence factura A-3341", tono: "aviso" },
  { id: 8, fecha: diaDelMes(12), titulo: "Junta de compras", tono: "neutro", hora: "16:00" },
  { id: 9, fecha: diaDelMes(17), titulo: "Factura vencida B-118", tono: "riesgo" },
  { id: 10, fecha: diaDelMes(23), titulo: "Declaración mensual", tono: "aviso" },
  { id: 11, fecha: diaDelMes(28), titulo: "Cierre de mes", tono: "acento" },
];

function mover(setCols) {
  return (tarjeta, destino, origen) => setCols((cols) => cols.map((c) => {
    if (c.id === origen) return { ...c, tarjetas: c.tarjetas.filter((t) => t.id !== tarjeta.id) };
    if (c.id === destino) return { ...c, tarjetas: [...c.tarjetas, tarjeta] };
    return c;
  }));
}

export default function Operacion() {
  const [pipeline, setPipeline] = useState(PIPELINE_INICIAL);
  const [ultimo, setUltimo] = useState(null);

  return (
    <Bento>
      <Celda ancho={12}><Superficie>
        <Seccion titulo="Pasos" nota="Compras: de la solicitud al pago" accion={<Ejemplo />}>
          <Pasos pasos={COMPRA} />
        </Seccion>
      </Superficie></Celda>

      <Celda ancho={12} anchoMd={6}><Superficie>
        <Seccion titulo="Pasos verticales" nota="Alta de proveedor, con un paso con problema y uno omitido">
          <Pasos pasos={ALTA_PROVEEDOR} orientacion="vertical"
            onPaso={(p) => setUltimo(`Paso: ${p.titulo}`)} />
          {ultimo && (
            <div style={{ marginTop: 12, fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }}>
              Último clic → {ultimo}
            </div>
          )}
        </Seccion>
      </Superficie></Celda>

      <Celda ancho={12} anchoMd={6}><Superficie>
        <Seccion titulo="Línea de tiempo" nota="Embarque PV-20931, agrupado por día" accion={<Ejemplo />}>
          <LineaTiempo eventos={EMBARQUE} agrupar />
        </Seccion>
      </Superficie></Celda>

      <Celda ancho={12}><Superficie>
        <Seccion titulo="Kanban" nota="Pipeline de ventas: arrastra o usa «Mover a…»" accion={<Ejemplo />}>
          <Kanban columnas={pipeline} onMover={mover(setPipeline)}
            onTarjeta={(t) => setUltimo(`Oportunidad: ${t.titulo}`)}
            vacioColumna="Todavía no se gana ninguna este mes." />
        </Seccion>
      </Superficie></Celda>

      <Celda ancho={12} anchoMd={7}><Superficie>
        <Seccion titulo="Kanban de sólo lectura" nota="Soporte: sin onMover no se arrastra">
          <Kanban columnas={TICKETS} anchoColumna={240} />
        </Seccion>
      </Superficie></Celda>

      <Celda ancho={12} anchoMd={5}><Superficie>
        <Seccion titulo="Actividad" nota="Lo que pasó en el equipo" accion={<Ejemplo />}>
          <Actividad eventos={ACTIVIDAD} />
        </Seccion>
      </Superficie></Celda>

      <Celda ancho={12}><Superficie>
        <Seccion titulo="Calendario" nota="Entregas, vencimientos y pagos del mes; en el teléfono pasa a lista" accion={<Ejemplo />}>
          <Calendario eventos={EVENTOS_MES} onEvento={(e) => setUltimo(`Evento: ${e.titulo}`)} />
        </Seccion>
      </Superficie></Celda>

      <Celda ancho={12} anchoMd={6}><Superficie>
        <Seccion titulo="Vacíos" nota="Cada pieza dice algo cuando no hay datos">
          <LineaTiempo eventos={[]} vacio="Este pedido todavía no tiene movimientos." />
          <Actividad eventos={[]} vacio="Nadie ha hecho cambios hoy." />
        </Seccion>
      </Superficie></Celda>
    </Bento>
  );
}
