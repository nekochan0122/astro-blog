import { clsx, type ClassArray } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cx(...classes: ClassArray): string {
  return twMerge(clsx(classes))
}

export function getFileName(path: string): string {
  return path.match(/([^\/]+)(?=\.\w+$)/)![0]
}
