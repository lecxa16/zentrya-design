import { useId as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
// src/primitivas/Campo.jsx
var r = {
	width: "100%",
	boxSizing: "border-box",
	fontFamily: "var(--ds-font)",
	fontSize: "var(--ds-t-body)",
	fontWeight: 400,
	color: "var(--ds-ink)",
	background: "var(--ds-surface-2)",
	border: "1px solid var(--ds-line-firm)",
	borderRadius: 10,
	minHeight: 44,
	padding: "11px 14px",
	lineHeight: 1.35,
	outline: "none",
	transition: "border-color var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease)"
}, i = {
	position: "absolute",
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0 0 0 0)",
	whiteSpace: "nowrap",
	border: 0
};
function a({ id: e, etiqueta: r, requerido: a, error: o, ayuda: s, children: c, estilo: l, etiquetaOculta: u = !1 }) {
	return /* @__PURE__ */ n("div", {
		"data-error": o ? "si" : void 0,
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 6,
			minWidth: 0,
			...l
		},
		children: [
			r && /* @__PURE__ */ n("label", {
				htmlFor: e,
				id: e ? `${e}-etiqueta` : void 0,
				style: u ? i : {
					fontSize: "var(--ds-t-small)",
					fontWeight: 500,
					color: "var(--ds-ink-2)",
					paddingLeft: 2
				},
				children: [r, a && /* @__PURE__ */ t("span", {
					style: { color: "var(--ds-risk)" },
					children: " *"
				})]
			}),
			c,
			(o || s) && /* @__PURE__ */ t("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					color: o ? "var(--ds-risk)" : "var(--ds-ink-3)"
				},
				children: o || s
			})
		]
	});
}
function o({ etiqueta: i, valor: o, onCambio: s, onSalir: c, tipo: l = "text", marcador: u, requerido: d, error: f, ayuda: p, deshabilitado: m, multilinea: h = !1, filas: g = 3, estilo: _, adorno: v, id: y, etiquetaOculta: b, ...x }) {
	let S = e(), C = y || S, w = /* @__PURE__ */ t(h ? "textarea" : "input", {
		id: C,
		type: h ? void 0 : l,
		rows: h ? g : void 0,
		value: o ?? "",
		onChange: (e) => s?.(e.target.value),
		placeholder: u,
		disabled: m,
		"aria-invalid": f ? "true" : void 0,
		style: {
			...r,
			borderColor: f ? "var(--ds-risk)" : "var(--ds-line-firm)",
			opacity: m ? .55 : 1,
			cursor: m ? "not-allowed" : void 0,
			resize: h ? "vertical" : void 0,
			fontFamily: "var(--ds-font)",
			paddingRight: v ? 46 : void 0
		},
		onFocus: (e) => {
			f || (e.target.style.borderColor = "var(--ds-accent-trazo)"), e.target.style.boxShadow = f ? "0 0 0 4px color-mix(in srgb, var(--ds-risk) 22%, transparent)" : "0 0 0 4px var(--ds-accent-ring)";
		},
		onBlur: (e) => {
			e.target.style.borderColor = f ? "var(--ds-risk)" : "var(--ds-line-firm)", e.target.style.boxShadow = "none", c?.();
		},
		...x
	});
	return /* @__PURE__ */ t(a, {
		id: C,
		etiqueta: i,
		requerido: d,
		error: f,
		ayuda: p,
		estilo: _,
		etiquetaOculta: b,
		children: v ? /* @__PURE__ */ n("div", {
			style: { position: "relative" },
			children: [w, /* @__PURE__ */ t("div", {
				style: {
					position: "absolute",
					top: 0,
					right: 4,
					bottom: 0,
					display: "flex",
					alignItems: "center"
				},
				children: v
			})]
		}) : w
	});
}
function s({ etiqueta: i, valor: o, onCambio: s, onSalir: c, opciones: l = [], vacio: u, requerido: d, error: f, ayuda: p, deshabilitado: m, estilo: h, ...g }) {
	let _ = e();
	return /* @__PURE__ */ t(a, {
		id: _,
		etiqueta: i,
		requerido: d,
		error: f,
		ayuda: p,
		estilo: h,
		children: /* @__PURE__ */ n("select", {
			id: _,
			value: o ?? "",
			disabled: m,
			onChange: (e) => {
				s?.(e.target.value), c?.();
			},
			"aria-invalid": f ? "true" : void 0,
			...g,
			style: {
				...r,
				borderColor: f ? "var(--ds-risk)" : "var(--ds-line-firm)",
				opacity: m ? .55 : 1,
				cursor: m ? "not-allowed" : "pointer",
				appearance: "none",
				WebkitAppearance: "none",
				paddingRight: 34,
				backgroundImage: "linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)",
				backgroundPosition: "calc(100% - 18px) 51%, calc(100% - 13px) 51%",
				backgroundSize: "5px 5px, 5px 5px",
				backgroundRepeat: "no-repeat"
			},
			children: [u !== void 0 && /* @__PURE__ */ t("option", {
				value: "",
				children: u
			}), l.map((e) => /* @__PURE__ */ t("option", {
				value: e.valor,
				children: e.texto
			}, e.valor))]
		})
	});
}
function c({ valor: e, onCambio: i, marcador: a = "Buscar…", estilo: o }) {
	return /* @__PURE__ */ n("div", {
		style: {
			position: "relative",
			minWidth: 0,
			...o
		},
		children: [/* @__PURE__ */ t("span", {
			"aria-hidden": !0,
			style: {
				position: "absolute",
				left: 12,
				top: "50%",
				transform: "translateY(-50%)",
				color: "var(--ds-ink-3)",
				lineHeight: 0
			},
			children: /* @__PURE__ */ n("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				children: [/* @__PURE__ */ t("circle", {
					cx: "11",
					cy: "11",
					r: "7"
				}), /* @__PURE__ */ t("path", { d: "M20 20l-3.5-3.5" })]
			})
		}), /* @__PURE__ */ t("input", {
			value: e ?? "",
			onChange: (e) => i?.(e.target.value),
			placeholder: a,
			"aria-label": a,
			style: {
				...r,
				paddingLeft: 36,
				borderRadius: "var(--ds-r-pill)"
			},
			onFocus: (e) => {
				e.target.style.borderColor = "var(--ds-accent-trazo)", e.target.style.boxShadow = "0 0 0 4px var(--ds-accent-ring)";
			},
			onBlur: (e) => {
				e.target.style.borderColor = "var(--ds-line-firm)", e.target.style.boxShadow = "none";
			}
		})]
	});
}
export { s as a, a as i, r as n, o as r, c as t };
