import { createSignal } from 'solid-js'

export function Counter() {
  const [count, setCount] = createSignal(0)
  const add = () => setCount((i) => i + 1)
  const subtract = () => setCount((i) => i - 1)

  return (
    <div class='flex gap-x-4'>
      <button onClick={subtract}>-</button>
      <p>{count()}</p>
      <button onClick={add}>+</button>
    </div>
  )
}

export default Counter
