/**
 * Demo de PantallaAcceso + EntradaCuenta (`?acceso` en el catálogo). Cualquier
 * contraseña distinta de «demo» falla, para ver el error.
 */
import React, { useState } from "react";
import { BotonApariencia, EntradaCuenta, PantallaAcceso } from "../src/index.js";

export default function DemoAcceso() {
  const [error, setError] = useState(null);
  const [esperando, setEsperando] = useState(false);
  const entrar = ({ clave }) => {
    setEsperando(true);
    setTimeout(() => {
      setEsperando(false);
      setError(clave === "demo" ? null : `El correo o la contraseña no coinciden (${new Date().toLocaleTimeString()}).`);
    }, 700);
  };
  const enlace = { color: "var(--ds-accent-tinta)", fontWeight: 500, textDecoration: "none" };
  return (
    <PantallaAcceso marca="Zentrya Capital" titulo="Inicia sesión"
      nota="Tus finanzas, claras: cuentas, gastos e inversiones en un solo lugar." error={error}
      pie={<><a href="./" style={enlace}>Volver al catálogo</a> · <BotonApariencia texto="Apariencia" /></>}>
      <EntradaCuenta onEntrar={entrar} esperando={esperando} error={error} recordar
        enlaces={<a href="#olvide" style={enlace}>¿Olvidaste tu contraseña? <span aria-hidden>↗</span></a>} />
    </PantallaAcceso>
  );
}
