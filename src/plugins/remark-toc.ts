import { toc } from 'mdast-util-toc'
import type { Plugin } from 'unified'
import type { Options } from 'mdast-util-toc'

export type RemarkTocOptions = Options

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
        name: 'AutoImport1.Collapse',
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
