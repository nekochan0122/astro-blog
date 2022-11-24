export interface Frontmatter {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  tags?: string[]
  slug: string
  minutesRead: string
  draft?: boolean
}
