import { NavLink, useLocation } from 'react-router'

import { NavChevronIcon } from '@/app/components/layout/icons/navigation-icons'
import {
  NAV_CHEVRON_CLASS,
  NAV_DROPDOWN_TRIGGER_CLASS,
  NAV_ICON_CLASS,
  NAV_LINK_CLASS,
} from '@/app/components/layout/layout-tokens'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import type { PrimaryNavItem } from '@/app/types'
import { cn } from '@/app/utils'

type NavigationItemProps = {
  item: PrimaryNavItem
}

function isItemActive(item: PrimaryNavItem, pathname: string) {
  if (item.href) {
    if (item.href === pathname) {
      return true
    }

    return Boolean(
      item.matchPaths?.some((path) => pathname.startsWith(path)),
    )
  }

  return false
}

export function NavigationItem({ item }: NavigationItemProps) {
  const location = useLocation()
  const isActive = isItemActive(item, location.pathname)
  const Icon = item.icon
  const hasChildren = Boolean(item.children)
  const activeClassName = isActive ? 'text-primary' : undefined

  if (hasChildren) {
    const trigger = (
      <button
        type="button"
        className={cn(NAV_DROPDOWN_TRIGGER_CLASS, activeClassName)}
      >
        <Icon className={NAV_ICON_CLASS} />
        <span>{item.label}</span>
        <NavChevronIcon className={NAV_CHEVRON_CLASS} />
      </button>
    )

    if (!item.children?.length) {
      return <li className="relative shrink-0">{trigger}</li>
    }

    return (
      <li className="relative shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-48">
            {item.children.map((child) => (
              <DropdownMenuItem key={child.href}>
                <NavLink to={child.href}>{child.label}</NavLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    )
  }

  if (!item.href) {
    return null
  }

  return (
    <li className="relative shrink-0">
      <NavLink
        to={item.href}
        className={({ isActive: navIsActive }) =>
          cn(NAV_LINK_CLASS, (navIsActive || isActive) && 'text-primary')
        }
      >
        <Icon className={NAV_ICON_CLASS} />
        <span>{item.label}</span>
      </NavLink>
    </li>
  )
}
