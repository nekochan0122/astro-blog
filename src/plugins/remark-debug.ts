import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'

const remarkDebug: Plugin = () => {
  return (tree, file) => {
    // visit(tree, (node) => {
    //   console.log(node)
    // })
  }
}

export default remarkDebug
