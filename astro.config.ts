import { defineConfig } from 'astro/config'
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

const mdxOptions: MdxOptions = {
  remarkPlugins: [[m2dx, m2dxOptions], [remarkToc, remarkTocOptions], remarkRouteSlug, remarkReadingTime, remarkDebug],
  rehypePlugins: [rehypeTwemoji],
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
    drafts: true,
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
    },
  },
  integrations: [tailwind(), solidJs(), mdx(mdxOptions), image(imageOptions), compress(compressOptions)],
})
