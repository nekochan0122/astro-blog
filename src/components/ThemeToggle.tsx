import { createSignal, createEffect, onMount } from 'solid-js'

enum Theme {
  KeyName = 'theme',
  Light = 'light',
  Dark = 'dark',
}

export default function ThemeToggle() {
  const [theme, setTheme] = createSignal(localStorage.getItem('theme') ?? 'light')
  const [mounted, setMounted] = createSignal(false)

  const handleClick = () => {
    setTheme(theme() === Theme.Light ? Theme.Dark : Theme.Light)
  }

  createEffect(() => {
    if (!mounted()) return
    document.documentElement.setAttribute('style', `color-scheme: ${theme()};`)
    document.documentElement.setAttribute('data-theme', theme())
    localStorage.setItem(Theme.KeyName, theme())
  })

  onMount(() => setMounted(true))

  return <button onClick={handleClick}>{mounted() ? (theme() === Theme.Light ? '🌞' : '🌙') : ''}</button>
}
