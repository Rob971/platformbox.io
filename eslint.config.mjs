import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "styled-components",
              message:
                "CSS-in-JS is banned. Use Tailwind v4 utilities and globals.css tokens.",
            },
            {
              name: "@emotion/react",
              message:
                "CSS-in-JS is banned. Use Tailwind v4 utilities and globals.css tokens.",
            },
            {
              name: "@emotion/styled",
              message:
                "CSS-in-JS is banned. Use Tailwind v4 utilities and globals.css tokens.",
            },
            {
              name: "@mui/material",
              message:
                "Do not add a second component library. Use Tailwind + Lucide.",
            },
          ],
          patterns: [
            {
              group: ["@mui/*", "@emotion/*"],
              message:
                "Do not add a second component library or CSS-in-JS. Use Tailwind + Lucide.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
