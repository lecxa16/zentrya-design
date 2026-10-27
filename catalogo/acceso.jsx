/**
 * Demo de PantallaAcceso (`?acceso` en el catálogo; `?acceso&vitrina` con las tarjetas). Las cifras de la vitrina son
 * de EJEMPLO. Cualquier contraseña distinta de «demo» falla, para ver el error.
 */
import React, { useState } from "react";
import {
  BotonApariencia, Boton, Campo, CampoClave, Llamado, PantallaAcceso, Sparkline, TarjetaVitrina,
  correo, requerido, useFormulario,
} from "../src/index.js";

const VITRINA = [
  <TarjetaVitrina key="p" titulo="Patrimonio" cifra="$84,250" detalle="+12.4 % este año" />,
  <TarjetaVitrina key="t" titulo="Tendencia" ancho={300}>
    <div style={{ marginTop: 8 }}><Sparkline datos={[4, 6, 5, 8, 7, 10, 12]} alto={44} color="var(--ds-ink-on-hero)" /></div>
  </TarjetaVitrina>,
  <TarjetaVitrina key="b" titulo="Presupuesto de comida" cifra="68 %" detalle="Te quedan $1,920" />,
];

export default function DemoAcceso() {
  const [error, setError] = useState(null);
  const [esperando, setEsperando] = useState(false);
  const { cuerpo, ...f } = useFormulario({
    email: { etiqueta: "Correo", reglas: [requerido("Escribe tu correo."), correo()] },
    password: { etiqueta: "Contraseña", reglas: [requerido("Escribe tu contraseña.")] },
  });
  const enviar = (v) => {
    setEsperando(true);
    setTimeout(() => {
      setEsperando(false);
      setError(v.password === "demo" ? null : { t: Date.now() });
    }, 700);
  };
  return (
    <PantallaAcceso marca="Zentrya Capital" lema="Tus finanzas, claras: cuentas, gastos e inversiones en un solo lugar."
      vitrina={new URLSearchParams(location.search).has("vitrina") ? VITRINA : null} titulo="Inicia sesión" nota="Usa el correo con el que te registraste." error={error}
      pie={<><a href="./" style={{ color: "var(--ds-accent-tinta)", fontWeight: 700 }}>Volver al catálogo</a> · <BotonApariencia texto="Apariencia" /></>}>
      <form ref={cuerpo} noValidate onSubmit={(e) => { e.preventDefault(); f.intentar(enviar); }}
        style={{ display: "grid", gap: "var(--ds-4)" }}>
        {error && <Llamado tono="riesgo" titulo="No pudiste entrar">El correo o la contraseña no coinciden.</Llamado>}
        <Campo {...f.campo("email")} tipo="email" autoComplete="username" marcador="nombre@empresa.com" />
        <CampoClave {...f.campo("password")} autoComplete="current-password" />
        <Boton variante="solido" type="submit" pleno esperando={esperando}>Entrar</Boton>
      </form>
    </PantallaAcceso>
  );
}
