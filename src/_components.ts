// @ts-nocheck
import CodeBlock from '@/components/MDX/CodeBlock.astro'
import Image from '@/components/MDX/Image.astro'
import Anchor from '@/components/MDX/Anchor.astro'
import ListItem from '@/components/MDX/ListItem.astro'

export const components = {
  pre: CodeBlock,
  img: Image,
  a: Anchor,
  li: ListItem,
}
