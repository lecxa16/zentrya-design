import "./estilos.css";
import { jsx as r, jsxs as u, Fragment as F } from "react/jsx-runtime";
import E, { useState as S, useEffect as T, useCallback as W, useContext as J, createContext as Q, useMemo as I, useRef as M, useLayoutEffect as O } from "react";
import { B as Mr, C as Wr, S as Tr } from "./Campo-DLzlcfA_.js";
import { createPortal as oe } from "react-dom";
const A = "ds-theme", Z = Q({ tema: "light", alternar: () => {
}, fijar: () => {
} });
function se() {
  try {
    const e = localStorage.getItem(A);
    if (e === "light" || e === "dark") return e;
  } catch {
  }
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function Ae({ children: e, forzar: t }) {
  const [n, a] = S(() => t || se());
  T(() => {
    const v = document.documentElement;
    v.setAttribute("data-ds-theme", n), v.style.colorScheme = n;
    try {
      localStorage.setItem(A, n);
    } catch {
    }
  }, [n]), T(() => {
    if (t) return;
    let v = !1;
    try {
      v = !!localStorage.getItem(A);
    } catch {
    }
    if (v) return;
    const o = window.matchMedia("(prefers-color-scheme: dark)"), l = (s) => a(s.matches ? "dark" : "light");
    return o.addEventListener("change", l), () => o.removeEventListener("change", l);
  }, [t]);
  const i = W(() => a((v) => v === "dark" ? "light" : "dark"), []);
  return /* @__PURE__ */ r(Z.Provider, { value: { tema: n, alternar: i, fijar: a }, children: /* @__PURE__ */ r("div", { className: "ds-root", children: e }) });
}
const Be = () => J(Z), P = { plana: "var(--ds-lift-1)", elevada: "var(--ds-lift-2)", flotante: "var(--ds-lift-3)" };
function de({
  children: e,
  nivel: t = "elevada",
  interactiva: n = !1,
  hundida: a = !1,
  solida: i = !1,
  radio: v = "var(--ds-r-card)",
  relleno: o = "var(--ds-5)",
  estilo: l,
  entrada: s,
  ...d
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ...d,
      style: {
        background: i ? "var(--ds-surface-solid)" : a ? "var(--ds-surface-sunk)" : "var(--ds-surface)",
        backdropFilter: i ? void 0 : "var(--ds-blur)",
        WebkitBackdropFilter: i ? void 0 : "var(--ds-blur)",
        border: "1px solid var(--ds-line)",
        borderRadius: v,
        padding: o,
        boxShadow: a ? "none" : P[t],
        transition: "transform var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease)",
        cursor: n ? "pointer" : void 0,
        ...s !== void 0 ? {
          animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
          animationDelay: `${Math.min(s * 55, 240)}ms`
        } : null,
        ...l
      },
      onMouseEnter: n ? (c) => {
        c.currentTarget.style.transform = "translateY(-3px)", c.currentTarget.style.boxShadow = "var(--ds-lift-3)";
      } : void 0,
      onMouseLeave: n ? (c) => {
        c.currentTarget.style.transform = "none", c.currentTarget.style.boxShadow = P[t];
      } : void 0,
      children: e
    }
  );
}
function De({ children: e, marco: t = !1, columnas: n = 12, hueco: a = "var(--ds-4)", estilo: i }) {
  return /* @__PURE__ */ r(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
        gap: a,
        ...t ? {
          background: "var(--ds-frame)",
          padding: "var(--ds-3)",
          borderRadius: "var(--ds-r-frame)",
          boxShadow: "var(--ds-lift-3)"
        } : null,
        ...i
      },
      children: e
    }
  );
}
function Ne({ children: e, ancho: t = 12, anchoMd: n, alto: a, estilo: i }) {
  return /* @__PURE__ */ u(
    "div",
    {
      className: "ds-celda",
      style: {
        gridColumn: `span ${n ?? t}`,
        minWidth: 0,
        ...a ? { gridRow: `span ${a}` } : null,
        ...i
      },
      children: [
        /* @__PURE__ */ r("style", { children: "@media (max-width: 900px) { .ds-celda { grid-column: span 12 !important; } }" }),
        e
      ]
    }
  );
}
function Oe({
  children: e,
  imagen: t,
  imagenChica: n,
  encuadre: a = "center",
  alt: i = "",
  intensidad: v = 0.26,
  soloFoto: o = !1,
  radio: l = "var(--ds-r-card)",
  relleno: s = "var(--ds-8)",
  estilo: d,
  entrada: c,
  ...g
}) {
  const [p, h] = E.useState(!1), m = o && t && !p;
  return /* @__PURE__ */ u(
    "div",
    {
      ...g,
      style: {
        position: "relative",
        overflow: "hidden",
        background: m ? "#0B0C12" : "var(--ds-hero)",
        borderRadius: l,
        padding: s,
        color: "var(--ds-ink-on-accent)",
        boxShadow: m ? "var(--ds-lift-3)" : "var(--ds-lift-accent), var(--ds-lift-2)",
        ...c !== void 0 ? {
          animation: "ds-rise var(--ds-t-scene) var(--ds-ease) both",
          animationDelay: `${Math.min(c * 55, 240)}ms`
        } : null,
        ...d
      },
      children: [
        t && /* @__PURE__ */ r(
          "img",
          {
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
              objectPosition: a,
              pointerEvents: "none",
              ...m ? { filter: "saturate(1.08)" } : { mixBlendMode: "luminosity", opacity: v }
            },
            onError: () => h(!0)
          }
        ),
        m && /* @__PURE__ */ u(F, { children: [
          /* @__PURE__ */ r("div", { "aria-hidden": !0, style: {
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(8,9,15,0.58) 0%, rgba(8,9,15,0.30) 26%, rgba(8,9,15,0.34) 60%, rgba(8,9,15,0.78) 100%)"
          } }),
          /* @__PURE__ */ r("div", { "aria-hidden": !0, style: {
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "linear-gradient(to right, rgba(8,9,15,0.52) 0%, rgba(8,9,15,0.26) 38%, rgba(8,9,15,0) 68%)"
          } })
        ] }),
        !m && /* @__PURE__ */ r("div", { "aria-hidden": !0, style: { position: "absolute", inset: 0, background: "var(--ds-hero-glow)", pointerEvents: "none" } }),
        /* @__PURE__ */ r("div", { style: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }, children: e })
      ]
    }
  );
}
function He({ children: e, interactivo: t = !1, estilo: n, ...a }) {
  return /* @__PURE__ */ r(
    "div",
    {
      ...a,
      style: {
        background: "rgba(255,255,255,0.15)",
        border: "1px solid var(--ds-line-glass)",
        backdropFilter: "blur(14px) saturate(150%)",
        WebkitBackdropFilter: "blur(14px) saturate(150%)",
        borderRadius: "var(--ds-r-item)",
        padding: "var(--ds-3) var(--ds-4)",
        color: "var(--ds-ink-on-accent)",
        transition: "background var(--ds-t-state) var(--ds-ease), transform var(--ds-t-state) var(--ds-ease)",
        cursor: t ? "pointer" : void 0,
        ...n
      },
      onMouseEnter: t ? (i) => {
        i.currentTarget.style.background = "rgba(255,255,255,0.24)", i.currentTarget.style.transform = "translateY(-2px)";
      } : void 0,
      onMouseLeave: t ? (i) => {
        i.currentTarget.style.background = "rgba(255,255,255,0.15)", i.currentTarget.style.transform = "none";
      } : void 0,
      children: e
    }
  );
}
const le = {
  neutro: "var(--ds-ink)",
  acento: "var(--ds-accent)",
  ok: "var(--ds-ok)",
  aviso: "var(--ds-warn)",
  riesgo: "var(--ds-risk)"
}, ce = { m: "var(--ds-num-m)", l: "var(--ds-num-l)", xl: "var(--ds-num-xl)" };
function Ve({
  valor: e,
  etiqueta: t,
  nota: n,
  tono: a = "neutro",
  tamano: i = "l",
  icono: v,
  alineacion: o = "left",
  estilo: l
}) {
  return /* @__PURE__ */ u("div", { style: { minWidth: 0, textAlign: o, ...l }, children: [
    t && /* @__PURE__ */ u("div", { style: {
      fontSize: "var(--ds-t-micro)",
      fontWeight: 600,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      color: "var(--ds-ink-3)",
      /* En una columna estrecha la etiqueta se cortaba contra el icono.
         Al envolver, el icono se queda arriba y la palabra baja entera:
         una etiqueta recortada no es una etiqueta. */
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap",
      minWidth: 0,
      justifyContent: o === "right" ? "flex-end" : "flex-start"
    }, children: [
      v,
      t
    ] }),
    /* @__PURE__ */ r("div", { className: "ds-num", style: {
      fontSize: ce[i],
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: "-0.035em",
      color: le[a],
      marginTop: 2
    }, children: e }),
    n && /* @__PURE__ */ r("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", marginTop: 3 }, children: n })
  ] });
}
function qe({
  valor: e = 0,
  tamano: t = 132,
  grosor: n = 10,
  tono: a = "var(--ds-accent)",
  pista: i = "var(--ds-surface-sunk)",
  children: v,
  animar: o = !0
}) {
  const l = Math.max(0, Math.min(100, e)), s = (t - n) / 2, d = 2 * Math.PI * s, c = d * (1 - l / 100);
  return /* @__PURE__ */ u("div", { style: { position: "relative", width: t, height: t, flexShrink: 0 }, children: [
    /* @__PURE__ */ u("svg", { width: t, height: t, style: { transform: "rotate(-90deg)" }, "aria-hidden": !0, children: [
      /* @__PURE__ */ r("circle", { cx: t / 2, cy: t / 2, r: s, fill: "none", stroke: i, strokeWidth: n }),
      /* @__PURE__ */ r(
        "circle",
        {
          cx: t / 2,
          cy: t / 2,
          r: s,
          fill: "none",
          stroke: a,
          strokeWidth: n,
          strokeLinecap: "round",
          strokeDasharray: d,
          strokeDashoffset: c,
          style: o ? {
            "--ds-dash": d,
            animation: "ds-sweep var(--ds-t-scene) var(--ds-ease) 120ms both"
          } : void 0
        }
      )
    ] }),
    /* @__PURE__ */ r("div", { style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1
    }, children: v })
  ] });
}
const Y = {
  acento: "var(--ds-accent)",
  ok: "var(--ds-ok)",
  aviso: "var(--ds-warn)",
  riesgo: "var(--ds-risk)"
};
function Pe({
  valor: e = 0,
  total: t = 100,
  tono: n = "acento",
  alto: a = 6,
  etiqueta: i,
  estilo: v
}) {
  const o = t > 0 ? Math.max(0, Math.min(100, e / t * 100)) : 0;
  return /* @__PURE__ */ r(
    "div",
    {
      role: "progressbar",
      "aria-valuenow": Math.round(o),
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": i,
      style: {
        height: a,
        borderRadius: 99,
        overflow: "hidden",
        background: "var(--ds-surface-sunk)",
        ...v
      },
      children: /* @__PURE__ */ r("div", { style: {
        height: "100%",
        width: `${o}%`,
        borderRadius: 99,
        background: Y[n] || Y.acento,
        transition: "width var(--ds-t-move) var(--ds-ease)"
      } })
    }
  );
}
function L({
  alto: e = 14,
  ancho: t = "100%",
  radio: n = 7,
  circulo: a = !1,
  estilo: i
}) {
  return /* @__PURE__ */ r("span", { "aria-hidden": !0, style: {
    display: "block",
    flexShrink: 0,
    width: a ? a ? e : void 0 : t,
    height: e,
    borderRadius: a ? "var(--ds-r-pill)" : n,
    backgroundImage: "linear-gradient(90deg, var(--ds-esqueleto) 0%, var(--ds-esqueleto-brillo) 40%, var(--ds-esqueleto) 80%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "220% 100%",
    animation: "ds-brillo 1.4s linear infinite",
    ...i
  } });
}
function ve({ retrato: e = !0, lineas: t = 2, derecha: n = !0 }) {
  return /* @__PURE__ */ u("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "var(--ds-3)",
    padding: "var(--ds-3) var(--ds-4)"
  }, children: [
    e && /* @__PURE__ */ r(L, { circulo: !0, alto: 40 }),
    /* @__PURE__ */ u("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 7 }, children: [
      /* @__PURE__ */ r(L, { alto: 12, ancho: "42%" }),
      t > 1 && /* @__PURE__ */ r(L, { alto: 10, ancho: "26%" })
    ] }),
    n && /* @__PURE__ */ r(L, { alto: 12, ancho: 78 })
  ] });
}
function Ye({ filas: e = 5, ...t }) {
  return /* @__PURE__ */ r("div", { children: Array.from({ length: e }, (n, a) => /* @__PURE__ */ r("div", { style: { opacity: 1 - a * 0.12 }, children: /* @__PURE__ */ r(ve, { ...t }) }, a)) });
}
function Ue({
  datos: e = [],
  alto: t = 132,
  tono: n = "var(--ds-accent)",
  pista: a = "var(--ds-surface-sunk)",
  ancho: i = 7,
  hueco: v = 5,
  animar: o = !0,
  ejeX: l = !1
}) {
  const s = t === "auto", d = Math.max(1, ...e.map((p) => p.total ?? p.valor ?? 0)), c = s ? { flex: "1 1 0", minWidth: 0, maxWidth: i * 2 } : { width: i, flexShrink: 0 }, g = s ? "var(--ds-r-item)" : 99;
  return /* @__PURE__ */ u("div", { style: {
    display: "flex",
    flexDirection: "column",
    height: s ? "100%" : void 0,
    minHeight: 0
  }, children: [
    /* @__PURE__ */ r(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-end",
          gap: v,
          justifyContent: "space-between",
          ...s ? { flex: 1, minHeight: 72 } : { height: t }
        },
        role: "img",
        "aria-label": `Serie de ${e.length} valores`,
        children: e.map((p, h) => {
          const m = p.total ?? p.valor ?? 0, b = p.valor ?? 0, f = m / d * 100, x = b / d * 100;
          return /* @__PURE__ */ u(
            "div",
            {
              title: p.etiqueta,
              style: { position: "relative", height: "100%", ...c },
              children: [
                /* @__PURE__ */ r("div", { style: {
                  position: "absolute",
                  inset: "auto 0 0 0",
                  height: `max(3px, ${f}%)`,
                  background: a,
                  borderRadius: g
                } }),
                /* @__PURE__ */ r("div", { style: {
                  position: "absolute",
                  inset: "auto 0 0 0",
                  height: b > 0 ? `max(3px, ${x}%)` : 0,
                  background: p.tono || n,
                  borderRadius: g,
                  transformOrigin: "bottom",
                  ...o ? {
                    animation: "ds-grow var(--ds-t-move) var(--ds-ease) both",
                    animationDelay: `${Math.min(h * 22, 300)}ms`
                  } : null
                } })
              ]
            },
            h
          );
        })
      }
    ),
    l && /* @__PURE__ */ r("div", { style: {
      display: "flex",
      gap: v,
      marginTop: 8,
      flexShrink: 0,
      justifyContent: "space-between"
    }, children: e.map((p, h) => /* @__PURE__ */ r("div", { style: {
      ...c,
      textAlign: "center",
      fontSize: "var(--ds-t-micro)",
      fontWeight: 600,
      color: "var(--ds-ink-3)"
    }, children: p.eje ?? "" }, h)) })
  ] });
}
const C = {
  neutro: ["var(--ds-surface-sunk)", "var(--ds-ink-2)"],
  acento: ["var(--ds-accent-soft)", "var(--ds-accent)"],
  ok: ["var(--ds-ok-soft)", "var(--ds-ok)"],
  aviso: ["var(--ds-warn-soft)", "var(--ds-warn)"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)"]
};
function Xe({ children: e, tono: t = "neutro", icono: n, estilo: a, ...i }) {
  const [v, o] = C[t] || C.neutro;
  return /* @__PURE__ */ u("span", { ...i, style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    background: v,
    color: o,
    fontSize: "var(--ds-t-micro)",
    fontWeight: 700,
    letterSpacing: "0.02em",
    padding: "4px 10px",
    borderRadius: "var(--ds-r-pill)",
    whiteSpace: "nowrap",
    ...a
  }, children: [
    n,
    e
  ] });
}
function Ge({ children: e, tono: t = "acento", tamano: n = 38, estilo: a }) {
  const [i, v] = C[t] || C.acento;
  return /* @__PURE__ */ r("div", { style: {
    width: n,
    height: n,
    flexShrink: 0,
    borderRadius: "var(--ds-r-pill)",
    background: i,
    color: v,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...a
  }, children: e });
}
const ue = {
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
}, pe = {
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
  fantasma: { background: "transparent", color: "var(--ds-ink-2)" },
  claro: {
    background: "rgba(255,255,255,0.16)",
    color: "#FFFFFF",
    borderColor: "var(--ds-line-glass)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)"
  }
}, he = `
@keyframes ds-boton-gira { to { transform: rotate(360deg); } }
@keyframes ds-boton-late { 50% { opacity: .35; } }
.ds-boton-giro { width: 15px; height: 15px; flex-shrink: 0; border-radius: 50%;
  border: 2px solid currentColor; border-right-color: transparent;
  animation: ds-boton-gira .7s linear infinite; }
@media (prefers-reduced-motion: reduce) { .ds-boton-giro { animation: ds-boton-late 1.2s ease-in-out infinite; } }
`;
function fe({ estilo: e }) {
  return /* @__PURE__ */ u(F, { children: [
    /* @__PURE__ */ r("style", { children: he }),
    /* @__PURE__ */ r("span", { className: "ds-boton-giro", "aria-hidden": !0, style: e })
  ] });
}
function B({
  children: e,
  variante: t = "contorno",
  icono: n,
  esperando: a = !1,
  disabled: i,
  pleno: v = !1,
  estilo: o,
  ...l
}) {
  const s = i || a;
  return /* @__PURE__ */ u(
    "button",
    {
      ...l,
      disabled: s,
      "aria-busy": a || void 0,
      style: {
        ...ue,
        ...pe[t],
        width: v ? "100%" : void 0,
        opacity: a ? 0.88 : i ? 0.55 : 1,
        cursor: a ? "progress" : i ? "not-allowed" : "pointer",
        ...o
      },
      onMouseDown: (d) => {
        s || (d.currentTarget.style.transform = "scale(0.98)");
      },
      onMouseUp: (d) => {
        d.currentTarget.style.transform = "none";
      },
      onMouseLeave: (d) => {
        d.currentTarget.style.transform = "none";
      },
      children: [
        a ? /* @__PURE__ */ r(fe, {}) : n,
        e
      ]
    }
  );
}
function _e({
  izquierda: e,
  titulo: t,
  subtitulo: n,
  derecha: a,
  extremo: i,
  onClick: v,
  estilo: o,
  entrada: l,
  ...s
}) {
  const d = !!v;
  return /* @__PURE__ */ u(
    "div",
    {
      ...s,
      onClick: v,
      role: d ? "button" : void 0,
      tabIndex: d ? 0 : void 0,
      onKeyDown: d ? (c) => {
        (c.key === "Enter" || c.key === " ") && (c.preventDefault(), v(c));
      } : void 0,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--ds-3)",
        padding: "var(--ds-3) var(--ds-4)",
        borderRadius: "var(--ds-r-item)",
        cursor: d ? "pointer" : void 0,
        transition: "background var(--ds-t-state) var(--ds-ease)",
        ...l !== void 0 ? {
          animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
          animationDelay: `${Math.min(l * 28, 260)}ms`
        } : null,
        ...o
      },
      onMouseEnter: d ? (c) => {
        c.currentTarget.style.background = "var(--ds-surface-2)";
      } : void 0,
      onMouseLeave: d ? (c) => {
        c.currentTarget.style.background = "transparent";
      } : void 0,
      children: [
        e,
        /* @__PURE__ */ u("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ r("div", { style: {
            fontSize: "var(--ds-t-body)",
            fontWeight: 700,
            color: "var(--ds-ink)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }, children: t }),
          n && /* @__PURE__ */ r("div", { style: {
            fontSize: "var(--ds-t-small)",
            color: "var(--ds-ink-3)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }, children: n })
        ] }),
        a && /* @__PURE__ */ r("div", { style: { flexShrink: 0, textAlign: "right" }, children: a }),
        i && /* @__PURE__ */ r("div", { style: { flexShrink: 0 }, children: i })
      ]
    }
  );
}
function Ke({ src: e, nombre: t = "", tamano: n = 40, tono: a = "acento" }) {
  const [i, v] = E.useState(!1), o = t.split(" ").filter(Boolean).slice(0, 2).map((d) => d[0]).join("").toUpperCase();
  return /* @__PURE__ */ r("div", { style: {
    width: n,
    height: n,
    flexShrink: 0,
    borderRadius: "var(--ds-r-pill)",
    background: a === "acento" ? "var(--ds-accent-soft)" : "var(--ds-surface-sunk)",
    color: a === "acento" ? "var(--ds-accent)" : "var(--ds-ink-2)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: n * 0.34,
    fontWeight: 800,
    letterSpacing: "-0.02em"
  }, children: e && !i ? /* @__PURE__ */ r(
    "img",
    {
      src: e,
      alt: "",
      onError: () => v(!0),
      style: { width: "100%", height: "100%", objectFit: "cover" }
    }
  ) : o });
}
function Je({ titulo: e, nota: t, accion: n, children: a, estilo: i }) {
  return /* @__PURE__ */ u("div", { style: { ...i }, children: [
    /* @__PURE__ */ u("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--ds-3)",
      marginBottom: "var(--ds-4)"
    }, children: [
      /* @__PURE__ */ u("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ r("h2", { style: {
          margin: 0,
          fontSize: "var(--ds-t-title)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          color: "var(--ds-ink)"
        }, children: e }),
        t && /* @__PURE__ */ r("div", { style: {
          fontSize: "var(--ds-t-small)",
          fontWeight: 600,
          color: "var(--ds-ink-3)",
          marginTop: 3
        }, children: t })
      ] }),
      /* @__PURE__ */ r("div", { style: {
        flex: 1,
        height: 1,
        minWidth: 0,
        background: "linear-gradient(90deg, var(--ds-line-firm), transparent)"
      } }),
      n
    ] }),
    a
  ] });
}
function H(e = 760) {
  const [t, n] = S(
    () => typeof window < "u" && window.innerWidth <= e
  );
  return T(() => {
    if (typeof window > "u" || !window.matchMedia) return;
    const a = window.matchMedia(`(max-width: ${e}px)`), i = (v) => n(v.matches);
    return n(a.matches), a.addEventListener("change", i), () => a.removeEventListener("change", i);
  }, [e]), t;
}
const ge = /* @__PURE__ */ r(
  "svg",
  {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": !0,
    style: { flexShrink: 0, opacity: 0.55 },
    children: /* @__PURE__ */ r("path", { d: "M9 18l6-6-6-6" })
  }
), me = /* @__PURE__ */ r(
  "svg",
  {
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
    children: /* @__PURE__ */ r("path", { d: "M19 12H5M12 19l-7-7 7-7" })
  }
), $ = {
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
function Qe({ ruta: e = [], estilo: t }) {
  const n = H();
  if (e.length === 0) return null;
  const a = e[e.length - 1], i = e.length > 1 ? e[e.length - 2] : null, v = i && i.ir ? /* @__PURE__ */ u(
    "button",
    {
      onClick: i.ir,
      style: { ...$, color: "var(--ds-ink-2)", fontWeight: 700 },
      onMouseEnter: (o) => {
        o.currentTarget.style.color = "var(--ds-accent)";
      },
      onMouseLeave: (o) => {
        o.currentTarget.style.color = "var(--ds-ink-2)";
      },
      children: [
        me,
        " Volver a ",
        i.texto
      ]
    }
  ) : null;
  return n ? v ? /* @__PURE__ */ r("div", { style: { marginBottom: "var(--ds-3)", ...t }, children: v }) : null : /* @__PURE__ */ u("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "var(--ds-3)",
    flexWrap: "wrap",
    marginBottom: "var(--ds-3)",
    ...t
  }, children: [
    v,
    v && /* @__PURE__ */ r("span", { "aria-hidden": !0, style: {
      width: 1,
      height: 16,
      background: "var(--ds-line-firm)",
      opacity: 0.7
    } }),
    /* @__PURE__ */ r("nav", { "aria-label": "Ruta", children: /* @__PURE__ */ r("ol", { style: {
      display: "flex",
      alignItems: "center",
      gap: 2,
      flexWrap: "wrap",
      listStyle: "none",
      margin: 0,
      padding: 0
    }, children: e.map((o, l) => {
      const s = l === e.length - 1;
      return /* @__PURE__ */ u("li", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        minWidth: 0
      }, children: [
        l > 0 && /* @__PURE__ */ r("span", { style: { color: "var(--ds-ink-3)", display: "inline-flex" }, children: ge }),
        s ? /* @__PURE__ */ r("span", { "aria-current": "page", style: {
          ...$,
          cursor: "default",
          color: "var(--ds-ink)",
          fontWeight: 700
        }, children: o.texto }) : /* @__PURE__ */ r(
          "button",
          {
            onClick: o.ir,
            style: $,
            onMouseEnter: (d) => {
              d.currentTarget.style.color = "var(--ds-ink)";
            },
            onMouseLeave: (d) => {
              d.currentTarget.style.color = "var(--ds-ink-3)";
            },
            children: o.texto
          }
        )
      ] }, `${o.texto}-${l}`);
    }) }) }),
    /* @__PURE__ */ r("span", { style: { flex: 1 } }),
    a == null ? void 0 : a.accion
  ] });
}
function Ze({ marca: e, secciones: t = [], activa: n, onIr: a, derecha: i, estilo: v }) {
  return /* @__PURE__ */ u("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "var(--ds-2)",
    background: "var(--ds-frame)",
    color: "var(--ds-ink-on-dark)",
    borderRadius: "var(--ds-r-pill)",
    padding: "var(--ds-2)",
    boxShadow: "var(--ds-lift-3)",
    flexWrap: "wrap",
    ...v
  }, children: [
    e && /* @__PURE__ */ r("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 14px 6px 10px",
      fontWeight: 800,
      fontSize: "var(--ds-t-body)",
      letterSpacing: "-0.02em"
    }, children: e }),
    t.map((o) => {
      const l = o.id === n;
      return /* @__PURE__ */ u(
        "button",
        {
          onClick: () => a == null ? void 0 : a(o),
          "aria-current": l ? "page" : void 0,
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
            background: l ? "rgba(255,255,255,0.14)" : "transparent",
            color: l ? "#FFFFFF" : "rgba(255,255,255,0.62)",
            transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
          },
          onMouseEnter: (s) => {
            l || (s.currentTarget.style.color = "#FFFFFF");
          },
          onMouseLeave: (s) => {
            l || (s.currentTarget.style.color = "rgba(255,255,255,0.62)");
          },
          children: [
            o.icono,
            o.texto
          ]
        },
        o.id
      );
    }),
    /* @__PURE__ */ r("div", { style: { flex: 1 } }),
    i
  ] });
}
function er({
  imagen: e,
  imagenChica: t,
  alt: n = "",
  alto: a = 200,
  children: i,
  pie: v,
  radio: o = "var(--ds-r-card)",
  encima: l = !0,
  encuadre: s = "center",
  fondo: d = !1,
  estilo: c,
  entrada: g,
  ...p
}) {
  const [h, m] = E.useState(!1), b = ({ estiloExtra: f }) => /* @__PURE__ */ r(
    "img",
    {
      src: e,
      srcSet: t ? `${t} 800w, ${e} 1600w` : void 0,
      sizes: t ? "(max-width: 760px) 100vw, 640px" : void 0,
      alt: n,
      loading: "lazy",
      decoding: "async",
      onError: () => m(!0),
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: s,
        display: "block",
        ...f
      }
    }
  );
  return d ? /* @__PURE__ */ u(
    "div",
    {
      ...p,
      style: {
        /* Sin filete: en modo fondo la fotografía ya define el canto de la
           tarjeta, y un borde encima sólo la encierra. La sombra se queda
           —es lo que la apoya en el lienzo— pero el marco es la imagen. */
        position: "relative",
        overflow: "hidden",
        borderRadius: o,
        display: "flex",
        flexDirection: "column",
        background: "var(--ds-hero)",
        border: "none",
        boxShadow: "var(--ds-lift-2)",
        isolation: "isolate",
        ...g !== void 0 ? {
          animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
          animationDelay: `${Math.min(g * 55, 240)}ms`
        } : null,
        ...c
      },
      children: [
        e && !h && /* Bajo un velo denso los colores se apagan y la foto se vuelve una
        mancha. Se compensa saturando por debajo: la escena se reconoce
        sin aclarar el velo, que es lo que sostiene la lectura. */
        /* @__PURE__ */ r("div", { "aria-hidden": !0, style: {
          position: "absolute",
          inset: 0,
          zIndex: 0,
          filter: "saturate(1.35) contrast(1.06)"
        }, children: /* @__PURE__ */ r(b, {}) }),
        /* @__PURE__ */ r("div", { "aria-hidden": !0, style: {
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(to bottom, rgba(8,9,15,0.26) 0%, rgba(8,9,15,0.58) 32%, rgba(8,9,15,0.82) 66%, rgba(8,9,15,0.92) 100%)"
        } }),
        /* @__PURE__ */ r(
          "div",
          {
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
          }
        )
      ]
    }
  ) : /* @__PURE__ */ u(
    "div",
    {
      ...p,
      style: {
        position: "relative",
        overflow: "hidden",
        borderRadius: o,
        background: "var(--ds-surface)",
        backdropFilter: "var(--ds-blur)",
        WebkitBackdropFilter: "var(--ds-blur)",
        border: "1px solid var(--ds-line)",
        boxShadow: "var(--ds-lift-2)",
        ...g !== void 0 ? {
          animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
          animationDelay: `${Math.min(g * 55, 240)}ms`
        } : null,
        ...c
      },
      children: [
        /* @__PURE__ */ u("div", { style: { position: "relative", height: a, flexShrink: 0, overflow: "hidden" }, children: [
          e && !h ? /* @__PURE__ */ r(b, {}) : (
            /* Sin imagen no se finge una: el hueco se resuelve con el material
               del sistema, no con una foto de archivo. */
            /* @__PURE__ */ r("div", { style: { width: "100%", height: "100%", background: "var(--ds-hero)" } })
          ),
          l && i && /* @__PURE__ */ u(F, { children: [
            /* @__PURE__ */ r("div", { "aria-hidden": !0, style: {
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(8,9,15,0.90) 0%, rgba(8,9,15,0.68) 28%, rgba(8,9,15,0.28) 58%, rgba(8,9,15,0) 88%)"
            } }),
            /* @__PURE__ */ r("div", { style: {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "var(--ds-4)",
              color: "#FFFFFF"
            }, children: i })
          ] })
        ] }),
        (v || !l && i) && /* @__PURE__ */ r("div", { style: { padding: "var(--ds-4)" }, children: v || i })
      ]
    }
  );
}
function ye({
  icono: e,
  etiqueta: t,
  nota: n,
  color: a,
  onClick: i,
  ancho: v = 1,
  entrada: o,
  estilo: l
}) {
  const [s, d] = E.useState(!1), c = a || "var(--ds-accent)", g = `color-mix(in oklab, ${c}, var(--ds-mezcla-tono))`;
  return /* @__PURE__ */ u(
    "button",
    {
      onClick: i,
      onMouseEnter: () => d(!0),
      onMouseLeave: () => d(!1),
      style: {
        gridColumn: `span ${v}`,
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
        border: `1px solid ${s ? c + "55" : "var(--ds-line)"}`,
        background: `linear-gradient(150deg, ${c}${s ? "30" : "1F"} 0%, ${c}0D 100%), var(--ds-surface)`,
        boxShadow: s ? "var(--ds-lift-2)" : "none",
        transform: s ? "translateY(-3px)" : "none",
        transition: "transform var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease)",
        animation: o !== void 0 ? `ds-rise var(--ds-t-move) var(--ds-ease) ${Math.min(o * 28, 220)}ms both` : void 0,
        ...l
      },
      children: [
        /* @__PURE__ */ r("span", { style: {
          display: "grid",
          placeItems: "center",
          width: 46,
          height: 46,
          borderRadius: "var(--ds-r-item)",
          background: `${c}2E`,
          color: g,
          boxShadow: s ? `0 6px 16px -6px ${c}88` : "none",
          transition: "box-shadow var(--ds-t-state) var(--ds-ease)"
        }, children: e }),
        /* @__PURE__ */ u("span", { style: { display: "block", minWidth: 0, width: "100%" }, children: [
          /* @__PURE__ */ r("span", { style: {
            display: "block",
            fontSize: "var(--ds-t-small)",
            fontWeight: 700,
            color: g,
            letterSpacing: "-0.01em",
            lineHeight: 1.25
          }, children: t }),
          n && /* @__PURE__ */ r("span", { style: {
            display: "block",
            fontSize: "var(--ds-t-micro)",
            fontWeight: 600,
            color: "var(--ds-ink-3)",
            marginTop: 2
          }, children: n })
        ] })
      ]
    }
  );
}
function rr({
  encendido: e = !1,
  onCambio: t,
  etiqueta: n,
  deshabilitado: a = !1,
  estilo: i
}) {
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": n,
      title: n,
      disabled: a,
      onClick: () => t == null ? void 0 : t(!e),
      style: {
        position: "relative",
        flexShrink: 0,
        width: 42,
        height: 25,
        borderRadius: "var(--ds-r-pill)",
        cursor: a ? "not-allowed" : "pointer",
        border: `1px solid ${e ? "transparent" : "var(--ds-line-firm)"}`,
        background: e ? "var(--ds-accent)" : "var(--ds-surface-sunk)",
        opacity: a ? 0.5 : 1,
        transition: "background var(--ds-t-state) var(--ds-ease)",
        padding: 0
      },
      children: /* @__PURE__ */ r("span", { "aria-hidden": !0, style: {
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
      } })
    }
  );
}
function tr({
  columnas: e = [],
  filas: t = [],
  claveFila: n,
  onFila: a,
  vacio: i = "No hay nada que mostrar.",
  cargando: v = !1,
  porPagina: o = 0,
  estilo: l
}) {
  const [s, d] = S(1), c = t.length, g = o > 0 && c > o, p = g ? Math.ceil(c / o) : 1;
  T(
    () => {
      d((f) => Math.min(Math.max(1, f), Math.max(1, p)));
    },
    [p, c]
  ), T(() => {
    d(1);
  }, [o]);
  const h = I(() => g ? t.slice((s - 1) * o, s * o) : t, [t, s, o, g]), m = c === 0 ? 0 : (s - 1) * o + 1, b = g ? Math.min(s * o, c) : c;
  return /* @__PURE__ */ u("div", { style: l, children: [
    /* @__PURE__ */ r("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ u("table", { style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--ds-font)"
    }, children: [
      /* @__PURE__ */ r("thead", { children: /* @__PURE__ */ r("tr", { children: e.map((f) => /* @__PURE__ */ r("th", { scope: "col", style: {
        position: "sticky",
        top: 0,
        zIndex: 1,
        textAlign: f.numerica ? "right" : "left",
        fontSize: "var(--ds-t-micro)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)",
        padding: "0 var(--ds-3) var(--ds-3)",
        whiteSpace: "nowrap",
        background: "var(--ds-surface-solid)",
        borderBottom: "1px solid var(--ds-line)"
      }, children: f.titulo }, f.clave)) }) }),
      /* @__PURE__ */ u("tbody", { children: [
        v && Array.from(
          { length: Math.max(3, Math.min(o || 6, 8)) },
          (f, x) => /* @__PURE__ */ r("tr", { style: { opacity: 1 - x * 0.1 }, children: e.map((y, k) => /* @__PURE__ */ r("td", { style: {
            padding: "var(--ds-3)",
            borderBottom: "1px solid var(--ds-line)"
          }, children: /* @__PURE__ */ u("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: "var(--ds-3)",
            justifyContent: y.numerica ? "flex-end" : "flex-start"
          }, children: [
            k === 0 && /* @__PURE__ */ r(L, { circulo: !0, alto: 36 }),
            /* @__PURE__ */ r(L, { alto: 11, ancho: k === 0 ? "58%" : y.numerica ? 46 : "72%" })
          ] }) }, y.clave)) }, `esq-${x}`)
        ),
        !v && c === 0 && /* @__PURE__ */ r("tr", { children: /* @__PURE__ */ r("td", { colSpan: e.length, style: {
          padding: "var(--ds-8) 0",
          textAlign: "center",
          color: "var(--ds-ink-3)",
          fontSize: "var(--ds-t-body)"
        }, children: i }) }),
        !v && h.map((f, x) => {
          const y = !!a;
          return /* @__PURE__ */ r(
            "tr",
            {
              onClick: y ? () => a(f) : void 0,
              style: {
                cursor: y ? "pointer" : void 0,
                transition: "background var(--ds-t-state) var(--ds-ease)"
              },
              onMouseEnter: y ? (k) => {
                k.currentTarget.style.background = "var(--ds-surface-2)";
              } : void 0,
              onMouseLeave: y ? (k) => {
                k.currentTarget.style.background = "transparent";
              } : void 0,
              children: e.map((k) => /* @__PURE__ */ r(
                "td",
                {
                  className: k.numerica ? "ds-num" : void 0,
                  style: {
                    textAlign: k.numerica ? "right" : "left",
                    fontSize: "var(--ds-t-small)",
                    fontWeight: k.fuerte ? 700 : 500,
                    color: k.fuerte ? "var(--ds-ink)" : "var(--ds-ink-2)",
                    padding: "var(--ds-3)",
                    verticalAlign: "middle",
                    borderBottom: "1px solid var(--ds-line)"
                  },
                  children: k.render ? k.render(f) : f[k.clave]
                },
                k.clave
              ))
            },
            n ? n(f) : x
          );
        })
      ] })
    ] }) }),
    g && !v && /* @__PURE__ */ u("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--ds-3)",
      flexWrap: "wrap",
      paddingTop: "var(--ds-4)",
      marginTop: "var(--ds-1)",
      borderTop: "1px solid var(--ds-line)"
    }, children: [
      /* @__PURE__ */ u("span", { className: "ds-num", style: {
        fontSize: "var(--ds-t-small)",
        color: "var(--ds-ink-3)",
        fontWeight: 600
      }, children: [
        m,
        "–",
        b,
        " de ",
        c
      ] }),
      /* @__PURE__ */ r("span", { style: { flex: 1 } }),
      /* @__PURE__ */ r(
        U,
        {
          texto: "Anterior",
          hacia: "M15 18l-6-6 6-6",
          inactivo: s <= 1,
          onClick: () => d((f) => Math.max(1, f - 1))
        }
      ),
      /* @__PURE__ */ u("span", { className: "ds-num", style: {
        fontSize: "var(--ds-t-small)",
        fontWeight: 700,
        color: "var(--ds-ink-2)"
      }, children: [
        s,
        " / ",
        p
      ] }),
      /* @__PURE__ */ r(
        U,
        {
          texto: "Siguiente",
          hacia: "M9 18l6-6-6-6",
          inactivo: s >= p,
          derecha: !0,
          onClick: () => d((f) => Math.min(p, f + 1))
        }
      )
    ] })
  ] });
}
function U({ texto: e, hacia: t, inactivo: n, derecha: a, onClick: i }) {
  return /* @__PURE__ */ u(
    "button",
    {
      onClick: i,
      disabled: n,
      "aria-label": e,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        flexDirection: a ? "row-reverse" : "row",
        fontFamily: "var(--ds-font)",
        fontSize: "var(--ds-t-small)",
        fontWeight: 700,
        padding: "7px 13px",
        borderRadius: "var(--ds-r-item)",
        border: "1px solid var(--ds-line)",
        background: "var(--ds-surface)",
        color: n ? "var(--ds-ink-3)" : "var(--ds-ink)",
        opacity: n ? 0.45 : 1,
        cursor: n ? "not-allowed" : "pointer",
        transition: "background var(--ds-t-state) var(--ds-ease)"
      },
      children: [
        /* @__PURE__ */ r(
          "svg",
          {
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": !0,
            children: /* @__PURE__ */ r("path", { d: t })
          }
        ),
        e
      ]
    }
  );
}
function be({
  abierto: e,
  onCerrar: t,
  titulo: n,
  nota: a,
  children: i,
  acciones: v,
  ancho: o = 560,
  estilo: l,
  lado: s
}) {
  const d = s === "derecha", c = M(null), g = M(null), p = M(t);
  return p.current = t, T(() => {
    if (!e) return;
    g.current = document.activeElement;
    const h = (b) => {
      var f;
      b.key === "Escape" && (b.stopPropagation(), (f = p.current) == null || f.call(p));
    };
    document.addEventListener("keydown", h, !0);
    const m = setTimeout(() => {
      var b;
      return (b = c.current) == null ? void 0 : b.focus();
    }, 40);
    return () => {
      var b, f;
      document.removeEventListener("keydown", h, !0), clearTimeout(m);
      try {
        (f = (b = g.current) == null ? void 0 : b.focus) == null || f.call(b);
      } catch {
      }
    };
  }, [e]), e ? /* @__PURE__ */ u(F, { children: [
    !d && /* @__PURE__ */ r(
      "div",
      {
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
      }
    ),
    /* @__PURE__ */ u(
      "div",
      {
        ref: c,
        role: "dialog",
        "aria-modal": d ? "false" : "true",
        "aria-label": n,
        tabIndex: -1,
        style: {
          position: "fixed",
          zIndex: 61,
          outline: "none",
          ...d ? { right: "var(--ds-4)", top: "50%", transform: "translateY(-50%)" } : { left: "50%", top: "50%", transform: "translate(-50%, -50%)" },
          width: `min(${o}px, calc(100% - var(--ds-8)))`,
          maxHeight: "calc(100dvh - var(--ds-12))",
          display: "flex",
          flexDirection: "column",
          borderRadius: "var(--ds-r-frame)",
          overflow: "hidden",
          background: "var(--ds-panel)",
          border: "1px solid var(--ds-line)",
          backdropFilter: "var(--ds-blur)",
          WebkitBackdropFilter: "var(--ds-blur)",
          boxShadow: "var(--ds-lift-3)",
          /* `ds-modal`, no `ds-rise`: ésa termina en `transform: none` y le
             borraría el centrado al acabar. */
          animation: `${d ? "ds-modal-lado" : "ds-modal"} var(--ds-t-move) var(--ds-ease) both`,
          ...l
        },
        children: [
          d && /* @__PURE__ */ r(
            "button",
            {
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
              children: /* @__PURE__ */ r(
                "svg",
                {
                  width: "15",
                  height: "15",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.2",
                  strokeLinecap: "round",
                  children: /* @__PURE__ */ r("path", { d: "M18 6L6 18M6 6l12 12" })
                }
              )
            }
          ),
          n && /* @__PURE__ */ u("div", { style: {
            padding: "var(--ds-5) var(--ds-5) 0",
            flexShrink: 0,
            paddingRight: d ? 64 : void 0
          }, children: [
            /* @__PURE__ */ r("h2", { style: {
              margin: 0,
              fontSize: "var(--ds-t-title)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--ds-ink)"
            }, children: n }),
            a && /* @__PURE__ */ r("p", { style: {
              margin: "5px 0 0",
              fontSize: "var(--ds-t-small)",
              color: "var(--ds-ink-3)"
            }, children: a })
          ] }),
          /* @__PURE__ */ r("div", { style: { padding: "var(--ds-5)", overflowY: "auto", flex: 1, minHeight: 0 }, children: i }),
          v && /* @__PURE__ */ r("div", { style: {
            display: "flex",
            justifyContent: "flex-end",
            gap: "var(--ds-2)",
            padding: "0 var(--ds-5) var(--ds-5)",
            flexShrink: 0,
            flexWrap: "wrap"
          }, children: v })
        ]
      }
    )
  ] }) : null;
}
const X = {
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
    tono: "var(--ds-accent)",
    suave: "var(--ds-accent-soft)",
    titulo: "Aviso",
    d: "M12 16v-5M12 8h.01"
  }
};
function nr({ abierto: e, severidad: t = "info", titulo: n, mensaje: a, onCerrar: i, acciones: v }) {
  const o = X[t] || X.info, l = W(() => i == null ? void 0 : i(), [i]), s = (v || []).some((d) => d.cierra);
  return /* @__PURE__ */ r(be, { abierto: e, onCerrar: l, ancho: 420, children: /* @__PURE__ */ u("div", { style: { textAlign: "center", padding: "var(--ds-2) 0" }, children: [
    /* @__PURE__ */ r("div", { style: {
      display: "grid",
      placeItems: "center",
      width: 54,
      height: 54,
      margin: "0 auto var(--ds-4)",
      borderRadius: "var(--ds-r-pill)",
      background: o.suave,
      color: o.tono
    }, children: /* @__PURE__ */ u(
      "svg",
      {
        width: "26",
        height: "26",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
          t === "info" && /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "9" }),
          /* @__PURE__ */ r("path", { d: o.d })
        ]
      }
    ) }),
    /* @__PURE__ */ r("div", { style: {
      fontSize: "var(--ds-t-title)",
      fontWeight: 800,
      letterSpacing: "-0.03em",
      color: "var(--ds-ink)"
    }, children: n || o.titulo }),
    a && /* @__PURE__ */ r("div", { style: {
      fontSize: "var(--ds-t-body)",
      color: "var(--ds-ink-2)",
      marginTop: 8,
      lineHeight: 1.5
    }, children: a }),
    /* @__PURE__ */ u("div", { style: {
      display: "flex",
      gap: "var(--ds-2)",
      justifyContent: "center",
      marginTop: "var(--ds-5)",
      flexWrap: "wrap"
    }, children: [
      (v || []).map((d, c) => /* @__PURE__ */ r(
        B,
        {
          variante: d.primaria ? "solido" : "contorno",
          onClick: () => {
            var g;
            (g = d.onClick) == null || g.call(d), l();
          },
          children: d.texto
        },
        c
      )),
      !s && /* @__PURE__ */ r(B, { variante: (v || []).length ? "fantasma" : "solido", onClick: l, children: "Entendido" })
    ] })
  ] }) });
}
const G = /* @__PURE__ */ new Map(), _ = (e) => String(e ?? "").split("/").filter(Boolean).length;
function xe(e, t, n) {
  const a = getComputedStyle(e).getPropertyValue(t).trim();
  return a.endsWith("ms") ? parseFloat(a) : a.endsWith("s") ? parseFloat(a) * 1e3 : n;
}
function ke({ vista: e, eje: t = "auto", ambito: n = "vista", children: a, estilo: i }) {
  const v = M(null);
  return O(() => {
    var c, g;
    const o = v.current, l = G.get(n);
    if (G.set(n, e), !o || e === void 0 || l === void 0 || l === e || typeof o.animate != "function" || (g = (c = window.matchMedia) == null ? void 0 : c.call(window, "(prefers-reduced-motion: reduce)")) != null && g.matches) return;
    const s = t === "y" ? 0 : _(e) - _(l), d = s > 0 ? { left: "24px", top: "0px" } : s < 0 ? { left: "-24px", top: "0px" } : { left: "0px", top: "14px" };
    o.animate(
      [{ opacity: 0, ...d }, { opacity: 1, left: "0px", top: "0px" }],
      {
        duration: xe(o, "--ds-t-vista", 320),
        easing: getComputedStyle(o).getPropertyValue("--ds-ease").trim() || "cubic-bezier(0.16, 1, 0.3, 1)",
        /* `fill: none`: al acabar no queda ningún valor pegado al contenedor. */
        fill: "none"
      }
    );
  }, [e, t, n]), /* @__PURE__ */ r("div", { ref: v, style: { position: "relative", minWidth: 0, ...i }, children: a });
}
const ee = "ds-nav", D = ["topbar", "sidebar", "dock"], N = 64, re = Q({ modo: "topbar", fijarModo: () => {
} }), te = () => J(re);
function we() {
  try {
    const e = localStorage.getItem(ee);
    if (D.includes(e)) return e;
  } catch {
  }
  return "topbar";
}
const ne = {
  background: "var(--ds-frame)",
  backdropFilter: "var(--ds-blur)",
  WebkitBackdropFilter: "var(--ds-blur)",
  border: "1px solid var(--ds-line)"
};
function ae({ marca: e }) {
  return /* @__PURE__ */ r("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
    fontWeight: 800,
    fontSize: "var(--ds-t-body)",
    letterSpacing: "-0.02em",
    color: "var(--ds-ink)"
  }, children: e });
}
function Se({ s: e, esta: t, onIr: n, conTexto: a = !0 }) {
  return /* @__PURE__ */ u(
    "button",
    {
      onClick: () => n == null ? void 0 : n(e),
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
        padding: a ? "9px 16px" : "10px",
        borderRadius: "var(--ds-r-pill)",
        border: "1px solid transparent",
        cursor: "pointer",
        background: t ? "var(--ds-ink)" : "var(--ds-surface)",
        color: t ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
        boxShadow: t ? "var(--ds-lift-2)" : "none",
        transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease), transform var(--ds-t-tap) var(--ds-ease)"
      },
      onMouseEnter: (i) => {
        t || (i.currentTarget.style.background = "var(--ds-surface-solid)", i.currentTarget.style.color = "var(--ds-ink)");
      },
      onMouseLeave: (i) => {
        t || (i.currentTarget.style.background = "var(--ds-surface)", i.currentTarget.style.color = "var(--ds-ink-2)");
      },
      onMouseDown: (i) => {
        i.currentTarget.style.transform = "scale(0.96)";
      },
      onMouseUp: (i) => {
        i.currentTarget.style.transform = "none";
      },
      children: [
        e.icono,
        a && e.texto
      ]
    }
  );
}
function Me({ marca: e, secciones: t, activa: n, onIr: a, derecha: i, migas: v, children: o }) {
  const l = H(), s = M(null), [d, c] = S(56);
  O(() => {
    const p = s.current;
    if (!p) return;
    const h = () => c(p.getBoundingClientRect().height);
    h();
    const m = new ResizeObserver(h);
    return m.observe(p), () => m.disconnect();
  }, [l]);
  const g = /* @__PURE__ */ r("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "var(--ds-2)",
    flexWrap: l ? "nowrap" : "wrap",
    overflowX: l ? "auto" : "visible",
    scrollbarWidth: "none",
    minWidth: 0,
    ...l ? { width: "100%", paddingBottom: 2 } : { flex: 1 }
  }, children: t.map((p) => /* @__PURE__ */ r(Se, { s: p, esta: p.id === n, onIr: a }, p.id)) });
  return /* @__PURE__ */ u("div", { style: { minHeight: "100%", padding: "var(--ds-4)" }, children: [
    /* @__PURE__ */ u("header", { ref: s, style: {
      ...ne,
      display: "flex",
      alignItems: "center",
      gap: "var(--ds-2)",
      padding: l ? "var(--ds-3)" : "var(--ds-2) var(--ds-3)",
      borderRadius: l ? "var(--ds-r-card)" : "var(--ds-r-pill)",
      boxShadow: "var(--ds-lift-2)",
      position: "fixed",
      top: "var(--ds-4)",
      left: "var(--ds-4)",
      right: "var(--ds-4)",
      zIndex: 30,
      flexWrap: "wrap",
      rowGap: "var(--ds-3)"
    }, children: [
      /* @__PURE__ */ r("div", { style: { paddingLeft: l ? 2 : 8, paddingRight: 8 }, children: /* @__PURE__ */ r(ae, { marca: e }) }),
      !l && g,
      /* @__PURE__ */ r("div", { style: { flex: l ? 1 : "0 0 auto", display: "flex", justifyContent: "flex-end" }, children: i }),
      l && g
    ] }),
    /* @__PURE__ */ u("main", { style: { paddingTop: d + 20 }, children: [
      v,
      o
    ] })
  ] });
}
function We({ marca: e, secciones: t, activa: n, onIr: a, derecha: i, migas: v, children: o }) {
  const l = H(), [s, d] = S(!0), c = s && !l, g = c ? 244 : 64;
  return /* @__PURE__ */ u("div", { style: { minHeight: "100%", padding: "var(--ds-4)" }, children: [
    /* @__PURE__ */ u("aside", { style: {
      ...ne,
      width: g,
      borderRadius: "var(--ds-r-frame)",
      padding: "var(--ds-3)",
      boxShadow: "var(--ds-lift-2)",
      position: "fixed",
      top: "var(--ds-4)",
      left: "var(--ds-4)",
      bottom: "var(--ds-4)",
      zIndex: 30,
      overflowY: "auto",
      overflowX: "hidden",
      transition: "width var(--ds-t-move) var(--ds-ease)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--ds-2)"
    }, children: [
      /* @__PURE__ */ u("div", { style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 8px 10px"
      }, children: [
        c && /* @__PURE__ */ r(ae, { marca: e }),
        !l && /* @__PURE__ */ r(
          "button",
          {
            onClick: () => d((h) => !h),
            "aria-label": "Contraer menú",
            style: {
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--ds-ink-3)",
              padding: 4,
              borderRadius: 8,
              lineHeight: 0
            },
            children: /* @__PURE__ */ r(
              "svg",
              {
                width: "17",
                height: "17",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                children: /* @__PURE__ */ r("path", { d: c ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6" })
              }
            )
          }
        )
      ] }),
      t.map((h) => {
        const m = h.id === n;
        return /* @__PURE__ */ u(
          "button",
          {
            onClick: () => a == null ? void 0 : a(h),
            title: h.texto,
            "aria-current": m ? "page" : void 0,
            style: {
              display: "flex",
              alignItems: "center",
              gap: 11,
              justifyContent: c ? "flex-start" : "center",
              fontFamily: "var(--ds-font)",
              fontSize: "var(--ds-t-small)",
              fontWeight: 700,
              padding: c ? "11px 13px" : "11px 0",
              borderRadius: "var(--ds-r-item)",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              /* El activo se ELEVA en una tarjeta sólida, como en la referencia:
                 no se marca con una línea de color al costado. */
              background: m ? "var(--ds-surface-solid)" : "transparent",
              color: m ? "var(--ds-ink)" : "var(--ds-ink-2)",
              boxShadow: m ? "var(--ds-lift-1)" : "none",
              transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
            },
            onMouseEnter: (b) => {
              m || (b.currentTarget.style.background = "var(--ds-surface-2)");
            },
            onMouseLeave: (b) => {
              m || (b.currentTarget.style.background = "transparent");
            },
            children: [
              /* @__PURE__ */ r("span", { style: {
                display: "grid",
                placeItems: "center",
                width: 18,
                height: 18,
                flexShrink: 0,
                color: m ? "var(--ds-accent)" : "inherit"
              }, children: h.icono || "•" }),
              c && h.texto
            ]
          },
          h.id
        );
      }),
      /* @__PURE__ */ r("div", { style: { flex: 1 } }),
      i ? /* @__PURE__ */ r("div", { style: {
        paddingTop: "var(--ds-3)",
        marginTop: "var(--ds-1)",
        borderTop: "1px solid var(--ds-line)",
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--ds-2)",
        justifyContent: c ? "flex-start" : "center"
      }, children: i }) : null
    ] }),
    /* @__PURE__ */ u("main", { style: {
      minWidth: 0,
      marginLeft: g + 16,
      transition: "margin-left var(--ds-t-move) var(--ds-ease)"
    }, children: [
      v,
      o
    ] })
  ] });
}
function Te({
  marca: e,
  icono: t,
  secciones: n,
  activa: a,
  onIr: i,
  derecha: v,
  inicio: o,
  inicioAbierto: l = !1,
  onInicioAbierto: s,
  migas: d,
  children: c
}) {
  return /* @__PURE__ */ u("div", { style: {
    minHeight: "100%",
    padding: "var(--ds-4)",
    paddingBottom: `calc(${N}px + var(--ds-6))`
  }, children: [
    /* @__PURE__ */ u("main", { children: [
      d,
      c
    ] }),
    /* @__PURE__ */ u("nav", { "aria-label": "Navegación principal", style: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 40,
      height: N,
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
    }, children: [
      /* @__PURE__ */ r("div", { style: {
        flex: "1 1 0",
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: "var(--ds-1)"
      }, children: o && /* @__PURE__ */ r(
        ze,
        {
          abierto: l,
          icono: t,
          onClick: () => s == null ? void 0 : s(!l)
        }
      ) }),
      /* @__PURE__ */ r("div", { style: {
        flex: "0 1 auto",
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        overflowX: "auto",
        scrollbarWidth: "none"
      }, children: /* @__PURE__ */ r("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--ds-1)",
        margin: "0 auto"
      }, children: n.map((g) => {
        const p = g.id === a;
        return /* @__PURE__ */ u(
          "button",
          {
            onClick: () => i == null ? void 0 : i(g),
            title: g.texto,
            "aria-current": p ? "page" : void 0,
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              fontFamily: "var(--ds-font)",
              fontSize: "0.66rem",
              fontWeight: 700,
              padding: "7px 15px",
              borderRadius: "var(--ds-r-item)",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              background: p ? "var(--ds-ink)" : "transparent",
              color: p ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
              transition: "transform var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
            },
            onMouseEnter: (h) => {
              h.currentTarget.style.transform = "translateY(-3px)", p || (h.currentTarget.style.background = "var(--ds-surface-2)", h.currentTarget.style.color = "var(--ds-ink)");
            },
            onMouseLeave: (h) => {
              h.currentTarget.style.transform = "none", p || (h.currentTarget.style.background = "transparent", h.currentTarget.style.color = "var(--ds-ink-2)");
            },
            children: [
              /* @__PURE__ */ r("span", { style: { display: "grid", placeItems: "center", height: 19 }, children: g.icono || "•" }),
              g.texto
            ]
          },
          g.id
        );
      }) }) }),
      /* @__PURE__ */ r("div", { style: {
        flex: "1 1 0",
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "var(--ds-2)"
      }, children: v })
    ] }),
    o
  ] });
}
function ze({ abierto: e, onClick: t, icono: n }) {
  return /* @__PURE__ */ r(
    "button",
    {
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
      onMouseEnter: (a) => {
        a.currentTarget.style.transform = "translateY(-4px)";
      },
      onMouseLeave: (a) => {
        a.currentTarget.style.transform = "none";
      },
      children: /* @__PURE__ */ r("span", { style: {
        display: "grid",
        placeItems: "center",
        width: 26,
        height: 26,
        transform: e ? "scale(0.92)" : "none",
        transition: "transform var(--ds-t-move) var(--ds-ease)"
      }, children: n || /* @__PURE__ */ r("span", { style: {
        width: 22,
        height: 22,
        borderRadius: 7,
        background: "var(--ds-hero)",
        boxShadow: "var(--ds-lift-accent)",
        display: "block"
      } }) })
    }
  );
}
function ar({
  marca: e,
  icono: t,
  secciones: n = [],
  activa: a,
  onIr: i,
  derecha: v,
  inicio: o,
  inicioAbierto: l,
  onInicioAbierto: s,
  migas: d,
  modo: c,
  vista: g,
  children: p
}) {
  const [h, m] = S(() => c || we());
  T(() => {
    g !== void 0 && window.scrollTo({ top: 0, left: 0 });
  }, [g]), T(() => {
    if (c) {
      m(c);
      return;
    }
    try {
      localStorage.setItem(ee, h);
    } catch {
    }
  }, [h, c]);
  const b = W((k) => {
    D.includes(k) && m(k);
  }, []), x = {
    marca: e,
    icono: t,
    secciones: n,
    activa: a,
    onIr: i,
    derecha: v,
    inicio: o,
    inicioAbierto: l,
    onInicioAbierto: s,
    migas: null,
    children: /* @__PURE__ */ u(ke, { vista: g, children: [
      d,
      p
    ] })
  }, y = h === "sidebar" ? We : h === "dock" ? Te : Me;
  return /* @__PURE__ */ r(re.Provider, { value: { modo: h, fijarModo: b, modos: D }, children: /* @__PURE__ */ r(y, { ...x }) });
}
function ir() {
  const { modo: e, fijarModo: t } = te(), [n, a] = S(!1), [i, v] = S(null), o = M(null), l = M(null), s = [
    { id: "topbar", texto: "Barra arriba", icono: "M3 5h18M3 5v14h18V5" },
    { id: "sidebar", texto: "Menú lateral", icono: "M3 5h18v14H3zM9 5v14" },
    { id: "dock", texto: "Dock abajo", icono: "M3 5h18v14H3zM3 15h18" }
  ], d = s.find((p) => p.id === e) || s[0], c = e === "dock";
  O(() => {
    if (!n) return;
    const p = 8, h = () => {
      var R, V, q;
      const b = (R = o.current) == null ? void 0 : R.getBoundingClientRect();
      if (!b) return;
      const f = ((V = l.current) == null ? void 0 : V.offsetWidth) || 190, x = ((q = l.current) == null ? void 0 : q.offsetHeight) || 160;
      let k = b.left + b.width / 2 < window.innerWidth / 2 ? b.left : b.right - f;
      k = Math.min(Math.max(p, k), window.innerWidth - f - p);
      let w = c ? b.top - x - 10 : b.bottom + 10;
      w = Math.min(Math.max(p, w), window.innerHeight - x - p), v({ izq: k, arriba: w });
    };
    h();
    const m = requestAnimationFrame(h);
    return window.addEventListener("resize", h), window.addEventListener("scroll", h, !0), () => {
      cancelAnimationFrame(m), window.removeEventListener("resize", h), window.removeEventListener("scroll", h, !0);
    };
  }, [n, c]), T(() => {
    if (!n) return;
    const p = (m) => {
      m.key === "Escape" && (m.stopPropagation(), a(!1));
    }, h = (m) => {
      var b, f;
      (b = o.current) != null && b.contains(m.target) || (f = l.current) != null && f.contains(m.target) || a(!1);
    };
    return document.addEventListener("keydown", p, !0), document.addEventListener("mousedown", h, !0), () => {
      document.removeEventListener("keydown", p, !0), document.removeEventListener("mousedown", h, !0);
    };
  }, [n]);
  const g = (p) => /* @__PURE__ */ r(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.9",
      strokeLinejoin: "round",
      "aria-hidden": !0,
      children: /* @__PURE__ */ r("path", { d: p })
    }
  );
  return /* @__PURE__ */ u("div", { ref: o, style: { position: "relative", flexShrink: 0 }, children: [
    /* @__PURE__ */ r(
      "button",
      {
        onClick: () => a((p) => !p),
        "aria-haspopup": "menu",
        "aria-expanded": n,
        title: `Navegación: ${d.texto}`,
        "aria-label": `Navegación: ${d.texto}`,
        style: {
          display: "grid",
          placeItems: "center",
          width: 36,
          height: 36,
          borderRadius: "var(--ds-r-pill)",
          cursor: "pointer",
          background: n ? "var(--ds-surface-solid)" : "var(--ds-surface)",
          border: "1px solid var(--ds-line)",
          color: n ? "var(--ds-ink)" : "var(--ds-ink-2)",
          transition: "background var(--ds-t-state) var(--ds-ease)"
        },
        children: g(d.icono)
      }
    ),
    n && i && oe(/* @__PURE__ */ u("div", { role: "menu", ref: l, style: {
      position: "fixed",
      left: i.izq,
      top: i.arriba,
      zIndex: 70,
      minWidth: 186,
      padding: "var(--ds-2)",
      borderRadius: "var(--ds-r-card)",
      background: "var(--ds-panel)",
      border: "1px solid var(--ds-line)",
      backdropFilter: "var(--ds-blur)",
      WebkitBackdropFilter: "var(--ds-blur)",
      boxShadow: "var(--ds-lift-3)",
      animation: `${c ? "ds-sube" : "ds-baja"} var(--ds-t-state) var(--ds-ease) both`
    }, children: [
      /* @__PURE__ */ r("div", { style: {
        fontSize: "var(--ds-t-micro)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)",
        padding: "4px 10px 7px"
      }, children: "Navegación" }),
      s.map((p) => {
        const h = p.id === e;
        return /* @__PURE__ */ u(
          "button",
          {
            role: "menuitemradio",
            "aria-checked": h,
            onClick: () => {
              t(p.id), a(!1);
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
              background: h ? "var(--ds-accent-soft)" : "transparent",
              color: h ? "var(--ds-accent)" : "var(--ds-ink-2)",
              transition: "background var(--ds-t-state) var(--ds-ease)"
            },
            onMouseEnter: (m) => {
              h || (m.currentTarget.style.background = "var(--ds-surface-2)");
            },
            onMouseLeave: (m) => {
              h || (m.currentTarget.style.background = "transparent");
            },
            children: [
              g(p.icono),
              /* @__PURE__ */ r("span", { style: { flex: 1 }, children: p.texto }),
              h && /* @__PURE__ */ r(
                "svg",
                {
                  width: "15",
                  height: "15",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.4",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  "aria-hidden": !0,
                  children: /* @__PURE__ */ r("path", { d: "M20 6L9 17l-5-5" })
                }
              )
            ]
          },
          p.id
        );
      })
    ] }), document.body)
  ] });
}
function Fe(e) {
  return e.length <= 1 ? e[0] || "" : `${e.slice(0, -1).join(", ")} y ${e[e.length - 1]}`;
}
function or({
  titulo: e,
  nota: t,
  children: n,
  onCancelar: a,
  cancelarTexto: i = "Cancelar",
  accion: v,
  ancho: o = 820,
  problemas: l = [],
  refCuerpo: s
}) {
  const { modo: d } = te(), c = d === "dock" ? N : 0;
  return /* @__PURE__ */ u("div", { style: { maxWidth: o, margin: "0 auto", paddingBottom: 96 + c }, children: [
    /* @__PURE__ */ u("div", { style: { marginBottom: "var(--ds-6)", padding: "0 var(--ds-2)" }, children: [
      /* @__PURE__ */ r("h1", { style: {
        margin: 0,
        fontSize: "var(--ds-t-display)",
        fontWeight: 800,
        letterSpacing: "-0.045em",
        lineHeight: 1.02,
        color: "var(--ds-ink)"
      }, children: e }),
      t && /* @__PURE__ */ r("p", { style: {
        margin: "6px 0 0",
        fontSize: "var(--ds-t-body)",
        color: "var(--ds-ink-3)",
        maxWidth: 620
      }, children: t })
    ] }),
    l.length > 0 && /* `role="alert"` para que un lector de pantalla lo anuncie en cuanto
    aparece: quien no ve el rojo tiene que enterarse igual. */
    /* @__PURE__ */ u("div", { role: "alert", style: {
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
    }, children: [
      /* @__PURE__ */ u(
        "svg",
        {
          width: "17",
          height: "17",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": !0,
          style: { flexShrink: 0, marginTop: 1 },
          children: [
            /* @__PURE__ */ r("circle", { cx: "12", cy: "12", r: "9" }),
            /* @__PURE__ */ r("path", { d: "M12 8v5M12 16h.01" })
          ]
        }
      ),
      /* @__PURE__ */ u("span", { children: [
        l.length === 1 ? /* @__PURE__ */ u(F, { children: [
          "Falta revisar ",
          /* @__PURE__ */ r("b", { children: l[0] }),
          "."
        ] }) : /* @__PURE__ */ u(F, { children: [
          "Faltan ",
          l.length,
          " datos: ",
          /* @__PURE__ */ r("b", { children: Fe(l) }),
          "."
        ] }),
        " ",
        "Cada campo dice abajo qué necesita."
      ] })
    ] }),
    /* @__PURE__ */ r(de, { entrada: 0, children: /* @__PURE__ */ r("div", { ref: s, children: n }) }),
    /* @__PURE__ */ r("div", { style: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: c,
      zIndex: 25,
      display: "flex",
      justifyContent: "center",
      padding: "var(--ds-3) var(--ds-4)",
      paddingBottom: "calc(var(--ds-3) + env(safe-area-inset-bottom, 0px))",
      background: "var(--ds-panel)",
      borderTop: "1px solid var(--ds-line)",
      backdropFilter: "var(--ds-blur)",
      WebkitBackdropFilter: "var(--ds-blur)"
    }, children: /* @__PURE__ */ u("div", { style: {
      width: "100%",
      maxWidth: o,
      display: "flex",
      justifyContent: "flex-end",
      gap: "var(--ds-2)",
      flexWrap: "wrap"
    }, children: [
      /* @__PURE__ */ r(B, { variante: "fantasma", onClick: a, children: i }),
      v
    ] }) })
  ] });
}
function sr({ children: e, minimo: t = 220, estilo: n }) {
  return /* @__PURE__ */ r("div", { style: {
    display: "grid",
    gap: "var(--ds-4)",
    gridTemplateColumns: `repeat(auto-fit, minmax(${t}px, 1fr))`,
    ...n
  }, children: e });
}
const z = (e) => e == null || String(e).trim() === "", dr = (e = "Este dato es obligatorio.") => (t) => z(t) ? e : null, lr = (e, t) => (n) => !z(n) && String(n).trim().length > e ? t || `No puede pasar de ${e} caracteres; llevas ${String(n).trim().length}.` : null, cr = (e, t) => (n) => !z(n) && String(n).trim().length < e ? t || `Necesita al menos ${e} caracteres.` : null, vr = ({ desde: e = null, hasta: t = null, mensaje: n } = {}) => (a) => {
  if (z(a)) return null;
  const i = Number(String(a).replace(/,/g, ""));
  return Number.isNaN(i) ? n || "Tiene que ser un número." : e !== null && i < e ? n || `Tiene que ser un número mayor o igual a ${e}.` : t !== null && i > t ? n || `No puede pasar de ${t}.` : null;
}, ur = (e, t, n) => (a) => {
  if (z(a)) return null;
  const i = String(a).replace(/\D/g, "").length;
  return i < e || i > t ? n || `Debe tener de ${e} a ${t} dígitos.` : null;
}, pr = (e, t) => (n) => !z(n) && !new RegExp(`^\\d{${e}}$`).test(String(n).trim()) ? t || `Debe tener exactamente ${e} dígitos, sin espacios ni guiones.` : null, hr = (e = "El correo debe llevar arroba y dominio, como nombre@dominio.com.") => (t) => !z(t) && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(t).trim()) ? e : null, fr = (e, t) => (n) => !z(n) && !e.test(String(n).trim()) ? t : null, gr = (e, t) => (n, a) => e(n, a) ? null : t;
function mr(e) {
  const t = I(() => Object.fromEntries(
    Object.entries(e).map(([f, x]) => [f, x.valor ?? ""])
  ), []), [n, a] = S(t), [i, v] = S({}), [o, l] = S(!1), s = M(null), d = I(() => {
    const f = {};
    return Object.entries(e).forEach(([x, y]) => {
      for (const k of y.reglas || []) {
        const w = k(n[x], n);
        if (w) {
          f[x] = w;
          break;
        }
      }
    }), f;
  }, [n, e]), c = W((f) => (x) => {
    a((y) => ({ ...y, [f]: x }));
  }, []), g = W((f) => () => {
    v((x) => x[f] ? x : { ...x, [f]: !0 });
  }, []), p = W((f) => {
    const x = e[f] || {}, y = o || i[f];
    return {
      etiqueta: x.etiqueta,
      valor: n[f] ?? "",
      onCambio: c(f),
      onSalir: g(f),
      error: y ? d[f] : void 0,
      ayuda: x.ayuda,
      /* Obligatorio = alguna de sus reglas se queja del vacío. Se pregunta a
         la regla en vez de pedir una bandera aparte, que es la forma fácil de
         que el asterisco y la validación acaben diciendo cosas distintas. */
      requerido: (x.reglas || []).some((k) => {
        try {
          return k("", n) !== null;
        } catch {
          return !1;
        }
      })
    };
  }, [e, n, d, i, o, c, g]), h = I(() => o ? Object.keys(d).map((f) => {
    var x;
    return ((x = e[f]) == null ? void 0 : x.etiqueta) || f;
  }) : [], [o, d, e]), m = W((f) => (l(!0), Object.keys(d).length > 0 ? (requestAnimationFrame(() => {
    var k;
    const x = (k = s.current) == null ? void 0 : k.querySelector('[data-error="si"]');
    x == null || x.scrollIntoView({ block: "center", behavior: "smooth" });
    const y = x == null ? void 0 : x.querySelector("input, textarea, select, [role='combobox']");
    try {
      y == null || y.focus({ preventScroll: !0 });
    } catch {
    }
  }), !1) : (f(n), !0)), [d, n]), b = W(() => {
    a(t), v({}), l(!1);
  }, [t]);
  return {
    valores: n,
    errores: d,
    problemas: h,
    intentado: o,
    campo: p,
    poner: c,
    marcar: g,
    intentar: m,
    limpiar: b,
    cuerpo: s,
    setValores: a
  };
}
const ie = (e) => `ds-filtros:${e}`, Le = (e) => {
  try {
    const t = sessionStorage.getItem(ie(e));
    return t ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}, Ie = (e, t) => {
  try {
    sessionStorage.setItem(ie(e), JSON.stringify(t));
  } catch {
  }
};
function yr(e, t) {
  const n = M(t), [a, i] = S(() => {
    const s = Le(e);
    if (!s) return { ...n.current };
    const d = { ...n.current };
    return Object.keys(n.current).forEach((c) => {
      s[c] !== void 0 && (d[c] = s[c]);
    }), d;
  });
  T(() => {
    Ie(e, a);
  }, [e, a]);
  const v = W((s, d) => {
    i((c) => ({ ...c, [s]: d }));
  }, []), o = W(() => {
    i({ ...n.current });
  }, []), l = Object.keys(n.current).some((s) => String(a[s] ?? "") !== String(n.current[s] ?? ""));
  return [a, v, o, l, i];
}
function br({ pestanas: e = [], activa: t, onCambio: n, estilo: a }) {
  const i = M([]);
  return /* @__PURE__ */ r(
    "div",
    {
      role: "tablist",
      onKeyDown: (o) => {
        var c;
        const l = e.findIndex((g) => g.id === t), s = o.key === "ArrowRight" ? 1 : o.key === "ArrowLeft" ? -1 : 0;
        if (!s) return;
        o.preventDefault();
        const d = (l + s + e.length) % e.length;
        n == null || n(e[d].id), (c = i.current[d]) == null || c.focus();
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
        ...a
      },
      children: e.map((o, l) => {
        const s = o.id === t;
        return /* @__PURE__ */ u(
          "button",
          {
            role: "tab",
            "aria-selected": s,
            tabIndex: s ? 0 : -1,
            ref: (d) => {
              i.current[l] = d;
            },
            onClick: () => n == null ? void 0 : n(o.id),
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
              background: s ? "var(--ds-ink)" : "transparent",
              color: s ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
              transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
            },
            children: [
              o.icono,
              o.texto,
              o.cuenta !== void 0 && /* @__PURE__ */ r("span", { className: "ds-num", style: {
                fontSize: "var(--ds-t-micro)",
                fontWeight: 800,
                padding: "1px 6px",
                borderRadius: "var(--ds-r-pill)",
                background: s ? "rgba(255,255,255,0.18)" : "var(--ds-surface)",
                color: s ? "var(--ds-surface-solid)" : "var(--ds-ink-3)"
              }, children: o.cuenta })
            ]
          },
          o.id
        );
      })
    }
  );
}
function xr({ texto: e = "Cargando…", alto: t = 200 }) {
  return /* @__PURE__ */ u("div", { role: "status", style: {
    display: "grid",
    placeItems: "center",
    gap: "var(--ds-3)",
    minHeight: t,
    color: "var(--ds-ink-3)",
    fontSize: "var(--ds-t-small)"
  }, children: [
    /* @__PURE__ */ r(
      "svg",
      {
        width: "26",
        height: "26",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.4",
        strokeLinecap: "round",
        "aria-hidden": !0,
        style: { animation: "ds-girar 900ms linear infinite", color: "var(--ds-accent)" },
        children: /* @__PURE__ */ r("path", { d: "M12 3a9 9 0 019 9" })
      }
    ),
    e
  ] });
}
const Ee = /* @__PURE__ */ u(
  "svg",
  {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    children: [
      /* @__PURE__ */ r("circle", { cx: "11", cy: "11", r: "7" }),
      /* @__PURE__ */ r("path", { d: "M20 20l-3.5-3.5" })
    ]
  }
), Re = /* @__PURE__ */ r(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: /* @__PURE__ */ r("path", { d: "M5 12h14M13 6l6 6-6 6" })
  }
);
function j({ children: e }) {
  return /* @__PURE__ */ r("div", { style: {
    fontSize: "var(--ds-t-small)",
    fontWeight: 800,
    color: "var(--ds-ink-2)",
    letterSpacing: "-0.01em",
    margin: "0 0 var(--ds-3)"
  }, children: e });
}
function K({ item: e, onIr: t }) {
  const [n, a] = E.useState(!1), i = e.color || "var(--ds-ink-2)";
  return /* @__PURE__ */ u(
    "button",
    {
      onClick: () => {
        t(e);
      },
      onMouseEnter: () => a(!0),
      onMouseLeave: () => a(!1),
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
        /* @__PURE__ */ r("span", { style: {
          display: "grid",
          placeItems: "center",
          width: 30,
          height: 30,
          flexShrink: 0,
          borderRadius: 9,
          background: `${i}1F`,
          color: i,
          overflow: "hidden"
        }, children: e.retrato ? /* @__PURE__ */ r("img", { src: e.retrato, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : e.icono }),
        /* @__PURE__ */ u("span", { style: { minWidth: 0, flex: 1 }, children: [
          /* @__PURE__ */ r("span", { style: {
            display: "block",
            fontSize: "var(--ds-t-small)",
            fontWeight: 700,
            color: "var(--ds-ink)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }, children: e.texto }),
          e.subtitulo && /* @__PURE__ */ r("span", { style: {
            display: "block",
            fontSize: "var(--ds-t-micro)",
            fontWeight: 600,
            color: "var(--ds-ink-3)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }, children: e.subtitulo })
        ] }),
        /* @__PURE__ */ r("span", { style: {
          color: "var(--ds-ink-3)",
          opacity: n ? 1 : 0,
          flexShrink: 0,
          transition: "opacity var(--ds-t-state) var(--ds-ease)"
        }, children: Re })
      ]
    }
  );
}
function kr({
  abierto: e,
  onCerrar: t,
  usuario: n,
  acciones: a,
  recientes: i = [],
  tituloRecientes: v = "Reciente",
  grupos: o = [],
  busqueda: l = "",
  onBusqueda: s,
  resultados: d = null,
  marcadorBusqueda: c = "Buscar…",
  onIr: g
}) {
  const p = M(null), h = M(null);
  T(() => {
    if (!e) return;
    const y = (w) => {
      w.key === "Escape" && (w.stopPropagation(), t == null || t());
    };
    document.addEventListener("keydown", y, !0);
    const k = setTimeout(() => {
      var w;
      return (w = p.current) == null ? void 0 : w.focus();
    }, 90);
    return () => {
      document.removeEventListener("keydown", y, !0), clearTimeout(k);
    };
  }, [e, t]);
  const m = W((y) => {
    var k;
    t == null || t(), (k = y.onIr || g) == null || k(y);
  }, [t, g]), b = l.trim().length > 0, f = b && d && d.length === 0, x = I(() => {
    let y = 0;
    return o.map((k) => k.items.map(() => y++));
  }, [o]);
  return e ? /* @__PURE__ */ u(F, { children: [
    /* @__PURE__ */ r(
      "div",
      {
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
      }
    ),
    /* @__PURE__ */ u(
      "div",
      {
        ref: h,
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
          /* @__PURE__ */ u("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: "var(--ds-3)",
            padding: "var(--ds-4) var(--ds-5) var(--ds-3)"
          }, children: [
            n,
            /* @__PURE__ */ r("div", { style: { flex: 1 } }),
            a
          ] }),
          /* @__PURE__ */ r("div", { style: {
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            padding: "var(--ds-2) var(--ds-5) var(--ds-4)"
          }, children: b ? /* @__PURE__ */ u("div", { children: [
            /* @__PURE__ */ r(j, { children: f ? "Sin coincidencias" : "Resultados" }),
            f ? /* @__PURE__ */ u("div", { style: {
              padding: "var(--ds-8) 0",
              textAlign: "center",
              color: "var(--ds-ink-3)",
              fontSize: "var(--ds-t-body)"
            }, children: [
              "Nada coincide con «",
              l,
              "»."
            ] }) : (d || []).map((y) => /* @__PURE__ */ r(K, { item: y, onIr: m }, y.id))
          ] }) : /* @__PURE__ */ u("div", { style: {
            display: "flex",
            gap: "var(--ds-5)",
            alignItems: "flex-start",
            flexWrap: "wrap"
          }, children: [
            /* @__PURE__ */ u("div", { style: { flex: "1 1 200px", minWidth: 190 }, children: [
              /* @__PURE__ */ r(j, { children: v }),
              i.length > 0 ? i.map((y) => /* @__PURE__ */ r(K, { item: y, onIr: m }, y.id)) : /* @__PURE__ */ r("div", { style: {
                padding: "var(--ds-3) 10px",
                fontSize: "var(--ds-t-small)",
                color: "var(--ds-ink-3)",
                lineHeight: 1.5
              }, children: "Lo que vayas abriendo aparece aquí." })
            ] }),
            /* @__PURE__ */ r("div", { style: {
              flex: "2 1 420px",
              minWidth: 280,
              display: "flex",
              flexDirection: "column",
              gap: "var(--ds-5)"
            }, children: o.map((y, k) => /* @__PURE__ */ u("div", { children: [
              /* @__PURE__ */ r(j, { children: y.titulo }),
              /* @__PURE__ */ r("div", { style: {
                display: "grid",
                gap: "var(--ds-3)",
                gridTemplateColumns: "repeat(auto-fill, minmax(136px, 1fr))"
              }, children: y.items.map((w, R) => /* @__PURE__ */ r(
                ye,
                {
                  icono: w.icono,
                  etiqueta: w.texto,
                  nota: w.subtitulo,
                  color: w.color,
                  ancho: w.ancho,
                  entrada: x[k][R],
                  onClick: () => m(w)
                },
                w.id
              )) })
            ] }, y.titulo)) })
          ] }) }),
          /* @__PURE__ */ r("div", { style: { padding: "var(--ds-3) var(--ds-5) var(--ds-5)" }, children: /* @__PURE__ */ u("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: "var(--ds-3)",
            padding: "0 var(--ds-4)",
            height: 48,
            borderRadius: "var(--ds-r-pill)",
            background: "var(--ds-surface)",
            border: "1px solid var(--ds-line)",
            boxShadow: "var(--ds-lift-1)"
          }, children: [
            /* @__PURE__ */ r("span", { style: { color: "var(--ds-ink-3)", display: "grid", placeItems: "center" }, children: Ee }),
            /* @__PURE__ */ r(
              "input",
              {
                ref: p,
                value: l,
                onChange: (y) => s == null ? void 0 : s(y.target.value),
                placeholder: c,
                "aria-label": c,
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
              }
            ),
            l && /* @__PURE__ */ r(
              "button",
              {
                onClick: () => s == null ? void 0 : s(""),
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
                children: /* @__PURE__ */ r(
                  "svg",
                  {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    children: /* @__PURE__ */ r("path", { d: "M18 6L6 18M6 6l12 12" })
                  }
                )
              }
            )
          ] }) })
        ]
      }
    )
  ] }) : null;
}
export {
  qe as Anillo,
  ar as Armazon,
  nr as Aviso,
  ye as Azulejo,
  Ze as Barra,
  Ue as Barras,
  De as Bento,
  B as Boton,
  Mr as Buscador,
  Wr as Campo,
  sr as Campos,
  xr as Cargando,
  Ne as Celda,
  Ve as Cifra,
  L as Esqueleto,
  ve as EsqueletoFila,
  Ye as EsqueletoLista,
  _e as Fila,
  or as Formulario,
  fe as Giro,
  Oe as Heroe,
  Ge as Insignia,
  rr as Interruptor,
  er as Lamina,
  Pe as Medidor,
  Qe as Migas,
  be as Modal,
  kr as PanelInicio,
  Xe as Pastilla,
  br as Pestanas,
  Ae as ProveedorTema,
  Ke as Retrato,
  Je as Seccion,
  Tr as Selector,
  ir as SelectorArmazon,
  de as Superficie,
  tr as Tabla,
  ke as Transicion,
  He as Vidrio,
  gr as condicion,
  hr as correo,
  ur as digitos,
  lr as maximo,
  cr as minimo,
  vr as numero,
  fr as patron,
  dr as requerido,
  pr as soloDigitos,
  H as useAngosto,
  te as useArmazon,
  yr as useFiltros,
  mr as useFormulario,
  Be as useTema
};
