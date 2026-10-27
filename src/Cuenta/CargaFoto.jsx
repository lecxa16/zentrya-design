/**
 * CargaFoto — la foto de perfil: elegirla o arrastrarla, verla antes de que
 * suba, y quitarla.
 *
 * Antes de entregarla la recorta al centro en un cuadrado de 512 px: el
 * avatar es redondo, y una foto vertical subida tal cual sale con la cabeza
 * cortada. También rechaza lo que no es imagen o pesa más de `maxMb`, con un
 * mensaje que dice qué hacer, antes de gastar una subida.
 *
 * `onElegir(archivo)` recibe un File cuadrado (image/jpeg); subirlo es cosa de
 * la app. Mientras `subiendo`, se ve la vista previa local.
 */
import React, { useEffect, useId, useRef, useState } from "react";
import { Retrato } from "../primitivas/Fila";
import Boton from "../primitivas/Boton";

const LADO = 512;

function recortar(archivo) {
  return new Promise((resolver, rechazar) => {
    const url = URL.createObjectURL(archivo);
    const img = new Image();
    img.onload = () => {
      const lado = Math.min(img.naturalWidth, img.naturalHeight);
      const lienzo = document.createElement("canvas");
      lienzo.width = LADO; lienzo.height = LADO;
      lienzo.getContext("2d").drawImage(img, (img.naturalWidth - lado) / 2, (img.naturalHeight - lado) / 2,
        lado, lado, 0, 0, LADO, LADO);
      URL.revokeObjectURL(url);
      lienzo.toBlob((b) => (b ? resolver(new File([b], "foto.jpg", { type: "image/jpeg" })) : rechazar(new Error("recorte"))),
        "image/jpeg", 0.88);
    };
    img.onerror = () => { URL.revokeObjectURL(url); rechazar(new Error("imagen")); };
    img.src = url;
  });
}

export default function CargaFoto({ nombre, foto, onElegir, onQuitar, subiendo = false, error, maxMb = 5, figura = false }) {
  const id = useId();
  const entrada = useRef(null);
  const [previa, setPrevia] = useState(null);
  const [encima, setEncima] = useState(false);
  const [problema, setProblema] = useState(null);

  useEffect(() => () => { if (previa) URL.revokeObjectURL(previa); }, [previa]);
  useEffect(() => { if (!subiendo) setPrevia(null); }, [subiendo]);

  const tomar = async (archivo) => {
    if (!archivo) return;
    if (!/^image\/(png|jpeg|webp)$/.test(archivo.type)) { setProblema("Elige una imagen JPG, PNG o WebP."); return; }
    if (archivo.size > maxMb * 1024 * 1024) { setProblema(`La imagen pesa más de ${maxMb} MB. Elige una más ligera.`); return; }
    try {
      const cuadrada = await recortar(archivo);
      setProblema(null);
      setPrevia(URL.createObjectURL(cuadrada));
      onElegir?.(cuadrada);
    } catch (e) {
      setProblema("No pudimos leer esa imagen. Prueba con otra.");
    }
  };

  const mensaje = problema || error;
  return (
    <div onDragOver={(e) => { e.preventDefault(); setEncima(true); }} onDragLeave={() => setEncima(false)}
      onDrop={(e) => { e.preventDefault(); setEncima(false); tomar(e.dataTransfer.files?.[0]); }}
      style={{
        display: "flex", alignItems: "center", gap: "var(--ds-4)", flexWrap: "wrap", width: "100%",
        padding: "var(--ds-3)", borderRadius: "var(--ds-r-item)",
        border: `1px dashed ${encima ? "var(--ds-accent-trazo)" : "transparent"}`,
        background: encima ? "var(--ds-accent-soft)" : "transparent",
        transition: "background var(--ds-t-state) var(--ds-ease), border-color var(--ds-t-state) var(--ds-ease)",
      }}>
      <div style={{ opacity: subiendo ? 0.6 : 1, transition: "opacity var(--ds-t-state) var(--ds-ease)" }}>
        <Retrato src={previa || foto} nombre={nombre} tamano={64} figura={figura} />
      </div>
      <div style={{ display: "grid", gap: 6, flex: "1 1 180px" }}>
        <div style={{ display: "flex", gap: "var(--ds-2)", flexWrap: "wrap" }}>
          <input ref={entrada} id={id} type="file" accept="image/png,image/jpeg,image/webp" hidden
            onChange={(e) => { tomar(e.target.files?.[0]); e.target.value = ""; }} />
          <Boton type="button" esperando={subiendo} onClick={() => entrada.current?.click()}>
            {foto ? "Cambiar foto" : "Subir foto"}
          </Boton>
          {foto && onQuitar && <Boton type="button" variante="fantasma" onClick={onQuitar}>Quitar</Boton>}
        </div>
        <div role={mensaje ? "alert" : undefined} style={{ fontSize: "var(--ds-t-small)",
          color: mensaje ? "var(--ds-risk)" : "var(--ds-ink-2)" }}>
          {mensaje || `O arrástrala aquí. JPG, PNG o WebP de hasta ${maxMb} MB; se recorta en cuadrado.`}
        </div>
      </div>
    </div>
  );
}
