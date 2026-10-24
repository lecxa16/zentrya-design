import { useId as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
// src/primitivas/Campo.jsx
var r = {
	width: "100%",
	boxSizing: "border-box",
	fontFamily: "var(--ds-font)",
	fontSize: "var(--ds-t-body)",
	fontWeight: 600,
	color: "var(--ds-ink)",
	background: "var(--ds-surface-2)",
	border: "1px solid var(--ds-line)",
	borderRadius: "var(--ds-r-item)",
	padding: "10px 13px",
	outline: "none",
	transition: "border-color var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease)"
};
function i({ id: e, etiqueta: r, requerido: i, error: a, ayuda: o, children: s, estilo: c }) {
	return /* @__PURE__ */ n("div", {
		"data-error": a ? "si" : void 0,
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 6,
			minWidth: 0,
			...c
		},
		children: [
			r && /* @__PURE__ */ n("label", {
				htmlFor: e,
				id: e ? `${e}-etiqueta` : void 0,
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 700,
					letterSpacing: "0.04em",
					textTransform: "uppercase",
					color: "var(--ds-ink-3)"
				},
				children: [r, i && /* @__PURE__ */ t("span", {
					style: { color: "var(--ds-risk)" },
					children: " *"
				})]
			}),
			s,
			(a || o) && /* @__PURE__ */ t("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					color: a ? "var(--ds-risk)" : "var(--ds-ink-3)"
				},
				children: a || o
			})
		]
	});
}
function a({ etiqueta: n, valor: a, onCambio: o, onSalir: s, tipo: c = "text", marcador: l, requerido: u, error: d, ayuda: f, deshabilitado: p, multilinea: m = !1, filas: h = 3, estilo: g, ..._ }) {
	let v = e();
	return /* @__PURE__ */ t(i, {
		id: v,
		etiqueta: n,
		requerido: u,
		error: d,
		ayuda: f,
		estilo: g,
		children: /* @__PURE__ */ t(m ? "textarea" : "input", {
			id: v,
			type: m ? void 0 : c,
			rows: m ? h : void 0,
			value: a ?? "",
			onChange: (e) => o?.(e.target.value),
			placeholder: l,
			disabled: p,
			"aria-invalid": d ? "true" : void 0,
			style: {
				...r,
				borderColor: d ? "var(--ds-risk)" : "var(--ds-line)",
				opacity: p ? .55 : 1,
				cursor: p ? "not-allowed" : void 0,
				resize: m ? "vertical" : void 0,
				fontFamily: "var(--ds-font)"
			},
			onFocus: (e) => {
				d || (e.target.style.borderColor = "var(--ds-accent-trazo)"), e.target.style.boxShadow = d ? "0 0 0 3px rgba(220,38,38,0.22)" : "0 0 0 3px var(--ds-accent-ring)";
			},
			onBlur: (e) => {
				e.target.style.borderColor = d ? "var(--ds-risk)" : "var(--ds-line)", e.target.style.boxShadow = "none", s?.();
			},
			..._
		})
	});
}
function o({ etiqueta: a, valor: o, onCambio: s, onSalir: c, opciones: l = [], vacio: u, requerido: d, error: f, ayuda: p, deshabilitado: m, estilo: h, ...g }) {
	let _ = e();
	return /* @__PURE__ */ t(i, {
		id: _,
		etiqueta: a,
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
				borderColor: f ? "var(--ds-risk)" : "var(--ds-line)",
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
function s({ valor: e, onCambio: i, marcador: a = "Buscar…", estilo: o }) {
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
				e.target.style.borderColor = "var(--ds-accent-trazo)", e.target.style.boxShadow = "0 0 0 3px var(--ds-accent-ring)";
			},
			onBlur: (e) => {
				e.target.style.borderColor = "var(--ds-line)", e.target.style.boxShadow = "none";
			}
		})]
	});
}
export { o as a, i, r as n, a as r, s as t };
