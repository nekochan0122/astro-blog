import { SEO } from 'config'
import rss from '@astrojs/rss'
import type { MarkdownLayoutProps } from 'astro'
import type { Frontmatter } from '@/types'

interface MdxProps extends MarkdownLayoutProps<Frontmatter> {
  url: string
}

const postImportResult = import.meta.glob<MdxProps>('./blog/*.mdx', { eager: true })
const posts = Object.values(postImportResult)
const nonDraftPosts = posts.filter(({ frontmatter }) => !frontmatter.draft)
const sortedPosts = nonDraftPosts.sort(
  ({ frontmatter: { publishedAt: a } }, { frontmatter: { publishedAt: b } }) =>
    new Date(b).valueOf() - new Date(a).valueOf()
)

export const get = () =>
  rss({
    title: SEO.title,
    description: 'NekoChan - Full Stack Web Developer',
    site: import.meta.env.SITE,
    items: sortedPosts.map(({ url, frontmatter }) => ({
      link: url,
      title: frontmatter.title,
      description: frontmatter.description,
      pubDate: new Date(frontmatter.publishedAt),
    })),
    customData: `<language>${SEO.locale.toLowerCase()}</language>`,
  })
