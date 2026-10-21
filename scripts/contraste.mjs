#!/usr/bin/env node
/**
 * Comprobación mecánica de contraste de los tokens (v1.4.1). Para cada marca y tema mide los pares que se usan como
 * TEXTO sobre un fondo: tinta sobre acento (botón sólido), cada estado sobre su -soft (Pastilla, Calendario,
 * resumen del Formulario) y la tinta de acento sobre su -soft (chips). Todos deben dar ≥ 4.5:1 (WCAG AA).
 *
 *   npm run contraste        → sale con error si alguno no cumple. Correr antes de publicar una versión.
 *
 * Nació de tres defectos de la v1.4.0 que una captura no enseñaba: --ds-ink-on-accent no existía en el tema oscuro
 * (1.85:1) y los estados en claro daban 2.83 (aviso), 3.57 (ok) y 4.10 (riesgo).
 */
import { readFileSync } from "node:fs";

const lum = (h) => {
  const x = h.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt((x.length === 3 ? x.replace(/./g, "$&$&") : x).slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contraste = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

/** { selector: { token: "#hex" } } — solo valores hex; los rgba no entran en estos pares. */
const bloques = (css) => {
  const salida = {};
  for (const [, sel, cuerpo] of css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const v = Object.fromEntries([...cuerpo.matchAll(/(--ds-[\w-]+)\s*:\s*(#[0-9A-Fa-f]{3,8})\b/g)].map((m) => [m[1], m[2]]));
    if (Object.keys(v).length) salida[sel.trim()] = { ...(salida[sel.trim()] || {}), ...v };
  }
  return salida;
};

const t = bloques(readFileSync(new URL("../src/tokens.css", import.meta.url), "utf8"));
const m = bloques(readFileSync(new URL("../src/marcas.css", import.meta.url), "utf8"));
const claro = t[":root"]; const oscuro = { ...claro, ...t['[data-ds-theme="dark"]'] };
const temas = { "zentrya claro": claro, "zentrya oscuro": oscuro };
for (const marca of new Set(Object.keys(m).map((s) => s.match(/marca="(\w+)"/)?.[1]).filter(Boolean))) {
  const base = m[`[data-ds-marca="${marca}"]`] || {};
  temas[`${marca} claro`] = { ...claro, ...base };
  temas[`${marca} oscuro`] = { ...oscuro, ...base, ...(m[`[data-ds-theme="dark"][data-ds-marca="${marca}"]`] || {}) };
}

const PARES = [["ink-on-accent", "accent"], ["ok", "ok-soft"], ["warn", "warn-soft"], ["risk", "risk-soft"], ["accent-tinta", "accent-soft"]];
let fallas = 0;
for (const [tema, v] of Object.entries(temas)) {
  const malos = PARES.flatMap(([a, b]) => {
    const [x, y] = [v[`--ds-${a}`], v[`--ds-${b}`]];
    if (!x || !y) return [];
    const c = contraste(x, y);
    return c < 4.5 ? [`${a} ${x} / ${b} ${y} = ${c.toFixed(2)}`] : [];
  });
  fallas += malos.length;
  console.log(`${malos.length ? "✘" : "✓"} ${tema.padEnd(15)} ${malos.join(" · ")}`);
}
if (fallas) { console.error(`\n${fallas} par(es) por debajo de AA (4.5:1).`); process.exit(1); }
