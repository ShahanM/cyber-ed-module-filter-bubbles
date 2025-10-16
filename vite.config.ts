import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	base: "/filter-bubbles-module/",
	build: {
		outDir: "build",
	},
	server: {
		port: 3369,
	},
});
