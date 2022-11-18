// @ts-nocheck
import Heading2 from '@/components/MDX/Heading2.astro'
import Heading3 from '@/components/MDX/Heading3.astro'
import Heading4 from '@/components/MDX/Heading4.astro'
import CodeBlock from '@/components/MDX/CodeBlock.astro'
import Image from '@/components/MDX/Image.astro'
import Anchor from '@/components/MDX/Anchor.astro'

export const components = {
  h1: Heading2,
  h2: Heading3,
  h3: Heading4,
  pre: CodeBlock,
  img: Image,
  a: Anchor,
}
