import type { ComponentType } from 'react'

export type NavItem = {
  label: string
  href: string
  icon?: string
}

export type PageMeta = {
  title: string
  description?: string
}

export type PrimaryNavChild = {
  label: string
  href: string
}

export type PrimaryNavItem = {
  label: string
  href?: string
  icon: ComponentType<{ className?: string }>
  children?: PrimaryNavChild[]
  matchPaths?: string[]
}

export type BreadcrumbItem = {
  label: string
  href?: string
}

export type AdminNavItem = {
  label: string
  href?: string
  icon: ComponentType<{ className?: string }>
  disabled?: boolean
  badge?: string
}
