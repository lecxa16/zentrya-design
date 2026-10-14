import "./estilos.css";
import { jsx as t, jsxs as u, Fragment as J } from "react/jsx-runtime";
import me, { useState as O, useEffect as ie, useCallback as se, useContext as Gt, createContext as Kt, useMemo as ke, useRef as G, useLayoutEffect as Ae } from "react";
import { B as Aa, C as Fa, S as Ea } from "./Campo-JwU_Rw43.js";
import { createPortal as Ut } from "react-dom";
const st = "ds-theme", Zt = Kt({ tema: "light", alternar: () => {
}, fijar: () => {
} });
function br() {
  try {
    const e = localStorage.getItem(st);
    if (e === "light" || e === "dark") return e;
  } catch {
  }
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function $n({ children: e, forzar: r, marca: n }) {
  const [a, i] = O(() => r || br());
  ie(() => {
    const o = document.documentElement;
    o.setAttribute("data-ds-theme", a), o.style.colorScheme = a;
    try {
      localStorage.setItem(st, a);
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
      o = !!localStorage.getItem(st);
    } catch {
    }
    if (o) return;
    const s = window.matchMedia("(prefers-color-scheme: dark)"), c = (l) => i(l.matches ? "dark" : "light");
    return s.addEventListener("change", c), () => s.removeEventListener("change", c);
  }, [r]);
  const d = se(() => i((o) => o === "dark" ? "light" : "dark"), []);
  return /* @__PURE__ */ t(Zt.Provider, { value: { tema: a, alternar: d, fijar: i }, children: /* @__PURE__ */ t("div", { className: "ds-root", children: e }) });
}
const Mn = () => Gt(Zt), xt = { plana: "var(--ds-lift-1)", elevada: "var(--ds-lift-2)", flotante: "var(--ds-lift-3)" };
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
        boxShadow: a ? "none" : xt[r],
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
        h.currentTarget.style.transform = "none", h.currentTarget.style.boxShadow = xt[r];
      } : void 0,
      children: e
    }
  );
}
function Wn({ children: e, marco: r = !1, columnas: n = 12, hueco: a = "var(--ds-4)", estilo: i }) {
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
function Tn({ children: e, ancho: r = 12, anchoMd: n, alto: a, estilo: i }) {
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
  const [v, m] = me.useState(!1), y = o && r && !v;
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
function zn({ children: e, interactivo: r = !1, estilo: n, ...a }) {
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
const xr = {
  neutro: "var(--ds-ink)",
  acento: "var(--ds-accent-tinta)",
  ok: "var(--ds-ok)",
  aviso: "var(--ds-warn)",
  riesgo: "var(--ds-risk)"
}, kr = { m: "var(--ds-num-m)", l: "var(--ds-num-l)", xl: "var(--ds-num-xl)" };
function Dn({
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
      fontSize: kr[i],
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: "-0.035em",
      color: xr[a],
      marginTop: 2
    }, children: e }),
    n && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", marginTop: 3 }, children: n })
  ] });
}
function wr({
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
const kt = {
  acento: "var(--ds-accent-trazo)",
  ok: "var(--ds-ok)",
  aviso: "var(--ds-warn)",
  riesgo: "var(--ds-risk)"
};
function Sr({
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
        background: kt[n] || kt.acento,
        transition: "width var(--ds-t-move) var(--ds-ease)"
      } })
    }
  );
}
function K({
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
function $r({ retrato: e = !0, lineas: r = 2, derecha: n = !0 }) {
  return /* @__PURE__ */ u("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "var(--ds-3)",
    padding: "var(--ds-3) var(--ds-4)"
  }, children: [
    e && /* @__PURE__ */ t(K, { circulo: !0, alto: 40 }),
    /* @__PURE__ */ u("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 7 }, children: [
      /* @__PURE__ */ t(K, { alto: 12, ancho: "42%" }),
      r > 1 && /* @__PURE__ */ t(K, { alto: 10, ancho: "26%" })
    ] }),
    n && /* @__PURE__ */ t(K, { alto: 12, ancho: 78 })
  ] });
}
function In({ filas: e = 5, ...r }) {
  return /* @__PURE__ */ t("div", { children: Array.from({ length: e }, (n, a) => /* @__PURE__ */ t("div", { style: { opacity: 1 - a * 0.12 }, children: /* @__PURE__ */ t($r, { ...r }) }, a)) });
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
        children: e.map((v, m) => {
          const y = v.total ?? v.valor ?? 0, g = v.valor ?? 0, f = y / l * 100, x = g / l * 100;
          return /* @__PURE__ */ u(
            "div",
            {
              title: v.etiqueta,
              style: { position: "relative", height: "100%", ...h },
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
                  background: v.tono || n,
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
    s && /* @__PURE__ */ t("div", { style: {
      display: "flex",
      gap: d,
      marginTop: 8,
      flexShrink: 0,
      justifyContent: "space-between"
    }, children: e.map((v, m) => /* @__PURE__ */ t("div", { style: {
      ...h,
      textAlign: "center",
      fontSize: "var(--ds-t-micro)",
      fontWeight: 600,
      color: "var(--ds-ink-3)"
    }, children: v.eje ?? "" }, m)) })
  ] });
}
const Pe = {
  neutro: ["var(--ds-surface-sunk)", "var(--ds-ink-2)"],
  acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)"],
  ok: ["var(--ds-ok-soft)", "var(--ds-ok)"],
  aviso: ["var(--ds-warn-soft)", "var(--ds-warn)"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)"]
};
function Re({ children: e, tono: r = "neutro", icono: n, estilo: a, ...i }) {
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
function Qt({ children: e, tono: r = "acento", tamano: n = 38, estilo: a }) {
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
const Mr = {
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
}, Wr = {
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
}, Tr = `
@keyframes ds-boton-gira { to { transform: rotate(360deg); } }
@keyframes ds-boton-late { 50% { opacity: .35; } }
.ds-boton-giro { width: 15px; height: 15px; flex-shrink: 0; border-radius: 50%;
  border: 2px solid currentColor; border-right-color: transparent;
  animation: ds-boton-gira .7s linear infinite; }
@media (prefers-reduced-motion: reduce) { .ds-boton-giro { animation: ds-boton-late 1.2s ease-in-out infinite; } }
`;
function Nr({ estilo: e }) {
  return /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ t("style", { children: Tr }),
    /* @__PURE__ */ t("span", { className: "ds-boton-giro", "aria-hidden": !0, style: e })
  ] });
}
function lt({
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
        ...Mr,
        ...Wr[r],
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
function Ln({
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
  const [i, d] = me.useState(!1), o = r.split(" ").filter(Boolean).slice(0, 2).map((l) => l[0]).join("").toUpperCase();
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
function zr({ titulo: e, nota: r, accion: n, children: a, estilo: i }) {
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
function ge(e = 760) {
  const [r, n] = O(
    () => typeof window < "u" && window.innerWidth <= e
  );
  return ie(() => {
    if (typeof window > "u" || !window.matchMedia) return;
    const a = window.matchMedia(`(max-width: ${e}px)`), i = (d) => n(d.matches);
    return n(a.matches), a.addEventListener("change", i), () => a.removeEventListener("change", i);
  }, [e]), r;
}
const Jt = { containerType: "inline-size", minWidth: 0 };
function er(e, r) {
  const n = Math.max(4, String(r ?? "").length);
  return `min(${e}, calc(100cqi / ${(n * 0.62).toFixed(2)}))`;
}
const Dr = /* @__PURE__ */ t(
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
), Ir = /* @__PURE__ */ t(
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
), Qe = {
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
  const n = ge();
  if (e.length === 0) return null;
  const a = e[e.length - 1], i = e.length > 1 ? e[e.length - 2] : null, d = i && i.ir ? /* @__PURE__ */ u(
    "button",
    {
      onClick: i.ir,
      style: { ...Qe, color: "var(--ds-ink-2)", fontWeight: 700 },
      onMouseEnter: (o) => {
        o.currentTarget.style.color = "var(--ds-accent-tinta)";
      },
      onMouseLeave: (o) => {
        o.currentTarget.style.color = "var(--ds-ink-2)";
      },
      children: [
        Ir,
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
        s > 0 && /* @__PURE__ */ t("span", { style: { color: "var(--ds-ink-3)", display: "inline-flex" }, children: Dr }),
        c ? /* @__PURE__ */ t("span", { "aria-current": "page", style: {
          ...Qe,
          cursor: "default",
          color: "var(--ds-ink)",
          fontWeight: 700
        }, children: o.texto }) : /* @__PURE__ */ t(
          "button",
          {
            onClick: o.ir,
            style: Qe,
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
function An({ marca: e, secciones: r = [], activa: n, onIr: a, derecha: i, estilo: d }) {
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
function Fn({
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
          e && !m ? /* @__PURE__ */ t(g, {}) : (
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
function Lr({
  icono: e,
  etiqueta: r,
  nota: n,
  color: a,
  onClick: i,
  ancho: d = 1,
  entrada: o,
  estilo: s
}) {
  const [c, l] = me.useState(!1), h = a || "var(--ds-accent)", p = `color-mix(in oklab, ${h}, var(--ds-mezcla-tono))`;
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
function En({
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
function Cn({
  columnas: e = [],
  filas: r = [],
  claveFila: n,
  onFila: a,
  vacio: i = "No hay nada que mostrar.",
  cargando: d = !1,
  porPagina: o = 0,
  estilo: s
}) {
  const [c, l] = O(1), h = r.length, p = o > 0 && h > o, v = p ? Math.ceil(h / o) : 1;
  ie(
    () => {
      l((f) => Math.min(Math.max(1, f), Math.max(1, v)));
    },
    [v, h]
  ), ie(() => {
    l(1);
  }, [o]);
  const m = ke(() => p ? r.slice((c - 1) * o, c * o) : r, [r, c, o, p]), y = h === 0 ? 0 : (c - 1) * o + 1, g = p ? Math.min(c * o, h) : h;
  return /* @__PURE__ */ u("div", { style: s, children: [
    /* @__PURE__ */ t("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ u("table", { style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--ds-font)"
    }, children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { children: e.map((f) => /* @__PURE__ */ t("th", { scope: "col", style: {
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
        d && Array.from(
          { length: Math.max(3, Math.min(o || 6, 8)) },
          (f, x) => /* @__PURE__ */ t("tr", { style: { opacity: 1 - x * 0.1 }, children: e.map((b, k) => /* @__PURE__ */ t("td", { style: {
            padding: "var(--ds-3)",
            borderBottom: "1px solid var(--ds-line)"
          }, children: /* @__PURE__ */ u("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: "var(--ds-3)",
            justifyContent: b.numerica ? "flex-end" : "flex-start"
          }, children: [
            k === 0 && /* @__PURE__ */ t(K, { circulo: !0, alto: 36 }),
            /* @__PURE__ */ t(K, { alto: 11, ancho: k === 0 ? "58%" : b.numerica ? 46 : "72%" })
          ] }) }, b.clave)) }, `esq-${x}`)
        ),
        !d && h === 0 && /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t("td", { colSpan: e.length, style: {
          padding: "var(--ds-8) 0",
          textAlign: "center",
          color: "var(--ds-ink-3)",
          fontSize: "var(--ds-t-body)"
        }, children: i }) }),
        !d && m.map((f, x) => {
          const b = !!a;
          return /* @__PURE__ */ t(
            "tr",
            {
              onClick: b ? () => a(f) : void 0,
              style: {
                cursor: b ? "pointer" : void 0,
                transition: "background var(--ds-t-state) var(--ds-ease)"
              },
              onMouseEnter: b ? (k) => {
                k.currentTarget.style.background = "var(--ds-surface-2)";
              } : void 0,
              onMouseLeave: b ? (k) => {
                k.currentTarget.style.background = "transparent";
              } : void 0,
              children: e.map((k) => /* @__PURE__ */ t(
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
    p && !d && /* @__PURE__ */ u("div", { style: {
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
        y,
        "–",
        g,
        " de ",
        h
      ] }),
      /* @__PURE__ */ t("span", { style: { flex: 1 } }),
      /* @__PURE__ */ t(
        wt,
        {
          texto: "Anterior",
          hacia: "M15 18l-6-6 6-6",
          inactivo: c <= 1,
          onClick: () => l((f) => Math.max(1, f - 1))
        }
      ),
      /* @__PURE__ */ u("span", { className: "ds-num", style: {
        fontSize: "var(--ds-t-small)",
        fontWeight: 700,
        color: "var(--ds-ink-2)"
      }, children: [
        c,
        " / ",
        v
      ] }),
      /* @__PURE__ */ t(
        wt,
        {
          texto: "Siguiente",
          hacia: "M9 18l6-6-6-6",
          inactivo: c >= v,
          derecha: !0,
          onClick: () => l((f) => Math.min(v, f + 1))
        }
      )
    ] })
  ] });
}
function wt({ texto: e, hacia: r, inactivo: n, derecha: a, onClick: i }) {
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
function Ar({
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
  const l = c === "derecha", h = G(null), p = G(null), v = G(r);
  return v.current = r, ie(() => {
    if (!e) return;
    p.current = document.activeElement;
    const m = (g) => {
      var f;
      g.key === "Escape" && (g.stopPropagation(), (f = v.current) == null || f.call(v));
    };
    document.addEventListener("keydown", m, !0);
    const y = setTimeout(() => {
      var g;
      return (g = h.current) == null ? void 0 : g.focus();
    }, 40);
    return () => {
      var g, f;
      document.removeEventListener("keydown", m, !0), clearTimeout(y);
      try {
        (f = (g = p.current) == null ? void 0 : g.focus) == null || f.call(g);
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
const St = {
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
function jn({ abierto: e, severidad: r = "info", titulo: n, mensaje: a, onCerrar: i, acciones: d }) {
  const o = St[r] || St.info, s = se(() => i == null ? void 0 : i(), [i]), c = (d || []).some((l) => l.cierra);
  return /* @__PURE__ */ t(Ar, { abierto: e, onCerrar: s, ancho: 420, children: /* @__PURE__ */ u("div", { style: { textAlign: "center", padding: "var(--ds-2) 0" }, children: [
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
        lt,
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
      !c && /* @__PURE__ */ t(lt, { variante: (d || []).length ? "fantasma" : "solido", onClick: s, children: "Entendido" })
    ] })
  ] }) });
}
const $t = /* @__PURE__ */ new Map(), Mt = (e) => String(e ?? "").split("/").filter(Boolean).length;
function Fr(e, r, n) {
  const a = getComputedStyle(e).getPropertyValue(r).trim();
  return a.endsWith("ms") ? parseFloat(a) : a.endsWith("s") ? parseFloat(a) * 1e3 : n;
}
function Er({ vista: e, eje: r = "auto", ambito: n = "vista", children: a, estilo: i }) {
  const d = G(null);
  return Ae(() => {
    var h, p;
    const o = d.current, s = $t.get(n);
    if ($t.set(n, e), !o || e === void 0 || s === void 0 || s === e || typeof o.animate != "function" || (p = (h = window.matchMedia) == null ? void 0 : h.call(window, "(prefers-reduced-motion: reduce)")) != null && p.matches) return;
    const c = r === "y" ? 0 : Mt(e) - Mt(s), l = c > 0 ? { left: "24px", top: "0px" } : c < 0 ? { left: "-24px", top: "0px" } : { left: "0px", top: "14px" };
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
const tr = "ds-nav", dt = ["topbar", "sidebar", "dock"], ct = 64, rr = Kt({ modo: "topbar", fijarModo: () => {
} }), nr = () => Gt(rr);
function Cr() {
  try {
    const e = localStorage.getItem(tr);
    if (dt.includes(e)) return e;
  } catch {
  }
  return "topbar";
}
const ar = {
  background: "var(--ds-frame)",
  backdropFilter: "var(--ds-blur)",
  WebkitBackdropFilter: "var(--ds-blur)",
  border: "1px solid var(--ds-line)"
};
function ir({ marca: e }) {
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
  const s = ge(), c = G(null), [l, h] = O(56);
  Ae(() => {
    const v = c.current;
    if (!v) return;
    const m = () => h(v.getBoundingClientRect().height);
    m();
    const y = new ResizeObserver(m);
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
      ...ar,
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
      /* @__PURE__ */ t("div", { style: { paddingLeft: s ? 2 : 8, paddingRight: 8 }, children: /* @__PURE__ */ t(ir, { marca: e }) }),
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
  const s = ge(), [c, l] = O(!0), h = c && !s, p = h ? 244 : 64;
  return /* @__PURE__ */ u("div", { style: { minHeight: "100%", padding: "var(--ds-4)" }, children: [
    /* @__PURE__ */ u("aside", { style: {
      ...ar,
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
        h && /* @__PURE__ */ t(ir, { marca: e }),
        !s && /* @__PURE__ */ t(
          "button",
          {
            onClick: () => l((m) => !m),
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
      r.map((m) => {
        const y = m.id === n;
        return /* @__PURE__ */ u(
          "button",
          {
            onClick: () => a == null ? void 0 : a(m),
            title: m.texto,
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
            onMouseEnter: (g) => {
              y || (g.currentTarget.style.background = "var(--ds-surface-2)");
            },
            onMouseLeave: (g) => {
              y || (g.currentTarget.style.background = "transparent");
            },
            children: [
              /* @__PURE__ */ t("span", { style: {
                display: "grid",
                placeItems: "center",
                width: 18,
                height: 18,
                flexShrink: 0,
                color: y ? "var(--ds-accent-tinta)" : "inherit"
              }, children: m.icono || "•" }),
              h && m.texto
            ]
          },
          m.id
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
    paddingBottom: `calc(${ct}px + var(--ds-6))`
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
      height: ct,
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
            onMouseEnter: (m) => {
              m.currentTarget.style.transform = "translateY(-3px)", v || (m.currentTarget.style.background = "var(--ds-surface-2)", m.currentTarget.style.color = "var(--ds-ink)");
            },
            onMouseLeave: (m) => {
              m.currentTarget.style.transform = "none", v || (m.currentTarget.style.background = "transparent", m.currentTarget.style.color = "var(--ds-ink-2)");
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
function Bn({
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
  const [m, y] = O(() => h || Cr());
  ie(() => {
    p !== void 0 && window.scrollTo({ top: 0, left: 0 });
  }, [p]), ie(() => {
    if (h) {
      y(h);
      return;
    }
    try {
      localStorage.setItem(tr, m);
    } catch {
    }
  }, [m, h]);
  const g = se((k) => {
    dt.includes(k) && y(k);
  }, []), x = {
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
  }, b = m === "sidebar" ? Or : m === "dock" ? qr : Br;
  return /* @__PURE__ */ t(rr.Provider, { value: { modo: m, fijarModo: g, modos: dt }, children: /* @__PURE__ */ t(b, { ...x }) });
}
function On() {
  const { modo: e, fijarModo: r } = nr(), [n, a] = O(!1), [i, d] = O(null), o = G(null), s = G(null), c = [
    { id: "topbar", texto: "Barra arriba", icono: "M3 5h18M3 5v14h18V5" },
    { id: "sidebar", texto: "Menú lateral", icono: "M3 5h18v14H3zM9 5v14" },
    { id: "dock", texto: "Dock abajo", icono: "M3 5h18v14H3zM3 15h18" }
  ], l = c.find((v) => v.id === e) || c[0], h = e === "dock";
  Ae(() => {
    if (!n) return;
    const v = 8, m = () => {
      var w, N, W;
      const g = (w = o.current) == null ? void 0 : w.getBoundingClientRect();
      if (!g) return;
      const f = ((N = s.current) == null ? void 0 : N.offsetWidth) || 190, x = ((W = s.current) == null ? void 0 : W.offsetHeight) || 160;
      let k = g.left + g.width / 2 < window.innerWidth / 2 ? g.left : g.right - f;
      k = Math.min(Math.max(v, k), window.innerWidth - f - v);
      let S = h ? g.top - x - 10 : g.bottom + 10;
      S = Math.min(Math.max(v, S), window.innerHeight - x - v), d({ izq: k, arriba: S });
    };
    m();
    const y = requestAnimationFrame(m);
    return window.addEventListener("resize", m), window.addEventListener("scroll", m, !0), () => {
      cancelAnimationFrame(y), window.removeEventListener("resize", m), window.removeEventListener("scroll", m, !0);
    };
  }, [n, h]), ie(() => {
    if (!n) return;
    const v = (y) => {
      y.key === "Escape" && (y.stopPropagation(), a(!1));
    }, m = (y) => {
      var g, f;
      (g = o.current) != null && g.contains(y.target) || (f = s.current) != null && f.contains(y.target) || a(!1);
    };
    return document.addEventListener("keydown", v, !0), document.addEventListener("mousedown", m, !0), () => {
      document.removeEventListener("keydown", v, !0), document.removeEventListener("mousedown", m, !0);
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
    n && i && Ut(/* @__PURE__ */ u("div", { role: "menu", ref: s, style: {
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
        const m = v.id === e;
        return /* @__PURE__ */ u(
          "button",
          {
            role: "menuitemradio",
            "aria-checked": m,
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
              background: m ? "var(--ds-accent-soft)" : "transparent",
              color: m ? "var(--ds-accent-tinta)" : "var(--ds-ink-2)",
              transition: "background var(--ds-t-state) var(--ds-ease)"
            },
            onMouseEnter: (y) => {
              m || (y.currentTarget.style.background = "var(--ds-surface-2)");
            },
            onMouseLeave: (y) => {
              m || (y.currentTarget.style.background = "transparent");
            },
            children: [
              p(v.icono),
              /* @__PURE__ */ t("span", { style: { flex: 1 }, children: v.texto }),
              m && /* @__PURE__ */ t(
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
function Vr(e) {
  return e.length <= 1 ? e[0] || "" : `${e.slice(0, -1).join(", ")} y ${e[e.length - 1]}`;
}
function qn({
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
  const { modo: l } = nr(), h = l === "dock" ? ct : 0;
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
          /* @__PURE__ */ t("b", { children: Vr(s) }),
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
      /* @__PURE__ */ t(lt, { variante: "fantasma", onClick: a, children: i }),
      d
    ] }) })
  ] });
}
function Hn({ children: e, minimo: r = 220, estilo: n }) {
  return /* @__PURE__ */ t("div", { style: {
    display: "grid",
    gap: "var(--ds-4)",
    gridTemplateColumns: `repeat(auto-fit, minmax(${r}px, 1fr))`,
    ...n
  }, children: e });
}
const Se = (e) => e == null || String(e).trim() === "", Vn = (e = "Este dato es obligatorio.") => (r) => Se(r) ? e : null, Pn = (e, r) => (n) => !Se(n) && String(n).trim().length > e ? r || `No puede pasar de ${e} caracteres; llevas ${String(n).trim().length}.` : null, _n = (e, r) => (n) => !Se(n) && String(n).trim().length < e ? r || `Necesita al menos ${e} caracteres.` : null, Xn = ({ desde: e = null, hasta: r = null, mensaje: n } = {}) => (a) => {
  if (Se(a)) return null;
  const i = Number(String(a).replace(/,/g, ""));
  return Number.isNaN(i) ? n || "Tiene que ser un número." : e !== null && i < e ? n || `Tiene que ser un número mayor o igual a ${e}.` : r !== null && i > r ? n || `No puede pasar de ${r}.` : null;
}, Yn = (e, r, n) => (a) => {
  if (Se(a)) return null;
  const i = String(a).replace(/\D/g, "").length;
  return i < e || i > r ? n || `Debe tener de ${e} a ${r} dígitos.` : null;
}, Gn = (e, r) => (n) => !Se(n) && !new RegExp(`^\\d{${e}}$`).test(String(n).trim()) ? r || `Debe tener exactamente ${e} dígitos, sin espacios ni guiones.` : null, Kn = (e = "El correo debe llevar arroba y dominio, como nombre@dominio.com.") => (r) => !Se(r) && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(r).trim()) ? e : null, Un = (e, r) => (n) => !Se(n) && !e.test(String(n).trim()) ? r : null, Zn = (e, r) => (n, a) => e(n, a) ? null : r;
function Qn(e) {
  const r = ke(() => Object.fromEntries(
    Object.entries(e).map(([f, x]) => [f, x.valor ?? ""])
  ), []), [n, a] = O(r), [i, d] = O({}), [o, s] = O(!1), c = G(null), l = ke(() => {
    const f = {};
    return Object.entries(e).forEach(([x, b]) => {
      for (const k of b.reglas || []) {
        const S = k(n[x], n);
        if (S) {
          f[x] = S;
          break;
        }
      }
    }), f;
  }, [n, e]), h = se((f) => (x) => {
    a((b) => ({ ...b, [f]: x }));
  }, []), p = se((f) => () => {
    d((x) => x[f] ? x : { ...x, [f]: !0 });
  }, []), v = se((f) => {
    const x = e[f] || {}, b = o || i[f];
    return {
      etiqueta: x.etiqueta,
      valor: n[f] ?? "",
      onCambio: h(f),
      onSalir: p(f),
      error: b ? l[f] : void 0,
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
  }, [e, n, l, i, o, h, p]), m = ke(() => o ? Object.keys(l).map((f) => {
    var x;
    return ((x = e[f]) == null ? void 0 : x.etiqueta) || f;
  }) : [], [o, l, e]), y = se((f) => (s(!0), Object.keys(l).length > 0 ? (requestAnimationFrame(() => {
    var k;
    const x = (k = c.current) == null ? void 0 : k.querySelector('[data-error="si"]');
    x == null || x.scrollIntoView({ block: "center", behavior: "smooth" });
    const b = x == null ? void 0 : x.querySelector("input, textarea, select, [role='combobox']");
    try {
      b == null || b.focus({ preventScroll: !0 });
    } catch {
    }
  }), !1) : (f(n), !0)), [l, n]), g = se(() => {
    a(r), d({}), s(!1);
  }, [r]);
  return {
    valores: n,
    errores: l,
    problemas: m,
    intentado: o,
    campo: v,
    poner: h,
    marcar: p,
    intentar: y,
    limpiar: g,
    cuerpo: c,
    setValores: a
  };
}
const or = (e) => `ds-filtros:${e}`, Pr = (e) => {
  try {
    const r = sessionStorage.getItem(or(e));
    return r ? JSON.parse(r) : null;
  } catch {
    return null;
  }
}, _r = (e, r) => {
  try {
    sessionStorage.setItem(or(e), JSON.stringify(r));
  } catch {
  }
};
function Jn(e, r) {
  const n = G(r), [a, i] = O(() => {
    const c = Pr(e);
    if (!c) return { ...n.current };
    const l = { ...n.current };
    return Object.keys(n.current).forEach((h) => {
      c[h] !== void 0 && (l[h] = c[h]);
    }), l;
  });
  ie(() => {
    _r(e, a);
  }, [e, a]);
  const d = se((c, l) => {
    i((h) => ({ ...h, [c]: l }));
  }, []), o = se(() => {
    i({ ...n.current });
  }, []), s = Object.keys(n.current).some((c) => String(a[c] ?? "") !== String(n.current[c] ?? ""));
  return [a, d, o, s, i];
}
function ea({ pestanas: e = [], activa: r, onCambio: n, estilo: a }) {
  const i = G([]);
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
function ta({ texto: e = "Cargando…", alto: r = 200 }) {
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
const Xr = /* @__PURE__ */ u(
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
), Yr = /* @__PURE__ */ t(
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
function Je({ children: e }) {
  return /* @__PURE__ */ t("div", { style: {
    fontSize: "var(--ds-t-small)",
    fontWeight: 800,
    color: "var(--ds-ink-2)",
    letterSpacing: "-0.01em",
    margin: "0 0 var(--ds-3)"
  }, children: e });
}
function Wt({ item: e, onIr: r }) {
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
        }, children: Yr })
      ]
    }
  );
}
function ra({
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
  const v = G(null), m = G(null);
  ie(() => {
    if (!e) return;
    const b = (S) => {
      S.key === "Escape" && (S.stopPropagation(), r == null || r());
    };
    document.addEventListener("keydown", b, !0);
    const k = setTimeout(() => {
      var S;
      return (S = v.current) == null ? void 0 : S.focus();
    }, 90);
    return () => {
      document.removeEventListener("keydown", b, !0), clearTimeout(k);
    };
  }, [e, r]);
  const y = se((b) => {
    var k;
    r == null || r(), (k = b.onIr || p) == null || k(b);
  }, [r, p]), g = s.trim().length > 0, f = g && l && l.length === 0, x = ke(() => {
    let b = 0;
    return o.map((k) => k.items.map(() => b++));
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
            /* @__PURE__ */ t(Je, { children: f ? "Sin coincidencias" : "Resultados" }),
            f ? /* @__PURE__ */ u("div", { style: {
              padding: "var(--ds-8) 0",
              textAlign: "center",
              color: "var(--ds-ink-3)",
              fontSize: "var(--ds-t-body)"
            }, children: [
              "Nada coincide con «",
              s,
              "»."
            ] }) : (l || []).map((b) => /* @__PURE__ */ t(Wt, { item: b, onIr: y }, b.id))
          ] }) : /* @__PURE__ */ u("div", { style: {
            display: "flex",
            gap: "var(--ds-5)",
            alignItems: "flex-start",
            flexWrap: "wrap"
          }, children: [
            /* @__PURE__ */ u("div", { style: { flex: "1 1 200px", minWidth: 190 }, children: [
              /* @__PURE__ */ t(Je, { children: d }),
              i.length > 0 ? i.map((b) => /* @__PURE__ */ t(Wt, { item: b, onIr: y }, b.id)) : /* @__PURE__ */ t("div", { style: {
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
            }, children: o.map((b, k) => /* @__PURE__ */ u("div", { children: [
              /* @__PURE__ */ t(Je, { children: b.titulo }),
              /* @__PURE__ */ t("div", { style: {
                display: "grid",
                gap: "var(--ds-3)",
                gridTemplateColumns: "repeat(auto-fill, minmax(136px, 1fr))"
              }, children: b.items.map((S, w) => /* @__PURE__ */ t(
                Lr,
                {
                  icono: S.icono,
                  etiqueta: S.texto,
                  nota: S.subtitulo,
                  color: S.color,
                  ancho: S.ancho,
                  entrada: x[k][w],
                  onClick: () => y(S)
                },
                S.id
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
            /* @__PURE__ */ t("span", { style: { color: "var(--ds-ink-3)", display: "grid", placeItems: "center" }, children: Xr }),
            /* @__PURE__ */ t(
              "input",
              {
                ref: v,
                value: s,
                onChange: (b) => c == null ? void 0 : c(b.target.value),
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
function Gr(e = {}) {
  ce = { ...ce, ...e };
}
const fe = "—", Le = (e) => e == null || e === "" || Number.isNaN(Number(e));
function sr(e, { decimales: r, minimo: n } = {}) {
  return Le(e) ? fe : new Intl.NumberFormat(ce.idioma, {
    minimumFractionDigits: r ?? n ?? 0,
    maximumFractionDigits: r ?? 2
  }).format(Number(e));
}
function ut(e, { moneda: r = ce.moneda, decimales: n = 2, compacto: a = !1 } = {}) {
  return Le(e) ? fe : a ? new Intl.NumberFormat(ce.idioma, {
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
function lr(e, { decimales: r = 1 } = {}) {
  return Le(e) ? fe : new Intl.NumberFormat(ce.idioma, {
    notation: "compact",
    maximumFractionDigits: r
  }).format(Number(e));
}
function U(e, { decimales: r = 1, enPuntos: n = !1, signo: a = !1 } = {}) {
  if (Le(e)) return fe;
  const i = n ? Number(e) / 100 : Number(e);
  return new Intl.NumberFormat(ce.idioma, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: r,
    signDisplay: a ? "exceptZero" : "auto"
  }).format(i);
}
function dr(e) {
  if (e instanceof Date) return e;
  if (typeof e == "string" && /^\d{4}-\d{2}-\d{2}$/.test(e)) {
    const [r, n, a] = e.split("-").map(Number);
    return new Date(r, n - 1, a);
  }
  return new Date(e);
}
const Tt = {
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
function Q(e, r = "media") {
  if (e == null || e === "") return fe;
  const n = dr(e);
  return Number.isNaN(n.getTime()) ? fe : new Intl.DateTimeFormat(ce.idioma, {
    ...Tt[r] || Tt.media,
    timeZone: ce.zonaHoraria
  }).format(n).replace(/\.$/, "");
}
function gt(e, r = /* @__PURE__ */ new Date()) {
  if (e == null || e === "") return fe;
  const n = dr(e);
  if (Number.isNaN(n.getTime())) return fe;
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
function cr(e, r) {
  return Le(e) || Le(r) || Number(r) === 0 ? null : (Number(e) - Number(r)) / Math.abs(Number(r));
}
function ue(e, r = "numero", n) {
  if (typeof r == "function") return r(e);
  switch (r) {
    case "moneda":
      return ut(e, n);
    case "monedaCompacta":
      return ut(e, { ...n, compacto: !0 });
    case "compacto":
      return lr(e, n);
    case "porcentaje":
      return U(e, n);
    case "texto":
      return e == null || e === "" ? fe : String(e);
    default:
      return sr(e, n);
  }
}
const na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SIN_DATO: fe,
  compacto: lr,
  configurarFormato: Gr,
  fecha: Q,
  fechaRelativa: gt,
  formatear: ue,
  moneda: ut,
  numero: sr,
  porcentaje: U,
  variacion: cr
}, Symbol.toStringTag, { value: "Module" }));
function ur({
  valor: e,
  sentido: r = "sube",
  contra: n,
  decimales: a = 1,
  enPuntos: i = !1,
  tamano: d = "s",
  estilo: o
}) {
  const s = e == null || Number.isNaN(Number(e)), c = s ? 0 : Number(e), l = s || c === 0 ? 0 : c > 0 ? 1 : -1, h = r === "neutro" || l === 0 ? null : r === "sube" ? l > 0 : l < 0, p = h === null ? "var(--ds-ink-2)" : h ? "var(--ds-ok)" : "var(--ds-risk)", v = h === null ? "var(--ds-surface-sunk)" : h ? "var(--ds-ok-soft)" : "var(--ds-risk-soft)", m = l > 0 ? "▲" : l < 0 ? "▼" : "●", y = d === "m" ? "var(--ds-t-small)" : "var(--ds-t-micro)";
  if (s)
    return /* @__PURE__ */ t("span", { style: { fontSize: y, fontWeight: 600, color: "var(--ds-ink-3)", ...o }, children: "Sin comparativo" });
  const g = i ? `${c > 0 ? "+" : ""}${c.toFixed(a)} pts` : U(c, { decimales: a, signo: !0 });
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
        "aria-label": `${l > 0 ? "Sube" : l < 0 ? "Baja" : "Sin cambio"} ${g}${h === null ? "" : h ? ", favorable" : ", desfavorable"}`,
        children: [
          /* @__PURE__ */ t("span", { "aria-hidden": "true", style: { fontSize: "0.8em" }, children: m }),
          g
        ]
      }
    ),
    n && /* @__PURE__ */ t("span", { style: { fontSize: y, fontWeight: 600, color: "var(--ds-ink-3)" }, children: n })
  ] });
}
const Nt = [1, 2, 3, 4, 5, 6].map((e) => `var(--ds-serie-${e})`), de = (e, r) => (e == null ? void 0 : e.color) || Nt[r % Nt.length];
function We() {
  const [e, r] = O(0), n = G(null);
  return [se((i) => {
    n.current && (n.current.disconnect(), n.current = null), i && (r(i.getBoundingClientRect().width), !(typeof ResizeObserver > "u") && (n.current = new ResizeObserver(([d]) => r(d.contentRect.width)), n.current.observe(i)));
  }, []), e];
}
function yt(e, r, n = 4) {
  if (!Number.isFinite(e) || !Number.isFinite(r)) return { marcas: [0, 1], min: 0, max: 1 };
  e === r && (r = e === 0 ? 1 : r + Math.abs(r) * 0.1);
  const i = (r - e) / n, d = 10 ** Math.floor(Math.log10(i)), o = i / d, s = (o <= 1 ? 1 : o <= 2 ? 2 : o <= 2.5 ? 2.5 : o <= 5 ? 5 : 10) * d, c = Math.floor(e / s) * s, l = Math.ceil(r / s) * s, h = [];
  for (let p = c; p <= l + s / 2; p += s) h.push(Number(p.toFixed(10)));
  return { marcas: h, min: c, max: l };
}
const _e = (e, r, n, a) => (i) => r === e ? (n + a) / 2 : n + (i - e) / (r - e) * (a - n), oe = {
  fontSize: 11,
  fontWeight: 600,
  fill: "var(--ds-ink-3)",
  fontFamily: "var(--ds-font)",
  fontVariantNumeric: "tabular-nums"
};
function Ge({ color: e, forma: r = "cuadro" }) {
  const n = { flexShrink: 0, background: e };
  return r === "linea" ? /* @__PURE__ */ t("span", { style: { ...n, width: 14, height: 3, borderRadius: "var(--ds-r-mini)" } }) : /* @__PURE__ */ t("span", { style: { ...n, width: 10, height: 10, borderRadius: "var(--ds-r-mini)" } });
}
function Kr({ series: e = [], forma: r, valores: n, estilo: a }) {
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
    /* @__PURE__ */ t(Ge, { color: de(i, d), forma: r }),
    i.nombre,
    n && n[d] !== void 0 && /* @__PURE__ */ t("span", { className: "ds-num", style: { color: "var(--ds-ink)", fontWeight: 700 }, children: n[d] })
  ] }, i.clave ?? i.nombre ?? d)) });
}
function Fe({ x: e, y: r, ancho: n, titulo: a, renglones: i = [], visible: d }) {
  const o = G(null), [s, c] = O({ w: 160, h: 60 });
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
    i.map((v, m) => /* @__PURE__ */ u("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: "var(--ds-t-small)",
      lineHeight: 1.6
    }, children: [
      v.color && /* @__PURE__ */ t(Ge, { color: v.color }),
      /* @__PURE__ */ t("span", { style: { color: "var(--ds-ink-2)", fontWeight: 600, flex: 1, minWidth: 0 }, children: v.nombre }),
      /* @__PURE__ */ t("span", { className: "ds-num", style: { color: "var(--ds-ink)", fontWeight: 800 }, children: v.valor })
    ] }, m))
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
function ye({ titulo: e, series: r, formaLeyenda: n, tabla: a, children: i, estilo: d, alto: o }) {
  const [s, c] = O(!1);
  return /* @__PURE__ */ u("figure", { style: { margin: 0, minWidth: 0, ...d }, "aria-label": e, children: [
    ((r == null ? void 0 : r.length) > 1 || a) && /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "flex-start", gap: "var(--ds-3)" }, children: [
      /* @__PURE__ */ t("div", { style: { flex: 1, minWidth: 0 }, children: !s && /* @__PURE__ */ t(Kr, { series: r || [], forma: n }) }),
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
const F = (e, r, n) => ue(e, r, n);
function be({ alto: e = 160, texto: r = "Sin datos para este periodo." }) {
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
  const [s, c] = We(), [l, h] = O(null), p = e.map(($) => typeof $ == "object" && $ !== null ? $.valor : $), v = p.filter(($) => $ != null && Number.isFinite(Number($))), m = Math.min(...v), y = Math.max(...v), g = 4, f = Math.max(0, c), x = ($) => p.length <= 1 ? f / 2 : g + $ / (p.length - 1) * (f - g * 2), b = ($) => y === m ? r / 2 : g + (1 - ($ - m) / (y - m)) * (r - g * 2), k = [];
  let S = [];
  p.forEach(($, I) => {
    $ == null || !Number.isFinite(Number($)) ? (S.length && k.push(S), S = []) : S.push([x(I), b(Number($))]);
  }), S.length && k.push(S);
  const w = [...p].reverse().findIndex(($) => $ != null), N = w === -1 ? -1 : p.length - 1 - w, W = me.useId().replace(/:/g, "");
  return /* @__PURE__ */ u(
    "div",
    {
      ref: s,
      style: { position: "relative", height: r, minWidth: 0, ...o },
      onMouseLeave: () => h(null),
      onMouseMove: ($) => {
        if (!f || p.length < 2) return;
        const I = $.currentTarget.getBoundingClientRect(), R = Math.round(($.clientX - I.left - g) / (f - g * 2) * (p.length - 1));
        h(Math.max(0, Math.min(p.length - 1, R)));
      },
      children: [
        f > 0 && v.length > 0 && /* @__PURE__ */ u(
          "svg",
          {
            width: f,
            height: r,
            role: "img",
            style: { display: "block", overflow: "visible" },
            "aria-label": `Tendencia de ${p.length} puntos, último ${F(p[N], i)}`,
            children: [
              /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ u("linearGradient", { id: `sp${W}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ t("stop", { offset: "0%", stopColor: n, stopOpacity: "0.22" }),
                /* @__PURE__ */ t("stop", { offset: "100%", stopColor: n, stopOpacity: "0" })
              ] }) }),
              a && k.map(($, I) => $.length > 1 && /* @__PURE__ */ t(
                "path",
                {
                  fill: `url(#sp${W})`,
                  d: `M${$[0][0]},${r} ${$.map((R) => `L${R[0]},${R[1]}`).join(" ")} L${$[$.length - 1][0]},${r} Z`
                },
                `a${I}`
              )),
              k.map(($, I) => /* @__PURE__ */ t(
                "path",
                {
                  fill: "none",
                  stroke: n,
                  strokeWidth: "2",
                  strokeLinejoin: "round",
                  strokeLinecap: "round",
                  d: $.map((R, E) => `${E ? "L" : "M"}${R[0]},${R[1]}`).join(" ")
                },
                `l${I}`
              )),
              N >= 0 && /* @__PURE__ */ t(
                "circle",
                {
                  cx: x(N),
                  cy: b(Number(p[N])),
                  r: "3.5",
                  fill: n,
                  stroke: "var(--ds-surface-solid)",
                  strokeWidth: "2"
                }
              ),
              l !== null && p[l] !== null && p[l] !== void 0 && /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t("line", { x1: x(l), x2: x(l), y1: 0, y2: r, stroke: "var(--ds-eje)", strokeWidth: "1" }),
                /* @__PURE__ */ t(
                  "circle",
                  {
                    cx: x(l),
                    cy: b(Number(p[l])),
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
          left: Math.min(Math.max(0, x(l) - 40), Math.max(0, f - 80)),
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
          F(p[l], i)
        ] })
      ]
    }
  );
}
const zt = { ok: "Bien", aviso: "Atención", riesgo: "En riesgo" }, Qr = (e) => e == null || e === "";
function vr({
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
  textoEstado: m,
  compacta: y = !1,
  cargando: g = !1
}) {
  if (g)
    return /* @__PURE__ */ u("div", { "aria-busy": "true", style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
      /* @__PURE__ */ t(K, { alto: 10, ancho: "46%" }),
      /* @__PURE__ */ t(K, { alto: y ? 24 : 34, ancho: "62%", radio: 9 }),
      /* @__PURE__ */ t(K, { alto: 10, ancho: "38%" }),
      c && !y && /* @__PURE__ */ t(K, { alto: 40, radio: 9 })
    ] });
  const f = Qr(r), x = f ? "—" : typeof r == "number" || !Number.isNaN(Number(r)) ? ue(r, n, a) : r;
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
      v && zt[v] && /* @__PURE__ */ t(Re, { tono: v, children: m || zt[v] }),
      p && !v && /* @__PURE__ */ t("span", { "aria-hidden": !0, style: { color: "var(--ds-ink-3)", display: "inline-flex", flexShrink: 0 }, children: p })
    ] }),
    /* @__PURE__ */ t("div", { style: Jt, children: /* @__PURE__ */ t("div", { className: "ds-num", style: {
      fontSize: er(y ? "var(--ds-num-m)" : "var(--ds-num-l)", x),
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: "-0.035em",
      marginTop: y ? 4 : 6,
      color: f ? "var(--ds-ink-3)" : "var(--ds-ink)",
      whiteSpace: "nowrap"
    }, children: x }) }),
    (i !== void 0 || o || h || f) && /* @__PURE__ */ u("div", { style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "4px 8px",
      marginTop: y ? 6 : 8
    }, children: [
      i !== void 0 && !f && /* @__PURE__ */ t(ur, { valor: i, sentido: d, contra: o, enPuntos: s }),
      (h || f) && /* @__PURE__ */ t("span", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }, children: f ? h || "Sin dato" : h })
    ] }),
    c && !y && /* @__PURE__ */ t("div", { style: { marginTop: "auto", paddingTop: "var(--ds-4)" }, children: /* @__PURE__ */ t(Zr, { datos: c, alto: 40, formato: n, color: l }) })
  ] });
}
function aa({
  onClick: e,
  href: r,
  estilo: n,
  entrada: a,
  relleno: i,
  ...d
}) {
  const o = !!(e || r), s = /* @__PURE__ */ t(vr, { ...d }), c = i ?? (d.compacta ? "var(--ds-4)" : "var(--ds-5)");
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
function ia({ indicadores: e = [], cargando: r = !1, estilo: n, entrada: a }) {
  const i = ge(), d = Math.max(1, e.length), o = i ? Math.min(2, d) : d;
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
    }, children: /* @__PURE__ */ t(vr, { ...s, serie: void 0, compacta: !0, cargando: r || s.cargando }) }, s.clave ?? s.etiqueta ?? c);
  }) }) });
}
const Jr = { ok: "Va a la meta", aviso: "Cerca de la meta", riesgo: "Debajo de la meta" }, en = { ok: "Dentro del tope", aviso: "Cerca del tope", riesgo: "Rebasa el tope" };
function oa({
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
  const m = (N) => ue(N, a, i), y = Number.isFinite(Number(r)) && Number(n) > 0, g = y ? Number(r) / Number(n) : null, f = y && Number(d) > 0 && Number(o) > 0, x = f ? Number(r) / Number(d) * Number(o) : null, b = f ? x / Number(n) : g;
  let k = "acento";
  b !== null && (s ? k = b <= 0.9 ? "ok" : b <= 1 ? "aviso" : "riesgo" : k = b >= 1 ? "ok" : b >= 0.9 ? "aviso" : "riesgo");
  const S = s ? en : Jr, w = {
    ok: "var(--ds-ok)",
    aviso: "var(--ds-warn)",
    riesgo: "var(--ds-risk)",
    acento: "var(--ds-accent-trazo)"
  }[k];
  return /* @__PURE__ */ t(we, { entrada: v, estilo: { height: "100%", ...p }, children: h ? /* @__PURE__ */ u("div", { "aria-busy": "true", style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ t(K, { alto: 10, ancho: "50%" }),
    /* @__PURE__ */ t(K, { alto: 34, ancho: "60%", radio: 9 }),
    /* @__PURE__ */ t(K, { alto: 8, radio: 99 }),
    /* @__PURE__ */ t(K, { alto: 10, ancho: "70%" })
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
      b !== null && /* @__PURE__ */ t(Re, { tono: k, children: S[k] })
    ] }),
    y ? c === "anillo" ? /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "center", gap: "var(--ds-5)", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ t(wr, { valor: Math.min(100, g * 100), tamano: 112, grosor: 9, tono: w, children: /* @__PURE__ */ t("span", { className: "ds-num", style: {
        fontSize: "var(--ds-num-m)",
        fontWeight: 800,
        letterSpacing: "-0.03em"
      }, children: U(g, { decimales: 0 }) }) }),
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
        Sr,
        {
          valor: Number(r),
          total: Number(n),
          tono: k,
          alto: 8,
          etiqueta: `${e}: ${U(g)} de la meta`
        }
      ),
      /* @__PURE__ */ u("div", { className: "ds-num", style: {
        fontSize: "var(--ds-t-small)",
        fontWeight: 700,
        color: "var(--ds-ink-2)"
      }, children: [
        U(g),
        " de la meta"
      ] })
    ] }) : /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }, children: Number(n) > 0 ? "Sin dato de avance." : "Sin meta capturada para este periodo." }),
    f && /* @__PURE__ */ u("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", lineHeight: 1.45 }, children: [
      "Al ritmo actual cierras en",
      " ",
      /* @__PURE__ */ t("strong", { className: "ds-num", style: { color: "var(--ds-ink)" }, children: m(x) }),
      " ",
      "(",
      /* @__PURE__ */ t("span", { className: "ds-num", children: U(x / Number(n)) }),
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
function sa({
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
  const l = ge(520), h = r.slice(0, 3), p = h[0];
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
    }, children: h.map((v, m) => {
      const y = m > 0 && p ? cr(p.valor, v.valor) : void 0;
      return /* @__PURE__ */ u("div", { style: {
        minWidth: 0,
        paddingLeft: !l && m > 0 ? "var(--ds-4)" : 0,
        paddingRight: !l && m < h.length - 1 ? "var(--ds-4)" : 0,
        borderLeft: !l && m > 0 ? "1px solid var(--ds-line)" : "none",
        paddingTop: l && m > 0 ? "var(--ds-3)" : 0,
        borderTop: l && m > 0 ? "1px solid var(--ds-line)" : "none"
      }, children: [
        /* @__PURE__ */ t("div", { style: {
          fontSize: "var(--ds-t-small)",
          fontWeight: 700,
          color: m === 0 ? "var(--ds-ink-2)" : "var(--ds-ink-3)"
        }, children: v.etiqueta }),
        o ? /* @__PURE__ */ t(K, { alto: m === 0 ? 30 : 22, ancho: "70%", radio: 8, estilo: { marginTop: 6 } }) : /* @__PURE__ */ t("div", { style: Jt, children: /* @__PURE__ */ t("div", { className: "ds-num", style: {
          fontSize: er(m === 0 ? "var(--ds-num-m)" : "var(--ds-num-s)", ue(v.valor, n, a)),
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          marginTop: 4,
          color: v.valor === null || v.valor === void 0 ? "var(--ds-ink-3)" : m === 0 ? "var(--ds-ink)" : "var(--ds-ink-2)",
          whiteSpace: "nowrap"
        }, children: ue(v.valor, n, a) }) }),
        m > 0 && !o && /* @__PURE__ */ t("div", { style: { marginTop: 6 }, children: /* @__PURE__ */ t(
          ur,
          {
            valor: y,
            sentido: i,
            contra: y === null ? void 0 : `${p.etiqueta || "Base"} vs ${(v.etiqueta || "referencia").toLowerCase()}`
          }
        ) })
      ] }, v.etiqueta ?? m);
    }) }),
    d && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", marginTop: "var(--ds-4)" }, children: d })
  ] });
}
function la({
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
  entrada: m
}) {
  const y = n.slice(0, d), g = Math.max(0, ...y.map((x) => Number(x.valor) || 0)), f = Number(s) > 0 ? Number(s) : n.reduce((x, b) => x + (Number(b.valor) || 0), 0);
  return /* @__PURE__ */ t(we, { entrada: m, estilo: { height: "100%", ...v }, children: /* @__PURE__ */ t(zr, { titulo: e, nota: r, accion: c, children: p ? /* @__PURE__ */ t("div", { "aria-busy": "true", style: { display: "flex", flexDirection: "column", gap: 14 }, children: Array.from({ length: Math.min(d, 5) }, (x, b) => /* @__PURE__ */ u("div", { style: { display: "flex", flexDirection: "column", gap: 6, opacity: 1 - b * 0.12 }, children: [
    /* @__PURE__ */ u("div", { style: { display: "flex", gap: 10 }, children: [
      /* @__PURE__ */ t(K, { alto: 12, ancho: `${50 - b * 5}%` }),
      /* @__PURE__ */ t(K, { alto: 12, ancho: 70, estilo: { marginLeft: "auto" } })
    ] }),
    /* @__PURE__ */ t(K, { alto: 4, radio: 99, ancho: `${90 - b * 14}%` })
  ] }, b)) }) : y.length === 0 ? /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", padding: "var(--ds-4) 0" }, children: h }) : /* @__PURE__ */ t("ol", { style: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 2
  }, children: y.map((x, b) => {
    const k = Number(x.valor) || 0, S = !!l;
    return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ u(
      "div",
      {
        role: S ? "button" : void 0,
        tabIndex: S ? 0 : void 0,
        onClick: S ? () => l(x) : void 0,
        onKeyDown: S ? (w) => {
          (w.key === "Enter" || w.key === " ") && (w.preventDefault(), l(x));
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
          cursor: S ? "pointer" : void 0,
          transition: "background var(--ds-t-state) var(--ds-ease)"
        },
        onMouseEnter: S ? (w) => {
          w.currentTarget.style.background = "var(--ds-surface-2)";
        } : void 0,
        onMouseLeave: S ? (w) => {
          w.currentTarget.style.background = "transparent";
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
              U(k / f),
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
            width: `${g > 0 ? k / g * 100 : 0}%`,
            background: "var(--ds-accent-trazo)",
            borderRadius: 99,
            transition: "width var(--ds-t-move) var(--ds-ease)"
          } }) })
        ]
      }
    ) }, x.clave ?? x.nombre ?? b);
  }) }) }) });
}
const tn = (e) => e == null || e === "";
function da({
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
          s ? /* @__PURE__ */ t(K, { circulo: !0, alto: 48 }) : /* @__PURE__ */ t(mt, { src: n, nombre: e || "", tamano: 48 }),
          /* @__PURE__ */ t("div", { style: { flex: 1, minWidth: 0 }, children: s ? /* @__PURE__ */ u("div", { style: { display: "flex", flexDirection: "column", gap: 7 }, children: [
            /* @__PURE__ */ t(K, { alto: 13, ancho: "60%" }),
            /* @__PURE__ */ t(K, { alto: 10, ancho: "40%" })
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
          a && !s && /* @__PURE__ */ t(Re, { tono: a.tono, children: a.texto })
        ] }),
        p.length > 0 && /* @__PURE__ */ t("div", { style: {
          display: "grid",
          gap: "var(--ds-3)",
          gridTemplateColumns: `repeat(${Math.min(2, p.length)}, minmax(0, 1fr))`,
          padding: "var(--ds-3)",
          borderRadius: "var(--ds-r-item)",
          background: "var(--ds-surface-sunk)"
        }, children: p.map((v, m) => /* @__PURE__ */ u("div", { style: { minWidth: 0 }, children: [
          /* @__PURE__ */ t("div", { style: {
            fontSize: "var(--ds-t-micro)",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--ds-ink-3)"
          }, children: v.etiqueta }),
          s ? /* @__PURE__ */ t(K, { alto: 16, ancho: "70%", estilo: { marginTop: 5 } }) : tn(v.valor) ? /* @__PURE__ */ t("div", { style: { marginTop: 4 }, children: /* @__PURE__ */ t(Re, { tono: "aviso", children: "Sin capturar" }) }) : /* @__PURE__ */ t("div", { className: "ds-num", style: {
            fontWeight: 800,
            color: "var(--ds-ink)",
            marginTop: 2,
            overflowWrap: "anywhere"
          }, children: ue(v.valor, v.formato || "texto", v.opciones) })
        ] }, v.etiqueta ?? m)) }),
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
const rn = (e) => e == null || e === "";
function nn({ texto: e, etiqueta: r }) {
  const [n, a] = O(!1);
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
function ca({ elementos: e = [], columnas: r = 2, estilo: n }) {
  const i = ge(560) ? 1 : Math.max(1, Math.min(3, r));
  return /* @__PURE__ */ t("dl", { style: {
    margin: 0,
    display: "grid",
    gridTemplateColumns: `repeat(${i}, minmax(0, 1fr))`,
    columnGap: "var(--ds-6)",
    rowGap: "var(--ds-4)",
    ...n
  }, children: e.map((d, o) => {
    const s = rn(d.valor), c = s ? null : me.isValidElement(d.valor) ? d.valor : ue(d.valor, d.formato || "texto", d.opciones);
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
      /* @__PURE__ */ t("dd", { style: { margin: "4px 0 0", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }, children: s ? /* @__PURE__ */ t(Re, { tono: "aviso", children: "Sin capturar" }) : /* @__PURE__ */ u(J, { children: [
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
        d.copiable && /* @__PURE__ */ t(nn, { texto: d.valor, etiqueta: d.etiqueta })
      ] }) })
    ] }, d.etiqueta ?? o);
  }) });
}
const Dt = {
  info: ["var(--ds-info-soft)", "var(--ds-info)", "i"],
  ok: ["var(--ds-ok-soft)", "var(--ds-ok)", "✓"],
  aviso: ["var(--ds-warn-soft)", "var(--ds-warn)", "!"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)", "!"]
};
function ua({
  tono: e = "info",
  titulo: r,
  children: n,
  acciones: a,
  icono: i,
  onCerrar: d,
  estilo: o
}) {
  const [s, c, l] = Dt[e] || Dt.info;
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
function va({
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
    a && /* @__PURE__ */ t(Qt, { tono: "neutro", tamano: i ? 36 : 48, children: a }),
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
function ha({ personas: e = [], maximo: r = 4, tamano: n = 32, estilo: a }) {
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
function bt({
  ancla: e,
  abierto: r,
  onCerrar: n,
  children: a,
  rol: i = "menu",
  etiqueta: d,
  minAncho: o = 200,
  estilo: s
}) {
  const c = G(null), [l, h] = O(null), p = G(n);
  return p.current = n, Ae(() => {
    if (!r) {
      h(null);
      return;
    }
    const v = () => {
      var $, I;
      const y = ($ = e == null ? void 0 : e.current) == null ? void 0 : $.getBoundingClientRect(), g = (I = c.current) == null ? void 0 : I.getBoundingClientRect();
      if (!y) return;
      const f = (g == null ? void 0 : g.width) || o, x = (g == null ? void 0 : g.height) || 0, b = window.innerWidth, S = window.innerHeight - y.bottom, w = x > 0 && S < x + Me && y.top > S, N = w ? Math.max(Me, y.top - x - 6) : y.bottom + 6;
      let W = y.left;
      W + f > b - Me && (W = y.right - f), W = Math.max(Me, Math.min(W, b - f - Me)), h({ izq: W, top: N, haciaArriba: w });
    };
    v();
    const m = requestAnimationFrame(v);
    return window.addEventListener("resize", v), window.addEventListener("scroll", v, !0), () => {
      cancelAnimationFrame(m), window.removeEventListener("resize", v), window.removeEventListener("scroll", v, !0);
    };
  }, [r, e, o]), ie(() => {
    if (!r) return;
    const v = (f) => {
      var x, b, k;
      (x = p.current) == null || x.call(p), f && ((k = (b = e == null ? void 0 : e.current) == null ? void 0 : b.focus) == null || k.call(b));
    }, m = (f) => {
      f.key === "Escape" && (f.stopPropagation(), v(!0));
    }, y = (f) => {
      var x, b;
      (x = c.current) != null && x.contains(f.target) || (b = e == null ? void 0 : e.current) != null && b.contains(f.target) || v(!1);
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
  }, [r, e]), !r || typeof document > "u" ? null : Ut(/* @__PURE__ */ t(
    "div",
    {
      ref: c,
      role: i,
      "aria-label": d,
      onKeyDown: (v) => {
        var f;
        if (v.key !== "ArrowDown" && v.key !== "ArrowUp") return;
        const m = [...((f = c.current) == null ? void 0 : f.querySelectorAll("button:not([disabled])")) || []], y = m.indexOf(document.activeElement);
        if (!m.length) return;
        v.preventDefault();
        const g = v.key === "ArrowDown" ? (y + 1) % m.length : (y - 1 + m.length) % m.length;
        m[g].focus();
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
function hr({ children: e, elegida: r, onClick: n, rol: a = "menuitemradio", nota: i, peligro: d }) {
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
const et = {
  neutro: ["var(--ds-surface-solid)", "var(--ds-ink-3)", "var(--ds-line-firm)"],
  acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)", "var(--ds-accent-trazo)"],
  ok: ["var(--ds-ok-soft)", "var(--ds-ok)", "var(--ds-ok)"],
  aviso: ["var(--ds-warn-soft)", "var(--ds-warn)", "var(--ds-warn)"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)", "var(--ds-risk)"]
}, an = (e) => {
  if (!e) return "sin-fecha";
  const r = e instanceof Date ? e : new Date(typeof e == "string" && e.length === 10 ? `${e}T00:00:00` : e);
  return Number.isNaN(r.getTime()) ? "sin-fecha" : `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
}, It = (e) => !(typeof e == "string" && /^\d{4}-\d{2}-\d{2}$/.test(e));
function pa({
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
    const p = h === s, [v, m, y] = et[l.tono] || (p ? et.acento : et.neutro), g = an(l.fecha), f = n && g !== c;
    c = g;
    const x = h === e.length - 1, b = l.fecha ? a ? gt(l.fecha) : n ? It(l.fecha) ? Q(l.fecha, "hora") : null : Q(l.fecha, It(l.fecha) ? "fechaHora" : "media") : "Sin fecha";
    return /* @__PURE__ */ u(me.Fragment, { children: [
      f && /* @__PURE__ */ t("li", { "aria-hidden": !1, style: {
        fontSize: "var(--ds-t-micro)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)",
        padding: h === 0 ? "0 0 var(--ds-2)" : "var(--ds-3) 0 var(--ds-2)"
      }, children: g === "sin-fecha" ? "Sin fecha" : Q(l.fecha, "larga") }),
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
                color: m,
                border: `2px solid ${y}`,
                display: "grid",
                placeItems: "center",
                boxShadow: p ? "0 0 0 4px var(--ds-accent-ring)" : "none"
              }, children: l.icono }),
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
                }, children: l.titulo }),
                b && /* @__PURE__ */ t("span", { className: "ds-num", style: {
                  fontSize: "var(--ds-t-micro)",
                  fontWeight: 600,
                  color: "var(--ds-ink-3)",
                  whiteSpace: "nowrap"
                }, children: b })
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
}, Rt = {
  hecho: /* @__PURE__ */ t("path", { d: "M20 6L9 17l-5-5" }),
  error: /* @__PURE__ */ t("path", { d: "M18 6L6 18M6 6l12 12" }),
  omitido: /* @__PURE__ */ t("path", { d: "M5 12h14" })
};
function Lt({ estado: e, numero: r, tamano: n = 30 }) {
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
  }, children: Rt[e] ? /* @__PURE__ */ t(
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
      children: Rt[e]
    }
  ) : /* @__PURE__ */ t("span", { className: "ds-num", children: r }) });
}
function At({ onPaso: e, paso: r, i: n, children: a, estilo: i }) {
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
function fa({ pasos: e = [], orientacion: r = "horizontal", onPaso: n, estilo: a }) {
  const i = ge(), d = r === "vertical" || i, o = (s) => [
    s.fecha ? Q(s.fecha, "media") : null,
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
            /* @__PURE__ */ t(Lt, { estado: s.estado, numero: c + 1 }),
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
            At,
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
            At,
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
                /* @__PURE__ */ t(Lt, { estado: s.estado, numero: c + 1 }),
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
function on({ tarjeta: e, columna: r, columnas: n, onMover: a }) {
  const i = G(null), [d, o] = O(!1);
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
      bt,
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
            hr,
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
function Ft({ tarjeta: e, formatoValor: r }) {
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
      (a = e.etiquetas) == null ? void 0 : a.map((i, d) => /* @__PURE__ */ t(Re, { tono: i.tono, children: i.texto }, d))
    ] })
  ] });
}
function ma({
  columnas: e = [],
  onMover: r,
  onTarjeta: n,
  renderTarjeta: a,
  formatoValor: i = "moneda",
  anchoColumna: d = 280,
  vacioColumna: o = "Sin elementos en esta etapa.",
  estilo: s
}) {
  const c = ge(), [l, h] = O(null), [p, v] = O(null), m = typeof r == "function", y = c ? `min(${d}px, 82vw)` : d;
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
  }, children: e.map((g) => {
    const f = g.tarjetas || [], x = f.some((S) => S.valor !== void 0 && S.valor !== null), b = f.reduce((S, w) => S + (Number(w.valor) || 0), 0), k = p === g.id && l && l.origen !== g.id;
    return /* @__PURE__ */ u(
      "section",
      {
        role: "listitem",
        "aria-label": `${g.titulo}, ${f.length}`,
        onDragOver: m ? (S) => {
          S.preventDefault(), p !== g.id && v(g.id);
        } : void 0,
        onDragLeave: m ? (S) => {
          S.currentTarget.contains(S.relatedTarget) || v(null);
        } : void 0,
        onDrop: m ? (S) => {
          var W, $;
          S.preventDefault(), v(null);
          const w = l;
          if (h(null), !w || w.origen === g.id) return;
          const N = ($ = (W = e.find((I) => I.id === w.origen)) == null ? void 0 : W.tarjetas) == null ? void 0 : $.find((I) => I.id === w.id);
          N && r(N, g.id, w.origen);
        } : void 0,
        style: {
          flex: "0 0 auto",
          width: y,
          scrollSnapAlign: "start",
          background: k ? "var(--ds-accent-soft)" : "var(--ds-surface-sunk)",
          border: `1px ${k ? "dashed" : "solid"} ${k ? "var(--ds-accent-trazo)" : "var(--ds-line)"}`,
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
            f.map((S) => {
              const w = (l == null ? void 0 : l.id) === S.id;
              return /* @__PURE__ */ u(
                "article",
                {
                  role: "listitem",
                  draggable: m,
                  onDragStart: m ? (N) => {
                    N.dataTransfer.effectAllowed = "move", N.dataTransfer.setData("text/plain", String(S.id)), h({ id: S.id, origen: g.id });
                  } : void 0,
                  onDragEnd: m ? () => {
                    h(null), v(null);
                  } : void 0,
                  style: {
                    background: "var(--ds-surface-solid)",
                    border: "1px solid var(--ds-line)",
                    borderRadius: "var(--ds-r-item)",
                    padding: "var(--ds-3)",
                    boxShadow: "var(--ds-lift-1)",
                    opacity: w ? 0.45 : 1,
                    cursor: m ? "grab" : void 0,
                    transition: "opacity var(--ds-t-state) var(--ds-ease)"
                  },
                  children: [
                    n ? /* @__PURE__ */ t(
                      "button",
                      {
                        type: "button",
                        onClick: () => n(S, g),
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
                        children: a ? a(S, g) : /* @__PURE__ */ t(Ft, { tarjeta: S, formatoValor: i })
                      }
                    ) : a ? a(S, g) : /* @__PURE__ */ t(Ft, { tarjeta: S, formatoValor: i }),
                    m && e.length > 1 && /* @__PURE__ */ t("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: "var(--ds-2)" }, children: /* @__PURE__ */ t(on, { tarjeta: S, columna: g, columnas: e, onMover: r }) })
                  ]
                },
                S.id
              );
            })
          ] })
        ]
      },
      g.id
    );
  }) });
}
const Et = (e) => e instanceof Date ? e : new Date(typeof e == "string" && e.length === 10 ? `${e}T00:00:00` : e), vt = (e, r) => e.getFullYear() === r.getFullYear() && e.getMonth() === r.getMonth() && e.getDate() === r.getDate();
function sn(e, r) {
  if (Number.isNaN(e.getTime())) return "Sin fecha";
  if (vt(e, r)) return "Hoy";
  const n = new Date(r);
  return n.setDate(r.getDate() - 1), vt(e, n) ? "Ayer" : Q(e, "larga");
}
function ga({
  eventos: e = [],
  ahora: r,
  agrupar: n = !0,
  vacio: a = "Sin actividad reciente.",
  estilo: i
}) {
  const d = r ? Et(r) : /* @__PURE__ */ new Date();
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
    const l = Et(s.fecha), h = n ? sn(l, d) : null, p = n && h !== o;
    o = h;
    const v = !Number.isNaN(l.getTime()), m = v && vt(l, d), y = v ? m ? gt(l, d) : n ? Q(l, "hora") : Q(l, "fechaHora") : "";
    return /* @__PURE__ */ u(me.Fragment, { children: [
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
        s.icono ? /* @__PURE__ */ t(Qt, { tono: s.tono || "neutro", tamano: 34, children: s.icono }) : /* @__PURE__ */ t(mt, { nombre: s.actor || "", src: s.retrato, tamano: 34, tono: "neutro" }),
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
const Ct = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"], jt = {
  neutro: ["var(--ds-surface-sunk)", "var(--ds-ink-3)"],
  acento: ["var(--ds-accent-soft)", "var(--ds-accent-tinta)"],
  ok: ["var(--ds-ok-soft)", "var(--ds-ok)"],
  aviso: ["var(--ds-warn-soft)", "var(--ds-warn)"],
  riesgo: ["var(--ds-risk-soft)", "var(--ds-risk)"]
}, ht = (e) => String(e).padStart(2, "0"), Be = (e) => `${e.getFullYear()}-${ht(e.getMonth() + 1)}-${ht(e.getDate())}`, Bt = (e) => {
  const [r, n, a] = e.split("-").map(Number);
  return new Date(r, n - 1, a || 1);
}, Ot = (e) => `${e.getFullYear()}-${ht(e.getMonth() + 1)}`;
function pt({ e, onEvento: r, compacto: n }) {
  const [a, i] = jt[e.tono] || jt.acento, d = /* @__PURE__ */ u("span", { style: { display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: [
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
function ln({ resto: e, dia: r, onEvento: n }) {
  const a = G(null), [i, d] = O(!1);
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
      bt,
      {
        ancla: a,
        abierto: i,
        onCerrar: () => d(!1),
        rol: "dialog",
        etiqueta: `Eventos del ${Q(r, "larga")}`,
        minAncho: 240,
        children: [
          /* @__PURE__ */ t("div", { style: {
            fontSize: "var(--ds-t-micro)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--ds-ink-3)",
            padding: "4px 6px 8px"
          }, children: Q(r, "larga") }),
          /* @__PURE__ */ t("div", { style: { display: "grid", gap: 6, padding: "0 4px 4px" }, children: e.map((o, s) => /* @__PURE__ */ t(pt, { e: o, onEvento: n }, o.id ?? s)) })
        ]
      }
    )
  ] });
}
const tt = {
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
function ya({
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
  const h = ge(700), p = s ? Bt(s) : /* @__PURE__ */ new Date(), [v, m] = O(n || Ot(p)), g = Bt(`${r || v}-01`), f = (I) => {
    const R = Ot(I);
    r || m(R), a == null || a(R);
  }, x = ke(() => {
    const I = /* @__PURE__ */ new Map();
    return e.forEach((R) => {
      if (!R.fecha) return;
      const E = String(R.fecha).slice(0, 10);
      I.has(E) || I.set(E, []), I.get(E).push(R);
    }), I;
  }, [e]), b = (g.getDay() + 6) % 7, k = new Date(g);
  k.setDate(1 - b);
  const S = new Date(g.getFullYear(), g.getMonth() + 1, 0), w = Math.ceil((b + S.getDate()) / 7), N = Array.from({ length: w * 7 }, (I, R) => {
    const E = new Date(k);
    return E.setDate(k.getDate() + R), E;
  }), W = Q(g, "mes"), $ = /* @__PURE__ */ u("div", { style: {
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
    }, children: W }),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        style: tt,
        "aria-label": "Mes anterior",
        onClick: () => f(new Date(g.getFullYear(), g.getMonth() - 1, 1)),
        children: "‹"
      }
    ),
    /* @__PURE__ */ t("button", { type: "button", style: tt, onClick: () => f(p), children: "Hoy" }),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        style: tt,
        "aria-label": "Mes siguiente",
        onClick: () => f(new Date(g.getFullYear(), g.getMonth() + 1, 1)),
        children: "›"
      }
    )
  ] });
  if (h) {
    const I = N.filter((R) => R.getMonth() === g.getMonth() && x.has(Be(R)));
    return /* @__PURE__ */ u("div", { style: l, children: [
      $,
      I.length === 0 && /* @__PURE__ */ t("div", { style: {
        color: "var(--ds-ink-3)",
        fontSize: "var(--ds-t-small)",
        fontWeight: 600,
        padding: "var(--ds-4) 0"
      }, children: c }),
      /* @__PURE__ */ t("ol", { style: { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--ds-3)" }, children: I.map((R) => {
        const E = Be(R), V = E === Be(p);
        return /* @__PURE__ */ u("li", { style: { display: "grid", gridTemplateColumns: "52px 1fr", gap: "var(--ds-3)" }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: i ? () => i(E, x.get(E)) : void 0,
              disabled: !i,
              "aria-label": Q(E, "larga"),
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
                  color: V ? "var(--ds-accent-tinta)" : "var(--ds-ink-3)"
                }, children: Ct[(R.getDay() + 6) % 7] }),
                /* @__PURE__ */ t("div", { className: "ds-num", style: {
                  fontSize: "var(--ds-num-m)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: V ? "var(--ds-accent-tinta)" : "var(--ds-ink)"
                }, children: R.getDate() })
              ]
            }
          ),
          /* @__PURE__ */ t("div", { style: { display: "grid", gap: 6, minWidth: 0 }, children: x.get(E).map((Z, M) => /* @__PURE__ */ t(pt, { e: Z, onEvento: d }, Z.id ?? M)) })
        ] }, E);
      }) })
    ] });
  }
  return /* @__PURE__ */ u("div", { style: l, children: [
    $,
    /* @__PURE__ */ u("div", { role: "group", "aria-label": W, style: {
      display: "grid",
      gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
      border: "1px solid var(--ds-line)",
      borderRadius: "var(--ds-r-item)",
      overflow: "hidden"
    }, children: [
      Ct.map((I) => /* @__PURE__ */ t("div", { "aria-hidden": !0, style: {
        fontSize: "var(--ds-t-micro)",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "var(--ds-ink-3)",
        padding: "8px 10px",
        borderBottom: "1px solid var(--ds-line)",
        background: "var(--ds-surface-2)"
      }, children: I }, I)),
      N.map((I, R) => {
        const E = Be(I), V = I.getMonth() === g.getMonth(), Z = E === Be(p), M = x.get(E) || [], q = M.length > o ? M.slice(0, o - 1) : M, A = M.slice(q.length);
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
              borderBottom: R < N.length - 7 ? "1px solid var(--ds-line)" : "none",
              background: V ? "transparent" : "var(--ds-surface-sunk)"
            },
            children: [
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  className: "ds-num",
                  disabled: !i,
                  onClick: i ? () => i(E, M) : void 0,
                  "aria-label": `${Q(E, "larga")}${M.length ? `, ${M.length} eventos` : ", sin eventos"}`,
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
                    background: Z ? "var(--ds-accent)" : "transparent",
                    color: Z ? "var(--ds-ink-on-accent)" : V ? "var(--ds-ink)" : "var(--ds-ink-3)"
                  },
                  children: I.getDate()
                }
              ),
              q.map((H, j) => /* @__PURE__ */ t(pt, { e: H, onEvento: d, compacto: !0 }, H.id ?? j)),
              A.length > 0 && /* @__PURE__ */ t(ln, { resto: M, dia: E, onEvento: d })
            ]
          },
          E
        );
      })
    ] })
  ] });
}
function ba({
  titulo: e,
  descripcion: r,
  migas: n,
  meta: a,
  acciones: i,
  estilo: d
}) {
  const o = ge();
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
function xa({
  opciones: e = [],
  valor: r,
  onCambio: n,
  etiqueta: a,
  tamano: i = "m",
  pleno: d = !1,
  estilo: o
}) {
  const s = G([]), c = G(null), [l, h] = O(null), p = Math.max(0, e.findIndex((y) => y.valor === r));
  Ae(() => {
    const y = () => {
      const f = s.current[p];
      f && h({ izq: f.offsetLeft, ancho: f.offsetWidth });
    };
    if (y(), typeof ResizeObserver > "u" || !c.current) return;
    const g = new ResizeObserver(y);
    return g.observe(c.current), () => g.disconnect();
  }, [p, e.length]);
  const v = (y) => {
    var x;
    const g = y.key === "ArrowRight" || y.key === "ArrowDown" ? 1 : y.key === "ArrowLeft" || y.key === "ArrowUp" ? -1 : 0;
    if (!g || e.length === 0) return;
    y.preventDefault();
    const f = (p + g + e.length) % e.length;
    n == null || n(e[f].valor), (x = s.current[f]) == null || x.focus();
  }, m = i === "s" ? 30 : 36;
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
        e.map((y, g) => {
          const f = g === p;
          return /* @__PURE__ */ u(
            "button",
            {
              ref: (x) => {
                s.current[g] = x;
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
const qt = (e) => String(e).padStart(2, "0"), Ht = (e) => `${e.getFullYear()}-${qt(e.getMonth() + 1)}-${qt(e.getDate())}`, dn = (e) => {
  const [r, n, a] = String(e).slice(0, 10).split("-").map(Number);
  return new Date(r, n - 1, a);
}, rt = (e, r) => {
  const n = new Date(e);
  return n.setDate(n.getDate() + r), n;
}, pr = [
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
function Vt(e, r = /* @__PURE__ */ new Date()) {
  const n = r instanceof Date ? new Date(r.getFullYear(), r.getMonth(), r.getDate()) : dn(r), a = n.getFullYear(), i = n.getMonth();
  let d, o;
  switch (e) {
    case "hoy":
      d = n, o = n;
      break;
    case "ayer":
      d = rt(n, -1), o = d;
      break;
    case "7d":
      d = rt(n, -6), o = n;
      break;
    case "30d":
      d = rt(n, -29), o = n;
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
  const s = pr.find((c) => c.clave === e);
  return { clave: e, desde: Ht(d), hasta: Ht(o), etiqueta: (s == null ? void 0 : s.etiqueta) ?? e };
}
function cn(e, r) {
  return e ? e === r ? Q(e, "media") : `${Q(e, "media")} – ${Q(r, "media")}` : "";
}
function ka({
  valor: e,
  onCambio: r,
  opciones: n,
  fechaBase: a,
  etiqueta: i = "Periodo",
  estilo: d
}) {
  const o = G(null), [s, c] = O(!1), l = a ?? /* @__PURE__ */ new Date(), h = pr.filter((v) => !n || n.includes(v.clave)), p = e ? Vt(e, l) : null;
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
      bt,
      {
        ancla: o,
        abierto: s,
        onCerrar: () => c(!1),
        etiqueta: i,
        minAncho: 250,
        children: h.map((v) => {
          const m = Vt(v.clave, l);
          return /* @__PURE__ */ t(
            hr,
            {
              elegida: v.clave === e,
              nota: cn(m.desde, m.hasta),
              onClick: () => {
                c(!1), r == null || r(m);
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
function un({ texto: e, valor: r, onQuitar: n, estilo: a }) {
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
function wa({ children: e, activos: r = [], onQuitar: n, onLimpiar: a, resultado: i, estilo: d }) {
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
        un,
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
const Ve = 6.6, ft = (e) => [...String(e ?? "")].reduce((r, n) => r + (n >= "A" && n <= "Z" ? 8 : n === " " ? 3.4 : Ve), 0), vn = 140, hn = (e, r) => {
  const n = String(e ?? "");
  if (ft(n) <= r) return n;
  let a = n;
  for (; a.length > 1 && ft(a + "…") > r; ) a = a.slice(0, -1);
  return a.trimEnd() + "…";
};
function Sa({
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
  const [h, p] = We(), [v, m] = O(null), y = Math.max(r.length, ...e.map((T) => (T.valores || []).length), 0), g = d && i, f = o == null ? null : typeof o == "object" ? o.valor : o, x = o && typeof o == "object" && o.texto ? o.texto : "Meta", b = ke(() => {
    const T = Array(y).fill(0);
    return e.map((D) => {
      const B = Array.from({ length: y }, (le, ae) => {
        var L;
        const z = (L = D.valores) == null ? void 0 : L[ae];
        return z == null || !Number.isFinite(Number(z)) ? null : Number(z);
      });
      if (!g) return { abajo: null, arriba: B, crudo: B };
      const X = T.slice(), te = B.map((le, ae) => T[ae] += le ?? 0);
      return { abajo: X, arriba: te.slice(), crudo: B };
    });
  }, [e, y, g]), k = b.flatMap((T) => T.arriba.filter((D) => D !== null));
  f !== null && k.push(Number(f));
  const S = k.length > 0 && y > 0, w = S ? Math.min(...k) : 0, N = S ? Math.max(...k) : 1, { marcas: W, min: $, max: I } = yt(
    c ? Math.min(0, w) : w,
    c ? Math.max(0, N) : N,
    n < 200 ? 3 : 4
  ), R = a === "moneda" ? "monedaCompacta" : a === "numero" ? "compacto" : a, E = e.length > 1 && e.length <= 4 && p >= 420 && !g, V = Math.max(...W.map((T) => String(F(T, R)).length)) * Ve + 12, Z = E ? Math.min(vn, Math.max(...e.map((T) => ft(T.nombre))) + 14) : 10, M = 10, q = 24, A = Math.max(10, p - V - Z), H = n - M - q, j = (T) => V + (y <= 1 ? A / 2 : T / (y - 1) * A), _ = _e($, I, M + H, M), ee = Math.max(3, ...Array.from({ length: y }, (T, D) => String(r[D] ?? D + 1).length)) * Ve + 12, ve = Math.max(2, Math.min(p < 420 ? 4 : 1 / 0, Math.floor(A / ee))), re = Math.max(1, Math.ceil(y / ve)), Ee = [];
  let Ce = -1 / 0;
  for (let T = 0; T < y; T += re) {
    const D = String(r[T] ?? T + 1).length * Ve, B = y > 1 && T === 0 ? "start" : y > 1 && T >= y - 1 ? "end" : "middle", X = B === "start" ? j(T) : B === "end" ? j(T) - D : j(T) - D / 2;
    X >= Ce + 8 && (Ee.push({ i: T, ancla: B }), Ce = X + D);
  }
  const Te = (T) => {
    const D = [];
    let B = [];
    return T.forEach((X, te) => {
      X === null ? (B.length && D.push(B), B = []) : B.push(te);
    }), B.length && D.push(B), D;
  }, ne = {
    columnas: ["", ...e.map((T) => T.nombre)],
    filas: Array.from({ length: y }, (T, D) => [
      r[D] ?? D + 1,
      ...b.map((B) => F(B.crudo[D], a))
    ])
  }, Ne = (T) => {
    if (!S) return;
    const D = T.currentTarget.getBoundingClientRect(), B = T.clientX - D.left, X = y <= 1 ? 0 : Math.round((B - V) / A * (y - 1));
    m(Math.max(0, Math.min(y - 1, X)));
  }, Ke = (T) => {
    T.key === "ArrowRight" && (T.preventDefault(), m((D) => Math.min(y - 1, (D ?? -1) + 1))), T.key === "ArrowLeft" && (T.preventDefault(), m((D) => Math.max(0, (D ?? y) - 1))), T.key === "Escape" && m(null);
  }, Ue = v === null ? 0 : Math.min(...b.map((T) => T.arriba[v] === null ? M + H : _(T.arriba[v])));
  return /* @__PURE__ */ t(
    ye,
    {
      titulo: s,
      series: e,
      formaLeyenda: "linea",
      tabla: S ? ne : null,
      estilo: l,
      alto: n,
      children: /* @__PURE__ */ u("div", { ref: h, style: { position: "relative", minWidth: 0 }, children: [
        S ? p > 0 && /* @__PURE__ */ u(
          "svg",
          {
            width: p,
            height: n,
            role: "img",
            tabIndex: 0,
            "aria-label": `${s ? `${s}: ` : ""}${e.length} serie(s), ${y} puntos. Flechas para recorrer.`,
            style: { display: "block", overflow: "visible", outline: "none" },
            onMouseMove: Ne,
            onMouseLeave: () => m(null),
            onFocus: () => m((T) => T === null ? y - 1 : T),
            onBlur: () => m(null),
            onKeyDown: Ke,
            children: [
              W.map((T) => /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: V,
                    x2: V + A,
                    y1: _(T),
                    y2: _(T),
                    stroke: T === 0 ? "var(--ds-eje)" : "var(--ds-grid)",
                    strokeWidth: "1"
                  }
                ),
                /* @__PURE__ */ t("text", { x: V - 8, y: _(T), dy: "0.32em", textAnchor: "end", style: oe, children: F(T, R) })
              ] }, T)),
              Ee.map(({ i: T, ancla: D }) => /* @__PURE__ */ t("text", { x: j(T), y: n - 6, textAnchor: D, style: oe, children: r[T] ?? T + 1 }, T)),
              i && b.map((T, D) => Te(T.arriba).map((B, X) => {
                const te = (ae) => T.abajo ? _(T.abajo[ae]) : _(Math.max($, Math.min(0, I))), le = `M${j(B[0])},${te(B[0])} ` + B.map((ae) => `L${j(ae)},${_(T.arriba[ae])}`).join(" ") + ` ${[...B].reverse().map((ae) => `L${j(ae)},${te(ae)}`).join(" ")} Z`;
                return /* @__PURE__ */ t(
                  "path",
                  {
                    d: le,
                    fill: de(e[D], D),
                    fillOpacity: g ? 0.55 : 0.12,
                    stroke: "none"
                  },
                  `a${D}-${X}`
                );
              })),
              b.map((T, D) => Te(T.arriba).map((B, X) => B.length === 1 ? /* @__PURE__ */ t(
                "circle",
                {
                  cx: j(B[0]),
                  cy: _(T.arriba[B[0]]),
                  r: "3",
                  fill: de(e[D], D)
                },
                `p${D}-${X}`
              ) : /* @__PURE__ */ t(
                "path",
                {
                  fill: "none",
                  stroke: de(e[D], D),
                  strokeWidth: "2",
                  strokeLinejoin: "round",
                  strokeLinecap: "round",
                  d: B.map((te, le) => `${le ? "L" : "M"}${j(te)},${_(T.arriba[te])}`).join(" ")
                },
                `l${D}-${X}`
              ))),
              f !== null && /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: V,
                    x2: V + A,
                    y1: _(f),
                    y2: _(f),
                    stroke: "var(--ds-ink-2)",
                    strokeWidth: "1.5",
                    strokeDasharray: "5 4"
                  }
                ),
                /* @__PURE__ */ u(
                  "text",
                  {
                    x: V + 6,
                    y: _(f) - 6,
                    style: { ...oe, fill: "var(--ds-ink-2)", fontWeight: 700 },
                    children: [
                      x,
                      " · ",
                      F(f, a)
                    ]
                  }
                )
              ] }),
              E && (() => {
                const T = b.map((D, B) => {
                  const X = D.arriba.map((te, le) => te === null ? -1 : le).filter((te) => te >= 0).pop();
                  return X === void 0 ? null : { si: B, yv: _(D.arriba[X]), xv: j(X) };
                }).filter(Boolean).sort((D, B) => D.yv - B.yv);
                for (let D = 1; D < T.length; D++)
                  T[D].yv - T[D - 1].yv < 14 && (T[D].yv = T[D - 1].yv + 14);
                return T.map((D) => /* @__PURE__ */ u(
                  "text",
                  {
                    x: V + A + 8,
                    y: D.yv,
                    dy: "0.32em",
                    style: { ...oe, fill: "var(--ds-ink-2)", fontWeight: 700 },
                    children: [
                      /* @__PURE__ */ t("title", { children: e[D.si].nombre }),
                      hn(e[D.si].nombre, Z - 12)
                    ]
                  },
                  D.si
                ));
              })(),
              v !== null && /* @__PURE__ */ u("g", { pointerEvents: "none", children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: j(v),
                    x2: j(v),
                    y1: M,
                    y2: M + H,
                    stroke: "var(--ds-eje)",
                    strokeWidth: "1"
                  }
                ),
                b.map((T, D) => T.arriba[v] !== null && /* @__PURE__ */ t(
                  "circle",
                  {
                    cx: j(v),
                    cy: _(T.arriba[v]),
                    r: "4.5",
                    fill: de(e[D], D),
                    stroke: "var(--ds-surface-solid)",
                    strokeWidth: "2"
                  },
                  D
                ))
              ] }),
              /* @__PURE__ */ t("rect", { x: V, y: M, width: A, height: H, fill: "transparent" })
            ]
          }
        ) : /* @__PURE__ */ t(be, { alto: n }),
        /* @__PURE__ */ t(
          Fe,
          {
            visible: v !== null,
            x: v === null ? 0 : j(v),
            y: Ue,
            ancho: p,
            titulo: v === null ? "" : r[v],
            renglones: v === null ? [] : e.map((T, D) => ({
              color: de(T, D),
              nombre: T.nombre,
              valor: F(b[D].crudo[v], a)
            }))
          }
        )
      ] })
    }
  );
}
const fr = 6.6, pn = 4, nt = 2;
function He(e, r, n, a, i) {
  if (n <= 0 || a <= 0) return "";
  const d = Math.min(pn, n / 2, a / 2);
  return i === "arriba" ? `M${e},${r + a} L${e},${r + d} Q${e},${r} ${e + d},${r} L${e + n - d},${r} Q${e + n},${r} ${e + n},${r + d} L${e + n},${r + a} Z` : i === "abajo" ? `M${e},${r} L${e + n},${r} L${e + n},${r + a - d} Q${e + n},${r + a} ${e + n - d},${r + a} L${e + d},${r + a} Q${e},${r + a} ${e},${r + a - d} Z` : i === "derecha" ? `M${e},${r} L${e + n - d},${r} Q${e + n},${r} ${e + n},${r + d} L${e + n},${r + a - d} Q${e + n},${r + a} ${e + n - d},${r + a} L${e},${r + a} Z` : i === "izquierda" ? `M${e + n},${r} L${e + n},${r + a} L${e + d},${r + a} Q${e},${r + a} ${e},${r + a - d} L${e},${r + d} Q${e},${r} ${e + d},${r} Z` : `M${e},${r} h${n} v${a} h${-n} Z`;
}
const Pt = (e, r) => {
  const n = String(e ?? ""), a = Math.max(3, Math.floor(r / fr));
  return n.length > a ? `${n.slice(0, a - 1)}…` : n;
};
function $a({
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
  const [p, v] = We(), [m, y] = O(null), g = e ? e.map((z) => z.etiqueta) : r || [], f = e ? [{
    clave: "valor",
    nombre: l || "Valor",
    valores: e.map((z) => z.valor),
    color: (ae = e[0]) == null ? void 0 : ae.color
  }] : n || [], x = g.length, b = f.length, k = (z, L) => {
    var P, Y;
    const C = (Y = (P = f[z]) == null ? void 0 : P.valores) == null ? void 0 : Y[L];
    return C == null || !Number.isFinite(Number(C)) ? null : Number(C);
  };
  let S = 0, w = 0;
  for (let z = 0; z < x; z++)
    if (i) {
      let L = 0, C = 0;
      for (let P = 0; P < b; P++) {
        const Y = k(P, z) ?? 0;
        Y >= 0 ? L += Y : C += Y;
      }
      w = Math.max(w, L), S = Math.min(S, C);
    } else
      for (let L = 0; L < b; L++) {
        const C = k(L, z);
        C !== null && (w = Math.max(w, C), S = Math.min(S, C));
      }
  const N = x > 0 && b > 0 && f.some((z, L) => g.some((C, P) => k(L, P) !== null)), W = a ? v - Math.min(v * 0.38, 170) - 10 - (d ? 64 : 12) : 0, $ = a ? Math.max(2, Math.min(4, Math.floor(W / 72))) : 4, { marcas: I, min: R, max: E } = yt(S, w, $), V = c === "moneda" ? "monedaCompacta" : c === "numero" ? "compacto" : c, Z = s ?? (a ? Math.max(120, x * (b > 1 && !i ? 18 * b + 14 : 34) + 34) : 240), M = a ? Math.min(v * 0.38, 170) : 0, q = d ? 64 : 12, A = a ? M + 10 : Math.max(...I.map((z) => String(F(z, V)).length)) * fr + 12, H = a ? q : 6, j = d && !a ? 18 : 8, _ = f.some((z) => (z.valores || []).some((L) => Number(L) < 0)), Oe = a ? 22 : 24 + (d && _ ? 16 : 0), ee = Math.max(10, v - A - H), ve = Z - j - Oe, re = (a ? ve : ee) / Math.max(1, x), Ee = re * (a ? 0.22 : 0.26), Ce = re - Ee, Te = i || b === 1 ? Ce : (Ce - nt * (b - 1)) / b, ne = a ? _e(R, E, A, A + ee) : _e(R, E, j + ve, j), Ne = ne(0), Ke = (z) => o == null || o === z ? 1 : 0.35, Ue = (z) => {
    const L = [], C = (a ? j : A) + z * re + Ee / 2;
    if (i) {
      let P = 0, Y = 0;
      const he = [...f.keys()].reverse().find(($e) => (k($e, z) ?? 0) > 0), qe = [...f.keys()].reverse().find(($e) => (k($e, z) ?? 0) < 0);
      f.forEach(($e, ze) => {
        const xe = k(ze, z) ?? 0;
        if (xe === 0) return;
        const je = xe > 0 ? P : Y, Ze = je + xe;
        xe > 0 ? P = Ze : Y = Ze, L.push({ off: C, grueso: Te, desde: je, hasta: Ze, si: ze, extremo: ze === (xe > 0 ? he : qe) });
      });
    } else
      f.forEach((P, Y) => {
        const he = k(Y, z);
        he !== null && L.push({ off: C + Y * (Te + nt), grueso: Te, desde: 0, hasta: he, si: Y, extremo: !0 });
      });
    return L;
  }, T = (z) => {
    const L = ne(z.desde), C = ne(z.hasta), P = z.hasta >= z.desde, Y = i && !z.extremo ? nt : 0;
    if (a) {
      const ze = Math.min(L, C), xe = Math.abs(C - L), je = z.extremo ? P ? "derecha" : "izquierda" : "ninguno";
      return He(P ? ze : ze + Y, z.off, xe - Y, z.grueso, je);
    }
    const he = Math.min(L, C), qe = Math.abs(C - L), $e = z.extremo ? P ? "arriba" : "abajo" : "ninguno";
    return P ? He(z.off, he + Y, z.grueso, qe - Y, $e) : He(z.off, he, z.grueso, qe - Y, $e);
  }, D = (z) => f.reduce((L, C, P) => L + (k(P, z) ?? 0), 0), B = {
    columnas: ["", ...f.map((z) => z.nombre)],
    filas: g.map((z, L) => [z, ...f.map((C, P) => F(k(P, L), c))])
  }, X = (z) => (a ? j : A) + z * re + re / 2, te = m === null ? { x: 0, y: 0 } : a ? { x: Math.min(v - 10, ne(Math.max(0, i ? D(m) : Math.max(...f.map((z, L) => k(L, m) ?? 0))))), y: X(m) } : { x: X(m), y: j + ve / 3 }, le = Math.max(1, Math.ceil(x * 44 / Math.max(1, ee)));
  return /* @__PURE__ */ t(
    ye,
    {
      titulo: l,
      series: b > 1 ? f : [],
      tabla: N ? B : null,
      estilo: h,
      alto: Z,
      children: /* @__PURE__ */ u("div", { ref: p, style: { position: "relative", minWidth: 0 }, children: [
        N ? v > 0 && /* @__PURE__ */ u(
          "svg",
          {
            width: v,
            height: Z,
            role: "img",
            style: { display: "block", overflow: "visible" },
            "aria-label": `${l ? `${l}: ` : ""}${x} categorías`,
            children: [
              I.map((z) => a ? /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: ne(z),
                    x2: ne(z),
                    y1: j,
                    y2: j + ve,
                    stroke: z === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
                  }
                ),
                /* @__PURE__ */ t("text", { x: ne(z), y: Z - 6, textAnchor: "middle", style: oe, children: F(z, V) })
              ] }, z) : /* @__PURE__ */ u("g", { children: [
                /* @__PURE__ */ t(
                  "line",
                  {
                    x1: A,
                    x2: A + ee,
                    y1: ne(z),
                    y2: ne(z),
                    stroke: z === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
                  }
                ),
                /* @__PURE__ */ t("text", { x: A - 8, y: ne(z), dy: "0.32em", textAnchor: "end", style: oe, children: F(z, V) })
              ] }, z)),
              g.map((z, L) => /* @__PURE__ */ u(
                "g",
                {
                  tabIndex: 0,
                  opacity: Ke(L),
                  "aria-label": `${z}: ${f.map((C, P) => `${b > 1 ? `${C.nombre} ` : ""}${F(k(P, L), c)}`).join(", ")}`,
                  onMouseEnter: () => y(L),
                  onMouseLeave: () => y(null),
                  onFocus: () => y(L),
                  onBlur: () => y(null),
                  style: { outline: "none", transition: "opacity var(--ds-t-state) var(--ds-ease)" },
                  children: [
                    a ? /* @__PURE__ */ t(
                      "rect",
                      {
                        x: A,
                        y: j + L * re,
                        width: ee,
                        height: re,
                        fill: m === L ? "var(--ds-surface-sunk)" : "transparent"
                      }
                    ) : /* @__PURE__ */ t(
                      "rect",
                      {
                        x: A + L * re,
                        y: j,
                        width: re,
                        height: ve,
                        fill: m === L ? "var(--ds-surface-sunk)" : "transparent"
                      }
                    ),
                    Ue(L).map((C, P) => /* @__PURE__ */ t("path", { d: T(C), fill: de(f[C.si], C.si) }, P)),
                    a ? /* @__PURE__ */ u(
                      "text",
                      {
                        x: A - 10,
                        y: X(L),
                        dy: "0.32em",
                        textAnchor: "end",
                        style: { ...oe, fontSize: 12, fill: "var(--ds-ink-2)" },
                        children: [
                          /* @__PURE__ */ t("title", { children: z }),
                          Pt(z, M)
                        ]
                      }
                    ) : L % le === 0 && /* @__PURE__ */ u("text", { x: X(L), y: Z - 6, textAnchor: "middle", style: oe, children: [
                      /* @__PURE__ */ t("title", { children: z }),
                      Pt(z, re * le - 4)
                    ] }),
                    d && (() => {
                      const C = i || b === 1 ? i ? D(L) : k(0, L) : null;
                      if (C === null) return null;
                      const P = F(C, V);
                      if (a) {
                        const he = ne(C);
                        return /* @__PURE__ */ t(
                          "text",
                          {
                            x: C >= 0 ? he + 6 : he - 6,
                            y: X(L),
                            dy: "0.32em",
                            textAnchor: C >= 0 ? "start" : "end",
                            style: { ...oe, fill: "var(--ds-ink)", fontWeight: 800 },
                            children: P
                          }
                        );
                      }
                      if (re < 34) return null;
                      const Y = ne(C);
                      return /* @__PURE__ */ t(
                        "text",
                        {
                          x: X(L),
                          y: C >= 0 ? Y - 6 : Y + 14,
                          textAnchor: "middle",
                          style: { ...oe, fill: "var(--ds-ink)", fontWeight: 800 },
                          children: P
                        }
                      );
                    })()
                  ]
                },
                L
              )),
              a ? /* @__PURE__ */ t("line", { x1: Ne, x2: Ne, y1: j, y2: j + ve, stroke: "var(--ds-eje)" }) : /* @__PURE__ */ t("line", { x1: A, x2: A + ee, y1: Ne, y2: Ne, stroke: "var(--ds-eje)" })
            ]
          }
        ) : /* @__PURE__ */ t(be, { alto: Z }),
        /* @__PURE__ */ t(
          Fe,
          {
            visible: m !== null,
            x: te.x,
            y: te.y,
            ancho: v,
            titulo: m === null ? "" : g[m],
            renglones: m === null ? [] : [
              ...f.map((z, L) => ({ color: de(z, L), nombre: z.nombre, valor: F(k(L, m), c) })),
              ...i && b > 1 ? [{ nombre: "Total", valor: F(D(m), c) }] : []
            ]
          }
        )
      ] })
    }
  );
}
const at = 6;
function it(e, r, n, a, i, d) {
  const o = (f, x) => [e + f * Math.sin(x), r - f * Math.cos(x)], s = d - i > Math.PI ? 1 : 0, [c, l] = o(a, i), [h, p] = o(a, d), [v, m] = o(n, d), [y, g] = o(n, i);
  return `M${c},${l} A${a},${a} 0 ${s} 1 ${h},${p} L${v},${m} A${n},${n} 0 ${s} 0 ${y},${g} Z`;
}
function Ma({
  datos: e = [],
  formato: r = "numero",
  totalEtiqueta: n = "Total",
  tamano: a = 200,
  grosor: i = 26,
  titulo: d,
  estilo: o
}) {
  const [s, c] = O(null), l = e.map((w, N) => ({ ...w, propio: w.color, color: w.color || de(null, N), valor: Number(w.valor) })).filter((w) => Number.isFinite(w.valor) && w.valor > 0);
  let h = l;
  if (l.length > at) {
    const w = [...l].sort((W, $) => $.valor - W.valor), N = w.slice(at - 1);
    h = [
      ...w.slice(0, at - 1).map((W, $) => ({ ...W, color: W.propio || de(null, $) })),
      {
        etiqueta: `Otros (${N.length})`,
        valor: N.reduce((W, $) => W + $.valor, 0),
        color: "var(--ds-ink-3)",
        otros: !0
      }
    ];
  }
  const p = h.reduce((w, N) => w + N.valor, 0), v = a / 2, m = a / 2, y = a / 2 - 4, g = y - i, f = h.length > 1 ? 2 / y : 0;
  let x = 0;
  const b = h.map((w) => {
    const N = w.valor / p * Math.PI * 2, W = { a0: x + f / 2, a1: x + N - f / 2 };
    return x += N, W;
  }), k = {
    columnas: ["", "Valor", "%"],
    filas: h.map((w) => [w.etiqueta, F(w.valor, r), U(w.valor / p)])
  }, S = s === null ? { t: n, v: F(p, r) } : { t: h[s].etiqueta, v: F(h[s].valor, r) };
  return /* @__PURE__ */ t(ye, { titulo: d, tabla: p > 0 ? k : null, estilo: o, alto: a, children: p <= 0 ? /* @__PURE__ */ t(be, { alto: a }) : /* @__PURE__ */ u("div", { style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--ds-5)" }, children: [
    /* @__PURE__ */ u("div", { style: { position: "relative", width: a, height: a, flexShrink: 0, margin: "0 auto" }, children: [
      /* @__PURE__ */ t(
        "svg",
        {
          width: a,
          height: a,
          role: "img",
          style: { display: "block" },
          "aria-label": `${d ? `${d}: ` : ""}${h.map((w) => `${w.etiqueta} ${U(w.valor / p)}`).join(", ")}`,
          children: h.length === 1 ? /* @__PURE__ */ t(
            "path",
            {
              d: `${it(v, m, g, y, 0, Math.PI)} ${it(v, m, g, y, Math.PI, Math.PI * 2)}`,
              fill: h[0].color
            }
          ) : h.map((w, N) => /* @__PURE__ */ t(
            "path",
            {
              d: it(
                v,
                m,
                s === N ? g - 3 : g,
                s === N ? y + 2 : y,
                b[N].a0,
                b[N].a1
              ),
              fill: w.color,
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
        }, children: S.t }),
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
        }, children: S.v }),
        s !== null && /* @__PURE__ */ t("div", { className: "ds-num", style: { fontSize: "var(--ds-t-small)", fontWeight: 700, color: "var(--ds-ink-2)" }, children: U(h[s].valor / p) })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { role: "list", style: { flex: "1 1 180px", minWidth: 0, display: "grid", gap: 2 }, children: h.map((w, N) => /* @__PURE__ */ u(
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
          /* @__PURE__ */ t(Ge, { color: w.color }),
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
              title: w.etiqueta,
              children: w.etiqueta
            }
          ),
          /* @__PURE__ */ t("span", { className: "ds-num", style: { fontSize: "var(--ds-t-small)", fontWeight: 800, color: "var(--ds-ink)" }, children: F(w.valor, r) }),
          /* @__PURE__ */ t("span", { className: "ds-num", style: {
            fontSize: "var(--ds-t-micro)",
            fontWeight: 700,
            color: "var(--ds-ink-3)",
            minWidth: 44,
            textAlign: "right"
          }, children: U(w.valor / p) })
        ]
      },
      N
    )) })
  ] }) });
}
const _t = [5, 4, 3, 2], fn = (e, r) => _t[r <= 1 ? 0 : Math.round(e / (r - 1) * (_t.length - 1))];
function Wa({ etapas: e = [], formato: r = "numero", titulo: n, estilo: a }) {
  var p;
  const [i, d] = We(), o = e.filter((v) => Number.isFinite(Number(v.valor))), s = Math.max(0, ...o.map((v) => Number(v.valor))), c = Number((p = o[0]) == null ? void 0 : p.valor), l = d > 0 && d < 460, h = {
    columnas: ["Etapa", "Valor", "vs anterior", "vs inicio"],
    filas: o.map((v, m) => [
      v.etiqueta,
      F(v.valor, r),
      m === 0 ? "—" : U(Number(o[m - 1].valor) ? Number(v.valor) / Number(o[m - 1].valor) : null),
      m === 0 ? "—" : U(c ? Number(v.valor) / c : null)
    ])
  };
  return /* @__PURE__ */ t(ye, { titulo: n, tabla: s > 0 ? h : null, estilo: a, children: /* @__PURE__ */ t("div", { ref: i, style: { minWidth: 0 }, children: s <= 0 ? /* @__PURE__ */ t(be, {}) : /* @__PURE__ */ t("ol", { style: { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: l ? 12 : 6 }, children: o.map((v, m) => {
    const y = Number(v.valor), g = m > 0 ? Number(o[m - 1].valor) : null, f = g ? y / g : null, x = c ? y / c : null, b = /* @__PURE__ */ t("div", { style: {
      height: 30,
      display: "flex",
      justifyContent: "center",
      background: "var(--ds-surface-sunk)",
      borderRadius: "var(--ds-r-item)",
      overflow: "hidden"
    }, children: /* @__PURE__ */ t("div", { style: {
      width: `${Math.max(1.5, y / s * 100)}%`,
      height: "100%",
      background: `var(--ds-sec-${fn(m, o.length)})`,
      borderRadius: "var(--ds-r-item)",
      transition: "width var(--ds-t-move) var(--ds-ease)"
    } }) }), k = /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "baseline", gap: 8, justifyContent: l ? "flex-start" : "flex-end", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ t("span", { className: "ds-num", style: { fontWeight: 800, color: "var(--ds-ink)", fontSize: "var(--ds-t-body)" }, children: F(y, r) }),
      m > 0 && /* @__PURE__ */ u("span", { className: "ds-num", style: { fontSize: "var(--ds-t-micro)", fontWeight: 700, color: "var(--ds-ink-3)", whiteSpace: "nowrap" }, children: [
        U(f),
        " de la anterior · ",
        U(x),
        " del inicio"
      ] })
    ] }), S = /* @__PURE__ */ t("div", { style: {
      fontSize: "var(--ds-t-small)",
      fontWeight: 700,
      color: "var(--ds-ink-2)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }, title: v.etiqueta, children: v.etiqueta });
    return /* @__PURE__ */ t("li", { "aria-label": `${v.etiqueta}: ${F(y, r)}${m > 0 ? `, ${U(f)} de la etapa anterior` : ""}`, children: l ? /* @__PURE__ */ u("div", { style: { display: "grid", gap: 6 }, children: [
      /* @__PURE__ */ u("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline", flexWrap: "wrap" }, children: [
        S,
        k
      ] }),
      b
    ] }) : /* @__PURE__ */ u("div", { style: {
      display: "grid",
      gridTemplateColumns: "minmax(90px, 22%) 1fr minmax(150px, 28%)",
      alignItems: "center",
      gap: 14
    }, children: [
      S,
      b,
      k
    ] }) }, m);
  }) }) }) });
}
const Xt = 6.6, mn = 4;
function Ta({
  pasos: e = [],
  alto: r = 260,
  formato: n = "numero",
  etiquetas: a = !0,
  titulo: i,
  estilo: d
}) {
  const [o, s] = We(), [c, l] = O(null);
  let h = 0;
  const p = e.map((M) => {
    const q = Number(M.valor);
    if (M.tipo === "total") {
      const j = Number.isFinite(q) && M.valor !== null && M.valor !== void 0 ? q : h;
      return h = j, { ...M, desde: 0, hasta: j, delta: j, total: !0 };
    }
    const A = Number.isFinite(q) ? q : 0, H = h;
    return h += A, { ...M, desde: H, hasta: h, delta: A, total: !1 };
  }), v = p.length > 0, m = p.flatMap((M) => [M.desde, M.hasta]), { marcas: y, min: g, max: f } = yt(Math.min(0, ...m), Math.max(0, ...m), 4), x = n === "moneda" ? "monedaCompacta" : n === "numero" ? "compacto" : n, b = Math.max(...y.map((M) => String(F(M, x)).length)) * Xt + 12, k = a ? 20 : 8, S = 24, w = Math.max(10, s - b - 6), N = r - k - S, W = w / Math.max(1, p.length), $ = W * 0.62, I = _e(g, f, k + N, k), R = (M) => M.total ? "var(--ds-serie-1)" : M.delta >= 0 ? "var(--ds-ok)" : "var(--ds-risk)", E = (M, q = n) => M.total ? F(M.hasta, q) : `${M.delta > 0 ? "+" : ""}${F(M.delta, q)}`, V = (M, q) => {
    const A = Math.max(3, Math.floor(q / Xt));
    return M.length > A ? `${M.slice(0, A - 1)}…` : M;
  }, Z = {
    columnas: ["Paso", "Movimiento", "Acumulado"],
    filas: p.map((M) => [M.etiqueta, M.total ? "—" : E(M), F(M.hasta, n)])
  };
  return /* @__PURE__ */ t(ye, { titulo: i, tabla: v ? Z : null, estilo: d, alto: r, children: /* @__PURE__ */ u("div", { ref: o, style: { position: "relative", minWidth: 0 }, children: [
    v ? s > 0 && /* @__PURE__ */ u(
      "svg",
      {
        width: s,
        height: r,
        role: "img",
        style: { display: "block", overflow: "visible" },
        "aria-label": `${i ? `${i}: ` : ""}${p.length} pasos, resultado ${F(h, n)}`,
        children: [
          y.map((M) => /* @__PURE__ */ u("g", { children: [
            /* @__PURE__ */ t(
              "line",
              {
                x1: b,
                x2: b + w,
                y1: I(M),
                y2: I(M),
                stroke: M === 0 ? "var(--ds-eje)" : "var(--ds-grid)"
              }
            ),
            /* @__PURE__ */ t("text", { x: b - 8, y: I(M), dy: "0.32em", textAnchor: "end", style: oe, children: F(M, x) })
          ] }, M)),
          p.map((M, q) => {
            const A = b + q * W + (W - $) / 2, H = I(Math.max(M.desde, M.hasta)), j = I(Math.min(M.desde, M.hasta)), _ = Math.max(1, j - H), Oe = M.hasta >= M.desde, ee = Math.min(mn, $ / 2, _ / 2), ve = Oe ? `M${A},${H + _} L${A},${H + ee} Q${A},${H} ${A + ee},${H} L${A + $ - ee},${H} Q${A + $},${H} ${A + $},${H + ee} L${A + $},${H + _} Z` : `M${A},${H} L${A + $},${H} L${A + $},${H + _ - ee} Q${A + $},${H + _} ${A + $ - ee},${H + _} L${A + ee},${H + _} Q${A},${H + _} ${A},${H + _ - ee} Z`, re = p[q + 1];
            return /* @__PURE__ */ u(
              "g",
              {
                tabIndex: 0,
                style: { outline: "none" },
                "aria-label": `${M.etiqueta}: ${E(M)}, acumulado ${F(M.hasta, n)}`,
                onMouseEnter: () => l(q),
                onMouseLeave: () => l(null),
                onFocus: () => l(q),
                onBlur: () => l(null),
                children: [
                  /* @__PURE__ */ t(
                    "rect",
                    {
                      x: b + q * W,
                      y: k,
                      width: W,
                      height: N,
                      fill: c === q ? "var(--ds-surface-sunk)" : "transparent"
                    }
                  ),
                  /* @__PURE__ */ t("path", { d: ve, fill: R(M) }),
                  re && /* @__PURE__ */ t(
                    "line",
                    {
                      x1: A + $,
                      x2: b + (q + 1) * W + (W - $) / 2,
                      y1: I(M.hasta),
                      y2: I(M.hasta),
                      stroke: "var(--ds-eje)",
                      strokeDasharray: "3 3"
                    }
                  ),
                  a && W >= 40 && /* @__PURE__ */ t(
                    "text",
                    {
                      x: A + $ / 2,
                      y: H - 6,
                      textAnchor: "middle",
                      style: { ...oe, fill: "var(--ds-ink)", fontWeight: 800 },
                      children: E(M, x)
                    }
                  ),
                  /* @__PURE__ */ u(
                    "text",
                    {
                      x: b + q * W + W / 2,
                      y: r - 6,
                      textAnchor: "middle",
                      style: { ...oe, fontWeight: M.total ? 800 : 600, fill: M.total ? "var(--ds-ink-2)" : "var(--ds-ink-3)" },
                      children: [
                        /* @__PURE__ */ t("title", { children: M.etiqueta }),
                        V(String(M.etiqueta ?? ""), W - 4)
                      ]
                    }
                  )
                ]
              },
              q
            );
          })
        ]
      }
    ) : /* @__PURE__ */ t(be, { alto: r }),
    /* @__PURE__ */ t(
      Fe,
      {
        visible: c !== null,
        ancho: s,
        x: c === null ? 0 : b + c * W + W / 2,
        y: c === null ? 0 : I(Math.max(p[c].desde, p[c].hasta)),
        titulo: c === null ? "" : p[c].etiqueta,
        renglones: c === null ? [] : [
          ...p[c].total ? [] : [{ color: R(p[c]), nombre: "Movimiento", valor: E(p[c]) }],
          { nombre: p[c].total ? "Total" : "Acumulado", valor: F(p[c].hasta, n) }
        ]
      }
    )
  ] }) });
}
const Xe = 5;
function mr(e) {
  const r = e.filter((n) => n != null && Number.isFinite(Number(n))).map(Number);
  return r.length ? { min: Math.min(...r), max: Math.max(...r) } : null;
}
function gr(e, r) {
  if (e == null || !Number.isFinite(Number(e)) || !r) return 0;
  if (r.max === r.min) return 3;
  const n = (Number(e) - r.min) / (r.max - r.min);
  return Math.min(Xe, 1 + Math.floor(n * Xe));
}
const Ye = (e) => `var(--ds-sec-${e})`;
function yr({ rango: e, formato: r }) {
  if (!e) return null;
  const n = (e.max - e.min) / Xe;
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
    Array.from({ length: Xe }, (a, i) => /* @__PURE__ */ t(
      "span",
      {
        title: `${F(e.min + n * i, r)} – ${F(e.min + n * (i + 1), r)}`,
        style: { width: 22, height: 10, borderRadius: "var(--ds-r-mini)", background: Ye(i + 1) }
      },
      i
    )),
    /* @__PURE__ */ t("span", { className: "ds-num", children: F(e.max, r) }),
    /* @__PURE__ */ u("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, marginLeft: 10 }, children: [
      /* @__PURE__ */ t("span", { style: { width: 10, height: 10, borderRadius: "var(--ds-r-mini)", background: Ye(0) } }),
      "Sin dato"
    ] })
  ] });
}
function Na({
  filas: e = [],
  columnas: r = [],
  valores: n = [],
  formato: a = "numero",
  celdaMinima: i = 28,
  altoCelda: d = 28,
  titulo: o,
  estilo: s
}) {
  var S;
  const c = G(null), [l, h] = O(null), p = n.flat(), v = mr(p), m = Math.min(140, Math.max(36, ...e.map((w) => String(w).length * 7 + 12))), y = (w, N) => {
    var W;
    return (W = n == null ? void 0 : n[w]) == null ? void 0 : W[N];
  }, g = (w, N) => ({
    x: m + (N + 0.5) * (c.current ? (c.current.scrollWidth - m) / Math.max(1, r.length) : i),
    y: 22 + w * (d + 3)
  }), f = (w, N) => h((W) => {
    const [$, I] = W || [0, 0];
    return [Math.max(0, Math.min(e.length - 1, $ + w)), Math.max(0, Math.min(r.length - 1, I + N))];
  }), x = (w) => {
    const N = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[w.key];
    N && (w.preventDefault(), f(...N)), w.key === "Escape" && h(null);
  }, b = {
    columnas: ["", ...r],
    filas: e.map((w, N) => [w, ...r.map((W, $) => F(y(N, $), a))])
  }, k = l ? g(...l) : { x: 0, y: 0 };
  return /* @__PURE__ */ t(ye, { titulo: o, tabla: v ? b : null, estilo: s, children: v ? /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ u(
      "div",
      {
        ref: c,
        tabIndex: 0,
        role: "grid",
        "aria-label": `${o ? `${o}: ` : ""}${e.length} por ${r.length}. Flechas para recorrer.`,
        onKeyDown: x,
        onFocus: () => h((w) => w || [0, 0]),
        onBlur: () => h(null),
        onMouseLeave: () => h(null),
        style: { position: "relative", overflowX: "auto", paddingBottom: 4, outlineOffset: 2 },
        children: [
          /* @__PURE__ */ u("div", { style: {
            display: "grid",
            minWidth: m + r.length * i,
            gridTemplateColumns: `${m}px repeat(${r.length}, minmax(${i}px, 1fr))`,
            gap: 3
          }, children: [
            /* @__PURE__ */ t("div", {}),
            r.map((w, N) => /* @__PURE__ */ t(
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
                title: String(w),
                children: r.length > 16 && N % 2 ? "" : w
              },
              N
            )),
            e.map((w, N) => /* @__PURE__ */ u(me.Fragment, { children: [
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
              }, title: String(w), children: w }),
              r.map((W, $) => {
                const I = l && l[0] === N && l[1] === $;
                return /* @__PURE__ */ t(
                  "div",
                  {
                    role: "gridcell",
                    "aria-selected": !!I,
                    onMouseEnter: () => h([N, $]),
                    style: {
                      height: d,
                      borderRadius: "var(--ds-r-mini)",
                      background: Ye(gr(y(N, $), v)),
                      boxShadow: I ? "0 0 0 2px var(--ds-ink)" : "none",
                      transition: "box-shadow var(--ds-t-tap) var(--ds-ease-out)"
                    }
                  },
                  $
                );
              })
            ] }, N))
          ] }),
          /* @__PURE__ */ t(
            Fe,
            {
              visible: !!l,
              x: k.x,
              y: k.y,
              ancho: ((S = c.current) == null ? void 0 : S.scrollWidth) || 0,
              titulo: l ? `${e[l[0]]} · ${r[l[1]]}` : "",
              renglones: l ? [{ nombre: o || "Valor", valor: F(y(...l), a) }] : []
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(yr, { rango: v, formato: a })
  ] }) : /* @__PURE__ */ t(be, {}) });
}
const pe = 13, De = 3, gn = ["L", "", "M", "", "V", "", ""], ot = (e) => {
  if (e instanceof Date) return new Date(e.getFullYear(), e.getMonth(), e.getDate());
  const [r, n, a] = String(e).slice(0, 10).split("-").map(Number);
  return new Date(r, n - 1, a);
}, yn = (e) => `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
function za({ datos: e = [], desde: r, hasta: n, formato: a = "numero", titulo: i, estilo: d }) {
  const o = G(null), [s, c] = O(null), { dias: l, semanas: h, mapa: p, rango: v } = ke(() => {
    const W = new Map(e.map((M) => [String(M.fecha).slice(0, 10), M.valor])), $ = e.map((M) => ot(M.fecha)).sort((M, q) => M - q), I = r ? ot(r) : $[0], R = n ? ot(n) : $[$.length - 1];
    if (!I || !R || R < I) return { dias: [], semanas: 0, mapa: W, rango: null };
    const E = new Date(I);
    E.setDate(E.getDate() - (E.getDay() + 6) % 7);
    const V = [];
    for (let M = new Date(E); M <= R; M.setDate(M.getDate() + 1)) {
      const q = yn(M);
      V.push({ fecha: new Date(M), k: q, fuera: M < I, valor: W.get(q) });
    }
    const Z = V.filter((M) => !M.fuera).map((M) => M.valor);
    return { dias: V, semanas: Math.ceil(V.length / 7), mapa: W, rango: mr(Z) };
  }, [e, r, n]);
  Ae(() => {
    o.current && (o.current.scrollLeft = o.current.scrollWidth);
  }, [h]);
  const m = 18, y = 18, g = (W) => ({
    x: m + Math.floor(W / 7) * (pe + De),
    y: y + W % 7 * (pe + De)
  }), f = [];
  l.forEach((W, $) => {
    if ($ % 7 === 0) {
      const I = $ / 7, R = l.slice($, $ + 7).find((E) => E.fecha.getDate() === 1) || ($ === 0 ? W : null);
      R && (!f.length || I - f[f.length - 1].sem >= 3) && f.push({ sem: I, texto: Q(R.fecha, "mesCorto") });
    }
  });
  const x = (W) => {
    const $ = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -7, ArrowRight: 7 }[W.key];
    $ && (W.preventDefault(), c((I) => {
      var E;
      let R = (I ?? l.length - 1) + $;
      for (R = Math.max(0, Math.min(l.length - 1, R)); (E = l[R]) != null && E.fuera && R < l.length - 1; ) R += 1;
      return R;
    })), W.key === "Escape" && c(null);
  }, b = m + h * (pe + De), k = y + 7 * (pe + De), S = {
    columnas: ["Fecha", "Valor"],
    filas: l.filter((W) => !W.fuera && W.valor !== void 0).map((W) => [Q(W.fecha, "media"), F(W.valor, a)])
  }, w = s !== null ? l[s] : null, N = s !== null ? g(s) : { x: 0, y: 0 };
  return /* @__PURE__ */ t(ye, { titulo: i, tabla: v ? S : null, estilo: d, children: v ? /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ u(
      "div",
      {
        ref: o,
        tabIndex: 0,
        role: "grid",
        "aria-label": `${i ? `${i}: ` : ""}calendario de ${h} semanas. Flechas para recorrer.`,
        onKeyDown: x,
        onFocus: () => c((W) => W ?? l.length - 1),
        onBlur: () => c(null),
        onMouseLeave: () => c(null),
        style: { position: "relative", overflowX: "auto", paddingBottom: 4, outlineOffset: 2 },
        children: [
          /* @__PURE__ */ u("svg", { width: b, height: k, style: { display: "block" }, children: [
            f.map((W) => /* @__PURE__ */ t(
              "text",
              {
                x: m + W.sem * (pe + De),
                y: 11,
                style: { fontSize: 11, fontWeight: 600, fill: "var(--ds-ink-3)", fontFamily: "var(--ds-font)" },
                children: W.texto
              },
              W.sem
            )),
            gn.map((W, $) => W && /* @__PURE__ */ t(
              "text",
              {
                x: 0,
                y: y + $ * (pe + De) + pe - 2,
                style: { fontSize: 10, fontWeight: 600, fill: "var(--ds-ink-3)", fontFamily: "var(--ds-font)" },
                children: W
              },
              $
            )),
            l.map((W, $) => {
              if (W.fuera) return null;
              const { x: I, y: R } = g($);
              return /* @__PURE__ */ t(
                "rect",
                {
                  x: I,
                  y: R,
                  width: pe,
                  height: pe,
                  rx: "3",
                  fill: Ye(gr(W.valor, v)),
                  stroke: s === $ ? "var(--ds-ink)" : "none",
                  strokeWidth: "2",
                  onMouseEnter: () => c($)
                },
                W.k
              );
            })
          ] }),
          /* @__PURE__ */ t(
            Fe,
            {
              visible: !!w,
              x: N.x + pe / 2,
              y: N.y,
              ancho: b,
              titulo: w ? Q(w.fecha, "larga") : "",
              renglones: w ? [{ nombre: i || "Valor", valor: w.valor === void 0 ? "Sin dato" : F(w.valor, a) }] : []
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(yr, { rango: v, formato: a })
  ] }) : /* @__PURE__ */ t(be, {}) });
}
const Yt = ["var(--ds-line-firm)", "var(--ds-esqueleto-brillo)", "var(--ds-surface-sunk)"];
function bn({ item: e, formato: r, angosto: n, anchoEtiqueta: a }) {
  const { etiqueta: i, valor: d, meta: o, rangos: s = [], menorEsMejor: c = !1, nota: l } = e, h = Number(d), p = Math.max(...[...s, h, Number(o)].filter(Number.isFinite), 1), v = (k) => `${Math.max(0, Math.min(100, k / p * 100))}%`, m = [0, ...s.slice(0, 2), p], y = c ? [...Yt].reverse() : Yt, g = !Number.isFinite(h), f = /* @__PURE__ */ u("div", { style: { position: "relative", height: 22, borderRadius: "var(--ds-r-mini)", overflow: "hidden", background: y[2] }, children: [
    s.length > 0 && m.slice(0, -1).map((k, S) => /* @__PURE__ */ t("div", { style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: v(k),
      width: `calc(${v(m[S + 1])} - ${v(k)})`,
      background: y[S]
    } }, S)),
    !g && /* @__PURE__ */ t("div", { style: {
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
  ] }), x = /* @__PURE__ */ u("div", { className: "ds-num", style: { textAlign: n ? "left" : "right", whiteSpace: "nowrap" }, children: [
    /* @__PURE__ */ t("span", { style: { fontWeight: 800, color: "var(--ds-ink)" }, children: g ? "Sin dato" : F(h, r) }),
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
    l && /* @__PURE__ */ t("div", { style: { fontSize: "var(--ds-t-micro)", color: "var(--ds-ink-3)" }, children: l })
  ] });
  return /* @__PURE__ */ t("li", { "aria-label": `${i}: ${g ? "sin dato" : F(h, r)}${Number.isFinite(Number(o)) ? `, meta ${F(o, r)}` : ""}`, children: n ? /* @__PURE__ */ u("div", { style: { display: "grid", gap: 6 }, children: [
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
function Da({ items: e, item: r, formato: n = "numero", titulo: a, estilo: i }) {
  const [d, o] = We(), s = e || (r ? [r] : []), c = o > 0 && o < 460, l = Math.min(180, Math.max(90, o * 0.26)), h = {
    columnas: ["", "Real", "Meta"],
    filas: s.map((p) => [p.etiqueta, F(p.valor, n), F(p.meta, n)])
  };
  return /* @__PURE__ */ t(ye, { titulo: a, tabla: s.length ? h : null, estilo: i, children: /* @__PURE__ */ t("div", { ref: d, style: { minWidth: 0 }, children: s.length ? /* @__PURE__ */ t("ul", { style: { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: c ? 16 : 12 }, children: s.map((p, v) => /* @__PURE__ */ t(bn, { item: p, formato: n, angosto: c, anchoEtiqueta: l }, v)) }) : /* @__PURE__ */ t(be, { alto: 100 }) }) });
}
const xn = {
  ok: "var(--ds-ok)",
  aviso: "var(--ds-warn)",
  riesgo: "var(--ds-risk)",
  neutro: "var(--ds-ink-3)",
  acento: "var(--ds-accent-trazo)"
};
function Ia({
  segmentos: e = [],
  formato: r = "numero",
  alto: n = 14,
  leyenda: a = !0,
  titulo: i,
  estilo: d
}) {
  const [o, s] = We(), [c, l] = O(null), h = e.map((g, f) => ({ ...g, valor: Number(g.valor), color: g.color || xn[g.tono] || de(null, f) })).filter((g) => Number.isFinite(g.valor) && g.valor > 0), p = h.reduce((g, f) => g + f.valor, 0);
  let v = 0;
  const m = h.map((g) => {
    const f = v + g.valor / 2;
    return v += g.valor, p ? f / p * s : 0;
  }), y = {
    columnas: ["", "Valor", "%"],
    filas: h.map((g) => [g.etiqueta, F(g.valor, r), U(g.valor / p)])
  };
  return /* @__PURE__ */ t(ye, { titulo: i, tabla: p > 0 ? y : null, estilo: d, children: /* @__PURE__ */ t("div", { ref: o, style: { position: "relative", minWidth: 0 }, children: p <= 0 ? /* @__PURE__ */ t(be, { alto: 60 }) : /* @__PURE__ */ u(J, { children: [
    /* @__PURE__ */ t("div", { role: "list", style: {
      display: "flex",
      gap: 2,
      height: n,
      borderRadius: "var(--ds-r-pill)",
      overflow: "hidden"
    }, children: h.map((g, f) => /* @__PURE__ */ t(
      "div",
      {
        role: "listitem",
        tabIndex: 0,
        "aria-label": `${g.etiqueta}: ${F(g.valor, r)}, ${U(g.valor / p)}`,
        onMouseEnter: () => l(f),
        onMouseLeave: () => l(null),
        onFocus: () => l(f),
        onBlur: () => l(null),
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
        ancho: s,
        x: c === null ? 0 : m[c],
        y: n + 6,
        titulo: c === null ? "" : h[c].etiqueta,
        renglones: c === null ? [] : [
          { color: h[c].color, nombre: "Valor", valor: F(h[c].valor, r) },
          { nombre: "Del total", valor: U(h[c].valor / p) }
        ]
      }
    ),
    a && /* @__PURE__ */ t("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "8px 16px",
      marginTop: "var(--ds-4)"
    }, children: h.map((g, f) => /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "flex-start", gap: 8, minWidth: 0 }, children: [
      /* @__PURE__ */ t("span", { style: { marginTop: 4 }, children: /* @__PURE__ */ t(Ge, { color: g.color }) }),
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
          /* @__PURE__ */ t("span", { style: { fontWeight: 700, color: "var(--ds-ink-3)", marginLeft: 6, fontSize: "var(--ds-t-micro)" }, children: U(g.valor / p) })
        ] })
      ] })
    ] }, f)) })
  ] }) }) });
}
export {
  ct as ALTO_DOCK,
  ga as Actividad,
  wr as Anillo,
  Bn as Armazon,
  jn as Aviso,
  Lr as Azulejo,
  Da as Bala,
  An as Barra,
  Ia as BarraDistribucion,
  wa as BarraFiltros,
  Rn as Barras,
  Wn as Bento,
  lt as Boton,
  Aa as Buscador,
  ya as Calendario,
  za as CalendarioCalor,
  Fa as Campo,
  Hn as Campos,
  ta as Cargando,
  Ta as Cascada,
  Tn as Celda,
  un as Chip,
  Dn as Cifra,
  vr as CuerpoKpi,
  ca as Detalles,
  Ma as Dona,
  Wa as Embudo,
  ba as EncabezadoPagina,
  K as Esqueleto,
  $r as EsqueletoFila,
  In as EsqueletoLista,
  va as EstadoVacio,
  Ln as Fila,
  ia as FilaKpis,
  bt as Flotante,
  qn as Formulario,
  Nr as Giro,
  Fe as Globo,
  $a as GraficaBarras,
  Sa as GraficaLinea,
  ha as GrupoRetratos,
  Nn as Heroe,
  Qt as Insignia,
  En as Interruptor,
  ma as Kanban,
  Fn as Lamina,
  Kr as Leyenda,
  pa as LineaTiempo,
  ua as Llamado,
  Na as MapaCalor,
  ye as MarcoGrafica,
  Sr as Medidor,
  Rr as Migas,
  Ar as Modal,
  hr as OpcionFlotante,
  pr as PERIODOS,
  ra as PanelInicio,
  fa as Pasos,
  Re as Pastilla,
  ea as Pestanas,
  $n as ProveedorTema,
  mt as Retrato,
  Nt as SERIES,
  fe as SIN_DATO,
  zr as Seccion,
  xa as Segmentado,
  Ea as Selector,
  On as SelectorArmazon,
  ka as SelectorPeriodo,
  be as SinDatos,
  Zr as Sparkline,
  we as Superficie,
  Cn as Tabla,
  sa as TarjetaComparativa,
  da as TarjetaEntidad,
  aa as TarjetaKpi,
  oa as TarjetaMeta,
  la as TarjetaRanking,
  Er as Transicion,
  ur as Variacion,
  zn as Vidrio,
  lr as compacto,
  Zn as condicion,
  Gr as configurarFormato,
  Kn as correo,
  Yn as digitos,
  Q as fecha,
  gt as fechaRelativa,
  ue as formatear,
  na as formato,
  Pn as maximo,
  _n as minimo,
  ut as moneda,
  Xn as numero,
  Un as patron,
  U as porcentaje,
  Vt as rangoPeriodo,
  Vn as requerido,
  Gn as soloDigitos,
  cn as textoRango,
  ge as useAngosto,
  nr as useArmazon,
  Jn as useFiltros,
  Qn as useFormulario,
  We as useMedida,
  Mn as useTema,
  cr as variacion
};
