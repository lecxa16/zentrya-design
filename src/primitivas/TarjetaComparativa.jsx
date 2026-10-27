/**
 * TarjetaComparativa — una cifra contra sus referencias.
 *
 * Real contra presupuesto contra año anterior es la lectura de cierre de
 * cualquier área (ventas, gasto, producción). Puesta en tres tarjetas
 * sueltas, quien la lee tiene que hacer la resta de cabeza; aquí la primera
 * columna es la base y cada referencia dice cuánto se separa de ella.
 *
 *   <TarjetaComparativa titulo="Gasto operativo" formato="moneda" sentido="baja"
 *     valores={[
 *       { etiqueta: "Real", valor: 1840000 },
 *       { etiqueta: "Presupuesto", valor: 1750000 },
 *       { etiqueta: "Año anterior", valor: 1920000 },
 *     ]} />
 *
 * La variación de cada referencia es la de la BASE contra ella («real va
 * +5 % sobre presupuesto»), y su color sigue `sentido` como en `Variacion`.
 */
import React from "react";
import Superficie from "./Superficie";
import Esqueleto from "./Esqueleto";
import Variacion from "./Variacion";
import { formatear, variacion as calcularVariacion } from "../formato";
import { useAngosto, cabe, CONTENEDOR_CIFRA } from "../ancho";

export default function TarjetaComparativa({
  titulo, valores = [], formato = "numero", opcionesFormato, sentido = "sube", nota,
  cargando = false, estilo, entrada,
}) {
  const angosto = useAngosto(520);
  const lista = valores.slice(0, 3);
  const base = lista[0];

  return (
    <Superficie entrada={entrada} estilo={{ height: "100%", ...estilo }}>
      {titulo && (
        <div style={{ fontSize: "var(--ds-t-micro)", fontWeight: 600, letterSpacing: "0.05em",
          textTransform: "uppercase", color: "var(--ds-ink-3)", marginBottom: "var(--ds-3)" }}>
          {titulo}
        </div>
      )}
      <div style={{ display: "grid", gap: angosto ? "var(--ds-3)" : 0,
        gridTemplateColumns: angosto ? "1fr" : `repeat(${Math.max(1, lista.length)}, minmax(0, 1fr))` }}>
        {lista.map((v, i) => {
          const dif = i > 0 && base ? calcularVariacion(base.valor, v.valor) : undefined;
          return (
            <div key={v.etiqueta ?? i} style={{
              minWidth: 0,
              paddingLeft: !angosto && i > 0 ? "var(--ds-4)" : 0,
              paddingRight: !angosto && i < lista.length - 1 ? "var(--ds-4)" : 0,
              borderLeft: !angosto && i > 0 ? "1px solid var(--ds-line)" : "none",
              paddingTop: angosto && i > 0 ? "var(--ds-3)" : 0,
              borderTop: angosto && i > 0 ? "1px solid var(--ds-line)" : "none",
            }}>
              <div style={{ fontSize: "var(--ds-t-small)", fontWeight: 600,
                color: i === 0 ? "var(--ds-ink-2)" : "var(--ds-ink-3)" }}>
                {v.etiqueta}
              </div>
              {cargando ? (
                <Esqueleto alto={i === 0 ? 30 : 22} ancho="70%" radio={8} estilo={{ marginTop: 6 }} />
              ) : (
                <div style={CONTENEDOR_CIFRA}>
                  <div className="ds-num" style={{
                    fontSize: cabe(i === 0 ? "var(--ds-num-m)" : "var(--ds-num-s)", formatear(v.valor, formato, opcionesFormato)), fontWeight: 700,
                    letterSpacing: "-0.03em", lineHeight: 1.15, marginTop: 4,
                    color: v.valor === null || v.valor === undefined ? "var(--ds-ink-3)"
                      : i === 0 ? "var(--ds-ink)" : "var(--ds-ink-2)",
                    whiteSpace: "nowrap",
                  }}>
                    {formatear(v.valor, formato, opcionesFormato)}
                  </div>
                </div>
              )}
              {i > 0 && !cargando && (
                <div style={{ marginTop: 6 }}>
                  <Variacion valor={dif} sentido={sentido}
                    contra={dif === null ? undefined
                      : `${base.etiqueta || "Base"} vs ${(v.etiqueta || "referencia").toLowerCase()}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {nota && (
        <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)", marginTop: "var(--ds-4)" }}>
          {nota}
        </div>
      )}
    </Superficie>
  );
}
