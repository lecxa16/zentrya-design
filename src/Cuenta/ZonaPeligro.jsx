/**
 * ZonaPeligro — lo que no se deshace (borrar la cuenta), al final de la página,
 * con borde de riesgo y lejos de cualquier «Guardar».
 *
 * Confirmar pide ESCRIBIR una palabra (y, si se indica, la contraseña), no
 * marcar una casilla: una casilla se marca sin leer. El botón de confirmar
 * nunca se apaga —regla del sistema—: si la palabra no coincide, el campo dice
 * por qué.
 *
 * `onConfirmar({ clave })` hace el trabajo; mientras `esperando`, el modal
 * espera; `error` es lo que respondió el servidor (contraseña equivocada…).
 */
import React, { useState } from "react";
import Boton from "../primitivas/Boton";
import Modal from "../primitivas/Modal";
import Campo from "../primitivas/Campo";
import CampoClave from "../primitivas/CampoClave";

export default function ZonaPeligro({
  titulo, descripcion, boton, consecuencias, palabra = "BORRAR", pideClave = true,
  onConfirmar, esperando = false, error,
}) {
  const [abierto, setAbierto] = useState(false);
  const [escrito, setEscrito] = useState("");
  const [clave, setClave] = useState("");
  const [falta, setFalta] = useState({});

  const cerrar = () => { setAbierto(false); setEscrito(""); setClave(""); setFalta({}); };
  const confirmar = () => {
    const f = {};
    if (escrito.trim() !== palabra) f.palabra = `Escribe ${palabra} tal cual, en mayúsculas.`;
    if (pideClave && !clave) f.clave = "Escribe tu contraseña.";
    setFalta(f);
    if (Object.keys(f).length === 0) onConfirmar?.({ clave });
  };

  return (
    <section aria-labelledby="zona-peligro-titulo" style={{
      border: "1px solid var(--ds-risk)", borderRadius: "var(--ds-r-card)", padding: "var(--ds-5) var(--ds-6)",
      background: "var(--ds-risk-soft)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-4)", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 260px", minWidth: 0 }}>
          <h2 id="zona-peligro-titulo" style={{ margin: 0, fontSize: "var(--ds-t-body)", fontWeight: 700,
            color: "var(--ds-risk)" }}>{titulo}</h2>
          {descripcion && <p style={{ margin: "4px 0 0", fontSize: "var(--ds-t-small)", color: "var(--ds-ink)" }}>{descripcion}</p>}
        </div>
        <Boton type="button" variante="peligro" onClick={() => setAbierto(true)} aria-haspopup="dialog">{boton}</Boton>
      </div>

      <Modal abierto={abierto} onCerrar={cerrar} titulo={titulo} ancho={460}
        acciones={(
          <>
            <Boton type="button" variante="fantasma" onClick={cerrar}>Cancelar</Boton>
            <Boton type="button" variante="peligro" esperando={esperando} onClick={confirmar}>{boton}</Boton>
          </>
        )}>
        <div style={{ display: "grid", gap: "var(--ds-4)" }}>
          {consecuencias && <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink)" }}>{consecuencias}</div>}
          {error && <div role="alert" style={{ fontSize: "var(--ds-t-small)", fontWeight: 600, color: "var(--ds-risk)" }}>{error}</div>}
          {pideClave && (
            <CampoClave etiqueta="Tu contraseña" valor={clave} onCambio={setClave} error={falta.clave}
              autoComplete="current-password" />
          )}
          <Campo etiqueta={`Escribe ${palabra} para confirmar`} valor={escrito} onCambio={setEscrito}
            error={falta.palabra} autoComplete="off" />
        </div>
      </Modal>
    </section>
  );
}
