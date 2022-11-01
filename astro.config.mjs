import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'
import mdx from '@astrojs/mdx'
import m2dx from 'astro-m2dx'

/** @type {import('astro-m2dx').Options} */
const m2dxOptions = {
  frontmatter: true,
  autoImports: true,
}

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs(), mdx()],
  markdown: {
    drafts: true,
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
    },
    extendDefaultPlugins: true, // remark-gfm, remark-smartypants
    remarkPlugins: [[m2dx, m2dxOptions]],
    rehypePlugins: [],
  },
})
