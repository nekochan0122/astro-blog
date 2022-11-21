import { createSignal } from 'solid-js'
import { cx } from '@/lib/utils'
import type { JSXElement } from 'solid-js'

interface Props {
  children: JSXElement
}

export default function Spoiler({ children }: Props) {
  const [show, setShow] = createSignal(false)

  return (
    <span
      class={cx(
        'relative inline-block touch-manipulation transition-[filter] duration-300 will-change-[filter]',
        show() ? 'blur-none' : 'blur'
      )}
      onClick={() => setShow(true)}
      {...(!show() && { title: 'Click to reveal', role: 'button' })}
    >
      {children}
      <span
        class={cx(
          'absolute inset-0 bg-gray-600/95 transition-opacity duration-300 dark:bg-gray-300/95',
          show() && 'opacity-0'
        )}
      />
    </span>
  )
}
