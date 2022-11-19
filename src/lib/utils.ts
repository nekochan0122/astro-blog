import { clsx, type ClassArray } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cx(...classes: ClassArray): string {
  return twMerge(clsx(classes))
}

export function toISODate(date: string): string {
  return new Date(date).toISOString()
}

export function toLocalDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
