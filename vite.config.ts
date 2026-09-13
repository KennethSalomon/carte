import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// No hardcoded nitro preset: Nitro auto-detects the deploy target from the
// platform environment (Netlify, Vercel, Cloudflare Pages...). To force a
// target, set the NITRO_PRESET env var (e.g. NITRO_PRESET=netlify).
export default defineConfig(({ mode, command }) => ({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
    }),
    // Build-only: emit the SSR server through Nitro (auto-detected preset).
    ...(command === "build" ? [nitro({ defaultPreset: "cloudflare-module" })] : []),
    viteReact(),
  ],
  css: { transformer: "lightningcss" },
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
    ignoreOutdatedRequests: true,
  },
  // Keep readable names for development builds (`vite build --mode development`).
  ...(command === "build" && mode === "development"
    ? {
        environments: {
          client: {
            define: { "process.env.NODE_ENV": JSON.stringify("development") },
          },
        },
        esbuild: { keepNames: true },
      }
    : {}),
}));
