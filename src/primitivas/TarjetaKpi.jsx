/**
 * TarjetaKpi — un indicador: qué es, cuánto vale, hacia dónde va.
 *
 * Es la pieza que más se repite en cualquier tablero —ventas del día, costo
 * por litro, días de cartera, entregas a tiempo— y por eso decide de una vez
 * lo que cada pantalla resolvía a su manera:
 *
 *   · la cifra manda (grande, `ds-num`) y la etiqueta va encima, en micro;
 *   · la variación dice si el cambio es bueno según `sentido`, no según la
 *     flecha (ver `Variacion`);
 *   · la tendencia, si se da `serie`, va debajo y sin ejes;
 *   · el estado (`ok`/`aviso`/`riesgo`) lleva SIEMPRE texto: el color solo
 *     no le dice nada a quien no lo distingue;
 *   · sin valor no hay cero: sale «—» y la nota «Sin dato».
 *
 * `compacta` la adelgaza para vivir en tiras o en tarjetas chicas.
 * `onClick` o `href` la vuelven un destino entero (Superficie interactiva);
 * sin destino no se levanta al pasar el cursor, porque no promete nada.
 */
import React from "react";
import Superficie from "./Superficie";
import Esqueleto from "./Esqueleto";
import Variacion from "./Variacion";
import { Pastilla } from "./Pastilla";
import Sparkline from "../graficas/Sparkline";
import { formatear } from "../formato";
import { cabe, CONTENEDOR_CIFRA } from "../ancho";

const ESTADOS = { ok: "Bien", aviso: "Atención", riesgo: "En riesgo" };

const sinValor = (v) => v === null || v === undefined || v === "";

/** El contenido, sin superficie: lo reutiliza `FilaKpis`. */
export function CuerpoKpi({
  etiqueta, valor, formato = "numero", opcionesFormato, variacion, sentido = "sube", contra, enPuntos,
  serie, colorSerie, nota, icono, estado, textoEstado, compacta = false, cargando = false,
}) {
  if (cargando) {
    return (
      <div aria-busy="true" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Esqueleto alto={10} ancho="46%" />
        <Esqueleto alto={compacta ? 24 : 34} ancho="62%" radio={9} />
        <Esqueleto alto={10} ancho="38%" />
        {serie && !compacta && <Esqueleto alto={40} radio={9} />}
      </div>
    );
  }

  const falta = sinValor(valor);
  const texto = falta ? "—" : (typeof valor === "number" || !Number.isNaN(Number(valor))
    ? formatear(valor, formato, opcionesFormato) : valor);

  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, minWidth: 0 }}>
        <div style={{ flex: 1, minWidth: 0, fontSize: "var(--ds-t-micro)", fontWeight: 600,
          letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ds-ink-3)",
          lineHeight: 1.35 }}>
          {etiqueta}
        </div>
        {estado && ESTADOS[estado] && (
          <Pastilla tono={estado}>{textoEstado || ESTADOS[estado]}</Pastilla>
        )}
        {icono && !estado && (
          <span aria-hidden style={{ color: "var(--ds-ink-3)", display: "inline-flex", flexShrink: 0 }}>
            {icono}
          </span>
        )}
      </div>

      <div style={CONTENEDOR_CIFRA}>
        <div className="ds-num" style={{
          fontSize: cabe(compacta ? "var(--ds-num-m)" : "var(--ds-num-l)", texto), fontWeight: 700,
          lineHeight: 1.05, letterSpacing: "-0.035em", marginTop: compacta ? 4 : 6,
          color: falta ? "var(--ds-ink-3)" : "var(--ds-ink)",
          whiteSpace: "nowrap",
        }}>
          {texto}
        </div>
      </div>

      {(variacion !== undefined || contra || nota || falta) && (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 8px",
          marginTop: compacta ? 6 : 8 }}>
          {variacion !== undefined && !falta && (
            <Variacion valor={variacion} sentido={sentido} contra={contra} enPuntos={enPuntos} />
          )}
          {(nota || falta) && (
            <span style={{ fontSize: "var(--ds-t-small)", color: "var(--ds-ink-3)" }}>
              {falta ? (nota || "Sin dato") : nota}
            </span>
          )}
        </div>
      )}

      {serie && !compacta && (
        <div style={{ marginTop: "auto", paddingTop: "var(--ds-4)" }}>
          <Sparkline datos={serie} alto={40} formato={formato} color={colorSerie} />
        </div>
      )}
    </div>
  );
}

export default function TarjetaKpi({
  onClick, href, estilo, entrada, relleno, ...cuerpo
}) {
  const destino = !!(onClick || href);
  const contenido = <CuerpoKpi {...cuerpo} />;
  const relleno_ = relleno ?? (cuerpo.compacta ? "var(--ds-4)" : "var(--ds-5)");

  if (href) {
    return (
      <a href={href} onClick={onClick} style={{ textDecoration: "none", color: "inherit",
        display: "block", height: "100%", borderRadius: "var(--ds-r-card)" }}>
        <Superficie interactiva relleno={relleno_} entrada={entrada}
          estilo={{ height: "100%", ...estilo }}>
          {contenido}
        </Superficie>
      </a>
    );
  }

  return (
    <Superficie interactiva={destino} relleno={relleno_} entrada={entrada}
      role={destino ? "button" : undefined} tabIndex={destino ? 0 : undefined}
      onClick={onClick}
      onKeyDown={destino ? (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(e); }
      } : undefined}
      estilo={{ height: "100%", ...estilo }}>
      {contenido}
    </Superficie>
  );
}
