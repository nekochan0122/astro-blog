import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'
import type { Plugin } from 'unified'

const remarkReadingTime: Plugin = () => {
  return (node, { data }: any) => {
    data.astro.frontmatter.minutesRead = getReadingTime(toString(node)).text
  }
}

export default remarkReadingTime
