/**
 * Tarjetas y datos: indicadores, metas, comparativos, rankings, fichas,
 * expedientes, llamados y vacíos. Todas las cifras son de EJEMPLO.
 */
import React, { useState } from "react";
import { Bento, Celda, Superficie, Seccion, Pastilla, Boton } from "../../src/index.js";
import TarjetaKpi from "../../src/primitivas/TarjetaKpi.jsx";
import FilaKpis from "../../src/primitivas/FilaKpis.jsx";
import TarjetaMeta from "../../src/primitivas/TarjetaMeta.jsx";
import TarjetaComparativa from "../../src/primitivas/TarjetaComparativa.jsx";
import TarjetaRanking from "../../src/primitivas/TarjetaRanking.jsx";
import TarjetaEntidad from "../../src/primitivas/TarjetaEntidad.jsx";
import Detalles from "../../src/primitivas/Detalles.jsx";
import Llamado from "../../src/primitivas/Llamado.jsx";
import EstadoVacio from "../../src/primitivas/EstadoVacio.jsx";
import GrupoRetratos from "../../src/primitivas/GrupoRetratos.jsx";
import { Retrato } from "../../src/primitivas/Fila.jsx";

export const meta = { id: "tarjetas", titulo: "Tarjetas y datos", orden: 10 };

const Giro = ({ children }) => (
  <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 700, color: "var(--ds-ink-3)",
    letterSpacing: "0.05em", textTransform: "uppercase", margin: "0 0 6px 2px" }}>{children}</div>
);

export default function Tarjetas() {
  const [verLlamado, setVerLlamado] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-8)" }}>
      <Llamado tono="info" titulo="Datos de ejemplo">
        Todas las cifras, nombres y RFC de esta sección son inventados para mostrar las piezas.
      </Llamado>

      <Seccion titulo="TarjetaKpi" nota="Cifra, variación según si subir es bueno, tendencia y estado con texto">
        <Bento>
          <Celda ancho={12} anchoMd={3}>
            <Giro>Ventas</Giro>
            <TarjetaKpi etiqueta="Venta del mes" valor={8420350} formato="moneda"
              opcionesFormato={{ compacto: true }} variacion={0.124} contra="vs septiembre"
              serie={[5.1, 5.6, 5.4, 6.2, 6.8, 7.1, 7.9, 8.4]} onClick={() => {}} />
          </Celda>
          <Celda ancho={12} anchoMd={3}>
            <Giro>Logística</Giro>
            <TarjetaKpi etiqueta="Entregas a tiempo" valor={0.932} formato="porcentaje"
              variacion={-0.018} contra="vs semana pasada" estado="aviso"
              serie={[0.96, 0.95, 0.95, 0.94, 0.93, 0.94, 0.93]} colorSerie="var(--ds-serie-2)" />
          </Celda>
          <Celda ancho={12} anchoMd={3}>
            <Giro>Finanzas</Giro>
            <TarjetaKpi etiqueta="Días de cartera (DSO)" valor={38} variacion={-0.08}
              sentido="baja" contra="vs trimestre" estado="ok" nota="Meta: 40 días" />
          </Celda>
          <Celda ancho={12} anchoMd={3}>
            <Giro>Compras · dato faltante</Giro>
            <TarjetaKpi etiqueta="Ahorro negociado" valor={null} formato="moneda"
              nota="Sin cotizaciones cargadas este mes" />
          </Celda>
          <Celda ancho={12} anchoMd={3}>
            <Giro>Inventario</Giro>
            <TarjetaKpi etiqueta="Rotación de inventario" valor={6.4} variacion={0.05}
              sentido="neutro" contra="vs año anterior" />
          </Celda>
          <Celda ancho={12} anchoMd={3}>
            <Giro>Contabilidad</Giro>
            <TarjetaKpi etiqueta="Pólizas sin cuadrar" valor={3} estado="riesgo"
              textoEstado="Bloquea cierre" nota="Periodo octubre" />
          </Celda>
          <Celda ancho={12} anchoMd={3}>
            <Giro>Cargando</Giro>
            <TarjetaKpi etiqueta="Margen bruto" cargando serie={[1]} />
          </Celda>
          <Celda ancho={12} anchoMd={3}>
            <Giro>Compacta</Giro>
            <TarjetaKpi compacta etiqueta="Rotación de personal" valor={0.031}
              formato="porcentaje" variacion={0.4} enPuntos sentido="baja" contra="vs año anterior" />
          </Celda>
        </Bento>
      </Seccion>

      <Seccion titulo="FilaKpis" nota="Varios indicadores en una sola superficie; en angosto pasa a dos columnas">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-4)" }}>
          <div>
            <Giro>Tesorería</Giro>
            <FilaKpis indicadores={[
              { etiqueta: "Saldo en bancos", valor: 12480000, formato: "moneda", opcionesFormato: { compacto: true }, variacion: 0.032, contra: "vs ayer" },
              { etiqueta: "Por cobrar", valor: 31950000, formato: "moneda", opcionesFormato: { compacto: true }, variacion: -0.04, sentido: "baja", contra: "vs semana" },
              { etiqueta: "Por pagar", valor: 18200000, formato: "moneda", opcionesFormato: { compacto: true }, variacion: 0.06, sentido: "baja", contra: "vs semana" },
              { etiqueta: "Flujo neto 7 días", valor: 2140000, formato: "moneda", opcionesFormato: { compacto: true }, variacion: 0.18, contra: "vs semana" },
              { etiqueta: "Tipo de cambio", valor: null, nota: "Sin publicar hoy" },
            ]} />
          </div>
          <div>
            <Giro>Recursos humanos · cargando</Giro>
            <FilaKpis cargando indicadores={[{ etiqueta: "a" }, { etiqueta: "b" }, { etiqueta: "c" }, { etiqueta: "d" }]} />
          </div>
        </div>
      </Seccion>

      <Seccion titulo="TarjetaMeta" nota="El tono sale de la proyección al cierre, no del avance de hoy">
        <Bento>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaMeta titulo="Ventas de octubre" logrado={5200000} meta={9000000} formato="moneda"
              opcionesFormato={{ compacto: true }} diaActual={14} diasPeriodo={31} />
          </Celda>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaMeta titulo="Cobranza de la semana" logrado={4100000} meta={6000000}
              formato="moneda" opcionesFormato={{ compacto: true }} diaActual={3} diasPeriodo={5}
              forma="anillo" />
          </Celda>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaMeta titulo="Gasto de mantenimiento (tope)" logrado={410000} meta={500000}
              formato="moneda" opcionesFormato={{ compacto: true }} diaActual={20} diasPeriodo={30}
              invertida />
          </Celda>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaMeta titulo="Producción (litros)" logrado={1820000} meta={null} formato="compacto" />
          </Celda>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaMeta titulo="Contrataciones del trimestre" logrado={9} meta={12} />
          </Celda>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaMeta titulo="Cargando" cargando />
          </Celda>
        </Bento>
      </Seccion>

      <Seccion titulo="TarjetaComparativa" nota="La primera columna es la base; cada referencia dice cuánto se separa">
        <Bento>
          <Celda ancho={12} anchoMd={6}>
            <TarjetaComparativa titulo="Gasto operativo · septiembre" formato="moneda" sentido="baja"
              opcionesFormato={{ compacto: true }}
              valores={[
                { etiqueta: "Real", valor: 1840000 },
                { etiqueta: "Presupuesto", valor: 1750000 },
                { etiqueta: "Año anterior", valor: 1920000 },
              ]} nota="Contabilidad · cifras de ejemplo" />
          </Celda>
          <Celda ancho={12} anchoMd={6}>
            <TarjetaComparativa titulo="Viajes completados" valores={[
              { etiqueta: "Real", valor: 1284 },
              { etiqueta: "Plan", valor: 1300 },
              { etiqueta: "Año anterior", valor: null },
            ]} />
          </Celda>
        </Bento>
      </Seccion>

      <Seccion titulo="TarjetaRanking" nota="Top N con barra proporcional y participación sobre el total real">
        <Bento>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaRanking titulo="Clientes por venta" nota="Octubre" formato="moneda"
              opcionesFormato={{ compacto: true }} participacion total={42000000}
              accion={<Boton variante="fantasma">Ver todos</Boton>} onElemento={() => {}}
              elementos={[
                { nombre: "Grupo Industrial Norte", subtitulo: "Monterrey", valor: 6200000 },
                { nombre: "Distribuidora del Bajío", subtitulo: "León", valor: 4850000 },
                { nombre: "Comercializadora Pacífico", subtitulo: "Mazatlán", valor: 3920000 },
                { nombre: "Servicios Integrales Sur", subtitulo: "Mérida", valor: 2410000 },
                { nombre: "Abastos Centro", subtitulo: "Querétaro", valor: 1980000 },
              ]} />
          </Celda>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaRanking titulo="Rutas con más incidencias" nota="Logística · últimos 30 días"
              elementos={[
                { nombre: "Monterrey → Saltillo", subtitulo: "Retrasos en caseta", valor: 14 },
                { nombre: "Guadalajara → Colima", subtitulo: "Clima", valor: 9 },
                { nombre: "Puebla → Veracruz", valor: 7 },
              ]} />
          </Celda>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaRanking titulo="Proveedores por compra" nota="Compras · sin movimientos" elementos={[]} />
          </Celda>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaRanking titulo="Cargando" cargando />
          </Celda>
        </Bento>
      </Seccion>

      <Seccion titulo="TarjetaEntidad" nota="Ficha corta de cliente, proveedor, unidad o empleado">
        <Bento>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaEntidad nombre="Transportes del Norte" subtitulo="Proveedor · RFC TNO010101AB1"
              estado={{ tono: "ok", texto: "Al corriente" }}
              metricas={[
                { etiqueta: "Saldo por pagar", valor: 182000, formato: "moneda" },
                { etiqueta: "Días de crédito", valor: 30, formato: "numero" },
                { etiqueta: "Viajes del mes", valor: 46, formato: "numero" },
                { etiqueta: "Calificación", valor: 0.94, formato: "porcentaje" },
              ]}
              acciones={<><Boton variante="contorno">Ver expediente</Boton><Boton variante="fantasma">Pagar</Boton></>} />
          </Celda>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaEntidad nombre="Unidad TR-118" subtitulo="Tractocamión · placas de ejemplo"
              estado={{ tono: "aviso", texto: "Servicio vencido" }}
              metricas={[
                { etiqueta: "Kilometraje", valor: 412300, formato: "numero" },
                { etiqueta: "Próximo servicio", valor: null },
              ]} onClick={() => {}} />
          </Celda>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaEntidad nombre="Mariana López Ruiz" subtitulo="Analista de cuentas por cobrar"
              estado={{ tono: "neutro", texto: "Vacaciones" }}
              metricas={[
                { etiqueta: "Antigüedad", valor: "3 años" },
                { etiqueta: "Área", valor: "Finanzas" },
              ]} />
          </Celda>
          <Celda ancho={12} anchoMd={4}>
            <TarjetaEntidad cargando metricas={[{ etiqueta: "Saldo" }, { etiqueta: "Límite" }]} />
          </Celda>
        </Bento>
      </Seccion>

      <Seccion titulo="Detalles" nota="Lista campo-valor de un expediente; lo que falta se señala">
        <Superficie>
          <Detalles columnas={3} elementos={[
            { etiqueta: "Orden de compra", valor: "OC-2026-00418", copiable: true },
            { etiqueta: "Fecha", valor: "2026-10-14", formato: (v) => new Date(`${v}T00:00`).toLocaleDateString("es-MX") },
            { etiqueta: "Importe", valor: 245830.5, formato: "moneda" },
            { etiqueta: "Proveedor", valor: "Refacciones Industriales del Centro" },
            { etiqueta: "Condiciones de pago", valor: null },
            { etiqueta: "Estado", valor: <Pastilla tono="aviso">Por autorizar</Pastilla> },
            { etiqueta: "Dirección de entrega", valor: "Almacén general, nave 3 (dirección de ejemplo)", ancho: 2 },
            { etiqueta: "Folio fiscal", valor: "A1B2C3D4-0000-0000-0000-EJEMPLO00000", copiable: true },
          ]} />
        </Superficie>
      </Seccion>

      <Seccion titulo="Llamado" nota="Aviso en la página; nunca se cierra solo">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-3)" }}>
          <Llamado tono="aviso" titulo="El periodo de septiembre sigue abierto"
            acciones={<Boton variante="contorno">Ir al cierre</Boton>}>
            Hay 3 pólizas sin cuadrar. El cierre no se puede ejecutar hasta resolverlas.
          </Llamado>
          <Llamado tono="riesgo" titulo="Crédito excedido">
            El cliente rebasa su límite por $48,200.00. Las nuevas órdenes requieren autorización.
          </Llamado>
          <Llamado tono="ok" titulo="Conciliación al día">Todos los movimientos bancarios de ayer quedaron ligados.</Llamado>
          {verLlamado ? (
            <Llamado tono="info" titulo="Tipo de cambio de ayer" onCerrar={() => setVerLlamado(false)}>
              El tipo de cambio de hoy aún no se publica; los importes en dólares usan el de ayer.
            </Llamado>
          ) : (
            <Boton variante="fantasma" onClick={() => setVerLlamado(true)}>Volver a mostrar el llamado</Boton>
          )}
        </div>
      </Seccion>

      <Seccion titulo="EstadoVacio y GrupoRetratos">
        <Bento>
          <Celda ancho={12} anchoMd={7}>
            <EstadoVacio titulo="No hay órdenes con estos filtros" icono="∅"
              acciones={<><Boton variante="contorno">Limpiar filtros</Boton><Boton variante="solido">Nueva orden</Boton></>}>
              Prueba con otro rango de fechas o quita el filtro de proveedor. Si nunca has
              capturado una orden, empieza con «Nueva orden».
            </EstadoVacio>
          </Celda>
          <Celda ancho={12} anchoMd={5}>
            <Superficie estilo={{ display: "flex", flexDirection: "column", gap: "var(--ds-4)", height: "100%" }}>
              <EstadoVacio compacto titulo="Sin documentos">Este proveedor no tiene documentos cargados.</EstadoVacio>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <GrupoRetratos personas={[
                  { nombre: "Ana Torres" }, { nombre: "Luis Méndez" }, { nombre: "Sofía Ramírez" },
                  { nombre: "Jorge Castillo" }, { nombre: "Paola Núñez" }, { nombre: "Raúl Ortega" },
                ]} />
                <span style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }}>Equipo de la cuenta</span>
              </div>
            </Superficie>
          </Celda>
        </Bento>
      </Seccion>

      <Seccion titulo="Retrato con figura">
        <Superficie estilo={{ display: "flex", flexDirection: "column", gap: "var(--ds-5)" }}>
          <div>
            <Giro>Sin foto: la figura sale del nombre, siempre la misma</Giro>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--ds-4)" }}>
              {["Ana Torres", "Luis Méndez", "Sofía Ramírez", "Jorge Castillo", "Paola Núñez", "Raúl Ortega",
                "Carlos Ordóñez", "Mariana Ruiz"].map((n) => (
                <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 84 }}>
                  <Retrato nombre={n} tamano={48} figura />
                  <span style={{ fontSize: "var(--ds-t-micro)", color: "var(--ds-ink-2)", textAlign: "center" }}>{n}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Giro>Tamaños: 24 · 32 · 40 · 64 · 96, y neutro</Giro>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--ds-4)" }}>
              {[24, 32, 40, 64, 96].map((t) => <Retrato key={t} nombre="Ana López" tamano={t} figura />)}
              <Retrato nombre="Ana López" tamano={64} tono="neutro" figura />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <GrupoRetratos figura personas={[
              { nombre: "Ana Torres" }, { nombre: "Luis Méndez" }, { nombre: "Sofía Ramírez" },
              { nombre: "Jorge Castillo" }, { nombre: "Paola Núñez" }, { nombre: "Raúl Ortega" },
            ]} />
            <span style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }}>GrupoRetratos con figura</span>
          </div>
        </Superficie>
      </Seccion>
    </div>
  );
}
