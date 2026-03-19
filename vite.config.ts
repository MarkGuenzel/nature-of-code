import path from "path"
import tailwindcss from "@tailwindcss/vite"
import mdx from '@mdx-js/rollup'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import remarkExtractToc from '@stefanprobst/remark-extract-toc'
import remarkMdxExportToc from '@stefanprobst/remark-extract-toc/mdx'
import rehypeSlug from 'rehype-slug';

// https://vite.dev/config/
export default defineConfig({
  base: "/nature-of-code",
  plugins: [
    react(), 
    tailwindcss(),
    mdx({
      remarkPlugins: [
        remarkExtractToc,
        remarkMdxExportToc
      ],
      rehypePlugins: [rehypeSlug],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
