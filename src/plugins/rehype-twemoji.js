import emojiRegex from 'emoji-regex'
import replaceToArray from 'string-replace-to-array'
import twemoji from 'twemoji'
import { map } from 'unist-util-map'

const defaultTwemojiOptions = {
  baseUrl: 'https://twemoji.maxcdn.com/v/latest',
  size: '72x72',
}

const defaultOptions = {
  exclude: [],
  containerClassName: 'not-prose inline-block h-8 w-8 mx-[1px] align-text-bottom',
  // className: '',
  twemoji: defaultTwemojiOptions,
}

const EmojiRegex = emojiRegex()
const UFE0Fg = /\uFE0F/g
const U200D = String.fromCharCode(0x200d)

function sizeToExtension(size) {
  switch (size) {
    case '72x72':
      return '.png'
    case 'svg':
      return '.svg'
    default:
      throw new Error('Unknown size')
  }
}

function toCodePoint(emoji) {
  return twemoji.convert.toCodePoint(emoji.indexOf(U200D) < 0 ? emoji.replace(UFE0Fg, '') : emoji)
}

function toBaseUrl(codePoint, options) {
  return `${options.baseUrl}/${options.size}/${codePoint}${sizeToExtension(options.size)}`
}

function toUrl(emoji, options) {
  return toBaseUrl(toCodePoint(emoji), options.twemoji)
}

function makeTransformer(options) {
  return (tree) => {
    const mappedChildren = tree.children.map((child) =>
      map(child, (node) => {
        if (node.type !== 'text' || !EmojiRegex.test(node.value)) return node

        const children = replaceToArray(node.value, EmojiRegex, (text) => ({
          emoji: text,
        })).map((segment) =>
          typeof segment === 'string'
            ? {
                type: 'text',
                value: segment,
              }
            : options.exclude.includes(segment.emoji)
            ? {
                type: 'text',
                value: segment.emoji,
              }
            : {
                type: 'element',
                tagName: 'i',
                properties: {
                  className: [options.containerClassName],
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'img',
                    properties: {
                      // className: [options.className],
                      draggable: 'false',
                      alt: segment.emoji,
                      decoding: 'async',
                      loading: 'lazy',
                      width: '72',
                      height: '72',
                      src: toUrl(segment.emoji, options),
                    },
                    children: [],
                  },
                ],
              }
        )

        const result = {
          type: 'element',
          tagName: 'span',
          children,
        }

        return result
      })
    )

    return {
      ...tree,
      children: mappedChildren,
    }
  }
}

function resolveOptions(userOptions) {
  return userOptions
    ? {
        exclude: userOptions.exclude ?? defaultOptions.exclude,
        className: userOptions.className ?? defaultOptions.className,
        twemoji: {
          ...defaultOptions.twemoji,
          ...userOptions.twemoji,
        },
      }
    : defaultOptions
}

const rehypeTwemoji = function (userOptions) {
  const options = resolveOptions(userOptions)
  return makeTransformer(options)
}

export default rehypeTwemoji
