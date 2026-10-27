/**
 * El puente entre MUI y los tokens.
 *
 * MUI trae su propio tema —y dentro de esta aplicación, el de Camper, cuyo
 * primario es un azul— así que aquí se le pasa por encima con las mismas
 * variables que usa el resto del sistema.
 *
 * ⚠️ Los estados que MUI pinta desde el tema (`Mui-selected`, hover) llevan
 * `!important`: sin él gana el tema de la aplicación y el elemento elegido
 * salía azul dentro de un menú teal. Es el único sitio del sistema donde se
 * usa, y es por esto.
 */
export const sxCampo = (hayError) => {
  const borde = hayError ? "var(--ds-risk)" : "var(--ds-line-firm)";
  const bordeEncima = hayError ? "var(--ds-risk)" : "var(--ds-ink-3)";
  const bordeFoco = hayError ? "var(--ds-risk)" : "var(--ds-accent-trazo)";
  const halo = hayError
    ? "0 0 0 4px color-mix(in srgb, var(--ds-risk) 22%, transparent)"
    : "0 0 0 4px var(--ds-accent-ring)";

  const campo = {
    fontFamily: "var(--ds-font)",
    fontSize: "var(--ds-t-body)",
    fontWeight: 400,
    color: "var(--ds-ink)",
    backgroundColor: "var(--ds-surface-2)",
    /* En texto: en `sx`, un número suelto se multiplica por el radio del tema (10 → 40 px). */
    borderRadius: "10px",
    transition: "box-shadow var(--ds-t-state) var(--ds-ease)",

    /* Se apunta a `.MuiOutlinedInput-notchedOutline`, no a `fieldset`: MUI
       usa esa clase, y una clase le gana a un selector de elemento. Sin
       esto, el azul de su tema seguía mandando al enfocar. */
    "& .MuiOutlinedInput-notchedOutline, & .MuiPickersOutlinedInput-notchedOutline": {
      borderColor: borde,
      borderWidth: "1px !important",
      transition: "border-color var(--ds-t-state) var(--ds-ease)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline, &:hover .MuiPickersOutlinedInput-notchedOutline": { borderColor: bordeEncima },

    /* Un solo estado de foco: borde de acento y un halo suave. Antes se
       apilaban dos anillos —el azul de MUI y el del navegador— y eso es lo
       que se veía mal. */
    "&.Mui-focused": { boxShadow: halo },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
      borderColor: bordeFoco,
    },
    "&.Mui-disabled": { opacity: 0.55 },
  };

  return {
    /* `&` cubre al `Select`, cuya RAÍZ ya es el `OutlinedInput`; el
       descendiente cubre al `TextField`, que lo envuelve en un
       `FormControl`. Sin las dos, las reglas sólo llegaban a uno de los
       dos y el otro se quedaba con el tema de la aplicación. El de fecha
       (MUI X 8+) no usa `OutlinedInput` sino `PickersOutlinedInput`, con
       secciones en vez de un `<input>`. */
    "&.MuiOutlinedInput-root, & .MuiOutlinedInput-root, & .MuiPickersOutlinedInput-root": campo,
    /* Su raíz ya trae el relleno lateral: aquí sólo va el vertical. */
    "& .MuiPickersOutlinedInput-root": { paddingLeft: "14px" },
    /* 11.5 px arriba y abajo: la misma altura que `Campo` (44 px, el mínimo táctil de Apple). */
    "& .MuiPickersSectionList-root": { padding: "11.5px 0", color: "var(--ds-ink)" },
    "& .MuiPickersOutlinedInput-root.Mui-disabled .MuiPickersSectionList-root": { color: "var(--ds-ink-3)" },

    "& .MuiOutlinedInput-input, & .MuiSelect-select": {
      padding: "11.5px 14px",
      color: "var(--ds-ink)",
      WebkitTextFillColor: "var(--ds-ink)",
    },
    "& .Mui-disabled .MuiSelect-select, & .MuiOutlinedInput-input.Mui-disabled": {
      WebkitTextFillColor: "var(--ds-ink-3)",
    },
    "& .MuiInputBase-input::placeholder": { color: "var(--ds-ink-3)", opacity: 1 },
    "& .MuiSvgIcon-root": { color: "var(--ds-ink-3)" },

    /* El anillo del navegador sobra: el halo ya dice dónde está el foco, y
       los dos juntos se ven como un borde doble. */
    "& .MuiSelect-select:focus, & .MuiSelect-select:focus-visible, & input:focus-visible": {
      outline: "none",
    },
  };
};

/** El menú desplegable de un `Select`. */
export const sxMenu = {
  "& .MuiPaper-root": {
    backgroundColor: "var(--ds-panel)",
    backdropFilter: "var(--ds-blur)",
    border: "1px solid var(--ds-line)",
    borderRadius: "var(--ds-r-card)",
    boxShadow: "var(--ds-lift-3)",
    marginTop: "6px",
  },
  "& .MuiMenuItem-root": {
    fontFamily: "var(--ds-font)",
    fontSize: "var(--ds-t-small)",
    fontWeight: 600,
    color: "var(--ds-ink-2)",
    borderRadius: "var(--ds-r-item)",
    margin: "2px 6px",
    minHeight: 38,
    "&:hover": {
      backgroundColor: "var(--ds-surface-2) !important",
      color: "var(--ds-ink)",
    },
    "&.Mui-selected, &.Mui-selected.Mui-focusVisible": {
      backgroundColor: "var(--ds-accent-soft) !important",
      color: "var(--ds-accent-tinta)",
      "&:hover": { backgroundColor: "var(--ds-accent-soft) !important" },
    },
  },
};
