import { jsx as a, jsxs as u } from "react/jsx-runtime";
import { useId as k } from "react";
const f = {
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
function b({ id: o, etiqueta: n, requerido: t, error: e, ayuda: r, children: c, estilo: p }) {
  return (
    /* `data-error` es cómo el formulario encuentra el primer campo con
       problema para llevarle el foco: un id no serviría igual, porque los
       campos de MUI no exponen el suyo. */
    /* @__PURE__ */ u(
      "div",
      {
        "data-error": e ? "si" : void 0,
        style: { display: "flex", flexDirection: "column", gap: 6, minWidth: 0, ...p },
        children: [
          n && /* La etiqueta lleva su propio id: un control de MUI no es un `input`
          —el `Select` dibuja un `div`— y `htmlFor` no lo alcanza. Con el id
          puesto, esos controles se cuelgan de ella con `aria-labelledby`. */
          /* @__PURE__ */ u("label", { htmlFor: o, id: o ? `${o}-etiqueta` : void 0, style: {
            fontSize: "var(--ds-t-micro)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--ds-ink-3)"
          }, children: [
            n,
            t && /* @__PURE__ */ a("span", { style: { color: "var(--ds-risk)" }, children: " *" })
          ] }),
          c,
          (e || r) && /* @__PURE__ */ a("div", { style: {
            fontSize: "var(--ds-t-small)",
            color: e ? "var(--ds-risk)" : "var(--ds-ink-3)"
          }, children: e || r })
        ]
      }
    )
  );
}
function W({
  etiqueta: o,
  valor: n,
  onCambio: t,
  onSalir: e,
  tipo: r = "text",
  marcador: c,
  requerido: p,
  error: d,
  ayuda: h,
  deshabilitado: s,
  multilinea: v = !1,
  filas: x = 3,
  estilo: g,
  ...l
}) {
  const y = k();
  return /* @__PURE__ */ a(
    b,
    {
      id: y,
      etiqueta: o,
      requerido: p,
      error: d,
      ayuda: h,
      estilo: g,
      children: /* @__PURE__ */ a(
        v ? "textarea" : "input",
        {
          id: y,
          type: v ? void 0 : r,
          rows: v ? x : void 0,
          value: n ?? "",
          onChange: (i) => t == null ? void 0 : t(i.target.value),
          placeholder: c,
          disabled: s,
          "aria-invalid": d ? "true" : void 0,
          style: {
            ...f,
            borderColor: d ? "var(--ds-risk)" : "var(--ds-line)",
            opacity: s ? 0.55 : 1,
            cursor: s ? "not-allowed" : void 0,
            resize: v ? "vertical" : void 0,
            fontFamily: "var(--ds-font)"
          },
          onFocus: (i) => {
            d || (i.target.style.borderColor = "var(--ds-accent-trazo)"), i.target.style.boxShadow = d ? "0 0 0 3px rgba(220,38,38,0.22)" : "0 0 0 3px var(--ds-accent-ring)";
          },
          onBlur: (i) => {
            i.target.style.borderColor = d ? "var(--ds-risk)" : "var(--ds-line)", i.target.style.boxShadow = "none", e == null || e();
          },
          ...l
        }
      )
    }
  );
}
function F({
  etiqueta: o,
  valor: n,
  onCambio: t,
  onSalir: e,
  opciones: r = [],
  vacio: c,
  requerido: p,
  error: d,
  ayuda: h,
  deshabilitado: s,
  estilo: v,
  ...x
}) {
  const g = k();
  return /* @__PURE__ */ a(
    b,
    {
      id: g,
      etiqueta: o,
      requerido: p,
      error: d,
      ayuda: h,
      estilo: v,
      children: /* @__PURE__ */ u(
        "select",
        {
          id: g,
          value: n ?? "",
          disabled: s,
          onChange: (l) => {
            t == null || t(l.target.value), e == null || e();
          },
          "aria-invalid": d ? "true" : void 0,
          ...x,
          style: {
            ...f,
            borderColor: d ? "var(--ds-risk)" : "var(--ds-line)",
            opacity: s ? 0.55 : 1,
            cursor: s ? "not-allowed" : "pointer",
            /* La flecha del sistema operativo no sigue al tema; se dibuja aquí. */
            appearance: "none",
            WebkitAppearance: "none",
            paddingRight: 34,
            backgroundImage: "linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)",
            backgroundPosition: "calc(100% - 18px) 51%, calc(100% - 13px) 51%",
            backgroundSize: "5px 5px, 5px 5px",
            backgroundRepeat: "no-repeat"
          },
          children: [
            c !== void 0 && /* @__PURE__ */ a("option", { value: "", children: c }),
            r.map((l) => /* @__PURE__ */ a("option", { value: l.valor, children: l.texto }, l.valor))
          ]
        }
      )
    }
  );
}
function E({ valor: o, onCambio: n, marcador: t = "Buscar…", estilo: e }) {
  return /* @__PURE__ */ u("div", { style: { position: "relative", minWidth: 0, ...e }, children: [
    /* @__PURE__ */ a("span", { "aria-hidden": !0, style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--ds-ink-3)",
      lineHeight: 0
    }, children: /* @__PURE__ */ u(
      "svg",
      {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        children: [
          /* @__PURE__ */ a("circle", { cx: "11", cy: "11", r: "7" }),
          /* @__PURE__ */ a("path", { d: "M20 20l-3.5-3.5" })
        ]
      }
    ) }),
    /* @__PURE__ */ a(
      "input",
      {
        value: o ?? "",
        onChange: (r) => n == null ? void 0 : n(r.target.value),
        placeholder: t,
        "aria-label": t,
        style: { ...f, paddingLeft: 36, borderRadius: "var(--ds-r-pill)" },
        onFocus: (r) => {
          r.target.style.borderColor = "var(--ds-accent-trazo)", r.target.style.boxShadow = "0 0 0 3px var(--ds-accent-ring)";
        },
        onBlur: (r) => {
          r.target.style.borderColor = "var(--ds-line)", r.target.style.boxShadow = "none";
        }
      }
    )
  ] });
}
export {
  E as B,
  W as C,
  b as E,
  F as S
};
