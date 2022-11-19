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
        'relative inline-block touch-manipulation transition-[filter] duration-300',
        show() ? 'blur-none' : 'blur-lg'
      )}
      onClick={() => setShow(!show())}
    >
      {children}
      <span
        class={cx(
          'absolute left-0 top-0 h-full w-full backdrop-blur-3xl  backdrop-brightness-125 transition-opacity duration-300',
          show() && 'opacity-0'
        )}
        {...(!show() && { title: 'Click to reveal', role: 'button' })}
      />
    </span>
  )
}
