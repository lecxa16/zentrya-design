/**
 * Catálogo de @zentrya/design: cada familia de piezas es un archivo en
 * `secciones/` que exporta `meta = { id, titulo, orden }` y su componente.
 * Los datos de las muestras son de EJEMPLO y lo dicen: un catálogo con cifras
 * que parecen reales termina copiado a una pantalla de verdad.
 */
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ProveedorTema, Armazon, SelectorArmazon, useTema } from "../src/index.js";

const modulos = import.meta.glob("./secciones/*.jsx", { eager: true });
const SECCIONES = Object.values(modulos)
  .filter((m) => m.meta)
  .sort((a, b) => a.meta.orden - b.meta.orden)
  .map((m) => ({ id: m.meta.id, texto: m.meta.titulo, Vista: m.default }));

/* `?secciones=11` repite las secciones hasta llegar a N, con un contador de
   pendientes en algunas: así se prueba el chasis con un producto grande
   (Nykza tiene once) sin tener que construirlo. */
const PEDIDAS = parseInt(new URLSearchParams(location.search).get("secciones"), 10) || 0;
const PUNTO = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="12" r="7" /></svg>
);
const NAVEGACION = PEDIDAS > SECCIONES.length
  ? Array.from({ length: PEDIDAS }, (_, i) => {
    const base = SECCIONES[i % SECCIONES.length];
    return { ...base, id: i < SECCIONES.length ? base.id : `${base.id}-${i}`,
      texto: i < SECCIONES.length ? base.texto : `${base.texto} ${Math.floor(i / SECCIONES.length) + 1}`,
      icono: PUNTO, insignia: i % 4 === 1 ? i * 3 : 0 };
  })
  : SECCIONES;

function BotonTema() {
  const { tema, alternar } = useTema();
  return (
    <button type="button" onClick={alternar} style={{ border: "1px solid var(--ds-line-firm)",
      background: "transparent", color: "var(--ds-ink-2)", borderRadius: 99, cursor: "pointer",
      padding: "6px 12px", fontFamily: "var(--ds-font)", fontWeight: 700, fontSize: "var(--ds-t-micro)" }}>
      {tema === "dark" ? "Claro" : "Oscuro"}
    </button>
  );
}

/* La marca viaja en la URL (`?marca=nykza`) para poder revisar cada producto
   sin tocar el código; sin ella se ve Zentrya. */
const MARCA = new URLSearchParams(location.search).get("marca") || undefined;

/* Las marcas se recorren en orden: Zentrya → Nykza → Work OS → Zentrya. */
const MARCAS = [
  { id: undefined, texto: "Zentrya" },
  { id: "nykza", texto: "Nykza" },
  { id: "workos", texto: "Work OS" },
];

function BotonMarca() {
  const i = Math.max(0, MARCAS.findIndex((m) => m.id === MARCA));
  const sig = MARCAS[(i + 1) % MARCAS.length];
  const otra = sig.id ? `?marca=${sig.id}` : "";
  return (
    <a href={`${location.pathname}${otra}${location.hash}`} style={{ border: "1px solid var(--ds-line-firm)",
      color: "var(--ds-ink-2)", borderRadius: 99, textDecoration: "none",
      padding: "6px 12px", fontWeight: 700, fontSize: "var(--ds-t-micro)" }}>
      Ver {sig.texto}
    </a>
  );
}

function Catalogo() {
  const inicial = (location.hash || "").replace("#", "") || SECCIONES[0]?.id;
  const [activa, setActiva] = useState(inicial);
  const actual = SECCIONES.find((s) => s.id === activa)
    || SECCIONES.find((s) => activa?.startsWith(`${s.id}-`)) || SECCIONES[0];
  const Vista = actual?.Vista;
  return (
    <Armazon marca="Zentrya · catálogo" secciones={NAVEGACION} activa={activa} vista={actual?.id}
      onIr={(s) => { setActiva(s.id); location.hash = s.id; }}
      derecha={<div style={{ display: "flex", gap: 8 }}><BotonMarca /><BotonTema /><SelectorArmazon /></div>}>
      <div style={{ padding: "var(--ds-6) 0 var(--ds-12)" }}>{Vista && <Vista />}</div>
    </Armazon>
  );
}

createRoot(document.getElementById("root")).render(<ProveedorTema marca={MARCA}><Catalogo /></ProveedorTema>);
