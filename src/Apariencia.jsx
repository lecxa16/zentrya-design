/**
 * BotonApariencia — un solo engrane que abre la apariencia en un modal: tema,
 * paleta y navegación.
 *
 * Existe porque los controles sueltos en la barra no caben en todos los modos:
 * en el menú lateral el espacio `derecha` es angosto y el selector de paleta se
 * cortaba (Carlos, 2026-10-23). Todo lo que cambia cómo se VE la app vive aquí;
 * cada elección se aplica al momento y se recuerda en este navegador, así que
 * no hay botón de guardar (no es un formulario).
 *
 * La paleta solo aparece si `ProveedorTema` recibió `paletas`; la navegación,
 * solo dentro de un `Armazon` y fuera del teléfono (ahí el modo es fijo).
 */
import React, { useState } from "react";
import { useTema } from "./Tema";
import { useArmazon } from "./Armazon";
import Boton from "./primitivas/Boton";
import Modal from "./primitivas/Modal";
import Segmentado from "./primitivas/Segmentado";
import SelectorPaleta from "./primitivas/SelectorPaleta";

const TEMAS = [
  { valor: "light", texto: "Claro" },
  { valor: "dark", texto: "Oscuro" },
];
const MODOS = [
  { valor: "topbar", texto: "Arriba" },
  { valor: "sidebar", texto: "Lateral" },
  { valor: "dock", texto: "Dock" },
];

export const ENGRANE = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </svg>
);

function Opcion({ etiqueta, children }) {
  return (
    <div style={{ display: "grid", gap: "var(--ds-2)" }}>
      <span style={{ fontSize: "var(--ds-t-small)", fontWeight: 600, color: "var(--ds-ink-2)" }}>{etiqueta}</span>
      {children}
    </div>
  );
}

/** El modal solo, para abrirlo desde otro sitio (el menú de la cuenta). */
export function ModalApariencia({ abierto, onCerrar }) {
  const { tema, fijar, paletas } = useTema();
  const { preferencia, fijarModo, movil } = useArmazon();
  const conNavegacion = preferencia !== undefined && !movil;
  return (
    <Modal abierto={abierto} onCerrar={onCerrar} titulo="Apariencia"
      nota="Se aplica al momento y se recuerda en este navegador." ancho={480}
      acciones={<Boton variante="solido" onClick={onCerrar}>Listo</Boton>}>
      <div style={{ display: "grid", gap: "var(--ds-5)" }}>
        <Opcion etiqueta="Tema">
          <Segmentado etiqueta="Tema" opciones={TEMAS} valor={tema} onCambio={fijar} pleno />
        </Opcion>
        {paletas.length > 0 && (
          <Opcion etiqueta="Paleta de color">
            <SelectorPaleta />
          </Opcion>
        )}
        {conNavegacion && (
          <Opcion etiqueta="Navegación">
            <Segmentado etiqueta="Navegación" opciones={MODOS} valor={preferencia} onCambio={fijarModo} pleno />
          </Opcion>
        )}
      </div>
    </Modal>
  );
}

export default function BotonApariencia({ texto }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <>
      <Boton variante="fantasma" icono={ENGRANE} onClick={() => setAbierto(true)}
        aria-label={texto ? undefined : "Apariencia"} aria-haspopup="dialog">
        {texto}
      </Boton>
      <ModalApariencia abierto={abierto} onCerrar={() => setAbierto(false)} />
    </>
  );
}
