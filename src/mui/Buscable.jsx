/**
 * Buscable — elegir de una lista LARGA escribiendo para filtrar.
 *
 * Existe porque `Selector` deja de servir cuando la lista no cabe en la
 * memoria de quien la recorre: los 2,478 municipios del catálogo INEGI, los
 * 64 puntos de carga. Desplazarse por ahí no es elegir, es buscar a ciegas.
 *
 * Mismo contrato que `Selector` —`valor`, `onCambio`, `opciones` de
 * `{ valor, texto }`— más `grupo` opcional por opción (se agrupa en el orden en
 * que llegan) y `limite` de cuántas mostrar mientras se escribe. Buscar
 * «queretaro» encuentra «Querétaro»: sin acentos ni mayúsculas.
 */
import React, { useId, useMemo } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Envoltura } from "../primitivas/Campo";
import { sxCampo, sxMenu } from "./estilo";

const plano = (t) => (t || "").toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Buscable({
  etiqueta, valor, onCambio, onSalir, opciones = [], marcador = "Escribe para buscar…",
  requerido, error, ayuda, deshabilitado, limite = 60, estilo,
}) {
  const id = useId();
  const elegida = useMemo(
    () => opciones.find((o) => String(o.valor) === String(valor)) || null,
    [opciones, valor]);
  const filtrar = useMemo(() => createFilterOptions({
    limit: limite, stringify: (o) => plano(o.texto),
  }), [limite]);

  return (
    <Envoltura id={id} etiqueta={etiqueta} requerido={requerido} error={error}
      ayuda={ayuda} estilo={estilo}>
      <Autocomplete
        id={id}
        size="small"
        options={opciones}
        value={elegida}
        disabled={deshabilitado}
        getOptionLabel={(o) => o?.texto ?? ""}
        isOptionEqualToValue={(a, b) => String(a.valor) === String(b.valor)}
        groupBy={opciones.some((o) => o.grupo) ? (o) => o.grupo || "" : undefined}
        filterOptions={(ops, estado) => filtrar(ops, { ...estado, inputValue: plano(estado.inputValue) })}
        onChange={(_, o) => { onCambio?.(o ? o.valor : ""); onSalir?.(); }}
        noOptionsText="Nada coincide"
        sx={{
          "& .MuiAutocomplete-inputRoot": { paddingTop: "3.5px !important", paddingBottom: "3.5px !important" },
          /* MUI 7+ le pone al input chico su propio relleno (2.5px), más específico que el de
             `sxCampo`; sin esto el buscable medía 30px junto a campos de 42. */
          "&.MuiAutocomplete-root .MuiOutlinedInput-root.MuiInputBase-sizeSmall .MuiAutocomplete-input": {
            padding: "8px 4px 8px 11px",
          },
        }}
        slotProps={{ paper: { sx: sxMenu["& .MuiPaper-root"] }, popper: { sx: {
          "& .MuiAutocomplete-option": { ...sxMenu["& .MuiMenuItem-root"] },
          "& .MuiAutocomplete-option[aria-selected='true']": {
            backgroundColor: "var(--ds-accent-soft) !important", color: "var(--ds-accent-tinta)",
          },
          "& .MuiAutocomplete-groupLabel": {
            fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-micro)", fontWeight: 600,
            letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ds-ink-3)",
            backgroundColor: "var(--ds-panel)", lineHeight: "30px",
          },
          "& .MuiAutocomplete-noOptions": { fontFamily: "var(--ds-font)", color: "var(--ds-ink-3)" },
        } } }}
        /* Desde MUI 7 los parámetros llegan en `slotProps`, no en `inputProps`: se
           extiende `htmlInput` sin perder su ref ni sus eventos. */
        renderInput={(p) => (
          <TextField {...p} placeholder={marcador} error={!!error}
            slotProps={{ ...p.slotProps, htmlInput: {
              ...p.slotProps.htmlInput, "aria-labelledby": etiqueta ? `${id}-etiqueta` : undefined,
            } }}
            sx={sxCampo(!!error)} />
        )}
      />
    </Envoltura>
  );
}
