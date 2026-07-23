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

export type AdminNavItem = {
  label: string
  href?: string
  icon: ComponentType<{ className?: string }>
  disabled?: boolean
  badge?: string
}

export type BreadcrumbItem = {
  label: string
  href?: string
}
