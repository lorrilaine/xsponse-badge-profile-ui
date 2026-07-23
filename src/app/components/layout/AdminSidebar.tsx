import { NavLink } from 'react-router'

import { Badge } from '@/app/components/ui/badge'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { Separator } from '@/app/components/ui/separator'
import { APP_NAME, ADMIN_NAVIGATION } from '@/app/constants'
import { cn } from '@/app/utils'

type AdminSidebarProps = {
  onNavigate?: () => void
  className?: string
}

export function AdminSidebar({ onNavigate, className }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-full w-64 shrink-0 flex-col border-r border-border bg-card',
        className,
      )}
    >
      <div className="flex h-14 items-center border-b border-border px-4">
        <img
          src="/xsponse-logo.png"
          alt={APP_NAME}
          className="h-5 w-32 object-contain"
        />
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {ADMIN_NAVIGATION.map((item) => {
            if (item.disabled || !item.href) {
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground opacity-60"
                  aria-disabled="true"
                >
                  <item.icon className="size-4 shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge ? (
                    <Badge variant="secondary" className="text-[10px]">
                      {item.badge}
                    </Badge>
                  ) : null}
                </div>
              )
            }

            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )
                }
              >
                <item.icon className="size-4 shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </ScrollArea>

      <div className="px-4 py-4">
        <Separator className="mb-4" />
        <p className="text-xs text-muted-foreground">XSPONSE Administration Portal</p>
      </div>
    </aside>
  )
}
