import { createSignal } from 'solid-js'

export function Counter() {
  const [count, setCount] = createSignal(0)

  const add = () => setCount((i) => i + 1)

  return (
    <div class='flex gap-x-4'>
      <button class='rounded py-2 px-3 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800' onClick={add}>
        the count is <span class='inline-block min-w-[2ch]'>{count()}</span>
      </button>
    </div>
  )
}

export default Counter
