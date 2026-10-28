# Sistema de diseño

Lenguaje visual compartido, empaquetado como `@zentrya/design` para cualquier proyecto de
React. La letra es la del sistema (SF en Apple, desde v2.9) y los estilos se cargan solos al importar.

```jsx
import { ProveedorTema, Bento, Celda, Heroe, Superficie, Cifra, Boton } from "@zentrya/design";

<ProveedorTema>
  <Bento>
    <Celda ancho={12} anchoMd={7}><Heroe>…</Heroe></Celda>
    <Celda ancho={12} anchoMd={5}><Superficie><Cifra valor={68} etiqueta="Personas" /></Superficie></Celda>
  </Bento>
</ProveedorTema>
```

Pantalla de referencia construida al 100% con el sistema: `/zentrya/rh`.

📐 **Para agregar algo nuevo, lee [`GUIA.md`](GUIA.md) primero.** Este archivo dice qué
existe; la guía dice qué hacer, con las trampas que ya se pagaron y la lista de lo que hay
que comprobar antes de dar algo por terminado.

## A la manera de Apple (v2.9)

Carlos (2026-10-27), tras el login tipo Apple: «haz todas» las mejoras basadas en sus apps.

- **Letra y escala.** `--ds-font` es la del sistema (SF en Mac y iPhone, Segoe en Windows, Roboto en Android); Manrope
  se fue (40 KB menos). Escala de la HIG: `--ds-t-display` 34 · `--ds-t-title` 22 · `--ds-t-body` 15 · `--ds-t-small` 13
  · `--ds-t-micro` 12. Los pesos bajaron un escalón en todo el sistema (SF a 800 es «Heavy»): títulos 700, énfasis 600.
- **Campos.** Etiqueta en letra normal y peso medio (ya no en mayúsculas chicas), caja de 44 px (el mínimo táctil),
  radio 10, borde `line-firm`, texto regular y halo de foco de 4 px. Los de MUI (`/mui`) miden igual.
- **Mi cuenta como la cuenta de Apple.** Sin portada (Carlos: «es carga de diseño y no tiene funcionalidad»): la
  identidad —foto o figura, nombre, correo— arriba de la barra lateral, las secciones con iconos de un solo color y la
  elegida sobre gris suave; el contenido abre con el nombre de la sección como título grande. `SeccionAjustes` es un
  grupo redondeado con el título arriba y la explicación abajo; `FilaAjuste` acepta `icono` (gris, `IconoAjuste`;
  `color` para teñirlo), `valor` y `onClick` (el renglón entero es un botón con ›). Sin cuadritos de color: no
  combinaban con el resto.
- **Barras.** El teléfono y el dock usan `--ds-material` (la superficie al 82 % + desenfoque): translúcidas de verdad.
  En oscuro, la barra de arriba del escritorio pasó del 5 % al 74 % (bajaba de 4.5:1 con contenido debajo).
  **Título grande:** en el teléfono, el `h1` de `EncabezadoPagina` mide 34 px y, al salirse por arriba, aparece compacto
  y centrado en la barra (la marca le cede el lugar). Sólo dentro del `Armazon`.
- **Hoja y menús.** La hoja del teléfono (`Modal`) se cierra arrastrándola hacia abajo desde la barrita o el título.
  Los menús (`Flotante`, `MenuUsuario`) resaltan la opción en acento como macOS (`.ds-menu-opcion`).
- **Controles.** `Interruptor` 51 × 31 con perilla que se estira al presionar; `Segmentado` en rectángulo redondeado
  (no cápsula) con la elegida en blanco que se encoge al presionar.
- **Vacío y carga.** `EstadoVacio` como `ContentUnavailableView`: icono grande sin recuadro y sin borde punteado. El
  `Esqueleto` respira (pulso) en vez de barrer.
- **`GraficaDestacada`** (nueva), como Salud o Bolsa: periodo arriba, la cifra grande y su fecha, y la línea; al
  recorrerla (ratón, dedo o flechas) la cifra enseña ese punto. `GraficaLinea` ya responde al dedo y gana
  `onActivo` y `globo={false}`.

## Los tres modos de navegación

`Armazon` es el esqueleto de la aplicación y viene en tres formas. **El modo es una
preferencia de quien usa la app, no una decisión de cada pantalla**: se guarda igual que el
tema y todas lo respetan. Una pantalla escribe su contenido una sola vez y sirve para los
tres.

| Modo | Forma | Cuándo |
|---|---|---|
| `topbar` | barra de píldoras arriba, contenido a todo lo ancho | tableros y pantallas de lectura |
| `sidebar` | riel a la izquierda, contenido a la derecha | secciones profundas; se contrae a iconos |
| `dock` | barra flotante abajo, estilo escritorio | pantallas donde el contenido manda |

El `dock` acepta además un **lanzador** (`PanelInicio`) que se abre desde el botón de la
izquierda, como el menú de inicio de un escritorio: quién eres arriba, lo reciente a la
izquierda, los destinos en mosaicos a la derecha y un buscador abajo que atraviesa las tres
cosas. Escribir sustituye las columnas por resultados — quien ya sabe a dónde va teclea,
quien no, mira. `Escape` y un clic fuera lo cierran, y el foco entra al buscador al abrir.

```jsx
<Armazon marca={…} secciones={…} activa="tablero" onIr={…} derecha={<SelectorArmazon />}>
  {contenido}
</Armazon>
```

`modo="…"` fija uno y desactiva la preferencia, para una pantalla que sólo tenga sentido de
una forma.

### En el teléfono, un solo chasis (v1.4)

Debajo de 760 px los tres modos se vuelven **uno**: cabecera compacta de borde a borde (la
marca abre el lanzador) y **pestañas abajo**, al alcance del pulgar — hasta cinco; con más,
cuatro y «Más», que abre una hoja con el resto. La preferencia no se borra: vuelve en cuanto
hay ancho. `SelectorArmazon` desaparece, porque ahí no hay nada que elegir. (Hasta la v1.3
cada modo se comprimía por su cuenta; en la práctica eran tres formas de quitarle sitio al
contenido. Decisión de Carlos, 2026-10-21.)

`useArmazon()` devuelve `modo: "dock"` en el teléfono —la barra de abajo mide `ALTO_DOCK`,
igual que el dock—, así que lo que ya sube sus piezas flotantes cuando `modo === "dock"`
sigue funcionando. Para distinguirlo está `movil`; la elección guardada, en `preferencia`.

### Ningún modo depende de cuántas secciones haya (v1.4)

Con once secciones (Nykza) el riel lateral escondía sus controles de abajo y el dock se
cortaba: la franja del centro se deslizaba de lado —nadie desliza de lado con un trackpad— y
los botones de la derecha, apretados, bajaban a una segunda fila fuera de la barra.

- **Riel lateral**: tres pisos. Marca arriba y controles abajo quedan fijos; sólo la lista de
  en medio se desliza. Con poca altura (≤ 760 px) los renglones se aprietan.
- **Dock**: se acomoda en escalones — icono y nombre → sólo icono → sólo icono y «Más». El
  escalón se CALCULA con una fila de medida invisible; los lados nunca se encogen por debajo
  de lo que traen, quien cede es el centro.

Para probarlo sin construir un producto grande: `?secciones=16` en el catálogo.

### Pendientes en una sección (v1.4)

`{ id, texto, icono, insignia: 3 }` dibuja un contador en los cuatro chasis (en «Más», la
suma de lo que quedó dentro). Es un estado —algo espera—, por eso va en el tono de riesgo.

### Lo que ocupa el chasis (v1.4)

Cada modo publica su sitio en `--ds-reserva-arriba` y `--ds-reserva-abajo` (en el elemento
raíz). Una pantalla que tiene que llenar exactamente lo que queda —un chat, con la caja de
escribir pegada abajo— se mide con eso, en cualquier modo:

```jsx
<div style={{ height: "calc(100dvh - var(--ds-reserva-arriba) - var(--ds-reserva-abajo))" }}>
```

### Avatar genérico (v1.4)

`<Retrato generico />` (y `<GrupoRetratos generico />`): sin foto, o si la foto no carga,
dibuja la silueta de una persona en lugar de las iniciales. Opcional: quien no lo pide sigue
viendo iniciales.

### Avatar con figura (v2.6)

`<Retrato figura />` (y `figura` en `GrupoRetratos`, `MenuUsuario`, `PantallaCuenta` y `CargaFoto`):
sin foto, o si la foto no carga, dibuja la figura que sale del nombre con
[blobatar](https://blobatar.dev): la misma persona es la misma figura en todas partes, sin
guardar nada ni pedir nada a la red (va empaquetado; el proyecto no instala nada). Los ojos
cumplen 4.5:1 contra el cuerpo en todos los tonos. Sin nombre, iniciales. Si viene con
`generico`, gana la figura. Opcional: quien no lo pide sigue viendo iniciales. Sale de `nombre`
(sin distinguir mayúsculas): si la persona cambia su nombre, cambia su figura.

### Figura animada (v2.10)

`<Retrato figura animada="hover" />` (también en `GrupoRetratos`): la figura respira, flota,
parpadea y mira de reojo, con tiempos que salen del nombre. `"hover"` anima sólo la que tiene
el puntero encima —la indicada en listas— y `"siempre"` es para un retrato solo (la cuenta, el
dueño de algo). Con movimiento reducido se queda quieta y en táctil no se dispara. Sin
`animada` la figura sigue siendo la imagen fija de la v2.6: quien no lo pide no cambia.

### Modal en el teléfono (v1.4)

En angosto `Modal` sube como **hoja desde abajo**, a todo lo ancho y con su asa. Los campos
pasan a 16 px: Safari de iPhone hace zoom a la página al enfocar uno más chico, y no regresa.

---

## Las cinco reglas que lo sostienen

1. **Un héroe por pantalla.** El gradiente pertenece a la pieza protagonista y sólo a ella.
   Si aparece dos veces deja de señalar qué importa y pasa a ser decoración.
2. **El vidrio existe únicamente sobre el héroe.** `Vidrio` necesita algo que difuminar;
   sobre blanco se ve como un rectángulo gris sucio.
3. **El color significa estado, nunca adorna.** Un tono en una `Pastilla`, una `Cifra` o una
   barra dice algo (correcto, atención, riesgo). Para categorías sin estado está `neutro`.
   **La única excepción es `Azulejo`**, y es deliberada: un lanzador es un mapa, no una
   lectura de datos, y ahí el color es la identidad del destino —igual que el icono de una
   app en un escritorio—. Fuera del lanzador la regla no se dobla.
4. **La cifra manda.** Cada dato se lee primero como número y después como etiqueta. Todo
   número lleva `className="ds-num"` para alinearse en columna.
5. **Todo sale de los tokens.** Ningún color, radio, sombra, duración o curva se escribe a
   mano en una pantalla. Si algo falta, se agrega al sistema — no se improvisa en el sitio.

## Validación: el botón no se apaga

Regla de Carlos (2026-09-26): **un botón gris no explica nada.** Quien captura se queda
mirándolo sin saber si el sistema se trabó o si le falta algo. Aquí el botón siempre se
puede pulsar; al pulsarlo con algo incompleto pasan tres cosas a la vez:

1. cada campo que no cumple se marca y **dice su regla debajo** —el patrón `error` +
   `helperText` de Material UI, con las piezas del sistema—;
2. arriba aparece el resumen: «Faltan 2 datos: Asunto y Categoría»;
3. el foco se va al primer campo con problema, y la pantalla lo trae a la vista.

```jsx
const f = useFormulario({
  titulo: { etiqueta: "Asunto", reglas: [requerido("Sin asunto no se distingue de los demás."), maximo(200)] },
  imei:   { etiqueta: "IMEI", ayuda: "De 14 a 16 dígitos. En el celular se marca *#06#.",
            reglas: [digitos(14, 16)] },
});

<Formulario problemas={f.problemas} refCuerpo={f.cuerpo}
  accion={<Boton variante="solido" onClick={() => f.intentar(guardar)}>Crear</Boton>}>
  <Campo {...f.campo("titulo")} marcador="…" />
  <Campo {...f.campo("imei")} />
</Formulario>
```

La etiqueta, la ayuda y las reglas se declaran **juntas**: separarlas es la forma más fácil
de que la etiqueta diga una cosa y la regla exija otra. El asterisco de obligatorio no se
pone a mano — se le pregunta a la regla.

Reglas incluidas: `requerido`, `maximo`, `minimo`, `numero({desde, hasta})`, `digitos`,
`soloDigitos`, `correo`, `patron`, `condicion`. Una regla es cualquier función
`(valor, valores) => mensaje | null`, así que una que dependa de otro campo se escribe en
línea. Salvo `requerido`, **todas ignoran el vacío**: un campo opcional en blanco no tiene
nada que reclamar.

⚠️ **`digitos` y `soloDigitos` no son lo mismo, y confundirlos hace mentir al formulario.**
`digitos(14, 16)` limpia los separadores antes de contar, así que «81-1234-5678» le parece
bien: sirve para un IMEI, donde lo que importa es cuántos dígitos hay. `soloDigitos(10)`
exige exactamente diez y **nada más** — ni espacios, ni guiones, ni paréntesis. Cuando el
servidor guarda el dato crudo y lo compara entre registros (un teléfono, un NSS, una
CLABE), la regla del formulario tiene que ser la del servidor: si no, la pantalla acepta lo
que el servidor va a rechazar, y quien captura se entera después del viaje.

**El error aparece al SALIR del campo, o al intentar guardar — nunca mientras se escribe.**
Marcar en rojo un teléfono de diez dígitos durante las nueve primeras pulsaciones no
corrige a nadie, sólo regaña. Ya marcado, sí se actualiza en vivo: quien está corrigiendo
quiere ver cuándo quedó bien.

Eso lo resuelve `onSalir`, que `f.campo(nombre)` incluye junto a `valor` y `onCambio`. En
un campo de texto se dispara al perder el foco; en un **selector o una fecha, al elegir** —
ahí no hay un «después» en el que juzgar, elegir ES terminar. Un componente propio que
reciba `{...f.campo(x)}` tiene que **desestructurar `onSalir`**: si lo deja caer en el
`...resto` de un elemento del DOM, React se queja de un atributo desconocido.

**Lo único que sí se deshabilita** es lo que quien captura no puede arreglar escribiendo:
un permiso que no tiene, o una acción en vuelo (`esperando`). Y aun ahí, el porqué está
escrito en la pantalla, no escondido en un tooltip.

## Filtros que se quedan puestos

Una lista con filtros puestos es trabajo: alguien eligió empresa, área y estatus para
encontrar a diez personas entre trescientas. Si al abrir una de esas diez y volver la lista
aparece en blanco, ese trabajo se tira — y se rehace cada vez, todo el día.

```jsx
const [f, ponerF, limpiarF, hayFiltro] = useFiltros("rh-empleados", {
  empresa: "", area: "", estatus: "Activo",
});
<Selector valor={f.area} onCambio={(v) => ponerF("area", v)} />
{hayFiltro && <Boton variante="fantasma" onClick={limpiarF}>Limpiar filtros</Boton>}
```

Guarda en **`sessionStorage`**, y las dos alternativas se descartaron por algo concreto:

- La **URL** obligaría a que cada camino de regreso —la miga de pan, el botón «Volver», el
  atrás del navegador, un enlace desde otra pantalla— cargara los filtros consigo. El que
  lo olvidara volvería a vaciar la lista, y el olvido sería invisible hasta la queja.
- **`localStorage`** los dejaría puestos mañana y tras cerrar el navegador. Un filtro
  olvidado que esconde media plantilla es peor que no tener filtros: nadie sospecha de lo
  que no ve.

`limpiar` devuelve a los valores por omisión **declarados**, no a vacío: si la lista nace
enseñando sólo a los activos, limpiar la deja así otra vez. El botón sólo se pinta cuando
hay algo que limpiar, y cuando hay filtros puestos **la pantalla lo dice** — para que nadie
concluya que falta gente.

## Cuando lo angosto pide otra forma, no otro estilo

`useAngosto(px)` es para lo que el CSS no puede decidir. Achicar la letra de una cuadrícula
de mes no la arregla: siete columnas en un teléfono dan celdas de 38px, y un nombre en 38px
no es un nombre. Ahí no se cambia el estilo, se cambia el **árbol**: la misma información
como lista por día. Eso se decide en React.

Todo lo que sí pueda resolver una media query en CSS, que la resuelva ahí — este hook
re-renderiza, el CSS no.

Y la versión angosta **no es la versión pobre**: para «¿quién falta el jueves?» una lista
contesta antes que una cuadrícula.

## El cambio de vista

Lo pone el armazón: se le pasa `vista` (la ruta) y él anima la entrada del contenido —con
las migas— y lleva la pantalla nueva al principio. Ninguna pantalla tiene que acordarse.

**La dirección cuenta a dónde fuiste**, no decora: más escalones en la ruta = entra desde la
derecha; menos —un «volver»— desde la izquierda; los mismos, dos secciones hermanas, sube.
Dura `--ds-t-vista` (320 ms): más largo estorba, porque se cruza con el clic siguiente.

Dentro de una pantalla, `Transicion` sirve igual para un panel de pestañas con `eje="y"`
(entre pestañas no hay profundidad) y su propio `ambito`, para que las dos memorias —la de
la ruta y la del panel— no se pisen.

Sólo hay animación de **entrada**. Cruzar dos vistas exige mantener viva la anterior, y eso
duplica consultas y foco por un efecto: lo que entra se anuncia, lo que se fue ya se fue.
Con `prefers-reduced-motion` no anima nada: aparece.

## El lienzo no es blanco

`--ds-canvas` es un blanco con temperatura menta en claro y un casi negro neutro en
oscuro. El teal no es el color del suelo: vive en el **acento** y en la floración. Esa temperatura es lo que hace que las tarjetas **floten** en
vez de fundirse con la página. Un fondo blanco o gris neutro rompe el sistema entero.

Los dos temas son el mismo mundo: **una sola floración teal arriba a la derecha** y acento
teal. Una floración concentrada da profundidad; tres repartidas dan discoteca. Lo único
que cambia entre temas es la oscuridad del acento —`#0B7D75` en claro, `#3FD3C7` en
oscuro— porque un teal que se lee sobre negro no se lee sobre blanco.

El gradiente de marca (`--ds-hero`) es **idéntico en los dos temas**: una marca que cambia
de tono al cambiar de tema deja de ser una marca.

### Contraste

Los cuatro niveles de tinta pasan AA (≥4.5:1) sobre tarjeta, **en los dos temas**. Medido,
no estimado. `--ds-ink-3` es texto —etiquetas y notas—, no decoración: si al repintar un
tema queda por debajo, es un defecto, no una elección estética.

| | claro | oscuro |
|---|---|---|
| `--ds-ink` | 18.9 | 14.7 |
| `--ds-ink-2` | 8.1 | 7.7 |
| `--ds-ink-3` | 4.6 | 5.8 |
| `--ds-accent` | 5.0 | 9.8 |

**Texto sobre color (v1.4.1).** Además de las tintas, todo par que se lee como texto pasa AA en las tres marcas y
los dos temas: tinta sobre acento (botón sólido), cada estado sobre su `-soft` (`Pastilla`, `Calendario`, el resumen
del `Formulario`) y `--ds-accent-tinta` sobre `--ds-accent-soft`. **La comprobación es mecánica: `npm run contraste`**
antes de publicar una versión; falla si un par baja de 4.5:1.

En la v1.4.0 no se cumplía y una captura no lo enseñaba: en oscuro `--ds-ink-on-accent` no existía y el botón sólido
quedaba blanco sobre teal claro (1.85:1); en claro los estados daban 2.83 (aviso), 3.57 (ok) y 4.10 (riesgo). Se
oscurecieron lo justo, sin cambiar de tono:

| Token (claro) | v1.4.0 | v1.4.1 |
|---|---|---|
| `--ds-ok` | `#3E8E2B` | `#357A25` |
| `--ds-warn` | `#D97706` | `#A25904` |
| `--ds-risk` | `#DC2626` | `#CD2121` |
| `--ds-accent-tinta` | `#0B7D75` | `#0A746C` |
| `--ds-ink-on-accent` (oscuro) | — (heredaba `#FFFFFF`) | `#04302C` |

**Un blanco al 90 % no deja pasar el lienzo.** `--ds-panel` y `--ds-frame` llevan la
temperatura escrita en el color; las superficies muy translúcidas no la necesitan porque
el lienzo se cuela solo. Si un panel se ve frío sobre una página con color, es esto.

## Fotografía

`Lamina` es la pieza que lleva imagen: la foto arriba con un velo de degradado que garantiza
que el texto se lea sobre cualquier foto —clara u oscura—, y el contenido encima o en el pie.
Acepta `imagen` + `imagenChica` (dos anchos, con `sizes`), `encuadre` (`object-position`) y
`alt`; carga diferida por omisión. **Sin imagen no finge una**: cae al gradiente del sistema.

Con `fondo`, la foto deja de ser una banda y **es la tarjeta entera**: velo sobre todo —más
denso abajo, donde vive el texto— y el contenido dentro de `.ds-sobre-foto`. Bajo un velo
denso los colores se apagan, así que la imagen se satura por debajo: la escena se reconoce
sin aclarar el velo, que es lo que sostiene la lectura.

### Fotografía en el héroe

Con `soloFoto`, el héroe **deja el gradiente** y es la fotografía: dos velos —uno vertical y
uno lateral, porque el contenido se alinea a la izquierda y ahí es donde hace falta el
apoyo— sostienen el texto blanco sin oscurecer la imagen entera. Si la foto no carga, vuelve
al gradiente: la pieza protagonista de una pantalla no puede quedarse en un rectángulo negro.

Sin `soloFoto`, `Heroe` acepta `imagen` y la coloca en modo `luminosity`: toma su luz y el color lo sigue
poniendo el gradiente. El héroe gana materia sin dejar de ser la pieza de marca, y el texto
blanco encima nunca se pelea con una zona clara de la foto. `intensidad` (0.26 por omisión)
regula cuánto se ve. Ojo con el encuadre: en una tarjeta alta y angosta, `cover` amplía una
foto apaisada y un rostro se vuelve enorme — `encuadre` es lo que lo resuelve.

## Volver y ruta

`Migas` da las dos cosas a la vez, porque son la misma: el «volver» es el escalón anterior
de la ruta.

**El volver apunta al PADRE en la jerarquía, no a `history.back()`.** Parece menos listo y
es mejor: quien llegó por un enlace directo, desde un buscador o desde otro producto
termina fuera de la aplicación si el volver es el historial. El padre siempre existe y
siempre es el mismo, así que el destino es predecible — y por eso se puede **nombrar**:
«Volver al padrón» dice a dónde va; una flecha sola, no.

Debajo de 760 px la ruta completa no cabe, y apretarla no la hace legible: se queda sólo el
volver. **La ruta informa; el volver resuelve.**

**Desde la v2.3 la ruta se arma sola.** Con `migas` como LISTA, el armazón pone el tronco
—sección › subsección, sacado de `secciones` y `activa`— y la pantalla sólo agrega sus
escalones extra (`migas={[{ texto: "Nueva tarea" }]}`; `[]` si no tiene). Un padre sin página
propia se nombra pero no se enlaza. En el teléfono el volver se muda a la **cabecera**, arriba a
la izquierda («‹ Estructura»), donde lo busca el pulgar, y el contenido ya no lo repite. Pasar
`migas` como elemento (`<Migas ruta={…} />`, como antes) sigue funcionando.

El armazón la coloca en los tres modos, así que ninguna pantalla puede olvidarse de decir
dónde está. Una pantalla profunda aporta sólo sus escalones extra —nunca el tronco— para
que no haya dos sitios donde escribir mal la misma jerarquía.

### `.ds-sobre-foto`

No existe una variante «clara» de cada pieza. En ese subárbol se **redefinen los tokens** de
tinta y superficie, y cualquier componente del sistema —`Fila`, `Pastilla`, `Insignia`,
`Boton`— se lee correctamente sin enterarse de que está encima de una imagen. Es la misma
mecánica del tema, aplicada a un trozo de pantalla. Los colores de estado (`ok`, `aviso`,
`riesgo`) **no** se tocan: siguen significando lo mismo ahí dentro.

Dónde va y dónde no, en un producto que administra personas reales:

| Sí | No |
|---|---|
| Portada de una sección | Foto de perfil de alguien |
| Estado vacío | Retrato en una fila con nombre |
| Ambiente de una pantalla «blanda» | Cualquier sitio donde se lea como una persona del padrón |

Una foto de archivo junto a un nombre real es el mismo error que un dato inventado en el
expediente, en imagen. La foto de una persona sale de su registro o no sale.

## Identidad legible en los dos temas

Un color de marca no sobrevive el cambio de tema: el índigo de un producto, sobre fondo de
medianoche, deja de leerse. Por eso el texto teñido nunca usa el color crudo sino
`color-mix(in oklab, <color>, var(--ds-mezcla-tono))` — en claro la mezcla es nula y el
color queda tal cual; en oscuro lo aclara un 46%. El fondo sí usa el color crudo, porque
ahí el contraste no está en juego.

## Marcas (v1.2)

El mismo sistema puede vestir a otro producto. `<ProveedorTema marca="nykza">` pone
`data-ds-marca` en el elemento raíz y `marcas.css` redefine **sólo** los tokens de
identidad: lienzo, tinta, acento y héroe. Estados, series, radios, espacios y movimiento no
cambian. Claro y oscuro siguen existiendo dentro de cada marca. Sin `marca` se ve Zentrya.
En el catálogo se recorren con el selector de paleta de la barra (ver «Paletas»).

| Marca | Producto | Acento claro / oscuro |
|---|---|---|
| `nykza` (v1.2) | Nykza | negro / blanco |
| `workos` (v1.4) | Zentrya Work OS | violeta `#6D3FD9` / `#B79CFF` |

Una marca clara obligó a separar los **tres oficios del acento**, que con un teal oscuro
cabían en un solo color:

| Token | Oficio | Mínimo |
|---|---|---|
| `--ds-accent` | relleno: botón sólido, selección, día de hoy; encima va `--ds-ink-on-accent` | texto encima ≥ 4.5 |
| `--ds-accent-tinta` | texto teñido: navegación activa, pastillas, chips, cifras de acento | ≥ 4.5 sobre lienzo |
| `--ds-accent-trazo` | líneas, bordes, barras, anillos, interruptores, foco | ≥ 3 sobre lienzo |

En Zentrya y en Nykza (blanco y negro) los tres valen lo mismo. **Un componente nuevo elige el oficio**,
nunca `--ds-accent` para un texto: una marca de acento claro lo volvería ilegible.

El héroe también tiene su propia tinta (`--ds-ink-on-hero`) y su velo (`--ds-velo`,
`--ds-velo-fuerte`, para `Vidrio` y `Boton claro`). `Heroe` pone la clase `.ds-heroe`, para que una marca de héroe claro pueda
redefinir ahí la tinta y las superficies (como `.ds-sobre-foto` con una foto).

## Tabla sin franja (v1.4.2)

El encabezado de `Tabla` ya no lleva fondo propio: toma el de la tarjeta. Hasta la v1.4.1 usaba `--ds-surface-solid`
para quedarse pegado al hacer scroll, pero el contenedor con scroll horizontal (que el teléfono necesita) impide que
un `sticky` se pegue: nunca funcionó, y sobre una `Superficie` translúcida se veía como una franja de otro tono, sobre
todo en oscuro (reportado por Carlos en Traceon, 2026-10-22).

## Mapas de calor accesibles (v1.4.3)

`MapaCalor` es una cuadrícula ARIA completa: filas (`display: contents`, no cambian el dibujo), encabezados de fila y
columna, y cada celda dice «fila · columna: valor». El foco se queda en la cuadrícula y la celda activa se anuncia con
`aria-activedescendant`. Hasta la v1.4.2 eran `gridcell` sueltas dentro de un `grid` sin filas: axe lo marcaba
(`aria-required-children`/`aria-required-parent`) y un lector de pantalla no podía leerlas (Traceon, 2026-10-22).
`CalendarioCalor` es un dibujo SVG, no una tabla: pasa a `role="group"` con un aviso (`aria-live`) del día activo; los
datos completos siguen en la vista de tabla del marco.

## Subniveles de navegación (v2.1)

Una sección puede traer `hijos` (mismo formato; **dos niveles como máximo**: un tercero son `Pestanas` dentro
de la pantalla). `activa` puede ser el id de un hijo y entonces el padre también se marca. La insignia del padre
es la suya más la de sus hijos. Decidido con Carlos (2026-10-23):

| Chasis | Cómo se abren los hijos |
|---|---|
| Arriba | desplegable bajo la píldora (no una segunda barra: no le quita alto a cada pantalla) |
| Lateral | acordeón en su sitio, abierto de entrada si la página actual está dentro; con el riel contraído, menú flotante al lado |
| Dock | panel hacia arriba |
| Teléfono | la pestaña abre una hoja con sus hijos; «Más» los muestra sangrados bajo su grupo |

**El padre tiene página propia sólo si trae `ruta` (o `navegable: true`)**: su texto navega y la flechita abre a
los hijos (en los menús aparece primero como «Resumen»). Sin ella, cualquier clic abre. `onIr` recibe al hijo
tal como vino: la app navega con su `ruta` (`onIr={(s) => ir(s.ruta)}`).

```jsx
const SECCIONES = [
  { id: "inicio", texto: "Inicio", icono: <IconoInicio />, ruta: "/" },
  { id: "inversiones", texto: "Inversiones", icono: <IconoInversiones />, ruta: "/inversiones", hijos: [
    { id: "acciones", texto: "Acciones", ruta: "/inversiones/acciones" },
    { id: "cetes", texto: "CETES", ruta: "/inversiones/cetes", insignia: 1 },
  ] },
];
```

## Logo en el chasis (v2.4)

`<Armazon logo={{ completo, icono }} onInicio={…}>`: cada uno, ruta de imagen o componente (SVG en línea).
El **completo** (símbolo + nombre) va donde hay sitio —barra de arriba, menú lateral abierto—; el **icono** donde
no —riel contraído (arriba del botón de desplegar), dock (a la izquierda), teléfono (con el nombre en texto)—.
Sin `completo` se pinta el icono y el nombre; sin `logo` la marca va tal cual donde hay sitio (v2.5.1: una app que trae su símbolo dentro de `marca` no lo ve duplicado) y, donde no cabe, un **monograma** con la inicial sobre el acento (par
medido ≥ 4.5 en todas las paletas; la letra va en `::before` para no contar como texto del botón). `onInicio`
vuelve la marca un botón que lleva al inicio.

### El símbolo de Zentrya (v2.5)

`<SimboloZentrya tamano={28} />` es el símbolo del lockup oficial (D): cuadro redondeado, Z y punto cian
(`CIAN_ZENTRYA`). Es un SVG en línea que sigue al tema —cuadro en `--ds-ink`, Z en `--ds-surface-solid`: en
claro sale idéntico al original, en oscuro invertido como su versión «dark», sin el rectángulo de fondo que traen
esos archivos—. Los productos lo usan como `logo={{ icono: <SimboloZentrya /> }}` y el nombre del producto va al
lado en texto, con la fuente del sistema (el wordmark original es texto en Space Grotesk, que dentro de un `<img>`
no carga y caería a Helvetica/Arial). Originales en `marca/originales/`; `marca/favicon.svg` es el favicon, que
se invierte solo con el sistema en oscuro.

## Mi cuenta (v2.4)

Decidido con Carlos tras revisar tendencias: **una** pantalla, `PantallaCuenta` (`usuario`, `secciones`,
`activa`, `onIr`): cabecera con la portada de la paleta, la foto, nombre, correo y un detalle; debajo un menú
propio de secciones (cada una con su URL; en el teléfono, fila deslizable; `peligro: true` la pinta en riesgo).
Piezas para cada sección:

- **`SeccionAjustes`** (`titulo`, `descripcion`, `estado`, `pie`): tarjeta con su propio guardar en `pie`. Nunca
  un «Guardar todo».
- **`FilaAjuste`** (`titulo`, `descripcion`, `primera`): qué es a la izquierda, el control a la derecha. Un campo
  dentro lleva `etiquetaOculta` (la etiqueta existe para el lector, pero no se repite a la vista).
- **`EstadoGuardado`** (`estado`: guardando | guardado | error): para lo que se guarda solo, visible y anunciado.
- **`CargaFoto`**: elegir o arrastrar, valida tipo y peso, recorta al centro a 512 px y entrega un File cuadrado.
- **`ZonaPeligro`**: borde de riesgo, al final; confirmar pide escribir una palabra (y la contraseña), nunca
  una casilla; el botón no se apaga, el campo dice qué falta. `Boton variante="peligro"` es nuevo.

⚠️ **El cuadro de `Modal` ahora es sólido** (`--ds-surface-solid`): translúcido sobre el velo, todo `ink-3`
de adentro bajaba de 4.5:1 (lo cachó axe en las etiquetas del modal de borrar).

## Pantalla de acceso (v2.8: a la manera de Apple)

`<PantallaAcceso marca titulo nota pie error><EntradaCuenta …/></PantallaAcceso>`: el login de todos los productos.
Carlos (2026-10-27): el héroe con tarjetas «se veía muy de IA genérico… implementa un login tipo Apple». Una sola
columna centrada, sin panel de color ni tarjeta: arriba a la izquierda el nombre del producto (`marca`); al centro el
símbolo de Zentrya dibujándose, el título (`titulo`), una línea (`nota`, o `lema`) y el formulario; abajo `pie`. Detrás,
en pantallas anchas, la Z grabada en siete líneas finas, tenue, a la izquierda de la columna, color `accent-trazo`.
La letra es la del sistema (`LETRA_SISTEMA`: SF en Apple). Demo: `?acceso` en el catálogo (contraseña «demo»).
`vitrina` ya no se pinta; `TarjetaVitrina` se sigue exportando para no romper importaciones.

**`<EntradaCuenta onEntrar esperando error recordar enlaces correoInicial />`** (v2.8): correo y contraseña en un solo
grupo. Primero el correo con una flecha dentro («Continuar»); al continuar se despliega la contraseña debajo y la
flecha pasa a ella («Entrar»). Las etiquetas viven dentro del campo y suben al escribir (aquí sí: dos campos que todos
conocen). `onEntrar({ correo, clave, recordar })`. `error` es el texto del fallo: lo dice debajo con `role="alert"`,
pinta el grupo de rojo, vacía la contraseña y le regresa el foco. `recordar` muestra «Mantener la sesión iniciada».
Si el gestor de contraseñas llena las dos, la contraseña se despliega sola. En pruebas e2e: llenar «Correo», botón
«Continuar», llenar «Contraseña», botón «Entrar».

- **Movimiento que termina.** El símbolo y la Z (~2.3 s) acaban y se quedan quietos: un fondo en bucle exigiría botón
  de pausa (WCAG 2.2.2). La Z se desplaza unos pixeles con el ratón sólo mientras se mueve. Con «reducir movimiento»
  todo aparece ya dibujado.
- **`error`**: cada vez que cambia, el formulario se sacude una vez (sin desmontarse: no pierde lo escrito).
- **`CampoClave`**: contraseña con mostrar/ocultar (`aria-pressed`) y aviso de **Bloq Mayús**. `Campo` gana
  `adorno` (un control dentro de la caja, a la derecha).

## Cuenta y notificaciones (v2.1)

Lo que lleva toda app en la esquina: `<Notificaciones />` y `<MenuUsuario />`, en `derecha` del Armazón.

- **`MenuUsuario`** (`nombre`, `correo`, `foto`, `opciones`, `onSalir`, `saliendo`, `figura`): el avatar es un `Retrato`
  —la foto si carga, si no las iniciales— y abre un menú con quién es, las `opciones` de la app (`{ texto, icono,
  onClick }`, p. ej. «Mi cuenta»), **Apariencia** (el mismo modal de `BotonApariencia`) y **Cerrar sesión**. Con
  él ya no hace falta `BotonApariencia` suelto.
- **`Notificaciones`** (`avisos`, `onAbrir`, `onMarcarTodas`, `onVerTodas`): la campana cuenta lo **no leído**
  y abre el panel (bajo la campana; en el teléfono, hoja). Cada aviso: `{ id, titulo, texto?, fecha?, leido?,
  tono? }`. Lo nuevo lleva punto Y negritas, y el lector de pantalla oye «Sin leer». No sabe de dónde salen los
  avisos: la app los trae (y decide si sondea o escucha).

## Paletas que elige la persona (v2.0)

Las marcas también se pueden ofrecer como **paletas**: `<ProveedorTema paletas>` deja elegir entre `PALETAS`
(o `paletas={["zentrya", "oceano"]}` para ofrecer sólo algunas) y `<SelectorPaleta />` pinta el control —una
rejilla de dos columnas con la muestra del acento en el tema activo—.

**`<BotonApariencia />` (v2.0.2) es lo que va en la barra**: un solo engrane que abre un modal con tema, paleta
y navegación (este último solo dentro de un `Armazon` y fuera del teléfono). No se ponen selectores de apariencia
sueltos en `derecha`: en el menú lateral ese espacio es angosto y se cortaban (Carlos, 2026-10-23). Cada elección
se aplica al momento; no hay «guardar». La elección se guarda en `localStorage` bajo
`ds-paleta`, como claro/oscuro, y manda sobre la `marca`, que pasa a ser con la que arranca. `useTema()` da
`paleta`, `paletas` y `fijarPaleta`. Sin `paletas`, `SelectorPaleta` no pinta nada y la marca es fija.

| Paleta | id | Acento claro / oscuro |
|---|---|---|
| Turquesa | `zentrya` | `#0B7D75` / `#3FD3C7` |
| Océano (v2.0) | `oceano` | `#1F5BD1` / `#7DAEFF` |
| Violeta | `workos` | `#6D3FD9` / `#B79CFF` |
| Grafito | `nykza` | negro / blanco |
| Fucsia (v2.7) | `fucsia` | `#B5257E` / `#F58BC8` |
| Pizarra (v2.7) | `pizarra` | `#3D5875` / `#A3B8D2` |

Fucsia sale del «Pop Pink» de los colores clave 2027 de WGSN/Coloro (a ~35° del rojo de riesgo, no se lee como
pérdida). Pizarra es la sobria: azul grisáceo tipo zinc, distinta de Océano (saturado) y de Grafito (neutro).

**Sin rojo, verde ni ámbar**, a propósito: ya significan riesgo, bien y aviso (pérdida, ganancia y alerta en
finanzas), y un acento de esos colores se confundiría con un estado. Una paleta nueva cambia sólo identidad
(acento con sus tres oficios, lienzo, héroe e `info`) y se mide igual que una marca: texto ≥ 4.5 sobre lienzo,
tarjeta y `accent-soft` en los dos temas, trazo ≥ 3, y el blanco del héroe ≥ 4.5 en su tono más claro.

## Temas

Los dos se definen en `tokens.css` como variables CSS. Cada color tiene su par; **ninguno
se define sólo en un tema** — al repintar un tema completo es fácil perder uno por el
camino, así que la comprobación es mecánica: todo token de color del bloque claro tiene que
aparecer en el oscuro. Cambiar de tema altera un atributo en el elemento raíz: no hay
re-render. `ProveedorTema` recuerda la elección y, si nadie eligió, sigue al sistema
operativo — también si éste cambia con la app abierta.

**Solo se guarda lo que la persona elige** (`alternar`, `fijar`), en `localStorage` bajo `ds-theme`. Hasta la v1.4.0
se guardaba también el tema inicial: desde la primera visita la app dejaba de seguir al sistema, y una pantalla con
`forzar` le cambiaba la preferencia a todas las demás. (Quien ya tenía un valor guardado por esa versión lo conserva:
no se distingue de una elección. Para volver a seguir al sistema basta borrar `ds-theme`.)

## Tipografía

**Manrope** variable, auto-hospedada (40 KB, pesos 400–800). Se eligió por sus numerales
tabulares: este sistema muestra cifras en columna todo el día, y ahí una geométrica bonita
de números anchos estorba más de lo que aporta.

| Uso | Token |
|---|---|
| Cifra protagonista | `--ds-num-xl` · 800 |
| Cifra de tarjeta | `--ds-num-l` / `--ds-num-m` · 800 |
| Título de pantalla | `--ds-t-display` · 800 |
| Título de sección | `--ds-t-title` · 800 |
| Cuerpo | `--ds-t-body` · 500 |
| Etiqueta | `--ds-t-micro` · 600, versalitas |

**Sin eyebrows.** El título carga su propio peso; `Seccion` lo acompaña con una regla que se
desvanece.

## ⚠️ `position: sticky` no siempre pega

`sticky` se ancla al **contenedor de scroll más cercano**. Si un ancestro tiene
`overflow: auto` —el `body` de esta aplicación lo tiene— ese ancestro pasa a ser el
contenedor, aunque quien scrollee de verdad sea `html`. El elemento queda anclado a algo
que nunca se mueve y se va con el contenido, sin ningún error que lo delate.

Por eso **ni la barra superior ni el menú lateral usan `sticky`**: los dos son
`position: fixed` y el contenido reserva su sitio — la barra con un alto medido por
`ResizeObserver` (con muchas secciones pasa a dos filas) y el riel con un margen que sigue su ancho
al contraerse.

## ⚠️ Modales y menús: portal y `.ds-capa`

Desde la v2.0.2 `Modal` también se dibuja en un portal (antes solo `Flotante` y el menú del Armazón): abierto desde
el menú lateral, cuyo `backdrop-filter` vuelve a la barra el contenedor de los `fixed`, salía encogido dentro de
ella. Todo lo que va en portal lleva la clase **`.ds-capa`**, que le da la base de `.ds-root` (letra, color, anillo
de foco, selección): fuera de `.ds-root` salía con la letra del navegador y **sin anillo de foco**. Un portal nuevo
lleva `className="ds-capa"` en su raíz.

## ⚠️ Menús flotantes: portal, siempre

Un menú `position: absolute` dentro de su botón se **recorta** en cuanto un ancestro tiene
`overflow` — y el menú lateral lo tiene. Van en un portal a `body` con posición fija, y se
anclan al lado donde HAY sitio: alinear siempre a la derecha del botón manda el menú fuera
de la pantalla cuando el botón vive a la izquierda. Se mide dos veces: la primera con un
tamaño estimado, la segunda con el real.

## ⚠️ La trampa de `transform: none`

`ds-rise` termina en `transform: none`, y con `fill-mode: both` ese valor **manda** cuando
la animación acaba. En un elemento centrado con `translate(-50%, -50%)` eso le borra el
centrado y lo deja corrido media caja a la derecha y hacia abajo — y sólo **después** de
que termina la animación, así que al mirarlo aparecer parece correcto.

Todo lo que se posicione con `transform` necesita su propia animación que arrastre ese
transform en las dos paradas: `ds-modal` para el diálogo centrado, `ds-inicio` para el
lanzador. No reutilizar `ds-rise` ahí.

## Movimiento

Una sola curva de llegada: `--ds-ease`. Nunca rebote.

| Token | Para |
|---|---|
| `--ds-t-tap` 120ms | respuesta al dedo |
| `--ds-t-state` 220ms | cambio de estado, hover |
| `--ds-t-move` 380ms | algo que aparece o se desplaza |
| `--ds-t-scene` 620ms | **la entrada con autoría, una por pantalla** |

La entrada escalonada (`entrada={i}`) corta su retraso total a 240 ms: son pantallas de
trabajo, nadie debe esperar a que la información termine de presentarse. `prefers-reduced-motion`
está resuelto de forma global en `tokens.css`.

## Superficies del navegador

`tokens.css` reclama selección, cursor, barra de scroll y anillo de foco. No pertenecen a
ningún sistema por omisión, y son la diferencia entre una página construida y una
ensamblada. Todo esto vive bajo `.ds-root`, así que no se filtra al resto de la app.

## Componentes

| | Para qué | Nota |
|---|---|---|
| `Bento` / `Celda` | retícula de 12 con marco opcional | en móvil todo pasa a ancho completo |
| `Superficie` | la tarjeta | `interactiva` sólo si la tarjeta entera lleva a algún lado |
| `Heroe` / `Vidrio` | la pieza protagonista | uno por pantalla |
| `Cifra` | número + etiqueta | el tono pinta el número, jamás el fondo |
| `Anillo` | progreso cuando ES la información | si es secundario, usa `Barras` |
| `Barras` | serie con pista y eje propio | el eje lo dibuja el componente, alineado |
| `Pastilla` / `Insignia` | estado y icono en círculo | |
| `Boton` | sólido · contorno · fantasma · claro | un `solido` por pantalla; `claro` sólo sobre el héroe |
| `Fila` / `Retrato` | lista de personas o documentos | para matrices de números sigue siendo mejor una tabla |
| `Migas` | ruta + volver | el volver apunta al PADRE, nunca al historial |
| `useFormulario` + reglas | validación de una captura | el botón NUNCA se deshabilita; cada campo dice su regla |
| `useFiltros(nombre, porOmisión)` | filtros de una lista que sobreviven a salir de la pantalla | `sessionStorage`, no URL ni `localStorage` — ver abajo |
| `useAngosto(px)` | cambiar de **forma** en pantallas angostas | sólo cuando el CSS no basta: otro árbol de elementos, no otro estilo |
| `Formulario` / `Campos` | el chasis de una captura | **toda captura es una vista**, nunca un modal; la barra de acciones va fija abajo |
| `Modal` / `Aviso` | lo que interrumpe | `Escape`, clic fuera, devuelve el foco. El aviso no se cierra solo |
| `Medidor` | barra lineal | acompaña a una cifra; nunca va sola |
| `Interruptor` | encender/apagar un renglón | `role="switch"`; la etiqueta accesible es obligatoria |
| `Tabla seleccion` + `BarraSeleccion` + `Casilla` | elegir varios renglones y actuar por lote (v1.3) | la casilla del encabezado elige TODOS los filtrados; la barra sólo existe con algo elegido y respeta el dock |
| `Esqueleto` | la espera con forma | sólo cuando la forma se conoce; si no, `Cargando` |
| `Seccion` | encabezado de bloque | **toda tarjeta titula con esto**: misma escala, misma regla, mismo sitio para la acción. `nota` es la línea secundaria |
| `Transicion` | la entrada de una vista o de un panel | la dirección la dice la RUTA; el armazón ya la aplica a todo el producto |
| `Armazon` | el esqueleto, en tres modos | uno por aplicación, no por pantalla; también anima el cambio de vista y lleva la pantalla nueva arriba |
| `Lamina` | tarjeta con imagen y velo | ver «Fotografía»; nunca junto a un nombre real |
| `Azulejo` | mosaico de lanzador | el único sitio donde el color es identidad, no estado |
| `PanelInicio` | el lanzador del `dock` | no sabe nada del producto: todo entra por props |

## La capa de MUI (`design/mui/`)

El núcleo no importa nada más que React — ésa es la razón por la que se puede copiar. Pero
**dos controles del navegador no se pueden estilar por dentro** y hay que sustituirlos:

| Control | Por qué no sirve el nativo |
|---|---|
| `<input type="date">` | Distinto en cada navegador, no respeta es-MX (enseña MM/DD en algunos entornos) y dispara `onChange` en **cada segmento**, así que ligar una consulta al campo lanza peticiones con fechas a medio escribir |
| `<select>` | Su lista la dibuja el sistema operativo: en tema oscuro sale un menú blanco |

Por eso `CampoFecha` y `Selector` viven **aparte**, en `design/mui/`. Quien se lleve el
sistema a un proyecto importa esta capa desde `@zentrya/design/mui`. Se ven idénticos a los
propios porque salen de los mismos tokens.

⚠️ **La raíz del `sx` no es la misma en `Select` que en `TextField`.** En el `Select`, la
raíz YA es el `OutlinedInput`; en el `TextField` viene envuelto en un `FormControl`. Un
`sx` que sólo apunta a `& .MuiOutlinedInput-root` llega a uno y **no al otro**, sin avisar:
el que se queda fuera hereda el tema de la aplicación. Por eso las reglas van a
`"&.MuiOutlinedInput-root, & .MuiOutlinedInput-root"`.

⚠️ **MUI 9 / MUI X 9 (v2.0).** El campo de fecha ya no es un `OutlinedInput` con `<input>`: es
`PickersOutlinedInput` con secciones (`.MuiPickersSectionList-root`), así que `sxCampo` apunta también a esas
clases; el día del calendario es `.MuiPickerDay-root` (antes `MuiPickersDay`). En el `Autocomplete`,
`renderInput` entrega `p.slotProps.htmlInput` (ya no `p.inputProps`): hay que extenderlo, no sustituirlo, o el
campo pierde su `ref`. Los textos del calendario van en español con `localeText` de `esES`: `adapterLocale`
sólo traduce las fechas, y sin eso el lector de pantalla decía «Choose date».

⚠️ **Un campo enfocado lleva UN anillo, no dos.** El borde del campo cambia a acento y se
acompaña de un halo (`--ds-accent-ring`); el anillo global de `:focus-visible` se apaga en
`input`, `textarea`, `select` y `combobox`, porque encima del borde eran dos. En botones y
enlaces se queda: ésos no tienen borde que cambiar.

**Aislada desde la v2.10.** MUI 9, MUI X 9, emotion y dayjs van DENTRO de `mui.js`: el proyecto
que instala el paquete no los instala ni necesita esas versiones. Camper corre MUI 5 en el resto
de su app y la capa `/mui` corre MUI 9 a su lado, sin cruzarse: cada una trae su propio emotion,
así que tampoco se comparte el tema. Sólo React queda fuera, porque tiene que haber uno solo.
El costo es peso: `mui.js` ronda 190 KB comprimido, y sólo lo carga la pantalla que lo importa.

⚠️ **MUI trae el tema de la aplicación anfitriona** (hasta la v2.9). Dentro de Camper, ese tema pinta el
texto del `Select` en su gris casi negro y el elemento elegido en su azul — ilegible sobre
un fondo oscuro, y fuera de la familia. `design/mui/estilo.js` lo sobrescribe, y es el
único sitio del sistema donde hay `!important`: los estados que MUI pinta desde su tema no
se ganan de otra forma.

## Piezas de negocio (v1.1)

Pensadas para que el mismo paquete arme el tablero de finanzas, logística, ventas, compras,
contabilidad, inventario o RH sin escribir estilos. El catálogo (`npm run dev`) trae cada
pieza con datos de ejemplo de varios giros y seis tableros completos armados sólo con ellas.

| Familia | Piezas |
|---|---|
| Formato | `moneda`, `porcentaje`, `compacto`, `fecha`, `fechaRelativa`, `variacion`, `formatear`, `formato.numero`, `configurarFormato` (es-MX y MXN por omisión) |
| Tarjetas | `TarjetaKpi`, `FilaKpis`, `TarjetaMeta`, `TarjetaComparativa`, `TarjetaRanking`, `TarjetaEntidad`, `Variacion` |
| Datos | `Detalles`, `Llamado`, `EstadoVacio`, `GrupoRetratos` |
| Gráficas | `Sparkline`, `GraficaLinea`, `GraficaBarras`, `Dona`, `Embudo`, `Cascada`, `MapaCalor`, `CalendarioCalor`, `Bala`, `BarraDistribucion` |
| Operación | `LineaTiempo`, `Pasos`, `Kanban`, `Actividad`, `Calendario` |
| Estructura | `EncabezadoPagina`, `Segmentado`, `SelectorPeriodo`, `BarraFiltros`, `Chip`, `Flotante` |

```jsx
import { TarjetaKpi, GraficaLinea, Superficie, Seccion } from "@zentrya/design";

<TarjetaKpi etiqueta="Costo por entrega" valor={1840} formato="moneda"
  variacion={0.042} sentido="baja" contra="vs semana pasada" serie={[1720, 1790, 1840]} />
```

`sentido="baja"` dice que bajar es bueno: el +4.2 % sale en rojo. Cada pieza explica sus
props en el comentario de cabecera de su archivo.

Tokens nuevos: `--ds-serie-1…6` (series, por tema), `--ds-sec-0…5` (rampa de magnitud),
`--ds-grid`, `--ds-eje`, `--ds-num-s`, `--ds-r-mini`.

## Para llevarlo a otro proyecto

1. Instalar el paquete con la versión fija (el tag):
   `npm install github:lecxa16/zentrya-design#v2.10.0`
2. Tener React 18 o más nuevo. Nada más: desde la v2.10 MUI, emotion y dayjs vienen dentro
   del paquete (ver «La capa de MUI»).
3. Envolver la app en `<ProveedorTema>`.
4. Importar el núcleo desde `@zentrya/design` y el selector y la fecha desde
   `@zentrya/design/mui`. No hay paso 5.

Para actualizar, se cambia el tag en `package.json` y se vuelve a instalar. Una versión
nueva se publica así: cambiar `src/`, subir `version` en `package.json`, `npm run build`,
commitear **también `dist/`** (los proyectos instalan lo compilado, no compilan nada) y
crear el tag `vX.Y.Z`.

## Lo que este sistema rechaza

Tarjetas idénticas como estructura de página · el gradiente repartido por toda la pantalla ·
vidrio sobre fondo claro · color sin significado · sombras sin desplazamiento · grises
planos sobre superficies de color (se tiñen del tono) · eyebrows · una fuente de sistema
haciendo de voz de display.
