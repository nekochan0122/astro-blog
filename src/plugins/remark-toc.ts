import { resolve } from 'path'
import { toc } from 'mdast-util-toc'
import { shortHash } from '../lib/utils'
import type { Plugin } from 'unified'
import type { Options } from 'mdast-util-toc'

export type RemarkTocOptions = Options

const hash = shortHash(resolve(process.cwd(), 'src/content/_autoimports.ts'))

const remarkToc: Plugin = (options: Options = {}) => {
  return (node: any) => {
    const result = toc(
      node,
      Object.assign({}, options, {
        heading: options.heading || 'toc|table[ -]of[ -]contents?',
      })
    )

    if (result.endIndex === null || result.index === null || result.index === -1 || !result.map) return

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
