import { createSignal, createEffect } from 'solid-js'
import gsap from 'gsap'
import { cx } from '@/lib/utils'
import type { JSXElement } from 'solid-js'

export interface CollapseProps {
  header: string
  children: JSXElement
}

export default function Collapse({ header, children: content }: CollapseProps) {
  const [isOpen, setIsOpen] = createSignal(false)

  let iconRef: SVGSVGElement | undefined
  let contentRef: HTMLDivElement | undefined

  createEffect(() => {
    if (!iconRef || !contentRef) return

    gsap.to(iconRef, { rotate: isOpen() ? 180 : 0, duration: 0.3 })
    gsap.to(contentRef, { height: isOpen() ? 'auto' : 0, duration: 0.3 })
  })

  const toggle = () => setIsOpen(!isOpen())

  return (
    <div class='my-8 overflow-hidden rounded'>
      <button
        type='button'
        class={cx(
          'flex w-full touch-manipulation items-center justify-between bg-[#e5e7eb] py-2 px-4 text-xl transition-[background-color] duration-300 dark:bg-[#161b22]',
          isOpen() && 'bg-[#d1d5db] dark:bg-[#1f2937]'
        )}
        onClick={toggle}
      >
        <span>{header}</span>
        <svg
          ref={iconRef}
          class='hidden sm:inline-block'
          stroke='currentColor'
          fill='currentColor'
          stroke-width='0'
          version='1'
          viewBox='0 0 48 48'
          enable-background='new 0 0 48 48'
          height='1em'
          width='1em'
        >
          <polygon fill='#2196F3' points='5,30.9 8.1,34 24,18.1 39.9,34 43,30.9 24,12'></polygon>
        </svg>
      </button>
      <div ref={contentRef} class='h-0 overflow-hidden bg-[#e5e7eb]/50 dark:bg-[#161b22]/70'>
        <div class='m-4'>{content}</div>
      </div>
    </div>
  )
}
