/**
 * Formularios: los controles que sustituyen a los del navegador (`./mui`) —
 * fecha, selector y buscable— junto al campo propio, para ver que salen de los
 * mismos tokens en claro, oscuro y con cada paleta.
 * Todos los datos de esta página son de EJEMPLO.
 */
import React, { useState } from "react";
import { Bento, Celda, Superficie, Seccion, Pastilla, Campo } from "../../src/index.js";
import { CampoFecha, Selector, Buscable } from "../../src/mui/index.js";

export const meta = { id: "formularios", titulo: "Formularios", orden: 55 };

const CUENTAS = [
  { valor: "nomina", texto: "Nómina" },
  { valor: "ahorro", texto: "Ahorro" },
  { valor: "tarjeta", texto: "Tarjeta de crédito" },
];
const CIUDADES = [
  { valor: "mty", texto: "Monterrey", grupo: "Nuevo León" },
  { valor: "spgg", texto: "San Pedro Garza García", grupo: "Nuevo León" },
  { valor: "gdl", texto: "Guadalajara", grupo: "Jalisco" },
  { valor: "zap", texto: "Zapopan", grupo: "Jalisco" },
  { valor: "qro", texto: "Querétaro", grupo: "Querétaro" },
];

export default function Formularios() {
  const [fecha, setFecha] = useState("2026-10-23");
  const [cuenta, setCuenta] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [nota, setNota] = useState("");

  return (
    <Bento>
      <Celda ancho={12}>
        <Seccion titulo="Controles de formulario" accion={<Pastilla>Datos de ejemplo</Pastilla>}>
          <Superficie>
            <div style={{ display: "grid", gap: "var(--ds-4)", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <CampoFecha etiqueta="Fecha" valor={fecha} onCambio={setFecha} requerido />
              <Selector etiqueta="Cuenta" valor={cuenta} onCambio={setCuenta} opciones={CUENTAS} vacio="Elige una cuenta" />
              <Buscable etiqueta="Ciudad" valor={ciudad} onCambio={setCiudad} opciones={CIUDADES} />
              <Campo etiqueta="Nota" valor={nota} onCambio={setNota} marcador="Opcional" />
              <CampoFecha etiqueta="Con error" valor="" onCambio={() => {}} error="Elige una fecha" />
              <Selector etiqueta="Deshabilitado" valor="ahorro" onCambio={() => {}} opciones={CUENTAS} deshabilitado />
            </div>
          </Superficie>
        </Seccion>
      </Celda>
    </Bento>
  );
}
