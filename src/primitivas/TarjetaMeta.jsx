/**
 * TarjetaMeta — cuánto llevas contra lo que te pusiste de meta, y a dónde
 * llegas si sigues así.
 *
 * «Llevamos 62 %» a mitad de mes no dice si vamos bien. Lo que se decide es
 * la proyección: al ritmo de los días transcurridos, ¿se cierra arriba o
 * abajo de la meta? Por eso, si se dan `diaActual` y `diasPeriodo`, la
 * tarjeta escribe la frase completa y su tono sale de esa proyección, no del
 * avance de hoy.
 *
 *   ≥ 100 % proyectado  → ok
 *   ≥ 90 %              → aviso
 *   menos               → riesgo
 *
 * `invertida` es para metas de tope (gasto, mermas, horas extra): ahí pasarse
 * es lo malo.
 *
 * `forma="anillo"` cuando el avance ES lo que se vino a ver; `"barra"` (por
 * omisión) cuando acompaña a la cifra.
 */
import React from "react";
import Superficie from "./Superficie";
import Medidor from "./Medidor";
import Anillo from "./Anillo";
import Esqueleto from "./Esqueleto";
import { Pastilla } from "./Pastilla";
import { formatear, porcentaje } from "../formato";

const TEXTO_TONO = { ok: "Va a la meta", aviso: "Cerca de la meta", riesgo: "Debajo de la meta" };
const TEXTO_TONO_TOPE = { ok: "Dentro del tope", aviso: "Cerca del tope", riesgo: "Rebasa el tope" };

export default function TarjetaMeta({
  titulo, logrado, meta, formato = "numero", opcionesFormato, diaActual, diasPeriodo,
  invertida = false, forma = "barra", nota, cargando = false, estilo, entrada,
}) {
  const f = (v) => formatear(v, formato, opcionesFormato);
  const hayDatos = Number.isFinite(Number(logrado)) && Number(meta) > 0;
  const avance = hayDatos ? Number(logrado) / Number(meta) : null;
  const conRitmo = hayDatos && Number(diaActual) > 0 && Number(diasPeriodo) > 0;
  const proyectado = conRitmo ? (Number(logrado) / Number(diaActual)) * Number(diasPeriodo) : null;
  const base = conRitmo ? proyectado / Number(meta) : avance;

  let tono = "acento";
  if (base !== null) {
    if (invertida) tono = base <= 0.9 ? "ok" : base <= 1 ? "aviso" : "riesgo";
    else tono = base >= 1 ? "ok" : base >= 0.9 ? "aviso" : "riesgo";
  }
  const textos = invertida ? TEXTO_TONO_TOPE : TEXTO_TONO;
  const color = { ok: "var(--ds-ok)", aviso: "var(--ds-warn)", riesgo: "var(--ds-risk)",
    acento: "var(--ds-accent-trazo)" }[tono];

  return (
    <Superficie entrada={entrada} estilo={{ height: "100%", ...estilo }}>
      {cargando ? (
        <div aria-busy="true" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Esqueleto alto={10} ancho="50%" /><Esqueleto alto={34} ancho="60%" radio={9} />
          <Esqueleto alto={8} radio={99} /><Esqueleto alto={10} ancho="70%" />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--ds-3)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0, fontSize: "var(--ds-t-micro)", fontWeight: 600,
              letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ds-ink-3)" }}>
              {titulo}
            </div>
            {base !== null && <Pastilla tono={tono}>{textos[tono]}</Pastilla>}
          </div>

          {!hayDatos ? (
            <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }}>
              {Number(meta) > 0 ? "Sin dato de avance." : "Sin meta capturada para este periodo."}
            </div>
          ) : forma === "anillo" ? (
            <div style={{ display: "flex", alignItems: "center", gap: "var(--ds-5)", flexWrap: "wrap" }}>
              <Anillo valor={Math.min(100, avance * 100)} tamano={112} grosor={9} tono={color}>
                <span className="ds-num" style={{ fontSize: "var(--ds-num-m)", fontWeight: 700,
                  letterSpacing: "-0.03em" }}>{porcentaje(avance, { decimales: 0 })}</span>
              </Anillo>
              <div style={{ minWidth: 0 }}>
                <div className="ds-num" style={{ fontSize: "var(--ds-num-m)", fontWeight: 700,
                  letterSpacing: "-0.03em" }}>{f(logrado)}</div>
                <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }}>
                  de <span className="ds-num" style={{ fontWeight: 600, color: "var(--ds-ink-2)" }}>{f(meta)}</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                <span className="ds-num" style={{ fontSize: "var(--ds-num-l)", fontWeight: 700,
                  letterSpacing: "-0.035em", lineHeight: 1.05 }}>{f(logrado)}</span>
                <span style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }}>
                  de <span className="ds-num" style={{ fontWeight: 600, color: "var(--ds-ink-2)" }}>{f(meta)}</span>
                </span>
              </div>
              <Medidor valor={Number(logrado)} total={Number(meta)} tono={tono}
                alto={8} etiqueta={`${titulo}: ${porcentaje(avance)} de la meta`} />
              <div className="ds-num" style={{ fontSize: "var(--ds-t-small)", fontWeight: 600,
                color: "var(--ds-ink-2)" }}>
                {porcentaje(avance)} de la meta
              </div>
            </>
          )}

          {conRitmo && (
            <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-2)", lineHeight: 1.45 }}>
              Al ritmo actual cierras en{" "}
              <strong className="ds-num" style={{ color: "var(--ds-ink)" }}>{f(proyectado)}</strong>{" "}
              (<span className="ds-num">{porcentaje(proyectado / Number(meta))}</span> {invertida ? "del tope" : "de la meta"}).
              <span style={{ color: "var(--ds-ink-3)" }}> Día {diaActual} de {diasPeriodo}.</span>
            </div>
          )}
          {nota && <div style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }}>{nota}</div>}
        </div>
      )}
    </Superficie>
  );
}
