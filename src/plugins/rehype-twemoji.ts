import emojiRegex from 'emoji-regex'
import replaceToArray from 'string-replace-to-array'
import twemoji from 'twemoji'
import { map } from 'unist-util-map'
import type { Plugin, Transformer } from 'unified'
import type { Content, ElementContent, Root, RootContent } from 'hast'

interface TwemojiOptions {
  baseUrl?: string
  size?: '72x72' | 'svg'
}

interface UserOptions {
  exclude?: Array<string>
  className?: string
  twemoji: TwemojiOptions
}

const options: UserOptions = {
  exclude: [],
  className: 'not-prose inline-block h-8 w-8 mx-[1px] align-text-bottom',
  twemoji: {
    baseUrl: 'https://twemoji.maxcdn.com/v/latest',
    size: '72x72',
  },
}

const EmojiRegex = emojiRegex()
const UFE0Fg = /\uFE0F/g
const U200D = String.fromCharCode(0x200d)

function sizeToExtension(size: TwemojiOptions['size']) {
  switch (size) {
    case '72x72':
      return '.png'
    case 'svg':
      return '.svg'
    default:
      throw new Error('Unknown size')
  }
}

function toCodePoint(emoji: string) {
  return twemoji.convert.toCodePoint(emoji.indexOf(U200D) < 0 ? emoji.replace(UFE0Fg, '') : emoji)
}

function toBaseUrl(codePoint: string, options: TwemojiOptions) {
  return `${options.baseUrl}/${options.size}/${codePoint}${sizeToExtension(options.size)}`
}

function toUrl(emoji: string, options: UserOptions) {
  return toBaseUrl(toCodePoint(emoji), options.twemoji)
}

function makeTransformer(options: UserOptions): Transformer<Root, Root> {
  return (tree: Root) => {
    const mappedChildren = tree.children.map(
      (child) =>
        map(child, (node) => {
          if (node.type !== 'text' || !EmojiRegex.test(node.value)) {
            return node
          }

          const children = replaceToArray(node.value, EmojiRegex, (text) => ({ emoji: text })).map(
            (segment) =>
              typeof segment === 'string'
                ? {
                    type: 'text',
                    value: segment,
                  }
                : {
                    type: 'element',
                    tagName: 'i',
                    properties: {
                      className: [options.className],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'img',
                        properties: {
                          src: toUrl(segment.emoji, options),
                          alt: segment.emoji,
                          width: '72',
                          height: '72',
                          loading: 'lazy',
                          decoding: 'async',
                          draggable: 'false',
                          'data-emoji': segment.emoji,
                        },
                        children: [],
                      },
                    ],
                  }
          )

          const result: Content = {
            type: 'element',
            tagName: 'span',
            children: children as ElementContent[],
          }

          return result
        }) as RootContent
    )

    return {
      ...tree,
      children: mappedChildren,
    }
  }
}

const rehypeTwemoji: Plugin<[], Root, Root> = () => makeTransformer(options)

export default rehypeTwemoji
