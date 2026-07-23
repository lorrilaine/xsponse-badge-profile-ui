import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { UserAvatarIcon } from '@/app/components/layout/icons/header-icons'
import { LOGGED_IN_ROLE } from '@/app/constants'
import { cn } from '@/app/utils'

type UserMenuProps = {
  className?: string
}

export function UserMenu({ className }: UserMenuProps) {
  return (
    <div className={cn('ps-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex cursor-pointer items-center rounded-full focus-visible:outline-none focus-visible:ring-0"
            aria-label="Open user menu"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-default-100">
              <UserAvatarIcon />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="capitalize">
            {LOGGED_IN_ROLE}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Profile</DropdownMenuItem>
          <DropdownMenuItem disabled>Settings</DropdownMenuItem>
          <DropdownMenuItem disabled>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
