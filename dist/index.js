import "./estilos.css";
import { jsx as t, jsxs as u, Fragment as J } from "react/jsx-runtime";
import ge, { useState as H, useEffect as ie, useCallback as se, useContext as Qt, createContext as Ut, useRef as K, useLayoutEffect as Ae, useMemo as fe } from "react";
import { B as Ea, C as Ca, S as ja } from "./Campo-JwU_Rw43.js";
import { createPortal as Zt } from "react-dom";
const dt = "ds-theme", Jt = Ut({ tema: "light", alternar: () => {
}, fijar: () => {
} });
function xr() {
  try {
    const e = localStorage.getItem(dt);
    if (e === "light" || e === "dark") return e;
  } catch {
  }
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function Mn({ children: e, forzar: r, marca: n }) {
  const [a, i] = H(() => r || xr());
  ie(() => {
    const o = document.documentElement;
    o.setAttribute("data-ds-theme", a), o.style.colorScheme = a;
    try {
      localStorage.setItem(dt, a);
    } catch {
    }
  }, [a]), ie(() => {
    if (!n) return;
    const o = document.documentElement;
    return o.setAttribute("data-ds-marca", n), () => o.removeAttribute("data-ds-marca");
  }, [n]), ie(() => {
    if (r) return;
    let o = !1;
    try {
      o = !!localStorage.getItem(dt);
    } catch {
    }
    if (o) return;
    const s = window.matchMedia("(prefers-color-scheme: dark)"), c = (l) => i(l.matches ? "dark" : "light");
    return s.addEventListener("change", c), () => s.removeEventListener("change", c);
  }, [r]);
  const d = se(() => i((o) => o === "dark" ? "light" : "dark"), []);
  return /* @__PURE__ */ t(Jt.Provider, { value: { tema: a, alternar: d, fijar: i }, children: /* @__PURE__ */ t("div", { className: "ds-root", children: e }) });
}
const Wn = () => Qt(Jt), kt = { plana: "var(--ds-lift-1)", elevada: "var(--ds-lift-2)", flotante: "var(--ds-lift-3)" };
function we({
  children: e,
  nivel: r = "elevada",
  interactiva: n = !1,
  hundida: a = !1,
  solida: i = !1,
  radio: d = "var(--ds-r-card)",
  relleno: o = "var(--ds-5)",
  estilo: s,
  entrada: c,
  ...l
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      ...l,
      style: {
        background: i ? "var(--ds-surface-solid)" : a ? "var(--ds-surface-sunk)" : "var(--ds-surface)",
        backdropFilter: i ? void 0 : "var(--ds-blur)",
        WebkitBackdropFilter: i ? void 0 : "var(--ds-blur)",
        border: "1px solid var(--ds-line)",
        borderRadius: d,
        padding: o,
        boxShadow: a ? "none" : kt[r],
        transition: "transform var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease)",
        cursor: n ? "pointer" : void 0,
        ...c !== void 0 ? {
          animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
          animationDelay: `${Math.min(c * 55, 240)}ms`
        } : null,
        ...s
      },
      onMouseEnter: n ? (h) => {
        h.currentTarget.style.transform = "translateY(-3px)", h.currentTarget.style.boxShadow = "var(--ds-lift-3)";
      } : void 0,
      onMouseLeave: n ? (h) => {
        h.currentTarget.style.transform = "none", h.currentTarget.style.boxShadow = kt[r];
      } : void 0,
      children: e
    }
  );
}
function Tn({ children: e, marco: r = !1, columnas: n = 12, hueco: a = "var(--ds-4)", estilo: i }) {
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
function zn({ children: e, ancho: r = 12, anchoMd: n, alto: a, estilo: i }) {
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
function Nn({
  children: e,
  imagen: r,
  imagenChica: n,
  encuadre: a = "center",
  alt: i = "",
  intensidad: d = 0.26,
  soloFoto: o = !1,
  radio: s = "var(--ds-r-card)",
  relleno: c = "var(--ds-8)",
  estilo: l,
  entrada: h,
  ...p
}) {
  const [v, f] = ge.useState(!1), y = o && r && !v;
  return /* @__PURE__ */ u(
    "div",
    {
      ...p,
      className: [y ? null : "ds-heroe", p.className].filter(Boolean).join(" ") || void 0,
      style: {
        position: "relative",
        overflow: "hidden",
        background: y ? "#0B0C12" : "var(--ds-hero)",
        borderRadius: s,
        padding: c,
        color: "var(--ds-ink-on-hero)",
        boxShadow: y ? "var(--ds-lift-3)" : "var(--ds-lift-accent), var(--ds-lift-2)",
        ...h !== void 0 ? {
          animation: "ds-rise var(--ds-t-scene) var(--ds-ease) both",
          animationDelay: `${Math.min(h * 55, 240)}ms`
        } : null,
        ...l
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
            onError: () => f(!0)
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
function Dn({ children: e, interactivo: r = !1, estilo: n, ...a }) {
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
const kr = {
  neutro: "var(--ds-ink)",
  acento: "var(--ds-accent-tinta)",
  ok: "var(--ds-ok)",
  aviso: "var(--ds-warn)",
  riesgo: "var(--ds-risk)"
}, wr = { m: "var(--ds-num-m)", l: "var(--ds-num-l)", xl: "var(--ds-num-xl)" };
function In({
  valor: e,
  etiqueta: r,
  nota: n,
  tono: a = "neutro",
  tamano: i = "l",
  icono: d,
  alineacion: o = "left",
  estilo: s
}) {
  return /* @__PURE__ */ u("div", { style: { minWidth: 0, textAlign: o, ...s }, children: [
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
      fontSize: wr[i],
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: "-0.035em",
      color: kr[a],
      marginTop: 2
    }, children: e }),
    n && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", marginTop: 3 }, children: n })
  ] });
}
function Sr({
  valor: e = 0,
  tamano: r = 132,
  grosor: n = 10,
  tono: a = "var(--ds-accent-trazo)",
  pista: i = "var(--ds-surface-sunk)",
  children: d,
  animar: o = !0
}) {
  const s = Math.max(0, Math.min(100, e)), c = (r - n) / 2, l = 2 * Math.PI * c, h = l * (1 - s / 100);
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
          strokeDasharray: l,
          strokeDashoffset: h,
          style: o ? {
            "--ds-dash": l,
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
const wt = {
  acento: "var(--ds-accent-trazo)",
  ok: "var(--ds-ok)",
  aviso: "var(--ds-warn)",
  riesgo: "var(--ds-risk)"
};
function $r({
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
        background: wt[n] || wt.acento,
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
function Mr({ retrato: e = !0, lineas: r = 2, derecha: n = !0 }) {
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
function Ln({ filas: e = 5, ...r }) {
  return /* @__PURE__ */ t("div", { children: Array.from({ length: e }, (n, a) => /* @__PURE__ */ t("div", { style: { opacity: 1 - a * 0.12 }, children: /* @__PURE__ */ t(Mr, { ...r }) }, a)) });
}
function Rn({
  datos: e = [],
  alto: r = 132,
  tono: n = "var(--ds-accent-trazo)",
  pista: a = "var(--ds-surface-sunk)",
  ancho: i = 7,
  hueco: d = 5,
  animar: o = !0,
  ejeX: s = !1
}) {
  const c = r === "auto", l = Math.max(1, ...e.map((v) => v.total ?? v.valor ?? 0)), h = c ? { flex: "1 1 0", minWidth: 0, maxWidth: i * 2 } : { width: i, flexShrink: 0 }, p = c ? "var(--ds-r-item)" : 99;
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
        children: e.map((v, f) => {
          const y = v.total ?? v.valor ?? 0, m = v.valor ?? 0, g = y / l * 100, b = m / l * 100;
          return /* @__PURE__ */ u(
            "div",
            {
              title: v.etiqueta,
              style: { position: "relative", height: "100%", ...h },
              children: [
                /* @__PURE__ */ t("div", { style: {
                  position: "absolute",
                  inset: "auto 0 0 0",
                  height: `max(3px, ${g}%)`,
                  background: a,
                  borderRadius: p
                } }),
                /* @__PURE__ */ t("div", { style: {
                  position: "absolute",
                  inset: "auto 0 0 0",
                  height: m > 0 ? `max(3px, ${b}%)` : 0,
                  background: v.tono || n,
                  borderRadius: p,
                  transformOrigin: "bottom",
                  ...o ? {
                    animation: "ds-grow var(--ds-t-move) var(--ds-ease) both",
                    animationDelay: `${Math.min(f * 22, 300)}ms`
                  } : null
                } })
              ]
            },
            f
          );
        })
      }
    ),
    s && /* @__PURE__ */ t("div", { style: {
      display: "flex",
      gap: d,
      marginTop: 8,
      flexShrink: 0,
      justifyContent: "space-between"
    }, children: e.map((v, f) => /* @__PURE__ */ t("div", { style: {
      ...h,
      textAlign: "center",
      fontSize: "var(--ds-t-micro)",
      fontWeight: 600,
      color: "var(--ds-ink-3)"
    }, children: v.eje ?? "" }, f)) })
  ] });
}
const Pe = {
  neutro: ["var(--ds-surface-sunk)", "var(--ds-ink-2)"],
  acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)"],
  ok: ["var(--ds-ok-soft)", "var(--ds-ok)"],
  aviso: ["var(--ds-warn-soft)", "var(--ds-warn)"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)"]
};
function Le({ children: e, tono: r = "neutro", icono: n, estilo: a, ...i }) {
  const [d, o] = Pe[r] || Pe.neutro;
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
function er({ children: e, tono: r = "acento", tamano: n = 38, estilo: a }) {
  const [i, d] = Pe[r] || Pe.acento;
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
const Wr = {
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
}, Tr = {
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
}, zr = `
@keyframes ds-boton-gira { to { transform: rotate(360deg); } }
@keyframes ds-boton-late { 50% { opacity: .35; } }
.ds-boton-giro { width: 15px; height: 15px; flex-shrink: 0; border-radius: 50%;
  border: 2px solid currentColor; border-right-color: transparent;
  animation: ds-boton-gira .7s linear infinite; }
@media (prefers-reduced-motion: reduce) { .ds-boton-giro { animation: ds-boton-late 1.2s ease-in-out infinite; } }
`;
function Nr({ estilo: e }) {
  return /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ t("style", { children: zr }),
    /* @__PURE__ */ t("span", { className: "ds-boton-giro", "aria-hidden": !0, style: e })
  ] });
}
function _e({
  children: e,
  variante: r = "contorno",
  icono: n,
  esperando: a = !1,
  disabled: i,
  pleno: d = !1,
  estilo: o,
  ...s
}) {
  const c = i || a;
  return /* @__PURE__ */ u(
    "button",
    {
      ...s,
      disabled: c,
      "aria-busy": a || void 0,
      style: {
        ...Wr,
        ...Tr[r],
        width: d ? "100%" : void 0,
        opacity: a ? 0.88 : i ? 0.55 : 1,
        cursor: a ? "progress" : i ? "not-allowed" : "pointer",
        ...o
      },
      onMouseDown: (l) => {
        c || (l.currentTarget.style.transform = "scale(0.98)");
      },
      onMouseUp: (l) => {
        l.currentTarget.style.transform = "none";
      },
      onMouseLeave: (l) => {
        l.currentTarget.style.transform = "none";
      },
      children: [
        a ? /* @__PURE__ */ t(Nr, {}) : n,
        e
      ]
    }
  );
}
function An({
  izquierda: e,
  titulo: r,
  subtitulo: n,
  derecha: a,
  extremo: i,
  onClick: d,
  estilo: o,
  entrada: s,
  ...c
}) {
  const l = !!d;
  return /* @__PURE__ */ u(
    "div",
    {
      ...c,
      onClick: d,
      role: l ? "button" : void 0,
      tabIndex: l ? 0 : void 0,
      onKeyDown: l ? (h) => {
        (h.key === "Enter" || h.key === " ") && (h.preventDefault(), d(h));
      } : void 0,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--ds-3)",
        padding: "var(--ds-3) var(--ds-4)",
        borderRadius: "var(--ds-r-item)",
        cursor: l ? "pointer" : void 0,
        transition: "background var(--ds-t-state) var(--ds-ease)",
        ...s !== void 0 ? {
          animation: "ds-rise var(--ds-t-move) var(--ds-ease) both",
          animationDelay: `${Math.min(s * 28, 260)}ms`
        } : null,
        ...o
      },
      onMouseEnter: l ? (h) => {
        h.currentTarget.style.background = "var(--ds-surface-2)";
      } : void 0,
      onMouseLeave: l ? (h) => {
        h.currentTarget.style.background = "transparent";
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
function mt({ src: e, nombre: r = "", tamano: n = 40, tono: a = "acento" }) {
  const [i, d] = ge.useState(!1), o = r.split(" ").filter(Boolean).slice(0, 2).map((l) => l[0]).join("").toUpperCase();
  return /* @__PURE__ */ t("div", { style: {
    width: n,
    height: n,
    flexShrink: 0,
    borderRadius: "var(--ds-r-pill)",
    background: a === "acento" ? "var(--ds-accent-soft)" : "var(--ds-surface-sunk)",
    color: a === "acento" ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: n * 0.34,
    fontWeight: 800,
    letterSpacing: "-0.02em"
  }, children: e && !i ? /* @__PURE__ */ t(
    "img",
    {
      src: e,
      alt: "",
      onError: () => d(!0),
      style: { width: "100%", height: "100%", objectFit: "cover" }
    }
  ) : o });
}
function Dr({ titulo: e, nota: r, accion: n, children: a, estilo: i }) {
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
  const [r, n] = H(
    () => typeof window < "u" && window.innerWidth <= e
  );
  return ie(() => {
    if (typeof window > "u" || !window.matchMedia) return;
    const a = window.matchMedia(`(max-width: ${e}px)`), i = (d) => n(d.matches);
    return n(a.matches), a.addEventListener("change", i), () => a.removeEventListener("change", i);
  }, [e]), r;
}
const tr = { containerType: "inline-size", minWidth: 0 };
function rr(e, r) {
  const n = Math.max(4, String(r ?? "").length);
  return `min(${e}, calc(100cqi / ${(n * 0.62).toFixed(2)}))`;
}
const Ir = /* @__PURE__ */ t(
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
), Lr = /* @__PURE__ */ t(
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
), et = {
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
function Rr({ ruta: e = [], estilo: r }) {
  const n = ye();
  if (e.length === 0) return null;
  const a = e[e.length - 1], i = e.length > 1 ? e[e.length - 2] : null, d = i && i.ir ? /* @__PURE__ */ u(
    "button",
    {
      onClick: i.ir,
      style: { ...et, color: "var(--ds-ink-2)", fontWeight: 700 },
      onMouseEnter: (o) => {
        o.currentTarget.style.color = "var(--ds-accent-tinta)";
      },
      onMouseLeave: (o) => {
        o.currentTarget.style.color = "var(--ds-ink-2)";
      },
      children: [
        Lr,
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
    }, children: e.map((o, s) => {
      const c = s === e.length - 1;
      return /* @__PURE__ */ u("li", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        minWidth: 0
      }, children: [
        s > 0 && /* @__PURE__ */ t("span", { style: { color: "var(--ds-ink-3)", display: "inline-flex" }, children: Ir }),
        c ? /* @__PURE__ */ t("span", { "aria-current": "page", style: {
          ...et,
          cursor: "default",
          color: "var(--ds-ink)",
          fontWeight: 700
        }, children: o.texto }) : /* @__PURE__ */ t(
          "button",
          {
            onClick: o.ir,
            style: et,
            onMouseEnter: (l) => {
              l.currentTarget.style.color = "var(--ds-ink)";
            },
            onMouseLeave: (l) => {
              l.currentTarget.style.color = "var(--ds-ink-3)";
            },
            children: o.texto
          }
        )
      ] }, `${o.texto}-${s}`);
    }) }) }),
    /* @__PURE__ */ t("span", { style: { flex: 1 } }),
    a == null ? void 0 : a.accion
  ] });
}
function Fn({ marca: e, secciones: r = [], activa: n, onIr: a, derecha: i, estilo: d }) {
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
      const s = o.id === n;
      return /* @__PURE__ */ u(
        "button",
        {
          onClick: () => a == null ? void 0 : a(o),
          "aria-current": s ? "page" : void 0,
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
            background: s ? "rgba(255,255,255,0.14)" : "transparent",
            color: s ? "#FFFFFF" : "rgba(255,255,255,0.62)",
            transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
          },
          onMouseEnter: (c) => {
            s || (c.currentTarget.style.color = "#FFFFFF");
          },
          onMouseLeave: (c) => {
            s || (c.currentTarget.style.color = "rgba(255,255,255,0.62)");
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
function En({
  imagen: e,
  imagenChica: r,
  alt: n = "",
  alto: a = 200,
  children: i,
  pie: d,
  radio: o = "var(--ds-r-card)",
  encima: s = !0,
  encuadre: c = "center",
  fondo: l = !1,
  estilo: h,
  entrada: p,
  ...v
}) {
  const [f, y] = ge.useState(!1), m = ({ estiloExtra: g }) => /* @__PURE__ */ t(
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
        ...g
      }
    }
  );
  return l ? /* @__PURE__ */ u(
    "div",
    {
      ...v,
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
        ...h
      },
      children: [
        e && !f && /* Bajo un velo denso los colores se apagan y la foto se vuelve una
        mancha. Se compensa saturando por debajo: la escena se reconoce
        sin aclarar el velo, que es lo que sostiene la lectura. */
        /* @__PURE__ */ t("div", { "aria-hidden": !0, style: {
          position: "absolute",
          inset: 0,
          zIndex: 0,
          filter: "saturate(1.35) contrast(1.06)"
        }, children: /* @__PURE__ */ t(m, {}) }),
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
      ...v,
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
        ...h
      },
      children: [
        /* @__PURE__ */ u("div", { style: { position: "relative", height: a, flexShrink: 0, overflow: "hidden" }, children: [
          e && !f ? /* @__PURE__ */ t(m, {}) : (
            /* Sin imagen no se finge una: el hueco se resuelve con el material
               del sistema, no con una foto de archivo. */
            /* @__PURE__ */ t("div", { style: { width: "100%", height: "100%", background: "var(--ds-hero)" } })
          ),
          s && i && /* @__PURE__ */ u(J, { children: [
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
        (d || !s && i) && /* @__PURE__ */ t("div", { style: { padding: "var(--ds-4)" }, children: d || i })
      ]
    }
  );
}
function Ar({
  icono: e,
  etiqueta: r,
  nota: n,
  color: a,
  onClick: i,
  ancho: d = 1,
  entrada: o,
  estilo: s
}) {
  const [c, l] = ge.useState(!1), h = a || "var(--ds-accent)", p = `color-mix(in oklab, ${h}, var(--ds-mezcla-tono))`;
  return /* @__PURE__ */ u(
    "button",
    {
      onClick: i,
      onMouseEnter: () => l(!0),
      onMouseLeave: () => l(!1),
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
        border: `1px solid ${c ? h + "55" : "var(--ds-line)"}`,
        background: `linear-gradient(150deg, ${h}${c ? "30" : "1F"} 0%, ${h}0D 100%), var(--ds-surface)`,
        boxShadow: c ? "var(--ds-lift-2)" : "none",
        transform: c ? "translateY(-3px)" : "none",
        transition: "transform var(--ds-t-state) var(--ds-ease), box-shadow var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease)",
        animation: o !== void 0 ? `ds-rise var(--ds-t-move) var(--ds-ease) ${Math.min(o * 28, 220)}ms both` : void 0,
        ...s
      },
      children: [
        /* @__PURE__ */ t("span", { style: {
          display: "grid",
          placeItems: "center",
          width: 46,
          height: 46,
          borderRadius: "var(--ds-r-item)",
          background: `${h}2E`,
          color: p,
          boxShadow: c ? `0 6px 16px -6px ${h}88` : "none",
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
function Cn({
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
const St = /* @__PURE__ */ new Map(), $t = (e) => String(e ?? "").split("/").filter(Boolean).length;
function Fr(e, r, n) {
  const a = getComputedStyle(e).getPropertyValue(r).trim();
  return a.endsWith("ms") ? parseFloat(a) : a.endsWith("s") ? parseFloat(a) * 1e3 : n;
}
function Er({ vista: e, eje: r = "auto", ambito: n = "vista", children: a, estilo: i }) {
  const d = K(null);
  return Ae(() => {
    var h, p;
    const o = d.current, s = St.get(n);
    if (St.set(n, e), !o || e === void 0 || s === void 0 || s === e || typeof o.animate != "function" || (p = (h = window.matchMedia) == null ? void 0 : h.call(window, "(prefers-reduced-motion: reduce)")) != null && p.matches) return;
    const c = r === "y" ? 0 : $t(e) - $t(s), l = c > 0 ? { left: "24px", top: "0px" } : c < 0 ? { left: "-24px", top: "0px" } : { left: "0px", top: "14px" };
    o.animate(
      [{ opacity: 0, ...l }, { opacity: 1, left: "0px", top: "0px" }],
      {
        duration: Fr(o, "--ds-t-vista", 320),
        easing: getComputedStyle(o).getPropertyValue("--ds-ease").trim() || "cubic-bezier(0.16, 1, 0.3, 1)",
        /* `fill: none`: al acabar no queda ningún valor pegado al contenedor. */
        fill: "none"
      }
    );
  }, [e, r, n]), /* @__PURE__ */ t("div", { ref: d, style: { position: "relative", minWidth: 0, ...i }, children: a });
}
const nr = "ds-nav", ct = ["topbar", "sidebar", "dock"], Xe = 64, ar = Ut({ modo: "topbar", fijarModo: () => {
} }), gt = () => Qt(ar);
function Cr() {
  try {
    const e = localStorage.getItem(nr);
    if (ct.includes(e)) return e;
  } catch {
  }
  return "topbar";
}
const ir = {
  background: "var(--ds-frame)",
  backdropFilter: "var(--ds-blur)",
  WebkitBackdropFilter: "var(--ds-blur)",
  border: "1px solid var(--ds-line)"
};
function or({ marca: e }) {
  return /* @__PURE__ */ t("div", { style: {
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
function jr({ s: e, esta: r, onIr: n, conTexto: a = !0 }) {
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
        padding: a ? "9px 16px" : "10px",
        borderRadius: "var(--ds-r-pill)",
        border: "1px solid transparent",
        cursor: "pointer",
        background: r ? "var(--ds-ink)" : "var(--ds-surface)",
        color: r ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
        boxShadow: r ? "var(--ds-lift-2)" : "none",
        transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease), transform var(--ds-t-tap) var(--ds-ease)"
      },
      onMouseEnter: (i) => {
        r || (i.currentTarget.style.background = "var(--ds-surface-solid)", i.currentTarget.style.color = "var(--ds-ink)");
      },
      onMouseLeave: (i) => {
        r || (i.currentTarget.style.background = "var(--ds-surface)", i.currentTarget.style.color = "var(--ds-ink-2)");
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
function Br({ marca: e, secciones: r, activa: n, onIr: a, derecha: i, migas: d, children: o }) {
  const s = ye(), c = K(null), [l, h] = H(56);
  Ae(() => {
    const v = c.current;
    if (!v) return;
    const f = () => h(v.getBoundingClientRect().height);
    f();
    const y = new ResizeObserver(f);
    return y.observe(v), () => y.disconnect();
  }, [s]);
  const p = /* @__PURE__ */ t("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "var(--ds-2)",
    flexWrap: s ? "nowrap" : "wrap",
    overflowX: s ? "auto" : "visible",
    scrollbarWidth: "none",
    minWidth: 0,
    ...s ? { width: "100%", paddingBottom: 2 } : { flex: 1 }
  }, children: r.map((v) => /* @__PURE__ */ t(jr, { s: v, esta: v.id === n, onIr: a }, v.id)) });
  return /* @__PURE__ */ u("div", { style: { minHeight: "100%", padding: "var(--ds-4)" }, children: [
    /* @__PURE__ */ u("header", { ref: c, style: {
      ...ir,
      display: "flex",
      alignItems: "center",
      gap: "var(--ds-2)",
      padding: s ? "var(--ds-3)" : "var(--ds-2) var(--ds-3)",
      borderRadius: s ? "var(--ds-r-card)" : "var(--ds-r-pill)",
      boxShadow: "var(--ds-lift-2)",
      position: "fixed",
      top: "var(--ds-4)",
      left: "var(--ds-4)",
      right: "var(--ds-4)",
      zIndex: 30,
      flexWrap: "wrap",
      rowGap: "var(--ds-3)"
    }, children: [
      /* @__PURE__ */ t("div", { style: { paddingLeft: s ? 2 : 8, paddingRight: 8 }, children: /* @__PURE__ */ t(or, { marca: e }) }),
      !s && p,
      /* @__PURE__ */ t("div", { style: { flex: s ? 1 : "0 0 auto", display: "flex", justifyContent: "flex-end" }, children: i }),
      s && p
    ] }),
    /* @__PURE__ */ u("main", { style: { paddingTop: l + 20 }, children: [
      d,
      o
    ] })
  ] });
}
function Or({ marca: e, secciones: r, activa: n, onIr: a, derecha: i, migas: d, children: o }) {
  const s = ye(), [c, l] = H(!0), h = c && !s, p = h ? 244 : 64;
  return /* @__PURE__ */ u("div", { style: { minHeight: "100%", padding: "var(--ds-4)" }, children: [
    /* @__PURE__ */ u("aside", { style: {
      ...ir,
      width: p,
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
        h && /* @__PURE__ */ t(or, { marca: e }),
        !s && /* @__PURE__ */ t(
          "button",
          {
            onClick: () => l((f) => !f),
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
                children: /* @__PURE__ */ t("path", { d: h ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6" })
              }
            )
          }
        )
      ] }),
      r.map((f) => {
        const y = f.id === n;
        return /* @__PURE__ */ u(
          "button",
          {
            onClick: () => a == null ? void 0 : a(f),
            title: f.texto,
            "aria-current": y ? "page" : void 0,
            style: {
              display: "flex",
              alignItems: "center",
              gap: 11,
              justifyContent: h ? "flex-start" : "center",
              fontFamily: "var(--ds-font)",
              fontSize: "var(--ds-t-small)",
              fontWeight: 700,
              padding: h ? "11px 13px" : "11px 0",
              borderRadius: "var(--ds-r-item)",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              /* El activo se ELEVA en una tarjeta sólida, como en la referencia:
                 no se marca con una línea de color al costado. */
              background: y ? "var(--ds-surface-solid)" : "transparent",
              color: y ? "var(--ds-ink)" : "var(--ds-ink-2)",
              boxShadow: y ? "var(--ds-lift-1)" : "none",
              transition: "background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
            },
            onMouseEnter: (m) => {
              y || (m.currentTarget.style.background = "var(--ds-surface-2)");
            },
            onMouseLeave: (m) => {
              y || (m.currentTarget.style.background = "transparent");
            },
            children: [
              /* @__PURE__ */ t("span", { style: {
                display: "grid",
                placeItems: "center",
                width: 18,
                height: 18,
                flexShrink: 0,
                color: y ? "var(--ds-accent-tinta)" : "inherit"
              }, children: f.icono || "•" }),
              h && f.texto
            ]
          },
          f.id
        );
      }),
      /* @__PURE__ */ t("div", { style: { flex: 1 } }),
      i ? /* @__PURE__ */ t("div", { style: {
        paddingTop: "var(--ds-3)",
        marginTop: "var(--ds-1)",
        borderTop: "1px solid var(--ds-line)",
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--ds-2)",
        justifyContent: h ? "flex-start" : "center"
      }, children: i }) : null
    ] }),
    /* @__PURE__ */ u("main", { style: {
      minWidth: 0,
      marginLeft: p + 16,
      transition: "margin-left var(--ds-t-move) var(--ds-ease)"
    }, children: [
      d,
      o
    ] })
  ] });
}
function qr({
  marca: e,
  icono: r,
  secciones: n,
  activa: a,
  onIr: i,
  derecha: d,
  inicio: o,
  inicioAbierto: s = !1,
  onInicioAbierto: c,
  migas: l,
  children: h
}) {
  return /* @__PURE__ */ u("div", { style: {
    minHeight: "100%",
    padding: "var(--ds-4)",
    paddingBottom: `calc(${Xe}px + var(--ds-6))`
  }, children: [
    /* @__PURE__ */ u("main", { children: [
      l,
      h
    ] }),
    /* @__PURE__ */ u("nav", { "aria-label": "Navegación principal", style: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 40,
      height: Xe,
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
      /* @__PURE__ */ t("div", { style: {
        flex: "1 1 0",
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: "var(--ds-1)"
      }, children: o && /* @__PURE__ */ t(
        Hr,
        {
          abierto: s,
          icono: r,
          onClick: () => c == null ? void 0 : c(!s)
        }
      ) }),
      /* @__PURE__ */ t("div", { style: {
        flex: "0 1 auto",
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        overflowX: "auto",
        scrollbarWidth: "none"
      }, children: /* @__PURE__ */ t("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--ds-1)",
        margin: "0 auto"
      }, children: n.map((p) => {
        const v = p.id === a;
        return /* @__PURE__ */ u(
          "button",
          {
            onClick: () => i == null ? void 0 : i(p),
            title: p.texto,
            "aria-current": v ? "page" : void 0,
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
              background: v ? "var(--ds-ink)" : "transparent",
              color: v ? "var(--ds-surface-solid)" : "var(--ds-ink-2)",
              transition: "transform var(--ds-t-state) var(--ds-ease), background var(--ds-t-state) var(--ds-ease), color var(--ds-t-state) var(--ds-ease)"
            },
            onMouseEnter: (f) => {
              f.currentTarget.style.transform = "translateY(-3px)", v || (f.currentTarget.style.background = "var(--ds-surface-2)", f.currentTarget.style.color = "var(--ds-ink)");
            },
            onMouseLeave: (f) => {
              f.currentTarget.style.transform = "none", v || (f.currentTarget.style.background = "transparent", f.currentTarget.style.color = "var(--ds-ink-2)");
            },
            children: [
              /* @__PURE__ */ t("span", { style: { display: "grid", placeItems: "center", height: 19 }, children: p.icono || "•" }),
              p.texto
            ]
          },
          p.id
        );
      }) }) }),
      /* @__PURE__ */ t("div", { style: {
        flex: "1 1 0",
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "var(--ds-2)"
      }, children: d })
    ] }),
    o
  ] });
}
function Hr({ abierto: e, onClick: r, icono: n }) {
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
function jn({
  marca: e,
  icono: r,
  secciones: n = [],
  activa: a,
  onIr: i,
  derecha: d,
  inicio: o,
  inicioAbierto: s,
  onInicioAbierto: c,
  migas: l,
  modo: h,
  vista: p,
  children: v
}) {
  const [f, y] = H(() => h || Cr());
  ie(() => {
    p !== void 0 && window.scrollTo({ top: 0, left: 0 });
  }, [p]), ie(() => {
    if (h) {
      y(h);
      return;
    }
    try {
      localStorage.setItem(nr, f);
    } catch {
    }
  }, [f, h]);
  const m = se((M) => {
    ct.includes(M) && y(M);
  }, []), b = {
    marca: e,
    icono: r,
    secciones: n,
    activa: a,
    onIr: i,
    derecha: d,
    inicio: o,
    inicioAbierto: s,
    onInicioAbierto: c,
    migas: null,
    children: /* @__PURE__ */ u(Er, { vista: p, children: [
      l,
      v
    ] })
  }, x = f === "sidebar" ? Or : f === "dock" ? qr : Br;
  return /* @__PURE__ */ t(ar.Provider, { value: { modo: f, fijarModo: m, modos: ct }, children: /* @__PURE__ */ t(x, { ...b }) });
}
function Bn() {
  const { modo: e, fijarModo: r } = gt(), [n, a] = H(!1), [i, d] = H(null), o = K(null), s = K(null), c = [
    { id: "topbar", texto: "Barra arriba", icono: "M3 5h18M3 5v14h18V5" },
    { id: "sidebar", texto: "Menú lateral", icono: "M3 5h18v14H3zM9 5v14" },
    { id: "dock", texto: "Dock abajo", icono: "M3 5h18v14H3zM3 15h18" }
  ], l = c.find((v) => v.id === e) || c[0], h = e === "dock";
  Ae(() => {
    if (!n) return;
    const v = 8, f = () => {
      var k, N, T;
      const m = (k = o.current) == null ? void 0 : k.getBoundingClientRect();
      if (!m) return;
      const g = ((N = s.current) == null ? void 0 : N.offsetWidth) || 190, b = ((T = s.current) == null ? void 0 : T.offsetHeight) || 160;
      let M = m.left + m.width / 2 < window.innerWidth / 2 ? m.left : m.right - g;
      M = Math.min(Math.max(v, M), window.innerWidth - g - v);
      let w = h ? m.top - b - 10 : m.bottom + 10;
      w = Math.min(Math.max(v, w), window.innerHeight - b - v), d({ izq: M, arriba: w });
    };
    f();
    const y = requestAnimationFrame(f);
    return window.addEventListener("resize", f), window.addEventListener("scroll", f, !0), () => {
      cancelAnimationFrame(y), window.removeEventListener("resize", f), window.removeEventListener("scroll", f, !0);
    };
  }, [n, h]), ie(() => {
    if (!n) return;
    const v = (y) => {
      y.key === "Escape" && (y.stopPropagation(), a(!1));
    }, f = (y) => {
      var m, g;
      (m = o.current) != null && m.contains(y.target) || (g = s.current) != null && g.contains(y.target) || a(!1);
    };
    return document.addEventListener("keydown", v, !0), document.addEventListener("mousedown", f, !0), () => {
      document.removeEventListener("keydown", v, !0), document.removeEventListener("mousedown", f, !0);
    };
  }, [n]);
  const p = (v) => /* @__PURE__ */ t(
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
      children: /* @__PURE__ */ t("path", { d: v })
    }
  );
  return /* @__PURE__ */ u("div", { ref: o, style: { position: "relative", flexShrink: 0 }, children: [
    /* @__PURE__ */ t(
      "button",
      {
        onClick: () => a((v) => !v),
        "aria-haspopup": "menu",
        "aria-expanded": n,
        title: `Navegación: ${l.texto}`,
        "aria-label": `Navegación: ${l.texto}`,
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
        children: p(l.icono)
      }
    ),
    n && i && Zt(/* @__PURE__ */ u("div", { role: "menu", ref: s, style: {
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
      animation: `${h ? "ds-sube" : "ds-baja"} var(--ds-t-state) var(--ds-ease) both`
    }, children: [
      /* @__PURE__ */ t("div", { style: {
        fontSize: "var(--ds-t-micro)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)",
        padding: "4px 10px 7px"
      }, children: "Navegación" }),
      c.map((v) => {
        const f = v.id === e;
        return /* @__PURE__ */ u(
          "button",
          {
            role: "menuitemradio",
            "aria-checked": f,
            onClick: () => {
              r(v.id), a(!1);
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
              background: f ? "var(--ds-accent-soft)" : "transparent",
              color: f ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)",
              transition: "background var(--ds-t-state) var(--ds-ease)"
            },
            onMouseEnter: (y) => {
              f || (y.currentTarget.style.background = "var(--ds-surface-2)");
            },
            onMouseLeave: (y) => {
              f || (y.currentTarget.style.background = "transparent");
            },
            children: [
              p(v.icono),
              /* @__PURE__ */ t("span", { style: { flex: 1 }, children: v.texto }),
              f && /* @__PURE__ */ t(
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
          v.id
        );
      })
    ] }), document.body)
  ] });
}
function Mt({ marcada: e = !1, onCambio: r, etiqueta: n, deshabilitado: a = !1 }) {
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
function On({ cantidad: e = 0, onQuitar: r, children: n, singular: a = "seleccionado", plural: i = "seleccionados" }) {
  const { modo: d } = gt();
  return e ? /* @__PURE__ */ t("div", { role: "region", "aria-label": "Acciones sobre la selección", style: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: d === "dock" ? Xe : 0,
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
    /* @__PURE__ */ t(_e, { variante: "fantasma", onClick: r, children: "Quitar selección" })
  ] }) }) : null;
}
function qn({
  columnas: e = [],
  filas: r = [],
  claveFila: n,
  onFila: a,
  vacio: i = "No hay nada que mostrar.",
  cargando: d = !1,
  porPagina: o = 0,
  seleccion: s,
  estilo: c
}) {
  const [l, h] = H(1), p = r.length, v = o > 0 && p > o, f = v ? Math.ceil(p / o) : 1;
  ie(
    () => {
      h((W) => Math.min(Math.max(1, W), Math.max(1, f)));
    },
    [f, p]
  ), ie(() => {
    h(1);
  }, [o]);
  const y = fe(() => v ? r.slice((l - 1) * o, l * o) : r, [r, l, o, v]), m = !!(s && n), g = fe(() => new Set(((s == null ? void 0 : s.elegidos) || []).map(String)), [s == null ? void 0 : s.elegidos]), b = fe(
    () => m ? r.map((W) => String(n(W))) : [],
    [m, r, n]
  ), x = b.filter((W) => g.has(W)).length, M = x === 0 ? !1 : x === b.length ? !0 : "mixta", w = () => s.onCambio(M === !0 ? [] : b), k = (W) => s.onCambio(g.has(W) ? [...g].filter((L) => L !== W) : [...g, W]), N = e.length + (m ? 1 : 0), T = p === 0 ? 0 : (l - 1) * o + 1, S = v ? Math.min(l * o, p) : p;
  return /* @__PURE__ */ u("div", { style: c, children: [
    /* @__PURE__ */ t("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ u("table", { style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--ds-font)"
    }, children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ u("tr", { children: [
        m && /* @__PURE__ */ t("th", { scope: "col", style: {
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: 36,
          padding: "0 var(--ds-2) var(--ds-3) var(--ds-3)",
          background: "var(--ds-surface-solid)",
          borderBottom: "1px solid var(--ds-line)"
        }, children: /* @__PURE__ */ t(
          Mt,
          {
            marcada: M,
            onCambio: w,
            deshabilitado: b.length === 0,
            etiqueta: M === !0 ? "Quitar todos" : "Elegir todos"
          }
        ) }),
        e.map((W) => /* @__PURE__ */ t("th", { scope: "col", style: {
          position: "sticky",
          top: 0,
          zIndex: 1,
          textAlign: W.numerica ? "right" : "left",
          fontSize: "var(--ds-t-micro)",
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "var(--ds-ink-3)",
          padding: "0 var(--ds-3) var(--ds-3)",
          whiteSpace: "nowrap",
          background: "var(--ds-surface-solid)",
          borderBottom: "1px solid var(--ds-line)"
        }, children: W.titulo }, W.clave))
      ] }) }),
      /* @__PURE__ */ u("tbody", { children: [
        d && Array.from(
          { length: Math.max(3, Math.min(o || 6, 8)) },
          (W, L) => /* @__PURE__ */ u("tr", { style: { opacity: 1 - L * 0.1 }, children: [
            m && /* @__PURE__ */ t("td", { style: { borderBottom: "1px solid var(--ds-line)" } }),
            e.map((R, B) => /* @__PURE__ */ t("td", { style: {
              padding: "var(--ds-3)",
              borderBottom: "1px solid var(--ds-line)"
            }, children: /* @__PURE__ */ u("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: "var(--ds-3)",
              justifyContent: R.numerica ? "flex-end" : "flex-start"
            }, children: [
              B === 0 && /* @__PURE__ */ t(Q, { circulo: !0, alto: 36 }),
              /* @__PURE__ */ t(Q, { alto: 11, ancho: B === 0 ? "58%" : R.numerica ? 46 : "72%" })
            ] }) }, R.clave))
          ] }, `esq-${L}`)
        ),
        !d && p === 0 && /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t("td", { colSpan: N, style: {
          padding: "var(--ds-8) 0",
          textAlign: "center",
          color: "var(--ds-ink-3)",
          fontSize: "var(--ds-t-body)"
        }, children: i }) }),
        !d && y.map((W, L) => {
          const R = !!a, B = m ? String(n(W)) : null, Y = m && g.has(B), $ = Y ? "var(--ds-accent-soft)" : "transparent";
          return /* @__PURE__ */ u(
            "tr",
            {
              "aria-selected": m ? Y : void 0,
              onClick: R ? () => a(W) : void 0,
              style: {
                cursor: R ? "pointer" : void 0,
                background: $,
                transition: "background var(--ds-t-state) var(--ds-ease)"
              },
              onMouseEnter: R ? (C) => {
                C.currentTarget.style.background = "var(--ds-surface-2)";
              } : void 0,
              onMouseLeave: R ? (C) => {
                C.currentTarget.style.background = $;
              } : void 0,
              children: [
                m && /* @__PURE__ */ t("td", { style: {
                  padding: "var(--ds-3) var(--ds-2) var(--ds-3) var(--ds-3)",
                  width: 36,
                  verticalAlign: "middle",
                  borderBottom: "1px solid var(--ds-line)"
                }, children: /* @__PURE__ */ t(
                  Mt,
                  {
                    marcada: Y,
                    onCambio: () => k(B),
                    etiqueta: s.etiqueta ? s.etiqueta(W) : "Elegir renglón"
                  }
                ) }),
                e.map((C) => /* @__PURE__ */ t(
                  "td",
                  {
                    className: C.numerica ? "ds-num" : void 0,
                    style: {
                      textAlign: C.numerica ? "right" : "left",
                      fontSize: "var(--ds-t-small)",
                      fontWeight: C.fuerte ? 700 : 500,
                      color: C.fuerte ? "var(--ds-ink)" : "var(--ds-ink-2)",
                      padding: "var(--ds-3)",
                      verticalAlign: "middle",
                      borderBottom: "1px solid var(--ds-line)"
                    },
                    children: C.render ? C.render(W) : W[C.clave]
                  },
                  C.clave
                ))
              ]
            },
            n ? n(W) : L
          );
        })
      ] })
    ] }) }),
    v && !d && /* @__PURE__ */ u("div", { style: {
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
        T,
        "–",
        S,
        " de ",
        p
      ] }),
      /* @__PURE__ */ t("span", { style: { flex: 1 } }),
      /* @__PURE__ */ t(
        Wt,
        {
          texto: "Anterior",
          hacia: "M15 18l-6-6 6-6",
          inactivo: l <= 1,
          onClick: () => h((W) => Math.max(1, W - 1))
        }
      ),
      /* @__PURE__ */ u("span", { className: "ds-num", style: {
        fontSize: "var(--ds-t-small)",
        fontWeight: 700,
        color: "var(--ds-ink-2)"
      }, children: [
        l,
        " / ",
        f
      ] }),
      /* @__PURE__ */ t(
        Wt,
        {
          texto: "Siguiente",
          hacia: "M9 18l6-6-6-6",
          inactivo: l >= f,
          derecha: !0,
          onClick: () => h((W) => Math.min(f, W + 1))
        }
      )
    ] })
  ] });
}
function Wt({ texto: e, hacia: r, inactivo: n, derecha: a, onClick: i }) {
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
function Vr({
  abierto: e,
  onCerrar: r,
  titulo: n,
  nota: a,
  children: i,
  acciones: d,
  ancho: o = 560,
  estilo: s,
  lado: c
}) {
  const l = c === "derecha", h = K(null), p = K(null), v = K(r);
  return v.current = r, ie(() => {
    if (!e) return;
    p.current = document.activeElement;
    const f = (m) => {
      var g;
      m.key === "Escape" && (m.stopPropagation(), (g = v.current) == null || g.call(v));
    };
    document.addEventListener("keydown", f, !0);
    const y = setTimeout(() => {
      var m;
      return (m = h.current) == null ? void 0 : m.focus();
    }, 40);
    return () => {
      var m, g;
      document.removeEventListener("keydown", f, !0), clearTimeout(y);
      try {
        (g = (m = p.current) == null ? void 0 : m.focus) == null || g.call(m);
      } catch {
      }
    };
  }, [e]), e ? /* @__PURE__ */ u(J, { children: [
    !l && /* @__PURE__ */ t(
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
        ref: h,
        role: "dialog",
        "aria-modal": l ? "false" : "true",
        "aria-label": n,
        tabIndex: -1,
        style: {
          position: "fixed",
          zIndex: 61,
          outline: "none",
          ...l ? { right: "var(--ds-4)", top: "50%", transform: "translateY(-50%)" } : { left: "50%", top: "50%", transform: "translate(-50%, -50%)" },
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
          animation: `${l ? "ds-modal-lado" : "ds-modal"} var(--ds-t-move) var(--ds-ease) both`,
          ...s
        },
        children: [
          l && /* @__PURE__ */ t(
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
            paddingRight: l ? 64 : void 0
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
const Tt = {
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
function Hn({ abierto: e, severidad: r = "info", titulo: n, mensaje: a, onCerrar: i, acciones: d }) {
  const o = Tt[r] || Tt.info, s = se(() => i == null ? void 0 : i(), [i]), c = (d || []).some((l) => l.cierra);
  return /* @__PURE__ */ t(Vr, { abierto: e, onCerrar: s, ancho: 420, children: /* @__PURE__ */ u("div", { style: { textAlign: "center", padding: "var(--ds-2) 0" }, children: [
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
      (d || []).map((l, h) => /* @__PURE__ */ t(
        _e,
        {
          variante: l.primaria ? "solido" : "contorno",
          onClick: () => {
            var p;
            (p = l.onClick) == null || p.call(l), s();
          },
          children: l.texto
        },
        h
      )),
      !c && /* @__PURE__ */ t(_e, { variante: (d || []).length ? "fantasma" : "solido", onClick: s, children: "Entendido" })
    ] })
  ] }) });
}
function Pr(e) {
  return e.length <= 1 ? e[0] || "" : `${e.slice(0, -1).join(", ")} y ${e[e.length - 1]}`;
}
function Vn({
  titulo: e,
  nota: r,
  children: n,
  onCancelar: a,
  cancelarTexto: i = "Cancelar",
  accion: d,
  ancho: o = 820,
  problemas: s = [],
  refCuerpo: c
}) {
  const { modo: l } = gt(), h = l === "dock" ? Xe : 0;
  return /* @__PURE__ */ u("div", { style: { maxWidth: o, margin: "0 auto", paddingBottom: 96 + h }, children: [
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
    s.length > 0 && /* `role="alert"` para que un lector de pantalla lo anuncie en cuanto
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
        s.length === 1 ? /* @__PURE__ */ u(J, { children: [
          "Falta revisar ",
          /* @__PURE__ */ t("b", { children: s[0] }),
          "."
        ] }) : /* @__PURE__ */ u(J, { children: [
          "Faltan ",
          s.length,
          " datos: ",
          /* @__PURE__ */ t("b", { children: Pr(s) }),
          "."
        ] }),
        " ",
        "Cada campo dice abajo qué necesita."
      ] })
    ] }),
    /* @__PURE__ */ t(we, { entrada: 0, children: /* @__PURE__ */ t("div", { ref: c, children: n }) }),
    /* @__PURE__ */ t("div", { style: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: h,
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
      /* @__PURE__ */ t(_e, { variante: "fantasma", onClick: a, children: i }),
      d
    ] }) })
  ] });
}
function Pn({ children: e, minimo: r = 220, estilo: n }) {
  return /* @__PURE__ */ t("div", { style: {
    display: "grid",
    gap: "var(--ds-4)",
    gridTemplateColumns: `repeat(auto-fit, minmax(${r}px, 1fr))`,
    ...n
  }, children: e });
}
const Se = (e) => e == null || String(e).trim() === "", _n = (e = "Este dato es obligatorio.") => (r) => Se(r) ? e : null, Xn = (e, r) => (n) => !Se(n) && String(n).trim().length > e ? r || `No puede pasar de ${e} caracteres; llevas ${String(n).trim().length}.` : null, Yn = (e, r) => (n) => !Se(n) && String(n).trim().length < e ? r || `Necesita al menos ${e} caracteres.` : null, Gn = ({ desde: e = null, hasta: r = null, mensaje: n } = {}) => (a) => {
  if (Se(a)) return null;
  const i = Number(String(a).replace(/,/g, ""));
  return Number.isNaN(i) ? n || "Tiene que ser un número." : e !== null && i < e ? n || `Tiene que ser un número mayor o igual a ${e}.` : r !== null && i > r ? n || `No puede pasar de ${r}.` : null;
}, Kn = (e, r, n) => (a) => {
  if (Se(a)) return null;
  const i = String(a).replace(/\D/g, "").length;
  return i < e || i > r ? n || `Debe tener de ${e} a ${r} dígitos.` : null;
}, Qn = (e, r) => (n) => !Se(n) && !new RegExp(`^\\d{${e}}$`).test(String(n).trim()) ? r || `Debe tener exactamente ${e} dígitos, sin espacios ni guiones.` : null, Un = (e = "El correo debe llevar arroba y dominio, como nombre@dominio.com.") => (r) => !Se(r) && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(r).trim()) ? e : null, Zn = (e, r) => (n) => !Se(n) && !e.test(String(n).trim()) ? r : null, Jn = (e, r) => (n, a) => e(n, a) ? null : r;
function ea(e) {
  const r = fe(() => Object.fromEntries(
    Object.entries(e).map(([g, b]) => [g, b.valor ?? ""])
  ), []), [n, a] = H(r), [i, d] = H({}), [o, s] = H(!1), c = K(null), l = fe(() => {
    const g = {};
    return Object.entries(e).forEach(([b, x]) => {
      for (const M of x.reglas || []) {
        const w = M(n[b], n);
        if (w) {
          g[b] = w;
          break;
        }
      }
    }), g;
  }, [n, e]), h = se((g) => (b) => {
    a((x) => ({ ...x, [g]: b }));
  }, []), p = se((g) => () => {
    d((b) => b[g] ? b : { ...b, [g]: !0 });
  }, []), v = se((g) => {
    const b = e[g] || {}, x = o || i[g];
    return {
      etiqueta: b.etiqueta,
      valor: n[g] ?? "",
      onCambio: h(g),
      onSalir: p(g),
      error: x ? l[g] : void 0,
      ayuda: b.ayuda,
      /* Obligatorio = alguna de sus reglas se queja del vacío. Se pregunta a
         la regla en vez de pedir una bandera aparte, que es la forma fácil de
         que el asterisco y la validación acaben diciendo cosas distintas. */
      requerido: (b.reglas || []).some((M) => {
        try {
          return M("", n) !== null;
        } catch {
          return !1;
        }
      })
    };
  }, [e, n, l, i, o, h, p]), f = fe(() => o ? Object.keys(l).map((g) => {
    var b;
    return ((b = e[g]) == null ? void 0 : b.etiqueta) || g;
  }) : [], [o, l, e]), y = se((g) => (s(!0), Object.keys(l).length > 0 ? (requestAnimationFrame(() => {
    var M;
    const b = (M = c.current) == null ? void 0 : M.querySelector('[data-error="si"]');
    b == null || b.scrollIntoView({ block: "center", behavior: "smooth" });
    const x = b == null ? void 0 : b.querySelector("input, textarea, select, [role='combobox']");
    try {
      x == null || x.focus({ preventScroll: !0 });
    } catch {
    }
  }), !1) : (g(n), !0)), [l, n]), m = se(() => {
    a(r), d({}), s(!1);
  }, [r]);
  return {
    valores: n,
    errores: l,
    problemas: f,
    intentado: o,
    campo: v,
    poner: h,
    marcar: p,
    intentar: y,
    limpiar: m,
    cuerpo: c,
    setValores: a
  };
}
const sr = (e) => `ds-filtros:${e}`, _r = (e) => {
  try {
    const r = sessionStorage.getItem(sr(e));
    return r ? JSON.parse(r) : null;
  } catch {
    return null;
  }
}, Xr = (e, r) => {
  try {
    sessionStorage.setItem(sr(e), JSON.stringify(r));
  } catch {
  }
};
function ta(e, r) {
  const n = K(r), [a, i] = H(() => {
    const c = _r(e);
    if (!c) return { ...n.current };
    const l = { ...n.current };
    return Object.keys(n.current).forEach((h) => {
      c[h] !== void 0 && (l[h] = c[h]);
    }), l;
  });
  ie(() => {
    Xr(e, a);
  }, [e, a]);
  const d = se((c, l) => {
    i((h) => ({ ...h, [c]: l }));
  }, []), o = se(() => {
    i({ ...n.current });
  }, []), s = Object.keys(n.current).some((c) => String(a[c] ?? "") !== String(n.current[c] ?? ""));
  return [a, d, o, s, i];
}
function ra({ pestanas: e = [], activa: r, onCambio: n, estilo: a }) {
  const i = K([]);
  return /* @__PURE__ */ t(
    "div",
    {
      role: "tablist",
      onKeyDown: (o) => {
        var h;
        const s = e.findIndex((p) => p.id === r), c = o.key === "ArrowRight" ? 1 : o.key === "ArrowLeft" ? -1 : 0;
        if (!c) return;
        o.preventDefault();
        const l = (s + c + e.length) % e.length;
        n == null || n(e[l].id), (h = i.current[l]) == null || h.focus();
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
      children: e.map((o, s) => {
        const c = o.id === r;
        return /* @__PURE__ */ u(
          "button",
          {
            role: "tab",
            "aria-selected": c,
            tabIndex: c ? 0 : -1,
            ref: (l) => {
              i.current[s] = l;
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
function na({ texto: e = "Cargando…", alto: r = 200 }) {
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
const Yr = /* @__PURE__ */ u(
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
), Gr = /* @__PURE__ */ t(
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
function tt({ children: e }) {
  return /* @__PURE__ */ t("div", { style: {
    fontSize: "var(--ds-t-small)",
    fontWeight: 800,
    color: "var(--ds-ink-2)",
    letterSpacing: "-0.01em",
    margin: "0 0 var(--ds-3)"
  }, children: e });
}
function zt({ item: e, onIr: r }) {
  const [n, a] = ge.useState(!1), i = e.color || "var(--ds-ink-2)";
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
        }, children: Gr })
      ]
    }
  );
}
function aa({
  abierto: e,
  onCerrar: r,
  usuario: n,
  acciones: a,
  recientes: i = [],
  tituloRecientes: d = "Reciente",
  grupos: o = [],
  busqueda: s = "",
  onBusqueda: c,
  resultados: l = null,
  marcadorBusqueda: h = "Buscar…",
  onIr: p
}) {
  const v = K(null), f = K(null);
  ie(() => {
    if (!e) return;
    const x = (w) => {
      w.key === "Escape" && (w.stopPropagation(), r == null || r());
    };
    document.addEventListener("keydown", x, !0);
    const M = setTimeout(() => {
      var w;
      return (w = v.current) == null ? void 0 : w.focus();
    }, 90);
    return () => {
      document.removeEventListener("keydown", x, !0), clearTimeout(M);
    };
  }, [e, r]);
  const y = se((x) => {
    var M;
    r == null || r(), (M = x.onIr || p) == null || M(x);
  }, [r, p]), m = s.trim().length > 0, g = m && l && l.length === 0, b = fe(() => {
    let x = 0;
    return o.map((M) => M.items.map(() => x++));
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
        ref: f,
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
          }, children: m ? /* @__PURE__ */ u("div", { children: [
            /* @__PURE__ */ t(tt, { children: g ? "Sin coincidencias" : "Resultados" }),
            g ? /* @__PURE__ */ u("div", { style: {
              padding: "var(--ds-8) 0",
              textAlign: "center",
              color: "var(--ds-ink-3)",
              fontSize: "var(--ds-t-body)"
            }, children: [
              "Nada coincide con «",
              s,
              "»."
            ] }) : (l || []).map((x) => /* @__PURE__ */ t(zt, { item: x, onIr: y }, x.id))
          ] }) : /* @__PURE__ */ u("div", { style: {
            display: "flex",
            gap: "var(--ds-5)",
            alignItems: "flex-start",
            flexWrap: "wrap"
          }, children: [
            /* @__PURE__ */ u("div", { style: { flex: "1 1 200px", minWidth: 190 }, children: [
              /* @__PURE__ */ t(tt, { children: d }),
              i.length > 0 ? i.map((x) => /* @__PURE__ */ t(zt, { item: x, onIr: y }, x.id)) : /* @__PURE__ */ t("div", { style: {
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
            }, children: o.map((x, M) => /* @__PURE__ */ u("div", { children: [
              /* @__PURE__ */ t(tt, { children: x.titulo }),
              /* @__PURE__ */ t("div", { style: {
                display: "grid",
                gap: "var(--ds-3)",
                gridTemplateColumns: "repeat(auto-fill, minmax(136px, 1fr))"
              }, children: x.items.map((w, k) => /* @__PURE__ */ t(
                Ar,
                {
                  icono: w.icono,
                  etiqueta: w.texto,
                  nota: w.subtitulo,
                  color: w.color,
                  ancho: w.ancho,
                  entrada: b[M][k],
                  onClick: () => y(w)
                },
                w.id
              )) })
            ] }, x.titulo)) })
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
            /* @__PURE__ */ t("span", { style: { color: "var(--ds-ink-3)", display: "grid", placeItems: "center" }, children: Yr }),
            /* @__PURE__ */ t(
              "input",
              {
                ref: v,
                value: s,
                onChange: (x) => c == null ? void 0 : c(x.target.value),
                placeholder: h,
                "aria-label": h,
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
            s && /* @__PURE__ */ t(
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
function Kr(e = {}) {
  ce = { ...ce, ...e };
}
const me = "—", Re = (e) => e == null || e === "" || Number.isNaN(Number(e));
function lr(e, { decimales: r, minimo: n } = {}) {
  return Re(e) ? me : new Intl.NumberFormat(ce.idioma, {
    minimumFractionDigits: r ?? n ?? 0,
    maximumFractionDigits: r ?? 2
  }).format(Number(e));
}
function ut(e, { moneda: r = ce.moneda, decimales: n = 2, compacto: a = !1 } = {}) {
  return Re(e) ? me : a ? new Intl.NumberFormat(ce.idioma, {
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
function dr(e, { decimales: r = 1 } = {}) {
  return Re(e) ? me : new Intl.NumberFormat(ce.idioma, {
    notation: "compact",
    maximumFractionDigits: r
  }).format(Number(e));
}
function U(e, { decimales: r = 1, enPuntos: n = !1, signo: a = !1 } = {}) {
  if (Re(e)) return me;
  const i = n ? Number(e) / 100 : Number(e);
  return new Intl.NumberFormat(ce.idioma, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: r,
    signDisplay: a ? "exceptZero" : "auto"
  }).format(i);
}
function cr(e) {
  if (e instanceof Date) return e;
  if (typeof e == "string" && /^\d{4}-\d{2}-\d{2}$/.test(e)) {
    const [r, n, a] = e.split("-").map(Number);
    return new Date(r, n - 1, a);
  }
  return new Date(e);
}
const Nt = {
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
function Z(e, r = "media") {
  if (e == null || e === "") return me;
  const n = cr(e);
  return Number.isNaN(n.getTime()) ? me : new Intl.DateTimeFormat(ce.idioma, {
    ...Nt[r] || Nt.media,
    timeZone: ce.zonaHoraria
  }).format(n).replace(/\.$/, "");
}
function yt(e, r = /* @__PURE__ */ new Date()) {
  if (e == null || e === "") return me;
  const n = cr(e);
  if (Number.isNaN(n.getTime())) return me;
  const a = (n.getTime() - r.getTime()) / 1e3, i = new Intl.RelativeTimeFormat(ce.idioma, { numeric: "auto" }), d = [
    ["year", 31536e3],
    ["month", 2592e3],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60]
  ];
  for (const [o, s] of d)
    if (Math.abs(a) >= s) return i.format(Math.round(a / s), o);
  return i.format(0, "minute");
}
function ur(e, r) {
  return Re(e) || Re(r) || Number(r) === 0 ? null : (Number(e) - Number(r)) / Math.abs(Number(r));
}
function ue(e, r = "numero", n) {
  if (typeof r == "function") return r(e);
  switch (r) {
    case "moneda":
      return ut(e, n);
    case "monedaCompacta":
      return ut(e, { ...n, compacto: !0 });
    case "compacto":
      return dr(e, n);
    case "porcentaje":
      return U(e, n);
    case "texto":
      return e == null || e === "" ? me : String(e);
    default:
      return lr(e, n);
  }
}
const ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SIN_DATO: me,
  compacto: dr,
  configurarFormato: Kr,
  fecha: Z,
  fechaRelativa: yt,
  formatear: ue,
  moneda: ut,
  numero: lr,
  porcentaje: U,
  variacion: ur
}, Symbol.toStringTag, { value: "Module" }));
function vr({
  valor: e,
  sentido: r = "sube",
  contra: n,
  decimales: a = 1,
  enPuntos: i = !1,
  tamano: d = "s",
  estilo: o
}) {
  const s = e == null || Number.isNaN(Number(e)), c = s ? 0 : Number(e), l = s || c === 0 ? 0 : c > 0 ? 1 : -1, h = r === "neutro" || l === 0 ? null : r === "sube" ? l > 0 : l < 0, p = h === null ? "var(--ds-ink-2)" : h ? "var(--ds-ok)" : "var(--ds-risk)", v = h === null ? "var(--ds-surface-sunk)" : h ? "var(--ds-ok-soft)" : "var(--ds-risk-soft)", f = l > 0 ? "▲" : l < 0 ? "▼" : "●", y = d === "m" ? "var(--ds-t-small)" : "var(--ds-t-micro)";
  if (s)
    return /* @__PURE__ */ t("span", { style: { fontSize: y, fontWeight: 600, color: "var(--ds-ink-3)", ...o }, children: "Sin comparativo" });
  const m = i ? `${c > 0 ? "+" : ""}${c.toFixed(a)} pts` : U(c, { decimales: a, signo: !0 });
  return /* @__PURE__ */ u("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, flexWrap: "wrap", ...o }, children: [
    /* @__PURE__ */ u(
      "span",
      {
        className: "ds-num",
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: v,
          color: p,
          fontSize: y,
          fontWeight: 800,
          padding: "2px 8px",
          borderRadius: "var(--ds-r-pill)",
          whiteSpace: "nowrap"
        },
        "aria-label": `${l > 0 ? "Sube" : l < 0 ? "Baja" : "Sin cambio"} ${m}${h === null ? "" : h ? ", favorable" : ", desfavorable"}`,
        children: [
          /* @__PURE__ */ t("span", { "aria-hidden": "true", style: { fontSize: "0.8em" }, children: f }),
          m
        ]
      }
    ),
    n && /* @__PURE__ */ t("span", { style: { fontSize: y, fontWeight: 600, color: "var(--ds-ink-3)" }, children: n })
  ] });
}
const Dt = [1, 2, 3, 4, 5, 6].map((e) => `var(--ds-serie-${e})`), de = (e, r) => (e == null ? void 0 : e.color) || Dt[r % Dt.length];
function We() {
  const [e, r] = H(0), n = K(null);
  return [se((i) => {
    n.current && (n.current.disconnect(), n.current = null), i && (r(i.getBoundingClientRect().width), !(typeof ResizeObserver > "u") && (n.current = new ResizeObserver(([d]) => r(d.contentRect.width)), n.current.observe(i)));
  }, []), e];
}
function bt(e, r, n = 4) {
  if (!Number.isFinite(e) || !Number.isFinite(r)) return { marcas: [0, 1], min: 0, max: 1 };
  e === r && (r = e === 0 ? 1 : r + Math.abs(r) * 0.1);
  const i = (r - e) / n, d = 10 ** Math.floor(Math.log10(i)), o = i / d, s = (o <= 1 ? 1 : o <= 2 ? 2 : o <= 2.5 ? 2.5 : o <= 5 ? 5 : 10) * d, c = Math.floor(e / s) * s, l = Math.ceil(r / s) * s, h = [];
  for (let p = c; p <= l + s / 2; p += s) h.push(Number(p.toFixed(10)));
  return { marcas: h, min: c, max: l };
}
const Ye = (e, r, n, a) => (i) => r === e ? (n + a) / 2 : n + (i - e) / (r - e) * (a - n), oe = {
  fontSize: 11,
  fontWeight: 600,
  fill: "var(--ds-ink-3)",
  fontFamily: "var(--ds-font)",
  fontVariantNumeric: "tabular-nums"
};
function Qe({ color: e, forma: r = "cuadro" }) {
  const n = { flexShrink: 0, background: e };
  return r === "linea" ? /* @__PURE__ */ t("span", { style: { ...n, width: 14, height: 3, borderRadius: "var(--ds-r-mini)" } }) : /* @__PURE__ */ t("span", { style: { ...n, width: 10, height: 10, borderRadius: "var(--ds-r-mini)" } });
}
function Qr({ series: e = [], forma: r, valores: n, estilo: a }) {
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
    /* @__PURE__ */ t(Qe, { color: de(i, d), forma: r }),
    i.nombre,
    n && n[d] !== void 0 && /* @__PURE__ */ t("span", { className: "ds-num", style: { color: "var(--ds-ink)", fontWeight: 700 }, children: n[d] })
  ] }, i.clave ?? i.nombre ?? d)) });
}
function Fe({ x: e, y: r, ancho: n, titulo: a, renglones: i = [], visible: d }) {
  const o = K(null), [s, c] = H({ w: 160, h: 60 });
  if (ie(() => {
    if (o.current) {
      const v = o.current.getBoundingClientRect();
      (Math.abs(v.width - s.w) > 1 || Math.abs(v.height - s.h) > 1) && c({ w: v.width, h: v.height });
    }
  }), !d) return null;
  const l = 12, h = e + l + s.w > n ? e - l - s.w : e + l, p = Math.max(0, r - s.h / 2);
  return /* @__PURE__ */ u("div", { ref: o, role: "status", style: {
    position: "absolute",
    left: Math.max(0, h),
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
    i.map((v, f) => /* @__PURE__ */ u("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: "var(--ds-t-small)",
      lineHeight: 1.6
    }, children: [
      v.color && /* @__PURE__ */ t(Qe, { color: v.color }),
      /* @__PURE__ */ t("span", { style: { color: "var(--ds-ink-2)", fontWeight: 600, flex: 1, minWidth: 0 }, children: v.nombre }),
      /* @__PURE__ */ t("span", { className: "ds-num", style: { color: "var(--ds-ink)", fontWeight: 800 }, children: v.valor })
    ] }, f))
  ] });
}
function Ur({ columnas: e, filas: r }) {
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
  const [s, c] = H(!1);
  return /* @__PURE__ */ u("figure", { style: { margin: 0, minWidth: 0, ...d }, "aria-label": e, children: [
    ((r == null ? void 0 : r.length) > 1 || a) && /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "flex-start", gap: "var(--ds-3)" }, children: [
      /* @__PURE__ */ t("div", { style: { flex: 1, minWidth: 0 }, children: !s && /* @__PURE__ */ t(Qr, { series: r || [], forma: n }) }),
      a && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => c((l) => !l),
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
        }
      )
    ] }),
    s && a ? /* @__PURE__ */ t("div", { style: { minHeight: o }, children: /* @__PURE__ */ t(Ur, { ...a }) }) : i
  ] });
}
const E = (e, r, n) => ue(e, r, n);
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
function Zr({
  datos: e = [],
  alto: r = 40,
  color: n = "var(--ds-accent-trazo)",
  area: a = !0,
  formato: i = "numero",
  etiquetas: d,
  estilo: o
}) {
  const [s, c] = We(), [l, h] = H(null), p = e.map((S) => typeof S == "object" && S !== null ? S.valor : S), v = p.filter((S) => S != null && Number.isFinite(Number(S))), f = Math.min(...v), y = Math.max(...v), m = 4, g = Math.max(0, c), b = (S) => p.length <= 1 ? g / 2 : m + S / (p.length - 1) * (g - m * 2), x = (S) => y === f ? r / 2 : m + (1 - (S - f) / (y - f)) * (r - m * 2), M = [];
  let w = [];
  p.forEach((S, W) => {
    S == null || !Number.isFinite(Number(S)) ? (w.length && M.push(w), w = []) : w.push([b(W), x(Number(S))]);
  }), w.length && M.push(w);
  const k = [...p].reverse().findIndex((S) => S != null), N = k === -1 ? -1 : p.length - 1 - k, T = ge.useId().replace(/:/g, "");
  return /* @__PURE__ */ u(
    "div",
    {
      ref: s,
      style: { position: "relative", height: r, minWidth: 0, ...o },
      onMouseLeave: () => h(null),
      onMouseMove: (S) => {
        if (!g || p.length < 2) return;
        const W = S.currentTarget.getBoundingClientRect(), L = Math.round((S.clientX - W.left - m) / (g - m * 2) * (p.length - 1));
        h(Math.max(0, Math.min(p.length - 1, L)));
      },
      children: [
        g > 0 && v.length > 0 && /* @__PURE__ */ u(
          "svg",
          {
            width: g,
            height: r,
            role: "img",
            style: { display: "block", overflow: "visible" },
            "aria-label": `Tendencia de ${p.length} puntos, último ${E(p[N], i)}`,
            children: [
              /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ u("linearGradient", { id: `sp${T}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ t("stop", { offset: "0%", stopColor: n, stopOpacity: "0.22" }),
                /* @__PURE__ */ t("stop", { offset: "100%", stopColor: n, stopOpacity: "0" })
              ] }) }),
              a && M.map((S, W) => S.length > 1 && /* @__PURE__ */ t(
                "path",
                {
                  fill: `url(#sp${T})`,
                  d: `M${S[0][0]},${r} ${S.map((L) => `L${L[0]},${L[1]}`).join(" ")} L${S[S.length - 1][0]},${r} Z`
                },
                `a${W}`
              )),
              M.map((S, W) => /* @__PURE__ */ t(
                "path",
                {
                  fill: "none",
                  stroke: n,
                  strokeWidth: "2",
                  strokeLinejoin: "round",
                  strokeLinecap: "round",
                  d: S.map((L, R) => `${R ? "L" : "M"}${L[0]},${L[1]}`).join(" ")
                },
                `l${W}`
              )),
              N >= 0 && /* @__PURE__ */ t(
                "circle",
                {
                  cx: b(N),
                  cy: x(Number(p[N])),
                  r: "3.5",
                  fill: n,
                  stroke: "var(--ds-surface-solid)",
                  strokeWidth: "2"
                }
              ),
              l !== null && p[l] !== null && p[l] !== void 0 && /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t("line", { x1: b(l), x2: b(l), y1: 0, y2: r, stroke: "var(--ds-eje)", strokeWidth: "1" }),
                /* @__PURE__ */ t(
                  "circle",
                  {
                    cx: b(l),
                    cy: x(Number(p[l])),
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
        l !== null && /* @__PURE__ */ u("div", { className: "ds-num", style: {
          position: "absolute",
          bottom: "100%",
          marginBottom: 4,
          left: Math.min(Math.max(0, b(l) - 40), Math.max(0, g - 80)),
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
          d != null && d[l] ? `${d[l]} · ` : "",
          E(p[l], i)
        ] })
      ]
    }
  );
}
const It = { ok: "Bien", aviso: "Atención", riesgo: "En riesgo" }, Jr = (e) => e == null || e === "";
function hr({
  etiqueta: e,
  valor: r,
  formato: n = "numero",
  opcionesFormato: a,
  variacion: i,
  sentido: d = "sube",
  contra: o,
  enPuntos: s,
  serie: c,
  colorSerie: l,
  nota: h,
  icono: p,
  estado: v,
  textoEstado: f,
  compacta: y = !1,
  cargando: m = !1
}) {
  if (m)
    return /* @__PURE__ */ u("div", { "aria-busy": "true", style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
      /* @__PURE__ */ t(Q, { alto: 10, ancho: "46%" }),
      /* @__PURE__ */ t(Q, { alto: y ? 24 : 34, ancho: "62%", radio: 9 }),
      /* @__PURE__ */ t(Q, { alto: 10, ancho: "38%" }),
      c && !y && /* @__PURE__ */ t(Q, { alto: 40, radio: 9 })
    ] });
  const g = Jr(r), b = g ? "—" : typeof r == "number" || !Number.isNaN(Number(r)) ? ue(r, n, a) : r;
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
      v && It[v] && /* @__PURE__ */ t(Le, { tono: v, children: f || It[v] }),
      p && !v && /* @__PURE__ */ t("span", { "aria-hidden": !0, style: { color: "var(--ds-ink-3)", display: "inline-flex", flexShrink: 0 }, children: p })
    ] }),
    /* @__PURE__ */ t("div", { style: tr, children: /* @__PURE__ */ t("div", { className: "ds-num", style: {
      fontSize: rr(y ? "var(--ds-num-m)" : "var(--ds-num-l)", b),
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: "-0.035em",
      marginTop: y ? 4 : 6,
      color: g ? "var(--ds-ink-3)" : "var(--ds-ink)",
      whiteSpace: "nowrap"
    }, children: b }) }),
    (i !== void 0 || o || h || g) && /* @__PURE__ */ u("div", { style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "4px 8px",
      marginTop: y ? 6 : 8
    }, children: [
      i !== void 0 && !g && /* @__PURE__ */ t(vr, { valor: i, sentido: d, contra: o, enPuntos: s }),
      (h || g) && /* @__PURE__ */ t("span", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }, children: g ? h || "Sin dato" : h })
    ] }),
    c && !y && /* @__PURE__ */ t("div", { style: { marginTop: "auto", paddingTop: "var(--ds-4)" }, children: /* @__PURE__ */ t(Zr, { datos: c, alto: 40, formato: n, color: l }) })
  ] });
}
function oa({
  onClick: e,
  href: r,
  estilo: n,
  entrada: a,
  relleno: i,
  ...d
}) {
  const o = !!(e || r), s = /* @__PURE__ */ t(hr, { ...d }), c = i ?? (d.compacta ? "var(--ds-4)" : "var(--ds-5)");
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
      children: s
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
      onKeyDown: o ? (l) => {
        (l.key === "Enter" || l.key === " ") && (l.preventDefault(), e(l));
      } : void 0,
      estilo: { height: "100%", ...n },
      children: s
    }
  );
}
function sa({ indicadores: e = [], cargando: r = !1, estilo: n, entrada: a }) {
  const i = ye(), d = Math.max(1, e.length), o = i ? Math.min(2, d) : d;
  return /* @__PURE__ */ t(we, { relleno: "0", entrada: a, estilo: { overflow: "hidden", ...n }, children: /* @__PURE__ */ t("div", { role: "list", style: {
    display: "grid",
    gridTemplateColumns: `repeat(${o}, minmax(0, 1fr))`
  }, children: e.map((s, c) => {
    const l = c % o, h = Math.floor(c / o);
    return /* @__PURE__ */ t("div", { role: "listitem", style: {
      padding: "var(--ds-4) var(--ds-5)",
      minWidth: 0,
      borderLeft: l > 0 ? "1px solid var(--ds-line)" : "none",
      borderTop: h > 0 ? "1px solid var(--ds-line)" : "none"
    }, children: /* @__PURE__ */ t(hr, { ...s, serie: void 0, compacta: !0, cargando: r || s.cargando }) }, s.clave ?? s.etiqueta ?? c);
  }) }) });
}
const en = { ok: "Va a la meta", aviso: "Cerca de la meta", riesgo: "Debajo de la meta" }, tn = { ok: "Dentro del tope", aviso: "Cerca del tope", riesgo: "Rebasa el tope" };
function la({
  titulo: e,
  logrado: r,
  meta: n,
  formato: a = "numero",
  opcionesFormato: i,
  diaActual: d,
  diasPeriodo: o,
  invertida: s = !1,
  forma: c = "barra",
  nota: l,
  cargando: h = !1,
  estilo: p,
  entrada: v
}) {
  const f = (N) => ue(N, a, i), y = Number.isFinite(Number(r)) && Number(n) > 0, m = y ? Number(r) / Number(n) : null, g = y && Number(d) > 0 && Number(o) > 0, b = g ? Number(r) / Number(d) * Number(o) : null, x = g ? b / Number(n) : m;
  let M = "acento";
  x !== null && (s ? M = x <= 0.9 ? "ok" : x <= 1 ? "aviso" : "riesgo" : M = x >= 1 ? "ok" : x >= 0.9 ? "aviso" : "riesgo");
  const w = s ? tn : en, k = {
    ok: "var(--ds-ok)",
    aviso: "var(--ds-warn)",
    riesgo: "var(--ds-risk)",
    acento: "var(--ds-accent-trazo)"
  }[M];
  return /* @__PURE__ */ t(we, { entrada: v, estilo: { height: "100%", ...p }, children: h ? /* @__PURE__ */ u("div", { "aria-busy": "true", style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
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
      x !== null && /* @__PURE__ */ t(Le, { tono: M, children: w[M] })
    ] }),
    y ? c === "anillo" ? /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "center", gap: "var(--ds-5)", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ t(Sr, { valor: Math.min(100, m * 100), tamano: 112, grosor: 9, tono: k, children: /* @__PURE__ */ t("span", { className: "ds-num", style: {
        fontSize: "var(--ds-num-m)",
        fontWeight: 800,
        letterSpacing: "-0.03em"
      }, children: U(m, { decimales: 0 }) }) }),
      /* @__PURE__ */ u("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ t("div", { className: "ds-num", style: {
          fontSize: "var(--ds-num-m)",
          fontWeight: 800,
          letterSpacing: "-0.03em"
        }, children: f(r) }),
        /* @__PURE__ */ u("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }, children: [
          "de ",
          /* @__PURE__ */ t("span", { className: "ds-num", style: { fontWeight: 700, color: "var(--ds-ink-2)" }, children: f(n) })
        ] })
      ] })
    ] }) : /* @__PURE__ */ u(J, { children: [
      /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ t("span", { className: "ds-num", style: {
          fontSize: "var(--ds-num-l)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.05
        }, children: f(r) }),
        /* @__PURE__ */ u("span", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }, children: [
          "de ",
          /* @__PURE__ */ t("span", { className: "ds-num", style: { fontWeight: 700, color: "var(--ds-ink-2)" }, children: f(n) })
        ] })
      ] }),
      /* @__PURE__ */ t(
        $r,
        {
          valor: Number(r),
          total: Number(n),
          tono: M,
          alto: 8,
          etiqueta: `${e}: ${U(m)} de la meta`
        }
      ),
      /* @__PURE__ */ u("div", { className: "ds-num", style: {
        fontSize: "var(--ds-t-small)",
        fontWeight: 700,
        color: "var(--ds-ink-2)"
      }, children: [
        U(m),
        " de la meta"
      ] })
    ] }) : /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }, children: Number(n) > 0 ? "Sin dato de avance." : "Sin meta capturada para este periodo." }),
    g && /* @__PURE__ */ u("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", lineHeight: 1.45 }, children: [
      "Al ritmo actual cierras en",
      " ",
      /* @__PURE__ */ t("strong", { className: "ds-num", style: { color: "var(--ds-ink)" }, children: f(b) }),
      " ",
      "(",
      /* @__PURE__ */ t("span", { className: "ds-num", children: U(b / Number(n)) }),
      " ",
      s ? "del tope" : "de la meta",
      ").",
      /* @__PURE__ */ u("span", { style: { color: "var(--ds-ink-3)" }, children: [
        " Día ",
        d,
        " de ",
        o,
        "."
      ] })
    ] }),
    l && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }, children: l })
  ] }) });
}
function da({
  titulo: e,
  valores: r = [],
  formato: n = "numero",
  opcionesFormato: a,
  sentido: i = "sube",
  nota: d,
  cargando: o = !1,
  estilo: s,
  entrada: c
}) {
  const l = ye(520), h = r.slice(0, 3), p = h[0];
  return /* @__PURE__ */ u(we, { entrada: c, estilo: { height: "100%", ...s }, children: [
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
      gap: l ? "var(--ds-3)" : 0,
      gridTemplateColumns: l ? "1fr" : `repeat(${Math.max(1, h.length)}, minmax(0, 1fr))`
    }, children: h.map((v, f) => {
      const y = f > 0 && p ? ur(p.valor, v.valor) : void 0;
      return /* @__PURE__ */ u("div", { style: {
        minWidth: 0,
        paddingLeft: !l && f > 0 ? "var(--ds-4)" : 0,
        paddingRight: !l && f < h.length - 1 ? "var(--ds-4)" : 0,
        borderLeft: !l && f > 0 ? "1px solid var(--ds-line)" : "none",
        paddingTop: l && f > 0 ? "var(--ds-3)" : 0,
        borderTop: l && f > 0 ? "1px solid var(--ds-line)" : "none"
      }, children: [
        /* @__PURE__ */ t("div", { style: {
          fontSize: "var(--ds-t-small)",
          fontWeight: 700,
          color: f === 0 ? "var(--ds-ink-2)" : "var(--ds-ink-3)"
        }, children: v.etiqueta }),
        o ? /* @__PURE__ */ t(Q, { alto: f === 0 ? 30 : 22, ancho: "70%", radio: 8, estilo: { marginTop: 6 } }) : /* @__PURE__ */ t("div", { style: tr, children: /* @__PURE__ */ t("div", { className: "ds-num", style: {
          fontSize: rr(f === 0 ? "var(--ds-num-m)" : "var(--ds-num-s)", ue(v.valor, n, a)),
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          marginTop: 4,
          color: v.valor === null || v.valor === void 0 ? "var(--ds-ink-3)" : f === 0 ? "var(--ds-ink)" : "var(--ds-ink-2)",
          whiteSpace: "nowrap"
        }, children: ue(v.valor, n, a) }) }),
        f > 0 && !o && /* @__PURE__ */ t("div", { style: { marginTop: 6 }, children: /* @__PURE__ */ t(
          vr,
          {
            valor: y,
            sentido: i,
            contra: y === null ? void 0 : `${p.etiqueta || "Base"} vs ${(v.etiqueta || "referencia").toLowerCase()}`
          }
        ) })
      ] }, v.etiqueta ?? f);
    }) }),
    d && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", marginTop: "var(--ds-4)" }, children: d })
  ] });
}
function ca({
  titulo: e,
  nota: r,
  elementos: n = [],
  formato: a = "numero",
  opcionesFormato: i,
  limite: d = 5,
  participacion: o = !1,
  total: s,
  accion: c,
  onElemento: l,
  vacio: h = "Sin movimientos en este periodo.",
  cargando: p = !1,
  estilo: v,
  entrada: f
}) {
  const y = n.slice(0, d), m = Math.max(0, ...y.map((b) => Number(b.valor) || 0)), g = Number(s) > 0 ? Number(s) : n.reduce((b, x) => b + (Number(x.valor) || 0), 0);
  return /* @__PURE__ */ t(we, { entrada: f, estilo: { height: "100%", ...v }, children: /* @__PURE__ */ t(Dr, { titulo: e, nota: r, accion: c, children: p ? /* @__PURE__ */ t("div", { "aria-busy": "true", style: { display: "flex", flexDirection: "column", gap: 14 }, children: Array.from({ length: Math.min(d, 5) }, (b, x) => /* @__PURE__ */ u("div", { style: { display: "flex", flexDirection: "column", gap: 6, opacity: 1 - x * 0.12 }, children: [
    /* @__PURE__ */ u("div", { style: { display: "flex", gap: 10 }, children: [
      /* @__PURE__ */ t(Q, { alto: 12, ancho: `${50 - x * 5}%` }),
      /* @__PURE__ */ t(Q, { alto: 12, ancho: 70, estilo: { marginLeft: "auto" } })
    ] }),
    /* @__PURE__ */ t(Q, { alto: 4, radio: 99, ancho: `${90 - x * 14}%` })
  ] }, x)) }) : y.length === 0 ? /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", padding: "var(--ds-4) 0" }, children: h }) : /* @__PURE__ */ t("ol", { style: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 2
  }, children: y.map((b, x) => {
    const M = Number(b.valor) || 0, w = !!l;
    return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ u(
      "div",
      {
        role: w ? "button" : void 0,
        tabIndex: w ? 0 : void 0,
        onClick: w ? () => l(b) : void 0,
        onKeyDown: w ? (k) => {
          (k.key === "Enter" || k.key === " ") && (k.preventDefault(), l(b));
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
        onMouseEnter: w ? (k) => {
          k.currentTarget.style.background = "var(--ds-surface-2)";
        } : void 0,
        onMouseLeave: w ? (k) => {
          k.currentTarget.style.background = "transparent";
        } : void 0,
        children: [
          /* @__PURE__ */ t("span", { className: "ds-num", style: {
            fontSize: "var(--ds-t-small)",
            fontWeight: 800,
            color: "var(--ds-ink-3)"
          }, children: x + 1 }),
          /* @__PURE__ */ u("div", { style: { minWidth: 0 }, children: [
            /* @__PURE__ */ t("div", { style: {
              fontWeight: 700,
              color: "var(--ds-ink)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }, children: b.nombre }),
            b.subtitulo && /* @__PURE__ */ t("div", { style: {
              fontSize: "var(--ds-t-small)",
              color: "var(--ds-ink-3)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }, children: b.subtitulo })
          ] }),
          /* @__PURE__ */ u("div", { style: { textAlign: "right" }, children: [
            /* @__PURE__ */ t("div", { className: "ds-num", style: { fontWeight: 800, color: "var(--ds-ink)" }, children: ue(b.valor, a, i) }),
            o && g > 0 && /* @__PURE__ */ u("div", { className: "ds-num", style: {
              fontSize: "var(--ds-t-micro)",
              fontWeight: 700,
              color: "var(--ds-ink-3)"
            }, children: [
              U(M / g),
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
            width: `${m > 0 ? M / m * 100 : 0}%`,
            background: "var(--ds-accent-trazo)",
            borderRadius: 99,
            transition: "width var(--ds-t-move) var(--ds-ease)"
          } }) })
        ]
      }
    ) }, b.clave ?? b.nombre ?? x);
  }) }) }) });
}
const rn = (e) => e == null || e === "";
function ua({
  nombre: e,
  subtitulo: r,
  imagen: n,
  estado: a,
  metricas: i = [],
  acciones: d,
  onClick: o,
  cargando: s = !1,
  estilo: c,
  entrada: l
}) {
  const h = !!o, p = i.slice(0, 4);
  return /* @__PURE__ */ u(
    we,
    {
      entrada: l,
      interactiva: h,
      role: h ? "button" : void 0,
      tabIndex: h ? 0 : void 0,
      onClick: o,
      onKeyDown: h ? (v) => {
        (v.key === "Enter" || v.key === " ") && (v.preventDefault(), o(v));
      } : void 0,
      estilo: { height: "100%", display: "flex", flexDirection: "column", gap: "var(--ds-4)", ...c },
      children: [
        /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "center", gap: "var(--ds-3)", minWidth: 0 }, children: [
          s ? /* @__PURE__ */ t(Q, { circulo: !0, alto: 48 }) : /* @__PURE__ */ t(mt, { src: n, nombre: e || "", tamano: 48 }),
          /* @__PURE__ */ t("div", { style: { flex: 1, minWidth: 0 }, children: s ? /* @__PURE__ */ u("div", { style: { display: "flex", flexDirection: "column", gap: 7 }, children: [
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
          a && !s && /* @__PURE__ */ t(Le, { tono: a.tono, children: a.texto })
        ] }),
        p.length > 0 && /* @__PURE__ */ t("div", { style: {
          display: "grid",
          gap: "var(--ds-3)",
          gridTemplateColumns: `repeat(${Math.min(2, p.length)}, minmax(0, 1fr))`,
          padding: "var(--ds-3)",
          borderRadius: "var(--ds-r-item)",
          background: "var(--ds-surface-sunk)"
        }, children: p.map((v, f) => /* @__PURE__ */ u("div", { style: { minWidth: 0 }, children: [
          /* @__PURE__ */ t("div", { style: {
            fontSize: "var(--ds-t-micro)",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--ds-ink-3)"
          }, children: v.etiqueta }),
          s ? /* @__PURE__ */ t(Q, { alto: 16, ancho: "70%", estilo: { marginTop: 5 } }) : rn(v.valor) ? /* @__PURE__ */ t("div", { style: { marginTop: 4 }, children: /* @__PURE__ */ t(Le, { tono: "aviso", children: "Sin capturar" }) }) : /* @__PURE__ */ t("div", { className: "ds-num", style: {
            fontWeight: 800,
            color: "var(--ds-ink)",
            marginTop: 2,
            overflowWrap: "anywhere"
          }, children: ue(v.valor, v.formato || "texto", v.opciones) })
        ] }, v.etiqueta ?? f)) }),
        d && /* @__PURE__ */ t(
          "div",
          {
            style: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" },
            onClick: (v) => v.stopPropagation(),
            children: d
          }
        )
      ]
    }
  );
}
const nn = (e) => e == null || e === "";
function an({ texto: e, etiqueta: r }) {
  const [n, a] = H(!1);
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
function va({ elementos: e = [], columnas: r = 2, estilo: n }) {
  const i = ye(560) ? 1 : Math.max(1, Math.min(3, r));
  return /* @__PURE__ */ t("dl", { style: {
    margin: 0,
    display: "grid",
    gridTemplateColumns: `repeat(${i}, minmax(0, 1fr))`,
    columnGap: "var(--ds-6)",
    rowGap: "var(--ds-4)",
    ...n
  }, children: e.map((d, o) => {
    const s = nn(d.valor), c = s ? null : ge.isValidElement(d.valor) ? d.valor : ue(d.valor, d.formato || "texto", d.opciones);
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
      /* @__PURE__ */ t("dd", { style: { margin: "4px 0 0", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }, children: s ? /* @__PURE__ */ t(Le, { tono: "aviso", children: "Sin capturar" }) : /* @__PURE__ */ u(J, { children: [
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
        d.copiable && /* @__PURE__ */ t(an, { texto: d.valor, etiqueta: d.etiqueta })
      ] }) })
    ] }, d.etiqueta ?? o);
  }) });
}
const Lt = {
  info: ["var(--ds-info-soft)", "var(--ds-info)", "i"],
  ok: ["var(--ds-ok-soft)", "var(--ds-ok)", "✓"],
  aviso: ["var(--ds-warn-soft)", "var(--ds-warn)", "!"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)", "!"]
};
function ha({
  tono: e = "info",
  titulo: r,
  children: n,
  acciones: a,
  icono: i,
  onCerrar: d,
  estilo: o
}) {
  const [s, c, l] = Lt[e] || Lt.info;
  return /* @__PURE__ */ u("div", { role: e === "riesgo" || e === "aviso" ? "alert" : "status", style: {
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--ds-3)",
    background: s,
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
    }, children: i || l }),
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
function pa({
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
    a && /* @__PURE__ */ t(er, { tono: "neutro", tamano: i ? 36 : 48, children: a }),
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
function fa({ personas: e = [], maximo: r = 4, tamano: n = 32, estilo: a }) {
  const i = e.slice(0, r), d = e.length - i.length, o = e.map((s) => s.nombre).filter(Boolean).join(", ");
  return /* @__PURE__ */ u(
    "div",
    {
      role: "img",
      "aria-label": `${e.length} personas: ${o}`,
      title: o,
      style: { display: "inline-flex", alignItems: "center", ...a },
      children: [
        i.map((s, c) => /* @__PURE__ */ t("div", { style: {
          marginLeft: c ? -n * 0.28 : 0,
          borderRadius: 99,
          boxShadow: "0 0 0 2px var(--ds-surface-solid)",
          position: "relative",
          zIndex: r - c
        }, children: /* @__PURE__ */ t(mt, { src: s.imagen, nombre: s.nombre || "", tamano: n, tono: c % 2 ? "neutro" : "acento" }) }, s.clave ?? s.nombre ?? c)),
        d > 0 && /* @__PURE__ */ u("div", { className: "ds-num", style: {
          marginLeft: -n * 0.28,
          width: n,
          height: n,
          borderRadius: 99,
          background: "var(--ds-surface-sunk)",
          color: "var(--ds-ink-2)",
          boxShadow: "0 0 0 2px var(--ds-surface-solid)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: n * 0.34,
          fontWeight: 800
        }, children: [
          "+",
          d
        ] })
      ]
    }
  );
}
const Me = 8;
function xt({
  ancla: e,
  abierto: r,
  onCerrar: n,
  children: a,
  rol: i = "menu",
  etiqueta: d,
  minAncho: o = 200,
  estilo: s
}) {
  const c = K(null), [l, h] = H(null), p = K(n);
  return p.current = n, Ae(() => {
    if (!r) {
      h(null);
      return;
    }
    const v = () => {
      var S, W;
      const y = (S = e == null ? void 0 : e.current) == null ? void 0 : S.getBoundingClientRect(), m = (W = c.current) == null ? void 0 : W.getBoundingClientRect();
      if (!y) return;
      const g = (m == null ? void 0 : m.width) || o, b = (m == null ? void 0 : m.height) || 0, x = window.innerWidth, w = window.innerHeight - y.bottom, k = b > 0 && w < b + Me && y.top > w, N = k ? Math.max(Me, y.top - b - 6) : y.bottom + 6;
      let T = y.left;
      T + g > x - Me && (T = y.right - g), T = Math.max(Me, Math.min(T, x - g - Me)), h({ izq: T, top: N, haciaArriba: k });
    };
    v();
    const f = requestAnimationFrame(v);
    return window.addEventListener("resize", v), window.addEventListener("scroll", v, !0), () => {
      cancelAnimationFrame(f), window.removeEventListener("resize", v), window.removeEventListener("scroll", v, !0);
    };
  }, [r, e, o]), ie(() => {
    if (!r) return;
    const v = (g) => {
      var b, x, M;
      (b = p.current) == null || b.call(p), g && ((M = (x = e == null ? void 0 : e.current) == null ? void 0 : x.focus) == null || M.call(x));
    }, f = (g) => {
      g.key === "Escape" && (g.stopPropagation(), v(!0));
    }, y = (g) => {
      var b, x;
      (b = c.current) != null && b.contains(g.target) || (x = e == null ? void 0 : e.current) != null && x.contains(g.target) || v(!1);
    };
    document.addEventListener("keydown", f, !0), document.addEventListener("mousedown", y, !0);
    const m = requestAnimationFrame(() => {
      var x;
      const g = c.current, b = (g == null ? void 0 : g.querySelector('[aria-checked="true"]')) || (g == null ? void 0 : g.querySelector("[data-foco]")) || (g == null ? void 0 : g.querySelector('button, [tabindex="0"]'));
      (x = b == null ? void 0 : b.focus) == null || x.call(b);
    });
    return () => {
      cancelAnimationFrame(m), document.removeEventListener("keydown", f, !0), document.removeEventListener("mousedown", y, !0);
    };
  }, [r, e]), !r || typeof document > "u" ? null : Zt(/* @__PURE__ */ t(
    "div",
    {
      ref: c,
      role: i,
      "aria-label": d,
      onKeyDown: (v) => {
        var g;
        if (v.key !== "ArrowDown" && v.key !== "ArrowUp") return;
        const f = [...((g = c.current) == null ? void 0 : g.querySelectorAll("button:not([disabled])")) || []], y = f.indexOf(document.activeElement);
        if (!f.length) return;
        v.preventDefault();
        const m = v.key === "ArrowDown" ? (y + 1) % f.length : (y - 1 + f.length) % f.length;
        f[m].focus();
      },
      style: {
        position: "fixed",
        left: (l == null ? void 0 : l.izq) ?? -9999,
        top: (l == null ? void 0 : l.top) ?? -9999,
        zIndex: 80,
        minWidth: o,
        maxWidth: `calc(100vw - ${Me * 2}px)`,
        maxHeight: `calc(100vh - ${Me * 2}px)`,
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
        visibility: l ? "visible" : "hidden",
        animation: l ? `${l.haciaArriba ? "ds-sube" : "ds-baja"} var(--ds-t-state) var(--ds-ease) both` : void 0,
        ...s
      },
      children: a
    }
  ), document.body);
}
function pr({ children: e, elegida: r, onClick: n, rol: a = "menuitemradio", nota: i, peligro: d }) {
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
const rt = {
  neutro: ["var(--ds-surface-solid)", "var(--ds-ink-3)", "var(--ds-line-firm)"],
  acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)", "var(--ds-accent-trazo)"],
  ok: ["var(--ds-ok-soft)", "var(--ds-ok)", "var(--ds-ok)"],
  aviso: ["var(--ds-warn-soft)", "var(--ds-warn)", "var(--ds-warn)"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)", "var(--ds-risk)"]
}, on = (e) => {
  if (!e) return "sin-fecha";
  const r = e instanceof Date ? e : new Date(typeof e == "string" && e.length === 10 ? `${e}T00:00:00` : e);
  return Number.isNaN(r.getTime()) ? "sin-fecha" : `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
}, Rt = (e) => !(typeof e == "string" && /^\d{4}-\d{2}-\d{2}$/.test(e));
function ma({
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
  const o = (l) => {
    if (!l) return -1 / 0;
    const h = new Date(typeof l == "string" && l.length === 10 ? `${l}T00:00:00` : l);
    return Number.isNaN(h.getTime()) ? -1 / 0 : h.getTime();
  }, s = r === null ? -1 : r !== void 0 ? e.findIndex((l, h) => (l.id ?? h) === r) : e.reduce((l, h, p) => {
    var v;
    return o(h.fecha) > o((v = e[l]) == null ? void 0 : v.fecha) ? p : l;
  }, 0);
  let c = null;
  return /* @__PURE__ */ t("ol", { style: { listStyle: "none", margin: 0, padding: 0, ...d }, children: e.map((l, h) => {
    const p = h === s, [v, f, y] = rt[l.tono] || (p ? rt.acento : rt.neutro), m = on(l.fecha), g = n && m !== c;
    c = m;
    const b = h === e.length - 1, x = l.fecha ? a ? yt(l.fecha) : n ? Rt(l.fecha) ? Z(l.fecha, "hora") : null : Z(l.fecha, Rt(l.fecha) ? "fechaHora" : "media") : "Sin fecha";
    return /* @__PURE__ */ u(ge.Fragment, { children: [
      g && /* @__PURE__ */ t("li", { "aria-hidden": !1, style: {
        fontSize: "var(--ds-t-micro)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)",
        padding: h === 0 ? "0 0 var(--ds-2)" : "var(--ds-3) 0 var(--ds-2)"
      }, children: m === "sin-fecha" ? "Sin fecha" : Z(l.fecha, "larga") }),
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
                background: v,
                color: f,
                border: `2px solid ${y}`,
                display: "grid",
                placeItems: "center",
                boxShadow: p ? "0 0 0 4px var(--ds-accent-ring)" : "none"
              }, children: l.icono }),
              !b && /* @__PURE__ */ t("span", { "aria-hidden": !0, style: {
                flex: 1,
                width: 2,
                minHeight: 14,
                marginTop: 4,
                background: "var(--ds-line-firm)",
                borderRadius: 2
              } })
            ] }),
            /* @__PURE__ */ u("div", { style: { paddingBottom: b ? 0 : "var(--ds-4)", minWidth: 0 }, children: [
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
                }, children: l.titulo }),
                x && /* @__PURE__ */ t("span", { className: "ds-num", style: {
                  fontSize: "var(--ds-t-micro)",
                  fontWeight: 600,
                  color: "var(--ds-ink-3)",
                  whiteSpace: "nowrap"
                }, children: x })
              ] }),
              l.texto && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", marginTop: 2 }, children: l.texto }),
              l.actor && /* @__PURE__ */ t("div", { style: {
                fontSize: "var(--ds-t-micro)",
                fontWeight: 600,
                color: "var(--ds-ink-3)",
                marginTop: 3
              }, children: l.actor })
            ] })
          ]
        }
      )
    ] }, l.id ?? h);
  }) });
}
const Ie = {
  hecho: { palabra: "Hecho", fondo: "var(--ds-ok)", tinta: "var(--ds-ink-on-accent)", borde: "var(--ds-ok)", texto: "var(--ds-ink-2)" },
  actual: { palabra: "En curso", fondo: "var(--ds-accent)", tinta: "var(--ds-ink-on-accent)", borde: "var(--ds-accent-trazo)", texto: "var(--ds-accent-tinta)" },
  pendiente: { palabra: "Pendiente", fondo: "var(--ds-surface-solid)", tinta: "var(--ds-ink-3)", borde: "var(--ds-line-firm)", texto: "var(--ds-ink-3)" },
  error: { palabra: "Con problema", fondo: "var(--ds-risk)", tinta: "var(--ds-ink-on-accent)", borde: "var(--ds-risk)", texto: "var(--ds-ink)" },
  omitido: { palabra: "Omitido", fondo: "var(--ds-surface-sunk)", tinta: "var(--ds-ink-3)", borde: "var(--ds-line-firm)", texto: "var(--ds-ink-3)" }
}, At = {
  hecho: /* @__PURE__ */ t("path", { d: "M20 6L9 17l-5-5" }),
  error: /* @__PURE__ */ t("path", { d: "M18 6L6 18M6 6l12 12" }),
  omitido: /* @__PURE__ */ t("path", { d: "M5 12h14" })
};
function Ft({ estado: e, numero: r, tamano: n = 30 }) {
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
  }, children: At[e] ? /* @__PURE__ */ t(
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
      children: At[e]
    }
  ) : /* @__PURE__ */ t("span", { className: "ds-num", children: r }) });
}
function Et({ onPaso: e, paso: r, i: n, children: a, estilo: i }) {
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
function ga({ pasos: e = [], orientacion: r = "horizontal", onPaso: n, estilo: a }) {
  const i = ye(), d = r === "vertical" || i, o = (s) => [
    s.fecha ? Z(s.fecha, "media") : null,
    s.responsable
  ].filter(Boolean).join(" · ");
  return d ? /* @__PURE__ */ t("ol", { style: { listStyle: "none", margin: 0, padding: 0, ...a }, children: e.map((s, c) => {
    const l = Ie[s.estado] || Ie.pendiente, h = c === e.length - 1;
    return /* @__PURE__ */ u(
      "li",
      {
        "aria-current": s.estado === "actual" ? "step" : void 0,
        style: { display: "grid", gridTemplateColumns: "30px 1fr", columnGap: "var(--ds-3)" },
        children: [
          /* @__PURE__ */ u("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
            /* @__PURE__ */ t(Ft, { estado: s.estado, numero: c + 1 }),
            !h && /* @__PURE__ */ t("span", { "aria-hidden": !0, style: {
              flex: 1,
              width: 2,
              minHeight: 16,
              margin: "4px 0",
              borderRadius: 2,
              background: s.estado === "hecho" ? "var(--ds-ok)" : "var(--ds-line-firm)"
            } })
          ] }),
          /* @__PURE__ */ u(
            Et,
            {
              onPaso: n,
              paso: s,
              i: c,
              estilo: { display: "block", paddingBottom: h ? 0 : "var(--ds-4)", minWidth: 0 },
              children: [
                /* @__PURE__ */ t("div", { style: { fontWeight: 700, color: "var(--ds-ink)", lineHeight: "30px" }, children: s.titulo }),
                /* @__PURE__ */ t("div", { style: {
                  fontSize: "var(--ds-t-micro)",
                  fontWeight: 700,
                  color: l.texto,
                  letterSpacing: "0.02em"
                }, children: l.palabra }),
                o(s) && /* @__PURE__ */ t("div", { className: "ds-num", style: {
                  fontSize: "var(--ds-t-small)",
                  color: "var(--ds-ink-3)",
                  marginTop: 2
                }, children: o(s) }),
                s.texto && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", marginTop: 2 }, children: s.texto })
              ]
            }
          )
        ]
      },
      s.id ?? c
    );
  }) }) : /* @__PURE__ */ t("ol", { style: { listStyle: "none", margin: 0, padding: 0, display: "flex", ...a }, children: e.map((s, c) => {
    const l = Ie[s.estado] || Ie.pendiente, h = c === e.length - 1;
    return /* @__PURE__ */ u(
      "li",
      {
        "aria-current": s.estado === "actual" ? "step" : void 0,
        style: { flex: 1, minWidth: 0, position: "relative" },
        children: [
          !h && /* @__PURE__ */ t("span", { "aria-hidden": !0, style: {
            position: "absolute",
            top: 14,
            left: "calc(50% + 21px)",
            right: "calc(-50% + 21px)",
            height: 2,
            borderRadius: 2,
            background: s.estado === "hecho" ? "var(--ds-ok)" : "var(--ds-line-firm)"
          } }),
          /* @__PURE__ */ u(
            Et,
            {
              onPaso: n,
              paso: s,
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
                /* @__PURE__ */ t(Ft, { estado: s.estado, numero: c + 1 }),
                /* @__PURE__ */ t("div", { style: {
                  fontWeight: 700,
                  color: "var(--ds-ink)",
                  marginTop: "var(--ds-2)",
                  fontSize: "var(--ds-t-small)",
                  lineHeight: 1.25
                }, children: s.titulo }),
                /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-micro)", fontWeight: 700, color: l.texto, marginTop: 2 }, children: l.palabra }),
                o(s) && /* @__PURE__ */ t("div", { className: "ds-num", style: {
                  fontSize: "var(--ds-t-micro)",
                  color: "var(--ds-ink-3)",
                  marginTop: 2
                }, children: o(s) })
              ]
            }
          )
        ]
      },
      s.id ?? c
    );
  }) });
}
function sn({ tarjeta: e, columna: r, columnas: n, onMover: a }) {
  const i = K(null), [d, o] = H(!1);
  return /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        ref: i,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": d,
        "aria-label": `Mover «${e.titulo}» a otra columna`,
        onClick: (s) => {
          s.stopPropagation(), o((c) => !c);
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
      xt,
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
          n.filter((s) => s.id !== r.id).map((s) => /* @__PURE__ */ t(
            pr,
            {
              rol: "menuitem",
              onClick: () => {
                o(!1), a(e, s.id, r.id);
              },
              children: s.titulo
            },
            s.id
          ))
        ]
      }
    )
  ] });
}
function Ct({ tarjeta: e, formatoValor: r }) {
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
      (a = e.etiquetas) == null ? void 0 : a.map((i, d) => /* @__PURE__ */ t(Le, { tono: i.tono, children: i.texto }, d))
    ] })
  ] });
}
function ya({
  columnas: e = [],
  onMover: r,
  onTarjeta: n,
  renderTarjeta: a,
  formatoValor: i = "moneda",
  anchoColumna: d = 280,
  vacioColumna: o = "Sin elementos en esta etapa.",
  estilo: s
}) {
  const c = ye(), [l, h] = H(null), [p, v] = H(null), f = typeof r == "function", y = c ? `min(${d}px, 82vw)` : d;
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
    ...s
  }, children: e.map((m) => {
    const g = m.tarjetas || [], b = g.some((w) => w.valor !== void 0 && w.valor !== null), x = g.reduce((w, k) => w + (Number(k.valor) || 0), 0), M = p === m.id && l && l.origen !== m.id;
    return /* @__PURE__ */ u(
      "section",
      {
        role: "listitem",
        "aria-label": `${m.titulo}, ${g.length}`,
        onDragOver: f ? (w) => {
          w.preventDefault(), p !== m.id && v(m.id);
        } : void 0,
        onDragLeave: f ? (w) => {
          w.currentTarget.contains(w.relatedTarget) || v(null);
        } : void 0,
        onDrop: f ? (w) => {
          var T, S;
          w.preventDefault(), v(null);
          const k = l;
          if (h(null), !k || k.origen === m.id) return;
          const N = (S = (T = e.find((W) => W.id === k.origen)) == null ? void 0 : T.tarjetas) == null ? void 0 : S.find((W) => W.id === k.id);
          N && r(N, m.id, k.origen);
        } : void 0,
        style: {
          flex: "0 0 auto",
          width: y,
          scrollSnapAlign: "start",
          background: M ? "var(--ds-accent-soft)" : "var(--ds-surface-sunk)",
          border: `1px ${M ? "dashed" : "solid"} ${M ? "var(--ds-accent-trazo)" : "var(--ds-line)"}`,
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
            }, children: m.titulo }),
            /* @__PURE__ */ t("span", { className: "ds-num", style: {
              fontSize: "var(--ds-t-micro)",
              fontWeight: 800,
              color: "var(--ds-ink-3)",
              background: "var(--ds-surface)",
              borderRadius: "var(--ds-r-pill)",
              padding: "1px 8px"
            }, children: g.length }),
            b && /* @__PURE__ */ t("span", { className: "ds-num", style: {
              marginLeft: "auto",
              fontSize: "var(--ds-t-micro)",
              fontWeight: 700,
              color: "var(--ds-ink-2)",
              whiteSpace: "nowrap"
            }, children: ue(x, i === "moneda" ? "monedaCompacta" : i) })
          ] }),
          /* @__PURE__ */ u("div", { role: "list", style: { display: "grid", gap: "var(--ds-2)" }, children: [
            g.length === 0 && /* @__PURE__ */ t("div", { style: {
              fontSize: "var(--ds-t-small)",
              color: "var(--ds-ink-3)",
              fontWeight: 600,
              textAlign: "center",
              padding: "var(--ds-5) var(--ds-3)",
              border: "1px dashed var(--ds-line-firm)",
              borderRadius: "var(--ds-r-item)"
            }, children: o }),
            g.map((w) => {
              const k = (l == null ? void 0 : l.id) === w.id;
              return /* @__PURE__ */ u(
                "article",
                {
                  role: "listitem",
                  draggable: f,
                  onDragStart: f ? (N) => {
                    N.dataTransfer.effectAllowed = "move", N.dataTransfer.setData("text/plain", String(w.id)), h({ id: w.id, origen: m.id });
                  } : void 0,
                  onDragEnd: f ? () => {
                    h(null), v(null);
                  } : void 0,
                  style: {
                    background: "var(--ds-surface-solid)",
                    border: "1px solid var(--ds-line)",
                    borderRadius: "var(--ds-r-item)",
                    padding: "var(--ds-3)",
                    boxShadow: "var(--ds-lift-1)",
                    opacity: k ? 0.45 : 1,
                    cursor: f ? "grab" : void 0,
                    transition: "opacity var(--ds-t-state) var(--ds-ease)"
                  },
                  children: [
                    n ? /* @__PURE__ */ t(
                      "button",
                      {
                        type: "button",
                        onClick: () => n(w, m),
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
                        children: a ? a(w, m) : /* @__PURE__ */ t(Ct, { tarjeta: w, formatoValor: i })
                      }
                    ) : a ? a(w, m) : /* @__PURE__ */ t(Ct, { tarjeta: w, formatoValor: i }),
                    f && e.length > 1 && /* @__PURE__ */ t("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: "var(--ds-2)" }, children: /* @__PURE__ */ t(sn, { tarjeta: w, columna: m, columnas: e, onMover: r }) })
                  ]
                },
                w.id
              );
            })
          ] })
        ]
      },
      m.id
    );
  }) });
}
const jt = (e) => e instanceof Date ? e : new Date(typeof e == "string" && e.length === 10 ? `${e}T00:00:00` : e), vt = (e, r) => e.getFullYear() === r.getFullYear() && e.getMonth() === r.getMonth() && e.getDate() === r.getDate();
function ln(e, r) {
  if (Number.isNaN(e.getTime())) return "Sin fecha";
  if (vt(e, r)) return "Hoy";
  const n = new Date(r);
  return n.setDate(r.getDate() - 1), vt(e, n) ? "Ayer" : Z(e, "larga");
}
function ba({
  eventos: e = [],
  ahora: r,
  agrupar: n = !0,
  vacio: a = "Sin actividad reciente.",
  estilo: i
}) {
  const d = r ? jt(r) : /* @__PURE__ */ new Date();
  if (e.length === 0)
    return /* @__PURE__ */ t("div", { style: {
      color: "var(--ds-ink-3)",
      fontSize: "var(--ds-t-small)",
      fontWeight: 600,
      padding: "var(--ds-4) 0",
      ...i
    }, children: a });
  let o = null;
  return /* @__PURE__ */ t("ul", { style: { listStyle: "none", margin: 0, padding: 0, ...i }, children: e.map((s, c) => {
    const l = jt(s.fecha), h = n ? ln(l, d) : null, p = n && h !== o;
    o = h;
    const v = !Number.isNaN(l.getTime()), f = v && vt(l, d), y = v ? f ? yt(l, d) : n ? Z(l, "hora") : Z(l, "fechaHora") : "";
    return /* @__PURE__ */ u(ge.Fragment, { children: [
      p && /* @__PURE__ */ t("li", { style: {
        fontSize: "var(--ds-t-micro)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)",
        padding: c === 0 ? "0 0 var(--ds-2)" : "var(--ds-4) 0 var(--ds-2)"
      }, children: h }),
      /* @__PURE__ */ u("li", { style: {
        display: "flex",
        gap: "var(--ds-3)",
        alignItems: "flex-start",
        padding: "var(--ds-2) 0"
      }, children: [
        s.icono ? /* @__PURE__ */ t(er, { tono: s.tono || "neutro", tamano: 34, children: s.icono }) : /* @__PURE__ */ t(mt, { nombre: s.actor || "", src: s.retrato, tamano: 34, tono: "neutro" }),
        /* @__PURE__ */ u("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ u("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", lineHeight: 1.45 }, children: [
            s.actor && /* @__PURE__ */ t("strong", { style: { color: "var(--ds-ink)", fontWeight: 800 }, children: s.actor }),
            s.actor ? " " : "",
            s.accion,
            s.objeto && /* @__PURE__ */ u(J, { children: [
              " ",
              /* @__PURE__ */ t("strong", { style: { color: "var(--ds-ink)", fontWeight: 700 }, children: s.objeto })
            ] })
          ] }),
          s.detalle && /* @__PURE__ */ t("div", { style: {
            fontSize: "var(--ds-t-micro)",
            color: "var(--ds-ink-3)",
            marginTop: 2,
            fontWeight: 600
          }, children: s.detalle })
        ] }),
        y && /* @__PURE__ */ t(
          "time",
          {
            className: "ds-num",
            dateTime: v ? l.toISOString() : void 0,
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
    ] }, s.id ?? c);
  }) });
}
const Bt = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"], Ot = {
  neutro: ["var(--ds-surface-sunk)", "var(--ds-ink-3)"],
  acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)"],
  ok: ["var(--ds-ok-soft)", "var(--ds-ok)"],
  aviso: ["var(--ds-warn-soft)", "var(--ds-warn)"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)"]
}, ht = (e) => String(e).padStart(2, "0"), Be = (e) => `${e.getFullYear()}-${ht(e.getMonth() + 1)}-${ht(e.getDate())}`, qt = (e) => {
  const [r, n, a] = e.split("-").map(Number);
  return new Date(r, n - 1, a || 1);
}, Ht = (e) => `${e.getFullYear()}-${ht(e.getMonth() + 1)}`;
function pt({ e, onEvento: r, compacto: n }) {
  const [a, i] = Ot[e.tono] || Ot.acento, d = /* @__PURE__ */ u("span", { style: { display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: [
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
      onClick: (s) => {
        s.stopPropagation(), r(e);
      },
      title: e.titulo,
      style: { ...o, cursor: "pointer" },
      children: d
    }
  ) : /* @__PURE__ */ t("div", { title: e.titulo, style: o, children: d });
}
function dn({ resto: e, dia: r, onEvento: n }) {
  const a = K(null), [i, d] = H(!1);
  return /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: a,
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": i,
        onClick: (o) => {
          o.stopPropagation(), d((s) => !s);
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
      xt,
      {
        ancla: a,
        abierto: i,
        onCerrar: () => d(!1),
        rol: "dialog",
        etiqueta: `Eventos del ${Z(r, "larga")}`,
        minAncho: 240,
        children: [
          /* @__PURE__ */ t("div", { style: {
            fontSize: "var(--ds-t-micro)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--ds-ink-3)",
            padding: "4px 6px 8px"
          }, children: Z(r, "larga") }),
          /* @__PURE__ */ t("div", { style: { display: "grid", gap: 6, padding: "0 4px 4px" }, children: e.map((o, s) => /* @__PURE__ */ t(pt, { e: o, onEvento: n }, o.id ?? s)) })
        ]
      }
    )
  ] });
}
const nt = {
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
function xa({
  eventos: e = [],
  mes: r,
  mesInicial: n,
  onCambioMes: a,
  onDia: i,
  onEvento: d,
  maxPorDia: o = 3,
  hoy: s,
  vacio: c = "No hay eventos este mes.",
  estilo: l
}) {
  const h = ye(700), p = s ? qt(s) : /* @__PURE__ */ new Date(), [v, f] = H(n || Ht(p)), m = qt(`${r || v}-01`), g = (W) => {
    const L = Ht(W);
    r || f(L), a == null || a(L);
  }, b = fe(() => {
    const W = /* @__PURE__ */ new Map();
    return e.forEach((L) => {
      if (!L.fecha) return;
      const R = String(L.fecha).slice(0, 10);
      W.has(R) || W.set(R, []), W.get(R).push(L);
    }), W;
  }, [e]), x = (m.getDay() + 6) % 7, M = new Date(m);
  M.setDate(1 - x);
  const w = new Date(m.getFullYear(), m.getMonth() + 1, 0), k = Math.ceil((x + w.getDate()) / 7), N = Array.from({ length: k * 7 }, (W, L) => {
    const R = new Date(M);
    return R.setDate(M.getDate() + L), R;
  }), T = Z(m, "mes"), S = /* @__PURE__ */ u("div", { style: {
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
    }, children: T }),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        style: nt,
        "aria-label": "Mes anterior",
        onClick: () => g(new Date(m.getFullYear(), m.getMonth() - 1, 1)),
        children: "‹"
      }
    ),
    /* @__PURE__ */ t("button", { type: "button", style: nt, onClick: () => g(p), children: "Hoy" }),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        style: nt,
        "aria-label": "Mes siguiente",
        onClick: () => g(new Date(m.getFullYear(), m.getMonth() + 1, 1)),
        children: "›"
      }
    )
  ] });
  if (h) {
    const W = N.filter((L) => L.getMonth() === m.getMonth() && b.has(Be(L)));
    return /* @__PURE__ */ u("div", { style: l, children: [
      S,
      W.length === 0 && /* @__PURE__ */ t("div", { style: {
        color: "var(--ds-ink-3)",
        fontSize: "var(--ds-t-small)",
        fontWeight: 600,
        padding: "var(--ds-4) 0"
      }, children: c }),
      /* @__PURE__ */ t("ol", { style: { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--ds-3)" }, children: W.map((L) => {
        const R = Be(L), B = R === Be(p);
        return /* @__PURE__ */ u("li", { style: { display: "grid", gridTemplateColumns: "52px 1fr", gap: "var(--ds-3)" }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: i ? () => i(R, b.get(R)) : void 0,
              disabled: !i,
              "aria-label": Z(R, "larga"),
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
                }, children: Bt[(L.getDay() + 6) % 7] }),
                /* @__PURE__ */ t("div", { className: "ds-num", style: {
                  fontSize: "var(--ds-num-m)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: B ? "var(--ds-accent-tinta)" : "var(--ds-ink)"
                }, children: L.getDate() })
              ]
            }
          ),
          /* @__PURE__ */ t("div", { style: { display: "grid", gap: 6, minWidth: 0 }, children: b.get(R).map((Y, $) => /* @__PURE__ */ t(pt, { e: Y, onEvento: d }, Y.id ?? $)) })
        ] }, R);
      }) })
    ] });
  }
  return /* @__PURE__ */ u("div", { style: l, children: [
    S,
    /* @__PURE__ */ u("div", { role: "group", "aria-label": T, style: {
      display: "grid",
      gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
      border: "1px solid var(--ds-line)",
      borderRadius: "var(--ds-r-item)",
      overflow: "hidden"
    }, children: [
      Bt.map((W) => /* @__PURE__ */ t("div", { "aria-hidden": !0, style: {
        fontSize: "var(--ds-t-micro)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)",
        padding: "8px 10px",
        borderBottom: "1px solid var(--ds-line)",
        background: "var(--ds-surface-2)"
      }, children: W }, W)),
      N.map((W, L) => {
        const R = Be(W), B = W.getMonth() === m.getMonth(), Y = R === Be(p), $ = b.get(R) || [], C = $.length > o ? $.slice(0, o - 1) : $, F = $.slice(C.length);
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
              borderRight: (L + 1) % 7 ? "1px solid var(--ds-line)" : "none",
              borderBottom: L < N.length - 7 ? "1px solid var(--ds-line)" : "none",
              background: B ? "transparent" : "var(--ds-surface-sunk)"
            },
            children: [
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  className: "ds-num",
                  disabled: !i,
                  onClick: i ? () => i(R, $) : void 0,
                  "aria-label": `${Z(R, "larga")}${$.length ? `, ${$.length} eventos` : ", sin eventos"}`,
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
                  children: W.getDate()
                }
              ),
              C.map((V, O) => /* @__PURE__ */ t(pt, { e: V, onEvento: d, compacto: !0 }, V.id ?? O)),
              F.length > 0 && /* @__PURE__ */ t(dn, { resto: $, dia: R, onEvento: d })
            ]
          },
          R
        );
      })
    ] })
  ] });
}
function ka({
  titulo: e,
  descripcion: r,
  migas: n,
  meta: a,
  acciones: i,
  estilo: d
}) {
  const o = ye();
  return /* @__PURE__ */ u("header", { style: { marginBottom: "var(--ds-6)", ...d }, children: [
    (n == null ? void 0 : n.length) > 0 && /* @__PURE__ */ t(Rr, { ruta: n }),
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
function wa({
  opciones: e = [],
  valor: r,
  onCambio: n,
  etiqueta: a,
  tamano: i = "m",
  pleno: d = !1,
  estilo: o
}) {
  const s = K([]), c = K(null), [l, h] = H(null), p = Math.max(0, e.findIndex((y) => y.valor === r));
  Ae(() => {
    const y = () => {
      const g = s.current[p];
      g && h({ izq: g.offsetLeft, ancho: g.offsetWidth });
    };
    if (y(), typeof ResizeObserver > "u" || !c.current) return;
    const m = new ResizeObserver(y);
    return m.observe(c.current), () => m.disconnect();
  }, [p, e.length]);
  const v = (y) => {
    var b;
    const m = y.key === "ArrowRight" || y.key === "ArrowDown" ? 1 : y.key === "ArrowLeft" || y.key === "ArrowUp" ? -1 : 0;
    if (!m || e.length === 0) return;
    y.preventDefault();
    const g = (p + m + e.length) % e.length;
    n == null || n(e[g].valor), (b = s.current[g]) == null || b.focus();
  }, f = i === "s" ? 30 : 36;
  return /* @__PURE__ */ u(
    "div",
    {
      ref: c,
      role: "radiogroup",
      "aria-label": a,
      onKeyDown: v,
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
        l && /* @__PURE__ */ t("span", { "aria-hidden": !0, style: {
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
        } }),
        e.map((y, m) => {
          const g = m === p;
          return /* @__PURE__ */ u(
            "button",
            {
              ref: (b) => {
                s.current[m] = b;
              },
              type: "button",
              role: "radio",
              "aria-checked": g,
              tabIndex: g ? 0 : -1,
              onClick: () => n == null ? void 0 : n(y.valor),
              style: {
                position: "relative",
                zIndex: 1,
                flex: d ? 1 : "0 0 auto",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                height: f,
                padding: i === "s" ? "0 12px" : "0 16px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontFamily: "var(--ds-font)",
                fontSize: i === "s" ? "var(--ds-t-micro)" : "var(--ds-t-small)",
                fontWeight: 700,
                whiteSpace: "nowrap",
                borderRadius: "var(--ds-r-pill)",
                color: g ? "var(--ds-ink)" : "var(--ds-ink-3)",
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
const Vt = (e) => String(e).padStart(2, "0"), Pt = (e) => `${e.getFullYear()}-${Vt(e.getMonth() + 1)}-${Vt(e.getDate())}`, cn = (e) => {
  const [r, n, a] = String(e).slice(0, 10).split("-").map(Number);
  return new Date(r, n - 1, a);
}, at = (e, r) => {
  const n = new Date(e);
  return n.setDate(n.getDate() + r), n;
}, fr = [
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
function _t(e, r = /* @__PURE__ */ new Date()) {
  const n = r instanceof Date ? new Date(r.getFullYear(), r.getMonth(), r.getDate()) : cn(r), a = n.getFullYear(), i = n.getMonth();
  let d, o;
  switch (e) {
    case "hoy":
      d = n, o = n;
      break;
    case "ayer":
      d = at(n, -1), o = d;
      break;
    case "7d":
      d = at(n, -6), o = n;
      break;
    case "30d":
      d = at(n, -29), o = n;
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
  const s = fr.find((c) => c.clave === e);
  return { clave: e, desde: Pt(d), hasta: Pt(o), etiqueta: (s == null ? void 0 : s.etiqueta) ?? e };
}
function un(e, r) {
  return e ? e === r ? Z(e, "media") : `${Z(e, "media")} – ${Z(r, "media")}` : "";
}
function Sa({
  valor: e,
  onCambio: r,
  opciones: n,
  fechaBase: a,
  etiqueta: i = "Periodo",
  estilo: d
}) {
  const o = K(null), [s, c] = H(!1), l = a ?? /* @__PURE__ */ new Date(), h = fr.filter((v) => !n || n.includes(v.clave)), p = e ? _t(e, l) : null;
  return /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: o,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": s,
        onClick: () => c((v) => !v),
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
      xt,
      {
        ancla: o,
        abierto: s,
        onCerrar: () => c(!1),
        etiqueta: i,
        minAncho: 250,
        children: h.map((v) => {
          const f = _t(v.clave, l);
          return /* @__PURE__ */ t(
            pr,
            {
              elegida: v.clave === e,
              nota: un(f.desde, f.hasta),
              onClick: () => {
                c(!1), r == null || r(f);
              },
              children: v.etiqueta
            },
            v.clave
          );
        })
      }
    )
  ] });
}
function vn({ texto: e, valor: r, onQuitar: n, estilo: a }) {
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
function $a({ children: e, activos: r = [], onQuitar: n, onLimpiar: a, resultado: i, estilo: d }) {
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
        vn,
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
const Ve = 6.6, ft = (e) => [...String(e ?? "")].reduce((r, n) => r + (n >= "A" && n <= "Z" ? 8 : n === " " ? 3.4 : Ve), 0), hn = 140, pn = (e, r) => {
  const n = String(e ?? "");
  if (ft(n) <= r) return n;
  let a = n;
  for (; a.length > 1 && ft(a + "…") > r; ) a = a.slice(0, -1);
  return a.trimEnd() + "…";
};
function Ma({
  series: e = [],
  etiquetas: r = [],
  alto: n = 240,
  formato: a = "numero",
  area: i = !1,
  apilada: d = !1,
  meta: o,
  titulo: s,
  cero: c = !0,
  estilo: l
}) {
  const [h, p] = We(), [v, f] = H(null), y = Math.max(r.length, ...e.map((z) => (z.valores || []).length), 0), m = d && i, g = o == null ? null : typeof o == "object" ? o.valor : o, b = o && typeof o == "object" && o.texto ? o.texto : "Meta", x = fe(() => {
    const z = Array(y).fill(0);
    return e.map((I) => {
      const q = Array.from({ length: y }, (le, ae) => {
        var A;
        const D = (A = I.valores) == null ? void 0 : A[ae];
        return D == null || !Number.isFinite(Number(D)) ? null : Number(D);
      });
      if (!m) return { abajo: null, arriba: q, crudo: q };
      const X = z.slice(), te = q.map((le, ae) => z[ae] += le ?? 0);
      return { abajo: X, arriba: te.slice(), crudo: q };
    });
  }, [e, y, m]), M = x.flatMap((z) => z.arriba.filter((I) => I !== null));
  g !== null && M.push(Number(g));
  const w = M.length > 0 && y > 0, k = w ? Math.min(...M) : 0, N = w ? Math.max(...M) : 1, { marcas: T, min: S, max: W } = bt(
    c ? Math.min(0, k) : k,
    c ? Math.max(0, N) : N,
    n < 200 ? 3 : 4
  ), L = a === "moneda" ? "monedaCompacta" : a === "numero" ? "compacto" : a, R = e.length > 1 && e.length <= 4 && p >= 420 && !m, B = Math.max(...T.map((z) => String(E(z, L)).length)) * Ve + 12, Y = R ? Math.min(hn, Math.max(...e.map((z) => ft(z.nombre))) + 14) : 10, $ = 10, C = 24, F = Math.max(10, p - B - Y), V = n - $ - C, O = (z) => B + (y <= 1 ? F / 2 : z / (y - 1) * F), _ = Ye(S, W, $ + V, $), ee = Math.max(3, ...Array.from({ length: y }, (z, I) => String(r[I] ?? I + 1).length)) * Ve + 12, ve = Math.max(2, Math.min(p < 420 ? 4 : 1 / 0, Math.floor(F / ee))), re = Math.max(1, Math.ceil(y / ve)), Ee = [];
  let Ce = -1 / 0;
  for (let z = 0; z < y; z += re) {
    const I = String(r[z] ?? z + 1).length * Ve, q = y > 1 && z === 0 ? "start" : y > 1 && z >= y - 1 ? "end" : "middle", X = q === "start" ? O(z) : q === "end" ? O(z) - I : O(z) - I / 2;
    X >= Ce + 8 && (Ee.push({ i: z, ancla: q }), Ce = X + I);
  }
  const Te = (z) => {
    const I = [];
    let q = [];
    return z.forEach((X, te) => {
      X === null ? (q.length && I.push(q), q = []) : q.push(te);
    }), q.length && I.push(q), I;
  }, ne = {
    columnas: ["", ...e.map((z) => z.nombre)],
    filas: Array.from({ length: y }, (z, I) => [
      r[I] ?? I + 1,
      ...x.map((q) => E(q.crudo[I], a))
    ])
  }, ze = (z) => {
    if (!w) return;
    const I = z.currentTarget.getBoundingClientRect(), q = z.clientX - I.left, X = y <= 1 ? 0 : Math.round((q - B) / F * (y - 1));
    f(Math.max(0, Math.min(y - 1, X)));
  }, Ue = (z) => {
    z.key === "ArrowRight" && (z.preventDefault(), f((I) => Math.min(y - 1, (I ?? -1) + 1))), z.key === "ArrowLeft" && (z.preventDefault(), f((I) => Math.max(0, (I ?? y) - 1))), z.key === "Escape" && f(null);
  }, Ze = v === null ? 0 : Math.min(...x.map((z) => z.arriba[v] === null ? $ + V : _(z.arriba[v])));
  return /* @__PURE__ */ t(
    be,
    {
      titulo: s,
      series: e,
      formaLeyenda: "linea",
      tabla: w ? ne : null,
      estilo: l,
      alto: n,
      children: /* @__PURE__ */ u("div", { ref: h, style: { position: "relative", minWidth: 0 }, children: [
        w ? p > 0 && /* @__PURE__ */ u(
          "svg",
          {
            width: p,
            height: n,
            role: "img",
            tabIndex: 0,
            "aria-label": `${s ? `${s}: ` : ""}${e.length} serie(s), ${y} puntos. Flechas para recorrer.`,
            style: { display: "block", overflow: "visible", outline: "none" },
            onMouseMove: ze,
            onMouseLeave: () => f(null),
            onFocus: () => f((z) => z === null ? y - 1 : z),
            onBlur: () => f(null),
            onKeyDown: Ue,
            children: [
              T.map((z) => /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: B,
                    x2: B + F,
                    y1: _(z),
                    y2: _(z),
                    stroke: z === 0 ? "var(--ds-eje)" : "var(--ds-grid)",
                    strokeWidth: "1"
                  }
                ),
                /* @__PURE__ */ t("text", { x: B - 8, y: _(z), dy: "0.32em", textAnchor: "end", style: oe, children: E(z, L) })
              ] }, z)),
              Ee.map(({ i: z, ancla: I }) => /* @__PURE__ */ t("text", { x: O(z), y: n - 6, textAnchor: I, style: oe, children: r[z] ?? z + 1 }, z)),
              i && x.map((z, I) => Te(z.arriba).map((q, X) => {
                const te = (ae) => z.abajo ? _(z.abajo[ae]) : _(Math.max(S, Math.min(0, W))), le = `M${O(q[0])},${te(q[0])} ` + q.map((ae) => `L${O(ae)},${_(z.arriba[ae])}`).join(" ") + ` ${[...q].reverse().map((ae) => `L${O(ae)},${te(ae)}`).join(" ")} Z`;
                return /* @__PURE__ */ t(
                  "path",
                  {
                    d: le,
                    fill: de(e[I], I),
                    fillOpacity: m ? 0.55 : 0.12,
                    stroke: "none"
                  },
                  `a${I}-${X}`
                );
              })),
              x.map((z, I) => Te(z.arriba).map((q, X) => q.length === 1 ? /* @__PURE__ */ t(
                "circle",
                {
                  cx: O(q[0]),
                  cy: _(z.arriba[q[0]]),
                  r: "3",
                  fill: de(e[I], I)
                },
                `p${I}-${X}`
              ) : /* @__PURE__ */ t(
                "path",
                {
                  fill: "none",
                  stroke: de(e[I], I),
                  strokeWidth: "2",
                  strokeLinejoin: "round",
                  strokeLinecap: "round",
                  d: q.map((te, le) => `${le ? "L" : "M"}${O(te)},${_(z.arriba[te])}`).join(" ")
                },
                `l${I}-${X}`
              ))),
              g !== null && /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: B,
                    x2: B + F,
                    y1: _(g),
                    y2: _(g),
                    stroke: "var(--ds-ink-2)",
                    strokeWidth: "1.5",
                    strokeDasharray: "5 4"
                  }
                ),
                /* @__PURE__ */ u(
                  "text",
                  {
                    x: B + 6,
                    y: _(g) - 6,
                    style: { ...oe, fill: "var(--ds-ink-2)", fontWeight: 700 },
                    children: [
                      b,
                      " · ",
                      E(g, a)
                    ]
                  }
                )
              ] }),
              R && (() => {
                const z = x.map((I, q) => {
                  const X = I.arriba.map((te, le) => te === null ? -1 : le).filter((te) => te >= 0).pop();
                  return X === void 0 ? null : { si: q, yv: _(I.arriba[X]), xv: O(X) };
                }).filter(Boolean).sort((I, q) => I.yv - q.yv);
                for (let I = 1; I < z.length; I++)
                  z[I].yv - z[I - 1].yv < 14 && (z[I].yv = z[I - 1].yv + 14);
                return z.map((I) => /* @__PURE__ */ u(
                  "text",
                  {
                    x: B + F + 8,
                    y: I.yv,
                    dy: "0.32em",
                    style: { ...oe, fill: "var(--ds-ink-2)", fontWeight: 700 },
                    children: [
                      /* @__PURE__ */ t("title", { children: e[I.si].nombre }),
                      pn(e[I.si].nombre, Y - 12)
                    ]
                  },
                  I.si
                ));
              })(),
              v !== null && /* @__PURE__ */ u("g", { pointerEvents: "none", children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: O(v),
                    x2: O(v),
                    y1: $,
                    y2: $ + V,
                    stroke: "var(--ds-eje)",
                    strokeWidth: "1"
                  }
                ),
                x.map((z, I) => z.arriba[v] !== null && /* @__PURE__ */ t(
                  "circle",
                  {
                    cx: O(v),
                    cy: _(z.arriba[v]),
                    r: "4.5",
                    fill: de(e[I], I),
                    stroke: "var(--ds-surface-solid)",
                    strokeWidth: "2"
                  },
                  I
                ))
              ] }),
              /* @__PURE__ */ t("rect", { x: B, y: $, width: F, height: V, fill: "transparent" })
            ]
          }
        ) : /* @__PURE__ */ t(xe, { alto: n }),
        /* @__PURE__ */ t(
          Fe,
          {
            visible: v !== null,
            x: v === null ? 0 : O(v),
            y: Ze,
            ancho: p,
            titulo: v === null ? "" : r[v],
            renglones: v === null ? [] : e.map((z, I) => ({
              color: de(z, I),
              nombre: z.nombre,
              valor: E(x[I].crudo[v], a)
            }))
          }
        )
      ] })
    }
  );
}
const mr = 6.6, fn = 4, it = 2;
function He(e, r, n, a, i) {
  if (n <= 0 || a <= 0) return "";
  const d = Math.min(fn, n / 2, a / 2);
  return i === "arriba" ? `M${e},${r + a} L${e},${r + d} Q${e},${r} ${e + d},${r} L${e + n - d},${r} Q${e + n},${r} ${e + n},${r + d} L${e + n},${r + a} Z` : i === "abajo" ? `M${e},${r} L${e + n},${r} L${e + n},${r + a - d} Q${e + n},${r + a} ${e + n - d},${r + a} L${e + d},${r + a} Q${e},${r + a} ${e},${r + a - d} Z` : i === "derecha" ? `M${e},${r} L${e + n - d},${r} Q${e + n},${r} ${e + n},${r + d} L${e + n},${r + a - d} Q${e + n},${r + a} ${e + n - d},${r + a} L${e},${r + a} Z` : i === "izquierda" ? `M${e + n},${r} L${e + n},${r + a} L${e + d},${r + a} Q${e},${r + a} ${e},${r + a - d} L${e},${r + d} Q${e},${r} ${e + d},${r} Z` : `M${e},${r} h${n} v${a} h${-n} Z`;
}
const Xt = (e, r) => {
  const n = String(e ?? ""), a = Math.max(3, Math.floor(r / mr));
  return n.length > a ? `${n.slice(0, a - 1)}…` : n;
};
function Wa({
  datos: e,
  categorias: r,
  series: n,
  horizontal: a = !1,
  apiladas: i = !1,
  etiquetas: d = !1,
  resaltar: o,
  alto: s,
  formato: c = "numero",
  titulo: l,
  estilo: h
}) {
  var ae;
  const [p, v] = We(), [f, y] = H(null), m = e ? e.map((D) => D.etiqueta) : r || [], g = e ? [{
    clave: "valor",
    nombre: l || "Valor",
    valores: e.map((D) => D.valor),
    color: (ae = e[0]) == null ? void 0 : ae.color
  }] : n || [], b = m.length, x = g.length, M = (D, A) => {
    var P, G;
    const j = (G = (P = g[D]) == null ? void 0 : P.valores) == null ? void 0 : G[A];
    return j == null || !Number.isFinite(Number(j)) ? null : Number(j);
  };
  let w = 0, k = 0;
  for (let D = 0; D < b; D++)
    if (i) {
      let A = 0, j = 0;
      for (let P = 0; P < x; P++) {
        const G = M(P, D) ?? 0;
        G >= 0 ? A += G : j += G;
      }
      k = Math.max(k, A), w = Math.min(w, j);
    } else
      for (let A = 0; A < x; A++) {
        const j = M(A, D);
        j !== null && (k = Math.max(k, j), w = Math.min(w, j));
      }
  const N = b > 0 && x > 0 && g.some((D, A) => m.some((j, P) => M(A, P) !== null)), T = a ? v - Math.min(v * 0.38, 170) - 10 - (d ? 64 : 12) : 0, S = a ? Math.max(2, Math.min(4, Math.floor(T / 72))) : 4, { marcas: W, min: L, max: R } = bt(w, k, S), B = c === "moneda" ? "monedaCompacta" : c === "numero" ? "compacto" : c, Y = s ?? (a ? Math.max(120, b * (x > 1 && !i ? 18 * x + 14 : 34) + 34) : 240), $ = a ? Math.min(v * 0.38, 170) : 0, C = d ? 64 : 12, F = a ? $ + 10 : Math.max(...W.map((D) => String(E(D, B)).length)) * mr + 12, V = a ? C : 6, O = d && !a ? 18 : 8, _ = g.some((D) => (D.valores || []).some((A) => Number(A) < 0)), Oe = a ? 22 : 24 + (d && _ ? 16 : 0), ee = Math.max(10, v - F - V), ve = Y - O - Oe, re = (a ? ve : ee) / Math.max(1, b), Ee = re * (a ? 0.22 : 0.26), Ce = re - Ee, Te = i || x === 1 ? Ce : (Ce - it * (x - 1)) / x, ne = a ? Ye(L, R, F, F + ee) : Ye(L, R, O + ve, O), ze = ne(0), Ue = (D) => o == null || o === D ? 1 : 0.35, Ze = (D) => {
    const A = [], j = (a ? O : F) + D * re + Ee / 2;
    if (i) {
      let P = 0, G = 0;
      const he = [...g.keys()].reverse().find(($e) => (M($e, D) ?? 0) > 0), qe = [...g.keys()].reverse().find(($e) => (M($e, D) ?? 0) < 0);
      g.forEach(($e, Ne) => {
        const ke = M(Ne, D) ?? 0;
        if (ke === 0) return;
        const je = ke > 0 ? P : G, Je = je + ke;
        ke > 0 ? P = Je : G = Je, A.push({ off: j, grueso: Te, desde: je, hasta: Je, si: Ne, extremo: Ne === (ke > 0 ? he : qe) });
      });
    } else
      g.forEach((P, G) => {
        const he = M(G, D);
        he !== null && A.push({ off: j + G * (Te + it), grueso: Te, desde: 0, hasta: he, si: G, extremo: !0 });
      });
    return A;
  }, z = (D) => {
    const A = ne(D.desde), j = ne(D.hasta), P = D.hasta >= D.desde, G = i && !D.extremo ? it : 0;
    if (a) {
      const Ne = Math.min(A, j), ke = Math.abs(j - A), je = D.extremo ? P ? "derecha" : "izquierda" : "ninguno";
      return He(P ? Ne : Ne + G, D.off, ke - G, D.grueso, je);
    }
    const he = Math.min(A, j), qe = Math.abs(j - A), $e = D.extremo ? P ? "arriba" : "abajo" : "ninguno";
    return P ? He(D.off, he + G, D.grueso, qe - G, $e) : He(D.off, he, D.grueso, qe - G, $e);
  }, I = (D) => g.reduce((A, j, P) => A + (M(P, D) ?? 0), 0), q = {
    columnas: ["", ...g.map((D) => D.nombre)],
    filas: m.map((D, A) => [D, ...g.map((j, P) => E(M(P, A), c))])
  }, X = (D) => (a ? O : F) + D * re + re / 2, te = f === null ? { x: 0, y: 0 } : a ? { x: Math.min(v - 10, ne(Math.max(0, i ? I(f) : Math.max(...g.map((D, A) => M(A, f) ?? 0))))), y: X(f) } : { x: X(f), y: O + ve / 3 }, le = Math.max(1, Math.ceil(b * 44 / Math.max(1, ee)));
  return /* @__PURE__ */ t(
    be,
    {
      titulo: l,
      series: x > 1 ? g : [],
      tabla: N ? q : null,
      estilo: h,
      alto: Y,
      children: /* @__PURE__ */ u("div", { ref: p, style: { position: "relative", minWidth: 0 }, children: [
        N ? v > 0 && /* @__PURE__ */ u(
          "svg",
          {
            width: v,
            height: Y,
            role: "img",
            style: { display: "block", overflow: "visible" },
            "aria-label": `${l ? `${l}: ` : ""}${b} categorías`,
            children: [
              W.map((D) => a ? /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: ne(D),
                    x2: ne(D),
                    y1: O,
                    y2: O + ve,
                    stroke: D === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
                  }
                ),
                /* @__PURE__ */ t("text", { x: ne(D), y: Y - 6, textAnchor: "middle", style: oe, children: E(D, B) })
              ] }, D) : /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: F,
                    x2: F + ee,
                    y1: ne(D),
                    y2: ne(D),
                    stroke: D === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
                  }
                ),
                /* @__PURE__ */ t("text", { x: F - 8, y: ne(D), dy: "0.32em", textAnchor: "end", style: oe, children: E(D, B) })
              ] }, D)),
              m.map((D, A) => /* @__PURE__ */ u(
                "g",
                {
                  tabIndex: 0,
                  opacity: Ue(A),
                  "aria-label": `${D}: ${g.map((j, P) => `${x > 1 ? `${j.nombre} ` : ""}${E(M(P, A), c)}`).join(", ")}`,
                  onMouseEnter: () => y(A),
                  onMouseLeave: () => y(null),
                  onFocus: () => y(A),
                  onBlur: () => y(null),
                  style: { outline: "none", transition: "opacity var(--ds-t-state) var(--ds-ease)" },
                  children: [
                    a ? /* @__PURE__ */ t(
                      "rect",
                      {
                        x: F,
                        y: O + A * re,
                        width: ee,
                        height: re,
                        fill: f === A ? "var(--ds-surface-sunk)" : "transparent"
                      }
                    ) : /* @__PURE__ */ t(
                      "rect",
                      {
                        x: F + A * re,
                        y: O,
                        width: re,
                        height: ve,
                        fill: f === A ? "var(--ds-surface-sunk)" : "transparent"
                      }
                    ),
                    Ze(A).map((j, P) => /* @__PURE__ */ t("path", { d: z(j), fill: de(g[j.si], j.si) }, P)),
                    a ? /* @__PURE__ */ u(
                      "text",
                      {
                        x: F - 10,
                        y: X(A),
                        dy: "0.32em",
                        textAnchor: "end",
                        style: { ...oe, fontSize: 12, fill: "var(--ds-ink-2)" },
                        children: [
                          /* @__PURE__ */ t("title", { children: D }),
                          Xt(D, $)
                        ]
                      }
                    ) : A % le === 0 && /* @__PURE__ */ u("text", { x: X(A), y: Y - 6, textAnchor: "middle", style: oe, children: [
                      /* @__PURE__ */ t("title", { children: D }),
                      Xt(D, re * le - 4)
                    ] }),
                    d && (() => {
                      const j = i || x === 1 ? i ? I(A) : M(0, A) : null;
                      if (j === null) return null;
                      const P = E(j, B);
                      if (a) {
                        const he = ne(j);
                        return /* @__PURE__ */ t(
                          "text",
                          {
                            x: j >= 0 ? he + 6 : he - 6,
                            y: X(A),
                            dy: "0.32em",
                            textAnchor: j >= 0 ? "start" : "end",
                            style: { ...oe, fill: "var(--ds-ink)", fontWeight: 800 },
                            children: P
                          }
                        );
                      }
                      if (re < 34) return null;
                      const G = ne(j);
                      return /* @__PURE__ */ t(
                        "text",
                        {
                          x: X(A),
                          y: j >= 0 ? G - 6 : G + 14,
                          textAnchor: "middle",
                          style: { ...oe, fill: "var(--ds-ink)", fontWeight: 800 },
                          children: P
                        }
                      );
                    })()
                  ]
                },
                A
              )),
              a ? /* @__PURE__ */ t("line", { x1: ze, x2: ze, y1: O, y2: O + ve, stroke: "var(--ds-eje)" }) : /* @__PURE__ */ t("line", { x1: F, x2: F + ee, y1: ze, y2: ze, stroke: "var(--ds-eje)" })
            ]
          }
        ) : /* @__PURE__ */ t(xe, { alto: Y }),
        /* @__PURE__ */ t(
          Fe,
          {
            visible: f !== null,
            x: te.x,
            y: te.y,
            ancho: v,
            titulo: f === null ? "" : m[f],
            renglones: f === null ? [] : [
              ...g.map((D, A) => ({ color: de(D, A), nombre: D.nombre, valor: E(M(A, f), c) })),
              ...i && x > 1 ? [{ nombre: "Total", valor: E(I(f), c) }] : []
            ]
          }
        )
      ] })
    }
  );
}
const ot = 6;
function st(e, r, n, a, i, d) {
  const o = (g, b) => [e + g * Math.sin(b), r - g * Math.cos(b)], s = d - i > Math.PI ? 1 : 0, [c, l] = o(a, i), [h, p] = o(a, d), [v, f] = o(n, d), [y, m] = o(n, i);
  return `M${c},${l} A${a},${a} 0 ${s} 1 ${h},${p} L${v},${f} A${n},${n} 0 ${s} 0 ${y},${m} Z`;
}
function Ta({
  datos: e = [],
  formato: r = "numero",
  totalEtiqueta: n = "Total",
  tamano: a = 200,
  grosor: i = 26,
  titulo: d,
  estilo: o
}) {
  const [s, c] = H(null), l = e.map((k, N) => ({ ...k, propio: k.color, color: k.color || de(null, N), valor: Number(k.valor) })).filter((k) => Number.isFinite(k.valor) && k.valor > 0);
  let h = l;
  if (l.length > ot) {
    const k = [...l].sort((T, S) => S.valor - T.valor), N = k.slice(ot - 1);
    h = [
      ...k.slice(0, ot - 1).map((T, S) => ({ ...T, color: T.propio || de(null, S) })),
      {
        etiqueta: `Otros (${N.length})`,
        valor: N.reduce((T, S) => T + S.valor, 0),
        color: "var(--ds-ink-3)",
        otros: !0
      }
    ];
  }
  const p = h.reduce((k, N) => k + N.valor, 0), v = a / 2, f = a / 2, y = a / 2 - 4, m = y - i, g = h.length > 1 ? 2 / y : 0;
  let b = 0;
  const x = h.map((k) => {
    const N = k.valor / p * Math.PI * 2, T = { a0: b + g / 2, a1: b + N - g / 2 };
    return b += N, T;
  }), M = {
    columnas: ["", "Valor", "%"],
    filas: h.map((k) => [k.etiqueta, E(k.valor, r), U(k.valor / p)])
  }, w = s === null ? { t: n, v: E(p, r) } : { t: h[s].etiqueta, v: E(h[s].valor, r) };
  return /* @__PURE__ */ t(be, { titulo: d, tabla: p > 0 ? M : null, estilo: o, alto: a, children: p <= 0 ? /* @__PURE__ */ t(xe, { alto: a }) : /* @__PURE__ */ u("div", { style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--ds-5)" }, children: [
    /* @__PURE__ */ u("div", { style: { position: "relative", width: a, height: a, flexShrink: 0, margin: "0 auto" }, children: [
      /* @__PURE__ */ t(
        "svg",
        {
          width: a,
          height: a,
          role: "img",
          style: { display: "block" },
          "aria-label": `${d ? `${d}: ` : ""}${h.map((k) => `${k.etiqueta} ${U(k.valor / p)}`).join(", ")}`,
          children: h.length === 1 ? /* @__PURE__ */ t(
            "path",
            {
              d: `${st(v, f, m, y, 0, Math.PI)} ${st(v, f, m, y, Math.PI, Math.PI * 2)}`,
              fill: h[0].color
            }
          ) : h.map((k, N) => /* @__PURE__ */ t(
            "path",
            {
              d: st(
                v,
                f,
                s === N ? m - 3 : m,
                s === N ? y + 2 : y,
                x[N].a0,
                x[N].a1
              ),
              fill: k.color,
              opacity: s === null || s === N ? 1 : 0.4,
              onMouseEnter: () => c(N),
              onMouseLeave: () => c(null),
              style: { transition: "opacity var(--ds-t-state) var(--ds-ease)", cursor: "default" }
            },
            N
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
        s !== null && /* @__PURE__ */ t("div", { className: "ds-num", style: { fontSize: "var(--ds-t-small)", fontWeight: 700, color: "var(--ds-ink-2)" }, children: U(h[s].valor / p) })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { role: "list", style: { flex: "1 1 180px", minWidth: 0, display: "grid", gap: 2 }, children: h.map((k, N) => /* @__PURE__ */ u(
      "div",
      {
        role: "listitem",
        tabIndex: 0,
        onMouseEnter: () => c(N),
        onMouseLeave: () => c(null),
        onFocus: () => c(N),
        onBlur: () => c(null),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "6px 8px",
          borderRadius: "var(--ds-r-item)",
          outlineOffset: 0,
          background: s === N ? "var(--ds-surface-sunk)" : "transparent",
          transition: "background var(--ds-t-state) var(--ds-ease)"
        },
        children: [
          /* @__PURE__ */ t(Qe, { color: k.color }),
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
              title: k.etiqueta,
              children: k.etiqueta
            }
          ),
          /* @__PURE__ */ t("span", { className: "ds-num", style: { fontSize: "var(--ds-t-small)", fontWeight: 800, color: "var(--ds-ink)" }, children: E(k.valor, r) }),
          /* @__PURE__ */ t("span", { className: "ds-num", style: {
            fontSize: "var(--ds-t-micro)",
            fontWeight: 700,
            color: "var(--ds-ink-3)",
            minWidth: 44,
            textAlign: "right"
          }, children: U(k.valor / p) })
        ]
      },
      N
    )) })
  ] }) });
}
const Yt = [5, 4, 3, 2], mn = (e, r) => Yt[r <= 1 ? 0 : Math.round(e / (r - 1) * (Yt.length - 1))];
function za({ etapas: e = [], formato: r = "numero", titulo: n, estilo: a }) {
  var p;
  const [i, d] = We(), o = e.filter((v) => Number.isFinite(Number(v.valor))), s = Math.max(0, ...o.map((v) => Number(v.valor))), c = Number((p = o[0]) == null ? void 0 : p.valor), l = d > 0 && d < 460, h = {
    columnas: ["Etapa", "Valor", "vs anterior", "vs inicio"],
    filas: o.map((v, f) => [
      v.etiqueta,
      E(v.valor, r),
      f === 0 ? "—" : U(Number(o[f - 1].valor) ? Number(v.valor) / Number(o[f - 1].valor) : null),
      f === 0 ? "—" : U(c ? Number(v.valor) / c : null)
    ])
  };
  return /* @__PURE__ */ t(be, { titulo: n, tabla: s > 0 ? h : null, estilo: a, children: /* @__PURE__ */ t("div", { ref: i, style: { minWidth: 0 }, children: s <= 0 ? /* @__PURE__ */ t(xe, {}) : /* @__PURE__ */ t("ol", { style: { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: l ? 12 : 6 }, children: o.map((v, f) => {
    const y = Number(v.valor), m = f > 0 ? Number(o[f - 1].valor) : null, g = m ? y / m : null, b = c ? y / c : null, x = /* @__PURE__ */ t("div", { style: {
      height: 30,
      display: "flex",
      justifyContent: "center",
      background: "var(--ds-surface-sunk)",
      borderRadius: "var(--ds-r-item)",
      overflow: "hidden"
    }, children: /* @__PURE__ */ t("div", { style: {
      width: `${Math.max(1.5, y / s * 100)}%`,
      height: "100%",
      background: `var(--ds-sec-${mn(f, o.length)})`,
      borderRadius: "var(--ds-r-item)",
      transition: "width var(--ds-t-move) var(--ds-ease)"
    } }) }), M = /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "baseline", gap: 8, justifyContent: l ? "flex-start" : "flex-end", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ t("span", { className: "ds-num", style: { fontWeight: 800, color: "var(--ds-ink)", fontSize: "var(--ds-t-body)" }, children: E(y, r) }),
      f > 0 && /* @__PURE__ */ u("span", { className: "ds-num", style: { fontSize: "var(--ds-t-micro)", fontWeight: 700, color: "var(--ds-ink-3)", whiteSpace: "nowrap" }, children: [
        U(g),
        " de la anterior · ",
        U(b),
        " del inicio"
      ] })
    ] }), w = /* @__PURE__ */ t("div", { style: {
      fontSize: "var(--ds-t-small)",
      fontWeight: 700,
      color: "var(--ds-ink-2)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }, title: v.etiqueta, children: v.etiqueta });
    return /* @__PURE__ */ t("li", { "aria-label": `${v.etiqueta}: ${E(y, r)}${f > 0 ? `, ${U(g)} de la etapa anterior` : ""}`, children: l ? /* @__PURE__ */ u("div", { style: { display: "grid", gap: 6 }, children: [
      /* @__PURE__ */ u("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline", flexWrap: "wrap" }, children: [
        w,
        M
      ] }),
      x
    ] }) : /* @__PURE__ */ u("div", { style: {
      display: "grid",
      gridTemplateColumns: "minmax(90px, 22%) 1fr minmax(150px, 28%)",
      alignItems: "center",
      gap: 14
    }, children: [
      w,
      x,
      M
    ] }) }, f);
  }) }) }) });
}
const Gt = 6.6, gn = 4;
function Na({
  pasos: e = [],
  alto: r = 260,
  formato: n = "numero",
  etiquetas: a = !0,
  titulo: i,
  estilo: d
}) {
  const [o, s] = We(), [c, l] = H(null);
  let h = 0;
  const p = e.map(($) => {
    const C = Number($.valor);
    if ($.tipo === "total") {
      const O = Number.isFinite(C) && $.valor !== null && $.valor !== void 0 ? C : h;
      return h = O, { ...$, desde: 0, hasta: O, delta: O, total: !0 };
    }
    const F = Number.isFinite(C) ? C : 0, V = h;
    return h += F, { ...$, desde: V, hasta: h, delta: F, total: !1 };
  }), v = p.length > 0, f = p.flatMap(($) => [$.desde, $.hasta]), { marcas: y, min: m, max: g } = bt(Math.min(0, ...f), Math.max(0, ...f), 4), b = n === "moneda" ? "monedaCompacta" : n === "numero" ? "compacto" : n, x = Math.max(...y.map(($) => String(E($, b)).length)) * Gt + 12, M = a ? 20 : 8, w = 24, k = Math.max(10, s - x - 6), N = r - M - w, T = k / Math.max(1, p.length), S = T * 0.62, W = Ye(m, g, M + N, M), L = ($) => $.total ? "var(--ds-serie-1)" : $.delta >= 0 ? "var(--ds-ok)" : "var(--ds-risk)", R = ($, C = n) => $.total ? E($.hasta, C) : `${$.delta > 0 ? "+" : ""}${E($.delta, C)}`, B = ($, C) => {
    const F = Math.max(3, Math.floor(C / Gt));
    return $.length > F ? `${$.slice(0, F - 1)}…` : $;
  }, Y = {
    columnas: ["Paso", "Movimiento", "Acumulado"],
    filas: p.map(($) => [$.etiqueta, $.total ? "—" : R($), E($.hasta, n)])
  };
  return /* @__PURE__ */ t(be, { titulo: i, tabla: v ? Y : null, estilo: d, alto: r, children: /* @__PURE__ */ u("div", { ref: o, style: { position: "relative", minWidth: 0 }, children: [
    v ? s > 0 && /* @__PURE__ */ u(
      "svg",
      {
        width: s,
        height: r,
        role: "img",
        style: { display: "block", overflow: "visible" },
        "aria-label": `${i ? `${i}: ` : ""}${p.length} pasos, resultado ${E(h, n)}`,
        children: [
          y.map(($) => /* @__PURE__ */ u("g", { children: [
            /* @__PURE__ */ t(
              "line",
              {
                x1: x,
                x2: x + k,
                y1: W($),
                y2: W($),
                stroke: $ === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
              }
            ),
            /* @__PURE__ */ t("text", { x: x - 8, y: W($), dy: "0.32em", textAnchor: "end", style: oe, children: E($, b) })
          ] }, $)),
          p.map(($, C) => {
            const F = x + C * T + (T - S) / 2, V = W(Math.max($.desde, $.hasta)), O = W(Math.min($.desde, $.hasta)), _ = Math.max(1, O - V), Oe = $.hasta >= $.desde, ee = Math.min(gn, S / 2, _ / 2), ve = Oe ? `M${F},${V + _} L${F},${V + ee} Q${F},${V} ${F + ee},${V} L${F + S - ee},${V} Q${F + S},${V} ${F + S},${V + ee} L${F + S},${V + _} Z` : `M${F},${V} L${F + S},${V} L${F + S},${V + _ - ee} Q${F + S},${V + _} ${F + S - ee},${V + _} L${F + ee},${V + _} Q${F},${V + _} ${F},${V + _ - ee} Z`, re = p[C + 1];
            return /* @__PURE__ */ u(
              "g",
              {
                tabIndex: 0,
                style: { outline: "none" },
                "aria-label": `${$.etiqueta}: ${R($)}, acumulado ${E($.hasta, n)}`,
                onMouseEnter: () => l(C),
                onMouseLeave: () => l(null),
                onFocus: () => l(C),
                onBlur: () => l(null),
                children: [
                  /* @__PURE__ */ t(
                    "rect",
                    {
                      x: x + C * T,
                      y: M,
                      width: T,
                      height: N,
                      fill: c === C ? "var(--ds-surface-sunk)" : "transparent"
                    }
                  ),
                  /* @__PURE__ */ t("path", { d: ve, fill: L($) }),
                  re && /* @__PURE__ */ t(
                    "line",
                    {
                      x1: F + S,
                      x2: x + (C + 1) * T + (T - S) / 2,
                      y1: W($.hasta),
                      y2: W($.hasta),
                      stroke: "var(--ds-eje)",
                      strokeDasharray: "3 3"
                    }
                  ),
                  a && T >= 40 && /* @__PURE__ */ t(
                    "text",
                    {
                      x: F + S / 2,
                      y: V - 6,
                      textAnchor: "middle",
                      style: { ...oe, fill: "var(--ds-ink)", fontWeight: 800 },
                      children: R($, b)
                    }
                  ),
                  /* @__PURE__ */ u(
                    "text",
                    {
                      x: x + C * T + T / 2,
                      y: r - 6,
                      textAnchor: "middle",
                      style: { ...oe, fontWeight: $.total ? 800 : 600, fill: $.total ? "var(--ds-ink-2)" : "var(--ds-ink-3)" },
                      children: [
                        /* @__PURE__ */ t("title", { children: $.etiqueta }),
                        B(String($.etiqueta ?? ""), T - 4)
                      ]
                    }
                  )
                ]
              },
              C
            );
          })
        ]
      }
    ) : /* @__PURE__ */ t(xe, { alto: r }),
    /* @__PURE__ */ t(
      Fe,
      {
        visible: c !== null,
        ancho: s,
        x: c === null ? 0 : x + c * T + T / 2,
        y: c === null ? 0 : W(Math.max(p[c].desde, p[c].hasta)),
        titulo: c === null ? "" : p[c].etiqueta,
        renglones: c === null ? [] : [
          ...p[c].total ? [] : [{ color: L(p[c]), nombre: "Movimiento", valor: R(p[c]) }],
          { nombre: p[c].total ? "Total" : "Acumulado", valor: E(p[c].hasta, n) }
        ]
      }
    )
  ] }) });
}
const Ge = 5;
function gr(e) {
  const r = e.filter((n) => n != null && Number.isFinite(Number(n))).map(Number);
  return r.length ? { min: Math.min(...r), max: Math.max(...r) } : null;
}
function yr(e, r) {
  if (e == null || !Number.isFinite(Number(e)) || !r) return 0;
  if (r.max === r.min) return 3;
  const n = (Number(e) - r.min) / (r.max - r.min);
  return Math.min(Ge, 1 + Math.floor(n * Ge));
}
const Ke = (e) => `var(--ds-sec-${e})`;
function br({ rango: e, formato: r }) {
  if (!e) return null;
  const n = (e.max - e.min) / Ge;
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
    /* @__PURE__ */ t("span", { className: "ds-num", children: E(e.min, r) }),
    Array.from({ length: Ge }, (a, i) => /* @__PURE__ */ t(
      "span",
      {
        title: `${E(e.min + n * i, r)} – ${E(e.min + n * (i + 1), r)}`,
        style: { width: 22, height: 10, borderRadius: "var(--ds-r-mini)", background: Ke(i + 1) }
      },
      i
    )),
    /* @__PURE__ */ t("span", { className: "ds-num", children: E(e.max, r) }),
    /* @__PURE__ */ u("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, marginLeft: 10 }, children: [
      /* @__PURE__ */ t("span", { style: { width: 10, height: 10, borderRadius: "var(--ds-r-mini)", background: Ke(0) } }),
      "Sin dato"
    ] })
  ] });
}
function Da({
  filas: e = [],
  columnas: r = [],
  valores: n = [],
  formato: a = "numero",
  celdaMinima: i = 28,
  altoCelda: d = 28,
  titulo: o,
  estilo: s
}) {
  var w;
  const c = K(null), [l, h] = H(null), p = n.flat(), v = gr(p), f = Math.min(140, Math.max(36, ...e.map((k) => String(k).length * 7 + 12))), y = (k, N) => {
    var T;
    return (T = n == null ? void 0 : n[k]) == null ? void 0 : T[N];
  }, m = (k, N) => ({
    x: f + (N + 0.5) * (c.current ? (c.current.scrollWidth - f) / Math.max(1, r.length) : i),
    y: 22 + k * (d + 3)
  }), g = (k, N) => h((T) => {
    const [S, W] = T || [0, 0];
    return [Math.max(0, Math.min(e.length - 1, S + k)), Math.max(0, Math.min(r.length - 1, W + N))];
  }), b = (k) => {
    const N = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[k.key];
    N && (k.preventDefault(), g(...N)), k.key === "Escape" && h(null);
  }, x = {
    columnas: ["", ...r],
    filas: e.map((k, N) => [k, ...r.map((T, S) => E(y(N, S), a))])
  }, M = l ? m(...l) : { x: 0, y: 0 };
  return /* @__PURE__ */ t(be, { titulo: o, tabla: v ? x : null, estilo: s, children: v ? /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ u(
      "div",
      {
        ref: c,
        tabIndex: 0,
        role: "grid",
        "aria-label": `${o ? `${o}: ` : ""}${e.length} por ${r.length}. Flechas para recorrer.`,
        onKeyDown: b,
        onFocus: () => h((k) => k || [0, 0]),
        onBlur: () => h(null),
        onMouseLeave: () => h(null),
        style: { position: "relative", overflowX: "auto", paddingBottom: 4, outlineOffset: 2 },
        children: [
          /* @__PURE__ */ u("div", { style: {
            display: "grid",
            minWidth: f + r.length * i,
            gridTemplateColumns: `${f}px repeat(${r.length}, minmax(${i}px, 1fr))`,
            gap: 3
          }, children: [
            /* @__PURE__ */ t("div", {}),
            r.map((k, N) => /* @__PURE__ */ t(
              "div",
              {
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
                title: String(k),
                children: r.length > 16 && N % 2 ? "" : k
              },
              N
            )),
            e.map((k, N) => /* @__PURE__ */ u(ge.Fragment, { children: [
              /* @__PURE__ */ t("div", { style: {
                fontSize: "var(--ds-t-small)",
                fontWeight: 600,
                color: "var(--ds-ink-2)",
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                paddingRight: 6
              }, title: String(k), children: k }),
              r.map((T, S) => {
                const W = l && l[0] === N && l[1] === S;
                return /* @__PURE__ */ t(
                  "div",
                  {
                    role: "gridcell",
                    "aria-selected": !!W,
                    onMouseEnter: () => h([N, S]),
                    style: {
                      height: d,
                      borderRadius: "var(--ds-r-mini)",
                      background: Ke(yr(y(N, S), v)),
                      boxShadow: W ? "0 0 0 2px var(--ds-ink)" : "none",
                      transition: "box-shadow var(--ds-t-tap) var(--ds-ease-out)"
                    }
                  },
                  S
                );
              })
            ] }, N))
          ] }),
          /* @__PURE__ */ t(
            Fe,
            {
              visible: !!l,
              x: M.x,
              y: M.y,
              ancho: ((w = c.current) == null ? void 0 : w.scrollWidth) || 0,
              titulo: l ? `${e[l[0]]} · ${r[l[1]]}` : "",
              renglones: l ? [{ nombre: o || "Valor", valor: E(y(...l), a) }] : []
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(br, { rango: v, formato: a })
  ] }) : /* @__PURE__ */ t(xe, {}) });
}
const pe = 13, De = 3, yn = ["L", "", "M", "", "V", "", ""], lt = (e) => {
  if (e instanceof Date) return new Date(e.getFullYear(), e.getMonth(), e.getDate());
  const [r, n, a] = String(e).slice(0, 10).split("-").map(Number);
  return new Date(r, n - 1, a);
}, bn = (e) => `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
function Ia({ datos: e = [], desde: r, hasta: n, formato: a = "numero", titulo: i, estilo: d }) {
  const o = K(null), [s, c] = H(null), { dias: l, semanas: h, mapa: p, rango: v } = fe(() => {
    const T = new Map(e.map(($) => [String($.fecha).slice(0, 10), $.valor])), S = e.map(($) => lt($.fecha)).sort(($, C) => $ - C), W = r ? lt(r) : S[0], L = n ? lt(n) : S[S.length - 1];
    if (!W || !L || L < W) return { dias: [], semanas: 0, mapa: T, rango: null };
    const R = new Date(W);
    R.setDate(R.getDate() - (R.getDay() + 6) % 7);
    const B = [];
    for (let $ = new Date(R); $ <= L; $.setDate($.getDate() + 1)) {
      const C = bn($);
      B.push({ fecha: new Date($), k: C, fuera: $ < W, valor: T.get(C) });
    }
    const Y = B.filter(($) => !$.fuera).map(($) => $.valor);
    return { dias: B, semanas: Math.ceil(B.length / 7), mapa: T, rango: gr(Y) };
  }, [e, r, n]);
  Ae(() => {
    o.current && (o.current.scrollLeft = o.current.scrollWidth);
  }, [h]);
  const f = 18, y = 18, m = (T) => ({
    x: f + Math.floor(T / 7) * (pe + De),
    y: y + T % 7 * (pe + De)
  }), g = [];
  l.forEach((T, S) => {
    if (S % 7 === 0) {
      const W = S / 7, L = l.slice(S, S + 7).find((R) => R.fecha.getDate() === 1) || (S === 0 ? T : null);
      L && (!g.length || W - g[g.length - 1].sem >= 3) && g.push({ sem: W, texto: Z(L.fecha, "mesCorto") });
    }
  });
  const b = (T) => {
    const S = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -7, ArrowRight: 7 }[T.key];
    S && (T.preventDefault(), c((W) => {
      var R;
      let L = (W ?? l.length - 1) + S;
      for (L = Math.max(0, Math.min(l.length - 1, L)); (R = l[L]) != null && R.fuera && L < l.length - 1; ) L += 1;
      return L;
    })), T.key === "Escape" && c(null);
  }, x = f + h * (pe + De), M = y + 7 * (pe + De), w = {
    columnas: ["Fecha", "Valor"],
    filas: l.filter((T) => !T.fuera && T.valor !== void 0).map((T) => [Z(T.fecha, "media"), E(T.valor, a)])
  }, k = s !== null ? l[s] : null, N = s !== null ? m(s) : { x: 0, y: 0 };
  return /* @__PURE__ */ t(be, { titulo: i, tabla: v ? w : null, estilo: d, children: v ? /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ u(
      "div",
      {
        ref: o,
        tabIndex: 0,
        role: "grid",
        "aria-label": `${i ? `${i}: ` : ""}calendario de ${h} semanas. Flechas para recorrer.`,
        onKeyDown: b,
        onFocus: () => c((T) => T ?? l.length - 1),
        onBlur: () => c(null),
        onMouseLeave: () => c(null),
        style: { position: "relative", overflowX: "auto", paddingBottom: 4, outlineOffset: 2 },
        children: [
          /* @__PURE__ */ u("svg", { width: x, height: M, style: { display: "block" }, children: [
            g.map((T) => /* @__PURE__ */ t(
              "text",
              {
                x: f + T.sem * (pe + De),
                y: 11,
                style: { fontSize: 11, fontWeight: 600, fill: "var(--ds-ink-3)", fontFamily: "var(--ds-font)" },
                children: T.texto
              },
              T.sem
            )),
            yn.map((T, S) => T && /* @__PURE__ */ t(
              "text",
              {
                x: 0,
                y: y + S * (pe + De) + pe - 2,
                style: { fontSize: 10, fontWeight: 600, fill: "var(--ds-ink-3)", fontFamily: "var(--ds-font)" },
                children: T
              },
              S
            )),
            l.map((T, S) => {
              if (T.fuera) return null;
              const { x: W, y: L } = m(S);
              return /* @__PURE__ */ t(
                "rect",
                {
                  x: W,
                  y: L,
                  width: pe,
                  height: pe,
                  rx: "3",
                  fill: Ke(yr(T.valor, v)),
                  stroke: s === S ? "var(--ds-ink)" : "none",
                  strokeWidth: "2",
                  onMouseEnter: () => c(S)
                },
                T.k
              );
            })
          ] }),
          /* @__PURE__ */ t(
            Fe,
            {
              visible: !!k,
              x: N.x + pe / 2,
              y: N.y,
              ancho: x,
              titulo: k ? Z(k.fecha, "larga") : "",
              renglones: k ? [{ nombre: i || "Valor", valor: k.valor === void 0 ? "Sin dato" : E(k.valor, a) }] : []
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(br, { rango: v, formato: a })
  ] }) : /* @__PURE__ */ t(xe, {}) });
}
const Kt = ["var(--ds-line-firm)", "var(--ds-esqueleto-brillo)", "var(--ds-surface-sunk)"];
function xn({ item: e, formato: r, angosto: n, anchoEtiqueta: a }) {
  const { etiqueta: i, valor: d, meta: o, rangos: s = [], menorEsMejor: c = !1, nota: l } = e, h = Number(d), p = Math.max(...[...s, h, Number(o)].filter(Number.isFinite), 1), v = (M) => `${Math.max(0, Math.min(100, M / p * 100))}%`, f = [0, ...s.slice(0, 2), p], y = c ? [...Kt].reverse() : Kt, m = !Number.isFinite(h), g = /* @__PURE__ */ u("div", { style: { position: "relative", height: 22, borderRadius: "var(--ds-r-mini)", overflow: "hidden", background: y[2] }, children: [
    s.length > 0 && f.slice(0, -1).map((M, w) => /* @__PURE__ */ t("div", { style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: v(M),
      width: `calc(${v(f[w + 1])} - ${v(M)})`,
      background: y[w]
    } }, w)),
    !m && /* @__PURE__ */ t("div", { style: {
      position: "absolute",
      left: 0,
      top: "32%",
      height: "36%",
      width: v(h),
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
      left: `calc(${v(Number(o))} - 1.5px)`,
      background: "var(--ds-ink)"
    } })
  ] }), b = /* @__PURE__ */ u("div", { className: "ds-num", style: { textAlign: n ? "left" : "right", whiteSpace: "nowrap" }, children: [
    /* @__PURE__ */ t("span", { style: { fontWeight: 800, color: "var(--ds-ink)" }, children: m ? "Sin dato" : E(h, r) }),
    Number.isFinite(Number(o)) && /* @__PURE__ */ u("span", { style: { fontSize: "var(--ds-t-micro)", fontWeight: 700, color: "var(--ds-ink-3)", marginLeft: 6 }, children: [
      "meta ",
      E(o, r)
    ] })
  ] }), x = /* @__PURE__ */ u("div", { style: { minWidth: 0 }, children: [
    /* @__PURE__ */ t("div", { style: {
      fontSize: "var(--ds-t-small)",
      fontWeight: 700,
      color: "var(--ds-ink-2)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }, title: i, children: i }),
    l && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-micro)", color: "var(--ds-ink-3)" }, children: l })
  ] });
  return /* @__PURE__ */ t("li", { "aria-label": `${i}: ${m ? "sin dato" : E(h, r)}${Number.isFinite(Number(o)) ? `, meta ${E(o, r)}` : ""}`, children: n ? /* @__PURE__ */ u("div", { style: { display: "grid", gap: 6 }, children: [
    /* @__PURE__ */ u("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }, children: [
      x,
      b
    ] }),
    g
  ] }) : /* @__PURE__ */ u("div", { style: { display: "grid", gridTemplateColumns: `${a}px 1fr auto`, alignItems: "center", gap: 14 }, children: [
    x,
    g,
    b
  ] }) });
}
function La({ items: e, item: r, formato: n = "numero", titulo: a, estilo: i }) {
  const [d, o] = We(), s = e || (r ? [r] : []), c = o > 0 && o < 460, l = Math.min(180, Math.max(90, o * 0.26)), h = {
    columnas: ["", "Real", "Meta"],
    filas: s.map((p) => [p.etiqueta, E(p.valor, n), E(p.meta, n)])
  };
  return /* @__PURE__ */ t(be, { titulo: a, tabla: s.length ? h : null, estilo: i, children: /* @__PURE__ */ t("div", { ref: d, style: { minWidth: 0 }, children: s.length ? /* @__PURE__ */ t("ul", { style: { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: c ? 16 : 12 }, children: s.map((p, v) => /* @__PURE__ */ t(xn, { item: p, formato: n, angosto: c, anchoEtiqueta: l }, v)) }) : /* @__PURE__ */ t(xe, { alto: 100 }) }) });
}
const kn = {
  ok: "var(--ds-ok)",
  aviso: "var(--ds-warn)",
  riesgo: "var(--ds-risk)",
  neutro: "var(--ds-ink-3)",
  acento: "var(--ds-accent-trazo)"
};
function Ra({
  segmentos: e = [],
  formato: r = "numero",
  alto: n = 14,
  leyenda: a = !0,
  titulo: i,
  estilo: d
}) {
  const [o, s] = We(), [c, l] = H(null), h = e.map((m, g) => ({ ...m, valor: Number(m.valor), color: m.color || kn[m.tono] || de(null, g) })).filter((m) => Number.isFinite(m.valor) && m.valor > 0), p = h.reduce((m, g) => m + g.valor, 0);
  let v = 0;
  const f = h.map((m) => {
    const g = v + m.valor / 2;
    return v += m.valor, p ? g / p * s : 0;
  }), y = {
    columnas: ["", "Valor", "%"],
    filas: h.map((m) => [m.etiqueta, E(m.valor, r), U(m.valor / p)])
  };
  return /* @__PURE__ */ t(be, { titulo: i, tabla: p > 0 ? y : null, estilo: d, children: /* @__PURE__ */ t("div", { ref: o, style: { position: "relative", minWidth: 0 }, children: p <= 0 ? /* @__PURE__ */ t(xe, { alto: 60 }) : /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ t("div", { role: "list", style: {
      display: "flex",
      gap: 2,
      height: n,
      borderRadius: "var(--ds-r-pill)",
      overflow: "hidden"
    }, children: h.map((m, g) => /* @__PURE__ */ t(
      "div",
      {
        role: "listitem",
        tabIndex: 0,
        "aria-label": `${m.etiqueta}: ${E(m.valor, r)}, ${U(m.valor / p)}`,
        onMouseEnter: () => l(g),
        onMouseLeave: () => l(null),
        onFocus: () => l(g),
        onBlur: () => l(null),
        style: {
          flex: `${m.valor} 1 0`,
          minWidth: 4,
          background: m.color,
          opacity: c === null || c === g ? 1 : 0.45,
          outlineOffset: -2,
          transition: "opacity var(--ds-t-state) var(--ds-ease)"
        }
      },
      g
    )) }),
    /* @__PURE__ */ t(
      Fe,
      {
        visible: c !== null,
        ancho: s,
        x: c === null ? 0 : f[c],
        y: n + 6,
        titulo: c === null ? "" : h[c].etiqueta,
        renglones: c === null ? [] : [
          { color: h[c].color, nombre: "Valor", valor: E(h[c].valor, r) },
          { nombre: "Del total", valor: U(h[c].valor / p) }
        ]
      }
    ),
    a && /* @__PURE__ */ t("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "8px 16px",
      marginTop: "var(--ds-4)"
    }, children: h.map((m, g) => /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "flex-start", gap: 8, minWidth: 0 }, children: [
      /* @__PURE__ */ t("span", { style: { marginTop: 4 }, children: /* @__PURE__ */ t(Qe, { color: m.color }) }),
      /* @__PURE__ */ u("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ t("div", { style: {
          fontSize: "var(--ds-t-micro)",
          fontWeight: 700,
          color: "var(--ds-ink-3)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }, title: m.etiqueta, children: m.etiqueta }),
        /* @__PURE__ */ u("div", { className: "ds-num", style: { fontSize: "var(--ds-t-small)", fontWeight: 800, color: "var(--ds-ink)" }, children: [
          E(m.valor, r),
          /* @__PURE__ */ t("span", { style: { fontWeight: 700, color: "var(--ds-ink-3)", marginLeft: 6, fontSize: "var(--ds-t-micro)" }, children: U(m.valor / p) })
        ] })
      ] })
    ] }, g)) })
  ] }) }) });
}
export {
  Xe as ALTO_DOCK,
  ba as Actividad,
  Sr as Anillo,
  jn as Armazon,
  Hn as Aviso,
  Ar as Azulejo,
  La as Bala,
  Fn as Barra,
  Ra as BarraDistribucion,
  $a as BarraFiltros,
  On as BarraSeleccion,
  Rn as Barras,
  Tn as Bento,
  _e as Boton,
  Ea as Buscador,
  xa as Calendario,
  Ia as CalendarioCalor,
  Ca as Campo,
  Pn as Campos,
  na as Cargando,
  Na as Cascada,
  Mt as Casilla,
  zn as Celda,
  vn as Chip,
  In as Cifra,
  hr as CuerpoKpi,
  va as Detalles,
  Ta as Dona,
  za as Embudo,
  ka as EncabezadoPagina,
  Q as Esqueleto,
  Mr as EsqueletoFila,
  Ln as EsqueletoLista,
  pa as EstadoVacio,
  An as Fila,
  sa as FilaKpis,
  xt as Flotante,
  Vn as Formulario,
  Nr as Giro,
  Fe as Globo,
  Wa as GraficaBarras,
  Ma as GraficaLinea,
  fa as GrupoRetratos,
  Nn as Heroe,
  er as Insignia,
  Cn as Interruptor,
  ya as Kanban,
  En as Lamina,
  Qr as Leyenda,
  ma as LineaTiempo,
  ha as Llamado,
  Da as MapaCalor,
  be as MarcoGrafica,
  $r as Medidor,
  Rr as Migas,
  Vr as Modal,
  pr as OpcionFlotante,
  fr as PERIODOS,
  aa as PanelInicio,
  ga as Pasos,
  Le as Pastilla,
  ra as Pestanas,
  Mn as ProveedorTema,
  mt as Retrato,
  Dt as SERIES,
  me as SIN_DATO,
  Dr as Seccion,
  wa as Segmentado,
  ja as Selector,
  Bn as SelectorArmazon,
  Sa as SelectorPeriodo,
  xe as SinDatos,
  Zr as Sparkline,
  we as Superficie,
  qn as Tabla,
  da as TarjetaComparativa,
  ua as TarjetaEntidad,
  oa as TarjetaKpi,
  la as TarjetaMeta,
  ca as TarjetaRanking,
  Er as Transicion,
  vr as Variacion,
  Dn as Vidrio,
  dr as compacto,
  Jn as condicion,
  Kr as configurarFormato,
  Un as correo,
  Kn as digitos,
  Z as fecha,
  yt as fechaRelativa,
  ue as formatear,
  ia as formato,
  Xn as maximo,
  Yn as minimo,
  ut as moneda,
  Gn as numero,
  Zn as patron,
  U as porcentaje,
  _t as rangoPeriodo,
  _n as requerido,
  Qn as soloDigitos,
  un as textoRango,
  ye as useAngosto,
  gt as useArmazon,
  ta as useFiltros,
  ea as useFormulario,
  We as useMedida,
  Wn as useTema,
  ur as variacion
};
