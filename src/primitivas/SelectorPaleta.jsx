/**
 * SelectorPaleta — la persona elige con qué color se ve la app.
 *
 * Es un `Segmentado` con una muestra del acento de cada paleta, en el tema que
 * está activo. Solo aparece si el `ProveedorTema` recibió `paletas`; sin eso no
 * hay nada que elegir y no pinta nada. Lo elegido se recuerda en este
 * navegador (como claro/oscuro).
 *
 * Va en Ajustes o en el menú de la cuenta, no en la barra: se elige una vez.
 */
import React from "react";
import { useTema } from "../Tema";
import Segmentado from "./Segmentado";

export default function SelectorPaleta({ etiqueta = "Paleta de color", tamano, pleno, estilo }) {
  const { tema, paleta, paletas, fijarPaleta } = useTema();
  if (!paletas.length) return null;
  return (
    <Segmentado etiqueta={etiqueta} valor={paleta} onCambio={fijarPaleta} tamano={tamano}
      pleno={pleno} estilo={estilo}
      opciones={paletas.map((p) => ({
        valor: p.id,
        texto: p.nombre,
        icono: (
          <span aria-hidden style={{
            width: 12, height: 12, borderRadius: "var(--ds-r-pill)", flex: "0 0 auto",
            background: p.muestra[tema], boxShadow: "inset 0 0 0 1px var(--ds-line-firm)",
          }} />
        ),
      }))} />
  );
}
