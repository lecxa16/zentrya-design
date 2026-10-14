import { jsx as u, jsxs as w } from "react/jsx-runtime";
import { useState as C, useEffect as Y, useId as y, useMemo as F } from "react";
import { DatePicker as A } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider as B } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs as W } from "@mui/x-date-pickers/AdapterDayjs";
import b from "dayjs";
import "dayjs/locale/es";
import { E as P } from "./Campo-DLzlcfA_.js";
import z from "@mui/material/Select";
import I from "@mui/material/MenuItem";
import S, { createFilterOptions as T } from "@mui/material/Autocomplete";
import L from "@mui/material/TextField";
const D = (i) => ({
  /* `&` cubre al `Select`, cuya RAÍZ ya es el `OutlinedInput`; el
     descendiente cubre al `TextField`, que lo envuelve en un
     `FormControl`. Sin las dos, las reglas sólo llegaban a uno de los
     dos y el otro se quedaba con el tema de la aplicación. */
  "&.MuiOutlinedInput-root, & .MuiOutlinedInput-root": {
    fontFamily: "var(--ds-font)",
    fontSize: "var(--ds-t-body)",
    fontWeight: 600,
    color: "var(--ds-ink)",
    backgroundColor: "var(--ds-surface-2)",
    borderRadius: "var(--ds-r-item)",
    transition: "box-shadow var(--ds-t-state) var(--ds-ease)",
    /* Se apunta a `.MuiOutlinedInput-notchedOutline`, no a `fieldset`: MUI
       usa esa clase, y una clase le gana a un selector de elemento. Sin
       esto, el azul de su tema seguía mandando al enfocar. */
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: i ? "var(--ds-risk)" : "var(--ds-line)",
      borderWidth: "1px !important",
      transition: "border-color var(--ds-t-state) var(--ds-ease)"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: i ? "var(--ds-risk)" : "var(--ds-line-firm)" },
    /* Un solo estado de foco: borde de acento y un halo suave. Antes se
       apilaban dos anillos —el azul de MUI y el del navegador— y eso es lo
       que se veía mal. */
    "&.Mui-focused": { boxShadow: i ? "0 0 0 3px rgba(220,38,38,0.22)" : "0 0 0 3px var(--ds-accent-ring)" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: i ? "var(--ds-risk)" : "var(--ds-accent)" },
    "&.Mui-disabled": { opacity: 0.55 }
  },
  "& .MuiOutlinedInput-input, & .MuiSelect-select": {
    padding: "10px 13px",
    color: "var(--ds-ink)",
    WebkitTextFillColor: "var(--ds-ink)"
  },
  "& .Mui-disabled .MuiSelect-select, & .MuiOutlinedInput-input.Mui-disabled": {
    WebkitTextFillColor: "var(--ds-ink-3)"
  },
  "& .MuiInputBase-input::placeholder": { color: "var(--ds-ink-3)", opacity: 1 },
  "& .MuiSvgIcon-root": { color: "var(--ds-ink-3)" },
  /* El anillo del navegador sobra: el halo ya dice dónde está el foco, y
     los dos juntos se ven como un borde doble. */
  "& .MuiSelect-select:focus, & .MuiSelect-select:focus-visible, & input:focus-visible": {
    outline: "none"
  }
}), h = {
  "& .MuiPaper-root": {
    backgroundColor: "var(--ds-panel)",
    backdropFilter: "var(--ds-blur)",
    border: "1px solid var(--ds-line)",
    borderRadius: "var(--ds-r-card)",
    boxShadow: "var(--ds-lift-3)",
    marginTop: "6px"
  },
  "& .MuiMenuItem-root": {
    fontFamily: "var(--ds-font)",
    fontSize: "var(--ds-t-small)",
    fontWeight: 600,
    color: "var(--ds-ink-2)",
    borderRadius: "var(--ds-r-item)",
    margin: "2px 6px",
    minHeight: 38,
    "&:hover": {
      backgroundColor: "var(--ds-surface-2) !important",
      color: "var(--ds-ink)"
    },
    "&.Mui-selected, &.Mui-selected.Mui-focusVisible": {
      backgroundColor: "var(--ds-accent-soft) !important",
      color: "var(--ds-accent)",
      "&:hover": { backgroundColor: "var(--ds-accent-soft) !important" }
    }
  }
}, g = "YYYY-MM-DD";
function Q({
  etiqueta: i,
  valor: s,
  onCambio: r,
  onSalir: o,
  requerido: n,
  error: d,
  ayuda: M,
  deshabilitado: c,
  minimo: v,
  maximo: f,
  estilo: m
}) {
  const [k, l] = C(() => s ? b(s, g) : null);
  Y(() => {
    const a = s ? b(s, g) : null;
    l((e) => !e && !a || e && a && e.isSame(a, "day") ? e : a);
  }, [s]);
  const t = y();
  return /* @__PURE__ */ u(
    P,
    {
      id: t,
      etiqueta: i,
      requerido: n,
      error: d,
      ayuda: M,
      estilo: m,
      children: /* @__PURE__ */ u(B, { dateAdapter: W, adapterLocale: "es", children: /* @__PURE__ */ u(
        A,
        {
          value: k,
          disabled: c,
          minDate: v ? b(v, g) : void 0,
          maxDate: f ? b(f, g) : void 0,
          format: "DD/MM/YYYY",
          onChange: (a) => {
            if (l(a), !a) {
              r == null || r(""), o == null || o();
              return;
            }
            a.isValid() && (r == null || r(a.format(g)), o == null || o());
          },
          slotProps: {
            textField: {
              id: t,
              size: "small",
              fullWidth: !0,
              error: !!d,
              placeholder: "dd/mm/aaaa",
              sx: D(!!d)
            },
            popper: { sx: x },
            desktopPaper: { sx: x },
            mobilePaper: { sx: x }
          }
        }
      ) })
    }
  );
}
const x = {
  "& .MuiPaper-root, &.MuiPaper-root": {
    backgroundColor: "var(--ds-panel)",
    backdropFilter: "var(--ds-blur)",
    color: "var(--ds-ink)",
    border: "1px solid var(--ds-line)",
    borderRadius: "var(--ds-r-card)",
    boxShadow: "var(--ds-lift-3)",
    fontFamily: "var(--ds-font)"
  },
  "& .MuiPickersCalendarHeader-label, & .MuiDayCalendar-weekDayLabel, & .MuiPickersDay-root, & .MuiPickersYear-yearButton, & .MuiPickersMonth-monthButton": {
    fontFamily: "var(--ds-font)",
    color: "var(--ds-ink)"
  },
  "& .MuiDayCalendar-weekDayLabel": { color: "var(--ds-ink-3)", fontWeight: 700 },
  "& .MuiPickersDay-root:hover": { backgroundColor: "var(--ds-surface-2)" },
  "& .MuiPickersDay-today": { borderColor: "var(--ds-accent)" },
  "& .MuiPickersDay-root.Mui-selected, & .MuiPickersYear-yearButton.Mui-selected, & .MuiPickersMonth-monthButton.Mui-selected": {
    backgroundColor: "var(--ds-accent) !important",
    color: "var(--ds-ink-on-accent) !important"
  },
  "& .MuiPickersArrowSwitcher-button, & .MuiPickersCalendarHeader-switchViewButton": {
    color: "var(--ds-ink-2)"
  }
};
function U({
  etiqueta: i,
  valor: s,
  onCambio: r,
  onSalir: o,
  opciones: n = [],
  vacio: d,
  requerido: M,
  error: c,
  ayuda: v,
  deshabilitado: f,
  estilo: m,
  ...k
}) {
  const l = y();
  return /* @__PURE__ */ u(
    P,
    {
      id: l,
      etiqueta: i,
      requerido: M,
      error: c,
      ayuda: v,
      estilo: m,
      children: /* @__PURE__ */ w(
        z,
        {
          id: l,
          labelId: i ? `${l}-etiqueta` : void 0,
          value: s ?? "",
          onChange: (t) => {
            r == null || r(t.target.value), o == null || o();
          },
          disabled: f,
          error: !!c,
          displayEmpty: d !== void 0,
          size: "small",
          fullWidth: !0,
          MenuProps: { sx: h },
          sx: D(!!c),
          renderValue: (t) => {
            if (t === "" || t === null || t === void 0)
              return /* @__PURE__ */ u("span", { style: { color: "var(--ds-ink-3)" }, children: d ?? "" });
            const a = n.find((e) => String(e.valor) === String(t));
            return a ? a.texto : t;
          },
          ...k,
          children: [
            d !== void 0 && /* @__PURE__ */ u(I, { value: "", children: d }),
            n.map((t) => /* @__PURE__ */ u(I, { value: t.valor, children: t.texto }, t.valor))
          ]
        }
      )
    }
  );
}
const O = (i) => (i || "").toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
function X({
  etiqueta: i,
  valor: s,
  onCambio: r,
  onSalir: o,
  opciones: n = [],
  marcador: d = "Escribe para buscar…",
  requerido: M,
  error: c,
  ayuda: v,
  deshabilitado: f,
  limite: m = 60,
  estilo: k
}) {
  const l = y(), t = F(
    () => n.find((e) => String(e.valor) === String(s)) || null,
    [n, s]
  ), a = F(() => T({
    limit: m,
    stringify: (e) => O(e.texto)
  }), [m]);
  return /* @__PURE__ */ u(
    P,
    {
      id: l,
      etiqueta: i,
      requerido: M,
      error: c,
      ayuda: v,
      estilo: k,
      children: /* @__PURE__ */ u(
        S,
        {
          id: l,
          size: "small",
          options: n,
          value: t,
          disabled: f,
          getOptionLabel: (e) => (e == null ? void 0 : e.texto) ?? "",
          isOptionEqualToValue: (e, p) => String(e.valor) === String(p.valor),
          groupBy: n.some((e) => e.grupo) ? (e) => e.grupo || "" : void 0,
          filterOptions: (e, p) => a(e, { ...p, inputValue: O(p.inputValue) }),
          onChange: (e, p) => {
            r == null || r(p ? p.valor : ""), o == null || o();
          },
          noOptionsText: "Nada coincide",
          slotProps: { paper: { sx: h["& .MuiPaper-root"] } },
          sx: {
            "& .MuiAutocomplete-inputRoot": { paddingTop: "2px !important", paddingBottom: "2px !important" }
          },
          componentsProps: { popper: { sx: {
            "& .MuiAutocomplete-option": { ...h["& .MuiMenuItem-root"] },
            "& .MuiAutocomplete-option[aria-selected='true']": {
              backgroundColor: "var(--ds-accent-soft) !important",
              color: "var(--ds-accent)"
            },
            "& .MuiAutocomplete-groupLabel": {
              fontFamily: "var(--ds-font)",
              fontSize: "var(--ds-t-micro)",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--ds-ink-3)",
              backgroundColor: "var(--ds-panel)",
              lineHeight: "30px"
            },
            "& .MuiAutocomplete-noOptions": { fontFamily: "var(--ds-font)", color: "var(--ds-ink-3)" }
          } } },
          renderInput: (e) => /* @__PURE__ */ u(
            L,
            {
              ...e,
              placeholder: d,
              error: !!c,
              inputProps: { ...e.inputProps, "aria-labelledby": i ? `${l}-etiqueta` : void 0 },
              sx: D(!!c)
            }
          )
        }
      )
    }
  );
}
export {
  X as Buscable,
  Q as CampoFecha,
  U as Selector
};
