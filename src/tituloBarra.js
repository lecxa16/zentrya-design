/**
 * El título grande que se encoge (v2.9, a la manera de iOS): en el teléfono,
 * el Armazón ofrece aquí dónde poner el título de la pantalla en su barra, y
 * `EncabezadoPagina` lo manda cuando su título grande se sale por arriba al
 * hacer scroll. Fuera del Armazón (o en escritorio) no hay nadie escuchando.
 */
import { createContext } from "react";

export const TituloBarraCtx = createContext(null);
