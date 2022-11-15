import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'

export default function remarkReadingTime() {
  return (tree, { data }) => {
    data.astro.frontmatter.minutesRead = getReadingTime(toString(tree))
  }
}
