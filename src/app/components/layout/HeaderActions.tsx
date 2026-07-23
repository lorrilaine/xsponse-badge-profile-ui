import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import {
  ScanFocusIcon,
  SettingsIcon,
  SunIcon,
} from '@/app/components/layout/icons/header-icons'
import { HEADER_ACTION_BUTTON_CLASS } from '@/app/components/layout/layout-tokens'
import { cn } from '@/app/utils'

type HeaderActionsProps = {
  className?: string
}

export function HeaderActions({ className }: HeaderActionsProps) {
  return (
    <div className={cn('nav-tools flex items-center gap-2', className)}>
      <button
        type="button"
        className={HEADER_ACTION_BUTTON_CLASS}
        aria-label="Focus mode"
      >
        <ScanFocusIcon />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={HEADER_ACTION_BUTTON_CLASS}
            aria-label="Settings"
          >
            <SettingsIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Preferences</DropdownMenuItem>
          <DropdownMenuItem disabled>Notifications</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        type="button"
        className={HEADER_ACTION_BUTTON_CLASS}
        aria-label="Toggle theme"
      >
        <SunIcon />
      </button>
    </div>
  )
}
