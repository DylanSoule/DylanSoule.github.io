import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({

    input: {
        home: resolve(import.meta.dirname, "index.html"),

        portfolio: resolve(import.meta.dirname, "portfolio.html"),

        contact: resolve(import.meta.dirname, "contact.html")
    }

});