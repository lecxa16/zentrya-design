import { useId as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
// \0rolldown/runtime.js
var r = Object.create, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyNames, s = Object.getPrototypeOf, c = Object.prototype.hasOwnProperty, l = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), u = (e, t) => {
	let n = {};
	for (var r in e) i(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || i(n, Symbol.toStringTag, { value: "Module" }), n;
}, d = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var s = o(t), l = 0, u = s.length, d; l < u; l++) d = s[l], !c.call(e, d) && d !== n && i(e, d, {
		get: ((e) => t[e]).bind(null, d),
		enumerable: !(r = a(t, d)) || r.enumerable
	});
	return e;
}, f = (e, t, n) => (n = e == null ? {} : r(s(e)), d(t || !e || !e.__esModule || !c.call(e, "default") ? i(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), p = {
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
}, m = {
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
function h({ id: e, etiqueta: r, requerido: i, error: a, ayuda: o, children: s, estilo: c, etiquetaOculta: l = !1 }) {
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
				style: l ? m : {
					fontSize: "var(--ds-t-small)",
					fontWeight: 500,
					color: "var(--ds-ink-2)",
					paddingLeft: 2
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
function g({ etiqueta: r, valor: i, onCambio: a, onSalir: o, tipo: s = "text", marcador: c, requerido: l, error: u, ayuda: d, deshabilitado: f, multilinea: m = !1, filas: g = 3, estilo: _, adorno: v, id: y, etiquetaOculta: b, ...x }) {
	let S = e(), C = y || S, w = /* @__PURE__ */ t(m ? "textarea" : "input", {
		id: C,
		type: m ? void 0 : s,
		rows: m ? g : void 0,
		value: i ?? "",
		onChange: (e) => a?.(e.target.value),
		placeholder: c,
		disabled: f,
		"aria-invalid": u ? "true" : void 0,
		style: {
			...p,
			borderColor: u ? "var(--ds-risk)" : "var(--ds-line-firm)",
			opacity: f ? .55 : 1,
			cursor: f ? "not-allowed" : void 0,
			resize: m ? "vertical" : void 0,
			fontFamily: "var(--ds-font)",
			paddingRight: v ? 46 : void 0
		},
		onFocus: (e) => {
			u || (e.target.style.borderColor = "var(--ds-accent-trazo)"), e.target.style.boxShadow = u ? "0 0 0 4px color-mix(in srgb, var(--ds-risk) 22%, transparent)" : "0 0 0 4px var(--ds-accent-ring)";
		},
		onBlur: (e) => {
			e.target.style.borderColor = u ? "var(--ds-risk)" : "var(--ds-line-firm)", e.target.style.boxShadow = "none", o?.();
		},
		...x
	});
	return /* @__PURE__ */ t(h, {
		id: C,
		etiqueta: r,
		requerido: l,
		error: u,
		ayuda: d,
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
function _({ etiqueta: r, valor: i, onCambio: a, onSalir: o, opciones: s = [], vacio: c, requerido: l, error: u, ayuda: d, deshabilitado: f, estilo: m, ...g }) {
	let _ = e();
	return /* @__PURE__ */ t(h, {
		id: _,
		etiqueta: r,
		requerido: l,
		error: u,
		ayuda: d,
		estilo: m,
		children: /* @__PURE__ */ n("select", {
			id: _,
			value: i ?? "",
			disabled: f,
			onChange: (e) => {
				a?.(e.target.value), o?.();
			},
			"aria-invalid": u ? "true" : void 0,
			...g,
			style: {
				...p,
				borderColor: u ? "var(--ds-risk)" : "var(--ds-line-firm)",
				opacity: f ? .55 : 1,
				cursor: f ? "not-allowed" : "pointer",
				appearance: "none",
				WebkitAppearance: "none",
				paddingRight: 34,
				backgroundImage: "linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)",
				backgroundPosition: "calc(100% - 18px) 51%, calc(100% - 13px) 51%",
				backgroundSize: "5px 5px, 5px 5px",
				backgroundRepeat: "no-repeat"
			},
			children: [c !== void 0 && /* @__PURE__ */ t("option", {
				value: "",
				children: c
			}), s.map((e) => /* @__PURE__ */ t("option", {
				value: e.valor,
				children: e.texto
			}, e.valor))]
		})
	});
}
function v({ valor: e, onCambio: r, marcador: i = "Buscar…", estilo: a }) {
	return /* @__PURE__ */ n("div", {
		style: {
			position: "relative",
			minWidth: 0,
			...a
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
			onChange: (e) => r?.(e.target.value),
			placeholder: i,
			"aria-label": i,
			style: {
				...p,
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
export { _ as a, f as c, h as i, p as n, l as o, g as r, u as s, v as t };
