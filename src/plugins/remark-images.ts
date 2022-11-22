import isUrl from 'is-url'
import { visitParents } from 'unist-util-visit-parents'
import { is } from 'unist-util-is'
import type { Image } from 'mdast'
import type { Plugin } from 'unified'

const isImgPath = (value: string) =>
  value.startsWith('/') || value.startsWith('./') || value.startsWith('../') || value.startsWith('@/')

/**
 * Extensions recognized as images by default
 */
export const imageExtensions = ['svg', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif']

/**
 * Plugin to add a simpler image syntax.
 */
export default function remarkImages(): Plugin {
  const imgExtRegex = new RegExp(`\\.(${imageExtensions.join('|')})$`)
  const isImgExt = (value: string) => imgExtRegex.test(value)

  return (tree) => {
    visitParents(tree, 'text', (node, parents) => {
      const value = String(node.value).trim()

      if ((isUrl(value) || isImgPath(value)) && isImgExt(value)) {
        let interactive = false
        let length = parents.length
        const parent = parents[length - 1]
        const siblings = parent.children
        const index = siblings.indexOf(node)

        // Check if we’re in interactive content.
        while (length--) {
          if (is(parents[length], ['link', 'linkReference'])) {
            interactive = true
            break
          }
        }

        const url = value.startsWith('@/') ? value.replace('@/', '../../') : value

        const image: Image = {
          type: 'image',
          url,
          alt: 'image',
          position: node.position,
        }

        siblings[index] = image
      }
    })
  }
}
