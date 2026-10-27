/** Gráficas: una muestra de cada pieza con datos de ejemplo de giros distintos. */
import React, { useState } from "react";
import { Bento, Celda, Superficie, Seccion, Pastilla } from "../../src/index.js";
import GraficaDestacada from "../../src/graficas/GraficaDestacada.jsx";
import GraficaLinea from "../../src/graficas/GraficaLinea.jsx";
import GraficaBarras from "../../src/graficas/GraficaBarras.jsx";
import Dona from "../../src/graficas/Dona.jsx";
import Embudo from "../../src/graficas/Embudo.jsx";
import Cascada from "../../src/graficas/Cascada.jsx";
import MapaCalor from "../../src/graficas/MapaCalor.jsx";
import CalendarioCalor from "../../src/graficas/CalendarioCalor.jsx";
import Bala from "../../src/graficas/Bala.jsx";
import BarraDistribucion from "../../src/graficas/BarraDistribucion.jsx";

export const meta = { id: "graficas", titulo: "Gráficas", orden: 30 };

const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

/* Generador determinista: el catálogo se ve igual en cada recarga. */
const azar = (semilla) => () => {
  semilla = (semilla * 9301 + 49297) % 233280;
  return semilla / 233280;
};

const DIAS_SEMANA = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const HORAS = Array.from({ length: 14 }, (_, i) => `${i + 6}h`);
const ocupacion = (() => {
  const r = azar(7);
  return DIAS_SEMANA.map((_, d) => HORAS.map((_, h) => {
    if (d === 6 && h > 6) return null;
    const pico = Math.exp(-((h - 4) ** 2) / 6) + Math.exp(-((h - 10) ** 2) / 8) * 0.8;
    return Math.round((pico * (d < 5 ? 90 : 40) + r() * 15));
  }));
})();

const actividad = (() => {
  const r = azar(11);
  const fin = new Date(2026, 9, 14);
  const out = [];
  for (let i = 0; i < 300; i++) {
    const d = new Date(fin); d.setDate(fin.getDate() - i);
    const dow = d.getDay();
    if (r() < 0.06) continue;
    const base = dow === 0 ? 2 : dow === 6 ? 8 : 22;
    out.push({ fecha: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      valor: Math.round(base + r() * 18 + (d.getDate() === 15 || d.getDate() === 30 ? 20 : 0)) });
  }
  return out;
})();

const Tarjeta = ({ titulo, nota, ancho = 12, anchoMd = 6, children }) => (
  <Celda ancho={ancho} anchoMd={anchoMd}>
    <Superficie estilo={{ height: "100%", boxSizing: "border-box" }}>
      <Seccion titulo={titulo} nota={nota}>{children}</Seccion>
    </Superficie>
  </Celda>
);

/* Patrimonio de EJEMPLO por periodo, para GraficaDestacada. */
const PATRIMONIO = {
  s: { etiquetas: ["lun 20", "mar 21", "mié 22", "jue 23", "vie 24", "sáb 25", "dom 26"],
       valores: [81200, 81950, 81400, 82600, 83100, 83050, 84250], detalle: "20 – 26 de octubre" },
  m: { etiquetas: Array.from({ length: 26 }, (_, i) => `${i + 1} oct`),
       valores: Array.from({ length: 26 }, (_, i) => Math.round(76000 + i * 310 + Math.sin(i / 2.2) * 1400)), detalle: "Octubre de 2026" },
  a: { etiquetas: MESES.slice(0, 10), valores: [61200, 63400, 62900, 66100, 68800, 70200, 72900, 74100, 79300, 84250],
       detalle: "Enero – octubre de 2026" },
};

function Destacada() {
  const [p, setP] = useState("m");
  const d = PATRIMONIO[p];
  return (
    <GraficaDestacada titulo="Patrimonio" formato="moneda" resumen="hoy" detalle={d.detalle}
      serie={{ nombre: "Patrimonio", valores: d.valores, color: "var(--ds-accent-trazo)" }} etiquetas={d.etiquetas}
      periodos={[{ valor: "s", texto: "Semana" }, { valor: "m", texto: "Mes" }, { valor: "a", texto: "Año" }]}
      periodo={p} onPeriodo={setP} />
  );
}

export default function Graficas() {
  return (
    <>
      <div style={{ marginBottom: "var(--ds-4)" }}><Pastilla tono="aviso">Datos de ejemplo</Pastilla></div>
      <div style={{ maxWidth: 560, marginBottom: "var(--ds-6)" }}><Destacada /></div>
      <Bento>
        <Tarjeta titulo="Ventas por mes" nota="Comercial · GraficaLinea con meta y área" anchoMd={8}>
          <GraficaLinea titulo="Ventas por mes" formato="moneda" area etiquetas={MESES.slice(0, 10)}
            meta={{ valor: 4200000, texto: "Meta mensual" }}
            series={[{ clave: "v", nombre: "Ventas", valores: [3.1, 3.4, 3.2, 3.9, 4.1, 3.8, 4.4, 4.6, null, 4.9].map((v) => (v === null ? null : v * 1e6)) }]} />
        </Tarjeta>
        <Tarjeta titulo="Gasto por categoría" nota="Finanzas · Dona con «Otros»" anchoMd={4}>
          <Dona titulo="Gasto por categoría" formato="monedaCompacta" totalEtiqueta="Gasto del mes"
            datos={[
              { etiqueta: "Nómina", valor: 1840000 }, { etiqueta: "Combustible", valor: 960000 },
              { etiqueta: "Mantenimiento", valor: 410000 }, { etiqueta: "Renta", valor: 320000 },
              { etiqueta: "Seguros", valor: 150000 }, { etiqueta: "Papelería", valor: 22000 },
              { etiqueta: "Viáticos", valor: 68000 }, { etiqueta: "Software", valor: 45000 },
            ]} />
        </Tarjeta>

        <Tarjeta titulo="Litros por sucursal" nota="Logística · tres series, etiqueta al final" anchoMd={8}>
          <GraficaLinea titulo="Litros por sucursal" formato="numero" etiquetas={MESES}
            series={[
              { clave: "mty", nombre: "Monterrey", valores: [410, 430, 455, 470, 460, 490, 520, 515, 540, 560, 575, 600].map((v) => v * 1000) },
              { clave: "gdl", nombre: "Guadalajara", valores: [300, 310, 305, 330, 345, 340, 360, 372, 380, 395, 400, 410].map((v) => v * 1000) },
              { clave: "hmo", nombre: "Hermosillo", valores: [180, 175, 190, 205, 198, 220, 230, 228, 240, 255, 262, 270].map((v) => v * 1000) },
            ]} />
        </Tarjeta>
        <Tarjeta titulo="Antigüedad de cartera" nota="Cobranza · BarraDistribucion con tonos de estado" anchoMd={4}>
          <BarraDistribucion titulo="Antigüedad de cartera" formato="monedaCompacta" segmentos={[
            { etiqueta: "Al corriente", valor: 12400000, tono: "ok" },
            { etiqueta: "1–30 días", valor: 3800000, tono: "neutro" },
            { etiqueta: "31–60 días", valor: 1650000, tono: "aviso" },
            { etiqueta: "61–90 días", valor: 720000, tono: "aviso" },
            { etiqueta: "+90 días", valor: 410000, tono: "riesgo" },
          ]} />
          <div style={{ height: "var(--ds-5)" }} />
          <BarraDistribucion titulo="Pedidos por estado" segmentos={[
            { etiqueta: "Entregados", valor: 412 }, { etiqueta: "En ruta", valor: 96 },
            { etiqueta: "En patio", valor: 38 }, { etiqueta: "Programados", valor: 61 },
          ]} />
        </Tarjeta>

        <Tarjeta titulo="Ventas por canal y trimestre" nota="Comercial · barras agrupadas con leyenda">
          <GraficaBarras titulo="Ventas por canal" formato="monedaCompacta" categorias={["T1", "T2", "T3", "T4"]}
            series={[
              { clave: "d", nombre: "Directo", valores: [5.2e6, 5.8e6, 6.1e6, 6.6e6] },
              { clave: "dist", nombre: "Distribuidores", valores: [3.1e6, 3.0e6, 3.6e6, 3.9e6] },
              { clave: "web", nombre: "En línea", valores: [0.8e6, 1.1e6, 1.4e6, 1.9e6] },
            ]} />
        </Tarjeta>
        <Tarjeta titulo="Costos de flota por mes" nota="Operación · barras apiladas">
          <GraficaBarras titulo="Costos de flota" formato="monedaCompacta" apiladas categorias={MESES.slice(0, 6)}
            etiquetas
            series={[
              { clave: "c", nombre: "Combustible", valores: [620, 640, 610, 680, 700, 690].map((v) => v * 1000) },
              { clave: "m", nombre: "Mantenimiento", valores: [120, 90, 160, 110, 130, 95].map((v) => v * 1000) },
              { clave: "p", nombre: "Peajes", valores: [80, 85, 82, 90, 94, 91].map((v) => v * 1000) },
            ]} />
        </Tarjeta>

        <Tarjeta titulo="Clientes con más compra" nota="Ventas · ranking horizontal, nombres largos, resaltado">
          <GraficaBarras titulo="Compra por cliente" horizontal etiquetas formato="monedaCompacta" resaltar={2}
            datos={[
              { etiqueta: "Distribuidora de Combustibles del Noroeste S.A. de C.V.", valor: 8420000 },
              { etiqueta: "Transportes Unidos del Bajío", valor: 6130000 },
              { etiqueta: "Gasolineras La Estrella", valor: 5870000 },
              { etiqueta: "Constructora Valle Alto", valor: 3920000 },
              { etiqueta: "Agroindustrias Santa Fe", valor: 2410000 },
              { etiqueta: "Minera Cerro Prieto", valor: 1980000 },
            ]} />
        </Tarjeta>
        <Tarjeta titulo="Variación de utilidad por línea" nota="Finanzas · barras con negativos">
          <GraficaBarras titulo="Variación de utilidad" formato="moneda" etiquetas
            datos={[
              { etiqueta: "Diésel", valor: 420000 }, { etiqueta: "Magna", valor: -180000 },
              { etiqueta: "Premium", valor: 95000 }, { etiqueta: "Lubricantes", valor: -42000 },
              { etiqueta: "Fletes", valor: 210000 },
            ]} />
        </Tarjeta>

        <Tarjeta titulo="Embudo comercial" nota="Ventas · conversión contra la etapa anterior y el inicio">
          <Embudo titulo="Embudo comercial" etapas={[
            { etiqueta: "Prospectos", valor: 1240 }, { etiqueta: "Contactados", valor: 812 },
            { etiqueta: "Cotizados", valor: 386 }, { etiqueta: "Negociación", valor: 151 },
            { etiqueta: "Ganados", valor: 64 },
          ]} />
        </Tarjeta>
        <Tarjeta titulo="De ventas a utilidad" nota="Contabilidad · Cascada con subtotales">
          <Cascada titulo="Estado de resultados" formato="moneda" pasos={[
            { etiqueta: "Ventas", valor: 12800000 },
            { etiqueta: "Costo", valor: -9350000 },
            { etiqueta: "Margen bruto", tipo: "total" },
            { etiqueta: "Gastos op.", valor: -1720000 },
            { etiqueta: "Otros ingresos", valor: 140000 },
            { etiqueta: "Intereses", valor: -260000 },
            { etiqueta: "Utilidad", tipo: "total" },
          ]} />
        </Tarjeta>

        <Tarjeta titulo="Ocupación de andenes" nota="Almacén · MapaCalor día × hora (domingo tarde sin registro)" anchoMd={7}>
          <MapaCalor titulo="Unidades en andén" filas={DIAS_SEMANA} columnas={HORAS} valores={ocupacion} />
        </Tarjeta>
        <Tarjeta titulo="Indicadores contra meta" nota="Operación · Bala; los de costo leen al revés" anchoMd={5}>
          <Bala formato="porcentaje" items={[
            { etiqueta: "Entregas a tiempo", valor: 0.91, meta: 0.95, rangos: [0.8, 0.9, 1] },
            { etiqueta: "Ocupación de flota", valor: 0.78, meta: 0.85, rangos: [0.6, 0.75, 1] },
            { etiqueta: "Cobranza del mes", valor: 0.97, meta: 0.9, rangos: [0.7, 0.85, 1.05] },
          ]} />
          <div style={{ height: "var(--ds-5)" }} />
          <Bala formato="numero" items={[
            { etiqueta: "Días de cartera", nota: "menor es mejor", valor: 38, meta: 30, rangos: [30, 45, 60], menorEsMejor: true },
          ]} />
        </Tarjeta>

        <Tarjeta titulo="Entregas por día" nota="Logística · CalendarioCalor de 300 días (quincenas marcadas)" anchoMd={12}>
          <CalendarioCalor titulo="Entregas" datos={actividad} />
        </Tarjeta>

        <Tarjeta titulo="Sin datos" nota="Así se ve una gráfica vacía">
          <GraficaLinea titulo="Devoluciones" series={[{ clave: "d", nombre: "Devoluciones", valores: [] }]} etiquetas={[]} alto={140} />
        </Tarjeta>
        <Tarjeta titulo="Sin datos" nota="Reparto sin valores">
          <Dona titulo="Mezcla de productos" datos={[]} tamano={140} />
        </Tarjeta>
      </Bento>
    </>
  );
}
