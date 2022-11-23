// @ts-nocheck
import Heading2 from '@/components/MDX/Heading2.astro'
import Heading3 from '@/components/MDX/Heading3.astro'
import Heading4 from '@/components/MDX/Heading4.astro'
import Image from '@/components/MDX/Image.astro'
import Anchor from '@/components/MDX/Anchor.astro'
import ListItem from '@/components/MDX/ListItem.astro'
import CodeBlock from '@/components/MDX/CodeBlock.astro'

export const components = {
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  img: Image,
  a: Anchor,
  li: ListItem,
  pre: CodeBlock,
}
