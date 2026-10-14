import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Catálogo vivo de piezas: importa el código fuente (no dist/), así lo que se
// ve aquí es lo que se está escribiendo. No viaja en el paquete.
export default defineConfig({
  root: "catalogo",
  base: "./",
  plugins: [react()],
  server: { port: 5198 },
  build: { outDir: "../catalogo-dist", emptyOutDir: true },
});
