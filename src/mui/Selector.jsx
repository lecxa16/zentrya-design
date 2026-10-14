/**
 * Selector — `Select` de MUI, no el `<select>` del sistema operativo.
 *
 * El nativo no se puede estilar por dentro: la lista desplegada la dibuja
 * el sistema operativo, con su tipografía y sus colores, y en tema oscuro
 * aparece un menú blanco. Tampoco respeta el radio, ni el foco, ni nada del
 * sistema. El de MUI sí, y el menú queda con los mismos tokens.
 *
 * Mantiene el contrato del `Selector` propio —`valor`, `onCambio`,
 * `opciones`, `vacio`— para que cambiar de uno a otro sea sólo la
 * importación.
 */
import React, { useId } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Envoltura } from "../primitivas/Campo";
import { sxCampo, sxMenu } from "./estilo";

export default function Selector({
  etiqueta, valor, onCambio, onSalir, opciones = [], vacio, requerido, error, ayuda,
  deshabilitado, estilo, ...resto
}) {
  const id = useId();
  return (
    <Envoltura id={id} etiqueta={etiqueta} requerido={requerido} error={error}
      ayuda={ayuda} estilo={estilo}>
      <Select
        id={id}
        labelId={etiqueta ? `${id}-etiqueta` : undefined}
        value={valor ?? ""}
        /* Elegir ES terminar: el formulario ya puede juzgar este campo.
           `onSalir` se saca de `resto` a propósito — si se colara al Select
           acabaría como atributo suelto en el DOM. */
        onChange={(e) => { onCambio?.(e.target.value); onSalir?.(); }}
        disabled={deshabilitado}
        error={!!error}
        displayEmpty={vacio !== undefined}
        size="small"
        fullWidth
        MenuProps={{ sx: sxMenu }}
        sx={sxCampo(!!error)}
        renderValue={(v) => {
          if (v === "" || v === null || v === undefined) {
            return <span style={{ color: "var(--ds-ink-3)" }}>{vacio ?? ""}</span>;
          }
          const o = opciones.find((x) => String(x.valor) === String(v));
          return o ? o.texto : v;
        }}
        {...resto}
      >
        {vacio !== undefined && <MenuItem value="">{vacio}</MenuItem>}
        {opciones.map((o) => (
          <MenuItem key={o.valor} value={o.valor}>{o.texto}</MenuItem>
        ))}
      </Select>
    </Envoltura>
  );
}
