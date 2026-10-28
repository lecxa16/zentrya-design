import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Compila el paquete a dist/: index.js (núcleo), mui.js (selector y fecha
// sobre MUI) y estilos.css (tokens; la letra es la del sistema desde v2.9).
// Desde v2.10 el paquete es AISLADO: MUI, MUI X, emotion y dayjs van adentro
// de mui.js. El proyecto que lo instala no tiene que tener esas versiones (ni
// ninguna): Camper corre MUI 5 en el resto de su app y no se cruzan, ni el
// código ni el tema. Sólo React queda fuera, porque tiene que haber uno solo.
// El núcleo importa su propia hoja: quien instala el paquete no tiene que
// acordarse de cargar el CSS (igual que cuando el sistema vivía en src/).
const cargarEstilos = {
  name: "cargar-estilos",
  generateBundle(_, bundle) {
    const nucleo = bundle["index.js"];
    if (nucleo) nucleo.code = 'import "./estilos.css";\n' + nucleo.code;
  },
};

export default defineConfig({
  plugins: [react(), cargarEstilos],
  build: {
    outDir: "dist",
    assetsInlineLimit: 100000,
    cssCodeSplit: false,
    lib: {
      entry: { index: "src/index.js", mui: "src/mui/index.js" },
      formats: ["es"],
    },
    rollupOptions: {
      external: (id) => /^(react|react-dom)(\/|$)/.test(id),
      output: { assetFileNames: (a) => (a.name?.endsWith(".css") ? "estilos.css" : "[name][extname]") },
    },
  },
});
