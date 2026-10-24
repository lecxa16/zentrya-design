/**
 * Catálogo de @zentrya/design: cada familia de piezas es un archivo en
 * `secciones/` que exporta `meta = { id, titulo, orden }` y su componente.
 * Los datos de las muestras son de EJEMPLO y lo dicen: un catálogo con cifras
 * que parecen reales termina copiado a una pantalla de verdad.
 */
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ProveedorTema, Armazon, BotonApariencia } from "../src/index.js";

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


/* Tema, paleta (las marcas Nykza y Work OS son también paletas) y navegación se
   eligen con el mismo `BotonApariencia` que usan las apps. */

function Catalogo() {
  const inicial = (location.hash || "").replace("#", "") || SECCIONES[0]?.id;
  const [activa, setActiva] = useState(inicial);
  const actual = SECCIONES.find((s) => s.id === activa)
    || SECCIONES.find((s) => activa?.startsWith(`${s.id}-`)) || SECCIONES[0];
  const Vista = actual?.Vista;
  return (
    <Armazon marca="Zentrya · catálogo" secciones={NAVEGACION} activa={activa} vista={actual?.id}
      onIr={(s) => { setActiva(s.id); location.hash = s.id; }}
      derecha={<BotonApariencia />}>
      <div style={{ padding: "var(--ds-6) 0 var(--ds-12)" }}>{Vista && <Vista />}</div>
    </Armazon>
  );
}

createRoot(document.getElementById("root")).render(<ProveedorTema paletas><Catalogo /></ProveedorTema>);
