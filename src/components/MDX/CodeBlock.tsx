import { createSignal, createEffect } from 'solid-js'
import { cx } from '@/lib/utils'
import type { JSX } from 'solid-js'

export default function CodeBlock({ children, ...rest }: JSX.HTMLAttributes<HTMLPreElement>) {
  const [copyText, setCopyText] = createSignal('')
  const [copied, setCopied] = createSignal(false)

  let preRef: HTMLPreElement | undefined

  createEffect(() => {
    if (!preRef) return

    const code = preRef.querySelector('code')?.textContent
    if (code) setCopyText(code)
  })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyText())

    setCopied(true)
    window.setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div class='group relative'>
      <pre ref={preRef} {...rest}>
        <button
          type='button'
          title='Copy to clipboard'
          class={cx(
            'absolute top-0 right-0 m-1.5 flex h-9 w-9 touch-manipulation items-center justify-center rounded-md bg-gray-200 text-gray-800 opacity-0 ring-gray-300 transition-all hover:ring-2 group-hover:opacity-100 dark:bg-gray-600 dark:text-gray-200 lg:m-4',
            copied() &&
              'text-green-400 ring-2 ring-green-400 dark:text-green-600 dark:ring-green-700'
          )}
          onClick={copyToClipboard}
        >
          <svg viewBox='0 0 16 16' version='1.1' width='16' height='16'>
            {copied() ? (
              <path
                fill='currentColor'
                fill-rule='evenodd'
                d='M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z'
              />
            ) : (
              <>
                <path
                  fill='currentColor'
                  fill-rule='evenodd'
                  d='M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z'
                />
                <path
                  fill='currentColor'
                  fill-rule='evenodd'
                  d='M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z'
                />
              </>
            )}
          </svg>
        </button>
        {children}
      </pre>
    </div>
  )
}
