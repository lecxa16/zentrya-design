import "./estilos.css";
import { a as e, i as t, n, r, s as i, t as a } from "./Campo-qQXThDfo.js";
import o, { createContext as s, useCallback as c, useContext as l, useEffect as u, useId as d, useLayoutEffect as f, useMemo as p, useRef as m, useState as h } from "react";
import { Fragment as g, jsx as _, jsxs as v } from "react/jsx-runtime";
import { createPortal as y } from "react-dom";
// src/Tema.jsx
var b = "ds-theme", x = "ds-paleta", S = [
	{
		id: "zentrya",
		nombre: "Turquesa",
		muestra: {
			light: "#0B7D75",
			dark: "#3FD3C7"
		}
	},
	{
		id: "oceano",
		nombre: "Océano",
		muestra: {
			light: "#1F5BD1",
			dark: "#7DAEFF"
		}
	},
	{
		id: "workos",
		nombre: "Violeta",
		muestra: {
			light: "#6D3FD9",
			dark: "#B79CFF"
		}
	},
	{
		id: "nykza",
		nombre: "Grafito",
		muestra: {
			light: "#111111",
			dark: "#F2F2F2"
		}
	},
	{
		id: "fucsia",
		nombre: "Fucsia",
		muestra: {
			light: "#B5257E",
			dark: "#F58BC8"
		}
	},
	{
		id: "pizarra",
		nombre: "Pizarra",
		muestra: {
			light: "#3D5875",
			dark: "#A3B8D2"
		}
	}
], C = s({
	tema: "light",
	alternar: () => {},
	fijar: () => {},
	paleta: "zentrya",
	paletas: [],
	fijarPaleta: () => {}
});
function w() {
	try {
		return !!localStorage.getItem(b);
	} catch {
		return !1;
	}
}
function T(e) {
	try {
		localStorage.setItem(b, e);
	} catch {}
}
function E(e) {
	try {
		let t = localStorage.getItem(x);
		return e.some((e) => e.id === t) ? t : null;
	} catch {
		return null;
	}
}
function D() {
	try {
		let e = localStorage.getItem(b);
		if (e === "light" || e === "dark") return e;
	} catch {}
	return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function O({ children: e, forzar: t, marca: n, paletas: r }) {
	let [i, a] = h(() => t || D()), o = r ? r === !0 ? S : S.filter((e) => r.includes(e.id)) : [], [s, l] = h(() => E(o)), d = o.length && s || n || "zentrya", f = d === "zentrya" ? void 0 : d;
	u(() => {
		let e = document.documentElement;
		e.setAttribute("data-ds-theme", i), e.style.colorScheme = i;
	}, [i]), u(() => {
		if (!f) return;
		let e = document.documentElement;
		return e.setAttribute("data-ds-marca", f), () => e.removeAttribute("data-ds-marca");
	}, [f]), u(() => {
		if (t || typeof window > "u" || !window.matchMedia) return;
		let e = window.matchMedia("(prefers-color-scheme: dark)"), n = (e) => {
			w() || a(e.matches ? "dark" : "light");
		};
		return e.addEventListener("change", n), () => e.removeEventListener("change", n);
	}, [t]);
	let p = c((e) => {
		T(e), a(e);
	}, []), m = c(() => p(i === "dark" ? "light" : "dark"), [i, p]), g = c((e) => {
		try {
			localStorage.setItem(x, e);
		} catch {}
		l(e);
	}, []);
	return /* @__PURE__ */ _(C.Provider, {
		value: {
			tema: i,
			alternar: m,
			fijar: p,
			paleta: d,
			paletas: o,
			fijarPaleta: g
		},
		children: /* @__PURE__ */ _("div", {
			className: "ds-root",
			children: e
		})
	});
}
var k = () => l(C), A = {
	plana: "var(--ds-lift-1)",
	elevada: "var(--ds-lift-2)",
	flotante: "var(--ds-lift-3)"
};
function j({ children: e, nivel: t = "elevada", interactiva: n = !1, hundida: r = !1, solida: i = !1, radio: a = "var(--ds-r-card)", relleno: o = "var(--ds-5)", estilo: s, entrada: c, ...l }) {
	return /* @__PURE__ */ _("div", {
		...l,
		style: {
			background: i ? "var(--ds-surface-solid)" : r ? "var(--ds-surface-sunk)" : "var(--ds-surface)",
			backdropFilter: i ? void 0 : "var(--ds-blur)",
			WebkitBackdropFilter: i ? void 0 : "var(--ds-blur)",
			border: "1px solid var(--ds-line)",
			borderRadius: a,
			padding: o,
			boxSizing: "border-box",
			boxShadow: r ? "none" : A[t],
			transition: "transform var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease)",
			cursor: n ? "pointer" : void 0,
			...c === void 0 ? null : {
				animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
				animationDelay: `${Math.min(c * 55, 240)}ms`
			},
			...s
		},
		onMouseEnter: n ? (e) => {
			e.currentTarget.style.transform = "translateY(-3px)", e.currentTarget.style.boxShadow = "var(--ds-lift-3)";
		} : void 0,
		onMouseLeave: n ? (e) => {
			e.currentTarget.style.transform = "none", e.currentTarget.style.boxShadow = A[t];
		} : void 0,
		children: e
	});
}
// src/primitivas/Bento.jsx
function M({ children: e, marco: t = !1, columnas: n = 12, hueco: r = "var(--ds-4)", estilo: i }) {
	return /* @__PURE__ */ _("div", {
		style: {
			display: "grid",
			gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
			gap: r,
			...t ? {
				background: "var(--ds-frame)",
				padding: "var(--ds-3)",
				borderRadius: "var(--ds-r-frame)",
				boxShadow: "var(--ds-lift-3)"
			} : null,
			...i
		},
		children: e
	});
}
function ee({ children: e, ancho: t = 12, anchoMd: n, alto: r, estilo: i }) {
	return /* @__PURE__ */ v("div", {
		className: "ds-celda",
		style: {
			gridColumn: `span ${n ?? t}`,
			minWidth: 0,
			...r ? { gridRow: `span ${r}` } : null,
			...i
		},
		children: [/* @__PURE__ */ _("style", { children: "@media (max-width: 900px) { .ds-celda { grid-column: span 12 !important; } }" }), e]
	});
}
// src/primitivas/Heroe.jsx
function N({ children: e, imagen: t, imagenChica: n, encuadre: r = "center", alt: i = "", intensidad: a = .26, soloFoto: s = !1, radio: c = "var(--ds-r-card)", relleno: l = "var(--ds-8)", estilo: u, entrada: d, ...f }) {
	let [p, m] = o.useState(!1), h = s && t && !p;
	return /* @__PURE__ */ v("div", {
		...f,
		className: [h ? null : "ds-heroe", f.className].filter(Boolean).join(" ") || void 0,
		style: {
			position: "relative",
			overflow: "hidden",
			background: h ? "#0B0C12" : "var(--ds-hero)",
			borderRadius: c,
			padding: l,
			boxSizing: "border-box",
			color: "var(--ds-ink-on-hero)",
			boxShadow: h ? "var(--ds-lift-3)" : "var(--ds-lift-accent), var(--ds-lift-2)",
			...d === void 0 ? null : {
				animation: "ds-rise var(--ds-t-scene) var(--ds-ease) both",
				animationDelay: `${Math.min(d * 55, 240)}ms`
			},
			...u
		},
		children: [
			t && /* @__PURE__ */ _("img", {
				"aria-hidden": i ? void 0 : "true",
				alt: i,
				src: t,
				srcSet: n ? `${n} 800w, ${t} 1600w` : void 0,
				sizes: n ? "(max-width: 760px) 100vw, 900px" : void 0,
				loading: "lazy",
				decoding: "async",
				style: {
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
					objectFit: "cover",
					objectPosition: r,
					pointerEvents: "none",
					...h ? { filter: "saturate(1.08)" } : {
						mixBlendMode: "luminosity",
						opacity: a
					}
				},
				onError: () => m(!0)
			}),
			h && /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _("div", {
				"aria-hidden": !0,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					background: "linear-gradient(to bottom, rgba(8,9,15,0.58) 0%, rgba(8,9,15,0.30) 26%, rgba(8,9,15,0.34) 60%, rgba(8,9,15,0.78) 100%)"
				}
			}), /* @__PURE__ */ _("div", {
				"aria-hidden": !0,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					background: "linear-gradient(to right, rgba(8,9,15,0.52) 0%, rgba(8,9,15,0.26) 38%, rgba(8,9,15,0) 68%)"
				}
			})] }),
			!h && /* @__PURE__ */ _("div", {
				"aria-hidden": !0,
				style: {
					position: "absolute",
					inset: 0,
					background: "var(--ds-hero-glow)",
					pointerEvents: "none"
				}
			}),
			/* @__PURE__ */ _("div", {
				style: {
					position: "relative",
					display: "flex",
					flexDirection: "column",
					height: "100%"
				},
				children: e
			})
		]
	});
}
function P({ children: e, interactivo: t = !1, estilo: n, ...r }) {
	return /* @__PURE__ */ _("div", {
		...r,
		style: {
			background: "var(--ds-velo)",
			border: "1px solid var(--ds-line-glass)",
			backdropFilter: "blur(14px) saturate(150%)",
			WebkitBackdropFilter: "blur(14px) saturate(150%)",
			borderRadius: "var(--ds-r-item)",
			padding: "var(--ds-3) var(--ds-4)",
			color: "var(--ds-ink-on-hero)",
			transition: "background var(--ds-t-state) var(--ds-ease), transform var(--ds-t-state) var(--ds-ease)",
			cursor: t ? "pointer" : void 0,
			...n
		},
		onMouseEnter: t ? (e) => {
			e.currentTarget.style.background = "var(--ds-velo-fuerte)", e.currentTarget.style.transform = "translateY(-2px)";
		} : void 0,
		onMouseLeave: t ? (e) => {
			e.currentTarget.style.background = "var(--ds-velo)", e.currentTarget.style.transform = "none";
		} : void 0,
		children: e
	});
}
// src/primitivas/Cifra.jsx
var te = {
	neutro: "var(--ds-ink)",
	acento: "var(--ds-accent-tinta)",
	ok: "var(--ds-ok)",
	aviso: "var(--ds-warn)",
	riesgo: "var(--ds-risk)"
}, F = {
	m: "var(--ds-num-m)",
	l: "var(--ds-num-l)",
	xl: "var(--ds-num-xl)"
};
function ne({ valor: e, etiqueta: t, nota: n, tono: r = "neutro", tamano: i = "l", icono: a, alineacion: o = "left", estilo: s }) {
	return /* @__PURE__ */ v("div", {
		style: {
			minWidth: 0,
			textAlign: o,
			...s
		},
		children: [
			t && /* @__PURE__ */ v("div", {
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					letterSpacing: "0.05em",
					textTransform: "uppercase",
					color: "var(--ds-ink-3)",
					display: "flex",
					alignItems: "center",
					gap: 6,
					flexWrap: "wrap",
					minWidth: 0,
					justifyContent: o === "right" ? "flex-end" : "flex-start"
				},
				children: [a, t]
			}),
			/* @__PURE__ */ _("div", {
				className: "ds-num",
				style: {
					fontSize: F[i],
					fontWeight: 700,
					lineHeight: 1.05,
					letterSpacing: "-0.035em",
					color: te[r],
					marginTop: 2
				},
				children: e
			}),
			n && /* @__PURE__ */ _("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					color: "var(--ds-ink-3)",
					marginTop: 3
				},
				children: n
			})
		]
	});
}
// src/primitivas/Anillo.jsx
function I({ valor: e = 0, tamano: t = 132, grosor: n = 10, tono: r = "var(--ds-accent-trazo)", pista: i = "var(--ds-surface-sunk)", children: a, animar: o = !0 }) {
	let s = Math.max(0, Math.min(100, e)), c = (t - n) / 2, l = 2 * Math.PI * c, u = l * (1 - s / 100);
	return /* @__PURE__ */ v("div", {
		style: {
			position: "relative",
			width: t,
			height: t,
			flexShrink: 0
		},
		children: [/* @__PURE__ */ v("svg", {
			width: t,
			height: t,
			style: { transform: "rotate(-90deg)" },
			"aria-hidden": !0,
			children: [/* @__PURE__ */ _("circle", {
				cx: t / 2,
				cy: t / 2,
				r: c,
				fill: "none",
				stroke: i,
				strokeWidth: n
			}), /* @__PURE__ */ _("circle", {
				cx: t / 2,
				cy: t / 2,
				r: c,
				fill: "none",
				stroke: r,
				strokeWidth: n,
				strokeLinecap: "round",
				strokeDasharray: l,
				strokeDashoffset: u,
				style: o ? {
					"--ds-dash": l,
					animation: "ds-sweep var(--ds-t-scene) var(--ds-ease) 120ms both"
				} : void 0
			})]
		}), /* @__PURE__ */ _("div", {
			style: {
				position: "absolute",
				inset: 0,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: 1
			},
			children: a
		})]
	});
}
// src/primitivas/Medidor.jsx
var L = {
	acento: "var(--ds-accent-trazo)",
	ok: "var(--ds-ok)",
	aviso: "var(--ds-warn)",
	riesgo: "var(--ds-risk)"
};
function R({ valor: e = 0, total: t = 100, tono: n = "acento", alto: r = 6, etiqueta: i, estilo: a }) {
	let o = t > 0 ? Math.max(0, Math.min(100, e / t * 100)) : 0;
	return /* @__PURE__ */ _("div", {
		role: "progressbar",
		"aria-valuenow": Math.round(o),
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": i,
		style: {
			height: r,
			borderRadius: 99,
			overflow: "hidden",
			background: "var(--ds-surface-sunk)",
			...a
		},
		children: /* @__PURE__ */ _("div", { style: {
			height: "100%",
			width: `${o}%`,
			borderRadius: 99,
			background: L[n] || L.acento,
			transition: "width var(--ds-t-move) var(--ds-ease)"
		} })
	});
}
// src/primitivas/Esqueleto.jsx
function z({ alto: e = 14, ancho: t = "100%", radio: n = 7, circulo: r = !1, estilo: i }) {
	return /* @__PURE__ */ _("span", {
		"aria-hidden": !0,
		style: {
			display: "block",
			flexShrink: 0,
			width: r ? r ? e : void 0 : t,
			height: e,
			borderRadius: r ? "var(--ds-r-pill)" : n,
			background: "var(--ds-esqueleto)",
			animation: "ds-pulso 1.6s ease-in-out infinite alternate",
			...i
		}
	});
}
function re({ retrato: e = !0, lineas: t = 2, derecha: n = !0 }) {
	return /* @__PURE__ */ v("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-3)",
			padding: "var(--ds-3) var(--ds-4)"
		},
		children: [
			e && /* @__PURE__ */ _(z, {
				circulo: !0,
				alto: 40
			}),
			/* @__PURE__ */ v("div", {
				style: {
					flex: 1,
					minWidth: 0,
					display: "flex",
					flexDirection: "column",
					gap: 7
				},
				children: [/* @__PURE__ */ _(z, {
					alto: 12,
					ancho: "42%"
				}), t > 1 && /* @__PURE__ */ _(z, {
					alto: 10,
					ancho: "26%"
				})]
			}),
			n && /* @__PURE__ */ _(z, {
				alto: 12,
				ancho: 78
			})
		]
	});
}
function ie({ filas: e = 5, ...t }) {
	return /* @__PURE__ */ _("div", { children: Array.from({ length: e }, (e, n) => /* @__PURE__ */ _("div", {
		style: { opacity: 1 - n * .12 },
		children: /* @__PURE__ */ _(re, { ...t })
	}, n)) });
}
// src/primitivas/Barras.jsx
function ae({ datos: e = [], alto: t = 132, tono: n = "var(--ds-accent-trazo)", pista: r = "var(--ds-surface-sunk)", ancho: i = 7, hueco: a = 5, animar: o = !0, ejeX: s = !1 }) {
	let c = t === "auto", l = Math.max(1, ...e.map((e) => e.total ?? e.valor ?? 0)), u = c ? {
		flex: "1 1 0",
		minWidth: 0,
		maxWidth: i * 2
	} : {
		width: i,
		flexShrink: 0
	}, d = c ? "var(--ds-r-item)" : 99;
	return /* @__PURE__ */ v("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			height: c ? "100%" : void 0,
			minHeight: 0
		},
		children: [/* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				alignItems: "flex-end",
				gap: a,
				justifyContent: "space-between",
				...c ? {
					flex: 1,
					minHeight: 72
				} : { height: t }
			},
			role: "img",
			"aria-label": `Serie de ${e.length} valores`,
			children: e.map((e, t) => {
				let i = e.total ?? e.valor ?? 0, a = e.valor ?? 0, s = i / l * 100, c = a / l * 100;
				return /* @__PURE__ */ v("div", {
					title: e.etiqueta,
					style: {
						position: "relative",
						height: "100%",
						...u
					},
					children: [/* @__PURE__ */ _("div", { style: {
						position: "absolute",
						inset: "auto 0 0 0",
						height: `max(3px, ${s}%)`,
						background: r,
						borderRadius: d
					} }), /* @__PURE__ */ _("div", { style: {
						position: "absolute",
						inset: "auto 0 0 0",
						height: a > 0 ? `max(3px, ${c}%)` : 0,
						background: e.tono || n,
						borderRadius: d,
						transformOrigin: "bottom",
						...o ? {
							animation: "ds-grow var(--ds-t-move) var(--ds-ease) both",
							animationDelay: `${Math.min(t * 22, 300)}ms`
						} : null
					} })]
				}, t);
			})
		}), s && /* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				gap: a,
				marginTop: 8,
				flexShrink: 0,
				justifyContent: "space-between"
			},
			children: e.map((e, t) => /* @__PURE__ */ _("div", {
				style: {
					...u,
					textAlign: "center",
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					color: "var(--ds-ink-3)"
				},
				children: e.eje ?? ""
			}, t))
		})]
	});
}
// src/primitivas/Pastilla.jsx
var B = {
	neutro: ["var(--ds-surface-sunk)", "var(--ds-ink-2)"],
	acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)"],
	ok: ["var(--ds-ok-soft)", "var(--ds-ok)"],
	aviso: ["var(--ds-warn-soft)", "var(--ds-warn)"],
	riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)"]
};
function V({ children: e, tono: t = "neutro", icono: n, estilo: r, ...i }) {
	let [a, o] = B[t] || B.neutro;
	return /* @__PURE__ */ v("span", {
		...i,
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 5,
			background: a,
			color: o,
			fontSize: "var(--ds-t-micro)",
			fontWeight: 600,
			letterSpacing: "0.02em",
			padding: "4px 10px",
			borderRadius: "var(--ds-r-pill)",
			whiteSpace: "nowrap",
			...r
		},
		children: [n, e]
	});
}
function oe({ children: e, tono: t = "acento", tamano: n = 38, estilo: r }) {
	let [i, a] = B[t] || B.acento;
	return /* @__PURE__ */ _("div", {
		style: {
			width: n,
			height: n,
			flexShrink: 0,
			borderRadius: "var(--ds-r-pill)",
			background: i,
			color: a,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			...r
		},
		children: e
	});
}
// src/primitivas/Boton.jsx
var se = {
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: 8,
	fontFamily: "var(--ds-font)",
	fontSize: "var(--ds-t-body)",
	fontWeight: 600,
	letterSpacing: "-0.005em",
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: "transparent",
	borderRadius: "var(--ds-r-item)",
	padding: "10px 18px",
	cursor: "pointer",
	transition: "transform var(--ds-t-tap) var(--ds-ease), background var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease)"
}, ce = {
	solido: {
		background: "var(--ds-accent)",
		color: "var(--ds-ink-on-accent)",
		boxShadow: "var(--ds-lift-accent)"
	},
	contorno: {
		background: "var(--ds-surface)",
		color: "var(--ds-ink)",
		borderColor: "var(--ds-line-firm)",
		boxShadow: "var(--ds-lift-1)"
	},
	fantasma: {
		background: "transparent",
		color: "var(--ds-ink-2)"
	},
	peligro: {
		background: "var(--ds-risk)",
		color: "var(--ds-surface-solid)"
	},
	claro: {
		background: "var(--ds-velo)",
		color: "var(--ds-ink-on-hero)",
		borderColor: "var(--ds-line-glass)",
		backdropFilter: "blur(12px)",
		WebkitBackdropFilter: "blur(12px)"
	}
}, le = "\n@keyframes ds-boton-gira { to { transform: rotate(360deg); } }\n@keyframes ds-boton-late { 50% { opacity: .35; } }\n.ds-boton-giro { width: 15px; height: 15px; flex-shrink: 0; border-radius: 50%;\n  border: 2px solid currentColor; border-right-color: transparent;\n  animation: ds-boton-gira .7s linear infinite; }\n@media (prefers-reduced-motion: reduce) { .ds-boton-giro { animation: ds-boton-late 1.2s ease-in-out infinite; } }\n";
function ue({ estilo: e }) {
	return /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _("style", { children: le }), /* @__PURE__ */ _("span", {
		className: "ds-boton-giro",
		"aria-hidden": !0,
		style: e
	})] });
}
function H({ children: e, variante: t = "contorno", icono: n, esperando: r = !1, disabled: i, pleno: a = !1, estilo: o, ...s }) {
	let c = i || r;
	return /* @__PURE__ */ v("button", {
		...s,
		disabled: c,
		"aria-busy": r || void 0,
		style: {
			...se,
			...ce[t],
			width: a ? "100%" : void 0,
			opacity: r ? .88 : i ? .55 : 1,
			cursor: r ? "progress" : i ? "not-allowed" : "pointer",
			...o
		},
		onMouseDown: (e) => {
			c || (e.currentTarget.style.transform = "scale(0.98)");
		},
		onMouseUp: (e) => {
			e.currentTarget.style.transform = "none";
		},
		onMouseLeave: (e) => {
			e.currentTarget.style.transform = "none";
		},
		children: [r ? /* @__PURE__ */ _(ue, {}) : n, e]
	});
}
// node_modules/blobatar/dist/blob.js
function de({ l: e, c: t, h: n }) {
	let r = n * Math.PI / 180, i = t * Math.cos(r), a = t * Math.sin(r), o = e + .3963377774 * i + .2158037573 * a, s = e - .1055613458 * i - .0638541728 * a, c = e - .0894841775 * i - 1.291485548 * a, l = o * o * o, u = s * s * s, d = c * c * c;
	return [
		4.0767416621 * l - 3.3077115913 * u + .2309699292 * d,
		-1.2684380046 * l + 2.6097574011 * u - .3413193965 * d,
		-.0041960863 * l - .7034186147 * u + 1.707614701 * d
	];
}
var fe = (e) => e.every((e) => e >= -1e-4 && e <= 1.0001);
function pe(e) {
	let t = de(e);
	if (!fe(t)) {
		let n = 0, r = e.c;
		for (let t = 0; t < 12; t++) {
			let t = (n + r) / 2;
			fe(de({
				...e,
				c: t
			})) ? n = t : r = t;
		}
		t = de({
			...e,
			c: n
		});
	}
	return t.map((e) => Math.min(1, Math.max(0, e)));
}
function me(e) {
	let [t, n, r] = pe(e);
	return .2126 * t + .7152 * n + .0722 * r;
}
function he(e, t) {
	let n = me(e), r = me(t);
	return (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
function ge(e, t, n) {
	if (he(e, t) >= n) return e;
	let r = e.l >= t.l ? 1 : -1;
	for (let i of [r, -r]) {
		let r = { ...e };
		for (let e = 0; e < 60; e++) {
			if (r.l = Math.min(1, Math.max(0, r.l + i * .02)), he(r, t) >= n) return r;
			if (r.l === 0 || r.l === 1) break;
		}
	}
	let i = {
		...e,
		l: 0,
		c: 0
	}, a = {
		...e,
		l: 1,
		c: 0
	};
	return he(i, t) >= he(a, t) ? i : a;
}
function _e(e) {
	return "#" + pe(e).map((e) => {
		let t = e <= .0031308 ? 12.92 * e : 1.055 * e ** .4166666666666667 - .055;
		return Math.round(t * 255).toString(16).padStart(2, "0");
	}).join("");
}
var ve = [
	[.2, {
		l: .86,
		c: .085
	}],
	[.36, {
		l: .9,
		c: .028
	}],
	[.62, {
		l: .73,
		c: .135
	}],
	[.8, {
		l: .62,
		c: .165
	}],
	[.93, {
		l: .87,
		c: .16
	}],
	[1, {
		l: .34,
		c: .035
	}]
], ye = (e) => ve.find(([t]) => e < t)?.[1] ?? ve[0][1], be = {
	l: .145,
	c: 0,
	h: 0
}, xe = 1.5, Se = (e, t) => {
	let n = ye(t), r = ge({
		l: n.l,
		c: n.c,
		h: e
	}, be, xe);
	return {
		bg: {
			l: .965,
			c: .01,
			h: e
		},
		head: r,
		eye: r.l >= .5 ? {
			l: .17,
			c: .02,
			h: e
		} : {
			l: .97,
			c: .012,
			h: e
		}
	};
}, Ce = [[
	"head",
	"bg",
	1.25
], [
	"eye",
	"head",
	4.5
]];
function we(e, t = !0, n = 0) {
	let r = Se(e, n);
	if (t) for (let [e, t, n] of Ce) r[e] = ge(r[e], r[t], n);
	return r;
}
function Te(e, t = !0, n = 0) {
	let r = we(e, t, n), i = {};
	for (let e in r) i[e] = _e(r[e]);
	return i;
}
var U = (e) => {
	let t = Math.round(e * 100) / 100;
	return Object.is(t, -0) ? "0" : String(t);
};
function Ee({ cx: e, cy: t, rx: n, ry: r, n: i = 4, rot: a = 0 }) {
	let o = Math.min(1, (8 * 2 ** (-1 / i) - 4) / 3), s = n, c = r, l = s * o, u = c * o, d = [
		[s, 0],
		[s, u],
		[l, c],
		[0, c],
		[-l, c],
		[-s, u],
		[-s, 0],
		[-s, -u],
		[-l, -c],
		[0, -c],
		[l, -c],
		[s, -u],
		[s, 0]
	], f = a * Math.PI / 180, p = Math.cos(f), m = Math.sin(f), h = (n) => {
		let [r, i] = d[n];
		return `${U(e + r * p - i * m)} ${U(t + r * m + i * p)}`;
	}, g = `M${h(0)}`;
	for (let e = 1; e < 13; e += 3) g += `C${h(e)} ${h(e + 1)} ${h(e + 2)}`;
	return g + "Z";
}
function De(e, t, n, r, i, a = 0) {
	let o = i.length, s = a * Math.PI / 180, c = i.map((i, a) => {
		let c = s + 2 * Math.PI * a / o;
		return [e + n * i * Math.cos(c), t + r * i * Math.sin(c)];
	}), l = (e) => c[(e % o + o) % o], u = `M${U(l(0)[0])} ${U(l(0)[1])}`;
	for (let e = 0; e < o; e++) {
		let [t, n] = l(e - 1), [r, i] = l(e), [a, o] = l(e + 1), [s, c] = l(e + 2);
		u += `C${U(r + (a - t) / 6)} ${U(i + (o - n) / 6)} ${U(a - (s - r) / 6)} ${U(o - (c - i) / 6)} ${U(a)} ${U(o)}`;
	}
	return u + "Z";
}
function Oe({ cx: e, cy: t, rx: n, ry: r, sides: i, round: a = .3, rot: o = 0 }) {
	let s = a > 0 ? a < 1 ? a / 2 : .5 : 0, c = o * Math.PI / 180 - Math.PI / 2, l = Array.from({ length: i }, (a, o) => {
		let s = c + 2 * Math.PI * o / i;
		return [e + n * Math.cos(s), t + r * Math.sin(s)];
	}), u = (e) => l[(e % i + i) % i], d = (e, t) => {
		let [n, r] = u(e), [i, a] = u(t);
		return `${U(n + (i - n) * s)} ${U(r + (a - r) * s)}`;
	}, f = `M${d(0, -1)}`;
	for (let e = 0; e < i; e++) {
		let [t, n] = u(e);
		f += `Q${U(t)} ${U(n)} ${d(e, e + 1)}`, s < .5 && (f += `L${d(e + 1, e)}`);
	}
	return f + "Z";
}
function ke(e, t, n, r) {
	let i = U(e - n), a = U(e + n);
	return `M${i} ${U(t - r)}H${a}V${U(t + r)}H${i}Z`;
}
function Ae(e, t, n, r, i) {
	let a = Math.max(1.05, i), o = n * Math.sqrt(1 - 1 / (a * a)), s = t - r / a, c = t - a * r, l = o * .14, u = s + .86 * (c - s);
	return `M${U(e - o)} ${U(s)}L${U(e - l)} ${U(u)}Q${U(e)} ${U(c)} ${U(e + l)} ${U(u)}L${U(e + o)} ${U(s)}Z`;
}
function je(e, t) {
	for (let n = 0; n < t.length; n++) e = Math.imul(e ^ t[n], 3432918353), e = e << 13 | e >>> 19;
	return e;
}
function Me(e) {
	return e = Math.imul(e ^ e >>> 16, 2246822507), e = Math.imul(e ^ e >>> 13, 3266489909), (e ^ e >>> 16) >>> 0;
}
var Ne = new TextEncoder();
function Pe(e) {
	return e.normalize("NFC").trim().toLowerCase();
}
function Fe(e, t = !0) {
	let n = t ? Pe(e) : e;
	return je(1779033703 ^ n.length, Ne.encode(n));
}
function Ie(e, t) {
	return Me(je(je(e, Uint8Array.of(255)), Ne.encode(t))) / 4294967296;
}
function Le(e, t = !0, n) {
	let r = Fe(e, t), i = (e) => {
		let t = n?.[e], i = Array.isArray(t) ? t[Math.floor(Ie(r, e) * t.length)] : t;
		return i === void 0 ? Ie(r, e) : i > 0 ? i < 1 ? i : .999999 : 0;
	};
	return i.num = (e, t, n) => t + i(e) * (n - t), i.int = (e, t, n) => t + Math.floor(i(e) * (n - t + 1)), i.pick = (e, t) => t[Math.floor(i(e) * t.length)], i.bool = (e, t = .5) => i(e) < t, i.jitter = (e, t) => (i(e) * 2 - 1) * t, i;
}
function Re(e, t, n) {
	let r = t.expression;
	return n || !r ? {
		l: e,
		wrap: ""
	} : r.bake(e, r.p);
}
var ze = (e, t) => t?.tint ? t.tint(e, t.p) : e, Be = (e, t) => t ? `<g transform="${t}">${e}</g>` : e, Ve = (e) => e.replace(/[&<>]/g, (e) => e === "&" ? "&amp;" : e === "<" ? "&lt;" : "&gt;");
function He(e, t) {
	let n = Le(e, t.normalize ?? !0, t.traits);
	return {
		t: n,
		palette: {
			...Te(t.hue ?? n.num("hue", 0, 360), t.contrast ?? !0, t.tone ?? n("tone")),
			...t.palette
		}
	};
}
var Ue = (e) => e.title ? `<title>${Ve(e.title)}</title>` : "";
function We(e, t, n) {
	let r = t.background ?? e.background;
	if (r !== !1) return {
		d: r === "square" ? "M0 0H100V100H0Z" : Ee({
			cx: 50,
			cy: 50,
			rx: 50,
			ry: 50,
			n: r === "circle" ? 2 : 6
		}),
		fill: n.bg
	};
}
var Ge = (e) => e ? `<path d="${e.d}" fill="${e.fill}"/>` : "";
function Ke(e) {
	return (t, n = {}) => {
		let { t: r, palette: i } = He(t, n), a = ze(i, n.expression), o = n.size ? ` width="${n.size}" height="${n.size}"` : "", s = Re(e.layout(r), n);
		return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"${o}>${Ue(n) + Ge(We(e, n, a)) + Be(e.render(s.l, a), s.wrap)}</svg>`;
	};
}
var qe = (e, t, n) => {
	let r = t.rx, i = e.num("eye.rx", .075, .105) * r, a = e.num("eye.ratio", 1.9, 3.2), o = e.num("eye.scale", .78, 1.24), s = e.num("eye.stretch", .85, 1.18), c = e.num("eye.gap", .1, .24) * r, l = i * Math.max(1, o), u = i * a * Math.max(1, o * s), d = l + r * .03 + c, f = e.jitter("gaze.x", .09) * n.rx, p = e.num("gaze.y", -.2, .08) * n.ry, m = e.jitter("eye.dy", .04) * n.ry, h = Math.hypot(l, u), g = Math.hypot((Math.abs(f) + d + h) / n.rx, (Math.abs(p) + Math.abs(m) + h) / n.ry), _ = g > .9 ? .9 / g : 1, v = i * _, y = v * a, b = d * _, x = Math.max(0, Math.min(1, c / u)), S = Math.min(12, Math.asin(x) * 180 / Math.PI), C = e.num("eye.lean", -1, 1) * S, w = Math.max(-12, Math.min(12, C + e.jitter("eye.lean2", 3.5))), T = n.cx + f * _, E = n.cy + p * _;
	return [{
		cx: T - b,
		cy: E,
		rx: v,
		ry: y,
		n: e.num("eye.n", 3.5, 6),
		rot: C
	}, {
		cx: T + b,
		cy: E + m * _,
		rx: v * o,
		ry: y * o * s,
		n: e.num("eye.n", 3.5, 6),
		rot: w
	}];
};
function Je(e, t) {
	let n = (t) => (e.find(([, e]) => t < e) ?? e[e.length - 1])[0];
	function r(e) {
		let r = n(e("shape")), i = e.num("body.r", 31, 38) * r.core, a = {
			cx: 50 + e.jitter("body.x", 1.5),
			cy: 50 + e.jitter("body.y", 1.5),
			rx: i,
			ry: i * e.num("body.ratio", .92, 1.08),
			n: e.num("body.n", 1.9, 2.5),
			rot: 0,
			radii: Array.from({ length: e.int("body.pts", 6, 8) }, (t, n) => 1 + e.jitter(`body.r${n}`, .16))
		};
		r.body?.(e, a);
		let o = r.face?.(a) ?? a, s = {
			petals: [],
			extra: []
		};
		return r.decorate?.(e, a, s), {
			shape: r.name,
			draw: r.path,
			body: a,
			face: o,
			petals: s.petals,
			extra: s.extra,
			eyes: t(e, a, o)
		};
	}
	function i(e, t, n) {
		let r = (e) => Math.round(e * 100) / 100, i = `<g fill="${t.head}">` + e.petals.map((e) => `<circle cx="${r(e.cx)}" cy="${r(e.cy)}" r="${r(e.r)}"/>`).join("") + e.extra.map((e) => `<path d="${e}"/>`).join("") + `<path d="${e.draw ? e.draw(e.body) : Ee(e.body)}"/></g><g fill="${t.eye}"${n ? " class=\"mo-eyes\"" : ""}>` + e.eyes.map((e, t) => {
			let i = `<path d="${Ee(e)}"/>`;
			return n ? `<g class="mo-eye" style="--mo-wrap:${t ? 1 : -1};--mo-lean:${r(e.rot)};transform-origin:${r(e.cx)}px ${r(e.cy)}px">${i}</g>` : i;
		}).join("") + "</g>";
		return n ? `<g class="mo-breathe"><g class="mo-bob">${i}</g></g>` : i;
	}
	return {
		layout: r,
		render: i,
		background: !1
	};
}
var Ye = (e) => Oe(e), Xe = (e) => De(e.cx, e.cy, e.rx, e.ry, e.radii, e.rot), Ze = (e) => (t) => ({
	cx: t.cx,
	cy: t.cy,
	rx: t.rx * e,
	ry: t.ry * e
}), Qe = (e) => Ze(Math.min(...e.radii) * .95)(e), $e = (e) => Ze(.84)(e), et = {
	name: "round",
	core: 1
}, tt = {
	name: "organic",
	core: .98,
	path: Xe,
	face: Qe
}, nt = {
	name: "boxy",
	core: .86,
	body: (e, t) => {
		t.n = e.num("body.n", 3.4, 6), t.rot = e.num("body.rot", -20, 20);
	}
}, rt = {
	name: "capsule",
	core: 1.02,
	body: (e, t) => {
		t.ry *= e.num("capsule.squat", .55, .68);
	},
	face: Ze(.94),
	decorate: (e, t, n) => {
		for (let e of [-1, 1]) n.petals.push({
			cx: t.cx + e * (t.rx - t.ry),
			cy: t.cy,
			r: t.ry
		});
	},
	path: (e) => ke(e.cx, e.cy, e.rx - e.ry, e.ry)
}, it = Je([
	[et, .22],
	[tt, .48],
	[nt, .6],
	[rt, .7],
	[{
		name: "nub",
		core: .88,
		decorate: (e, t, n) => {
			let r = e.int("nub.n", 1, 2);
			for (let i = 0; i < r; i++) {
				let r = e.num(`nub.a${i}`, 0, 2 * Math.PI);
				n.petals.push({
					cx: t.cx + Math.cos(r) * t.rx * .88,
					cy: t.cy + Math.sin(r) * t.rx * .88,
					r: t.rx * e.num(`nub.r${i}`, .24, .4)
				});
			}
		}
	}, .79],
	[{
		name: "cloud",
		core: .78,
		face: Qe,
		path: Xe,
		decorate: (e, t, n) => {
			let r = e.int("cloud.n", 4, 6);
			for (let i = 0; i < r; i++) {
				let a = Math.PI + Math.PI * (i + .5) / r;
				n.petals.push({
					cx: t.cx + Math.cos(a) * t.rx * .8,
					cy: t.cy + Math.sin(a) * t.rx * .5,
					r: t.rx * e.num(`cloud.r${i}`, .44, .62)
				});
			}
		}
	}, .86],
	[{
		name: "droplet",
		core: .78,
		body: (e, t) => {
			t.cy += .22 * t.ry, t.n = 2;
		},
		face: (e) => ({
			cx: e.cx,
			cy: e.cy + e.ry * .05,
			rx: e.rx * .88,
			ry: e.ry * .88
		}),
		decorate: (e, t, n) => {
			n.extra.push(Ae(t.cx, t.cy, t.rx, t.ry, e.num("droplet.tip", 1.4, 1.65)));
		}
	}, .915],
	[{
		name: "hexagon",
		core: 1.05,
		path: Ye,
		face: $e,
		body: (e, t) => {
			t.sides = 6, t.rot = e.num("body.rot", -12, 12), t.round = e.num("poly.round", .24, .5);
		}
	}, .95],
	[{
		name: "sun",
		core: .7,
		decorate: (e, t, n) => {
			let r = e.int("sun.n", 6, 9), i = t.rx * e.num("sun.dist", 1, 1.08), a = t.rx * e.num("sun.r", .2, .26), o = e.num("sun.rot", 0, 2 * Math.PI);
			for (let e = 0; e < r; e++) {
				let s = o + 2 * Math.PI * e / r;
				n.petals.push({
					cx: t.cx + Math.cos(s) * i,
					cy: t.cy + Math.sin(s) * i,
					r: a
				});
			}
		}
	}, .98],
	[{
		name: "triangle",
		core: 1.15,
		path: Ye,
		body: (e, t) => {
			t.sides = 3, t.rot = e.num("body.rot", -5, 5), t.round = e.num("poly.round", .24, .5);
		},
		face: (e) => ({
			cx: e.cx,
			cy: e.cy + e.ry * .1,
			rx: e.rx * .54,
			ry: e.ry * .36
		})
	}, 1]
], qe), at = Ke(it);
it.layout;
// node_modules/blobatar/dist/react.js
var ot = (e, t) => `mo-root${e === "always" ? " mo-always" : ""}${t ? " mo-expr" : ""}`;
function st(e) {
	let t = Math.round(e.num("motion.blink", 3500, 6500)), n = Math.round(e.num("motion.saccade", 4200, 7600)), r = e.num("motion.lookX", 1, 2.2), i = e.num("motion.lookY", .8, 1.7), a = (e) => Math.round(e * 100) / 100;
	return {
		phase: Math.round(e.num("motion.phase", 0, 2800)),
		bob: Math.round(e.num("motion.bob", 0, 3400)),
		blink: t,
		blinkPhase: Math.round(e.num("motion.blinkPhase", 0, t)),
		saccade: n,
		saccadePhase: Math.round(e.num("motion.saccadePhase", 0, n)),
		lookX: a(r) * (e.bool("motion.lookXFlip") ? -1 : 1),
		lookY: a(i) * (e.bool("motion.lookYFlip") ? -1 : 1),
		lookMX: a(r),
		lookMY: a(i)
	};
}
function ct(e) {
	let t = (e) => `${-e}ms`, n = st(e);
	return {
		"--mo-phase": t(n.phase),
		"--mo-bob-phase": t(n.bob),
		"--mo-blink": `${n.blink}ms`,
		"--mo-blink-phase": t(n.blinkPhase),
		"--mo-look-x": String(n.lookX),
		"--mo-look-mx": String(n.lookMX),
		"--mo-look-y": String(n.lookY),
		"--mo-look-my": String(n.lookMY),
		"--mo-saccade": `${n.saccade}ms`,
		"--mo-saccade-phase": t(n.saccadePhase)
	};
}
function lt({ l: e, c: t, h: n }) {
	let r = n * Math.PI / 180, i = t * Math.cos(r), a = t * Math.sin(r), o = e + .3963377774 * i + .2158037573 * a, s = e - .1055613458 * i - .0638541728 * a, c = e - .0894841775 * i - 1.291485548 * a, l = o * o * o, u = s * s * s, d = c * c * c;
	return [
		4.0767416621 * l - 3.3077115913 * u + .2309699292 * d,
		-1.2684380046 * l + 2.6097574011 * u - .3413193965 * d,
		-.0041960863 * l - .7034186147 * u + 1.707614701 * d
	];
}
var ut = (e) => e.every((e) => e >= -1e-4 && e <= 1.0001);
function dt(e) {
	let t = lt(e);
	if (!ut(t)) {
		let n = 0, r = e.c;
		for (let t = 0; t < 12; t++) {
			let t = (n + r) / 2;
			ut(lt({
				...e,
				c: t
			})) ? n = t : r = t;
		}
		t = lt({
			...e,
			c: n
		});
	}
	return t.map((e) => Math.min(1, Math.max(0, e)));
}
function ft(e) {
	let [t, n, r] = dt(e);
	return .2126 * t + .7152 * n + .0722 * r;
}
function pt(e, t) {
	let n = ft(e), r = ft(t);
	return (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
function mt(e, t, n) {
	if (pt(e, t) >= n) return e;
	let r = e.l >= t.l ? 1 : -1;
	for (let i of [r, -r]) {
		let r = { ...e };
		for (let e = 0; e < 60; e++) {
			if (r.l = Math.min(1, Math.max(0, r.l + i * .02)), pt(r, t) >= n) return r;
			if (r.l === 0 || r.l === 1) break;
		}
	}
	let i = {
		...e,
		l: 0,
		c: 0
	}, a = {
		...e,
		l: 1,
		c: 0
	};
	return pt(i, t) >= pt(a, t) ? i : a;
}
function ht(e) {
	return "#" + dt(e).map((e) => {
		let t = e <= .0031308 ? 12.92 * e : 1.055 * e ** .4166666666666667 - .055;
		return Math.round(t * 255).toString(16).padStart(2, "0");
	}).join("");
}
var gt = [
	[.2, {
		l: .86,
		c: .085
	}],
	[.36, {
		l: .9,
		c: .028
	}],
	[.62, {
		l: .73,
		c: .135
	}],
	[.8, {
		l: .62,
		c: .165
	}],
	[.93, {
		l: .87,
		c: .16
	}],
	[1, {
		l: .34,
		c: .035
	}]
], _t = (e) => gt.find(([t]) => e < t)?.[1] ?? gt[0][1], vt = {
	l: .145,
	c: 0,
	h: 0
}, yt = 1.5, bt = (e, t) => {
	let n = _t(t), r = mt({
		l: n.l,
		c: n.c,
		h: e
	}, vt, yt);
	return {
		bg: {
			l: .965,
			c: .01,
			h: e
		},
		head: r,
		eye: r.l >= .5 ? {
			l: .17,
			c: .02,
			h: e
		} : {
			l: .97,
			c: .012,
			h: e
		}
	};
}, xt = [[
	"head",
	"bg",
	1.25
], [
	"eye",
	"head",
	4.5
]];
function St(e, t = !0, n = 0) {
	let r = bt(e, n);
	if (t) for (let [e, t, n] of xt) r[e] = mt(r[e], r[t], n);
	return r;
}
function Ct(e, t = !0, n = 0) {
	let r = St(e, t, n), i = {};
	for (let e in r) i[e] = ht(r[e]);
	return i;
}
var W = (e) => {
	let t = Math.round(e * 100) / 100;
	return Object.is(t, -0) ? "0" : String(t);
};
function wt({ cx: e, cy: t, rx: n, ry: r, n: i = 4, rot: a = 0 }) {
	let o = Math.min(1, (8 * 2 ** (-1 / i) - 4) / 3), s = n, c = r, l = s * o, u = c * o, d = [
		[s, 0],
		[s, u],
		[l, c],
		[0, c],
		[-l, c],
		[-s, u],
		[-s, 0],
		[-s, -u],
		[-l, -c],
		[0, -c],
		[l, -c],
		[s, -u],
		[s, 0]
	], f = a * Math.PI / 180, p = Math.cos(f), m = Math.sin(f), h = (n) => {
		let [r, i] = d[n];
		return `${W(e + r * p - i * m)} ${W(t + r * m + i * p)}`;
	}, g = `M${h(0)}`;
	for (let e = 1; e < 13; e += 3) g += `C${h(e)} ${h(e + 1)} ${h(e + 2)}`;
	return g + "Z";
}
function Tt(e, t, n, r, i, a = 0) {
	let o = i.length, s = a * Math.PI / 180, c = i.map((i, a) => {
		let c = s + 2 * Math.PI * a / o;
		return [e + n * i * Math.cos(c), t + r * i * Math.sin(c)];
	}), l = (e) => c[(e % o + o) % o], u = `M${W(l(0)[0])} ${W(l(0)[1])}`;
	for (let e = 0; e < o; e++) {
		let [t, n] = l(e - 1), [r, i] = l(e), [a, o] = l(e + 1), [s, c] = l(e + 2);
		u += `C${W(r + (a - t) / 6)} ${W(i + (o - n) / 6)} ${W(a - (s - r) / 6)} ${W(o - (c - i) / 6)} ${W(a)} ${W(o)}`;
	}
	return u + "Z";
}
function Et({ cx: e, cy: t, rx: n, ry: r, sides: i, round: a = .3, rot: o = 0 }) {
	let s = a > 0 ? a < 1 ? a / 2 : .5 : 0, c = o * Math.PI / 180 - Math.PI / 2, l = Array.from({ length: i }, (a, o) => {
		let s = c + 2 * Math.PI * o / i;
		return [e + n * Math.cos(s), t + r * Math.sin(s)];
	}), u = (e) => l[(e % i + i) % i], d = (e, t) => {
		let [n, r] = u(e), [i, a] = u(t);
		return `${W(n + (i - n) * s)} ${W(r + (a - r) * s)}`;
	}, f = `M${d(0, -1)}`;
	for (let e = 0; e < i; e++) {
		let [t, n] = u(e);
		f += `Q${W(t)} ${W(n)} ${d(e, e + 1)}`, s < .5 && (f += `L${d(e + 1, e)}`);
	}
	return f + "Z";
}
function Dt(e, t, n, r) {
	let i = W(e - n), a = W(e + n);
	return `M${i} ${W(t - r)}H${a}V${W(t + r)}H${i}Z`;
}
function Ot(e, t, n, r, i) {
	let a = Math.max(1.05, i), o = n * Math.sqrt(1 - 1 / (a * a)), s = t - r / a, c = t - a * r, l = o * .14, u = s + .86 * (c - s);
	return `M${W(e - o)} ${W(s)}L${W(e - l)} ${W(u)}Q${W(e)} ${W(c)} ${W(e + l)} ${W(u)}L${W(e + o)} ${W(s)}Z`;
}
function kt(e, t) {
	for (let n = 0; n < t.length; n++) e = Math.imul(e ^ t[n], 3432918353), e = e << 13 | e >>> 19;
	return e;
}
function At(e) {
	return e = Math.imul(e ^ e >>> 16, 2246822507), e = Math.imul(e ^ e >>> 13, 3266489909), (e ^ e >>> 16) >>> 0;
}
var jt = new TextEncoder();
function Mt(e) {
	return e.normalize("NFC").trim().toLowerCase();
}
function Nt(e, t = !0) {
	let n = t ? Mt(e) : e;
	return kt(1779033703 ^ n.length, jt.encode(n));
}
function Pt(e, t) {
	return At(kt(kt(e, Uint8Array.of(255)), jt.encode(t))) / 4294967296;
}
function Ft(e, t = !0, n) {
	let r = Nt(e, t), i = (e) => {
		let t = n?.[e], i = Array.isArray(t) ? t[Math.floor(Pt(r, e) * t.length)] : t;
		return i === void 0 ? Pt(r, e) : i > 0 ? i < 1 ? i : .999999 : 0;
	};
	return i.num = (e, t, n) => t + i(e) * (n - t), i.int = (e, t, n) => t + Math.floor(i(e) * (n - t + 1)), i.pick = (e, t) => t[Math.floor(i(e) * t.length)], i.bool = (e, t = .5) => i(e) < t, i.jitter = (e, t) => (i(e) * 2 - 1) * t, i;
}
function It(e, t, n) {
	let r = t.expression;
	return n || !r ? {
		l: e,
		wrap: ""
	} : r.bake(e, r.p);
}
var Lt = (e, t) => t?.tint ? t.tint(e, t.p) : e, Rt = (e, t) => t ? `<g transform="${t}">${e}</g>` : e, zt = (e) => e.replace(/[&<>]/g, (e) => e === "&" ? "&amp;" : e === "<" ? "&lt;" : "&gt;");
function Bt(e, t) {
	let n = Ft(e, t.normalize ?? !0, t.traits);
	return {
		t: n,
		palette: {
			...Ct(t.hue ?? n.num("hue", 0, 360), t.contrast ?? !0, t.tone ?? n("tone")),
			...t.palette
		}
	};
}
var Vt = (e) => e.title ? `<title>${zt(e.title)}</title>` : "";
function Ht(e, t, n) {
	let r = t.background ?? e.background;
	if (r !== !1) return {
		d: r === "square" ? "M0 0H100V100H0Z" : wt({
			cx: 50,
			cy: 50,
			rx: 50,
			ry: 50,
			n: r === "circle" ? 2 : 6
		}),
		fill: n.bg
	};
}
var Ut = (e) => e ? `<path d="${e.d}" fill="${e.fill}"/>` : "";
function Wt(e) {
	return (t, n = {}) => {
		let { t: r, palette: i } = Bt(t, n), a = Lt(i, n.expression), o = n.size ? ` width="${n.size}" height="${n.size}"` : "", s = It(e.layout(r), n);
		return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"${o}>${Vt(n) + Ut(Ht(e, n, a)) + Rt(e.render(s.l, a), s.wrap)}</svg>`;
	};
}
function Gt(e) {
	return (t, n = {}, r) => {
		let { t: i, palette: a } = Bt(t, n), o = r?.(i, a), s = It(e.layout(i), n, o);
		return {
			cls: o?.cls,
			bg: Ht(e, n, a),
			inner: Rt(e.render(s.l, a, !!o), s.wrap),
			vars: o?.vars
		};
	};
}
var Kt = (e, t, n) => {
	let r = t.rx, i = e.num("eye.rx", .075, .105) * r, a = e.num("eye.ratio", 1.9, 3.2), o = e.num("eye.scale", .78, 1.24), s = e.num("eye.stretch", .85, 1.18), c = e.num("eye.gap", .1, .24) * r, l = i * Math.max(1, o), u = i * a * Math.max(1, o * s), d = l + r * .03 + c, f = e.jitter("gaze.x", .09) * n.rx, p = e.num("gaze.y", -.2, .08) * n.ry, m = e.jitter("eye.dy", .04) * n.ry, h = Math.hypot(l, u), g = Math.hypot((Math.abs(f) + d + h) / n.rx, (Math.abs(p) + Math.abs(m) + h) / n.ry), _ = g > .9 ? .9 / g : 1, v = i * _, y = v * a, b = d * _, x = Math.max(0, Math.min(1, c / u)), S = Math.min(12, Math.asin(x) * 180 / Math.PI), C = e.num("eye.lean", -1, 1) * S, w = Math.max(-12, Math.min(12, C + e.jitter("eye.lean2", 3.5))), T = n.cx + f * _, E = n.cy + p * _;
	return [{
		cx: T - b,
		cy: E,
		rx: v,
		ry: y,
		n: e.num("eye.n", 3.5, 6),
		rot: C
	}, {
		cx: T + b,
		cy: E + m * _,
		rx: v * o,
		ry: y * o * s,
		n: e.num("eye.n", 3.5, 6),
		rot: w
	}];
};
function qt(e, t) {
	let n = (t) => (e.find(([, e]) => t < e) ?? e[e.length - 1])[0];
	function r(e) {
		let r = n(e("shape")), i = e.num("body.r", 31, 38) * r.core, a = {
			cx: 50 + e.jitter("body.x", 1.5),
			cy: 50 + e.jitter("body.y", 1.5),
			rx: i,
			ry: i * e.num("body.ratio", .92, 1.08),
			n: e.num("body.n", 1.9, 2.5),
			rot: 0,
			radii: Array.from({ length: e.int("body.pts", 6, 8) }, (t, n) => 1 + e.jitter(`body.r${n}`, .16))
		};
		r.body?.(e, a);
		let o = r.face?.(a) ?? a, s = {
			petals: [],
			extra: []
		};
		return r.decorate?.(e, a, s), {
			shape: r.name,
			draw: r.path,
			body: a,
			face: o,
			petals: s.petals,
			extra: s.extra,
			eyes: t(e, a, o)
		};
	}
	function i(e, t, n) {
		let r = (e) => Math.round(e * 100) / 100, i = `<g fill="${t.head}">` + e.petals.map((e) => `<circle cx="${r(e.cx)}" cy="${r(e.cy)}" r="${r(e.r)}"/>`).join("") + e.extra.map((e) => `<path d="${e}"/>`).join("") + `<path d="${e.draw ? e.draw(e.body) : wt(e.body)}"/></g><g fill="${t.eye}"${n ? " class=\"mo-eyes\"" : ""}>` + e.eyes.map((e, t) => {
			let i = `<path d="${wt(e)}"/>`;
			return n ? `<g class="mo-eye" style="--mo-wrap:${t ? 1 : -1};--mo-lean:${r(e.rot)};transform-origin:${r(e.cx)}px ${r(e.cy)}px">${i}</g>` : i;
		}).join("") + "</g>";
		return n ? `<g class="mo-breathe"><g class="mo-bob">${i}</g></g>` : i;
	}
	return {
		layout: r,
		render: i,
		background: !1
	};
}
var Jt = (e) => Et(e), Yt = (e) => Tt(e.cx, e.cy, e.rx, e.ry, e.radii, e.rot), Xt = (e) => (t) => ({
	cx: t.cx,
	cy: t.cy,
	rx: t.rx * e,
	ry: t.ry * e
}), Zt = (e) => Xt(Math.min(...e.radii) * .95)(e), Qt = (e) => Xt(.84)(e), $t = {
	name: "round",
	core: 1
}, en = {
	name: "organic",
	core: .98,
	path: Yt,
	face: Zt
}, tn = {
	name: "boxy",
	core: .86,
	body: (e, t) => {
		t.n = e.num("body.n", 3.4, 6), t.rot = e.num("body.rot", -20, 20);
	}
}, nn = {
	name: "capsule",
	core: 1.02,
	body: (e, t) => {
		t.ry *= e.num("capsule.squat", .55, .68);
	},
	face: Xt(.94),
	decorate: (e, t, n) => {
		for (let e of [-1, 1]) n.petals.push({
			cx: t.cx + e * (t.rx - t.ry),
			cy: t.cy,
			r: t.ry
		});
	},
	path: (e) => Dt(e.cx, e.cy, e.rx - e.ry, e.ry)
}, rn = qt([
	[$t, .22],
	[en, .48],
	[tn, .6],
	[nn, .7],
	[{
		name: "nub",
		core: .88,
		decorate: (e, t, n) => {
			let r = e.int("nub.n", 1, 2);
			for (let i = 0; i < r; i++) {
				let r = e.num(`nub.a${i}`, 0, 2 * Math.PI);
				n.petals.push({
					cx: t.cx + Math.cos(r) * t.rx * .88,
					cy: t.cy + Math.sin(r) * t.rx * .88,
					r: t.rx * e.num(`nub.r${i}`, .24, .4)
				});
			}
		}
	}, .79],
	[{
		name: "cloud",
		core: .78,
		face: Zt,
		path: Yt,
		decorate: (e, t, n) => {
			let r = e.int("cloud.n", 4, 6);
			for (let i = 0; i < r; i++) {
				let a = Math.PI + Math.PI * (i + .5) / r;
				n.petals.push({
					cx: t.cx + Math.cos(a) * t.rx * .8,
					cy: t.cy + Math.sin(a) * t.rx * .5,
					r: t.rx * e.num(`cloud.r${i}`, .44, .62)
				});
			}
		}
	}, .86],
	[{
		name: "droplet",
		core: .78,
		body: (e, t) => {
			t.cy += .22 * t.ry, t.n = 2;
		},
		face: (e) => ({
			cx: e.cx,
			cy: e.cy + e.ry * .05,
			rx: e.rx * .88,
			ry: e.ry * .88
		}),
		decorate: (e, t, n) => {
			n.extra.push(Ot(t.cx, t.cy, t.rx, t.ry, e.num("droplet.tip", 1.4, 1.65)));
		}
	}, .915],
	[{
		name: "hexagon",
		core: 1.05,
		path: Jt,
		face: Qt,
		body: (e, t) => {
			t.sides = 6, t.rot = e.num("body.rot", -12, 12), t.round = e.num("poly.round", .24, .5);
		}
	}, .95],
	[{
		name: "sun",
		core: .7,
		decorate: (e, t, n) => {
			let r = e.int("sun.n", 6, 9), i = t.rx * e.num("sun.dist", 1, 1.08), a = t.rx * e.num("sun.r", .2, .26), o = e.num("sun.rot", 0, 2 * Math.PI);
			for (let e = 0; e < r; e++) {
				let s = o + 2 * Math.PI * e / r;
				n.petals.push({
					cx: t.cx + Math.cos(s) * i,
					cy: t.cy + Math.sin(s) * i,
					r: a
				});
			}
		}
	}, .98],
	[{
		name: "triangle",
		core: 1.15,
		path: Jt,
		body: (e, t) => {
			t.sides = 3, t.rot = e.num("body.rot", -5, 5), t.round = e.num("poly.round", .24, .5);
		},
		face: (e) => ({
			cx: e.cx,
			cy: e.cy + e.ry * .1,
			rx: e.rx * .54,
			ry: e.ry * .36
		})
	}, 1]
], Kt), an = Wt(rn), on = (e, t) => (n, r) => {
	let i = t ? t.vars(t.p) : {}, a = t?.tint ? t.tint(r, t.p) : r;
	return {
		cls: ot(e, !!Object.keys(i).length || !!t?.tint),
		vars: {
			...ct(n),
			"--mo-head": a.head,
			"--mo-eye": a.eye,
			...i
		}
	};
};
function sn(e, t = {}) {
	return Gt(rn)(e, t, t.animate && on(t.animate, t.expression));
}
function cn(e, t) {
	return "data:image/svg+xml," + an(e, t).replace(/"/g, "'").replace(/[%#<>{}|\\^[\]`]/g, (e) => "%" + e.charCodeAt(0).toString(16).toUpperCase()).replace(/\s+/g, " ");
}
function ln({ name: e, size: t, background: n, palette: r, hue: i, tone: a, normalize: o, contrast: s, title: c, animate: l, expression: u, traits: d, ...f }) {
	let m = {
		size: t,
		background: n,
		palette: r,
		hue: i,
		tone: a,
		normalize: o,
		contrast: s,
		title: c,
		expression: u,
		traits: d
	}, h = JSON.stringify([
		e,
		m,
		l
	]), g = p(() => l ? "" : cn(e, m), [h]), y = p(() => l ? sn(e, {
		...m,
		animate: l
	}) : null, [h]), b = p(() => ({ __html: y?.inner ?? "" }), [y?.inner]);
	if (y) {
		let { style: e, ...n } = f;
		return v("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 100 100",
			width: t,
			height: t,
			role: c ? "img" : void 0,
			"aria-hidden": !c || void 0,
			style: {
				...y.vars,
				...e
			},
			...n,
			children: [
				c ? _("title", { children: c }) : null,
				y.bg ? _("path", {
					d: y.bg.d,
					fill: y.bg.fill
				}) : null,
				_("g", {
					className: y.cls,
					dangerouslySetInnerHTML: b
				})
			]
		});
	}
	let { alt: x, ...S } = f;
	return _("img", {
		src: g,
		width: t,
		height: t,
		alt: x ?? c ?? "",
		...S
	});
}
// src/primitivas/Fila.jsx
function un({ izquierda: e, titulo: t, subtitulo: n, derecha: r, extremo: i, onClick: a, estilo: o, entrada: s, ...c }) {
	let l = !!a;
	return /* @__PURE__ */ v("div", {
		...c,
		onClick: a,
		role: l ? "button" : void 0,
		tabIndex: l ? 0 : void 0,
		onKeyDown: l ? (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), a(e));
		} : void 0,
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-3)",
			padding: "var(--ds-3) var(--ds-4)",
			borderRadius: "var(--ds-r-item)",
			cursor: l ? "pointer" : void 0,
			transition: "background var(--ds-t-state) var(--ds-ease)",
			...s === void 0 ? null : {
				animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
				animationDelay: `${Math.min(s * 28, 260)}ms`
			},
			...o
		},
		onMouseEnter: l ? (e) => {
			e.currentTarget.style.background = "var(--ds-surface-2)";
		} : void 0,
		onMouseLeave: l ? (e) => {
			e.currentTarget.style.background = "transparent";
		} : void 0,
		children: [
			e,
			/* @__PURE__ */ v("div", {
				style: {
					flex: 1,
					minWidth: 0
				},
				children: [/* @__PURE__ */ _("div", {
					style: {
						fontSize: "var(--ds-t-body)",
						fontWeight: 600,
						color: "var(--ds-ink)",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis"
					},
					children: t
				}), n && /* @__PURE__ */ _("div", {
					style: {
						fontSize: "var(--ds-t-small)",
						color: "var(--ds-ink-3)",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis"
					},
					children: n
				})]
			}),
			r && /* @__PURE__ */ _("div", {
				style: {
					flexShrink: 0,
					textAlign: "right"
				},
				children: r
			}),
			i && /* @__PURE__ */ _("div", {
				style: { flexShrink: 0 },
				children: i
			})
		]
	});
}
function dn({ src: e, nombre: t = "", tamano: n = 40, tono: r = "acento", generico: i = !1, figura: a = !1, animada: s = !1 }) {
	let [c, l] = o.useState(!1);
	o.useEffect(() => {
		l(!1);
	}, [e]);
	let u = t.split(" ").filter(Boolean).slice(0, 2).map((e) => e[0]).join("").toUpperCase(), d = e && !c, f = a && !d && !!t.trim(), p = f && (s === "hover" || s === "siempre"), m = o.useMemo(() => f && !p ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(at(t))}` : null, [
		f,
		p,
		t
	]), h = i && !f;
	return /* @__PURE__ */ _("div", {
		style: {
			width: n,
			height: n,
			flexShrink: 0,
			borderRadius: "var(--ds-r-pill)",
			background: h && !d ? "var(--ds-retrato-neutro)" : r === "acento" ? "var(--ds-accent-soft)" : "var(--ds-retrato-neutro)",
			color: h ? "var(--ds-ink-3)" : r === "acento" ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)",
			overflow: "hidden",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			fontSize: n * .34,
			fontWeight: 700,
			letterSpacing: "-0.02em"
		},
		children: d ? /* @__PURE__ */ _("img", {
			src: e,
			alt: "",
			onError: () => l(!0),
			style: {
				width: "100%",
				height: "100%",
				objectFit: "cover"
			}
		}) : p ? /* @__PURE__ */ _(ln, {
			name: t,
			animate: s === "siempre" ? "always" : "hover",
			"aria-hidden": "true",
			focusable: "false",
			style: {
				width: "90%",
				height: "90%",
				display: "block"
			}
		}) : f ? /* @__PURE__ */ _("img", {
			src: m,
			alt: "",
			draggable: !1,
			style: {
				width: "90%",
				height: "90%",
				display: "block"
			}
		}) : h ? /* @__PURE__ */ v("svg", {
			viewBox: "0 0 40 40",
			width: "100%",
			height: "100%",
			"aria-hidden": !0,
			style: { display: "block" },
			children: [/* @__PURE__ */ _("circle", {
				cx: "20",
				cy: "15.5",
				r: "7.2",
				fill: "currentColor",
				opacity: "0.55"
			}), /* @__PURE__ */ _("path", {
				d: "M5.5 40c0-8.6 6.5-14.2 14.5-14.2S34.5 31.4 34.5 40z",
				fill: "currentColor",
				opacity: "0.55"
			})]
		}) : u
	});
}
// src/primitivas/Seccion.jsx
function fn({ titulo: e, nota: t, accion: n, children: r, estilo: i }) {
	return /* @__PURE__ */ v("div", {
		style: { ...i },
		children: [/* @__PURE__ */ v("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: "var(--ds-3)",
				marginBottom: "var(--ds-4)"
			},
			children: [
				/* @__PURE__ */ v("div", {
					style: { minWidth: 0 },
					children: [/* @__PURE__ */ _("h2", {
						style: {
							margin: 0,
							fontSize: "var(--ds-t-title)",
							fontWeight: 700,
							letterSpacing: "-0.03em",
							lineHeight: 1.15,
							color: "var(--ds-ink)"
						},
						children: e
					}), t && /* @__PURE__ */ _("div", {
						style: {
							fontSize: "var(--ds-t-small)",
							fontWeight: 600,
							color: "var(--ds-ink-3)",
							marginTop: 3
						},
						children: t
					})]
				}),
				/* @__PURE__ */ _("div", { style: {
					flex: 1,
					height: 1,
					minWidth: 0,
					background: "linear-gradient(90deg, var(--ds-line-firm), transparent)"
				} }),
				n
			]
		}), r]
	});
}
// src/ancho.js
function G(e = 760) {
	return pn(`(max-width: ${e}px)`);
}
function pn(e) {
	let [t, n] = h(() => typeof window < "u" && !!window.matchMedia && window.matchMedia(e).matches);
	return u(() => {
		if (typeof window > "u" || !window.matchMedia) return;
		let t = window.matchMedia(e), r = (e) => n(e.matches);
		return n(t.matches), t.addEventListener("change", r), () => t.removeEventListener("change", r);
	}, [e]), t;
}
var mn = {
	containerType: "inline-size",
	minWidth: 0
};
function hn(e, t) {
	return `min(${e}, calc(100cqi / ${(Math.max(4, String(t ?? "").length) * .62).toFixed(2)}))`;
}
// src/primitivas/Migas.jsx
var gn = /* @__PURE__ */ _("svg", {
	width: "13",
	height: "13",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	style: {
		flexShrink: 0,
		opacity: .55
	},
	children: /* @__PURE__ */ _("path", { d: "M9 18l6-6-6-6" })
}), _n = /* @__PURE__ */ _("svg", {
	width: "15",
	height: "15",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	style: { flexShrink: 0 },
	children: /* @__PURE__ */ _("path", { d: "M19 12H5M12 19l-7-7 7-7" })
}), vn = {
	display: "inline-flex",
	alignItems: "center",
	gap: 6,
	fontFamily: "var(--ds-font)",
	fontSize: "var(--ds-t-small)",
	fontWeight: 600,
	background: "transparent",
	border: "none",
	padding: "4px 6px",
	borderRadius: 8,
	cursor: "pointer",
	color: "var(--ds-ink-3)",
	whiteSpace: "nowrap",
	maxWidth: 240,
	overflow: "hidden",
	textOverflow: "ellipsis",
	transition: "color var(--ds-t-state) var(--ds-ease)"
};
function yn({ ruta: e = [], estilo: t }) {
	let n = G();
	if (e.length === 0) return null;
	let r = e[e.length - 1], i = e.length > 1 ? e[e.length - 2] : null, a = i && i.ir ? /* @__PURE__ */ v("button", {
		onClick: i.ir,
		style: {
			...vn,
			color: "var(--ds-ink-2)",
			fontWeight: 600
		},
		onMouseEnter: (e) => {
			e.currentTarget.style.color = "var(--ds-accent-tinta)";
		},
		onMouseLeave: (e) => {
			e.currentTarget.style.color = "var(--ds-ink-2)";
		},
		children: [
			_n,
			" Volver a ",
			i.texto
		]
	}) : null;
	return n ? a ? /* @__PURE__ */ _("div", {
		style: {
			marginBottom: "var(--ds-3)",
			...t
		},
		children: a
	}) : null : /* @__PURE__ */ v("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-3)",
			flexWrap: "wrap",
			marginBottom: "var(--ds-3)",
			...t
		},
		children: [
			a,
			a && /* @__PURE__ */ _("span", {
				"aria-hidden": !0,
				style: {
					width: 1,
					height: 16,
					background: "var(--ds-line-firm)",
					opacity: .7
				}
			}),
			/* @__PURE__ */ _("nav", {
				"aria-label": "Ruta",
				children: /* @__PURE__ */ _("ol", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 2,
						flexWrap: "wrap",
						listStyle: "none",
						margin: 0,
						padding: 0
					},
					children: e.map((t, n) => {
						let r = n === e.length - 1;
						return /* @__PURE__ */ v("li", {
							style: {
								display: "inline-flex",
								alignItems: "center",
								gap: 2,
								minWidth: 0
							},
							children: [n > 0 && /* @__PURE__ */ _("span", {
								style: {
									color: "var(--ds-ink-3)",
									display: "inline-flex"
								},
								children: gn
							}), r || !t.ir ? /* @__PURE__ */ _("span", {
								"aria-current": r ? "page" : void 0,
								style: {
									...vn,
									cursor: "default",
									color: r ? "var(--ds-ink)" : "var(--ds-ink-3)",
									fontWeight: r ? 700 : 600
								},
								children: t.texto
							}) : /* @__PURE__ */ _("button", {
								onClick: t.ir,
								style: vn,
								onMouseEnter: (e) => {
									e.currentTarget.style.color = "var(--ds-ink)";
								},
								onMouseLeave: (e) => {
									e.currentTarget.style.color = "var(--ds-ink-3)";
								},
								children: t.texto
							})]
						}, `${t.texto}-${n}`);
					})
				})
			}),
			/* @__PURE__ */ _("span", { style: { flex: 1 } }),
			r?.accion
		]
	});
}
// src/primitivas/Barra.jsx
function bn({ marca: e, secciones: t = [], activa: n, onIr: r, derecha: i, estilo: a }) {
	return /* @__PURE__ */ v("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-2)",
			background: "var(--ds-frame)",
			color: "var(--ds-ink-on-dark)",
			borderRadius: "var(--ds-r-pill)",
			padding: "var(--ds-2)",
			boxShadow: "var(--ds-lift-3)",
			flexWrap: "wrap",
			...a
		},
		children: [
			e && /* @__PURE__ */ _("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 8,
					padding: "6px 14px 6px 10px",
					fontWeight: 700,
					fontSize: "var(--ds-t-body)",
					letterSpacing: "-0.02em"
				},
				children: e
			}),
			t.map((e) => {
				let t = e.id === n;
				return /* @__PURE__ */ v("button", {
					onClick: () => r?.(e),
					"aria-current": t ? "page" : void 0,
					style: {
						display: "inline-flex",
						alignItems: "center",
						gap: 7,
						fontFamily: "var(--ds-font)",
						fontSize: "var(--ds-t-small)",
						fontWeight: 600,
						padding: "8px 14px",
						borderRadius: "var(--ds-r-pill)",
						border: "none",
						cursor: "pointer",
						background: t ? "rgba(255,255,255,0.14)" : "transparent",
						color: t ? "#FFFFFF" : "rgba(255,255,255,0.62)",
						transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
					},
					onMouseEnter: (e) => {
						t || (e.currentTarget.style.color = "#FFFFFF");
					},
					onMouseLeave: (e) => {
						t || (e.currentTarget.style.color = "rgba(255,255,255,0.62)");
					},
					children: [e.icono, e.texto]
				}, e.id);
			}),
			/* @__PURE__ */ _("div", { style: { flex: 1 } }),
			i
		]
	});
}
// src/primitivas/Lamina.jsx
function xn({ imagen: e, imagenChica: t, alt: n = "", alto: r = 200, children: i, pie: a, radio: s = "var(--ds-r-card)", encima: c = !0, encuadre: l = "center", fondo: u = !1, estilo: d, entrada: f, ...p }) {
	let [m, h] = o.useState(!1), y = ({ estiloExtra: r }) => /* @__PURE__ */ _("img", {
		src: e,
		srcSet: t ? `${t} 800w, ${e} 1600w` : void 0,
		sizes: t ? "(max-width: 760px) 100vw, 640px" : void 0,
		alt: n,
		loading: "lazy",
		decoding: "async",
		onError: () => h(!0),
		style: {
			width: "100%",
			height: "100%",
			objectFit: "cover",
			objectPosition: l,
			display: "block",
			...r
		}
	});
	return u ? /* @__PURE__ */ v("div", {
		...p,
		style: {
			position: "relative",
			overflow: "hidden",
			borderRadius: s,
			display: "flex",
			flexDirection: "column",
			background: "var(--ds-hero)",
			border: "none",
			boxShadow: "var(--ds-lift-2)",
			isolation: "isolate",
			...f === void 0 ? null : {
				animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
				animationDelay: `${Math.min(f * 55, 240)}ms`
			},
			...d
		},
		children: [
			e && !m && /* @__PURE__ */ _("div", {
				"aria-hidden": !0,
				style: {
					position: "absolute",
					inset: 0,
					zIndex: 0,
					filter: "saturate(1.35) contrast(1.06)"
				},
				children: /* @__PURE__ */ _(y, {})
			}),
			/* @__PURE__ */ _("div", {
				"aria-hidden": !0,
				style: {
					position: "absolute",
					inset: 0,
					zIndex: 1,
					background: "linear-gradient(to bottom, rgba(8,9,15,0.26) 0%, rgba(8,9,15,0.58) 32%, rgba(8,9,15,0.82) 66%, rgba(8,9,15,0.92) 100%)"
				}
			}),
			/* @__PURE__ */ _("div", {
				className: "ds-sobre-foto",
				style: {
					position: "relative",
					zIndex: 2,
					padding: "var(--ds-5)",
					display: "flex",
					flexDirection: "column",
					flex: 1,
					minHeight: 0
				},
				children: i
			})
		]
	}) : /* @__PURE__ */ v("div", {
		...p,
		style: {
			position: "relative",
			overflow: "hidden",
			borderRadius: s,
			background: "var(--ds-surface)",
			backdropFilter: "var(--ds-blur)",
			WebkitBackdropFilter: "var(--ds-blur)",
			border: "1px solid var(--ds-line)",
			boxShadow: "var(--ds-lift-2)",
			...f === void 0 ? null : {
				animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
				animationDelay: `${Math.min(f * 55, 240)}ms`
			},
			...d
		},
		children: [/* @__PURE__ */ v("div", {
			style: {
				position: "relative",
				height: r,
				flexShrink: 0,
				overflow: "hidden"
			},
			children: [e && !m ? /* @__PURE__ */ _(y, {}) : /* @__PURE__ */ _("div", { style: {
				width: "100%",
				height: "100%",
				background: "var(--ds-hero)"
			} }), c && i && /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _("div", {
				"aria-hidden": !0,
				style: {
					position: "absolute",
					inset: 0,
					background: "linear-gradient(to top, rgba(8,9,15,0.90) 0%, rgba(8,9,15,0.68) 28%, rgba(8,9,15,0.28) 58%, rgba(8,9,15,0) 88%)"
				}
			}), /* @__PURE__ */ _("div", {
				style: {
					position: "absolute",
					left: 0,
					right: 0,
					bottom: 0,
					padding: "var(--ds-4)",
					color: "#FFFFFF"
				},
				children: i
			})] })]
		}), (a || !c && i) && /* @__PURE__ */ _("div", {
			style: { padding: "var(--ds-4)" },
			children: a || i
		})]
	});
}
// src/primitivas/Azulejo.jsx
function Sn({ icono: e, etiqueta: t, nota: n, color: r, onClick: i, ancho: a = 1, entrada: s, estilo: c }) {
	let [l, u] = o.useState(!1), d = r || "var(--ds-accent)", f = `color-mix(in oklab, ${d}, var(--ds-mezcla-tono))`;
	return /* @__PURE__ */ v("button", {
		onClick: i,
		onMouseEnter: () => u(!0),
		onMouseLeave: () => u(!1),
		style: {
			gridColumn: `span ${a}`,
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
			justifyContent: "space-between",
			gap: "var(--ds-3)",
			minHeight: 132,
			padding: "var(--ds-4)",
			textAlign: "left",
			fontFamily: "var(--ds-font)",
			cursor: "pointer",
			borderRadius: "var(--ds-r-card)",
			border: `1px solid ${l ? d + "55" : "var(--ds-line)"}`,
			background: `linear-gradient(150deg, ${d}${l ? "30" : "1F"} 0%, ${d}0D 100%), var(--ds-surface)`,
			boxShadow: l ? "var(--ds-lift-2)" : "none",
			transform: l ? "translateY(-3px)" : "none",
			transition: "transform var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease)",
			animation: s === void 0 ? void 0 : `ds-rise var(--ds-t-move) var(--ds-ease) ${Math.min(s * 28, 220)}ms both`,
			...c
		},
		children: [/* @__PURE__ */ _("span", {
			style: {
				display: "grid",
				placeItems: "center",
				width: 46,
				height: 46,
				borderRadius: "var(--ds-r-item)",
				background: `${d}2E`,
				color: f,
				boxShadow: l ? `0 6px 16px -6px ${d}88` : "none",
				transition: "box-shadow var(--ds-t-state) var(--ds-ease)"
			},
			children: e
		}), /* @__PURE__ */ v("span", {
			style: {
				display: "block",
				minWidth: 0,
				width: "100%"
			},
			children: [/* @__PURE__ */ _("span", {
				style: {
					display: "block",
					fontSize: "var(--ds-t-small)",
					fontWeight: 600,
					color: f,
					letterSpacing: "-0.01em",
					lineHeight: 1.25
				},
				children: t
			}), n && /* @__PURE__ */ _("span", {
				style: {
					display: "block",
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					color: "var(--ds-ink-3)",
					marginTop: 2
				},
				children: n
			})]
		})]
	});
}
// src/primitivas/Interruptor.jsx
function Cn({ encendido: e = !1, onCambio: t, etiqueta: n, deshabilitado: r = !1, estilo: i }) {
	let [a, o] = h(!1), s = a && !r ? 33 : 27;
	return /* @__PURE__ */ _("button", {
		type: "button",
		role: "switch",
		"aria-checked": e,
		"aria-label": n,
		title: n,
		disabled: r,
		onClick: () => t?.(!e),
		onPointerDown: () => o(!0),
		onPointerUp: () => o(!1),
		onPointerLeave: () => o(!1),
		onPointerCancel: () => o(!1),
		style: {
			position: "relative",
			flexShrink: 0,
			width: 51,
			height: 31,
			borderRadius: "var(--ds-r-pill)",
			cursor: r ? "not-allowed" : "pointer",
			border: `1px solid ${e ? "transparent" : "var(--ds-line-firm)"}`,
			background: e ? "var(--ds-accent-trazo)" : "var(--ds-surface-sunk)",
			opacity: r ? .5 : 1,
			transition: "background var(--ds-t-state) var(--ds-ease)",
			padding: 0
		},
		children: /* @__PURE__ */ _("span", {
			"aria-hidden": !0,
			style: {
				position: "absolute",
				top: 1,
				left: e ? 48 - s : 1,
				width: s,
				height: 27,
				borderRadius: "var(--ds-r-pill)",
				background: e ? "var(--ds-ink-on-accent)" : "var(--ds-surface-solid)",
				boxShadow: "0 3px 8px rgba(0,0,0,0.15), 0 1px 1px rgba(0,0,0,0.12)",
				transition: "left var(--ds-t-state) var(--ds-ease), width var(--ds-t-state) var(--ds-ease)",
				...i
			}
		})
	});
}
// src/tituloBarra.js
var wn = s(null), Tn = /* @__PURE__ */ new Map(), En = (e) => String(e ?? "").split("/").filter(Boolean).length;
function Dn(e, t, n) {
	let r = getComputedStyle(e).getPropertyValue(t).trim();
	return r.endsWith("ms") ? parseFloat(r) : r.endsWith("s") ? parseFloat(r) * 1e3 : n;
}
function On({ vista: e, eje: t = "auto", ambito: n = "vista", children: r, estilo: i }) {
	let a = m(null);
	return f(() => {
		let r = a.current, i = Tn.get(n);
		if (Tn.set(n, e), !r || e === void 0 || i === void 0 || i === e || typeof r.animate != "function" || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
		let o = t === "y" ? 0 : En(e) - En(i), s = o > 0 ? {
			left: "24px",
			top: "0px"
		} : o < 0 ? {
			left: "-24px",
			top: "0px"
		} : {
			left: "0px",
			top: "14px"
		};
		r.animate([{
			opacity: 0,
			...s
		}, {
			opacity: 1,
			left: "0px",
			top: "0px"
		}], {
			duration: Dn(r, "--ds-t-vista", 320),
			easing: getComputedStyle(r).getPropertyValue("--ds-ease").trim() || "cubic-bezier(0.16, 1, 0.3, 1)",
			fill: "none"
		});
	}, [
		e,
		t,
		n
	]), /* @__PURE__ */ _("div", {
		ref: a,
		style: {
			position: "relative",
			minWidth: 0,
			...i
		},
		children: r
	});
}
// src/primitivas/Modal.jsx
function kn({ abierto: e, onCerrar: t, titulo: n, nota: r, children: i, acciones: a, ancho: o = 560, estilo: s, lado: c }) {
	let l = G(), d = c === "derecha" && !l, f = m(null), p = m(null), h = m(t);
	h.current = t;
	let g = m(null), b = (e) => {
		!l || e.button > 0 || (g.current = {
			y0: e.clientY,
			t0: performance.now(),
			dy: 0
		}, e.currentTarget.setPointerCapture?.(e.pointerId), f.current && (f.current.style.transition = "none"));
	}, x = (e) => {
		let t = g.current;
		t && f.current && (t.dy = Math.max(0, e.clientY - t.y0), f.current.style.translate = `0 ${t.dy}px`);
	}, S = () => {
		let e = g.current, t = f.current;
		if (g.current = null, !e || !t) return;
		let n = e.dy / Math.max(1, performance.now() - e.t0) > .6;
		t.style.transition = "translate var(--ds-t-state) var(--ds-ease)", e.dy > 110 || n && e.dy > 30 ? (t.style.translate = "0 100%", setTimeout(() => h.current?.(), 180)) : t.style.translate = "0 0";
	}, C = l ? {
		onPointerDown: b,
		onPointerMove: x,
		onPointerUp: S,
		onPointerCancel: S,
		style: {
			touchAction: "none",
			cursor: "grab"
		}
	} : {};
	return u(() => {
		if (!e) return;
		p.current = document.activeElement;
		let t = (e) => {
			e.key === "Escape" && (e.stopPropagation(), h.current?.());
		};
		document.addEventListener("keydown", t, !0);
		let n = setTimeout(() => f.current?.focus(), 40);
		return () => {
			document.removeEventListener("keydown", t, !0), clearTimeout(n);
			try {
				p.current?.focus?.();
			} catch {}
		};
	}, [e]), !e || typeof document > "u" ? null : y(/* @__PURE__ */ v("div", {
		className: "ds-capa",
		children: [!d && /* @__PURE__ */ _("div", {
			onClick: t,
			"aria-hidden": "true",
			style: {
				position: "fixed",
				inset: 0,
				zIndex: 60,
				background: "rgba(6,8,10,0.46)",
				backdropFilter: "blur(2px)",
				WebkitBackdropFilter: "blur(2px)",
				animation: "ds-fade var(--ds-t-state) var(--ds-ease) both"
			}
		}), /* @__PURE__ */ v("div", {
			ref: f,
			role: "dialog",
			"aria-modal": d ? "false" : "true",
			"aria-label": n,
			tabIndex: -1,
			style: {
				position: "fixed",
				zIndex: 61,
				outline: "none",
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
				background: "var(--ds-surface-solid)",
				border: "1px solid var(--ds-line)",
				boxShadow: "var(--ds-lift-3)",
				...l ? {
					left: 0,
					right: 0,
					bottom: 0,
					width: "100%",
					boxSizing: "border-box",
					maxHeight: "calc(100dvh - var(--ds-8))",
					borderRadius: "var(--ds-r-frame) var(--ds-r-frame) 0 0",
					borderBottom: "none",
					paddingBottom: "env(safe-area-inset-bottom, 0px)",
					animation: "ds-hoja var(--ds-t-move) var(--ds-ease) both"
				} : {
					...d ? {
						right: "var(--ds-4)",
						top: "50%",
						transform: "translateY(-50%)"
					} : {
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)"
					},
					width: `min(${o}px, calc(100% - var(--ds-8)))`,
					maxHeight: "calc(100dvh - var(--ds-12))",
					borderRadius: "var(--ds-r-frame)",
					animation: `${d ? "ds-modal-lado" : "ds-modal"} var(--ds-t-move) var(--ds-ease) both`
				},
				...s
			},
			children: [
				l && /* @__PURE__ */ _("div", {
					"aria-hidden": !0,
					...C,
					style: {
						...C.style,
						flexShrink: 0,
						display: "grid",
						placeItems: "center",
						height: 22
					},
					children: /* @__PURE__ */ _("div", { style: {
						width: 38,
						height: 5,
						borderRadius: 3,
						background: "var(--ds-line-firm)"
					} })
				}),
				d && /* @__PURE__ */ _("button", {
					type: "button",
					onClick: t,
					"aria-label": "Cerrar",
					title: "Cerrar (Esc)",
					style: {
						position: "absolute",
						top: "var(--ds-4)",
						right: "var(--ds-4)",
						zIndex: 1,
						display: "grid",
						placeItems: "center",
						width: 34,
						height: 34,
						cursor: "pointer",
						borderRadius: "var(--ds-r-pill)",
						border: "1px solid var(--ds-line)",
						background: "var(--ds-surface)",
						color: "var(--ds-ink-2)"
					},
					children: /* @__PURE__ */ _("svg", {
						width: "15",
						height: "15",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.2",
						strokeLinecap: "round",
						children: /* @__PURE__ */ _("path", { d: "M18 6L6 18M6 6l12 12" })
					})
				}),
				n && /* @__PURE__ */ v("div", {
					...l ? {
						onPointerDown: C.onPointerDown,
						onPointerMove: x,
						onPointerUp: S,
						onPointerCancel: S
					} : null,
					style: {
						padding: l ? "var(--ds-2) var(--ds-5) 0" : "var(--ds-5) var(--ds-5) 0",
						flexShrink: 0,
						paddingRight: d ? 64 : void 0,
						touchAction: l ? "none" : void 0
					},
					children: [/* @__PURE__ */ _("h2", {
						style: {
							margin: 0,
							fontSize: "var(--ds-t-title)",
							fontWeight: 700,
							letterSpacing: "-0.02em",
							color: "var(--ds-ink)"
						},
						children: n
					}), r && /* @__PURE__ */ _("p", {
						style: {
							margin: "5px 0 0",
							fontSize: "var(--ds-t-small)",
							color: "var(--ds-ink-2)"
						},
						children: r
					})]
				}),
				/* @__PURE__ */ _("div", {
					style: {
						padding: "var(--ds-5)",
						overflowY: "auto",
						flex: 1,
						minHeight: 0
					},
					children: i
				}),
				a && /* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						justifyContent: "flex-end",
						gap: "var(--ds-2)",
						padding: "0 var(--ds-5) var(--ds-5)",
						flexShrink: 0,
						flexWrap: "wrap"
					},
					children: a
				})
			]
		})]
	}), document.body);
}
var An = {
	ok: {
		tono: "var(--ds-ok)",
		suave: "var(--ds-ok-soft)",
		titulo: "Listo",
		d: "M20 6L9 17l-5-5"
	},
	error: {
		tono: "var(--ds-risk)",
		suave: "var(--ds-risk-soft)",
		titulo: "No se pudo",
		d: "M12 8v5M12 16h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"
	},
	aviso: {
		tono: "var(--ds-warn)",
		suave: "var(--ds-warn-soft)",
		titulo: "Atención",
		d: "M12 8v5M12 16h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"
	},
	info: {
		tono: "var(--ds-accent-tinta)",
		suave: "var(--ds-accent-soft)",
		titulo: "Aviso",
		d: "M12 16v-5M12 8h.01"
	}
};
function jn({ abierto: e, severidad: t = "info", titulo: n, mensaje: r, onCerrar: i, acciones: a }) {
	let o = An[t] || An.info, s = c(() => i?.(), [i]), l = (a || []).some((e) => e.cierra);
	return /* @__PURE__ */ _(kn, {
		abierto: e,
		onCerrar: s,
		ancho: 420,
		children: /* @__PURE__ */ v("div", {
			style: {
				textAlign: "center",
				padding: "var(--ds-2) 0"
			},
			children: [
				/* @__PURE__ */ _("div", {
					style: {
						display: "grid",
						placeItems: "center",
						width: 54,
						height: 54,
						margin: "0 auto var(--ds-4)",
						borderRadius: "var(--ds-r-pill)",
						background: o.suave,
						color: o.tono
					},
					children: /* @__PURE__ */ v("svg", {
						width: "26",
						height: "26",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [t === "info" && /* @__PURE__ */ _("circle", {
							cx: "12",
							cy: "12",
							r: "9"
						}), /* @__PURE__ */ _("path", { d: o.d })]
					})
				}),
				/* @__PURE__ */ _("div", {
					style: {
						fontSize: "var(--ds-t-title)",
						fontWeight: 700,
						letterSpacing: "-0.03em",
						color: "var(--ds-ink)"
					},
					children: n || o.titulo
				}),
				r && /* @__PURE__ */ _("div", {
					style: {
						fontSize: "var(--ds-t-body)",
						color: "var(--ds-ink-2)",
						marginTop: 8,
						lineHeight: 1.5
					},
					children: r
				}),
				/* @__PURE__ */ v("div", {
					style: {
						display: "flex",
						gap: "var(--ds-2)",
						justifyContent: "center",
						marginTop: "var(--ds-5)",
						flexWrap: "wrap"
					},
					children: [(a || []).map((e, t) => /* @__PURE__ */ _(H, {
						variante: e.primaria ? "solido" : "contorno",
						onClick: () => {
							e.onClick?.(), s();
						},
						children: e.texto
					}, t)), !l && /* @__PURE__ */ _(H, {
						variante: (a || []).length ? "fantasma" : "solido",
						onClick: s,
						children: "Entendido"
					})]
				})
			]
		})
	});
}
// src/primitivas/Flotante.jsx
var Mn = 8;
function Nn({ ancla: e, abierto: t, onCerrar: n, children: r, rol: i = "menu", etiqueta: a, minAncho: o = 200, estilo: s, lado: c = "abajo" }) {
	let l = m(null), [d, p] = h(null), g = m(n);
	return g.current = n, f(() => {
		if (!t) {
			p(null);
			return;
		}
		let n = () => {
			let t = e?.current?.getBoundingClientRect(), n = l.current?.getBoundingClientRect();
			if (!t) return;
			let r = n?.width || o, i = n?.height || 0, a = window.innerWidth, s = window.innerHeight;
			if (c === "derecha" && t.right + 8 + r <= a - Mn) {
				let e = Math.max(Mn, Math.min(t.top, s - i - Mn));
				p({
					izq: t.right + 8,
					top: e,
					haciaArriba: !1
				});
				return;
			}
			let u = s - t.bottom, d = i > 0 && u < i + Mn && t.top > u, f = d ? Math.max(Mn, t.top - i - 6) : t.bottom + 6, m = t.left;
			m + r > a - Mn && (m = t.right - r), m = Math.max(Mn, Math.min(m, a - r - Mn)), p({
				izq: m,
				top: f,
				haciaArriba: d
			});
		};
		n();
		let r = requestAnimationFrame(n);
		return window.addEventListener("resize", n), window.addEventListener("scroll", n, !0), () => {
			cancelAnimationFrame(r), window.removeEventListener("resize", n), window.removeEventListener("scroll", n, !0);
		};
	}, [
		t,
		e,
		o,
		c
	]), u(() => {
		if (!t) return;
		let n = (t) => {
			g.current?.(), t && e?.current?.focus?.();
		}, r = (e) => {
			e.key === "Escape" && (e.stopPropagation(), n(!0));
		}, i = (t) => {
			l.current?.contains(t.target) || e?.current?.contains(t.target) || n(!1);
		};
		document.addEventListener("keydown", r, !0), document.addEventListener("mousedown", i, !0);
		let a = requestAnimationFrame(() => {
			let e = l.current;
			(e?.querySelector("[aria-checked=\"true\"]") || e?.querySelector("[data-foco]") || e?.querySelector("button, [tabindex=\"0\"]"))?.focus?.();
		});
		return () => {
			cancelAnimationFrame(a), document.removeEventListener("keydown", r, !0), document.removeEventListener("mousedown", i, !0);
		};
	}, [t, e]), !t || typeof document > "u" ? null : y(/* @__PURE__ */ _("div", {
		ref: l,
		role: i,
		"aria-label": a,
		className: "ds-capa",
		onKeyDown: (e) => {
			if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
			let t = [...l.current?.querySelectorAll("button:not([disabled])") || []], n = t.indexOf(document.activeElement);
			t.length && (e.preventDefault(), t[e.key === "ArrowDown" ? (n + 1) % t.length : (n - 1 + t.length) % t.length].focus());
		},
		style: {
			position: "fixed",
			left: d?.izq ?? -9999,
			top: d?.top ?? -9999,
			zIndex: 80,
			minWidth: o,
			maxWidth: "calc(100vw - 16px)",
			maxHeight: "calc(100vh - 16px)",
			overflowY: "auto",
			padding: 5,
			borderRadius: 12,
			background: "var(--ds-panel)",
			border: "1px solid var(--ds-line)",
			backdropFilter: "var(--ds-blur)",
			WebkitBackdropFilter: "var(--ds-blur)",
			boxShadow: "var(--ds-lift-3)",
			fontFamily: "var(--ds-font)",
			color: "var(--ds-ink)",
			visibility: d ? "visible" : "hidden",
			animation: d ? `${d.haciaArriba ? "ds-sube" : "ds-baja"} var(--ds-t-state) var(--ds-ease) both` : void 0,
			...s
		},
		children: r
	}), document.body);
}
function Pn({ children: e, elegida: t, onClick: n, rol: r = "menuitemradio", nota: i, peligro: a }) {
	return /* @__PURE__ */ v("button", {
		type: "button",
		role: r,
		"aria-checked": r === "menuitemradio" ? !!t : void 0,
		onClick: n,
		className: "ds-menu-opcion",
		"data-peligro": a ? "" : void 0,
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-3)",
			width: "100%",
			minHeight: 34,
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 500,
			padding: "6px 10px",
			borderRadius: 7,
			border: "none",
			cursor: "pointer",
			textAlign: "left",
			background: t ? "var(--ds-accent-soft)" : "transparent",
			color: a ? "var(--ds-risk)" : t ? "var(--ds-accent-tinta)" : "var(--ds-ink)"
		},
		children: [/* @__PURE__ */ v("span", {
			style: {
				flex: 1,
				minWidth: 0
			},
			children: [e, i && /* @__PURE__ */ _("span", {
				className: "ds-num",
				style: {
					display: "block",
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					color: "var(--ds-ink-3)",
					marginTop: 1
				},
				children: i
			})]
		}), t && /* @__PURE__ */ _("svg", {
			width: "15",
			height: "15",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.4",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": !0,
			children: /* @__PURE__ */ _("path", { d: "M20 6L9 17l-5-5" })
		})]
	});
}
// src/Armazon.jsx
var Fn = "ds-nav", In = [
	"topbar",
	"sidebar",
	"dock"
], Ln = 64, Rn = 52, zn = s({
	modo: "topbar",
	movil: !1,
	fijarModo: () => {}
}), Bn = () => l(zn);
function Vn() {
	try {
		let e = localStorage.getItem(Fn);
		if (In.includes(e)) return e;
	} catch {}
	return "topbar";
}
var Hn = {
	background: "var(--ds-frame)",
	backdropFilter: "var(--ds-blur)",
	WebkitBackdropFilter: "var(--ds-blur)",
	border: "1px solid var(--ds-line)"
};
function Un(e, t) {
	f(() => {
		let n = document.documentElement.style;
		return n.setProperty("--ds-reserva-arriba", e), n.setProperty("--ds-reserva-abajo", t), () => {
			n.removeProperty("--ds-reserva-arriba"), n.removeProperty("--ds-reserva-abajo");
		};
	}, [e, t]);
}
function Wn({ n: e, sobre: t = !1, en: n }) {
	let r = Number(e) || 0;
	return r <= 0 ? null : /* @__PURE__ */ v("span", {
		className: "ds-num",
		style: {
			...t ? {
				position: "absolute",
				top: -6,
				right: -9
			} : {},
			...n ? {
				position: "absolute",
				...n
			} : {},
			minWidth: 18,
			height: 18,
			padding: "0 5px",
			boxSizing: "border-box",
			borderRadius: "var(--ds-r-pill)",
			background: "var(--ds-risk)",
			color: "var(--ds-surface-solid)",
			fontSize: "0.66rem",
			fontWeight: 700,
			lineHeight: "18px",
			textAlign: "center",
			flexShrink: 0,
			boxShadow: t ? "0 0 0 2px var(--ds-surface-solid)" : "none"
		},
		children: [/* @__PURE__ */ _("span", {
			"aria-hidden": !0,
			children: r > 99 ? "99+" : r
		}), /* @__PURE__ */ v("span", {
			style: Gn,
			children: [
				", ",
				r,
				" pendientes"
			]
		})]
	});
}
var Gn = {
	position: "absolute",
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0 0 0 0)",
	whiteSpace: "nowrap",
	border: 0
}, Kn = (e, t) => (Number(t) || 0) > 0 ? `${e}, ${t} pendientes` : e;
function qn({ s: e, alto: t = 18 }) {
	return /* @__PURE__ */ v("span", {
		style: {
			position: "relative",
			display: "grid",
			placeItems: "center",
			width: 18,
			height: t,
			flexShrink: 0
		},
		children: [e.icono || "•", /* @__PURE__ */ _(Wn, {
			n: e.insignia,
			sobre: !0
		})]
	});
}
var K = (e) => Array.isArray(e?.hijos) && e.hijos.length > 0, Jn = (e, t) => e.id === t || K(e) && e.hijos.some((e) => e.id === t), Yn = (e) => !K(e) || !!(e.ruta || e.navegable), Xn = (e) => e.reduce((e, t) => e + (Number(t.insignia) || 0), 0), Zn = (e) => K(e) ? {
	...e,
	insigniaPropia: e.insignia,
	insignia: (Number(e.insignia) || 0) + Xn(e.hijos)
} : e;
function Qn({ abierta: e, tam: t = 13 }) {
	return /* @__PURE__ */ _("svg", {
		width: t,
		height: t,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2.4",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		style: {
			flexShrink: 0,
			transform: e ? "rotate(180deg)" : "none",
			transition: "transform var(--ds-t-state) var(--ds-ease)"
		},
		children: /* @__PURE__ */ _("path", { d: "M6 9l6 6 6-6" })
	});
}
function $n({ texto: e, nota: t, insignia: n, esta: r, onClick: i }) {
	return /* @__PURE__ */ v("button", {
		type: "button",
		role: "menuitem",
		onClick: i,
		"aria-current": r ? "page" : void 0,
		"data-foco": r ? "" : void 0,
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-3)",
			width: "100%",
			minHeight: 38,
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 600,
			padding: "8px 10px",
			borderRadius: "var(--ds-r-item)",
			border: "none",
			cursor: "pointer",
			textAlign: "left",
			background: r ? "var(--ds-accent-soft)" : "transparent",
			color: r ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)"
		},
		onMouseEnter: (e) => {
			r || (e.currentTarget.style.background = "var(--ds-surface-2)");
		},
		onMouseLeave: (e) => {
			r || (e.currentTarget.style.background = "transparent");
		},
		onFocus: (e) => {
			r || (e.currentTarget.style.background = "var(--ds-surface-2)");
		},
		onBlur: (e) => {
			r || (e.currentTarget.style.background = "transparent");
		},
		children: [/* @__PURE__ */ v("span", {
			style: {
				flex: 1,
				minWidth: 0
			},
			children: [e, t && /* @__PURE__ */ _("span", {
				style: {
					display: "block",
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					color: "var(--ds-ink-3)"
				},
				children: t
			})]
		}), /* @__PURE__ */ _(Wn, { n })]
	});
}
function er({ s: e, ancla: t, abierto: n, onCerrar: r, activa: i, onIr: a, lado: o }) {
	let s = (e) => {
		r(), a?.(e);
	};
	return /* @__PURE__ */ v(Nn, {
		ancla: t,
		abierto: n,
		onCerrar: r,
		etiqueta: e.texto,
		minAncho: 220,
		lado: o,
		children: [Yn(e) && /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _($n, {
			texto: e.texto,
			nota: "Resumen",
			esta: e.id === i,
			onClick: () => s(e)
		}), /* @__PURE__ */ _("div", {
			role: "separator",
			style: {
				height: 1,
				background: "var(--ds-line)",
				margin: "4px 6px"
			}
		})] }), e.hijos.map((e) => /* @__PURE__ */ _($n, {
			texto: e.texto,
			insignia: e.insignia,
			esta: e.id === i,
			onClick: () => s(e)
		}, e.id))]
	});
}
function tr({ fuente: e, alt: t, alto: n }) {
	return e ? typeof e == "string" ? /* @__PURE__ */ _("img", {
		src: e,
		alt: t,
		style: {
			height: n,
			width: "auto",
			maxWidth: 180,
			display: "block",
			flexShrink: 0
		}
	}) : /* @__PURE__ */ _("span", {
		style: {
			display: "inline-flex",
			height: n,
			flexShrink: 0
		},
		children: e
	}) : null;
}
function nr({ texto: e = "", alto: t = 28 }) {
	return /* @__PURE__ */ _("span", {
		"aria-hidden": !0,
		className: "ds-monograma",
		"data-inicial": e.trim().charAt(0).toUpperCase(),
		style: {
			display: "grid",
			placeItems: "center",
			width: t,
			height: t,
			flexShrink: 0,
			borderRadius: 8,
			background: "var(--ds-accent)",
			color: "var(--ds-ink-on-accent)",
			fontSize: t * .5,
			fontWeight: 700,
			letterSpacing: "-0.02em"
		}
	});
}
function rr({ marca: e, logo: t, iconoApp: n, compacto: r = !1, encoge: i = !1, onInicio: a }) {
	let o = typeof e == "string" ? e : "", s = t?.icono ? /* @__PURE__ */ _(tr, {
		fuente: t.icono,
		alt: "",
		alto: 28
	}) : n ? /* @__PURE__ */ _("span", {
		"aria-hidden": !0,
		style: {
			display: "inline-flex",
			flexShrink: 0
		},
		children: n
	}) : o ? /* @__PURE__ */ _(nr, { texto: o }) : null;
	if (r && !s) return null;
	let c = /* @__PURE__ */ _("span", {
		style: {
			minWidth: 0,
			overflow: "hidden",
			textOverflow: "ellipsis"
		},
		children: e
	}), l = r ? s : t?.completo ? /* @__PURE__ */ _(tr, {
		fuente: t.completo,
		alt: o,
		alto: 28
	}) : t?.icono ? /* @__PURE__ */ v(g, { children: [s, c] }) : c, u = {
		display: "flex",
		alignItems: "center",
		gap: 10,
		flexShrink: +!!i,
		minWidth: 0,
		overflow: i ? "hidden" : "visible",
		fontWeight: 700,
		fontSize: "var(--ds-t-body)",
		letterSpacing: "-0.02em",
		color: "var(--ds-ink)",
		whiteSpace: "nowrap"
	};
	return a ? /* @__PURE__ */ _("button", {
		type: "button",
		onClick: a,
		"aria-label": r ? `Ir al inicio de ${o}` : `${o}, ir al inicio`,
		style: {
			...u,
			border: "none",
			background: "transparent",
			padding: 0,
			cursor: "pointer",
			fontFamily: "var(--ds-font)",
			borderRadius: 8
		},
		children: l
	}) : /* @__PURE__ */ _("div", {
		style: u,
		children: l
	});
}
function ir({ s: e, esta: t, onIr: n }) {
	return /* @__PURE__ */ v("button", {
		onClick: () => n?.(e),
		"aria-current": t ? "page" : void 0,
		title: e.texto,
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 8,
			whiteSpace: "nowrap",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 600,
			padding: "9px 16px",
			borderRadius: "var(--ds-r-pill)",
			border: "1px solid transparent",
			cursor: "pointer",
			background: t ? "var(--ds-ink)" : "var(--ds-surface)",
			color: t ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
			boxShadow: t ? "var(--ds-lift-2)" : "none",
			transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease), transform var(--ds-t-tap) var(--ds-ease)"
		},
		onMouseEnter: (e) => {
			t || (e.currentTarget.style.background = "var(--ds-surface-solid)", e.currentTarget.style.color = "var(--ds-ink)");
		},
		onMouseLeave: (e) => {
			t || (e.currentTarget.style.background = "var(--ds-surface)", e.currentTarget.style.color = "var(--ds-ink-2)");
		},
		onMouseDown: (e) => {
			e.currentTarget.style.transform = "scale(0.96)";
		},
		onMouseUp: (e) => {
			e.currentTarget.style.transform = "none";
		},
		children: [
			e.icono,
			e.texto,
			/* @__PURE__ */ _(Wn, { n: e.insignia })
		]
	});
}
function ar({ s: e, activa: t, onIr: n }) {
	let [r, i] = h(!1), a = m(null), o = Jn(e, t), s = Yn(e), c = {
		display: "inline-flex",
		alignItems: "center",
		gap: 8,
		whiteSpace: "nowrap",
		fontFamily: "var(--ds-font)",
		fontSize: "var(--ds-t-small)",
		fontWeight: 600,
		padding: "9px 0",
		border: "none",
		background: "transparent",
		color: "inherit",
		cursor: "pointer",
		borderRadius: "var(--ds-r-pill)"
	}, l = o ? "var(--ds-ink)" : "var(--ds-surface)";
	return /* @__PURE__ */ v("span", {
		title: e.texto,
		style: {
			display: "inline-flex",
			alignItems: "center",
			padding: "0 6px 0 16px",
			borderRadius: "var(--ds-r-pill)",
			border: "1px solid transparent",
			background: l,
			color: o ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
			boxShadow: o ? "var(--ds-lift-2)" : "none",
			transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
		},
		onMouseEnter: (e) => {
			o || (e.currentTarget.style.background = "var(--ds-surface-solid)", e.currentTarget.style.color = "var(--ds-ink)");
		},
		onMouseLeave: (e) => {
			o || (e.currentTarget.style.background = l, e.currentTarget.style.color = "var(--ds-ink-2)");
		},
		children: [s ? /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ v("button", {
			type: "button",
			onClick: () => n?.(e),
			"aria-current": e.id === t ? "page" : void 0,
			style: c,
			children: [
				e.icono,
				e.texto,
				/* @__PURE__ */ _(Wn, { n: e.insignia })
			]
		}), /* @__PURE__ */ _("button", {
			type: "button",
			ref: a,
			onClick: () => i((e) => !e),
			"aria-label": `Subsecciones de ${e.texto}`,
			"aria-haspopup": "menu",
			"aria-expanded": r,
			style: {
				...c,
				padding: "9px 10px 9px 8px"
			},
			children: /* @__PURE__ */ _(Qn, { abierta: r })
		})] }) : /* @__PURE__ */ v("button", {
			type: "button",
			ref: a,
			onClick: () => i((e) => !e),
			"aria-haspopup": "menu",
			"aria-expanded": r,
			style: {
				...c,
				paddingRight: 10
			},
			children: [
				e.icono,
				e.texto,
				/* @__PURE__ */ _(Wn, { n: e.insignia }),
				/* @__PURE__ */ _(Qn, { abierta: r })
			]
		}), /* @__PURE__ */ _(er, {
			s: e,
			ancla: a,
			abierto: r,
			onCerrar: () => i(!1),
			activa: t,
			onIr: n
		})]
	});
}
function or({ s: e, texto: t, esta: n, sangria: r = !1, onClick: i }) {
	return /* @__PURE__ */ v("button", {
		type: "button",
		onClick: i,
		"aria-current": n ? "page" : void 0,
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-3)",
			width: "100%",
			minHeight: r ? 44 : 48,
			padding: r ? "0 var(--ds-3) 0 42px" : "0 var(--ds-3)",
			border: "none",
			cursor: "pointer",
			borderRadius: "var(--ds-r-item)",
			textAlign: "left",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-body)",
			fontWeight: r ? 600 : 700,
			background: n ? "var(--ds-accent-soft)" : "transparent",
			color: n ? "var(--ds-accent-tinta)" : "var(--ds-ink)"
		},
		children: [
			!r && /* @__PURE__ */ _(qn, { s: {
				...e,
				insignia: 0
			} }),
			/* @__PURE__ */ v("span", {
				style: {
					flex: 1,
					minWidth: 0
				},
				children: [t ?? e.texto, e.nota && /* @__PURE__ */ _("span", {
					style: {
						display: "block",
						fontSize: "var(--ds-t-small)",
						fontWeight: 500,
						color: "var(--ds-ink-3)"
					},
					children: e.nota
				})]
			}),
			/* @__PURE__ */ _(Wn, { n: e.insignia })
		]
	});
}
function sr({ abierto: e, onCerrar: t, secciones: n, activa: r, onIr: i, titulo: a = "Más" }) {
	let o = (e) => {
		t(), i?.(e);
	}, s = n.length === 1 && K(n[0]) ? n[0] : null;
	return /* @__PURE__ */ _(kn, {
		abierto: e,
		onCerrar: t,
		titulo: a,
		ancho: 420,
		children: /* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 2,
				margin: "calc(var(--ds-2) * -1) 0"
			},
			children: s ? /* @__PURE__ */ v(g, { children: [Yn(s) && /* @__PURE__ */ _(or, {
				s: {
					...s,
					insignia: s.insigniaPropia
				},
				texto: "Resumen",
				esta: s.id === r,
				onClick: () => o(s)
			}), s.hijos.map((e) => /* @__PURE__ */ _(or, {
				s: {
					icono: s.icono,
					...e
				},
				esta: e.id === r,
				onClick: () => o(e)
			}, e.id))] }) : n.map((e) => K(e) ? /* @__PURE__ */ v("div", {
				role: "group",
				"aria-label": e.texto,
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 2
				},
				children: [Yn(e) ? /* @__PURE__ */ _(or, {
					s: {
						...e,
						insignia: e.insigniaPropia
					},
					esta: e.id === r,
					onClick: () => o(e)
				}) : /* @__PURE__ */ v("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "var(--ds-3)",
						minHeight: 40,
						padding: "0 var(--ds-3)",
						fontSize: "var(--ds-t-small)",
						fontWeight: 700,
						color: "var(--ds-ink-2)"
					},
					children: [/* @__PURE__ */ _(qn, { s: {
						...e,
						insignia: 0
					} }), e.texto]
				}), e.hijos.map((e) => /* @__PURE__ */ _(or, {
					s: e,
					sangria: !0,
					esta: e.id === r,
					onClick: () => o(e)
				}, e.id))]
			}, e.id) : /* @__PURE__ */ _(or, {
				s: e,
				esta: e.id === r,
				onClick: () => o(e)
			}, e.id))
		})
	});
}
function cr({ marca: e, logo: t, onInicio: n, icono: r, secciones: i, activa: a, onIr: o, derecha: s, children: c }) {
	let l = m(null), [u, d] = h(56);
	return f(() => {
		let e = l.current;
		if (!e) return;
		let t = () => d(e.getBoundingClientRect().height);
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, []), Un(`${Math.round(u) + 36}px`, "var(--ds-4)"), /* @__PURE__ */ v("div", {
		style: {
			minHeight: "100%",
			padding: "var(--ds-4)"
		},
		children: [/* @__PURE__ */ v("header", {
			ref: l,
			style: {
				...Hn,
				display: "flex",
				alignItems: "center",
				gap: "var(--ds-2)",
				padding: "var(--ds-2) var(--ds-3)",
				borderRadius: "var(--ds-r-pill)",
				boxShadow: "var(--ds-lift-2)",
				position: "fixed",
				top: "var(--ds-4)",
				left: "var(--ds-4)",
				right: "var(--ds-4)",
				zIndex: 30
			},
			children: [
				/* @__PURE__ */ _("div", {
					style: {
						paddingLeft: 8,
						paddingRight: 8
					},
					children: /* @__PURE__ */ _(rr, {
						marca: e,
						logo: t,
						iconoApp: r,
						onInicio: n
					})
				}),
				/* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "var(--ds-2)",
						flexWrap: "wrap",
						flex: 1,
						minWidth: 0
					},
					children: i.map((e) => K(e) ? /* @__PURE__ */ _(ar, {
						s: e,
						activa: a,
						onIr: o
					}, e.id) : /* @__PURE__ */ _(ir, {
						s: e,
						esta: e.id === a,
						onIr: o
					}, e.id))
				}),
				/* @__PURE__ */ _("div", {
					style: {
						flex: "0 0 auto",
						display: "flex",
						justifyContent: "flex-end"
					},
					children: s
				})
			]
		}), /* @__PURE__ */ _("main", {
			style: { paddingTop: u + 20 },
			children: c
		})]
	});
}
function lr({ s: e, esta: t, marcado: n, riel: r, bajo: i, hijo: a = !1, enFila: o = !1, onClick: s, botonRef: c, insignia: l, extra: u, ...d }) {
	let f = l ?? e.insignia;
	return /* @__PURE__ */ v("button", {
		ref: c,
		type: "button",
		onClick: s,
		title: e.texto,
		"aria-current": t ? "page" : void 0,
		...d,
		style: {
			display: "flex",
			alignItems: "center",
			gap: 11,
			minWidth: 0,
			flex: o ? "1 1 0" : "0 0 auto",
			justifyContent: r ? "flex-start" : "center",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-small)",
			fontWeight: a ? 600 : 700,
			padding: a ? `${i ? 6 : 8}px 13px ${i ? 6 : 8}px 42px` : `${i ? 8 : 11}px ${r ? 13 : 0}px`,
			borderRadius: "var(--ds-r-item)",
			border: "none",
			cursor: "pointer",
			textAlign: "left",
			width: "100%",
			background: t ? "var(--ds-surface-solid)" : "transparent",
			color: t || n ? "var(--ds-ink)" : "var(--ds-ink-2)",
			boxShadow: t ? "var(--ds-lift-1)" : "none",
			transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
		},
		onMouseEnter: (e) => {
			t || (e.currentTarget.style.background = "var(--ds-surface-2)");
		},
		onMouseLeave: (e) => {
			t || (e.currentTarget.style.background = "transparent");
		},
		children: [
			!a && /* @__PURE__ */ _("span", {
				style: {
					color: t || n ? "var(--ds-accent-tinta)" : "inherit",
					lineHeight: 0
				},
				children: /* @__PURE__ */ _(qn, { s: r ? {
					...e,
					insignia: 0
				} : e })
			}),
			r && /* @__PURE__ */ _("span", {
				style: {
					flex: 1,
					minWidth: 0,
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap"
				},
				children: e.texto
			}),
			r && /* @__PURE__ */ _(Wn, { n: f }),
			r && u
		]
	});
}
function ur({ s: e, activa: t, riel: n, bajo: r, onIr: i }) {
	let a = Jn(e, t), [o, s] = h(a), [c, l] = h(!1), f = m(null), p = d();
	if (u(() => {
		a && s(!0);
	}, [a]), !n) return /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _(lr, {
		s: e,
		esta: a,
		riel: !1,
		bajo: r,
		botonRef: f,
		onClick: () => l((e) => !e),
		"aria-haspopup": "menu",
		"aria-expanded": c
	}), /* @__PURE__ */ _(er, {
		s: e,
		ancla: f,
		abierto: c,
		onCerrar: () => l(!1),
		activa: t,
		onIr: i,
		lado: "derecha"
	})] });
	let y = Yn(e), b = () => s((e) => !e);
	return /* @__PURE__ */ v("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			flexShrink: 0
		},
		children: [/* @__PURE__ */ v("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 2
			},
			children: [/* @__PURE__ */ _(lr, {
				s: e,
				esta: e.id === t,
				marcado: a,
				riel: !0,
				bajo: r,
				enFila: !0,
				insignia: o ? Number(e.insigniaPropia) || 0 : e.insignia,
				onClick: y ? () => i?.(e) : b,
				"aria-expanded": y ? void 0 : o,
				"aria-controls": y ? void 0 : p,
				extra: y ? null : /* @__PURE__ */ _("span", {
					style: {
						color: "var(--ds-ink-3)",
						lineHeight: 0
					},
					children: /* @__PURE__ */ _(Qn, { abierta: o })
				})
			}), y && /* @__PURE__ */ _("button", {
				type: "button",
				onClick: b,
				"aria-expanded": o,
				"aria-controls": p,
				"aria-label": `Subsecciones de ${e.texto}`,
				style: {
					display: "grid",
					placeItems: "center",
					width: 32,
					height: 32,
					flexShrink: 0,
					border: "none",
					background: "transparent",
					cursor: "pointer",
					color: "var(--ds-ink-3)",
					borderRadius: "var(--ds-r-item)"
				},
				children: /* @__PURE__ */ _(Qn, { abierta: o })
			})]
		}), /* @__PURE__ */ _("div", {
			id: p,
			role: "group",
			"aria-label": e.texto,
			inert: !o,
			style: {
				display: "grid",
				gridTemplateRows: o ? "1fr" : "0fr",
				transition: "grid-template-rows var(--ds-t-move) var(--ds-ease)"
			},
			children: /* @__PURE__ */ _("div", {
				style: {
					overflow: "hidden",
					minHeight: 0
				},
				children: /* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: r ? 0 : 2,
						paddingTop: r ? 0 : 2,
						opacity: +!!o,
						translate: o ? "0 0" : "0 -6px",
						transition: o ? "opacity var(--ds-t-move) var(--ds-ease) 60ms, translate var(--ds-t-move) var(--ds-ease) 60ms" : "opacity var(--ds-t-state) var(--ds-ease), translate var(--ds-t-state) var(--ds-ease)"
					},
					children: e.hijos.map((e) => /* @__PURE__ */ _(lr, {
						s: e,
						hijo: !0,
						esta: e.id === t,
						riel: !0,
						bajo: r,
						onClick: () => i?.(e)
					}, e.id))
				})
			})
		})]
	});
}
function dr({ marca: e, logo: t, onInicio: n, icono: r, secciones: i, activa: a, onIr: o, derecha: s, children: c }) {
	let [l, u] = h(!0), d = pn("(max-height: 760px)"), f = l, p = f ? 244 : 64;
	return Un("var(--ds-4)", "var(--ds-4)"), /* @__PURE__ */ v("div", {
		style: {
			minHeight: "100%",
			padding: "var(--ds-4)"
		},
		children: [/* @__PURE__ */ v("aside", {
			style: {
				...Hn,
				width: p,
				borderRadius: "var(--ds-r-frame)",
				padding: "var(--ds-3)",
				boxShadow: "var(--ds-lift-2)",
				boxSizing: "border-box",
				position: "fixed",
				top: "var(--ds-4)",
				left: "var(--ds-4)",
				bottom: "var(--ds-4)",
				zIndex: 30,
				overflow: "hidden",
				transition: "width var(--ds-t-move) var(--ds-ease)",
				display: "flex",
				flexDirection: "column",
				gap: "var(--ds-2)"
			},
			children: [
				/* @__PURE__ */ v("div", {
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: f ? "space-between" : "center",
						flexDirection: f ? "row" : "column",
						gap: f ? 8 : 10,
						padding: d ? "4px 8px 4px" : "6px 8px 10px",
						flexShrink: 0,
						minWidth: 0
					},
					children: [/* @__PURE__ */ _(rr, {
						marca: e,
						logo: t,
						iconoApp: r,
						onInicio: n,
						compacto: !f
					}), /* @__PURE__ */ _("button", {
						onClick: () => u((e) => !e),
						"aria-label": f ? "Contraer menú" : "Desplegar menú",
						style: {
							background: "transparent",
							border: "none",
							cursor: "pointer",
							color: "var(--ds-ink-3)",
							padding: 4,
							borderRadius: 8,
							lineHeight: 0
						},
						children: /* @__PURE__ */ _("svg", {
							width: "17",
							height: "17",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							children: /* @__PURE__ */ _("path", { d: f ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6" })
						})
					})]
				}),
				/* @__PURE__ */ _("nav", {
					"aria-label": "Navegación principal",
					style: {
						flex: 1,
						minHeight: 0,
						overflowY: "auto",
						overflowX: "hidden",
						scrollbarWidth: "thin",
						display: "flex",
						flexDirection: "column",
						gap: d ? 0 : 2,
						margin: "0 calc(var(--ds-1) * -1)",
						padding: "2px var(--ds-1)"
					},
					children: i.map((e) => K(e) ? /* @__PURE__ */ _(ur, {
						s: e,
						activa: a,
						riel: f,
						bajo: d,
						onIr: o
					}, e.id) : /* @__PURE__ */ _(lr, {
						s: e,
						esta: e.id === a,
						riel: f,
						bajo: d,
						onClick: () => o?.(e)
					}, e.id))
				}),
				s ? /* @__PURE__ */ _("div", {
					style: {
						paddingTop: "var(--ds-3)",
						flexShrink: 0,
						borderTop: "1px solid var(--ds-line)",
						display: "flex",
						flexWrap: "wrap",
						gap: "var(--ds-2)",
						justifyContent: f ? "flex-start" : "center"
					},
					children: s
				}) : null
			]
		}), /* @__PURE__ */ _("main", {
			style: {
				minWidth: 0,
				marginLeft: p + 16,
				transition: "margin-left var(--ds-t-move) var(--ds-ease)"
			},
			children: c
		})]
	});
}
var fr = 48;
function pr({ s: e, esta: t, conTexto: n, onIr: r, botonRef: i, ...a }) {
	return /* @__PURE__ */ v("button", {
		ref: i,
		type: "button",
		onClick: () => r?.(e),
		title: e.texto,
		"aria-label": n ? void 0 : Kn(e.texto, e.insignia),
		"aria-current": t && !a["aria-haspopup"] ? "page" : void 0,
		...a,
		style: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			gap: 3,
			position: "relative",
			fontFamily: "var(--ds-font)",
			fontSize: "0.66rem",
			fontWeight: 600,
			padding: n ? "7px 15px" : 0,
			minWidth: n ? 0 : fr,
			height: n ? "auto" : 44,
			boxSizing: "border-box",
			borderRadius: "var(--ds-r-item)",
			border: "none",
			cursor: "pointer",
			whiteSpace: "nowrap",
			flexShrink: 0,
			background: t ? "var(--ds-ink)" : "transparent",
			color: t ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
			transition: "transform var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
		},
		onMouseEnter: (e) => {
			e.currentTarget.style.transform = "translateY(-3px)", t || (e.currentTarget.style.background = "var(--ds-surface-2)", e.currentTarget.style.color = "var(--ds-ink)");
		},
		onMouseLeave: (e) => {
			e.currentTarget.style.transform = "none", t || (e.currentTarget.style.background = "transparent", e.currentTarget.style.color = "var(--ds-ink-2)");
		},
		children: [
			/* @__PURE__ */ _(qn, {
				s: n ? {
					...e,
					insignia: 0
				} : e,
				alto: 19
			}),
			n && e.texto,
			n && /* @__PURE__ */ _(Wn, {
				n: e.insignia,
				en: {
					top: 1,
					left: "calc(50% + 3px)"
				}
			})
		]
	});
}
function mr({ s: e, activa: t, conTexto: n, onIr: r }) {
	let [i, a] = h(!1), o = m(null);
	return /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _(pr, {
		s: e,
		esta: Jn(e, t),
		conTexto: n,
		botonRef: o,
		onIr: () => a((e) => !e),
		"aria-haspopup": "menu",
		"aria-expanded": i
	}), /* @__PURE__ */ _(er, {
		s: e,
		ancla: o,
		abierto: i,
		onCerrar: () => a(!1),
		activa: t,
		onIr: r
	})] });
}
function hr({ marca: e, logo: t, onInicio: n, icono: r, secciones: i, activa: a, onIr: o, derecha: s, inicio: l, inicioAbierto: u = !1, onInicioAbierto: d, children: p }) {
	let g = m(null), y = m(null), b = m(null), x = m(null), [S, C] = h(0), [w, T] = h(i.length), [E, D] = h(!1);
	Un("var(--ds-4)", "calc(64px + var(--ds-6) + env(safe-area-inset-bottom, 0px))");
	let O = c(() => {
		let e = g.current;
		if (!e) return;
		let t = getComputedStyle(e), n = e.clientWidth - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight), r = 2 * Math.max(y.current?.scrollWidth || 0, b.current?.scrollWidth || 0), a = 2 * (parseFloat(t.columnGap) || 8), o = n - r - a;
		(x.current?.scrollWidth || 0) <= o ? C(0) : i.length * 52 <= o ? C(1) : (C(2), T(Math.max(1, Math.floor(o / 52) - 1)));
	}, [i]);
	f(() => {
		O();
		let e = new ResizeObserver(O);
		return [
			g.current,
			y.current,
			b.current
		].forEach((t) => t && e.observe(t)), () => e.disconnect();
	}, [O]);
	let k = S === 2 ? i.slice(0, w) : i, A = S === 2 ? i.slice(w) : [], j = {
		flex: "1 1 0",
		minWidth: "max-content",
		display: "flex",
		alignItems: "center"
	}, M = {
		display: "flex",
		alignItems: "center",
		gap: "var(--ds-2)",
		width: "max-content",
		flexWrap: "nowrap"
	};
	return /* @__PURE__ */ v("div", {
		style: {
			minHeight: "100%",
			padding: "var(--ds-4)",
			paddingBottom: "calc(64px + var(--ds-6))"
		},
		children: [
			/* @__PURE__ */ _("main", { children: p }),
			/* @__PURE__ */ v("nav", {
				ref: g,
				"aria-label": "Navegación principal",
				style: {
					position: "fixed",
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 40,
					height: "calc(64px + env(safe-area-inset-bottom, 0px))",
					boxSizing: "border-box",
					display: "flex",
					alignItems: "center",
					gap: "var(--ds-2)",
					padding: "0 var(--ds-4)",
					paddingBottom: "env(safe-area-inset-bottom, 0px)",
					background: "var(--ds-material)",
					borderTop: "1px solid var(--ds-line)",
					backdropFilter: "var(--ds-blur)",
					WebkitBackdropFilter: "var(--ds-blur)",
					boxShadow: "var(--ds-lift-3)"
				},
				children: [
					/* @__PURE__ */ _("div", {
						style: j,
						children: /* @__PURE__ */ _("div", {
							ref: y,
							style: M,
							children: l ? /* @__PURE__ */ _(br, {
								abierto: u,
								icono: r,
								onClick: () => d?.(!u)
							}) : /* @__PURE__ */ _(rr, {
								marca: e,
								logo: t,
								iconoApp: r,
								onInicio: n,
								compacto: !0
							})
						})
					}),
					/* @__PURE__ */ v("div", {
						style: {
							flex: "0 1 auto",
							minWidth: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "var(--ds-1)",
							position: "relative"
						},
						children: [k.map((e) => K(e) ? /* @__PURE__ */ _(mr, {
							s: e,
							activa: a,
							conTexto: S === 0,
							onIr: o
						}, e.id) : /* @__PURE__ */ _(pr, {
							s: e,
							esta: e.id === a,
							conTexto: S === 0,
							onIr: o
						}, e.id)), A.length > 0 && /* @__PURE__ */ _(gr, {
							activo: A.some((e) => Jn(e, a)),
							insignia: Xn(A),
							onClick: () => D(!0),
							alto: 44
						})]
					}),
					/* @__PURE__ */ _("div", {
						style: {
							...j,
							justifyContent: "flex-end"
						},
						children: /* @__PURE__ */ _("div", {
							ref: b,
							style: M,
							children: s
						})
					}),
					/* @__PURE__ */ _("div", {
						ref: x,
						"aria-hidden": !0,
						style: {
							position: "absolute",
							left: 0,
							top: 0,
							visibility: "hidden",
							pointerEvents: "none",
							display: "flex",
							gap: "var(--ds-1)",
							width: "max-content"
						},
						children: i.map((e) => /* @__PURE__ */ _(pr, {
							s: e,
							esta: !1,
							conTexto: !0
						}, e.id))
					})
				]
			}),
			/* @__PURE__ */ _(sr, {
				abierto: E,
				onCerrar: () => D(!1),
				secciones: A,
				activa: a,
				onIr: o
			}),
			l
		]
	});
}
function gr({ activo: e, insignia: t, onClick: n, alto: r }) {
	return /* @__PURE__ */ _("button", {
		onClick: n,
		title: "Más secciones",
		"aria-label": Kn("Más secciones", t),
		style: {
			display: "grid",
			placeItems: "center",
			minWidth: fr,
			height: r,
			borderRadius: "var(--ds-r-item)",
			border: "none",
			cursor: "pointer",
			flexShrink: 0,
			background: e ? "var(--ds-ink)" : "transparent",
			color: e ? "var(--ds-surface-solid)" : "var(--ds-ink-2)"
		},
		children: /* @__PURE__ */ _(qn, { s: {
			insignia: t,
			icono: _r
		} })
	});
}
var _r = /* @__PURE__ */ v("svg", {
	width: "18",
	height: "18",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	"aria-hidden": !0,
	children: [
		/* @__PURE__ */ _("circle", {
			cx: "5",
			cy: "12",
			r: "1.8"
		}),
		/* @__PURE__ */ _("circle", {
			cx: "12",
			cy: "12",
			r: "1.8"
		}),
		/* @__PURE__ */ _("circle", {
			cx: "19",
			cy: "12",
			r: "1.8"
		})
	]
}), vr = 5;
function yr({ marca: e, logo: t, onInicio: n, icono: r, secciones: i, activa: a, onIr: o, derecha: s, inicio: c, inicioAbierto: l = !1, onInicioAbierto: u, volver: d, children: f }) {
	let [p, m] = h(!1), [g, y] = h(null), [b, x] = h(null), S = i.length <= vr, C = S ? i : i.slice(0, 4), w = S ? [] : i.slice(4), T = "calc(52px + env(safe-area-inset-top, 0px) + var(--ds-3))", E = "calc(64px + env(safe-area-inset-bottom, 0px) + var(--ds-4))";
	Un(T, E);
	let D = (e, { esta: t, onClick: n, etiqueta: r }) => /* @__PURE__ */ v("button", {
		onClick: n,
		"aria-current": t ? "page" : void 0,
		style: {
			position: "relative",
			flex: "1 1 0",
			minWidth: 0,
			height: 64,
			border: "none",
			cursor: "pointer",
			background: "transparent",
			padding: "8px 2px 6px",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			gap: 3,
			fontFamily: "var(--ds-font)",
			fontSize: "0.66rem",
			fontWeight: 600,
			color: t ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)",
			WebkitTapHighlightColor: "transparent"
		},
		children: [
			/* @__PURE__ */ _("span", {
				style: {
					display: "grid",
					placeItems: "center",
					width: 52,
					height: 28,
					borderRadius: "var(--ds-r-pill)",
					background: t ? "var(--ds-accent-soft)" : "transparent",
					transition: "background var(--ds-t-state) var(--ds-ease)"
				},
				children: /* @__PURE__ */ _(qn, { s: {
					...e,
					insignia: 0
				} })
			}),
			/* @__PURE__ */ _("span", {
				style: {
					maxWidth: "100%",
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap"
				},
				children: r
			}),
			/* @__PURE__ */ _(Wn, {
				n: e.insignia,
				en: {
					top: 4,
					left: "calc(50% + 5px)"
				}
			})
		]
	}, e.id);
	return /* @__PURE__ */ _(wn.Provider, {
		value: y,
		children: /* @__PURE__ */ v("div", {
			style: {
				minHeight: "100%",
				paddingTop: T,
				paddingBottom: E,
				paddingLeft: "var(--ds-3)",
				paddingRight: "var(--ds-3)"
			},
			children: [
				/* @__PURE__ */ v("header", {
					style: {
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						zIndex: 40,
						height: "calc(52px + env(safe-area-inset-top, 0px))",
						paddingTop: "env(safe-area-inset-top, 0px)",
						boxSizing: "border-box",
						display: "flex",
						alignItems: "center",
						gap: "var(--ds-2)",
						paddingLeft: "var(--ds-3)",
						paddingRight: "var(--ds-3)",
						background: "var(--ds-material)",
						borderBottom: "1px solid var(--ds-line)",
						backdropFilter: "var(--ds-blur)",
						WebkitBackdropFilter: "var(--ds-blur)"
					},
					children: [
						d ? /* @__PURE__ */ v("button", {
							type: "button",
							onClick: d.ir,
							"aria-label": `Volver a ${d.texto}`,
							style: {
								display: "flex",
								alignItems: "center",
								gap: 2,
								minHeight: 44,
								minWidth: 0,
								flex: "0 1 auto",
								overflow: "hidden",
								padding: "0 8px 0 0",
								marginLeft: -6,
								border: "none",
								background: "transparent",
								cursor: "pointer",
								color: "var(--ds-accent-tinta)",
								fontFamily: "var(--ds-font)",
								fontSize: "var(--ds-t-body)",
								fontWeight: 600,
								WebkitTapHighlightColor: "transparent"
							},
							children: [Sr, /* @__PURE__ */ _("span", {
								style: {
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap"
								},
								children: d.texto
							})]
						}) : c ? /* @__PURE__ */ v("button", {
							onClick: () => u?.(!l),
							"aria-label": "Menú de inicio",
							"aria-expanded": l,
							style: {
								display: "flex",
								alignItems: "center",
								gap: 6,
								minHeight: 44,
								minWidth: 0,
								flex: "0 1 auto",
								overflow: "hidden",
								padding: "0 6px 0 2px",
								border: "none",
								background: "transparent",
								cursor: "pointer",
								color: "var(--ds-ink)",
								fontFamily: "var(--ds-font)",
								WebkitTapHighlightColor: "transparent"
							},
							children: [/* @__PURE__ */ _(rr, {
								marca: e,
								logo: t,
								encoge: !0
							}), /* @__PURE__ */ _("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2.2",
								strokeLinecap: "round",
								"aria-hidden": !0,
								style: {
									color: "var(--ds-ink-3)",
									flexShrink: 0,
									transform: l ? "rotate(180deg)" : "none",
									transition: "transform var(--ds-t-state) var(--ds-ease)"
								},
								children: /* @__PURE__ */ _("path", { d: "M6 9l6 6 6-6" })
							})]
						}) : /* @__PURE__ */ _("span", {
							style: {
								display: "flex",
								minWidth: 0,
								opacity: +!g,
								pointerEvents: g ? "none" : void 0,
								transition: "opacity var(--ds-t-state) var(--ds-ease)"
							},
							children: /* @__PURE__ */ _(rr, {
								marca: e,
								logo: t,
								onInicio: n,
								encoge: !0
							})
						}),
						/* @__PURE__ */ _("div", { style: {
							flex: 1,
							minWidth: 0
						} }),
						/* @__PURE__ */ _("span", {
							"aria-hidden": !0,
							style: {
								position: "absolute",
								left: "50%",
								bottom: 0,
								height: 52,
								display: "flex",
								alignItems: "center",
								translate: "-50% 0",
								maxWidth: d ? "38%" : "50%",
								pointerEvents: "none",
								fontSize: "var(--ds-t-body)",
								fontWeight: 600,
								color: "var(--ds-ink)",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
								opacity: +!!g,
								transition: "opacity var(--ds-t-state) var(--ds-ease)"
							},
							children: g
						}),
						/* @__PURE__ */ _("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "var(--ds-2)",
								flexShrink: 0
							},
							children: s
						})
					]
				}),
				/* @__PURE__ */ _("main", { children: f }),
				/* @__PURE__ */ v("nav", {
					"aria-label": "Navegación principal",
					style: {
						position: "fixed",
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: 40,
						paddingBottom: "env(safe-area-inset-bottom, 0px)",
						display: "flex",
						alignItems: "stretch",
						background: "var(--ds-material)",
						borderTop: "1px solid var(--ds-line)",
						backdropFilter: "var(--ds-blur)",
						WebkitBackdropFilter: "var(--ds-blur)"
					},
					children: [C.map((e) => D(e, {
						esta: Jn(e, a),
						etiqueta: e.texto,
						onClick: K(e) ? () => x(e) : () => o?.(e)
					})), w.length > 0 && D({
						id: "__mas",
						icono: _r,
						insignia: Xn(w)
					}, {
						esta: w.some((e) => Jn(e, a)),
						onClick: () => m(!0),
						etiqueta: "Más"
					})]
				}),
				/* @__PURE__ */ _(sr, {
					abierto: p,
					onCerrar: () => m(!1),
					secciones: w,
					activa: a,
					onIr: o
				}),
				/* @__PURE__ */ _(sr, {
					abierto: !!b,
					onCerrar: () => x(null),
					titulo: b?.texto,
					secciones: b ? [b] : [],
					activa: a,
					onIr: o
				}),
				c
			]
		})
	});
}
function br({ abierto: e, onClick: t, icono: n }) {
	return /* @__PURE__ */ _("button", {
		onClick: t,
		"aria-label": "Menú de inicio",
		"aria-expanded": e,
		title: "Inicio",
		style: {
			display: "grid",
			placeItems: "center",
			width: 44,
			height: 44,
			flexShrink: 0,
			borderRadius: "var(--ds-r-item)",
			border: "none",
			cursor: "pointer",
			background: e ? "var(--ds-surface-solid)" : "transparent",
			boxShadow: e ? "var(--ds-lift-1)" : "none",
			transition: "background var(--ds-t-state) var(--ds-ease), transform var(--ds-t-state) var(--ds-ease)"
		},
		onMouseEnter: (e) => {
			e.currentTarget.style.transform = "translateY(-4px)";
		},
		onMouseLeave: (e) => {
			e.currentTarget.style.transform = "none";
		},
		children: /* @__PURE__ */ _("span", {
			style: {
				display: "grid",
				placeItems: "center",
				width: 26,
				height: 26,
				transform: e ? "scale(0.92)" : "none",
				transition: "transform var(--ds-t-move) var(--ds-ease)"
			},
			children: n || /* @__PURE__ */ _("span", { style: {
				width: 22,
				height: 22,
				borderRadius: 7,
				background: "var(--ds-hero)",
				boxShadow: "var(--ds-lift-accent)",
				display: "block"
			} })
		})
	});
}
function xr(e, t, n) {
	for (let r of e) {
		if (r.id === t) return [{
			texto: r.texto,
			ir: () => n?.(r)
		}];
		let e = K(r) ? r.hijos.find((e) => e.id === t) : null;
		if (e) return [{
			texto: r.texto,
			ir: Yn(r) ? () => n?.(r) : void 0
		}, {
			texto: e.texto,
			ir: () => n?.(e)
		}];
	}
	return [];
}
var Sr = /* @__PURE__ */ _("svg", {
	width: "20",
	height: "20",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2.2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	style: { flexShrink: 0 },
	children: /* @__PURE__ */ _("path", { d: "M15 18l-6-6 6-6" })
});
function Cr({ marca: e, logo: t, onInicio: n, icono: r, secciones: i = [], activa: a, onIr: o, derecha: s, inicio: l, inicioAbierto: d, onInicioAbierto: f, migas: p, modo: m, vista: g, children: y }) {
	let [b, x] = h(() => m || Vn()), S = G();
	u(() => {
		g !== void 0 && window.scrollTo({
			top: 0,
			left: 0
		});
	}, [g]), u(() => {
		if (m) x(m);
		else try {
			localStorage.setItem(Fn, b);
		} catch {}
	}, [b, m]);
	let C = c((e) => {
		In.includes(e) && x(e);
	}, []), w = Array.isArray(p) ? [...xr(i, a, o), ...p] : null, T = w && w.length > 1 ? w[w.length - 2] : null, E = w ? !S && w.length > 1 ? /* @__PURE__ */ _(yn, { ruta: w }) : null : p, D = /* @__PURE__ */ v(On, {
		vista: g,
		children: [E, y]
	}), O = {
		marca: e,
		logo: t,
		onInicio: n,
		icono: r,
		secciones: i.map(Zn),
		activa: a,
		onIr: o,
		derecha: s,
		inicio: l,
		inicioAbierto: d,
		onInicioAbierto: f,
		children: D,
		volver: T?.ir ? {
			texto: T.texto,
			ir: T.ir
		} : null
	}, k = S ? yr : b === "sidebar" ? dr : b === "dock" ? hr : cr;
	return /* @__PURE__ */ _(zn.Provider, {
		value: {
			modo: S ? "dock" : b,
			preferencia: b,
			movil: S,
			fijarModo: C,
			modos: In
		},
		children: /* @__PURE__ */ _(k, { ...O })
	});
}
function wr() {
	let { preferencia: e, fijarModo: t, movil: n } = Bn(), [r, i] = h(!1), [a, o] = h(null), s = m(null), c = m(null), l = [
		{
			id: "topbar",
			texto: "Barra arriba",
			icono: "M3 5h18M3 5v14h18V5"
		},
		{
			id: "sidebar",
			texto: "Menú lateral",
			icono: "M3 5h18v14H3zM9 5v14"
		},
		{
			id: "dock",
			texto: "Dock abajo",
			icono: "M3 5h18v14H3zM3 15h18"
		}
	], d = l.find((t) => t.id === e) || l[0], p = e === "dock";
	if (f(() => {
		if (!r) return;
		let e = () => {
			let e = s.current?.getBoundingClientRect();
			if (!e) return;
			let t = c.current?.offsetWidth || 190, n = c.current?.offsetHeight || 160, r = e.left + e.width / 2 < window.innerWidth / 2 ? e.left : e.right - t;
			r = Math.min(Math.max(8, r), window.innerWidth - t - 8);
			let i = p ? e.top - n - 10 : e.bottom + 10;
			i = Math.min(Math.max(8, i), window.innerHeight - n - 8), o({
				izq: r,
				arriba: i
			});
		};
		e();
		let t = requestAnimationFrame(e);
		return window.addEventListener("resize", e), window.addEventListener("scroll", e, !0), () => {
			cancelAnimationFrame(t), window.removeEventListener("resize", e), window.removeEventListener("scroll", e, !0);
		};
	}, [r, p]), u(() => {
		if (!r) return;
		let e = (e) => {
			e.key === "Escape" && (e.stopPropagation(), i(!1));
		}, t = (e) => {
			s.current?.contains(e.target) || c.current?.contains(e.target) || i(!1);
		};
		return document.addEventListener("keydown", e, !0), document.addEventListener("mousedown", t, !0), () => {
			document.removeEventListener("keydown", e, !0), document.removeEventListener("mousedown", t, !0);
		};
	}, [r]), n) return null;
	let g = (e) => /* @__PURE__ */ _("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.9",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: /* @__PURE__ */ _("path", { d: e })
	});
	return /* @__PURE__ */ v("div", {
		ref: s,
		style: {
			position: "relative",
			flexShrink: 0
		},
		children: [/* @__PURE__ */ _("button", {
			onClick: () => i((e) => !e),
			"aria-haspopup": "menu",
			"aria-expanded": r,
			title: `Navegación: ${d.texto}`,
			"aria-label": `Navegación: ${d.texto}`,
			style: {
				display: "grid",
				placeItems: "center",
				width: 36,
				height: 36,
				borderRadius: "var(--ds-r-pill)",
				cursor: "pointer",
				background: r ? "var(--ds-surface-solid)" : "var(--ds-surface)",
				border: "1px solid var(--ds-line)",
				color: r ? "var(--ds-ink)" : "var(--ds-ink-2)",
				transition: "background var(--ds-t-state) var(--ds-ease)"
			},
			children: g(d.icono)
		}), r && a && y(/* @__PURE__ */ v("div", {
			role: "menu",
			ref: c,
			className: "ds-capa",
			style: {
				position: "fixed",
				left: a.izq,
				top: a.arriba,
				zIndex: 70,
				minWidth: 186,
				padding: "var(--ds-2)",
				borderRadius: "var(--ds-r-card)",
				background: "var(--ds-panel)",
				border: "1px solid var(--ds-line)",
				backdropFilter: "var(--ds-blur)",
				WebkitBackdropFilter: "var(--ds-blur)",
				boxShadow: "var(--ds-lift-3)",
				animation: `${p ? "ds-sube" : "ds-baja"} var(--ds-t-state) var(--ds-ease) both`
			},
			children: [/* @__PURE__ */ _("div", {
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					letterSpacing: "0.05em",
					textTransform: "uppercase",
					color: "var(--ds-ink-3)",
					padding: "4px 10px 7px"
				},
				children: "Navegación"
			}), l.map((n) => {
				let r = n.id === e;
				return /* @__PURE__ */ v("button", {
					role: "menuitemradio",
					"aria-checked": r,
					onClick: () => {
						t(n.id), i(!1);
					},
					style: {
						display: "flex",
						alignItems: "center",
						gap: "var(--ds-3)",
						width: "100%",
						fontFamily: "var(--ds-font)",
						fontSize: "var(--ds-t-small)",
						fontWeight: 600,
						padding: "9px 10px",
						borderRadius: "var(--ds-r-item)",
						border: "none",
						cursor: "pointer",
						textAlign: "left",
						whiteSpace: "nowrap",
						background: r ? "var(--ds-accent-soft)" : "transparent",
						color: r ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)",
						transition: "background var(--ds-t-state) var(--ds-ease)"
					},
					onMouseEnter: (e) => {
						r || (e.currentTarget.style.background = "var(--ds-surface-2)");
					},
					onMouseLeave: (e) => {
						r || (e.currentTarget.style.background = "transparent");
					},
					children: [
						g(n.icono),
						/* @__PURE__ */ _("span", {
							style: { flex: 1 },
							children: n.texto
						}),
						r && /* @__PURE__ */ _("svg", {
							width: "15",
							height: "15",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2.4",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							"aria-hidden": !0,
							children: /* @__PURE__ */ _("path", { d: "M20 6L9 17l-5-5" })
						})
					]
				}, n.id);
			})]
		}), document.body)]
	});
}
// src/primitivas/Seleccion.jsx
function Tr({ marcada: e = !1, onCambio: t, etiqueta: n, deshabilitado: r = !1 }) {
	let i = e === "mixta", a = e === !0 || i;
	return /* @__PURE__ */ _("button", {
		type: "button",
		role: "checkbox",
		"aria-checked": i ? "mixed" : !!e,
		"aria-label": n,
		title: n,
		disabled: r,
		onClick: (n) => {
			n.stopPropagation(), t?.(e !== !0);
		},
		style: {
			display: "inline-grid",
			placeItems: "center",
			width: 20,
			height: 20,
			padding: 0,
			flexShrink: 0,
			borderRadius: "var(--ds-r-mini)",
			cursor: r ? "not-allowed" : "pointer",
			border: `1.5px solid ${a ? "var(--ds-accent-trazo)" : "var(--ds-line-firm)"}`,
			background: a ? "var(--ds-accent)" : "var(--ds-surface-solid)",
			color: "var(--ds-ink-on-accent)",
			opacity: r ? .5 : 1,
			transition: "background var(--ds-t-tap) var(--ds-ease), border-color var(--ds-t-tap) var(--ds-ease)"
		},
		children: a && /* @__PURE__ */ _("svg", {
			width: "13",
			height: "13",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "3",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": !0,
			children: /* @__PURE__ */ _("path", { d: i ? "M6 12h12" : "M20 6L9 17l-5-5" })
		})
	});
}
function Er({ cantidad: e = 0, onQuitar: t, children: n, singular: r = "seleccionado", plural: i = "seleccionados" }) {
	let { modo: a } = Bn();
	return e ? /* @__PURE__ */ _("div", {
		role: "region",
		"aria-label": "Acciones sobre la selección",
		style: {
			position: "fixed",
			left: 0,
			right: 0,
			bottom: a === "dock" ? 64 : 0,
			zIndex: 25,
			display: "flex",
			justifyContent: "center",
			padding: "var(--ds-3) var(--ds-4)",
			paddingBottom: "calc(var(--ds-3) + env(safe-area-inset-bottom, 0px))",
			background: "var(--ds-panel)",
			borderTop: "1px solid var(--ds-line)",
			backdropFilter: "var(--ds-blur)",
			WebkitBackdropFilter: "var(--ds-blur)",
			animation: "ds-sube var(--ds-t-move) var(--ds-ease) both"
		},
		children: /* @__PURE__ */ v("div", {
			style: {
				width: "100%",
				maxWidth: 1200,
				display: "flex",
				alignItems: "center",
				gap: "var(--ds-2)",
				flexWrap: "wrap"
			},
			children: [
				/* @__PURE__ */ v("span", {
					className: "ds-num",
					"aria-live": "polite",
					style: {
						fontWeight: 700,
						color: "var(--ds-ink)",
						fontSize: "var(--ds-t-body)",
						marginRight: "var(--ds-2)"
					},
					children: [
						e,
						" ",
						e === 1 ? r : i
					]
				}),
				/* @__PURE__ */ _("span", { style: { flex: 1 } }),
				n,
				/* @__PURE__ */ _(H, {
					variante: "fantasma",
					onClick: t,
					children: "Quitar selección"
				})
			]
		})
	}) : null;
}
// src/primitivas/Tabla.jsx
function Dr({ columnas: e = [], filas: t = [], claveFila: n, onFila: r, vacio: i = "No hay nada que mostrar.", cargando: a = !1, porPagina: o = 0, seleccion: s, estilo: c }) {
	let [l, d] = h(1), f = t.length, m = o > 0 && f > o, g = m ? Math.ceil(f / o) : 1;
	u(() => {
		d((e) => Math.min(Math.max(1, e), Math.max(1, g)));
	}, [g, f]), u(() => {
		d(1);
	}, [o]);
	let y = p(() => m ? t.slice((l - 1) * o, l * o) : t, [
		t,
		l,
		o,
		m
	]), b = !!(s && n), x = p(() => new Set((s?.elegidos || []).map(String)), [s?.elegidos]), S = p(() => b ? t.map((e) => String(n(e))) : [], [
		b,
		t,
		n
	]), C = S.filter((e) => x.has(e)).length, w = C === 0 ? !1 : C === S.length || "mixta", T = () => s.onCambio(w === !0 ? [] : S), E = (e) => s.onCambio(x.has(e) ? [...x].filter((t) => t !== e) : [...x, e]), D = e.length + +!!b, O = f === 0 ? 0 : (l - 1) * o + 1, k = m ? Math.min(l * o, f) : f;
	return /* @__PURE__ */ v("div", {
		style: c,
		children: [/* @__PURE__ */ _("div", {
			style: { overflowX: "auto" },
			children: /* @__PURE__ */ v("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse",
					fontFamily: "var(--ds-font)"
				},
				children: [/* @__PURE__ */ _("thead", { children: /* @__PURE__ */ v("tr", { children: [b && /* @__PURE__ */ _("th", {
					scope: "col",
					style: {
						width: 36,
						padding: "0 var(--ds-2) var(--ds-3) var(--ds-3)",
						borderBottom: "1px solid var(--ds-line)"
					},
					children: /* @__PURE__ */ _(Tr, {
						marcada: w,
						onCambio: T,
						deshabilitado: S.length === 0,
						etiqueta: w === !0 ? "Quitar todos" : "Elegir todos"
					})
				}), e.map((e) => /* @__PURE__ */ _("th", {
					scope: "col",
					style: {
						textAlign: e.numerica ? "right" : "left",
						fontSize: "var(--ds-t-micro)",
						fontWeight: 600,
						letterSpacing: "0.05em",
						textTransform: "uppercase",
						color: "var(--ds-ink-3)",
						padding: "0 var(--ds-3) var(--ds-3)",
						whiteSpace: "nowrap",
						borderBottom: "1px solid var(--ds-line)"
					},
					children: e.titulo
				}, e.clave))] }) }), /* @__PURE__ */ v("tbody", { children: [
					a && Array.from({ length: Math.max(3, Math.min(o || 6, 8)) }, (t, n) => /* @__PURE__ */ v("tr", {
						style: { opacity: 1 - n * .1 },
						children: [b && /* @__PURE__ */ _("td", { style: { borderBottom: "1px solid var(--ds-line)" } }), e.map((e, t) => /* @__PURE__ */ _("td", {
							style: {
								padding: "var(--ds-3)",
								borderBottom: "1px solid var(--ds-line)"
							},
							children: /* @__PURE__ */ v("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "var(--ds-3)",
									justifyContent: e.numerica ? "flex-end" : "flex-start"
								},
								children: [t === 0 && /* @__PURE__ */ _(z, {
									circulo: !0,
									alto: 36
								}), /* @__PURE__ */ _(z, {
									alto: 11,
									ancho: t === 0 ? "58%" : e.numerica ? 46 : "72%"
								})]
							})
						}, e.clave))]
					}, `esq-${n}`)),
					!a && f === 0 && /* @__PURE__ */ _("tr", { children: /* @__PURE__ */ _("td", {
						colSpan: D,
						style: {
							padding: "var(--ds-8) 0",
							textAlign: "center",
							color: "var(--ds-ink-3)",
							fontSize: "var(--ds-t-body)"
						},
						children: i
					}) }),
					!a && y.map((t, i) => {
						let a = !!r, o = b ? String(n(t)) : null, c = b && x.has(o), l = c ? "var(--ds-accent-soft)" : "transparent";
						return /* @__PURE__ */ v("tr", {
							"aria-selected": b ? c : void 0,
							onClick: a ? () => r(t) : void 0,
							style: {
								cursor: a ? "pointer" : void 0,
								background: l,
								transition: "background var(--ds-t-state) var(--ds-ease)"
							},
							onMouseEnter: a ? (e) => {
								e.currentTarget.style.background = "var(--ds-surface-2)";
							} : void 0,
							onMouseLeave: a ? (e) => {
								e.currentTarget.style.background = l;
							} : void 0,
							children: [b && /* @__PURE__ */ _("td", {
								style: {
									padding: "var(--ds-3) var(--ds-2) var(--ds-3) var(--ds-3)",
									width: 36,
									verticalAlign: "middle",
									borderBottom: "1px solid var(--ds-line)"
								},
								children: /* @__PURE__ */ _(Tr, {
									marcada: c,
									onCambio: () => E(o),
									etiqueta: s.etiqueta ? s.etiqueta(t) : "Elegir renglón"
								})
							}), e.map((e) => /* @__PURE__ */ _("td", {
								className: e.numerica ? "ds-num" : void 0,
								style: {
									textAlign: e.numerica ? "right" : "left",
									fontSize: "var(--ds-t-small)",
									fontWeight: e.fuerte ? 700 : 500,
									color: e.fuerte ? "var(--ds-ink)" : "var(--ds-ink-2)",
									padding: "var(--ds-3)",
									verticalAlign: "middle",
									borderBottom: "1px solid var(--ds-line)"
								},
								children: e.render ? e.render(t) : t[e.clave]
							}, e.clave))]
						}, n ? n(t) : i);
					})
				] })]
			})
		}), m && !a && /* @__PURE__ */ v("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: "var(--ds-3)",
				flexWrap: "wrap",
				paddingTop: "var(--ds-4)",
				marginTop: "var(--ds-1)",
				borderTop: "1px solid var(--ds-line)"
			},
			children: [
				/* @__PURE__ */ v("span", {
					className: "ds-num",
					style: {
						fontSize: "var(--ds-t-small)",
						color: "var(--ds-ink-3)",
						fontWeight: 600
					},
					children: [
						O,
						"–",
						k,
						" de ",
						f
					]
				}),
				/* @__PURE__ */ _("span", { style: { flex: 1 } }),
				/* @__PURE__ */ _(Or, {
					texto: "Anterior",
					hacia: "M15 18l-6-6 6-6",
					inactivo: l <= 1,
					onClick: () => d((e) => Math.max(1, e - 1))
				}),
				/* @__PURE__ */ v("span", {
					className: "ds-num",
					style: {
						fontSize: "var(--ds-t-small)",
						fontWeight: 600,
						color: "var(--ds-ink-2)"
					},
					children: [
						l,
						" / ",
						g
					]
				}),
				/* @__PURE__ */ _(Or, {
					texto: "Siguiente",
					hacia: "M9 18l6-6-6-6",
					inactivo: l >= g,
					derecha: !0,
					onClick: () => d((e) => Math.min(g, e + 1))
				})
			]
		})]
	});
}
function Or({ texto: e, hacia: t, inactivo: n, derecha: r, onClick: i }) {
	return /* @__PURE__ */ v("button", {
		onClick: i,
		disabled: n,
		"aria-label": e,
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 6,
			flexDirection: r ? "row-reverse" : "row",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 600,
			padding: "7px 13px",
			borderRadius: "var(--ds-r-item)",
			border: "1px solid var(--ds-line)",
			background: "var(--ds-surface)",
			color: n ? "var(--ds-ink-3)" : "var(--ds-ink)",
			opacity: n ? .45 : 1,
			cursor: n ? "not-allowed" : "pointer",
			transition: "background var(--ds-t-state) var(--ds-ease)"
		},
		children: [/* @__PURE__ */ _("svg", {
			width: "15",
			height: "15",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": !0,
			children: /* @__PURE__ */ _("path", { d: t })
		}), e]
	});
}
// src/primitivas/Formulario.jsx
function kr(e) {
	return e.length <= 1 ? e[0] || "" : `${e.slice(0, -1).join(", ")} y ${e[e.length - 1]}`;
}
function Ar({ titulo: e, nota: t, children: n, onCancelar: r, cancelarTexto: i = "Cancelar", accion: a, ancho: o = 820, problemas: s = [], refCuerpo: c }) {
	let { modo: l } = Bn(), u = l === "dock" ? 64 : 0;
	return /* @__PURE__ */ v("div", {
		style: {
			maxWidth: o,
			margin: "0 auto",
			paddingBottom: 96 + u
		},
		children: [
			/* @__PURE__ */ v("div", {
				style: {
					marginBottom: "var(--ds-6)",
					padding: "0 var(--ds-2)"
				},
				children: [/* @__PURE__ */ _("h1", {
					style: {
						margin: 0,
						fontSize: "var(--ds-t-display)",
						fontWeight: 700,
						letterSpacing: "-0.045em",
						lineHeight: 1.02,
						color: "var(--ds-ink)"
					},
					children: e
				}), t && /* @__PURE__ */ _("p", {
					style: {
						margin: "6px 0 0",
						fontSize: "var(--ds-t-body)",
						color: "var(--ds-ink-3)",
						maxWidth: 620
					},
					children: t
				})]
			}),
			s.length > 0 && /* @__PURE__ */ v("div", {
				role: "alert",
				style: {
					display: "flex",
					gap: "var(--ds-3)",
					alignItems: "flex-start",
					padding: "var(--ds-4)",
					marginBottom: "var(--ds-4)",
					borderRadius: "var(--ds-r-item)",
					background: "var(--ds-risk-soft)",
					color: "var(--ds-risk)",
					fontSize: "var(--ds-t-small)",
					fontWeight: 600
				},
				children: [/* @__PURE__ */ v("svg", {
					width: "17",
					height: "17",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					"aria-hidden": !0,
					style: {
						flexShrink: 0,
						marginTop: 1
					},
					children: [/* @__PURE__ */ _("circle", {
						cx: "12",
						cy: "12",
						r: "9"
					}), /* @__PURE__ */ _("path", { d: "M12 8v5M12 16h.01" })]
				}), /* @__PURE__ */ v("span", { children: [
					s.length === 1 ? /* @__PURE__ */ v(g, { children: [
						"Falta revisar ",
						/* @__PURE__ */ _("b", { children: s[0] }),
						"."
					] }) : /* @__PURE__ */ v(g, { children: [
						"Faltan ",
						s.length,
						" datos: ",
						/* @__PURE__ */ _("b", { children: kr(s) }),
						"."
					] }),
					" ",
					"Cada campo dice abajo qué necesita."
				] })]
			}),
			/* @__PURE__ */ _(j, {
				entrada: 0,
				children: /* @__PURE__ */ _("div", {
					ref: c,
					style: {
						display: "grid",
						gap: "var(--ds-5)"
					},
					children: n
				})
			}),
			/* @__PURE__ */ _("div", {
				style: {
					position: "fixed",
					left: 0,
					right: 0,
					bottom: u,
					zIndex: 25,
					display: "flex",
					justifyContent: "center",
					padding: "var(--ds-3) var(--ds-4)",
					paddingBottom: "calc(var(--ds-3) + env(safe-area-inset-bottom, 0px))",
					background: "var(--ds-panel)",
					borderTop: "1px solid var(--ds-line)",
					backdropFilter: "var(--ds-blur)",
					WebkitBackdropFilter: "var(--ds-blur)"
				},
				children: /* @__PURE__ */ v("div", {
					style: {
						width: "100%",
						maxWidth: o,
						display: "flex",
						justifyContent: "flex-end",
						gap: "var(--ds-2)",
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ _(H, {
						variante: "fantasma",
						onClick: r,
						children: i
					}), a]
				})
			})
		]
	});
}
function jr({ children: e, minimo: t = 220, estilo: n }) {
	return /* @__PURE__ */ _("div", {
		style: {
			display: "grid",
			gap: "var(--ds-4)",
			gridTemplateColumns: `repeat(auto-fit, minmax(${t}px, 1fr))`,
			...n
		},
		children: e
	});
}
// src/validacion.js
var Mr = (e) => e == null || String(e).trim() === "", Nr = (e = "Este dato es obligatorio.") => (t) => Mr(t) ? e : null, Pr = (e, t) => (n) => !Mr(n) && String(n).trim().length > e ? t || `No puede pasar de ${e} caracteres; llevas ${String(n).trim().length}.` : null, Fr = (e, t) => (n) => !Mr(n) && String(n).trim().length < e ? t || `Necesita al menos ${e} caracteres.` : null, Ir = ({ desde: e = null, hasta: t = null, mensaje: n } = {}) => (r) => {
	if (Mr(r)) return null;
	let i = Number(String(r).replace(/,/g, ""));
	return Number.isNaN(i) ? n || "Tiene que ser un número." : e !== null && i < e ? n || `Tiene que ser un número mayor o igual a ${e}.` : t !== null && i > t ? n || `No puede pasar de ${t}.` : null;
}, Lr = (e, t, n) => (r) => {
	if (Mr(r)) return null;
	let i = String(r).replace(/\D/g, "").length;
	return i < e || i > t ? n || `Debe tener de ${e} a ${t} dígitos.` : null;
}, Rr = (e, t) => (n) => !Mr(n) && !RegExp(`^\\d{${e}}$`).test(String(n).trim()) ? t || `Debe tener exactamente ${e} dígitos, sin espacios ni guiones.` : null, zr = (e = "El correo debe llevar arroba y dominio, como nombre@dominio.com.") => (t) => !Mr(t) && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(t).trim()) ? e : null, Br = (e, t) => (n) => !Mr(n) && !e.test(String(n).trim()) ? t : null, Vr = (e, t) => (n, r) => e(n, r) ? null : t;
function Hr(e) {
	let t = p(() => Object.fromEntries(Object.entries(e).map(([e, t]) => [e, t.valor ?? ""])), []), [n, r] = h(t), [i, a] = h({}), [o, s] = h(!1), l = m(null), u = p(() => {
		let t = {};
		return Object.entries(e).forEach(([e, r]) => {
			for (let i of r.reglas || []) {
				let r = i(n[e], n);
				if (r) {
					t[e] = r;
					break;
				}
			}
		}), t;
	}, [n, e]), d = c((e) => (t) => {
		r((n) => ({
			...n,
			[e]: t
		}));
	}, []), f = c((e) => () => {
		a((t) => t[e] ? t : {
			...t,
			[e]: !0
		});
	}, []), g = c((t) => {
		let r = e[t] || {}, a = o || i[t];
		return {
			etiqueta: r.etiqueta,
			valor: n[t] ?? "",
			onCambio: d(t),
			onSalir: f(t),
			error: a ? u[t] : void 0,
			ayuda: r.ayuda,
			requerido: (r.reglas || []).some((e) => {
				try {
					return e("", n) !== null;
				} catch {
					return !1;
				}
			})
		};
	}, [
		e,
		n,
		u,
		i,
		o,
		d,
		f
	]);
	return {
		valores: n,
		errores: u,
		problemas: p(() => o ? Object.keys(u).map((t) => e[t]?.etiqueta || t) : [], [
			o,
			u,
			e
		]),
		intentado: o,
		campo: g,
		poner: d,
		marcar: f,
		intentar: c((e) => (s(!0), Object.keys(u).length > 0 ? (requestAnimationFrame(() => {
			let e = l.current?.querySelector("[data-error=\"si\"]");
			e?.scrollIntoView({
				block: "center",
				behavior: "smooth"
			});
			let t = e?.querySelector("input, textarea, select, [role='combobox']");
			try {
				t?.focus({ preventScroll: !0 });
			} catch {}
		}), !1) : (e(n), !0)), [u, n]),
		limpiar: c(() => {
			r(t), a({}), s(!1);
		}, [t]),
		cuerpo: l,
		setValores: r
	};
}
// src/filtros.js
var Ur = (e) => `ds-filtros:${e}`, Wr = (e) => {
	try {
		let t = sessionStorage.getItem(Ur(e));
		return t ? JSON.parse(t) : null;
	} catch {
		return null;
	}
}, Gr = (e, t) => {
	try {
		sessionStorage.setItem(Ur(e), JSON.stringify(t));
	} catch {}
};
function Kr(e, t) {
	let n = m(t), [r, i] = h(() => {
		let t = Wr(e);
		if (!t) return { ...n.current };
		let r = { ...n.current };
		return Object.keys(n.current).forEach((e) => {
			t[e] !== void 0 && (r[e] = t[e]);
		}), r;
	});
	return u(() => {
		Gr(e, r);
	}, [e, r]), [
		r,
		c((e, t) => {
			i((n) => ({
				...n,
				[e]: t
			}));
		}, []),
		c(() => {
			i({ ...n.current });
		}, []),
		Object.keys(n.current).some((e) => String(r[e] ?? "") !== String(n.current[e] ?? "")),
		i
	];
}
// src/primitivas/Pestanas.jsx
function qr({ pestanas: e = [], activa: t, onCambio: n, estilo: r }) {
	let i = m([]);
	return /* @__PURE__ */ _("div", {
		role: "tablist",
		onKeyDown: (r) => {
			let a = e.findIndex((e) => e.id === t), o = r.key === "ArrowRight" ? 1 : r.key === "ArrowLeft" ? -1 : 0;
			if (!o) return;
			r.preventDefault();
			let s = (a + o + e.length) % e.length;
			n?.(e[s].id), i.current[s]?.focus();
		},
		style: {
			display: "flex",
			gap: "var(--ds-1)",
			flexWrap: "wrap",
			padding: 4,
			borderRadius: "var(--ds-r-pill)",
			width: "fit-content",
			maxWidth: "100%",
			background: "var(--ds-surface-2)",
			border: "1px solid var(--ds-line)",
			...r
		},
		children: e.map((e, r) => {
			let a = e.id === t;
			return /* @__PURE__ */ v("button", {
				role: "tab",
				"aria-selected": a,
				tabIndex: a ? 0 : -1,
				ref: (e) => {
					i.current[r] = e;
				},
				onClick: () => n?.(e.id),
				style: {
					display: "inline-flex",
					alignItems: "center",
					gap: 7,
					whiteSpace: "nowrap",
					fontFamily: "var(--ds-font)",
					fontSize: "var(--ds-t-small)",
					fontWeight: 600,
					padding: "8px 15px",
					borderRadius: "var(--ds-r-pill)",
					border: "none",
					cursor: "pointer",
					background: a ? "var(--ds-ink)" : "transparent",
					color: a ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
					transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
				},
				children: [
					e.icono,
					e.texto,
					e.cuenta !== void 0 && /* @__PURE__ */ _("span", {
						className: "ds-num",
						style: {
							fontSize: "var(--ds-t-micro)",
							fontWeight: 700,
							padding: "1px 6px",
							borderRadius: "var(--ds-r-pill)",
							background: a ? "rgba(255,255,255,0.18)" : "var(--ds-surface)",
							color: a ? "var(--ds-surface-solid)" : "var(--ds-ink-3)"
						},
						children: e.cuenta
					})
				]
			}, e.id);
		})
	});
}
function Jr({ texto: e = "Cargando…", alto: t = 200 }) {
	return /* @__PURE__ */ v("div", {
		role: "status",
		style: {
			display: "grid",
			placeItems: "center",
			gap: "var(--ds-3)",
			minHeight: t,
			color: "var(--ds-ink-3)",
			fontSize: "var(--ds-t-small)"
		},
		children: [/* @__PURE__ */ _("svg", {
			width: "26",
			height: "26",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.4",
			strokeLinecap: "round",
			"aria-hidden": !0,
			style: {
				animation: "ds-girar 900ms linear infinite",
				color: "var(--ds-accent-trazo)"
			},
			children: /* @__PURE__ */ _("path", { d: "M12 3a9 9 0 019 9" })
		}), e]
	});
}
// src/PanelInicio.jsx
var Yr = /* @__PURE__ */ v("svg", {
	width: "17",
	height: "17",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	children: [/* @__PURE__ */ _("circle", {
		cx: "11",
		cy: "11",
		r: "7"
	}), /* @__PURE__ */ _("path", { d: "M20 20l-3.5-3.5" })]
}), Xr = /* @__PURE__ */ _("svg", {
	width: "16",
	height: "16",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: /* @__PURE__ */ _("path", { d: "M5 12h14M13 6l6 6-6 6" })
});
function Zr({ children: e }) {
	return /* @__PURE__ */ _("div", {
		style: {
			fontSize: "var(--ds-t-small)",
			fontWeight: 700,
			color: "var(--ds-ink-2)",
			letterSpacing: "-0.01em",
			margin: "0 0 var(--ds-3)"
		},
		children: e
	});
}
function Qr({ item: e, onIr: t }) {
	let [n, r] = o.useState(!1), i = e.color || "var(--ds-ink-2)";
	return /* @__PURE__ */ v("button", {
		onClick: () => {
			t(e);
		},
		onMouseEnter: () => r(!0),
		onMouseLeave: () => r(!1),
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-3)",
			width: "100%",
			padding: "9px 10px",
			borderRadius: "var(--ds-r-item)",
			border: "none",
			cursor: "pointer",
			textAlign: "left",
			fontFamily: "var(--ds-font)",
			background: n ? "var(--ds-surface-2)" : "transparent",
			transition: "background var(--ds-t-state) var(--ds-ease)"
		},
		children: [
			/* @__PURE__ */ _("span", {
				style: {
					display: "grid",
					placeItems: "center",
					width: 30,
					height: 30,
					flexShrink: 0,
					borderRadius: 9,
					background: `${i}1F`,
					color: i,
					overflow: "hidden"
				},
				children: e.retrato ? /* @__PURE__ */ _("img", {
					src: e.retrato,
					alt: "",
					style: {
						width: "100%",
						height: "100%",
						objectFit: "cover"
					}
				}) : e.icono
			}),
			/* @__PURE__ */ v("span", {
				style: {
					minWidth: 0,
					flex: 1
				},
				children: [/* @__PURE__ */ _("span", {
					style: {
						display: "block",
						fontSize: "var(--ds-t-small)",
						fontWeight: 600,
						color: "var(--ds-ink)",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis"
					},
					children: e.texto
				}), e.subtitulo && /* @__PURE__ */ _("span", {
					style: {
						display: "block",
						fontSize: "var(--ds-t-micro)",
						fontWeight: 600,
						color: "var(--ds-ink-3)",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis"
					},
					children: e.subtitulo
				})]
			}),
			/* @__PURE__ */ _("span", {
				style: {
					color: "var(--ds-ink-3)",
					opacity: +!!n,
					flexShrink: 0,
					transition: "opacity var(--ds-t-state) var(--ds-ease)"
				},
				children: Xr
			})
		]
	});
}
function $r({ abierto: e, onCerrar: t, usuario: n, acciones: r, recientes: i = [], tituloRecientes: a = "Reciente", grupos: o = [], busqueda: s = "", onBusqueda: l, resultados: d = null, marcadorBusqueda: f = "Buscar…", onIr: h }) {
	let y = m(null), b = m(null);
	u(() => {
		if (!e) return;
		let n = (e) => {
			e.key === "Escape" && (e.stopPropagation(), t?.());
		};
		document.addEventListener("keydown", n, !0);
		let r = setTimeout(() => y.current?.focus(), 90);
		return () => {
			document.removeEventListener("keydown", n, !0), clearTimeout(r);
		};
	}, [e, t]);
	let x = c((e) => {
		t?.(), (e.onIr || h)?.(e);
	}, [t, h]), S = s.trim().length > 0, C = S && d && d.length === 0, w = p(() => {
		let e = 0;
		return o.map((t) => t.items.map(() => e++));
	}, [o]);
	return e ? /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _("div", {
		onClick: t,
		"aria-hidden": "true",
		style: {
			position: "fixed",
			inset: 0,
			zIndex: 50,
			background: "rgba(8,9,15,0.28)",
			backdropFilter: "blur(2px)",
			WebkitBackdropFilter: "blur(2px)",
			animation: "ds-fade var(--ds-t-state) var(--ds-ease) both"
		}
	}), /* @__PURE__ */ v("div", {
		ref: b,
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Menú de inicio",
		style: {
			position: "fixed",
			zIndex: 51,
			left: "50%",
			bottom: "calc(64px + env(safe-area-inset-bottom, 0px) + var(--ds-3))",
			transform: "translateX(-50%)",
			width: "min(800px, calc(100% - var(--ds-8)))",
			maxHeight: "min(660px, calc(100dvh - 150px))",
			display: "flex",
			flexDirection: "column",
			borderRadius: "var(--ds-r-frame)",
			overflow: "hidden",
			background: "var(--ds-panel)",
			border: "1px solid var(--ds-line-glass)",
			backdropFilter: "var(--ds-blur)",
			WebkitBackdropFilter: "var(--ds-blur)",
			boxShadow: "var(--ds-lift-3)",
			animation: "ds-inicio var(--ds-t-move) var(--ds-ease) both"
		},
		children: [
			/* @__PURE__ */ v("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: "var(--ds-3)",
					padding: "var(--ds-4) var(--ds-5) var(--ds-3)"
				},
				children: [
					n,
					/* @__PURE__ */ _("div", { style: { flex: 1 } }),
					r
				]
			}),
			/* @__PURE__ */ _("div", {
				style: {
					flex: 1,
					minHeight: 0,
					overflowY: "auto",
					padding: "var(--ds-2) var(--ds-5) var(--ds-4)"
				},
				children: S ? /* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _(Zr, { children: C ? "Sin coincidencias" : "Resultados" }), C ? /* @__PURE__ */ v("div", {
					style: {
						padding: "var(--ds-8) 0",
						textAlign: "center",
						color: "var(--ds-ink-3)",
						fontSize: "var(--ds-t-body)"
					},
					children: [
						"Nada coincide con «",
						s,
						"»."
					]
				}) : (d || []).map((e) => /* @__PURE__ */ _(Qr, {
					item: e,
					onIr: x
				}, e.id))] }) : /* @__PURE__ */ v("div", {
					style: {
						display: "flex",
						gap: "var(--ds-5)",
						alignItems: "flex-start",
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ v("div", {
						style: {
							flex: "1 1 200px",
							minWidth: 190
						},
						children: [/* @__PURE__ */ _(Zr, { children: a }), i.length > 0 ? i.map((e) => /* @__PURE__ */ _(Qr, {
							item: e,
							onIr: x
						}, e.id)) : /* @__PURE__ */ _("div", {
							style: {
								padding: "var(--ds-3) 10px",
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-3)",
								lineHeight: 1.5
							},
							children: "Lo que vayas abriendo aparece aquí."
						})]
					}), /* @__PURE__ */ _("div", {
						style: {
							flex: "2 1 420px",
							minWidth: 280,
							display: "flex",
							flexDirection: "column",
							gap: "var(--ds-5)"
						},
						children: o.map((e, t) => /* @__PURE__ */ v("div", { children: [/* @__PURE__ */ _(Zr, { children: e.titulo }), /* @__PURE__ */ _("div", {
							style: {
								display: "grid",
								gap: "var(--ds-3)",
								gridTemplateColumns: "repeat(auto-fill, minmax(136px, 1fr))"
							},
							children: e.items.map((e, n) => /* @__PURE__ */ _(Sn, {
								icono: e.icono,
								etiqueta: e.texto,
								nota: e.subtitulo,
								color: e.color,
								ancho: e.ancho,
								entrada: w[t][n],
								onClick: () => x(e)
							}, e.id))
						})] }, e.titulo))
					})]
				})
			}),
			/* @__PURE__ */ _("div", {
				style: { padding: "var(--ds-3) var(--ds-5) var(--ds-5)" },
				children: /* @__PURE__ */ v("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "var(--ds-3)",
						padding: "0 var(--ds-4)",
						height: 48,
						borderRadius: "var(--ds-r-pill)",
						background: "var(--ds-surface)",
						border: "1px solid var(--ds-line)",
						boxShadow: "var(--ds-lift-1)"
					},
					children: [
						/* @__PURE__ */ _("span", {
							style: {
								color: "var(--ds-ink-3)",
								display: "grid",
								placeItems: "center"
							},
							children: Yr
						}),
						/* @__PURE__ */ _("input", {
							ref: y,
							value: s,
							onChange: (e) => l?.(e.target.value),
							placeholder: f,
							"aria-label": f,
							style: {
								flex: 1,
								minWidth: 0,
								background: "transparent",
								border: "none",
								outline: "none",
								fontFamily: "var(--ds-font)",
								fontSize: "var(--ds-t-body)",
								fontWeight: 600,
								color: "var(--ds-ink)"
							}
						}),
						s && /* @__PURE__ */ _("button", {
							onClick: () => l?.(""),
							"aria-label": "Limpiar búsqueda",
							style: {
								background: "transparent",
								border: "none",
								cursor: "pointer",
								color: "var(--ds-ink-3)",
								display: "grid",
								placeItems: "center",
								padding: 2
							},
							children: /* @__PURE__ */ _("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								children: /* @__PURE__ */ _("path", { d: "M18 6L6 18M6 6l12 12" })
							})
						})
					]
				})
			})
		]
	})] }) : null;
}
// src/formato.js
var ei = /* @__PURE__ */ i({
	SIN_DATO: () => "—",
	compacto: () => oi,
	configurarFormato: () => ti,
	fecha: () => Y,
	fechaRelativa: () => li,
	formatear: () => X,
	moneda: () => ai,
	numero: () => ii,
	porcentaje: () => J,
	variacion: () => ui
}), q = {
	idioma: "es-MX",
	moneda: "MXN",
	zonaHoraria: void 0
};
function ti(e = {}) {
	q = {
		...q,
		...e
	};
}
var ni = "—", ri = (e) => e == null || e === "" || Number.isNaN(Number(e));
function ii(e, { decimales: t, minimo: n } = {}) {
	return ri(e) ? "—" : new Intl.NumberFormat(q.idioma, {
		minimumFractionDigits: t ?? n ?? 0,
		maximumFractionDigits: t ?? 2
	}).format(Number(e));
}
function ai(e, { moneda: t = q.moneda, decimales: n = 2, compacto: r = !1 } = {}) {
	return ri(e) ? "—" : r ? new Intl.NumberFormat(q.idioma, {
		style: "currency",
		currency: t,
		notation: "compact",
		maximumFractionDigits: 1
	}).format(Number(e)) : new Intl.NumberFormat(q.idioma, {
		style: "currency",
		currency: t,
		minimumFractionDigits: n,
		maximumFractionDigits: n
	}).format(Number(e));
}
function oi(e, { decimales: t = 1 } = {}) {
	return ri(e) ? "—" : new Intl.NumberFormat(q.idioma, {
		notation: "compact",
		maximumFractionDigits: t
	}).format(Number(e));
}
function J(e, { decimales: t = 1, enPuntos: n = !1, signo: r = !1 } = {}) {
	if (ri(e)) return "—";
	let i = n ? Number(e) / 100 : Number(e);
	return new Intl.NumberFormat(q.idioma, {
		style: "percent",
		minimumFractionDigits: 0,
		maximumFractionDigits: t,
		signDisplay: r ? "exceptZero" : "auto"
	}).format(i);
}
function si(e) {
	if (e instanceof Date) return e;
	if (typeof e == "string" && /^\d{4}-\d{2}-\d{2}$/.test(e)) {
		let [t, n, r] = e.split("-").map(Number);
		return new Date(t, n - 1, r);
	}
	return new Date(e);
}
var ci = {
	corta: {
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	},
	media: {
		day: "numeric",
		month: "short",
		year: "numeric"
	},
	larga: {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	},
	dia: {
		day: "numeric",
		month: "short"
	},
	mes: {
		month: "long",
		year: "numeric"
	},
	mesCorto: { month: "short" },
	hora: {
		hour: "2-digit",
		minute: "2-digit"
	},
	fechaHora: {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	}
};
function Y(e, t = "media") {
	if (e == null || e === "") return "—";
	let n = si(e);
	return Number.isNaN(n.getTime()) ? "—" : new Intl.DateTimeFormat(q.idioma, {
		...ci[t] || ci.media,
		timeZone: q.zonaHoraria
	}).format(n).replace(/\.$/, "");
}
function li(e, t = /* @__PURE__ */ new Date()) {
	if (e == null || e === "") return "—";
	let n = si(e);
	if (Number.isNaN(n.getTime())) return "—";
	let r = (n.getTime() - t.getTime()) / 1e3, i = new Intl.RelativeTimeFormat(q.idioma, { numeric: "auto" });
	for (let [e, t] of [
		["year", 31536e3],
		["month", 2592e3],
		["week", 604800],
		["day", 86400],
		["hour", 3600],
		["minute", 60]
	]) if (Math.abs(r) >= t) return i.format(Math.round(r / t), e);
	return i.format(0, "minute");
}
function ui(e, t) {
	return ri(e) || ri(t) || Number(t) === 0 ? null : (Number(e) - Number(t)) / Math.abs(Number(t));
}
function X(e, t = "numero", n) {
	if (typeof t == "function") return t(e);
	switch (t) {
		case "moneda": return ai(e, n);
		case "monedaCompacta": return ai(e, {
			...n,
			compacto: !0
		});
		case "compacto": return oi(e, n);
		case "porcentaje": return J(e, n);
		case "texto": return e == null || e === "" ? "—" : String(e);
		default: return ii(e, n);
	}
}
// src/primitivas/Variacion.jsx
function di({ valor: e, sentido: t = "sube", contra: n, decimales: r = 1, enPuntos: i = !1, tamano: a = "s", estilo: o }) {
	let s = e == null || Number.isNaN(Number(e)), c = s ? 0 : Number(e), l = s || c === 0 ? 0 : c > 0 ? 1 : -1, u = t === "neutro" || l === 0 ? null : t === "sube" ? l > 0 : l < 0, d = u === null ? "var(--ds-ink-2)" : u ? "var(--ds-ok)" : "var(--ds-risk)", f = u === null ? "var(--ds-surface-sunk)" : u ? "var(--ds-ok-soft)" : "var(--ds-risk-soft)", p = l > 0 ? "▲" : l < 0 ? "▼" : "●", m = a === "m" ? "var(--ds-t-small)" : "var(--ds-t-micro)";
	if (s) return /* @__PURE__ */ _("span", {
		style: {
			fontSize: m,
			fontWeight: 600,
			color: "var(--ds-ink-3)",
			...o
		},
		children: "Sin comparativo"
	});
	let h = i ? `${c > 0 ? "+" : ""}${c.toFixed(r)} pts` : J(c, {
		decimales: r,
		signo: !0
	});
	return /* @__PURE__ */ v("span", {
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 6,
			flexWrap: "wrap",
			...o
		},
		children: [/* @__PURE__ */ v("span", {
			className: "ds-num",
			style: {
				display: "inline-flex",
				alignItems: "center",
				gap: 4,
				background: f,
				color: d,
				fontSize: m,
				fontWeight: 700,
				padding: "2px 8px",
				borderRadius: "var(--ds-r-pill)",
				whiteSpace: "nowrap"
			},
			"aria-label": `${l > 0 ? "Sube" : l < 0 ? "Baja" : "Sin cambio"} ${h}${u === null ? "" : u ? ", favorable" : ", desfavorable"}`,
			children: [/* @__PURE__ */ _("span", {
				"aria-hidden": "true",
				style: { fontSize: "0.8em" },
				children: p
			}), h]
		}), n && /* @__PURE__ */ _("span", {
			style: {
				fontSize: m,
				fontWeight: 600,
				color: "var(--ds-ink-3)"
			},
			children: n
		})]
	});
}
// src/graficas/base.jsx
var fi = [
	1,
	2,
	3,
	4,
	5,
	6
].map((e) => `var(--ds-serie-${e})`), Z = (e, t) => e?.color || fi[t % fi.length];
function pi() {
	let [e, t] = h(0), n = m(null);
	return [c((e) => {
		n.current &&= (n.current.disconnect(), null), e && (t(e.getBoundingClientRect().width), typeof ResizeObserver < "u" && (n.current = new ResizeObserver(([e]) => t(e.contentRect.width)), n.current.observe(e)));
	}, []), e];
}
function mi(e, t, n = 4) {
	if (!Number.isFinite(e) || !Number.isFinite(t)) return {
		marcas: [0, 1],
		min: 0,
		max: 1
	};
	e === t && (t = e === 0 ? 1 : t + Math.abs(t) * .1);
	let r = (t - e) / n, i = 10 ** Math.floor(Math.log10(r)), a = r / i, o = (a <= 1 ? 1 : a <= 2 ? 2 : a <= 2.5 ? 2.5 : a <= 5 ? 5 : 10) * i, s = Math.floor(e / o) * o, c = Math.ceil(t / o) * o, l = [];
	for (let e = s; e <= c + o / 2; e += o) l.push(Number(e.toFixed(10)));
	return {
		marcas: l,
		min: s,
		max: c
	};
}
var hi = (e, t, n, r) => (i) => t === e ? (n + r) / 2 : n + (i - e) / (t - e) * (r - n), Q = {
	fontSize: 11,
	fontWeight: 600,
	fill: "var(--ds-ink-3)",
	fontFamily: "var(--ds-font)",
	fontVariantNumeric: "tabular-nums"
};
function gi({ color: e, forma: t = "cuadro" }) {
	let n = {
		flexShrink: 0,
		background: e
	};
	return t === "linea" ? /* @__PURE__ */ _("span", { style: {
		...n,
		width: 14,
		height: 3,
		borderRadius: "var(--ds-r-mini)"
	} }) : /* @__PURE__ */ _("span", { style: {
		...n,
		width: 10,
		height: 10,
		borderRadius: "var(--ds-r-mini)"
	} });
}
function _i({ series: e = [], forma: t, valores: n, estilo: r }) {
	return e.length < 2 ? null : /* @__PURE__ */ _("div", {
		role: "list",
		style: {
			display: "flex",
			flexWrap: "wrap",
			gap: "6px 16px",
			marginBottom: "var(--ds-3)",
			...r
		},
		children: e.map((e, r) => /* @__PURE__ */ v("span", {
			role: "listitem",
			style: {
				display: "inline-flex",
				alignItems: "center",
				gap: 7,
				fontSize: "var(--ds-t-small)",
				fontWeight: 600,
				color: "var(--ds-ink-2)"
			},
			children: [
				/* @__PURE__ */ _(gi, {
					color: Z(e, r),
					forma: t
				}),
				e.nombre,
				n && n[r] !== void 0 && /* @__PURE__ */ _("span", {
					className: "ds-num",
					style: {
						color: "var(--ds-ink)",
						fontWeight: 600
					},
					children: n[r]
				})
			]
		}, e.clave ?? e.nombre ?? r))
	});
}
function vi({ x: e, y: t, ancho: n, titulo: r, renglones: i = [], visible: a }) {
	let o = m(null), [s, c] = h({
		w: 160,
		h: 60
	});
	if (u(() => {
		if (o.current) {
			let e = o.current.getBoundingClientRect();
			(Math.abs(e.width - s.w) > 1 || Math.abs(e.height - s.h) > 1) && c({
				w: e.width,
				h: e.height
			});
		}
	}), !a) return null;
	let l = e + 12 + s.w > n ? e - 12 - s.w : e + 12, d = Math.max(0, t - s.h / 2);
	return /* @__PURE__ */ v("div", {
		ref: o,
		role: "status",
		style: {
			position: "absolute",
			left: Math.max(0, l),
			top: d,
			zIndex: 3,
			pointerEvents: "none",
			minWidth: 140,
			maxWidth: 260,
			background: "var(--ds-panel)",
			border: "1px solid var(--ds-line-firm)",
			boxShadow: "var(--ds-lift-3)",
			borderRadius: "var(--ds-r-item)",
			padding: "10px 12px",
			fontFamily: "var(--ds-font)",
			transition: "left var(--ds-t-tap) var(--ds-ease-out), top var(--ds-t-tap) var(--ds-ease-out)"
		},
		children: [r && /* @__PURE__ */ _("div", {
			style: {
				fontSize: "var(--ds-t-micro)",
				fontWeight: 600,
				color: "var(--ds-ink-3)",
				letterSpacing: "0.04em",
				textTransform: "uppercase",
				marginBottom: 6
			},
			children: r
		}), i.map((e, t) => /* @__PURE__ */ v("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 8,
				fontSize: "var(--ds-t-small)",
				lineHeight: 1.6
			},
			children: [
				e.color && /* @__PURE__ */ _(gi, { color: e.color }),
				/* @__PURE__ */ _("span", {
					style: {
						color: "var(--ds-ink-2)",
						fontWeight: 600,
						flex: 1,
						minWidth: 0
					},
					children: e.nombre
				}),
				/* @__PURE__ */ _("span", {
					className: "ds-num",
					style: {
						color: "var(--ds-ink)",
						fontWeight: 700
					},
					children: e.valor
				})
			]
		}, t))]
	});
}
function yi({ columnas: e, filas: t }) {
	return /* @__PURE__ */ _("div", {
		style: { overflowX: "auto" },
		children: /* @__PURE__ */ v("table", {
			style: {
				width: "100%",
				borderCollapse: "collapse",
				fontFamily: "var(--ds-font)",
				fontSize: "var(--ds-t-small)"
			},
			children: [/* @__PURE__ */ _("thead", { children: /* @__PURE__ */ _("tr", { children: e.map((e, t) => /* @__PURE__ */ _("th", {
				scope: "col",
				style: {
					textAlign: t === 0 ? "left" : "right",
					padding: "6px 8px",
					color: "var(--ds-ink-3)",
					fontWeight: 600,
					fontSize: "var(--ds-t-micro)",
					textTransform: "uppercase",
					letterSpacing: "0.05em",
					borderBottom: "1px solid var(--ds-line)",
					whiteSpace: "nowrap"
				},
				children: e
			}, t)) }) }), /* @__PURE__ */ _("tbody", { children: t.map((e, t) => /* @__PURE__ */ _("tr", { children: e.map((e, t) => /* @__PURE__ */ _("td", {
				className: t ? "ds-num" : void 0,
				style: {
					textAlign: t === 0 ? "left" : "right",
					padding: "6px 8px",
					color: t === 0 ? "var(--ds-ink-2)" : "var(--ds-ink)",
					fontWeight: t === 0 ? 600 : 700,
					borderBottom: "1px solid var(--ds-line)",
					whiteSpace: "nowrap"
				},
				children: e
			}, t)) }, t)) })]
		})
	});
}
function bi({ titulo: e, series: t, formaLeyenda: n, tabla: r, children: i, estilo: a, alto: o }) {
	let [s, c] = h(!1);
	return /* @__PURE__ */ v("figure", {
		style: {
			margin: 0,
			minWidth: 0,
			...a
		},
		"aria-label": e,
		children: [(t?.length > 1 || r) && /* @__PURE__ */ v("div", {
			style: {
				display: "flex",
				alignItems: "flex-start",
				gap: "var(--ds-3)"
			},
			children: [/* @__PURE__ */ _("div", {
				style: {
					flex: 1,
					minWidth: 0
				},
				children: !s && /* @__PURE__ */ _(_i, {
					series: t || [],
					forma: n
				})
			}), r && /* @__PURE__ */ _("button", {
				type: "button",
				onClick: () => c((e) => !e),
				"aria-pressed": s,
				style: {
					flexShrink: 0,
					border: "1px solid var(--ds-line-firm)",
					background: "transparent",
					color: "var(--ds-ink-2)",
					cursor: "pointer",
					fontFamily: "var(--ds-font)",
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					padding: "4px 10px",
					borderRadius: "var(--ds-r-pill)",
					marginBottom: "var(--ds-3)"
				},
				children: s ? "Ver gráfica" : "Ver tabla"
			})]
		}), s && r ? /* @__PURE__ */ _("div", {
			style: { minHeight: o },
			children: /* @__PURE__ */ _(yi, { ...r })
		}) : i]
	});
}
var xi = {
	position: "absolute",
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0 0 0 0)",
	whiteSpace: "nowrap",
	border: 0
}, $ = (e, t, n) => X(e, t, n);
function Si({ alto: e = 160, texto: t = "Sin datos para este periodo." }) {
	return /* @__PURE__ */ _("div", {
		style: {
			height: e,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			border: "1px dashed var(--ds-line-firm)",
			borderRadius: "var(--ds-r-item)",
			color: "var(--ds-ink-3)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 600,
			textAlign: "center",
			padding: "var(--ds-4)"
		},
		children: t
	});
}
// src/graficas/Sparkline.jsx
function Ci({ datos: e = [], alto: t = 40, color: n = "var(--ds-accent-trazo)", area: r = !0, formato: i = "numero", etiquetas: a, estilo: s }) {
	let [c, l] = pi(), [u, d] = h(null), f = e.map((e) => typeof e == "object" && e ? e.valor : e), p = f.filter((e) => e != null && Number.isFinite(Number(e))), m = Math.min(...p), g = Math.max(...p), y = Math.max(0, l), b = (e) => f.length <= 1 ? y / 2 : 4 + e / (f.length - 1) * (y - 8), x = (e) => g === m ? t / 2 : 4 + (1 - (e - m) / (g - m)) * (t - 8), S = [], C = [];
	f.forEach((e, t) => {
		e == null || !Number.isFinite(Number(e)) ? (C.length && S.push(C), C = []) : C.push([b(t), x(Number(e))]);
	}), C.length && S.push(C);
	let w = [...f].reverse().findIndex((e) => e != null), T = w === -1 ? -1 : f.length - 1 - w, E = o.useId().replace(/:/g, "");
	return /* @__PURE__ */ v("div", {
		ref: c,
		style: {
			position: "relative",
			height: t,
			minWidth: 0,
			...s
		},
		onMouseLeave: () => d(null),
		onMouseMove: (e) => {
			if (!y || f.length < 2) return;
			let t = e.currentTarget.getBoundingClientRect(), n = Math.round((e.clientX - t.left - 4) / (y - 8) * (f.length - 1));
			d(Math.max(0, Math.min(f.length - 1, n)));
		},
		children: [y > 0 && p.length > 0 && /* @__PURE__ */ v("svg", {
			width: y,
			height: t,
			role: "img",
			style: {
				display: "block",
				overflow: "visible"
			},
			"aria-label": `Tendencia de ${f.length} puntos, último ${$(f[T], i)}`,
			children: [
				/* @__PURE__ */ _("defs", { children: /* @__PURE__ */ v("linearGradient", {
					id: `sp${E}`,
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ _("stop", {
						offset: "0%",
						stopColor: n,
						stopOpacity: "0.22"
					}), /* @__PURE__ */ _("stop", {
						offset: "100%",
						stopColor: n,
						stopOpacity: "0"
					})]
				}) }),
				r && S.map((e, n) => e.length > 1 && /* @__PURE__ */ _("path", {
					fill: `url(#sp${E})`,
					d: `M${e[0][0]},${t} ${e.map((e) => `L${e[0]},${e[1]}`).join(" ")} L${e[e.length - 1][0]},${t} Z`
				}, `a${n}`)),
				S.map((e, t) => /* @__PURE__ */ _("path", {
					fill: "none",
					stroke: n,
					strokeWidth: "2",
					strokeLinejoin: "round",
					strokeLinecap: "round",
					d: e.map((e, t) => `${t ? "L" : "M"}${e[0]},${e[1]}`).join(" ")
				}, `l${t}`)),
				T >= 0 && /* @__PURE__ */ _("circle", {
					cx: b(T),
					cy: x(Number(f[T])),
					r: "3.5",
					fill: n,
					stroke: "var(--ds-surface-solid)",
					strokeWidth: "2"
				}),
				u !== null && f[u] !== null && f[u] !== void 0 && /* @__PURE__ */ v("g", { children: [/* @__PURE__ */ _("line", {
					x1: b(u),
					x2: b(u),
					y1: 0,
					y2: t,
					stroke: "var(--ds-eje)",
					strokeWidth: "1"
				}), /* @__PURE__ */ _("circle", {
					cx: b(u),
					cy: x(Number(f[u])),
					r: "4",
					fill: n,
					stroke: "var(--ds-surface-solid)",
					strokeWidth: "2"
				})] })
			]
		}), u !== null && /* @__PURE__ */ v("div", {
			className: "ds-num",
			style: {
				position: "absolute",
				bottom: "100%",
				marginBottom: 4,
				left: Math.min(Math.max(0, b(u) - 40), Math.max(0, y - 80)),
				pointerEvents: "none",
				background: "var(--ds-panel)",
				border: "1px solid var(--ds-line-firm)",
				borderRadius: "var(--ds-r-item)",
				padding: "3px 8px",
				fontSize: "var(--ds-t-micro)",
				fontWeight: 700,
				color: "var(--ds-ink)",
				whiteSpace: "nowrap",
				boxShadow: "var(--ds-lift-2)",
				zIndex: 2
			},
			children: [a?.[u] ? `${a[u]} · ` : "", $(f[u], i)]
		})]
	});
}
// src/primitivas/TarjetaKpi.jsx
var wi = {
	ok: "Bien",
	aviso: "Atención",
	riesgo: "En riesgo"
}, Ti = (e) => e == null || e === "";
function Ei({ etiqueta: e, valor: t, formato: n = "numero", opcionesFormato: r, variacion: i, sentido: a = "sube", contra: o, enPuntos: s, serie: c, colorSerie: l, nota: u, icono: d, estado: f, textoEstado: p, compacta: m = !1, cargando: h = !1 }) {
	if (h) return /* @__PURE__ */ v("div", {
		"aria-busy": "true",
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 10
		},
		children: [
			/* @__PURE__ */ _(z, {
				alto: 10,
				ancho: "46%"
			}),
			/* @__PURE__ */ _(z, {
				alto: m ? 24 : 34,
				ancho: "62%",
				radio: 9
			}),
			/* @__PURE__ */ _(z, {
				alto: 10,
				ancho: "38%"
			}),
			c && !m && /* @__PURE__ */ _(z, {
				alto: 40,
				radio: 9
			})
		]
	});
	let g = Ti(t), y = g ? "—" : typeof t == "number" || !Number.isNaN(Number(t)) ? X(t, n, r) : t;
	return /* @__PURE__ */ v("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			minWidth: 0,
			height: "100%"
		},
		children: [
			/* @__PURE__ */ v("div", {
				style: {
					display: "flex",
					alignItems: "flex-start",
					gap: 8,
					minWidth: 0
				},
				children: [
					/* @__PURE__ */ _("div", {
						style: {
							flex: 1,
							minWidth: 0,
							fontSize: "var(--ds-t-micro)",
							fontWeight: 600,
							letterSpacing: "0.05em",
							textTransform: "uppercase",
							color: "var(--ds-ink-3)",
							lineHeight: 1.35
						},
						children: e
					}),
					f && wi[f] && /* @__PURE__ */ _(V, {
						tono: f,
						children: p || wi[f]
					}),
					d && !f && /* @__PURE__ */ _("span", {
						"aria-hidden": !0,
						style: {
							color: "var(--ds-ink-3)",
							display: "inline-flex",
							flexShrink: 0
						},
						children: d
					})
				]
			}),
			/* @__PURE__ */ _("div", {
				style: mn,
				children: /* @__PURE__ */ _("div", {
					className: "ds-num",
					style: {
						fontSize: hn(m ? "var(--ds-num-m)" : "var(--ds-num-l)", y),
						fontWeight: 700,
						lineHeight: 1.05,
						letterSpacing: "-0.035em",
						marginTop: m ? 4 : 6,
						color: g ? "var(--ds-ink-3)" : "var(--ds-ink)",
						whiteSpace: "nowrap"
					},
					children: y
				})
			}),
			(i !== void 0 || o || u || g) && /* @__PURE__ */ v("div", {
				style: {
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					gap: "4px 8px",
					marginTop: m ? 6 : 8
				},
				children: [i !== void 0 && !g && /* @__PURE__ */ _(di, {
					valor: i,
					sentido: a,
					contra: o,
					enPuntos: s
				}), (u || g) && /* @__PURE__ */ _("span", {
					style: {
						fontSize: "var(--ds-t-small)",
						color: "var(--ds-ink-3)"
					},
					children: g ? u || "Sin dato" : u
				})]
			}),
			c && !m && /* @__PURE__ */ _("div", {
				style: {
					marginTop: "auto",
					paddingTop: "var(--ds-4)"
				},
				children: /* @__PURE__ */ _(Ci, {
					datos: c,
					alto: 40,
					formato: n,
					color: l
				})
			})
		]
	});
}
function Di({ onClick: e, href: t, estilo: n, entrada: r, relleno: i, ...a }) {
	let o = !!(e || t), s = /* @__PURE__ */ _(Ei, { ...a }), c = i ?? (a.compacta ? "var(--ds-4)" : "var(--ds-5)");
	return t ? /* @__PURE__ */ _("a", {
		href: t,
		onClick: e,
		style: {
			textDecoration: "none",
			color: "inherit",
			display: "block",
			height: "100%",
			borderRadius: "var(--ds-r-card)"
		},
		children: /* @__PURE__ */ _(j, {
			interactiva: !0,
			relleno: c,
			entrada: r,
			estilo: {
				height: "100%",
				...n
			},
			children: s
		})
	}) : /* @__PURE__ */ _(j, {
		interactiva: o,
		relleno: c,
		entrada: r,
		role: o ? "button" : void 0,
		tabIndex: o ? 0 : void 0,
		onClick: e,
		onKeyDown: o ? (t) => {
			(t.key === "Enter" || t.key === " ") && (t.preventDefault(), e(t));
		} : void 0,
		estilo: {
			height: "100%",
			...n
		},
		children: s
	});
}
// src/primitivas/FilaKpis.jsx
function Oi({ indicadores: e = [], cargando: t = !1, estilo: n, entrada: r }) {
	let i = G(), a = Math.max(1, e.length), o = i ? Math.min(2, a) : a;
	return /* @__PURE__ */ _(j, {
		relleno: "0",
		entrada: r,
		estilo: {
			overflow: "hidden",
			...n
		},
		children: /* @__PURE__ */ _("div", {
			role: "list",
			style: {
				display: "grid",
				gridTemplateColumns: `repeat(${o}, minmax(0, 1fr))`
			},
			children: e.map((e, n) => {
				let r = n % o, i = Math.floor(n / o);
				return /* @__PURE__ */ _("div", {
					role: "listitem",
					style: {
						padding: "var(--ds-4) var(--ds-5)",
						minWidth: 0,
						borderLeft: r > 0 ? "1px solid var(--ds-line)" : "none",
						borderTop: i > 0 ? "1px solid var(--ds-line)" : "none"
					},
					children: /* @__PURE__ */ _(Ei, {
						...e,
						serie: void 0,
						compacta: !0,
						cargando: t || e.cargando
					})
				}, e.clave ?? e.etiqueta ?? n);
			})
		})
	});
}
// src/primitivas/TarjetaMeta.jsx
var ki = {
	ok: "Va a la meta",
	aviso: "Cerca de la meta",
	riesgo: "Debajo de la meta"
}, Ai = {
	ok: "Dentro del tope",
	aviso: "Cerca del tope",
	riesgo: "Rebasa el tope"
};
function ji({ titulo: e, logrado: t, meta: n, formato: r = "numero", opcionesFormato: i, diaActual: a, diasPeriodo: o, invertida: s = !1, forma: c = "barra", nota: l, cargando: u = !1, estilo: d, entrada: f }) {
	let p = (e) => X(e, r, i), m = Number.isFinite(Number(t)) && Number(n) > 0, h = m ? Number(t) / Number(n) : null, y = m && Number(a) > 0 && Number(o) > 0, b = y ? Number(t) / Number(a) * Number(o) : null, x = y ? b / Number(n) : h, S = "acento";
	x !== null && (S = s ? x <= .9 ? "ok" : x <= 1 ? "aviso" : "riesgo" : x >= 1 ? "ok" : x >= .9 ? "aviso" : "riesgo");
	let C = s ? Ai : ki, w = {
		ok: "var(--ds-ok)",
		aviso: "var(--ds-warn)",
		riesgo: "var(--ds-risk)",
		acento: "var(--ds-accent-trazo)"
	}[S];
	return /* @__PURE__ */ _(j, {
		entrada: f,
		estilo: {
			height: "100%",
			...d
		},
		children: u ? /* @__PURE__ */ v("div", {
			"aria-busy": "true",
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 10
			},
			children: [
				/* @__PURE__ */ _(z, {
					alto: 10,
					ancho: "50%"
				}),
				/* @__PURE__ */ _(z, {
					alto: 34,
					ancho: "60%",
					radio: 9
				}),
				/* @__PURE__ */ _(z, {
					alto: 8,
					radio: 99
				}),
				/* @__PURE__ */ _(z, {
					alto: 10,
					ancho: "70%"
				})
			]
		}) : /* @__PURE__ */ v("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: "var(--ds-3)"
			},
			children: [
				/* @__PURE__ */ v("div", {
					style: {
						display: "flex",
						alignItems: "flex-start",
						gap: 8
					},
					children: [/* @__PURE__ */ _("div", {
						style: {
							flex: 1,
							minWidth: 0,
							fontSize: "var(--ds-t-micro)",
							fontWeight: 600,
							letterSpacing: "0.05em",
							textTransform: "uppercase",
							color: "var(--ds-ink-3)"
						},
						children: e
					}), x !== null && /* @__PURE__ */ _(V, {
						tono: S,
						children: C[S]
					})]
				}),
				m ? c === "anillo" ? /* @__PURE__ */ v("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "var(--ds-5)",
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ _(I, {
						valor: Math.min(100, h * 100),
						tamano: 112,
						grosor: 9,
						tono: w,
						children: /* @__PURE__ */ _("span", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-num-m)",
								fontWeight: 700,
								letterSpacing: "-0.03em"
							},
							children: J(h, { decimales: 0 })
						})
					}), /* @__PURE__ */ v("div", {
						style: { minWidth: 0 },
						children: [/* @__PURE__ */ _("div", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-num-m)",
								fontWeight: 700,
								letterSpacing: "-0.03em"
							},
							children: p(t)
						}), /* @__PURE__ */ v("div", {
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-3)"
							},
							children: ["de ", /* @__PURE__ */ _("span", {
								className: "ds-num",
								style: {
									fontWeight: 600,
									color: "var(--ds-ink-2)"
								},
								children: p(n)
							})]
						})]
					})]
				}) : /* @__PURE__ */ v(g, { children: [
					/* @__PURE__ */ v("div", {
						style: {
							display: "flex",
							alignItems: "baseline",
							gap: 8,
							flexWrap: "wrap"
						},
						children: [/* @__PURE__ */ _("span", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-num-l)",
								fontWeight: 700,
								letterSpacing: "-0.035em",
								lineHeight: 1.05
							},
							children: p(t)
						}), /* @__PURE__ */ v("span", {
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-3)"
							},
							children: ["de ", /* @__PURE__ */ _("span", {
								className: "ds-num",
								style: {
									fontWeight: 600,
									color: "var(--ds-ink-2)"
								},
								children: p(n)
							})]
						})]
					}),
					/* @__PURE__ */ _(R, {
						valor: Number(t),
						total: Number(n),
						tono: S,
						alto: 8,
						etiqueta: `${e}: ${J(h)} de la meta`
					}),
					/* @__PURE__ */ v("div", {
						className: "ds-num",
						style: {
							fontSize: "var(--ds-t-small)",
							fontWeight: 600,
							color: "var(--ds-ink-2)"
						},
						children: [J(h), " de la meta"]
					})
				] }) : /* @__PURE__ */ _("div", {
					style: {
						fontSize: "var(--ds-t-small)",
						color: "var(--ds-ink-3)"
					},
					children: Number(n) > 0 ? "Sin dato de avance." : "Sin meta capturada para este periodo."
				}),
				y && /* @__PURE__ */ v("div", {
					style: {
						fontSize: "var(--ds-t-small)",
						color: "var(--ds-ink-2)",
						lineHeight: 1.45
					},
					children: [
						"Al ritmo actual cierras en",
						" ",
						/* @__PURE__ */ _("strong", {
							className: "ds-num",
							style: { color: "var(--ds-ink)" },
							children: p(b)
						}),
						" ",
						"(",
						/* @__PURE__ */ _("span", {
							className: "ds-num",
							children: J(b / Number(n))
						}),
						" ",
						s ? "del tope" : "de la meta",
						").",
						/* @__PURE__ */ v("span", {
							style: { color: "var(--ds-ink-3)" },
							children: [
								" Día ",
								a,
								" de ",
								o,
								"."
							]
						})
					]
				}),
				l && /* @__PURE__ */ _("div", {
					style: {
						fontSize: "var(--ds-t-small)",
						color: "var(--ds-ink-3)"
					},
					children: l
				})
			]
		})
	});
}
// src/primitivas/TarjetaComparativa.jsx
function Mi({ titulo: e, valores: t = [], formato: n = "numero", opcionesFormato: r, sentido: i = "sube", nota: a, cargando: o = !1, estilo: s, entrada: c }) {
	let l = G(520), u = t.slice(0, 3), d = u[0];
	return /* @__PURE__ */ v(j, {
		entrada: c,
		estilo: {
			height: "100%",
			...s
		},
		children: [
			e && /* @__PURE__ */ _("div", {
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					letterSpacing: "0.05em",
					textTransform: "uppercase",
					color: "var(--ds-ink-3)",
					marginBottom: "var(--ds-3)"
				},
				children: e
			}),
			/* @__PURE__ */ _("div", {
				style: {
					display: "grid",
					gap: l ? "var(--ds-3)" : 0,
					gridTemplateColumns: l ? "1fr" : `repeat(${Math.max(1, u.length)}, minmax(0, 1fr))`
				},
				children: u.map((e, t) => {
					let a = t > 0 && d ? ui(d.valor, e.valor) : void 0;
					return /* @__PURE__ */ v("div", {
						style: {
							minWidth: 0,
							paddingLeft: !l && t > 0 ? "var(--ds-4)" : 0,
							paddingRight: !l && t < u.length - 1 ? "var(--ds-4)" : 0,
							borderLeft: !l && t > 0 ? "1px solid var(--ds-line)" : "none",
							paddingTop: l && t > 0 ? "var(--ds-3)" : 0,
							borderTop: l && t > 0 ? "1px solid var(--ds-line)" : "none"
						},
						children: [
							/* @__PURE__ */ _("div", {
								style: {
									fontSize: "var(--ds-t-small)",
									fontWeight: 600,
									color: t === 0 ? "var(--ds-ink-2)" : "var(--ds-ink-3)"
								},
								children: e.etiqueta
							}),
							o ? /* @__PURE__ */ _(z, {
								alto: t === 0 ? 30 : 22,
								ancho: "70%",
								radio: 8,
								estilo: { marginTop: 6 }
							}) : /* @__PURE__ */ _("div", {
								style: mn,
								children: /* @__PURE__ */ _("div", {
									className: "ds-num",
									style: {
										fontSize: hn(t === 0 ? "var(--ds-num-m)" : "var(--ds-num-s)", X(e.valor, n, r)),
										fontWeight: 700,
										letterSpacing: "-0.03em",
										lineHeight: 1.15,
										marginTop: 4,
										color: e.valor === null || e.valor === void 0 ? "var(--ds-ink-3)" : t === 0 ? "var(--ds-ink)" : "var(--ds-ink-2)",
										whiteSpace: "nowrap"
									},
									children: X(e.valor, n, r)
								})
							}),
							t > 0 && !o && /* @__PURE__ */ _("div", {
								style: { marginTop: 6 },
								children: /* @__PURE__ */ _(di, {
									valor: a,
									sentido: i,
									contra: a === null ? void 0 : `${d.etiqueta || "Base"} vs ${(e.etiqueta || "referencia").toLowerCase()}`
								})
							})
						]
					}, e.etiqueta ?? t);
				})
			}),
			a && /* @__PURE__ */ _("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					color: "var(--ds-ink-3)",
					marginTop: "var(--ds-4)"
				},
				children: a
			})
		]
	});
}
// src/primitivas/TarjetaRanking.jsx
function Ni({ titulo: e, nota: t, elementos: n = [], formato: r = "numero", opcionesFormato: i, limite: a = 5, participacion: o = !1, total: s, accion: c, onElemento: l, vacio: u = "Sin movimientos en este periodo.", cargando: d = !1, estilo: f, entrada: p }) {
	let m = n.slice(0, a), h = Math.max(0, ...m.map((e) => Number(e.valor) || 0)), g = Number(s) > 0 ? Number(s) : n.reduce((e, t) => e + (Number(t.valor) || 0), 0);
	return /* @__PURE__ */ _(j, {
		entrada: p,
		estilo: {
			height: "100%",
			...f
		},
		children: /* @__PURE__ */ _(fn, {
			titulo: e,
			nota: t,
			accion: c,
			children: d ? /* @__PURE__ */ _("div", {
				"aria-busy": "true",
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 14
				},
				children: Array.from({ length: Math.min(a, 5) }, (e, t) => /* @__PURE__ */ v("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 6,
						opacity: 1 - t * .12
					},
					children: [/* @__PURE__ */ v("div", {
						style: {
							display: "flex",
							gap: 10
						},
						children: [/* @__PURE__ */ _(z, {
							alto: 12,
							ancho: `${50 - t * 5}%`
						}), /* @__PURE__ */ _(z, {
							alto: 12,
							ancho: 70,
							estilo: { marginLeft: "auto" }
						})]
					}), /* @__PURE__ */ _(z, {
						alto: 4,
						radio: 99,
						ancho: `${90 - t * 14}%`
					})]
				}, t))
			}) : m.length === 0 ? /* @__PURE__ */ _("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					color: "var(--ds-ink-3)",
					padding: "var(--ds-4) 0"
				},
				children: u
			}) : /* @__PURE__ */ _("ol", {
				style: {
					listStyle: "none",
					margin: 0,
					padding: 0,
					display: "flex",
					flexDirection: "column",
					gap: 2
				},
				children: m.map((e, t) => {
					let n = Number(e.valor) || 0, a = !!l;
					return /* @__PURE__ */ _("li", { children: /* @__PURE__ */ v("div", {
						role: a ? "button" : void 0,
						tabIndex: a ? 0 : void 0,
						onClick: a ? () => l(e) : void 0,
						onKeyDown: a ? (t) => {
							(t.key === "Enter" || t.key === " ") && (t.preventDefault(), l(e));
						} : void 0,
						style: {
							display: "grid",
							gridTemplateColumns: "22px minmax(0,1fr) auto",
							columnGap: 10,
							rowGap: 6,
							alignItems: "center",
							padding: "8px 6px",
							margin: "0 -6px",
							borderRadius: "var(--ds-r-item)",
							cursor: a ? "pointer" : void 0,
							transition: "background var(--ds-t-state) var(--ds-ease)"
						},
						onMouseEnter: a ? (e) => {
							e.currentTarget.style.background = "var(--ds-surface-2)";
						} : void 0,
						onMouseLeave: a ? (e) => {
							e.currentTarget.style.background = "transparent";
						} : void 0,
						children: [
							/* @__PURE__ */ _("span", {
								className: "ds-num",
								style: {
									fontSize: "var(--ds-t-small)",
									fontWeight: 700,
									color: "var(--ds-ink-3)"
								},
								children: t + 1
							}),
							/* @__PURE__ */ v("div", {
								style: { minWidth: 0 },
								children: [/* @__PURE__ */ _("div", {
									style: {
										fontWeight: 600,
										color: "var(--ds-ink)",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis"
									},
									children: e.nombre
								}), e.subtitulo && /* @__PURE__ */ _("div", {
									style: {
										fontSize: "var(--ds-t-small)",
										color: "var(--ds-ink-3)",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis"
									},
									children: e.subtitulo
								})]
							}),
							/* @__PURE__ */ v("div", {
								style: { textAlign: "right" },
								children: [/* @__PURE__ */ _("div", {
									className: "ds-num",
									style: {
										fontWeight: 700,
										color: "var(--ds-ink)"
									},
									children: X(e.valor, r, i)
								}), o && g > 0 && /* @__PURE__ */ v("div", {
									className: "ds-num",
									style: {
										fontSize: "var(--ds-t-micro)",
										fontWeight: 600,
										color: "var(--ds-ink-3)"
									},
									children: [J(n / g), " del total"]
								})]
							}),
							/* @__PURE__ */ _("div", {
								"aria-hidden": !0,
								style: {
									gridColumn: "2 / 4",
									height: 4,
									borderRadius: 99,
									background: "var(--ds-surface-sunk)",
									overflow: "hidden"
								},
								children: /* @__PURE__ */ _("div", { style: {
									height: "100%",
									width: `${h > 0 ? n / h * 100 : 0}%`,
									background: "var(--ds-accent-trazo)",
									borderRadius: 99,
									transition: "width var(--ds-t-move) var(--ds-ease)"
								} })
							})
						]
					}) }, e.clave ?? e.nombre ?? t);
				})
			})
		})
	});
}
// src/primitivas/TarjetaEntidad.jsx
var Pi = (e) => e == null || e === "";
function Fi({ nombre: e, subtitulo: t, imagen: n, estado: r, metricas: i = [], acciones: a, onClick: o, cargando: s = !1, estilo: c, entrada: l }) {
	let u = !!o, d = i.slice(0, 4);
	return /* @__PURE__ */ v(j, {
		entrada: l,
		interactiva: u,
		role: u ? "button" : void 0,
		tabIndex: u ? 0 : void 0,
		onClick: o,
		onKeyDown: u ? (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), o(e));
		} : void 0,
		estilo: {
			height: "100%",
			display: "flex",
			flexDirection: "column",
			gap: "var(--ds-4)",
			...c
		},
		children: [
			/* @__PURE__ */ v("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: "var(--ds-3)",
					minWidth: 0
				},
				children: [
					s ? /* @__PURE__ */ _(z, {
						circulo: !0,
						alto: 48
					}) : /* @__PURE__ */ _(dn, {
						src: n,
						nombre: e || "",
						tamano: 48
					}),
					/* @__PURE__ */ _("div", {
						style: {
							flex: 1,
							minWidth: 0
						},
						children: s ? /* @__PURE__ */ v("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: 7
							},
							children: [/* @__PURE__ */ _(z, {
								alto: 13,
								ancho: "60%"
							}), /* @__PURE__ */ _(z, {
								alto: 10,
								ancho: "40%"
							})]
						}) : /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _("div", {
							style: {
								fontWeight: 700,
								fontSize: "var(--ds-t-body)",
								letterSpacing: "-0.02em",
								color: "var(--ds-ink)",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis"
							},
							children: e
						}), t && /* @__PURE__ */ _("div", {
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-3)",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis"
							},
							children: t
						})] })
					}),
					r && !s && /* @__PURE__ */ _(V, {
						tono: r.tono,
						children: r.texto
					})
				]
			}),
			d.length > 0 && /* @__PURE__ */ _("div", {
				style: {
					display: "grid",
					gap: "var(--ds-3)",
					gridTemplateColumns: `repeat(${Math.min(2, d.length)}, minmax(0, 1fr))`,
					padding: "var(--ds-3)",
					borderRadius: "var(--ds-r-item)",
					background: "var(--ds-surface-sunk)"
				},
				children: d.map((e, t) => /* @__PURE__ */ v("div", {
					style: { minWidth: 0 },
					children: [/* @__PURE__ */ _("div", {
						style: {
							fontSize: "var(--ds-t-micro)",
							fontWeight: 600,
							letterSpacing: "0.05em",
							textTransform: "uppercase",
							color: "var(--ds-ink-3)"
						},
						children: e.etiqueta
					}), s ? /* @__PURE__ */ _(z, {
						alto: 16,
						ancho: "70%",
						estilo: { marginTop: 5 }
					}) : Pi(e.valor) ? /* @__PURE__ */ _("div", {
						style: { marginTop: 4 },
						children: /* @__PURE__ */ _(V, {
							tono: "aviso",
							children: "Sin capturar"
						})
					}) : /* @__PURE__ */ _("div", {
						className: "ds-num",
						style: {
							fontWeight: 700,
							color: "var(--ds-ink)",
							marginTop: 2,
							overflowWrap: "anywhere"
						},
						children: X(e.valor, e.formato || "texto", e.opciones)
					})]
				}, e.etiqueta ?? t))
			}),
			a && /* @__PURE__ */ _("div", {
				style: {
					display: "flex",
					gap: 8,
					flexWrap: "wrap",
					marginTop: "auto"
				},
				onClick: (e) => e.stopPropagation(),
				children: a
			})
		]
	});
}
// src/primitivas/Detalles.jsx
var Ii = (e) => e == null || e === "";
function Li({ texto: e, etiqueta: t }) {
	let [n, r] = h(!1);
	return /* @__PURE__ */ _("button", {
		type: "button",
		onClick: async () => {
			try {
				await navigator.clipboard.writeText(String(e)), r(!0), setTimeout(() => r(!1), 1600);
			} catch {}
		},
		"aria-label": `Copiar ${t}`,
		style: {
			border: "1px solid var(--ds-line-firm)",
			background: "transparent",
			color: n ? "var(--ds-ok)" : "var(--ds-ink-2)",
			cursor: "pointer",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-micro)",
			fontWeight: 600,
			padding: "2px 8px",
			borderRadius: "var(--ds-r-pill)",
			flexShrink: 0
		},
		children: /* @__PURE__ */ _("span", {
			"aria-live": "polite",
			children: n ? "Copiado" : "Copiar"
		})
	});
}
function Ri({ elementos: e = [], columnas: t = 2, estilo: n }) {
	let r = G(560) ? 1 : Math.max(1, Math.min(3, t));
	return /* @__PURE__ */ _("dl", {
		style: {
			margin: 0,
			display: "grid",
			gridTemplateColumns: `repeat(${r}, minmax(0, 1fr))`,
			columnGap: "var(--ds-6)",
			rowGap: "var(--ds-4)",
			...n
		},
		children: e.map((e, t) => {
			let n = Ii(e.valor), i = n ? null : o.isValidElement(e.valor) ? e.valor : X(e.valor, e.formato || "texto", e.opciones);
			return /* @__PURE__ */ v("div", {
				style: {
					minWidth: 0,
					gridColumn: `span ${Math.min(r, e.ancho || 1)}`
				},
				children: [/* @__PURE__ */ _("dt", {
					style: {
						fontSize: "var(--ds-t-micro)",
						fontWeight: 600,
						letterSpacing: "0.05em",
						textTransform: "uppercase",
						color: "var(--ds-ink-3)"
					},
					children: e.etiqueta
				}), /* @__PURE__ */ _("dd", {
					style: {
						margin: "4px 0 0",
						display: "flex",
						alignItems: "center",
						gap: 8,
						minWidth: 0
					},
					children: n ? /* @__PURE__ */ _(V, {
						tono: "aviso",
						children: "Sin capturar"
					}) : /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _("span", {
						className: e.formato && e.formato !== "texto" ? "ds-num" : void 0,
						style: {
							fontWeight: 600,
							color: "var(--ds-ink)",
							overflowWrap: "anywhere",
							minWidth: 0
						},
						children: i
					}), e.copiable && /* @__PURE__ */ _(Li, {
						texto: e.valor,
						etiqueta: e.etiqueta
					})] })
				})]
			}, e.etiqueta ?? t);
		})
	});
}
// src/primitivas/Llamado.jsx
var zi = {
	info: [
		"var(--ds-info-soft)",
		"var(--ds-info)",
		"i"
	],
	ok: [
		"var(--ds-ok-soft)",
		"var(--ds-ok)",
		"✓"
	],
	aviso: [
		"var(--ds-warn-soft)",
		"var(--ds-warn)",
		"!"
	],
	riesgo: [
		"var(--ds-risk-soft)",
		"var(--ds-risk)",
		"!"
	]
};
function Bi({ tono: e = "info", titulo: t, children: n, acciones: r, icono: i, onCerrar: a, estilo: o }) {
	let [s, c, l] = zi[e] || zi.info;
	return /* @__PURE__ */ v("div", {
		role: e === "riesgo" || e === "aviso" ? "alert" : "status",
		style: {
			display: "flex",
			alignItems: "flex-start",
			gap: "var(--ds-3)",
			background: s,
			borderRadius: "var(--ds-r-item)",
			border: `1px solid color-mix(in oklab, ${c} 22%, transparent)`,
			padding: "var(--ds-3) var(--ds-4)",
			...o
		},
		children: [
			/* @__PURE__ */ _("span", {
				"aria-hidden": !0,
				style: {
					width: 24,
					height: 24,
					flexShrink: 0,
					borderRadius: 99,
					background: c,
					color: "var(--ds-surface-solid)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontWeight: 700,
					fontSize: 13,
					marginTop: 1
				},
				children: i || l
			}),
			/* @__PURE__ */ v("div", {
				style: {
					flex: 1,
					minWidth: 0
				},
				children: [
					t && /* @__PURE__ */ _("div", {
						style: {
							fontWeight: 700,
							color: "var(--ds-ink)",
							letterSpacing: "-0.01em"
						},
						children: t
					}),
					n && /* @__PURE__ */ _("div", {
						style: {
							fontSize: "var(--ds-t-small)",
							color: "var(--ds-ink-2)",
							lineHeight: 1.5,
							marginTop: t ? 2 : 0
						},
						children: n
					}),
					r && /* @__PURE__ */ _("div", {
						style: {
							display: "flex",
							gap: 8,
							flexWrap: "wrap",
							marginTop: "var(--ds-3)"
						},
						children: r
					})
				]
			}),
			a && /* @__PURE__ */ _("button", {
				type: "button",
				onClick: a,
				"aria-label": "Cerrar aviso",
				style: {
					border: "none",
					background: "transparent",
					color: "var(--ds-ink-2)",
					cursor: "pointer",
					fontSize: 18,
					lineHeight: 1,
					padding: 4,
					borderRadius: 8,
					flexShrink: 0
				},
				children: "×"
			})
		]
	});
}
// src/primitivas/EstadoVacio.jsx
function Vi({ titulo: e = "Aún no hay nada aquí", children: t, acciones: n, icono: r, compacto: i = !1, estilo: a }) {
	return /* @__PURE__ */ v("div", {
		role: "status",
		style: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			textAlign: "center",
			gap: i ? 6 : "var(--ds-2)",
			padding: i ? "var(--ds-6) var(--ds-4)" : "var(--ds-12) var(--ds-6)",
			...a
		},
		children: [
			r && /* @__PURE__ */ _("div", {
				"aria-hidden": !0,
				style: {
					display: "grid",
					placeItems: "center",
					color: "var(--ds-ink-3)",
					lineHeight: 1,
					fontSize: i ? 32 : 48,
					fontWeight: 300,
					marginBottom: i ? 2 : 6
				},
				children: r
			}),
			/* @__PURE__ */ _("div", {
				style: {
					fontWeight: 700,
					letterSpacing: "-0.015em",
					color: "var(--ds-ink)",
					fontSize: i ? "var(--ds-t-body)" : "var(--ds-t-title)"
				},
				children: e
			}),
			t && /* @__PURE__ */ _("div", {
				style: {
					fontSize: i ? "var(--ds-t-small)" : "var(--ds-t-body)",
					color: "var(--ds-ink-2)",
					maxWidth: 400,
					lineHeight: 1.45,
					textWrap: "pretty"
				},
				children: t
			}),
			n && /* @__PURE__ */ _("div", {
				style: {
					display: "flex",
					gap: 8,
					flexWrap: "wrap",
					justifyContent: "center",
					marginTop: i ? 4 : "var(--ds-2)"
				},
				children: n
			})
		]
	});
}
// src/primitivas/GrupoRetratos.jsx
function Hi({ personas: e = [], maximo: t = 4, tamano: n = 32, generico: r = !1, figura: i = !1, animada: a = !1, estilo: o }) {
	let s = e.slice(0, t), c = e.length - s.length, l = e.map((e) => e.nombre).filter(Boolean).join(", ");
	return /* @__PURE__ */ v("div", {
		role: "img",
		"aria-label": `${e.length} personas: ${l}`,
		title: l,
		style: {
			display: "inline-flex",
			alignItems: "center",
			...o
		},
		children: [s.map((e, o) => /* @__PURE__ */ _("div", {
			style: {
				marginLeft: o ? -n * .28 : 0,
				borderRadius: 99,
				boxShadow: "0 0 0 2px var(--ds-surface-solid)",
				position: "relative",
				zIndex: t - o
			},
			children: /* @__PURE__ */ _(dn, {
				src: e.imagen,
				nombre: e.nombre || "",
				tamano: n,
				tono: o % 2 ? "neutro" : "acento",
				generico: r,
				figura: i,
				animada: a
			})
		}, e.clave ?? e.nombre ?? o)), c > 0 && /* @__PURE__ */ v("div", {
			className: "ds-num",
			style: {
				marginLeft: -n * .28,
				width: n,
				height: n,
				borderRadius: 99,
				background: "var(--ds-retrato-neutro)",
				color: "var(--ds-ink-2)",
				boxShadow: "0 0 0 2px var(--ds-surface-solid)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: n * .34,
				fontWeight: 700
			},
			children: ["+", c]
		})]
	});
}
// src/primitivas/LineaTiempo.jsx
var Ui = {
	neutro: [
		"var(--ds-surface-solid)",
		"var(--ds-ink-3)",
		"var(--ds-line-firm)"
	],
	acento: [
		"var(--ds-accent-soft)",
		"var(--ds-accent-tinta)",
		"var(--ds-accent-trazo)"
	],
	ok: [
		"var(--ds-ok-soft)",
		"var(--ds-ok)",
		"var(--ds-ok)"
	],
	aviso: [
		"var(--ds-warn-soft)",
		"var(--ds-warn)",
		"var(--ds-warn)"
	],
	riesgo: [
		"var(--ds-risk-soft)",
		"var(--ds-risk)",
		"var(--ds-risk)"
	]
}, Wi = (e) => {
	if (!e) return "sin-fecha";
	let t = e instanceof Date ? e : new Date(typeof e == "string" && e.length === 10 ? `${e}T00:00:00` : e);
	return Number.isNaN(t.getTime()) ? "sin-fecha" : `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}, Gi = (e) => !(typeof e == "string" && /^\d{4}-\d{2}-\d{2}$/.test(e));
function Ki({ eventos: e = [], actual: t, agrupar: n = !1, relativa: r = !1, vacio: i = "Todavía no hay movimientos.", estilo: a }) {
	if (e.length === 0) return /* @__PURE__ */ _("div", {
		style: {
			color: "var(--ds-ink-3)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 600,
			padding: "var(--ds-4) 0",
			...a
		},
		children: i
	});
	let s = (e) => {
		if (!e) return -Infinity;
		let t = new Date(typeof e == "string" && e.length === 10 ? `${e}T00:00:00` : e);
		return Number.isNaN(t.getTime()) ? -Infinity : t.getTime();
	}, c = t === null ? -1 : t === void 0 ? e.reduce((t, n, r) => s(n.fecha) > s(e[t]?.fecha) ? r : t, 0) : e.findIndex((e, n) => (e.id ?? n) === t), l = null;
	return /* @__PURE__ */ _("ol", {
		style: {
			listStyle: "none",
			margin: 0,
			padding: 0,
			...a
		},
		children: e.map((t, i) => {
			let a = i === c, [s, u, d] = Ui[t.tono] || (a ? Ui.acento : Ui.neutro), f = Wi(t.fecha), p = n && f !== l;
			l = f;
			let m = i === e.length - 1, h = t.fecha ? r ? li(t.fecha) : n ? Gi(t.fecha) ? Y(t.fecha, "hora") : null : Y(t.fecha, Gi(t.fecha) ? "fechaHora" : "media") : "Sin fecha";
			return /* @__PURE__ */ v(o.Fragment, { children: [p && /* @__PURE__ */ _("li", {
				"aria-hidden": !1,
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					letterSpacing: "0.05em",
					textTransform: "uppercase",
					color: "var(--ds-ink-3)",
					padding: i === 0 ? "0 0 var(--ds-2)" : "var(--ds-3) 0 var(--ds-2)"
				},
				children: f === "sin-fecha" ? "Sin fecha" : Y(t.fecha, "larga")
			}), /* @__PURE__ */ v("li", {
				"aria-current": a ? "step" : void 0,
				style: {
					display: "grid",
					gridTemplateColumns: "28px 1fr",
					columnGap: "var(--ds-3)"
				},
				children: [/* @__PURE__ */ v("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ _("span", {
						style: {
							width: a ? 24 : 18,
							height: a ? 24 : 18,
							marginTop: a ? 0 : 3,
							flexShrink: 0,
							borderRadius: "var(--ds-r-pill)",
							background: s,
							color: u,
							border: `2px solid ${d}`,
							display: "grid",
							placeItems: "center",
							boxShadow: a ? "0 0 0 4px var(--ds-accent-ring)" : "none"
						},
						children: t.icono
					}), !m && /* @__PURE__ */ _("span", {
						"aria-hidden": !0,
						style: {
							flex: 1,
							width: 2,
							minHeight: 14,
							marginTop: 4,
							background: "var(--ds-line-firm)",
							borderRadius: 2
						}
					})]
				}), /* @__PURE__ */ v("div", {
					style: {
						paddingBottom: m ? 0 : "var(--ds-4)",
						minWidth: 0
					},
					children: [
						/* @__PURE__ */ v("div", {
							style: {
								display: "flex",
								alignItems: "baseline",
								gap: "var(--ds-2)",
								flexWrap: "wrap"
							},
							children: [/* @__PURE__ */ _("span", {
								style: {
									fontWeight: a ? 800 : 700,
									color: "var(--ds-ink)",
									fontSize: "var(--ds-t-body)"
								},
								children: t.titulo
							}), h && /* @__PURE__ */ _("span", {
								className: "ds-num",
								style: {
									fontSize: "var(--ds-t-micro)",
									fontWeight: 600,
									color: "var(--ds-ink-3)",
									whiteSpace: "nowrap"
								},
								children: h
							})]
						}),
						t.texto && /* @__PURE__ */ _("div", {
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-2)",
								marginTop: 2
							},
							children: t.texto
						}),
						t.actor && /* @__PURE__ */ _("div", {
							style: {
								fontSize: "var(--ds-t-micro)",
								fontWeight: 600,
								color: "var(--ds-ink-3)",
								marginTop: 3
							},
							children: t.actor
						})
					]
				})]
			})] }, t.id ?? i);
		})
	});
}
// src/primitivas/Pasos.jsx
var qi = {
	hecho: {
		palabra: "Hecho",
		fondo: "var(--ds-ok)",
		tinta: "var(--ds-ink-on-accent)",
		borde: "var(--ds-ok)",
		texto: "var(--ds-ink-2)"
	},
	actual: {
		palabra: "En curso",
		fondo: "var(--ds-accent)",
		tinta: "var(--ds-ink-on-accent)",
		borde: "var(--ds-accent-trazo)",
		texto: "var(--ds-accent-tinta)"
	},
	pendiente: {
		palabra: "Pendiente",
		fondo: "var(--ds-surface-solid)",
		tinta: "var(--ds-ink-3)",
		borde: "var(--ds-line-firm)",
		texto: "var(--ds-ink-3)"
	},
	error: {
		palabra: "Con problema",
		fondo: "var(--ds-risk)",
		tinta: "var(--ds-ink-on-accent)",
		borde: "var(--ds-risk)",
		texto: "var(--ds-ink)"
	},
	omitido: {
		palabra: "Omitido",
		fondo: "var(--ds-surface-sunk)",
		tinta: "var(--ds-ink-3)",
		borde: "var(--ds-line-firm)",
		texto: "var(--ds-ink-3)"
	}
}, Ji = {
	hecho: /* @__PURE__ */ _("path", { d: "M20 6L9 17l-5-5" }),
	error: /* @__PURE__ */ _("path", { d: "M18 6L6 18M6 6l12 12" }),
	omitido: /* @__PURE__ */ _("path", { d: "M5 12h14" })
};
function Yi({ estado: e, numero: t, tamano: n = 30 }) {
	let r = qi[e] || qi.pendiente;
	return /* @__PURE__ */ _("span", {
		style: {
			width: n,
			height: n,
			flexShrink: 0,
			borderRadius: "var(--ds-r-pill)",
			background: r.fondo,
			color: r.tinta,
			border: `2px solid ${r.borde}`,
			display: "grid",
			placeItems: "center",
			fontSize: "var(--ds-t-small)",
			fontWeight: 700,
			boxShadow: e === "actual" ? "0 0 0 4px var(--ds-accent-ring)" : "none",
			transition: "background var(--ds-t-state) var(--ds-ease)"
		},
		children: Ji[e] ? /* @__PURE__ */ _("svg", {
			width: "15",
			height: "15",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.6",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": !0,
			children: Ji[e]
		}) : /* @__PURE__ */ _("span", {
			className: "ds-num",
			children: t
		})
	});
}
function Xi({ onPaso: e, paso: t, i: n, children: r, estilo: i }) {
	return e ? /* @__PURE__ */ _("button", {
		type: "button",
		onClick: () => e(t, n),
		style: {
			...i,
			background: "transparent",
			border: "none",
			cursor: "pointer",
			font: "inherit",
			color: "inherit",
			textAlign: "inherit",
			padding: i?.padding ?? 0,
			borderRadius: "var(--ds-r-item)"
		},
		children: r
	}) : /* @__PURE__ */ _("div", {
		style: i,
		children: r
	});
}
function Zi({ pasos: e = [], orientacion: t = "horizontal", onPaso: n, estilo: r }) {
	let i = G(), a = t === "vertical" || i, o = (e) => [e.fecha ? Y(e.fecha, "media") : null, e.responsable].filter(Boolean).join(" · ");
	return a ? /* @__PURE__ */ _("ol", {
		style: {
			listStyle: "none",
			margin: 0,
			padding: 0,
			...r
		},
		children: e.map((t, r) => {
			let i = qi[t.estado] || qi.pendiente, a = r === e.length - 1;
			return /* @__PURE__ */ v("li", {
				"aria-current": t.estado === "actual" ? "step" : void 0,
				style: {
					display: "grid",
					gridTemplateColumns: "30px 1fr",
					columnGap: "var(--ds-3)"
				},
				children: [/* @__PURE__ */ v("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ _(Yi, {
						estado: t.estado,
						numero: r + 1
					}), !a && /* @__PURE__ */ _("span", {
						"aria-hidden": !0,
						style: {
							flex: 1,
							width: 2,
							minHeight: 16,
							margin: "4px 0",
							borderRadius: 2,
							background: t.estado === "hecho" ? "var(--ds-ok)" : "var(--ds-line-firm)"
						}
					})]
				}), /* @__PURE__ */ v(Xi, {
					onPaso: n,
					paso: t,
					i: r,
					estilo: {
						display: "block",
						paddingBottom: a ? 0 : "var(--ds-4)",
						minWidth: 0
					},
					children: [
						/* @__PURE__ */ _("div", {
							style: {
								fontWeight: 600,
								color: "var(--ds-ink)",
								lineHeight: "30px"
							},
							children: t.titulo
						}),
						/* @__PURE__ */ _("div", {
							style: {
								fontSize: "var(--ds-t-micro)",
								fontWeight: 600,
								color: i.texto,
								letterSpacing: "0.02em"
							},
							children: i.palabra
						}),
						o(t) && /* @__PURE__ */ _("div", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-3)",
								marginTop: 2
							},
							children: o(t)
						}),
						t.texto && /* @__PURE__ */ _("div", {
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-2)",
								marginTop: 2
							},
							children: t.texto
						})
					]
				})]
			}, t.id ?? r);
		})
	}) : /* @__PURE__ */ _("ol", {
		style: {
			listStyle: "none",
			margin: 0,
			padding: 0,
			display: "flex",
			...r
		},
		children: e.map((t, r) => {
			let i = qi[t.estado] || qi.pendiente, a = r === e.length - 1;
			return /* @__PURE__ */ v("li", {
				"aria-current": t.estado === "actual" ? "step" : void 0,
				style: {
					flex: 1,
					minWidth: 0,
					position: "relative"
				},
				children: [!a && /* @__PURE__ */ _("span", {
					"aria-hidden": !0,
					style: {
						position: "absolute",
						top: 14,
						left: "calc(50% + 21px)",
						right: "calc(-50% + 21px)",
						height: 2,
						borderRadius: 2,
						background: t.estado === "hecho" ? "var(--ds-ok)" : "var(--ds-line-firm)"
					}
				}), /* @__PURE__ */ v(Xi, {
					onPaso: n,
					paso: t,
					i: r,
					estilo: {
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						width: "100%",
						textAlign: "center",
						padding: "0 var(--ds-1)"
					},
					children: [
						/* @__PURE__ */ _(Yi, {
							estado: t.estado,
							numero: r + 1
						}),
						/* @__PURE__ */ _("div", {
							style: {
								fontWeight: 600,
								color: "var(--ds-ink)",
								marginTop: "var(--ds-2)",
								fontSize: "var(--ds-t-small)",
								lineHeight: 1.25
							},
							children: t.titulo
						}),
						/* @__PURE__ */ _("div", {
							style: {
								fontSize: "var(--ds-t-micro)",
								fontWeight: 600,
								color: i.texto,
								marginTop: 2
							},
							children: i.palabra
						}),
						o(t) && /* @__PURE__ */ _("div", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-t-micro)",
								color: "var(--ds-ink-3)",
								marginTop: 2
							},
							children: o(t)
						})
					]
				})]
			}, t.id ?? r);
		})
	});
}
// src/primitivas/Kanban.jsx
function Qi({ tarjeta: e, columna: t, columnas: n, onMover: r }) {
	let i = m(null), [a, o] = h(!1);
	return /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _("button", {
		ref: i,
		type: "button",
		"aria-haspopup": "menu",
		"aria-expanded": a,
		"aria-label": `Mover «${e.titulo}» a otra columna`,
		onClick: (e) => {
			e.stopPropagation(), o((e) => !e);
		},
		style: {
			border: "1px solid var(--ds-line)",
			background: "transparent",
			cursor: "pointer",
			color: "var(--ds-ink-3)",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-micro)",
			fontWeight: 600,
			padding: "3px 9px",
			borderRadius: "var(--ds-r-pill)",
			flexShrink: 0
		},
		children: "Mover a…"
	}), /* @__PURE__ */ v(Nn, {
		ancla: i,
		abierto: a,
		onCerrar: () => o(!1),
		etiqueta: "Mover a columna",
		minAncho: 190,
		children: [/* @__PURE__ */ _("div", {
			style: {
				fontSize: "var(--ds-t-micro)",
				fontWeight: 600,
				letterSpacing: "0.05em",
				textTransform: "uppercase",
				color: "var(--ds-ink-3)",
				padding: "4px 10px 7px"
			},
			children: "Mover a"
		}), n.filter((e) => e.id !== t.id).map((n) => /* @__PURE__ */ _(Pn, {
			rol: "menuitem",
			onClick: () => {
				o(!1), r(e, n.id, t.id);
			},
			children: n.titulo
		}, n.id))]
	})] });
}
function $i({ tarjeta: e, formatoValor: t }) {
	return /* @__PURE__ */ v(g, { children: [
		/* @__PURE__ */ _("div", {
			style: {
				fontWeight: 600,
				color: "var(--ds-ink)",
				fontSize: "var(--ds-t-small)",
				lineHeight: 1.3
			},
			children: e.titulo
		}),
		e.subtitulo && /* @__PURE__ */ _("div", {
			style: {
				fontSize: "var(--ds-t-micro)",
				color: "var(--ds-ink-3)",
				marginTop: 2,
				fontWeight: 600
			},
			children: e.subtitulo
		}),
		(e.valor !== void 0 || e.etiquetas?.length > 0) && /* @__PURE__ */ v("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 6,
				flexWrap: "wrap",
				marginTop: "var(--ds-2)"
			},
			children: [e.valor !== void 0 && /* @__PURE__ */ _("span", {
				className: "ds-num",
				style: {
					fontWeight: 700,
					color: "var(--ds-ink)",
					fontSize: "var(--ds-t-small)",
					marginRight: "auto"
				},
				children: X(e.valor, t)
			}), e.etiquetas?.map((e, t) => /* @__PURE__ */ _(V, {
				tono: e.tono,
				children: e.texto
			}, t))]
		})
	] });
}
function ea({ columnas: e = [], onMover: t, onTarjeta: n, renderTarjeta: r, formatoValor: i = "moneda", anchoColumna: a = 280, vacioColumna: o = "Sin elementos en esta etapa.", estilo: s }) {
	let c = G(), [l, u] = h(null), [d, f] = h(null), p = typeof t == "function", m = c ? `min(${a}px, 82vw)` : a;
	return /* @__PURE__ */ _("div", {
		role: "list",
		"aria-label": "Tablero",
		style: {
			display: "flex",
			gap: "var(--ds-3)",
			overflowX: "auto",
			alignItems: "flex-start",
			minWidth: 0,
			maxWidth: "100%",
			paddingBottom: "var(--ds-2)",
			scrollSnapType: c ? "x mandatory" : void 0,
			...s
		},
		children: e.map((a) => {
			let s = a.tarjetas || [], c = s.some((e) => e.valor !== void 0 && e.valor !== null), h = s.reduce((e, t) => e + (Number(t.valor) || 0), 0), g = d === a.id && l && l.origen !== a.id;
			return /* @__PURE__ */ v("section", {
				role: "listitem",
				"aria-label": `${a.titulo}, ${s.length}`,
				onDragOver: p ? (e) => {
					e.preventDefault(), d !== a.id && f(a.id);
				} : void 0,
				onDragLeave: p ? (e) => {
					e.currentTarget.contains(e.relatedTarget) || f(null);
				} : void 0,
				onDrop: p ? (n) => {
					n.preventDefault(), f(null);
					let r = l;
					if (u(null), !r || r.origen === a.id) return;
					let i = e.find((e) => e.id === r.origen)?.tarjetas?.find((e) => e.id === r.id);
					i && t(i, a.id, r.origen);
				} : void 0,
				style: {
					flex: "0 0 auto",
					width: m,
					scrollSnapAlign: "start",
					background: g ? "var(--ds-accent-soft)" : "var(--ds-surface-sunk)",
					border: `1px ${g ? "dashed" : "solid"} ${g ? "var(--ds-accent-trazo)" : "var(--ds-line)"}`,
					borderRadius: "var(--ds-r-card)",
					padding: "var(--ds-3)",
					transition: "background var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease)"
				},
				children: [/* @__PURE__ */ v("header", {
					style: {
						display: "flex",
						alignItems: "baseline",
						gap: "var(--ds-2)",
						padding: "2px 4px var(--ds-3)"
					},
					children: [
						/* @__PURE__ */ _("h3", {
							style: {
								margin: 0,
								fontSize: "var(--ds-t-small)",
								fontWeight: 700,
								color: "var(--ds-ink)",
								letterSpacing: "-0.01em",
								minWidth: 0,
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap"
							},
							children: a.titulo
						}),
						/* @__PURE__ */ _("span", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-t-micro)",
								fontWeight: 700,
								color: "var(--ds-ink-3)",
								background: "var(--ds-surface)",
								borderRadius: "var(--ds-r-pill)",
								padding: "1px 8px"
							},
							children: s.length
						}),
						c && /* @__PURE__ */ _("span", {
							className: "ds-num",
							style: {
								marginLeft: "auto",
								fontSize: "var(--ds-t-micro)",
								fontWeight: 600,
								color: "var(--ds-ink-2)",
								whiteSpace: "nowrap"
							},
							children: X(h, i === "moneda" ? "monedaCompacta" : i)
						})
					]
				}), /* @__PURE__ */ v("div", {
					role: "list",
					style: {
						display: "grid",
						gap: "var(--ds-2)"
					},
					children: [s.length === 0 && /* @__PURE__ */ _("div", {
						style: {
							fontSize: "var(--ds-t-small)",
							color: "var(--ds-ink-3)",
							fontWeight: 600,
							textAlign: "center",
							padding: "var(--ds-5) var(--ds-3)",
							border: "1px dashed var(--ds-line-firm)",
							borderRadius: "var(--ds-r-item)"
						},
						children: o
					}), s.map((o) => {
						let s = l?.id === o.id;
						return /* @__PURE__ */ v("article", {
							role: "listitem",
							draggable: p,
							onDragStart: p ? (e) => {
								e.dataTransfer.effectAllowed = "move", e.dataTransfer.setData("text/plain", String(o.id)), u({
									id: o.id,
									origen: a.id
								});
							} : void 0,
							onDragEnd: p ? () => {
								u(null), f(null);
							} : void 0,
							style: {
								background: "var(--ds-surface-solid)",
								border: "1px solid var(--ds-line)",
								borderRadius: "var(--ds-r-item)",
								padding: "var(--ds-3)",
								boxShadow: "var(--ds-lift-1)",
								opacity: s ? .45 : 1,
								cursor: p ? "grab" : void 0,
								transition: "opacity var(--ds-t-state) var(--ds-ease)"
							},
							children: [n ? /* @__PURE__ */ _("button", {
								type: "button",
								onClick: () => n(o, a),
								style: {
									display: "block",
									width: "100%",
									textAlign: "left",
									background: "transparent",
									border: "none",
									padding: 0,
									cursor: "pointer",
									font: "inherit",
									color: "inherit"
								},
								children: r ? r(o, a) : /* @__PURE__ */ _($i, {
									tarjeta: o,
									formatoValor: i
								})
							}) : r ? r(o, a) : /* @__PURE__ */ _($i, {
								tarjeta: o,
								formatoValor: i
							}), p && e.length > 1 && /* @__PURE__ */ _("div", {
								style: {
									display: "flex",
									justifyContent: "flex-end",
									marginTop: "var(--ds-2)"
								},
								children: /* @__PURE__ */ _(Qi, {
									tarjeta: o,
									columna: a,
									columnas: e,
									onMover: t
								})
							})]
						}, o.id);
					})]
				})]
			}, a.id);
		})
	});
}
// src/primitivas/Actividad.jsx
var ta = (e) => e instanceof Date ? e : new Date(typeof e == "string" && e.length === 10 ? `${e}T00:00:00` : e), na = (e, t) => e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
function ra(e, t) {
	if (Number.isNaN(e.getTime())) return "Sin fecha";
	if (na(e, t)) return "Hoy";
	let n = new Date(t);
	return n.setDate(t.getDate() - 1), na(e, n) ? "Ayer" : Y(e, "larga");
}
function ia({ eventos: e = [], ahora: t, agrupar: n = !0, vacio: r = "Sin actividad reciente.", estilo: i }) {
	let a = t ? ta(t) : /* @__PURE__ */ new Date();
	if (e.length === 0) return /* @__PURE__ */ _("div", {
		style: {
			color: "var(--ds-ink-3)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 600,
			padding: "var(--ds-4) 0",
			...i
		},
		children: r
	});
	let s = null;
	return /* @__PURE__ */ _("ul", {
		style: {
			listStyle: "none",
			margin: 0,
			padding: 0,
			...i
		},
		children: e.map((e, t) => {
			let r = ta(e.fecha), i = n ? ra(r, a) : null, c = n && i !== s;
			s = i;
			let l = !Number.isNaN(r.getTime()), u = l && na(r, a), d = l ? u ? li(r, a) : n ? Y(r, "hora") : Y(r, "fechaHora") : "";
			return /* @__PURE__ */ v(o.Fragment, { children: [c && /* @__PURE__ */ _("li", {
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					letterSpacing: "0.05em",
					textTransform: "uppercase",
					color: "var(--ds-ink-3)",
					padding: t === 0 ? "0 0 var(--ds-2)" : "var(--ds-4) 0 var(--ds-2)"
				},
				children: i
			}), /* @__PURE__ */ v("li", {
				style: {
					display: "flex",
					gap: "var(--ds-3)",
					alignItems: "flex-start",
					padding: "var(--ds-2) 0"
				},
				children: [
					e.icono ? /* @__PURE__ */ _(oe, {
						tono: e.tono || "neutro",
						tamano: 34,
						children: e.icono
					}) : /* @__PURE__ */ _(dn, {
						nombre: e.actor || "",
						src: e.retrato,
						tamano: 34,
						tono: "neutro"
					}),
					/* @__PURE__ */ v("div", {
						style: {
							flex: 1,
							minWidth: 0
						},
						children: [/* @__PURE__ */ v("div", {
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-2)",
								lineHeight: 1.45
							},
							children: [
								e.actor && /* @__PURE__ */ _("strong", {
									style: {
										color: "var(--ds-ink)",
										fontWeight: 700
									},
									children: e.actor
								}),
								e.actor ? " " : "",
								e.accion,
								e.objeto && /* @__PURE__ */ v(g, { children: [" ", /* @__PURE__ */ _("strong", {
									style: {
										color: "var(--ds-ink)",
										fontWeight: 600
									},
									children: e.objeto
								})] })
							]
						}), e.detalle && /* @__PURE__ */ _("div", {
							style: {
								fontSize: "var(--ds-t-micro)",
								color: "var(--ds-ink-3)",
								marginTop: 2,
								fontWeight: 600
							},
							children: e.detalle
						})]
					}),
					d && /* @__PURE__ */ _("time", {
						className: "ds-num",
						dateTime: l ? r.toISOString() : void 0,
						style: {
							fontSize: "var(--ds-t-micro)",
							fontWeight: 600,
							color: "var(--ds-ink-3)",
							whiteSpace: "nowrap",
							paddingTop: 2
						},
						children: d
					})
				]
			})] }, e.id ?? t);
		})
	});
}
// src/primitivas/Calendario.jsx
var aa = [
	"Lun",
	"Mar",
	"Mié",
	"Jue",
	"Vie",
	"Sáb",
	"Dom"
], oa = {
	neutro: ["var(--ds-surface-sunk)", "var(--ds-ink-3)"],
	acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)"],
	ok: ["var(--ds-ok-soft)", "var(--ds-ok)"],
	aviso: ["var(--ds-warn-soft)", "var(--ds-warn)"],
	riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)"]
}, sa = (e) => String(e).padStart(2, "0"), ca = (e) => `${e.getFullYear()}-${sa(e.getMonth() + 1)}-${sa(e.getDate())}`, la = (e) => {
	let [t, n, r] = e.split("-").map(Number);
	return new Date(t, n - 1, r || 1);
}, ua = (e) => `${e.getFullYear()}-${sa(e.getMonth() + 1)}`;
function da({ e, onEvento: t, compacto: n }) {
	let [r, i] = oa[e.tono] || oa.acento, a = /* @__PURE__ */ v("span", {
		style: {
			display: "block",
			overflow: "hidden",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap"
		},
		children: [e.hora && /* @__PURE__ */ _("span", {
			className: "ds-num",
			style: {
				fontWeight: 700,
				marginRight: 4
			},
			children: e.hora
		}), e.titulo]
	}), o = {
		display: "block",
		width: "100%",
		textAlign: "left",
		minWidth: 0,
		background: r,
		color: "var(--ds-ink)",
		borderRadius: 6,
		padding: n ? "2px 6px" : "6px 10px",
		borderTop: "none",
		borderRight: "none",
		borderBottom: "none",
		borderLeft: `3px solid ${i}`,
		fontFamily: "var(--ds-font)",
		fontSize: n ? "var(--ds-t-micro)" : "var(--ds-t-small)",
		fontWeight: 600,
		lineHeight: 1.35
	};
	return t ? /* @__PURE__ */ _("button", {
		type: "button",
		onClick: (n) => {
			n.stopPropagation(), t(e);
		},
		title: e.titulo,
		style: {
			...o,
			cursor: "pointer"
		},
		children: a
	}) : /* @__PURE__ */ _("div", {
		title: e.titulo,
		style: o,
		children: a
	});
}
function fa({ resto: e, dia: t, onEvento: n }) {
	let r = m(null), [i, a] = h(!1);
	return /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ v("button", {
		ref: r,
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i,
		onClick: (e) => {
			e.stopPropagation(), a((e) => !e);
		},
		style: {
			background: "transparent",
			border: "none",
			padding: "1px 4px",
			cursor: "pointer",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-micro)",
			fontWeight: 700,
			color: "var(--ds-accent-tinta)",
			textAlign: "left",
			borderRadius: 6
		},
		children: [
			"+",
			e.length,
			" más"
		]
	}), /* @__PURE__ */ v(Nn, {
		ancla: r,
		abierto: i,
		onCerrar: () => a(!1),
		rol: "dialog",
		etiqueta: `Eventos del ${Y(t, "larga")}`,
		minAncho: 240,
		children: [/* @__PURE__ */ _("div", {
			style: {
				fontSize: "var(--ds-t-micro)",
				fontWeight: 600,
				letterSpacing: "0.05em",
				textTransform: "uppercase",
				color: "var(--ds-ink-3)",
				padding: "4px 6px 8px"
			},
			children: Y(t, "larga")
		}), /* @__PURE__ */ _("div", {
			style: {
				display: "grid",
				gap: 6,
				padding: "0 4px 4px"
			},
			children: e.map((e, t) => /* @__PURE__ */ _(da, {
				e,
				onEvento: n
			}, e.id ?? t))
		})]
	})] });
}
var pa = {
	border: "1px solid var(--ds-line-firm)",
	background: "var(--ds-surface)",
	color: "var(--ds-ink-2)",
	borderRadius: "var(--ds-r-pill)",
	cursor: "pointer",
	fontFamily: "var(--ds-font)",
	fontWeight: 600,
	fontSize: "var(--ds-t-small)",
	height: 34,
	minWidth: 34,
	padding: "0 12px",
	display: "inline-grid",
	placeItems: "center"
};
function ma({ eventos: e = [], mes: t, mesInicial: n, onCambioMes: r, onDia: i, onEvento: a, maxPorDia: o = 3, hoy: s, vacio: c = "No hay eventos este mes.", estilo: l }) {
	let u = G(700), d = s ? la(s) : /* @__PURE__ */ new Date(), [f, m] = h(n || ua(d)), g = la(`${t || f}-01`), y = (e) => {
		let n = ua(e);
		t || m(n), r?.(n);
	}, b = p(() => {
		let t = /* @__PURE__ */ new Map();
		return e.forEach((e) => {
			if (!e.fecha) return;
			let n = String(e.fecha).slice(0, 10);
			t.has(n) || t.set(n, []), t.get(n).push(e);
		}), t;
	}, [e]), x = (g.getDay() + 6) % 7, S = new Date(g);
	S.setDate(1 - x);
	let C = new Date(g.getFullYear(), g.getMonth() + 1, 0), w = Math.ceil((x + C.getDate()) / 7), T = Array.from({ length: w * 7 }, (e, t) => {
		let n = new Date(S);
		return n.setDate(S.getDate() + t), n;
	}), E = Y(g, "mes"), D = /* @__PURE__ */ v("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-2)",
			flexWrap: "wrap",
			marginBottom: "var(--ds-4)"
		},
		children: [
			/* @__PURE__ */ _("h3", {
				"aria-live": "polite",
				style: {
					margin: 0,
					fontSize: "var(--ds-t-title)",
					fontWeight: 700,
					letterSpacing: "-0.03em",
					color: "var(--ds-ink)",
					marginRight: "auto",
					textTransform: "capitalize"
				},
				children: E
			}),
			/* @__PURE__ */ _("button", {
				type: "button",
				style: pa,
				"aria-label": "Mes anterior",
				onClick: () => y(new Date(g.getFullYear(), g.getMonth() - 1, 1)),
				children: "‹"
			}),
			/* @__PURE__ */ _("button", {
				type: "button",
				style: pa,
				onClick: () => y(d),
				children: "Hoy"
			}),
			/* @__PURE__ */ _("button", {
				type: "button",
				style: pa,
				"aria-label": "Mes siguiente",
				onClick: () => y(new Date(g.getFullYear(), g.getMonth() + 1, 1)),
				children: "›"
			})
		]
	});
	if (u) {
		let e = T.filter((e) => e.getMonth() === g.getMonth() && b.has(ca(e)));
		return /* @__PURE__ */ v("div", {
			style: l,
			children: [
				D,
				e.length === 0 && /* @__PURE__ */ _("div", {
					style: {
						color: "var(--ds-ink-3)",
						fontSize: "var(--ds-t-small)",
						fontWeight: 600,
						padding: "var(--ds-4) 0"
					},
					children: c
				}),
				/* @__PURE__ */ _("ol", {
					style: {
						listStyle: "none",
						margin: 0,
						padding: 0,
						display: "grid",
						gap: "var(--ds-3)"
					},
					children: e.map((e) => {
						let t = ca(e), n = t === ca(d);
						return /* @__PURE__ */ v("li", {
							style: {
								display: "grid",
								gridTemplateColumns: "52px 1fr",
								gap: "var(--ds-3)"
							},
							children: [/* @__PURE__ */ v("button", {
								type: "button",
								onClick: i ? () => i(t, b.get(t)) : void 0,
								disabled: !i,
								"aria-label": Y(t, "larga"),
								style: {
									border: "none",
									background: "transparent",
									padding: 0,
									textAlign: "center",
									cursor: i ? "pointer" : "default",
									fontFamily: "var(--ds-font)"
								},
								children: [/* @__PURE__ */ _("div", {
									style: {
										fontSize: "var(--ds-t-micro)",
										fontWeight: 600,
										textTransform: "uppercase",
										color: n ? "var(--ds-accent-tinta)" : "var(--ds-ink-3)"
									},
									children: aa[(e.getDay() + 6) % 7]
								}), /* @__PURE__ */ _("div", {
									className: "ds-num",
									style: {
										fontSize: "var(--ds-num-m)",
										fontWeight: 700,
										lineHeight: 1.1,
										color: n ? "var(--ds-accent-tinta)" : "var(--ds-ink)"
									},
									children: e.getDate()
								})]
							}), /* @__PURE__ */ _("div", {
								style: {
									display: "grid",
									gap: 6,
									minWidth: 0
								},
								children: b.get(t).map((e, t) => /* @__PURE__ */ _(da, {
									e,
									onEvento: a
								}, e.id ?? t))
							})]
						}, t);
					})
				})
			]
		});
	}
	return /* @__PURE__ */ v("div", {
		style: l,
		children: [D, /* @__PURE__ */ v("div", {
			role: "group",
			"aria-label": E,
			style: {
				display: "grid",
				gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
				border: "1px solid var(--ds-line)",
				borderRadius: "var(--ds-r-item)",
				overflow: "hidden"
			},
			children: [aa.map((e) => /* @__PURE__ */ _("div", {
				"aria-hidden": !0,
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					letterSpacing: "0.05em",
					textTransform: "uppercase",
					color: "var(--ds-ink-3)",
					padding: "8px 10px",
					borderBottom: "1px solid var(--ds-line)",
					background: "var(--ds-surface-2)"
				},
				children: e
			}, e)), T.map((e, t) => {
				let n = ca(e), r = e.getMonth() === g.getMonth(), s = n === ca(d), c = b.get(n) || [], l = c.length > o ? c.slice(0, o - 1) : c, u = c.slice(l.length);
				return /* @__PURE__ */ v("div", {
					style: {
						minHeight: 104,
						padding: 6,
						minWidth: 0,
						display: "flex",
						flexDirection: "column",
						gap: 4,
						borderRight: (t + 1) % 7 ? "1px solid var(--ds-line)" : "none",
						borderBottom: t < T.length - 7 ? "1px solid var(--ds-line)" : "none",
						background: r ? "transparent" : "var(--ds-surface-sunk)"
					},
					children: [
						/* @__PURE__ */ _("button", {
							type: "button",
							className: "ds-num",
							disabled: !i,
							onClick: i ? () => i(n, c) : void 0,
							"aria-label": `${Y(n, "larga")}${c.length ? `, ${c.length} eventos` : ", sin eventos"}`,
							style: {
								alignSelf: "flex-start",
								fontSize: "var(--ds-t-small)",
								fontWeight: 700,
								border: "none",
								padding: 0,
								fontFamily: "var(--ds-font)",
								cursor: i ? "pointer" : "default",
								width: 26,
								height: 26,
								display: "grid",
								placeItems: "center",
								borderRadius: "var(--ds-r-pill)",
								background: s ? "var(--ds-accent)" : "transparent",
								color: s ? "var(--ds-ink-on-accent)" : r ? "var(--ds-ink)" : "var(--ds-ink-3)"
							},
							children: e.getDate()
						}),
						l.map((e, t) => /* @__PURE__ */ _(da, {
							e,
							onEvento: a,
							compacto: !0
						}, e.id ?? t)),
						u.length > 0 && /* @__PURE__ */ _(fa, {
							resto: c,
							dia: n,
							onEvento: a
						})
					]
				}, n);
			})]
		})]
	});
}
// src/primitivas/EncabezadoPagina.jsx
function ha({ titulo: e, descripcion: t, migas: n, meta: r, acciones: i, estilo: a }) {
	let o = G(), s = l(wn), c = m(null);
	return u(() => {
		let t = c.current;
		if (!o || !s || !t || typeof IntersectionObserver > "u") return;
		let n = new IntersectionObserver(([t]) => s(t.isIntersecting ? null : e), { rootMargin: "-52px 0px 0px 0px" });
		return n.observe(t), () => {
			n.disconnect(), s(null);
		};
	}, [
		o,
		s,
		e
	]), /* @__PURE__ */ v("header", {
		style: {
			marginBottom: "var(--ds-6)",
			...a
		},
		children: [n?.length > 0 && /* @__PURE__ */ _(yn, { ruta: n }), /* @__PURE__ */ v("div", {
			style: {
				display: "flex",
				gap: "var(--ds-4)",
				flexDirection: o ? "column" : "row",
				alignItems: o ? "stretch" : "flex-end"
			},
			children: [/* @__PURE__ */ v("div", {
				style: {
					flex: 1,
					minWidth: 0
				},
				children: [
					/* @__PURE__ */ _("h1", {
						ref: c,
						style: {
							margin: 0,
							fontSize: o ? "var(--ds-t-display)" : "var(--ds-num-l)",
							fontWeight: 700,
							letterSpacing: "-0.02em",
							lineHeight: 1.1,
							color: "var(--ds-ink)",
							overflowWrap: "anywhere"
						},
						children: e
					}),
					t && /* @__PURE__ */ _("p", {
						style: {
							margin: "var(--ds-2) 0 0",
							fontSize: "var(--ds-t-body)",
							color: "var(--ds-ink-2)",
							maxWidth: "68ch",
							lineHeight: 1.5
						},
						children: t
					}),
					r && /* @__PURE__ */ _("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: "var(--ds-2)",
							flexWrap: "wrap",
							marginTop: "var(--ds-3)",
							fontSize: "var(--ds-t-small)",
							color: "var(--ds-ink-3)",
							fontWeight: 600
						},
						children: r
					})
				]
			}), i && /* @__PURE__ */ _("div", {
				style: {
					display: "flex",
					gap: "var(--ds-2)",
					flexWrap: "wrap",
					flexShrink: 0,
					justifyContent: o ? "flex-start" : "flex-end"
				},
				children: i
			})]
		})]
	});
}
// src/primitivas/Segmentado.jsx
function ga({ opciones: e = [], valor: t, onCambio: n, etiqueta: r, tamano: i = "m", pleno: a = !1, estilo: o }) {
	let s = m([]), c = m(null), [l, u] = h(null), [d, p] = h(!1), g = Math.max(0, e.findIndex((e) => e.valor === t));
	f(() => {
		let e = () => {
			let e = s.current[g];
			e && u({
				izq: e.offsetLeft,
				ancho: e.offsetWidth
			});
		};
		if (e(), typeof ResizeObserver > "u" || !c.current) return;
		let t = new ResizeObserver(e);
		return t.observe(c.current), () => t.disconnect();
	}, [g, e.length]);
	let y = (t) => {
		let r = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : t.key === "ArrowLeft" || t.key === "ArrowUp" ? -1 : 0;
		if (!r || e.length === 0) return;
		t.preventDefault();
		let i = (g + r + e.length) % e.length;
		n?.(e[i].valor), s.current[i]?.focus();
	}, b = i === "s" ? 30 : 36;
	return /* @__PURE__ */ v("div", {
		ref: c,
		role: "radiogroup",
		"aria-label": r,
		onKeyDown: y,
		style: {
			position: "relative",
			display: a ? "flex" : "inline-flex",
			padding: 3,
			gap: 2,
			background: "var(--ds-surface-sunk)",
			border: "1px solid var(--ds-line)",
			borderRadius: 9,
			maxWidth: "100%",
			overflowX: "auto",
			...o
		},
		children: [l && /* @__PURE__ */ _("span", {
			"aria-hidden": !0,
			style: {
				position: "absolute",
				top: 3,
				bottom: 3,
				left: l.izq,
				width: l.ancho,
				background: "var(--ds-surface-solid)",
				borderRadius: 7,
				boxShadow: "0 3px 8px rgba(0,0,0,0.10), 0 1px 1px rgba(0,0,0,0.06)",
				border: "0.5px solid var(--ds-line)",
				scale: d ? "0.96" : "1",
				transition: "left var(--ds-t-state) var(--ds-ease), width var(--ds-t-state) var(--ds-ease), scale var(--ds-t-tap) var(--ds-ease)"
			}
		}), e.map((e, t) => {
			let r = t === g;
			return /* @__PURE__ */ v("button", {
				ref: (e) => {
					s.current[t] = e;
				},
				type: "button",
				role: "radio",
				"aria-checked": r,
				tabIndex: r ? 0 : -1,
				onClick: () => n?.(e.valor),
				onPointerDown: () => {
					r && p(!0);
				},
				onPointerUp: () => p(!1),
				onPointerLeave: () => p(!1),
				style: {
					position: "relative",
					zIndex: 1,
					flex: a ? 1 : "0 0 auto",
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 6,
					height: b,
					padding: i === "s" ? "0 12px" : "0 16px",
					border: "none",
					background: "transparent",
					cursor: "pointer",
					fontFamily: "var(--ds-font)",
					fontSize: i === "s" ? "var(--ds-t-micro)" : "var(--ds-t-small)",
					fontWeight: r ? 600 : 500,
					whiteSpace: "nowrap",
					borderRadius: 7,
					color: r ? "var(--ds-ink)" : "var(--ds-ink-2)",
					transition: "color var(--ds-t-state) var(--ds-ease)"
				},
				children: [e.icono, e.texto]
			}, e.valor);
		})]
	});
}
// src/primitivas/SelectorPaleta.jsx
function _a({ etiqueta: e = "Paleta de color", estilo: t }) {
	let { tema: n, paleta: r, paletas: i, fijarPaleta: a } = k(), o = m([]);
	if (!i.length) return null;
	let s = Math.max(0, i.findIndex((e) => e.id === r));
	return /* @__PURE__ */ _("div", {
		role: "radiogroup",
		"aria-label": e,
		onKeyDown: (e) => {
			let t = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
			if (!t) return;
			e.preventDefault();
			let n = (s + t + i.length) % i.length;
			a(i[n].id), o.current[n]?.focus();
		},
		style: {
			display: "grid",
			gap: "var(--ds-2)",
			gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
			...t
		},
		children: i.map((e, t) => {
			let r = t === s;
			return /* @__PURE__ */ v("button", {
				ref: (e) => {
					o.current[t] = e;
				},
				type: "button",
				role: "radio",
				"aria-checked": r,
				tabIndex: r ? 0 : -1,
				onClick: () => a(e.id),
				style: {
					display: "flex",
					alignItems: "center",
					gap: 10,
					minHeight: 44,
					padding: "0 14px",
					cursor: "pointer",
					fontFamily: "var(--ds-font)",
					fontSize: "var(--ds-t-small)",
					fontWeight: 600,
					borderRadius: "var(--ds-r-item)",
					textAlign: "left",
					color: r ? "var(--ds-ink)" : "var(--ds-ink-2)",
					background: r ? "var(--ds-surface-solid)" : "var(--ds-surface-sunk)",
					border: `1px solid ${r ? "var(--ds-accent-trazo)" : "var(--ds-line)"}`,
					boxShadow: r ? "var(--ds-lift-1)" : "none",
					transition: "border-color var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease)"
				},
				children: [/* @__PURE__ */ _("span", {
					"aria-hidden": !0,
					style: {
						width: 16,
						height: 16,
						borderRadius: "var(--ds-r-pill)",
						flex: "0 0 auto",
						background: e.muestra[n],
						boxShadow: "inset 0 0 0 1px var(--ds-line-firm)"
					}
				}), e.nombre]
			}, e.id);
		})
	});
}
// src/Apariencia.jsx
var va = [{
	valor: "light",
	texto: "Claro"
}, {
	valor: "dark",
	texto: "Oscuro"
}], ya = [
	{
		valor: "topbar",
		texto: "Arriba"
	},
	{
		valor: "sidebar",
		texto: "Lateral"
	},
	{
		valor: "dock",
		texto: "Dock"
	}
], ba = /* @__PURE__ */ v("svg", {
	width: "18",
	height: "18",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: [/* @__PURE__ */ _("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	}), /* @__PURE__ */ _("path", { d: "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" })]
});
function xa({ etiqueta: e, children: t }) {
	return /* @__PURE__ */ v("div", {
		style: {
			display: "grid",
			gap: "var(--ds-2)"
		},
		children: [/* @__PURE__ */ _("span", {
			style: {
				fontSize: "var(--ds-t-small)",
				fontWeight: 600,
				color: "var(--ds-ink-2)"
			},
			children: e
		}), t]
	});
}
function Sa({ abierto: e, onCerrar: t }) {
	let { tema: n, fijar: r, paletas: i } = k(), { preferencia: a, fijarModo: o, movil: s } = Bn(), c = a !== void 0 && !s;
	return /* @__PURE__ */ _(kn, {
		abierto: e,
		onCerrar: t,
		titulo: "Apariencia",
		nota: "Se aplica al momento y se recuerda en este navegador.",
		ancho: 480,
		acciones: /* @__PURE__ */ _(H, {
			variante: "solido",
			onClick: t,
			children: "Listo"
		}),
		children: /* @__PURE__ */ v("div", {
			style: {
				display: "grid",
				gap: "var(--ds-5)"
			},
			children: [
				/* @__PURE__ */ _(xa, {
					etiqueta: "Tema",
					children: /* @__PURE__ */ _(ga, {
						etiqueta: "Tema",
						opciones: va,
						valor: n,
						onCambio: r,
						pleno: !0
					})
				}),
				i.length > 0 && /* @__PURE__ */ _(xa, {
					etiqueta: "Paleta de color",
					children: /* @__PURE__ */ _(_a, {})
				}),
				c && /* @__PURE__ */ _(xa, {
					etiqueta: "Navegación",
					children: /* @__PURE__ */ _(ga, {
						etiqueta: "Navegación",
						opciones: ya,
						valor: a,
						onCambio: o,
						pleno: !0
					})
				})
			]
		})
	});
}
function Ca({ texto: e }) {
	let [t, n] = h(!1);
	return /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _(H, {
		variante: "fantasma",
		icono: ba,
		onClick: () => n(!0),
		"aria-label": e ? void 0 : "Apariencia",
		"aria-haspopup": "dialog",
		children: e
	}), /* @__PURE__ */ _(Sa, {
		abierto: t,
		onCerrar: () => n(!1)
	})] });
}
// src/Cuenta.jsx
var wa = /* @__PURE__ */ v("svg", {
	width: "17",
	height: "17",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.9",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: [/* @__PURE__ */ _("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), /* @__PURE__ */ _("path", { d: "M16 17l5-5-5-5M21 12H9" })]
});
function Ta({ icono: e, children: t, onClick: n, esperando: r }) {
	return /* @__PURE__ */ v("button", {
		type: "button",
		role: "menuitem",
		onClick: n,
		disabled: r,
		"aria-busy": r || void 0,
		className: "ds-menu-opcion",
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-3)",
			width: "100%",
			minHeight: 36,
			padding: "6px 10px",
			border: "none",
			borderRadius: 7,
			cursor: "pointer",
			background: "transparent",
			color: "var(--ds-ink)",
			textAlign: "left",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 500
		},
		children: [/* @__PURE__ */ _("span", {
			style: {
				display: "grid",
				placeItems: "center",
				width: 18,
				color: "var(--ds-ink-3)"
			},
			children: e
		}), /* @__PURE__ */ _("span", {
			style: { flex: 1 },
			children: t
		})]
	});
}
var Ea = () => /* @__PURE__ */ _("div", {
	role: "separator",
	style: {
		height: 1,
		background: "var(--ds-line-firm)",
		margin: "5px 10px"
	}
});
function Da({ nombre: e = "", correo: t, foto: n, opciones: r = [], onSalir: i, saliendo: a = !1, figura: o = !1 }) {
	let [s, c] = h(!1), [l, u] = h(!1), d = m(null), f = (e) => () => {
		c(!1), e?.();
	}, p = o && !n && e.trim() ? "" : e.split(" ").filter(Boolean).slice(0, 2).map((e) => e[0]).join("").toUpperCase();
	return /* @__PURE__ */ v(g, { children: [
		/* @__PURE__ */ _("button", {
			ref: d,
			type: "button",
			onClick: () => c((e) => !e),
			"aria-label": `Cuenta de ${e}${p ? ` · ${p}` : ""}`,
			"aria-haspopup": "menu",
			"aria-expanded": s,
			style: {
				display: "grid",
				placeItems: "center",
				width: 40,
				height: 40,
				padding: 0,
				flexShrink: 0,
				borderRadius: "var(--ds-r-pill)",
				border: "none",
				cursor: "pointer",
				background: "transparent",
				boxShadow: s ? "0 0 0 2px var(--ds-accent-trazo)" : "none",
				transition: "box-shadow var(--ds-t-state) var(--ds-ease)"
			},
			children: /* @__PURE__ */ _(dn, {
				src: n,
				nombre: e,
				tamano: 34,
				figura: o
			})
		}),
		/* @__PURE__ */ v(Nn, {
			ancla: d,
			abierto: s,
			onCerrar: () => c(!1),
			etiqueta: `Cuenta de ${e}`,
			minAncho: 250,
			children: [
				/* @__PURE__ */ v("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "var(--ds-3)",
						padding: "6px 10px 10px"
					},
					children: [/* @__PURE__ */ _(dn, {
						src: n,
						nombre: e,
						tamano: 40,
						figura: o
					}), /* @__PURE__ */ v("div", {
						style: { minWidth: 0 },
						children: [/* @__PURE__ */ _("div", {
							style: {
								fontWeight: 700,
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink)",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap"
							},
							children: e
						}), t && /* @__PURE__ */ _("div", {
							style: {
								fontSize: "var(--ds-t-micro)",
								color: "var(--ds-ink-2)",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap"
							},
							children: t
						})]
					})]
				}),
				/* @__PURE__ */ _(Ea, {}),
				r.map((e) => /* @__PURE__ */ _(Ta, {
					icono: e.icono,
					onClick: f(e.onClick),
					children: e.texto
				}, e.texto)),
				/* @__PURE__ */ _(Ta, {
					icono: ba,
					onClick: f(() => u(!0)),
					children: "Apariencia"
				}),
				i && /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _(Ea, {}), /* @__PURE__ */ _(Ta, {
					icono: a ? /* @__PURE__ */ _(ue, {}) : wa,
					esperando: a,
					onClick: () => i(),
					children: a ? "Cerrando sesión…" : "Cerrar sesión"
				})] })
			]
		}),
		/* @__PURE__ */ _(Sa, {
			abierto: l,
			onCerrar: () => u(!1)
		})
	] });
}
// src/Notificaciones.jsx
var Oa = /* @__PURE__ */ v("svg", {
	width: "19",
	height: "19",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.9",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: [/* @__PURE__ */ _("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" }), /* @__PURE__ */ _("path", { d: "M13.7 21a2 2 0 0 1-3.4 0" })]
}), ka = {
	ok: "var(--ds-ok)",
	warn: "var(--ds-warn)",
	risk: "var(--ds-risk)",
	info: "var(--ds-accent-trazo)"
};
function Aa({ a: e, onAbrir: t }) {
	let n = !e.leido;
	return /* @__PURE__ */ v("button", {
		type: "button",
		onClick: () => t?.(e),
		style: {
			display: "flex",
			gap: "var(--ds-3)",
			width: "100%",
			padding: "10px",
			textAlign: "left",
			border: "none",
			borderRadius: "var(--ds-r-item)",
			cursor: "pointer",
			background: n ? "var(--ds-surface-2)" : "transparent",
			fontFamily: "var(--ds-font)"
		},
		onMouseEnter: (e) => {
			e.currentTarget.style.background = "var(--ds-surface-solid)";
		},
		onMouseLeave: (e) => {
			e.currentTarget.style.background = n ? "var(--ds-surface-2)" : "transparent";
		},
		children: [/* @__PURE__ */ _("span", {
			"aria-hidden": !0,
			style: {
				width: 8,
				height: 8,
				marginTop: 6,
				flexShrink: 0,
				borderRadius: "var(--ds-r-pill)",
				background: n ? ka[e.tono] || ka.info : "transparent"
			}
		}), /* @__PURE__ */ v("span", {
			style: {
				flex: 1,
				minWidth: 0
			},
			children: [
				n && /* @__PURE__ */ _("span", {
					style: {
						position: "absolute",
						width: 1,
						height: 1,
						overflow: "hidden",
						clip: "rect(0 0 0 0)"
					},
					children: "Sin leer: "
				}),
				/* @__PURE__ */ _("span", {
					style: {
						display: "block",
						fontSize: "var(--ds-t-small)",
						fontWeight: n ? 800 : 600,
						color: "var(--ds-ink)"
					},
					children: e.titulo
				}),
				e.texto && /* @__PURE__ */ _("span", {
					style: {
						display: "block",
						fontSize: "var(--ds-t-small)",
						color: "var(--ds-ink-2)",
						marginTop: 2
					},
					children: e.texto
				}),
				e.fecha && /* @__PURE__ */ _("span", {
					className: "ds-num",
					style: {
						display: "block",
						fontSize: "var(--ds-t-micro)",
						color: "var(--ds-ink-2)",
						marginTop: 4
					},
					children: li(e.fecha)
				})
			]
		})]
	});
}
function ja({ avisos: e, onAbrir: t, onMarcarTodas: n, onVerTodas: r, sinLeer: i }) {
	return /* @__PURE__ */ v("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 2
		},
		children: [e.length === 0 ? /* @__PURE__ */ _("p", {
			style: {
				margin: 0,
				padding: "var(--ds-6) var(--ds-3)",
				textAlign: "center",
				fontSize: "var(--ds-t-small)",
				color: "var(--ds-ink-2)"
			},
			children: "No tienes notificaciones. Aquí aparecerá lo que necesite tu atención."
		}) : e.map((e) => /* @__PURE__ */ _(Aa, {
			a: e,
			onAbrir: t
		}, e.id)), (r || n && i > 0) && /* @__PURE__ */ v("div", {
			style: {
				display: "flex",
				justifyContent: "space-between",
				gap: "var(--ds-2)",
				borderTop: "1px solid var(--ds-line)",
				marginTop: 4,
				paddingTop: 6
			},
			children: [n && i > 0 ? /* @__PURE__ */ _(Ma, {
				onClick: n,
				children: "Marcar todas como leídas"
			}) : /* @__PURE__ */ _("span", {}), r && /* @__PURE__ */ _(Ma, {
				onClick: r,
				children: "Ver todas"
			})]
		})]
	});
}
function Ma({ children: e, onClick: t }) {
	return /* @__PURE__ */ _("button", {
		type: "button",
		onClick: t,
		style: {
			border: "none",
			background: "transparent",
			cursor: "pointer",
			padding: "8px 10px",
			borderRadius: "var(--ds-r-item)",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 600,
			color: "var(--ds-accent-tinta)"
		},
		children: e
	});
}
function Na({ avisos: e = [], onAbrir: t, onMarcarTodas: n, onVerTodas: r }) {
	let [i, a] = h(!1), o = m(null), s = G(), c = e.filter((e) => !e.leido).length, l = () => a(!1), u = /* @__PURE__ */ _(ja, {
		avisos: e,
		sinLeer: c,
		onAbrir: t && ((e) => {
			l(), t(e);
		}),
		onMarcarTodas: n,
		onVerTodas: r && (() => {
			l(), r();
		})
	});
	return /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ v("button", {
		ref: o,
		type: "button",
		onClick: () => a((e) => !e),
		"aria-label": c ? `Notificaciones, ${c} sin leer` : "Notificaciones",
		"aria-haspopup": "dialog",
		"aria-expanded": i,
		style: {
			position: "relative",
			display: "grid",
			placeItems: "center",
			width: 40,
			height: 40,
			flexShrink: 0,
			border: "none",
			borderRadius: "var(--ds-r-pill)",
			cursor: "pointer",
			background: i ? "var(--ds-surface-solid)" : "transparent",
			color: "var(--ds-ink-2)"
		},
		children: [Oa, c > 0 && /* @__PURE__ */ _("span", {
			className: "ds-num",
			"aria-hidden": !0,
			style: {
				position: "absolute",
				top: 3,
				right: 1,
				minWidth: 18,
				height: 18,
				padding: "0 5px",
				boxSizing: "border-box",
				borderRadius: "var(--ds-r-pill)",
				background: "var(--ds-risk)",
				color: "var(--ds-surface-solid)",
				fontSize: "0.66rem",
				fontWeight: 700,
				lineHeight: "18px",
				textAlign: "center",
				boxShadow: "0 0 0 2px var(--ds-surface-solid)"
			},
			children: c > 99 ? "99+" : c
		})]
	}), s ? /* @__PURE__ */ _(kn, {
		abierto: i,
		onCerrar: l,
		titulo: "Notificaciones",
		children: u
	}) : /* @__PURE__ */ v(Nn, {
		ancla: o,
		abierto: i,
		onCerrar: l,
		rol: "dialog",
		etiqueta: "Notificaciones",
		minAncho: 360,
		estilo: { width: 380 },
		children: [/* @__PURE__ */ _("div", {
			style: {
				padding: "4px 10px 8px",
				fontWeight: 700,
				fontSize: "var(--ds-t-body)",
				color: "var(--ds-ink)"
			},
			children: "Notificaciones"
		}), u]
	})] });
}
// src/marca/Zentrya.jsx
var Pa = "#00E5FF";
function Fa({ tamano: e = 28 }) {
	return /* @__PURE__ */ v("svg", {
		width: e,
		height: e,
		viewBox: "20 40 80 80",
		"aria-hidden": !0,
		focusable: "false",
		style: {
			display: "block",
			flexShrink: 0
		},
		children: [
			/* @__PURE__ */ _("rect", {
				x: "20",
				y: "40",
				width: "80",
				height: "80",
				rx: "16",
				fill: "var(--ds-ink)"
			}),
			/* @__PURE__ */ _("path", {
				d: "M 42 68 L 78 68 L 42 96 L 78 96",
				fill: "none",
				stroke: "var(--ds-surface-solid)",
				strokeWidth: "5",
				strokeLinecap: "square"
			}),
			/* @__PURE__ */ _("circle", {
				cx: "78",
				cy: "96",
				r: "3",
				fill: Pa
			})
		]
	});
}
// src/PantallaAcceso.jsx
var Ia = "\n/* La Z. Las rutas llevan pathLength=\"100\": el guion se mide en por ciento del\n   trazo. La luz (14 de largo) va justo en la punta de la línea central porque\n   comparten duración, curva y retraso; las demás líneas salen un poco después\n   según qué tan lejos están del centro. */\n@keyframes ds-z-traza { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }\n@keyframes ds-z-luz {\n  0%   { stroke-dashoffset: 14; opacity: 1; }\n  80%  { opacity: 1; }\n  100% { stroke-dashoffset: -86; opacity: 0; }\n}\n@keyframes ds-z-punto { from { transform: scale(0); } 60% { transform: scale(1.35); } to { transform: scale(1); } }\n@keyframes ds-z-onda { from { transform: scale(1); opacity: 0.9; } to { transform: scale(4.5); opacity: 0; } }\n.ds-z-traza { stroke-dasharray: 100; animation: ds-z-traza 1500ms var(--ds-ease) 250ms both; }\n.ds-z-luz { stroke-dasharray: 14 200; animation: ds-z-luz 1500ms var(--ds-ease) 250ms both; }\n.ds-z-punto, .ds-z-onda { transform-box: fill-box; transform-origin: center; }\n.ds-z-punto { animation: ds-z-punto 460ms var(--ds-ease-out) 1450ms both; }\n.ds-z-onda { animation: ds-z-onda 820ms var(--ds-ease-out) 1520ms both; }\n.ds-z-capa { transition: transform 900ms var(--ds-ease); }\n@keyframes ds-sacude-a { 0%, 100% { translate: 0 0; } 20% { translate: -8px 0; } 40% { translate: 7px 0; } 60% { translate: -5px 0; } 80% { translate: 3px 0; } }\n@keyframes ds-sacude-b { 0%, 100% { translate: 0 0; } 20% { translate: -8px 0; } 40% { translate: 7px 0; } 60% { translate: -5px 0; } 80% { translate: 3px 0; } }\n.ds-acceso-columna > * { animation: ds-rise var(--ds-t-scene) var(--ds-ease) both; }\n.ds-acceso-columna > *:nth-child(2) { animation-delay: 90ms; }\n.ds-acceso-columna > *:nth-child(3) { animation-delay: 160ms; }\n.ds-acceso-columna > *:nth-child(n+4) { animation-delay: 230ms; }\n@media (prefers-reduced-motion: reduce) {\n  /* La regla global ya las lleva a su final; sin retraso, la Z aparece dibujada de una vez. */\n  .ds-z-traza, .ds-z-luz, .ds-z-punto, .ds-z-onda, .ds-acceso-columna > * { animation-delay: 0ms !important; }\n}\n", La = "var(--ds-font)", Ra = [
	[42, 68],
	[78, 68],
	[42, 96],
	[78, 96]
], za = "39.5 65.5 41 33";
function Ba(e) {
	let t = ([e, t]) => {
		let n = t[0] - e[0], r = t[1] - e[1], i = Math.hypot(n, r);
		return [-r / i, n / i];
	}, n = Ra.slice(1).map((n, r) => {
		let i = Ra[r], [a, o] = t([i, n]);
		return [[i[0] + a * e, i[1] + o * e], [n[0] + a * e, n[1] + o * e]];
	}), r = ([e, t], [n, r]) => {
		let i = (e[0] - t[0]) * (n[1] - r[1]) - (e[1] - t[1]) * (n[0] - r[0]), a = ((e[0] - n[0]) * (n[1] - r[1]) - (e[1] - n[1]) * (n[0] - r[0])) / i;
		return [e[0] + a * (t[0] - e[0]), e[1] + a * (t[1] - e[1])];
	};
	return "M " + [
		n[0][0],
		...n.slice(1).map((e, t) => r(n[t], e)),
		n[n.length - 1][1]
	].map(([e, t]) => `${e.toFixed(2)} ${t.toFixed(2)}`).join(" L ");
}
var Va = [
	-2.25,
	-1.5,
	-.75,
	0,
	.75,
	1.5,
	2.25
].map((e) => ({
	d: e,
	ruta: Ba(e)
}));
function Ha({ color: e }) {
	return /* @__PURE__ */ v("svg", {
		"aria-hidden": !0,
		focusable: "false",
		viewBox: za,
		preserveAspectRatio: "xMaxYMax meet",
		style: {
			display: "block",
			width: "100%",
			height: "100%",
			overflow: "visible"
		},
		children: [
			Va.map(({ d: t, ruta: n }) => /* @__PURE__ */ _("path", {
				className: "ds-z-traza",
				d: n,
				pathLength: "100",
				fill: "none",
				stroke: e,
				strokeOpacity: t === 0 ? .55 : .3,
				strokeWidth: "0.08",
				strokeLinejoin: "miter",
				style: { animationDelay: `${250 + Math.abs(t) * 80}ms` }
			}, t)),
			/* @__PURE__ */ _("path", {
				className: "ds-z-luz",
				d: Va[3].ruta,
				pathLength: "100",
				fill: "none",
				stroke: e,
				strokeWidth: "0.2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ _("circle", {
				className: "ds-z-onda",
				cx: "78",
				cy: "96",
				r: "1.1",
				fill: "none",
				stroke: Pa,
				strokeWidth: "1.5",
				vectorEffect: "non-scaling-stroke"
			}),
			/* @__PURE__ */ _("circle", {
				className: "ds-z-punto",
				cx: "78",
				cy: "96",
				r: "1.1",
				fill: Pa
			})
		]
	});
}
function Ua({ tamano: e }) {
	let t = "M " + Ra.map((e) => e.join(" ")).join(" L ");
	return /* @__PURE__ */ v("svg", {
		"aria-hidden": !0,
		focusable: "false",
		width: e,
		height: e,
		viewBox: "20 40 80 80",
		style: {
			display: "block",
			overflow: "visible"
		},
		children: [
			/* @__PURE__ */ _("rect", {
				x: "20",
				y: "40",
				width: "80",
				height: "80",
				rx: "18",
				fill: "var(--ds-ink)"
			}),
			/* @__PURE__ */ _("path", {
				className: "ds-z-traza",
				d: t,
				pathLength: "100",
				fill: "none",
				stroke: "var(--ds-surface-solid)",
				strokeWidth: "5",
				strokeLinecap: "square",
				strokeLinejoin: "miter"
			}),
			/* @__PURE__ */ _("circle", {
				className: "ds-z-onda",
				cx: "78",
				cy: "96",
				r: "3",
				fill: "none",
				stroke: Pa,
				strokeWidth: "1.5",
				vectorEffect: "non-scaling-stroke"
			}),
			/* @__PURE__ */ _("circle", {
				className: "ds-z-punto",
				cx: "78",
				cy: "96",
				r: "3",
				fill: Pa
			})
		]
	});
}
function Wa({ titulo: e, cifra: t, detalle: n, children: r, ancho: i = 260 }) {
	return /* @__PURE__ */ v(P, {
		estilo: {
			width: i,
			maxWidth: "100%",
			boxSizing: "border-box",
			padding: "var(--ds-4)",
			boxShadow: "0 18px 40px -18px rgba(0,0,0,0.45)"
		},
		children: [
			e && /* @__PURE__ */ _("div", {
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					letterSpacing: "0.04em",
					textTransform: "uppercase",
					opacity: .85
				},
				children: e
			}),
			t && /* @__PURE__ */ _("div", {
				className: "ds-num",
				style: {
					fontSize: "var(--ds-t-title)",
					fontWeight: 700,
					letterSpacing: "-0.02em",
					marginTop: 4
				},
				children: t
			}),
			n && /* @__PURE__ */ _("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					marginTop: 2
				},
				children: n
			}),
			r
		]
	});
}
function Ga({ marca: e, lema: t, titulo: n, nota: r, error: i, children: a, pie: o }) {
	let s = G(), c = m(null), [l, d] = h(0);
	return u(() => {
		i && d((e) => e + 1);
	}, [i]), /* @__PURE__ */ v("main", {
		onPointerMove: s ? void 0 : (e) => {
			if (!c.current || e.pointerType !== "mouse" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
			let t = e.clientX / window.innerWidth - .5, n = e.clientY / window.innerHeight - .5;
			c.current.style.transform = `translate3d(${(-t * 22).toFixed(1)}px, ${(-n * 16).toFixed(1)}px, 0)`;
		},
		style: {
			position: "relative",
			isolation: "isolate",
			overflow: "hidden",
			minHeight: "100dvh",
			boxSizing: "border-box",
			display: "grid",
			gridTemplateRows: "auto 1fr auto",
			fontFamily: La,
			color: "var(--ds-ink)"
		},
		children: [
			/* @__PURE__ */ _("style", { children: Ia }),
			!s && /* @__PURE__ */ _("div", {
				ref: c,
				"aria-hidden": !0,
				className: "ds-z-capa",
				style: {
					position: "absolute",
					zIndex: -1,
					pointerEvents: "none",
					top: "16%",
					bottom: "9%",
					left: "-6%",
					right: "calc(50% + 256px)"
				},
				children: /* @__PURE__ */ _(Ha, { color: "var(--ds-accent-trazo)" })
			}),
			/* @__PURE__ */ _("header", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 10,
					padding: s ? "18px 20px" : "24px 32px",
					fontSize: 15,
					fontWeight: 600,
					letterSpacing: "-0.01em"
				},
				children: e
			}),
			/* @__PURE__ */ _("div", {
				style: {
					display: "grid",
					placeItems: s ? "start center" : "center",
					padding: s ? "12px 20px 32px" : "24px 32px 48px"
				},
				children: /* @__PURE__ */ v("div", {
					className: "ds-acceso-columna",
					style: {
						width: "100%",
						maxWidth: 380,
						display: "grid",
						justifyItems: "center",
						textAlign: "center"
					},
					children: [
						/* @__PURE__ */ _(Ua, { tamano: s ? 56 : 64 }),
						/* @__PURE__ */ _("h1", {
							style: {
								margin: s ? "22px 0 0" : "28px 0 0",
								fontSize: s ? 28 : 34,
								lineHeight: 1.12,
								fontWeight: 600,
								letterSpacing: "-0.015em",
								textWrap: "balance"
							},
							children: n
						}),
						(r || t) && /* @__PURE__ */ _("p", {
							style: {
								margin: "10px 0 0",
								fontSize: 17,
								lineHeight: 1.45,
								color: "var(--ds-ink-2)",
								textWrap: "pretty",
								maxWidth: 360
							},
							children: r || t
						}),
						/* @__PURE__ */ _("div", {
							style: {
								width: "100%",
								marginTop: s ? 28 : 36,
								textAlign: "left",
								animation: l ? `${l % 2 ? "ds-sacude-a" : "ds-sacude-b"} 420ms var(--ds-ease-out)` : void 0
							},
							children: a
						})
					]
				})
			}),
			o && /* @__PURE__ */ _("footer", {
				style: {
					padding: s ? "16px 20px 24px" : "20px 32px 28px",
					textAlign: "center",
					fontSize: 13,
					color: "var(--ds-ink-2)"
				},
				children: o
			})
		]
	});
}
// src/EntradaCuenta.jsx
var Ka = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, qa = "\n.ds-entrada-fila { position: relative; background: var(--ds-surface-solid);\n  border: 1px solid var(--ds-ink-3); transition: border-color var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease); }\n.ds-entrada-fila:focus-within { z-index: 1; border-color: var(--ds-accent-trazo);\n  box-shadow: 0 0 0 1px var(--ds-accent-trazo), 0 0 0 5px var(--ds-accent-ring); }\n.ds-entrada-fila[data-error=\"si\"] { border-color: var(--ds-risk); }\n.ds-entrada-fila[data-error=\"si\"]:focus-within { border-color: var(--ds-risk);\n  box-shadow: 0 0 0 1px var(--ds-risk), 0 0 0 5px color-mix(in srgb, var(--ds-risk) 22%, transparent); }\n.ds-entrada-fila input { display: block; width: 100%; box-sizing: border-box; height: 56px; margin: 0;\n  padding: 22px 56px 6px 16px; border: 0; outline: 0; background: transparent;\n  font-family: inherit; font-size: 17px; font-weight: 400; line-height: 1.2; color: var(--ds-ink); letter-spacing: -0.01em; }\n.ds-entrada-fila input::placeholder { color: transparent; }\n.ds-entrada-fila label { position: absolute; left: 17px; top: 50%; transform: translateY(-50%);\n  font-size: 17px; color: var(--ds-ink-3); pointer-events: none; transform-origin: left center;\n  transition: top var(--ds-t-move) var(--ds-ease), transform var(--ds-t-move) var(--ds-ease), font-size var(--ds-t-move) var(--ds-ease); }\n.ds-entrada-fila input:focus + label, .ds-entrada-fila input:not(:placeholder-shown) + label {\n  top: 9px; transform: none; font-size: 12px; }\n.ds-entrada-flecha { position: absolute; right: 12px; top: 50%; translate: 0 -50%;\n  display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border-radius: 50%;\n  border: 1.5px solid var(--ds-ink-3); background: transparent; color: var(--ds-ink-3); cursor: pointer;\n  transition: color var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease); }\n.ds-entrada-flecha[data-listo=\"si\"] { border-color: var(--ds-ink); color: var(--ds-ink); }\n.ds-entrada-flecha[data-listo=\"si\"]:hover { background: var(--ds-ink); color: var(--ds-surface-solid); }\n.ds-entrada-flecha:disabled { cursor: default; }\n.ds-entrada-pliegue { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 420ms var(--ds-ease); }\n.ds-entrada-pliegue[data-abierto=\"si\"] { grid-template-rows: 1fr; }\n/* Recorta sólo mientras se despliega: abierto, el anillo de foco y el borde de error salen del campo. */\n.ds-entrada-pliegue > div { overflow: hidden; }\n.ds-entrada-pliegue[data-listo=\"si\"] > div { overflow: visible; }\n.ds-entrada-recordar { display: inline-flex; align-items: center; gap: 10px; font-size: 15px; color: var(--ds-ink-2); cursor: pointer; }\n.ds-entrada-recordar input { width: 18px; height: 18px; margin: 0; accent-color: var(--ds-accent); }\n", Ja = /* @__PURE__ */ _("svg", {
	width: "15",
	height: "15",
	viewBox: "0 0 16 16",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.9",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: /* @__PURE__ */ _("path", { d: "M2.5 8h11M9 3.5 13.5 8 9 12.5" })
});
function Ya({ texto: e, listo: t, esperando: n }) {
	return /* @__PURE__ */ _("button", {
		type: "submit",
		className: "ds-entrada-flecha",
		"aria-label": e,
		"data-listo": t ? "si" : void 0,
		disabled: n,
		"aria-busy": n || void 0,
		children: n ? /* @__PURE__ */ _(ue, {}) : Ja
	});
}
function Xa({ onEntrar: e, esperando: t = !1, error: n, recordar: r = !1, enlaces: i, correoInicial: a = "", etiquetaCorreo: o = "Correo", etiquetaClave: s = "Contraseña" }) {
	let c = d(), [l, f] = h(a ? 2 : 1), [p, g] = h(a), [y, b] = h(""), [x, S] = h(!1), [C, w] = h(null), [T, E] = h(!!a), D = m(null), O = m(null);
	u(() => {
		if (l !== 2 || T) return;
		let e = setTimeout(() => E(!0), 480);
		return () => clearTimeout(e);
	}, [l, T]);
	let k = m(t);
	u(() => {
		let e = k.current && !t;
		k.current = t, !(!n || !e && t) && (b(""), O.current?.focus());
	}, [n, t]);
	let A = () => {
		Ka.test(p.trim()) ? (w(null), f(2), requestAnimationFrame(() => O.current?.focus())) : (w("Escribe un correo válido, por ejemplo nombre@empresa.com."), D.current?.focus());
	}, j = (n) => {
		if (n.preventDefault(), !t) {
			if (l === 1 || !Ka.test(p.trim())) return A();
			y ? (w(null), e?.({
				correo: p.trim(),
				clave: y,
				recordar: x
			})) : (w("Escribe tu contraseña."), O.current?.focus());
		}
	}, M = C || n, ee = `${c}-mensaje`, N = l === 2;
	return /* @__PURE__ */ v("form", {
		noValidate: !0,
		onSubmit: j,
		style: {
			display: "grid",
			gap: 20
		},
		children: [
			/* @__PURE__ */ _("style", { children: qa }),
			/* @__PURE__ */ v("div", { children: [
				/* @__PURE__ */ v("div", {
					className: "ds-entrada-fila",
					"data-error": M && !N ? "si" : void 0,
					style: { borderRadius: N ? "12px 12px 0 0" : 12 },
					children: [
						/* @__PURE__ */ _("input", {
							ref: D,
							id: `${c}-correo`,
							type: "email",
							name: "email",
							autoComplete: "username",
							inputMode: "email",
							autoCapitalize: "none",
							spellCheck: !1,
							placeholder: " ",
							value: p,
							"aria-invalid": C && !N ? !0 : void 0,
							"aria-describedby": M ? ee : void 0,
							onChange: (e) => {
								g(e.target.value), C && w(null);
							}
						}),
						/* @__PURE__ */ _("label", {
							htmlFor: `${c}-correo`,
							children: o
						}),
						!N && /* @__PURE__ */ _(Ya, {
							texto: "Continuar",
							listo: Ka.test(p.trim())
						})
					]
				}),
				/* @__PURE__ */ _("div", {
					className: "ds-entrada-pliegue",
					"data-abierto": N ? "si" : void 0,
					"data-listo": N && T ? "si" : void 0,
					onTransitionEnd: (e) => {
						e.target === e.currentTarget && N && E(!0);
					},
					children: /* @__PURE__ */ _("div", {
						inert: !N || void 0,
						children: /* @__PURE__ */ v("div", {
							className: "ds-entrada-fila",
							"data-error": M && N ? "si" : void 0,
							style: {
								borderRadius: "0 0 12px 12px",
								marginTop: -1
							},
							children: [
								/* @__PURE__ */ _("input", {
									ref: O,
									id: `${c}-clave`,
									type: "password",
									name: "password",
									autoComplete: "current-password",
									placeholder: " ",
									value: y,
									"aria-invalid": M && N ? !0 : void 0,
									"aria-describedby": M ? ee : void 0,
									onChange: (e) => {
										b(e.target.value), C && w(null), !N && e.target.value && f(2);
									}
								}),
								/* @__PURE__ */ _("label", {
									htmlFor: `${c}-clave`,
									children: s
								}),
								N && /* @__PURE__ */ _(Ya, {
									texto: "Entrar",
									listo: !!y,
									esperando: t
								})
							]
						})
					})
				}),
				M && /* @__PURE__ */ _("p", {
					id: ee,
					role: "alert",
					style: {
						margin: "12px 2px 0",
						fontSize: 14,
						lineHeight: 1.4,
						color: "var(--ds-risk)"
					},
					children: M
				})
			] }),
			r && /* @__PURE__ */ v("label", {
				className: "ds-entrada-recordar",
				style: { justifySelf: "center" },
				children: [/* @__PURE__ */ _("input", {
					type: "checkbox",
					checked: x,
					onChange: (e) => S(e.target.checked)
				}), "Mantener la sesión iniciada"]
			}),
			i && /* @__PURE__ */ _("div", {
				style: {
					display: "grid",
					justifyItems: "center",
					gap: 8,
					fontSize: 15
				},
				children: i
			})
		]
	});
}
// src/primitivas/CampoClave.jsx
var Za = /* @__PURE__ */ v("svg", {
	width: "18",
	height: "18",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.9",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: [/* @__PURE__ */ _("path", { d: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" }), /* @__PURE__ */ _("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})]
}), Qa = /* @__PURE__ */ v("svg", {
	width: "18",
	height: "18",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.9",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: [/* @__PURE__ */ _("path", { d: "M10.6 5.1A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-2.6 3.5M6.1 6.1A17.4 17.4 0 0 0 2 12s3.6 7 10 7a10 10 0 0 0 5.9-1.9" }), /* @__PURE__ */ _("path", { d: "M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" })]
});
function $a({ ayuda: e, ...t }) {
	let n = d(), [i, a] = h(!1), [o, s] = h(!1), c = (e) => s(!!e.getModifierState?.("CapsLock"));
	return /* @__PURE__ */ _(r, {
		...t,
		id: n,
		tipo: i ? "text" : "password",
		autoCapitalize: "off",
		autoCorrect: "off",
		spellCheck: !1,
		onKeyDown: c,
		onKeyUp: c,
		ayuda: o ? /* @__PURE__ */ _("span", {
			"aria-live": "polite",
			children: "Bloq Mayús está activado."
		}) : e,
		adorno: /* @__PURE__ */ _("button", {
			type: "button",
			onClick: () => a((e) => !e),
			"aria-controls": n,
			"aria-pressed": i,
			"aria-label": i ? "Ocultar contraseña" : "Mostrar contraseña",
			style: {
				display: "grid",
				placeItems: "center",
				width: 38,
				height: 34,
				border: "none",
				borderRadius: "var(--ds-r-item)",
				background: "transparent",
				cursor: "pointer",
				color: "var(--ds-ink-3)"
			},
			children: i ? Qa : Za
		})
	});
}
// src/Cuenta/PantallaCuenta.jsx
function eo({ usuario: e, accion: t, angosto: n, figura: r }) {
	return /* @__PURE__ */ v("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			alignItems: n ? "center" : "flex-start",
			textAlign: n ? "center" : "left",
			gap: 2,
			padding: n ? "var(--ds-2) 0 var(--ds-4)" : "0 8px var(--ds-5)"
		},
		children: [
			/* @__PURE__ */ _("div", {
				style: {
					marginBottom: "var(--ds-3)",
					lineHeight: 0
				},
				children: /* @__PURE__ */ _(dn, {
					src: e.foto,
					nombre: e.nombre,
					tamano: n ? 76 : 64,
					figura: r
				})
			}),
			/* @__PURE__ */ _("div", {
				style: {
					fontSize: n ? "var(--ds-t-title)" : "1.0625rem",
					fontWeight: 700,
					letterSpacing: "-0.015em",
					overflowWrap: "anywhere"
				},
				children: e.nombre
			}),
			/* @__PURE__ */ _("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					color: "var(--ds-ink-2)",
					overflowWrap: "anywhere"
				},
				children: e.correo
			}),
			e.detalle && /* @__PURE__ */ _("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					color: "var(--ds-ink-2)"
				},
				children: e.detalle
			}),
			t && /* @__PURE__ */ _("div", {
				style: { marginTop: "var(--ds-3)" },
				children: t
			})
		]
	});
}
function to({ s: e, esta: t, onIr: n, angosto: r }) {
	let i = e.peligro;
	return r ? /* @__PURE__ */ v("button", {
		type: "button",
		onClick: () => n?.(e),
		"aria-current": t ? "page" : void 0,
		style: {
			display: "flex",
			alignItems: "center",
			gap: 7,
			flexShrink: 0,
			minHeight: 36,
			padding: "0 14px",
			border: "none",
			borderRadius: "var(--ds-r-pill)",
			cursor: "pointer",
			whiteSpace: "nowrap",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 600,
			background: t ? "var(--ds-ink)" : "var(--ds-surface-2)",
			color: t ? "var(--ds-surface-solid)" : i ? "var(--ds-risk)" : "var(--ds-ink)"
		},
		children: [e.icono && /* @__PURE__ */ _("span", {
			style: { lineHeight: 0 },
			children: e.icono
		}), e.texto]
	}) : /* @__PURE__ */ v("button", {
		type: "button",
		onClick: () => n?.(e),
		"aria-current": t ? "page" : void 0,
		style: {
			display: "flex",
			alignItems: "center",
			gap: 11,
			width: "100%",
			textAlign: "left",
			minHeight: 38,
			padding: "0 10px",
			border: "none",
			borderRadius: 9,
			cursor: "pointer",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-body)",
			fontWeight: t ? 600 : 500,
			background: t ? "var(--ds-surface-2)" : "transparent",
			color: i ? "var(--ds-risk)" : "var(--ds-ink)",
			transition: "background var(--ds-t-tap) var(--ds-ease)"
		},
		onMouseEnter: (e) => {
			t || (e.currentTarget.style.background = "var(--ds-surface-2)");
		},
		onMouseLeave: (e) => {
			t || (e.currentTarget.style.background = "transparent");
		},
		children: [e.icono && /* @__PURE__ */ _("span", {
			"aria-hidden": !0,
			style: {
				display: "grid",
				placeItems: "center",
				width: 20,
				lineHeight: 0,
				flexShrink: 0,
				color: i ? "inherit" : t ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)"
			},
			children: e.icono
		}), e.texto]
	});
}
function no({ usuario: e, accion: t, secciones: n = [], activa: r, onIr: i, figura: a = !1, children: o }) {
	let s = G(), c = n.find((e) => e.id === r), l = /* @__PURE__ */ _("nav", {
		"aria-label": "Secciones de la cuenta",
		style: {
			display: "flex",
			flexDirection: s ? "row" : "column",
			gap: s ? 6 : 2,
			overflowX: s ? "auto" : "visible",
			paddingBottom: s ? 4 : 0
		},
		children: n.map((e) => /* @__PURE__ */ _(to, {
			s: e,
			esta: e.id === r,
			onIr: i,
			angosto: s
		}, e.id))
	});
	return /* @__PURE__ */ v("div", {
		style: {
			display: "grid",
			gap: s ? "var(--ds-4)" : "var(--ds-10)",
			alignItems: "start",
			gridTemplateColumns: s ? "minmax(0, 1fr)" : "232px minmax(0, 1fr)"
		},
		children: [/* @__PURE__ */ v("aside", {
			style: s ? void 0 : {
				position: "sticky",
				top: "var(--ds-reserva-arriba, var(--ds-6))"
			},
			children: [/* @__PURE__ */ _(eo, {
				usuario: e,
				accion: t,
				angosto: s,
				figura: a
			}), l]
		}), /* @__PURE__ */ v("div", {
			style: {
				display: "grid",
				gap: "var(--ds-6)",
				minWidth: 0,
				maxWidth: 760
			},
			children: [c && /* @__PURE__ */ _("h1", {
				style: {
					margin: s ? "var(--ds-2) 0 0" : 0,
					fontSize: s ? "var(--ds-t-title)" : "var(--ds-num-m)",
					fontWeight: 700,
					letterSpacing: "-0.02em",
					lineHeight: 1.15
				},
				children: c.texto
			}), o]
		})]
	});
}
// src/Cuenta/Ajustes.jsx
var ro = /* @__PURE__ */ _("svg", {
	width: "8",
	height: "13",
	viewBox: "0 0 8 13",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: /* @__PURE__ */ _("path", { d: "M1.5 1.5 6.5 6.5 1.5 11.5" })
});
function io({ id: e, titulo: t, descripcion: n, estado: r, children: i, pie: a }) {
	return /* @__PURE__ */ v("section", {
		id: e,
		"aria-labelledby": e ? `${e}-titulo` : void 0,
		children: [
			/* @__PURE__ */ v("header", {
				style: {
					display: "flex",
					alignItems: "flex-end",
					gap: "var(--ds-3)",
					padding: "0 var(--ds-4) 7px"
				},
				children: [/* @__PURE__ */ _("h2", {
					id: e ? `${e}-titulo` : void 0,
					style: {
						flex: 1,
						minWidth: 0,
						margin: 0,
						fontSize: "var(--ds-t-small)",
						fontWeight: 600,
						color: "var(--ds-ink-2)"
					},
					children: t
				}), r]
			}),
			/* @__PURE__ */ v("div", {
				style: {
					background: "var(--ds-surface-solid)",
					border: "1px solid var(--ds-line)",
					borderRadius: 12,
					boxShadow: "var(--ds-lift-1)",
					padding: "0 var(--ds-4)"
				},
				children: [i, a && /* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						justifyContent: "flex-end",
						gap: "var(--ds-2)",
						flexWrap: "wrap",
						borderTop: "1px solid var(--ds-line)",
						padding: "var(--ds-3) 0"
					},
					children: a
				})]
			}),
			n && /* @__PURE__ */ _("p", {
				style: {
					margin: "7px var(--ds-4) 0",
					fontSize: "var(--ds-t-small)",
					lineHeight: 1.45,
					color: "var(--ds-ink-2)"
				},
				children: n
			})
		]
	});
}
function ao({ children: e, color: t }) {
	return /* @__PURE__ */ _("span", {
		"aria-hidden": !0,
		style: {
			display: "grid",
			placeItems: "center",
			flexShrink: 0,
			width: 22,
			lineHeight: 0,
			color: t || "var(--ds-ink-2)"
		},
		children: e
	});
}
function oo({ titulo: e, descripcion: t, children: n, primera: r = !1, icono: i, color: a, onClick: o, valor: s }) {
	let c = G(), l = !!o, u = /* @__PURE__ */ v("div", {
		style: { minWidth: 0 },
		children: [/* @__PURE__ */ _("div", {
			style: {
				fontSize: "var(--ds-t-body)",
				fontWeight: 500,
				color: "var(--ds-ink)"
			},
			children: e
		}), t && /* @__PURE__ */ _("div", {
			style: {
				fontSize: "var(--ds-t-small)",
				color: "var(--ds-ink-2)",
				marginTop: 2,
				lineHeight: 1.4
			},
			children: t
		})]
	}), d = /* @__PURE__ */ v(g, { children: [i && /* @__PURE__ */ _(ao, {
		color: a,
		children: i
	}), /* @__PURE__ */ _("div", {
		style: {
			flex: 1,
			minWidth: 0,
			display: "flex",
			alignItems: "center",
			minHeight: 50,
			padding: "11px 0",
			borderTop: r ? "none" : "1px solid var(--ds-line)"
		},
		children: l ? /* @__PURE__ */ v("div", {
			style: {
				flex: 1,
				minWidth: 0,
				display: "flex",
				alignItems: "center",
				gap: "var(--ds-3)"
			},
			children: [
				/* @__PURE__ */ _("div", {
					style: {
						flex: 1,
						minWidth: 0
					},
					children: u
				}),
				s && /* @__PURE__ */ _("span", {
					style: {
						fontSize: "var(--ds-t-body)",
						color: "var(--ds-ink-2)",
						whiteSpace: "nowrap"
					},
					children: s
				}),
				/* @__PURE__ */ _("span", {
					style: {
						color: "var(--ds-ink-3)",
						lineHeight: 0
					},
					children: ro
				})
			]
		}) : /* @__PURE__ */ v("div", {
			style: {
				flex: 1,
				minWidth: 0,
				display: "grid",
				gap: c ? "var(--ds-2)" : "var(--ds-5)",
				alignItems: "center",
				gridTemplateColumns: c ? "minmax(0, 1fr)" : "minmax(0, 1fr) minmax(0, 1.2fr)"
			},
			children: [u, /* @__PURE__ */ v("div", {
				style: {
					minWidth: 0,
					display: "flex",
					justifyContent: c ? "flex-start" : "flex-end"
				},
				children: [s && /* @__PURE__ */ _("span", {
					style: {
						fontSize: "var(--ds-t-body)",
						color: "var(--ds-ink-2)"
					},
					children: s
				}), n]
			})]
		})
	})] }), f = {
		display: "flex",
		alignItems: "center",
		gap: "var(--ds-3)",
		width: "100%"
	};
	return l ? /* @__PURE__ */ _("button", {
		type: "button",
		onClick: o,
		style: {
			...f,
			padding: 0,
			margin: 0,
			border: "none",
			background: "transparent",
			textAlign: "left",
			cursor: "pointer",
			font: "inherit",
			color: "inherit",
			borderRadius: 8
		},
		onPointerDown: (e) => {
			e.currentTarget.style.background = "var(--ds-surface-2)";
		},
		onPointerUp: (e) => {
			e.currentTarget.style.background = "transparent";
		},
		onPointerLeave: (e) => {
			e.currentTarget.style.background = "transparent";
		},
		children: d
	}) : /* @__PURE__ */ _("div", {
		style: f,
		children: d
	});
}
var so = /* @__PURE__ */ _("svg", {
	width: "14",
	height: "14",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2.6",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: /* @__PURE__ */ _("path", { d: "M20 6L9 17l-5-5" })
});
function co({ estado: e }) {
	return /* @__PURE__ */ v("span", {
		role: "status",
		"aria-live": "polite",
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 6,
			minHeight: 24,
			whiteSpace: "nowrap",
			fontSize: "var(--ds-t-small)",
			fontWeight: 600,
			color: e === "error" ? "var(--ds-risk)" : e === "guardado" ? "var(--ds-ok)" : "var(--ds-ink-2)"
		},
		children: [e === "guardado" && so, e ? {
			guardando: "Guardando…",
			guardado: "Guardado",
			error: "No se pudo guardar"
		}[e] : ""]
	});
}
// src/Cuenta/CargaFoto.jsx
var lo = 512;
function uo(e) {
	return new Promise((t, n) => {
		let r = URL.createObjectURL(e), i = new Image();
		i.onload = () => {
			let e = Math.min(i.naturalWidth, i.naturalHeight), a = document.createElement("canvas");
			a.width = lo, a.height = lo, a.getContext("2d").drawImage(i, (i.naturalWidth - e) / 2, (i.naturalHeight - e) / 2, e, e, 0, 0, lo, lo), URL.revokeObjectURL(r), a.toBlob((e) => e ? t(new File([e], "foto.jpg", { type: "image/jpeg" })) : n(/* @__PURE__ */ Error("recorte")), "image/jpeg", .88);
		}, i.onerror = () => {
			URL.revokeObjectURL(r), n(/* @__PURE__ */ Error("imagen"));
		}, i.src = r;
	});
}
function fo({ nombre: e, foto: t, onElegir: n, onQuitar: r, subiendo: i = !1, error: a, maxMb: o = 5, figura: s = !1 }) {
	let c = d(), l = m(null), [f, p] = h(null), [g, y] = h(!1), [b, x] = h(null);
	u(() => () => {
		f && URL.revokeObjectURL(f);
	}, [f]), u(() => {
		i || p(null);
	}, [i]);
	let S = async (e) => {
		if (e) {
			if (!/^image\/(png|jpeg|webp)$/.test(e.type)) x("Elige una imagen JPG, PNG o WebP.");
			else if (e.size > o * 1024 * 1024) x(`La imagen pesa más de ${o} MB. Elige una más ligera.`);
			else try {
				let t = await uo(e);
				x(null), p(URL.createObjectURL(t)), n?.(t);
			} catch {
				x("No pudimos leer esa imagen. Prueba con otra.");
			}
		}
	}, C = b || a;
	return /* @__PURE__ */ v("div", {
		onDragOver: (e) => {
			e.preventDefault(), y(!0);
		},
		onDragLeave: () => y(!1),
		onDrop: (e) => {
			e.preventDefault(), y(!1), S(e.dataTransfer.files?.[0]);
		},
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-4)",
			flexWrap: "wrap",
			width: "100%",
			padding: "var(--ds-3)",
			borderRadius: "var(--ds-r-item)",
			border: `1px dashed ${g ? "var(--ds-accent-trazo)" : "transparent"}`,
			background: g ? "var(--ds-accent-soft)" : "transparent",
			transition: "background var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease)"
		},
		children: [/* @__PURE__ */ _("div", {
			style: {
				opacity: i ? .6 : 1,
				transition: "opacity var(--ds-t-state) var(--ds-ease)"
			},
			children: /* @__PURE__ */ _(dn, {
				src: f || t,
				nombre: e,
				tamano: 64,
				figura: s
			})
		}), /* @__PURE__ */ v("div", {
			style: {
				display: "grid",
				gap: 6,
				flex: "1 1 180px"
			},
			children: [/* @__PURE__ */ v("div", {
				style: {
					display: "flex",
					gap: "var(--ds-2)",
					flexWrap: "wrap"
				},
				children: [
					/* @__PURE__ */ _("input", {
						ref: l,
						id: c,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						hidden: !0,
						onChange: (e) => {
							S(e.target.files?.[0]), e.target.value = "";
						}
					}),
					/* @__PURE__ */ _(H, {
						type: "button",
						esperando: i,
						onClick: () => l.current?.click(),
						children: t ? "Cambiar foto" : "Subir foto"
					}),
					t && r && /* @__PURE__ */ _(H, {
						type: "button",
						variante: "fantasma",
						onClick: r,
						children: "Quitar"
					})
				]
			}), /* @__PURE__ */ _("div", {
				role: C ? "alert" : void 0,
				style: {
					fontSize: "var(--ds-t-small)",
					color: C ? "var(--ds-risk)" : "var(--ds-ink-2)"
				},
				children: C || `O arrástrala aquí. JPG, PNG o WebP de hasta ${o} MB; se recorta en cuadrado.`
			})]
		})]
	});
}
// src/Cuenta/ZonaPeligro.jsx
function po({ titulo: e, descripcion: t, boton: n, consecuencias: i, palabra: a = "BORRAR", pideClave: o = !0, onConfirmar: s, esperando: c = !1, error: l }) {
	let [u, d] = h(!1), [f, p] = h(""), [m, y] = h(""), [b, x] = h({}), S = () => {
		d(!1), p(""), y(""), x({});
	};
	return /* @__PURE__ */ v("section", {
		"aria-labelledby": "zona-peligro-titulo",
		style: {
			border: "1px solid var(--ds-risk)",
			borderRadius: "var(--ds-r-card)",
			padding: "var(--ds-5) var(--ds-6)",
			background: "var(--ds-risk-soft)"
		},
		children: [/* @__PURE__ */ v("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: "var(--ds-4)",
				flexWrap: "wrap"
			},
			children: [/* @__PURE__ */ v("div", {
				style: {
					flex: "1 1 260px",
					minWidth: 0
				},
				children: [/* @__PURE__ */ _("h2", {
					id: "zona-peligro-titulo",
					style: {
						margin: 0,
						fontSize: "var(--ds-t-body)",
						fontWeight: 700,
						color: "var(--ds-risk)"
					},
					children: e
				}), t && /* @__PURE__ */ _("p", {
					style: {
						margin: "4px 0 0",
						fontSize: "var(--ds-t-small)",
						color: "var(--ds-ink)"
					},
					children: t
				})]
			}), /* @__PURE__ */ _(H, {
				type: "button",
				variante: "peligro",
				onClick: () => d(!0),
				"aria-haspopup": "dialog",
				children: n
			})]
		}), /* @__PURE__ */ _(kn, {
			abierto: u,
			onCerrar: S,
			titulo: e,
			ancho: 460,
			acciones: /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _(H, {
				type: "button",
				variante: "fantasma",
				onClick: S,
				children: "Cancelar"
			}), /* @__PURE__ */ _(H, {
				type: "button",
				variante: "peligro",
				esperando: c,
				onClick: () => {
					let e = {};
					f.trim() !== a && (e.palabra = `Escribe ${a} tal cual, en mayúsculas.`), o && !m && (e.clave = "Escribe tu contraseña."), x(e), Object.keys(e).length === 0 && s?.({ clave: m });
				},
				children: n
			})] }),
			children: /* @__PURE__ */ v("div", {
				style: {
					display: "grid",
					gap: "var(--ds-4)"
				},
				children: [
					i && /* @__PURE__ */ _("div", {
						style: {
							fontSize: "var(--ds-t-small)",
							color: "var(--ds-ink)"
						},
						children: i
					}),
					l && /* @__PURE__ */ _("div", {
						role: "alert",
						style: {
							fontSize: "var(--ds-t-small)",
							fontWeight: 600,
							color: "var(--ds-risk)"
						},
						children: l
					}),
					o && /* @__PURE__ */ _($a, {
						etiqueta: "Tu contraseña",
						valor: m,
						onCambio: y,
						error: b.clave,
						autoComplete: "current-password"
					}),
					/* @__PURE__ */ _(r, {
						etiqueta: `Escribe ${a} para confirmar`,
						valor: f,
						onCambio: p,
						error: b.palabra,
						autoComplete: "off"
					})
				]
			})
		})]
	});
}
// src/primitivas/SelectorPeriodo.jsx
var mo = (e) => String(e).padStart(2, "0"), ho = (e) => `${e.getFullYear()}-${mo(e.getMonth() + 1)}-${mo(e.getDate())}`, go = (e) => {
	let [t, n, r] = String(e).slice(0, 10).split("-").map(Number);
	return new Date(t, n - 1, r);
}, _o = (e, t) => {
	let n = new Date(e);
	return n.setDate(n.getDate() + t), n;
}, vo = [
	{
		clave: "hoy",
		etiqueta: "Hoy"
	},
	{
		clave: "ayer",
		etiqueta: "Ayer"
	},
	{
		clave: "7d",
		etiqueta: "Últimos 7 días"
	},
	{
		clave: "30d",
		etiqueta: "Últimos 30 días"
	},
	{
		clave: "mes",
		etiqueta: "Este mes"
	},
	{
		clave: "mesAnterior",
		etiqueta: "Mes anterior"
	},
	{
		clave: "trimestre",
		etiqueta: "Este trimestre"
	},
	{
		clave: "anio",
		etiqueta: "Este año"
	},
	{
		clave: "anioAnterior",
		etiqueta: "Año anterior"
	}
];
function yo(e, t = /* @__PURE__ */ new Date()) {
	let n = t instanceof Date ? new Date(t.getFullYear(), t.getMonth(), t.getDate()) : go(t), r = n.getFullYear(), i = n.getMonth(), a, o;
	switch (e) {
		case "hoy":
			a = n, o = n;
			break;
		case "ayer":
			a = _o(n, -1), o = a;
			break;
		case "7d":
			a = _o(n, -6), o = n;
			break;
		case "30d":
			a = _o(n, -29), o = n;
			break;
		case "mes":
			a = new Date(r, i, 1), o = new Date(r, i + 1, 0);
			break;
		case "mesAnterior":
			a = new Date(r, i - 1, 1), o = new Date(r, i, 0);
			break;
		case "trimestre": {
			let e = Math.floor(i / 3) * 3;
			a = new Date(r, e, 1), o = new Date(r, e + 3, 0);
			break;
		}
		case "anio":
			a = new Date(r, 0, 1), o = new Date(r, 11, 31);
			break;
		case "anioAnterior":
			a = new Date(r - 1, 0, 1), o = new Date(r - 1, 11, 31);
			break;
		default: return null;
	}
	let s = vo.find((t) => t.clave === e);
	return {
		clave: e,
		desde: ho(a),
		hasta: ho(o),
		etiqueta: s?.etiqueta ?? e
	};
}
function bo(e, t) {
	return e ? e === t ? Y(e, "media") : `${Y(e, "media")} – ${Y(t, "media")}` : "";
}
function xo({ valor: e, onCambio: t, opciones: n, fechaBase: r, etiqueta: i = "Periodo", estilo: a }) {
	let o = m(null), [s, c] = h(!1), l = r ?? /* @__PURE__ */ new Date(), u = vo.filter((e) => !n || n.includes(e.clave)), d = e ? yo(e, l) : null;
	return /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ v("button", {
		ref: o,
		type: "button",
		"aria-haspopup": "menu",
		"aria-expanded": s,
		onClick: () => c((e) => !e),
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 8,
			maxWidth: "100%",
			height: 38,
			padding: "0 14px",
			borderRadius: "var(--ds-r-item)",
			cursor: "pointer",
			background: "var(--ds-surface)",
			border: "1px solid var(--ds-line-firm)",
			boxShadow: "var(--ds-lift-1)",
			fontFamily: "var(--ds-font)",
			color: "var(--ds-ink)",
			...a
		},
		children: [
			/* @__PURE__ */ v("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": !0,
				style: {
					color: "var(--ds-ink-3)",
					flexShrink: 0
				},
				children: [/* @__PURE__ */ _("rect", {
					x: "3",
					y: "5",
					width: "18",
					height: "16",
					rx: "3"
				}), /* @__PURE__ */ _("path", { d: "M16 3v4M8 3v4M3 10h18" })]
			}),
			/* @__PURE__ */ _("span", {
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					color: "var(--ds-ink-3)",
					textTransform: "uppercase",
					letterSpacing: "0.05em"
				},
				children: i
			}),
			/* @__PURE__ */ _("span", {
				style: {
					fontSize: "var(--ds-t-small)",
					fontWeight: 700,
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis"
				},
				children: d ? d.etiqueta : "Elegir"
			}),
			/* @__PURE__ */ _("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": !0,
				style: {
					color: "var(--ds-ink-3)",
					flexShrink: 0
				},
				children: /* @__PURE__ */ _("path", { d: "M6 9l6 6 6-6" })
			})
		]
	}), /* @__PURE__ */ _(Nn, {
		ancla: o,
		abierto: s,
		onCerrar: () => c(!1),
		etiqueta: i,
		minAncho: 250,
		children: u.map((n) => {
			let r = yo(n.clave, l);
			return /* @__PURE__ */ _(Pn, {
				elegida: n.clave === e,
				nota: bo(r.desde, r.hasta),
				onClick: () => {
					c(!1), t?.(r);
				},
				children: n.etiqueta
			}, n.clave);
		})
	})] });
}
// src/primitivas/Chip.jsx
function So({ texto: e, valor: t, onQuitar: n, estilo: r }) {
	let i = t != null && t !== "" ? `${e}: ${t}` : e;
	return /* @__PURE__ */ v("span", {
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 6,
			maxWidth: "100%",
			background: "var(--ds-accent-soft)",
			color: "var(--ds-ink)",
			border: "1px solid var(--ds-accent-ring)",
			borderRadius: "var(--ds-r-pill)",
			padding: n ? "3px 4px 3px 12px" : "3px 12px",
			fontSize: "var(--ds-t-small)",
			fontWeight: 600,
			...r
		},
		children: [/* @__PURE__ */ _("span", {
			style: {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				minWidth: 0
			},
			children: t != null && t !== "" ? /* @__PURE__ */ v(g, { children: [
				/* @__PURE__ */ v("span", {
					style: { color: "var(--ds-ink-2)" },
					children: [e, ":"]
				}),
				" ",
				/* @__PURE__ */ _("strong", {
					style: { fontWeight: 700 },
					children: t
				})
			] }) : /* @__PURE__ */ _("strong", {
				style: { fontWeight: 700 },
				children: e
			})
		}), n && /* @__PURE__ */ _("button", {
			type: "button",
			onClick: n,
			"aria-label": `Quitar filtro ${i}`,
			style: {
				width: 22,
				height: 22,
				flexShrink: 0,
				display: "grid",
				placeItems: "center",
				border: "none",
				borderRadius: "var(--ds-r-pill)",
				cursor: "pointer",
				background: "transparent",
				color: "var(--ds-accent-tinta)",
				transition: "background var(--ds-t-state) var(--ds-ease)"
			},
			onMouseEnter: (e) => {
				e.currentTarget.style.background = "var(--ds-surface)";
			},
			onMouseLeave: (e) => {
				e.currentTarget.style.background = "transparent";
			},
			children: /* @__PURE__ */ _("svg", {
				width: "12",
				height: "12",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "3",
				strokeLinecap: "round",
				"aria-hidden": !0,
				children: /* @__PURE__ */ _("path", { d: "M18 6L6 18M6 6l12 12" })
			})
		})]
	});
}
function Co({ children: e, activos: t = [], onQuitar: n, onLimpiar: r, resultado: i, estilo: a }) {
	return /* @__PURE__ */ v("div", {
		role: "search",
		style: {
			marginBottom: "var(--ds-4)",
			...a
		},
		children: [/* @__PURE__ */ v("div", {
			style: {
				display: "flex",
				flexWrap: "wrap",
				alignItems: "center",
				gap: "var(--ds-2)"
			},
			children: [e, i && /* @__PURE__ */ _("span", {
				className: "ds-num",
				style: {
					marginLeft: "auto",
					fontSize: "var(--ds-t-small)",
					fontWeight: 600,
					color: "var(--ds-ink-3)",
					whiteSpace: "nowrap"
				},
				children: i
			})]
		}), t.length > 0 && /* @__PURE__ */ v("div", {
			"aria-live": "polite",
			style: {
				display: "flex",
				flexWrap: "wrap",
				alignItems: "center",
				gap: "var(--ds-2)",
				marginTop: "var(--ds-3)"
			},
			children: [t.map((e) => /* @__PURE__ */ _(So, {
				texto: e.texto,
				valor: e.valor,
				onQuitar: n ? () => n(e.clave) : void 0
			}, e.clave)), r && t.length > 1 && /* @__PURE__ */ _("button", {
				type: "button",
				onClick: r,
				style: {
					border: "none",
					background: "transparent",
					cursor: "pointer",
					padding: "4px 8px",
					fontFamily: "var(--ds-font)",
					fontSize: "var(--ds-t-small)",
					fontWeight: 600,
					color: "var(--ds-accent-tinta)",
					borderRadius: 8
				},
				children: "Limpiar todo"
			})]
		})]
	});
}
// src/graficas/GraficaLinea.jsx
var wo = 6.6, To = (e) => [...String(e ?? "")].reduce((e, t) => e + (t >= "A" && t <= "Z" ? 8 : t === " " ? 3.4 : wo), 0), Eo = 140, Do = (e, t) => {
	let n = String(e ?? "");
	if (To(n) <= t) return n;
	let r = n;
	for (; r.length > 1 && To(r + "…") > t;) r = r.slice(0, -1);
	return r.trimEnd() + "…";
};
function Oo({ series: e = [], etiquetas: t = [], alto: n = 240, formato: r = "numero", area: i = !1, apilada: a = !1, meta: o, titulo: s, cero: c = !0, estilo: l, onActivo: d, globo: f = !0 }) {
	let [g, y] = pi(), [b, x] = h(null), S = m(d);
	S.current = d, u(() => {
		S.current?.(b);
	}, [b]);
	let C = Math.max(t.length, ...e.map((e) => (e.valores || []).length), 0), w = a && i, T = o == null ? null : typeof o == "object" ? o.valor : o, E = o && typeof o == "object" && o.texto ? o.texto : "Meta", D = p(() => {
		let t = Array(C).fill(0);
		return e.map((e) => {
			let n = Array.from({ length: C }, (t, n) => {
				let r = e.valores?.[n];
				return r == null || !Number.isFinite(Number(r)) ? null : Number(r);
			});
			return w ? {
				abajo: t.slice(),
				arriba: n.map((e, n) => t[n] += e ?? 0).slice(),
				crudo: n
			} : {
				abajo: null,
				arriba: n,
				crudo: n
			};
		});
	}, [
		e,
		C,
		w
	]), O = D.flatMap((e) => e.arriba.filter((e) => e !== null));
	T !== null && O.push(Number(T));
	let k = O.length > 0 && C > 0, A = k ? Math.min(...O) : 0, j = k ? Math.max(...O) : 1, { marcas: M, min: ee, max: N } = mi(c ? Math.min(0, A) : A, c ? Math.max(0, j) : j, n < 200 ? 3 : 4), P = r === "moneda" ? "monedaCompacta" : r === "numero" ? "compacto" : r, te = e.length > 1 && e.length <= 4 && y >= 420 && !w, F = Math.max(...M.map((e) => String($(e, P)).length)) * wo + 12, ne = te ? Math.min(Eo, Math.max(...e.map((e) => To(e.nombre))) + 14) : 10, I = Math.max(10, y - F - ne), L = n - 10 - 24, R = (e) => F + (C <= 1 ? I / 2 : e / (C - 1) * I), z = hi(ee, N, 10 + L, 10), re = Math.max(3, ...Array.from({ length: C }, (e, n) => String(t[n] ?? n + 1).length)) * wo + 12, ie = Math.max(2, Math.min(y < 420 ? 4 : Infinity, Math.floor(I / re))), ae = Math.max(1, Math.ceil(C / ie)), B = [], V = -Infinity;
	for (let e = 0; e < C; e += ae) {
		let n = String(t[e] ?? e + 1).length * wo, r = C > 1 && e === 0 ? "start" : C > 1 && e >= C - 1 ? "end" : "middle", i = r === "start" ? R(e) : r === "end" ? R(e) - n : R(e) - n / 2;
		i >= V + 8 && (B.push({
			i: e,
			ancla: r
		}), V = i + n);
	}
	let oe = (e) => {
		let t = [], n = [];
		return e.forEach((e, r) => {
			e === null ? (n.length && t.push(n), n = []) : n.push(r);
		}), n.length && t.push(n), t;
	}, se = {
		columnas: ["", ...e.map((e) => e.nombre)],
		filas: Array.from({ length: C }, (e, n) => [t[n] ?? n + 1, ...D.map((e) => $(e.crudo[n], r))])
	}, ce = (e) => {
		if (!k) return;
		let t = e.currentTarget.getBoundingClientRect(), n = e.clientX - t.left, r = C <= 1 ? 0 : Math.round((n - F) / I * (C - 1));
		x(Math.max(0, Math.min(C - 1, r)));
	}, le = (e) => {
		e.key === "ArrowRight" && (e.preventDefault(), x((e) => Math.min(C - 1, (e ?? -1) + 1))), e.key === "ArrowLeft" && (e.preventDefault(), x((e) => Math.max(0, (e ?? C) - 1))), e.key === "Escape" && x(null);
	}, ue = b === null ? 0 : Math.min(...D.map((e) => e.arriba[b] === null ? 10 + L : z(e.arriba[b])));
	return /* @__PURE__ */ _(bi, {
		titulo: s,
		series: e,
		formaLeyenda: "linea",
		tabla: k ? se : null,
		estilo: l,
		alto: n,
		children: /* @__PURE__ */ v("div", {
			ref: g,
			style: {
				position: "relative",
				minWidth: 0
			},
			children: [k ? y > 0 && /* @__PURE__ */ v("svg", {
				width: y,
				height: n,
				role: "img",
				tabIndex: 0,
				"aria-label": `${s ? `${s}: ` : ""}${e.length} serie(s), ${C} puntos. Flechas para recorrer.`,
				style: {
					display: "block",
					overflow: "visible",
					outline: "none",
					touchAction: "pan-y"
				},
				onPointerDown: ce,
				onPointerMove: ce,
				onPointerLeave: () => x(null),
				onFocus: () => x((e) => e === null ? C - 1 : e),
				onBlur: () => x(null),
				onKeyDown: le,
				children: [
					M.map((e) => /* @__PURE__ */ v("g", { children: [/* @__PURE__ */ _("line", {
						x1: F,
						x2: F + I,
						y1: z(e),
						y2: z(e),
						stroke: e === 0 ? "var(--ds-eje)" : "var(--ds-grid)",
						strokeWidth: "1"
					}), /* @__PURE__ */ _("text", {
						x: F - 8,
						y: z(e),
						dy: "0.32em",
						textAnchor: "end",
						style: Q,
						children: $(e, P)
					})] }, e)),
					B.map(({ i: e, ancla: r }) => /* @__PURE__ */ _("text", {
						x: R(e),
						y: n - 6,
						textAnchor: r,
						style: Q,
						children: t[e] ?? e + 1
					}, e)),
					i && D.map((t, n) => oe(t.arriba).map((r, i) => {
						let a = (e) => t.abajo ? z(t.abajo[e]) : z(Math.max(ee, Math.min(0, N))), o = `M${R(r[0])},${a(r[0])} ` + r.map((e) => `L${R(e)},${z(t.arriba[e])}`).join(" ") + ` ${[...r].reverse().map((e) => `L${R(e)},${a(e)}`).join(" ")} Z`;
						return /* @__PURE__ */ _("path", {
							d: o,
							fill: Z(e[n], n),
							fillOpacity: w ? .55 : .12,
							stroke: "none"
						}, `a${n}-${i}`);
					})),
					D.map((t, n) => oe(t.arriba).map((r, i) => r.length === 1 ? /* @__PURE__ */ _("circle", {
						cx: R(r[0]),
						cy: z(t.arriba[r[0]]),
						r: "3",
						fill: Z(e[n], n)
					}, `p${n}-${i}`) : /* @__PURE__ */ _("path", {
						fill: "none",
						stroke: Z(e[n], n),
						strokeWidth: "2",
						strokeLinejoin: "round",
						strokeLinecap: "round",
						d: r.map((e, n) => `${n ? "L" : "M"}${R(e)},${z(t.arriba[e])}`).join(" ")
					}, `l${n}-${i}`))),
					T !== null && /* @__PURE__ */ v("g", { children: [/* @__PURE__ */ _("line", {
						x1: F,
						x2: F + I,
						y1: z(T),
						y2: z(T),
						stroke: "var(--ds-ink-2)",
						strokeWidth: "1.5",
						strokeDasharray: "5 4"
					}), /* @__PURE__ */ v("text", {
						x: F + 6,
						y: z(T) - 6,
						style: {
							...Q,
							fill: "var(--ds-ink-2)",
							fontWeight: 600
						},
						children: [
							E,
							" · ",
							$(T, r)
						]
					})] }),
					te && (() => {
						let t = D.map((e, t) => {
							let n = e.arriba.map((e, t) => e === null ? -1 : t).filter((e) => e >= 0).pop();
							return n === void 0 ? null : {
								si: t,
								yv: z(e.arriba[n]),
								xv: R(n)
							};
						}).filter(Boolean).sort((e, t) => e.yv - t.yv);
						for (let e = 1; e < t.length; e++) t[e].yv - t[e - 1].yv < 14 && (t[e].yv = t[e - 1].yv + 14);
						return t.map((t) => /* @__PURE__ */ v("text", {
							x: F + I + 8,
							y: t.yv,
							dy: "0.32em",
							style: {
								...Q,
								fill: "var(--ds-ink-2)",
								fontWeight: 600
							},
							children: [/* @__PURE__ */ _("title", { children: e[t.si].nombre }), Do(e[t.si].nombre, ne - 12)]
						}, t.si));
					})(),
					b !== null && /* @__PURE__ */ v("g", {
						pointerEvents: "none",
						children: [/* @__PURE__ */ _("line", {
							x1: R(b),
							x2: R(b),
							y1: 10,
							y2: 10 + L,
							stroke: "var(--ds-eje)",
							strokeWidth: "1"
						}), D.map((t, n) => t.arriba[b] !== null && /* @__PURE__ */ _("circle", {
							cx: R(b),
							cy: z(t.arriba[b]),
							r: "4.5",
							fill: Z(e[n], n),
							stroke: "var(--ds-surface-solid)",
							strokeWidth: "2"
						}, n))]
					}),
					/* @__PURE__ */ _("rect", {
						x: F,
						y: 10,
						width: I,
						height: L,
						fill: "transparent"
					})
				]
			}) : /* @__PURE__ */ _(Si, { alto: n }), /* @__PURE__ */ _(vi, {
				visible: f && b !== null,
				x: b === null ? 0 : R(b),
				y: ue,
				ancho: y,
				titulo: b === null ? "" : t[b],
				renglones: b === null ? [] : e.map((e, t) => ({
					color: Z(e, t),
					nombre: e.nombre,
					valor: $(D[t].crudo[b], r)
				}))
			})]
		})
	});
}
// src/graficas/GraficaDestacada.jsx
function ko({ titulo: e, serie: t, etiquetas: n = [], formato: r = "numero", unidad: i, resumen: a, valor: o, detalle: s, periodos: c, periodo: l, onPeriodo: u, alto: d = 200, area: f = !0, estilo: p }) {
	let [m, g] = h(null), y = t?.valores || [], b = [...y].reverse().find((e) => e != null), x = m !== null && y[m] !== null && y[m] !== void 0, S = x ? y[m] : o ?? b;
	return /* @__PURE__ */ v("section", {
		"aria-label": e,
		style: {
			background: "var(--ds-surface-solid)",
			border: "1px solid var(--ds-line)",
			borderRadius: 16,
			boxShadow: "var(--ds-lift-1)",
			padding: "var(--ds-4) var(--ds-5) var(--ds-5)",
			minWidth: 0,
			...p
		},
		children: [
			c?.length > 0 && /* @__PURE__ */ _(ga, {
				opciones: c,
				valor: l,
				onCambio: u,
				tamano: "s",
				pleno: !0,
				etiqueta: `Periodo de ${e}`,
				estilo: { marginBottom: "var(--ds-4)" }
			}),
			/* @__PURE__ */ _("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					fontWeight: 600,
					color: "var(--ds-ink-2)"
				},
				children: x ? e : a ? `${e} · ${a}` : e
			}),
			/* @__PURE__ */ v("div", {
				className: "ds-num",
				style: {
					display: "flex",
					alignItems: "baseline",
					gap: 6,
					marginTop: 2
				},
				children: [/* @__PURE__ */ _("span", {
					style: {
						fontSize: "var(--ds-num-l)",
						fontWeight: 700,
						letterSpacing: "-0.02em",
						lineHeight: 1.1,
						color: "var(--ds-ink)"
					},
					children: S === void 0 ? "—" : $(S, r)
				}), i && /* @__PURE__ */ _("span", {
					style: {
						fontSize: "var(--ds-t-body)",
						fontWeight: 600,
						color: "var(--ds-ink-2)"
					},
					children: i
				})]
			}),
			/* @__PURE__ */ _("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					color: "var(--ds-ink-2)",
					minHeight: "1.4em",
					marginTop: 2
				},
				children: x ? n[m] : s
			}),
			/* @__PURE__ */ _(Oo, {
				series: t ? [t] : [],
				etiquetas: n,
				formato: r,
				area: f,
				alto: d,
				titulo: e,
				onActivo: g,
				globo: !1,
				cero: !1,
				estilo: { marginTop: "var(--ds-3)" }
			})
		]
	});
}
// src/graficas/GraficaBarras.jsx
var Ao = 6.6, jo = 4, Mo = 2;
function No(e, t, n, r, i) {
	if (n <= 0 || r <= 0) return "";
	let a = Math.min(jo, n / 2, r / 2);
	return i === "arriba" ? `M${e},${t + r} L${e},${t + a} Q${e},${t} ${e + a},${t} L${e + n - a},${t} Q${e + n},${t} ${e + n},${t + a} L${e + n},${t + r} Z` : i === "abajo" ? `M${e},${t} L${e + n},${t} L${e + n},${t + r - a} Q${e + n},${t + r} ${e + n - a},${t + r} L${e + a},${t + r} Q${e},${t + r} ${e},${t + r - a} Z` : i === "derecha" ? `M${e},${t} L${e + n - a},${t} Q${e + n},${t} ${e + n},${t + a} L${e + n},${t + r - a} Q${e + n},${t + r} ${e + n - a},${t + r} L${e},${t + r} Z` : i === "izquierda" ? `M${e + n},${t} L${e + n},${t + r} L${e + a},${t + r} Q${e},${t + r} ${e},${t + r - a} L${e},${t + a} Q${e},${t} ${e + a},${t} Z` : `M${e},${t} h${n} v${r} h${-n} Z`;
}
var Po = (e, t) => {
	let n = String(e ?? ""), r = Math.max(3, Math.floor(t / Ao));
	return n.length > r ? `${n.slice(0, r - 1)}…` : n;
};
function Fo({ datos: e, categorias: t, series: n, horizontal: r = !1, apiladas: i = !1, etiquetas: a = !1, resaltar: o, alto: s, formato: c = "numero", titulo: l, estilo: u }) {
	let [d, f] = pi(), [p, m] = h(null), g = e ? e.map((e) => e.etiqueta) : t || [], y = e ? [{
		clave: "valor",
		nombre: l || "Valor",
		valores: e.map((e) => e.valor),
		color: e[0]?.color
	}] : n || [], b = g.length, x = y.length, S = (e, t) => {
		let n = y[e]?.valores?.[t];
		return n == null || !Number.isFinite(Number(n)) ? null : Number(n);
	}, C = 0, w = 0;
	for (let e = 0; e < b; e++) if (i) {
		let t = 0, n = 0;
		for (let r = 0; r < x; r++) {
			let i = S(r, e) ?? 0;
			i >= 0 ? t += i : n += i;
		}
		w = Math.max(w, t), C = Math.min(C, n);
	} else for (let t = 0; t < x; t++) {
		let n = S(t, e);
		n !== null && (w = Math.max(w, n), C = Math.min(C, n));
	}
	let T = b > 0 && x > 0 && y.some((e, t) => g.some((e, n) => S(t, n) !== null)), E = r ? f - Math.min(f * .38, 170) - 10 - (a ? 64 : 12) : 0, D = r ? Math.max(2, Math.min(4, Math.floor(E / 72))) : 4, { marcas: O, min: k, max: A } = mi(C, w, D), j = c === "moneda" ? "monedaCompacta" : c === "numero" ? "compacto" : c, M = s ?? (r ? Math.max(120, b * (x > 1 && !i ? 18 * x + 14 : 34) + 34) : 240), ee = r ? Math.min(f * .38, 170) : 0, N = a ? 64 : 12, P = r ? ee + 10 : Math.max(...O.map((e) => String($(e, j)).length)) * Ao + 12, te = r ? N : 6, F = a && !r ? 18 : 8, ne = y.some((e) => (e.valores || []).some((e) => Number(e) < 0)), I = r ? 22 : 24 + (a && ne ? 16 : 0), L = Math.max(10, f - P - te), R = M - F - I, z = (r ? R : L) / Math.max(1, b), re = z * (r ? .22 : .26), ie = z - re, ae = i || x === 1 ? ie : (ie - Mo * (x - 1)) / x, B = r ? hi(k, A, P, P + L) : hi(k, A, F + R, F), V = B(0), oe = (e) => o == null || o === e ? 1 : .35, se = (e) => {
		let t = [], n = (r ? F : P) + e * z + re / 2;
		if (i) {
			let r = 0, i = 0, a = [...y.keys()].reverse().find((t) => (S(t, e) ?? 0) > 0), o = [...y.keys()].reverse().find((t) => (S(t, e) ?? 0) < 0);
			y.forEach((s, c) => {
				let l = S(c, e) ?? 0;
				if (l === 0) return;
				let u = l > 0 ? r : i, d = u + l;
				l > 0 ? r = d : i = d, t.push({
					off: n,
					grueso: ae,
					desde: u,
					hasta: d,
					si: c,
					extremo: c === (l > 0 ? a : o)
				});
			});
		} else y.forEach((r, i) => {
			let a = S(i, e);
			a !== null && t.push({
				off: n + i * (ae + Mo),
				grueso: ae,
				desde: 0,
				hasta: a,
				si: i,
				extremo: !0
			});
		});
		return t;
	}, ce = (e) => {
		let t = B(e.desde), n = B(e.hasta), a = e.hasta >= e.desde, o = i && !e.extremo ? Mo : 0;
		if (r) {
			let r = Math.min(t, n), i = Math.abs(n - t), s = e.extremo ? a ? "derecha" : "izquierda" : "ninguno";
			return No(a ? r : r + o, e.off, i - o, e.grueso, s);
		}
		let s = Math.min(t, n), c = Math.abs(n - t), l = e.extremo ? a ? "arriba" : "abajo" : "ninguno";
		return a ? No(e.off, s + o, e.grueso, c - o, l) : No(e.off, s, e.grueso, c - o, l);
	}, le = (e) => y.reduce((t, n, r) => t + (S(r, e) ?? 0), 0), ue = {
		columnas: ["", ...y.map((e) => e.nombre)],
		filas: g.map((e, t) => [e, ...y.map((e, n) => $(S(n, t), c))])
	}, H = (e) => (r ? F : P) + e * z + z / 2, de = p === null ? {
		x: 0,
		y: 0
	} : r ? {
		x: Math.min(f - 10, B(Math.max(0, i ? le(p) : Math.max(...y.map((e, t) => S(t, p) ?? 0))))),
		y: H(p)
	} : {
		x: H(p),
		y: F + R / 3
	}, fe = Math.max(1, Math.ceil(b * 44 / Math.max(1, L)));
	return /* @__PURE__ */ _(bi, {
		titulo: l,
		series: x > 1 ? y : [],
		tabla: T ? ue : null,
		estilo: u,
		alto: M,
		children: /* @__PURE__ */ v("div", {
			ref: d,
			style: {
				position: "relative",
				minWidth: 0
			},
			children: [T ? f > 0 && /* @__PURE__ */ v("svg", {
				width: f,
				height: M,
				role: "group",
				style: {
					display: "block",
					overflow: "visible"
				},
				"aria-label": `${l ? `${l}: ` : ""}${b} categorías`,
				children: [
					O.map((e) => r ? /* @__PURE__ */ v("g", { children: [/* @__PURE__ */ _("line", {
						x1: B(e),
						x2: B(e),
						y1: F,
						y2: F + R,
						stroke: e === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
					}), /* @__PURE__ */ _("text", {
						x: B(e),
						y: M - 6,
						textAnchor: "middle",
						style: Q,
						children: $(e, j)
					})] }, e) : /* @__PURE__ */ v("g", { children: [/* @__PURE__ */ _("line", {
						x1: P,
						x2: P + L,
						y1: B(e),
						y2: B(e),
						stroke: e === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
					}), /* @__PURE__ */ _("text", {
						x: P - 8,
						y: B(e),
						dy: "0.32em",
						textAnchor: "end",
						style: Q,
						children: $(e, j)
					})] }, e)),
					g.map((e, t) => /* @__PURE__ */ v("g", {
						tabIndex: 0,
						opacity: oe(t),
						role: "img",
						"aria-label": `${e}: ${y.map((e, n) => `${x > 1 ? `${e.nombre} ` : ""}${$(S(n, t), c)}`).join(", ")}`,
						onMouseEnter: () => m(t),
						onMouseLeave: () => m(null),
						onFocus: () => m(t),
						onBlur: () => m(null),
						style: {
							outline: "none",
							transition: "opacity var(--ds-t-state) var(--ds-ease)"
						},
						children: [
							r ? /* @__PURE__ */ _("rect", {
								x: P,
								y: F + t * z,
								width: L,
								height: z,
								fill: p === t ? "var(--ds-surface-sunk)" : "transparent"
							}) : /* @__PURE__ */ _("rect", {
								x: P + t * z,
								y: F,
								width: z,
								height: R,
								fill: p === t ? "var(--ds-surface-sunk)" : "transparent"
							}),
							se(t).map((e, t) => /* @__PURE__ */ _("path", {
								d: ce(e),
								fill: Z(y[e.si], e.si)
							}, t)),
							r ? /* @__PURE__ */ v("text", {
								x: P - 10,
								y: H(t),
								dy: "0.32em",
								textAnchor: "end",
								style: {
									...Q,
									fontSize: 12,
									fill: "var(--ds-ink-2)"
								},
								children: [/* @__PURE__ */ _("title", { children: e }), Po(e, ee)]
							}) : t % fe === 0 && /* @__PURE__ */ v("text", {
								x: H(t),
								y: M - 6,
								textAnchor: "middle",
								style: Q,
								children: [/* @__PURE__ */ _("title", { children: e }), Po(e, z * fe - 4)]
							}),
							a && (() => {
								let e = i || x === 1 ? i ? le(t) : S(0, t) : null;
								if (e === null) return null;
								let n = $(e, j);
								if (r) {
									let r = B(e);
									return /* @__PURE__ */ _("text", {
										x: e >= 0 ? r + 6 : r - 6,
										y: H(t),
										dy: "0.32em",
										textAnchor: e >= 0 ? "start" : "end",
										style: {
											...Q,
											fill: "var(--ds-ink)",
											fontWeight: 700
										},
										children: n
									});
								}
								if (z < 34) return null;
								let a = B(e);
								return /* @__PURE__ */ _("text", {
									x: H(t),
									y: e >= 0 ? a - 6 : a + 14,
									textAnchor: "middle",
									style: {
										...Q,
										fill: "var(--ds-ink)",
										fontWeight: 700
									},
									children: n
								});
							})()
						]
					}, t)),
					r ? /* @__PURE__ */ _("line", {
						x1: V,
						x2: V,
						y1: F,
						y2: F + R,
						stroke: "var(--ds-eje)"
					}) : /* @__PURE__ */ _("line", {
						x1: P,
						x2: P + L,
						y1: V,
						y2: V,
						stroke: "var(--ds-eje)"
					})
				]
			}) : /* @__PURE__ */ _(Si, { alto: M }), /* @__PURE__ */ _(vi, {
				visible: p !== null,
				x: de.x,
				y: de.y,
				ancho: f,
				titulo: p === null ? "" : g[p],
				renglones: p === null ? [] : [...y.map((e, t) => ({
					color: Z(e, t),
					nombre: e.nombre,
					valor: $(S(t, p), c)
				})), ...i && x > 1 ? [{
					nombre: "Total",
					valor: $(le(p), c)
				}] : []]
			})]
		})
	});
}
// src/graficas/Dona.jsx
var Io = 6;
function Lo(e, t, n, r, i, a) {
	let o = (n, r) => [e + n * Math.sin(r), t - n * Math.cos(r)], s = +(a - i > Math.PI), [c, l] = o(r, i), [u, d] = o(r, a), [f, p] = o(n, a), [m, h] = o(n, i);
	return `M${c},${l} A${r},${r} 0 ${s} 1 ${u},${d} L${f},${p} A${n},${n} 0 ${s} 0 ${m},${h} Z`;
}
function Ro({ datos: e = [], formato: t = "numero", totalEtiqueta: n = "Total", tamano: r = 200, grosor: i = 26, titulo: a, estilo: o }) {
	let [s, c] = h(null), l = e.map((e, t) => ({
		...e,
		propio: e.color,
		color: e.color || Z(null, t),
		valor: Number(e.valor)
	})).filter((e) => Number.isFinite(e.valor) && e.valor > 0), u = l;
	if (l.length > Io) {
		let e = [...l].sort((e, t) => t.valor - e.valor), t = e.slice(5);
		u = [...e.slice(0, 5).map((e, t) => ({
			...e,
			color: e.propio || Z(null, t)
		})), {
			etiqueta: `Otros (${t.length})`,
			valor: t.reduce((e, t) => e + t.valor, 0),
			color: "var(--ds-ink-3)",
			otros: !0
		}];
	}
	let d = u.reduce((e, t) => e + t.valor, 0), f = r / 2, p = r / 2, m = r / 2 - 4, g = m - i, y = u.length > 1 ? 2 / m : 0, b = 0, x = u.map((e) => {
		let t = e.valor / d * Math.PI * 2, n = {
			a0: b + y / 2,
			a1: b + t - y / 2
		};
		return b += t, n;
	}), S = {
		columnas: [
			"",
			"Valor",
			"%"
		],
		filas: u.map((e) => [
			e.etiqueta,
			$(e.valor, t),
			J(e.valor / d)
		])
	}, C = s === null ? {
		t: n,
		v: $(d, t)
	} : {
		t: u[s].etiqueta,
		v: $(u[s].valor, t)
	};
	return /* @__PURE__ */ _(bi, {
		titulo: a,
		tabla: d > 0 ? S : null,
		estilo: o,
		alto: r,
		children: d <= 0 ? /* @__PURE__ */ _(Si, { alto: r }) : /* @__PURE__ */ v("div", {
			style: {
				display: "flex",
				flexWrap: "wrap",
				alignItems: "center",
				gap: "var(--ds-5)"
			},
			children: [/* @__PURE__ */ v("div", {
				style: {
					position: "relative",
					width: r,
					height: r,
					flexShrink: 0,
					margin: "0 auto"
				},
				children: [/* @__PURE__ */ _("svg", {
					width: r,
					height: r,
					role: "img",
					style: { display: "block" },
					"aria-label": `${a ? `${a}: ` : ""}${u.map((e) => `${e.etiqueta} ${J(e.valor / d)}`).join(", ")}`,
					children: u.length === 1 ? /* @__PURE__ */ _("path", {
						d: `${Lo(f, p, g, m, 0, Math.PI)} ${Lo(f, p, g, m, Math.PI, Math.PI * 2)}`,
						fill: u[0].color
					}) : u.map((e, t) => /* @__PURE__ */ _("path", {
						d: Lo(f, p, s === t ? g - 3 : g, s === t ? m + 2 : m, x[t].a0, x[t].a1),
						fill: e.color,
						opacity: s === null || s === t ? 1 : .4,
						onMouseEnter: () => c(t),
						onMouseLeave: () => c(null),
						style: {
							transition: "opacity var(--ds-t-state) var(--ds-ease)",
							cursor: "default"
						}
					}, t))
				}), /* @__PURE__ */ v("div", {
					style: {
						position: "absolute",
						inset: i + 10,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "center",
						pointerEvents: "none"
					},
					children: [
						/* @__PURE__ */ _("div", {
							style: {
								fontSize: "var(--ds-t-micro)",
								fontWeight: 600,
								color: "var(--ds-ink-3)",
								textTransform: "uppercase",
								letterSpacing: "0.05em",
								lineHeight: 1.2,
								overflow: "hidden",
								textOverflow: "ellipsis",
								maxWidth: "100%",
								whiteSpace: "nowrap"
							},
							children: C.t
						}),
						/* @__PURE__ */ _("div", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-num-m)",
								fontWeight: 700,
								letterSpacing: "-0.03em",
								color: "var(--ds-ink)",
								lineHeight: 1.1,
								marginTop: 2,
								maxWidth: "100%",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap"
							},
							children: C.v
						}),
						s !== null && /* @__PURE__ */ _("div", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-t-small)",
								fontWeight: 600,
								color: "var(--ds-ink-2)"
							},
							children: J(u[s].valor / d)
						})
					]
				})]
			}), /* @__PURE__ */ _("div", {
				role: "list",
				style: {
					flex: "1 1 180px",
					minWidth: 0,
					display: "grid",
					gap: 2
				},
				children: u.map((e, n) => /* @__PURE__ */ v("div", {
					role: "listitem",
					tabIndex: 0,
					onMouseEnter: () => c(n),
					onMouseLeave: () => c(null),
					onFocus: () => c(n),
					onBlur: () => c(null),
					style: {
						display: "flex",
						alignItems: "center",
						gap: 10,
						padding: "6px 8px",
						borderRadius: "var(--ds-r-item)",
						outlineOffset: 0,
						background: s === n ? "var(--ds-surface-sunk)" : "transparent",
						transition: "background var(--ds-t-state) var(--ds-ease)"
					},
					children: [
						/* @__PURE__ */ _(gi, { color: e.color }),
						/* @__PURE__ */ _("span", {
							style: {
								flex: 1,
								minWidth: 0,
								fontSize: "var(--ds-t-small)",
								fontWeight: 600,
								color: "var(--ds-ink-2)",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap"
							},
							title: e.etiqueta,
							children: e.etiqueta
						}),
						/* @__PURE__ */ _("span", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-t-small)",
								fontWeight: 700,
								color: "var(--ds-ink)"
							},
							children: $(e.valor, t)
						}),
						/* @__PURE__ */ _("span", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-t-micro)",
								fontWeight: 600,
								color: "var(--ds-ink-3)",
								minWidth: 44,
								textAlign: "right"
							},
							children: J(e.valor / d)
						})
					]
				}, n))
			})]
		})
	});
}
// src/graficas/Embudo.jsx
var zo = [
	5,
	4,
	3,
	2
], Bo = (e, t) => zo[t <= 1 ? 0 : Math.round(e / (t - 1) * (zo.length - 1))];
function Vo({ etapas: e = [], formato: t = "numero", titulo: n, estilo: r }) {
	let [i, a] = pi(), o = e.filter((e) => Number.isFinite(Number(e.valor))), s = Math.max(0, ...o.map((e) => Number(e.valor))), c = Number(o[0]?.valor), l = a > 0 && a < 460, u = {
		columnas: [
			"Etapa",
			"Valor",
			"vs anterior",
			"vs inicio"
		],
		filas: o.map((e, n) => [
			e.etiqueta,
			$(e.valor, t),
			n === 0 ? "—" : J(Number(o[n - 1].valor) ? Number(e.valor) / Number(o[n - 1].valor) : null),
			n === 0 ? "—" : J(c ? Number(e.valor) / c : null)
		])
	};
	return /* @__PURE__ */ _(bi, {
		titulo: n,
		tabla: s > 0 ? u : null,
		estilo: r,
		children: /* @__PURE__ */ _("div", {
			ref: i,
			style: { minWidth: 0 },
			children: s <= 0 ? /* @__PURE__ */ _(Si, {}) : /* @__PURE__ */ _("ol", {
				style: {
					listStyle: "none",
					margin: 0,
					padding: 0,
					display: "grid",
					gap: l ? 12 : 6
				},
				children: o.map((e, n) => {
					let r = Number(e.valor), i = n > 0 ? Number(o[n - 1].valor) : null, a = i ? r / i : null, u = c ? r / c : null, d = /* @__PURE__ */ _("div", {
						style: {
							height: 30,
							display: "flex",
							justifyContent: "center",
							background: "var(--ds-surface-sunk)",
							borderRadius: "var(--ds-r-item)",
							overflow: "hidden"
						},
						children: /* @__PURE__ */ _("div", { style: {
							width: `${Math.max(1.5, r / s * 100)}%`,
							height: "100%",
							background: `var(--ds-sec-${Bo(n, o.length)})`,
							borderRadius: "var(--ds-r-item)",
							transition: "width var(--ds-t-move) var(--ds-ease)"
						} })
					}), f = /* @__PURE__ */ v("div", {
						style: {
							display: "flex",
							alignItems: "baseline",
							gap: 8,
							justifyContent: l ? "flex-start" : "flex-end",
							flexWrap: "wrap"
						},
						children: [/* @__PURE__ */ _("span", {
							className: "ds-num",
							style: {
								fontWeight: 700,
								color: "var(--ds-ink)",
								fontSize: "var(--ds-t-body)"
							},
							children: $(r, t)
						}), n > 0 && /* @__PURE__ */ v("span", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-t-micro)",
								fontWeight: 600,
								color: "var(--ds-ink-3)",
								whiteSpace: "nowrap"
							},
							children: [
								J(a),
								" de la anterior · ",
								J(u),
								" del inicio"
							]
						})]
					}), p = /* @__PURE__ */ _("div", {
						style: {
							fontSize: "var(--ds-t-small)",
							fontWeight: 600,
							color: "var(--ds-ink-2)",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap"
						},
						title: e.etiqueta,
						children: e.etiqueta
					});
					return /* @__PURE__ */ _("li", {
						"aria-label": `${e.etiqueta}: ${$(r, t)}${n > 0 ? `, ${J(a)} de la etapa anterior` : ""}`,
						children: l ? /* @__PURE__ */ v("div", {
							style: {
								display: "grid",
								gap: 6
							},
							children: [/* @__PURE__ */ v("div", {
								style: {
									display: "flex",
									justifyContent: "space-between",
									gap: 8,
									alignItems: "baseline",
									flexWrap: "wrap"
								},
								children: [p, f]
							}), d]
						}) : /* @__PURE__ */ v("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "minmax(90px, 22%) 1fr minmax(150px, 28%)",
								alignItems: "center",
								gap: 14
							},
							children: [
								p,
								d,
								f
							]
						})
					}, n);
				})
			})
		})
	});
}
// src/graficas/Cascada.jsx
var Ho = 6.6, Uo = 4;
function Wo({ pasos: e = [], alto: t = 260, formato: n = "numero", etiquetas: r = !0, titulo: i, estilo: a }) {
	let [o, s] = pi(), [c, l] = h(null), u = 0, d = e.map((e) => {
		let t = Number(e.valor);
		if (e.tipo === "total") {
			let n = Number.isFinite(t) && e.valor !== null && e.valor !== void 0 ? t : u;
			return u = n, {
				...e,
				desde: 0,
				hasta: n,
				delta: n,
				total: !0
			};
		}
		let n = Number.isFinite(t) ? t : 0, r = u;
		return u += n, {
			...e,
			desde: r,
			hasta: u,
			delta: n,
			total: !1
		};
	}), f = d.length > 0, p = d.flatMap((e) => [e.desde, e.hasta]), { marcas: m, min: g, max: y } = mi(Math.min(0, ...p), Math.max(0, ...p), 4), b = n === "moneda" ? "monedaCompacta" : n === "numero" ? "compacto" : n, x = Math.max(...m.map((e) => String($(e, b)).length)) * Ho + 12, S = r ? 20 : 8, C = Math.max(10, s - x - 6), w = t - S - 24, T = C / Math.max(1, d.length), E = T * .62, D = hi(g, y, S + w, S), O = (e) => e.total ? "var(--ds-serie-1)" : e.delta >= 0 ? "var(--ds-ok)" : "var(--ds-risk)", k = (e, t = n) => e.total ? $(e.hasta, t) : `${e.delta > 0 ? "+" : ""}${$(e.delta, t)}`, A = (e, t) => {
		let n = Math.max(3, Math.floor(t / Ho));
		return e.length > n ? `${e.slice(0, n - 1)}…` : e;
	}, j = {
		columnas: [
			"Paso",
			"Movimiento",
			"Acumulado"
		],
		filas: d.map((e) => [
			e.etiqueta,
			e.total ? "—" : k(e),
			$(e.hasta, n)
		])
	};
	return /* @__PURE__ */ _(bi, {
		titulo: i,
		tabla: f ? j : null,
		estilo: a,
		alto: t,
		children: /* @__PURE__ */ v("div", {
			ref: o,
			style: {
				position: "relative",
				minWidth: 0
			},
			children: [f ? s > 0 && /* @__PURE__ */ v("svg", {
				width: s,
				height: t,
				role: "img",
				style: {
					display: "block",
					overflow: "visible"
				},
				"aria-label": `${i ? `${i}: ` : ""}${d.length} pasos, resultado ${$(u, n)}`,
				children: [m.map((e) => /* @__PURE__ */ v("g", { children: [/* @__PURE__ */ _("line", {
					x1: x,
					x2: x + C,
					y1: D(e),
					y2: D(e),
					stroke: e === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
				}), /* @__PURE__ */ _("text", {
					x: x - 8,
					y: D(e),
					dy: "0.32em",
					textAnchor: "end",
					style: Q,
					children: $(e, b)
				})] }, e)), d.map((e, i) => {
					let a = x + i * T + (T - E) / 2, o = D(Math.max(e.desde, e.hasta)), s = D(Math.min(e.desde, e.hasta)), u = Math.max(1, s - o), f = e.hasta >= e.desde, p = Math.min(Uo, E / 2, u / 2), m = f ? `M${a},${o + u} L${a},${o + p} Q${a},${o} ${a + p},${o} L${a + E - p},${o} Q${a + E},${o} ${a + E},${o + p} L${a + E},${o + u} Z` : `M${a},${o} L${a + E},${o} L${a + E},${o + u - p} Q${a + E},${o + u} ${a + E - p},${o + u} L${a + p},${o + u} Q${a},${o + u} ${a},${o + u - p} Z`, h = d[i + 1];
					return /* @__PURE__ */ v("g", {
						tabIndex: 0,
						style: { outline: "none" },
						"aria-label": `${e.etiqueta}: ${k(e)}, acumulado ${$(e.hasta, n)}`,
						onMouseEnter: () => l(i),
						onMouseLeave: () => l(null),
						onFocus: () => l(i),
						onBlur: () => l(null),
						children: [
							/* @__PURE__ */ _("rect", {
								x: x + i * T,
								y: S,
								width: T,
								height: w,
								fill: c === i ? "var(--ds-surface-sunk)" : "transparent"
							}),
							/* @__PURE__ */ _("path", {
								d: m,
								fill: O(e)
							}),
							h && /* @__PURE__ */ _("line", {
								x1: a + E,
								x2: x + (i + 1) * T + (T - E) / 2,
								y1: D(e.hasta),
								y2: D(e.hasta),
								stroke: "var(--ds-eje)",
								strokeDasharray: "3 3"
							}),
							r && T >= 40 && /* @__PURE__ */ _("text", {
								x: a + E / 2,
								y: o - 6,
								textAnchor: "middle",
								style: {
									...Q,
									fill: "var(--ds-ink)",
									fontWeight: 700
								},
								children: k(e, b)
							}),
							/* @__PURE__ */ v("text", {
								x: x + i * T + T / 2,
								y: t - 6,
								textAnchor: "middle",
								style: {
									...Q,
									fontWeight: e.total ? 800 : 600,
									fill: e.total ? "var(--ds-ink-2)" : "var(--ds-ink-3)"
								},
								children: [/* @__PURE__ */ _("title", { children: e.etiqueta }), A(String(e.etiqueta ?? ""), T - 4)]
							})
						]
					}, i);
				})]
			}) : /* @__PURE__ */ _(Si, { alto: t }), /* @__PURE__ */ _(vi, {
				visible: c !== null,
				ancho: s,
				x: c === null ? 0 : x + c * T + T / 2,
				y: c === null ? 0 : D(Math.max(d[c].desde, d[c].hasta)),
				titulo: c === null ? "" : d[c].etiqueta,
				renglones: c === null ? [] : [...d[c].total ? [] : [{
					color: O(d[c]),
					nombre: "Movimiento",
					valor: k(d[c])
				}], {
					nombre: d[c].total ? "Total" : "Acumulado",
					valor: $(d[c].hasta, n)
				}]
			})]
		})
	});
}
function Go(e) {
	let t = e.filter((e) => e != null && Number.isFinite(Number(e))).map(Number);
	return t.length ? {
		min: Math.min(...t),
		max: Math.max(...t)
	} : null;
}
function Ko(e, t) {
	if (e == null || !Number.isFinite(Number(e)) || !t) return 0;
	if (t.max === t.min) return 3;
	let n = (Number(e) - t.min) / (t.max - t.min);
	return Math.min(5, 1 + Math.floor(n * 5));
}
var qo = (e) => `var(--ds-sec-${e})`;
function Jo({ rango: e, formato: t }) {
	if (!e) return null;
	let n = (e.max - e.min) / 5;
	return /* @__PURE__ */ v("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: 6,
			flexWrap: "wrap",
			marginTop: "var(--ds-3)",
			fontSize: "var(--ds-t-micro)",
			fontWeight: 600,
			color: "var(--ds-ink-3)"
		},
		children: [
			/* @__PURE__ */ _("span", {
				className: "ds-num",
				children: $(e.min, t)
			}),
			Array.from({ length: 5 }, (r, i) => /* @__PURE__ */ _("span", {
				title: `${$(e.min + n * i, t)} – ${$(e.min + n * (i + 1), t)}`,
				style: {
					width: 22,
					height: 10,
					borderRadius: "var(--ds-r-mini)",
					background: qo(i + 1)
				}
			}, i)),
			/* @__PURE__ */ _("span", {
				className: "ds-num",
				children: $(e.max, t)
			}),
			/* @__PURE__ */ v("span", {
				style: {
					display: "inline-flex",
					alignItems: "center",
					gap: 5,
					marginLeft: 10
				},
				children: [/* @__PURE__ */ _("span", { style: {
					width: 10,
					height: 10,
					borderRadius: "var(--ds-r-mini)",
					background: qo(0)
				} }), "Sin dato"]
			})
		]
	});
}
// src/graficas/MapaCalor.jsx
function Yo({ filas: e = [], columnas: t = [], valores: n = [], formato: r = "numero", celdaMinima: i = 28, altoCelda: a = 28, titulo: o, estilo: s }) {
	let c = m(null), l = d().replace(/:/g, ""), [u, f] = h(null), p = Go(n.flat()), y = Math.min(140, Math.max(36, ...e.map((e) => String(e).length * 7 + 12))), b = (e, t) => n?.[e]?.[t], x = (e, n) => ({
		x: y + (n + .5) * (c.current ? (c.current.scrollWidth - y) / Math.max(1, t.length) : i),
		y: 22 + e * (a + 3)
	}), S = (n, r) => f((i) => {
		let [a, o] = i || [0, 0];
		return [Math.max(0, Math.min(e.length - 1, a + n)), Math.max(0, Math.min(t.length - 1, o + r))];
	}), C = (e) => {
		let t = {
			ArrowUp: [-1, 0],
			ArrowDown: [1, 0],
			ArrowLeft: [0, -1],
			ArrowRight: [0, 1]
		}[e.key];
		t && (e.preventDefault(), S(...t)), e.key === "Escape" && f(null);
	}, w = {
		columnas: ["", ...t],
		filas: e.map((e, n) => [e, ...t.map((e, t) => $(b(n, t), r))])
	}, T = u ? x(...u) : {
		x: 0,
		y: 0
	};
	return /* @__PURE__ */ _(bi, {
		titulo: o,
		tabla: p ? w : null,
		estilo: s,
		children: p ? /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ v("div", {
			ref: c,
			tabIndex: 0,
			role: "grid",
			"aria-label": `${o ? `${o}: ` : ""}${e.length} por ${t.length}. Flechas para recorrer.`,
			"aria-activedescendant": u ? `${l}-${u[0]}-${u[1]}` : void 0,
			onKeyDown: C,
			onFocus: () => f((e) => e || [0, 0]),
			onBlur: () => f(null),
			onMouseLeave: () => f(null),
			style: {
				position: "relative",
				overflowX: "auto",
				paddingBottom: 4,
				outlineOffset: 2
			},
			children: [/* @__PURE__ */ v("div", {
				style: {
					display: "grid",
					minWidth: y + t.length * i,
					gridTemplateColumns: `${y}px repeat(${t.length}, minmax(${i}px, 1fr))`,
					gap: 3
				},
				children: [/* @__PURE__ */ v("div", {
					role: "row",
					style: { display: "contents" },
					children: [/* @__PURE__ */ _("div", { role: "columnheader" }), t.map((e, n) => /* @__PURE__ */ _("div", {
						role: "columnheader",
						"aria-label": String(e),
						style: {
							fontSize: 11,
							fontWeight: 600,
							color: "var(--ds-ink-3)",
							textAlign: "center",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
							height: 19
						},
						title: String(e),
						children: t.length > 16 && n % 2 ? "" : e
					}, n))]
				}), e.map((e, n) => /* @__PURE__ */ v("div", {
					role: "row",
					style: { display: "contents" },
					children: [/* @__PURE__ */ _("div", {
						role: "rowheader",
						style: {
							fontSize: "var(--ds-t-small)",
							fontWeight: 600,
							color: "var(--ds-ink-2)",
							display: "flex",
							alignItems: "center",
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
							paddingRight: 6
						},
						title: String(e),
						children: e
					}), t.map((t, i) => {
						let o = u && u[0] === n && u[1] === i, s = b(n, i);
						return /* @__PURE__ */ _("div", {
							id: `${l}-${n}-${i}`,
							role: "gridcell",
							"aria-selected": !!o,
							"aria-label": `${e} · ${t}: ${s == null ? "sin dato" : $(s, r)}`,
							onMouseEnter: () => f([n, i]),
							style: {
								height: a,
								borderRadius: "var(--ds-r-mini)",
								background: qo(Ko(s, p)),
								boxShadow: o ? "0 0 0 2px var(--ds-ink)" : "none",
								transition: "box-shadow var(--ds-t-tap) var(--ds-ease-out)"
							}
						}, i);
					})]
				}, n))]
			}), /* @__PURE__ */ _(vi, {
				visible: !!u,
				x: T.x,
				y: T.y,
				ancho: c.current?.scrollWidth || 0,
				titulo: u ? `${e[u[0]]} · ${t[u[1]]}` : "",
				renglones: u ? [{
					nombre: o || "Valor",
					valor: $(b(...u), r)
				}] : []
			})]
		}), /* @__PURE__ */ _(Jo, {
			rango: p,
			formato: r
		})] }) : /* @__PURE__ */ _(Si, {})
	});
}
// src/graficas/CalendarioCalor.jsx
var Xo = 13, Zo = [
	"L",
	"",
	"M",
	"",
	"V",
	"",
	""
], Qo = (e) => {
	if (e instanceof Date) return new Date(e.getFullYear(), e.getMonth(), e.getDate());
	let [t, n, r] = String(e).slice(0, 10).split("-").map(Number);
	return new Date(t, n - 1, r);
}, $o = (e) => `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
function es({ datos: e = [], desde: t, hasta: n, formato: r = "numero", titulo: i, estilo: a }) {
	let o = m(null), [s, c] = h(null), { dias: l, semanas: u, mapa: d, rango: y } = p(() => {
		let r = new Map(e.map((e) => [String(e.fecha).slice(0, 10), e.valor])), i = e.map((e) => Qo(e.fecha)).sort((e, t) => e - t), a = t ? Qo(t) : i[0], o = n ? Qo(n) : i[i.length - 1];
		if (!a || !o || o < a) return {
			dias: [],
			semanas: 0,
			mapa: r,
			rango: null
		};
		let s = new Date(a);
		s.setDate(s.getDate() - (s.getDay() + 6) % 7);
		let c = [];
		for (let e = new Date(s); e <= o; e.setDate(e.getDate() + 1)) {
			let t = $o(e);
			c.push({
				fecha: new Date(e),
				k: t,
				fuera: e < a,
				valor: r.get(t)
			});
		}
		let l = c.filter((e) => !e.fuera).map((e) => e.valor);
		return {
			dias: c,
			semanas: Math.ceil(c.length / 7),
			mapa: r,
			rango: Go(l)
		};
	}, [
		e,
		t,
		n
	]);
	f(() => {
		o.current && (o.current.scrollLeft = o.current.scrollWidth);
	}, [u]);
	let b = (e) => ({
		x: 18 + Math.floor(e / 7) * 16,
		y: 18 + e % 7 * 16
	}), x = [];
	l.forEach((e, t) => {
		if (t % 7 == 0) {
			let n = t / 7, r = l.slice(t, t + 7).find((e) => e.fecha.getDate() === 1) || (t === 0 ? e : null);
			r && (!x.length || n - x[x.length - 1].sem >= 3) && x.push({
				sem: n,
				texto: Y(r.fecha, "mesCorto")
			});
		}
	});
	let S = (e) => {
		let t = {
			ArrowUp: -1,
			ArrowDown: 1,
			ArrowLeft: -7,
			ArrowRight: 7
		}[e.key];
		t && (e.preventDefault(), c((e) => {
			let n = (e ?? l.length - 1) + t;
			for (n = Math.max(0, Math.min(l.length - 1, n)); l[n]?.fuera && n < l.length - 1;) n += 1;
			return n;
		})), e.key === "Escape" && c(null);
	}, C = 18 + u * 16, w = {
		columnas: ["Fecha", "Valor"],
		filas: l.filter((e) => !e.fuera && e.valor !== void 0).map((e) => [Y(e.fecha, "media"), $(e.valor, r)])
	}, T = s === null ? null : l[s], E = s === null ? {
		x: 0,
		y: 0
	} : b(s);
	return /* @__PURE__ */ _(bi, {
		titulo: i,
		tabla: y ? w : null,
		estilo: a,
		children: y ? /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ v("div", {
			ref: o,
			tabIndex: 0,
			role: "group",
			"aria-roledescription": "calendario",
			"aria-label": `${i ? `${i}: ` : ""}calendario de ${u} semanas. Flechas para recorrer.`,
			onKeyDown: S,
			onFocus: () => c((e) => e ?? l.length - 1),
			onBlur: () => c(null),
			onMouseLeave: () => c(null),
			style: {
				position: "relative",
				overflowX: "auto",
				paddingBottom: 4,
				outlineOffset: 2
			},
			children: [
				/* @__PURE__ */ _("span", {
					"aria-live": "polite",
					style: xi,
					children: T ? `${Y(T.fecha, "larga")}: ${T.valor === void 0 ? "sin dato" : $(T.valor, r)}` : ""
				}),
				/* @__PURE__ */ v("svg", {
					width: C,
					height: 130,
					"aria-hidden": "true",
					style: { display: "block" },
					children: [
						x.map((e) => /* @__PURE__ */ _("text", {
							x: 18 + e.sem * 16,
							y: 11,
							style: {
								fontSize: 11,
								fontWeight: 600,
								fill: "var(--ds-ink-3)",
								fontFamily: "var(--ds-font)"
							},
							children: e.texto
						}, e.sem)),
						Zo.map((e, t) => e && /* @__PURE__ */ _("text", {
							x: 0,
							y: 18 + t * 16 + Xo - 2,
							style: {
								fontSize: 10,
								fontWeight: 600,
								fill: "var(--ds-ink-3)",
								fontFamily: "var(--ds-font)"
							},
							children: e
						}, t)),
						l.map((e, t) => {
							if (e.fuera) return null;
							let { x: n, y: r } = b(t);
							return /* @__PURE__ */ _("rect", {
								x: n,
								y: r,
								width: Xo,
								height: Xo,
								rx: "3",
								fill: qo(Ko(e.valor, y)),
								stroke: s === t ? "var(--ds-ink)" : "none",
								strokeWidth: "2",
								onMouseEnter: () => c(t)
							}, e.k);
						})
					]
				}),
				/* @__PURE__ */ _(vi, {
					visible: !!T,
					x: E.x + Xo / 2,
					y: E.y,
					ancho: C,
					titulo: T ? Y(T.fecha, "larga") : "",
					renglones: T ? [{
						nombre: i || "Valor",
						valor: T.valor === void 0 ? "Sin dato" : $(T.valor, r)
					}] : []
				})
			]
		}), /* @__PURE__ */ _(Jo, {
			rango: y,
			formato: r
		})] }) : /* @__PURE__ */ _(Si, {})
	});
}
// src/graficas/Bala.jsx
var ts = [
	"var(--ds-line-firm)",
	"var(--ds-esqueleto-brillo)",
	"var(--ds-surface-sunk)"
];
function ns({ item: e, formato: t, angosto: n, anchoEtiqueta: r }) {
	let { etiqueta: i, valor: a, meta: o, rangos: s = [], menorEsMejor: c = !1, nota: l } = e, u = Number(a), d = Math.max(...[
		...s,
		u,
		Number(o)
	].filter(Number.isFinite), 1), f = (e) => `${Math.max(0, Math.min(100, e / d * 100))}%`, p = [
		0,
		...s.slice(0, 2),
		d
	], m = c ? [...ts].reverse() : ts, h = !Number.isFinite(u), g = /* @__PURE__ */ v("div", {
		style: {
			position: "relative",
			height: 22,
			borderRadius: "var(--ds-r-mini)",
			overflow: "hidden",
			background: m[2]
		},
		children: [
			s.length > 0 && p.slice(0, -1).map((e, t) => /* @__PURE__ */ _("div", { style: {
				position: "absolute",
				top: 0,
				bottom: 0,
				left: f(e),
				width: `calc(${f(p[t + 1])} - ${f(e)})`,
				background: m[t]
			} }, t)),
			!h && /* @__PURE__ */ _("div", { style: {
				position: "absolute",
				left: 0,
				top: "32%",
				height: "36%",
				width: f(u),
				background: "var(--ds-accent-trazo)",
				borderRadius: "0 var(--ds-r-mini) var(--ds-r-mini) 0",
				transition: "width var(--ds-t-move) var(--ds-ease)"
			} }),
			Number.isFinite(Number(o)) && /* @__PURE__ */ _("div", { style: {
				position: "absolute",
				top: 3,
				bottom: 3,
				width: 3,
				borderRadius: "var(--ds-r-mini)",
				left: `calc(${f(Number(o))} - 1.5px)`,
				background: "var(--ds-ink)"
			} })
		]
	}), y = /* @__PURE__ */ v("div", {
		className: "ds-num",
		style: {
			textAlign: n ? "left" : "right",
			whiteSpace: "nowrap"
		},
		children: [/* @__PURE__ */ _("span", {
			style: {
				fontWeight: 700,
				color: "var(--ds-ink)"
			},
			children: h ? "Sin dato" : $(u, t)
		}), Number.isFinite(Number(o)) && /* @__PURE__ */ v("span", {
			style: {
				fontSize: "var(--ds-t-micro)",
				fontWeight: 600,
				color: "var(--ds-ink-3)",
				marginLeft: 6
			},
			children: ["meta ", $(o, t)]
		})]
	}), b = /* @__PURE__ */ v("div", {
		style: { minWidth: 0 },
		children: [/* @__PURE__ */ _("div", {
			style: {
				fontSize: "var(--ds-t-small)",
				fontWeight: 600,
				color: "var(--ds-ink-2)",
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			},
			title: i,
			children: i
		}), l && /* @__PURE__ */ _("div", {
			style: {
				fontSize: "var(--ds-t-micro)",
				color: "var(--ds-ink-3)"
			},
			children: l
		})]
	});
	return /* @__PURE__ */ _("li", {
		"aria-label": `${i}: ${h ? "sin dato" : $(u, t)}${Number.isFinite(Number(o)) ? `, meta ${$(o, t)}` : ""}`,
		children: n ? /* @__PURE__ */ v("div", {
			style: {
				display: "grid",
				gap: 6
			},
			children: [/* @__PURE__ */ v("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					gap: 8,
					alignItems: "baseline"
				},
				children: [b, y]
			}), g]
		}) : /* @__PURE__ */ v("div", {
			style: {
				display: "grid",
				gridTemplateColumns: `${r}px 1fr auto`,
				alignItems: "center",
				gap: 14
			},
			children: [
				b,
				g,
				y
			]
		})
	});
}
function rs({ items: e, item: t, formato: n = "numero", titulo: r, estilo: i }) {
	let [a, o] = pi(), s = e || (t ? [t] : []), c = o > 0 && o < 460, l = Math.min(180, Math.max(90, o * .26)), u = {
		columnas: [
			"",
			"Real",
			"Meta"
		],
		filas: s.map((e) => [
			e.etiqueta,
			$(e.valor, n),
			$(e.meta, n)
		])
	};
	return /* @__PURE__ */ _(bi, {
		titulo: r,
		tabla: s.length ? u : null,
		estilo: i,
		children: /* @__PURE__ */ _("div", {
			ref: a,
			style: { minWidth: 0 },
			children: s.length ? /* @__PURE__ */ _("ul", {
				style: {
					listStyle: "none",
					margin: 0,
					padding: 0,
					display: "grid",
					gap: c ? 16 : 12
				},
				children: s.map((e, t) => /* @__PURE__ */ _(ns, {
					item: e,
					formato: n,
					angosto: c,
					anchoEtiqueta: l
				}, t))
			}) : /* @__PURE__ */ _(Si, { alto: 100 })
		})
	});
}
// src/graficas/BarraDistribucion.jsx
var is = {
	ok: "var(--ds-ok)",
	aviso: "var(--ds-warn)",
	riesgo: "var(--ds-risk)",
	neutro: "var(--ds-ink-3)",
	acento: "var(--ds-accent-trazo)"
};
function as({ segmentos: e = [], formato: t = "numero", alto: n = 14, leyenda: r = !0, titulo: i, estilo: a }) {
	let [o, s] = pi(), [c, l] = h(null), u = e.map((e, t) => ({
		...e,
		valor: Number(e.valor),
		color: e.color || is[e.tono] || Z(null, t)
	})).filter((e) => Number.isFinite(e.valor) && e.valor > 0), d = u.reduce((e, t) => e + t.valor, 0), f = 0, p = u.map((e) => {
		let t = f + e.valor / 2;
		return f += e.valor, d ? t / d * s : 0;
	}), m = {
		columnas: [
			"",
			"Valor",
			"%"
		],
		filas: u.map((e) => [
			e.etiqueta,
			$(e.valor, t),
			J(e.valor / d)
		])
	};
	return /* @__PURE__ */ _(bi, {
		titulo: i,
		tabla: d > 0 ? m : null,
		estilo: a,
		children: /* @__PURE__ */ _("div", {
			ref: o,
			style: {
				position: "relative",
				minWidth: 0
			},
			children: d <= 0 ? /* @__PURE__ */ _(Si, { alto: 60 }) : /* @__PURE__ */ v(g, { children: [
				/* @__PURE__ */ _("div", {
					role: "list",
					style: {
						display: "flex",
						gap: 2,
						height: n,
						borderRadius: "var(--ds-r-pill)",
						overflow: "hidden"
					},
					children: u.map((e, n) => /* @__PURE__ */ _("div", {
						role: "listitem",
						tabIndex: 0,
						"aria-label": `${e.etiqueta}: ${$(e.valor, t)}, ${J(e.valor / d)}`,
						onMouseEnter: () => l(n),
						onMouseLeave: () => l(null),
						onFocus: () => l(n),
						onBlur: () => l(null),
						style: {
							flex: `${e.valor} 1 0`,
							minWidth: 4,
							background: e.color,
							opacity: c === null || c === n ? 1 : .45,
							outlineOffset: -2,
							transition: "opacity var(--ds-t-state) var(--ds-ease)"
						}
					}, n))
				}),
				/* @__PURE__ */ _(vi, {
					visible: c !== null,
					ancho: s,
					x: c === null ? 0 : p[c],
					y: n + 6,
					titulo: c === null ? "" : u[c].etiqueta,
					renglones: c === null ? [] : [{
						color: u[c].color,
						nombre: "Valor",
						valor: $(u[c].valor, t)
					}, {
						nombre: "Del total",
						valor: J(u[c].valor / d)
					}]
				}),
				r && /* @__PURE__ */ _("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
						gap: "8px 16px",
						marginTop: "var(--ds-4)"
					},
					children: u.map((e, n) => /* @__PURE__ */ v("div", {
						style: {
							display: "flex",
							alignItems: "flex-start",
							gap: 8,
							minWidth: 0
						},
						children: [/* @__PURE__ */ _("span", {
							style: { marginTop: 4 },
							children: /* @__PURE__ */ _(gi, { color: e.color })
						}), /* @__PURE__ */ v("div", {
							style: { minWidth: 0 },
							children: [/* @__PURE__ */ _("div", {
								style: {
									fontSize: "var(--ds-t-micro)",
									fontWeight: 600,
									color: "var(--ds-ink-3)",
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap"
								},
								title: e.etiqueta,
								children: e.etiqueta
							}), /* @__PURE__ */ v("div", {
								className: "ds-num",
								style: {
									fontSize: "var(--ds-t-small)",
									fontWeight: 700,
									color: "var(--ds-ink)"
								},
								children: [$(e.valor, t), /* @__PURE__ */ _("span", {
									style: {
										fontWeight: 600,
										color: "var(--ds-ink-3)",
										marginLeft: 6,
										fontSize: "var(--ds-t-micro)"
									},
									children: J(e.valor / d)
								})]
							})]
						})]
					}, n))
				})
			] })
		})
	});
}
export { Rn as ALTO_CABECERA_MOVIL, Ln as ALTO_DOCK, ia as Actividad, I as Anillo, Cr as Armazon, jn as Aviso, Sn as Azulejo, rs as Bala, bn as Barra, as as BarraDistribucion, Co as BarraFiltros, Er as BarraSeleccion, ae as Barras, M as Bento, H as Boton, Ca as BotonApariencia, a as Buscador, n as CAJA, Pa as CIAN_ZENTRYA, ma as Calendario, es as CalendarioCalor, r as Campo, $a as CampoClave, jr as Campos, fo as CargaFoto, Jr as Cargando, Wo as Cascada, Tr as Casilla, ee as Celda, So as Chip, ne as Cifra, Ei as CuerpoKpi, Ri as Detalles, Ro as Dona, Vo as Embudo, ha as EncabezadoPagina, Xa as EntradaCuenta, t as Envoltura, z as Esqueleto, re as EsqueletoFila, ie as EsqueletoLista, co as EstadoGuardado, Vi as EstadoVacio, un as Fila, oo as FilaAjuste, Oi as FilaKpis, Nn as Flotante, Ar as Formulario, ue as Giro, vi as Globo, Fo as GraficaBarras, ko as GraficaDestacada, Oo as GraficaLinea, Hi as GrupoRetratos, N as Heroe, ao as IconoAjuste, oe as Insignia, Cn as Interruptor, ea as Kanban, La as LETRA_SISTEMA, xn as Lamina, _i as Leyenda, Ki as LineaTiempo, Bi as Llamado, Yo as MapaCalor, bi as MarcoGrafica, R as Medidor, Da as MenuUsuario, yn as Migas, kn as Modal, Sa as ModalApariencia, Na as Notificaciones, Pn as OpcionFlotante, S as PALETAS, vo as PERIODOS, $r as PanelInicio, Ga as PantallaAcceso, no as PantallaCuenta, Zi as Pasos, V as Pastilla, qr as Pestanas, O as ProveedorTema, dn as Retrato, fi as SERIES, ni as SIN_DATO, fn as Seccion, io as SeccionAjustes, ga as Segmentado, e as Selector, wr as SelectorArmazon, _a as SelectorPaleta, xo as SelectorPeriodo, Fa as SimboloZentrya, Si as SinDatos, Ci as Sparkline, j as Superficie, Dr as Tabla, Mi as TarjetaComparativa, Fi as TarjetaEntidad, Di as TarjetaKpi, ji as TarjetaMeta, Ni as TarjetaRanking, Wa as TarjetaVitrina, On as Transicion, di as Variacion, P as Vidrio, po as ZonaPeligro, oi as compacto, Vr as condicion, ti as configurarFormato, zr as correo, Lr as digitos, Y as fecha, li as fechaRelativa, X as formatear, ei as formato, Pr as maximo, Fr as minimo, ai as moneda, Ir as numero, Br as patron, J as porcentaje, yo as rangoPeriodo, Nr as requerido, Rr as soloDigitos, bo as textoRango, G as useAngosto, Bn as useArmazon, Kr as useFiltros, Hr as useFormulario, pn as useMedia, pi as useMedida, k as useTema, ui as variacion };
