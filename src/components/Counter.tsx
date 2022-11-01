import { createSignal, type JSX } from 'solid-js'
import { cx } from '@/lib/utils'

interface Props {
  children?: JSX.Element
}

export function Counter(props: Props) {
  const [count, setCount] = createSignal(0)
  const add = () => setCount((i) => i + 1)
  const subtract = () => setCount((i) => i - 1)

  return (
    <>
      <div class={cx('flex', 'gap-x-4')}>
        <button onClick={subtract}>-</button>
        <p>{count()}</p>
        <button onClick={add}>+</button>
      </div>
      <div>{props.children}</div>
    </>
  )
}

export default Counter
