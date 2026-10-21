import { jsx as u, jsxs as w } from "react/jsx-runtime";
import { useState as z, useEffect as C, useId as y, useMemo as F } from "react";
import { DatePicker as Y } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider as A } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs as B } from "@mui/x-date-pickers/AdapterDayjs";
import b from "dayjs";
import "dayjs/locale/es";
import { E as P } from "./Campo-CfntI-cS.js";
import W from "@mui/material/Select";
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
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: i ? "var(--ds-risk)" : "var(--ds-accent-trazo)" },
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
      color: "var(--ds-accent-tinta)",
      "&:hover": { backgroundColor: "var(--ds-accent-soft) !important" }
    }
  }
}, g = "YYYY-MM-DD";
function Q({
  etiqueta: i,
  valor: s,
  onCambio: r,
  onSalir: o,
  requerido: d,
  error: n,
  ayuda: M,
  deshabilitado: c,
  minimo: v,
  maximo: f,
  estilo: m
}) {
  const [k, l] = z(() => s ? b(s, g) : null);
  C(() => {
    const a = s ? b(s, g) : null;
    l((t) => !t && !a || t && a && t.isSame(a, "day") ? t : a);
  }, [s]);
  const e = y();
  return /* @__PURE__ */ u(
    P,
    {
      id: e,
      etiqueta: i,
      requerido: d,
      error: n,
      ayuda: M,
      estilo: m,
      children: /* @__PURE__ */ u(A, { dateAdapter: B, adapterLocale: "es", children: /* @__PURE__ */ u(
        Y,
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
              id: e,
              size: "small",
              fullWidth: !0,
              error: !!n,
              placeholder: "dd/mm/aaaa",
              sx: D(!!n)
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
  "& .MuiPickersDay-today": { borderColor: "var(--ds-accent-trazo)" },
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
  opciones: d = [],
  vacio: n,
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
        W,
        {
          id: l,
          labelId: i ? `${l}-etiqueta` : void 0,
          value: s ?? "",
          onChange: (e) => {
            r == null || r(e.target.value), o == null || o();
          },
          disabled: f,
          error: !!c,
          displayEmpty: n !== void 0,
          size: "small",
          fullWidth: !0,
          MenuProps: { sx: h },
          sx: D(!!c),
          renderValue: (e) => {
            if (e === "" || e === null || e === void 0)
              return /* @__PURE__ */ u("span", { style: { color: "var(--ds-ink-3)" }, children: n ?? "" });
            const a = d.find((t) => String(t.valor) === String(e));
            return a ? a.texto : e;
          },
          ...k,
          children: [
            n !== void 0 && /* @__PURE__ */ u(I, { value: "", children: n }),
            d.map((e) => /* @__PURE__ */ u(I, { value: e.valor, children: e.texto }, e.valor))
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
  opciones: d = [],
  marcador: n = "Escribe para buscar…",
  requerido: M,
  error: c,
  ayuda: v,
  deshabilitado: f,
  limite: m = 60,
  estilo: k
}) {
  const l = y(), e = F(
    () => d.find((t) => String(t.valor) === String(s)) || null,
    [d, s]
  ), a = F(() => T({
    limit: m,
    stringify: (t) => O(t.texto)
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
          options: d,
          value: e,
          disabled: f,
          getOptionLabel: (t) => (t == null ? void 0 : t.texto) ?? "",
          isOptionEqualToValue: (t, p) => String(t.valor) === String(p.valor),
          groupBy: d.some((t) => t.grupo) ? (t) => t.grupo || "" : void 0,
          filterOptions: (t, p) => a(t, { ...p, inputValue: O(p.inputValue) }),
          onChange: (t, p) => {
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
              color: "var(--ds-accent-tinta)"
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
          renderInput: (t) => /* @__PURE__ */ u(
            L,
            {
              ...t,
              placeholder: n,
              error: !!c,
              inputProps: { ...t.inputProps, "aria-labelledby": i ? `${l}-etiqueta` : void 0 },
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
