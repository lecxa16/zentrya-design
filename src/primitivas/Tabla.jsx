/**
 * Tabla — matrices de números y datos.
 *
 * El sistema prefiere `Fila` para listas de personas, pero una matriz de
 * ocho columnas en filas apiladas deja de compararse. Ahí manda una tabla.
 *
 * Tres cosas que una tabla de producto necesita y casi nunca trae: el
 * encabezado se queda pegado al hacer scroll, las columnas numéricas se
 * alinean a la derecha con numerales de ancho fijo, y el vacío dice algo.
 */
import React, { useEffect, useMemo, useState } from "react";
import Esqueleto from "./Esqueleto";

export default function Tabla({
  columnas = [], filas = [], claveFila, onFila, vacio = "No hay nada que mostrar.",
  cargando = false, porPagina = 0, estilo,
}) {
  const [pagina, setPagina] = useState(1);
  const total = filas.length;
  const paginado = porPagina > 0 && total > porPagina;
  const paginas = paginado ? Math.ceil(total / porPagina) : 1;

  /* Al cambiar los filtros la lista se acorta: si el usuario estaba en la
     página 4 se quedaría mirando una tabla vacía sin entender por qué. */
  useEffect(() => { setPagina((p) => Math.min(Math.max(1, p), Math.max(1, paginas))); },
    [paginas, total]);
  useEffect(() => { setPagina(1); }, [porPagina]);

  const visibles = useMemo(() => (paginado
    ? filas.slice((pagina - 1) * porPagina, pagina * porPagina)
    : filas), [filas, pagina, porPagina, paginado]);

  const desde = total === 0 ? 0 : (pagina - 1) * porPagina + 1;
  const hasta = paginado ? Math.min(pagina * porPagina, total) : total;

  return (
    <div style={estilo}>
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse",
        fontFamily: "var(--ds-font)" }}>
        <thead>
          <tr>
            {columnas.map((c) => (
              <th key={c.clave} scope="col" style={{
                position: "sticky", top: 0, zIndex: 1,
                textAlign: c.numerica ? "right" : "left",
                fontSize: "var(--ds-t-micro)", fontWeight: 700, letterSpacing: "0.05em",
                textTransform: "uppercase", color: "var(--ds-ink-3)",
                padding: "0 var(--ds-3) var(--ds-3)", whiteSpace: "nowrap",
                background: "var(--ds-surface-solid)",
                borderBottom: "1px solid var(--ds-line)",
              }}>
                {c.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cargando && Array.from({ length: Math.max(3, Math.min(porPagina || 6, 8)) },
            (_, i) => (
            <tr key={`esq-${i}`} style={{ opacity: 1 - i * 0.1 }}>
              {columnas.map((c, j) => (
                <td key={c.clave} style={{ padding: "var(--ds-3)",
                  borderBottom: "1px solid var(--ds-line)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-3)",
                    justifyContent: c.numerica ? "flex-end" : "flex-start" }}>
                    {j === 0 && <Esqueleto circulo alto={36} />}
                    <Esqueleto alto={11} ancho={j === 0 ? "58%" : c.numerica ? 46 : "72%"} />
                  </div>
                </td>
              ))}
            </tr>
          ))}
          {!cargando && total === 0 && (
            <tr><td colSpan={columnas.length} style={{ padding: "var(--ds-8) 0",
              textAlign: "center", color: "var(--ds-ink-3)",
              fontSize: "var(--ds-t-body)" }}>{vacio}</td></tr>
          )}
          {!cargando && visibles.map((f, i) => {
            const clicable = !!onFila;
            return (
              <tr key={claveFila ? claveFila(f) : i}
                onClick={clicable ? () => onFila(f) : undefined}
                style={{ cursor: clicable ? "pointer" : undefined,
                  transition: "background var(--ds-t-state) var(--ds-ease)" }}
                onMouseEnter={clicable ? (e) => {
                  e.currentTarget.style.background = "var(--ds-surface-2)"; } : undefined}
                onMouseLeave={clicable ? (e) => {
                  e.currentTarget.style.background = "transparent"; } : undefined}>
                {columnas.map((c) => (
                  <td key={c.clave}
                    className={c.numerica ? "ds-num" : undefined}
                    style={{
                      textAlign: c.numerica ? "right" : "left",
                      fontSize: "var(--ds-t-small)", fontWeight: c.fuerte ? 700 : 500,
                      color: c.fuerte ? "var(--ds-ink)" : "var(--ds-ink-2)",
                      padding: "var(--ds-3)", verticalAlign: "middle",
                      borderBottom: "1px solid var(--ds-line)",
                    }}>
                    {c.render ? c.render(f) : f[c.clave]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* El pie sólo aparece cuando hay más de una página: una barra que dice
        «1–68 de 68» con las flechas apagadas es ruido. */}
    {paginado && !cargando && (
      <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-3)",
        flexWrap: "wrap", paddingTop: "var(--ds-4)", marginTop: "var(--ds-1)",
        borderTop: "1px solid var(--ds-line)" }}>
        <span className="ds-num" style={{ fontSize: "var(--ds-t-small)",
          color: "var(--ds-ink-3)", fontWeight: 600 }}>
          {desde}–{hasta} de {total}
        </span>
        <span style={{ flex: 1 }} />
        <Paso texto="Anterior" hacia="M15 18l-6-6 6-6" inactivo={pagina <= 1}
          onClick={() => setPagina((p) => Math.max(1, p - 1))} />
        <span className="ds-num" style={{ fontSize: "var(--ds-t-small)",
          fontWeight: 700, color: "var(--ds-ink-2)" }}>
          {pagina} / {paginas}
        </span>
        <Paso texto="Siguiente" hacia="M9 18l6-6-6-6" inactivo={pagina >= paginas}
          derecha onClick={() => setPagina((p) => Math.min(paginas, p + 1))} />
      </div>
    )}
    </div>
  );
}

/** Un paso de página. Dice a dónde va, no sólo una flecha. */
function Paso({ texto, hacia, inactivo, derecha, onClick }) {
  return (
    <button onClick={onClick} disabled={inactivo} aria-label={texto}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        flexDirection: derecha ? "row-reverse" : "row",
        fontFamily: "var(--ds-font)", fontSize: "var(--ds-t-small)", fontWeight: 700,
        padding: "7px 13px", borderRadius: "var(--ds-r-item)",
        border: "1px solid var(--ds-line)",
        background: "var(--ds-surface)",
        color: inactivo ? "var(--ds-ink-3)" : "var(--ds-ink)",
        opacity: inactivo ? 0.45 : 1,
        cursor: inactivo ? "not-allowed" : "pointer",
        transition: "background var(--ds-t-state) var(--ds-ease)",
      }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={hacia} />
      </svg>
      {texto}
    </button>
  );
}
