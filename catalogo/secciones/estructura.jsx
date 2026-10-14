/**
 * Estructura: el esqueleto de una pantalla de negocio — encabezado, cambio
 * de vista, periodo y filtros activos.
 * Todos los datos de esta página son de EJEMPLO.
 */
import React, { useState } from "react";
import { Bento, Celda, Superficie, Seccion, Pastilla, Boton, Buscador, Tabla, BarraSeleccion } from "../../src/index.js";
import { Selector } from "../../src/mui/index.js";
import EncabezadoPagina from "../../src/primitivas/EncabezadoPagina.jsx";
import Segmentado from "../../src/primitivas/Segmentado.jsx";
import SelectorPeriodo, { textoRango, rangoPeriodo } from "../../src/primitivas/SelectorPeriodo.jsx";
import Chip, { BarraFiltros } from "../../src/primitivas/Chip.jsx";

export const meta = { id: "estructura", titulo: "Estructura", orden: 50 };

const ESTATUS = [
  { valor: "vigente", texto: "Vigente" },
  { valor: "vencida", texto: "Vencida" },
  { valor: "pagada", texto: "Pagada" },
];
const SUCURSALES = [
  { valor: "mty", texto: "Monterrey" },
  { valor: "gdl", texto: "Guadalajara" },
  { valor: "cdmx", texto: "Ciudad de México" },
];

export default function Estructura() {
  const [vista, setVista] = useState("mes");
  const [modo, setModo] = useState("lista");
  const [periodo, setPeriodo] = useState(() => rangoPeriodo("mes"));
  const [estatus, setEstatus] = useState("vencida");
  const [sucursal, setSucursal] = useState("");
  const [busca, setBusca] = useState("");
  const [elegidos, setElegidos] = useState([]);

  const activos = [
    estatus && { clave: "estatus", texto: "Estatus", valor: ESTATUS.find((e) => e.valor === estatus)?.texto },
    sucursal && { clave: "sucursal", texto: "Sucursal", valor: SUCURSALES.find((e) => e.valor === sucursal)?.texto },
    busca && { clave: "busca", texto: "Búsqueda", valor: busca },
  ].filter(Boolean);
  const quitar = (k) => {
    if (k === "estatus") setEstatus("");
    if (k === "sucursal") setSucursal("");
    if (k === "busca") setBusca("");
  };

  return (
    <Bento>
      <Celda ancho={12}><Superficie>
        <EncabezadoPagina
          migas={[{ texto: "Finanzas", ir: () => {} }, { texto: "Cuentas por cobrar", ir: () => {} }, { texto: "Facturas" }]}
          titulo="Facturas por cobrar"
          descripcion="Saldo pendiente de cada cliente, con su antigüedad y el próximo vencimiento."
          meta={<><Pastilla tono="aviso">12 por vencer</Pastilla><span>Actualizado hace 5 min</span><Pastilla>Datos de ejemplo</Pastilla></>}
          acciones={<><Boton>Exportar</Boton><Boton variante="solido">Registrar cobro</Boton></>}
          estilo={{ marginBottom: 0 }}
        />
      </Superficie></Celda>

      <Celda ancho={12} anchoMd={6}><Superficie>
        <Seccion titulo="Segmentado" nota="Cambia la lente, no la sección">
          <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
            <Segmentado etiqueta="Agrupar por" valor={vista} onCambio={setVista}
              opciones={[{ valor: "dia", texto: "Día" }, { valor: "semana", texto: "Semana" }, { valor: "mes", texto: "Mes" }]} />
            <Segmentado etiqueta="Vista" tamano="s" valor={modo} onCambio={setModo}
              opciones={[{ valor: "lista", texto: "Lista" }, { valor: "tablero", texto: "Tablero" }, { valor: "mapa", texto: "Mapa" }]} />
            <Segmentado etiqueta="Unidad" pleno valor="litros" onCambio={() => {}}
              opciones={[{ valor: "pesos", texto: "Pesos" }, { valor: "litros", texto: "Litros" }]}
              estilo={{ width: "100%" }} />
            <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }}>
              Elegido: {vista} · {modo}
            </div>
          </div>
        </Seccion>
      </Superficie></Celda>

      <Celda ancho={12} anchoMd={6}><Superficie>
        <Seccion titulo="Selector de periodo" nota="Entrega el rango ya calculado">
          <SelectorPeriodo valor={periodo.clave} onCambio={setPeriodo} />
          <div className="ds-num" style={{ marginTop: 14, fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)" }}>
            {periodo.desde ? <>desde <b>{periodo.desde}</b> hasta <b>{periodo.hasta}</b> · {textoRango(periodo.desde, periodo.hasta)}</>
              : "Elige un periodo para ver su rango."}
          </div>
          <div style={{ marginTop: 18 }}>
            <SelectorPeriodo etiqueta="Cierre" valor="mesAnterior" fechaBase="2026-03-15"
              opciones={["mes", "mesAnterior", "trimestre", "anio"]} onCambio={() => {}} />
            <div style={{ marginTop: 6, fontSize: "var(--ds-t-micro)", color: "var(--ds-ink-3)" }}>
              Con fechaBase 15-mar-2026 y sólo cuatro opciones
            </div>
          </div>
        </Seccion>
      </Superficie></Celda>

      <Celda ancho={12}><Superficie>
        <Seccion titulo="Barra de filtros" nota="Controles arriba, filtros activos abajo">
          <BarraFiltros activos={activos} onQuitar={quitar}
            onLimpiar={() => { setEstatus(""); setSucursal(""); setBusca(""); }}
            resultado={`${activos.length ? 37 : 128} facturas`}>
            <Buscador valor={busca} onCambio={setBusca} marcador="Buscar cliente o folio…"
              estilo={{ flex: "1 1 220px", maxWidth: 320 }} />
            <Selector etiqueta="Estatus" valor={estatus} onCambio={setEstatus} vacio="Todos"
              opciones={ESTATUS} estilo={{ flex: "0 1 180px" }} />
            <Selector etiqueta="Sucursal" valor={sucursal} onCambio={setSucursal} vacio="Todas"
              opciones={SUCURSALES} estilo={{ flex: "0 1 200px" }} />
            <SelectorPeriodo valor={periodo.clave} onCambio={setPeriodo} />
          </BarraFiltros>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Chip texto="Sólo lectura" />
            <Chip texto="Moneda" valor="USD" />
          </div>
        </Seccion>
      </Superficie></Celda>
      <Celda ancho={12}><Superficie>
        <Seccion titulo="Selección de renglones" nota="Casillas + barra de acciones por lote (datos de ejemplo)">
          <Tabla claveFila={(f) => f.id} filas={FACTURAS}
            seleccion={{ elegidos, onCambio: setElegidos, etiqueta: (f) => `Elegir ${f.folio}` }}
            columnas={[{ clave: "folio", titulo: "Folio", fuerte: true }, { clave: "cliente", titulo: "Cliente" },
              { clave: "saldo", titulo: "Saldo", numerica: true }]} />
        </Seccion>
      </Superficie></Celda>
      <BarraSeleccion cantidad={elegidos.length} onQuitar={() => setElegidos([])}>
        <Boton variante="contorno">Exportar</Boton>
        <Boton variante="solido">Marcar como cobradas</Boton>
      </BarraSeleccion>
    </Bento>
  );
}

const FACTURAS = [
  { id: 1, folio: "A-1021", cliente: "Transportes del Norte", saldo: "$12,400.00" },
  { id: 2, folio: "A-1022", cliente: "Abarrotes La Paz", saldo: "$3,180.00" },
  { id: 3, folio: "A-1023", cliente: "Constructora Sierra", saldo: "$48,900.00" },
];
