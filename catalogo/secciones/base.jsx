/** Fundamentos: formato de cifras, variación y la paleta de series. */
import React from "react";
import { Bento, Celda, Superficie, Seccion, Pastilla } from "../../src/index.js";
import Variacion from "../../src/primitivas/Variacion.jsx";
import Sparkline from "../../src/graficas/Sparkline.jsx";
import { moneda, numero, compacto, porcentaje, fecha, fechaRelativa } from "../../src/formato.js";

export const meta = { id: "fundamentos", titulo: "Fundamentos", orden: 5 };

const Renglon = ({ a, b }) => (
  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "6px 0",
    borderBottom: "1px solid var(--ds-line)", fontSize: "var(--ds-t-small)" }}>
    <code style={{ color: "var(--ds-ink-3)" }}>{a}</code>
    <span className="ds-num" style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{b}</span>
  </div>
);

export default function Fundamentos() {
  return (
    <Bento>
      <Celda ancho={12} anchoMd={6}><Superficie>
        <Seccion titulo="Formato de cifras" nota="es-MX y MXN por omisión; configurarFormato() para otro país">
          <Renglon a="moneda(1234567.5)" b={moneda(1234567.5)} />
          <Renglon a="moneda(…, {compacto})" b={moneda(1234567.5, { compacto: true })} />
          <Renglon a="numero(48210.756)" b={numero(48210.756)} />
          <Renglon a="compacto(2450000)" b={compacto(2450000)} />
          <Renglon a="porcentaje(0.1243)" b={porcentaje(0.1243)} />
          <Renglon a="fecha('2026-10-14')" b={fecha("2026-10-14")} />
          <Renglon a="fecha(…, 'larga')" b={fecha("2026-10-14", "larga")} />
          <Renglon a="fechaRelativa(hace 3 días)" b={fechaRelativa(new Date(Date.now() - 3 * 864e5))} />
          <Renglon a="moneda(null)" b={moneda(null)} />
        </Seccion>
      </Superficie></Celda>
      <Celda ancho={12} anchoMd={6}><Superficie>
        <Seccion titulo="Variación" nota="El color depende de si subir es bueno, no de la flecha">
          <div style={{ display: "grid", gap: 12 }}>
            <div>Ventas <Variacion valor={0.124} sentido="sube" contra="vs mes anterior" /></div>
            <div>Costo por litro <Variacion valor={0.031} sentido="baja" contra="vs mes anterior" /></div>
            <div>Días de cartera <Variacion valor={-0.08} sentido="baja" contra="vs trimestre" /></div>
            <div>Inventario <Variacion valor={0.05} sentido="neutro" /></div>
            <div>Margen <Variacion valor={-1.4} enPuntos sentido="sube" contra="vs presupuesto" /></div>
            <div>Sin dato anterior <Variacion valor={null} /></div>
          </div>
        </Seccion>
      </Superficie></Celda>
      <Celda ancho={12} anchoMd={6}><Superficie>
        <Seccion titulo="Series de gráficas" nota="Orden fijo y validado; el séptimo va a «Otros»">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: `var(--ds-serie-${i})` }} />
                <code style={{ fontSize: "var(--ds-t-micro)", color: "var(--ds-ink-3)" }}>--ds-serie-{i}</code>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 16 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} style={{ flex: 1, height: 22, borderRadius: 6, background: `var(--ds-sec-${i})` }} />
            ))}
          </div>
          <div style={{ fontSize: "var(--ds-t-micro)", color: "var(--ds-ink-3)", marginTop: 6 }}>
            Rampa de magnitud --ds-sec-0…5 (0 = sin dato)
          </div>
        </Seccion>
      </Superficie></Celda>
      <Celda ancho={12} anchoMd={6}><Superficie>
        <Seccion titulo="Sparkline" nota="Tendencia sin ejes; un hueco corta la línea">
          <Sparkline datos={[12, 14, 13, 17, 16, 19, 22, 21, 24, 27]} formato="compacto" alto={48} />
          <div style={{ height: 16 }} />
          <Sparkline datos={[30, 28, null, 26, 25, 22, 23, 19]} color="var(--ds-serie-2)" alto={48} area={false} />
          <div style={{ marginTop: 10 }}><Pastilla>Datos de ejemplo</Pastilla></div>
        </Seccion>
      </Superficie></Celda>
    </Bento>
  );
}
