import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    open: true, // opens the browser when the server starts
    host: "0.0.0.0", // Allows access from outside the container
    port: 5173, // Explicitly set the port
  },
});
