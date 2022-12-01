import { resolve } from 'path'
import { toc } from 'mdast-util-toc'
import type { Plugin } from 'unified'
import type { Options } from 'mdast-util-toc'

export type RemarkTocOptions = Options

const hash = shortHash(resolve(process.cwd(), 'src/_autoimports.ts'))

const remarkToc: Plugin = (options: Options = { tight: true }) => {
  return (node: any) => {
    const result = toc(
      node,
      Object.assign({}, options, {
        heading: options.heading || 'toc|table[ -]of[ -]contents?',
      })
    )

    if (result.endIndex === null || result.index === null || result.index === -1 || !result.map)
      return

    node.children = [
      {
        type: 'mdxJsxFlowElement',
        name: `Autoimports__${hash}.Collapse`,
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'header',
            value: 'Table of Contents',
          },
        ],
        children: [result.map],
        data: { _mdxExplicitJsx: true },
      },
      ...node.children.slice(result.endIndex),
    ]
  }
}

export default remarkToc

function shortHash(data: unknown) {
  const str = typeof data === 'string' ? data : JSON.stringify(data)
  const seed = 0
  let h1 = 0xdeadbeef ^ seed
  let h2 = 0x41c6ce57 ^ seed

  for (let i = 0, ch: number; i < str.length; i++) {
    ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)

  const h3 = 4294967296 * (2097151 & h2) + (h1 >>> 0)
  return 't' + h3.toString(32)
}
