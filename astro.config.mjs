import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'
import mdx from '@astrojs/mdx'
import compress from 'astro-compress'

import m2dx from 'astro-m2dx'
import remarkToc from 'remark-toc'

import rehypeTwemoji from './src/plugins/rehype-twemoji'

// https://astro-m2dx.netlify.app/
/** @type {import('astro-m2dx').Options} */
const m2dxOptions = {
  frontmatter: true,
  exportComponents: true,
  autoImports: false,
}

/** @type {import('@astrojs/mdx').MdxOptions} */
const mdxOptions = {
  remarkPlugins: [[m2dx, m2dxOptions], remarkToc],
  rehypePlugins: [rehypeTwemoji],
  recmaPlugins: [],
  extendPlugins: 'astroDefaults', // remark-gfm, remark-smartypants
}

const tailwindOptions = {
  config: {
    applyBaseStyles: false,
  },
}

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(tailwindOptions), solidJs(), mdx(mdxOptions), compress()],
  markdown: {
    drafts: true,
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
    },
  },
})
