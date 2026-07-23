import { Menu, Search } from 'lucide-react'

import { Button } from '@/app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { SearchInput } from '@/app/components/ui/search-input'
import { APP_NAME } from '@/app/constants'
import { cn } from '@/app/utils'

type AdminHeaderProps = {
  onOpenSidebar?: () => void
  onOpenCommandPalette?: () => void
  className?: string
}

export function AdminHeader({
  onOpenSidebar,
  onOpenCommandPalette,
  className,
}: AdminHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-card/90 px-4 backdrop-blur-lg md:px-6',
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenSidebar}
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </Button>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <img
          src="/xsponse.png"
          alt={APP_NAME}
          className="h-6 w-auto object-contain lg:hidden"
        />
        <SearchInput
          containerClassName="hidden max-w-sm flex-1 md:block"
          placeholder="Search modules..."
          readOnly
          onClick={onOpenCommandPalette}
          onFocus={onOpenCommandPalette}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onOpenCommandPalette}
          aria-label="Open command palette"
        >
          <Search className="size-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Account
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Prototype Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Profile</DropdownMenuItem>
            <DropdownMenuItem disabled>Settings</DropdownMenuItem>
            <DropdownMenuItem disabled>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
