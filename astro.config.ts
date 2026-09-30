import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://michaelmelton.dev",
  integrations: [
    expressiveCode({
      themes: ["github-dark", "github-light"],
      // Map each theme to our [data-theme] switch (theme.type is "dark" | "light")
      themeCssSelector: (theme) => `[data-theme="${theme.type}"]`,
      useThemedScrollbars: false,
      styleOverrides: {
        borderRadius: "4px",
        codeFontFamily: "var(--mono)",
        codePaddingInline: "1rem",
        frames: {
          frameBoxShadowCssValue: "none",
        },
      },
    }),
    sitemap(),
  ],
});
