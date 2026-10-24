import "./estilos.css";
import { jsx as t, jsxs as u, Fragment as J } from "react/jsx-runtime";
import me, { useState as q, useEffect as oe, useCallback as ie, useContext as ar, createContext as ir, useRef as V, useLayoutEffect as Se, useMemo as fe, useId as Rr } from "react";
import { B as Ua, C as Ja, a as ei, E as ti, S as ri } from "./Campo-CfntI-cS.js";
import { createPortal as or } from "react-dom";
const xt = "ds-theme", sr = ir({ tema: "light", alternar: () => {
}, fijar: () => {
} });
function Lr() {
  try {
    return !!localStorage.getItem(xt);
  } catch {
    return !1;
  }
}
function Ir(e) {
  try {
    localStorage.setItem(xt, e);
  } catch {
  }
}
function Ar() {
  try {
    const e = localStorage.getItem(xt);
    if (e === "light" || e === "dark") return e;
  } catch {
  }
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function qn({ children: e, forzar: r, marca: n }) {
  const [a, i] = q(() => r || Ar());
  oe(() => {
    const l = document.documentElement;
    l.setAttribute("data-ds-theme", a), l.style.colorScheme = a;
  }, [a]), oe(() => {
    if (!n) return;
    const l = document.documentElement;
    return l.setAttribute("data-ds-marca", n), () => l.removeAttribute("data-ds-marca");
  }, [n]), oe(() => {
    if (r || typeof window > "u" || !window.matchMedia) return;
    const l = window.matchMedia("(prefers-color-scheme: dark)"), c = (s) => {
      Lr() || i(s.matches ? "dark" : "light");
    };
    return l.addEventListener("change", c), () => l.removeEventListener("change", c);
  }, [r]);
  const d = ie((l) => {
    Ir(l), i(l);
  }, []), o = ie(() => d(a === "dark" ? "light" : "dark"), [a, d]);
  return /* @__PURE__ */ t(sr.Provider, { value: { tema: a, alternar: o, fijar: d }, children: /* @__PURE__ */ t("div", { className: "ds-root", children: e }) });
}
const Hn = () => ar(sr), Tt = { plana: "var(--ds-lift-1)", elevada: "var(--ds-lift-2)", flotante: "var(--ds-lift-3)" };
function we({
  children: e,
  nivel: r = "elevada",
  interactiva: n = !1,
  hundida: a = !1,
  solida: i = !1,
  radio: d = "var(--ds-r-card)",
  relleno: o = "var(--ds-5)",
  estilo: l,
  entrada: c,
  ...s
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      ...s,
      style: {
        background: i ? "var(--ds-surface-solid)" : a ? "var(--ds-surface-sunk)" : "var(--ds-surface)",
        backdropFilter: i ? void 0 : "var(--ds-blur)",
        WebkitBackdropFilter: i ? void 0 : "var(--ds-blur)",
        border: "1px solid var(--ds-line)",
        borderRadius: d,
        padding: o,
        /* border-box: con `height: 100%` (llenar la celda del Bento) el relleno se sumaba a la altura y la
           tarjeta se montaba sobre la fila de abajo. */
        boxSizing: "border-box",
        boxShadow: a ? "none" : Tt[r],
        transition: "transform var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease)",
        cursor: n ? "pointer" : void 0,
        ...c !== void 0 ? {
          animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
          animationDelay: `${Math.min(c * 55, 240)}ms`
        } : null,
        ...l
      },
      onMouseEnter: n ? (v) => {
        v.currentTarget.style.transform = "translateY(-3px)", v.currentTarget.style.boxShadow = "var(--ds-lift-3)";
      } : void 0,
      onMouseLeave: n ? (v) => {
        v.currentTarget.style.transform = "none", v.currentTarget.style.boxShadow = Tt[r];
      } : void 0,
      children: e
    }
  );
}
function Pn({ children: e, marco: r = !1, columnas: n = 12, hueco: a = "var(--ds-4)", estilo: i }) {
  return /* @__PURE__ */ t(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
        gap: a,
        ...r ? {
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
function _n({ children: e, ancho: r = 12, anchoMd: n, alto: a, estilo: i }) {
  return /* @__PURE__ */ u(
    "div",
    {
      className: "ds-celda",
      style: {
        gridColumn: `span ${n ?? r}`,
        minWidth: 0,
        ...a ? { gridRow: `span ${a}` } : null,
        ...i
      },
      children: [
        /* @__PURE__ */ t("style", { children: "@media (max-width: 900px) { .ds-celda { grid-column: span 12 !important; } }" }),
        e
      ]
    }
  );
}
function Vn({
  children: e,
  imagen: r,
  imagenChica: n,
  encuadre: a = "center",
  alt: i = "",
  intensidad: d = 0.26,
  soloFoto: o = !1,
  radio: l = "var(--ds-r-card)",
  relleno: c = "var(--ds-8)",
  estilo: s,
  entrada: v,
  ...p
}) {
  const [h, m] = me.useState(!1), y = o && r && !h;
  return /* @__PURE__ */ u(
    "div",
    {
      ...p,
      className: [y ? null : "ds-heroe", p.className].filter(Boolean).join(" ") || void 0,
      style: {
        position: "relative",
        overflow: "hidden",
        background: y ? "#0B0C12" : "var(--ds-hero)",
        borderRadius: l,
        padding: c,
        /* border-box: con `height: 100%` (llenar la celda del Bento) el relleno se sumaba a la altura y la
           tarjeta se montaba sobre la fila de abajo. */
        boxSizing: "border-box",
        color: "var(--ds-ink-on-hero)",
        boxShadow: y ? "var(--ds-lift-3)" : "var(--ds-lift-accent), var(--ds-lift-2)",
        ...v !== void 0 ? {
          animation: "ds-rise var(--ds-t-scene) var(--ds-ease) both",
          animationDelay: `${Math.min(v * 55, 240)}ms`
        } : null,
        ...s
      },
      children: [
        r && /* @__PURE__ */ t(
          "img",
          {
            "aria-hidden": i ? void 0 : "true",
            alt: i,
            src: r,
            srcSet: n ? `${n} 800w, ${r} 1600w` : void 0,
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
              ...y ? { filter: "saturate(1.08)" } : { mixBlendMode: "luminosity", opacity: d }
            },
            onError: () => m(!0)
          }
        ),
        y && /* @__PURE__ */ u(J, { children: [
          /* @__PURE__ */ t("div", { "aria-hidden": !0, style: {
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(8,9,15,0.58) 0%, rgba(8,9,15,0.30) 26%, rgba(8,9,15,0.34) 60%, rgba(8,9,15,0.78) 100%)"
          } }),
          /* @__PURE__ */ t("div", { "aria-hidden": !0, style: {
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "linear-gradient(to right, rgba(8,9,15,0.52) 0%, rgba(8,9,15,0.26) 38%, rgba(8,9,15,0) 68%)"
          } })
        ] }),
        !y && /* @__PURE__ */ t("div", { "aria-hidden": !0, style: { position: "absolute", inset: 0, background: "var(--ds-hero-glow)", pointerEvents: "none" } }),
        /* @__PURE__ */ t("div", { style: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }, children: e })
      ]
    }
  );
}
function Xn({ children: e, interactivo: r = !1, estilo: n, ...a }) {
  return /* @__PURE__ */ t(
    "div",
    {
      ...a,
      style: {
        background: "var(--ds-velo)",
        border: "1px solid var(--ds-line-glass)",
        backdropFilter: "blur(14px) saturate(150%)",
        WebkitBackdropFilter: "blur(14px) saturate(150%)",
        borderRadius: "var(--ds-r-item)",
        padding: "var(--ds-3) var(--ds-4)",
        color: "var(--ds-ink-on-hero)",
        transition: "background var(--ds-t-state) var(--ds-ease), transform var(--ds-t-state) var(--ds-ease)",
        cursor: r ? "pointer" : void 0,
        ...n
      },
      onMouseEnter: r ? (i) => {
        i.currentTarget.style.background = "var(--ds-velo-fuerte)", i.currentTarget.style.transform = "translateY(-2px)";
      } : void 0,
      onMouseLeave: r ? (i) => {
        i.currentTarget.style.background = "var(--ds-velo)", i.currentTarget.style.transform = "none";
      } : void 0,
      children: e
    }
  );
}
const Cr = {
  neutro: "var(--ds-ink)",
  acento: "var(--ds-accent-tinta)",
  ok: "var(--ds-ok)",
  aviso: "var(--ds-warn)",
  riesgo: "var(--ds-risk)"
}, Fr = { m: "var(--ds-num-m)", l: "var(--ds-num-l)", xl: "var(--ds-num-xl)" };
function Yn({
  valor: e,
  etiqueta: r,
  nota: n,
  tono: a = "neutro",
  tamano: i = "l",
  icono: d,
  alineacion: o = "left",
  estilo: l
}) {
  return /* @__PURE__ */ u("div", { style: { minWidth: 0, textAlign: o, ...l }, children: [
    r && /* @__PURE__ */ u("div", { style: {
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
      d,
      r
    ] }),
    /* @__PURE__ */ t("div", { className: "ds-num", style: {
      fontSize: Fr[i],
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: "-0.035em",
      color: Cr[a],
      marginTop: 2
    }, children: e }),
    n && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", marginTop: 3 }, children: n })
  ] });
}
function Er({
  valor: e = 0,
  tamano: r = 132,
  grosor: n = 10,
  tono: a = "var(--ds-accent-trazo)",
  pista: i = "var(--ds-surface-sunk)",
  children: d,
  animar: o = !0
}) {
  const l = Math.max(0, Math.min(100, e)), c = (r - n) / 2, s = 2 * Math.PI * c, v = s * (1 - l / 100);
  return /* @__PURE__ */ u("div", { style: { position: "relative", width: r, height: r, flexShrink: 0 }, children: [
    /* @__PURE__ */ u("svg", { width: r, height: r, style: { transform: "rotate(-90deg)" }, "aria-hidden": !0, children: [
      /* @__PURE__ */ t("circle", { cx: r / 2, cy: r / 2, r: c, fill: "none", stroke: i, strokeWidth: n }),
      /* @__PURE__ */ t(
        "circle",
        {
          cx: r / 2,
          cy: r / 2,
          r: c,
          fill: "none",
          stroke: a,
          strokeWidth: n,
          strokeLinecap: "round",
          strokeDasharray: s,
          strokeDashoffset: v,
          style: o ? {
            "--ds-dash": s,
            animation: "ds-sweep var(--ds-t-scene) var(--ds-ease) 120ms both"
          } : void 0
        }
      )
    ] }),
    /* @__PURE__ */ t("div", { style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1
    }, children: d })
  ] });
}
const zt = {
  acento: "var(--ds-accent-trazo)",
  ok: "var(--ds-ok)",
  aviso: "var(--ds-warn)",
  riesgo: "var(--ds-risk)"
};
function jr({
  valor: e = 0,
  total: r = 100,
  tono: n = "acento",
  alto: a = 6,
  etiqueta: i,
  estilo: d
}) {
  const o = r > 0 ? Math.max(0, Math.min(100, e / r * 100)) : 0;
  return /* @__PURE__ */ t(
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
        ...d
      },
      children: /* @__PURE__ */ t("div", { style: {
        height: "100%",
        width: `${o}%`,
        borderRadius: 99,
        background: zt[n] || zt.acento,
        transition: "width var(--ds-t-move) var(--ds-ease)"
      } })
    }
  );
}
function Q({
  alto: e = 14,
  ancho: r = "100%",
  radio: n = 7,
  circulo: a = !1,
  estilo: i
}) {
  return /* @__PURE__ */ t("span", { "aria-hidden": !0, style: {
    display: "block",
    flexShrink: 0,
    width: a ? a ? e : void 0 : r,
    height: e,
    borderRadius: a ? "var(--ds-r-pill)" : n,
    backgroundImage: "linear-gradient(90deg, var(--ds-esqueleto) 0%, var(--ds-esqueleto-brillo) 40%, var(--ds-esqueleto) 80%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "220% 100%",
    animation: "ds-brillo 1.4s linear infinite",
    ...i
  } });
}
function Br({ retrato: e = !0, lineas: r = 2, derecha: n = !0 }) {
  return /* @__PURE__ */ u("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "var(--ds-3)",
    padding: "var(--ds-3) var(--ds-4)"
  }, children: [
    e && /* @__PURE__ */ t(Q, { circulo: !0, alto: 40 }),
    /* @__PURE__ */ u("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 7 }, children: [
      /* @__PURE__ */ t(Q, { alto: 12, ancho: "42%" }),
      r > 1 && /* @__PURE__ */ t(Q, { alto: 10, ancho: "26%" })
    ] }),
    n && /* @__PURE__ */ t(Q, { alto: 12, ancho: 78 })
  ] });
}
function Gn({ filas: e = 5, ...r }) {
  return /* @__PURE__ */ t("div", { children: Array.from({ length: e }, (n, a) => /* @__PURE__ */ t("div", { style: { opacity: 1 - a * 0.12 }, children: /* @__PURE__ */ t(Br, { ...r }) }, a)) });
}
function Kn({
  datos: e = [],
  alto: r = 132,
  tono: n = "var(--ds-accent-trazo)",
  pista: a = "var(--ds-surface-sunk)",
  ancho: i = 7,
  hueco: d = 5,
  animar: o = !0,
  ejeX: l = !1
}) {
  const c = r === "auto", s = Math.max(1, ...e.map((h) => h.total ?? h.valor ?? 0)), v = c ? { flex: "1 1 0", minWidth: 0, maxWidth: i * 2 } : { width: i, flexShrink: 0 }, p = c ? "var(--ds-r-item)" : 99;
  return /* @__PURE__ */ u("div", { style: {
    display: "flex",
    flexDirection: "column",
    height: c ? "100%" : void 0,
    minHeight: 0
  }, children: [
    /* @__PURE__ */ t(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-end",
          gap: d,
          justifyContent: "space-between",
          ...c ? { flex: 1, minHeight: 72 } : { height: r }
        },
        role: "img",
        "aria-label": `Serie de ${e.length} valores`,
        children: e.map((h, m) => {
          const y = h.total ?? h.valor ?? 0, g = h.valor ?? 0, f = y / s * 100, x = g / s * 100;
          return /* @__PURE__ */ u(
            "div",
            {
              title: h.etiqueta,
              style: { position: "relative", height: "100%", ...v },
              children: [
                /* @__PURE__ */ t("div", { style: {
                  position: "absolute",
                  inset: "auto 0 0 0",
                  height: `max(3px, ${f}%)`,
                  background: a,
                  borderRadius: p
                } }),
                /* @__PURE__ */ t("div", { style: {
                  position: "absolute",
                  inset: "auto 0 0 0",
                  height: g > 0 ? `max(3px, ${x}%)` : 0,
                  background: h.tono || n,
                  borderRadius: p,
                  transformOrigin: "bottom",
                  ...o ? {
                    animation: "ds-grow var(--ds-t-move) var(--ds-ease) both",
                    animationDelay: `${Math.min(m * 22, 300)}ms`
                  } : null
                } })
              ]
            },
            m
          );
        })
      }
    ),
    l && /* @__PURE__ */ t("div", { style: {
      display: "flex",
      gap: d,
      marginTop: 8,
      flexShrink: 0,
      justifyContent: "space-between"
    }, children: e.map((h, m) => /* @__PURE__ */ t("div", { style: {
      ...v,
      textAlign: "center",
      fontSize: "var(--ds-t-micro)",
      fontWeight: 600,
      color: "var(--ds-ink-3)"
    }, children: h.eje ?? "" }, m)) })
  ] });
}
const Xe = {
  neutro: ["var(--ds-surface-sunk)", "var(--ds-ink-2)"],
  acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)"],
  ok: ["var(--ds-ok-soft)", "var(--ds-ok)"],
  aviso: ["var(--ds-warn-soft)", "var(--ds-warn)"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)"]
};
function Ae({ children: e, tono: r = "neutro", icono: n, estilo: a, ...i }) {
  const [d, o] = Xe[r] || Xe.neutro;
  return /* @__PURE__ */ u("span", { ...i, style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    background: d,
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
function lr({ children: e, tono: r = "acento", tamano: n = 38, estilo: a }) {
  const [i, d] = Xe[r] || Xe.acento;
  return /* @__PURE__ */ t("div", { style: {
    width: n,
    height: n,
    flexShrink: 0,
    borderRadius: "var(--ds-r-pill)",
    background: i,
    color: d,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...a
  }, children: e });
}
const Or = {
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
}, qr = {
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
    background: "var(--ds-velo)",
    color: "var(--ds-ink-on-hero)",
    borderColor: "var(--ds-line-glass)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)"
  }
}, Hr = `
@keyframes ds-boton-gira { to { transform: rotate(360deg); } }
@keyframes ds-boton-late { 50% { opacity: .35; } }
.ds-boton-giro { width: 15px; height: 15px; flex-shrink: 0; border-radius: 50%;
  border: 2px solid currentColor; border-right-color: transparent;
  animation: ds-boton-gira .7s linear infinite; }
@media (prefers-reduced-motion: reduce) { .ds-boton-giro { animation: ds-boton-late 1.2s ease-in-out infinite; } }
`;
function Pr({ estilo: e }) {
  return /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ t("style", { children: Hr }),
    /* @__PURE__ */ t("span", { className: "ds-boton-giro", "aria-hidden": !0, style: e })
  ] });
}
function Ye({
  children: e,
  variante: r = "contorno",
  icono: n,
  esperando: a = !1,
  disabled: i,
  pleno: d = !1,
  estilo: o,
  ...l
}) {
  const c = i || a;
  return /* @__PURE__ */ u(
    "button",
    {
      ...l,
      disabled: c,
      "aria-busy": a || void 0,
      style: {
        ...Or,
        ...qr[r],
        width: d ? "100%" : void 0,
        opacity: a ? 0.88 : i ? 0.55 : 1,
        cursor: a ? "progress" : i ? "not-allowed" : "pointer",
        ...o
      },
      onMouseDown: (s) => {
        c || (s.currentTarget.style.transform = "scale(0.98)");
      },
      onMouseUp: (s) => {
        s.currentTarget.style.transform = "none";
      },
      onMouseLeave: (s) => {
        s.currentTarget.style.transform = "none";
      },
      children: [
        a ? /* @__PURE__ */ t(Pr, {}) : n,
        e
      ]
    }
  );
}
function Qn({
  izquierda: e,
  titulo: r,
  subtitulo: n,
  derecha: a,
  extremo: i,
  onClick: d,
  estilo: o,
  entrada: l,
  ...c
}) {
  const s = !!d;
  return /* @__PURE__ */ u(
    "div",
    {
      ...c,
      onClick: d,
      role: s ? "button" : void 0,
      tabIndex: s ? 0 : void 0,
      onKeyDown: s ? (v) => {
        (v.key === "Enter" || v.key === " ") && (v.preventDefault(), d(v));
      } : void 0,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--ds-3)",
        padding: "var(--ds-3) var(--ds-4)",
        borderRadius: "var(--ds-r-item)",
        cursor: s ? "pointer" : void 0,
        transition: "background var(--ds-t-state) var(--ds-ease)",
        ...l !== void 0 ? {
          animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
          animationDelay: `${Math.min(l * 28, 260)}ms`
        } : null,
        ...o
      },
      onMouseEnter: s ? (v) => {
        v.currentTarget.style.background = "var(--ds-surface-2)";
      } : void 0,
      onMouseLeave: s ? (v) => {
        v.currentTarget.style.background = "transparent";
      } : void 0,
      children: [
        e,
        /* @__PURE__ */ u("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ t("div", { style: {
            fontSize: "var(--ds-t-body)",
            fontWeight: 700,
            color: "var(--ds-ink)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }, children: r }),
          n && /* @__PURE__ */ t("div", { style: {
            fontSize: "var(--ds-t-small)",
            color: "var(--ds-ink-3)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }, children: n })
        ] }),
        a && /* @__PURE__ */ t("div", { style: { flexShrink: 0, textAlign: "right" }, children: a }),
        i && /* @__PURE__ */ t("div", { style: { flexShrink: 0 }, children: i })
      ]
    }
  );
}
function kt({ src: e, nombre: r = "", tamano: n = 40, tono: a = "acento", generico: i = !1 }) {
  const [d, o] = me.useState(!1);
  me.useEffect(() => {
    o(!1);
  }, [e]);
  const l = r.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase(), c = e && !d;
  return /* @__PURE__ */ t("div", { style: {
    width: n,
    height: n,
    flexShrink: 0,
    borderRadius: "var(--ds-r-pill)",
    background: i && !c ? "var(--ds-retrato-neutro)" : a === "acento" ? "var(--ds-accent-soft)" : "var(--ds-retrato-neutro)",
    color: a === "acento" && !i ? "var(--ds-accent-tinta)" : "var(--ds-ink-3)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: n * 0.34,
    fontWeight: 800,
    letterSpacing: "-0.02em"
  }, children: c ? /* @__PURE__ */ t(
    "img",
    {
      src: e,
      alt: "",
      onError: () => o(!0),
      style: { width: "100%", height: "100%", objectFit: "cover" }
    }
  ) : i ? (
    /* La silueta llena el círculo hasta abajo, como un retrato de verdad:
       cabeza arriba, hombros cortados por el borde. */
    /* @__PURE__ */ u("svg", { viewBox: "0 0 40 40", width: "100%", height: "100%", "aria-hidden": !0, style: { display: "block" }, children: [
      /* @__PURE__ */ t("circle", { cx: "20", cy: "15.5", r: "7.2", fill: "currentColor", opacity: "0.55" }),
      /* @__PURE__ */ t("path", { d: "M5.5 40c0-8.6 6.5-14.2 14.5-14.2S34.5 31.4 34.5 40z", fill: "currentColor", opacity: "0.55" })
    ] })
  ) : l });
}
function _r({ titulo: e, nota: r, accion: n, children: a, estilo: i }) {
  return /* @__PURE__ */ u("div", { style: { ...i }, children: [
    /* @__PURE__ */ u("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--ds-3)",
      marginBottom: "var(--ds-4)"
    }, children: [
      /* @__PURE__ */ u("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ t("h2", { style: {
          margin: 0,
          fontSize: "var(--ds-t-title)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          color: "var(--ds-ink)"
        }, children: e }),
        r && /* @__PURE__ */ t("div", { style: {
          fontSize: "var(--ds-t-small)",
          fontWeight: 600,
          color: "var(--ds-ink-3)",
          marginTop: 3
        }, children: r })
      ] }),
      /* @__PURE__ */ t("div", { style: {
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
function ye(e = 760) {
  return dr(`(max-width: ${e}px)`);
}
function dr(e) {
  const [r, n] = q(
    () => typeof window < "u" && !!window.matchMedia && window.matchMedia(e).matches
  );
  return oe(() => {
    if (typeof window > "u" || !window.matchMedia) return;
    const a = window.matchMedia(e), i = (d) => n(d.matches);
    return n(a.matches), a.addEventListener("change", i), () => a.removeEventListener("change", i);
  }, [e]), r;
}
const cr = { containerType: "inline-size", minWidth: 0 };
function ur(e, r) {
  const n = Math.max(4, String(r ?? "").length);
  return `min(${e}, calc(100cqi / ${(n * 0.62).toFixed(2)}))`;
}
const Vr = /* @__PURE__ */ t(
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
    children: /* @__PURE__ */ t("path", { d: "M9 18l6-6-6-6" })
  }
), Xr = /* @__PURE__ */ t(
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
    children: /* @__PURE__ */ t("path", { d: "M19 12H5M12 19l-7-7 7-7" })
  }
), at = {
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
function Yr({ ruta: e = [], estilo: r }) {
  const n = ye();
  if (e.length === 0) return null;
  const a = e[e.length - 1], i = e.length > 1 ? e[e.length - 2] : null, d = i && i.ir ? /* @__PURE__ */ u(
    "button",
    {
      onClick: i.ir,
      style: { ...at, color: "var(--ds-ink-2)", fontWeight: 700 },
      onMouseEnter: (o) => {
        o.currentTarget.style.color = "var(--ds-accent-tinta)";
      },
      onMouseLeave: (o) => {
        o.currentTarget.style.color = "var(--ds-ink-2)";
      },
      children: [
        Xr,
        " Volver a ",
        i.texto
      ]
    }
  ) : null;
  return n ? d ? /* @__PURE__ */ t("div", { style: { marginBottom: "var(--ds-3)", ...r }, children: d }) : null : /* @__PURE__ */ u("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "var(--ds-3)",
    flexWrap: "wrap",
    marginBottom: "var(--ds-3)",
    ...r
  }, children: [
    d,
    d && /* @__PURE__ */ t("span", { "aria-hidden": !0, style: {
      width: 1,
      height: 16,
      background: "var(--ds-line-firm)",
      opacity: 0.7
    } }),
    /* @__PURE__ */ t("nav", { "aria-label": "Ruta", children: /* @__PURE__ */ t("ol", { style: {
      display: "flex",
      alignItems: "center",
      gap: 2,
      flexWrap: "wrap",
      listStyle: "none",
      margin: 0,
      padding: 0
    }, children: e.map((o, l) => {
      const c = l === e.length - 1;
      return /* @__PURE__ */ u("li", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        minWidth: 0
      }, children: [
        l > 0 && /* @__PURE__ */ t("span", { style: { color: "var(--ds-ink-3)", display: "inline-flex" }, children: Vr }),
        c ? /* @__PURE__ */ t("span", { "aria-current": "page", style: {
          ...at,
          cursor: "default",
          color: "var(--ds-ink)",
          fontWeight: 700
        }, children: o.texto }) : /* @__PURE__ */ t(
          "button",
          {
            onClick: o.ir,
            style: at,
            onMouseEnter: (s) => {
              s.currentTarget.style.color = "var(--ds-ink)";
            },
            onMouseLeave: (s) => {
              s.currentTarget.style.color = "var(--ds-ink-3)";
            },
            children: o.texto
          }
        )
      ] }, `${o.texto}-${l}`);
    }) }) }),
    /* @__PURE__ */ t("span", { style: { flex: 1 } }),
    a == null ? void 0 : a.accion
  ] });
}
function Zn({ marca: e, secciones: r = [], activa: n, onIr: a, derecha: i, estilo: d }) {
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
    ...d
  }, children: [
    e && /* @__PURE__ */ t("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 14px 6px 10px",
      fontWeight: 800,
      fontSize: "var(--ds-t-body)",
      letterSpacing: "-0.02em"
    }, children: e }),
    r.map((o) => {
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
          onMouseEnter: (c) => {
            l || (c.currentTarget.style.color = "#FFFFFF");
          },
          onMouseLeave: (c) => {
            l || (c.currentTarget.style.color = "rgba(255,255,255,0.62)");
          },
          children: [
            o.icono,
            o.texto
          ]
        },
        o.id
      );
    }),
    /* @__PURE__ */ t("div", { style: { flex: 1 } }),
    i
  ] });
}
function Un({
  imagen: e,
  imagenChica: r,
  alt: n = "",
  alto: a = 200,
  children: i,
  pie: d,
  radio: o = "var(--ds-r-card)",
  encima: l = !0,
  encuadre: c = "center",
  fondo: s = !1,
  estilo: v,
  entrada: p,
  ...h
}) {
  const [m, y] = me.useState(!1), g = ({ estiloExtra: f }) => /* @__PURE__ */ t(
    "img",
    {
      src: e,
      srcSet: r ? `${r} 800w, ${e} 1600w` : void 0,
      sizes: r ? "(max-width: 760px) 100vw, 640px" : void 0,
      alt: n,
      loading: "lazy",
      decoding: "async",
      onError: () => y(!0),
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: c,
        display: "block",
        ...f
      }
    }
  );
  return s ? /* @__PURE__ */ u(
    "div",
    {
      ...h,
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
        ...p !== void 0 ? {
          animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
          animationDelay: `${Math.min(p * 55, 240)}ms`
        } : null,
        ...v
      },
      children: [
        e && !m && /* Bajo un velo denso los colores se apagan y la foto se vuelve una
        mancha. Se compensa saturando por debajo: la escena se reconoce
        sin aclarar el velo, que es lo que sostiene la lectura. */
        /* @__PURE__ */ t("div", { "aria-hidden": !0, style: {
          position: "absolute",
          inset: 0,
          zIndex: 0,
          filter: "saturate(1.35) contrast(1.06)"
        }, children: /* @__PURE__ */ t(g, {}) }),
        /* @__PURE__ */ t("div", { "aria-hidden": !0, style: {
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(to bottom, rgba(8,9,15,0.26) 0%, rgba(8,9,15,0.58) 32%, rgba(8,9,15,0.82) 66%, rgba(8,9,15,0.92) 100%)"
        } }),
        /* @__PURE__ */ t(
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
      ...h,
      style: {
        position: "relative",
        overflow: "hidden",
        borderRadius: o,
        background: "var(--ds-surface)",
        backdropFilter: "var(--ds-blur)",
        WebkitBackdropFilter: "var(--ds-blur)",
        border: "1px solid var(--ds-line)",
        boxShadow: "var(--ds-lift-2)",
        ...p !== void 0 ? {
          animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
          animationDelay: `${Math.min(p * 55, 240)}ms`
        } : null,
        ...v
      },
      children: [
        /* @__PURE__ */ u("div", { style: { position: "relative", height: a, flexShrink: 0, overflow: "hidden" }, children: [
          e && !m ? /* @__PURE__ */ t(g, {}) : (
            /* Sin imagen no se finge una: el hueco se resuelve con el material
               del sistema, no con una foto de archivo. */
            /* @__PURE__ */ t("div", { style: { width: "100%", height: "100%", background: "var(--ds-hero)" } })
          ),
          l && i && /* @__PURE__ */ u(J, { children: [
            /* @__PURE__ */ t("div", { "aria-hidden": !0, style: {
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(8,9,15,0.90) 0%, rgba(8,9,15,0.68) 28%, rgba(8,9,15,0.28) 58%, rgba(8,9,15,0) 88%)"
            } }),
            /* @__PURE__ */ t("div", { style: {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "var(--ds-4)",
              color: "#FFFFFF"
            }, children: i })
          ] })
        ] }),
        (d || !l && i) && /* @__PURE__ */ t("div", { style: { padding: "var(--ds-4)" }, children: d || i })
      ]
    }
  );
}
function Gr({
  icono: e,
  etiqueta: r,
  nota: n,
  color: a,
  onClick: i,
  ancho: d = 1,
  entrada: o,
  estilo: l
}) {
  const [c, s] = me.useState(!1), v = a || "var(--ds-accent)", p = `color-mix(in oklab, ${v}, var(--ds-mezcla-tono))`;
  return /* @__PURE__ */ u(
    "button",
    {
      onClick: i,
      onMouseEnter: () => s(!0),
      onMouseLeave: () => s(!1),
      style: {
        gridColumn: `span ${d}`,
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
        border: `1px solid ${c ? v + "55" : "var(--ds-line)"}`,
        background: `linear-gradient(150deg, ${v}${c ? "30" : "1F"} 0%, ${v}0D 100%), var(--ds-surface)`,
        boxShadow: c ? "var(--ds-lift-2)" : "none",
        transform: c ? "translateY(-3px)" : "none",
        transition: "transform var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease)",
        animation: o !== void 0 ? `ds-rise var(--ds-t-move) var(--ds-ease) ${Math.min(o * 28, 220)}ms both` : void 0,
        ...l
      },
      children: [
        /* @__PURE__ */ t("span", { style: {
          display: "grid",
          placeItems: "center",
          width: 46,
          height: 46,
          borderRadius: "var(--ds-r-item)",
          background: `${v}2E`,
          color: p,
          boxShadow: c ? `0 6px 16px -6px ${v}88` : "none",
          transition: "box-shadow var(--ds-t-state) var(--ds-ease)"
        }, children: e }),
        /* @__PURE__ */ u("span", { style: { display: "block", minWidth: 0, width: "100%" }, children: [
          /* @__PURE__ */ t("span", { style: {
            display: "block",
            fontSize: "var(--ds-t-small)",
            fontWeight: 700,
            color: p,
            letterSpacing: "-0.01em",
            lineHeight: 1.25
          }, children: r }),
          n && /* @__PURE__ */ t("span", { style: {
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
function Jn({
  encendido: e = !1,
  onCambio: r,
  etiqueta: n,
  deshabilitado: a = !1,
  estilo: i
}) {
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": e,
      "aria-label": n,
      title: n,
      disabled: a,
      onClick: () => r == null ? void 0 : r(!e),
      style: {
        position: "relative",
        flexShrink: 0,
        width: 42,
        height: 25,
        borderRadius: "var(--ds-r-pill)",
        cursor: a ? "not-allowed" : "pointer",
        border: `1px solid ${e ? "transparent" : "var(--ds-line-firm)"}`,
        background: e ? "var(--ds-accent-trazo)" : "var(--ds-surface-sunk)",
        opacity: a ? 0.5 : 1,
        transition: "background var(--ds-t-state) var(--ds-ease)",
        padding: 0
      },
      children: /* @__PURE__ */ t("span", { "aria-hidden": !0, style: {
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
const Nt = /* @__PURE__ */ new Map(), Dt = (e) => String(e ?? "").split("/").filter(Boolean).length;
function Kr(e, r, n) {
  const a = getComputedStyle(e).getPropertyValue(r).trim();
  return a.endsWith("ms") ? parseFloat(a) : a.endsWith("s") ? parseFloat(a) * 1e3 : n;
}
function Qr({ vista: e, eje: r = "auto", ambito: n = "vista", children: a, estilo: i }) {
  const d = V(null);
  return Se(() => {
    var v, p;
    const o = d.current, l = Nt.get(n);
    if (Nt.set(n, e), !o || e === void 0 || l === void 0 || l === e || typeof o.animate != "function" || (p = (v = window.matchMedia) == null ? void 0 : v.call(window, "(prefers-reduced-motion: reduce)")) != null && p.matches) return;
    const c = r === "y" ? 0 : Dt(e) - Dt(l), s = c > 0 ? { left: "24px", top: "0px" } : c < 0 ? { left: "-24px", top: "0px" } : { left: "0px", top: "14px" };
    o.animate(
      [{ opacity: 0, ...s }, { opacity: 1, left: "0px", top: "0px" }],
      {
        duration: Kr(o, "--ds-t-vista", 320),
        easing: getComputedStyle(o).getPropertyValue("--ds-ease").trim() || "cubic-bezier(0.16, 1, 0.3, 1)",
        /* `fill: none`: al acabar no queda ningún valor pegado al contenedor. */
        fill: "none"
      }
    );
  }, [e, r, n]), /* @__PURE__ */ t("div", { ref: d, style: { position: "relative", minWidth: 0, ...i }, children: a });
}
function vr({
  abierto: e,
  onCerrar: r,
  titulo: n,
  nota: a,
  children: i,
  acciones: d,
  ancho: o = 560,
  estilo: l,
  lado: c
}) {
  const s = ye(), v = c === "derecha" && !s, p = V(null), h = V(null), m = V(r);
  return m.current = r, oe(() => {
    if (!e) return;
    h.current = document.activeElement;
    const y = (f) => {
      var x;
      f.key === "Escape" && (f.stopPropagation(), (x = m.current) == null || x.call(m));
    };
    document.addEventListener("keydown", y, !0);
    const g = setTimeout(() => {
      var f;
      return (f = p.current) == null ? void 0 : f.focus();
    }, 40);
    return () => {
      var f, x;
      document.removeEventListener("keydown", y, !0), clearTimeout(g);
      try {
        (x = (f = h.current) == null ? void 0 : f.focus) == null || x.call(f);
      } catch {
      }
    };
  }, [e]), e ? /* @__PURE__ */ u(J, { children: [
    !v && /* @__PURE__ */ t(
      "div",
      {
        onClick: r,
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
        ref: p,
        role: "dialog",
        "aria-modal": v ? "false" : "true",
        "aria-label": n,
        tabIndex: -1,
        style: {
          position: "fixed",
          zIndex: 61,
          outline: "none",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "var(--ds-panel)",
          border: "1px solid var(--ds-line)",
          backdropFilter: "var(--ds-blur)",
          WebkitBackdropFilter: "var(--ds-blur)",
          boxShadow: "var(--ds-lift-3)",
          ...s ? {
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
            ...v ? { right: "var(--ds-4)", top: "50%", transform: "translateY(-50%)" } : { left: "50%", top: "50%", transform: "translate(-50%, -50%)" },
            width: `min(${o}px, calc(100% - var(--ds-8)))`,
            maxHeight: "calc(100dvh - var(--ds-12))",
            borderRadius: "var(--ds-r-frame)",
            /* `ds-modal`, no `ds-rise`: ésa termina en `transform: none` y le
               borraría el centrado al acabar. */
            animation: `${v ? "ds-modal-lado" : "ds-modal"} var(--ds-t-move) var(--ds-ease) both`
          },
          ...l
        },
        children: [
          s && /* @__PURE__ */ t("div", { "aria-hidden": !0, style: {
            width: 38,
            height: 5,
            borderRadius: 3,
            flexShrink: 0,
            margin: "var(--ds-2) auto 0",
            background: "var(--ds-line-firm)"
          } }),
          v && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: r,
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
              children: /* @__PURE__ */ t(
                "svg",
                {
                  width: "15",
                  height: "15",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.2",
                  strokeLinecap: "round",
                  children: /* @__PURE__ */ t("path", { d: "M18 6L6 18M6 6l12 12" })
                }
              )
            }
          ),
          n && /* @__PURE__ */ u("div", { style: {
            padding: "var(--ds-5) var(--ds-5) 0",
            flexShrink: 0,
            paddingRight: v ? 64 : void 0
          }, children: [
            /* @__PURE__ */ t("h2", { style: {
              margin: 0,
              fontSize: "var(--ds-t-title)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--ds-ink)"
            }, children: n }),
            a && /* @__PURE__ */ t("p", { style: {
              margin: "5px 0 0",
              fontSize: "var(--ds-t-small)",
              color: "var(--ds-ink-3)"
            }, children: a })
          ] }),
          /* @__PURE__ */ t("div", { style: { padding: "var(--ds-5)", overflowY: "auto", flex: 1, minHeight: 0 }, children: i }),
          d && /* @__PURE__ */ t("div", { style: {
            display: "flex",
            justifyContent: "flex-end",
            gap: "var(--ds-2)",
            padding: "0 var(--ds-5) var(--ds-5)",
            flexShrink: 0,
            flexWrap: "wrap"
          }, children: d })
        ]
      }
    )
  ] }) : null;
}
const Rt = {
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
function ea({ abierto: e, severidad: r = "info", titulo: n, mensaje: a, onCerrar: i, acciones: d }) {
  const o = Rt[r] || Rt.info, l = ie(() => i == null ? void 0 : i(), [i]), c = (d || []).some((s) => s.cierra);
  return /* @__PURE__ */ t(vr, { abierto: e, onCerrar: l, ancho: 420, children: /* @__PURE__ */ u("div", { style: { textAlign: "center", padding: "var(--ds-2) 0" }, children: [
    /* @__PURE__ */ t("div", { style: {
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
          r === "info" && /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "9" }),
          /* @__PURE__ */ t("path", { d: o.d })
        ]
      }
    ) }),
    /* @__PURE__ */ t("div", { style: {
      fontSize: "var(--ds-t-title)",
      fontWeight: 800,
      letterSpacing: "-0.03em",
      color: "var(--ds-ink)"
    }, children: n || o.titulo }),
    a && /* @__PURE__ */ t("div", { style: {
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
      (d || []).map((s, v) => /* @__PURE__ */ t(
        Ye,
        {
          variante: s.primaria ? "solido" : "contorno",
          onClick: () => {
            var p;
            (p = s.onClick) == null || p.call(s), l();
          },
          children: s.texto
        },
        v
      )),
      !c && /* @__PURE__ */ t(Ye, { variante: (d || []).length ? "fantasma" : "solido", onClick: l, children: "Entendido" })
    ] })
  ] }) });
}
const hr = "ds-nav", pt = ["topbar", "sidebar", "dock"], Te = 64, Lt = 52, pr = ir({ modo: "topbar", movil: !1, fijarModo: () => {
} }), wt = () => ar(pr);
function Zr() {
  try {
    const e = localStorage.getItem(hr);
    if (pt.includes(e)) return e;
  } catch {
  }
  return "topbar";
}
const fr = {
  background: "var(--ds-frame)",
  backdropFilter: "var(--ds-blur)",
  WebkitBackdropFilter: "var(--ds-blur)",
  border: "1px solid var(--ds-line)"
};
function Ue(e, r) {
  Se(() => {
    const n = document.documentElement.style;
    return n.setProperty("--ds-reserva-arriba", e), n.setProperty("--ds-reserva-abajo", r), () => {
      n.removeProperty("--ds-reserva-arriba"), n.removeProperty("--ds-reserva-abajo");
    };
  }, [e, r]);
}
function Je({ n: e, sobre: r = !1 }) {
  const n = Number(e) || 0;
  return n <= 0 ? null : /* @__PURE__ */ t("span", { className: "ds-num", "aria-label": `${n} pendientes`, style: {
    ...r ? { position: "absolute", top: -6, right: -9 } : {},
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
    boxShadow: r ? "0 0 0 2px var(--ds-surface-solid)" : "none"
  }, children: n > 99 ? "99+" : n });
}
function qe({ s: e, alto: r = 18 }) {
  return /* @__PURE__ */ u("span", { style: {
    position: "relative",
    display: "grid",
    placeItems: "center",
    width: 18,
    height: r,
    flexShrink: 0
  }, children: [
    e.icono || "•",
    /* @__PURE__ */ t(Je, { n: e.insignia, sobre: !0 })
  ] });
}
function Ge({ marca: e, encoge: r = !1 }) {
  return /* @__PURE__ */ t("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: r ? 1 : 0,
    minWidth: 0,
    overflow: r ? "hidden" : "visible",
    textOverflow: "ellipsis",
    fontWeight: 800,
    fontSize: "var(--ds-t-body)",
    letterSpacing: "-0.02em",
    color: "var(--ds-ink)",
    whiteSpace: "nowrap"
  }, children: e });
}
function Ur({ s: e, esta: r, onIr: n }) {
  return /* @__PURE__ */ u(
    "button",
    {
      onClick: () => n == null ? void 0 : n(e),
      "aria-current": r ? "page" : void 0,
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
        background: r ? "var(--ds-ink)" : "var(--ds-surface)",
        color: r ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
        boxShadow: r ? "var(--ds-lift-2)" : "none",
        transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease), transform var(--ds-t-tap) var(--ds-ease)"
      },
      onMouseEnter: (a) => {
        r || (a.currentTarget.style.background = "var(--ds-surface-solid)", a.currentTarget.style.color = "var(--ds-ink)");
      },
      onMouseLeave: (a) => {
        r || (a.currentTarget.style.background = "var(--ds-surface)", a.currentTarget.style.color = "var(--ds-ink-2)");
      },
      onMouseDown: (a) => {
        a.currentTarget.style.transform = "scale(0.96)";
      },
      onMouseUp: (a) => {
        a.currentTarget.style.transform = "none";
      },
      children: [
        e.icono,
        e.texto,
        /* @__PURE__ */ t(Je, { n: e.insignia })
      ]
    }
  );
}
function mr({ abierto: e, onCerrar: r, secciones: n, activa: a, onIr: i }) {
  return /* @__PURE__ */ t(vr, { abierto: e, onCerrar: r, titulo: "Más", ancho: 420, children: /* @__PURE__ */ t("div", { style: { display: "flex", flexDirection: "column", gap: 2, margin: "calc(var(--ds-2) * -1) 0" }, children: n.map((d) => {
    const o = d.id === a;
    return /* @__PURE__ */ u(
      "button",
      {
        onClick: () => {
          r(), i == null || i(d);
        },
        "aria-current": o ? "page" : void 0,
        style: {
          display: "flex",
          alignItems: "center",
          gap: "var(--ds-3)",
          width: "100%",
          minHeight: 48,
          padding: "0 var(--ds-3)",
          border: "none",
          cursor: "pointer",
          borderRadius: "var(--ds-r-item)",
          textAlign: "left",
          fontFamily: "var(--ds-font)",
          fontSize: "var(--ds-t-body)",
          fontWeight: 700,
          background: o ? "var(--ds-accent-soft)" : "transparent",
          color: o ? "var(--ds-accent-tinta)" : "var(--ds-ink)"
        },
        children: [
          /* @__PURE__ */ t(qe, { s: { ...d, insignia: 0 } }),
          /* @__PURE__ */ u("span", { style: { flex: 1, minWidth: 0 }, children: [
            d.texto,
            d.nota && /* @__PURE__ */ t("span", { style: {
              display: "block",
              fontSize: "var(--ds-t-small)",
              fontWeight: 500,
              color: "var(--ds-ink-3)"
            }, children: d.nota })
          ] }),
          /* @__PURE__ */ t(Je, { n: d.insignia })
        ]
      },
      d.id
    );
  }) }) });
}
function Jr({ marca: e, secciones: r, activa: n, onIr: a, derecha: i, children: d }) {
  const o = V(null), [l, c] = q(56);
  return Se(() => {
    const s = o.current;
    if (!s) return;
    const v = () => c(s.getBoundingClientRect().height);
    v();
    const p = new ResizeObserver(v);
    return p.observe(s), () => p.disconnect();
  }, []), Ue(`${Math.round(l) + 36}px`, "var(--ds-4)"), /* @__PURE__ */ u("div", { style: { minHeight: "100%", padding: "var(--ds-4)" }, children: [
    /* @__PURE__ */ u("header", { ref: o, style: {
      ...fr,
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
    }, children: [
      /* @__PURE__ */ t("div", { style: { paddingLeft: 8, paddingRight: 8 }, children: /* @__PURE__ */ t(Ge, { marca: e }) }),
      /* @__PURE__ */ t("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--ds-2)",
        flexWrap: "wrap",
        flex: 1,
        minWidth: 0
      }, children: r.map((s) => /* @__PURE__ */ t(Ur, { s, esta: s.id === n, onIr: a }, s.id)) }),
      /* @__PURE__ */ t("div", { style: { flex: "0 0 auto", display: "flex", justifyContent: "flex-end" }, children: i })
    ] }),
    /* @__PURE__ */ t("main", { style: { paddingTop: l + 20 }, children: d })
  ] });
}
function en({ marca: e, secciones: r, activa: n, onIr: a, derecha: i, children: d }) {
  const [o, l] = q(!0), c = dr("(max-height: 760px)"), s = o, v = s ? 244 : 64, p = 16;
  return Ue("var(--ds-4)", "var(--ds-4)"), /* @__PURE__ */ u("div", { style: { minHeight: "100%", padding: "var(--ds-4)" }, children: [
    /* @__PURE__ */ u("aside", { style: {
      ...fr,
      width: v,
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
    }, children: [
      /* @__PURE__ */ u("div", { style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: c ? "4px 8px 4px" : "6px 8px 10px",
        flexShrink: 0,
        minWidth: 0
      }, children: [
        s && /* @__PURE__ */ t(Ge, { marca: e }),
        /* @__PURE__ */ t(
          "button",
          {
            onClick: () => l((h) => !h),
            "aria-label": s ? "Contraer menú" : "Desplegar menú",
            style: {
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--ds-ink-3)",
              padding: 4,
              borderRadius: 8,
              lineHeight: 0
            },
            children: /* @__PURE__ */ t(
              "svg",
              {
                width: "17",
                height: "17",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                children: /* @__PURE__ */ t("path", { d: s ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6" })
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ t("nav", { "aria-label": "Navegación principal", style: {
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        overflowX: "hidden",
        scrollbarWidth: "thin",
        display: "flex",
        flexDirection: "column",
        gap: c ? 0 : 2,
        margin: "0 calc(var(--ds-1) * -1)",
        padding: "2px var(--ds-1)"
      }, children: r.map((h) => {
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
              flexShrink: 0,
              justifyContent: s ? "flex-start" : "center",
              fontFamily: "var(--ds-font)",
              fontSize: "var(--ds-t-small)",
              fontWeight: 700,
              padding: `${c ? 8 : 11}px ${s ? 13 : 0}px`,
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
            onMouseEnter: (y) => {
              m || (y.currentTarget.style.background = "var(--ds-surface-2)");
            },
            onMouseLeave: (y) => {
              m || (y.currentTarget.style.background = "transparent");
            },
            children: [
              /* @__PURE__ */ t("span", { style: { color: m ? "var(--ds-accent-tinta)" : "inherit", lineHeight: 0 }, children: /* @__PURE__ */ t(qe, { s: s ? { ...h, insignia: 0 } : h }) }),
              s && /* @__PURE__ */ t("span", { style: {
                flex: 1,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }, children: h.texto }),
              s && /* @__PURE__ */ t(Je, { n: h.insignia })
            ]
          },
          h.id
        );
      }) }),
      i ? /* @__PURE__ */ t("div", { style: {
        paddingTop: "var(--ds-3)",
        flexShrink: 0,
        borderTop: "1px solid var(--ds-line)",
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--ds-2)",
        justifyContent: s ? "flex-start" : "center"
      }, children: i }) : null
    ] }),
    /* @__PURE__ */ t("main", { style: {
      minWidth: 0,
      marginLeft: v + p,
      transition: "margin-left var(--ds-t-move) var(--ds-ease)"
    }, children: d })
  ] });
}
const St = 48;
function It({ s: e, esta: r, conTexto: n, onIr: a }) {
  return /* @__PURE__ */ u(
    "button",
    {
      onClick: () => a == null ? void 0 : a(e),
      title: e.texto,
      "aria-label": e.texto,
      "aria-current": r ? "page" : void 0,
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        fontFamily: "var(--ds-font)",
        fontSize: "0.66rem",
        fontWeight: 700,
        padding: n ? "7px 15px" : 0,
        minWidth: n ? 0 : St,
        height: n ? "auto" : 44,
        boxSizing: "border-box",
        borderRadius: "var(--ds-r-item)",
        border: "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
        flexShrink: 0,
        background: r ? "var(--ds-ink)" : "transparent",
        color: r ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
        transition: "transform var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
      },
      onMouseEnter: (i) => {
        i.currentTarget.style.transform = "translateY(-3px)", r || (i.currentTarget.style.background = "var(--ds-surface-2)", i.currentTarget.style.color = "var(--ds-ink)");
      },
      onMouseLeave: (i) => {
        i.currentTarget.style.transform = "none", r || (i.currentTarget.style.background = "transparent", i.currentTarget.style.color = "var(--ds-ink-2)");
      },
      children: [
        /* @__PURE__ */ t(qe, { s: e, alto: 19 }),
        n && e.texto
      ]
    }
  );
}
function tn({
  marca: e,
  icono: r,
  secciones: n,
  activa: a,
  onIr: i,
  derecha: d,
  inicio: o,
  inicioAbierto: l = !1,
  onInicioAbierto: c,
  children: s
}) {
  const v = V(null), p = V(null), h = V(null), m = V(null), [y, g] = q(0), [f, x] = q(n.length), [b, W] = q(!1);
  Ue("var(--ds-4)", `calc(${Te}px + var(--ds-6) + env(safe-area-inset-bottom, 0px))`);
  const w = ie(() => {
    var A, P, j;
    const k = v.current;
    if (!k) return;
    const R = getComputedStyle(k), I = k.clientWidth - parseFloat(R.paddingLeft) - parseFloat(R.paddingRight), B = 2 * Math.max(((A = p.current) == null ? void 0 : A.scrollWidth) || 0, ((P = h.current) == null ? void 0 : P.scrollWidth) || 0), Y = 2 * (parseFloat(R.columnGap) || 8), $ = I - B - Y, E = St + 4;
    if ((((j = m.current) == null ? void 0 : j.scrollWidth) || 0) <= $) {
      g(0);
      return;
    }
    if (n.length * E <= $) {
      g(1);
      return;
    }
    g(2), x(Math.max(1, Math.floor($ / E) - 1));
  }, [n]);
  Se(() => {
    w();
    const k = new ResizeObserver(w);
    return [v.current, p.current, h.current].forEach((R) => R && k.observe(R)), () => k.disconnect();
  }, [w]);
  const T = y === 2 ? n.slice(0, f) : n, z = y === 2 ? n.slice(f) : [], S = { flex: "1 1 0", minWidth: "max-content", display: "flex", alignItems: "center" }, M = {
    display: "flex",
    alignItems: "center",
    gap: "var(--ds-2)",
    width: "max-content",
    flexWrap: "nowrap"
  };
  return /* @__PURE__ */ u("div", { style: {
    minHeight: "100%",
    padding: "var(--ds-4)",
    paddingBottom: `calc(${Te}px + var(--ds-6))`
  }, children: [
    /* @__PURE__ */ t("main", { children: s }),
    /* @__PURE__ */ u("nav", { ref: v, "aria-label": "Navegación principal", style: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 40,
      height: `calc(${Te}px + env(safe-area-inset-bottom, 0px))`,
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
      /* @__PURE__ */ t("div", { style: S, children: /* @__PURE__ */ t("div", { ref: p, style: M, children: o && /* @__PURE__ */ t(
        an,
        {
          abierto: l,
          icono: r,
          onClick: () => c == null ? void 0 : c(!l)
        }
      ) }) }),
      /* @__PURE__ */ u("div", { style: {
        flex: "0 1 auto",
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--ds-1)",
        position: "relative"
      }, children: [
        T.map((k) => /* @__PURE__ */ t(It, { s: k, esta: k.id === a, conTexto: y === 0, onIr: i }, k.id)),
        z.length > 0 && /* @__PURE__ */ t(
          rn,
          {
            activo: z.some((k) => k.id === a),
            insignia: z.reduce((k, R) => k + (Number(R.insignia) || 0), 0),
            onClick: () => W(!0),
            alto: 44
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { style: { ...S, justifyContent: "flex-end" }, children: /* @__PURE__ */ t("div", { ref: h, style: M, children: d }) }),
      /* @__PURE__ */ t("div", { ref: m, "aria-hidden": !0, style: {
        position: "absolute",
        left: 0,
        top: 0,
        visibility: "hidden",
        pointerEvents: "none",
        display: "flex",
        gap: "var(--ds-1)",
        width: "max-content"
      }, children: n.map((k) => /* @__PURE__ */ t(It, { s: k, esta: !1, conTexto: !0 }, k.id)) })
    ] }),
    /* @__PURE__ */ t(
      mr,
      {
        abierto: b,
        onCerrar: () => W(!1),
        secciones: z,
        activa: a,
        onIr: i
      }
    ),
    o
  ] });
}
function rn({ activo: e, insignia: r, onClick: n, alto: a }) {
  return /* @__PURE__ */ t(
    "button",
    {
      onClick: n,
      title: "Más secciones",
      "aria-label": "Más secciones",
      style: {
        display: "grid",
        placeItems: "center",
        minWidth: St,
        height: a,
        borderRadius: "var(--ds-r-item)",
        border: "none",
        cursor: "pointer",
        flexShrink: 0,
        background: e ? "var(--ds-ink)" : "transparent",
        color: e ? "var(--ds-surface-solid)" : "var(--ds-ink-2)"
      },
      children: /* @__PURE__ */ t(qe, { s: { insignia: r, icono: gr } })
    }
  );
}
const gr = /* @__PURE__ */ u("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": !0, children: [
  /* @__PURE__ */ t("circle", { cx: "5", cy: "12", r: "1.8" }),
  /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "1.8" }),
  /* @__PURE__ */ t("circle", { cx: "19", cy: "12", r: "1.8" })
] }), it = 5;
function nn({
  marca: e,
  icono: r,
  secciones: n,
  activa: a,
  onIr: i,
  derecha: d,
  inicio: o,
  inicioAbierto: l = !1,
  onInicioAbierto: c,
  children: s
}) {
  const [v, p] = q(!1), h = n.length <= it, m = h ? n : n.slice(0, it - 1), y = h ? [] : n.slice(it - 1), g = `calc(${Lt}px + env(safe-area-inset-top, 0px) + var(--ds-3))`, f = `calc(${Te}px + env(safe-area-inset-bottom, 0px) + var(--ds-4))`;
  Ue(g, f);
  const x = (b, { esta: W, onClick: w, etiqueta: T }) => /* @__PURE__ */ u(
    "button",
    {
      onClick: w,
      "aria-current": W ? "page" : void 0,
      "aria-label": T,
      style: {
        flex: "1 1 0",
        minWidth: 0,
        height: Te,
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
        color: W ? "var(--ds-accent-tinta)" : "var(--ds-ink-3)",
        WebkitTapHighlightColor: "transparent"
      },
      children: [
        /* @__PURE__ */ t("span", { style: {
          display: "grid",
          placeItems: "center",
          width: 52,
          height: 28,
          borderRadius: "var(--ds-r-pill)",
          background: W ? "var(--ds-accent-soft)" : "transparent",
          transition: "background var(--ds-t-state) var(--ds-ease)"
        }, children: /* @__PURE__ */ t(qe, { s: b }) }),
        /* @__PURE__ */ t("span", { style: {
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }, children: T })
      ]
    },
    b.id
  );
  return /* @__PURE__ */ u("div", { style: {
    minHeight: "100%",
    paddingTop: g,
    paddingBottom: f,
    paddingLeft: "var(--ds-3)",
    paddingRight: "var(--ds-3)"
  }, children: [
    /* @__PURE__ */ u("header", { style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      height: `calc(${Lt}px + env(safe-area-inset-top, 0px))`,
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
    }, children: [
      o ? /* @__PURE__ */ u(
        "button",
        {
          onClick: () => c == null ? void 0 : c(!l),
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
          children: [
            /* @__PURE__ */ t(Ge, { marca: e, encoge: !0 }),
            /* @__PURE__ */ t(
              "svg",
              {
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
                children: /* @__PURE__ */ t("path", { d: "M6 9l6 6 6-6" })
              }
            )
          ]
        }
      ) : /* @__PURE__ */ t(Ge, { marca: e, encoge: !0 }),
      /* @__PURE__ */ t("div", { style: { flex: 1, minWidth: 0 } }),
      /* @__PURE__ */ t("div", { style: { display: "flex", alignItems: "center", gap: "var(--ds-2)", flexShrink: 0 }, children: d })
    ] }),
    /* @__PURE__ */ t("main", { children: s }),
    /* @__PURE__ */ u("nav", { "aria-label": "Navegación principal", style: {
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
    }, children: [
      m.map((b) => x(b, {
        esta: b.id === a,
        onClick: () => i == null ? void 0 : i(b),
        etiqueta: b.texto
      })),
      y.length > 0 && x(
        { id: "__mas", icono: gr, insignia: y.reduce((b, W) => b + (Number(W.insignia) || 0), 0) },
        { esta: y.some((b) => b.id === a), onClick: () => p(!0), etiqueta: "Más" }
      )
    ] }),
    /* @__PURE__ */ t(
      mr,
      {
        abierto: v,
        onCerrar: () => p(!1),
        secciones: y,
        activa: a,
        onIr: i
      }
    ),
    o
  ] });
}
function an({ abierto: e, onClick: r, icono: n }) {
  return /* @__PURE__ */ t(
    "button",
    {
      onClick: r,
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
      children: /* @__PURE__ */ t("span", { style: {
        display: "grid",
        placeItems: "center",
        width: 26,
        height: 26,
        transform: e ? "scale(0.92)" : "none",
        transition: "transform var(--ds-t-move) var(--ds-ease)"
      }, children: n || /* @__PURE__ */ t("span", { style: {
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
function ta({
  marca: e,
  icono: r,
  secciones: n = [],
  activa: a,
  onIr: i,
  derecha: d,
  inicio: o,
  inicioAbierto: l,
  onInicioAbierto: c,
  migas: s,
  modo: v,
  vista: p,
  children: h
}) {
  const [m, y] = q(() => v || Zr()), g = ye();
  oe(() => {
    p !== void 0 && window.scrollTo({ top: 0, left: 0 });
  }, [p]), oe(() => {
    if (v) {
      y(v);
      return;
    }
    try {
      localStorage.setItem(hr, m);
    } catch {
    }
  }, [m, v]);
  const f = ie((w) => {
    pt.includes(w) && y(w);
  }, []), b = {
    marca: e,
    icono: r,
    secciones: n,
    activa: a,
    onIr: i,
    derecha: d,
    inicio: o,
    inicioAbierto: l,
    onInicioAbierto: c,
    children: /* @__PURE__ */ u(Qr, { vista: p, children: [
      s,
      h
    ] })
  }, W = g ? nn : m === "sidebar" ? en : m === "dock" ? tn : Jr;
  return (
    /* En el teléfono `modo` vale "dock": la geometría ES la del dock —una barra
       de ALTO_DOCK abajo—, y lo que ya sube sus piezas flotantes por encima
       del dock (`modo === "dock"`) sigue funcionando sin cambiar nada. Quien
       necesite distinguirlo pregunta por `movil`. */
    /* @__PURE__ */ t(pr.Provider, { value: { modo: g ? "dock" : m, preferencia: m, movil: g, fijarModo: f, modos: pt }, children: /* @__PURE__ */ t(W, { ...b }) })
  );
}
function ra() {
  const { preferencia: e, fijarModo: r, movil: n } = wt(), [a, i] = q(!1), [d, o] = q(null), l = V(null), c = V(null), s = [
    { id: "topbar", texto: "Barra arriba", icono: "M3 5h18M3 5v14h18V5" },
    { id: "sidebar", texto: "Menú lateral", icono: "M3 5h18v14H3zM9 5v14" },
    { id: "dock", texto: "Dock abajo", icono: "M3 5h18v14H3zM3 15h18" }
  ], v = s.find((m) => m.id === e) || s[0], p = e === "dock";
  if (Se(() => {
    if (!a) return;
    const m = 8, y = () => {
      var z, S, M;
      const f = (z = l.current) == null ? void 0 : z.getBoundingClientRect();
      if (!f) return;
      const x = ((S = c.current) == null ? void 0 : S.offsetWidth) || 190, b = ((M = c.current) == null ? void 0 : M.offsetHeight) || 160;
      let w = f.left + f.width / 2 < window.innerWidth / 2 ? f.left : f.right - x;
      w = Math.min(Math.max(m, w), window.innerWidth - x - m);
      let T = p ? f.top - b - 10 : f.bottom + 10;
      T = Math.min(Math.max(m, T), window.innerHeight - b - m), o({ izq: w, arriba: T });
    };
    y();
    const g = requestAnimationFrame(y);
    return window.addEventListener("resize", y), window.addEventListener("scroll", y, !0), () => {
      cancelAnimationFrame(g), window.removeEventListener("resize", y), window.removeEventListener("scroll", y, !0);
    };
  }, [a, p]), oe(() => {
    if (!a) return;
    const m = (g) => {
      g.key === "Escape" && (g.stopPropagation(), i(!1));
    }, y = (g) => {
      var f, x;
      (f = l.current) != null && f.contains(g.target) || (x = c.current) != null && x.contains(g.target) || i(!1);
    };
    return document.addEventListener("keydown", m, !0), document.addEventListener("mousedown", y, !0), () => {
      document.removeEventListener("keydown", m, !0), document.removeEventListener("mousedown", y, !0);
    };
  }, [a]), n) return null;
  const h = (m) => /* @__PURE__ */ t(
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
      children: /* @__PURE__ */ t("path", { d: m })
    }
  );
  return /* @__PURE__ */ u("div", { ref: l, style: { position: "relative", flexShrink: 0 }, children: [
    /* @__PURE__ */ t(
      "button",
      {
        onClick: () => i((m) => !m),
        "aria-haspopup": "menu",
        "aria-expanded": a,
        title: `Navegación: ${v.texto}`,
        "aria-label": `Navegación: ${v.texto}`,
        style: {
          display: "grid",
          placeItems: "center",
          width: 36,
          height: 36,
          borderRadius: "var(--ds-r-pill)",
          cursor: "pointer",
          background: a ? "var(--ds-surface-solid)" : "var(--ds-surface)",
          border: "1px solid var(--ds-line)",
          color: a ? "var(--ds-ink)" : "var(--ds-ink-2)",
          transition: "background var(--ds-t-state) var(--ds-ease)"
        },
        children: h(v.icono)
      }
    ),
    a && d && or(/* @__PURE__ */ u("div", { role: "menu", ref: c, style: {
      position: "fixed",
      left: d.izq,
      top: d.arriba,
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
    }, children: [
      /* @__PURE__ */ t("div", { style: {
        fontSize: "var(--ds-t-micro)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)",
        padding: "4px 10px 7px"
      }, children: "Navegación" }),
      s.map((m) => {
        const y = m.id === e;
        return /* @__PURE__ */ u(
          "button",
          {
            role: "menuitemradio",
            "aria-checked": y,
            onClick: () => {
              r(m.id), i(!1);
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
              background: y ? "var(--ds-accent-soft)" : "transparent",
              color: y ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)",
              transition: "background var(--ds-t-state) var(--ds-ease)"
            },
            onMouseEnter: (g) => {
              y || (g.currentTarget.style.background = "var(--ds-surface-2)");
            },
            onMouseLeave: (g) => {
              y || (g.currentTarget.style.background = "transparent");
            },
            children: [
              h(m.icono),
              /* @__PURE__ */ t("span", { style: { flex: 1 }, children: m.texto }),
              y && /* @__PURE__ */ t(
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
                  children: /* @__PURE__ */ t("path", { d: "M20 6L9 17l-5-5" })
                }
              )
            ]
          },
          m.id
        );
      })
    ] }), document.body)
  ] });
}
function At({ marcada: e = !1, onCambio: r, etiqueta: n, deshabilitado: a = !1 }) {
  const i = e === "mixta", d = e === !0 || i;
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "checkbox",
      "aria-checked": i ? "mixed" : !!e,
      "aria-label": n,
      title: n,
      disabled: a,
      onClick: (o) => {
        o.stopPropagation(), r == null || r(e !== !0);
      },
      style: {
        display: "inline-grid",
        placeItems: "center",
        width: 20,
        height: 20,
        padding: 0,
        flexShrink: 0,
        borderRadius: "var(--ds-r-mini)",
        cursor: a ? "not-allowed" : "pointer",
        border: `1.5px solid ${d ? "var(--ds-accent-trazo)" : "var(--ds-line-firm)"}`,
        background: d ? "var(--ds-accent)" : "var(--ds-surface-solid)",
        color: "var(--ds-ink-on-accent)",
        opacity: a ? 0.5 : 1,
        transition: "background var(--ds-t-tap) var(--ds-ease), border-color var(--ds-t-tap) var(--ds-ease)"
      },
      children: d && /* @__PURE__ */ t(
        "svg",
        {
          width: "13",
          height: "13",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "3",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": !0,
          children: /* @__PURE__ */ t("path", { d: i ? "M6 12h12" : "M20 6L9 17l-5-5" })
        }
      )
    }
  );
}
function na({ cantidad: e = 0, onQuitar: r, children: n, singular: a = "seleccionado", plural: i = "seleccionados" }) {
  const { modo: d } = wt();
  return e ? /* @__PURE__ */ t("div", { role: "region", "aria-label": "Acciones sobre la selección", style: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: d === "dock" ? Te : 0,
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
  }, children: /* @__PURE__ */ u("div", { style: {
    width: "100%",
    maxWidth: 1200,
    display: "flex",
    alignItems: "center",
    gap: "var(--ds-2)",
    flexWrap: "wrap"
  }, children: [
    /* @__PURE__ */ u("span", { className: "ds-num", "aria-live": "polite", style: {
      fontWeight: 800,
      color: "var(--ds-ink)",
      fontSize: "var(--ds-t-body)",
      marginRight: "var(--ds-2)"
    }, children: [
      e,
      " ",
      e === 1 ? a : i
    ] }),
    /* @__PURE__ */ t("span", { style: { flex: 1 } }),
    n,
    /* @__PURE__ */ t(Ye, { variante: "fantasma", onClick: r, children: "Quitar selección" })
  ] }) }) : null;
}
function aa({
  columnas: e = [],
  filas: r = [],
  claveFila: n,
  onFila: a,
  vacio: i = "No hay nada que mostrar.",
  cargando: d = !1,
  porPagina: o = 0,
  seleccion: l,
  estilo: c
}) {
  const [s, v] = q(1), p = r.length, h = o > 0 && p > o, m = h ? Math.ceil(p / o) : 1;
  oe(
    () => {
      v((k) => Math.min(Math.max(1, k), Math.max(1, m)));
    },
    [m, p]
  ), oe(() => {
    v(1);
  }, [o]);
  const y = fe(() => h ? r.slice((s - 1) * o, s * o) : r, [r, s, o, h]), g = !!(l && n), f = fe(() => new Set(((l == null ? void 0 : l.elegidos) || []).map(String)), [l == null ? void 0 : l.elegidos]), x = fe(
    () => g ? r.map((k) => String(n(k))) : [],
    [g, r, n]
  ), b = x.filter((k) => f.has(k)).length, W = b === 0 ? !1 : b === x.length ? !0 : "mixta", w = () => l.onCambio(W === !0 ? [] : x), T = (k) => l.onCambio(f.has(k) ? [...f].filter((R) => R !== k) : [...f, k]), z = e.length + (g ? 1 : 0), S = p === 0 ? 0 : (s - 1) * o + 1, M = h ? Math.min(s * o, p) : p;
  return /* @__PURE__ */ u("div", { style: c, children: [
    /* @__PURE__ */ t("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ u("table", { style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--ds-font)"
    }, children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ u("tr", { children: [
        g && /* @__PURE__ */ t("th", { scope: "col", style: {
          width: 36,
          padding: "0 var(--ds-2) var(--ds-3) var(--ds-3)",
          borderBottom: "1px solid var(--ds-line)"
        }, children: /* @__PURE__ */ t(
          At,
          {
            marcada: W,
            onCambio: w,
            deshabilitado: x.length === 0,
            etiqueta: W === !0 ? "Quitar todos" : "Elegir todos"
          }
        ) }),
        e.map((k) => /* @__PURE__ */ t("th", { scope: "col", style: {
          textAlign: k.numerica ? "right" : "left",
          fontSize: "var(--ds-t-micro)",
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "var(--ds-ink-3)",
          padding: "0 var(--ds-3) var(--ds-3)",
          whiteSpace: "nowrap",
          borderBottom: "1px solid var(--ds-line)"
        }, children: k.titulo }, k.clave))
      ] }) }),
      /* @__PURE__ */ u("tbody", { children: [
        d && Array.from(
          { length: Math.max(3, Math.min(o || 6, 8)) },
          (k, R) => /* @__PURE__ */ u("tr", { style: { opacity: 1 - R * 0.1 }, children: [
            g && /* @__PURE__ */ t("td", { style: { borderBottom: "1px solid var(--ds-line)" } }),
            e.map((I, B) => /* @__PURE__ */ t("td", { style: {
              padding: "var(--ds-3)",
              borderBottom: "1px solid var(--ds-line)"
            }, children: /* @__PURE__ */ u("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: "var(--ds-3)",
              justifyContent: I.numerica ? "flex-end" : "flex-start"
            }, children: [
              B === 0 && /* @__PURE__ */ t(Q, { circulo: !0, alto: 36 }),
              /* @__PURE__ */ t(Q, { alto: 11, ancho: B === 0 ? "58%" : I.numerica ? 46 : "72%" })
            ] }) }, I.clave))
          ] }, `esq-${R}`)
        ),
        !d && p === 0 && /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t("td", { colSpan: z, style: {
          padding: "var(--ds-8) 0",
          textAlign: "center",
          color: "var(--ds-ink-3)",
          fontSize: "var(--ds-t-body)"
        }, children: i }) }),
        !d && y.map((k, R) => {
          const I = !!a, B = g ? String(n(k)) : null, Y = g && f.has(B), $ = Y ? "var(--ds-accent-soft)" : "transparent";
          return /* @__PURE__ */ u(
            "tr",
            {
              "aria-selected": g ? Y : void 0,
              onClick: I ? () => a(k) : void 0,
              style: {
                cursor: I ? "pointer" : void 0,
                background: $,
                transition: "background var(--ds-t-state) var(--ds-ease)"
              },
              onMouseEnter: I ? (E) => {
                E.currentTarget.style.background = "var(--ds-surface-2)";
              } : void 0,
              onMouseLeave: I ? (E) => {
                E.currentTarget.style.background = $;
              } : void 0,
              children: [
                g && /* @__PURE__ */ t("td", { style: {
                  padding: "var(--ds-3) var(--ds-2) var(--ds-3) var(--ds-3)",
                  width: 36,
                  verticalAlign: "middle",
                  borderBottom: "1px solid var(--ds-line)"
                }, children: /* @__PURE__ */ t(
                  At,
                  {
                    marcada: Y,
                    onCambio: () => T(B),
                    etiqueta: l.etiqueta ? l.etiqueta(k) : "Elegir renglón"
                  }
                ) }),
                e.map((E) => /* @__PURE__ */ t(
                  "td",
                  {
                    className: E.numerica ? "ds-num" : void 0,
                    style: {
                      textAlign: E.numerica ? "right" : "left",
                      fontSize: "var(--ds-t-small)",
                      fontWeight: E.fuerte ? 700 : 500,
                      color: E.fuerte ? "var(--ds-ink)" : "var(--ds-ink-2)",
                      padding: "var(--ds-3)",
                      verticalAlign: "middle",
                      borderBottom: "1px solid var(--ds-line)"
                    },
                    children: E.render ? E.render(k) : k[E.clave]
                  },
                  E.clave
                ))
              ]
            },
            n ? n(k) : R
          );
        })
      ] })
    ] }) }),
    h && !d && /* @__PURE__ */ u("div", { style: {
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
        S,
        "–",
        M,
        " de ",
        p
      ] }),
      /* @__PURE__ */ t("span", { style: { flex: 1 } }),
      /* @__PURE__ */ t(
        Ct,
        {
          texto: "Anterior",
          hacia: "M15 18l-6-6 6-6",
          inactivo: s <= 1,
          onClick: () => v((k) => Math.max(1, k - 1))
        }
      ),
      /* @__PURE__ */ u("span", { className: "ds-num", style: {
        fontSize: "var(--ds-t-small)",
        fontWeight: 700,
        color: "var(--ds-ink-2)"
      }, children: [
        s,
        " / ",
        m
      ] }),
      /* @__PURE__ */ t(
        Ct,
        {
          texto: "Siguiente",
          hacia: "M9 18l6-6-6-6",
          inactivo: s >= m,
          derecha: !0,
          onClick: () => v((k) => Math.min(m, k + 1))
        }
      )
    ] })
  ] });
}
function Ct({ texto: e, hacia: r, inactivo: n, derecha: a, onClick: i }) {
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
        /* @__PURE__ */ t(
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
            children: /* @__PURE__ */ t("path", { d: r })
          }
        ),
        e
      ]
    }
  );
}
function on(e) {
  return e.length <= 1 ? e[0] || "" : `${e.slice(0, -1).join(", ")} y ${e[e.length - 1]}`;
}
function ia({
  titulo: e,
  nota: r,
  children: n,
  onCancelar: a,
  cancelarTexto: i = "Cancelar",
  accion: d,
  ancho: o = 820,
  problemas: l = [],
  refCuerpo: c
}) {
  const { modo: s } = wt(), v = s === "dock" ? Te : 0;
  return /* @__PURE__ */ u("div", { style: { maxWidth: o, margin: "0 auto", paddingBottom: 96 + v }, children: [
    /* @__PURE__ */ u("div", { style: { marginBottom: "var(--ds-6)", padding: "0 var(--ds-2)" }, children: [
      /* @__PURE__ */ t("h1", { style: {
        margin: 0,
        fontSize: "var(--ds-t-display)",
        fontWeight: 800,
        letterSpacing: "-0.045em",
        lineHeight: 1.02,
        color: "var(--ds-ink)"
      }, children: e }),
      r && /* @__PURE__ */ t("p", { style: {
        margin: "6px 0 0",
        fontSize: "var(--ds-t-body)",
        color: "var(--ds-ink-3)",
        maxWidth: 620
      }, children: r })
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
            /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "9" }),
            /* @__PURE__ */ t("path", { d: "M12 8v5M12 16h.01" })
          ]
        }
      ),
      /* @__PURE__ */ u("span", { children: [
        l.length === 1 ? /* @__PURE__ */ u(J, { children: [
          "Falta revisar ",
          /* @__PURE__ */ t("b", { children: l[0] }),
          "."
        ] }) : /* @__PURE__ */ u(J, { children: [
          "Faltan ",
          l.length,
          " datos: ",
          /* @__PURE__ */ t("b", { children: on(l) }),
          "."
        ] }),
        " ",
        "Cada campo dice abajo qué necesita."
      ] })
    ] }),
    /* @__PURE__ */ t(we, { entrada: 0, children: /* @__PURE__ */ t("div", { ref: c, style: { display: "grid", gap: "var(--ds-5)" }, children: n }) }),
    /* @__PURE__ */ t("div", { style: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: v,
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
      /* @__PURE__ */ t(Ye, { variante: "fantasma", onClick: a, children: i }),
      d
    ] }) })
  ] });
}
function oa({ children: e, minimo: r = 220, estilo: n }) {
  return /* @__PURE__ */ t("div", { style: {
    display: "grid",
    gap: "var(--ds-4)",
    gridTemplateColumns: `repeat(auto-fit, minmax(${r}px, 1fr))`,
    ...n
  }, children: e });
}
const Me = (e) => e == null || String(e).trim() === "", sa = (e = "Este dato es obligatorio.") => (r) => Me(r) ? e : null, la = (e, r) => (n) => !Me(n) && String(n).trim().length > e ? r || `No puede pasar de ${e} caracteres; llevas ${String(n).trim().length}.` : null, da = (e, r) => (n) => !Me(n) && String(n).trim().length < e ? r || `Necesita al menos ${e} caracteres.` : null, ca = ({ desde: e = null, hasta: r = null, mensaje: n } = {}) => (a) => {
  if (Me(a)) return null;
  const i = Number(String(a).replace(/,/g, ""));
  return Number.isNaN(i) ? n || "Tiene que ser un número." : e !== null && i < e ? n || `Tiene que ser un número mayor o igual a ${e}.` : r !== null && i > r ? n || `No puede pasar de ${r}.` : null;
}, ua = (e, r, n) => (a) => {
  if (Me(a)) return null;
  const i = String(a).replace(/\D/g, "").length;
  return i < e || i > r ? n || `Debe tener de ${e} a ${r} dígitos.` : null;
}, va = (e, r) => (n) => !Me(n) && !new RegExp(`^\\d{${e}}$`).test(String(n).trim()) ? r || `Debe tener exactamente ${e} dígitos, sin espacios ni guiones.` : null, ha = (e = "El correo debe llevar arroba y dominio, como nombre@dominio.com.") => (r) => !Me(r) && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(r).trim()) ? e : null, pa = (e, r) => (n) => !Me(n) && !e.test(String(n).trim()) ? r : null, fa = (e, r) => (n, a) => e(n, a) ? null : r;
function ma(e) {
  const r = fe(() => Object.fromEntries(
    Object.entries(e).map(([f, x]) => [f, x.valor ?? ""])
  ), []), [n, a] = q(r), [i, d] = q({}), [o, l] = q(!1), c = V(null), s = fe(() => {
    const f = {};
    return Object.entries(e).forEach(([x, b]) => {
      for (const W of b.reglas || []) {
        const w = W(n[x], n);
        if (w) {
          f[x] = w;
          break;
        }
      }
    }), f;
  }, [n, e]), v = ie((f) => (x) => {
    a((b) => ({ ...b, [f]: x }));
  }, []), p = ie((f) => () => {
    d((x) => x[f] ? x : { ...x, [f]: !0 });
  }, []), h = ie((f) => {
    const x = e[f] || {}, b = o || i[f];
    return {
      etiqueta: x.etiqueta,
      valor: n[f] ?? "",
      onCambio: v(f),
      onSalir: p(f),
      error: b ? s[f] : void 0,
      ayuda: x.ayuda,
      /* Obligatorio = alguna de sus reglas se queja del vacío. Se pregunta a
         la regla en vez de pedir una bandera aparte, que es la forma fácil de
         que el asterisco y la validación acaben diciendo cosas distintas. */
      requerido: (x.reglas || []).some((W) => {
        try {
          return W("", n) !== null;
        } catch {
          return !1;
        }
      })
    };
  }, [e, n, s, i, o, v, p]), m = fe(() => o ? Object.keys(s).map((f) => {
    var x;
    return ((x = e[f]) == null ? void 0 : x.etiqueta) || f;
  }) : [], [o, s, e]), y = ie((f) => (l(!0), Object.keys(s).length > 0 ? (requestAnimationFrame(() => {
    var W;
    const x = (W = c.current) == null ? void 0 : W.querySelector('[data-error="si"]');
    x == null || x.scrollIntoView({ block: "center", behavior: "smooth" });
    const b = x == null ? void 0 : x.querySelector("input, textarea, select, [role='combobox']");
    try {
      b == null || b.focus({ preventScroll: !0 });
    } catch {
    }
  }), !1) : (f(n), !0)), [s, n]), g = ie(() => {
    a(r), d({}), l(!1);
  }, [r]);
  return {
    valores: n,
    errores: s,
    problemas: m,
    intentado: o,
    campo: h,
    poner: v,
    marcar: p,
    intentar: y,
    limpiar: g,
    cuerpo: c,
    setValores: a
  };
}
const yr = (e) => `ds-filtros:${e}`, sn = (e) => {
  try {
    const r = sessionStorage.getItem(yr(e));
    return r ? JSON.parse(r) : null;
  } catch {
    return null;
  }
}, ln = (e, r) => {
  try {
    sessionStorage.setItem(yr(e), JSON.stringify(r));
  } catch {
  }
};
function ga(e, r) {
  const n = V(r), [a, i] = q(() => {
    const c = sn(e);
    if (!c) return { ...n.current };
    const s = { ...n.current };
    return Object.keys(n.current).forEach((v) => {
      c[v] !== void 0 && (s[v] = c[v]);
    }), s;
  });
  oe(() => {
    ln(e, a);
  }, [e, a]);
  const d = ie((c, s) => {
    i((v) => ({ ...v, [c]: s }));
  }, []), o = ie(() => {
    i({ ...n.current });
  }, []), l = Object.keys(n.current).some((c) => String(a[c] ?? "") !== String(n.current[c] ?? ""));
  return [a, d, o, l, i];
}
function ya({ pestanas: e = [], activa: r, onCambio: n, estilo: a }) {
  const i = V([]);
  return /* @__PURE__ */ t(
    "div",
    {
      role: "tablist",
      onKeyDown: (o) => {
        var v;
        const l = e.findIndex((p) => p.id === r), c = o.key === "ArrowRight" ? 1 : o.key === "ArrowLeft" ? -1 : 0;
        if (!c) return;
        o.preventDefault();
        const s = (l + c + e.length) % e.length;
        n == null || n(e[s].id), (v = i.current[s]) == null || v.focus();
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
        const c = o.id === r;
        return /* @__PURE__ */ u(
          "button",
          {
            role: "tab",
            "aria-selected": c,
            tabIndex: c ? 0 : -1,
            ref: (s) => {
              i.current[l] = s;
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
              background: c ? "var(--ds-ink)" : "transparent",
              color: c ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
              transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
            },
            children: [
              o.icono,
              o.texto,
              o.cuenta !== void 0 && /* @__PURE__ */ t("span", { className: "ds-num", style: {
                fontSize: "var(--ds-t-micro)",
                fontWeight: 800,
                padding: "1px 6px",
                borderRadius: "var(--ds-r-pill)",
                background: c ? "rgba(255,255,255,0.18)" : "var(--ds-surface)",
                color: c ? "var(--ds-surface-solid)" : "var(--ds-ink-3)"
              }, children: o.cuenta })
            ]
          },
          o.id
        );
      })
    }
  );
}
function ba({ texto: e = "Cargando…", alto: r = 200 }) {
  return /* @__PURE__ */ u("div", { role: "status", style: {
    display: "grid",
    placeItems: "center",
    gap: "var(--ds-3)",
    minHeight: r,
    color: "var(--ds-ink-3)",
    fontSize: "var(--ds-t-small)"
  }, children: [
    /* @__PURE__ */ t(
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
        style: { animation: "ds-girar 900ms linear infinite", color: "var(--ds-accent-trazo)" },
        children: /* @__PURE__ */ t("path", { d: "M12 3a9 9 0 019 9" })
      }
    ),
    e
  ] });
}
const dn = /* @__PURE__ */ u(
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
      /* @__PURE__ */ t("circle", { cx: "11", cy: "11", r: "7" }),
      /* @__PURE__ */ t("path", { d: "M20 20l-3.5-3.5" })
    ]
  }
), cn = /* @__PURE__ */ t(
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
    children: /* @__PURE__ */ t("path", { d: "M5 12h14M13 6l6 6-6 6" })
  }
);
function ot({ children: e }) {
  return /* @__PURE__ */ t("div", { style: {
    fontSize: "var(--ds-t-small)",
    fontWeight: 800,
    color: "var(--ds-ink-2)",
    letterSpacing: "-0.01em",
    margin: "0 0 var(--ds-3)"
  }, children: e });
}
function Ft({ item: e, onIr: r }) {
  const [n, a] = me.useState(!1), i = e.color || "var(--ds-ink-2)";
  return /* @__PURE__ */ u(
    "button",
    {
      onClick: () => {
        r(e);
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
        /* @__PURE__ */ t("span", { style: {
          display: "grid",
          placeItems: "center",
          width: 30,
          height: 30,
          flexShrink: 0,
          borderRadius: 9,
          background: `${i}1F`,
          color: i,
          overflow: "hidden"
        }, children: e.retrato ? /* @__PURE__ */ t("img", { src: e.retrato, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : e.icono }),
        /* @__PURE__ */ u("span", { style: { minWidth: 0, flex: 1 }, children: [
          /* @__PURE__ */ t("span", { style: {
            display: "block",
            fontSize: "var(--ds-t-small)",
            fontWeight: 700,
            color: "var(--ds-ink)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }, children: e.texto }),
          e.subtitulo && /* @__PURE__ */ t("span", { style: {
            display: "block",
            fontSize: "var(--ds-t-micro)",
            fontWeight: 600,
            color: "var(--ds-ink-3)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }, children: e.subtitulo })
        ] }),
        /* @__PURE__ */ t("span", { style: {
          color: "var(--ds-ink-3)",
          opacity: n ? 1 : 0,
          flexShrink: 0,
          transition: "opacity var(--ds-t-state) var(--ds-ease)"
        }, children: cn })
      ]
    }
  );
}
function xa({
  abierto: e,
  onCerrar: r,
  usuario: n,
  acciones: a,
  recientes: i = [],
  tituloRecientes: d = "Reciente",
  grupos: o = [],
  busqueda: l = "",
  onBusqueda: c,
  resultados: s = null,
  marcadorBusqueda: v = "Buscar…",
  onIr: p
}) {
  const h = V(null), m = V(null);
  oe(() => {
    if (!e) return;
    const b = (w) => {
      w.key === "Escape" && (w.stopPropagation(), r == null || r());
    };
    document.addEventListener("keydown", b, !0);
    const W = setTimeout(() => {
      var w;
      return (w = h.current) == null ? void 0 : w.focus();
    }, 90);
    return () => {
      document.removeEventListener("keydown", b, !0), clearTimeout(W);
    };
  }, [e, r]);
  const y = ie((b) => {
    var W;
    r == null || r(), (W = b.onIr || p) == null || W(b);
  }, [r, p]), g = l.trim().length > 0, f = g && s && s.length === 0, x = fe(() => {
    let b = 0;
    return o.map((W) => W.items.map(() => b++));
  }, [o]);
  return e ? /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ t(
      "div",
      {
        onClick: r,
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
        ref: m,
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
            /* @__PURE__ */ t("div", { style: { flex: 1 } }),
            a
          ] }),
          /* @__PURE__ */ t("div", { style: {
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            padding: "var(--ds-2) var(--ds-5) var(--ds-4)"
          }, children: g ? /* @__PURE__ */ u("div", { children: [
            /* @__PURE__ */ t(ot, { children: f ? "Sin coincidencias" : "Resultados" }),
            f ? /* @__PURE__ */ u("div", { style: {
              padding: "var(--ds-8) 0",
              textAlign: "center",
              color: "var(--ds-ink-3)",
              fontSize: "var(--ds-t-body)"
            }, children: [
              "Nada coincide con «",
              l,
              "»."
            ] }) : (s || []).map((b) => /* @__PURE__ */ t(Ft, { item: b, onIr: y }, b.id))
          ] }) : /* @__PURE__ */ u("div", { style: {
            display: "flex",
            gap: "var(--ds-5)",
            alignItems: "flex-start",
            flexWrap: "wrap"
          }, children: [
            /* @__PURE__ */ u("div", { style: { flex: "1 1 200px", minWidth: 190 }, children: [
              /* @__PURE__ */ t(ot, { children: d }),
              i.length > 0 ? i.map((b) => /* @__PURE__ */ t(Ft, { item: b, onIr: y }, b.id)) : /* @__PURE__ */ t("div", { style: {
                padding: "var(--ds-3) 10px",
                fontSize: "var(--ds-t-small)",
                color: "var(--ds-ink-3)",
                lineHeight: 1.5
              }, children: "Lo que vayas abriendo aparece aquí." })
            ] }),
            /* @__PURE__ */ t("div", { style: {
              flex: "2 1 420px",
              minWidth: 280,
              display: "flex",
              flexDirection: "column",
              gap: "var(--ds-5)"
            }, children: o.map((b, W) => /* @__PURE__ */ u("div", { children: [
              /* @__PURE__ */ t(ot, { children: b.titulo }),
              /* @__PURE__ */ t("div", { style: {
                display: "grid",
                gap: "var(--ds-3)",
                gridTemplateColumns: "repeat(auto-fill, minmax(136px, 1fr))"
              }, children: b.items.map((w, T) => /* @__PURE__ */ t(
                Gr,
                {
                  icono: w.icono,
                  etiqueta: w.texto,
                  nota: w.subtitulo,
                  color: w.color,
                  ancho: w.ancho,
                  entrada: x[W][T],
                  onClick: () => y(w)
                },
                w.id
              )) })
            ] }, b.titulo)) })
          ] }) }),
          /* @__PURE__ */ t("div", { style: { padding: "var(--ds-3) var(--ds-5) var(--ds-5)" }, children: /* @__PURE__ */ u("div", { style: {
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
            /* @__PURE__ */ t("span", { style: { color: "var(--ds-ink-3)", display: "grid", placeItems: "center" }, children: dn }),
            /* @__PURE__ */ t(
              "input",
              {
                ref: h,
                value: l,
                onChange: (b) => c == null ? void 0 : c(b.target.value),
                placeholder: v,
                "aria-label": v,
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
            l && /* @__PURE__ */ t(
              "button",
              {
                onClick: () => c == null ? void 0 : c(""),
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
                children: /* @__PURE__ */ t(
                  "svg",
                  {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    children: /* @__PURE__ */ t("path", { d: "M18 6L6 18M6 6l12 12" })
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
let ce = { idioma: "es-MX", moneda: "MXN", zonaHoraria: void 0 };
function un(e = {}) {
  ce = { ...ce, ...e };
}
const ge = "—", Ce = (e) => e == null || e === "" || Number.isNaN(Number(e));
function br(e, { decimales: r, minimo: n } = {}) {
  return Ce(e) ? ge : new Intl.NumberFormat(ce.idioma, {
    minimumFractionDigits: r ?? n ?? 0,
    maximumFractionDigits: r ?? 2
  }).format(Number(e));
}
function ft(e, { moneda: r = ce.moneda, decimales: n = 2, compacto: a = !1 } = {}) {
  return Ce(e) ? ge : a ? new Intl.NumberFormat(ce.idioma, {
    style: "currency",
    currency: r,
    notation: "compact",
    maximumFractionDigits: 1
  }).format(Number(e)) : new Intl.NumberFormat(ce.idioma, {
    style: "currency",
    currency: r,
    minimumFractionDigits: n,
    maximumFractionDigits: n
  }).format(Number(e));
}
function xr(e, { decimales: r = 1 } = {}) {
  return Ce(e) ? ge : new Intl.NumberFormat(ce.idioma, {
    notation: "compact",
    maximumFractionDigits: r
  }).format(Number(e));
}
function Z(e, { decimales: r = 1, enPuntos: n = !1, signo: a = !1 } = {}) {
  if (Ce(e)) return ge;
  const i = n ? Number(e) / 100 : Number(e);
  return new Intl.NumberFormat(ce.idioma, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: r,
    signDisplay: a ? "exceptZero" : "auto"
  }).format(i);
}
function kr(e) {
  if (e instanceof Date) return e;
  if (typeof e == "string" && /^\d{4}-\d{2}-\d{2}$/.test(e)) {
    const [r, n, a] = e.split("-").map(Number);
    return new Date(r, n - 1, a);
  }
  return new Date(e);
}
const Et = {
  corta: { day: "2-digit", month: "2-digit", year: "numeric" },
  // 14/10/2026
  media: { day: "numeric", month: "short", year: "numeric" },
  // 14 oct 2026
  larga: { weekday: "long", day: "numeric", month: "long", year: "numeric" },
  dia: { day: "numeric", month: "short" },
  // 14 oct
  mes: { month: "long", year: "numeric" },
  // octubre de 2026
  mesCorto: { month: "short" },
  // oct
  hora: { hour: "2-digit", minute: "2-digit" },
  fechaHora: { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }
};
function U(e, r = "media") {
  if (e == null || e === "") return ge;
  const n = kr(e);
  return Number.isNaN(n.getTime()) ? ge : new Intl.DateTimeFormat(ce.idioma, {
    ...Et[r] || Et.media,
    timeZone: ce.zonaHoraria
  }).format(n).replace(/\.$/, "");
}
function Mt(e, r = /* @__PURE__ */ new Date()) {
  if (e == null || e === "") return ge;
  const n = kr(e);
  if (Number.isNaN(n.getTime())) return ge;
  const a = (n.getTime() - r.getTime()) / 1e3, i = new Intl.RelativeTimeFormat(ce.idioma, { numeric: "auto" }), d = [
    ["year", 31536e3],
    ["month", 2592e3],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60]
  ];
  for (const [o, l] of d)
    if (Math.abs(a) >= l) return i.format(Math.round(a / l), o);
  return i.format(0, "minute");
}
function wr(e, r) {
  return Ce(e) || Ce(r) || Number(r) === 0 ? null : (Number(e) - Number(r)) / Math.abs(Number(r));
}
function ue(e, r = "numero", n) {
  if (typeof r == "function") return r(e);
  switch (r) {
    case "moneda":
      return ft(e, n);
    case "monedaCompacta":
      return ft(e, { ...n, compacto: !0 });
    case "compacto":
      return xr(e, n);
    case "porcentaje":
      return Z(e, n);
    case "texto":
      return e == null || e === "" ? ge : String(e);
    default:
      return br(e, n);
  }
}
const ka = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SIN_DATO: ge,
  compacto: xr,
  configurarFormato: un,
  fecha: U,
  fechaRelativa: Mt,
  formatear: ue,
  moneda: ft,
  numero: br,
  porcentaje: Z,
  variacion: wr
}, Symbol.toStringTag, { value: "Module" }));
function Sr({
  valor: e,
  sentido: r = "sube",
  contra: n,
  decimales: a = 1,
  enPuntos: i = !1,
  tamano: d = "s",
  estilo: o
}) {
  const l = e == null || Number.isNaN(Number(e)), c = l ? 0 : Number(e), s = l || c === 0 ? 0 : c > 0 ? 1 : -1, v = r === "neutro" || s === 0 ? null : r === "sube" ? s > 0 : s < 0, p = v === null ? "var(--ds-ink-2)" : v ? "var(--ds-ok)" : "var(--ds-risk)", h = v === null ? "var(--ds-surface-sunk)" : v ? "var(--ds-ok-soft)" : "var(--ds-risk-soft)", m = s > 0 ? "▲" : s < 0 ? "▼" : "●", y = d === "m" ? "var(--ds-t-small)" : "var(--ds-t-micro)";
  if (l)
    return /* @__PURE__ */ t("span", { style: { fontSize: y, fontWeight: 600, color: "var(--ds-ink-3)", ...o }, children: "Sin comparativo" });
  const g = i ? `${c > 0 ? "+" : ""}${c.toFixed(a)} pts` : Z(c, { decimales: a, signo: !0 });
  return /* @__PURE__ */ u("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, flexWrap: "wrap", ...o }, children: [
    /* @__PURE__ */ u(
      "span",
      {
        className: "ds-num",
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: h,
          color: p,
          fontSize: y,
          fontWeight: 800,
          padding: "2px 8px",
          borderRadius: "var(--ds-r-pill)",
          whiteSpace: "nowrap"
        },
        "aria-label": `${s > 0 ? "Sube" : s < 0 ? "Baja" : "Sin cambio"} ${g}${v === null ? "" : v ? ", favorable" : ", desfavorable"}`,
        children: [
          /* @__PURE__ */ t("span", { "aria-hidden": "true", style: { fontSize: "0.8em" }, children: m }),
          g
        ]
      }
    ),
    n && /* @__PURE__ */ t("span", { style: { fontSize: y, fontWeight: 600, color: "var(--ds-ink-3)" }, children: n })
  ] });
}
const jt = [1, 2, 3, 4, 5, 6].map((e) => `var(--ds-serie-${e})`), de = (e, r) => (e == null ? void 0 : e.color) || jt[r % jt.length];
function ze() {
  const [e, r] = q(0), n = V(null);
  return [ie((i) => {
    n.current && (n.current.disconnect(), n.current = null), i && (r(i.getBoundingClientRect().width), !(typeof ResizeObserver > "u") && (n.current = new ResizeObserver(([d]) => r(d.contentRect.width)), n.current.observe(i)));
  }, []), e];
}
function $t(e, r, n = 4) {
  if (!Number.isFinite(e) || !Number.isFinite(r)) return { marcas: [0, 1], min: 0, max: 1 };
  e === r && (r = e === 0 ? 1 : r + Math.abs(r) * 0.1);
  const i = (r - e) / n, d = 10 ** Math.floor(Math.log10(i)), o = i / d, l = (o <= 1 ? 1 : o <= 2 ? 2 : o <= 2.5 ? 2.5 : o <= 5 ? 5 : 10) * d, c = Math.floor(e / l) * l, s = Math.ceil(r / l) * l, v = [];
  for (let p = c; p <= s + l / 2; p += l) v.push(Number(p.toFixed(10)));
  return { marcas: v, min: c, max: s };
}
const Ke = (e, r, n, a) => (i) => r === e ? (n + a) / 2 : n + (i - e) / (r - e) * (a - n), se = {
  fontSize: 11,
  fontWeight: 600,
  fill: "var(--ds-ink-3)",
  fontFamily: "var(--ds-font)",
  fontVariantNumeric: "tabular-nums"
};
function et({ color: e, forma: r = "cuadro" }) {
  const n = { flexShrink: 0, background: e };
  return r === "linea" ? /* @__PURE__ */ t("span", { style: { ...n, width: 14, height: 3, borderRadius: "var(--ds-r-mini)" } }) : /* @__PURE__ */ t("span", { style: { ...n, width: 10, height: 10, borderRadius: "var(--ds-r-mini)" } });
}
function vn({ series: e = [], forma: r, valores: n, estilo: a }) {
  return e.length < 2 ? null : /* @__PURE__ */ t("div", { role: "list", style: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px 16px",
    marginBottom: "var(--ds-3)",
    ...a
  }, children: e.map((i, d) => /* @__PURE__ */ u("span", { role: "listitem", style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontSize: "var(--ds-t-small)",
    fontWeight: 600,
    color: "var(--ds-ink-2)"
  }, children: [
    /* @__PURE__ */ t(et, { color: de(i, d), forma: r }),
    i.nombre,
    n && n[d] !== void 0 && /* @__PURE__ */ t("span", { className: "ds-num", style: { color: "var(--ds-ink)", fontWeight: 700 }, children: n[d] })
  ] }, i.clave ?? i.nombre ?? d)) });
}
function Fe({ x: e, y: r, ancho: n, titulo: a, renglones: i = [], visible: d }) {
  const o = V(null), [l, c] = q({ w: 160, h: 60 });
  if (oe(() => {
    if (o.current) {
      const h = o.current.getBoundingClientRect();
      (Math.abs(h.width - l.w) > 1 || Math.abs(h.height - l.h) > 1) && c({ w: h.width, h: h.height });
    }
  }), !d) return null;
  const s = 12, v = e + s + l.w > n ? e - s - l.w : e + s, p = Math.max(0, r - l.h / 2);
  return /* @__PURE__ */ u("div", { ref: o, role: "status", style: {
    position: "absolute",
    left: Math.max(0, v),
    top: p,
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
  }, children: [
    a && /* @__PURE__ */ t("div", { style: {
      fontSize: "var(--ds-t-micro)",
      fontWeight: 700,
      color: "var(--ds-ink-3)",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      marginBottom: 6
    }, children: a }),
    i.map((h, m) => /* @__PURE__ */ u("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: "var(--ds-t-small)",
      lineHeight: 1.6
    }, children: [
      h.color && /* @__PURE__ */ t(et, { color: h.color }),
      /* @__PURE__ */ t("span", { style: { color: "var(--ds-ink-2)", fontWeight: 600, flex: 1, minWidth: 0 }, children: h.nombre }),
      /* @__PURE__ */ t("span", { className: "ds-num", style: { color: "var(--ds-ink)", fontWeight: 800 }, children: h.valor })
    ] }, m))
  ] });
}
function hn({ columnas: e, filas: r }) {
  return /* @__PURE__ */ t("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ u("table", { style: {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "var(--ds-font)",
    fontSize: "var(--ds-t-small)"
  }, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { children: e.map((n, a) => /* @__PURE__ */ t("th", { scope: "col", style: {
      textAlign: a === 0 ? "left" : "right",
      padding: "6px 8px",
      color: "var(--ds-ink-3)",
      fontWeight: 700,
      fontSize: "var(--ds-t-micro)",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      borderBottom: "1px solid var(--ds-line)",
      whiteSpace: "nowrap"
    }, children: n }, a)) }) }),
    /* @__PURE__ */ t("tbody", { children: r.map((n, a) => /* @__PURE__ */ t("tr", { children: n.map((i, d) => /* @__PURE__ */ t("td", { className: d ? "ds-num" : void 0, style: {
      textAlign: d === 0 ? "left" : "right",
      padding: "6px 8px",
      color: d === 0 ? "var(--ds-ink-2)" : "var(--ds-ink)",
      fontWeight: d === 0 ? 600 : 700,
      borderBottom: "1px solid var(--ds-line)",
      whiteSpace: "nowrap"
    }, children: i }, d)) }, a)) })
  ] }) });
}
function be({ titulo: e, series: r, formaLeyenda: n, tabla: a, children: i, estilo: d, alto: o }) {
  const [l, c] = q(!1);
  return /* @__PURE__ */ u("figure", { style: { margin: 0, minWidth: 0, ...d }, "aria-label": e, children: [
    ((r == null ? void 0 : r.length) > 1 || a) && /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "flex-start", gap: "var(--ds-3)" }, children: [
      /* @__PURE__ */ t("div", { style: { flex: 1, minWidth: 0 }, children: !l && /* @__PURE__ */ t(vn, { series: r || [], forma: n }) }),
      a && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => c((s) => !s),
          "aria-pressed": l,
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
          children: l ? "Ver gráfica" : "Ver tabla"
        }
      )
    ] }),
    l && a ? /* @__PURE__ */ t("div", { style: { minHeight: o }, children: /* @__PURE__ */ t(hn, { ...a }) }) : i
  ] });
}
const pn = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0
}, F = (e, r, n) => ue(e, r, n);
function xe({ alto: e = 160, texto: r = "Sin datos para este periodo." }) {
  return /* @__PURE__ */ t("div", { style: {
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
  }, children: r });
}
function fn({
  datos: e = [],
  alto: r = 40,
  color: n = "var(--ds-accent-trazo)",
  area: a = !0,
  formato: i = "numero",
  etiquetas: d,
  estilo: o
}) {
  const [l, c] = ze(), [s, v] = q(null), p = e.map((M) => typeof M == "object" && M !== null ? M.valor : M), h = p.filter((M) => M != null && Number.isFinite(Number(M))), m = Math.min(...h), y = Math.max(...h), g = 4, f = Math.max(0, c), x = (M) => p.length <= 1 ? f / 2 : g + M / (p.length - 1) * (f - g * 2), b = (M) => y === m ? r / 2 : g + (1 - (M - m) / (y - m)) * (r - g * 2), W = [];
  let w = [];
  p.forEach((M, k) => {
    M == null || !Number.isFinite(Number(M)) ? (w.length && W.push(w), w = []) : w.push([x(k), b(Number(M))]);
  }), w.length && W.push(w);
  const T = [...p].reverse().findIndex((M) => M != null), z = T === -1 ? -1 : p.length - 1 - T, S = me.useId().replace(/:/g, "");
  return /* @__PURE__ */ u(
    "div",
    {
      ref: l,
      style: { position: "relative", height: r, minWidth: 0, ...o },
      onMouseLeave: () => v(null),
      onMouseMove: (M) => {
        if (!f || p.length < 2) return;
        const k = M.currentTarget.getBoundingClientRect(), R = Math.round((M.clientX - k.left - g) / (f - g * 2) * (p.length - 1));
        v(Math.max(0, Math.min(p.length - 1, R)));
      },
      children: [
        f > 0 && h.length > 0 && /* @__PURE__ */ u(
          "svg",
          {
            width: f,
            height: r,
            role: "img",
            style: { display: "block", overflow: "visible" },
            "aria-label": `Tendencia de ${p.length} puntos, último ${F(p[z], i)}`,
            children: [
              /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ u("linearGradient", { id: `sp${S}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ t("stop", { offset: "0%", stopColor: n, stopOpacity: "0.22" }),
                /* @__PURE__ */ t("stop", { offset: "100%", stopColor: n, stopOpacity: "0" })
              ] }) }),
              a && W.map((M, k) => M.length > 1 && /* @__PURE__ */ t(
                "path",
                {
                  fill: `url(#sp${S})`,
                  d: `M${M[0][0]},${r} ${M.map((R) => `L${R[0]},${R[1]}`).join(" ")} L${M[M.length - 1][0]},${r} Z`
                },
                `a${k}`
              )),
              W.map((M, k) => /* @__PURE__ */ t(
                "path",
                {
                  fill: "none",
                  stroke: n,
                  strokeWidth: "2",
                  strokeLinejoin: "round",
                  strokeLinecap: "round",
                  d: M.map((R, I) => `${I ? "L" : "M"}${R[0]},${R[1]}`).join(" ")
                },
                `l${k}`
              )),
              z >= 0 && /* @__PURE__ */ t(
                "circle",
                {
                  cx: x(z),
                  cy: b(Number(p[z])),
                  r: "3.5",
                  fill: n,
                  stroke: "var(--ds-surface-solid)",
                  strokeWidth: "2"
                }
              ),
              s !== null && p[s] !== null && p[s] !== void 0 && /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t("line", { x1: x(s), x2: x(s), y1: 0, y2: r, stroke: "var(--ds-eje)", strokeWidth: "1" }),
                /* @__PURE__ */ t(
                  "circle",
                  {
                    cx: x(s),
                    cy: b(Number(p[s])),
                    r: "4",
                    fill: n,
                    stroke: "var(--ds-surface-solid)",
                    strokeWidth: "2"
                  }
                )
              ] })
            ]
          }
        ),
        s !== null && /* @__PURE__ */ u("div", { className: "ds-num", style: {
          position: "absolute",
          bottom: "100%",
          marginBottom: 4,
          left: Math.min(Math.max(0, x(s) - 40), Math.max(0, f - 80)),
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
        }, children: [
          d != null && d[s] ? `${d[s]} · ` : "",
          F(p[s], i)
        ] })
      ]
    }
  );
}
const Bt = { ok: "Bien", aviso: "Atención", riesgo: "En riesgo" }, mn = (e) => e == null || e === "";
function Mr({
  etiqueta: e,
  valor: r,
  formato: n = "numero",
  opcionesFormato: a,
  variacion: i,
  sentido: d = "sube",
  contra: o,
  enPuntos: l,
  serie: c,
  colorSerie: s,
  nota: v,
  icono: p,
  estado: h,
  textoEstado: m,
  compacta: y = !1,
  cargando: g = !1
}) {
  if (g)
    return /* @__PURE__ */ u("div", { "aria-busy": "true", style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
      /* @__PURE__ */ t(Q, { alto: 10, ancho: "46%" }),
      /* @__PURE__ */ t(Q, { alto: y ? 24 : 34, ancho: "62%", radio: 9 }),
      /* @__PURE__ */ t(Q, { alto: 10, ancho: "38%" }),
      c && !y && /* @__PURE__ */ t(Q, { alto: 40, radio: 9 })
    ] });
  const f = mn(r), x = f ? "—" : typeof r == "number" || !Number.isNaN(Number(r)) ? ue(r, n, a) : r;
  return /* @__PURE__ */ u("div", { style: { display: "flex", flexDirection: "column", minWidth: 0, height: "100%" }, children: [
    /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "flex-start", gap: 8, minWidth: 0 }, children: [
      /* @__PURE__ */ t("div", { style: {
        flex: 1,
        minWidth: 0,
        fontSize: "var(--ds-t-micro)",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)",
        lineHeight: 1.35
      }, children: e }),
      h && Bt[h] && /* @__PURE__ */ t(Ae, { tono: h, children: m || Bt[h] }),
      p && !h && /* @__PURE__ */ t("span", { "aria-hidden": !0, style: { color: "var(--ds-ink-3)", display: "inline-flex", flexShrink: 0 }, children: p })
    ] }),
    /* @__PURE__ */ t("div", { style: cr, children: /* @__PURE__ */ t("div", { className: "ds-num", style: {
      fontSize: ur(y ? "var(--ds-num-m)" : "var(--ds-num-l)", x),
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: "-0.035em",
      marginTop: y ? 4 : 6,
      color: f ? "var(--ds-ink-3)" : "var(--ds-ink)",
      whiteSpace: "nowrap"
    }, children: x }) }),
    (i !== void 0 || o || v || f) && /* @__PURE__ */ u("div", { style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "4px 8px",
      marginTop: y ? 6 : 8
    }, children: [
      i !== void 0 && !f && /* @__PURE__ */ t(Sr, { valor: i, sentido: d, contra: o, enPuntos: l }),
      (v || f) && /* @__PURE__ */ t("span", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }, children: f ? v || "Sin dato" : v })
    ] }),
    c && !y && /* @__PURE__ */ t("div", { style: { marginTop: "auto", paddingTop: "var(--ds-4)" }, children: /* @__PURE__ */ t(fn, { datos: c, alto: 40, formato: n, color: s }) })
  ] });
}
function wa({
  onClick: e,
  href: r,
  estilo: n,
  entrada: a,
  relleno: i,
  ...d
}) {
  const o = !!(e || r), l = /* @__PURE__ */ t(Mr, { ...d }), c = i ?? (d.compacta ? "var(--ds-4)" : "var(--ds-5)");
  return r ? /* @__PURE__ */ t("a", { href: r, onClick: e, style: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
    height: "100%",
    borderRadius: "var(--ds-r-card)"
  }, children: /* @__PURE__ */ t(
    we,
    {
      interactiva: !0,
      relleno: c,
      entrada: a,
      estilo: { height: "100%", ...n },
      children: l
    }
  ) }) : /* @__PURE__ */ t(
    we,
    {
      interactiva: o,
      relleno: c,
      entrada: a,
      role: o ? "button" : void 0,
      tabIndex: o ? 0 : void 0,
      onClick: e,
      onKeyDown: o ? (s) => {
        (s.key === "Enter" || s.key === " ") && (s.preventDefault(), e(s));
      } : void 0,
      estilo: { height: "100%", ...n },
      children: l
    }
  );
}
function Sa({ indicadores: e = [], cargando: r = !1, estilo: n, entrada: a }) {
  const i = ye(), d = Math.max(1, e.length), o = i ? Math.min(2, d) : d;
  return /* @__PURE__ */ t(we, { relleno: "0", entrada: a, estilo: { overflow: "hidden", ...n }, children: /* @__PURE__ */ t("div", { role: "list", style: {
    display: "grid",
    gridTemplateColumns: `repeat(${o}, minmax(0, 1fr))`
  }, children: e.map((l, c) => {
    const s = c % o, v = Math.floor(c / o);
    return /* @__PURE__ */ t("div", { role: "listitem", style: {
      padding: "var(--ds-4) var(--ds-5)",
      minWidth: 0,
      borderLeft: s > 0 ? "1px solid var(--ds-line)" : "none",
      borderTop: v > 0 ? "1px solid var(--ds-line)" : "none"
    }, children: /* @__PURE__ */ t(Mr, { ...l, serie: void 0, compacta: !0, cargando: r || l.cargando }) }, l.clave ?? l.etiqueta ?? c);
  }) }) });
}
const gn = { ok: "Va a la meta", aviso: "Cerca de la meta", riesgo: "Debajo de la meta" }, yn = { ok: "Dentro del tope", aviso: "Cerca del tope", riesgo: "Rebasa el tope" };
function Ma({
  titulo: e,
  logrado: r,
  meta: n,
  formato: a = "numero",
  opcionesFormato: i,
  diaActual: d,
  diasPeriodo: o,
  invertida: l = !1,
  forma: c = "barra",
  nota: s,
  cargando: v = !1,
  estilo: p,
  entrada: h
}) {
  const m = (z) => ue(z, a, i), y = Number.isFinite(Number(r)) && Number(n) > 0, g = y ? Number(r) / Number(n) : null, f = y && Number(d) > 0 && Number(o) > 0, x = f ? Number(r) / Number(d) * Number(o) : null, b = f ? x / Number(n) : g;
  let W = "acento";
  b !== null && (l ? W = b <= 0.9 ? "ok" : b <= 1 ? "aviso" : "riesgo" : W = b >= 1 ? "ok" : b >= 0.9 ? "aviso" : "riesgo");
  const w = l ? yn : gn, T = {
    ok: "var(--ds-ok)",
    aviso: "var(--ds-warn)",
    riesgo: "var(--ds-risk)",
    acento: "var(--ds-accent-trazo)"
  }[W];
  return /* @__PURE__ */ t(we, { entrada: h, estilo: { height: "100%", ...p }, children: v ? /* @__PURE__ */ u("div", { "aria-busy": "true", style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ t(Q, { alto: 10, ancho: "50%" }),
    /* @__PURE__ */ t(Q, { alto: 34, ancho: "60%", radio: 9 }),
    /* @__PURE__ */ t(Q, { alto: 8, radio: 99 }),
    /* @__PURE__ */ t(Q, { alto: 10, ancho: "70%" })
  ] }) : /* @__PURE__ */ u("div", { style: { display: "flex", flexDirection: "column", gap: "var(--ds-3)" }, children: [
    /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "flex-start", gap: 8 }, children: [
      /* @__PURE__ */ t("div", { style: {
        flex: 1,
        minWidth: 0,
        fontSize: "var(--ds-t-micro)",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)"
      }, children: e }),
      b !== null && /* @__PURE__ */ t(Ae, { tono: W, children: w[W] })
    ] }),
    y ? c === "anillo" ? /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "center", gap: "var(--ds-5)", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ t(Er, { valor: Math.min(100, g * 100), tamano: 112, grosor: 9, tono: T, children: /* @__PURE__ */ t("span", { className: "ds-num", style: {
        fontSize: "var(--ds-num-m)",
        fontWeight: 800,
        letterSpacing: "-0.03em"
      }, children: Z(g, { decimales: 0 }) }) }),
      /* @__PURE__ */ u("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ t("div", { className: "ds-num", style: {
          fontSize: "var(--ds-num-m)",
          fontWeight: 800,
          letterSpacing: "-0.03em"
        }, children: m(r) }),
        /* @__PURE__ */ u("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }, children: [
          "de ",
          /* @__PURE__ */ t("span", { className: "ds-num", style: { fontWeight: 700, color: "var(--ds-ink-2)" }, children: m(n) })
        ] })
      ] })
    ] }) : /* @__PURE__ */ u(J, { children: [
      /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ t("span", { className: "ds-num", style: {
          fontSize: "var(--ds-num-l)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.05
        }, children: m(r) }),
        /* @__PURE__ */ u("span", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }, children: [
          "de ",
          /* @__PURE__ */ t("span", { className: "ds-num", style: { fontWeight: 700, color: "var(--ds-ink-2)" }, children: m(n) })
        ] })
      ] }),
      /* @__PURE__ */ t(
        jr,
        {
          valor: Number(r),
          total: Number(n),
          tono: W,
          alto: 8,
          etiqueta: `${e}: ${Z(g)} de la meta`
        }
      ),
      /* @__PURE__ */ u("div", { className: "ds-num", style: {
        fontSize: "var(--ds-t-small)",
        fontWeight: 700,
        color: "var(--ds-ink-2)"
      }, children: [
        Z(g),
        " de la meta"
      ] })
    ] }) : /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }, children: Number(n) > 0 ? "Sin dato de avance." : "Sin meta capturada para este periodo." }),
    f && /* @__PURE__ */ u("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", lineHeight: 1.45 }, children: [
      "Al ritmo actual cierras en",
      " ",
      /* @__PURE__ */ t("strong", { className: "ds-num", style: { color: "var(--ds-ink)" }, children: m(x) }),
      " ",
      "(",
      /* @__PURE__ */ t("span", { className: "ds-num", children: Z(x / Number(n)) }),
      " ",
      l ? "del tope" : "de la meta",
      ").",
      /* @__PURE__ */ u("span", { style: { color: "var(--ds-ink-3)" }, children: [
        " Día ",
        d,
        " de ",
        o,
        "."
      ] })
    ] }),
    s && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }, children: s })
  ] }) });
}
function $a({
  titulo: e,
  valores: r = [],
  formato: n = "numero",
  opcionesFormato: a,
  sentido: i = "sube",
  nota: d,
  cargando: o = !1,
  estilo: l,
  entrada: c
}) {
  const s = ye(520), v = r.slice(0, 3), p = v[0];
  return /* @__PURE__ */ u(we, { entrada: c, estilo: { height: "100%", ...l }, children: [
    e && /* @__PURE__ */ t("div", { style: {
      fontSize: "var(--ds-t-micro)",
      fontWeight: 600,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      color: "var(--ds-ink-3)",
      marginBottom: "var(--ds-3)"
    }, children: e }),
    /* @__PURE__ */ t("div", { style: {
      display: "grid",
      gap: s ? "var(--ds-3)" : 0,
      gridTemplateColumns: s ? "1fr" : `repeat(${Math.max(1, v.length)}, minmax(0, 1fr))`
    }, children: v.map((h, m) => {
      const y = m > 0 && p ? wr(p.valor, h.valor) : void 0;
      return /* @__PURE__ */ u("div", { style: {
        minWidth: 0,
        paddingLeft: !s && m > 0 ? "var(--ds-4)" : 0,
        paddingRight: !s && m < v.length - 1 ? "var(--ds-4)" : 0,
        borderLeft: !s && m > 0 ? "1px solid var(--ds-line)" : "none",
        paddingTop: s && m > 0 ? "var(--ds-3)" : 0,
        borderTop: s && m > 0 ? "1px solid var(--ds-line)" : "none"
      }, children: [
        /* @__PURE__ */ t("div", { style: {
          fontSize: "var(--ds-t-small)",
          fontWeight: 700,
          color: m === 0 ? "var(--ds-ink-2)" : "var(--ds-ink-3)"
        }, children: h.etiqueta }),
        o ? /* @__PURE__ */ t(Q, { alto: m === 0 ? 30 : 22, ancho: "70%", radio: 8, estilo: { marginTop: 6 } }) : /* @__PURE__ */ t("div", { style: cr, children: /* @__PURE__ */ t("div", { className: "ds-num", style: {
          fontSize: ur(m === 0 ? "var(--ds-num-m)" : "var(--ds-num-s)", ue(h.valor, n, a)),
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          marginTop: 4,
          color: h.valor === null || h.valor === void 0 ? "var(--ds-ink-3)" : m === 0 ? "var(--ds-ink)" : "var(--ds-ink-2)",
          whiteSpace: "nowrap"
        }, children: ue(h.valor, n, a) }) }),
        m > 0 && !o && /* @__PURE__ */ t("div", { style: { marginTop: 6 }, children: /* @__PURE__ */ t(
          Sr,
          {
            valor: y,
            sentido: i,
            contra: y === null ? void 0 : `${p.etiqueta || "Base"} vs ${(h.etiqueta || "referencia").toLowerCase()}`
          }
        ) })
      ] }, h.etiqueta ?? m);
    }) }),
    d && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", marginTop: "var(--ds-4)" }, children: d })
  ] });
}
function Wa({
  titulo: e,
  nota: r,
  elementos: n = [],
  formato: a = "numero",
  opcionesFormato: i,
  limite: d = 5,
  participacion: o = !1,
  total: l,
  accion: c,
  onElemento: s,
  vacio: v = "Sin movimientos en este periodo.",
  cargando: p = !1,
  estilo: h,
  entrada: m
}) {
  const y = n.slice(0, d), g = Math.max(0, ...y.map((x) => Number(x.valor) || 0)), f = Number(l) > 0 ? Number(l) : n.reduce((x, b) => x + (Number(b.valor) || 0), 0);
  return /* @__PURE__ */ t(we, { entrada: m, estilo: { height: "100%", ...h }, children: /* @__PURE__ */ t(_r, { titulo: e, nota: r, accion: c, children: p ? /* @__PURE__ */ t("div", { "aria-busy": "true", style: { display: "flex", flexDirection: "column", gap: 14 }, children: Array.from({ length: Math.min(d, 5) }, (x, b) => /* @__PURE__ */ u("div", { style: { display: "flex", flexDirection: "column", gap: 6, opacity: 1 - b * 0.12 }, children: [
    /* @__PURE__ */ u("div", { style: { display: "flex", gap: 10 }, children: [
      /* @__PURE__ */ t(Q, { alto: 12, ancho: `${50 - b * 5}%` }),
      /* @__PURE__ */ t(Q, { alto: 12, ancho: 70, estilo: { marginLeft: "auto" } })
    ] }),
    /* @__PURE__ */ t(Q, { alto: 4, radio: 99, ancho: `${90 - b * 14}%` })
  ] }, b)) }) : y.length === 0 ? /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", padding: "var(--ds-4) 0" }, children: v }) : /* @__PURE__ */ t("ol", { style: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 2
  }, children: y.map((x, b) => {
    const W = Number(x.valor) || 0, w = !!s;
    return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ u(
      "div",
      {
        role: w ? "button" : void 0,
        tabIndex: w ? 0 : void 0,
        onClick: w ? () => s(x) : void 0,
        onKeyDown: w ? (T) => {
          (T.key === "Enter" || T.key === " ") && (T.preventDefault(), s(x));
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
          cursor: w ? "pointer" : void 0,
          transition: "background var(--ds-t-state) var(--ds-ease)"
        },
        onMouseEnter: w ? (T) => {
          T.currentTarget.style.background = "var(--ds-surface-2)";
        } : void 0,
        onMouseLeave: w ? (T) => {
          T.currentTarget.style.background = "transparent";
        } : void 0,
        children: [
          /* @__PURE__ */ t("span", { className: "ds-num", style: {
            fontSize: "var(--ds-t-small)",
            fontWeight: 800,
            color: "var(--ds-ink-3)"
          }, children: b + 1 }),
          /* @__PURE__ */ u("div", { style: { minWidth: 0 }, children: [
            /* @__PURE__ */ t("div", { style: {
              fontWeight: 700,
              color: "var(--ds-ink)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }, children: x.nombre }),
            x.subtitulo && /* @__PURE__ */ t("div", { style: {
              fontSize: "var(--ds-t-small)",
              color: "var(--ds-ink-3)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }, children: x.subtitulo })
          ] }),
          /* @__PURE__ */ u("div", { style: { textAlign: "right" }, children: [
            /* @__PURE__ */ t("div", { className: "ds-num", style: { fontWeight: 800, color: "var(--ds-ink)" }, children: ue(x.valor, a, i) }),
            o && f > 0 && /* @__PURE__ */ u("div", { className: "ds-num", style: {
              fontSize: "var(--ds-t-micro)",
              fontWeight: 700,
              color: "var(--ds-ink-3)"
            }, children: [
              Z(W / f),
              " del total"
            ] })
          ] }),
          /* @__PURE__ */ t("div", { "aria-hidden": !0, style: {
            gridColumn: "2 / 4",
            height: 4,
            borderRadius: 99,
            background: "var(--ds-surface-sunk)",
            overflow: "hidden"
          }, children: /* @__PURE__ */ t("div", { style: {
            height: "100%",
            width: `${g > 0 ? W / g * 100 : 0}%`,
            background: "var(--ds-accent-trazo)",
            borderRadius: 99,
            transition: "width var(--ds-t-move) var(--ds-ease)"
          } }) })
        ]
      }
    ) }, x.clave ?? x.nombre ?? b);
  }) }) }) });
}
const bn = (e) => e == null || e === "";
function Ta({
  nombre: e,
  subtitulo: r,
  imagen: n,
  estado: a,
  metricas: i = [],
  acciones: d,
  onClick: o,
  cargando: l = !1,
  estilo: c,
  entrada: s
}) {
  const v = !!o, p = i.slice(0, 4);
  return /* @__PURE__ */ u(
    we,
    {
      entrada: s,
      interactiva: v,
      role: v ? "button" : void 0,
      tabIndex: v ? 0 : void 0,
      onClick: o,
      onKeyDown: v ? (h) => {
        (h.key === "Enter" || h.key === " ") && (h.preventDefault(), o(h));
      } : void 0,
      estilo: { height: "100%", display: "flex", flexDirection: "column", gap: "var(--ds-4)", ...c },
      children: [
        /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "center", gap: "var(--ds-3)", minWidth: 0 }, children: [
          l ? /* @__PURE__ */ t(Q, { circulo: !0, alto: 48 }) : /* @__PURE__ */ t(kt, { src: n, nombre: e || "", tamano: 48 }),
          /* @__PURE__ */ t("div", { style: { flex: 1, minWidth: 0 }, children: l ? /* @__PURE__ */ u("div", { style: { display: "flex", flexDirection: "column", gap: 7 }, children: [
            /* @__PURE__ */ t(Q, { alto: 13, ancho: "60%" }),
            /* @__PURE__ */ t(Q, { alto: 10, ancho: "40%" })
          ] }) : /* @__PURE__ */ u(J, { children: [
            /* @__PURE__ */ t("div", { style: {
              fontWeight: 800,
              fontSize: "var(--ds-t-body)",
              letterSpacing: "-0.02em",
              color: "var(--ds-ink)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }, children: e }),
            r && /* @__PURE__ */ t("div", { style: {
              fontSize: "var(--ds-t-small)",
              color: "var(--ds-ink-3)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }, children: r })
          ] }) }),
          a && !l && /* @__PURE__ */ t(Ae, { tono: a.tono, children: a.texto })
        ] }),
        p.length > 0 && /* @__PURE__ */ t("div", { style: {
          display: "grid",
          gap: "var(--ds-3)",
          gridTemplateColumns: `repeat(${Math.min(2, p.length)}, minmax(0, 1fr))`,
          padding: "var(--ds-3)",
          borderRadius: "var(--ds-r-item)",
          background: "var(--ds-surface-sunk)"
        }, children: p.map((h, m) => /* @__PURE__ */ u("div", { style: { minWidth: 0 }, children: [
          /* @__PURE__ */ t("div", { style: {
            fontSize: "var(--ds-t-micro)",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--ds-ink-3)"
          }, children: h.etiqueta }),
          l ? /* @__PURE__ */ t(Q, { alto: 16, ancho: "70%", estilo: { marginTop: 5 } }) : bn(h.valor) ? /* @__PURE__ */ t("div", { style: { marginTop: 4 }, children: /* @__PURE__ */ t(Ae, { tono: "aviso", children: "Sin capturar" }) }) : /* @__PURE__ */ t("div", { className: "ds-num", style: {
            fontWeight: 800,
            color: "var(--ds-ink)",
            marginTop: 2,
            overflowWrap: "anywhere"
          }, children: ue(h.valor, h.formato || "texto", h.opciones) })
        ] }, h.etiqueta ?? m)) }),
        d && /* @__PURE__ */ t(
          "div",
          {
            style: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" },
            onClick: (h) => h.stopPropagation(),
            children: d
          }
        )
      ]
    }
  );
}
const xn = (e) => e == null || e === "";
function kn({ texto: e, etiqueta: r }) {
  const [n, a] = q(!1);
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(String(e)), a(!0), setTimeout(() => a(!1), 1600);
        } catch {
        }
      },
      "aria-label": `Copiar ${r}`,
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
      children: /* @__PURE__ */ t("span", { "aria-live": "polite", children: n ? "Copiado" : "Copiar" })
    }
  );
}
function za({ elementos: e = [], columnas: r = 2, estilo: n }) {
  const i = ye(560) ? 1 : Math.max(1, Math.min(3, r));
  return /* @__PURE__ */ t("dl", { style: {
    margin: 0,
    display: "grid",
    gridTemplateColumns: `repeat(${i}, minmax(0, 1fr))`,
    columnGap: "var(--ds-6)",
    rowGap: "var(--ds-4)",
    ...n
  }, children: e.map((d, o) => {
    const l = xn(d.valor), c = l ? null : me.isValidElement(d.valor) ? d.valor : ue(d.valor, d.formato || "texto", d.opciones);
    return /* @__PURE__ */ u("div", { style: {
      minWidth: 0,
      gridColumn: `span ${Math.min(i, d.ancho || 1)}`
    }, children: [
      /* @__PURE__ */ t("dt", { style: {
        fontSize: "var(--ds-t-micro)",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)"
      }, children: d.etiqueta }),
      /* @__PURE__ */ t("dd", { style: { margin: "4px 0 0", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }, children: l ? /* @__PURE__ */ t(Ae, { tono: "aviso", children: "Sin capturar" }) : /* @__PURE__ */ u(J, { children: [
        /* @__PURE__ */ t(
          "span",
          {
            className: d.formato && d.formato !== "texto" ? "ds-num" : void 0,
            style: {
              fontWeight: 700,
              color: "var(--ds-ink)",
              overflowWrap: "anywhere",
              minWidth: 0
            },
            children: c
          }
        ),
        d.copiable && /* @__PURE__ */ t(kn, { texto: d.valor, etiqueta: d.etiqueta })
      ] }) })
    ] }, d.etiqueta ?? o);
  }) });
}
const Ot = {
  info: ["var(--ds-info-soft)", "var(--ds-info)", "i"],
  ok: ["var(--ds-ok-soft)", "var(--ds-ok)", "✓"],
  aviso: ["var(--ds-warn-soft)", "var(--ds-warn)", "!"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)", "!"]
};
function Na({
  tono: e = "info",
  titulo: r,
  children: n,
  acciones: a,
  icono: i,
  onCerrar: d,
  estilo: o
}) {
  const [l, c, s] = Ot[e] || Ot.info;
  return /* @__PURE__ */ u("div", { role: e === "riesgo" || e === "aviso" ? "alert" : "status", style: {
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--ds-3)",
    background: l,
    borderRadius: "var(--ds-r-item)",
    border: `1px solid color-mix(in oklab, ${c} 22%, transparent)`,
    padding: "var(--ds-3) var(--ds-4)",
    ...o
  }, children: [
    /* @__PURE__ */ t("span", { "aria-hidden": !0, style: {
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
    }, children: i || s }),
    /* @__PURE__ */ u("div", { style: { flex: 1, minWidth: 0 }, children: [
      r && /* @__PURE__ */ t("div", { style: { fontWeight: 800, color: "var(--ds-ink)", letterSpacing: "-0.01em" }, children: r }),
      n && /* @__PURE__ */ t("div", { style: {
        fontSize: "var(--ds-t-small)",
        color: "var(--ds-ink-2)",
        lineHeight: 1.5,
        marginTop: r ? 2 : 0
      }, children: n }),
      a && /* @__PURE__ */ t("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: "var(--ds-3)" }, children: a })
    ] }),
    d && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: d,
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
      }
    )
  ] });
}
function Da({
  titulo: e = "Aún no hay nada aquí",
  children: r,
  acciones: n,
  icono: a,
  compacto: i = !1,
  estilo: d
}) {
  return /* @__PURE__ */ u("div", { role: "status", style: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: i ? "var(--ds-2)" : "var(--ds-3)",
    padding: i ? "var(--ds-6) var(--ds-4)" : "var(--ds-12) var(--ds-6)",
    border: "1px dashed var(--ds-line-firm)",
    borderRadius: i ? "var(--ds-r-item)" : "var(--ds-r-card)",
    ...d
  }, children: [
    a && /* @__PURE__ */ t(lr, { tono: "neutro", tamano: i ? 36 : 48, children: a }),
    /* @__PURE__ */ t("div", { style: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: "var(--ds-ink)",
      fontSize: i ? "var(--ds-t-body)" : "var(--ds-t-title)"
    }, children: e }),
    r && /* @__PURE__ */ t("div", { style: {
      fontSize: "var(--ds-t-small)",
      color: "var(--ds-ink-3)",
      maxWidth: 420,
      lineHeight: 1.5
    }, children: r }),
    n && /* @__PURE__ */ t("div", { style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: i ? 4 : "var(--ds-2)"
    }, children: n })
  ] });
}
function Ra({ personas: e = [], maximo: r = 4, tamano: n = 32, generico: a = !1, estilo: i }) {
  const d = e.slice(0, r), o = e.length - d.length, l = e.map((c) => c.nombre).filter(Boolean).join(", ");
  return /* @__PURE__ */ u(
    "div",
    {
      role: "img",
      "aria-label": `${e.length} personas: ${l}`,
      title: l,
      style: { display: "inline-flex", alignItems: "center", ...i },
      children: [
        d.map((c, s) => /* @__PURE__ */ t("div", { style: {
          marginLeft: s ? -n * 0.28 : 0,
          borderRadius: 99,
          boxShadow: "0 0 0 2px var(--ds-surface-solid)",
          position: "relative",
          zIndex: r - s
        }, children: /* @__PURE__ */ t(kt, { src: c.imagen, nombre: c.nombre || "", tamano: n, tono: s % 2 ? "neutro" : "acento", generico: a }) }, c.clave ?? c.nombre ?? s)),
        o > 0 && /* @__PURE__ */ u("div", { className: "ds-num", style: {
          marginLeft: -n * 0.28,
          width: n,
          height: n,
          borderRadius: 99,
          background: "var(--ds-retrato-neutro)",
          color: "var(--ds-ink-2)",
          boxShadow: "0 0 0 2px var(--ds-surface-solid)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: n * 0.34,
          fontWeight: 800
        }, children: [
          "+",
          o
        ] })
      ]
    }
  );
}
const We = 8;
function Wt({
  ancla: e,
  abierto: r,
  onCerrar: n,
  children: a,
  rol: i = "menu",
  etiqueta: d,
  minAncho: o = 200,
  estilo: l
}) {
  const c = V(null), [s, v] = q(null), p = V(n);
  return p.current = n, Se(() => {
    if (!r) {
      v(null);
      return;
    }
    const h = () => {
      var M, k;
      const y = (M = e == null ? void 0 : e.current) == null ? void 0 : M.getBoundingClientRect(), g = (k = c.current) == null ? void 0 : k.getBoundingClientRect();
      if (!y) return;
      const f = (g == null ? void 0 : g.width) || o, x = (g == null ? void 0 : g.height) || 0, b = window.innerWidth, w = window.innerHeight - y.bottom, T = x > 0 && w < x + We && y.top > w, z = T ? Math.max(We, y.top - x - 6) : y.bottom + 6;
      let S = y.left;
      S + f > b - We && (S = y.right - f), S = Math.max(We, Math.min(S, b - f - We)), v({ izq: S, top: z, haciaArriba: T });
    };
    h();
    const m = requestAnimationFrame(h);
    return window.addEventListener("resize", h), window.addEventListener("scroll", h, !0), () => {
      cancelAnimationFrame(m), window.removeEventListener("resize", h), window.removeEventListener("scroll", h, !0);
    };
  }, [r, e, o]), oe(() => {
    if (!r) return;
    const h = (f) => {
      var x, b, W;
      (x = p.current) == null || x.call(p), f && ((W = (b = e == null ? void 0 : e.current) == null ? void 0 : b.focus) == null || W.call(b));
    }, m = (f) => {
      f.key === "Escape" && (f.stopPropagation(), h(!0));
    }, y = (f) => {
      var x, b;
      (x = c.current) != null && x.contains(f.target) || (b = e == null ? void 0 : e.current) != null && b.contains(f.target) || h(!1);
    };
    document.addEventListener("keydown", m, !0), document.addEventListener("mousedown", y, !0);
    const g = requestAnimationFrame(() => {
      var b;
      const f = c.current, x = (f == null ? void 0 : f.querySelector('[aria-checked="true"]')) || (f == null ? void 0 : f.querySelector("[data-foco]")) || (f == null ? void 0 : f.querySelector('button, [tabindex="0"]'));
      (b = x == null ? void 0 : x.focus) == null || b.call(x);
    });
    return () => {
      cancelAnimationFrame(g), document.removeEventListener("keydown", m, !0), document.removeEventListener("mousedown", y, !0);
    };
  }, [r, e]), !r || typeof document > "u" ? null : or(/* @__PURE__ */ t(
    "div",
    {
      ref: c,
      role: i,
      "aria-label": d,
      onKeyDown: (h) => {
        var f;
        if (h.key !== "ArrowDown" && h.key !== "ArrowUp") return;
        const m = [...((f = c.current) == null ? void 0 : f.querySelectorAll("button:not([disabled])")) || []], y = m.indexOf(document.activeElement);
        if (!m.length) return;
        h.preventDefault();
        const g = h.key === "ArrowDown" ? (y + 1) % m.length : (y - 1 + m.length) % m.length;
        m[g].focus();
      },
      style: {
        position: "fixed",
        left: (s == null ? void 0 : s.izq) ?? -9999,
        top: (s == null ? void 0 : s.top) ?? -9999,
        zIndex: 80,
        minWidth: o,
        maxWidth: `calc(100vw - ${We * 2}px)`,
        maxHeight: `calc(100vh - ${We * 2}px)`,
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
        visibility: s ? "visible" : "hidden",
        animation: s ? `${s.haciaArriba ? "ds-sube" : "ds-baja"} var(--ds-t-state) var(--ds-ease) both` : void 0,
        ...l
      },
      children: a
    }
  ), document.body);
}
function $r({ children: e, elegida: r, onClick: n, rol: a = "menuitemradio", nota: i, peligro: d }) {
  return /* @__PURE__ */ u(
    "button",
    {
      type: "button",
      role: a,
      "aria-checked": a === "menuitemradio" ? !!r : void 0,
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
        background: r ? "var(--ds-accent-soft)" : "transparent",
        color: d ? "var(--ds-risk)" : r ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)",
        transition: "background var(--ds-t-state) var(--ds-ease)"
      },
      onMouseEnter: (o) => {
        r || (o.currentTarget.style.background = "var(--ds-surface-2)");
      },
      onMouseLeave: (o) => {
        r || (o.currentTarget.style.background = "transparent");
      },
      onFocus: (o) => {
        r || (o.currentTarget.style.background = "var(--ds-surface-2)");
      },
      onBlur: (o) => {
        r || (o.currentTarget.style.background = "transparent");
      },
      children: [
        /* @__PURE__ */ u("span", { style: { flex: 1, minWidth: 0 }, children: [
          e,
          i && /* @__PURE__ */ t("span", { className: "ds-num", style: {
            display: "block",
            fontSize: "var(--ds-t-micro)",
            fontWeight: 600,
            color: "var(--ds-ink-3)",
            marginTop: 1
          }, children: i })
        ] }),
        r && /* @__PURE__ */ t(
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
            children: /* @__PURE__ */ t("path", { d: "M20 6L9 17l-5-5" })
          }
        )
      ]
    }
  );
}
const st = {
  neutro: ["var(--ds-surface-solid)", "var(--ds-ink-3)", "var(--ds-line-firm)"],
  acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)", "var(--ds-accent-trazo)"],
  ok: ["var(--ds-ok-soft)", "var(--ds-ok)", "var(--ds-ok)"],
  aviso: ["var(--ds-warn-soft)", "var(--ds-warn)", "var(--ds-warn)"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)", "var(--ds-risk)"]
}, wn = (e) => {
  if (!e) return "sin-fecha";
  const r = e instanceof Date ? e : new Date(typeof e == "string" && e.length === 10 ? `${e}T00:00:00` : e);
  return Number.isNaN(r.getTime()) ? "sin-fecha" : `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
}, qt = (e) => !(typeof e == "string" && /^\d{4}-\d{2}-\d{2}$/.test(e));
function La({
  eventos: e = [],
  actual: r,
  agrupar: n = !1,
  relativa: a = !1,
  vacio: i = "Todavía no hay movimientos.",
  estilo: d
}) {
  if (e.length === 0)
    return /* @__PURE__ */ t("div", { style: {
      color: "var(--ds-ink-3)",
      fontSize: "var(--ds-t-small)",
      fontWeight: 600,
      padding: "var(--ds-4) 0",
      ...d
    }, children: i });
  const o = (s) => {
    if (!s) return -1 / 0;
    const v = new Date(typeof s == "string" && s.length === 10 ? `${s}T00:00:00` : s);
    return Number.isNaN(v.getTime()) ? -1 / 0 : v.getTime();
  }, l = r === null ? -1 : r !== void 0 ? e.findIndex((s, v) => (s.id ?? v) === r) : e.reduce((s, v, p) => {
    var h;
    return o(v.fecha) > o((h = e[s]) == null ? void 0 : h.fecha) ? p : s;
  }, 0);
  let c = null;
  return /* @__PURE__ */ t("ol", { style: { listStyle: "none", margin: 0, padding: 0, ...d }, children: e.map((s, v) => {
    const p = v === l, [h, m, y] = st[s.tono] || (p ? st.acento : st.neutro), g = wn(s.fecha), f = n && g !== c;
    c = g;
    const x = v === e.length - 1, b = s.fecha ? a ? Mt(s.fecha) : n ? qt(s.fecha) ? U(s.fecha, "hora") : null : U(s.fecha, qt(s.fecha) ? "fechaHora" : "media") : "Sin fecha";
    return /* @__PURE__ */ u(me.Fragment, { children: [
      f && /* @__PURE__ */ t("li", { "aria-hidden": !1, style: {
        fontSize: "var(--ds-t-micro)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)",
        padding: v === 0 ? "0 0 var(--ds-2)" : "var(--ds-3) 0 var(--ds-2)"
      }, children: g === "sin-fecha" ? "Sin fecha" : U(s.fecha, "larga") }),
      /* @__PURE__ */ u(
        "li",
        {
          "aria-current": p ? "step" : void 0,
          style: { display: "grid", gridTemplateColumns: "28px 1fr", columnGap: "var(--ds-3)" },
          children: [
            /* @__PURE__ */ u("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
              /* @__PURE__ */ t("span", { style: {
                width: p ? 24 : 18,
                height: p ? 24 : 18,
                marginTop: p ? 0 : 3,
                flexShrink: 0,
                borderRadius: "var(--ds-r-pill)",
                background: h,
                color: m,
                border: `2px solid ${y}`,
                display: "grid",
                placeItems: "center",
                boxShadow: p ? "0 0 0 4px var(--ds-accent-ring)" : "none"
              }, children: s.icono }),
              !x && /* @__PURE__ */ t("span", { "aria-hidden": !0, style: {
                flex: 1,
                width: 2,
                minHeight: 14,
                marginTop: 4,
                background: "var(--ds-line-firm)",
                borderRadius: 2
              } })
            ] }),
            /* @__PURE__ */ u("div", { style: { paddingBottom: x ? 0 : "var(--ds-4)", minWidth: 0 }, children: [
              /* @__PURE__ */ u("div", { style: {
                display: "flex",
                alignItems: "baseline",
                gap: "var(--ds-2)",
                flexWrap: "wrap"
              }, children: [
                /* @__PURE__ */ t("span", { style: {
                  fontWeight: p ? 800 : 700,
                  color: "var(--ds-ink)",
                  fontSize: "var(--ds-t-body)"
                }, children: s.titulo }),
                b && /* @__PURE__ */ t("span", { className: "ds-num", style: {
                  fontSize: "var(--ds-t-micro)",
                  fontWeight: 600,
                  color: "var(--ds-ink-3)",
                  whiteSpace: "nowrap"
                }, children: b })
              ] }),
              s.texto && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", marginTop: 2 }, children: s.texto }),
              s.actor && /* @__PURE__ */ t("div", { style: {
                fontSize: "var(--ds-t-micro)",
                fontWeight: 600,
                color: "var(--ds-ink-3)",
                marginTop: 3
              }, children: s.actor })
            ] })
          ]
        }
      )
    ] }, s.id ?? v);
  }) });
}
const Ie = {
  hecho: { palabra: "Hecho", fondo: "var(--ds-ok)", tinta: "var(--ds-ink-on-accent)", borde: "var(--ds-ok)", texto: "var(--ds-ink-2)" },
  actual: { palabra: "En curso", fondo: "var(--ds-accent)", tinta: "var(--ds-ink-on-accent)", borde: "var(--ds-accent-trazo)", texto: "var(--ds-accent-tinta)" },
  pendiente: { palabra: "Pendiente", fondo: "var(--ds-surface-solid)", tinta: "var(--ds-ink-3)", borde: "var(--ds-line-firm)", texto: "var(--ds-ink-3)" },
  error: { palabra: "Con problema", fondo: "var(--ds-risk)", tinta: "var(--ds-ink-on-accent)", borde: "var(--ds-risk)", texto: "var(--ds-ink)" },
  omitido: { palabra: "Omitido", fondo: "var(--ds-surface-sunk)", tinta: "var(--ds-ink-3)", borde: "var(--ds-line-firm)", texto: "var(--ds-ink-3)" }
}, Ht = {
  hecho: /* @__PURE__ */ t("path", { d: "M20 6L9 17l-5-5" }),
  error: /* @__PURE__ */ t("path", { d: "M18 6L6 18M6 6l12 12" }),
  omitido: /* @__PURE__ */ t("path", { d: "M5 12h14" })
};
function Pt({ estado: e, numero: r, tamano: n = 30 }) {
  const a = Ie[e] || Ie.pendiente;
  return /* @__PURE__ */ t("span", { style: {
    width: n,
    height: n,
    flexShrink: 0,
    borderRadius: "var(--ds-r-pill)",
    background: a.fondo,
    color: a.tinta,
    border: `2px solid ${a.borde}`,
    display: "grid",
    placeItems: "center",
    fontSize: "var(--ds-t-small)",
    fontWeight: 800,
    boxShadow: e === "actual" ? "0 0 0 4px var(--ds-accent-ring)" : "none",
    transition: "background var(--ds-t-state) var(--ds-ease)"
  }, children: Ht[e] ? /* @__PURE__ */ t(
    "svg",
    {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.6",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": !0,
      children: Ht[e]
    }
  ) : /* @__PURE__ */ t("span", { className: "ds-num", children: r }) });
}
function _t({ onPaso: e, paso: r, i: n, children: a, estilo: i }) {
  return e ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: () => e(r, n),
      style: {
        ...i,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        font: "inherit",
        color: "inherit",
        textAlign: "inherit",
        padding: (i == null ? void 0 : i.padding) ?? 0,
        borderRadius: "var(--ds-r-item)"
      },
      children: a
    }
  ) : /* @__PURE__ */ t("div", { style: i, children: a });
}
function Ia({ pasos: e = [], orientacion: r = "horizontal", onPaso: n, estilo: a }) {
  const i = ye(), d = r === "vertical" || i, o = (l) => [
    l.fecha ? U(l.fecha, "media") : null,
    l.responsable
  ].filter(Boolean).join(" · ");
  return d ? /* @__PURE__ */ t("ol", { style: { listStyle: "none", margin: 0, padding: 0, ...a }, children: e.map((l, c) => {
    const s = Ie[l.estado] || Ie.pendiente, v = c === e.length - 1;
    return /* @__PURE__ */ u(
      "li",
      {
        "aria-current": l.estado === "actual" ? "step" : void 0,
        style: { display: "grid", gridTemplateColumns: "30px 1fr", columnGap: "var(--ds-3)" },
        children: [
          /* @__PURE__ */ u("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
            /* @__PURE__ */ t(Pt, { estado: l.estado, numero: c + 1 }),
            !v && /* @__PURE__ */ t("span", { "aria-hidden": !0, style: {
              flex: 1,
              width: 2,
              minHeight: 16,
              margin: "4px 0",
              borderRadius: 2,
              background: l.estado === "hecho" ? "var(--ds-ok)" : "var(--ds-line-firm)"
            } })
          ] }),
          /* @__PURE__ */ u(
            _t,
            {
              onPaso: n,
              paso: l,
              i: c,
              estilo: { display: "block", paddingBottom: v ? 0 : "var(--ds-4)", minWidth: 0 },
              children: [
                /* @__PURE__ */ t("div", { style: { fontWeight: 700, color: "var(--ds-ink)", lineHeight: "30px" }, children: l.titulo }),
                /* @__PURE__ */ t("div", { style: {
                  fontSize: "var(--ds-t-micro)",
                  fontWeight: 700,
                  color: s.texto,
                  letterSpacing: "0.02em"
                }, children: s.palabra }),
                o(l) && /* @__PURE__ */ t("div", { className: "ds-num", style: {
                  fontSize: "var(--ds-t-small)",
                  color: "var(--ds-ink-3)",
                  marginTop: 2
                }, children: o(l) }),
                l.texto && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", marginTop: 2 }, children: l.texto })
              ]
            }
          )
        ]
      },
      l.id ?? c
    );
  }) }) : /* @__PURE__ */ t("ol", { style: { listStyle: "none", margin: 0, padding: 0, display: "flex", ...a }, children: e.map((l, c) => {
    const s = Ie[l.estado] || Ie.pendiente, v = c === e.length - 1;
    return /* @__PURE__ */ u(
      "li",
      {
        "aria-current": l.estado === "actual" ? "step" : void 0,
        style: { flex: 1, minWidth: 0, position: "relative" },
        children: [
          !v && /* @__PURE__ */ t("span", { "aria-hidden": !0, style: {
            position: "absolute",
            top: 14,
            left: "calc(50% + 21px)",
            right: "calc(-50% + 21px)",
            height: 2,
            borderRadius: 2,
            background: l.estado === "hecho" ? "var(--ds-ok)" : "var(--ds-line-firm)"
          } }),
          /* @__PURE__ */ u(
            _t,
            {
              onPaso: n,
              paso: l,
              i: c,
              estilo: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                textAlign: "center",
                padding: "0 var(--ds-1)"
              },
              children: [
                /* @__PURE__ */ t(Pt, { estado: l.estado, numero: c + 1 }),
                /* @__PURE__ */ t("div", { style: {
                  fontWeight: 700,
                  color: "var(--ds-ink)",
                  marginTop: "var(--ds-2)",
                  fontSize: "var(--ds-t-small)",
                  lineHeight: 1.25
                }, children: l.titulo }),
                /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-micro)", fontWeight: 700, color: s.texto, marginTop: 2 }, children: s.palabra }),
                o(l) && /* @__PURE__ */ t("div", { className: "ds-num", style: {
                  fontSize: "var(--ds-t-micro)",
                  color: "var(--ds-ink-3)",
                  marginTop: 2
                }, children: o(l) })
              ]
            }
          )
        ]
      },
      l.id ?? c
    );
  }) });
}
function Sn({ tarjeta: e, columna: r, columnas: n, onMover: a }) {
  const i = V(null), [d, o] = q(!1);
  return /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        ref: i,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": d,
        "aria-label": `Mover «${e.titulo}» a otra columna`,
        onClick: (l) => {
          l.stopPropagation(), o((c) => !c);
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
      }
    ),
    /* @__PURE__ */ u(
      Wt,
      {
        ancla: i,
        abierto: d,
        onCerrar: () => o(!1),
        etiqueta: "Mover a columna",
        minAncho: 190,
        children: [
          /* @__PURE__ */ t("div", { style: {
            fontSize: "var(--ds-t-micro)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--ds-ink-3)",
            padding: "4px 10px 7px"
          }, children: "Mover a" }),
          n.filter((l) => l.id !== r.id).map((l) => /* @__PURE__ */ t(
            $r,
            {
              rol: "menuitem",
              onClick: () => {
                o(!1), a(e, l.id, r.id);
              },
              children: l.titulo
            },
            l.id
          ))
        ]
      }
    )
  ] });
}
function Vt({ tarjeta: e, formatoValor: r }) {
  var n, a;
  return /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ t("div", { style: {
      fontWeight: 700,
      color: "var(--ds-ink)",
      fontSize: "var(--ds-t-small)",
      lineHeight: 1.3
    }, children: e.titulo }),
    e.subtitulo && /* @__PURE__ */ t("div", { style: {
      fontSize: "var(--ds-t-micro)",
      color: "var(--ds-ink-3)",
      marginTop: 2,
      fontWeight: 600
    }, children: e.subtitulo }),
    (e.valor !== void 0 || ((n = e.etiquetas) == null ? void 0 : n.length) > 0) && /* @__PURE__ */ u("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap",
      marginTop: "var(--ds-2)"
    }, children: [
      e.valor !== void 0 && /* @__PURE__ */ t("span", { className: "ds-num", style: {
        fontWeight: 800,
        color: "var(--ds-ink)",
        fontSize: "var(--ds-t-small)",
        marginRight: "auto"
      }, children: ue(e.valor, r) }),
      (a = e.etiquetas) == null ? void 0 : a.map((i, d) => /* @__PURE__ */ t(Ae, { tono: i.tono, children: i.texto }, d))
    ] })
  ] });
}
function Aa({
  columnas: e = [],
  onMover: r,
  onTarjeta: n,
  renderTarjeta: a,
  formatoValor: i = "moneda",
  anchoColumna: d = 280,
  vacioColumna: o = "Sin elementos en esta etapa.",
  estilo: l
}) {
  const c = ye(), [s, v] = q(null), [p, h] = q(null), m = typeof r == "function", y = c ? `min(${d}px, 82vw)` : d;
  return /* @__PURE__ */ t("div", { role: "list", "aria-label": "Tablero", style: {
    display: "flex",
    gap: "var(--ds-3)",
    overflowX: "auto",
    alignItems: "flex-start",
    /* minWidth 0: dentro de una celda flex o grid, sin esto el tablero
       empuja a su padre y el scroll pasa a la página. */
    minWidth: 0,
    maxWidth: "100%",
    paddingBottom: "var(--ds-2)",
    scrollSnapType: c ? "x mandatory" : void 0,
    ...l
  }, children: e.map((g) => {
    const f = g.tarjetas || [], x = f.some((w) => w.valor !== void 0 && w.valor !== null), b = f.reduce((w, T) => w + (Number(T.valor) || 0), 0), W = p === g.id && s && s.origen !== g.id;
    return /* @__PURE__ */ u(
      "section",
      {
        role: "listitem",
        "aria-label": `${g.titulo}, ${f.length}`,
        onDragOver: m ? (w) => {
          w.preventDefault(), p !== g.id && h(g.id);
        } : void 0,
        onDragLeave: m ? (w) => {
          w.currentTarget.contains(w.relatedTarget) || h(null);
        } : void 0,
        onDrop: m ? (w) => {
          var S, M;
          w.preventDefault(), h(null);
          const T = s;
          if (v(null), !T || T.origen === g.id) return;
          const z = (M = (S = e.find((k) => k.id === T.origen)) == null ? void 0 : S.tarjetas) == null ? void 0 : M.find((k) => k.id === T.id);
          z && r(z, g.id, T.origen);
        } : void 0,
        style: {
          flex: "0 0 auto",
          width: y,
          scrollSnapAlign: "start",
          background: W ? "var(--ds-accent-soft)" : "var(--ds-surface-sunk)",
          border: `1px ${W ? "dashed" : "solid"} ${W ? "var(--ds-accent-trazo)" : "var(--ds-line)"}`,
          borderRadius: "var(--ds-r-card)",
          padding: "var(--ds-3)",
          transition: "background var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease)"
        },
        children: [
          /* @__PURE__ */ u("header", { style: {
            display: "flex",
            alignItems: "baseline",
            gap: "var(--ds-2)",
            padding: "2px 4px var(--ds-3)"
          }, children: [
            /* @__PURE__ */ t("h3", { style: {
              margin: 0,
              fontSize: "var(--ds-t-small)",
              fontWeight: 800,
              color: "var(--ds-ink)",
              letterSpacing: "-0.01em",
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }, children: g.titulo }),
            /* @__PURE__ */ t("span", { className: "ds-num", style: {
              fontSize: "var(--ds-t-micro)",
              fontWeight: 800,
              color: "var(--ds-ink-3)",
              background: "var(--ds-surface)",
              borderRadius: "var(--ds-r-pill)",
              padding: "1px 8px"
            }, children: f.length }),
            x && /* @__PURE__ */ t("span", { className: "ds-num", style: {
              marginLeft: "auto",
              fontSize: "var(--ds-t-micro)",
              fontWeight: 700,
              color: "var(--ds-ink-2)",
              whiteSpace: "nowrap"
            }, children: ue(b, i === "moneda" ? "monedaCompacta" : i) })
          ] }),
          /* @__PURE__ */ u("div", { role: "list", style: { display: "grid", gap: "var(--ds-2)" }, children: [
            f.length === 0 && /* @__PURE__ */ t("div", { style: {
              fontSize: "var(--ds-t-small)",
              color: "var(--ds-ink-3)",
              fontWeight: 600,
              textAlign: "center",
              padding: "var(--ds-5) var(--ds-3)",
              border: "1px dashed var(--ds-line-firm)",
              borderRadius: "var(--ds-r-item)"
            }, children: o }),
            f.map((w) => {
              const T = (s == null ? void 0 : s.id) === w.id;
              return /* @__PURE__ */ u(
                "article",
                {
                  role: "listitem",
                  draggable: m,
                  onDragStart: m ? (z) => {
                    z.dataTransfer.effectAllowed = "move", z.dataTransfer.setData("text/plain", String(w.id)), v({ id: w.id, origen: g.id });
                  } : void 0,
                  onDragEnd: m ? () => {
                    v(null), h(null);
                  } : void 0,
                  style: {
                    background: "var(--ds-surface-solid)",
                    border: "1px solid var(--ds-line)",
                    borderRadius: "var(--ds-r-item)",
                    padding: "var(--ds-3)",
                    boxShadow: "var(--ds-lift-1)",
                    opacity: T ? 0.45 : 1,
                    cursor: m ? "grab" : void 0,
                    transition: "opacity var(--ds-t-state) var(--ds-ease)"
                  },
                  children: [
                    n ? /* @__PURE__ */ t(
                      "button",
                      {
                        type: "button",
                        onClick: () => n(w, g),
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
                        children: a ? a(w, g) : /* @__PURE__ */ t(Vt, { tarjeta: w, formatoValor: i })
                      }
                    ) : a ? a(w, g) : /* @__PURE__ */ t(Vt, { tarjeta: w, formatoValor: i }),
                    m && e.length > 1 && /* @__PURE__ */ t("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: "var(--ds-2)" }, children: /* @__PURE__ */ t(Sn, { tarjeta: w, columna: g, columnas: e, onMover: r }) })
                  ]
                },
                w.id
              );
            })
          ] })
        ]
      },
      g.id
    );
  }) });
}
const Xt = (e) => e instanceof Date ? e : new Date(typeof e == "string" && e.length === 10 ? `${e}T00:00:00` : e), mt = (e, r) => e.getFullYear() === r.getFullYear() && e.getMonth() === r.getMonth() && e.getDate() === r.getDate();
function Mn(e, r) {
  if (Number.isNaN(e.getTime())) return "Sin fecha";
  if (mt(e, r)) return "Hoy";
  const n = new Date(r);
  return n.setDate(r.getDate() - 1), mt(e, n) ? "Ayer" : U(e, "larga");
}
function Ca({
  eventos: e = [],
  ahora: r,
  agrupar: n = !0,
  vacio: a = "Sin actividad reciente.",
  estilo: i
}) {
  const d = r ? Xt(r) : /* @__PURE__ */ new Date();
  if (e.length === 0)
    return /* @__PURE__ */ t("div", { style: {
      color: "var(--ds-ink-3)",
      fontSize: "var(--ds-t-small)",
      fontWeight: 600,
      padding: "var(--ds-4) 0",
      ...i
    }, children: a });
  let o = null;
  return /* @__PURE__ */ t("ul", { style: { listStyle: "none", margin: 0, padding: 0, ...i }, children: e.map((l, c) => {
    const s = Xt(l.fecha), v = n ? Mn(s, d) : null, p = n && v !== o;
    o = v;
    const h = !Number.isNaN(s.getTime()), m = h && mt(s, d), y = h ? m ? Mt(s, d) : n ? U(s, "hora") : U(s, "fechaHora") : "";
    return /* @__PURE__ */ u(me.Fragment, { children: [
      p && /* @__PURE__ */ t("li", { style: {
        fontSize: "var(--ds-t-micro)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)",
        padding: c === 0 ? "0 0 var(--ds-2)" : "var(--ds-4) 0 var(--ds-2)"
      }, children: v }),
      /* @__PURE__ */ u("li", { style: {
        display: "flex",
        gap: "var(--ds-3)",
        alignItems: "flex-start",
        padding: "var(--ds-2) 0"
      }, children: [
        l.icono ? /* @__PURE__ */ t(lr, { tono: l.tono || "neutro", tamano: 34, children: l.icono }) : /* @__PURE__ */ t(kt, { nombre: l.actor || "", src: l.retrato, tamano: 34, tono: "neutro" }),
        /* @__PURE__ */ u("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ u("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", lineHeight: 1.45 }, children: [
            l.actor && /* @__PURE__ */ t("strong", { style: { color: "var(--ds-ink)", fontWeight: 800 }, children: l.actor }),
            l.actor ? " " : "",
            l.accion,
            l.objeto && /* @__PURE__ */ u(J, { children: [
              " ",
              /* @__PURE__ */ t("strong", { style: { color: "var(--ds-ink)", fontWeight: 700 }, children: l.objeto })
            ] })
          ] }),
          l.detalle && /* @__PURE__ */ t("div", { style: {
            fontSize: "var(--ds-t-micro)",
            color: "var(--ds-ink-3)",
            marginTop: 2,
            fontWeight: 600
          }, children: l.detalle })
        ] }),
        y && /* @__PURE__ */ t(
          "time",
          {
            className: "ds-num",
            dateTime: h ? s.toISOString() : void 0,
            style: {
              fontSize: "var(--ds-t-micro)",
              fontWeight: 600,
              color: "var(--ds-ink-3)",
              whiteSpace: "nowrap",
              paddingTop: 2
            },
            children: y
          }
        )
      ] })
    ] }, l.id ?? c);
  }) });
}
const Yt = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"], Gt = {
  neutro: ["var(--ds-surface-sunk)", "var(--ds-ink-3)"],
  acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)"],
  ok: ["var(--ds-ok-soft)", "var(--ds-ok)"],
  aviso: ["var(--ds-warn-soft)", "var(--ds-warn)"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)"]
}, gt = (e) => String(e).padStart(2, "0"), Oe = (e) => `${e.getFullYear()}-${gt(e.getMonth() + 1)}-${gt(e.getDate())}`, Kt = (e) => {
  const [r, n, a] = e.split("-").map(Number);
  return new Date(r, n - 1, a || 1);
}, Qt = (e) => `${e.getFullYear()}-${gt(e.getMonth() + 1)}`;
function yt({ e, onEvento: r, compacto: n }) {
  const [a, i] = Gt[e.tono] || Gt.acento, d = /* @__PURE__ */ u("span", { style: { display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: [
    e.hora && /* @__PURE__ */ t("span", { className: "ds-num", style: { fontWeight: 800, marginRight: 4 }, children: e.hora }),
    e.titulo
  ] }), o = {
    display: "block",
    width: "100%",
    textAlign: "left",
    minWidth: 0,
    background: a,
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
  return r ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: (l) => {
        l.stopPropagation(), r(e);
      },
      title: e.titulo,
      style: { ...o, cursor: "pointer" },
      children: d
    }
  ) : /* @__PURE__ */ t("div", { title: e.titulo, style: o, children: d });
}
function $n({ resto: e, dia: r, onEvento: n }) {
  const a = V(null), [i, d] = q(!1);
  return /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: a,
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": i,
        onClick: (o) => {
          o.stopPropagation(), d((l) => !l);
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
      }
    ),
    /* @__PURE__ */ u(
      Wt,
      {
        ancla: a,
        abierto: i,
        onCerrar: () => d(!1),
        rol: "dialog",
        etiqueta: `Eventos del ${U(r, "larga")}`,
        minAncho: 240,
        children: [
          /* @__PURE__ */ t("div", { style: {
            fontSize: "var(--ds-t-micro)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--ds-ink-3)",
            padding: "4px 6px 8px"
          }, children: U(r, "larga") }),
          /* @__PURE__ */ t("div", { style: { display: "grid", gap: 6, padding: "0 4px 4px" }, children: e.map((o, l) => /* @__PURE__ */ t(yt, { e: o, onEvento: n }, o.id ?? l)) })
        ]
      }
    )
  ] });
}
const lt = {
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
function Fa({
  eventos: e = [],
  mes: r,
  mesInicial: n,
  onCambioMes: a,
  onDia: i,
  onEvento: d,
  maxPorDia: o = 3,
  hoy: l,
  vacio: c = "No hay eventos este mes.",
  estilo: s
}) {
  const v = ye(700), p = l ? Kt(l) : /* @__PURE__ */ new Date(), [h, m] = q(n || Qt(p)), g = Kt(`${r || h}-01`), f = (k) => {
    const R = Qt(k);
    r || m(R), a == null || a(R);
  }, x = fe(() => {
    const k = /* @__PURE__ */ new Map();
    return e.forEach((R) => {
      if (!R.fecha) return;
      const I = String(R.fecha).slice(0, 10);
      k.has(I) || k.set(I, []), k.get(I).push(R);
    }), k;
  }, [e]), b = (g.getDay() + 6) % 7, W = new Date(g);
  W.setDate(1 - b);
  const w = new Date(g.getFullYear(), g.getMonth() + 1, 0), T = Math.ceil((b + w.getDate()) / 7), z = Array.from({ length: T * 7 }, (k, R) => {
    const I = new Date(W);
    return I.setDate(W.getDate() + R), I;
  }), S = U(g, "mes"), M = /* @__PURE__ */ u("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "var(--ds-2)",
    flexWrap: "wrap",
    marginBottom: "var(--ds-4)"
  }, children: [
    /* @__PURE__ */ t("h3", { "aria-live": "polite", style: {
      margin: 0,
      fontSize: "var(--ds-t-title)",
      fontWeight: 800,
      letterSpacing: "-0.03em",
      color: "var(--ds-ink)",
      marginRight: "auto",
      textTransform: "capitalize"
    }, children: S }),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        style: lt,
        "aria-label": "Mes anterior",
        onClick: () => f(new Date(g.getFullYear(), g.getMonth() - 1, 1)),
        children: "‹"
      }
    ),
    /* @__PURE__ */ t("button", { type: "button", style: lt, onClick: () => f(p), children: "Hoy" }),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        style: lt,
        "aria-label": "Mes siguiente",
        onClick: () => f(new Date(g.getFullYear(), g.getMonth() + 1, 1)),
        children: "›"
      }
    )
  ] });
  if (v) {
    const k = z.filter((R) => R.getMonth() === g.getMonth() && x.has(Oe(R)));
    return /* @__PURE__ */ u("div", { style: s, children: [
      M,
      k.length === 0 && /* @__PURE__ */ t("div", { style: {
        color: "var(--ds-ink-3)",
        fontSize: "var(--ds-t-small)",
        fontWeight: 600,
        padding: "var(--ds-4) 0"
      }, children: c }),
      /* @__PURE__ */ t("ol", { style: { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--ds-3)" }, children: k.map((R) => {
        const I = Oe(R), B = I === Oe(p);
        return /* @__PURE__ */ u("li", { style: { display: "grid", gridTemplateColumns: "52px 1fr", gap: "var(--ds-3)" }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: i ? () => i(I, x.get(I)) : void 0,
              disabled: !i,
              "aria-label": U(I, "larga"),
              style: {
                border: "none",
                background: "transparent",
                padding: 0,
                textAlign: "center",
                cursor: i ? "pointer" : "default",
                fontFamily: "var(--ds-font)"
              },
              children: [
                /* @__PURE__ */ t("div", { style: {
                  fontSize: "var(--ds-t-micro)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: B ? "var(--ds-accent-tinta)" : "var(--ds-ink-3)"
                }, children: Yt[(R.getDay() + 6) % 7] }),
                /* @__PURE__ */ t("div", { className: "ds-num", style: {
                  fontSize: "var(--ds-num-m)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: B ? "var(--ds-accent-tinta)" : "var(--ds-ink)"
                }, children: R.getDate() })
              ]
            }
          ),
          /* @__PURE__ */ t("div", { style: { display: "grid", gap: 6, minWidth: 0 }, children: x.get(I).map((Y, $) => /* @__PURE__ */ t(yt, { e: Y, onEvento: d }, Y.id ?? $)) })
        ] }, I);
      }) })
    ] });
  }
  return /* @__PURE__ */ u("div", { style: s, children: [
    M,
    /* @__PURE__ */ u("div", { role: "group", "aria-label": S, style: {
      display: "grid",
      gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
      border: "1px solid var(--ds-line)",
      borderRadius: "var(--ds-r-item)",
      overflow: "hidden"
    }, children: [
      Yt.map((k) => /* @__PURE__ */ t("div", { "aria-hidden": !0, style: {
        fontSize: "var(--ds-t-micro)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)",
        padding: "8px 10px",
        borderBottom: "1px solid var(--ds-line)",
        background: "var(--ds-surface-2)"
      }, children: k }, k)),
      z.map((k, R) => {
        const I = Oe(k), B = k.getMonth() === g.getMonth(), Y = I === Oe(p), $ = x.get(I) || [], E = $.length > o ? $.slice(0, o - 1) : $, A = $.slice(E.length);
        return /* @__PURE__ */ u(
          "div",
          {
            style: {
              minHeight: 104,
              padding: 6,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              borderRight: (R + 1) % 7 ? "1px solid var(--ds-line)" : "none",
              borderBottom: R < z.length - 7 ? "1px solid var(--ds-line)" : "none",
              background: B ? "transparent" : "var(--ds-surface-sunk)"
            },
            children: [
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  className: "ds-num",
                  disabled: !i,
                  onClick: i ? () => i(I, $) : void 0,
                  "aria-label": `${U(I, "larga")}${$.length ? `, ${$.length} eventos` : ", sin eventos"}`,
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
                    background: Y ? "var(--ds-accent)" : "transparent",
                    color: Y ? "var(--ds-ink-on-accent)" : B ? "var(--ds-ink)" : "var(--ds-ink-3)"
                  },
                  children: k.getDate()
                }
              ),
              E.map((P, j) => /* @__PURE__ */ t(yt, { e: P, onEvento: d, compacto: !0 }, P.id ?? j)),
              A.length > 0 && /* @__PURE__ */ t($n, { resto: $, dia: I, onEvento: d })
            ]
          },
          I
        );
      })
    ] })
  ] });
}
function Ea({
  titulo: e,
  descripcion: r,
  migas: n,
  meta: a,
  acciones: i,
  estilo: d
}) {
  const o = ye();
  return /* @__PURE__ */ u("header", { style: { marginBottom: "var(--ds-6)", ...d }, children: [
    (n == null ? void 0 : n.length) > 0 && /* @__PURE__ */ t(Yr, { ruta: n }),
    /* @__PURE__ */ u("div", { style: {
      display: "flex",
      gap: "var(--ds-4)",
      flexDirection: o ? "column" : "row",
      alignItems: o ? "stretch" : "flex-end"
    }, children: [
      /* @__PURE__ */ u("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ t("h1", { style: {
          margin: 0,
          fontSize: o ? "var(--ds-num-m)" : "var(--ds-num-l)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.1,
          color: "var(--ds-ink)",
          overflowWrap: "anywhere"
        }, children: e }),
        r && /* @__PURE__ */ t("p", { style: {
          margin: "var(--ds-2) 0 0",
          fontSize: "var(--ds-t-body)",
          color: "var(--ds-ink-2)",
          maxWidth: "68ch",
          lineHeight: 1.5
        }, children: r }),
        a && /* @__PURE__ */ t("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "var(--ds-2)",
          flexWrap: "wrap",
          marginTop: "var(--ds-3)",
          fontSize: "var(--ds-t-small)",
          color: "var(--ds-ink-3)",
          fontWeight: 600
        }, children: a })
      ] }),
      i && /* @__PURE__ */ t("div", { style: {
        display: "flex",
        gap: "var(--ds-2)",
        flexWrap: "wrap",
        flexShrink: 0,
        justifyContent: o ? "flex-start" : "flex-end"
      }, children: i })
    ] })
  ] });
}
function ja({
  opciones: e = [],
  valor: r,
  onCambio: n,
  etiqueta: a,
  tamano: i = "m",
  pleno: d = !1,
  estilo: o
}) {
  const l = V([]), c = V(null), [s, v] = q(null), p = Math.max(0, e.findIndex((y) => y.valor === r));
  Se(() => {
    const y = () => {
      const f = l.current[p];
      f && v({ izq: f.offsetLeft, ancho: f.offsetWidth });
    };
    if (y(), typeof ResizeObserver > "u" || !c.current) return;
    const g = new ResizeObserver(y);
    return g.observe(c.current), () => g.disconnect();
  }, [p, e.length]);
  const h = (y) => {
    var x;
    const g = y.key === "ArrowRight" || y.key === "ArrowDown" ? 1 : y.key === "ArrowLeft" || y.key === "ArrowUp" ? -1 : 0;
    if (!g || e.length === 0) return;
    y.preventDefault();
    const f = (p + g + e.length) % e.length;
    n == null || n(e[f].valor), (x = l.current[f]) == null || x.focus();
  }, m = i === "s" ? 30 : 36;
  return /* @__PURE__ */ u(
    "div",
    {
      ref: c,
      role: "radiogroup",
      "aria-label": a,
      onKeyDown: h,
      style: {
        position: "relative",
        display: d ? "flex" : "inline-flex",
        padding: 3,
        gap: 2,
        background: "var(--ds-surface-sunk)",
        border: "1px solid var(--ds-line)",
        borderRadius: "var(--ds-r-pill)",
        maxWidth: "100%",
        overflowX: "auto",
        ...o
      },
      children: [
        s && /* @__PURE__ */ t("span", { "aria-hidden": !0, style: {
          position: "absolute",
          top: 3,
          bottom: 3,
          left: s.izq,
          width: s.ancho,
          background: "var(--ds-surface-solid)",
          borderRadius: "var(--ds-r-pill)",
          boxShadow: "var(--ds-lift-1)",
          border: "1px solid var(--ds-line)",
          transition: "left var(--ds-t-state) var(--ds-ease), width var(--ds-t-state) var(--ds-ease)"
        } }),
        e.map((y, g) => {
          const f = g === p;
          return /* @__PURE__ */ u(
            "button",
            {
              ref: (x) => {
                l.current[g] = x;
              },
              type: "button",
              role: "radio",
              "aria-checked": f,
              tabIndex: f ? 0 : -1,
              onClick: () => n == null ? void 0 : n(y.valor),
              style: {
                position: "relative",
                zIndex: 1,
                flex: d ? 1 : "0 0 auto",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                height: m,
                padding: i === "s" ? "0 12px" : "0 16px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontFamily: "var(--ds-font)",
                fontSize: i === "s" ? "var(--ds-t-micro)" : "var(--ds-t-small)",
                fontWeight: 700,
                whiteSpace: "nowrap",
                borderRadius: "var(--ds-r-pill)",
                color: f ? "var(--ds-ink)" : "var(--ds-ink-3)",
                transition: "color var(--ds-t-state) var(--ds-ease)"
              },
              children: [
                y.icono,
                y.texto
              ]
            },
            y.valor
          );
        })
      ]
    }
  );
}
const Zt = (e) => String(e).padStart(2, "0"), Ut = (e) => `${e.getFullYear()}-${Zt(e.getMonth() + 1)}-${Zt(e.getDate())}`, Wn = (e) => {
  const [r, n, a] = String(e).slice(0, 10).split("-").map(Number);
  return new Date(r, n - 1, a);
}, dt = (e, r) => {
  const n = new Date(e);
  return n.setDate(n.getDate() + r), n;
}, Wr = [
  { clave: "hoy", etiqueta: "Hoy" },
  { clave: "ayer", etiqueta: "Ayer" },
  { clave: "7d", etiqueta: "Últimos 7 días" },
  { clave: "30d", etiqueta: "Últimos 30 días" },
  { clave: "mes", etiqueta: "Este mes" },
  { clave: "mesAnterior", etiqueta: "Mes anterior" },
  { clave: "trimestre", etiqueta: "Este trimestre" },
  { clave: "anio", etiqueta: "Este año" },
  { clave: "anioAnterior", etiqueta: "Año anterior" }
];
function Jt(e, r = /* @__PURE__ */ new Date()) {
  const n = r instanceof Date ? new Date(r.getFullYear(), r.getMonth(), r.getDate()) : Wn(r), a = n.getFullYear(), i = n.getMonth();
  let d, o;
  switch (e) {
    case "hoy":
      d = n, o = n;
      break;
    case "ayer":
      d = dt(n, -1), o = d;
      break;
    case "7d":
      d = dt(n, -6), o = n;
      break;
    case "30d":
      d = dt(n, -29), o = n;
      break;
    case "mes":
      d = new Date(a, i, 1), o = new Date(a, i + 1, 0);
      break;
    case "mesAnterior":
      d = new Date(a, i - 1, 1), o = new Date(a, i, 0);
      break;
    case "trimestre": {
      const c = Math.floor(i / 3) * 3;
      d = new Date(a, c, 1), o = new Date(a, c + 3, 0);
      break;
    }
    case "anio":
      d = new Date(a, 0, 1), o = new Date(a, 11, 31);
      break;
    case "anioAnterior":
      d = new Date(a - 1, 0, 1), o = new Date(a - 1, 11, 31);
      break;
    default:
      return null;
  }
  const l = Wr.find((c) => c.clave === e);
  return { clave: e, desde: Ut(d), hasta: Ut(o), etiqueta: (l == null ? void 0 : l.etiqueta) ?? e };
}
function Tn(e, r) {
  return e ? e === r ? U(e, "media") : `${U(e, "media")} – ${U(r, "media")}` : "";
}
function Ba({
  valor: e,
  onCambio: r,
  opciones: n,
  fechaBase: a,
  etiqueta: i = "Periodo",
  estilo: d
}) {
  const o = V(null), [l, c] = q(!1), s = a ?? /* @__PURE__ */ new Date(), v = Wr.filter((h) => !n || n.includes(h.clave)), p = e ? Jt(e, s) : null;
  return /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: o,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": l,
        onClick: () => c((h) => !h),
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
          ...d
        },
        children: [
          /* @__PURE__ */ u(
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
              "aria-hidden": !0,
              style: { color: "var(--ds-ink-3)", flexShrink: 0 },
              children: [
                /* @__PURE__ */ t("rect", { x: "3", y: "5", width: "18", height: "16", rx: "3" }),
                /* @__PURE__ */ t("path", { d: "M16 3v4M8 3v4M3 10h18" })
              ]
            }
          ),
          /* @__PURE__ */ t("span", { style: {
            fontSize: "var(--ds-t-micro)",
            fontWeight: 700,
            color: "var(--ds-ink-3)",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }, children: i }),
          /* @__PURE__ */ t("span", { style: {
            fontSize: "var(--ds-t-small)",
            fontWeight: 800,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }, children: p ? p.etiqueta : "Elegir" }),
          /* @__PURE__ */ t(
            "svg",
            {
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2.2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              "aria-hidden": !0,
              style: { color: "var(--ds-ink-3)", flexShrink: 0 },
              children: /* @__PURE__ */ t("path", { d: "M6 9l6 6 6-6" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(
      Wt,
      {
        ancla: o,
        abierto: l,
        onCerrar: () => c(!1),
        etiqueta: i,
        minAncho: 250,
        children: v.map((h) => {
          const m = Jt(h.clave, s);
          return /* @__PURE__ */ t(
            $r,
            {
              elegida: h.clave === e,
              nota: Tn(m.desde, m.hasta),
              onClick: () => {
                c(!1), r == null || r(m);
              },
              children: h.etiqueta
            },
            h.clave
          );
        })
      }
    )
  ] });
}
function zn({ texto: e, valor: r, onQuitar: n, estilo: a }) {
  const i = r != null && r !== "" ? `${e}: ${r}` : e;
  return /* @__PURE__ */ u("span", { style: {
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
    ...a
  }, children: [
    /* @__PURE__ */ t("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }, children: r != null && r !== "" ? /* @__PURE__ */ u(J, { children: [
      /* @__PURE__ */ u("span", { style: { color: "var(--ds-ink-2)" }, children: [
        e,
        ":"
      ] }),
      " ",
      /* @__PURE__ */ t("strong", { style: { fontWeight: 800 }, children: r })
    ] }) : /* @__PURE__ */ t("strong", { style: { fontWeight: 800 }, children: e }) }),
    n && /* @__PURE__ */ t(
      "button",
      {
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
        onMouseEnter: (d) => {
          d.currentTarget.style.background = "var(--ds-surface)";
        },
        onMouseLeave: (d) => {
          d.currentTarget.style.background = "transparent";
        },
        children: /* @__PURE__ */ t(
          "svg",
          {
            width: "12",
            height: "12",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "3",
            strokeLinecap: "round",
            "aria-hidden": !0,
            children: /* @__PURE__ */ t("path", { d: "M18 6L6 18M6 6l12 12" })
          }
        )
      }
    )
  ] });
}
function Oa({ children: e, activos: r = [], onQuitar: n, onLimpiar: a, resultado: i, estilo: d }) {
  return /* @__PURE__ */ u("div", { role: "search", style: { marginBottom: "var(--ds-4)", ...d }, children: [
    /* @__PURE__ */ u("div", { style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--ds-2)" }, children: [
      e,
      i && /* @__PURE__ */ t("span", { className: "ds-num", style: {
        marginLeft: "auto",
        fontSize: "var(--ds-t-small)",
        fontWeight: 700,
        color: "var(--ds-ink-3)",
        whiteSpace: "nowrap"
      }, children: i })
    ] }),
    r.length > 0 && /* @__PURE__ */ u("div", { "aria-live": "polite", style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "var(--ds-2)",
      marginTop: "var(--ds-3)"
    }, children: [
      r.map((o) => /* @__PURE__ */ t(
        zn,
        {
          texto: o.texto,
          valor: o.valor,
          onQuitar: n ? () => n(o.clave) : void 0
        },
        o.clave
      )),
      a && r.length > 1 && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: a,
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
        }
      )
    ] })
  ] });
}
const Ve = 6.6, bt = (e) => [...String(e ?? "")].reduce((r, n) => r + (n >= "A" && n <= "Z" ? 8 : n === " " ? 3.4 : Ve), 0), Nn = 140, Dn = (e, r) => {
  const n = String(e ?? "");
  if (bt(n) <= r) return n;
  let a = n;
  for (; a.length > 1 && bt(a + "…") > r; ) a = a.slice(0, -1);
  return a.trimEnd() + "…";
};
function qa({
  series: e = [],
  etiquetas: r = [],
  alto: n = 240,
  formato: a = "numero",
  area: i = !1,
  apilada: d = !1,
  meta: o,
  titulo: l,
  cero: c = !0,
  estilo: s
}) {
  const [v, p] = ze(), [h, m] = q(null), y = Math.max(r.length, ...e.map((N) => (N.valores || []).length), 0), g = d && i, f = o == null ? null : typeof o == "object" ? o.valor : o, x = o && typeof o == "object" && o.texto ? o.texto : "Meta", b = fe(() => {
    const N = Array(y).fill(0);
    return e.map((L) => {
      const H = Array.from({ length: y }, (le, ae) => {
        var C;
        const D = (C = L.valores) == null ? void 0 : C[ae];
        return D == null || !Number.isFinite(Number(D)) ? null : Number(D);
      });
      if (!g) return { abajo: null, arriba: H, crudo: H };
      const G = N.slice(), te = H.map((le, ae) => N[ae] += le ?? 0);
      return { abajo: G, arriba: te.slice(), crudo: H };
    });
  }, [e, y, g]), W = b.flatMap((N) => N.arriba.filter((L) => L !== null));
  f !== null && W.push(Number(f));
  const w = W.length > 0 && y > 0, T = w ? Math.min(...W) : 0, z = w ? Math.max(...W) : 1, { marcas: S, min: M, max: k } = $t(
    c ? Math.min(0, T) : T,
    c ? Math.max(0, z) : z,
    n < 200 ? 3 : 4
  ), R = a === "moneda" ? "monedaCompacta" : a === "numero" ? "compacto" : a, I = e.length > 1 && e.length <= 4 && p >= 420 && !g, B = Math.max(...S.map((N) => String(F(N, R)).length)) * Ve + 12, Y = I ? Math.min(Nn, Math.max(...e.map((N) => bt(N.nombre))) + 14) : 10, $ = 10, E = 24, A = Math.max(10, p - B - Y), P = n - $ - E, j = (N) => B + (y <= 1 ? A / 2 : N / (y - 1) * A), X = Ke(M, k, $ + P, $), ee = Math.max(3, ...Array.from({ length: y }, (N, L) => String(r[L] ?? L + 1).length)) * Ve + 12, ve = Math.max(2, Math.min(p < 420 ? 4 : 1 / 0, Math.floor(A / ee))), re = Math.max(1, Math.ceil(y / ve)), Ee = [];
  let je = -1 / 0;
  for (let N = 0; N < y; N += re) {
    const L = String(r[N] ?? N + 1).length * Ve, H = y > 1 && N === 0 ? "start" : y > 1 && N >= y - 1 ? "end" : "middle", G = H === "start" ? j(N) : H === "end" ? j(N) - L : j(N) - L / 2;
    G >= je + 8 && (Ee.push({ i: N, ancla: H }), je = G + L);
  }
  const Ne = (N) => {
    const L = [];
    let H = [];
    return N.forEach((G, te) => {
      G === null ? (H.length && L.push(H), H = []) : H.push(te);
    }), H.length && L.push(H), L;
  }, ne = {
    columnas: ["", ...e.map((N) => N.nombre)],
    filas: Array.from({ length: y }, (N, L) => [
      r[L] ?? L + 1,
      ...b.map((H) => F(H.crudo[L], a))
    ])
  }, De = (N) => {
    if (!w) return;
    const L = N.currentTarget.getBoundingClientRect(), H = N.clientX - L.left, G = y <= 1 ? 0 : Math.round((H - B) / A * (y - 1));
    m(Math.max(0, Math.min(y - 1, G)));
  }, tt = (N) => {
    N.key === "ArrowRight" && (N.preventDefault(), m((L) => Math.min(y - 1, (L ?? -1) + 1))), N.key === "ArrowLeft" && (N.preventDefault(), m((L) => Math.max(0, (L ?? y) - 1))), N.key === "Escape" && m(null);
  }, rt = h === null ? 0 : Math.min(...b.map((N) => N.arriba[h] === null ? $ + P : X(N.arriba[h])));
  return /* @__PURE__ */ t(
    be,
    {
      titulo: l,
      series: e,
      formaLeyenda: "linea",
      tabla: w ? ne : null,
      estilo: s,
      alto: n,
      children: /* @__PURE__ */ u("div", { ref: v, style: { position: "relative", minWidth: 0 }, children: [
        w ? p > 0 && /* @__PURE__ */ u(
          "svg",
          {
            width: p,
            height: n,
            role: "img",
            tabIndex: 0,
            "aria-label": `${l ? `${l}: ` : ""}${e.length} serie(s), ${y} puntos. Flechas para recorrer.`,
            style: { display: "block", overflow: "visible", outline: "none" },
            onMouseMove: De,
            onMouseLeave: () => m(null),
            onFocus: () => m((N) => N === null ? y - 1 : N),
            onBlur: () => m(null),
            onKeyDown: tt,
            children: [
              S.map((N) => /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: B,
                    x2: B + A,
                    y1: X(N),
                    y2: X(N),
                    stroke: N === 0 ? "var(--ds-eje)" : "var(--ds-grid)",
                    strokeWidth: "1"
                  }
                ),
                /* @__PURE__ */ t("text", { x: B - 8, y: X(N), dy: "0.32em", textAnchor: "end", style: se, children: F(N, R) })
              ] }, N)),
              Ee.map(({ i: N, ancla: L }) => /* @__PURE__ */ t("text", { x: j(N), y: n - 6, textAnchor: L, style: se, children: r[N] ?? N + 1 }, N)),
              i && b.map((N, L) => Ne(N.arriba).map((H, G) => {
                const te = (ae) => N.abajo ? X(N.abajo[ae]) : X(Math.max(M, Math.min(0, k))), le = `M${j(H[0])},${te(H[0])} ` + H.map((ae) => `L${j(ae)},${X(N.arriba[ae])}`).join(" ") + ` ${[...H].reverse().map((ae) => `L${j(ae)},${te(ae)}`).join(" ")} Z`;
                return /* @__PURE__ */ t(
                  "path",
                  {
                    d: le,
                    fill: de(e[L], L),
                    fillOpacity: g ? 0.55 : 0.12,
                    stroke: "none"
                  },
                  `a${L}-${G}`
                );
              })),
              b.map((N, L) => Ne(N.arriba).map((H, G) => H.length === 1 ? /* @__PURE__ */ t(
                "circle",
                {
                  cx: j(H[0]),
                  cy: X(N.arriba[H[0]]),
                  r: "3",
                  fill: de(e[L], L)
                },
                `p${L}-${G}`
              ) : /* @__PURE__ */ t(
                "path",
                {
                  fill: "none",
                  stroke: de(e[L], L),
                  strokeWidth: "2",
                  strokeLinejoin: "round",
                  strokeLinecap: "round",
                  d: H.map((te, le) => `${le ? "L" : "M"}${j(te)},${X(N.arriba[te])}`).join(" ")
                },
                `l${L}-${G}`
              ))),
              f !== null && /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: B,
                    x2: B + A,
                    y1: X(f),
                    y2: X(f),
                    stroke: "var(--ds-ink-2)",
                    strokeWidth: "1.5",
                    strokeDasharray: "5 4"
                  }
                ),
                /* @__PURE__ */ u(
                  "text",
                  {
                    x: B + 6,
                    y: X(f) - 6,
                    style: { ...se, fill: "var(--ds-ink-2)", fontWeight: 700 },
                    children: [
                      x,
                      " · ",
                      F(f, a)
                    ]
                  }
                )
              ] }),
              I && (() => {
                const N = b.map((L, H) => {
                  const G = L.arriba.map((te, le) => te === null ? -1 : le).filter((te) => te >= 0).pop();
                  return G === void 0 ? null : { si: H, yv: X(L.arriba[G]), xv: j(G) };
                }).filter(Boolean).sort((L, H) => L.yv - H.yv);
                for (let L = 1; L < N.length; L++)
                  N[L].yv - N[L - 1].yv < 14 && (N[L].yv = N[L - 1].yv + 14);
                return N.map((L) => /* @__PURE__ */ u(
                  "text",
                  {
                    x: B + A + 8,
                    y: L.yv,
                    dy: "0.32em",
                    style: { ...se, fill: "var(--ds-ink-2)", fontWeight: 700 },
                    children: [
                      /* @__PURE__ */ t("title", { children: e[L.si].nombre }),
                      Dn(e[L.si].nombre, Y - 12)
                    ]
                  },
                  L.si
                ));
              })(),
              h !== null && /* @__PURE__ */ u("g", { pointerEvents: "none", children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: j(h),
                    x2: j(h),
                    y1: $,
                    y2: $ + P,
                    stroke: "var(--ds-eje)",
                    strokeWidth: "1"
                  }
                ),
                b.map((N, L) => N.arriba[h] !== null && /* @__PURE__ */ t(
                  "circle",
                  {
                    cx: j(h),
                    cy: X(N.arriba[h]),
                    r: "4.5",
                    fill: de(e[L], L),
                    stroke: "var(--ds-surface-solid)",
                    strokeWidth: "2"
                  },
                  L
                ))
              ] }),
              /* @__PURE__ */ t("rect", { x: B, y: $, width: A, height: P, fill: "transparent" })
            ]
          }
        ) : /* @__PURE__ */ t(xe, { alto: n }),
        /* @__PURE__ */ t(
          Fe,
          {
            visible: h !== null,
            x: h === null ? 0 : j(h),
            y: rt,
            ancho: p,
            titulo: h === null ? "" : r[h],
            renglones: h === null ? [] : e.map((N, L) => ({
              color: de(N, L),
              nombre: N.nombre,
              valor: F(b[L].crudo[h], a)
            }))
          }
        )
      ] })
    }
  );
}
const Tr = 6.6, Rn = 4, ct = 2;
function _e(e, r, n, a, i) {
  if (n <= 0 || a <= 0) return "";
  const d = Math.min(Rn, n / 2, a / 2);
  return i === "arriba" ? `M${e},${r + a} L${e},${r + d} Q${e},${r} ${e + d},${r} L${e + n - d},${r} Q${e + n},${r} ${e + n},${r + d} L${e + n},${r + a} Z` : i === "abajo" ? `M${e},${r} L${e + n},${r} L${e + n},${r + a - d} Q${e + n},${r + a} ${e + n - d},${r + a} L${e + d},${r + a} Q${e},${r + a} ${e},${r + a - d} Z` : i === "derecha" ? `M${e},${r} L${e + n - d},${r} Q${e + n},${r} ${e + n},${r + d} L${e + n},${r + a - d} Q${e + n},${r + a} ${e + n - d},${r + a} L${e},${r + a} Z` : i === "izquierda" ? `M${e + n},${r} L${e + n},${r + a} L${e + d},${r + a} Q${e},${r + a} ${e},${r + a - d} L${e},${r + d} Q${e},${r} ${e + d},${r} Z` : `M${e},${r} h${n} v${a} h${-n} Z`;
}
const er = (e, r) => {
  const n = String(e ?? ""), a = Math.max(3, Math.floor(r / Tr));
  return n.length > a ? `${n.slice(0, a - 1)}…` : n;
};
function Ha({
  datos: e,
  categorias: r,
  series: n,
  horizontal: a = !1,
  apiladas: i = !1,
  etiquetas: d = !1,
  resaltar: o,
  alto: l,
  formato: c = "numero",
  titulo: s,
  estilo: v
}) {
  var ae;
  const [p, h] = ze(), [m, y] = q(null), g = e ? e.map((D) => D.etiqueta) : r || [], f = e ? [{
    clave: "valor",
    nombre: s || "Valor",
    valores: e.map((D) => D.valor),
    color: (ae = e[0]) == null ? void 0 : ae.color
  }] : n || [], x = g.length, b = f.length, W = (D, C) => {
    var _, K;
    const O = (K = (_ = f[D]) == null ? void 0 : _.valores) == null ? void 0 : K[C];
    return O == null || !Number.isFinite(Number(O)) ? null : Number(O);
  };
  let w = 0, T = 0;
  for (let D = 0; D < x; D++)
    if (i) {
      let C = 0, O = 0;
      for (let _ = 0; _ < b; _++) {
        const K = W(_, D) ?? 0;
        K >= 0 ? C += K : O += K;
      }
      T = Math.max(T, C), w = Math.min(w, O);
    } else
      for (let C = 0; C < b; C++) {
        const O = W(C, D);
        O !== null && (T = Math.max(T, O), w = Math.min(w, O));
      }
  const z = x > 0 && b > 0 && f.some((D, C) => g.some((O, _) => W(C, _) !== null)), S = a ? h - Math.min(h * 0.38, 170) - 10 - (d ? 64 : 12) : 0, M = a ? Math.max(2, Math.min(4, Math.floor(S / 72))) : 4, { marcas: k, min: R, max: I } = $t(w, T, M), B = c === "moneda" ? "monedaCompacta" : c === "numero" ? "compacto" : c, Y = l ?? (a ? Math.max(120, x * (b > 1 && !i ? 18 * b + 14 : 34) + 34) : 240), $ = a ? Math.min(h * 0.38, 170) : 0, E = d ? 64 : 12, A = a ? $ + 10 : Math.max(...k.map((D) => String(F(D, B)).length)) * Tr + 12, P = a ? E : 6, j = d && !a ? 18 : 8, X = f.some((D) => (D.valores || []).some((C) => Number(C) < 0)), He = a ? 22 : 24 + (d && X ? 16 : 0), ee = Math.max(10, h - A - P), ve = Y - j - He, re = (a ? ve : ee) / Math.max(1, x), Ee = re * (a ? 0.22 : 0.26), je = re - Ee, Ne = i || b === 1 ? je : (je - ct * (b - 1)) / b, ne = a ? Ke(R, I, A, A + ee) : Ke(R, I, j + ve, j), De = ne(0), tt = (D) => o == null || o === D ? 1 : 0.35, rt = (D) => {
    const C = [], O = (a ? j : A) + D * re + Ee / 2;
    if (i) {
      let _ = 0, K = 0;
      const he = [...f.keys()].reverse().find(($e) => (W($e, D) ?? 0) > 0), Pe = [...f.keys()].reverse().find(($e) => (W($e, D) ?? 0) < 0);
      f.forEach(($e, Re) => {
        const ke = W(Re, D) ?? 0;
        if (ke === 0) return;
        const Be = ke > 0 ? _ : K, nt = Be + ke;
        ke > 0 ? _ = nt : K = nt, C.push({ off: O, grueso: Ne, desde: Be, hasta: nt, si: Re, extremo: Re === (ke > 0 ? he : Pe) });
      });
    } else
      f.forEach((_, K) => {
        const he = W(K, D);
        he !== null && C.push({ off: O + K * (Ne + ct), grueso: Ne, desde: 0, hasta: he, si: K, extremo: !0 });
      });
    return C;
  }, N = (D) => {
    const C = ne(D.desde), O = ne(D.hasta), _ = D.hasta >= D.desde, K = i && !D.extremo ? ct : 0;
    if (a) {
      const Re = Math.min(C, O), ke = Math.abs(O - C), Be = D.extremo ? _ ? "derecha" : "izquierda" : "ninguno";
      return _e(_ ? Re : Re + K, D.off, ke - K, D.grueso, Be);
    }
    const he = Math.min(C, O), Pe = Math.abs(O - C), $e = D.extremo ? _ ? "arriba" : "abajo" : "ninguno";
    return _ ? _e(D.off, he + K, D.grueso, Pe - K, $e) : _e(D.off, he, D.grueso, Pe - K, $e);
  }, L = (D) => f.reduce((C, O, _) => C + (W(_, D) ?? 0), 0), H = {
    columnas: ["", ...f.map((D) => D.nombre)],
    filas: g.map((D, C) => [D, ...f.map((O, _) => F(W(_, C), c))])
  }, G = (D) => (a ? j : A) + D * re + re / 2, te = m === null ? { x: 0, y: 0 } : a ? { x: Math.min(h - 10, ne(Math.max(0, i ? L(m) : Math.max(...f.map((D, C) => W(C, m) ?? 0))))), y: G(m) } : { x: G(m), y: j + ve / 3 }, le = Math.max(1, Math.ceil(x * 44 / Math.max(1, ee)));
  return /* @__PURE__ */ t(
    be,
    {
      titulo: s,
      series: b > 1 ? f : [],
      tabla: z ? H : null,
      estilo: v,
      alto: Y,
      children: /* @__PURE__ */ u("div", { ref: p, style: { position: "relative", minWidth: 0 }, children: [
        z ? h > 0 && /* @__PURE__ */ u(
          "svg",
          {
            width: h,
            height: Y,
            role: "img",
            style: { display: "block", overflow: "visible" },
            "aria-label": `${s ? `${s}: ` : ""}${x} categorías`,
            children: [
              k.map((D) => a ? /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: ne(D),
                    x2: ne(D),
                    y1: j,
                    y2: j + ve,
                    stroke: D === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
                  }
                ),
                /* @__PURE__ */ t("text", { x: ne(D), y: Y - 6, textAnchor: "middle", style: se, children: F(D, B) })
              ] }, D) : /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: A,
                    x2: A + ee,
                    y1: ne(D),
                    y2: ne(D),
                    stroke: D === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
                  }
                ),
                /* @__PURE__ */ t("text", { x: A - 8, y: ne(D), dy: "0.32em", textAnchor: "end", style: se, children: F(D, B) })
              ] }, D)),
              g.map((D, C) => /* @__PURE__ */ u(
                "g",
                {
                  tabIndex: 0,
                  opacity: tt(C),
                  "aria-label": `${D}: ${f.map((O, _) => `${b > 1 ? `${O.nombre} ` : ""}${F(W(_, C), c)}`).join(", ")}`,
                  onMouseEnter: () => y(C),
                  onMouseLeave: () => y(null),
                  onFocus: () => y(C),
                  onBlur: () => y(null),
                  style: { outline: "none", transition: "opacity var(--ds-t-state) var(--ds-ease)" },
                  children: [
                    a ? /* @__PURE__ */ t(
                      "rect",
                      {
                        x: A,
                        y: j + C * re,
                        width: ee,
                        height: re,
                        fill: m === C ? "var(--ds-surface-sunk)" : "transparent"
                      }
                    ) : /* @__PURE__ */ t(
                      "rect",
                      {
                        x: A + C * re,
                        y: j,
                        width: re,
                        height: ve,
                        fill: m === C ? "var(--ds-surface-sunk)" : "transparent"
                      }
                    ),
                    rt(C).map((O, _) => /* @__PURE__ */ t("path", { d: N(O), fill: de(f[O.si], O.si) }, _)),
                    a ? /* @__PURE__ */ u(
                      "text",
                      {
                        x: A - 10,
                        y: G(C),
                        dy: "0.32em",
                        textAnchor: "end",
                        style: { ...se, fontSize: 12, fill: "var(--ds-ink-2)" },
                        children: [
                          /* @__PURE__ */ t("title", { children: D }),
                          er(D, $)
                        ]
                      }
                    ) : C % le === 0 && /* @__PURE__ */ u("text", { x: G(C), y: Y - 6, textAnchor: "middle", style: se, children: [
                      /* @__PURE__ */ t("title", { children: D }),
                      er(D, re * le - 4)
                    ] }),
                    d && (() => {
                      const O = i || b === 1 ? i ? L(C) : W(0, C) : null;
                      if (O === null) return null;
                      const _ = F(O, B);
                      if (a) {
                        const he = ne(O);
                        return /* @__PURE__ */ t(
                          "text",
                          {
                            x: O >= 0 ? he + 6 : he - 6,
                            y: G(C),
                            dy: "0.32em",
                            textAnchor: O >= 0 ? "start" : "end",
                            style: { ...se, fill: "var(--ds-ink)", fontWeight: 800 },
                            children: _
                          }
                        );
                      }
                      if (re < 34) return null;
                      const K = ne(O);
                      return /* @__PURE__ */ t(
                        "text",
                        {
                          x: G(C),
                          y: O >= 0 ? K - 6 : K + 14,
                          textAnchor: "middle",
                          style: { ...se, fill: "var(--ds-ink)", fontWeight: 800 },
                          children: _
                        }
                      );
                    })()
                  ]
                },
                C
              )),
              a ? /* @__PURE__ */ t("line", { x1: De, x2: De, y1: j, y2: j + ve, stroke: "var(--ds-eje)" }) : /* @__PURE__ */ t("line", { x1: A, x2: A + ee, y1: De, y2: De, stroke: "var(--ds-eje)" })
            ]
          }
        ) : /* @__PURE__ */ t(xe, { alto: Y }),
        /* @__PURE__ */ t(
          Fe,
          {
            visible: m !== null,
            x: te.x,
            y: te.y,
            ancho: h,
            titulo: m === null ? "" : g[m],
            renglones: m === null ? [] : [
              ...f.map((D, C) => ({ color: de(D, C), nombre: D.nombre, valor: F(W(C, m), c) })),
              ...i && b > 1 ? [{ nombre: "Total", valor: F(L(m), c) }] : []
            ]
          }
        )
      ] })
    }
  );
}
const ut = 6;
function vt(e, r, n, a, i, d) {
  const o = (f, x) => [e + f * Math.sin(x), r - f * Math.cos(x)], l = d - i > Math.PI ? 1 : 0, [c, s] = o(a, i), [v, p] = o(a, d), [h, m] = o(n, d), [y, g] = o(n, i);
  return `M${c},${s} A${a},${a} 0 ${l} 1 ${v},${p} L${h},${m} A${n},${n} 0 ${l} 0 ${y},${g} Z`;
}
function Pa({
  datos: e = [],
  formato: r = "numero",
  totalEtiqueta: n = "Total",
  tamano: a = 200,
  grosor: i = 26,
  titulo: d,
  estilo: o
}) {
  const [l, c] = q(null), s = e.map((T, z) => ({ ...T, propio: T.color, color: T.color || de(null, z), valor: Number(T.valor) })).filter((T) => Number.isFinite(T.valor) && T.valor > 0);
  let v = s;
  if (s.length > ut) {
    const T = [...s].sort((S, M) => M.valor - S.valor), z = T.slice(ut - 1);
    v = [
      ...T.slice(0, ut - 1).map((S, M) => ({ ...S, color: S.propio || de(null, M) })),
      {
        etiqueta: `Otros (${z.length})`,
        valor: z.reduce((S, M) => S + M.valor, 0),
        color: "var(--ds-ink-3)",
        otros: !0
      }
    ];
  }
  const p = v.reduce((T, z) => T + z.valor, 0), h = a / 2, m = a / 2, y = a / 2 - 4, g = y - i, f = v.length > 1 ? 2 / y : 0;
  let x = 0;
  const b = v.map((T) => {
    const z = T.valor / p * Math.PI * 2, S = { a0: x + f / 2, a1: x + z - f / 2 };
    return x += z, S;
  }), W = {
    columnas: ["", "Valor", "%"],
    filas: v.map((T) => [T.etiqueta, F(T.valor, r), Z(T.valor / p)])
  }, w = l === null ? { t: n, v: F(p, r) } : { t: v[l].etiqueta, v: F(v[l].valor, r) };
  return /* @__PURE__ */ t(be, { titulo: d, tabla: p > 0 ? W : null, estilo: o, alto: a, children: p <= 0 ? /* @__PURE__ */ t(xe, { alto: a }) : /* @__PURE__ */ u("div", { style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--ds-5)" }, children: [
    /* @__PURE__ */ u("div", { style: { position: "relative", width: a, height: a, flexShrink: 0, margin: "0 auto" }, children: [
      /* @__PURE__ */ t(
        "svg",
        {
          width: a,
          height: a,
          role: "img",
          style: { display: "block" },
          "aria-label": `${d ? `${d}: ` : ""}${v.map((T) => `${T.etiqueta} ${Z(T.valor / p)}`).join(", ")}`,
          children: v.length === 1 ? /* @__PURE__ */ t(
            "path",
            {
              d: `${vt(h, m, g, y, 0, Math.PI)} ${vt(h, m, g, y, Math.PI, Math.PI * 2)}`,
              fill: v[0].color
            }
          ) : v.map((T, z) => /* @__PURE__ */ t(
            "path",
            {
              d: vt(
                h,
                m,
                l === z ? g - 3 : g,
                l === z ? y + 2 : y,
                b[z].a0,
                b[z].a1
              ),
              fill: T.color,
              opacity: l === null || l === z ? 1 : 0.4,
              onMouseEnter: () => c(z),
              onMouseLeave: () => c(null),
              style: { transition: "opacity var(--ds-t-state) var(--ds-ease)", cursor: "default" }
            },
            z
          ))
        }
      ),
      /* @__PURE__ */ u("div", { style: {
        position: "absolute",
        inset: i + 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        pointerEvents: "none"
      }, children: [
        /* @__PURE__ */ t("div", { style: {
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
        }, children: w.t }),
        /* @__PURE__ */ t("div", { className: "ds-num", style: {
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
        }, children: w.v }),
        l !== null && /* @__PURE__ */ t("div", { className: "ds-num", style: { fontSize: "var(--ds-t-small)", fontWeight: 700, color: "var(--ds-ink-2)" }, children: Z(v[l].valor / p) })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { role: "list", style: { flex: "1 1 180px", minWidth: 0, display: "grid", gap: 2 }, children: v.map((T, z) => /* @__PURE__ */ u(
      "div",
      {
        role: "listitem",
        tabIndex: 0,
        onMouseEnter: () => c(z),
        onMouseLeave: () => c(null),
        onFocus: () => c(z),
        onBlur: () => c(null),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "6px 8px",
          borderRadius: "var(--ds-r-item)",
          outlineOffset: 0,
          background: l === z ? "var(--ds-surface-sunk)" : "transparent",
          transition: "background var(--ds-t-state) var(--ds-ease)"
        },
        children: [
          /* @__PURE__ */ t(et, { color: T.color }),
          /* @__PURE__ */ t(
            "span",
            {
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
              title: T.etiqueta,
              children: T.etiqueta
            }
          ),
          /* @__PURE__ */ t("span", { className: "ds-num", style: { fontSize: "var(--ds-t-small)", fontWeight: 800, color: "var(--ds-ink)" }, children: F(T.valor, r) }),
          /* @__PURE__ */ t("span", { className: "ds-num", style: {
            fontSize: "var(--ds-t-micro)",
            fontWeight: 700,
            color: "var(--ds-ink-3)",
            minWidth: 44,
            textAlign: "right"
          }, children: Z(T.valor / p) })
        ]
      },
      z
    )) })
  ] }) });
}
const tr = [5, 4, 3, 2], Ln = (e, r) => tr[r <= 1 ? 0 : Math.round(e / (r - 1) * (tr.length - 1))];
function _a({ etapas: e = [], formato: r = "numero", titulo: n, estilo: a }) {
  var p;
  const [i, d] = ze(), o = e.filter((h) => Number.isFinite(Number(h.valor))), l = Math.max(0, ...o.map((h) => Number(h.valor))), c = Number((p = o[0]) == null ? void 0 : p.valor), s = d > 0 && d < 460, v = {
    columnas: ["Etapa", "Valor", "vs anterior", "vs inicio"],
    filas: o.map((h, m) => [
      h.etiqueta,
      F(h.valor, r),
      m === 0 ? "—" : Z(Number(o[m - 1].valor) ? Number(h.valor) / Number(o[m - 1].valor) : null),
      m === 0 ? "—" : Z(c ? Number(h.valor) / c : null)
    ])
  };
  return /* @__PURE__ */ t(be, { titulo: n, tabla: l > 0 ? v : null, estilo: a, children: /* @__PURE__ */ t("div", { ref: i, style: { minWidth: 0 }, children: l <= 0 ? /* @__PURE__ */ t(xe, {}) : /* @__PURE__ */ t("ol", { style: { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: s ? 12 : 6 }, children: o.map((h, m) => {
    const y = Number(h.valor), g = m > 0 ? Number(o[m - 1].valor) : null, f = g ? y / g : null, x = c ? y / c : null, b = /* @__PURE__ */ t("div", { style: {
      height: 30,
      display: "flex",
      justifyContent: "center",
      background: "var(--ds-surface-sunk)",
      borderRadius: "var(--ds-r-item)",
      overflow: "hidden"
    }, children: /* @__PURE__ */ t("div", { style: {
      width: `${Math.max(1.5, y / l * 100)}%`,
      height: "100%",
      background: `var(--ds-sec-${Ln(m, o.length)})`,
      borderRadius: "var(--ds-r-item)",
      transition: "width var(--ds-t-move) var(--ds-ease)"
    } }) }), W = /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "baseline", gap: 8, justifyContent: s ? "flex-start" : "flex-end", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ t("span", { className: "ds-num", style: { fontWeight: 800, color: "var(--ds-ink)", fontSize: "var(--ds-t-body)" }, children: F(y, r) }),
      m > 0 && /* @__PURE__ */ u("span", { className: "ds-num", style: { fontSize: "var(--ds-t-micro)", fontWeight: 700, color: "var(--ds-ink-3)", whiteSpace: "nowrap" }, children: [
        Z(f),
        " de la anterior · ",
        Z(x),
        " del inicio"
      ] })
    ] }), w = /* @__PURE__ */ t("div", { style: {
      fontSize: "var(--ds-t-small)",
      fontWeight: 700,
      color: "var(--ds-ink-2)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }, title: h.etiqueta, children: h.etiqueta });
    return /* @__PURE__ */ t("li", { "aria-label": `${h.etiqueta}: ${F(y, r)}${m > 0 ? `, ${Z(f)} de la etapa anterior` : ""}`, children: s ? /* @__PURE__ */ u("div", { style: { display: "grid", gap: 6 }, children: [
      /* @__PURE__ */ u("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline", flexWrap: "wrap" }, children: [
        w,
        W
      ] }),
      b
    ] }) : /* @__PURE__ */ u("div", { style: {
      display: "grid",
      gridTemplateColumns: "minmax(90px, 22%) 1fr minmax(150px, 28%)",
      alignItems: "center",
      gap: 14
    }, children: [
      w,
      b,
      W
    ] }) }, m);
  }) }) }) });
}
const rr = 6.6, In = 4;
function Va({
  pasos: e = [],
  alto: r = 260,
  formato: n = "numero",
  etiquetas: a = !0,
  titulo: i,
  estilo: d
}) {
  const [o, l] = ze(), [c, s] = q(null);
  let v = 0;
  const p = e.map(($) => {
    const E = Number($.valor);
    if ($.tipo === "total") {
      const j = Number.isFinite(E) && $.valor !== null && $.valor !== void 0 ? E : v;
      return v = j, { ...$, desde: 0, hasta: j, delta: j, total: !0 };
    }
    const A = Number.isFinite(E) ? E : 0, P = v;
    return v += A, { ...$, desde: P, hasta: v, delta: A, total: !1 };
  }), h = p.length > 0, m = p.flatMap(($) => [$.desde, $.hasta]), { marcas: y, min: g, max: f } = $t(Math.min(0, ...m), Math.max(0, ...m), 4), x = n === "moneda" ? "monedaCompacta" : n === "numero" ? "compacto" : n, b = Math.max(...y.map(($) => String(F($, x)).length)) * rr + 12, W = a ? 20 : 8, w = 24, T = Math.max(10, l - b - 6), z = r - W - w, S = T / Math.max(1, p.length), M = S * 0.62, k = Ke(g, f, W + z, W), R = ($) => $.total ? "var(--ds-serie-1)" : $.delta >= 0 ? "var(--ds-ok)" : "var(--ds-risk)", I = ($, E = n) => $.total ? F($.hasta, E) : `${$.delta > 0 ? "+" : ""}${F($.delta, E)}`, B = ($, E) => {
    const A = Math.max(3, Math.floor(E / rr));
    return $.length > A ? `${$.slice(0, A - 1)}…` : $;
  }, Y = {
    columnas: ["Paso", "Movimiento", "Acumulado"],
    filas: p.map(($) => [$.etiqueta, $.total ? "—" : I($), F($.hasta, n)])
  };
  return /* @__PURE__ */ t(be, { titulo: i, tabla: h ? Y : null, estilo: d, alto: r, children: /* @__PURE__ */ u("div", { ref: o, style: { position: "relative", minWidth: 0 }, children: [
    h ? l > 0 && /* @__PURE__ */ u(
      "svg",
      {
        width: l,
        height: r,
        role: "img",
        style: { display: "block", overflow: "visible" },
        "aria-label": `${i ? `${i}: ` : ""}${p.length} pasos, resultado ${F(v, n)}`,
        children: [
          y.map(($) => /* @__PURE__ */ u("g", { children: [
            /* @__PURE__ */ t(
              "line",
              {
                x1: b,
                x2: b + T,
                y1: k($),
                y2: k($),
                stroke: $ === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
              }
            ),
            /* @__PURE__ */ t("text", { x: b - 8, y: k($), dy: "0.32em", textAnchor: "end", style: se, children: F($, x) })
          ] }, $)),
          p.map(($, E) => {
            const A = b + E * S + (S - M) / 2, P = k(Math.max($.desde, $.hasta)), j = k(Math.min($.desde, $.hasta)), X = Math.max(1, j - P), He = $.hasta >= $.desde, ee = Math.min(In, M / 2, X / 2), ve = He ? `M${A},${P + X} L${A},${P + ee} Q${A},${P} ${A + ee},${P} L${A + M - ee},${P} Q${A + M},${P} ${A + M},${P + ee} L${A + M},${P + X} Z` : `M${A},${P} L${A + M},${P} L${A + M},${P + X - ee} Q${A + M},${P + X} ${A + M - ee},${P + X} L${A + ee},${P + X} Q${A},${P + X} ${A},${P + X - ee} Z`, re = p[E + 1];
            return /* @__PURE__ */ u(
              "g",
              {
                tabIndex: 0,
                style: { outline: "none" },
                "aria-label": `${$.etiqueta}: ${I($)}, acumulado ${F($.hasta, n)}`,
                onMouseEnter: () => s(E),
                onMouseLeave: () => s(null),
                onFocus: () => s(E),
                onBlur: () => s(null),
                children: [
                  /* @__PURE__ */ t(
                    "rect",
                    {
                      x: b + E * S,
                      y: W,
                      width: S,
                      height: z,
                      fill: c === E ? "var(--ds-surface-sunk)" : "transparent"
                    }
                  ),
                  /* @__PURE__ */ t("path", { d: ve, fill: R($) }),
                  re && /* @__PURE__ */ t(
                    "line",
                    {
                      x1: A + M,
                      x2: b + (E + 1) * S + (S - M) / 2,
                      y1: k($.hasta),
                      y2: k($.hasta),
                      stroke: "var(--ds-eje)",
                      strokeDasharray: "3 3"
                    }
                  ),
                  a && S >= 40 && /* @__PURE__ */ t(
                    "text",
                    {
                      x: A + M / 2,
                      y: P - 6,
                      textAnchor: "middle",
                      style: { ...se, fill: "var(--ds-ink)", fontWeight: 800 },
                      children: I($, x)
                    }
                  ),
                  /* @__PURE__ */ u(
                    "text",
                    {
                      x: b + E * S + S / 2,
                      y: r - 6,
                      textAnchor: "middle",
                      style: { ...se, fontWeight: $.total ? 800 : 600, fill: $.total ? "var(--ds-ink-2)" : "var(--ds-ink-3)" },
                      children: [
                        /* @__PURE__ */ t("title", { children: $.etiqueta }),
                        B(String($.etiqueta ?? ""), S - 4)
                      ]
                    }
                  )
                ]
              },
              E
            );
          })
        ]
      }
    ) : /* @__PURE__ */ t(xe, { alto: r }),
    /* @__PURE__ */ t(
      Fe,
      {
        visible: c !== null,
        ancho: l,
        x: c === null ? 0 : b + c * S + S / 2,
        y: c === null ? 0 : k(Math.max(p[c].desde, p[c].hasta)),
        titulo: c === null ? "" : p[c].etiqueta,
        renglones: c === null ? [] : [
          ...p[c].total ? [] : [{ color: R(p[c]), nombre: "Movimiento", valor: I(p[c]) }],
          { nombre: p[c].total ? "Total" : "Acumulado", valor: F(p[c].hasta, n) }
        ]
      }
    )
  ] }) });
}
const Qe = 5;
function zr(e) {
  const r = e.filter((n) => n != null && Number.isFinite(Number(n))).map(Number);
  return r.length ? { min: Math.min(...r), max: Math.max(...r) } : null;
}
function Nr(e, r) {
  if (e == null || !Number.isFinite(Number(e)) || !r) return 0;
  if (r.max === r.min) return 3;
  const n = (Number(e) - r.min) / (r.max - r.min);
  return Math.min(Qe, 1 + Math.floor(n * Qe));
}
const Ze = (e) => `var(--ds-sec-${e})`;
function Dr({ rango: e, formato: r }) {
  if (!e) return null;
  const n = (e.max - e.min) / Qe;
  return /* @__PURE__ */ u("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
    marginTop: "var(--ds-3)",
    fontSize: "var(--ds-t-micro)",
    fontWeight: 600,
    color: "var(--ds-ink-3)"
  }, children: [
    /* @__PURE__ */ t("span", { className: "ds-num", children: F(e.min, r) }),
    Array.from({ length: Qe }, (a, i) => /* @__PURE__ */ t(
      "span",
      {
        title: `${F(e.min + n * i, r)} – ${F(e.min + n * (i + 1), r)}`,
        style: { width: 22, height: 10, borderRadius: "var(--ds-r-mini)", background: Ze(i + 1) }
      },
      i
    )),
    /* @__PURE__ */ t("span", { className: "ds-num", children: F(e.max, r) }),
    /* @__PURE__ */ u("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, marginLeft: 10 }, children: [
      /* @__PURE__ */ t("span", { style: { width: 10, height: 10, borderRadius: "var(--ds-r-mini)", background: Ze(0) } }),
      "Sin dato"
    ] })
  ] });
}
function Xa({
  filas: e = [],
  columnas: r = [],
  valores: n = [],
  formato: a = "numero",
  celdaMinima: i = 28,
  altoCelda: d = 28,
  titulo: o,
  estilo: l
}) {
  var T;
  const c = V(null), s = Rr().replace(/:/g, ""), [v, p] = q(null), h = n.flat(), m = zr(h), y = Math.min(140, Math.max(36, ...e.map((z) => String(z).length * 7 + 12))), g = (z, S) => {
    var M;
    return (M = n == null ? void 0 : n[z]) == null ? void 0 : M[S];
  }, f = (z, S) => ({
    x: y + (S + 0.5) * (c.current ? (c.current.scrollWidth - y) / Math.max(1, r.length) : i),
    y: 22 + z * (d + 3)
  }), x = (z, S) => p((M) => {
    const [k, R] = M || [0, 0];
    return [Math.max(0, Math.min(e.length - 1, k + z)), Math.max(0, Math.min(r.length - 1, R + S))];
  }), b = (z) => {
    const S = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[z.key];
    S && (z.preventDefault(), x(...S)), z.key === "Escape" && p(null);
  }, W = {
    columnas: ["", ...r],
    filas: e.map((z, S) => [z, ...r.map((M, k) => F(g(S, k), a))])
  }, w = v ? f(...v) : { x: 0, y: 0 };
  return /* @__PURE__ */ t(be, { titulo: o, tabla: m ? W : null, estilo: l, children: m ? /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ u(
      "div",
      {
        ref: c,
        tabIndex: 0,
        role: "grid",
        "aria-label": `${o ? `${o}: ` : ""}${e.length} por ${r.length}. Flechas para recorrer.`,
        "aria-activedescendant": v ? `${s}-${v[0]}-${v[1]}` : void 0,
        onKeyDown: b,
        onFocus: () => p((z) => z || [0, 0]),
        onBlur: () => p(null),
        onMouseLeave: () => p(null),
        style: { position: "relative", overflowX: "auto", paddingBottom: 4, outlineOffset: 2 },
        children: [
          /* @__PURE__ */ u("div", { style: {
            display: "grid",
            minWidth: y + r.length * i,
            gridTemplateColumns: `${y}px repeat(${r.length}, minmax(${i}px, 1fr))`,
            gap: 3
          }, children: [
            /* @__PURE__ */ u("div", { role: "row", style: { display: "contents" }, children: [
              /* @__PURE__ */ t("div", { role: "columnheader" }),
              r.map((z, S) => /* @__PURE__ */ t(
                "div",
                {
                  role: "columnheader",
                  "aria-label": String(z),
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
                  title: String(z),
                  children: r.length > 16 && S % 2 ? "" : z
                },
                S
              ))
            ] }),
            e.map((z, S) => /* @__PURE__ */ u("div", { role: "row", style: { display: "contents" }, children: [
              /* @__PURE__ */ t("div", { role: "rowheader", style: {
                fontSize: "var(--ds-t-small)",
                fontWeight: 600,
                color: "var(--ds-ink-2)",
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                paddingRight: 6
              }, title: String(z), children: z }),
              r.map((M, k) => {
                const R = v && v[0] === S && v[1] === k, I = g(S, k);
                return /* @__PURE__ */ t(
                  "div",
                  {
                    id: `${s}-${S}-${k}`,
                    role: "gridcell",
                    "aria-selected": !!R,
                    "aria-label": `${z} · ${M}: ${I == null ? "sin dato" : F(I, a)}`,
                    onMouseEnter: () => p([S, k]),
                    style: {
                      height: d,
                      borderRadius: "var(--ds-r-mini)",
                      background: Ze(Nr(I, m)),
                      boxShadow: R ? "0 0 0 2px var(--ds-ink)" : "none",
                      transition: "box-shadow var(--ds-t-tap) var(--ds-ease-out)"
                    }
                  },
                  k
                );
              })
            ] }, S))
          ] }),
          /* @__PURE__ */ t(
            Fe,
            {
              visible: !!v,
              x: w.x,
              y: w.y,
              ancho: ((T = c.current) == null ? void 0 : T.scrollWidth) || 0,
              titulo: v ? `${e[v[0]]} · ${r[v[1]]}` : "",
              renglones: v ? [{ nombre: o || "Valor", valor: F(g(...v), a) }] : []
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(Dr, { rango: m, formato: a })
  ] }) : /* @__PURE__ */ t(xe, {}) });
}
const pe = 13, Le = 3, An = ["L", "", "M", "", "V", "", ""], ht = (e) => {
  if (e instanceof Date) return new Date(e.getFullYear(), e.getMonth(), e.getDate());
  const [r, n, a] = String(e).slice(0, 10).split("-").map(Number);
  return new Date(r, n - 1, a);
}, Cn = (e) => `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
function Ya({ datos: e = [], desde: r, hasta: n, formato: a = "numero", titulo: i, estilo: d }) {
  const o = V(null), [l, c] = q(null), { dias: s, semanas: v, mapa: p, rango: h } = fe(() => {
    const S = new Map(e.map(($) => [String($.fecha).slice(0, 10), $.valor])), M = e.map(($) => ht($.fecha)).sort(($, E) => $ - E), k = r ? ht(r) : M[0], R = n ? ht(n) : M[M.length - 1];
    if (!k || !R || R < k) return { dias: [], semanas: 0, mapa: S, rango: null };
    const I = new Date(k);
    I.setDate(I.getDate() - (I.getDay() + 6) % 7);
    const B = [];
    for (let $ = new Date(I); $ <= R; $.setDate($.getDate() + 1)) {
      const E = Cn($);
      B.push({ fecha: new Date($), k: E, fuera: $ < k, valor: S.get(E) });
    }
    const Y = B.filter(($) => !$.fuera).map(($) => $.valor);
    return { dias: B, semanas: Math.ceil(B.length / 7), mapa: S, rango: zr(Y) };
  }, [e, r, n]);
  Se(() => {
    o.current && (o.current.scrollLeft = o.current.scrollWidth);
  }, [v]);
  const m = 18, y = 18, g = (S) => ({
    x: m + Math.floor(S / 7) * (pe + Le),
    y: y + S % 7 * (pe + Le)
  }), f = [];
  s.forEach((S, M) => {
    if (M % 7 === 0) {
      const k = M / 7, R = s.slice(M, M + 7).find((I) => I.fecha.getDate() === 1) || (M === 0 ? S : null);
      R && (!f.length || k - f[f.length - 1].sem >= 3) && f.push({ sem: k, texto: U(R.fecha, "mesCorto") });
    }
  });
  const x = (S) => {
    const M = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -7, ArrowRight: 7 }[S.key];
    M && (S.preventDefault(), c((k) => {
      var I;
      let R = (k ?? s.length - 1) + M;
      for (R = Math.max(0, Math.min(s.length - 1, R)); (I = s[R]) != null && I.fuera && R < s.length - 1; ) R += 1;
      return R;
    })), S.key === "Escape" && c(null);
  }, b = m + v * (pe + Le), W = y + 7 * (pe + Le), w = {
    columnas: ["Fecha", "Valor"],
    filas: s.filter((S) => !S.fuera && S.valor !== void 0).map((S) => [U(S.fecha, "media"), F(S.valor, a)])
  }, T = l !== null ? s[l] : null, z = l !== null ? g(l) : { x: 0, y: 0 };
  return /* @__PURE__ */ t(be, { titulo: i, tabla: h ? w : null, estilo: d, children: h ? /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ u(
      "div",
      {
        ref: o,
        tabIndex: 0,
        role: "group",
        "aria-roledescription": "calendario",
        "aria-label": `${i ? `${i}: ` : ""}calendario de ${v} semanas. Flechas para recorrer.`,
        onKeyDown: x,
        onFocus: () => c((S) => S ?? s.length - 1),
        onBlur: () => c(null),
        onMouseLeave: () => c(null),
        style: { position: "relative", overflowX: "auto", paddingBottom: 4, outlineOffset: 2 },
        children: [
          /* @__PURE__ */ t("span", { "aria-live": "polite", style: pn, children: T ? `${U(T.fecha, "larga")}: ${T.valor === void 0 ? "sin dato" : F(T.valor, a)}` : "" }),
          /* @__PURE__ */ u("svg", { width: b, height: W, "aria-hidden": "true", style: { display: "block" }, children: [
            f.map((S) => /* @__PURE__ */ t(
              "text",
              {
                x: m + S.sem * (pe + Le),
                y: 11,
                style: { fontSize: 11, fontWeight: 600, fill: "var(--ds-ink-3)", fontFamily: "var(--ds-font)" },
                children: S.texto
              },
              S.sem
            )),
            An.map((S, M) => S && /* @__PURE__ */ t(
              "text",
              {
                x: 0,
                y: y + M * (pe + Le) + pe - 2,
                style: { fontSize: 10, fontWeight: 600, fill: "var(--ds-ink-3)", fontFamily: "var(--ds-font)" },
                children: S
              },
              M
            )),
            s.map((S, M) => {
              if (S.fuera) return null;
              const { x: k, y: R } = g(M);
              return /* @__PURE__ */ t(
                "rect",
                {
                  x: k,
                  y: R,
                  width: pe,
                  height: pe,
                  rx: "3",
                  fill: Ze(Nr(S.valor, h)),
                  stroke: l === M ? "var(--ds-ink)" : "none",
                  strokeWidth: "2",
                  onMouseEnter: () => c(M)
                },
                S.k
              );
            })
          ] }),
          /* @__PURE__ */ t(
            Fe,
            {
              visible: !!T,
              x: z.x + pe / 2,
              y: z.y,
              ancho: b,
              titulo: T ? U(T.fecha, "larga") : "",
              renglones: T ? [{ nombre: i || "Valor", valor: T.valor === void 0 ? "Sin dato" : F(T.valor, a) }] : []
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(Dr, { rango: h, formato: a })
  ] }) : /* @__PURE__ */ t(xe, {}) });
}
const nr = ["var(--ds-line-firm)", "var(--ds-esqueleto-brillo)", "var(--ds-surface-sunk)"];
function Fn({ item: e, formato: r, angosto: n, anchoEtiqueta: a }) {
  const { etiqueta: i, valor: d, meta: o, rangos: l = [], menorEsMejor: c = !1, nota: s } = e, v = Number(d), p = Math.max(...[...l, v, Number(o)].filter(Number.isFinite), 1), h = (W) => `${Math.max(0, Math.min(100, W / p * 100))}%`, m = [0, ...l.slice(0, 2), p], y = c ? [...nr].reverse() : nr, g = !Number.isFinite(v), f = /* @__PURE__ */ u("div", { style: { position: "relative", height: 22, borderRadius: "var(--ds-r-mini)", overflow: "hidden", background: y[2] }, children: [
    l.length > 0 && m.slice(0, -1).map((W, w) => /* @__PURE__ */ t("div", { style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: h(W),
      width: `calc(${h(m[w + 1])} - ${h(W)})`,
      background: y[w]
    } }, w)),
    !g && /* @__PURE__ */ t("div", { style: {
      position: "absolute",
      left: 0,
      top: "32%",
      height: "36%",
      width: h(v),
      background: "var(--ds-accent-trazo)",
      borderRadius: "0 var(--ds-r-mini) var(--ds-r-mini) 0",
      transition: "width var(--ds-t-move) var(--ds-ease)"
    } }),
    Number.isFinite(Number(o)) && /* @__PURE__ */ t("div", { style: {
      position: "absolute",
      top: 3,
      bottom: 3,
      width: 3,
      borderRadius: "var(--ds-r-mini)",
      left: `calc(${h(Number(o))} - 1.5px)`,
      background: "var(--ds-ink)"
    } })
  ] }), x = /* @__PURE__ */ u("div", { className: "ds-num", style: { textAlign: n ? "left" : "right", whiteSpace: "nowrap" }, children: [
    /* @__PURE__ */ t("span", { style: { fontWeight: 800, color: "var(--ds-ink)" }, children: g ? "Sin dato" : F(v, r) }),
    Number.isFinite(Number(o)) && /* @__PURE__ */ u("span", { style: { fontSize: "var(--ds-t-micro)", fontWeight: 700, color: "var(--ds-ink-3)", marginLeft: 6 }, children: [
      "meta ",
      F(o, r)
    ] })
  ] }), b = /* @__PURE__ */ u("div", { style: { minWidth: 0 }, children: [
    /* @__PURE__ */ t("div", { style: {
      fontSize: "var(--ds-t-small)",
      fontWeight: 700,
      color: "var(--ds-ink-2)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }, title: i, children: i }),
    s && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-micro)", color: "var(--ds-ink-3)" }, children: s })
  ] });
  return /* @__PURE__ */ t("li", { "aria-label": `${i}: ${g ? "sin dato" : F(v, r)}${Number.isFinite(Number(o)) ? `, meta ${F(o, r)}` : ""}`, children: n ? /* @__PURE__ */ u("div", { style: { display: "grid", gap: 6 }, children: [
    /* @__PURE__ */ u("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }, children: [
      b,
      x
    ] }),
    f
  ] }) : /* @__PURE__ */ u("div", { style: { display: "grid", gridTemplateColumns: `${a}px 1fr auto`, alignItems: "center", gap: 14 }, children: [
    b,
    f,
    x
  ] }) });
}
function Ga({ items: e, item: r, formato: n = "numero", titulo: a, estilo: i }) {
  const [d, o] = ze(), l = e || (r ? [r] : []), c = o > 0 && o < 460, s = Math.min(180, Math.max(90, o * 0.26)), v = {
    columnas: ["", "Real", "Meta"],
    filas: l.map((p) => [p.etiqueta, F(p.valor, n), F(p.meta, n)])
  };
  return /* @__PURE__ */ t(be, { titulo: a, tabla: l.length ? v : null, estilo: i, children: /* @__PURE__ */ t("div", { ref: d, style: { minWidth: 0 }, children: l.length ? /* @__PURE__ */ t("ul", { style: { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: c ? 16 : 12 }, children: l.map((p, h) => /* @__PURE__ */ t(Fn, { item: p, formato: n, angosto: c, anchoEtiqueta: s }, h)) }) : /* @__PURE__ */ t(xe, { alto: 100 }) }) });
}
const En = {
  ok: "var(--ds-ok)",
  aviso: "var(--ds-warn)",
  riesgo: "var(--ds-risk)",
  neutro: "var(--ds-ink-3)",
  acento: "var(--ds-accent-trazo)"
};
function Ka({
  segmentos: e = [],
  formato: r = "numero",
  alto: n = 14,
  leyenda: a = !0,
  titulo: i,
  estilo: d
}) {
  const [o, l] = ze(), [c, s] = q(null), v = e.map((g, f) => ({ ...g, valor: Number(g.valor), color: g.color || En[g.tono] || de(null, f) })).filter((g) => Number.isFinite(g.valor) && g.valor > 0), p = v.reduce((g, f) => g + f.valor, 0);
  let h = 0;
  const m = v.map((g) => {
    const f = h + g.valor / 2;
    return h += g.valor, p ? f / p * l : 0;
  }), y = {
    columnas: ["", "Valor", "%"],
    filas: v.map((g) => [g.etiqueta, F(g.valor, r), Z(g.valor / p)])
  };
  return /* @__PURE__ */ t(be, { titulo: i, tabla: p > 0 ? y : null, estilo: d, children: /* @__PURE__ */ t("div", { ref: o, style: { position: "relative", minWidth: 0 }, children: p <= 0 ? /* @__PURE__ */ t(xe, { alto: 60 }) : /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ t("div", { role: "list", style: {
      display: "flex",
      gap: 2,
      height: n,
      borderRadius: "var(--ds-r-pill)",
      overflow: "hidden"
    }, children: v.map((g, f) => /* @__PURE__ */ t(
      "div",
      {
        role: "listitem",
        tabIndex: 0,
        "aria-label": `${g.etiqueta}: ${F(g.valor, r)}, ${Z(g.valor / p)}`,
        onMouseEnter: () => s(f),
        onMouseLeave: () => s(null),
        onFocus: () => s(f),
        onBlur: () => s(null),
        style: {
          flex: `${g.valor} 1 0`,
          minWidth: 4,
          background: g.color,
          opacity: c === null || c === f ? 1 : 0.45,
          outlineOffset: -2,
          transition: "opacity var(--ds-t-state) var(--ds-ease)"
        }
      },
      f
    )) }),
    /* @__PURE__ */ t(
      Fe,
      {
        visible: c !== null,
        ancho: l,
        x: c === null ? 0 : m[c],
        y: n + 6,
        titulo: c === null ? "" : v[c].etiqueta,
        renglones: c === null ? [] : [
          { color: v[c].color, nombre: "Valor", valor: F(v[c].valor, r) },
          { nombre: "Del total", valor: Z(v[c].valor / p) }
        ]
      }
    ),
    a && /* @__PURE__ */ t("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "8px 16px",
      marginTop: "var(--ds-4)"
    }, children: v.map((g, f) => /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "flex-start", gap: 8, minWidth: 0 }, children: [
      /* @__PURE__ */ t("span", { style: { marginTop: 4 }, children: /* @__PURE__ */ t(et, { color: g.color }) }),
      /* @__PURE__ */ u("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ t("div", { style: {
          fontSize: "var(--ds-t-micro)",
          fontWeight: 700,
          color: "var(--ds-ink-3)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }, title: g.etiqueta, children: g.etiqueta }),
        /* @__PURE__ */ u("div", { className: "ds-num", style: { fontSize: "var(--ds-t-small)", fontWeight: 800, color: "var(--ds-ink)" }, children: [
          F(g.valor, r),
          /* @__PURE__ */ t("span", { style: { fontWeight: 700, color: "var(--ds-ink-3)", marginLeft: 6, fontSize: "var(--ds-t-micro)" }, children: Z(g.valor / p) })
        ] })
      ] })
    ] }, f)) })
  ] }) }) });
}
export {
  Lt as ALTO_CABECERA_MOVIL,
  Te as ALTO_DOCK,
  Ca as Actividad,
  Er as Anillo,
  ta as Armazon,
  ea as Aviso,
  Gr as Azulejo,
  Ga as Bala,
  Zn as Barra,
  Ka as BarraDistribucion,
  Oa as BarraFiltros,
  na as BarraSeleccion,
  Kn as Barras,
  Pn as Bento,
  Ye as Boton,
  Ua as Buscador,
  Ja as CAJA,
  Fa as Calendario,
  Ya as CalendarioCalor,
  ei as Campo,
  oa as Campos,
  ba as Cargando,
  Va as Cascada,
  At as Casilla,
  _n as Celda,
  zn as Chip,
  Yn as Cifra,
  Mr as CuerpoKpi,
  za as Detalles,
  Pa as Dona,
  _a as Embudo,
  Ea as EncabezadoPagina,
  ti as Envoltura,
  Q as Esqueleto,
  Br as EsqueletoFila,
  Gn as EsqueletoLista,
  Da as EstadoVacio,
  Qn as Fila,
  Sa as FilaKpis,
  Wt as Flotante,
  ia as Formulario,
  Pr as Giro,
  Fe as Globo,
  Ha as GraficaBarras,
  qa as GraficaLinea,
  Ra as GrupoRetratos,
  Vn as Heroe,
  lr as Insignia,
  Jn as Interruptor,
  Aa as Kanban,
  Un as Lamina,
  vn as Leyenda,
  La as LineaTiempo,
  Na as Llamado,
  Xa as MapaCalor,
  be as MarcoGrafica,
  jr as Medidor,
  Yr as Migas,
  vr as Modal,
  $r as OpcionFlotante,
  Wr as PERIODOS,
  xa as PanelInicio,
  Ia as Pasos,
  Ae as Pastilla,
  ya as Pestanas,
  qn as ProveedorTema,
  kt as Retrato,
  jt as SERIES,
  ge as SIN_DATO,
  _r as Seccion,
  ja as Segmentado,
  ri as Selector,
  ra as SelectorArmazon,
  Ba as SelectorPeriodo,
  xe as SinDatos,
  fn as Sparkline,
  we as Superficie,
  aa as Tabla,
  $a as TarjetaComparativa,
  Ta as TarjetaEntidad,
  wa as TarjetaKpi,
  Ma as TarjetaMeta,
  Wa as TarjetaRanking,
  Qr as Transicion,
  Sr as Variacion,
  Xn as Vidrio,
  xr as compacto,
  fa as condicion,
  un as configurarFormato,
  ha as correo,
  ua as digitos,
  U as fecha,
  Mt as fechaRelativa,
  ue as formatear,
  ka as formato,
  la as maximo,
  da as minimo,
  ft as moneda,
  ca as numero,
  pa as patron,
  Z as porcentaje,
  Jt as rangoPeriodo,
  sa as requerido,
  va as soloDigitos,
  Tn as textoRango,
  ye as useAngosto,
  wt as useArmazon,
  ga as useFiltros,
  ma as useFormulario,
  dr as useMedia,
  ze as useMedida,
  Hn as useTema,
  wr as variacion
};
