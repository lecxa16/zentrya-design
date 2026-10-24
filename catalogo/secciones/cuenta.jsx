/**
 * Mi cuenta: la pantalla de perfil y ajustes, con sus cinco secciones.
 * Todos los datos de esta página son de EJEMPLO; guardar sólo simula la espera.
 */
import React, { useEffect, useRef, useState } from "react";
import {
  Boton, Campo, CampoClave, CargaFoto, EstadoGuardado, FilaAjuste, Fila, Interruptor, Pastilla,
  PantallaCuenta, SeccionAjustes, Segmentado, SelectorPaleta, ZonaPeligro, useTema,
} from "../../src/index.js";

export const meta = { id: "cuenta", titulo: "Mi cuenta", orden: 70 };

const SECCIONES = [
  { id: "perfil", texto: "Perfil" },
  { id: "seguridad", texto: "Seguridad" },
  { id: "notificaciones", texto: "Notificaciones" },
  { id: "apariencia", texto: "Apariencia" },
  { id: "peligro", texto: "Zona de peligro", peligro: true },
];
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

/** Lo que se guarda solo: «Guardando…» y luego «Guardado», que se va a los 2 s. */
function useAutoguardado() {
  const [estado, setEstado] = useState(null);
  const t = useRef(null);
  useEffect(() => () => clearTimeout(t.current), []);
  const guardar = async () => {
    setEstado("guardando"); await espera(500); setEstado("guardado");
    clearTimeout(t.current); t.current = setTimeout(() => setEstado(null), 2000);
  };
  return [estado, guardar];
}

function Perfil() {
  const [nombre, setNombre] = useState("Ana López");
  const [foto, setFoto] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [guardando, setGuardando] = useState(false);
  return (
    <SeccionAjustes id="perfil" titulo="Perfil" descripcion="Cómo te ven en la app."
      pie={<Boton variante="solido" esperando={guardando} onClick={async () => { setGuardando(true); await espera(600); setGuardando(false); }}>Guardar cambios</Boton>}>
      <FilaAjuste primera titulo="Foto" descripcion="Se ve en tu avatar y en lo que registras.">
        <CargaFoto nombre={nombre} foto={foto} subiendo={subiendo} onQuitar={() => setFoto(null)}
          onElegir={async (archivo) => { setSubiendo(true); await espera(800); setFoto(URL.createObjectURL(archivo)); setSubiendo(false); }} />
      </FilaAjuste>
      <FilaAjuste titulo="Nombre" descripcion="Tu nombre completo.">
        <Campo etiqueta="Nombre" etiquetaOculta valor={nombre} onCambio={setNombre} estilo={{ width: "100%" }} />
      </FilaAjuste>
      <FilaAjuste titulo="Correo" descripcion="Con él inicias sesión. Cambiarlo pide confirmar el nuevo.">
        <Campo etiqueta="Correo" etiquetaOculta valor="ana@ejemplo.com" deshabilitado estilo={{ width: "100%" }} />
      </FilaAjuste>
    </SeccionAjustes>
  );
}

function Seguridad() {
  const [dosPasos, setDosPasos] = useState(false);
  return (
    <>
      <SeccionAjustes id="contrasena" titulo="Contraseña" descripcion="Usa al menos 12 caracteres."
        pie={<Boton variante="solido">Cambiar contraseña</Boton>}>
        <FilaAjuste primera titulo="Contraseña actual"><CampoClave etiqueta="Contraseña actual" etiquetaOculta estilo={{ width: "100%" }} autoComplete="current-password" /></FilaAjuste>
        <FilaAjuste titulo="Contraseña nueva"><CampoClave etiqueta="Contraseña nueva" etiquetaOculta estilo={{ width: "100%" }} autoComplete="new-password" /></FilaAjuste>
      </SeccionAjustes>
      <SeccionAjustes id="dos-pasos" titulo="Verificación en dos pasos" descripcion="Además de la contraseña, un código de tu teléfono.">
        <FilaAjuste primera titulo={dosPasos ? "Activada" : "Desactivada"}
          descripcion={dosPasos ? "Te pediremos un código al entrar." : "Recomendada: protege tu cuenta aunque alguien sepa tu contraseña."}>
          <Boton variante={dosPasos ? "contorno" : "solido"} onClick={() => setDosPasos((v) => !v)}>
            {dosPasos ? "Desactivar" : "Activar"}
          </Boton>
        </FilaAjuste>
      </SeccionAjustes>
      <SeccionAjustes id="sesiones" titulo="Sesiones abiertas" descripcion="Dónde está abierta tu cuenta ahora."
        pie={<Boton>Cerrar las demás sesiones</Boton>}>
        <Fila titulo="Chrome en macOS" subtitulo="Monterrey · ahora" derecha={<Pastilla tono="ok">Esta sesión</Pastilla>} />
        <Fila titulo="Safari en iPhone" subtitulo="Monterrey · hace 2 horas" />
      </SeccionAjustes>
    </>
  );
}

function Notificaciones() {
  const [estado, guardar] = useAutoguardado();
  const [v, setV] = useState({ pagos: true, resumen: true, novedades: false });
  const cambiar = (k) => (on) => { setV((x) => ({ ...x, [k]: on })); guardar(); };
  return (
    <SeccionAjustes id="notificaciones" titulo="Notificaciones" descripcion="Se guarda en cuanto cambias algo."
      estado={<EstadoGuardado estado={estado} />}>
      <FilaAjuste primera titulo="Pagos por vencer" descripcion="Tres días antes, en la app y por correo.">
        <Interruptor etiqueta="Pagos por vencer" encendido={v.pagos} onCambio={cambiar("pagos")} />
      </FilaAjuste>
      <FilaAjuste titulo="Resumen semanal" descripcion="Los lunes, por correo.">
        <Interruptor etiqueta="Resumen semanal" encendido={v.resumen} onCambio={cambiar("resumen")} />
      </FilaAjuste>
      <FilaAjuste titulo="Novedades del producto" descripcion="Una vez al mes, como máximo.">
        <Interruptor etiqueta="Novedades del producto" encendido={v.novedades} onCambio={cambiar("novedades")} />
      </FilaAjuste>
    </SeccionAjustes>
  );
}

function Apariencia() {
  const { tema, fijar } = useTema();
  return (
    <SeccionAjustes id="apariencia" titulo="Apariencia" descripcion="Se aplica al momento, en este navegador.">
      <FilaAjuste primera titulo="Tema">
        <Segmentado etiqueta="Tema" opciones={[{ valor: "light", texto: "Claro" }, { valor: "dark", texto: "Oscuro" }]}
          valor={tema} onCambio={fijar} />
      </FilaAjuste>
      <FilaAjuste titulo="Paleta de color"><SelectorPaleta estilo={{ width: "100%" }} /></FilaAjuste>
    </SeccionAjustes>
  );
}

function Peligro() {
  const [esperando, setEsperando] = useState(false);
  return (
    <ZonaPeligro titulo="Borrar mi cuenta" boton="Borrar mi cuenta" esperando={esperando}
      descripcion="Se borran tu cuenta y todos tus datos. No se puede deshacer."
      consecuencias="Perderás tus cuentas, movimientos e inversiones registrados. Si solo quieres un descanso, mejor cierra sesión."
      onConfirmar={async () => { setEsperando(true); await espera(900); setEsperando(false); }} />
  );
}

const VISTAS = { perfil: Perfil, seguridad: Seguridad, notificaciones: Notificaciones, apariencia: Apariencia, peligro: Peligro };

export default function Cuenta() {
  const [activa, setActiva] = useState("perfil");
  const Vista = VISTAS[activa];
  return (
    <PantallaCuenta usuario={{ nombre: "Ana López", correo: "ana@ejemplo.com", detalle: "Administradora · desde octubre de 2026" }}
      secciones={SECCIONES} activa={activa} onIr={(s) => setActiva(s.id)}>
      <Vista />
    </PantallaCuenta>
  );
}
