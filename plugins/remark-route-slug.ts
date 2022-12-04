import type { Plugin } from 'unified'

const remarkRouteSlug: Plugin = () => {
  return (_, { data, history }: any) => {
    data.astro.frontmatter.slug = history[0].match(/([^\/]+)(?=\.\w+$)/)[0]
  }
}

export default remarkRouteSlug
