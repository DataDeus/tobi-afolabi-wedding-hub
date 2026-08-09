import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Static SPA build for GitHub Pages.
// `base: '/tobi-afolabi-wedding-hub/'` makes the build work when deployed to user.github.io/repo/
export default defineConfig({
  base: "/tobi-afolabi-wedding-hub/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
});
