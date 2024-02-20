import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";import { configDefaults } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude],
    //"**/src/test/domain/**"
  },
});