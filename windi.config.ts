import { defineConfig } from "windicss/helpers";
import type { WindiCssOptions } from "@windicss/config";

export default defineConfig({
  preflight: true,
  extract: {
    include: ["**/*.{vue,html,jsx,tsx}"],
    exclude: ["node_modules", ".git"],
  },
});
