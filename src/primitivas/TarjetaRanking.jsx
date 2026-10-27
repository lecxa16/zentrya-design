/**
 * TarjetaRanking — los primeros N de algo: clientes, productos, rutas,
 * proveedores, vendedores.
 *
 * Una gráfica de barras horizontal para un top 5 cuesta un eje, una leyenda
 * y un globo para decir lo que una lista dice mejor: quién, cuánto, y qué tan
 * lejos del primero. Cada renglón lleva una barra fina proporcional al
 * máximo —en acento, porque es una sola magnitud, no categorías— y, si se
 * pide, su participación en el total.
 *
 *   <TarjetaRanking titulo="Clientes por venta" formato="moneda" total={9800000}
 *     participacion elementos={[{ nombre, subtitulo, valor }]} accion={…} />
 *
 * `total` es el universo completo (no sólo el top): la participación sobre la
 * suma del top 5 inflaría a todos.
 */
import React from "react";
import Superficie from "./Superficie";
import Seccion from "./Seccion";
import Esqueleto from "./Esqueleto";
import { formatear, porcentaje } from "../formato";

export default function TarjetaRanking({
  titulo, nota, elementos = [], formato = "numero", opcionesFormato, limite = 5,
  participacion = false, total, accion, onElemento, vacio = "Sin movimientos en este periodo.",
  cargando = false, estilo, entrada,
}) {
  const lista = elementos.slice(0, limite);
  const max = Math.max(0, ...lista.map((e) => Number(e.valor) || 0));
  const universo = Number(total) > 0 ? Number(total)
    : elementos.reduce((s, e) => s + (Number(e.valor) || 0), 0);

  return (
    <Superficie entrada={entrada} estilo={{ height: "100%", ...estilo }}>
      <Seccion titulo={titulo} nota={nota} accion={accion}>
        {cargando ? (
          <div aria-busy="true" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {Array.from({ length: Math.min(limite, 5) }, (_, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6, opacity: 1 - i * 0.12 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <Esqueleto alto={12} ancho={`${50 - i * 5}%`} /><Esqueleto alto={12} ancho={70} estilo={{ marginLeft: "auto" }} />
                </div>
                <Esqueleto alto={4} radio={99} ancho={`${90 - i * 14}%`} />
              </div>
            ))}
          </div>
        ) : lista.length === 0 ? (
          <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", padding: "var(--ds-4) 0" }}>
            {vacio}
          </div>
        ) : (
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex",
            flexDirection: "column", gap: 2 }}>
            {lista.map((e, i) => {
              const v = Number(e.valor) || 0;
              const clicable = !!onElemento;
              return (
                <li key={e.clave ?? e.nombre ?? i}>
                  <div
                    role={clicable ? "button" : undefined} tabIndex={clicable ? 0 : undefined}
                    onClick={clicable ? () => onElemento(e) : undefined}
                    onKeyDown={clicable ? (ev) => {
                      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); onElemento(e); }
                    } : undefined}
                    style={{ display: "grid", gridTemplateColumns: "22px minmax(0,1fr) auto",
                      columnGap: 10, rowGap: 6, alignItems: "center",
                      padding: "8px 6px", margin: "0 -6px", borderRadius: "var(--ds-r-item)",
                      cursor: clicable ? "pointer" : undefined,
                      transition: "background var(--ds-t-state) var(--ds-ease)" }}
                    onMouseEnter={clicable ? (ev) => { ev.currentTarget.style.background = "var(--ds-surface-2)"; } : undefined}
                    onMouseLeave={clicable ? (ev) => { ev.currentTarget.style.background = "transparent"; } : undefined}>
                    <span className="ds-num" style={{ fontSize: "var(--ds-t-small)", fontWeight: 700,
                      color: "var(--ds-ink-3)" }}>{i + 1}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: "var(--ds-ink)", whiteSpace: "nowrap",
                        overflow: "hidden", textOverflow: "ellipsis" }}>{e.nombre}</div>
                      {e.subtitulo && (
                        <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)",
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {e.subtitulo}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="ds-num" style={{ fontWeight: 700, color: "var(--ds-ink)" }}>
                        {formatear(e.valor, formato, opcionesFormato)}
                      </div>
                      {participacion && universo > 0 && (
                        <div className="ds-num" style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600,
                          color: "var(--ds-ink-3)" }}>
                          {porcentaje(v / universo)} del total
                        </div>
                      )}
                    </div>
                    <div aria-hidden style={{ gridColumn: "2 / 4", height: 4, borderRadius: 99,
                      background: "var(--ds-surface-sunk)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${max > 0 ? (v / max) * 100 : 0}%`,
                        background: "var(--ds-accent-trazo)", borderRadius: 99,
                        transition: "width var(--ds-t-move) var(--ds-ease)" }} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </Seccion>
    </Superficie>
  );
}
