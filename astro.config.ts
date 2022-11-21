import { readFileSync } from 'fs'
import { defineConfig } from 'astro/config'
import prefetch from '@astrojs/prefetch'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'
import mdx from '@astrojs/mdx'
import image from '@astrojs/image'
import compress from 'astro-compress'
import m2dx from 'astro-m2dx'
import remarkDebug from './src/plugins/remark-debug'
import remarkToc from './src/plugins/remark-toc'
import remarkRouteSlug from './src/plugins/remark-route-slug'
import remarkReadingTime from './src/plugins/remark-reading-time'
import rehypeTwemoji from './src/plugins/rehype-twemoji'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code'
import type { Options as M2dxOptions } from 'astro-m2dx'
import type { RemarkTocOptions } from './src/plugins/remark-toc'
import type { MdxOptions } from '@astrojs/mdx'
import type { IntegrationOptions } from '@astrojs/image'
import type { Options as CompressOptions } from 'astro-compress/dist/options'

// https://astro-m2dx.netlify.app/
const m2dxOptions: M2dxOptions = {
  frontmatter: true,
  exportComponents: true,
  autoImports: true,
  relativeImages: true,
}

const remarkTocOptions: RemarkTocOptions = {
  tight: true,
  ordered: false,
}

const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    dark: JSON.parse(readFileSync('./src/assets/one-dark-pro.json', 'utf8')),
    light: JSON.parse(readFileSync('./src/assets/atom-one-light.json', 'utf8')),
  },
  tokensMap: {},
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word']
  },
}

const mdxOptions: MdxOptions = {
  remarkPlugins: [[m2dx, m2dxOptions], [remarkToc, remarkTocOptions], remarkRouteSlug, remarkReadingTime, remarkDebug],
  rehypePlugins: [rehypeTwemoji, [rehypePrettyCode, prettyCodeOptions]],
  extendPlugins: 'astroDefaults', // remark-gfm, remark-smartypants
}

const imageOptions: IntegrationOptions = {
  serviceEntryPoint: '@astrojs/image/sharp',
}

const compressOptions: CompressOptions = {
  img: {
    webp: false,
  },
}

// https://astro.build/config
export default defineConfig({
  site: 'https://neko-astro-blog.vercel.app',
  markdown: {
    syntaxHighlight: false,
  },
  integrations: [
    prefetch(),
    sitemap(),
    robotsTxt(),
    tailwind(),
    solidJs(),
    mdx(mdxOptions),
    image(imageOptions),
    compress(compressOptions),
  ],
})
