/**
 * Campo de fecha — `DatePicker` de MUI X, nunca el nativo del navegador.
 *
 * Regla del proyecto, no preferencia: el `<input type="date">` nativo se ve
 * distinto en cada navegador, no respeta es-MX (enseña MM/DD en algunos
 * entornos, con el riesgo de leer una fecha por otra) y dispara `onChange`
 * en CADA segmento —día, mes, año—, así que ligar una consulta al campo
 * lanza peticiones con fechas a medio escribir.
 *
 * Hacia fuera habla en `"YYYY-MM-DD"`, que es lo que entiende el backend;
 * el objeto dayjs se queda aquí dentro. Y **sólo emite cuando la fecha es
 * válida o está vacía**: emitir a media escritura era justamente el
 * problema del nativo.
 */
import React, { useEffect, useId, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { esES } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { Envoltura } from "../primitivas/Campo";
import { sxCampo } from "./estilo";

const ISO = "YYYY-MM-DD";
/* `adapterLocale` sólo traduce las fechas; los textos del control (lo que lee un
   lector de pantalla: «Elegir fecha», «Mes siguiente») vienen de aquí. */
const TEXTOS = esES.components.MuiLocalizationProvider.defaultProps.localeText;

export default function CampoFecha({
  etiqueta, valor, onCambio, onSalir, requerido, error, ayuda, deshabilitado,
  minimo, maximo, estilo,
}) {
  const [interno, setInterno] = useState(() =>
    (valor ? dayjs(valor, ISO) : null));

  /* La página manda: si el valor cambia desde fuera, el campo lo sigue. */
  useEffect(() => {
    const v = valor ? dayjs(valor, ISO) : null;
    setInterno((prev) => {
      const igual = (!prev && !v) || (prev && v && prev.isSame(v, "day"));
      return igual ? prev : v;
    });
  }, [valor]);

  const id = useId();
  return (
    <Envoltura id={id} etiqueta={etiqueta} requerido={requerido} error={error}
      ayuda={ayuda} estilo={estilo}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es" localeText={TEXTOS}>
        <DatePicker
          value={interno}
          disabled={deshabilitado}
          minDate={minimo ? dayjs(minimo, ISO) : undefined}
          maxDate={maximo ? dayjs(maximo, ISO) : undefined}
          format="DD/MM/YYYY"
          onChange={(d) => {
            setInterno(d);
            /* Igual que un selector: elegir una fecha es terminar con el
               campo. Sólo se marca cuando de verdad hubo una decisión —una
               fecha a medio teclear no lo es. */
            if (!d) { onCambio?.(""); onSalir?.(); return; }
            if (d.isValid()) { onCambio?.(d.format(ISO)); onSalir?.(); }
          }}
          slotProps={{
            textField: { id, size: "small", fullWidth: true, error: !!error,
              sx: sxCampo(!!error) },
            popper: { sx: sxCalendario },
            desktopPaper: { sx: sxCalendario },
            mobilePaper: { sx: sxCalendario },
          }}
        />
      </LocalizationProvider>
    </Envoltura>
  );
}

/* El calendario que se abre también es del sistema: sin esto sale con la
   paleta de MUI y desentona con todo lo demás. */
const sxCalendario = {
  "& .MuiPaper-root, &.MuiPaper-root": {
    backgroundColor: "var(--ds-panel)",
    backdropFilter: "var(--ds-blur)",
    color: "var(--ds-ink)",
    border: "1px solid var(--ds-line)",
    borderRadius: "var(--ds-r-card)",
    boxShadow: "var(--ds-lift-3)",
    fontFamily: "var(--ds-font)",
  },
  "& .MuiPickersCalendarHeader-label, & .MuiDayCalendar-weekDayLabel, & .MuiPickerDay-root, & .MuiPickersYear-yearButton, & .MuiPickersMonth-monthButton": {
    fontFamily: "var(--ds-font)",
    color: "var(--ds-ink)",
  },
  "& .MuiDayCalendar-weekDayLabel": { color: "var(--ds-ink-3)", fontWeight: 600 },
  "& .MuiPickerDay-root:hover": { backgroundColor: "var(--ds-surface-2)" },
  "& .MuiPickerDay-today": { borderColor: "var(--ds-accent-trazo)" },
  "& .MuiPickerDay-root.Mui-selected, & .MuiPickersYear-yearButton.Mui-selected, & .MuiPickersMonth-monthButton.Mui-selected": {
    backgroundColor: "var(--ds-accent) !important",
    color: "var(--ds-ink-on-accent) !important",
  },
  "& .MuiPickersArrowSwitcher-button, & .MuiPickersCalendarHeader-switchViewButton": {
    color: "var(--ds-ink-2)",
  },
};
