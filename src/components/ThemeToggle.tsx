import { createSignal, createEffect, onMount } from 'solid-js'

enum Theme {
  KeyName = 'theme',
  Light = 'light',
  Dark = 'dark',
}

export default function ThemeToggle() {
  const [theme, setTheme] = createSignal(Theme.Light)
  const [mounted, setMounted] = createSignal(false)

  const handleClick = () => {
    setTheme(theme() === Theme.Light ? Theme.Dark : Theme.Light)
  }

  createEffect(() => {
    document.documentElement.setAttribute('style', `color-scheme: ${theme()};`)
    document.documentElement.setAttribute('data-theme', theme())
    localStorage.setItem(Theme.KeyName, theme())
  })

  onMount(() => {
    console.log('@')
    setMounted(true)
  })

  return <button onClick={handleClick}>{mounted() ? (theme() === Theme.Light ? '🌞' : '🌙') : ''}</button>
}
