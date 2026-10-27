import { i as e } from "./Campo-BvKR4Hi6.js";
import { useEffect as t, useId as n, useMemo as r, useState as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { DatePicker as s } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider as c } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs as l } from "@mui/x-date-pickers/AdapterDayjs";
import { esES as u } from "@mui/x-date-pickers/locales";
import d from "dayjs";
import "dayjs/locale/es";
import f from "@mui/material/Select";
import p from "@mui/material/MenuItem";
import m, { createFilterOptions as h } from "@mui/material/Autocomplete";
import g from "@mui/material/TextField";
// src/mui/estilo.js
var _ = (e) => ({
	"&.MuiOutlinedInput-root, & .MuiOutlinedInput-root, & .MuiPickersOutlinedInput-root": {
		fontFamily: "var(--ds-font)",
		fontSize: "var(--ds-t-body)",
		fontWeight: 400,
		color: "var(--ds-ink)",
		backgroundColor: "var(--ds-surface-2)",
		borderRadius: "10px",
		transition: "box-shadow var(--ds-t-state) var(--ds-ease)",
		"& .MuiOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-notchedOutline": {
			borderColor: e ? "var(--ds-risk)" : "var(--ds-line-firm)",
			borderWidth: "1px !important",
			transition: "border-color var(--ds-t-state) var(--ds-ease)"
		},
		"&:hover .MuiOutlinedInput-notchedOutline, &:hover .MuiPickersOutlinedInput-notchedOutline": { borderColor: e ? "var(--ds-risk)" : "var(--ds-ink-3)" },
		"&.Mui-focused": { boxShadow: e ? "0 0 0 4px color-mix(in srgb, var(--ds-risk) 22%, transparent)" : "0 0 0 4px var(--ds-accent-ring)" },
		"&.Mui-focused .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiPickersOutlinedInput-notchedOutline": { borderColor: e ? "var(--ds-risk)" : "var(--ds-accent-trazo)" },
		"&.Mui-disabled": { opacity: .55 }
	},
	"& .MuiPickersOutlinedInput-root": { paddingLeft: "14px" },
	"& .MuiPickersSectionList-root": {
		padding: "11.5px 0",
		color: "var(--ds-ink)"
	},
	"& .MuiPickersOutlinedInput-root.Mui-disabled .MuiPickersSectionList-root": { color: "var(--ds-ink-3)" },
	"& .MuiOutlinedInput-input, & .MuiSelect-select": {
		padding: "11.5px 14px",
		color: "var(--ds-ink)",
		WebkitTextFillColor: "var(--ds-ink)"
	},
	"& .Mui-disabled .MuiSelect-select, & .MuiOutlinedInput-input.Mui-disabled": { WebkitTextFillColor: "var(--ds-ink-3)" },
	"& .MuiInputBase-input::placeholder": {
		color: "var(--ds-ink-3)",
		opacity: 1
	},
	"& .MuiSvgIcon-root": { color: "var(--ds-ink-3)" },
	"& .MuiSelect-select:focus, & .MuiSelect-select:focus-visible, & input:focus-visible": { outline: "none" }
}), v = {
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
}, y = "YYYY-MM-DD", b = u.components.MuiLocalizationProvider.defaultProps.localeText;
function x({ etiqueta: r, valor: o, onCambio: u, onSalir: f, requerido: p, error: m, ayuda: h, deshabilitado: g, minimo: v, maximo: x, estilo: C }) {
	let [w, T] = i(() => o ? d(o, y) : null);
	t(() => {
		let e = o ? d(o, y) : null;
		T((t) => !t && !e || t && e && t.isSame(e, "day") ? t : e);
	}, [o]);
	let E = n();
	return /* @__PURE__ */ a(e, {
		id: E,
		etiqueta: r,
		requerido: p,
		error: m,
		ayuda: h,
		estilo: C,
		children: /* @__PURE__ */ a(c, {
			dateAdapter: l,
			adapterLocale: "es",
			localeText: b,
			children: /* @__PURE__ */ a(s, {
				value: w,
				disabled: g,
				minDate: v ? d(v, y) : void 0,
				maxDate: x ? d(x, y) : void 0,
				format: "DD/MM/YYYY",
				onChange: (e) => {
					T(e), e ? e.isValid() && (u?.(e.format(y)), f?.()) : (u?.(""), f?.());
				},
				slotProps: {
					textField: {
						id: E,
						size: "small",
						fullWidth: !0,
						error: !!m,
						sx: _(!!m)
					},
					popper: { sx: S },
					desktopPaper: { sx: S },
					mobilePaper: { sx: S }
				}
			})
		})
	});
}
var S = {
	"& .MuiPaper-root, &.MuiPaper-root": {
		backgroundColor: "var(--ds-panel)",
		backdropFilter: "var(--ds-blur)",
		color: "var(--ds-ink)",
		border: "1px solid var(--ds-line)",
		borderRadius: "var(--ds-r-card)",
		boxShadow: "var(--ds-lift-3)",
		fontFamily: "var(--ds-font)"
	},
	"& .MuiPickersCalendarHeader-label, & .MuiDayCalendar-weekDayLabel, & .MuiPickerDay-root, & .MuiPickersYear-yearButton, & .MuiPickersMonth-monthButton": {
		fontFamily: "var(--ds-font)",
		color: "var(--ds-ink)"
	},
	"& .MuiDayCalendar-weekDayLabel": {
		color: "var(--ds-ink-3)",
		fontWeight: 600
	},
	"& .MuiPickerDay-root:hover": { backgroundColor: "var(--ds-surface-2)" },
	"& .MuiPickerDay-today": { borderColor: "var(--ds-accent-trazo)" },
	"& .MuiPickerDay-root.Mui-selected, & .MuiPickersYear-yearButton.Mui-selected, & .MuiPickersMonth-monthButton.Mui-selected": {
		backgroundColor: "var(--ds-accent) !important",
		color: "var(--ds-ink-on-accent) !important"
	},
	"& .MuiPickersArrowSwitcher-button, & .MuiPickersCalendarHeader-switchViewButton": { color: "var(--ds-ink-2)" }
};
// src/mui/Selector.jsx
function C({ etiqueta: t, valor: r, onCambio: i, onSalir: s, opciones: c = [], vacio: l, requerido: u, error: d, ayuda: m, deshabilitado: h, estilo: g, ...y }) {
	let b = n();
	return /* @__PURE__ */ a(e, {
		id: b,
		etiqueta: t,
		requerido: u,
		error: d,
		ayuda: m,
		estilo: g,
		children: /* @__PURE__ */ o(f, {
			id: b,
			labelId: t ? `${b}-etiqueta` : void 0,
			value: r ?? "",
			onChange: (e) => {
				i?.(e.target.value), s?.();
			},
			disabled: h,
			error: !!d,
			displayEmpty: l !== void 0,
			size: "small",
			fullWidth: !0,
			MenuProps: { sx: v },
			sx: _(!!d),
			renderValue: (e) => {
				if (e === "" || e == null) return /* @__PURE__ */ a("span", {
					style: { color: "var(--ds-ink-3)" },
					children: l ?? ""
				});
				let t = c.find((t) => String(t.valor) === String(e));
				return t ? t.texto : e;
			},
			...y,
			children: [l !== void 0 && /* @__PURE__ */ a(p, {
				value: "",
				children: l
			}), c.map((e) => /* @__PURE__ */ a(p, {
				value: e.valor,
				children: e.texto
			}, e.valor))]
		})
	});
}
// src/mui/Buscable.jsx
var w = (e) => (e || "").toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
function T({ etiqueta: t, valor: i, onCambio: o, onSalir: s, opciones: c = [], marcador: l = "Escribe para buscar…", requerido: u, error: d, ayuda: f, deshabilitado: p, limite: y = 60, estilo: b }) {
	let x = n(), S = r(() => c.find((e) => String(e.valor) === String(i)) || null, [c, i]), C = r(() => h({
		limit: y,
		stringify: (e) => w(e.texto)
	}), [y]);
	return /* @__PURE__ */ a(e, {
		id: x,
		etiqueta: t,
		requerido: u,
		error: d,
		ayuda: f,
		estilo: b,
		children: /* @__PURE__ */ a(m, {
			id: x,
			size: "small",
			options: c,
			value: S,
			disabled: p,
			getOptionLabel: (e) => e?.texto ?? "",
			isOptionEqualToValue: (e, t) => String(e.valor) === String(t.valor),
			groupBy: c.some((e) => e.grupo) ? (e) => e.grupo || "" : void 0,
			filterOptions: (e, t) => C(e, {
				...t,
				inputValue: w(t.inputValue)
			}),
			onChange: (e, t) => {
				o?.(t ? t.valor : ""), s?.();
			},
			noOptionsText: "Nada coincide",
			sx: {
				"& .MuiAutocomplete-inputRoot": {
					paddingTop: "3.5px !important",
					paddingBottom: "3.5px !important"
				},
				"&.MuiAutocomplete-root .MuiOutlinedInput-root.MuiInputBase-sizeSmall .MuiAutocomplete-input": { padding: "8px 4px 8px 11px" }
			},
			slotProps: {
				paper: { sx: v["& .MuiPaper-root"] },
				popper: { sx: {
					"& .MuiAutocomplete-option": { ...v["& .MuiMenuItem-root"] },
					"& .MuiAutocomplete-option[aria-selected='true']": {
						backgroundColor: "var(--ds-accent-soft) !important",
						color: "var(--ds-accent-tinta)"
					},
					"& .MuiAutocomplete-groupLabel": {
						fontFamily: "var(--ds-font)",
						fontSize: "var(--ds-t-micro)",
						fontWeight: 600,
						letterSpacing: "0.05em",
						textTransform: "uppercase",
						color: "var(--ds-ink-3)",
						backgroundColor: "var(--ds-panel)",
						lineHeight: "30px"
					},
					"& .MuiAutocomplete-noOptions": {
						fontFamily: "var(--ds-font)",
						color: "var(--ds-ink-3)"
					}
				} }
			},
			renderInput: (e) => /* @__PURE__ */ a(g, {
				...e,
				placeholder: l,
				error: !!d,
				slotProps: {
					...e.slotProps,
					htmlInput: {
						...e.slotProps.htmlInput,
						"aria-labelledby": t ? `${x}-etiqueta` : void 0
					}
				},
				sx: _(!!d)
			})
		})
	});
}
export { T as Buscable, x as CampoFecha, C as Selector };
