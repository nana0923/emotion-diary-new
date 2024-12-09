import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },

      { find: "@pages", replacement: "/src/pages" },
      { find: "@components", replacement: "/src/components" },
      { find: "@routes", replacement: "/src/routes" },
      { find: "@layouts", replacement: "/src/layouts" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@hooks", replacement: "/src/hooks" },
    ],
  },
});
