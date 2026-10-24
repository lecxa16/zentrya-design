import "./estilos.css";
import { a as e, i as t, n, r, t as i } from "./Campo-zo67AVjF.js";
import a, { createContext as o, useCallback as s, useContext as c, useEffect as l, useId as u, useLayoutEffect as d, useMemo as f, useRef as p, useState as m } from "react";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
import { createPortal as v } from "react-dom";
// \0rolldown/runtime.js
var y = Object.defineProperty, b = (e, t) => {
	let n = {};
	for (var r in e) y(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || y(n, Symbol.toStringTag, { value: "Module" }), n;
}, x = "ds-theme", S = "ds-paleta", C = [
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
	}
], w = o({
	tema: "light",
	alternar: () => {},
	fijar: () => {},
	paleta: "zentrya",
	paletas: [],
	fijarPaleta: () => {}
});
function T() {
	try {
		return !!localStorage.getItem(x);
	} catch {
		return !1;
	}
}
function E(e) {
	try {
		localStorage.setItem(x, e);
	} catch {}
}
function D(e) {
	try {
		let t = localStorage.getItem(S);
		return e.some((e) => e.id === t) ? t : null;
	} catch {
		return null;
	}
}
function O() {
	try {
		let e = localStorage.getItem(x);
		if (e === "light" || e === "dark") return e;
	} catch {}
	return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function k({ children: e, forzar: t, marca: n, paletas: r }) {
	let [i, a] = m(() => t || O()), o = r ? r === !0 ? C : C.filter((e) => r.includes(e.id)) : [], [c, u] = m(() => D(o)), d = o.length && c || n || "zentrya", f = d === "zentrya" ? void 0 : d;
	l(() => {
		let e = document.documentElement;
		e.setAttribute("data-ds-theme", i), e.style.colorScheme = i;
	}, [i]), l(() => {
		if (!f) return;
		let e = document.documentElement;
		return e.setAttribute("data-ds-marca", f), () => e.removeAttribute("data-ds-marca");
	}, [f]), l(() => {
		if (t || typeof window > "u" || !window.matchMedia) return;
		let e = window.matchMedia("(prefers-color-scheme: dark)"), n = (e) => {
			T() || a(e.matches ? "dark" : "light");
		};
		return e.addEventListener("change", n), () => e.removeEventListener("change", n);
	}, [t]);
	let p = s((e) => {
		E(e), a(e);
	}, []), h = s(() => p(i === "dark" ? "light" : "dark"), [i, p]), _ = s((e) => {
		try {
			localStorage.setItem(S, e);
		} catch {}
		u(e);
	}, []);
	return /* @__PURE__ */ g(w.Provider, {
		value: {
			tema: i,
			alternar: h,
			fijar: p,
			paleta: d,
			paletas: o,
			fijarPaleta: _
		},
		children: /* @__PURE__ */ g("div", {
			className: "ds-root",
			children: e
		})
	});
}
var A = () => c(w), j = {
	plana: "var(--ds-lift-1)",
	elevada: "var(--ds-lift-2)",
	flotante: "var(--ds-lift-3)"
};
function M({ children: e, nivel: t = "elevada", interactiva: n = !1, hundida: r = !1, solida: i = !1, radio: a = "var(--ds-r-card)", relleno: o = "var(--ds-5)", estilo: s, entrada: c, ...l }) {
	return /* @__PURE__ */ g("div", {
		...l,
		style: {
			background: i ? "var(--ds-surface-solid)" : r ? "var(--ds-surface-sunk)" : "var(--ds-surface)",
			backdropFilter: i ? void 0 : "var(--ds-blur)",
			WebkitBackdropFilter: i ? void 0 : "var(--ds-blur)",
			border: "1px solid var(--ds-line)",
			borderRadius: a,
			padding: o,
			boxSizing: "border-box",
			boxShadow: r ? "none" : j[t],
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
			e.currentTarget.style.transform = "none", e.currentTarget.style.boxShadow = j[t];
		} : void 0,
		children: e
	});
}
// src/primitivas/Bento.jsx
function ee({ children: e, marco: t = !1, columnas: n = 12, hueco: r = "var(--ds-4)", estilo: i }) {
	return /* @__PURE__ */ g("div", {
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
function N({ children: e, ancho: t = 12, anchoMd: n, alto: r, estilo: i }) {
	return /* @__PURE__ */ _("div", {
		className: "ds-celda",
		style: {
			gridColumn: `span ${n ?? t}`,
			minWidth: 0,
			...r ? { gridRow: `span ${r}` } : null,
			...i
		},
		children: [/* @__PURE__ */ g("style", { children: "@media (max-width: 900px) { .ds-celda { grid-column: span 12 !important; } }" }), e]
	});
}
// src/primitivas/Heroe.jsx
function P({ children: e, imagen: t, imagenChica: n, encuadre: r = "center", alt: i = "", intensidad: o = .26, soloFoto: s = !1, radio: c = "var(--ds-r-card)", relleno: l = "var(--ds-8)", estilo: u, entrada: d, ...f }) {
	let [p, m] = a.useState(!1), v = s && t && !p;
	return /* @__PURE__ */ _("div", {
		...f,
		className: [v ? null : "ds-heroe", f.className].filter(Boolean).join(" ") || void 0,
		style: {
			position: "relative",
			overflow: "hidden",
			background: v ? "#0B0C12" : "var(--ds-hero)",
			borderRadius: c,
			padding: l,
			boxSizing: "border-box",
			color: "var(--ds-ink-on-hero)",
			boxShadow: v ? "var(--ds-lift-3)" : "var(--ds-lift-accent), var(--ds-lift-2)",
			...d === void 0 ? null : {
				animation: "ds-rise var(--ds-t-scene) var(--ds-ease) both",
				animationDelay: `${Math.min(d * 55, 240)}ms`
			},
			...u
		},
		children: [
			t && /* @__PURE__ */ g("img", {
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
					...v ? { filter: "saturate(1.08)" } : {
						mixBlendMode: "luminosity",
						opacity: o
					}
				},
				onError: () => m(!0)
			}),
			v && /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("div", {
				"aria-hidden": !0,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					background: "linear-gradient(to bottom, rgba(8,9,15,0.58) 0%, rgba(8,9,15,0.30) 26%, rgba(8,9,15,0.34) 60%, rgba(8,9,15,0.78) 100%)"
				}
			}), /* @__PURE__ */ g("div", {
				"aria-hidden": !0,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					background: "linear-gradient(to right, rgba(8,9,15,0.52) 0%, rgba(8,9,15,0.26) 38%, rgba(8,9,15,0) 68%)"
				}
			})] }),
			!v && /* @__PURE__ */ g("div", {
				"aria-hidden": !0,
				style: {
					position: "absolute",
					inset: 0,
					background: "var(--ds-hero-glow)",
					pointerEvents: "none"
				}
			}),
			/* @__PURE__ */ g("div", {
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
function F({ children: e, interactivo: t = !1, estilo: n, ...r }) {
	return /* @__PURE__ */ g("div", {
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
var I = {
	neutro: "var(--ds-ink)",
	acento: "var(--ds-accent-tinta)",
	ok: "var(--ds-ok)",
	aviso: "var(--ds-warn)",
	riesgo: "var(--ds-risk)"
}, te = {
	m: "var(--ds-num-m)",
	l: "var(--ds-num-l)",
	xl: "var(--ds-num-xl)"
};
function ne({ valor: e, etiqueta: t, nota: n, tono: r = "neutro", tamano: i = "l", icono: a, alineacion: o = "left", estilo: s }) {
	return /* @__PURE__ */ _("div", {
		style: {
			minWidth: 0,
			textAlign: o,
			...s
		},
		children: [
			t && /* @__PURE__ */ _("div", {
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
			/* @__PURE__ */ g("div", {
				className: "ds-num",
				style: {
					fontSize: te[i],
					fontWeight: 800,
					lineHeight: 1.05,
					letterSpacing: "-0.035em",
					color: I[r],
					marginTop: 2
				},
				children: e
			}),
			n && /* @__PURE__ */ g("div", {
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
function re({ valor: e = 0, tamano: t = 132, grosor: n = 10, tono: r = "var(--ds-accent-trazo)", pista: i = "var(--ds-surface-sunk)", children: a, animar: o = !0 }) {
	let s = Math.max(0, Math.min(100, e)), c = (t - n) / 2, l = 2 * Math.PI * c, u = l * (1 - s / 100);
	return /* @__PURE__ */ _("div", {
		style: {
			position: "relative",
			width: t,
			height: t,
			flexShrink: 0
		},
		children: [/* @__PURE__ */ _("svg", {
			width: t,
			height: t,
			style: { transform: "rotate(-90deg)" },
			"aria-hidden": !0,
			children: [/* @__PURE__ */ g("circle", {
				cx: t / 2,
				cy: t / 2,
				r: c,
				fill: "none",
				stroke: i,
				strokeWidth: n
			}), /* @__PURE__ */ g("circle", {
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
		}), /* @__PURE__ */ g("div", {
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
	return /* @__PURE__ */ g("div", {
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
		children: /* @__PURE__ */ g("div", { style: {
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
	return /* @__PURE__ */ g("span", {
		"aria-hidden": !0,
		style: {
			display: "block",
			flexShrink: 0,
			width: r ? r ? e : void 0 : t,
			height: e,
			borderRadius: r ? "var(--ds-r-pill)" : n,
			backgroundImage: "linear-gradient(90deg, var(--ds-esqueleto) 0%, var(--ds-esqueleto-brillo) 40%, var(--ds-esqueleto) 80%)",
			backgroundRepeat: "no-repeat",
			backgroundSize: "220% 100%",
			animation: "ds-brillo 1.4s linear infinite",
			...i
		}
	});
}
function ie({ retrato: e = !0, lineas: t = 2, derecha: n = !0 }) {
	return /* @__PURE__ */ _("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-3)",
			padding: "var(--ds-3) var(--ds-4)"
		},
		children: [
			e && /* @__PURE__ */ g(z, {
				circulo: !0,
				alto: 40
			}),
			/* @__PURE__ */ _("div", {
				style: {
					flex: 1,
					minWidth: 0,
					display: "flex",
					flexDirection: "column",
					gap: 7
				},
				children: [/* @__PURE__ */ g(z, {
					alto: 12,
					ancho: "42%"
				}), t > 1 && /* @__PURE__ */ g(z, {
					alto: 10,
					ancho: "26%"
				})]
			}),
			n && /* @__PURE__ */ g(z, {
				alto: 12,
				ancho: 78
			})
		]
	});
}
function ae({ filas: e = 5, ...t }) {
	return /* @__PURE__ */ g("div", { children: Array.from({ length: e }, (e, n) => /* @__PURE__ */ g("div", {
		style: { opacity: 1 - n * .12 },
		children: /* @__PURE__ */ g(ie, { ...t })
	}, n)) });
}
// src/primitivas/Barras.jsx
function B({ datos: e = [], alto: t = 132, tono: n = "var(--ds-accent-trazo)", pista: r = "var(--ds-surface-sunk)", ancho: i = 7, hueco: a = 5, animar: o = !0, ejeX: s = !1 }) {
	let c = t === "auto", l = Math.max(1, ...e.map((e) => e.total ?? e.valor ?? 0)), u = c ? {
		flex: "1 1 0",
		minWidth: 0,
		maxWidth: i * 2
	} : {
		width: i,
		flexShrink: 0
	}, d = c ? "var(--ds-r-item)" : 99;
	return /* @__PURE__ */ _("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			height: c ? "100%" : void 0,
			minHeight: 0
		},
		children: [/* @__PURE__ */ g("div", {
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
				return /* @__PURE__ */ _("div", {
					title: e.etiqueta,
					style: {
						position: "relative",
						height: "100%",
						...u
					},
					children: [/* @__PURE__ */ g("div", { style: {
						position: "absolute",
						inset: "auto 0 0 0",
						height: `max(3px, ${s}%)`,
						background: r,
						borderRadius: d
					} }), /* @__PURE__ */ g("div", { style: {
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
		}), s && /* @__PURE__ */ g("div", {
			style: {
				display: "flex",
				gap: a,
				marginTop: 8,
				flexShrink: 0,
				justifyContent: "space-between"
			},
			children: e.map((e, t) => /* @__PURE__ */ g("div", {
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
var oe = {
	neutro: ["var(--ds-surface-sunk)", "var(--ds-ink-2)"],
	acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)"],
	ok: ["var(--ds-ok-soft)", "var(--ds-ok)"],
	aviso: ["var(--ds-warn-soft)", "var(--ds-warn)"],
	riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)"]
};
function se({ children: e, tono: t = "neutro", icono: n, estilo: r, ...i }) {
	let [a, o] = oe[t] || oe.neutro;
	return /* @__PURE__ */ _("span", {
		...i,
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 5,
			background: a,
			color: o,
			fontSize: "var(--ds-t-micro)",
			fontWeight: 700,
			letterSpacing: "0.02em",
			padding: "4px 10px",
			borderRadius: "var(--ds-r-pill)",
			whiteSpace: "nowrap",
			...r
		},
		children: [n, e]
	});
}
function ce({ children: e, tono: t = "acento", tamano: n = 38, estilo: r }) {
	let [i, a] = oe[t] || oe.acento;
	return /* @__PURE__ */ g("div", {
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
var le = {
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: 8,
	fontFamily: "var(--ds-font)",
	fontSize: "var(--ds-t-body)",
	fontWeight: 700,
	letterSpacing: "-0.005em",
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: "transparent",
	borderRadius: "var(--ds-r-item)",
	padding: "10px 18px",
	cursor: "pointer",
	transition: "transform var(--ds-t-tap) var(--ds-ease), background var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease)"
}, ue = {
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
}, de = "\n@keyframes ds-boton-gira { to { transform: rotate(360deg); } }\n@keyframes ds-boton-late { 50% { opacity: .35; } }\n.ds-boton-giro { width: 15px; height: 15px; flex-shrink: 0; border-radius: 50%;\n  border: 2px solid currentColor; border-right-color: transparent;\n  animation: ds-boton-gira .7s linear infinite; }\n@media (prefers-reduced-motion: reduce) { .ds-boton-giro { animation: ds-boton-late 1.2s ease-in-out infinite; } }\n";
function V({ estilo: e }) {
	return /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("style", { children: de }), /* @__PURE__ */ g("span", {
		className: "ds-boton-giro",
		"aria-hidden": !0,
		style: e
	})] });
}
function H({ children: e, variante: t = "contorno", icono: n, esperando: r = !1, disabled: i, pleno: a = !1, estilo: o, ...s }) {
	let c = i || r;
	return /* @__PURE__ */ _("button", {
		...s,
		disabled: c,
		"aria-busy": r || void 0,
		style: {
			...le,
			...ue[t],
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
		children: [r ? /* @__PURE__ */ g(V, {}) : n, e]
	});
}
// src/primitivas/Fila.jsx
function fe({ izquierda: e, titulo: t, subtitulo: n, derecha: r, extremo: i, onClick: a, estilo: o, entrada: s, ...c }) {
	let l = !!a;
	return /* @__PURE__ */ _("div", {
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
			/* @__PURE__ */ _("div", {
				style: {
					flex: 1,
					minWidth: 0
				},
				children: [/* @__PURE__ */ g("div", {
					style: {
						fontSize: "var(--ds-t-body)",
						fontWeight: 700,
						color: "var(--ds-ink)",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis"
					},
					children: t
				}), n && /* @__PURE__ */ g("div", {
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
			r && /* @__PURE__ */ g("div", {
				style: {
					flexShrink: 0,
					textAlign: "right"
				},
				children: r
			}),
			i && /* @__PURE__ */ g("div", {
				style: { flexShrink: 0 },
				children: i
			})
		]
	});
}
function pe({ src: e, nombre: t = "", tamano: n = 40, tono: r = "acento", generico: i = !1 }) {
	let [o, s] = a.useState(!1);
	a.useEffect(() => {
		s(!1);
	}, [e]);
	let c = t.split(" ").filter(Boolean).slice(0, 2).map((e) => e[0]).join("").toUpperCase(), l = e && !o;
	return /* @__PURE__ */ g("div", {
		style: {
			width: n,
			height: n,
			flexShrink: 0,
			borderRadius: "var(--ds-r-pill)",
			background: i && !l ? "var(--ds-retrato-neutro)" : r === "acento" ? "var(--ds-accent-soft)" : "var(--ds-retrato-neutro)",
			color: r === "acento" && !i ? "var(--ds-accent-tinta)" : "var(--ds-ink-3)",
			overflow: "hidden",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			fontSize: n * .34,
			fontWeight: 800,
			letterSpacing: "-0.02em"
		},
		children: l ? /* @__PURE__ */ g("img", {
			src: e,
			alt: "",
			onError: () => s(!0),
			style: {
				width: "100%",
				height: "100%",
				objectFit: "cover"
			}
		}) : i ? /* @__PURE__ */ _("svg", {
			viewBox: "0 0 40 40",
			width: "100%",
			height: "100%",
			"aria-hidden": !0,
			style: { display: "block" },
			children: [/* @__PURE__ */ g("circle", {
				cx: "20",
				cy: "15.5",
				r: "7.2",
				fill: "currentColor",
				opacity: "0.55"
			}), /* @__PURE__ */ g("path", {
				d: "M5.5 40c0-8.6 6.5-14.2 14.5-14.2S34.5 31.4 34.5 40z",
				fill: "currentColor",
				opacity: "0.55"
			})]
		}) : c
	});
}
// src/primitivas/Seccion.jsx
function me({ titulo: e, nota: t, accion: n, children: r, estilo: i }) {
	return /* @__PURE__ */ _("div", {
		style: { ...i },
		children: [/* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: "var(--ds-3)",
				marginBottom: "var(--ds-4)"
			},
			children: [
				/* @__PURE__ */ _("div", {
					style: { minWidth: 0 },
					children: [/* @__PURE__ */ g("h2", {
						style: {
							margin: 0,
							fontSize: "var(--ds-t-title)",
							fontWeight: 800,
							letterSpacing: "-0.03em",
							lineHeight: 1.15,
							color: "var(--ds-ink)"
						},
						children: e
					}), t && /* @__PURE__ */ g("div", {
						style: {
							fontSize: "var(--ds-t-small)",
							fontWeight: 600,
							color: "var(--ds-ink-3)",
							marginTop: 3
						},
						children: t
					})]
				}),
				/* @__PURE__ */ g("div", { style: {
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
function U(e = 760) {
	return he(`(max-width: ${e}px)`);
}
function he(e) {
	let [t, n] = m(() => typeof window < "u" && !!window.matchMedia && window.matchMedia(e).matches);
	return l(() => {
		if (typeof window > "u" || !window.matchMedia) return;
		let t = window.matchMedia(e), r = (e) => n(e.matches);
		return n(t.matches), t.addEventListener("change", r), () => t.removeEventListener("change", r);
	}, [e]), t;
}
var ge = {
	containerType: "inline-size",
	minWidth: 0
};
function _e(e, t) {
	return `min(${e}, calc(100cqi / ${(Math.max(4, String(t ?? "").length) * .62).toFixed(2)}))`;
}
// src/primitivas/Migas.jsx
var ve = /* @__PURE__ */ g("svg", {
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
	children: /* @__PURE__ */ g("path", { d: "M9 18l6-6-6-6" })
}), ye = /* @__PURE__ */ g("svg", {
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
	children: /* @__PURE__ */ g("path", { d: "M19 12H5M12 19l-7-7 7-7" })
}), be = {
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
function xe({ ruta: e = [], estilo: t }) {
	let n = U();
	if (e.length === 0) return null;
	let r = e[e.length - 1], i = e.length > 1 ? e[e.length - 2] : null, a = i && i.ir ? /* @__PURE__ */ _("button", {
		onClick: i.ir,
		style: {
			...be,
			color: "var(--ds-ink-2)",
			fontWeight: 700
		},
		onMouseEnter: (e) => {
			e.currentTarget.style.color = "var(--ds-accent-tinta)";
		},
		onMouseLeave: (e) => {
			e.currentTarget.style.color = "var(--ds-ink-2)";
		},
		children: [
			ye,
			" Volver a ",
			i.texto
		]
	}) : null;
	return n ? a ? /* @__PURE__ */ g("div", {
		style: {
			marginBottom: "var(--ds-3)",
			...t
		},
		children: a
	}) : null : /* @__PURE__ */ _("div", {
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
			a && /* @__PURE__ */ g("span", {
				"aria-hidden": !0,
				style: {
					width: 1,
					height: 16,
					background: "var(--ds-line-firm)",
					opacity: .7
				}
			}),
			/* @__PURE__ */ g("nav", {
				"aria-label": "Ruta",
				children: /* @__PURE__ */ g("ol", {
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
						return /* @__PURE__ */ _("li", {
							style: {
								display: "inline-flex",
								alignItems: "center",
								gap: 2,
								minWidth: 0
							},
							children: [n > 0 && /* @__PURE__ */ g("span", {
								style: {
									color: "var(--ds-ink-3)",
									display: "inline-flex"
								},
								children: ve
							}), r || !t.ir ? /* @__PURE__ */ g("span", {
								"aria-current": r ? "page" : void 0,
								style: {
									...be,
									cursor: "default",
									color: r ? "var(--ds-ink)" : "var(--ds-ink-3)",
									fontWeight: r ? 700 : 600
								},
								children: t.texto
							}) : /* @__PURE__ */ g("button", {
								onClick: t.ir,
								style: be,
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
			/* @__PURE__ */ g("span", { style: { flex: 1 } }),
			r?.accion
		]
	});
}
// src/primitivas/Barra.jsx
function Se({ marca: e, secciones: t = [], activa: n, onIr: r, derecha: i, estilo: a }) {
	return /* @__PURE__ */ _("div", {
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
			e && /* @__PURE__ */ g("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 8,
					padding: "6px 14px 6px 10px",
					fontWeight: 800,
					fontSize: "var(--ds-t-body)",
					letterSpacing: "-0.02em"
				},
				children: e
			}),
			t.map((e) => {
				let t = e.id === n;
				return /* @__PURE__ */ _("button", {
					onClick: () => r?.(e),
					"aria-current": t ? "page" : void 0,
					style: {
						display: "inline-flex",
						alignItems: "center",
						gap: 7,
						fontFamily: "var(--ds-font)",
						fontSize: "var(--ds-t-small)",
						fontWeight: 700,
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
			/* @__PURE__ */ g("div", { style: { flex: 1 } }),
			i
		]
	});
}
// src/primitivas/Lamina.jsx
function Ce({ imagen: e, imagenChica: t, alt: n = "", alto: r = 200, children: i, pie: o, radio: s = "var(--ds-r-card)", encima: c = !0, encuadre: l = "center", fondo: u = !1, estilo: d, entrada: f, ...p }) {
	let [m, v] = a.useState(!1), y = ({ estiloExtra: r }) => /* @__PURE__ */ g("img", {
		src: e,
		srcSet: t ? `${t} 800w, ${e} 1600w` : void 0,
		sizes: t ? "(max-width: 760px) 100vw, 640px" : void 0,
		alt: n,
		loading: "lazy",
		decoding: "async",
		onError: () => v(!0),
		style: {
			width: "100%",
			height: "100%",
			objectFit: "cover",
			objectPosition: l,
			display: "block",
			...r
		}
	});
	return u ? /* @__PURE__ */ _("div", {
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
			e && !m && /* @__PURE__ */ g("div", {
				"aria-hidden": !0,
				style: {
					position: "absolute",
					inset: 0,
					zIndex: 0,
					filter: "saturate(1.35) contrast(1.06)"
				},
				children: /* @__PURE__ */ g(y, {})
			}),
			/* @__PURE__ */ g("div", {
				"aria-hidden": !0,
				style: {
					position: "absolute",
					inset: 0,
					zIndex: 1,
					background: "linear-gradient(to bottom, rgba(8,9,15,0.26) 0%, rgba(8,9,15,0.58) 32%, rgba(8,9,15,0.82) 66%, rgba(8,9,15,0.92) 100%)"
				}
			}),
			/* @__PURE__ */ g("div", {
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
	}) : /* @__PURE__ */ _("div", {
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
		children: [/* @__PURE__ */ _("div", {
			style: {
				position: "relative",
				height: r,
				flexShrink: 0,
				overflow: "hidden"
			},
			children: [e && !m ? /* @__PURE__ */ g(y, {}) : /* @__PURE__ */ g("div", { style: {
				width: "100%",
				height: "100%",
				background: "var(--ds-hero)"
			} }), c && i && /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("div", {
				"aria-hidden": !0,
				style: {
					position: "absolute",
					inset: 0,
					background: "linear-gradient(to top, rgba(8,9,15,0.90) 0%, rgba(8,9,15,0.68) 28%, rgba(8,9,15,0.28) 58%, rgba(8,9,15,0) 88%)"
				}
			}), /* @__PURE__ */ g("div", {
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
		}), (o || !c && i) && /* @__PURE__ */ g("div", {
			style: { padding: "var(--ds-4)" },
			children: o || i
		})]
	});
}
// src/primitivas/Azulejo.jsx
function we({ icono: e, etiqueta: t, nota: n, color: r, onClick: i, ancho: o = 1, entrada: s, estilo: c }) {
	let [l, u] = a.useState(!1), d = r || "var(--ds-accent)", f = `color-mix(in oklab, ${d}, var(--ds-mezcla-tono))`;
	return /* @__PURE__ */ _("button", {
		onClick: i,
		onMouseEnter: () => u(!0),
		onMouseLeave: () => u(!1),
		style: {
			gridColumn: `span ${o}`,
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
		children: [/* @__PURE__ */ g("span", {
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
		}), /* @__PURE__ */ _("span", {
			style: {
				display: "block",
				minWidth: 0,
				width: "100%"
			},
			children: [/* @__PURE__ */ g("span", {
				style: {
					display: "block",
					fontSize: "var(--ds-t-small)",
					fontWeight: 700,
					color: f,
					letterSpacing: "-0.01em",
					lineHeight: 1.25
				},
				children: t
			}), n && /* @__PURE__ */ g("span", {
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
function Te({ encendido: e = !1, onCambio: t, etiqueta: n, deshabilitado: r = !1, estilo: i }) {
	return /* @__PURE__ */ g("button", {
		type: "button",
		role: "switch",
		"aria-checked": e,
		"aria-label": n,
		title: n,
		disabled: r,
		onClick: () => t?.(!e),
		style: {
			position: "relative",
			flexShrink: 0,
			width: 42,
			height: 25,
			borderRadius: "var(--ds-r-pill)",
			cursor: r ? "not-allowed" : "pointer",
			border: `1px solid ${e ? "transparent" : "var(--ds-line-firm)"}`,
			background: e ? "var(--ds-accent-trazo)" : "var(--ds-surface-sunk)",
			opacity: r ? .5 : 1,
			transition: "background var(--ds-t-state) var(--ds-ease)",
			padding: 0
		},
		children: /* @__PURE__ */ g("span", {
			"aria-hidden": !0,
			style: {
				position: "absolute",
				top: 2,
				left: e ? 19 : 2,
				width: 19,
				height: 19,
				borderRadius: "var(--ds-r-pill)",
				background: e ? "var(--ds-ink-on-accent)" : "var(--ds-surface-solid)",
				boxShadow: "var(--ds-lift-1)",
				transition: "left var(--ds-t-state) var(--ds-ease)",
				...i
			}
		})
	});
}
// src/primitivas/Transicion.jsx
var Ee = /* @__PURE__ */ new Map(), De = (e) => String(e ?? "").split("/").filter(Boolean).length;
function Oe(e, t, n) {
	let r = getComputedStyle(e).getPropertyValue(t).trim();
	return r.endsWith("ms") ? parseFloat(r) : r.endsWith("s") ? parseFloat(r) * 1e3 : n;
}
function ke({ vista: e, eje: t = "auto", ambito: n = "vista", children: r, estilo: i }) {
	let a = p(null);
	return d(() => {
		let r = a.current, i = Ee.get(n);
		if (Ee.set(n, e), !r || e === void 0 || i === void 0 || i === e || typeof r.animate != "function" || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
		let o = t === "y" ? 0 : De(e) - De(i), s = o > 0 ? {
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
			duration: Oe(r, "--ds-t-vista", 320),
			easing: getComputedStyle(r).getPropertyValue("--ds-ease").trim() || "cubic-bezier(0.16, 1, 0.3, 1)",
			fill: "none"
		});
	}, [
		e,
		t,
		n
	]), /* @__PURE__ */ g("div", {
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
function Ae({ abierto: e, onCerrar: t, titulo: n, nota: r, children: i, acciones: a, ancho: o = 560, estilo: s, lado: c }) {
	let u = U(), d = c === "derecha" && !u, f = p(null), m = p(null), h = p(t);
	return h.current = t, l(() => {
		if (!e) return;
		m.current = document.activeElement;
		let t = (e) => {
			e.key === "Escape" && (e.stopPropagation(), h.current?.());
		};
		document.addEventListener("keydown", t, !0);
		let n = setTimeout(() => f.current?.focus(), 40);
		return () => {
			document.removeEventListener("keydown", t, !0), clearTimeout(n);
			try {
				m.current?.focus?.();
			} catch {}
		};
	}, [e]), !e || typeof document > "u" ? null : v(/* @__PURE__ */ _("div", {
		className: "ds-capa",
		children: [!d && /* @__PURE__ */ g("div", {
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
		}), /* @__PURE__ */ _("div", {
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
				...u ? {
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
				u && /* @__PURE__ */ g("div", {
					"aria-hidden": !0,
					style: {
						width: 38,
						height: 5,
						borderRadius: 3,
						flexShrink: 0,
						margin: "var(--ds-2) auto 0",
						background: "var(--ds-line-firm)"
					}
				}),
				d && /* @__PURE__ */ g("button", {
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
					children: /* @__PURE__ */ g("svg", {
						width: "15",
						height: "15",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2.2",
						strokeLinecap: "round",
						children: /* @__PURE__ */ g("path", { d: "M18 6L6 18M6 6l12 12" })
					})
				}),
				n && /* @__PURE__ */ _("div", {
					style: {
						padding: "var(--ds-5) var(--ds-5) 0",
						flexShrink: 0,
						paddingRight: d ? 64 : void 0
					},
					children: [/* @__PURE__ */ g("h2", {
						style: {
							margin: 0,
							fontSize: "var(--ds-t-title)",
							fontWeight: 800,
							letterSpacing: "-0.03em",
							color: "var(--ds-ink)"
						},
						children: n
					}), r && /* @__PURE__ */ g("p", {
						style: {
							margin: "5px 0 0",
							fontSize: "var(--ds-t-small)",
							color: "var(--ds-ink-2)"
						},
						children: r
					})]
				}),
				/* @__PURE__ */ g("div", {
					style: {
						padding: "var(--ds-5)",
						overflowY: "auto",
						flex: 1,
						minHeight: 0
					},
					children: i
				}),
				a && /* @__PURE__ */ g("div", {
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
var je = {
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
function Me({ abierto: e, severidad: t = "info", titulo: n, mensaje: r, onCerrar: i, acciones: a }) {
	let o = je[t] || je.info, c = s(() => i?.(), [i]), l = (a || []).some((e) => e.cierra);
	return /* @__PURE__ */ g(Ae, {
		abierto: e,
		onCerrar: c,
		ancho: 420,
		children: /* @__PURE__ */ _("div", {
			style: {
				textAlign: "center",
				padding: "var(--ds-2) 0"
			},
			children: [
				/* @__PURE__ */ g("div", {
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
					children: /* @__PURE__ */ _("svg", {
						width: "26",
						height: "26",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: [t === "info" && /* @__PURE__ */ g("circle", {
							cx: "12",
							cy: "12",
							r: "9"
						}), /* @__PURE__ */ g("path", { d: o.d })]
					})
				}),
				/* @__PURE__ */ g("div", {
					style: {
						fontSize: "var(--ds-t-title)",
						fontWeight: 800,
						letterSpacing: "-0.03em",
						color: "var(--ds-ink)"
					},
					children: n || o.titulo
				}),
				r && /* @__PURE__ */ g("div", {
					style: {
						fontSize: "var(--ds-t-body)",
						color: "var(--ds-ink-2)",
						marginTop: 8,
						lineHeight: 1.5
					},
					children: r
				}),
				/* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						gap: "var(--ds-2)",
						justifyContent: "center",
						marginTop: "var(--ds-5)",
						flexWrap: "wrap"
					},
					children: [(a || []).map((e, t) => /* @__PURE__ */ g(H, {
						variante: e.primaria ? "solido" : "contorno",
						onClick: () => {
							e.onClick?.(), c();
						},
						children: e.texto
					}, t)), !l && /* @__PURE__ */ g(H, {
						variante: (a || []).length ? "fantasma" : "solido",
						onClick: c,
						children: "Entendido"
					})]
				})
			]
		})
	});
}
// src/primitivas/Flotante.jsx
var Ne = 8;
function Pe({ ancla: e, abierto: t, onCerrar: n, children: r, rol: i = "menu", etiqueta: a, minAncho: o = 200, estilo: s, lado: c = "abajo" }) {
	let u = p(null), [f, h] = m(null), _ = p(n);
	return _.current = n, d(() => {
		if (!t) {
			h(null);
			return;
		}
		let n = () => {
			let t = e?.current?.getBoundingClientRect(), n = u.current?.getBoundingClientRect();
			if (!t) return;
			let r = n?.width || o, i = n?.height || 0, a = window.innerWidth, s = window.innerHeight;
			if (c === "derecha" && t.right + 8 + r <= a - Ne) {
				let e = Math.max(Ne, Math.min(t.top, s - i - Ne));
				h({
					izq: t.right + 8,
					top: e,
					haciaArriba: !1
				});
				return;
			}
			let l = s - t.bottom, d = i > 0 && l < i + Ne && t.top > l, f = d ? Math.max(Ne, t.top - i - 6) : t.bottom + 6, p = t.left;
			p + r > a - Ne && (p = t.right - r), p = Math.max(Ne, Math.min(p, a - r - Ne)), h({
				izq: p,
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
	]), l(() => {
		if (!t) return;
		let n = (t) => {
			_.current?.(), t && e?.current?.focus?.();
		}, r = (e) => {
			e.key === "Escape" && (e.stopPropagation(), n(!0));
		}, i = (t) => {
			u.current?.contains(t.target) || e?.current?.contains(t.target) || n(!1);
		};
		document.addEventListener("keydown", r, !0), document.addEventListener("mousedown", i, !0);
		let a = requestAnimationFrame(() => {
			let e = u.current;
			(e?.querySelector("[aria-checked=\"true\"]") || e?.querySelector("[data-foco]") || e?.querySelector("button, [tabindex=\"0\"]"))?.focus?.();
		});
		return () => {
			cancelAnimationFrame(a), document.removeEventListener("keydown", r, !0), document.removeEventListener("mousedown", i, !0);
		};
	}, [t, e]), !t || typeof document > "u" ? null : v(/* @__PURE__ */ g("div", {
		ref: u,
		role: i,
		"aria-label": a,
		className: "ds-capa",
		onKeyDown: (e) => {
			if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
			let t = [...u.current?.querySelectorAll("button:not([disabled])") || []], n = t.indexOf(document.activeElement);
			t.length && (e.preventDefault(), t[e.key === "ArrowDown" ? (n + 1) % t.length : (n - 1 + t.length) % t.length].focus());
		},
		style: {
			position: "fixed",
			left: f?.izq ?? -9999,
			top: f?.top ?? -9999,
			zIndex: 80,
			minWidth: o,
			maxWidth: "calc(100vw - 16px)",
			maxHeight: "calc(100vh - 16px)",
			overflowY: "auto",
			padding: "var(--ds-2)",
			borderRadius: "var(--ds-r-card)",
			background: "var(--ds-panel)",
			border: "1px solid var(--ds-line)",
			backdropFilter: "var(--ds-blur)",
			WebkitBackdropFilter: "var(--ds-blur)",
			boxShadow: "var(--ds-lift-3)",
			fontFamily: "var(--ds-font)",
			color: "var(--ds-ink)",
			visibility: f ? "visible" : "hidden",
			animation: f ? `${f.haciaArriba ? "ds-sube" : "ds-baja"} var(--ds-t-state) var(--ds-ease) both` : void 0,
			...s
		},
		children: r
	}), document.body);
}
function Fe({ children: e, elegida: t, onClick: n, rol: r = "menuitemradio", nota: i, peligro: a }) {
	return /* @__PURE__ */ _("button", {
		type: "button",
		role: r,
		"aria-checked": r === "menuitemradio" ? !!t : void 0,
		onClick: n,
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-3)",
			width: "100%",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 700,
			padding: "9px 10px",
			borderRadius: "var(--ds-r-item)",
			border: "none",
			cursor: "pointer",
			textAlign: "left",
			background: t ? "var(--ds-accent-soft)" : "transparent",
			color: a ? "var(--ds-risk)" : t ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)",
			transition: "background var(--ds-t-state) var(--ds-ease)"
		},
		onMouseEnter: (e) => {
			t || (e.currentTarget.style.background = "var(--ds-surface-2)");
		},
		onMouseLeave: (e) => {
			t || (e.currentTarget.style.background = "transparent");
		},
		onFocus: (e) => {
			t || (e.currentTarget.style.background = "var(--ds-surface-2)");
		},
		onBlur: (e) => {
			t || (e.currentTarget.style.background = "transparent");
		},
		children: [/* @__PURE__ */ _("span", {
			style: {
				flex: 1,
				minWidth: 0
			},
			children: [e, i && /* @__PURE__ */ g("span", {
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
		}), t && /* @__PURE__ */ g("svg", {
			width: "15",
			height: "15",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.4",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": !0,
			children: /* @__PURE__ */ g("path", { d: "M20 6L9 17l-5-5" })
		})]
	});
}
// src/Armazon.jsx
var Ie = "ds-nav", Le = [
	"topbar",
	"sidebar",
	"dock"
], Re = 64, ze = 52, Be = o({
	modo: "topbar",
	movil: !1,
	fijarModo: () => {}
}), Ve = () => c(Be);
function He() {
	try {
		let e = localStorage.getItem(Ie);
		if (Le.includes(e)) return e;
	} catch {}
	return "topbar";
}
var Ue = {
	background: "var(--ds-frame)",
	backdropFilter: "var(--ds-blur)",
	WebkitBackdropFilter: "var(--ds-blur)",
	border: "1px solid var(--ds-line)"
};
function We(e, t) {
	d(() => {
		let n = document.documentElement.style;
		return n.setProperty("--ds-reserva-arriba", e), n.setProperty("--ds-reserva-abajo", t), () => {
			n.removeProperty("--ds-reserva-arriba"), n.removeProperty("--ds-reserva-abajo");
		};
	}, [e, t]);
}
function Ge({ n: e, sobre: t = !1, en: n }) {
	let r = Number(e) || 0;
	return r <= 0 ? null : /* @__PURE__ */ _("span", {
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
			fontWeight: 800,
			lineHeight: "18px",
			textAlign: "center",
			flexShrink: 0,
			boxShadow: t ? "0 0 0 2px var(--ds-surface-solid)" : "none"
		},
		children: [/* @__PURE__ */ g("span", {
			"aria-hidden": !0,
			children: r > 99 ? "99+" : r
		}), /* @__PURE__ */ _("span", {
			style: Ke,
			children: [
				", ",
				r,
				" pendientes"
			]
		})]
	});
}
var Ke = {
	position: "absolute",
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0 0 0 0)",
	whiteSpace: "nowrap",
	border: 0
}, qe = (e, t) => (Number(t) || 0) > 0 ? `${e}, ${t} pendientes` : e;
function Je({ s: e, alto: t = 18 }) {
	return /* @__PURE__ */ _("span", {
		style: {
			position: "relative",
			display: "grid",
			placeItems: "center",
			width: 18,
			height: t,
			flexShrink: 0
		},
		children: [e.icono || "•", /* @__PURE__ */ g(Ge, {
			n: e.insignia,
			sobre: !0
		})]
	});
}
var W = (e) => Array.isArray(e?.hijos) && e.hijos.length > 0, Ye = (e, t) => e.id === t || W(e) && e.hijos.some((e) => e.id === t), Xe = (e) => !W(e) || !!(e.ruta || e.navegable), Ze = (e) => e.reduce((e, t) => e + (Number(t.insignia) || 0), 0), Qe = (e) => W(e) ? {
	...e,
	insigniaPropia: e.insignia,
	insignia: (Number(e.insignia) || 0) + Ze(e.hijos)
} : e;
function $e({ abierta: e, tam: t = 13 }) {
	return /* @__PURE__ */ g("svg", {
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
		children: /* @__PURE__ */ g("path", { d: "M6 9l6 6 6-6" })
	});
}
function et({ texto: e, nota: t, insignia: n, esta: r, onClick: i }) {
	return /* @__PURE__ */ _("button", {
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
			fontWeight: 700,
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
		children: [/* @__PURE__ */ _("span", {
			style: {
				flex: 1,
				minWidth: 0
			},
			children: [e, t && /* @__PURE__ */ g("span", {
				style: {
					display: "block",
					fontSize: "var(--ds-t-micro)",
					fontWeight: 600,
					color: "var(--ds-ink-3)"
				},
				children: t
			})]
		}), /* @__PURE__ */ g(Ge, { n })]
	});
}
function tt({ s: e, ancla: t, abierto: n, onCerrar: r, activa: i, onIr: a, lado: o }) {
	let s = (e) => {
		r(), a?.(e);
	};
	return /* @__PURE__ */ _(Pe, {
		ancla: t,
		abierto: n,
		onCerrar: r,
		etiqueta: e.texto,
		minAncho: 220,
		lado: o,
		children: [Xe(e) && /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(et, {
			texto: e.texto,
			nota: "Resumen",
			esta: e.id === i,
			onClick: () => s(e)
		}), /* @__PURE__ */ g("div", {
			role: "separator",
			style: {
				height: 1,
				background: "var(--ds-line)",
				margin: "4px 6px"
			}
		})] }), e.hijos.map((e) => /* @__PURE__ */ g(et, {
			texto: e.texto,
			insignia: e.insignia,
			esta: e.id === i,
			onClick: () => s(e)
		}, e.id))]
	});
}
function nt({ fuente: e, alt: t, alto: n }) {
	return e ? typeof e == "string" ? /* @__PURE__ */ g("img", {
		src: e,
		alt: t,
		style: {
			height: n,
			width: "auto",
			maxWidth: 180,
			display: "block",
			flexShrink: 0
		}
	}) : /* @__PURE__ */ g("span", {
		style: {
			display: "inline-flex",
			height: n,
			flexShrink: 0
		},
		children: e
	}) : null;
}
function rt({ texto: e = "", alto: t = 28 }) {
	return /* @__PURE__ */ g("span", {
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
			fontWeight: 800,
			letterSpacing: "-0.02em"
		}
	});
}
function it({ marca: e, logo: t, iconoApp: n, compacto: r = !1, encoge: i = !1, onInicio: a }) {
	let o = typeof e == "string" ? e : "", s = t?.icono ? /* @__PURE__ */ g(nt, {
		fuente: t.icono,
		alt: "",
		alto: 28
	}) : n ? /* @__PURE__ */ g("span", {
		"aria-hidden": !0,
		style: {
			display: "inline-flex",
			flexShrink: 0
		},
		children: n
	}) : o ? /* @__PURE__ */ g(rt, { texto: o }) : null;
	if (r && !s) return null;
	let c = /* @__PURE__ */ g("span", {
		style: {
			minWidth: 0,
			overflow: "hidden",
			textOverflow: "ellipsis"
		},
		children: e
	}), l = r ? s : t?.completo ? /* @__PURE__ */ g(nt, {
		fuente: t.completo,
		alt: o,
		alto: 28
	}) : t?.icono ? /* @__PURE__ */ _(h, { children: [s, c] }) : c, u = {
		display: "flex",
		alignItems: "center",
		gap: 10,
		flexShrink: +!!i,
		minWidth: 0,
		overflow: i ? "hidden" : "visible",
		fontWeight: 800,
		fontSize: "var(--ds-t-body)",
		letterSpacing: "-0.02em",
		color: "var(--ds-ink)",
		whiteSpace: "nowrap"
	};
	return a ? /* @__PURE__ */ g("button", {
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
	}) : /* @__PURE__ */ g("div", {
		style: u,
		children: l
	});
}
function at({ s: e, esta: t, onIr: n }) {
	return /* @__PURE__ */ _("button", {
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
			fontWeight: 700,
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
			/* @__PURE__ */ g(Ge, { n: e.insignia })
		]
	});
}
function ot({ s: e, activa: t, onIr: n }) {
	let [r, i] = m(!1), a = p(null), o = Ye(e, t), s = Xe(e), c = {
		display: "inline-flex",
		alignItems: "center",
		gap: 8,
		whiteSpace: "nowrap",
		fontFamily: "var(--ds-font)",
		fontSize: "var(--ds-t-small)",
		fontWeight: 700,
		padding: "9px 0",
		border: "none",
		background: "transparent",
		color: "inherit",
		cursor: "pointer",
		borderRadius: "var(--ds-r-pill)"
	}, l = o ? "var(--ds-ink)" : "var(--ds-surface)";
	return /* @__PURE__ */ _("span", {
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
		children: [s ? /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ _("button", {
			type: "button",
			onClick: () => n?.(e),
			"aria-current": e.id === t ? "page" : void 0,
			style: c,
			children: [
				e.icono,
				e.texto,
				/* @__PURE__ */ g(Ge, { n: e.insignia })
			]
		}), /* @__PURE__ */ g("button", {
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
			children: /* @__PURE__ */ g($e, { abierta: r })
		})] }) : /* @__PURE__ */ _("button", {
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
				/* @__PURE__ */ g(Ge, { n: e.insignia }),
				/* @__PURE__ */ g($e, { abierta: r })
			]
		}), /* @__PURE__ */ g(tt, {
			s: e,
			ancla: a,
			abierto: r,
			onCerrar: () => i(!1),
			activa: t,
			onIr: n
		})]
	});
}
function st({ s: e, texto: t, esta: n, sangria: r = !1, onClick: i }) {
	return /* @__PURE__ */ _("button", {
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
			!r && /* @__PURE__ */ g(Je, { s: {
				...e,
				insignia: 0
			} }),
			/* @__PURE__ */ _("span", {
				style: {
					flex: 1,
					minWidth: 0
				},
				children: [t ?? e.texto, e.nota && /* @__PURE__ */ g("span", {
					style: {
						display: "block",
						fontSize: "var(--ds-t-small)",
						fontWeight: 500,
						color: "var(--ds-ink-3)"
					},
					children: e.nota
				})]
			}),
			/* @__PURE__ */ g(Ge, { n: e.insignia })
		]
	});
}
function ct({ abierto: e, onCerrar: t, secciones: n, activa: r, onIr: i, titulo: a = "Más" }) {
	let o = (e) => {
		t(), i?.(e);
	}, s = n.length === 1 && W(n[0]) ? n[0] : null;
	return /* @__PURE__ */ g(Ae, {
		abierto: e,
		onCerrar: t,
		titulo: a,
		ancho: 420,
		children: /* @__PURE__ */ g("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 2,
				margin: "calc(var(--ds-2) * -1) 0"
			},
			children: s ? /* @__PURE__ */ _(h, { children: [Xe(s) && /* @__PURE__ */ g(st, {
				s: {
					...s,
					insignia: s.insigniaPropia
				},
				texto: "Resumen",
				esta: s.id === r,
				onClick: () => o(s)
			}), s.hijos.map((e) => /* @__PURE__ */ g(st, {
				s: {
					icono: s.icono,
					...e
				},
				esta: e.id === r,
				onClick: () => o(e)
			}, e.id))] }) : n.map((e) => W(e) ? /* @__PURE__ */ _("div", {
				role: "group",
				"aria-label": e.texto,
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 2
				},
				children: [Xe(e) ? /* @__PURE__ */ g(st, {
					s: {
						...e,
						insignia: e.insigniaPropia
					},
					esta: e.id === r,
					onClick: () => o(e)
				}) : /* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "var(--ds-3)",
						minHeight: 40,
						padding: "0 var(--ds-3)",
						fontSize: "var(--ds-t-small)",
						fontWeight: 800,
						color: "var(--ds-ink-2)"
					},
					children: [/* @__PURE__ */ g(Je, { s: {
						...e,
						insignia: 0
					} }), e.texto]
				}), e.hijos.map((e) => /* @__PURE__ */ g(st, {
					s: e,
					sangria: !0,
					esta: e.id === r,
					onClick: () => o(e)
				}, e.id))]
			}, e.id) : /* @__PURE__ */ g(st, {
				s: e,
				esta: e.id === r,
				onClick: () => o(e)
			}, e.id))
		})
	});
}
function lt({ marca: e, logo: t, onInicio: n, icono: r, secciones: i, activa: a, onIr: o, derecha: s, children: c }) {
	let l = p(null), [u, f] = m(56);
	return d(() => {
		let e = l.current;
		if (!e) return;
		let t = () => f(e.getBoundingClientRect().height);
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, []), We(`${Math.round(u) + 36}px`, "var(--ds-4)"), /* @__PURE__ */ _("div", {
		style: {
			minHeight: "100%",
			padding: "var(--ds-4)"
		},
		children: [/* @__PURE__ */ _("header", {
			ref: l,
			style: {
				...Ue,
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
				/* @__PURE__ */ g("div", {
					style: {
						paddingLeft: 8,
						paddingRight: 8
					},
					children: /* @__PURE__ */ g(it, {
						marca: e,
						logo: t,
						iconoApp: r,
						onInicio: n
					})
				}),
				/* @__PURE__ */ g("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "var(--ds-2)",
						flexWrap: "wrap",
						flex: 1,
						minWidth: 0
					},
					children: i.map((e) => W(e) ? /* @__PURE__ */ g(ot, {
						s: e,
						activa: a,
						onIr: o
					}, e.id) : /* @__PURE__ */ g(at, {
						s: e,
						esta: e.id === a,
						onIr: o
					}, e.id))
				}),
				/* @__PURE__ */ g("div", {
					style: {
						flex: "0 0 auto",
						display: "flex",
						justifyContent: "flex-end"
					},
					children: s
				})
			]
		}), /* @__PURE__ */ g("main", {
			style: { paddingTop: u + 20 },
			children: c
		})]
	});
}
function ut({ s: e, esta: t, marcado: n, riel: r, bajo: i, hijo: a = !1, enFila: o = !1, onClick: s, botonRef: c, insignia: l, extra: u, ...d }) {
	let f = l ?? e.insignia;
	return /* @__PURE__ */ _("button", {
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
			!a && /* @__PURE__ */ g("span", {
				style: {
					color: t || n ? "var(--ds-accent-tinta)" : "inherit",
					lineHeight: 0
				},
				children: /* @__PURE__ */ g(Je, { s: r ? {
					...e,
					insignia: 0
				} : e })
			}),
			r && /* @__PURE__ */ g("span", {
				style: {
					flex: 1,
					minWidth: 0,
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap"
				},
				children: e.texto
			}),
			r && /* @__PURE__ */ g(Ge, { n: f }),
			r && u
		]
	});
}
function dt({ s: e, activa: t, riel: n, bajo: r, onIr: i }) {
	let a = Ye(e, t), [o, s] = m(a), [c, d] = m(!1), f = p(null), v = u();
	if (l(() => {
		a && s(!0);
	}, [a]), !n) return /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(ut, {
		s: e,
		esta: a,
		riel: !1,
		bajo: r,
		botonRef: f,
		onClick: () => d((e) => !e),
		"aria-haspopup": "menu",
		"aria-expanded": c
	}), /* @__PURE__ */ g(tt, {
		s: e,
		ancla: f,
		abierto: c,
		onCerrar: () => d(!1),
		activa: t,
		onIr: i,
		lado: "derecha"
	})] });
	let y = Xe(e), b = () => s((e) => !e);
	return /* @__PURE__ */ _("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			flexShrink: 0
		},
		children: [/* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 2
			},
			children: [/* @__PURE__ */ g(ut, {
				s: e,
				esta: e.id === t,
				marcado: a,
				riel: !0,
				bajo: r,
				enFila: !0,
				insignia: o ? Number(e.insigniaPropia) || 0 : e.insignia,
				onClick: y ? () => i?.(e) : b,
				"aria-expanded": y ? void 0 : o,
				"aria-controls": y ? void 0 : v,
				extra: y ? null : /* @__PURE__ */ g("span", {
					style: {
						color: "var(--ds-ink-3)",
						lineHeight: 0
					},
					children: /* @__PURE__ */ g($e, { abierta: o })
				})
			}), y && /* @__PURE__ */ g("button", {
				type: "button",
				onClick: b,
				"aria-expanded": o,
				"aria-controls": v,
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
				children: /* @__PURE__ */ g($e, { abierta: o })
			})]
		}), /* @__PURE__ */ g("div", {
			id: v,
			role: "group",
			"aria-label": e.texto,
			inert: !o,
			style: {
				display: "grid",
				gridTemplateRows: o ? "1fr" : "0fr",
				transition: "grid-template-rows var(--ds-t-move) var(--ds-ease)"
			},
			children: /* @__PURE__ */ g("div", {
				style: {
					overflow: "hidden",
					minHeight: 0
				},
				children: /* @__PURE__ */ g("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: r ? 0 : 2,
						paddingTop: r ? 0 : 2,
						opacity: +!!o,
						translate: o ? "0 0" : "0 -6px",
						transition: o ? "opacity var(--ds-t-move) var(--ds-ease) 60ms, translate var(--ds-t-move) var(--ds-ease) 60ms" : "opacity var(--ds-t-state) var(--ds-ease), translate var(--ds-t-state) var(--ds-ease)"
					},
					children: e.hijos.map((e) => /* @__PURE__ */ g(ut, {
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
function ft({ marca: e, logo: t, onInicio: n, icono: r, secciones: i, activa: a, onIr: o, derecha: s, children: c }) {
	let [l, u] = m(!0), d = he("(max-height: 760px)"), f = l, p = f ? 244 : 64;
	return We("var(--ds-4)", "var(--ds-4)"), /* @__PURE__ */ _("div", {
		style: {
			minHeight: "100%",
			padding: "var(--ds-4)"
		},
		children: [/* @__PURE__ */ _("aside", {
			style: {
				...Ue,
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
				/* @__PURE__ */ _("div", {
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
					children: [/* @__PURE__ */ g(it, {
						marca: e,
						logo: t,
						iconoApp: r,
						onInicio: n,
						compacto: !f
					}), /* @__PURE__ */ g("button", {
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
						children: /* @__PURE__ */ g("svg", {
							width: "17",
							height: "17",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							children: /* @__PURE__ */ g("path", { d: f ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6" })
						})
					})]
				}),
				/* @__PURE__ */ g("nav", {
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
					children: i.map((e) => W(e) ? /* @__PURE__ */ g(dt, {
						s: e,
						activa: a,
						riel: f,
						bajo: d,
						onIr: o
					}, e.id) : /* @__PURE__ */ g(ut, {
						s: e,
						esta: e.id === a,
						riel: f,
						bajo: d,
						onClick: () => o?.(e)
					}, e.id))
				}),
				s ? /* @__PURE__ */ g("div", {
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
		}), /* @__PURE__ */ g("main", {
			style: {
				minWidth: 0,
				marginLeft: p + 16,
				transition: "margin-left var(--ds-t-move) var(--ds-ease)"
			},
			children: c
		})]
	});
}
var pt = 48;
function mt({ s: e, esta: t, conTexto: n, onIr: r, botonRef: i, ...a }) {
	return /* @__PURE__ */ _("button", {
		ref: i,
		type: "button",
		onClick: () => r?.(e),
		title: e.texto,
		"aria-label": n ? void 0 : qe(e.texto, e.insignia),
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
			fontWeight: 700,
			padding: n ? "7px 15px" : 0,
			minWidth: n ? 0 : pt,
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
			/* @__PURE__ */ g(Je, {
				s: n ? {
					...e,
					insignia: 0
				} : e,
				alto: 19
			}),
			n && e.texto,
			n && /* @__PURE__ */ g(Ge, {
				n: e.insignia,
				en: {
					top: 1,
					left: "calc(50% + 3px)"
				}
			})
		]
	});
}
function ht({ s: e, activa: t, conTexto: n, onIr: r }) {
	let [i, a] = m(!1), o = p(null);
	return /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(mt, {
		s: e,
		esta: Ye(e, t),
		conTexto: n,
		botonRef: o,
		onIr: () => a((e) => !e),
		"aria-haspopup": "menu",
		"aria-expanded": i
	}), /* @__PURE__ */ g(tt, {
		s: e,
		ancla: o,
		abierto: i,
		onCerrar: () => a(!1),
		activa: t,
		onIr: r
	})] });
}
function gt({ marca: e, logo: t, onInicio: n, icono: r, secciones: i, activa: a, onIr: o, derecha: c, inicio: l, inicioAbierto: u = !1, onInicioAbierto: f, children: h }) {
	let v = p(null), y = p(null), b = p(null), x = p(null), [S, C] = m(0), [w, T] = m(i.length), [E, D] = m(!1);
	We("var(--ds-4)", "calc(64px + var(--ds-6) + env(safe-area-inset-bottom, 0px))");
	let O = s(() => {
		let e = v.current;
		if (!e) return;
		let t = getComputedStyle(e), n = e.clientWidth - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight), r = 2 * Math.max(y.current?.scrollWidth || 0, b.current?.scrollWidth || 0), a = 2 * (parseFloat(t.columnGap) || 8), o = n - r - a;
		(x.current?.scrollWidth || 0) <= o ? C(0) : i.length * 52 <= o ? C(1) : (C(2), T(Math.max(1, Math.floor(o / 52) - 1)));
	}, [i]);
	d(() => {
		O();
		let e = new ResizeObserver(O);
		return [
			v.current,
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
	return /* @__PURE__ */ _("div", {
		style: {
			minHeight: "100%",
			padding: "var(--ds-4)",
			paddingBottom: "calc(64px + var(--ds-6))"
		},
		children: [
			/* @__PURE__ */ g("main", { children: h }),
			/* @__PURE__ */ _("nav", {
				ref: v,
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
					background: "var(--ds-panel)",
					borderTop: "1px solid var(--ds-line)",
					backdropFilter: "var(--ds-blur)",
					WebkitBackdropFilter: "var(--ds-blur)",
					boxShadow: "var(--ds-lift-3)"
				},
				children: [
					/* @__PURE__ */ g("div", {
						style: j,
						children: /* @__PURE__ */ g("div", {
							ref: y,
							style: M,
							children: l ? /* @__PURE__ */ g(xt, {
								abierto: u,
								icono: r,
								onClick: () => f?.(!u)
							}) : /* @__PURE__ */ g(it, {
								marca: e,
								logo: t,
								iconoApp: r,
								onInicio: n,
								compacto: !0
							})
						})
					}),
					/* @__PURE__ */ _("div", {
						style: {
							flex: "0 1 auto",
							minWidth: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "var(--ds-1)",
							position: "relative"
						},
						children: [k.map((e) => W(e) ? /* @__PURE__ */ g(ht, {
							s: e,
							activa: a,
							conTexto: S === 0,
							onIr: o
						}, e.id) : /* @__PURE__ */ g(mt, {
							s: e,
							esta: e.id === a,
							conTexto: S === 0,
							onIr: o
						}, e.id)), A.length > 0 && /* @__PURE__ */ g(_t, {
							activo: A.some((e) => Ye(e, a)),
							insignia: Ze(A),
							onClick: () => D(!0),
							alto: 44
						})]
					}),
					/* @__PURE__ */ g("div", {
						style: {
							...j,
							justifyContent: "flex-end"
						},
						children: /* @__PURE__ */ g("div", {
							ref: b,
							style: M,
							children: c
						})
					}),
					/* @__PURE__ */ g("div", {
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
						children: i.map((e) => /* @__PURE__ */ g(mt, {
							s: e,
							esta: !1,
							conTexto: !0
						}, e.id))
					})
				]
			}),
			/* @__PURE__ */ g(ct, {
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
function _t({ activo: e, insignia: t, onClick: n, alto: r }) {
	return /* @__PURE__ */ g("button", {
		onClick: n,
		title: "Más secciones",
		"aria-label": qe("Más secciones", t),
		style: {
			display: "grid",
			placeItems: "center",
			minWidth: pt,
			height: r,
			borderRadius: "var(--ds-r-item)",
			border: "none",
			cursor: "pointer",
			flexShrink: 0,
			background: e ? "var(--ds-ink)" : "transparent",
			color: e ? "var(--ds-surface-solid)" : "var(--ds-ink-2)"
		},
		children: /* @__PURE__ */ g(Je, { s: {
			insignia: t,
			icono: vt
		} })
	});
}
var vt = /* @__PURE__ */ _("svg", {
	width: "18",
	height: "18",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	"aria-hidden": !0,
	children: [
		/* @__PURE__ */ g("circle", {
			cx: "5",
			cy: "12",
			r: "1.8"
		}),
		/* @__PURE__ */ g("circle", {
			cx: "12",
			cy: "12",
			r: "1.8"
		}),
		/* @__PURE__ */ g("circle", {
			cx: "19",
			cy: "12",
			r: "1.8"
		})
	]
}), yt = 5;
function bt({ marca: e, logo: t, onInicio: n, icono: r, secciones: i, activa: a, onIr: o, derecha: s, inicio: c, inicioAbierto: l = !1, onInicioAbierto: u, volver: d, children: f }) {
	let [p, h] = m(!1), [v, y] = m(null), b = i.length <= yt, x = b ? i : i.slice(0, 4), S = b ? [] : i.slice(4), C = "calc(52px + env(safe-area-inset-top, 0px) + var(--ds-3))", w = "calc(64px + env(safe-area-inset-bottom, 0px) + var(--ds-4))";
	We(C, w);
	let T = (e, { esta: t, onClick: n, etiqueta: r }) => /* @__PURE__ */ _("button", {
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
			fontWeight: 700,
			color: t ? "var(--ds-accent-tinta)" : "var(--ds-ink-3)",
			WebkitTapHighlightColor: "transparent"
		},
		children: [
			/* @__PURE__ */ g("span", {
				style: {
					display: "grid",
					placeItems: "center",
					width: 52,
					height: 28,
					borderRadius: "var(--ds-r-pill)",
					background: t ? "var(--ds-accent-soft)" : "transparent",
					transition: "background var(--ds-t-state) var(--ds-ease)"
				},
				children: /* @__PURE__ */ g(Je, { s: {
					...e,
					insignia: 0
				} })
			}),
			/* @__PURE__ */ g("span", {
				style: {
					maxWidth: "100%",
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap"
				},
				children: r
			}),
			/* @__PURE__ */ g(Ge, {
				n: e.insignia,
				en: {
					top: 4,
					left: "calc(50% + 5px)"
				}
			})
		]
	}, e.id);
	return /* @__PURE__ */ _("div", {
		style: {
			minHeight: "100%",
			paddingTop: C,
			paddingBottom: w,
			paddingLeft: "var(--ds-3)",
			paddingRight: "var(--ds-3)"
		},
		children: [
			/* @__PURE__ */ _("header", {
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
					background: "var(--ds-panel)",
					borderBottom: "1px solid var(--ds-line)",
					backdropFilter: "var(--ds-blur)",
					WebkitBackdropFilter: "var(--ds-blur)"
				},
				children: [
					d ? /* @__PURE__ */ _("button", {
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
							fontWeight: 700,
							WebkitTapHighlightColor: "transparent"
						},
						children: [Ct, /* @__PURE__ */ g("span", {
							style: {
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap"
							},
							children: d.texto
						})]
					}) : c ? /* @__PURE__ */ _("button", {
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
						children: [/* @__PURE__ */ g(it, {
							marca: e,
							logo: t,
							encoge: !0
						}), /* @__PURE__ */ g("svg", {
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
							children: /* @__PURE__ */ g("path", { d: "M6 9l6 6 6-6" })
						})]
					}) : /* @__PURE__ */ g(it, {
						marca: e,
						logo: t,
						onInicio: n,
						encoge: !0
					}),
					/* @__PURE__ */ g("div", { style: {
						flex: 1,
						minWidth: 0
					} }),
					/* @__PURE__ */ g("div", {
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
			/* @__PURE__ */ g("main", { children: f }),
			/* @__PURE__ */ _("nav", {
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
					background: "var(--ds-panel)",
					borderTop: "1px solid var(--ds-line)",
					backdropFilter: "var(--ds-blur)",
					WebkitBackdropFilter: "var(--ds-blur)"
				},
				children: [x.map((e) => T(e, {
					esta: Ye(e, a),
					etiqueta: e.texto,
					onClick: W(e) ? () => y(e) : () => o?.(e)
				})), S.length > 0 && T({
					id: "__mas",
					icono: vt,
					insignia: Ze(S)
				}, {
					esta: S.some((e) => Ye(e, a)),
					onClick: () => h(!0),
					etiqueta: "Más"
				})]
			}),
			/* @__PURE__ */ g(ct, {
				abierto: p,
				onCerrar: () => h(!1),
				secciones: S,
				activa: a,
				onIr: o
			}),
			/* @__PURE__ */ g(ct, {
				abierto: !!v,
				onCerrar: () => y(null),
				titulo: v?.texto,
				secciones: v ? [v] : [],
				activa: a,
				onIr: o
			}),
			c
		]
	});
}
function xt({ abierto: e, onClick: t, icono: n }) {
	return /* @__PURE__ */ g("button", {
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
		children: /* @__PURE__ */ g("span", {
			style: {
				display: "grid",
				placeItems: "center",
				width: 26,
				height: 26,
				transform: e ? "scale(0.92)" : "none",
				transition: "transform var(--ds-t-move) var(--ds-ease)"
			},
			children: n || /* @__PURE__ */ g("span", { style: {
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
function St(e, t, n) {
	for (let r of e) {
		if (r.id === t) return [{
			texto: r.texto,
			ir: () => n?.(r)
		}];
		let e = W(r) ? r.hijos.find((e) => e.id === t) : null;
		if (e) return [{
			texto: r.texto,
			ir: Xe(r) ? () => n?.(r) : void 0
		}, {
			texto: e.texto,
			ir: () => n?.(e)
		}];
	}
	return [];
}
var Ct = /* @__PURE__ */ g("svg", {
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
	children: /* @__PURE__ */ g("path", { d: "M15 18l-6-6 6-6" })
});
function wt({ marca: e, logo: t, onInicio: n, icono: r, secciones: i = [], activa: a, onIr: o, derecha: c, inicio: u, inicioAbierto: d, onInicioAbierto: f, migas: p, modo: h, vista: v, children: y }) {
	let [b, x] = m(() => h || He()), S = U();
	l(() => {
		v !== void 0 && window.scrollTo({
			top: 0,
			left: 0
		});
	}, [v]), l(() => {
		if (h) x(h);
		else try {
			localStorage.setItem(Ie, b);
		} catch {}
	}, [b, h]);
	let C = s((e) => {
		Le.includes(e) && x(e);
	}, []), w = Array.isArray(p) ? [...St(i, a, o), ...p] : null, T = w && w.length > 1 ? w[w.length - 2] : null, E = w ? !S && w.length > 1 ? /* @__PURE__ */ g(xe, { ruta: w }) : null : p, D = /* @__PURE__ */ _(ke, {
		vista: v,
		children: [E, y]
	}), O = {
		marca: e,
		logo: t,
		onInicio: n,
		icono: r,
		secciones: i.map(Qe),
		activa: a,
		onIr: o,
		derecha: c,
		inicio: u,
		inicioAbierto: d,
		onInicioAbierto: f,
		children: D,
		volver: T?.ir ? {
			texto: T.texto,
			ir: T.ir
		} : null
	}, k = S ? bt : b === "sidebar" ? ft : b === "dock" ? gt : lt;
	return /* @__PURE__ */ g(Be.Provider, {
		value: {
			modo: S ? "dock" : b,
			preferencia: b,
			movil: S,
			fijarModo: C,
			modos: Le
		},
		children: /* @__PURE__ */ g(k, { ...O })
	});
}
function Tt() {
	let { preferencia: e, fijarModo: t, movil: n } = Ve(), [r, i] = m(!1), [a, o] = m(null), s = p(null), c = p(null), u = [
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
	], f = u.find((t) => t.id === e) || u[0], h = e === "dock";
	if (d(() => {
		if (!r) return;
		let e = () => {
			let e = s.current?.getBoundingClientRect();
			if (!e) return;
			let t = c.current?.offsetWidth || 190, n = c.current?.offsetHeight || 160, r = e.left + e.width / 2 < window.innerWidth / 2 ? e.left : e.right - t;
			r = Math.min(Math.max(8, r), window.innerWidth - t - 8);
			let i = h ? e.top - n - 10 : e.bottom + 10;
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
	}, [r, h]), l(() => {
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
	let y = (e) => /* @__PURE__ */ g("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.9",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: /* @__PURE__ */ g("path", { d: e })
	});
	return /* @__PURE__ */ _("div", {
		ref: s,
		style: {
			position: "relative",
			flexShrink: 0
		},
		children: [/* @__PURE__ */ g("button", {
			onClick: () => i((e) => !e),
			"aria-haspopup": "menu",
			"aria-expanded": r,
			title: `Navegación: ${f.texto}`,
			"aria-label": `Navegación: ${f.texto}`,
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
			children: y(f.icono)
		}), r && a && v(/* @__PURE__ */ _("div", {
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
				animation: `${h ? "ds-sube" : "ds-baja"} var(--ds-t-state) var(--ds-ease) both`
			},
			children: [/* @__PURE__ */ g("div", {
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 700,
					letterSpacing: "0.05em",
					textTransform: "uppercase",
					color: "var(--ds-ink-3)",
					padding: "4px 10px 7px"
				},
				children: "Navegación"
			}), u.map((n) => {
				let r = n.id === e;
				return /* @__PURE__ */ _("button", {
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
						fontWeight: 700,
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
						y(n.icono),
						/* @__PURE__ */ g("span", {
							style: { flex: 1 },
							children: n.texto
						}),
						r && /* @__PURE__ */ g("svg", {
							width: "15",
							height: "15",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2.4",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							"aria-hidden": !0,
							children: /* @__PURE__ */ g("path", { d: "M20 6L9 17l-5-5" })
						})
					]
				}, n.id);
			})]
		}), document.body)]
	});
}
// src/primitivas/Seleccion.jsx
function Et({ marcada: e = !1, onCambio: t, etiqueta: n, deshabilitado: r = !1 }) {
	let i = e === "mixta", a = e === !0 || i;
	return /* @__PURE__ */ g("button", {
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
		children: a && /* @__PURE__ */ g("svg", {
			width: "13",
			height: "13",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "3",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": !0,
			children: /* @__PURE__ */ g("path", { d: i ? "M6 12h12" : "M20 6L9 17l-5-5" })
		})
	});
}
function Dt({ cantidad: e = 0, onQuitar: t, children: n, singular: r = "seleccionado", plural: i = "seleccionados" }) {
	let { modo: a } = Ve();
	return e ? /* @__PURE__ */ g("div", {
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
		children: /* @__PURE__ */ _("div", {
			style: {
				width: "100%",
				maxWidth: 1200,
				display: "flex",
				alignItems: "center",
				gap: "var(--ds-2)",
				flexWrap: "wrap"
			},
			children: [
				/* @__PURE__ */ _("span", {
					className: "ds-num",
					"aria-live": "polite",
					style: {
						fontWeight: 800,
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
				/* @__PURE__ */ g("span", { style: { flex: 1 } }),
				n,
				/* @__PURE__ */ g(H, {
					variante: "fantasma",
					onClick: t,
					children: "Quitar selección"
				})
			]
		})
	}) : null;
}
// src/primitivas/Tabla.jsx
function Ot({ columnas: e = [], filas: t = [], claveFila: n, onFila: r, vacio: i = "No hay nada que mostrar.", cargando: a = !1, porPagina: o = 0, seleccion: s, estilo: c }) {
	let [u, d] = m(1), p = t.length, h = o > 0 && p > o, v = h ? Math.ceil(p / o) : 1;
	l(() => {
		d((e) => Math.min(Math.max(1, e), Math.max(1, v)));
	}, [v, p]), l(() => {
		d(1);
	}, [o]);
	let y = f(() => h ? t.slice((u - 1) * o, u * o) : t, [
		t,
		u,
		o,
		h
	]), b = !!(s && n), x = f(() => new Set((s?.elegidos || []).map(String)), [s?.elegidos]), S = f(() => b ? t.map((e) => String(n(e))) : [], [
		b,
		t,
		n
	]), C = S.filter((e) => x.has(e)).length, w = C === 0 ? !1 : C === S.length || "mixta", T = () => s.onCambio(w === !0 ? [] : S), E = (e) => s.onCambio(x.has(e) ? [...x].filter((t) => t !== e) : [...x, e]), D = e.length + +!!b, O = p === 0 ? 0 : (u - 1) * o + 1, k = h ? Math.min(u * o, p) : p;
	return /* @__PURE__ */ _("div", {
		style: c,
		children: [/* @__PURE__ */ g("div", {
			style: { overflowX: "auto" },
			children: /* @__PURE__ */ _("table", {
				style: {
					width: "100%",
					borderCollapse: "collapse",
					fontFamily: "var(--ds-font)"
				},
				children: [/* @__PURE__ */ g("thead", { children: /* @__PURE__ */ _("tr", { children: [b && /* @__PURE__ */ g("th", {
					scope: "col",
					style: {
						width: 36,
						padding: "0 var(--ds-2) var(--ds-3) var(--ds-3)",
						borderBottom: "1px solid var(--ds-line)"
					},
					children: /* @__PURE__ */ g(Et, {
						marcada: w,
						onCambio: T,
						deshabilitado: S.length === 0,
						etiqueta: w === !0 ? "Quitar todos" : "Elegir todos"
					})
				}), e.map((e) => /* @__PURE__ */ g("th", {
					scope: "col",
					style: {
						textAlign: e.numerica ? "right" : "left",
						fontSize: "var(--ds-t-micro)",
						fontWeight: 700,
						letterSpacing: "0.05em",
						textTransform: "uppercase",
						color: "var(--ds-ink-3)",
						padding: "0 var(--ds-3) var(--ds-3)",
						whiteSpace: "nowrap",
						borderBottom: "1px solid var(--ds-line)"
					},
					children: e.titulo
				}, e.clave))] }) }), /* @__PURE__ */ _("tbody", { children: [
					a && Array.from({ length: Math.max(3, Math.min(o || 6, 8)) }, (t, n) => /* @__PURE__ */ _("tr", {
						style: { opacity: 1 - n * .1 },
						children: [b && /* @__PURE__ */ g("td", { style: { borderBottom: "1px solid var(--ds-line)" } }), e.map((e, t) => /* @__PURE__ */ g("td", {
							style: {
								padding: "var(--ds-3)",
								borderBottom: "1px solid var(--ds-line)"
							},
							children: /* @__PURE__ */ _("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "var(--ds-3)",
									justifyContent: e.numerica ? "flex-end" : "flex-start"
								},
								children: [t === 0 && /* @__PURE__ */ g(z, {
									circulo: !0,
									alto: 36
								}), /* @__PURE__ */ g(z, {
									alto: 11,
									ancho: t === 0 ? "58%" : e.numerica ? 46 : "72%"
								})]
							})
						}, e.clave))]
					}, `esq-${n}`)),
					!a && p === 0 && /* @__PURE__ */ g("tr", { children: /* @__PURE__ */ g("td", {
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
						return /* @__PURE__ */ _("tr", {
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
							children: [b && /* @__PURE__ */ g("td", {
								style: {
									padding: "var(--ds-3) var(--ds-2) var(--ds-3) var(--ds-3)",
									width: 36,
									verticalAlign: "middle",
									borderBottom: "1px solid var(--ds-line)"
								},
								children: /* @__PURE__ */ g(Et, {
									marcada: c,
									onCambio: () => E(o),
									etiqueta: s.etiqueta ? s.etiqueta(t) : "Elegir renglón"
								})
							}), e.map((e) => /* @__PURE__ */ g("td", {
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
		}), h && !a && /* @__PURE__ */ _("div", {
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
				/* @__PURE__ */ _("span", {
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
						p
					]
				}),
				/* @__PURE__ */ g("span", { style: { flex: 1 } }),
				/* @__PURE__ */ g(kt, {
					texto: "Anterior",
					hacia: "M15 18l-6-6 6-6",
					inactivo: u <= 1,
					onClick: () => d((e) => Math.max(1, e - 1))
				}),
				/* @__PURE__ */ _("span", {
					className: "ds-num",
					style: {
						fontSize: "var(--ds-t-small)",
						fontWeight: 700,
						color: "var(--ds-ink-2)"
					},
					children: [
						u,
						" / ",
						v
					]
				}),
				/* @__PURE__ */ g(kt, {
					texto: "Siguiente",
					hacia: "M9 18l6-6-6-6",
					inactivo: u >= v,
					derecha: !0,
					onClick: () => d((e) => Math.min(v, e + 1))
				})
			]
		})]
	});
}
function kt({ texto: e, hacia: t, inactivo: n, derecha: r, onClick: i }) {
	return /* @__PURE__ */ _("button", {
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
			fontWeight: 700,
			padding: "7px 13px",
			borderRadius: "var(--ds-r-item)",
			border: "1px solid var(--ds-line)",
			background: "var(--ds-surface)",
			color: n ? "var(--ds-ink-3)" : "var(--ds-ink)",
			opacity: n ? .45 : 1,
			cursor: n ? "not-allowed" : "pointer",
			transition: "background var(--ds-t-state) var(--ds-ease)"
		},
		children: [/* @__PURE__ */ g("svg", {
			width: "15",
			height: "15",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": !0,
			children: /* @__PURE__ */ g("path", { d: t })
		}), e]
	});
}
// src/primitivas/Formulario.jsx
function At(e) {
	return e.length <= 1 ? e[0] || "" : `${e.slice(0, -1).join(", ")} y ${e[e.length - 1]}`;
}
function jt({ titulo: e, nota: t, children: n, onCancelar: r, cancelarTexto: i = "Cancelar", accion: a, ancho: o = 820, problemas: s = [], refCuerpo: c }) {
	let { modo: l } = Ve(), u = l === "dock" ? 64 : 0;
	return /* @__PURE__ */ _("div", {
		style: {
			maxWidth: o,
			margin: "0 auto",
			paddingBottom: 96 + u
		},
		children: [
			/* @__PURE__ */ _("div", {
				style: {
					marginBottom: "var(--ds-6)",
					padding: "0 var(--ds-2)"
				},
				children: [/* @__PURE__ */ g("h1", {
					style: {
						margin: 0,
						fontSize: "var(--ds-t-display)",
						fontWeight: 800,
						letterSpacing: "-0.045em",
						lineHeight: 1.02,
						color: "var(--ds-ink)"
					},
					children: e
				}), t && /* @__PURE__ */ g("p", {
					style: {
						margin: "6px 0 0",
						fontSize: "var(--ds-t-body)",
						color: "var(--ds-ink-3)",
						maxWidth: 620
					},
					children: t
				})]
			}),
			s.length > 0 && /* @__PURE__ */ _("div", {
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
				children: [/* @__PURE__ */ _("svg", {
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
					children: [/* @__PURE__ */ g("circle", {
						cx: "12",
						cy: "12",
						r: "9"
					}), /* @__PURE__ */ g("path", { d: "M12 8v5M12 16h.01" })]
				}), /* @__PURE__ */ _("span", { children: [
					s.length === 1 ? /* @__PURE__ */ _(h, { children: [
						"Falta revisar ",
						/* @__PURE__ */ g("b", { children: s[0] }),
						"."
					] }) : /* @__PURE__ */ _(h, { children: [
						"Faltan ",
						s.length,
						" datos: ",
						/* @__PURE__ */ g("b", { children: At(s) }),
						"."
					] }),
					" ",
					"Cada campo dice abajo qué necesita."
				] })]
			}),
			/* @__PURE__ */ g(M, {
				entrada: 0,
				children: /* @__PURE__ */ g("div", {
					ref: c,
					children: n
				})
			}),
			/* @__PURE__ */ g("div", {
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
				children: /* @__PURE__ */ _("div", {
					style: {
						width: "100%",
						maxWidth: o,
						display: "flex",
						justifyContent: "flex-end",
						gap: "var(--ds-2)",
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ g(H, {
						variante: "fantasma",
						onClick: r,
						children: i
					}), a]
				})
			})
		]
	});
}
function Mt({ children: e, minimo: t = 220, estilo: n }) {
	return /* @__PURE__ */ g("div", {
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
var Nt = (e) => e == null || String(e).trim() === "", Pt = (e = "Este dato es obligatorio.") => (t) => Nt(t) ? e : null, Ft = (e, t) => (n) => !Nt(n) && String(n).trim().length > e ? t || `No puede pasar de ${e} caracteres; llevas ${String(n).trim().length}.` : null, It = (e, t) => (n) => !Nt(n) && String(n).trim().length < e ? t || `Necesita al menos ${e} caracteres.` : null, Lt = ({ desde: e = null, hasta: t = null, mensaje: n } = {}) => (r) => {
	if (Nt(r)) return null;
	let i = Number(String(r).replace(/,/g, ""));
	return Number.isNaN(i) ? n || "Tiene que ser un número." : e !== null && i < e ? n || `Tiene que ser un número mayor o igual a ${e}.` : t !== null && i > t ? n || `No puede pasar de ${t}.` : null;
}, Rt = (e, t, n) => (r) => {
	if (Nt(r)) return null;
	let i = String(r).replace(/\D/g, "").length;
	return i < e || i > t ? n || `Debe tener de ${e} a ${t} dígitos.` : null;
}, zt = (e, t) => (n) => !Nt(n) && !RegExp(`^\\d{${e}}$`).test(String(n).trim()) ? t || `Debe tener exactamente ${e} dígitos, sin espacios ni guiones.` : null, Bt = (e = "El correo debe llevar arroba y dominio, como nombre@dominio.com.") => (t) => !Nt(t) && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(t).trim()) ? e : null, Vt = (e, t) => (n) => !Nt(n) && !e.test(String(n).trim()) ? t : null, Ht = (e, t) => (n, r) => e(n, r) ? null : t;
function Ut(e) {
	let t = f(() => Object.fromEntries(Object.entries(e).map(([e, t]) => [e, t.valor ?? ""])), []), [n, r] = m(t), [i, a] = m({}), [o, c] = m(!1), l = p(null), u = f(() => {
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
	}, [n, e]), d = s((e) => (t) => {
		r((n) => ({
			...n,
			[e]: t
		}));
	}, []), h = s((e) => () => {
		a((t) => t[e] ? t : {
			...t,
			[e]: !0
		});
	}, []), g = s((t) => {
		let r = e[t] || {}, a = o || i[t];
		return {
			etiqueta: r.etiqueta,
			valor: n[t] ?? "",
			onCambio: d(t),
			onSalir: h(t),
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
		h
	]);
	return {
		valores: n,
		errores: u,
		problemas: f(() => o ? Object.keys(u).map((t) => e[t]?.etiqueta || t) : [], [
			o,
			u,
			e
		]),
		intentado: o,
		campo: g,
		poner: d,
		marcar: h,
		intentar: s((e) => (c(!0), Object.keys(u).length > 0 ? (requestAnimationFrame(() => {
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
		limpiar: s(() => {
			r(t), a({}), c(!1);
		}, [t]),
		cuerpo: l,
		setValores: r
	};
}
// src/filtros.js
var Wt = (e) => `ds-filtros:${e}`, Gt = (e) => {
	try {
		let t = sessionStorage.getItem(Wt(e));
		return t ? JSON.parse(t) : null;
	} catch {
		return null;
	}
}, Kt = (e, t) => {
	try {
		sessionStorage.setItem(Wt(e), JSON.stringify(t));
	} catch {}
};
function qt(e, t) {
	let n = p(t), [r, i] = m(() => {
		let t = Gt(e);
		if (!t) return { ...n.current };
		let r = { ...n.current };
		return Object.keys(n.current).forEach((e) => {
			t[e] !== void 0 && (r[e] = t[e]);
		}), r;
	});
	return l(() => {
		Kt(e, r);
	}, [e, r]), [
		r,
		s((e, t) => {
			i((n) => ({
				...n,
				[e]: t
			}));
		}, []),
		s(() => {
			i({ ...n.current });
		}, []),
		Object.keys(n.current).some((e) => String(r[e] ?? "") !== String(n.current[e] ?? "")),
		i
	];
}
// src/primitivas/Pestanas.jsx
function Jt({ pestanas: e = [], activa: t, onCambio: n, estilo: r }) {
	let i = p([]);
	return /* @__PURE__ */ g("div", {
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
			return /* @__PURE__ */ _("button", {
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
					fontWeight: 700,
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
					e.cuenta !== void 0 && /* @__PURE__ */ g("span", {
						className: "ds-num",
						style: {
							fontSize: "var(--ds-t-micro)",
							fontWeight: 800,
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
function Yt({ texto: e = "Cargando…", alto: t = 200 }) {
	return /* @__PURE__ */ _("div", {
		role: "status",
		style: {
			display: "grid",
			placeItems: "center",
			gap: "var(--ds-3)",
			minHeight: t,
			color: "var(--ds-ink-3)",
			fontSize: "var(--ds-t-small)"
		},
		children: [/* @__PURE__ */ g("svg", {
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
			children: /* @__PURE__ */ g("path", { d: "M12 3a9 9 0 019 9" })
		}), e]
	});
}
// src/PanelInicio.jsx
var Xt = /* @__PURE__ */ _("svg", {
	width: "17",
	height: "17",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	children: [/* @__PURE__ */ g("circle", {
		cx: "11",
		cy: "11",
		r: "7"
	}), /* @__PURE__ */ g("path", { d: "M20 20l-3.5-3.5" })]
}), Zt = /* @__PURE__ */ g("svg", {
	width: "16",
	height: "16",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: /* @__PURE__ */ g("path", { d: "M5 12h14M13 6l6 6-6 6" })
});
function Qt({ children: e }) {
	return /* @__PURE__ */ g("div", {
		style: {
			fontSize: "var(--ds-t-small)",
			fontWeight: 800,
			color: "var(--ds-ink-2)",
			letterSpacing: "-0.01em",
			margin: "0 0 var(--ds-3)"
		},
		children: e
	});
}
function $t({ item: e, onIr: t }) {
	let [n, r] = a.useState(!1), i = e.color || "var(--ds-ink-2)";
	return /* @__PURE__ */ _("button", {
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
			/* @__PURE__ */ g("span", {
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
				children: e.retrato ? /* @__PURE__ */ g("img", {
					src: e.retrato,
					alt: "",
					style: {
						width: "100%",
						height: "100%",
						objectFit: "cover"
					}
				}) : e.icono
			}),
			/* @__PURE__ */ _("span", {
				style: {
					minWidth: 0,
					flex: 1
				},
				children: [/* @__PURE__ */ g("span", {
					style: {
						display: "block",
						fontSize: "var(--ds-t-small)",
						fontWeight: 700,
						color: "var(--ds-ink)",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis"
					},
					children: e.texto
				}), e.subtitulo && /* @__PURE__ */ g("span", {
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
			/* @__PURE__ */ g("span", {
				style: {
					color: "var(--ds-ink-3)",
					opacity: +!!n,
					flexShrink: 0,
					transition: "opacity var(--ds-t-state) var(--ds-ease)"
				},
				children: Zt
			})
		]
	});
}
function en({ abierto: e, onCerrar: t, usuario: n, acciones: r, recientes: i = [], tituloRecientes: a = "Reciente", grupos: o = [], busqueda: c = "", onBusqueda: u, resultados: d = null, marcadorBusqueda: m = "Buscar…", onIr: v }) {
	let y = p(null), b = p(null);
	l(() => {
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
	let x = s((e) => {
		t?.(), (e.onIr || v)?.(e);
	}, [t, v]), S = c.trim().length > 0, C = S && d && d.length === 0, w = f(() => {
		let e = 0;
		return o.map((t) => t.items.map(() => e++));
	}, [o]);
	return e ? /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("div", {
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
	}), /* @__PURE__ */ _("div", {
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
			/* @__PURE__ */ _("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: "var(--ds-3)",
					padding: "var(--ds-4) var(--ds-5) var(--ds-3)"
				},
				children: [
					n,
					/* @__PURE__ */ g("div", { style: { flex: 1 } }),
					r
				]
			}),
			/* @__PURE__ */ g("div", {
				style: {
					flex: 1,
					minHeight: 0,
					overflowY: "auto",
					padding: "var(--ds-2) var(--ds-5) var(--ds-4)"
				},
				children: S ? /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g(Qt, { children: C ? "Sin coincidencias" : "Resultados" }), C ? /* @__PURE__ */ _("div", {
					style: {
						padding: "var(--ds-8) 0",
						textAlign: "center",
						color: "var(--ds-ink-3)",
						fontSize: "var(--ds-t-body)"
					},
					children: [
						"Nada coincide con «",
						c,
						"»."
					]
				}) : (d || []).map((e) => /* @__PURE__ */ g($t, {
					item: e,
					onIr: x
				}, e.id))] }) : /* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						gap: "var(--ds-5)",
						alignItems: "flex-start",
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ _("div", {
						style: {
							flex: "1 1 200px",
							minWidth: 190
						},
						children: [/* @__PURE__ */ g(Qt, { children: a }), i.length > 0 ? i.map((e) => /* @__PURE__ */ g($t, {
							item: e,
							onIr: x
						}, e.id)) : /* @__PURE__ */ g("div", {
							style: {
								padding: "var(--ds-3) 10px",
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-3)",
								lineHeight: 1.5
							},
							children: "Lo que vayas abriendo aparece aquí."
						})]
					}), /* @__PURE__ */ g("div", {
						style: {
							flex: "2 1 420px",
							minWidth: 280,
							display: "flex",
							flexDirection: "column",
							gap: "var(--ds-5)"
						},
						children: o.map((e, t) => /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g(Qt, { children: e.titulo }), /* @__PURE__ */ g("div", {
							style: {
								display: "grid",
								gap: "var(--ds-3)",
								gridTemplateColumns: "repeat(auto-fill, minmax(136px, 1fr))"
							},
							children: e.items.map((e, n) => /* @__PURE__ */ g(we, {
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
			/* @__PURE__ */ g("div", {
				style: { padding: "var(--ds-3) var(--ds-5) var(--ds-5)" },
				children: /* @__PURE__ */ _("div", {
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
						/* @__PURE__ */ g("span", {
							style: {
								color: "var(--ds-ink-3)",
								display: "grid",
								placeItems: "center"
							},
							children: Xt
						}),
						/* @__PURE__ */ g("input", {
							ref: y,
							value: c,
							onChange: (e) => u?.(e.target.value),
							placeholder: m,
							"aria-label": m,
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
						c && /* @__PURE__ */ g("button", {
							onClick: () => u?.(""),
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
							children: /* @__PURE__ */ g("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								children: /* @__PURE__ */ g("path", { d: "M18 6L6 18M6 6l12 12" })
							})
						})
					]
				})
			})
		]
	})] }) : null;
}
// src/formato.js
var tn = /* @__PURE__ */ b({
	SIN_DATO: () => "—",
	compacto: () => cn,
	configurarFormato: () => nn,
	fecha: () => q,
	fechaRelativa: () => dn,
	formatear: () => J,
	moneda: () => sn,
	numero: () => on,
	porcentaje: () => K,
	variacion: () => fn
}), G = {
	idioma: "es-MX",
	moneda: "MXN",
	zonaHoraria: void 0
};
function nn(e = {}) {
	G = {
		...G,
		...e
	};
}
var rn = "—", an = (e) => e == null || e === "" || Number.isNaN(Number(e));
function on(e, { decimales: t, minimo: n } = {}) {
	return an(e) ? "—" : new Intl.NumberFormat(G.idioma, {
		minimumFractionDigits: t ?? n ?? 0,
		maximumFractionDigits: t ?? 2
	}).format(Number(e));
}
function sn(e, { moneda: t = G.moneda, decimales: n = 2, compacto: r = !1 } = {}) {
	return an(e) ? "—" : r ? new Intl.NumberFormat(G.idioma, {
		style: "currency",
		currency: t,
		notation: "compact",
		maximumFractionDigits: 1
	}).format(Number(e)) : new Intl.NumberFormat(G.idioma, {
		style: "currency",
		currency: t,
		minimumFractionDigits: n,
		maximumFractionDigits: n
	}).format(Number(e));
}
function cn(e, { decimales: t = 1 } = {}) {
	return an(e) ? "—" : new Intl.NumberFormat(G.idioma, {
		notation: "compact",
		maximumFractionDigits: t
	}).format(Number(e));
}
function K(e, { decimales: t = 1, enPuntos: n = !1, signo: r = !1 } = {}) {
	if (an(e)) return "—";
	let i = n ? Number(e) / 100 : Number(e);
	return new Intl.NumberFormat(G.idioma, {
		style: "percent",
		minimumFractionDigits: 0,
		maximumFractionDigits: t,
		signDisplay: r ? "exceptZero" : "auto"
	}).format(i);
}
function ln(e) {
	if (e instanceof Date) return e;
	if (typeof e == "string" && /^\d{4}-\d{2}-\d{2}$/.test(e)) {
		let [t, n, r] = e.split("-").map(Number);
		return new Date(t, n - 1, r);
	}
	return new Date(e);
}
var un = {
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
function q(e, t = "media") {
	if (e == null || e === "") return "—";
	let n = ln(e);
	return Number.isNaN(n.getTime()) ? "—" : new Intl.DateTimeFormat(G.idioma, {
		...un[t] || un.media,
		timeZone: G.zonaHoraria
	}).format(n).replace(/\.$/, "");
}
function dn(e, t = /* @__PURE__ */ new Date()) {
	if (e == null || e === "") return "—";
	let n = ln(e);
	if (Number.isNaN(n.getTime())) return "—";
	let r = (n.getTime() - t.getTime()) / 1e3, i = new Intl.RelativeTimeFormat(G.idioma, { numeric: "auto" });
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
function fn(e, t) {
	return an(e) || an(t) || Number(t) === 0 ? null : (Number(e) - Number(t)) / Math.abs(Number(t));
}
function J(e, t = "numero", n) {
	if (typeof t == "function") return t(e);
	switch (t) {
		case "moneda": return sn(e, n);
		case "monedaCompacta": return sn(e, {
			...n,
			compacto: !0
		});
		case "compacto": return cn(e, n);
		case "porcentaje": return K(e, n);
		case "texto": return e == null || e === "" ? "—" : String(e);
		default: return on(e, n);
	}
}
// src/primitivas/Variacion.jsx
function pn({ valor: e, sentido: t = "sube", contra: n, decimales: r = 1, enPuntos: i = !1, tamano: a = "s", estilo: o }) {
	let s = e == null || Number.isNaN(Number(e)), c = s ? 0 : Number(e), l = s || c === 0 ? 0 : c > 0 ? 1 : -1, u = t === "neutro" || l === 0 ? null : t === "sube" ? l > 0 : l < 0, d = u === null ? "var(--ds-ink-2)" : u ? "var(--ds-ok)" : "var(--ds-risk)", f = u === null ? "var(--ds-surface-sunk)" : u ? "var(--ds-ok-soft)" : "var(--ds-risk-soft)", p = l > 0 ? "▲" : l < 0 ? "▼" : "●", m = a === "m" ? "var(--ds-t-small)" : "var(--ds-t-micro)";
	if (s) return /* @__PURE__ */ g("span", {
		style: {
			fontSize: m,
			fontWeight: 600,
			color: "var(--ds-ink-3)",
			...o
		},
		children: "Sin comparativo"
	});
	let h = i ? `${c > 0 ? "+" : ""}${c.toFixed(r)} pts` : K(c, {
		decimales: r,
		signo: !0
	});
	return /* @__PURE__ */ _("span", {
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 6,
			flexWrap: "wrap",
			...o
		},
		children: [/* @__PURE__ */ _("span", {
			className: "ds-num",
			style: {
				display: "inline-flex",
				alignItems: "center",
				gap: 4,
				background: f,
				color: d,
				fontSize: m,
				fontWeight: 800,
				padding: "2px 8px",
				borderRadius: "var(--ds-r-pill)",
				whiteSpace: "nowrap"
			},
			"aria-label": `${l > 0 ? "Sube" : l < 0 ? "Baja" : "Sin cambio"} ${h}${u === null ? "" : u ? ", favorable" : ", desfavorable"}`,
			children: [/* @__PURE__ */ g("span", {
				"aria-hidden": "true",
				style: { fontSize: "0.8em" },
				children: p
			}), h]
		}), n && /* @__PURE__ */ g("span", {
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
var mn = [
	1,
	2,
	3,
	4,
	5,
	6
].map((e) => `var(--ds-serie-${e})`), Y = (e, t) => e?.color || mn[t % mn.length];
function hn() {
	let [e, t] = m(0), n = p(null);
	return [s((e) => {
		n.current &&= (n.current.disconnect(), null), e && (t(e.getBoundingClientRect().width), typeof ResizeObserver < "u" && (n.current = new ResizeObserver(([e]) => t(e.contentRect.width)), n.current.observe(e)));
	}, []), e];
}
function gn(e, t, n = 4) {
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
var _n = (e, t, n, r) => (i) => t === e ? (n + r) / 2 : n + (i - e) / (t - e) * (r - n), X = {
	fontSize: 11,
	fontWeight: 600,
	fill: "var(--ds-ink-3)",
	fontFamily: "var(--ds-font)",
	fontVariantNumeric: "tabular-nums"
};
function vn({ color: e, forma: t = "cuadro" }) {
	let n = {
		flexShrink: 0,
		background: e
	};
	return t === "linea" ? /* @__PURE__ */ g("span", { style: {
		...n,
		width: 14,
		height: 3,
		borderRadius: "var(--ds-r-mini)"
	} }) : /* @__PURE__ */ g("span", { style: {
		...n,
		width: 10,
		height: 10,
		borderRadius: "var(--ds-r-mini)"
	} });
}
function yn({ series: e = [], forma: t, valores: n, estilo: r }) {
	return e.length < 2 ? null : /* @__PURE__ */ g("div", {
		role: "list",
		style: {
			display: "flex",
			flexWrap: "wrap",
			gap: "6px 16px",
			marginBottom: "var(--ds-3)",
			...r
		},
		children: e.map((e, r) => /* @__PURE__ */ _("span", {
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
				/* @__PURE__ */ g(vn, {
					color: Y(e, r),
					forma: t
				}),
				e.nombre,
				n && n[r] !== void 0 && /* @__PURE__ */ g("span", {
					className: "ds-num",
					style: {
						color: "var(--ds-ink)",
						fontWeight: 700
					},
					children: n[r]
				})
			]
		}, e.clave ?? e.nombre ?? r))
	});
}
function bn({ x: e, y: t, ancho: n, titulo: r, renglones: i = [], visible: a }) {
	let o = p(null), [s, c] = m({
		w: 160,
		h: 60
	});
	if (l(() => {
		if (o.current) {
			let e = o.current.getBoundingClientRect();
			(Math.abs(e.width - s.w) > 1 || Math.abs(e.height - s.h) > 1) && c({
				w: e.width,
				h: e.height
			});
		}
	}), !a) return null;
	let u = e + 12 + s.w > n ? e - 12 - s.w : e + 12, d = Math.max(0, t - s.h / 2);
	return /* @__PURE__ */ _("div", {
		ref: o,
		role: "status",
		style: {
			position: "absolute",
			left: Math.max(0, u),
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
		children: [r && /* @__PURE__ */ g("div", {
			style: {
				fontSize: "var(--ds-t-micro)",
				fontWeight: 700,
				color: "var(--ds-ink-3)",
				letterSpacing: "0.04em",
				textTransform: "uppercase",
				marginBottom: 6
			},
			children: r
		}), i.map((e, t) => /* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 8,
				fontSize: "var(--ds-t-small)",
				lineHeight: 1.6
			},
			children: [
				e.color && /* @__PURE__ */ g(vn, { color: e.color }),
				/* @__PURE__ */ g("span", {
					style: {
						color: "var(--ds-ink-2)",
						fontWeight: 600,
						flex: 1,
						minWidth: 0
					},
					children: e.nombre
				}),
				/* @__PURE__ */ g("span", {
					className: "ds-num",
					style: {
						color: "var(--ds-ink)",
						fontWeight: 800
					},
					children: e.valor
				})
			]
		}, t))]
	});
}
function xn({ columnas: e, filas: t }) {
	return /* @__PURE__ */ g("div", {
		style: { overflowX: "auto" },
		children: /* @__PURE__ */ _("table", {
			style: {
				width: "100%",
				borderCollapse: "collapse",
				fontFamily: "var(--ds-font)",
				fontSize: "var(--ds-t-small)"
			},
			children: [/* @__PURE__ */ g("thead", { children: /* @__PURE__ */ g("tr", { children: e.map((e, t) => /* @__PURE__ */ g("th", {
				scope: "col",
				style: {
					textAlign: t === 0 ? "left" : "right",
					padding: "6px 8px",
					color: "var(--ds-ink-3)",
					fontWeight: 700,
					fontSize: "var(--ds-t-micro)",
					textTransform: "uppercase",
					letterSpacing: "0.05em",
					borderBottom: "1px solid var(--ds-line)",
					whiteSpace: "nowrap"
				},
				children: e
			}, t)) }) }), /* @__PURE__ */ g("tbody", { children: t.map((e, t) => /* @__PURE__ */ g("tr", { children: e.map((e, t) => /* @__PURE__ */ g("td", {
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
function Z({ titulo: e, series: t, formaLeyenda: n, tabla: r, children: i, estilo: a, alto: o }) {
	let [s, c] = m(!1);
	return /* @__PURE__ */ _("figure", {
		style: {
			margin: 0,
			minWidth: 0,
			...a
		},
		"aria-label": e,
		children: [(t?.length > 1 || r) && /* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				alignItems: "flex-start",
				gap: "var(--ds-3)"
			},
			children: [/* @__PURE__ */ g("div", {
				style: {
					flex: 1,
					minWidth: 0
				},
				children: !s && /* @__PURE__ */ g(yn, {
					series: t || [],
					forma: n
				})
			}), r && /* @__PURE__ */ g("button", {
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
					fontWeight: 700,
					padding: "4px 10px",
					borderRadius: "var(--ds-r-pill)",
					marginBottom: "var(--ds-3)"
				},
				children: s ? "Ver gráfica" : "Ver tabla"
			})]
		}), s && r ? /* @__PURE__ */ g("div", {
			style: { minHeight: o },
			children: /* @__PURE__ */ g(xn, { ...r })
		}) : i]
	});
}
var Sn = {
	position: "absolute",
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0 0 0 0)",
	whiteSpace: "nowrap",
	border: 0
}, Q = (e, t, n) => J(e, t, n);
function $({ alto: e = 160, texto: t = "Sin datos para este periodo." }) {
	return /* @__PURE__ */ g("div", {
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
function Cn({ datos: e = [], alto: t = 40, color: n = "var(--ds-accent-trazo)", area: r = !0, formato: i = "numero", etiquetas: o, estilo: s }) {
	let [c, l] = hn(), [u, d] = m(null), f = e.map((e) => typeof e == "object" && e ? e.valor : e), p = f.filter((e) => e != null && Number.isFinite(Number(e))), h = Math.min(...p), v = Math.max(...p), y = Math.max(0, l), b = (e) => f.length <= 1 ? y / 2 : 4 + e / (f.length - 1) * (y - 8), x = (e) => v === h ? t / 2 : 4 + (1 - (e - h) / (v - h)) * (t - 8), S = [], C = [];
	f.forEach((e, t) => {
		e == null || !Number.isFinite(Number(e)) ? (C.length && S.push(C), C = []) : C.push([b(t), x(Number(e))]);
	}), C.length && S.push(C);
	let w = [...f].reverse().findIndex((e) => e != null), T = w === -1 ? -1 : f.length - 1 - w, E = a.useId().replace(/:/g, "");
	return /* @__PURE__ */ _("div", {
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
		children: [y > 0 && p.length > 0 && /* @__PURE__ */ _("svg", {
			width: y,
			height: t,
			role: "img",
			style: {
				display: "block",
				overflow: "visible"
			},
			"aria-label": `Tendencia de ${f.length} puntos, último ${Q(f[T], i)}`,
			children: [
				/* @__PURE__ */ g("defs", { children: /* @__PURE__ */ _("linearGradient", {
					id: `sp${E}`,
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ g("stop", {
						offset: "0%",
						stopColor: n,
						stopOpacity: "0.22"
					}), /* @__PURE__ */ g("stop", {
						offset: "100%",
						stopColor: n,
						stopOpacity: "0"
					})]
				}) }),
				r && S.map((e, n) => e.length > 1 && /* @__PURE__ */ g("path", {
					fill: `url(#sp${E})`,
					d: `M${e[0][0]},${t} ${e.map((e) => `L${e[0]},${e[1]}`).join(" ")} L${e[e.length - 1][0]},${t} Z`
				}, `a${n}`)),
				S.map((e, t) => /* @__PURE__ */ g("path", {
					fill: "none",
					stroke: n,
					strokeWidth: "2",
					strokeLinejoin: "round",
					strokeLinecap: "round",
					d: e.map((e, t) => `${t ? "L" : "M"}${e[0]},${e[1]}`).join(" ")
				}, `l${t}`)),
				T >= 0 && /* @__PURE__ */ g("circle", {
					cx: b(T),
					cy: x(Number(f[T])),
					r: "3.5",
					fill: n,
					stroke: "var(--ds-surface-solid)",
					strokeWidth: "2"
				}),
				u !== null && f[u] !== null && f[u] !== void 0 && /* @__PURE__ */ _("g", { children: [/* @__PURE__ */ g("line", {
					x1: b(u),
					x2: b(u),
					y1: 0,
					y2: t,
					stroke: "var(--ds-eje)",
					strokeWidth: "1"
				}), /* @__PURE__ */ g("circle", {
					cx: b(u),
					cy: x(Number(f[u])),
					r: "4",
					fill: n,
					stroke: "var(--ds-surface-solid)",
					strokeWidth: "2"
				})] })
			]
		}), u !== null && /* @__PURE__ */ _("div", {
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
				fontWeight: 800,
				color: "var(--ds-ink)",
				whiteSpace: "nowrap",
				boxShadow: "var(--ds-lift-2)",
				zIndex: 2
			},
			children: [o?.[u] ? `${o[u]} · ` : "", Q(f[u], i)]
		})]
	});
}
// src/primitivas/TarjetaKpi.jsx
var wn = {
	ok: "Bien",
	aviso: "Atención",
	riesgo: "En riesgo"
}, Tn = (e) => e == null || e === "";
function En({ etiqueta: e, valor: t, formato: n = "numero", opcionesFormato: r, variacion: i, sentido: a = "sube", contra: o, enPuntos: s, serie: c, colorSerie: l, nota: u, icono: d, estado: f, textoEstado: p, compacta: m = !1, cargando: h = !1 }) {
	if (h) return /* @__PURE__ */ _("div", {
		"aria-busy": "true",
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 10
		},
		children: [
			/* @__PURE__ */ g(z, {
				alto: 10,
				ancho: "46%"
			}),
			/* @__PURE__ */ g(z, {
				alto: m ? 24 : 34,
				ancho: "62%",
				radio: 9
			}),
			/* @__PURE__ */ g(z, {
				alto: 10,
				ancho: "38%"
			}),
			c && !m && /* @__PURE__ */ g(z, {
				alto: 40,
				radio: 9
			})
		]
	});
	let v = Tn(t), y = v ? "—" : typeof t == "number" || !Number.isNaN(Number(t)) ? J(t, n, r) : t;
	return /* @__PURE__ */ _("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			minWidth: 0,
			height: "100%"
		},
		children: [
			/* @__PURE__ */ _("div", {
				style: {
					display: "flex",
					alignItems: "flex-start",
					gap: 8,
					minWidth: 0
				},
				children: [
					/* @__PURE__ */ g("div", {
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
					f && wn[f] && /* @__PURE__ */ g(se, {
						tono: f,
						children: p || wn[f]
					}),
					d && !f && /* @__PURE__ */ g("span", {
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
			/* @__PURE__ */ g("div", {
				style: ge,
				children: /* @__PURE__ */ g("div", {
					className: "ds-num",
					style: {
						fontSize: _e(m ? "var(--ds-num-m)" : "var(--ds-num-l)", y),
						fontWeight: 800,
						lineHeight: 1.05,
						letterSpacing: "-0.035em",
						marginTop: m ? 4 : 6,
						color: v ? "var(--ds-ink-3)" : "var(--ds-ink)",
						whiteSpace: "nowrap"
					},
					children: y
				})
			}),
			(i !== void 0 || o || u || v) && /* @__PURE__ */ _("div", {
				style: {
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					gap: "4px 8px",
					marginTop: m ? 6 : 8
				},
				children: [i !== void 0 && !v && /* @__PURE__ */ g(pn, {
					valor: i,
					sentido: a,
					contra: o,
					enPuntos: s
				}), (u || v) && /* @__PURE__ */ g("span", {
					style: {
						fontSize: "var(--ds-t-small)",
						color: "var(--ds-ink-3)"
					},
					children: v ? u || "Sin dato" : u
				})]
			}),
			c && !m && /* @__PURE__ */ g("div", {
				style: {
					marginTop: "auto",
					paddingTop: "var(--ds-4)"
				},
				children: /* @__PURE__ */ g(Cn, {
					datos: c,
					alto: 40,
					formato: n,
					color: l
				})
			})
		]
	});
}
function Dn({ onClick: e, href: t, estilo: n, entrada: r, relleno: i, ...a }) {
	let o = !!(e || t), s = /* @__PURE__ */ g(En, { ...a }), c = i ?? (a.compacta ? "var(--ds-4)" : "var(--ds-5)");
	return t ? /* @__PURE__ */ g("a", {
		href: t,
		onClick: e,
		style: {
			textDecoration: "none",
			color: "inherit",
			display: "block",
			height: "100%",
			borderRadius: "var(--ds-r-card)"
		},
		children: /* @__PURE__ */ g(M, {
			interactiva: !0,
			relleno: c,
			entrada: r,
			estilo: {
				height: "100%",
				...n
			},
			children: s
		})
	}) : /* @__PURE__ */ g(M, {
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
function On({ indicadores: e = [], cargando: t = !1, estilo: n, entrada: r }) {
	let i = U(), a = Math.max(1, e.length), o = i ? Math.min(2, a) : a;
	return /* @__PURE__ */ g(M, {
		relleno: "0",
		entrada: r,
		estilo: {
			overflow: "hidden",
			...n
		},
		children: /* @__PURE__ */ g("div", {
			role: "list",
			style: {
				display: "grid",
				gridTemplateColumns: `repeat(${o}, minmax(0, 1fr))`
			},
			children: e.map((e, n) => {
				let r = n % o, i = Math.floor(n / o);
				return /* @__PURE__ */ g("div", {
					role: "listitem",
					style: {
						padding: "var(--ds-4) var(--ds-5)",
						minWidth: 0,
						borderLeft: r > 0 ? "1px solid var(--ds-line)" : "none",
						borderTop: i > 0 ? "1px solid var(--ds-line)" : "none"
					},
					children: /* @__PURE__ */ g(En, {
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
var kn = {
	ok: "Va a la meta",
	aviso: "Cerca de la meta",
	riesgo: "Debajo de la meta"
}, An = {
	ok: "Dentro del tope",
	aviso: "Cerca del tope",
	riesgo: "Rebasa el tope"
};
function jn({ titulo: e, logrado: t, meta: n, formato: r = "numero", opcionesFormato: i, diaActual: a, diasPeriodo: o, invertida: s = !1, forma: c = "barra", nota: l, cargando: u = !1, estilo: d, entrada: f }) {
	let p = (e) => J(e, r, i), m = Number.isFinite(Number(t)) && Number(n) > 0, v = m ? Number(t) / Number(n) : null, y = m && Number(a) > 0 && Number(o) > 0, b = y ? Number(t) / Number(a) * Number(o) : null, x = y ? b / Number(n) : v, S = "acento";
	x !== null && (S = s ? x <= .9 ? "ok" : x <= 1 ? "aviso" : "riesgo" : x >= 1 ? "ok" : x >= .9 ? "aviso" : "riesgo");
	let C = s ? An : kn, w = {
		ok: "var(--ds-ok)",
		aviso: "var(--ds-warn)",
		riesgo: "var(--ds-risk)",
		acento: "var(--ds-accent-trazo)"
	}[S];
	return /* @__PURE__ */ g(M, {
		entrada: f,
		estilo: {
			height: "100%",
			...d
		},
		children: u ? /* @__PURE__ */ _("div", {
			"aria-busy": "true",
			style: {
				display: "flex",
				flexDirection: "column",
				gap: 10
			},
			children: [
				/* @__PURE__ */ g(z, {
					alto: 10,
					ancho: "50%"
				}),
				/* @__PURE__ */ g(z, {
					alto: 34,
					ancho: "60%",
					radio: 9
				}),
				/* @__PURE__ */ g(z, {
					alto: 8,
					radio: 99
				}),
				/* @__PURE__ */ g(z, {
					alto: 10,
					ancho: "70%"
				})
			]
		}) : /* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				flexDirection: "column",
				gap: "var(--ds-3)"
			},
			children: [
				/* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						alignItems: "flex-start",
						gap: 8
					},
					children: [/* @__PURE__ */ g("div", {
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
					}), x !== null && /* @__PURE__ */ g(se, {
						tono: S,
						children: C[S]
					})]
				}),
				m ? c === "anillo" ? /* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "var(--ds-5)",
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ g(re, {
						valor: Math.min(100, v * 100),
						tamano: 112,
						grosor: 9,
						tono: w,
						children: /* @__PURE__ */ g("span", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-num-m)",
								fontWeight: 800,
								letterSpacing: "-0.03em"
							},
							children: K(v, { decimales: 0 })
						})
					}), /* @__PURE__ */ _("div", {
						style: { minWidth: 0 },
						children: [/* @__PURE__ */ g("div", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-num-m)",
								fontWeight: 800,
								letterSpacing: "-0.03em"
							},
							children: p(t)
						}), /* @__PURE__ */ _("div", {
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-3)"
							},
							children: ["de ", /* @__PURE__ */ g("span", {
								className: "ds-num",
								style: {
									fontWeight: 700,
									color: "var(--ds-ink-2)"
								},
								children: p(n)
							})]
						})]
					})]
				}) : /* @__PURE__ */ _(h, { children: [
					/* @__PURE__ */ _("div", {
						style: {
							display: "flex",
							alignItems: "baseline",
							gap: 8,
							flexWrap: "wrap"
						},
						children: [/* @__PURE__ */ g("span", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-num-l)",
								fontWeight: 800,
								letterSpacing: "-0.035em",
								lineHeight: 1.05
							},
							children: p(t)
						}), /* @__PURE__ */ _("span", {
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-3)"
							},
							children: ["de ", /* @__PURE__ */ g("span", {
								className: "ds-num",
								style: {
									fontWeight: 700,
									color: "var(--ds-ink-2)"
								},
								children: p(n)
							})]
						})]
					}),
					/* @__PURE__ */ g(R, {
						valor: Number(t),
						total: Number(n),
						tono: S,
						alto: 8,
						etiqueta: `${e}: ${K(v)} de la meta`
					}),
					/* @__PURE__ */ _("div", {
						className: "ds-num",
						style: {
							fontSize: "var(--ds-t-small)",
							fontWeight: 700,
							color: "var(--ds-ink-2)"
						},
						children: [K(v), " de la meta"]
					})
				] }) : /* @__PURE__ */ g("div", {
					style: {
						fontSize: "var(--ds-t-small)",
						color: "var(--ds-ink-3)"
					},
					children: Number(n) > 0 ? "Sin dato de avance." : "Sin meta capturada para este periodo."
				}),
				y && /* @__PURE__ */ _("div", {
					style: {
						fontSize: "var(--ds-t-small)",
						color: "var(--ds-ink-2)",
						lineHeight: 1.45
					},
					children: [
						"Al ritmo actual cierras en",
						" ",
						/* @__PURE__ */ g("strong", {
							className: "ds-num",
							style: { color: "var(--ds-ink)" },
							children: p(b)
						}),
						" ",
						"(",
						/* @__PURE__ */ g("span", {
							className: "ds-num",
							children: K(b / Number(n))
						}),
						" ",
						s ? "del tope" : "de la meta",
						").",
						/* @__PURE__ */ _("span", {
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
				l && /* @__PURE__ */ g("div", {
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
function Mn({ titulo: e, valores: t = [], formato: n = "numero", opcionesFormato: r, sentido: i = "sube", nota: a, cargando: o = !1, estilo: s, entrada: c }) {
	let l = U(520), u = t.slice(0, 3), d = u[0];
	return /* @__PURE__ */ _(M, {
		entrada: c,
		estilo: {
			height: "100%",
			...s
		},
		children: [
			e && /* @__PURE__ */ g("div", {
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
			/* @__PURE__ */ g("div", {
				style: {
					display: "grid",
					gap: l ? "var(--ds-3)" : 0,
					gridTemplateColumns: l ? "1fr" : `repeat(${Math.max(1, u.length)}, minmax(0, 1fr))`
				},
				children: u.map((e, t) => {
					let a = t > 0 && d ? fn(d.valor, e.valor) : void 0;
					return /* @__PURE__ */ _("div", {
						style: {
							minWidth: 0,
							paddingLeft: !l && t > 0 ? "var(--ds-4)" : 0,
							paddingRight: !l && t < u.length - 1 ? "var(--ds-4)" : 0,
							borderLeft: !l && t > 0 ? "1px solid var(--ds-line)" : "none",
							paddingTop: l && t > 0 ? "var(--ds-3)" : 0,
							borderTop: l && t > 0 ? "1px solid var(--ds-line)" : "none"
						},
						children: [
							/* @__PURE__ */ g("div", {
								style: {
									fontSize: "var(--ds-t-small)",
									fontWeight: 700,
									color: t === 0 ? "var(--ds-ink-2)" : "var(--ds-ink-3)"
								},
								children: e.etiqueta
							}),
							o ? /* @__PURE__ */ g(z, {
								alto: t === 0 ? 30 : 22,
								ancho: "70%",
								radio: 8,
								estilo: { marginTop: 6 }
							}) : /* @__PURE__ */ g("div", {
								style: ge,
								children: /* @__PURE__ */ g("div", {
									className: "ds-num",
									style: {
										fontSize: _e(t === 0 ? "var(--ds-num-m)" : "var(--ds-num-s)", J(e.valor, n, r)),
										fontWeight: 800,
										letterSpacing: "-0.03em",
										lineHeight: 1.15,
										marginTop: 4,
										color: e.valor === null || e.valor === void 0 ? "var(--ds-ink-3)" : t === 0 ? "var(--ds-ink)" : "var(--ds-ink-2)",
										whiteSpace: "nowrap"
									},
									children: J(e.valor, n, r)
								})
							}),
							t > 0 && !o && /* @__PURE__ */ g("div", {
								style: { marginTop: 6 },
								children: /* @__PURE__ */ g(pn, {
									valor: a,
									sentido: i,
									contra: a === null ? void 0 : `${d.etiqueta || "Base"} vs ${(e.etiqueta || "referencia").toLowerCase()}`
								})
							})
						]
					}, e.etiqueta ?? t);
				})
			}),
			a && /* @__PURE__ */ g("div", {
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
function Nn({ titulo: e, nota: t, elementos: n = [], formato: r = "numero", opcionesFormato: i, limite: a = 5, participacion: o = !1, total: s, accion: c, onElemento: l, vacio: u = "Sin movimientos en este periodo.", cargando: d = !1, estilo: f, entrada: p }) {
	let m = n.slice(0, a), h = Math.max(0, ...m.map((e) => Number(e.valor) || 0)), v = Number(s) > 0 ? Number(s) : n.reduce((e, t) => e + (Number(t.valor) || 0), 0);
	return /* @__PURE__ */ g(M, {
		entrada: p,
		estilo: {
			height: "100%",
			...f
		},
		children: /* @__PURE__ */ g(me, {
			titulo: e,
			nota: t,
			accion: c,
			children: d ? /* @__PURE__ */ g("div", {
				"aria-busy": "true",
				style: {
					display: "flex",
					flexDirection: "column",
					gap: 14
				},
				children: Array.from({ length: Math.min(a, 5) }, (e, t) => /* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 6,
						opacity: 1 - t * .12
					},
					children: [/* @__PURE__ */ _("div", {
						style: {
							display: "flex",
							gap: 10
						},
						children: [/* @__PURE__ */ g(z, {
							alto: 12,
							ancho: `${50 - t * 5}%`
						}), /* @__PURE__ */ g(z, {
							alto: 12,
							ancho: 70,
							estilo: { marginLeft: "auto" }
						})]
					}), /* @__PURE__ */ g(z, {
						alto: 4,
						radio: 99,
						ancho: `${90 - t * 14}%`
					})]
				}, t))
			}) : m.length === 0 ? /* @__PURE__ */ g("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					color: "var(--ds-ink-3)",
					padding: "var(--ds-4) 0"
				},
				children: u
			}) : /* @__PURE__ */ g("ol", {
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
					return /* @__PURE__ */ g("li", { children: /* @__PURE__ */ _("div", {
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
							/* @__PURE__ */ g("span", {
								className: "ds-num",
								style: {
									fontSize: "var(--ds-t-small)",
									fontWeight: 800,
									color: "var(--ds-ink-3)"
								},
								children: t + 1
							}),
							/* @__PURE__ */ _("div", {
								style: { minWidth: 0 },
								children: [/* @__PURE__ */ g("div", {
									style: {
										fontWeight: 700,
										color: "var(--ds-ink)",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis"
									},
									children: e.nombre
								}), e.subtitulo && /* @__PURE__ */ g("div", {
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
							/* @__PURE__ */ _("div", {
								style: { textAlign: "right" },
								children: [/* @__PURE__ */ g("div", {
									className: "ds-num",
									style: {
										fontWeight: 800,
										color: "var(--ds-ink)"
									},
									children: J(e.valor, r, i)
								}), o && v > 0 && /* @__PURE__ */ _("div", {
									className: "ds-num",
									style: {
										fontSize: "var(--ds-t-micro)",
										fontWeight: 700,
										color: "var(--ds-ink-3)"
									},
									children: [K(n / v), " del total"]
								})]
							}),
							/* @__PURE__ */ g("div", {
								"aria-hidden": !0,
								style: {
									gridColumn: "2 / 4",
									height: 4,
									borderRadius: 99,
									background: "var(--ds-surface-sunk)",
									overflow: "hidden"
								},
								children: /* @__PURE__ */ g("div", { style: {
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
var Pn = (e) => e == null || e === "";
function Fn({ nombre: e, subtitulo: t, imagen: n, estado: r, metricas: i = [], acciones: a, onClick: o, cargando: s = !1, estilo: c, entrada: l }) {
	let u = !!o, d = i.slice(0, 4);
	return /* @__PURE__ */ _(M, {
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
			/* @__PURE__ */ _("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: "var(--ds-3)",
					minWidth: 0
				},
				children: [
					s ? /* @__PURE__ */ g(z, {
						circulo: !0,
						alto: 48
					}) : /* @__PURE__ */ g(pe, {
						src: n,
						nombre: e || "",
						tamano: 48
					}),
					/* @__PURE__ */ g("div", {
						style: {
							flex: 1,
							minWidth: 0
						},
						children: s ? /* @__PURE__ */ _("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: 7
							},
							children: [/* @__PURE__ */ g(z, {
								alto: 13,
								ancho: "60%"
							}), /* @__PURE__ */ g(z, {
								alto: 10,
								ancho: "40%"
							})]
						}) : /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("div", {
							style: {
								fontWeight: 800,
								fontSize: "var(--ds-t-body)",
								letterSpacing: "-0.02em",
								color: "var(--ds-ink)",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis"
							},
							children: e
						}), t && /* @__PURE__ */ g("div", {
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
					r && !s && /* @__PURE__ */ g(se, {
						tono: r.tono,
						children: r.texto
					})
				]
			}),
			d.length > 0 && /* @__PURE__ */ g("div", {
				style: {
					display: "grid",
					gap: "var(--ds-3)",
					gridTemplateColumns: `repeat(${Math.min(2, d.length)}, minmax(0, 1fr))`,
					padding: "var(--ds-3)",
					borderRadius: "var(--ds-r-item)",
					background: "var(--ds-surface-sunk)"
				},
				children: d.map((e, t) => /* @__PURE__ */ _("div", {
					style: { minWidth: 0 },
					children: [/* @__PURE__ */ g("div", {
						style: {
							fontSize: "var(--ds-t-micro)",
							fontWeight: 600,
							letterSpacing: "0.05em",
							textTransform: "uppercase",
							color: "var(--ds-ink-3)"
						},
						children: e.etiqueta
					}), s ? /* @__PURE__ */ g(z, {
						alto: 16,
						ancho: "70%",
						estilo: { marginTop: 5 }
					}) : Pn(e.valor) ? /* @__PURE__ */ g("div", {
						style: { marginTop: 4 },
						children: /* @__PURE__ */ g(se, {
							tono: "aviso",
							children: "Sin capturar"
						})
					}) : /* @__PURE__ */ g("div", {
						className: "ds-num",
						style: {
							fontWeight: 800,
							color: "var(--ds-ink)",
							marginTop: 2,
							overflowWrap: "anywhere"
						},
						children: J(e.valor, e.formato || "texto", e.opciones)
					})]
				}, e.etiqueta ?? t))
			}),
			a && /* @__PURE__ */ g("div", {
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
var In = (e) => e == null || e === "";
function Ln({ texto: e, etiqueta: t }) {
	let [n, r] = m(!1);
	return /* @__PURE__ */ g("button", {
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
			fontWeight: 700,
			padding: "2px 8px",
			borderRadius: "var(--ds-r-pill)",
			flexShrink: 0
		},
		children: /* @__PURE__ */ g("span", {
			"aria-live": "polite",
			children: n ? "Copiado" : "Copiar"
		})
	});
}
function Rn({ elementos: e = [], columnas: t = 2, estilo: n }) {
	let r = U(560) ? 1 : Math.max(1, Math.min(3, t));
	return /* @__PURE__ */ g("dl", {
		style: {
			margin: 0,
			display: "grid",
			gridTemplateColumns: `repeat(${r}, minmax(0, 1fr))`,
			columnGap: "var(--ds-6)",
			rowGap: "var(--ds-4)",
			...n
		},
		children: e.map((e, t) => {
			let n = In(e.valor), i = n ? null : a.isValidElement(e.valor) ? e.valor : J(e.valor, e.formato || "texto", e.opciones);
			return /* @__PURE__ */ _("div", {
				style: {
					minWidth: 0,
					gridColumn: `span ${Math.min(r, e.ancho || 1)}`
				},
				children: [/* @__PURE__ */ g("dt", {
					style: {
						fontSize: "var(--ds-t-micro)",
						fontWeight: 600,
						letterSpacing: "0.05em",
						textTransform: "uppercase",
						color: "var(--ds-ink-3)"
					},
					children: e.etiqueta
				}), /* @__PURE__ */ g("dd", {
					style: {
						margin: "4px 0 0",
						display: "flex",
						alignItems: "center",
						gap: 8,
						minWidth: 0
					},
					children: n ? /* @__PURE__ */ g(se, {
						tono: "aviso",
						children: "Sin capturar"
					}) : /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("span", {
						className: e.formato && e.formato !== "texto" ? "ds-num" : void 0,
						style: {
							fontWeight: 700,
							color: "var(--ds-ink)",
							overflowWrap: "anywhere",
							minWidth: 0
						},
						children: i
					}), e.copiable && /* @__PURE__ */ g(Ln, {
						texto: e.valor,
						etiqueta: e.etiqueta
					})] })
				})]
			}, e.etiqueta ?? t);
		})
	});
}
// src/primitivas/Llamado.jsx
var zn = {
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
function Bn({ tono: e = "info", titulo: t, children: n, acciones: r, icono: i, onCerrar: a, estilo: o }) {
	let [s, c, l] = zn[e] || zn.info;
	return /* @__PURE__ */ _("div", {
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
			/* @__PURE__ */ g("span", {
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
					fontWeight: 800,
					fontSize: 13,
					marginTop: 1
				},
				children: i || l
			}),
			/* @__PURE__ */ _("div", {
				style: {
					flex: 1,
					minWidth: 0
				},
				children: [
					t && /* @__PURE__ */ g("div", {
						style: {
							fontWeight: 800,
							color: "var(--ds-ink)",
							letterSpacing: "-0.01em"
						},
						children: t
					}),
					n && /* @__PURE__ */ g("div", {
						style: {
							fontSize: "var(--ds-t-small)",
							color: "var(--ds-ink-2)",
							lineHeight: 1.5,
							marginTop: t ? 2 : 0
						},
						children: n
					}),
					r && /* @__PURE__ */ g("div", {
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
			a && /* @__PURE__ */ g("button", {
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
function Vn({ titulo: e = "Aún no hay nada aquí", children: t, acciones: n, icono: r, compacto: i = !1, estilo: a }) {
	return /* @__PURE__ */ _("div", {
		role: "status",
		style: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			textAlign: "center",
			gap: i ? "var(--ds-2)" : "var(--ds-3)",
			padding: i ? "var(--ds-6) var(--ds-4)" : "var(--ds-12) var(--ds-6)",
			border: "1px dashed var(--ds-line-firm)",
			borderRadius: i ? "var(--ds-r-item)" : "var(--ds-r-card)",
			...a
		},
		children: [
			r && /* @__PURE__ */ g(ce, {
				tono: "neutro",
				tamano: i ? 36 : 48,
				children: r
			}),
			/* @__PURE__ */ g("div", {
				style: {
					fontWeight: 800,
					letterSpacing: "-0.02em",
					color: "var(--ds-ink)",
					fontSize: i ? "var(--ds-t-body)" : "var(--ds-t-title)"
				},
				children: e
			}),
			t && /* @__PURE__ */ g("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					color: "var(--ds-ink-3)",
					maxWidth: 420,
					lineHeight: 1.5
				},
				children: t
			}),
			n && /* @__PURE__ */ g("div", {
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
function Hn({ personas: e = [], maximo: t = 4, tamano: n = 32, generico: r = !1, estilo: i }) {
	let a = e.slice(0, t), o = e.length - a.length, s = e.map((e) => e.nombre).filter(Boolean).join(", ");
	return /* @__PURE__ */ _("div", {
		role: "img",
		"aria-label": `${e.length} personas: ${s}`,
		title: s,
		style: {
			display: "inline-flex",
			alignItems: "center",
			...i
		},
		children: [a.map((e, i) => /* @__PURE__ */ g("div", {
			style: {
				marginLeft: i ? -n * .28 : 0,
				borderRadius: 99,
				boxShadow: "0 0 0 2px var(--ds-surface-solid)",
				position: "relative",
				zIndex: t - i
			},
			children: /* @__PURE__ */ g(pe, {
				src: e.imagen,
				nombre: e.nombre || "",
				tamano: n,
				tono: i % 2 ? "neutro" : "acento",
				generico: r
			})
		}, e.clave ?? e.nombre ?? i)), o > 0 && /* @__PURE__ */ _("div", {
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
				fontWeight: 800
			},
			children: ["+", o]
		})]
	});
}
// src/primitivas/LineaTiempo.jsx
var Un = {
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
}, Wn = (e) => {
	if (!e) return "sin-fecha";
	let t = e instanceof Date ? e : new Date(typeof e == "string" && e.length === 10 ? `${e}T00:00:00` : e);
	return Number.isNaN(t.getTime()) ? "sin-fecha" : `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}, Gn = (e) => !(typeof e == "string" && /^\d{4}-\d{2}-\d{2}$/.test(e));
function Kn({ eventos: e = [], actual: t, agrupar: n = !1, relativa: r = !1, vacio: i = "Todavía no hay movimientos.", estilo: o }) {
	if (e.length === 0) return /* @__PURE__ */ g("div", {
		style: {
			color: "var(--ds-ink-3)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 600,
			padding: "var(--ds-4) 0",
			...o
		},
		children: i
	});
	let s = (e) => {
		if (!e) return -Infinity;
		let t = new Date(typeof e == "string" && e.length === 10 ? `${e}T00:00:00` : e);
		return Number.isNaN(t.getTime()) ? -Infinity : t.getTime();
	}, c = t === null ? -1 : t === void 0 ? e.reduce((t, n, r) => s(n.fecha) > s(e[t]?.fecha) ? r : t, 0) : e.findIndex((e, n) => (e.id ?? n) === t), l = null;
	return /* @__PURE__ */ g("ol", {
		style: {
			listStyle: "none",
			margin: 0,
			padding: 0,
			...o
		},
		children: e.map((t, i) => {
			let o = i === c, [s, u, d] = Un[t.tono] || (o ? Un.acento : Un.neutro), f = Wn(t.fecha), p = n && f !== l;
			l = f;
			let m = i === e.length - 1, h = t.fecha ? r ? dn(t.fecha) : n ? Gn(t.fecha) ? q(t.fecha, "hora") : null : q(t.fecha, Gn(t.fecha) ? "fechaHora" : "media") : "Sin fecha";
			return /* @__PURE__ */ _(a.Fragment, { children: [p && /* @__PURE__ */ g("li", {
				"aria-hidden": !1,
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 700,
					letterSpacing: "0.05em",
					textTransform: "uppercase",
					color: "var(--ds-ink-3)",
					padding: i === 0 ? "0 0 var(--ds-2)" : "var(--ds-3) 0 var(--ds-2)"
				},
				children: f === "sin-fecha" ? "Sin fecha" : q(t.fecha, "larga")
			}), /* @__PURE__ */ _("li", {
				"aria-current": o ? "step" : void 0,
				style: {
					display: "grid",
					gridTemplateColumns: "28px 1fr",
					columnGap: "var(--ds-3)"
				},
				children: [/* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ g("span", {
						style: {
							width: o ? 24 : 18,
							height: o ? 24 : 18,
							marginTop: o ? 0 : 3,
							flexShrink: 0,
							borderRadius: "var(--ds-r-pill)",
							background: s,
							color: u,
							border: `2px solid ${d}`,
							display: "grid",
							placeItems: "center",
							boxShadow: o ? "0 0 0 4px var(--ds-accent-ring)" : "none"
						},
						children: t.icono
					}), !m && /* @__PURE__ */ g("span", {
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
				}), /* @__PURE__ */ _("div", {
					style: {
						paddingBottom: m ? 0 : "var(--ds-4)",
						minWidth: 0
					},
					children: [
						/* @__PURE__ */ _("div", {
							style: {
								display: "flex",
								alignItems: "baseline",
								gap: "var(--ds-2)",
								flexWrap: "wrap"
							},
							children: [/* @__PURE__ */ g("span", {
								style: {
									fontWeight: o ? 800 : 700,
									color: "var(--ds-ink)",
									fontSize: "var(--ds-t-body)"
								},
								children: t.titulo
							}), h && /* @__PURE__ */ g("span", {
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
						t.texto && /* @__PURE__ */ g("div", {
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-2)",
								marginTop: 2
							},
							children: t.texto
						}),
						t.actor && /* @__PURE__ */ g("div", {
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
var qn = {
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
}, Jn = {
	hecho: /* @__PURE__ */ g("path", { d: "M20 6L9 17l-5-5" }),
	error: /* @__PURE__ */ g("path", { d: "M18 6L6 18M6 6l12 12" }),
	omitido: /* @__PURE__ */ g("path", { d: "M5 12h14" })
};
function Yn({ estado: e, numero: t, tamano: n = 30 }) {
	let r = qn[e] || qn.pendiente;
	return /* @__PURE__ */ g("span", {
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
			fontWeight: 800,
			boxShadow: e === "actual" ? "0 0 0 4px var(--ds-accent-ring)" : "none",
			transition: "background var(--ds-t-state) var(--ds-ease)"
		},
		children: Jn[e] ? /* @__PURE__ */ g("svg", {
			width: "15",
			height: "15",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.6",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": !0,
			children: Jn[e]
		}) : /* @__PURE__ */ g("span", {
			className: "ds-num",
			children: t
		})
	});
}
function Xn({ onPaso: e, paso: t, i: n, children: r, estilo: i }) {
	return e ? /* @__PURE__ */ g("button", {
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
	}) : /* @__PURE__ */ g("div", {
		style: i,
		children: r
	});
}
function Zn({ pasos: e = [], orientacion: t = "horizontal", onPaso: n, estilo: r }) {
	let i = U(), a = t === "vertical" || i, o = (e) => [e.fecha ? q(e.fecha, "media") : null, e.responsable].filter(Boolean).join(" · ");
	return a ? /* @__PURE__ */ g("ol", {
		style: {
			listStyle: "none",
			margin: 0,
			padding: 0,
			...r
		},
		children: e.map((t, r) => {
			let i = qn[t.estado] || qn.pendiente, a = r === e.length - 1;
			return /* @__PURE__ */ _("li", {
				"aria-current": t.estado === "actual" ? "step" : void 0,
				style: {
					display: "grid",
					gridTemplateColumns: "30px 1fr",
					columnGap: "var(--ds-3)"
				},
				children: [/* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ g(Yn, {
						estado: t.estado,
						numero: r + 1
					}), !a && /* @__PURE__ */ g("span", {
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
				}), /* @__PURE__ */ _(Xn, {
					onPaso: n,
					paso: t,
					i: r,
					estilo: {
						display: "block",
						paddingBottom: a ? 0 : "var(--ds-4)",
						minWidth: 0
					},
					children: [
						/* @__PURE__ */ g("div", {
							style: {
								fontWeight: 700,
								color: "var(--ds-ink)",
								lineHeight: "30px"
							},
							children: t.titulo
						}),
						/* @__PURE__ */ g("div", {
							style: {
								fontSize: "var(--ds-t-micro)",
								fontWeight: 700,
								color: i.texto,
								letterSpacing: "0.02em"
							},
							children: i.palabra
						}),
						o(t) && /* @__PURE__ */ g("div", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-3)",
								marginTop: 2
							},
							children: o(t)
						}),
						t.texto && /* @__PURE__ */ g("div", {
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
	}) : /* @__PURE__ */ g("ol", {
		style: {
			listStyle: "none",
			margin: 0,
			padding: 0,
			display: "flex",
			...r
		},
		children: e.map((t, r) => {
			let i = qn[t.estado] || qn.pendiente, a = r === e.length - 1;
			return /* @__PURE__ */ _("li", {
				"aria-current": t.estado === "actual" ? "step" : void 0,
				style: {
					flex: 1,
					minWidth: 0,
					position: "relative"
				},
				children: [!a && /* @__PURE__ */ g("span", {
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
				}), /* @__PURE__ */ _(Xn, {
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
						/* @__PURE__ */ g(Yn, {
							estado: t.estado,
							numero: r + 1
						}),
						/* @__PURE__ */ g("div", {
							style: {
								fontWeight: 700,
								color: "var(--ds-ink)",
								marginTop: "var(--ds-2)",
								fontSize: "var(--ds-t-small)",
								lineHeight: 1.25
							},
							children: t.titulo
						}),
						/* @__PURE__ */ g("div", {
							style: {
								fontSize: "var(--ds-t-micro)",
								fontWeight: 700,
								color: i.texto,
								marginTop: 2
							},
							children: i.palabra
						}),
						o(t) && /* @__PURE__ */ g("div", {
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
function Qn({ tarjeta: e, columna: t, columnas: n, onMover: r }) {
	let i = p(null), [a, o] = m(!1);
	return /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("button", {
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
			fontWeight: 700,
			padding: "3px 9px",
			borderRadius: "var(--ds-r-pill)",
			flexShrink: 0
		},
		children: "Mover a…"
	}), /* @__PURE__ */ _(Pe, {
		ancla: i,
		abierto: a,
		onCerrar: () => o(!1),
		etiqueta: "Mover a columna",
		minAncho: 190,
		children: [/* @__PURE__ */ g("div", {
			style: {
				fontSize: "var(--ds-t-micro)",
				fontWeight: 700,
				letterSpacing: "0.05em",
				textTransform: "uppercase",
				color: "var(--ds-ink-3)",
				padding: "4px 10px 7px"
			},
			children: "Mover a"
		}), n.filter((e) => e.id !== t.id).map((n) => /* @__PURE__ */ g(Fe, {
			rol: "menuitem",
			onClick: () => {
				o(!1), r(e, n.id, t.id);
			},
			children: n.titulo
		}, n.id))]
	})] });
}
function $n({ tarjeta: e, formatoValor: t }) {
	return /* @__PURE__ */ _(h, { children: [
		/* @__PURE__ */ g("div", {
			style: {
				fontWeight: 700,
				color: "var(--ds-ink)",
				fontSize: "var(--ds-t-small)",
				lineHeight: 1.3
			},
			children: e.titulo
		}),
		e.subtitulo && /* @__PURE__ */ g("div", {
			style: {
				fontSize: "var(--ds-t-micro)",
				color: "var(--ds-ink-3)",
				marginTop: 2,
				fontWeight: 600
			},
			children: e.subtitulo
		}),
		(e.valor !== void 0 || e.etiquetas?.length > 0) && /* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: 6,
				flexWrap: "wrap",
				marginTop: "var(--ds-2)"
			},
			children: [e.valor !== void 0 && /* @__PURE__ */ g("span", {
				className: "ds-num",
				style: {
					fontWeight: 800,
					color: "var(--ds-ink)",
					fontSize: "var(--ds-t-small)",
					marginRight: "auto"
				},
				children: J(e.valor, t)
			}), e.etiquetas?.map((e, t) => /* @__PURE__ */ g(se, {
				tono: e.tono,
				children: e.texto
			}, t))]
		})
	] });
}
function er({ columnas: e = [], onMover: t, onTarjeta: n, renderTarjeta: r, formatoValor: i = "moneda", anchoColumna: a = 280, vacioColumna: o = "Sin elementos en esta etapa.", estilo: s }) {
	let c = U(), [l, u] = m(null), [d, f] = m(null), p = typeof t == "function", h = c ? `min(${a}px, 82vw)` : a;
	return /* @__PURE__ */ g("div", {
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
			let s = a.tarjetas || [], c = s.some((e) => e.valor !== void 0 && e.valor !== null), m = s.reduce((e, t) => e + (Number(t.valor) || 0), 0), v = d === a.id && l && l.origen !== a.id;
			return /* @__PURE__ */ _("section", {
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
					width: h,
					scrollSnapAlign: "start",
					background: v ? "var(--ds-accent-soft)" : "var(--ds-surface-sunk)",
					border: `1px ${v ? "dashed" : "solid"} ${v ? "var(--ds-accent-trazo)" : "var(--ds-line)"}`,
					borderRadius: "var(--ds-r-card)",
					padding: "var(--ds-3)",
					transition: "background var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease)"
				},
				children: [/* @__PURE__ */ _("header", {
					style: {
						display: "flex",
						alignItems: "baseline",
						gap: "var(--ds-2)",
						padding: "2px 4px var(--ds-3)"
					},
					children: [
						/* @__PURE__ */ g("h3", {
							style: {
								margin: 0,
								fontSize: "var(--ds-t-small)",
								fontWeight: 800,
								color: "var(--ds-ink)",
								letterSpacing: "-0.01em",
								minWidth: 0,
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap"
							},
							children: a.titulo
						}),
						/* @__PURE__ */ g("span", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-t-micro)",
								fontWeight: 800,
								color: "var(--ds-ink-3)",
								background: "var(--ds-surface)",
								borderRadius: "var(--ds-r-pill)",
								padding: "1px 8px"
							},
							children: s.length
						}),
						c && /* @__PURE__ */ g("span", {
							className: "ds-num",
							style: {
								marginLeft: "auto",
								fontSize: "var(--ds-t-micro)",
								fontWeight: 700,
								color: "var(--ds-ink-2)",
								whiteSpace: "nowrap"
							},
							children: J(m, i === "moneda" ? "monedaCompacta" : i)
						})
					]
				}), /* @__PURE__ */ _("div", {
					role: "list",
					style: {
						display: "grid",
						gap: "var(--ds-2)"
					},
					children: [s.length === 0 && /* @__PURE__ */ g("div", {
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
						return /* @__PURE__ */ _("article", {
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
							children: [n ? /* @__PURE__ */ g("button", {
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
								children: r ? r(o, a) : /* @__PURE__ */ g($n, {
									tarjeta: o,
									formatoValor: i
								})
							}) : r ? r(o, a) : /* @__PURE__ */ g($n, {
								tarjeta: o,
								formatoValor: i
							}), p && e.length > 1 && /* @__PURE__ */ g("div", {
								style: {
									display: "flex",
									justifyContent: "flex-end",
									marginTop: "var(--ds-2)"
								},
								children: /* @__PURE__ */ g(Qn, {
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
var tr = (e) => e instanceof Date ? e : new Date(typeof e == "string" && e.length === 10 ? `${e}T00:00:00` : e), nr = (e, t) => e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
function rr(e, t) {
	if (Number.isNaN(e.getTime())) return "Sin fecha";
	if (nr(e, t)) return "Hoy";
	let n = new Date(t);
	return n.setDate(t.getDate() - 1), nr(e, n) ? "Ayer" : q(e, "larga");
}
function ir({ eventos: e = [], ahora: t, agrupar: n = !0, vacio: r = "Sin actividad reciente.", estilo: i }) {
	let o = t ? tr(t) : /* @__PURE__ */ new Date();
	if (e.length === 0) return /* @__PURE__ */ g("div", {
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
	return /* @__PURE__ */ g("ul", {
		style: {
			listStyle: "none",
			margin: 0,
			padding: 0,
			...i
		},
		children: e.map((e, t) => {
			let r = tr(e.fecha), i = n ? rr(r, o) : null, c = n && i !== s;
			s = i;
			let l = !Number.isNaN(r.getTime()), u = l && nr(r, o), d = l ? u ? dn(r, o) : n ? q(r, "hora") : q(r, "fechaHora") : "";
			return /* @__PURE__ */ _(a.Fragment, { children: [c && /* @__PURE__ */ g("li", {
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 700,
					letterSpacing: "0.05em",
					textTransform: "uppercase",
					color: "var(--ds-ink-3)",
					padding: t === 0 ? "0 0 var(--ds-2)" : "var(--ds-4) 0 var(--ds-2)"
				},
				children: i
			}), /* @__PURE__ */ _("li", {
				style: {
					display: "flex",
					gap: "var(--ds-3)",
					alignItems: "flex-start",
					padding: "var(--ds-2) 0"
				},
				children: [
					e.icono ? /* @__PURE__ */ g(ce, {
						tono: e.tono || "neutro",
						tamano: 34,
						children: e.icono
					}) : /* @__PURE__ */ g(pe, {
						nombre: e.actor || "",
						src: e.retrato,
						tamano: 34,
						tono: "neutro"
					}),
					/* @__PURE__ */ _("div", {
						style: {
							flex: 1,
							minWidth: 0
						},
						children: [/* @__PURE__ */ _("div", {
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-2)",
								lineHeight: 1.45
							},
							children: [
								e.actor && /* @__PURE__ */ g("strong", {
									style: {
										color: "var(--ds-ink)",
										fontWeight: 800
									},
									children: e.actor
								}),
								e.actor ? " " : "",
								e.accion,
								e.objeto && /* @__PURE__ */ _(h, { children: [" ", /* @__PURE__ */ g("strong", {
									style: {
										color: "var(--ds-ink)",
										fontWeight: 700
									},
									children: e.objeto
								})] })
							]
						}), e.detalle && /* @__PURE__ */ g("div", {
							style: {
								fontSize: "var(--ds-t-micro)",
								color: "var(--ds-ink-3)",
								marginTop: 2,
								fontWeight: 600
							},
							children: e.detalle
						})]
					}),
					d && /* @__PURE__ */ g("time", {
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
var ar = [
	"Lun",
	"Mar",
	"Mié",
	"Jue",
	"Vie",
	"Sáb",
	"Dom"
], or = {
	neutro: ["var(--ds-surface-sunk)", "var(--ds-ink-3)"],
	acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)"],
	ok: ["var(--ds-ok-soft)", "var(--ds-ok)"],
	aviso: ["var(--ds-warn-soft)", "var(--ds-warn)"],
	riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)"]
}, sr = (e) => String(e).padStart(2, "0"), cr = (e) => `${e.getFullYear()}-${sr(e.getMonth() + 1)}-${sr(e.getDate())}`, lr = (e) => {
	let [t, n, r] = e.split("-").map(Number);
	return new Date(t, n - 1, r || 1);
}, ur = (e) => `${e.getFullYear()}-${sr(e.getMonth() + 1)}`;
function dr({ e, onEvento: t, compacto: n }) {
	let [r, i] = or[e.tono] || or.acento, a = /* @__PURE__ */ _("span", {
		style: {
			display: "block",
			overflow: "hidden",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap"
		},
		children: [e.hora && /* @__PURE__ */ g("span", {
			className: "ds-num",
			style: {
				fontWeight: 800,
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
	return t ? /* @__PURE__ */ g("button", {
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
	}) : /* @__PURE__ */ g("div", {
		title: e.titulo,
		style: o,
		children: a
	});
}
function fr({ resto: e, dia: t, onEvento: n }) {
	let r = p(null), [i, a] = m(!1);
	return /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ _("button", {
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
			fontWeight: 800,
			color: "var(--ds-accent-tinta)",
			textAlign: "left",
			borderRadius: 6
		},
		children: [
			"+",
			e.length,
			" más"
		]
	}), /* @__PURE__ */ _(Pe, {
		ancla: r,
		abierto: i,
		onCerrar: () => a(!1),
		rol: "dialog",
		etiqueta: `Eventos del ${q(t, "larga")}`,
		minAncho: 240,
		children: [/* @__PURE__ */ g("div", {
			style: {
				fontSize: "var(--ds-t-micro)",
				fontWeight: 700,
				letterSpacing: "0.05em",
				textTransform: "uppercase",
				color: "var(--ds-ink-3)",
				padding: "4px 6px 8px"
			},
			children: q(t, "larga")
		}), /* @__PURE__ */ g("div", {
			style: {
				display: "grid",
				gap: 6,
				padding: "0 4px 4px"
			},
			children: e.map((e, t) => /* @__PURE__ */ g(dr, {
				e,
				onEvento: n
			}, e.id ?? t))
		})]
	})] });
}
var pr = {
	border: "1px solid var(--ds-line-firm)",
	background: "var(--ds-surface)",
	color: "var(--ds-ink-2)",
	borderRadius: "var(--ds-r-pill)",
	cursor: "pointer",
	fontFamily: "var(--ds-font)",
	fontWeight: 700,
	fontSize: "var(--ds-t-small)",
	height: 34,
	minWidth: 34,
	padding: "0 12px",
	display: "inline-grid",
	placeItems: "center"
};
function mr({ eventos: e = [], mes: t, mesInicial: n, onCambioMes: r, onDia: i, onEvento: a, maxPorDia: o = 3, hoy: s, vacio: c = "No hay eventos este mes.", estilo: l }) {
	let u = U(700), d = s ? lr(s) : /* @__PURE__ */ new Date(), [p, h] = m(n || ur(d)), v = lr(`${t || p}-01`), y = (e) => {
		let n = ur(e);
		t || h(n), r?.(n);
	}, b = f(() => {
		let t = /* @__PURE__ */ new Map();
		return e.forEach((e) => {
			if (!e.fecha) return;
			let n = String(e.fecha).slice(0, 10);
			t.has(n) || t.set(n, []), t.get(n).push(e);
		}), t;
	}, [e]), x = (v.getDay() + 6) % 7, S = new Date(v);
	S.setDate(1 - x);
	let C = new Date(v.getFullYear(), v.getMonth() + 1, 0), w = Math.ceil((x + C.getDate()) / 7), T = Array.from({ length: w * 7 }, (e, t) => {
		let n = new Date(S);
		return n.setDate(S.getDate() + t), n;
	}), E = q(v, "mes"), D = /* @__PURE__ */ _("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-2)",
			flexWrap: "wrap",
			marginBottom: "var(--ds-4)"
		},
		children: [
			/* @__PURE__ */ g("h3", {
				"aria-live": "polite",
				style: {
					margin: 0,
					fontSize: "var(--ds-t-title)",
					fontWeight: 800,
					letterSpacing: "-0.03em",
					color: "var(--ds-ink)",
					marginRight: "auto",
					textTransform: "capitalize"
				},
				children: E
			}),
			/* @__PURE__ */ g("button", {
				type: "button",
				style: pr,
				"aria-label": "Mes anterior",
				onClick: () => y(new Date(v.getFullYear(), v.getMonth() - 1, 1)),
				children: "‹"
			}),
			/* @__PURE__ */ g("button", {
				type: "button",
				style: pr,
				onClick: () => y(d),
				children: "Hoy"
			}),
			/* @__PURE__ */ g("button", {
				type: "button",
				style: pr,
				"aria-label": "Mes siguiente",
				onClick: () => y(new Date(v.getFullYear(), v.getMonth() + 1, 1)),
				children: "›"
			})
		]
	});
	if (u) {
		let e = T.filter((e) => e.getMonth() === v.getMonth() && b.has(cr(e)));
		return /* @__PURE__ */ _("div", {
			style: l,
			children: [
				D,
				e.length === 0 && /* @__PURE__ */ g("div", {
					style: {
						color: "var(--ds-ink-3)",
						fontSize: "var(--ds-t-small)",
						fontWeight: 600,
						padding: "var(--ds-4) 0"
					},
					children: c
				}),
				/* @__PURE__ */ g("ol", {
					style: {
						listStyle: "none",
						margin: 0,
						padding: 0,
						display: "grid",
						gap: "var(--ds-3)"
					},
					children: e.map((e) => {
						let t = cr(e), n = t === cr(d);
						return /* @__PURE__ */ _("li", {
							style: {
								display: "grid",
								gridTemplateColumns: "52px 1fr",
								gap: "var(--ds-3)"
							},
							children: [/* @__PURE__ */ _("button", {
								type: "button",
								onClick: i ? () => i(t, b.get(t)) : void 0,
								disabled: !i,
								"aria-label": q(t, "larga"),
								style: {
									border: "none",
									background: "transparent",
									padding: 0,
									textAlign: "center",
									cursor: i ? "pointer" : "default",
									fontFamily: "var(--ds-font)"
								},
								children: [/* @__PURE__ */ g("div", {
									style: {
										fontSize: "var(--ds-t-micro)",
										fontWeight: 700,
										textTransform: "uppercase",
										color: n ? "var(--ds-accent-tinta)" : "var(--ds-ink-3)"
									},
									children: ar[(e.getDay() + 6) % 7]
								}), /* @__PURE__ */ g("div", {
									className: "ds-num",
									style: {
										fontSize: "var(--ds-num-m)",
										fontWeight: 800,
										lineHeight: 1.1,
										color: n ? "var(--ds-accent-tinta)" : "var(--ds-ink)"
									},
									children: e.getDate()
								})]
							}), /* @__PURE__ */ g("div", {
								style: {
									display: "grid",
									gap: 6,
									minWidth: 0
								},
								children: b.get(t).map((e, t) => /* @__PURE__ */ g(dr, {
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
	return /* @__PURE__ */ _("div", {
		style: l,
		children: [D, /* @__PURE__ */ _("div", {
			role: "group",
			"aria-label": E,
			style: {
				display: "grid",
				gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
				border: "1px solid var(--ds-line)",
				borderRadius: "var(--ds-r-item)",
				overflow: "hidden"
			},
			children: [ar.map((e) => /* @__PURE__ */ g("div", {
				"aria-hidden": !0,
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 700,
					letterSpacing: "0.05em",
					textTransform: "uppercase",
					color: "var(--ds-ink-3)",
					padding: "8px 10px",
					borderBottom: "1px solid var(--ds-line)",
					background: "var(--ds-surface-2)"
				},
				children: e
			}, e)), T.map((e, t) => {
				let n = cr(e), r = e.getMonth() === v.getMonth(), s = n === cr(d), c = b.get(n) || [], l = c.length > o ? c.slice(0, o - 1) : c, u = c.slice(l.length);
				return /* @__PURE__ */ _("div", {
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
						/* @__PURE__ */ g("button", {
							type: "button",
							className: "ds-num",
							disabled: !i,
							onClick: i ? () => i(n, c) : void 0,
							"aria-label": `${q(n, "larga")}${c.length ? `, ${c.length} eventos` : ", sin eventos"}`,
							style: {
								alignSelf: "flex-start",
								fontSize: "var(--ds-t-small)",
								fontWeight: 800,
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
						l.map((e, t) => /* @__PURE__ */ g(dr, {
							e,
							onEvento: a,
							compacto: !0
						}, e.id ?? t)),
						u.length > 0 && /* @__PURE__ */ g(fr, {
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
function hr({ titulo: e, descripcion: t, migas: n, meta: r, acciones: i, estilo: a }) {
	let o = U();
	return /* @__PURE__ */ _("header", {
		style: {
			marginBottom: "var(--ds-6)",
			...a
		},
		children: [n?.length > 0 && /* @__PURE__ */ g(xe, { ruta: n }), /* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				gap: "var(--ds-4)",
				flexDirection: o ? "column" : "row",
				alignItems: o ? "stretch" : "flex-end"
			},
			children: [/* @__PURE__ */ _("div", {
				style: {
					flex: 1,
					minWidth: 0
				},
				children: [
					/* @__PURE__ */ g("h1", {
						style: {
							margin: 0,
							fontSize: o ? "var(--ds-num-m)" : "var(--ds-num-l)",
							fontWeight: 800,
							letterSpacing: "-0.035em",
							lineHeight: 1.1,
							color: "var(--ds-ink)",
							overflowWrap: "anywhere"
						},
						children: e
					}),
					t && /* @__PURE__ */ g("p", {
						style: {
							margin: "var(--ds-2) 0 0",
							fontSize: "var(--ds-t-body)",
							color: "var(--ds-ink-2)",
							maxWidth: "68ch",
							lineHeight: 1.5
						},
						children: t
					}),
					r && /* @__PURE__ */ g("div", {
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
			}), i && /* @__PURE__ */ g("div", {
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
function gr({ opciones: e = [], valor: t, onCambio: n, etiqueta: r, tamano: i = "m", pleno: a = !1, estilo: o }) {
	let s = p([]), c = p(null), [l, u] = m(null), f = Math.max(0, e.findIndex((e) => e.valor === t));
	d(() => {
		let e = () => {
			let e = s.current[f];
			e && u({
				izq: e.offsetLeft,
				ancho: e.offsetWidth
			});
		};
		if (e(), typeof ResizeObserver > "u" || !c.current) return;
		let t = new ResizeObserver(e);
		return t.observe(c.current), () => t.disconnect();
	}, [f, e.length]);
	let h = (t) => {
		let r = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : t.key === "ArrowLeft" || t.key === "ArrowUp" ? -1 : 0;
		if (!r || e.length === 0) return;
		t.preventDefault();
		let i = (f + r + e.length) % e.length;
		n?.(e[i].valor), s.current[i]?.focus();
	}, v = i === "s" ? 30 : 36;
	return /* @__PURE__ */ _("div", {
		ref: c,
		role: "radiogroup",
		"aria-label": r,
		onKeyDown: h,
		style: {
			position: "relative",
			display: a ? "flex" : "inline-flex",
			padding: 3,
			gap: 2,
			background: "var(--ds-surface-sunk)",
			border: "1px solid var(--ds-line)",
			borderRadius: "var(--ds-r-pill)",
			maxWidth: "100%",
			overflowX: "auto",
			...o
		},
		children: [l && /* @__PURE__ */ g("span", {
			"aria-hidden": !0,
			style: {
				position: "absolute",
				top: 3,
				bottom: 3,
				left: l.izq,
				width: l.ancho,
				background: "var(--ds-surface-solid)",
				borderRadius: "var(--ds-r-pill)",
				boxShadow: "var(--ds-lift-1)",
				border: "1px solid var(--ds-line)",
				transition: "left var(--ds-t-state) var(--ds-ease), width var(--ds-t-state) var(--ds-ease)"
			}
		}), e.map((e, t) => {
			let r = t === f;
			return /* @__PURE__ */ _("button", {
				ref: (e) => {
					s.current[t] = e;
				},
				type: "button",
				role: "radio",
				"aria-checked": r,
				tabIndex: r ? 0 : -1,
				onClick: () => n?.(e.valor),
				style: {
					position: "relative",
					zIndex: 1,
					flex: a ? 1 : "0 0 auto",
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 6,
					height: v,
					padding: i === "s" ? "0 12px" : "0 16px",
					border: "none",
					background: "transparent",
					cursor: "pointer",
					fontFamily: "var(--ds-font)",
					fontSize: i === "s" ? "var(--ds-t-micro)" : "var(--ds-t-small)",
					fontWeight: 700,
					whiteSpace: "nowrap",
					borderRadius: "var(--ds-r-pill)",
					color: r ? "var(--ds-ink)" : "var(--ds-ink-3)",
					transition: "color var(--ds-t-state) var(--ds-ease)"
				},
				children: [e.icono, e.texto]
			}, e.valor);
		})]
	});
}
// src/primitivas/SelectorPaleta.jsx
function _r({ etiqueta: e = "Paleta de color", estilo: t }) {
	let { tema: n, paleta: r, paletas: i, fijarPaleta: a } = A(), o = p([]);
	if (!i.length) return null;
	let s = Math.max(0, i.findIndex((e) => e.id === r));
	return /* @__PURE__ */ g("div", {
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
			return /* @__PURE__ */ _("button", {
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
					fontWeight: 700,
					borderRadius: "var(--ds-r-item)",
					textAlign: "left",
					color: r ? "var(--ds-ink)" : "var(--ds-ink-2)",
					background: r ? "var(--ds-surface-solid)" : "var(--ds-surface-sunk)",
					border: `1px solid ${r ? "var(--ds-accent-trazo)" : "var(--ds-line)"}`,
					boxShadow: r ? "var(--ds-lift-1)" : "none",
					transition: "border-color var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease)"
				},
				children: [/* @__PURE__ */ g("span", {
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
var vr = [{
	valor: "light",
	texto: "Claro"
}, {
	valor: "dark",
	texto: "Oscuro"
}], yr = [
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
], br = /* @__PURE__ */ _("svg", {
	width: "18",
	height: "18",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: [/* @__PURE__ */ g("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	}), /* @__PURE__ */ g("path", { d: "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" })]
});
function xr({ etiqueta: e, children: t }) {
	return /* @__PURE__ */ _("div", {
		style: {
			display: "grid",
			gap: "var(--ds-2)"
		},
		children: [/* @__PURE__ */ g("span", {
			style: {
				fontSize: "var(--ds-t-small)",
				fontWeight: 700,
				color: "var(--ds-ink-2)"
			},
			children: e
		}), t]
	});
}
function Sr({ abierto: e, onCerrar: t }) {
	let { tema: n, fijar: r, paletas: i } = A(), { preferencia: a, fijarModo: o, movil: s } = Ve(), c = a !== void 0 && !s;
	return /* @__PURE__ */ g(Ae, {
		abierto: e,
		onCerrar: t,
		titulo: "Apariencia",
		nota: "Se aplica al momento y se recuerda en este navegador.",
		ancho: 480,
		acciones: /* @__PURE__ */ g(H, {
			variante: "solido",
			onClick: t,
			children: "Listo"
		}),
		children: /* @__PURE__ */ _("div", {
			style: {
				display: "grid",
				gap: "var(--ds-5)"
			},
			children: [
				/* @__PURE__ */ g(xr, {
					etiqueta: "Tema",
					children: /* @__PURE__ */ g(gr, {
						etiqueta: "Tema",
						opciones: vr,
						valor: n,
						onCambio: r,
						pleno: !0
					})
				}),
				i.length > 0 && /* @__PURE__ */ g(xr, {
					etiqueta: "Paleta de color",
					children: /* @__PURE__ */ g(_r, {})
				}),
				c && /* @__PURE__ */ g(xr, {
					etiqueta: "Navegación",
					children: /* @__PURE__ */ g(gr, {
						etiqueta: "Navegación",
						opciones: yr,
						valor: a,
						onCambio: o,
						pleno: !0
					})
				})
			]
		})
	});
}
function Cr({ texto: e }) {
	let [t, n] = m(!1);
	return /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(H, {
		variante: "fantasma",
		icono: br,
		onClick: () => n(!0),
		"aria-label": e ? void 0 : "Apariencia",
		"aria-haspopup": "dialog",
		children: e
	}), /* @__PURE__ */ g(Sr, {
		abierto: t,
		onCerrar: () => n(!1)
	})] });
}
// src/Cuenta.jsx
var wr = /* @__PURE__ */ _("svg", {
	width: "17",
	height: "17",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.9",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: [/* @__PURE__ */ g("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), /* @__PURE__ */ g("path", { d: "M16 17l5-5-5-5M21 12H9" })]
});
function Tr({ icono: e, children: t, onClick: n, esperando: r }) {
	return /* @__PURE__ */ _("button", {
		type: "button",
		role: "menuitem",
		onClick: n,
		disabled: r,
		"aria-busy": r || void 0,
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-3)",
			width: "100%",
			minHeight: 40,
			padding: "8px 10px",
			border: "none",
			borderRadius: "var(--ds-r-item)",
			cursor: "pointer",
			background: "transparent",
			color: "var(--ds-ink-2)",
			textAlign: "left",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 700
		},
		onMouseEnter: (e) => {
			e.currentTarget.style.background = "var(--ds-surface-2)";
		},
		onMouseLeave: (e) => {
			e.currentTarget.style.background = "transparent";
		},
		onFocus: (e) => {
			e.currentTarget.style.background = "var(--ds-surface-2)";
		},
		onBlur: (e) => {
			e.currentTarget.style.background = "transparent";
		},
		children: [/* @__PURE__ */ g("span", {
			style: {
				display: "grid",
				placeItems: "center",
				width: 18,
				color: "var(--ds-ink-3)"
			},
			children: e
		}), /* @__PURE__ */ g("span", {
			style: { flex: 1 },
			children: t
		})]
	});
}
var Er = () => /* @__PURE__ */ g("div", {
	role: "separator",
	style: {
		height: 1,
		background: "var(--ds-line)",
		margin: "4px 6px"
	}
});
function Dr({ nombre: e = "", correo: t, foto: n, opciones: r = [], onSalir: i, saliendo: a = !1 }) {
	let [o, s] = m(!1), [c, l] = m(!1), u = p(null), d = (e) => () => {
		s(!1), e?.();
	}, f = e.split(" ").filter(Boolean).slice(0, 2).map((e) => e[0]).join("").toUpperCase();
	return /* @__PURE__ */ _(h, { children: [
		/* @__PURE__ */ g("button", {
			ref: u,
			type: "button",
			onClick: () => s((e) => !e),
			"aria-label": `Cuenta de ${e}${f ? ` · ${f}` : ""}`,
			"aria-haspopup": "menu",
			"aria-expanded": o,
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
				boxShadow: o ? "0 0 0 2px var(--ds-accent-trazo)" : "none",
				transition: "box-shadow var(--ds-t-state) var(--ds-ease)"
			},
			children: /* @__PURE__ */ g(pe, {
				src: n,
				nombre: e,
				tamano: 34
			})
		}),
		/* @__PURE__ */ _(Pe, {
			ancla: u,
			abierto: o,
			onCerrar: () => s(!1),
			etiqueta: `Cuenta de ${e}`,
			minAncho: 250,
			children: [
				/* @__PURE__ */ _("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "var(--ds-3)",
						padding: "6px 10px 10px"
					},
					children: [/* @__PURE__ */ g(pe, {
						src: n,
						nombre: e,
						tamano: 40
					}), /* @__PURE__ */ _("div", {
						style: { minWidth: 0 },
						children: [/* @__PURE__ */ g("div", {
							style: {
								fontWeight: 800,
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink)",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap"
							},
							children: e
						}), t && /* @__PURE__ */ g("div", {
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
				/* @__PURE__ */ g(Er, {}),
				r.map((e) => /* @__PURE__ */ g(Tr, {
					icono: e.icono,
					onClick: d(e.onClick),
					children: e.texto
				}, e.texto)),
				/* @__PURE__ */ g(Tr, {
					icono: br,
					onClick: d(() => l(!0)),
					children: "Apariencia"
				}),
				i && /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(Er, {}), /* @__PURE__ */ g(Tr, {
					icono: a ? /* @__PURE__ */ g(V, {}) : wr,
					esperando: a,
					onClick: () => i(),
					children: a ? "Cerrando sesión…" : "Cerrar sesión"
				})] })
			]
		}),
		/* @__PURE__ */ g(Sr, {
			abierto: c,
			onCerrar: () => l(!1)
		})
	] });
}
// src/Notificaciones.jsx
var Or = /* @__PURE__ */ _("svg", {
	width: "19",
	height: "19",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.9",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: [/* @__PURE__ */ g("path", { d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" }), /* @__PURE__ */ g("path", { d: "M13.7 21a2 2 0 0 1-3.4 0" })]
}), kr = {
	ok: "var(--ds-ok)",
	warn: "var(--ds-warn)",
	risk: "var(--ds-risk)",
	info: "var(--ds-accent-trazo)"
};
function Ar({ a: e, onAbrir: t }) {
	let n = !e.leido;
	return /* @__PURE__ */ _("button", {
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
		children: [/* @__PURE__ */ g("span", {
			"aria-hidden": !0,
			style: {
				width: 8,
				height: 8,
				marginTop: 6,
				flexShrink: 0,
				borderRadius: "var(--ds-r-pill)",
				background: n ? kr[e.tono] || kr.info : "transparent"
			}
		}), /* @__PURE__ */ _("span", {
			style: {
				flex: 1,
				minWidth: 0
			},
			children: [
				n && /* @__PURE__ */ g("span", {
					style: {
						position: "absolute",
						width: 1,
						height: 1,
						overflow: "hidden",
						clip: "rect(0 0 0 0)"
					},
					children: "Sin leer: "
				}),
				/* @__PURE__ */ g("span", {
					style: {
						display: "block",
						fontSize: "var(--ds-t-small)",
						fontWeight: n ? 800 : 600,
						color: "var(--ds-ink)"
					},
					children: e.titulo
				}),
				e.texto && /* @__PURE__ */ g("span", {
					style: {
						display: "block",
						fontSize: "var(--ds-t-small)",
						color: "var(--ds-ink-2)",
						marginTop: 2
					},
					children: e.texto
				}),
				e.fecha && /* @__PURE__ */ g("span", {
					className: "ds-num",
					style: {
						display: "block",
						fontSize: "var(--ds-t-micro)",
						color: "var(--ds-ink-2)",
						marginTop: 4
					},
					children: dn(e.fecha)
				})
			]
		})]
	});
}
function jr({ avisos: e, onAbrir: t, onMarcarTodas: n, onVerTodas: r, sinLeer: i }) {
	return /* @__PURE__ */ _("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: 2
		},
		children: [e.length === 0 ? /* @__PURE__ */ g("p", {
			style: {
				margin: 0,
				padding: "var(--ds-6) var(--ds-3)",
				textAlign: "center",
				fontSize: "var(--ds-t-small)",
				color: "var(--ds-ink-2)"
			},
			children: "No tienes notificaciones. Aquí aparecerá lo que necesite tu atención."
		}) : e.map((e) => /* @__PURE__ */ g(Ar, {
			a: e,
			onAbrir: t
		}, e.id)), (r || n && i > 0) && /* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				justifyContent: "space-between",
				gap: "var(--ds-2)",
				borderTop: "1px solid var(--ds-line)",
				marginTop: 4,
				paddingTop: 6
			},
			children: [n && i > 0 ? /* @__PURE__ */ g(Mr, {
				onClick: n,
				children: "Marcar todas como leídas"
			}) : /* @__PURE__ */ g("span", {}), r && /* @__PURE__ */ g(Mr, {
				onClick: r,
				children: "Ver todas"
			})]
		})]
	});
}
function Mr({ children: e, onClick: t }) {
	return /* @__PURE__ */ g("button", {
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
			fontWeight: 700,
			color: "var(--ds-accent-tinta)"
		},
		children: e
	});
}
function Nr({ avisos: e = [], onAbrir: t, onMarcarTodas: n, onVerTodas: r }) {
	let [i, a] = m(!1), o = p(null), s = U(), c = e.filter((e) => !e.leido).length, l = () => a(!1), u = /* @__PURE__ */ g(jr, {
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
	return /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ _("button", {
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
		children: [Or, c > 0 && /* @__PURE__ */ g("span", {
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
				fontWeight: 800,
				lineHeight: "18px",
				textAlign: "center",
				boxShadow: "0 0 0 2px var(--ds-surface-solid)"
			},
			children: c > 99 ? "99+" : c
		})]
	}), s ? /* @__PURE__ */ g(Ae, {
		abierto: i,
		onCerrar: l,
		titulo: "Notificaciones",
		children: u
	}) : /* @__PURE__ */ _(Pe, {
		ancla: o,
		abierto: i,
		onCerrar: l,
		rol: "dialog",
		etiqueta: "Notificaciones",
		minAncho: 360,
		estilo: { width: 380 },
		children: [/* @__PURE__ */ g("div", {
			style: {
				padding: "4px 10px 8px",
				fontWeight: 800,
				fontSize: "var(--ds-t-body)",
				color: "var(--ds-ink)"
			},
			children: "Notificaciones"
		}), u]
	})] });
}
// src/PantallaAcceso.jsx
var Pr = "\n@keyframes ds-aurora {\n  0%   { opacity: 0; transform: translate3d(-8%, 6%, 0) scale(0.9); }\n  35%  { opacity: 1; }\n  100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }\n}\n@keyframes ds-flota {\n  from { opacity: 0; transform: translate3d(0, 28px, 0) rotate(-3deg) scale(0.96); }\n  to   { opacity: 1; transform: none; }\n}\n@keyframes ds-sacude-a { 0%, 100% { translate: 0 0; } 20% { translate: -8px 0; } 40% { translate: 7px 0; } 60% { translate: -5px 0; } 80% { translate: 3px 0; } }\n@keyframes ds-sacude-b { 0%, 100% { translate: 0 0; } 20% { translate: -8px 0; } 40% { translate: 7px 0; } 60% { translate: -5px 0; } 80% { translate: 3px 0; } }\n.ds-acceso-aurora { position: absolute; border-radius: 50%; filter: blur(48px); pointer-events: none;\n  animation: ds-aurora 4.2s var(--ds-ease) both; }\n.ds-acceso-vitrina > * { animation: ds-flota var(--ds-t-scene) var(--ds-ease) both; }\n.ds-acceso-vitrina > *:nth-child(1) { animation-delay: 360ms; }\n.ds-acceso-vitrina > *:nth-child(2) { animation-delay: 520ms; margin-left: 18%; }\n.ds-acceso-vitrina > *:nth-child(3) { animation-delay: 680ms; margin-left: 6%; }\n.ds-acceso-vitrina > *:nth-child(4) { animation-delay: 840ms; margin-left: 24%; }\n.ds-acceso-form > * { animation: ds-rise var(--ds-t-scene) var(--ds-ease) both; }\n.ds-acceso-form > *:nth-child(1) { animation-delay: 80ms; }\n.ds-acceso-form > *:nth-child(2) { animation-delay: 140ms; }\n.ds-acceso-form > *:nth-child(3) { animation-delay: 200ms; }\n.ds-acceso-form > *:nth-child(n+4) { animation-delay: 260ms; }\n";
function Fr({ titulo: e, cifra: t, detalle: n, children: r, ancho: i = 260 }) {
	return /* @__PURE__ */ _(F, {
		estilo: {
			width: i,
			maxWidth: "100%",
			boxSizing: "border-box",
			padding: "var(--ds-4)",
			boxShadow: "0 18px 40px -18px rgba(0,0,0,0.45)"
		},
		children: [
			e && /* @__PURE__ */ g("div", {
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 700,
					letterSpacing: "0.04em",
					textTransform: "uppercase",
					opacity: .85
				},
				children: e
			}),
			t && /* @__PURE__ */ g("div", {
				className: "ds-num",
				style: {
					fontSize: "var(--ds-t-title)",
					fontWeight: 800,
					letterSpacing: "-0.02em",
					marginTop: 4
				},
				children: t
			}),
			n && /* @__PURE__ */ g("div", {
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
function Ir({ marca: e, lema: t, vitrina: n, titulo: r, nota: i, error: a, children: o, pie: s }) {
	let c = U(), u = p(null), [d, f] = m(0);
	return l(() => {
		a && f((e) => e + 1);
	}, [a]), /* @__PURE__ */ _("main", {
		style: {
			minHeight: "100dvh",
			boxSizing: "border-box",
			display: "grid",
			gridTemplateColumns: c ? "1fr" : "minmax(0, 1.15fr) minmax(380px, 0.85fr)",
			gridTemplateRows: c ? "auto 1fr" : "1fr",
			gap: c ? "var(--ds-4)" : "var(--ds-6)",
			padding: c ? "var(--ds-3)" : "var(--ds-4)"
		},
		children: [
			/* @__PURE__ */ g("style", { children: Pr }),
			/* @__PURE__ */ _("section", {
				className: "ds-heroe",
				onPointerMove: c ? void 0 : (e) => {
					let t = u.current;
					if (!t || e.pointerType !== "mouse" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
					let n = e.currentTarget.getBoundingClientRect(), r = (e.clientX - n.left) / n.width - .5, i = (e.clientY - n.top) / n.height - .5;
					t.style.transform = `perspective(900px) rotateY(${(r * 8).toFixed(2)}deg) rotateX(${(-i * 8).toFixed(2)}deg)`;
				},
				onPointerLeave: c ? void 0 : () => {
					u.current && (u.current.style.transform = "none");
				},
				style: {
					position: "relative",
					overflow: "hidden",
					isolation: "isolate",
					background: "var(--ds-hero)",
					color: "var(--ds-ink-on-hero)",
					borderRadius: "var(--ds-r-frame)",
					boxShadow: "var(--ds-lift-accent), var(--ds-lift-2)",
					padding: c ? "var(--ds-5)" : "var(--ds-10) var(--ds-8)",
					display: "flex",
					flexDirection: "column",
					gap: "var(--ds-6)",
					animation: "ds-rise var(--ds-t-scene) var(--ds-ease) both"
				},
				children: [
					/* @__PURE__ */ g("span", {
						"aria-hidden": !0,
						className: "ds-acceso-aurora",
						style: {
							width: "62%",
							height: "70%",
							top: "-18%",
							right: "-12%",
							background: "rgba(255,255,255,0.30)",
							zIndex: -1
						}
					}),
					/* @__PURE__ */ g("span", {
						"aria-hidden": !0,
						className: "ds-acceso-aurora",
						style: {
							width: "48%",
							height: "55%",
							bottom: "-20%",
							left: "-10%",
							background: "rgba(255,255,255,0.18)",
							zIndex: -1,
							animationDelay: "200ms"
						}
					}),
					/* @__PURE__ */ g("span", {
						"aria-hidden": !0,
						className: "ds-acceso-aurora",
						style: {
							width: "30%",
							height: "34%",
							top: "38%",
							left: "42%",
							background: "rgba(255,255,255,0.12)",
							zIndex: -1,
							animationDelay: "400ms"
						}
					}),
					/* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("div", {
						style: {
							fontSize: c ? "var(--ds-t-title)" : "var(--ds-t-display)",
							fontWeight: 800,
							letterSpacing: "-0.03em",
							lineHeight: 1.02
						},
						children: e
					}), t && /* @__PURE__ */ g("p", {
						style: {
							margin: "var(--ds-3) 0 0",
							fontSize: "var(--ds-t-body)",
							maxWidth: 440
						},
						children: t
					})] }),
					n && !c && /* @__PURE__ */ g("div", {
						ref: u,
						"aria-hidden": !0,
						className: "ds-acceso-vitrina",
						style: {
							display: "flex",
							flexDirection: "column",
							gap: "var(--ds-4)",
							marginTop: "auto",
							transition: "transform var(--ds-t-move) var(--ds-ease)",
							transformOrigin: "center"
						},
						children: n
					})
				]
			}),
			/* @__PURE__ */ g("div", {
				style: {
					display: "grid",
					alignItems: c ? "start" : "center",
					justifyItems: "center",
					padding: c ? "var(--ds-2) 0 0" : "var(--ds-4)"
				},
				children: /* @__PURE__ */ _("div", {
					className: "ds-acceso-form",
					style: {
						width: "100%",
						maxWidth: 420,
						display: "grid",
						gap: "var(--ds-5)",
						animation: d ? `${d % 2 ? "ds-sacude-a" : "ds-sacude-b"} 420ms var(--ds-ease-out)` : void 0
					},
					children: [
						/* @__PURE__ */ _("header", { children: [/* @__PURE__ */ g("h1", {
							style: {
								margin: 0,
								fontSize: "var(--ds-t-title)",
								fontWeight: 800,
								letterSpacing: "-0.02em"
							},
							children: r
						}), i && /* @__PURE__ */ g("p", {
							style: {
								margin: "var(--ds-2) 0 0",
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-2)"
							},
							children: i
						})] }),
						/* @__PURE__ */ g("div", {
							style: {
								background: "var(--ds-surface)",
								border: "1px solid var(--ds-line)",
								backdropFilter: "var(--ds-blur)",
								WebkitBackdropFilter: "var(--ds-blur)",
								borderRadius: "var(--ds-r-card)",
								boxShadow: "var(--ds-lift-2)",
								padding: "var(--ds-6)"
							},
							children: o
						}),
						s && /* @__PURE__ */ g("div", {
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-2)",
								textAlign: "center"
							},
							children: s
						})
					]
				})
			})
		]
	});
}
// src/primitivas/CampoClave.jsx
var Lr = /* @__PURE__ */ _("svg", {
	width: "18",
	height: "18",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.9",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: [/* @__PURE__ */ g("path", { d: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" }), /* @__PURE__ */ g("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})]
}), Rr = /* @__PURE__ */ _("svg", {
	width: "18",
	height: "18",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.9",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: [/* @__PURE__ */ g("path", { d: "M10.6 5.1A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-2.6 3.5M6.1 6.1A17.4 17.4 0 0 0 2 12s3.6 7 10 7a10 10 0 0 0 5.9-1.9" }), /* @__PURE__ */ g("path", { d: "M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" })]
});
function zr({ ayuda: e, ...t }) {
	let n = u(), [i, a] = m(!1), [o, s] = m(!1), c = (e) => s(!!e.getModifierState?.("CapsLock"));
	return /* @__PURE__ */ g(r, {
		...t,
		id: n,
		tipo: i ? "text" : "password",
		autoCapitalize: "off",
		autoCorrect: "off",
		spellCheck: !1,
		onKeyDown: c,
		onKeyUp: c,
		ayuda: o ? /* @__PURE__ */ g("span", {
			"aria-live": "polite",
			children: "Bloq Mayús está activado."
		}) : e,
		adorno: /* @__PURE__ */ g("button", {
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
			children: i ? Rr : Lr
		})
	});
}
// src/Cuenta/PantallaCuenta.jsx
function Br({ usuario: e, accion: t, angosto: n }) {
	let r = n ? 72 : 96;
	return /* @__PURE__ */ _("div", {
		style: {
			borderRadius: "var(--ds-r-card)",
			overflow: "hidden",
			background: "var(--ds-surface)",
			border: "1px solid var(--ds-line)",
			boxShadow: "var(--ds-lift-1)",
			backdropFilter: "var(--ds-blur)",
			WebkitBackdropFilter: "var(--ds-blur)"
		},
		children: [/* @__PURE__ */ g("div", {
			"aria-hidden": !0,
			className: "ds-heroe",
			style: {
				height: n ? 84 : 120,
				background: "var(--ds-hero)"
			}
		}), /* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				alignItems: n ? "flex-start" : "flex-end",
				flexWrap: "wrap",
				gap: "var(--ds-4)",
				padding: n ? "0 var(--ds-4) var(--ds-4)" : "0 var(--ds-6) var(--ds-5)"
			},
			children: [
				/* @__PURE__ */ g("div", {
					style: {
						marginTop: -r / 2,
						borderRadius: "var(--ds-r-pill)",
						lineHeight: 0,
						boxShadow: "0 0 0 4px var(--ds-surface-solid), var(--ds-lift-2)"
					},
					children: /* @__PURE__ */ g(pe, {
						src: e.foto,
						nombre: e.nombre,
						tamano: r
					})
				}),
				/* @__PURE__ */ _("div", {
					style: {
						flex: "1 1 220px",
						minWidth: 0,
						paddingTop: n ? 0 : "var(--ds-3)"
					},
					children: [
						/* @__PURE__ */ g("h1", {
							style: {
								margin: 0,
								fontSize: "var(--ds-t-title)",
								fontWeight: 800,
								letterSpacing: "-0.02em",
								overflowWrap: "anywhere"
							},
							children: e.nombre
						}),
						/* @__PURE__ */ g("div", {
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-2)",
								overflowWrap: "anywhere"
							},
							children: e.correo
						}),
						e.detalle && /* @__PURE__ */ g("div", {
							style: {
								fontSize: "var(--ds-t-small)",
								color: "var(--ds-ink-2)",
								marginTop: 2
							},
							children: e.detalle
						})
					]
				}),
				t
			]
		})]
	});
}
function Vr({ s: e, esta: t, onIr: n, angosto: r }) {
	let i = e.peligro;
	return /* @__PURE__ */ _("button", {
		type: "button",
		onClick: () => n?.(e),
		"aria-current": t ? "page" : void 0,
		style: {
			display: "flex",
			alignItems: "center",
			gap: 10,
			flexShrink: 0,
			textAlign: "left",
			width: r ? "auto" : "100%",
			minHeight: 40,
			padding: r ? "0 14px" : "0 12px",
			border: r ? "1px solid var(--ds-line)" : "none",
			borderRadius: r ? "var(--ds-r-pill)" : "var(--ds-r-item)",
			cursor: "pointer",
			fontFamily: "var(--ds-font)",
			fontSize: "var(--ds-t-small)",
			fontWeight: 700,
			whiteSpace: "nowrap",
			background: t ? "var(--ds-surface-solid)" : "transparent",
			boxShadow: t ? "var(--ds-lift-1)" : "none",
			color: i ? "var(--ds-risk)" : t ? "var(--ds-ink)" : "var(--ds-ink-2)"
		},
		children: [e.icono && /* @__PURE__ */ g("span", {
			style: {
				lineHeight: 0,
				color: i ? "inherit" : t ? "var(--ds-accent-tinta)" : "inherit"
			},
			children: e.icono
		}), e.texto]
	});
}
function Hr({ usuario: e, accion: t, secciones: n = [], activa: r, onIr: i, children: a }) {
	let o = U();
	return /* @__PURE__ */ _("div", {
		style: {
			display: "grid",
			gap: "var(--ds-5)"
		},
		children: [/* @__PURE__ */ g(Br, {
			usuario: e,
			accion: t,
			angosto: o
		}), /* @__PURE__ */ _("div", {
			style: {
				display: "grid",
				gap: "var(--ds-5)",
				alignItems: "start",
				gridTemplateColumns: o ? "minmax(0, 1fr)" : "220px minmax(0, 1fr)"
			},
			children: [/* @__PURE__ */ g("nav", {
				"aria-label": "Secciones de la cuenta",
				style: {
					display: "flex",
					flexDirection: o ? "row" : "column",
					gap: o ? 6 : 2,
					overflowX: o ? "auto" : "visible",
					paddingBottom: o ? 4 : 0
				},
				children: n.map((e) => /* @__PURE__ */ g(Vr, {
					s: e,
					esta: e.id === r,
					onIr: i,
					angosto: o
				}, e.id))
			}), /* @__PURE__ */ g("div", {
				style: {
					display: "grid",
					gap: "var(--ds-5)",
					minWidth: 0
				},
				children: a
			})]
		})]
	});
}
// src/Cuenta/Ajustes.jsx
function Ur({ id: e, titulo: t, descripcion: n, estado: r, children: i, pie: a }) {
	return /* @__PURE__ */ _("section", {
		id: e,
		"aria-labelledby": e ? `${e}-titulo` : void 0,
		style: {
			background: "var(--ds-surface)",
			border: "1px solid var(--ds-line)",
			borderRadius: "var(--ds-r-card)",
			boxShadow: "var(--ds-lift-1)",
			backdropFilter: "var(--ds-blur)",
			WebkitBackdropFilter: "var(--ds-blur)",
			padding: "var(--ds-5) var(--ds-6)"
		},
		children: [
			/* @__PURE__ */ _("header", {
				style: {
					display: "flex",
					alignItems: "flex-start",
					gap: "var(--ds-3)",
					marginBottom: "var(--ds-2)"
				},
				children: [/* @__PURE__ */ _("div", {
					style: {
						flex: 1,
						minWidth: 0
					},
					children: [/* @__PURE__ */ g("h2", {
						id: e ? `${e}-titulo` : void 0,
						style: {
							margin: 0,
							fontSize: "var(--ds-t-body)",
							fontWeight: 800,
							letterSpacing: "-0.01em"
						},
						children: t
					}), n && /* @__PURE__ */ g("p", {
						style: {
							margin: "4px 0 0",
							fontSize: "var(--ds-t-small)",
							color: "var(--ds-ink-2)"
						},
						children: n
					})]
				}), r]
			}),
			/* @__PURE__ */ g("div", { children: i }),
			a && /* @__PURE__ */ g("div", {
				style: {
					display: "flex",
					justifyContent: "flex-end",
					gap: "var(--ds-2)",
					flexWrap: "wrap",
					borderTop: "1px solid var(--ds-line)",
					marginTop: "var(--ds-3)",
					paddingTop: "var(--ds-4)"
				},
				children: a
			})
		]
	});
}
function Wr({ titulo: e, descripcion: t, children: n, primera: r = !1 }) {
	let i = U();
	return /* @__PURE__ */ _("div", {
		style: {
			display: "grid",
			gap: i ? "var(--ds-2)" : "var(--ds-5)",
			alignItems: "center",
			gridTemplateColumns: i ? "minmax(0, 1fr)" : "minmax(0, 1fr) minmax(0, 1.2fr)",
			padding: "var(--ds-4) 0",
			borderTop: r ? "none" : "1px solid var(--ds-line)"
		},
		children: [/* @__PURE__ */ _("div", {
			style: { minWidth: 0 },
			children: [/* @__PURE__ */ g("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					fontWeight: 700,
					color: "var(--ds-ink)"
				},
				children: e
			}), t && /* @__PURE__ */ g("div", {
				style: {
					fontSize: "var(--ds-t-small)",
					color: "var(--ds-ink-2)",
					marginTop: 2
				},
				children: t
			})]
		}), /* @__PURE__ */ g("div", {
			style: {
				minWidth: 0,
				display: "flex",
				justifyContent: i ? "flex-start" : "flex-end"
			},
			children: n
		})]
	});
}
var Gr = /* @__PURE__ */ g("svg", {
	width: "14",
	height: "14",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2.6",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": !0,
	children: /* @__PURE__ */ g("path", { d: "M20 6L9 17l-5-5" })
});
function Kr({ estado: e }) {
	return /* @__PURE__ */ _("span", {
		role: "status",
		"aria-live": "polite",
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 6,
			minHeight: 24,
			whiteSpace: "nowrap",
			fontSize: "var(--ds-t-small)",
			fontWeight: 700,
			color: e === "error" ? "var(--ds-risk)" : e === "guardado" ? "var(--ds-ok)" : "var(--ds-ink-2)"
		},
		children: [e === "guardado" && Gr, e ? {
			guardando: "Guardando…",
			guardado: "Guardado",
			error: "No se pudo guardar"
		}[e] : ""]
	});
}
// src/Cuenta/CargaFoto.jsx
var qr = 512;
function Jr(e) {
	return new Promise((t, n) => {
		let r = URL.createObjectURL(e), i = new Image();
		i.onload = () => {
			let e = Math.min(i.naturalWidth, i.naturalHeight), a = document.createElement("canvas");
			a.width = qr, a.height = qr, a.getContext("2d").drawImage(i, (i.naturalWidth - e) / 2, (i.naturalHeight - e) / 2, e, e, 0, 0, qr, qr), URL.revokeObjectURL(r), a.toBlob((e) => e ? t(new File([e], "foto.jpg", { type: "image/jpeg" })) : n(/* @__PURE__ */ Error("recorte")), "image/jpeg", .88);
		}, i.onerror = () => {
			URL.revokeObjectURL(r), n(/* @__PURE__ */ Error("imagen"));
		}, i.src = r;
	});
}
function Yr({ nombre: e, foto: t, onElegir: n, onQuitar: r, subiendo: i = !1, error: a, maxMb: o = 5 }) {
	let s = u(), c = p(null), [d, f] = m(null), [h, v] = m(!1), [y, b] = m(null);
	l(() => () => {
		d && URL.revokeObjectURL(d);
	}, [d]), l(() => {
		i || f(null);
	}, [i]);
	let x = async (e) => {
		if (e) {
			if (!/^image\/(png|jpeg|webp)$/.test(e.type)) b("Elige una imagen JPG, PNG o WebP.");
			else if (e.size > o * 1024 * 1024) b(`La imagen pesa más de ${o} MB. Elige una más ligera.`);
			else try {
				let t = await Jr(e);
				b(null), f(URL.createObjectURL(t)), n?.(t);
			} catch {
				b("No pudimos leer esa imagen. Prueba con otra.");
			}
		}
	}, S = y || a;
	return /* @__PURE__ */ _("div", {
		onDragOver: (e) => {
			e.preventDefault(), v(!0);
		},
		onDragLeave: () => v(!1),
		onDrop: (e) => {
			e.preventDefault(), v(!1), x(e.dataTransfer.files?.[0]);
		},
		style: {
			display: "flex",
			alignItems: "center",
			gap: "var(--ds-4)",
			flexWrap: "wrap",
			width: "100%",
			padding: "var(--ds-3)",
			borderRadius: "var(--ds-r-item)",
			border: `1px dashed ${h ? "var(--ds-accent-trazo)" : "transparent"}`,
			background: h ? "var(--ds-accent-soft)" : "transparent",
			transition: "background var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease)"
		},
		children: [/* @__PURE__ */ g("div", {
			style: {
				opacity: i ? .6 : 1,
				transition: "opacity var(--ds-t-state) var(--ds-ease)"
			},
			children: /* @__PURE__ */ g(pe, {
				src: d || t,
				nombre: e,
				tamano: 64
			})
		}), /* @__PURE__ */ _("div", {
			style: {
				display: "grid",
				gap: 6,
				flex: "1 1 180px"
			},
			children: [/* @__PURE__ */ _("div", {
				style: {
					display: "flex",
					gap: "var(--ds-2)",
					flexWrap: "wrap"
				},
				children: [
					/* @__PURE__ */ g("input", {
						ref: c,
						id: s,
						type: "file",
						accept: "image/png,image/jpeg,image/webp",
						hidden: !0,
						onChange: (e) => {
							x(e.target.files?.[0]), e.target.value = "";
						}
					}),
					/* @__PURE__ */ g(H, {
						type: "button",
						esperando: i,
						onClick: () => c.current?.click(),
						children: t ? "Cambiar foto" : "Subir foto"
					}),
					t && r && /* @__PURE__ */ g(H, {
						type: "button",
						variante: "fantasma",
						onClick: r,
						children: "Quitar"
					})
				]
			}), /* @__PURE__ */ g("div", {
				role: S ? "alert" : void 0,
				style: {
					fontSize: "var(--ds-t-small)",
					color: S ? "var(--ds-risk)" : "var(--ds-ink-2)"
				},
				children: S || `O arrástrala aquí. JPG, PNG o WebP de hasta ${o} MB; se recorta en cuadrado.`
			})]
		})]
	});
}
// src/Cuenta/ZonaPeligro.jsx
function Xr({ titulo: e, descripcion: t, boton: n, consecuencias: i, palabra: a = "BORRAR", pideClave: o = !0, onConfirmar: s, esperando: c = !1, error: l }) {
	let [u, d] = m(!1), [f, p] = m(""), [v, y] = m(""), [b, x] = m({}), S = () => {
		d(!1), p(""), y(""), x({});
	};
	return /* @__PURE__ */ _("section", {
		"aria-labelledby": "zona-peligro-titulo",
		style: {
			border: "1px solid var(--ds-risk)",
			borderRadius: "var(--ds-r-card)",
			padding: "var(--ds-5) var(--ds-6)",
			background: "var(--ds-risk-soft)"
		},
		children: [/* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: "var(--ds-4)",
				flexWrap: "wrap"
			},
			children: [/* @__PURE__ */ _("div", {
				style: {
					flex: "1 1 260px",
					minWidth: 0
				},
				children: [/* @__PURE__ */ g("h2", {
					id: "zona-peligro-titulo",
					style: {
						margin: 0,
						fontSize: "var(--ds-t-body)",
						fontWeight: 800,
						color: "var(--ds-risk)"
					},
					children: e
				}), t && /* @__PURE__ */ g("p", {
					style: {
						margin: "4px 0 0",
						fontSize: "var(--ds-t-small)",
						color: "var(--ds-ink)"
					},
					children: t
				})]
			}), /* @__PURE__ */ g(H, {
				type: "button",
				variante: "peligro",
				onClick: () => d(!0),
				"aria-haspopup": "dialog",
				children: n
			})]
		}), /* @__PURE__ */ g(Ae, {
			abierto: u,
			onCerrar: S,
			titulo: e,
			ancho: 460,
			acciones: /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g(H, {
				type: "button",
				variante: "fantasma",
				onClick: S,
				children: "Cancelar"
			}), /* @__PURE__ */ g(H, {
				type: "button",
				variante: "peligro",
				esperando: c,
				onClick: () => {
					let e = {};
					f.trim() !== a && (e.palabra = `Escribe ${a} tal cual, en mayúsculas.`), o && !v && (e.clave = "Escribe tu contraseña."), x(e), Object.keys(e).length === 0 && s?.({ clave: v });
				},
				children: n
			})] }),
			children: /* @__PURE__ */ _("div", {
				style: {
					display: "grid",
					gap: "var(--ds-4)"
				},
				children: [
					i && /* @__PURE__ */ g("div", {
						style: {
							fontSize: "var(--ds-t-small)",
							color: "var(--ds-ink)"
						},
						children: i
					}),
					l && /* @__PURE__ */ g("div", {
						role: "alert",
						style: {
							fontSize: "var(--ds-t-small)",
							fontWeight: 700,
							color: "var(--ds-risk)"
						},
						children: l
					}),
					o && /* @__PURE__ */ g(zr, {
						etiqueta: "Tu contraseña",
						valor: v,
						onCambio: y,
						error: b.clave,
						autoComplete: "current-password"
					}),
					/* @__PURE__ */ g(r, {
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
// src/marca/Zentrya.jsx
var Zr = "#00E5FF";
function Qr({ tamano: e = 28 }) {
	return /* @__PURE__ */ _("svg", {
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
			/* @__PURE__ */ g("rect", {
				x: "20",
				y: "40",
				width: "80",
				height: "80",
				rx: "16",
				fill: "var(--ds-ink)"
			}),
			/* @__PURE__ */ g("path", {
				d: "M 42 68 L 78 68 L 42 96 L 78 96",
				fill: "none",
				stroke: "var(--ds-surface-solid)",
				strokeWidth: "5",
				strokeLinecap: "square"
			}),
			/* @__PURE__ */ g("circle", {
				cx: "78",
				cy: "96",
				r: "3",
				fill: Zr
			})
		]
	});
}
// src/primitivas/SelectorPeriodo.jsx
var $r = (e) => String(e).padStart(2, "0"), ei = (e) => `${e.getFullYear()}-${$r(e.getMonth() + 1)}-${$r(e.getDate())}`, ti = (e) => {
	let [t, n, r] = String(e).slice(0, 10).split("-").map(Number);
	return new Date(t, n - 1, r);
}, ni = (e, t) => {
	let n = new Date(e);
	return n.setDate(n.getDate() + t), n;
}, ri = [
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
function ii(e, t = /* @__PURE__ */ new Date()) {
	let n = t instanceof Date ? new Date(t.getFullYear(), t.getMonth(), t.getDate()) : ti(t), r = n.getFullYear(), i = n.getMonth(), a, o;
	switch (e) {
		case "hoy":
			a = n, o = n;
			break;
		case "ayer":
			a = ni(n, -1), o = a;
			break;
		case "7d":
			a = ni(n, -6), o = n;
			break;
		case "30d":
			a = ni(n, -29), o = n;
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
	let s = ri.find((t) => t.clave === e);
	return {
		clave: e,
		desde: ei(a),
		hasta: ei(o),
		etiqueta: s?.etiqueta ?? e
	};
}
function ai(e, t) {
	return e ? e === t ? q(e, "media") : `${q(e, "media")} – ${q(t, "media")}` : "";
}
function oi({ valor: e, onCambio: t, opciones: n, fechaBase: r, etiqueta: i = "Periodo", estilo: a }) {
	let o = p(null), [s, c] = m(!1), l = r ?? /* @__PURE__ */ new Date(), u = ri.filter((e) => !n || n.includes(e.clave)), d = e ? ii(e, l) : null;
	return /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ _("button", {
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
			/* @__PURE__ */ _("svg", {
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
				children: [/* @__PURE__ */ g("rect", {
					x: "3",
					y: "5",
					width: "18",
					height: "16",
					rx: "3"
				}), /* @__PURE__ */ g("path", { d: "M16 3v4M8 3v4M3 10h18" })]
			}),
			/* @__PURE__ */ g("span", {
				style: {
					fontSize: "var(--ds-t-micro)",
					fontWeight: 700,
					color: "var(--ds-ink-3)",
					textTransform: "uppercase",
					letterSpacing: "0.05em"
				},
				children: i
			}),
			/* @__PURE__ */ g("span", {
				style: {
					fontSize: "var(--ds-t-small)",
					fontWeight: 800,
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis"
				},
				children: d ? d.etiqueta : "Elegir"
			}),
			/* @__PURE__ */ g("svg", {
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
				children: /* @__PURE__ */ g("path", { d: "M6 9l6 6 6-6" })
			})
		]
	}), /* @__PURE__ */ g(Pe, {
		ancla: o,
		abierto: s,
		onCerrar: () => c(!1),
		etiqueta: i,
		minAncho: 250,
		children: u.map((n) => {
			let r = ii(n.clave, l);
			return /* @__PURE__ */ g(Fe, {
				elegida: n.clave === e,
				nota: ai(r.desde, r.hasta),
				onClick: () => {
					c(!1), t?.(r);
				},
				children: n.etiqueta
			}, n.clave);
		})
	})] });
}
// src/primitivas/Chip.jsx
function si({ texto: e, valor: t, onQuitar: n, estilo: r }) {
	let i = t != null && t !== "" ? `${e}: ${t}` : e;
	return /* @__PURE__ */ _("span", {
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
		children: [/* @__PURE__ */ g("span", {
			style: {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				minWidth: 0
			},
			children: t != null && t !== "" ? /* @__PURE__ */ _(h, { children: [
				/* @__PURE__ */ _("span", {
					style: { color: "var(--ds-ink-2)" },
					children: [e, ":"]
				}),
				" ",
				/* @__PURE__ */ g("strong", {
					style: { fontWeight: 800 },
					children: t
				})
			] }) : /* @__PURE__ */ g("strong", {
				style: { fontWeight: 800 },
				children: e
			})
		}), n && /* @__PURE__ */ g("button", {
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
			children: /* @__PURE__ */ g("svg", {
				width: "12",
				height: "12",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "3",
				strokeLinecap: "round",
				"aria-hidden": !0,
				children: /* @__PURE__ */ g("path", { d: "M18 6L6 18M6 6l12 12" })
			})
		})]
	});
}
function ci({ children: e, activos: t = [], onQuitar: n, onLimpiar: r, resultado: i, estilo: a }) {
	return /* @__PURE__ */ _("div", {
		role: "search",
		style: {
			marginBottom: "var(--ds-4)",
			...a
		},
		children: [/* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				flexWrap: "wrap",
				alignItems: "center",
				gap: "var(--ds-2)"
			},
			children: [e, i && /* @__PURE__ */ g("span", {
				className: "ds-num",
				style: {
					marginLeft: "auto",
					fontSize: "var(--ds-t-small)",
					fontWeight: 700,
					color: "var(--ds-ink-3)",
					whiteSpace: "nowrap"
				},
				children: i
			})]
		}), t.length > 0 && /* @__PURE__ */ _("div", {
			"aria-live": "polite",
			style: {
				display: "flex",
				flexWrap: "wrap",
				alignItems: "center",
				gap: "var(--ds-2)",
				marginTop: "var(--ds-3)"
			},
			children: [t.map((e) => /* @__PURE__ */ g(si, {
				texto: e.texto,
				valor: e.valor,
				onQuitar: n ? () => n(e.clave) : void 0
			}, e.clave)), r && t.length > 1 && /* @__PURE__ */ g("button", {
				type: "button",
				onClick: r,
				style: {
					border: "none",
					background: "transparent",
					cursor: "pointer",
					padding: "4px 8px",
					fontFamily: "var(--ds-font)",
					fontSize: "var(--ds-t-small)",
					fontWeight: 700,
					color: "var(--ds-accent-tinta)",
					borderRadius: 8
				},
				children: "Limpiar todo"
			})]
		})]
	});
}
// src/graficas/GraficaLinea.jsx
var li = 6.6, ui = (e) => [...String(e ?? "")].reduce((e, t) => e + (t >= "A" && t <= "Z" ? 8 : t === " " ? 3.4 : li), 0), di = 140, fi = (e, t) => {
	let n = String(e ?? "");
	if (ui(n) <= t) return n;
	let r = n;
	for (; r.length > 1 && ui(r + "…") > t;) r = r.slice(0, -1);
	return r.trimEnd() + "…";
};
function pi({ series: e = [], etiquetas: t = [], alto: n = 240, formato: r = "numero", area: i = !1, apilada: a = !1, meta: o, titulo: s, cero: c = !0, estilo: l }) {
	let [u, d] = hn(), [p, h] = m(null), v = Math.max(t.length, ...e.map((e) => (e.valores || []).length), 0), y = a && i, b = o == null ? null : typeof o == "object" ? o.valor : o, x = o && typeof o == "object" && o.texto ? o.texto : "Meta", S = f(() => {
		let t = Array(v).fill(0);
		return e.map((e) => {
			let n = Array.from({ length: v }, (t, n) => {
				let r = e.valores?.[n];
				return r == null || !Number.isFinite(Number(r)) ? null : Number(r);
			});
			return y ? {
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
		v,
		y
	]), C = S.flatMap((e) => e.arriba.filter((e) => e !== null));
	b !== null && C.push(Number(b));
	let w = C.length > 0 && v > 0, T = w ? Math.min(...C) : 0, E = w ? Math.max(...C) : 1, { marcas: D, min: O, max: k } = gn(c ? Math.min(0, T) : T, c ? Math.max(0, E) : E, n < 200 ? 3 : 4), A = r === "moneda" ? "monedaCompacta" : r === "numero" ? "compacto" : r, j = e.length > 1 && e.length <= 4 && d >= 420 && !y, M = Math.max(...D.map((e) => String(Q(e, A)).length)) * li + 12, ee = j ? Math.min(di, Math.max(...e.map((e) => ui(e.nombre))) + 14) : 10, N = Math.max(10, d - M - ee), P = n - 10 - 24, F = (e) => M + (v <= 1 ? N / 2 : e / (v - 1) * N), I = _n(O, k, 10 + P, 10), te = Math.max(3, ...Array.from({ length: v }, (e, n) => String(t[n] ?? n + 1).length)) * li + 12, ne = Math.max(2, Math.min(d < 420 ? 4 : Infinity, Math.floor(N / te))), re = Math.max(1, Math.ceil(v / ne)), L = [], R = -Infinity;
	for (let e = 0; e < v; e += re) {
		let n = String(t[e] ?? e + 1).length * li, r = v > 1 && e === 0 ? "start" : v > 1 && e >= v - 1 ? "end" : "middle", i = r === "start" ? F(e) : r === "end" ? F(e) - n : F(e) - n / 2;
		i >= R + 8 && (L.push({
			i: e,
			ancla: r
		}), R = i + n);
	}
	let z = (e) => {
		let t = [], n = [];
		return e.forEach((e, r) => {
			e === null ? (n.length && t.push(n), n = []) : n.push(r);
		}), n.length && t.push(n), t;
	}, ie = {
		columnas: ["", ...e.map((e) => e.nombre)],
		filas: Array.from({ length: v }, (e, n) => [t[n] ?? n + 1, ...S.map((e) => Q(e.crudo[n], r))])
	}, ae = (e) => {
		if (!w) return;
		let t = e.currentTarget.getBoundingClientRect(), n = e.clientX - t.left, r = v <= 1 ? 0 : Math.round((n - M) / N * (v - 1));
		h(Math.max(0, Math.min(v - 1, r)));
	}, B = (e) => {
		e.key === "ArrowRight" && (e.preventDefault(), h((e) => Math.min(v - 1, (e ?? -1) + 1))), e.key === "ArrowLeft" && (e.preventDefault(), h((e) => Math.max(0, (e ?? v) - 1))), e.key === "Escape" && h(null);
	}, oe = p === null ? 0 : Math.min(...S.map((e) => e.arriba[p] === null ? 10 + P : I(e.arriba[p])));
	return /* @__PURE__ */ g(Z, {
		titulo: s,
		series: e,
		formaLeyenda: "linea",
		tabla: w ? ie : null,
		estilo: l,
		alto: n,
		children: /* @__PURE__ */ _("div", {
			ref: u,
			style: {
				position: "relative",
				minWidth: 0
			},
			children: [w ? d > 0 && /* @__PURE__ */ _("svg", {
				width: d,
				height: n,
				role: "img",
				tabIndex: 0,
				"aria-label": `${s ? `${s}: ` : ""}${e.length} serie(s), ${v} puntos. Flechas para recorrer.`,
				style: {
					display: "block",
					overflow: "visible",
					outline: "none"
				},
				onMouseMove: ae,
				onMouseLeave: () => h(null),
				onFocus: () => h((e) => e === null ? v - 1 : e),
				onBlur: () => h(null),
				onKeyDown: B,
				children: [
					D.map((e) => /* @__PURE__ */ _("g", { children: [/* @__PURE__ */ g("line", {
						x1: M,
						x2: M + N,
						y1: I(e),
						y2: I(e),
						stroke: e === 0 ? "var(--ds-eje)" : "var(--ds-grid)",
						strokeWidth: "1"
					}), /* @__PURE__ */ g("text", {
						x: M - 8,
						y: I(e),
						dy: "0.32em",
						textAnchor: "end",
						style: X,
						children: Q(e, A)
					})] }, e)),
					L.map(({ i: e, ancla: r }) => /* @__PURE__ */ g("text", {
						x: F(e),
						y: n - 6,
						textAnchor: r,
						style: X,
						children: t[e] ?? e + 1
					}, e)),
					i && S.map((t, n) => z(t.arriba).map((r, i) => {
						let a = (e) => t.abajo ? I(t.abajo[e]) : I(Math.max(O, Math.min(0, k))), o = `M${F(r[0])},${a(r[0])} ` + r.map((e) => `L${F(e)},${I(t.arriba[e])}`).join(" ") + ` ${[...r].reverse().map((e) => `L${F(e)},${a(e)}`).join(" ")} Z`;
						return /* @__PURE__ */ g("path", {
							d: o,
							fill: Y(e[n], n),
							fillOpacity: y ? .55 : .12,
							stroke: "none"
						}, `a${n}-${i}`);
					})),
					S.map((t, n) => z(t.arriba).map((r, i) => r.length === 1 ? /* @__PURE__ */ g("circle", {
						cx: F(r[0]),
						cy: I(t.arriba[r[0]]),
						r: "3",
						fill: Y(e[n], n)
					}, `p${n}-${i}`) : /* @__PURE__ */ g("path", {
						fill: "none",
						stroke: Y(e[n], n),
						strokeWidth: "2",
						strokeLinejoin: "round",
						strokeLinecap: "round",
						d: r.map((e, n) => `${n ? "L" : "M"}${F(e)},${I(t.arriba[e])}`).join(" ")
					}, `l${n}-${i}`))),
					b !== null && /* @__PURE__ */ _("g", { children: [/* @__PURE__ */ g("line", {
						x1: M,
						x2: M + N,
						y1: I(b),
						y2: I(b),
						stroke: "var(--ds-ink-2)",
						strokeWidth: "1.5",
						strokeDasharray: "5 4"
					}), /* @__PURE__ */ _("text", {
						x: M + 6,
						y: I(b) - 6,
						style: {
							...X,
							fill: "var(--ds-ink-2)",
							fontWeight: 700
						},
						children: [
							x,
							" · ",
							Q(b, r)
						]
					})] }),
					j && (() => {
						let t = S.map((e, t) => {
							let n = e.arriba.map((e, t) => e === null ? -1 : t).filter((e) => e >= 0).pop();
							return n === void 0 ? null : {
								si: t,
								yv: I(e.arriba[n]),
								xv: F(n)
							};
						}).filter(Boolean).sort((e, t) => e.yv - t.yv);
						for (let e = 1; e < t.length; e++) t[e].yv - t[e - 1].yv < 14 && (t[e].yv = t[e - 1].yv + 14);
						return t.map((t) => /* @__PURE__ */ _("text", {
							x: M + N + 8,
							y: t.yv,
							dy: "0.32em",
							style: {
								...X,
								fill: "var(--ds-ink-2)",
								fontWeight: 700
							},
							children: [/* @__PURE__ */ g("title", { children: e[t.si].nombre }), fi(e[t.si].nombre, ee - 12)]
						}, t.si));
					})(),
					p !== null && /* @__PURE__ */ _("g", {
						pointerEvents: "none",
						children: [/* @__PURE__ */ g("line", {
							x1: F(p),
							x2: F(p),
							y1: 10,
							y2: 10 + P,
							stroke: "var(--ds-eje)",
							strokeWidth: "1"
						}), S.map((t, n) => t.arriba[p] !== null && /* @__PURE__ */ g("circle", {
							cx: F(p),
							cy: I(t.arriba[p]),
							r: "4.5",
							fill: Y(e[n], n),
							stroke: "var(--ds-surface-solid)",
							strokeWidth: "2"
						}, n))]
					}),
					/* @__PURE__ */ g("rect", {
						x: M,
						y: 10,
						width: N,
						height: P,
						fill: "transparent"
					})
				]
			}) : /* @__PURE__ */ g($, { alto: n }), /* @__PURE__ */ g(bn, {
				visible: p !== null,
				x: p === null ? 0 : F(p),
				y: oe,
				ancho: d,
				titulo: p === null ? "" : t[p],
				renglones: p === null ? [] : e.map((e, t) => ({
					color: Y(e, t),
					nombre: e.nombre,
					valor: Q(S[t].crudo[p], r)
				}))
			})]
		})
	});
}
// src/graficas/GraficaBarras.jsx
var mi = 6.6, hi = 4, gi = 2;
function _i(e, t, n, r, i) {
	if (n <= 0 || r <= 0) return "";
	let a = Math.min(hi, n / 2, r / 2);
	return i === "arriba" ? `M${e},${t + r} L${e},${t + a} Q${e},${t} ${e + a},${t} L${e + n - a},${t} Q${e + n},${t} ${e + n},${t + a} L${e + n},${t + r} Z` : i === "abajo" ? `M${e},${t} L${e + n},${t} L${e + n},${t + r - a} Q${e + n},${t + r} ${e + n - a},${t + r} L${e + a},${t + r} Q${e},${t + r} ${e},${t + r - a} Z` : i === "derecha" ? `M${e},${t} L${e + n - a},${t} Q${e + n},${t} ${e + n},${t + a} L${e + n},${t + r - a} Q${e + n},${t + r} ${e + n - a},${t + r} L${e},${t + r} Z` : i === "izquierda" ? `M${e + n},${t} L${e + n},${t + r} L${e + a},${t + r} Q${e},${t + r} ${e},${t + r - a} L${e},${t + a} Q${e},${t} ${e + a},${t} Z` : `M${e},${t} h${n} v${r} h${-n} Z`;
}
var vi = (e, t) => {
	let n = String(e ?? ""), r = Math.max(3, Math.floor(t / mi));
	return n.length > r ? `${n.slice(0, r - 1)}…` : n;
};
function yi({ datos: e, categorias: t, series: n, horizontal: r = !1, apiladas: i = !1, etiquetas: a = !1, resaltar: o, alto: s, formato: c = "numero", titulo: l, estilo: u }) {
	let [d, f] = hn(), [p, h] = m(null), v = e ? e.map((e) => e.etiqueta) : t || [], y = e ? [{
		clave: "valor",
		nombre: l || "Valor",
		valores: e.map((e) => e.valor),
		color: e[0]?.color
	}] : n || [], b = v.length, x = y.length, S = (e, t) => {
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
	let T = b > 0 && x > 0 && y.some((e, t) => v.some((e, n) => S(t, n) !== null)), E = r ? f - Math.min(f * .38, 170) - 10 - (a ? 64 : 12) : 0, D = r ? Math.max(2, Math.min(4, Math.floor(E / 72))) : 4, { marcas: O, min: k, max: A } = gn(C, w, D), j = c === "moneda" ? "monedaCompacta" : c === "numero" ? "compacto" : c, M = s ?? (r ? Math.max(120, b * (x > 1 && !i ? 18 * x + 14 : 34) + 34) : 240), ee = r ? Math.min(f * .38, 170) : 0, N = a ? 64 : 12, P = r ? ee + 10 : Math.max(...O.map((e) => String(Q(e, j)).length)) * mi + 12, F = r ? N : 6, I = a && !r ? 18 : 8, te = y.some((e) => (e.valores || []).some((e) => Number(e) < 0)), ne = r ? 22 : 24 + (a && te ? 16 : 0), re = Math.max(10, f - P - F), L = M - I - ne, R = (r ? L : re) / Math.max(1, b), z = R * (r ? .22 : .26), ie = R - z, ae = i || x === 1 ? ie : (ie - gi * (x - 1)) / x, B = r ? _n(k, A, P, P + re) : _n(k, A, I + L, I), oe = B(0), se = (e) => o == null || o === e ? 1 : .35, ce = (e) => {
		let t = [], n = (r ? I : P) + e * R + z / 2;
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
				off: n + i * (ae + gi),
				grueso: ae,
				desde: 0,
				hasta: a,
				si: i,
				extremo: !0
			});
		});
		return t;
	}, le = (e) => {
		let t = B(e.desde), n = B(e.hasta), a = e.hasta >= e.desde, o = i && !e.extremo ? gi : 0;
		if (r) {
			let r = Math.min(t, n), i = Math.abs(n - t), s = e.extremo ? a ? "derecha" : "izquierda" : "ninguno";
			return _i(a ? r : r + o, e.off, i - o, e.grueso, s);
		}
		let s = Math.min(t, n), c = Math.abs(n - t), l = e.extremo ? a ? "arriba" : "abajo" : "ninguno";
		return a ? _i(e.off, s + o, e.grueso, c - o, l) : _i(e.off, s, e.grueso, c - o, l);
	}, ue = (e) => y.reduce((t, n, r) => t + (S(r, e) ?? 0), 0), de = {
		columnas: ["", ...y.map((e) => e.nombre)],
		filas: v.map((e, t) => [e, ...y.map((e, n) => Q(S(n, t), c))])
	}, V = (e) => (r ? I : P) + e * R + R / 2, H = p === null ? {
		x: 0,
		y: 0
	} : r ? {
		x: Math.min(f - 10, B(Math.max(0, i ? ue(p) : Math.max(...y.map((e, t) => S(t, p) ?? 0))))),
		y: V(p)
	} : {
		x: V(p),
		y: I + L / 3
	}, fe = Math.max(1, Math.ceil(b * 44 / Math.max(1, re)));
	return /* @__PURE__ */ g(Z, {
		titulo: l,
		series: x > 1 ? y : [],
		tabla: T ? de : null,
		estilo: u,
		alto: M,
		children: /* @__PURE__ */ _("div", {
			ref: d,
			style: {
				position: "relative",
				minWidth: 0
			},
			children: [T ? f > 0 && /* @__PURE__ */ _("svg", {
				width: f,
				height: M,
				role: "img",
				style: {
					display: "block",
					overflow: "visible"
				},
				"aria-label": `${l ? `${l}: ` : ""}${b} categorías`,
				children: [
					O.map((e) => r ? /* @__PURE__ */ _("g", { children: [/* @__PURE__ */ g("line", {
						x1: B(e),
						x2: B(e),
						y1: I,
						y2: I + L,
						stroke: e === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
					}), /* @__PURE__ */ g("text", {
						x: B(e),
						y: M - 6,
						textAnchor: "middle",
						style: X,
						children: Q(e, j)
					})] }, e) : /* @__PURE__ */ _("g", { children: [/* @__PURE__ */ g("line", {
						x1: P,
						x2: P + re,
						y1: B(e),
						y2: B(e),
						stroke: e === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
					}), /* @__PURE__ */ g("text", {
						x: P - 8,
						y: B(e),
						dy: "0.32em",
						textAnchor: "end",
						style: X,
						children: Q(e, j)
					})] }, e)),
					v.map((e, t) => /* @__PURE__ */ _("g", {
						tabIndex: 0,
						opacity: se(t),
						"aria-label": `${e}: ${y.map((e, n) => `${x > 1 ? `${e.nombre} ` : ""}${Q(S(n, t), c)}`).join(", ")}`,
						onMouseEnter: () => h(t),
						onMouseLeave: () => h(null),
						onFocus: () => h(t),
						onBlur: () => h(null),
						style: {
							outline: "none",
							transition: "opacity var(--ds-t-state) var(--ds-ease)"
						},
						children: [
							r ? /* @__PURE__ */ g("rect", {
								x: P,
								y: I + t * R,
								width: re,
								height: R,
								fill: p === t ? "var(--ds-surface-sunk)" : "transparent"
							}) : /* @__PURE__ */ g("rect", {
								x: P + t * R,
								y: I,
								width: R,
								height: L,
								fill: p === t ? "var(--ds-surface-sunk)" : "transparent"
							}),
							ce(t).map((e, t) => /* @__PURE__ */ g("path", {
								d: le(e),
								fill: Y(y[e.si], e.si)
							}, t)),
							r ? /* @__PURE__ */ _("text", {
								x: P - 10,
								y: V(t),
								dy: "0.32em",
								textAnchor: "end",
								style: {
									...X,
									fontSize: 12,
									fill: "var(--ds-ink-2)"
								},
								children: [/* @__PURE__ */ g("title", { children: e }), vi(e, ee)]
							}) : t % fe === 0 && /* @__PURE__ */ _("text", {
								x: V(t),
								y: M - 6,
								textAnchor: "middle",
								style: X,
								children: [/* @__PURE__ */ g("title", { children: e }), vi(e, R * fe - 4)]
							}),
							a && (() => {
								let e = i || x === 1 ? i ? ue(t) : S(0, t) : null;
								if (e === null) return null;
								let n = Q(e, j);
								if (r) {
									let r = B(e);
									return /* @__PURE__ */ g("text", {
										x: e >= 0 ? r + 6 : r - 6,
										y: V(t),
										dy: "0.32em",
										textAnchor: e >= 0 ? "start" : "end",
										style: {
											...X,
											fill: "var(--ds-ink)",
											fontWeight: 800
										},
										children: n
									});
								}
								if (R < 34) return null;
								let a = B(e);
								return /* @__PURE__ */ g("text", {
									x: V(t),
									y: e >= 0 ? a - 6 : a + 14,
									textAnchor: "middle",
									style: {
										...X,
										fill: "var(--ds-ink)",
										fontWeight: 800
									},
									children: n
								});
							})()
						]
					}, t)),
					r ? /* @__PURE__ */ g("line", {
						x1: oe,
						x2: oe,
						y1: I,
						y2: I + L,
						stroke: "var(--ds-eje)"
					}) : /* @__PURE__ */ g("line", {
						x1: P,
						x2: P + re,
						y1: oe,
						y2: oe,
						stroke: "var(--ds-eje)"
					})
				]
			}) : /* @__PURE__ */ g($, { alto: M }), /* @__PURE__ */ g(bn, {
				visible: p !== null,
				x: H.x,
				y: H.y,
				ancho: f,
				titulo: p === null ? "" : v[p],
				renglones: p === null ? [] : [...y.map((e, t) => ({
					color: Y(e, t),
					nombre: e.nombre,
					valor: Q(S(t, p), c)
				})), ...i && x > 1 ? [{
					nombre: "Total",
					valor: Q(ue(p), c)
				}] : []]
			})]
		})
	});
}
// src/graficas/Dona.jsx
var bi = 6;
function xi(e, t, n, r, i, a) {
	let o = (n, r) => [e + n * Math.sin(r), t - n * Math.cos(r)], s = +(a - i > Math.PI), [c, l] = o(r, i), [u, d] = o(r, a), [f, p] = o(n, a), [m, h] = o(n, i);
	return `M${c},${l} A${r},${r} 0 ${s} 1 ${u},${d} L${f},${p} A${n},${n} 0 ${s} 0 ${m},${h} Z`;
}
function Si({ datos: e = [], formato: t = "numero", totalEtiqueta: n = "Total", tamano: r = 200, grosor: i = 26, titulo: a, estilo: o }) {
	let [s, c] = m(null), l = e.map((e, t) => ({
		...e,
		propio: e.color,
		color: e.color || Y(null, t),
		valor: Number(e.valor)
	})).filter((e) => Number.isFinite(e.valor) && e.valor > 0), u = l;
	if (l.length > bi) {
		let e = [...l].sort((e, t) => t.valor - e.valor), t = e.slice(5);
		u = [...e.slice(0, 5).map((e, t) => ({
			...e,
			color: e.propio || Y(null, t)
		})), {
			etiqueta: `Otros (${t.length})`,
			valor: t.reduce((e, t) => e + t.valor, 0),
			color: "var(--ds-ink-3)",
			otros: !0
		}];
	}
	let d = u.reduce((e, t) => e + t.valor, 0), f = r / 2, p = r / 2, h = r / 2 - 4, v = h - i, y = u.length > 1 ? 2 / h : 0, b = 0, x = u.map((e) => {
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
			Q(e.valor, t),
			K(e.valor / d)
		])
	}, C = s === null ? {
		t: n,
		v: Q(d, t)
	} : {
		t: u[s].etiqueta,
		v: Q(u[s].valor, t)
	};
	return /* @__PURE__ */ g(Z, {
		titulo: a,
		tabla: d > 0 ? S : null,
		estilo: o,
		alto: r,
		children: d <= 0 ? /* @__PURE__ */ g($, { alto: r }) : /* @__PURE__ */ _("div", {
			style: {
				display: "flex",
				flexWrap: "wrap",
				alignItems: "center",
				gap: "var(--ds-5)"
			},
			children: [/* @__PURE__ */ _("div", {
				style: {
					position: "relative",
					width: r,
					height: r,
					flexShrink: 0,
					margin: "0 auto"
				},
				children: [/* @__PURE__ */ g("svg", {
					width: r,
					height: r,
					role: "img",
					style: { display: "block" },
					"aria-label": `${a ? `${a}: ` : ""}${u.map((e) => `${e.etiqueta} ${K(e.valor / d)}`).join(", ")}`,
					children: u.length === 1 ? /* @__PURE__ */ g("path", {
						d: `${xi(f, p, v, h, 0, Math.PI)} ${xi(f, p, v, h, Math.PI, Math.PI * 2)}`,
						fill: u[0].color
					}) : u.map((e, t) => /* @__PURE__ */ g("path", {
						d: xi(f, p, s === t ? v - 3 : v, s === t ? h + 2 : h, x[t].a0, x[t].a1),
						fill: e.color,
						opacity: s === null || s === t ? 1 : .4,
						onMouseEnter: () => c(t),
						onMouseLeave: () => c(null),
						style: {
							transition: "opacity var(--ds-t-state) var(--ds-ease)",
							cursor: "default"
						}
					}, t))
				}), /* @__PURE__ */ _("div", {
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
						/* @__PURE__ */ g("div", {
							style: {
								fontSize: "var(--ds-t-micro)",
								fontWeight: 700,
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
						/* @__PURE__ */ g("div", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-num-m)",
								fontWeight: 800,
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
						s !== null && /* @__PURE__ */ g("div", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-t-small)",
								fontWeight: 700,
								color: "var(--ds-ink-2)"
							},
							children: K(u[s].valor / d)
						})
					]
				})]
			}), /* @__PURE__ */ g("div", {
				role: "list",
				style: {
					flex: "1 1 180px",
					minWidth: 0,
					display: "grid",
					gap: 2
				},
				children: u.map((e, n) => /* @__PURE__ */ _("div", {
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
						/* @__PURE__ */ g(vn, { color: e.color }),
						/* @__PURE__ */ g("span", {
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
						/* @__PURE__ */ g("span", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-t-small)",
								fontWeight: 800,
								color: "var(--ds-ink)"
							},
							children: Q(e.valor, t)
						}),
						/* @__PURE__ */ g("span", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-t-micro)",
								fontWeight: 700,
								color: "var(--ds-ink-3)",
								minWidth: 44,
								textAlign: "right"
							},
							children: K(e.valor / d)
						})
					]
				}, n))
			})]
		})
	});
}
// src/graficas/Embudo.jsx
var Ci = [
	5,
	4,
	3,
	2
], wi = (e, t) => Ci[t <= 1 ? 0 : Math.round(e / (t - 1) * (Ci.length - 1))];
function Ti({ etapas: e = [], formato: t = "numero", titulo: n, estilo: r }) {
	let [i, a] = hn(), o = e.filter((e) => Number.isFinite(Number(e.valor))), s = Math.max(0, ...o.map((e) => Number(e.valor))), c = Number(o[0]?.valor), l = a > 0 && a < 460, u = {
		columnas: [
			"Etapa",
			"Valor",
			"vs anterior",
			"vs inicio"
		],
		filas: o.map((e, n) => [
			e.etiqueta,
			Q(e.valor, t),
			n === 0 ? "—" : K(Number(o[n - 1].valor) ? Number(e.valor) / Number(o[n - 1].valor) : null),
			n === 0 ? "—" : K(c ? Number(e.valor) / c : null)
		])
	};
	return /* @__PURE__ */ g(Z, {
		titulo: n,
		tabla: s > 0 ? u : null,
		estilo: r,
		children: /* @__PURE__ */ g("div", {
			ref: i,
			style: { minWidth: 0 },
			children: s <= 0 ? /* @__PURE__ */ g($, {}) : /* @__PURE__ */ g("ol", {
				style: {
					listStyle: "none",
					margin: 0,
					padding: 0,
					display: "grid",
					gap: l ? 12 : 6
				},
				children: o.map((e, n) => {
					let r = Number(e.valor), i = n > 0 ? Number(o[n - 1].valor) : null, a = i ? r / i : null, u = c ? r / c : null, d = /* @__PURE__ */ g("div", {
						style: {
							height: 30,
							display: "flex",
							justifyContent: "center",
							background: "var(--ds-surface-sunk)",
							borderRadius: "var(--ds-r-item)",
							overflow: "hidden"
						},
						children: /* @__PURE__ */ g("div", { style: {
							width: `${Math.max(1.5, r / s * 100)}%`,
							height: "100%",
							background: `var(--ds-sec-${wi(n, o.length)})`,
							borderRadius: "var(--ds-r-item)",
							transition: "width var(--ds-t-move) var(--ds-ease)"
						} })
					}), f = /* @__PURE__ */ _("div", {
						style: {
							display: "flex",
							alignItems: "baseline",
							gap: 8,
							justifyContent: l ? "flex-start" : "flex-end",
							flexWrap: "wrap"
						},
						children: [/* @__PURE__ */ g("span", {
							className: "ds-num",
							style: {
								fontWeight: 800,
								color: "var(--ds-ink)",
								fontSize: "var(--ds-t-body)"
							},
							children: Q(r, t)
						}), n > 0 && /* @__PURE__ */ _("span", {
							className: "ds-num",
							style: {
								fontSize: "var(--ds-t-micro)",
								fontWeight: 700,
								color: "var(--ds-ink-3)",
								whiteSpace: "nowrap"
							},
							children: [
								K(a),
								" de la anterior · ",
								K(u),
								" del inicio"
							]
						})]
					}), p = /* @__PURE__ */ g("div", {
						style: {
							fontSize: "var(--ds-t-small)",
							fontWeight: 700,
							color: "var(--ds-ink-2)",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap"
						},
						title: e.etiqueta,
						children: e.etiqueta
					});
					return /* @__PURE__ */ g("li", {
						"aria-label": `${e.etiqueta}: ${Q(r, t)}${n > 0 ? `, ${K(a)} de la etapa anterior` : ""}`,
						children: l ? /* @__PURE__ */ _("div", {
							style: {
								display: "grid",
								gap: 6
							},
							children: [/* @__PURE__ */ _("div", {
								style: {
									display: "flex",
									justifyContent: "space-between",
									gap: 8,
									alignItems: "baseline",
									flexWrap: "wrap"
								},
								children: [p, f]
							}), d]
						}) : /* @__PURE__ */ _("div", {
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
var Ei = 6.6, Di = 4;
function Oi({ pasos: e = [], alto: t = 260, formato: n = "numero", etiquetas: r = !0, titulo: i, estilo: a }) {
	let [o, s] = hn(), [c, l] = m(null), u = 0, d = e.map((e) => {
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
	}), f = d.length > 0, p = d.flatMap((e) => [e.desde, e.hasta]), { marcas: h, min: v, max: y } = gn(Math.min(0, ...p), Math.max(0, ...p), 4), b = n === "moneda" ? "monedaCompacta" : n === "numero" ? "compacto" : n, x = Math.max(...h.map((e) => String(Q(e, b)).length)) * Ei + 12, S = r ? 20 : 8, C = Math.max(10, s - x - 6), w = t - S - 24, T = C / Math.max(1, d.length), E = T * .62, D = _n(v, y, S + w, S), O = (e) => e.total ? "var(--ds-serie-1)" : e.delta >= 0 ? "var(--ds-ok)" : "var(--ds-risk)", k = (e, t = n) => e.total ? Q(e.hasta, t) : `${e.delta > 0 ? "+" : ""}${Q(e.delta, t)}`, A = (e, t) => {
		let n = Math.max(3, Math.floor(t / Ei));
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
			Q(e.hasta, n)
		])
	};
	return /* @__PURE__ */ g(Z, {
		titulo: i,
		tabla: f ? j : null,
		estilo: a,
		alto: t,
		children: /* @__PURE__ */ _("div", {
			ref: o,
			style: {
				position: "relative",
				minWidth: 0
			},
			children: [f ? s > 0 && /* @__PURE__ */ _("svg", {
				width: s,
				height: t,
				role: "img",
				style: {
					display: "block",
					overflow: "visible"
				},
				"aria-label": `${i ? `${i}: ` : ""}${d.length} pasos, resultado ${Q(u, n)}`,
				children: [h.map((e) => /* @__PURE__ */ _("g", { children: [/* @__PURE__ */ g("line", {
					x1: x,
					x2: x + C,
					y1: D(e),
					y2: D(e),
					stroke: e === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
				}), /* @__PURE__ */ g("text", {
					x: x - 8,
					y: D(e),
					dy: "0.32em",
					textAnchor: "end",
					style: X,
					children: Q(e, b)
				})] }, e)), d.map((e, i) => {
					let a = x + i * T + (T - E) / 2, o = D(Math.max(e.desde, e.hasta)), s = D(Math.min(e.desde, e.hasta)), u = Math.max(1, s - o), f = e.hasta >= e.desde, p = Math.min(Di, E / 2, u / 2), m = f ? `M${a},${o + u} L${a},${o + p} Q${a},${o} ${a + p},${o} L${a + E - p},${o} Q${a + E},${o} ${a + E},${o + p} L${a + E},${o + u} Z` : `M${a},${o} L${a + E},${o} L${a + E},${o + u - p} Q${a + E},${o + u} ${a + E - p},${o + u} L${a + p},${o + u} Q${a},${o + u} ${a},${o + u - p} Z`, h = d[i + 1];
					return /* @__PURE__ */ _("g", {
						tabIndex: 0,
						style: { outline: "none" },
						"aria-label": `${e.etiqueta}: ${k(e)}, acumulado ${Q(e.hasta, n)}`,
						onMouseEnter: () => l(i),
						onMouseLeave: () => l(null),
						onFocus: () => l(i),
						onBlur: () => l(null),
						children: [
							/* @__PURE__ */ g("rect", {
								x: x + i * T,
								y: S,
								width: T,
								height: w,
								fill: c === i ? "var(--ds-surface-sunk)" : "transparent"
							}),
							/* @__PURE__ */ g("path", {
								d: m,
								fill: O(e)
							}),
							h && /* @__PURE__ */ g("line", {
								x1: a + E,
								x2: x + (i + 1) * T + (T - E) / 2,
								y1: D(e.hasta),
								y2: D(e.hasta),
								stroke: "var(--ds-eje)",
								strokeDasharray: "3 3"
							}),
							r && T >= 40 && /* @__PURE__ */ g("text", {
								x: a + E / 2,
								y: o - 6,
								textAnchor: "middle",
								style: {
									...X,
									fill: "var(--ds-ink)",
									fontWeight: 800
								},
								children: k(e, b)
							}),
							/* @__PURE__ */ _("text", {
								x: x + i * T + T / 2,
								y: t - 6,
								textAnchor: "middle",
								style: {
									...X,
									fontWeight: e.total ? 800 : 600,
									fill: e.total ? "var(--ds-ink-2)" : "var(--ds-ink-3)"
								},
								children: [/* @__PURE__ */ g("title", { children: e.etiqueta }), A(String(e.etiqueta ?? ""), T - 4)]
							})
						]
					}, i);
				})]
			}) : /* @__PURE__ */ g($, { alto: t }), /* @__PURE__ */ g(bn, {
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
					valor: Q(d[c].hasta, n)
				}]
			})]
		})
	});
}
function ki(e) {
	let t = e.filter((e) => e != null && Number.isFinite(Number(e))).map(Number);
	return t.length ? {
		min: Math.min(...t),
		max: Math.max(...t)
	} : null;
}
function Ai(e, t) {
	if (e == null || !Number.isFinite(Number(e)) || !t) return 0;
	if (t.max === t.min) return 3;
	let n = (Number(e) - t.min) / (t.max - t.min);
	return Math.min(5, 1 + Math.floor(n * 5));
}
var ji = (e) => `var(--ds-sec-${e})`;
function Mi({ rango: e, formato: t }) {
	if (!e) return null;
	let n = (e.max - e.min) / 5;
	return /* @__PURE__ */ _("div", {
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
			/* @__PURE__ */ g("span", {
				className: "ds-num",
				children: Q(e.min, t)
			}),
			Array.from({ length: 5 }, (r, i) => /* @__PURE__ */ g("span", {
				title: `${Q(e.min + n * i, t)} – ${Q(e.min + n * (i + 1), t)}`,
				style: {
					width: 22,
					height: 10,
					borderRadius: "var(--ds-r-mini)",
					background: ji(i + 1)
				}
			}, i)),
			/* @__PURE__ */ g("span", {
				className: "ds-num",
				children: Q(e.max, t)
			}),
			/* @__PURE__ */ _("span", {
				style: {
					display: "inline-flex",
					alignItems: "center",
					gap: 5,
					marginLeft: 10
				},
				children: [/* @__PURE__ */ g("span", { style: {
					width: 10,
					height: 10,
					borderRadius: "var(--ds-r-mini)",
					background: ji(0)
				} }), "Sin dato"]
			})
		]
	});
}
// src/graficas/MapaCalor.jsx
function Ni({ filas: e = [], columnas: t = [], valores: n = [], formato: r = "numero", celdaMinima: i = 28, altoCelda: a = 28, titulo: o, estilo: s }) {
	let c = p(null), l = u().replace(/:/g, ""), [d, f] = m(null), v = ki(n.flat()), y = Math.min(140, Math.max(36, ...e.map((e) => String(e).length * 7 + 12))), b = (e, t) => n?.[e]?.[t], x = (e, n) => ({
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
		filas: e.map((e, n) => [e, ...t.map((e, t) => Q(b(n, t), r))])
	}, T = d ? x(...d) : {
		x: 0,
		y: 0
	};
	return /* @__PURE__ */ g(Z, {
		titulo: o,
		tabla: v ? w : null,
		estilo: s,
		children: v ? /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ _("div", {
			ref: c,
			tabIndex: 0,
			role: "grid",
			"aria-label": `${o ? `${o}: ` : ""}${e.length} por ${t.length}. Flechas para recorrer.`,
			"aria-activedescendant": d ? `${l}-${d[0]}-${d[1]}` : void 0,
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
			children: [/* @__PURE__ */ _("div", {
				style: {
					display: "grid",
					minWidth: y + t.length * i,
					gridTemplateColumns: `${y}px repeat(${t.length}, minmax(${i}px, 1fr))`,
					gap: 3
				},
				children: [/* @__PURE__ */ _("div", {
					role: "row",
					style: { display: "contents" },
					children: [/* @__PURE__ */ g("div", { role: "columnheader" }), t.map((e, n) => /* @__PURE__ */ g("div", {
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
				}), e.map((e, n) => /* @__PURE__ */ _("div", {
					role: "row",
					style: { display: "contents" },
					children: [/* @__PURE__ */ g("div", {
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
						let o = d && d[0] === n && d[1] === i, s = b(n, i);
						return /* @__PURE__ */ g("div", {
							id: `${l}-${n}-${i}`,
							role: "gridcell",
							"aria-selected": !!o,
							"aria-label": `${e} · ${t}: ${s == null ? "sin dato" : Q(s, r)}`,
							onMouseEnter: () => f([n, i]),
							style: {
								height: a,
								borderRadius: "var(--ds-r-mini)",
								background: ji(Ai(s, v)),
								boxShadow: o ? "0 0 0 2px var(--ds-ink)" : "none",
								transition: "box-shadow var(--ds-t-tap) var(--ds-ease-out)"
							}
						}, i);
					})]
				}, n))]
			}), /* @__PURE__ */ g(bn, {
				visible: !!d,
				x: T.x,
				y: T.y,
				ancho: c.current?.scrollWidth || 0,
				titulo: d ? `${e[d[0]]} · ${t[d[1]]}` : "",
				renglones: d ? [{
					nombre: o || "Valor",
					valor: Q(b(...d), r)
				}] : []
			})]
		}), /* @__PURE__ */ g(Mi, {
			rango: v,
			formato: r
		})] }) : /* @__PURE__ */ g($, {})
	});
}
// src/graficas/CalendarioCalor.jsx
var Pi = 13, Fi = [
	"L",
	"",
	"M",
	"",
	"V",
	"",
	""
], Ii = (e) => {
	if (e instanceof Date) return new Date(e.getFullYear(), e.getMonth(), e.getDate());
	let [t, n, r] = String(e).slice(0, 10).split("-").map(Number);
	return new Date(t, n - 1, r);
}, Li = (e) => `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
function Ri({ datos: e = [], desde: t, hasta: n, formato: r = "numero", titulo: i, estilo: a }) {
	let o = p(null), [s, c] = m(null), { dias: l, semanas: u, mapa: v, rango: y } = f(() => {
		let r = new Map(e.map((e) => [String(e.fecha).slice(0, 10), e.valor])), i = e.map((e) => Ii(e.fecha)).sort((e, t) => e - t), a = t ? Ii(t) : i[0], o = n ? Ii(n) : i[i.length - 1];
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
			let t = Li(e);
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
			rango: ki(l)
		};
	}, [
		e,
		t,
		n
	]);
	d(() => {
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
				texto: q(r.fecha, "mesCorto")
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
		filas: l.filter((e) => !e.fuera && e.valor !== void 0).map((e) => [q(e.fecha, "media"), Q(e.valor, r)])
	}, T = s === null ? null : l[s], E = s === null ? {
		x: 0,
		y: 0
	} : b(s);
	return /* @__PURE__ */ g(Z, {
		titulo: i,
		tabla: y ? w : null,
		estilo: a,
		children: y ? /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ _("div", {
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
				/* @__PURE__ */ g("span", {
					"aria-live": "polite",
					style: Sn,
					children: T ? `${q(T.fecha, "larga")}: ${T.valor === void 0 ? "sin dato" : Q(T.valor, r)}` : ""
				}),
				/* @__PURE__ */ _("svg", {
					width: C,
					height: 130,
					"aria-hidden": "true",
					style: { display: "block" },
					children: [
						x.map((e) => /* @__PURE__ */ g("text", {
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
						Fi.map((e, t) => e && /* @__PURE__ */ g("text", {
							x: 0,
							y: 18 + t * 16 + Pi - 2,
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
							return /* @__PURE__ */ g("rect", {
								x: n,
								y: r,
								width: Pi,
								height: Pi,
								rx: "3",
								fill: ji(Ai(e.valor, y)),
								stroke: s === t ? "var(--ds-ink)" : "none",
								strokeWidth: "2",
								onMouseEnter: () => c(t)
							}, e.k);
						})
					]
				}),
				/* @__PURE__ */ g(bn, {
					visible: !!T,
					x: E.x + Pi / 2,
					y: E.y,
					ancho: C,
					titulo: T ? q(T.fecha, "larga") : "",
					renglones: T ? [{
						nombre: i || "Valor",
						valor: T.valor === void 0 ? "Sin dato" : Q(T.valor, r)
					}] : []
				})
			]
		}), /* @__PURE__ */ g(Mi, {
			rango: y,
			formato: r
		})] }) : /* @__PURE__ */ g($, {})
	});
}
// src/graficas/Bala.jsx
var zi = [
	"var(--ds-line-firm)",
	"var(--ds-esqueleto-brillo)",
	"var(--ds-surface-sunk)"
];
function Bi({ item: e, formato: t, angosto: n, anchoEtiqueta: r }) {
	let { etiqueta: i, valor: a, meta: o, rangos: s = [], menorEsMejor: c = !1, nota: l } = e, u = Number(a), d = Math.max(...[
		...s,
		u,
		Number(o)
	].filter(Number.isFinite), 1), f = (e) => `${Math.max(0, Math.min(100, e / d * 100))}%`, p = [
		0,
		...s.slice(0, 2),
		d
	], m = c ? [...zi].reverse() : zi, h = !Number.isFinite(u), v = /* @__PURE__ */ _("div", {
		style: {
			position: "relative",
			height: 22,
			borderRadius: "var(--ds-r-mini)",
			overflow: "hidden",
			background: m[2]
		},
		children: [
			s.length > 0 && p.slice(0, -1).map((e, t) => /* @__PURE__ */ g("div", { style: {
				position: "absolute",
				top: 0,
				bottom: 0,
				left: f(e),
				width: `calc(${f(p[t + 1])} - ${f(e)})`,
				background: m[t]
			} }, t)),
			!h && /* @__PURE__ */ g("div", { style: {
				position: "absolute",
				left: 0,
				top: "32%",
				height: "36%",
				width: f(u),
				background: "var(--ds-accent-trazo)",
				borderRadius: "0 var(--ds-r-mini) var(--ds-r-mini) 0",
				transition: "width var(--ds-t-move) var(--ds-ease)"
			} }),
			Number.isFinite(Number(o)) && /* @__PURE__ */ g("div", { style: {
				position: "absolute",
				top: 3,
				bottom: 3,
				width: 3,
				borderRadius: "var(--ds-r-mini)",
				left: `calc(${f(Number(o))} - 1.5px)`,
				background: "var(--ds-ink)"
			} })
		]
	}), y = /* @__PURE__ */ _("div", {
		className: "ds-num",
		style: {
			textAlign: n ? "left" : "right",
			whiteSpace: "nowrap"
		},
		children: [/* @__PURE__ */ g("span", {
			style: {
				fontWeight: 800,
				color: "var(--ds-ink)"
			},
			children: h ? "Sin dato" : Q(u, t)
		}), Number.isFinite(Number(o)) && /* @__PURE__ */ _("span", {
			style: {
				fontSize: "var(--ds-t-micro)",
				fontWeight: 700,
				color: "var(--ds-ink-3)",
				marginLeft: 6
			},
			children: ["meta ", Q(o, t)]
		})]
	}), b = /* @__PURE__ */ _("div", {
		style: { minWidth: 0 },
		children: [/* @__PURE__ */ g("div", {
			style: {
				fontSize: "var(--ds-t-small)",
				fontWeight: 700,
				color: "var(--ds-ink-2)",
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			},
			title: i,
			children: i
		}), l && /* @__PURE__ */ g("div", {
			style: {
				fontSize: "var(--ds-t-micro)",
				color: "var(--ds-ink-3)"
			},
			children: l
		})]
	});
	return /* @__PURE__ */ g("li", {
		"aria-label": `${i}: ${h ? "sin dato" : Q(u, t)}${Number.isFinite(Number(o)) ? `, meta ${Q(o, t)}` : ""}`,
		children: n ? /* @__PURE__ */ _("div", {
			style: {
				display: "grid",
				gap: 6
			},
			children: [/* @__PURE__ */ _("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					gap: 8,
					alignItems: "baseline"
				},
				children: [b, y]
			}), v]
		}) : /* @__PURE__ */ _("div", {
			style: {
				display: "grid",
				gridTemplateColumns: `${r}px 1fr auto`,
				alignItems: "center",
				gap: 14
			},
			children: [
				b,
				v,
				y
			]
		})
	});
}
function Vi({ items: e, item: t, formato: n = "numero", titulo: r, estilo: i }) {
	let [a, o] = hn(), s = e || (t ? [t] : []), c = o > 0 && o < 460, l = Math.min(180, Math.max(90, o * .26)), u = {
		columnas: [
			"",
			"Real",
			"Meta"
		],
		filas: s.map((e) => [
			e.etiqueta,
			Q(e.valor, n),
			Q(e.meta, n)
		])
	};
	return /* @__PURE__ */ g(Z, {
		titulo: r,
		tabla: s.length ? u : null,
		estilo: i,
		children: /* @__PURE__ */ g("div", {
			ref: a,
			style: { minWidth: 0 },
			children: s.length ? /* @__PURE__ */ g("ul", {
				style: {
					listStyle: "none",
					margin: 0,
					padding: 0,
					display: "grid",
					gap: c ? 16 : 12
				},
				children: s.map((e, t) => /* @__PURE__ */ g(Bi, {
					item: e,
					formato: n,
					angosto: c,
					anchoEtiqueta: l
				}, t))
			}) : /* @__PURE__ */ g($, { alto: 100 })
		})
	});
}
// src/graficas/BarraDistribucion.jsx
var Hi = {
	ok: "var(--ds-ok)",
	aviso: "var(--ds-warn)",
	riesgo: "var(--ds-risk)",
	neutro: "var(--ds-ink-3)",
	acento: "var(--ds-accent-trazo)"
};
function Ui({ segmentos: e = [], formato: t = "numero", alto: n = 14, leyenda: r = !0, titulo: i, estilo: a }) {
	let [o, s] = hn(), [c, l] = m(null), u = e.map((e, t) => ({
		...e,
		valor: Number(e.valor),
		color: e.color || Hi[e.tono] || Y(null, t)
	})).filter((e) => Number.isFinite(e.valor) && e.valor > 0), d = u.reduce((e, t) => e + t.valor, 0), f = 0, p = u.map((e) => {
		let t = f + e.valor / 2;
		return f += e.valor, d ? t / d * s : 0;
	}), v = {
		columnas: [
			"",
			"Valor",
			"%"
		],
		filas: u.map((e) => [
			e.etiqueta,
			Q(e.valor, t),
			K(e.valor / d)
		])
	};
	return /* @__PURE__ */ g(Z, {
		titulo: i,
		tabla: d > 0 ? v : null,
		estilo: a,
		children: /* @__PURE__ */ g("div", {
			ref: o,
			style: {
				position: "relative",
				minWidth: 0
			},
			children: d <= 0 ? /* @__PURE__ */ g($, { alto: 60 }) : /* @__PURE__ */ _(h, { children: [
				/* @__PURE__ */ g("div", {
					role: "list",
					style: {
						display: "flex",
						gap: 2,
						height: n,
						borderRadius: "var(--ds-r-pill)",
						overflow: "hidden"
					},
					children: u.map((e, n) => /* @__PURE__ */ g("div", {
						role: "listitem",
						tabIndex: 0,
						"aria-label": `${e.etiqueta}: ${Q(e.valor, t)}, ${K(e.valor / d)}`,
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
				/* @__PURE__ */ g(bn, {
					visible: c !== null,
					ancho: s,
					x: c === null ? 0 : p[c],
					y: n + 6,
					titulo: c === null ? "" : u[c].etiqueta,
					renglones: c === null ? [] : [{
						color: u[c].color,
						nombre: "Valor",
						valor: Q(u[c].valor, t)
					}, {
						nombre: "Del total",
						valor: K(u[c].valor / d)
					}]
				}),
				r && /* @__PURE__ */ g("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
						gap: "8px 16px",
						marginTop: "var(--ds-4)"
					},
					children: u.map((e, n) => /* @__PURE__ */ _("div", {
						style: {
							display: "flex",
							alignItems: "flex-start",
							gap: 8,
							minWidth: 0
						},
						children: [/* @__PURE__ */ g("span", {
							style: { marginTop: 4 },
							children: /* @__PURE__ */ g(vn, { color: e.color })
						}), /* @__PURE__ */ _("div", {
							style: { minWidth: 0 },
							children: [/* @__PURE__ */ g("div", {
								style: {
									fontSize: "var(--ds-t-micro)",
									fontWeight: 700,
									color: "var(--ds-ink-3)",
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap"
								},
								title: e.etiqueta,
								children: e.etiqueta
							}), /* @__PURE__ */ _("div", {
								className: "ds-num",
								style: {
									fontSize: "var(--ds-t-small)",
									fontWeight: 800,
									color: "var(--ds-ink)"
								},
								children: [Q(e.valor, t), /* @__PURE__ */ g("span", {
									style: {
										fontWeight: 700,
										color: "var(--ds-ink-3)",
										marginLeft: 6,
										fontSize: "var(--ds-t-micro)"
									},
									children: K(e.valor / d)
								})]
							})]
						})]
					}, n))
				})
			] })
		})
	});
}
export { ze as ALTO_CABECERA_MOVIL, Re as ALTO_DOCK, ir as Actividad, re as Anillo, wt as Armazon, Me as Aviso, we as Azulejo, Vi as Bala, Se as Barra, Ui as BarraDistribucion, ci as BarraFiltros, Dt as BarraSeleccion, B as Barras, ee as Bento, H as Boton, Cr as BotonApariencia, i as Buscador, n as CAJA, Zr as CIAN_ZENTRYA, mr as Calendario, Ri as CalendarioCalor, r as Campo, zr as CampoClave, Mt as Campos, Yr as CargaFoto, Yt as Cargando, Oi as Cascada, Et as Casilla, N as Celda, si as Chip, ne as Cifra, En as CuerpoKpi, Rn as Detalles, Si as Dona, Ti as Embudo, hr as EncabezadoPagina, t as Envoltura, z as Esqueleto, ie as EsqueletoFila, ae as EsqueletoLista, Kr as EstadoGuardado, Vn as EstadoVacio, fe as Fila, Wr as FilaAjuste, On as FilaKpis, Pe as Flotante, jt as Formulario, V as Giro, bn as Globo, yi as GraficaBarras, pi as GraficaLinea, Hn as GrupoRetratos, P as Heroe, ce as Insignia, Te as Interruptor, er as Kanban, Ce as Lamina, yn as Leyenda, Kn as LineaTiempo, Bn as Llamado, Ni as MapaCalor, Z as MarcoGrafica, R as Medidor, Dr as MenuUsuario, xe as Migas, Ae as Modal, Sr as ModalApariencia, Nr as Notificaciones, Fe as OpcionFlotante, C as PALETAS, ri as PERIODOS, en as PanelInicio, Ir as PantallaAcceso, Hr as PantallaCuenta, Zn as Pasos, se as Pastilla, Jt as Pestanas, k as ProveedorTema, pe as Retrato, mn as SERIES, rn as SIN_DATO, me as Seccion, Ur as SeccionAjustes, gr as Segmentado, e as Selector, Tt as SelectorArmazon, _r as SelectorPaleta, oi as SelectorPeriodo, Qr as SimboloZentrya, $ as SinDatos, Cn as Sparkline, M as Superficie, Ot as Tabla, Mn as TarjetaComparativa, Fn as TarjetaEntidad, Dn as TarjetaKpi, jn as TarjetaMeta, Nn as TarjetaRanking, Fr as TarjetaVitrina, ke as Transicion, pn as Variacion, F as Vidrio, Xr as ZonaPeligro, cn as compacto, Ht as condicion, nn as configurarFormato, Bt as correo, Rt as digitos, q as fecha, dn as fechaRelativa, J as formatear, tn as formato, Ft as maximo, It as minimo, sn as moneda, Lt as numero, Vt as patron, K as porcentaje, ii as rangoPeriodo, Pt as requerido, zt as soloDigitos, ai as textoRango, U as useAngosto, Ve as useArmazon, qt as useFiltros, Ut as useFormulario, he as useMedia, hn as useMedida, A as useTema, fn as variacion };
