import type { Plugin } from 'unified'

const remarkTags: Plugin = () => {
  return (_, { data }: any) => {
    const tags = data.astro.frontmatter.tags
    data.astro.frontmatter.tags = Array.isArray(tags) && tags.length > 0 ? tags : ['untagged']
  }
}

export default remarkTags
