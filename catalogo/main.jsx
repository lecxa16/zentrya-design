/**
 * Catálogo de @zentrya/design: cada familia de piezas es un archivo en
 * `secciones/` que exporta `meta = { id, titulo, orden }` y su componente.
 * Los datos de las muestras son de EJEMPLO y lo dicen: un catálogo con cifras
 * que parecen reales termina copiado a una pantalla de verdad.
 */
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ProveedorTema, Armazon, MenuUsuario, Notificaciones, SimboloZentrya } from "../src/index.js";
import DemoAcceso from "./acceso.jsx";

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
  : agrupar(SECCIONES);

/* El catálogo también prueba los subniveles: «Piezas» sólo agrupa (sin página
   propia) y «Estructura» tiene página y un hijo. Operación lleva pendientes de
   ejemplo para ver que el padre los suma. */
function agrupar(lista) {
  const por = Object.fromEntries(lista.map((x) => [x.id, x]));
  const piezas = ["tarjetas", "graficas", "operacion"].filter((id) => por[id]);
  const fuera = new Set([...piezas, "formularios"]);
  return lista.flatMap((x) => {
    if (x.id === piezas[0]) {
      return [{ id: "piezas", texto: "Piezas", icono: PUNTO,
        hijos: piezas.map((id) => (id === "operacion" ? { ...por[id], insignia: 3 } : por[id])) }];
    }
    if (x.id === "estructura" && por.formularios) return [{ ...x, navegable: true, hijos: [por.formularios] }];
    return fuera.has(x.id) ? [] : [x];
  });
}


/* Tema, paleta (las marcas Nykza y Work OS son también paletas) y navegación se
   eligen con el mismo `BotonApariencia` que usan las apps. */

/* Avisos y persona de EJEMPLO, para ver la campana y el menú de la cuenta. */
const hace = (min) => new Date(Date.now() - min * 60000).toISOString();
const AVISOS = [
  { id: 1, titulo: "Pago de tarjeta en 3 días", texto: "Tarjeta de crédito · $4,820.00", fecha: hace(25), tono: "warn" },
  { id: 2, titulo: "Se registró tu nómina", texto: "Cuenta nómina · $18,500.00", fecha: hace(180), tono: "ok" },
  { id: 3, titulo: "Presupuesto de comida al 92 %", fecha: hace(60 * 26), leido: true },
];

function Barra() {
  const [avisos, setAvisos] = useState(AVISOS);
  const leer = (a) => setAvisos((l) => l.map((x) => (x.id === a.id ? { ...x, leido: true } : x)));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Notificaciones avisos={avisos} onAbrir={leer}
        onMarcarTodas={() => setAvisos((l) => l.map((x) => ({ ...x, leido: true })))} onVerTodas={() => {}} />
      <MenuUsuario nombre="Ana López" correo="ana@ejemplo.com" figura
        opciones={[{ texto: "Mi cuenta", onClick: () => {} }]} onSalir={() => {}} />
    </div>
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
      /* Lista vacía: el armazón arma la ruta solo con la navegación (Piezas › Operación). */
      migas={[]}
      logo={{ icono: <SimboloZentrya /> }}
      onInicio={() => { setActiva(SECCIONES[0].id); location.hash = SECCIONES[0].id; }}
      derecha={<Barra />}>
      <div style={{ padding: "var(--ds-6) 0 var(--ds-12)" }}>{Vista && <Vista />}</div>
    </Armazon>
  );
}

/* `?acceso`: la pantalla de acceso a pantalla completa, fuera del armazón. */
const ACCESO = new URLSearchParams(location.search).has("acceso");

createRoot(document.getElementById("root")).render(
  <ProveedorTema paletas>{ACCESO ? <DemoAcceso /> : <Catalogo />}</ProveedorTema>,
);
