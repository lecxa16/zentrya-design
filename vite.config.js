import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Compila el paquete a dist/: index.js (núcleo), mui.js (selector y fecha
// sobre MUI) y estilos.css (tokens; la letra es la del sistema desde v2.9).
// React, MUI y dayjs quedan fuera: los pone el proyecto que lo instala.
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
      external: (id) => /^(react|react-dom|@mui\/[^/]+|@emotion\/[^/]+|dayjs)(\/|$)/.test(id),
      output: { assetFileNames: (a) => (a.name?.endsWith(".css") ? "estilos.css" : "[name][extname]") },
    },
  },
});
