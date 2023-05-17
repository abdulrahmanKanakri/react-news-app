import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default () => {
  const env = loadEnv("", "");

  return defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT),
    },
    preview: {
      host: true,
      strictPort: true,
      port: parseInt(env.VITE_PORT),
    },
  });
};
