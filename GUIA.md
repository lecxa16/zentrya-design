# Guía: cómo agregar algo sin romper el lenguaje

`LEEME.md` dice **qué existe**. Esta guía dice **qué hacer** cuando hay que agregar algo.
Las dos viajan con el paquete `@zentrya/design`.

La regla que resume todas las demás: **si algo falta, se agrega AL SISTEMA; no se
improvisa en la pantalla.** Un color escrito a mano en una vista es deuda que nadie vuelve
a encontrar.

---

## 1. Antes de escribir una pantalla

Cuatro preguntas, en este orden. Si alguna no tiene respuesta, la pantalla todavía no se
puede diseñar.

1. **¿Qué decide quien la abre?** No «qué muestra»: qué DECIDE. El tablero de RH abre por
   «faltan 202 datos» y no por «68 empleados» porque lo primero dice qué hacer hoy y lo
   segundo ya se sabe.
2. **¿Cuál es el dato protagonista?** Ése lleva el héroe o la cifra grande. Uno solo.
3. **¿Qué pasa cuando está vacío?** El vacío es una pantalla más, no un descuido. Se
   diseña.
4. **¿Qué pasa mientras carga?** Si la forma se conoce, `Esqueleto`. Si no, `Cargando`.

## 2. Qué pieza para qué

| Necesito | Uso | No uso |
|---|---|---|
| Una tarjeta | `Superficie` | un `div` con sombra |
| La pieza protagonista | `Heroe` — **una por pantalla** | un segundo gradiente |
| Un número | `Cifra` (+ `className="ds-num"`) | texto grande a mano |
| Lista de personas | `Fila` + `Retrato` | una tabla |
| Matriz de datos | `Tabla` (+ `porPagina` si pasa de ~20) | filas apiladas |
| Encabezado de bloque | `Seccion` | un `h2` suelto |
| Progreso que ES el dato | `Anillo` | |
| Progreso que acompaña | `Medidor` | una barra a mano |
| Estado | `Pastilla` | texto de color |
| Entrada de texto | `Campo` | `<input>` pelón |
| Encender o apagar un renglón | `Interruptor` | **nunca** `<input type="checkbox">` ni un botón «Desactivar» por fila |
| Fecha | `CampoFecha` de `design/mui` | **nunca** `<input type="date">` |
| Elegir de una lista | `Selector` de `design/mui` | **nunca** `<select>` |
| Elegir de una lista larga (cientos o miles) | `Buscable` de `design/mui`: se escribe para filtrar, sin acentos | un `Selector` de 2,000 renglones |
| Capturar datos | `Formulario`, **en su propia vista** | **nunca** un `Modal` con campos |
| Validar una captura | `useFormulario` + reglas; el botón vivo | **nunca** `disabled` por campos incompletos |
| Un botón que dispara algo que tarda | `Boton esperando={…}`: gira y conserva el texto. En una pantalla de MUI, `aria-busy={cargando}` en el `Button` (la regla global de `App.scss` pone el círculo) | **nunca** sólo `disabled` mientras carga: un botón gris parece roto |
| Cambiar de vista o de panel | `Transicion` (el armazón ya lo hace por ruta) | cambiar la `key` de React: remonta y se pierde foco, estado y consultas |
| Interrumpir sin pedir datos | `Modal` | |
| Detalle que se lee junto a lo que queda detrás (la ruta en un mapa) | `Modal lado="derecha"`: anclado al borde, sin fondo — lo de atrás sigue con scroll y clics; trae su botón de cerrar | un modal centrado que tape lo que explica el detalle |
| Resultado de una acción | `Aviso` | un toast que se va solo |
| Imagen | `Lamina` | un `<img>` suelto |
| Un indicador con su tendencia | `TarjetaKpi` (`variacion`, `sentido`, `serie`) | una `Superficie` con una `Cifra` y una flecha a mano |
| Varios indicadores en fila | `FilaKpis`: una sola tarjeta con divisores | cuatro tarjetas idénticas |
| Avance contra meta, con proyección | `TarjetaMeta` (`diaActual`, `diasPeriodo`) | un `Medidor` suelto sin decir a dónde llega |
| Real contra presupuesto o año anterior | `TarjetaComparativa` | dos cifras y una resta de cabeza |
| Lo mejor o lo peor de una lista | `TarjetaRanking` (participación sobre el total, no sobre el top) | una tabla de cinco renglones |
| Ficha de cliente, proveedor, unidad, empleado | `TarjetaEntidad` | |
| Datos de un expediente | `Detalles`: el faltante sale «Sin capturar» | un vacío o un guion que parece dato |
| Aviso que se queda en la página | `Llamado` | un `Aviso` (ése es modal) o un toast |
| Pantalla o tarjeta sin nada | `EstadoVacio` | un lienzo en blanco |
| Subió o bajó | `Variacion` con `sentido` (`"baja"` cuando bajar es bueno: costos, días de cartera) | flecha verde siempre que sube |
| Formatear dinero, porcentajes, fechas | `moneda`, `porcentaje`, `fecha`, `formato.numero`, `formatear(v, "moneda")` | `toFixed` o `toLocaleString` en la pantalla |
| Tendencia sin ejes | `Sparkline` | |
| Serie en el tiempo | `GraficaLinea` (≤ 6 series, `meta`, `area`) | dos ejes verticales: **nunca**; dos gráficas |
| Comparar categorías | `GraficaBarras` (`horizontal` para nombres largos, `apiladas`, `resaltar`) | |
| Partes de un todo | `Dona` (≤ 6 + «Otros») o `BarraDistribucion` (una barra 100 %) | pastel con 12 rebanadas |
| Conversión por etapas | `Embudo` | |
| Del ingreso a la utilidad | `Cascada` | barras sueltas que no suman |
| Intensidad por día y hora | `MapaCalor`; por día del año, `CalendarioCalor` | |
| Real contra meta en renglones | `Bala` (`menorEsMejor` para costos y días) | velocímetros |
| Historial de un pedido o expediente | `LineaTiempo` | |
| Un proceso con etapas y estado | `Pasos` | barra de progreso sin nombres |
| Flujo por columnas (pipeline, órdenes) | `Kanban` con `onMover`: arrastra **y** «Mover a…» con teclado | sólo arrastrar |
| Quién hizo qué, reciente | `Actividad` | |
| Fechas en un mes | `Calendario` (en angosto cambia a lista por día) | la misma cuadrícula más chica |
| Encabezado de pantalla | `EncabezadoPagina` | un `h1` suelto |
| Dos a cinco vistas excluyentes | `Segmentado` | pestañas para un filtro |
| Periodo de consulta | `SelectorPeriodo` (`rangoPeriodo` para calcularlo fuera) | dos `CampoFecha` cuando basta un atajo |
| Filtros aplicados | `BarraFiltros` + `Chip` | |
| Menú propio | `Flotante` + `OpcionFlotante` (portal, Escape, flechas) | un `div` absoluto |

**¿No está en la tabla?** Se agrega una primitiva, con su comentario de por qué existe. No
se resuelve dentro de la pantalla.

## 3. Las reglas que no se doblan

1. **Todo sale de los tokens.** Ningún color, radio, sombra, duración ni curva se escribe a
   mano en una pantalla.
2. **Un formulario nunca vive en un modal** (Carlos, 2026-09-26): lleva su propia vista, con
   su ruta y su «volver». Un modal tapa lo que hay detrás, no se puede enlazar, se pierde al
   recargar y en un teléfono deja el teclado encima del campo. El `Aviso` sí es modal: no es
   una captura, es el resultado de una.
3. **El botón de guardar no se deshabilita** (Carlos, 2026-09-26). Se pulsa, y entonces cada
   campo dice su regla y arriba sale el resumen. Sólo se apaga lo que no se arregla
   escribiendo: un permiso que no se tiene, o una llamada en vuelo — y el porqué va escrito
   en la pantalla, no en un tooltip.
4. **Un héroe por pantalla.** El gradiente señala qué importa; repetido, decora.
5. **El color significa estado.** La única excepción es `Azulejo`, y está documentada: un
   lanzador es un mapa, no una lectura de datos.
6. **La cifra manda**, y siempre con `ds-num` para que alinee en columna.
7. **Un dato que falta se señala, nunca se inventa.** Ese dato termina en el IMSS y en un
   comprobante fiscal.
8. **Una foto de archivo jamás junto a un nombre real.** Ambiente y estados vacíos, nada
   más. Ver `pages/rh/imagenes.js`.
9. **Lo sensible se filtra en el servidor.** Ocultar en pantalla no es proteger.
10. **Nada se cierra solo.** Un aviso que desaparece antes de que lo lean no informó.

## 4. Trampas ya pagadas

Cada una costó una sesión encontrarla. Están medidas, no supuestas.

| Síntoma | Causa | Qué hacer |
|---|---|---|
| Un diálogo sale corrido media caja | `ds-rise` termina en `transform: none` y con `fill-mode: both` borra el `translate(-50%,-50%)` | Animación propia que arrastre el transform (`ds-modal`, `ds-inicio`) |
| Algo «pegajoso» no pega | `sticky` se ancla al contenedor de scroll más cercano, y el `body` de la app tiene `overflow: auto` aunque quien scrollea es `html`. **En este proyecto `sticky` no sirve** | `position: fixed` y que el contenido reserve el sitio: alto con `ResizeObserver` si varía, margen lateral si es un riel |
| Un menú no aparece | `absolute` dentro de un ancestro con `overflow` se recorta | Portal a `body` con posición fija |
| Un menú sale fuera de la pantalla | Anclado siempre al mismo lado | Anclar al lado donde hay sitio y ajustar al borde |
| Los primeros elementos de una barra no se alcanzan | `justify-content: center` tira lo que desborda por el borde de INICIO, que no es scrollable | Centrar con `margin: auto` en un envoltorio interior |
| Un campo de MUI ignora los estilos | En `Select` la raíz **es** el `OutlinedInput`; en `TextField` viene envuelto | `"&.MuiOutlinedInput-root, & .MuiOutlinedInput-root"` |
| Texto o estados con el azul de Camper | MUI arrastra el tema de la app anfitriona | Sobrescribir en `design/mui/estilo.js` (único sitio con `!important`) |
| Un bloque de carga se ve como un agujero | `surface-sunk` en oscuro es más oscuro que el lienzo | `--ds-esqueleto` |
| Un panel se ve frío sobre una página con color | Un blanco al 90 % no deja pasar el lienzo | Temperatura escrita en el color (`--ds-panel`, `--ds-frame`) |
| Un color de identidad desaparece en oscuro | | `color-mix(in oklab, <color>, var(--ds-mezcla-tono))` |
| Al animar una vista, una barra `fixed` se va al fondo del documento y vuelve de golpe | Un `transform` en un ancestro convierte a sus `fixed` en `absolute` respecto a él | Animar `top`/`left` sobre un contenedor `relative` (lo que hace `Transicion`): no crea bloque contenedor |
| Un `Select` de MUI avisa «out-of-range value» y el campo se ve vacío | Se pintó con su valor puesto y la lista de opciones todavía vacía | Esperar al catálogo antes de pintar el formulario |
| Una animación de entrada no se ve nunca en desarrollo | `StrictMode` monta, limpia y vuelve a montar: una cancelación en la limpieza mata la primera, y la segunda ya no ve cambio | No cancelar en la limpieza; si el elemento se va, su animación se va con él |
| El formulario acepta un dato que el servidor rechaza | `digitos(10,10)` limpia guiones y espacios antes de contar, así que «81-1234-5678» le parece bien | `soloDigitos(10)` cuando el servidor guarda el dato crudo (teléfono, NSS, CLABE). La regla del formulario tiene que ser la del servidor, palabra por palabra |
| Un campo se pinta en rojo mientras todavía se escribe | El error se enseñaba al primer cambio, no al terminar | El error espera a `onSalir` (blur en texto, elegir en selector o fecha) o al intento de guardar. Un componente propio que reciba `{...f.campo(x)}` **desestructura `onSalir`** |
| Un selector se queda en blanco tras elegir | Se puso «Todas» como opción con `valor: ""`, y `""` es justo el caso que el componente reserva para «sin elegir» | Pasar `vacio="Todas"` y sacarla de `opciones` |
| Una cuadrícula «cabe» en el teléfono pero no se lee | No desbordar no es ser legible: siete columnas en 375 px dan celdas de 38 px y el texto se recorta en silencio | `useAngosto` y **otra forma** (lista por día), no la misma con letra más chica. Medir el ancho del contenido, no sólo el del documento |
| Una lista pierde sus filtros al volver de un detalle | El estado vive en `useState` y la pantalla se desmonta | `useFiltros(nombre, porOmisión)` |

## 4.1 Reglas de las gráficas

- **Un solo eje vertical.** Dos medidas de distinta escala van en dos gráficas.
- **El color sigue a la serie**, en el orden de `--ds-serie-1…6`, validado para daltonismo.
  No se reordena para «verse mejor» ni se inventa un séptimo: lo que pase de seis va a «Otros».
- **El texto nunca va del color de la serie**: tinta, y una muestra de color al lado.
- **Toda gráfica trae su «Ver tabla».** No es un extra: es la única lectura exacta y la que
  sirve a quien no distingue colores. Tres tonos de serie quedan bajo 3:1 en claro, y por
  eso es obligatoria.
- **Las cifras dentro de la gráfica van compactas** («$1.2 M»); la completa vive en el globo
  y en la tabla.
- **Una cifra no se parte en dos renglones.** `cabe()` + `CONTENEDOR_CIFRA` (en `ancho.js`)
  le bajan la letra hasta caber en su columna.

## 5. Antes de decir «terminado»

- [ ] ¿Se ve en **los dos temas**? No basta con el que tengo puesto.
- [ ] ¿A **390 px** sin desbordamiento horizontal? Medido con `scrollWidth > clientWidth`.
- [ ] Y además, ¿a 390 px se **lee**? Medir el ancho real de una celda y de su texto: caber
      y servir no son lo mismo. Si no se lee, cambia la forma (`useAngosto`), no el tamaño.
- [ ] ¿En **los tres modos** de navegación?
- [ ] ¿El **vacío** dice algo útil y la **carga** tiene forma?
- [ ] ¿Se recorre con **teclado**, y `Escape` cierra lo que se abre?
- [ ] ¿Los cuatro niveles de tinta pasan **AA** donde los puse? Medido, no estimado.
- [ ] ¿**Cero errores** de consola?
- [ ] ¿Algún color, radio o sombra escrito a mano? Si sí, va al sistema.

**Medir, no mirar.** Casi todos los defectos de arriba se veían «bien» en una captura y
sólo aparecieron al leer el valor calculado. Una desviación de 260 px, un contraste de
3.54, un botón en `x = −73`: ninguno se ve, todos se miden.

## 6. Al escribir el código

- **Español, con acentos**, en nombres, comentarios y textos de pantalla.
- **El comentario explica el porqué, no el qué.** `// centra el modal` sobra; `// ds-rise
  termina en transform: none y borraría el centrado` no.
- **Reutilizar el endpoint que ya existe** antes de crear uno. Lo que se aprueba en Zentrya
  queda aprobado en Camper porque comparten el mismo.
- **La regla de negocio no se reescribe de memoria**: se extrae a un módulo con pruebas
  (ver `pages/rh/diasVacaciones.js`).
