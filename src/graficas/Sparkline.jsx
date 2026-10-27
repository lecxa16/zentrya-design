/**
 * Sparkline — la tendencia en una línea, sin ejes.
 *
 * Acompaña a una cifra: dice «viene subiendo» o «se cayó la última semana»
 * sin pedir una gráfica entera. No lleva ejes ni marcas porque no está para
 * leer valores; para eso está la cifra a su lado (o el globo, si se pasa
 * `formato`).
 *
 * El último punto se marca: es el que la cifra de al lado está diciendo.
 * Los huecos (null) cortan la línea en vez de unirse por debajo: un día sin
 * dato no es un día en cero.
 */
import React, { useState } from "react";
import { useMedida, fmt } from "./base";

export default function Sparkline({
  datos = [], alto = 40, color = "var(--ds-accent-trazo)", area = true, formato = "numero",
  etiquetas, estilo,
}) {
  const [ref, ancho] = useMedida();
  const [hover, setHover] = useState(null);
  const valores = datos.map((d) => (typeof d === "object" && d !== null ? d.valor : d));
  const numeros = valores.filter((v) => v !== null && v !== undefined && Number.isFinite(Number(v)));
  const min = Math.min(...numeros);
  const max = Math.max(...numeros);
  const pad = 4;
  const w = Math.max(0, ancho);
  const x = (i) => (valores.length <= 1 ? w / 2 : pad + (i / (valores.length - 1)) * (w - pad * 2));
  const y = (v) => (max === min ? alto / 2 : pad + (1 - (v - min) / (max - min)) * (alto - pad * 2));

  /* Tramos continuos: un null corta. */
  const tramos = [];
  let actual = [];
  valores.forEach((v, i) => {
    if (v === null || v === undefined || !Number.isFinite(Number(v))) {
      if (actual.length) tramos.push(actual);
      actual = [];
    } else actual.push([x(i), y(Number(v))]);
  });
  if (actual.length) tramos.push(actual);

  const ultimo = [...valores].reverse().findIndex((v) => v !== null && v !== undefined);
  const iUlt = ultimo === -1 ? -1 : valores.length - 1 - ultimo;
  const gid = React.useId().replace(/:/g, "");

  return (
    <div ref={ref} style={{ position: "relative", height: alto, minWidth: 0, ...estilo }}
      onMouseLeave={() => setHover(null)}
      onMouseMove={(e) => {
        if (!w || valores.length < 2) return;
        const r = e.currentTarget.getBoundingClientRect();
        const i = Math.round(((e.clientX - r.left - pad) / (w - pad * 2)) * (valores.length - 1));
        setHover(Math.max(0, Math.min(valores.length - 1, i)));
      }}>
      {w > 0 && numeros.length > 0 && (
        <svg width={w} height={alto} role="img" style={{ display: "block", overflow: "visible" }}
          aria-label={`Tendencia de ${valores.length} puntos, último ${fmt(valores[iUlt], formato)}`}>
          <defs>
            <linearGradient id={`sp${gid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {area && tramos.map((t, i) => t.length > 1 && (
            <path key={`a${i}`} fill={`url(#sp${gid})`}
              d={`M${t[0][0]},${alto} ${t.map((p) => `L${p[0]},${p[1]}`).join(" ")} L${t[t.length - 1][0]},${alto} Z`} />
          ))}
          {tramos.map((t, i) => (
            <path key={`l${i}`} fill="none" stroke={color} strokeWidth="2"
              strokeLinejoin="round" strokeLinecap="round"
              d={t.map((p, j) => `${j ? "L" : "M"}${p[0]},${p[1]}`).join(" ")} />
          ))}
          {iUlt >= 0 && (
            <circle cx={x(iUlt)} cy={y(Number(valores[iUlt]))} r="3.5" fill={color}
              stroke="var(--ds-surface-solid)" strokeWidth="2" />
          )}
          {hover !== null && valores[hover] !== null && valores[hover] !== undefined && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={0} y2={alto} stroke="var(--ds-eje)" strokeWidth="1" />
              <circle cx={x(hover)} cy={y(Number(valores[hover]))} r="4" fill={color}
                stroke="var(--ds-surface-solid)" strokeWidth="2" />
            </g>
          )}
        </svg>
      )}
      {hover !== null && (
        <div className="ds-num" style={{ position: "absolute", bottom: "100%", marginBottom: 4,
          left: Math.min(Math.max(0, x(hover) - 40), Math.max(0, w - 80)), pointerEvents: "none",
          background: "var(--ds-panel)", border: "1px solid var(--ds-line-firm)",
          borderRadius: "var(--ds-r-item)", padding: "3px 8px", fontSize: "var(--ds-t-micro)", fontWeight: 700,
          color: "var(--ds-ink)", whiteSpace: "nowrap", boxShadow: "var(--ds-lift-2)", zIndex: 2 }}>
          {etiquetas?.[hover] ? `${etiquetas[hover]} · ` : ""}{fmt(valores[hover], formato)}
        </div>
      )}
    </div>
  );
}
