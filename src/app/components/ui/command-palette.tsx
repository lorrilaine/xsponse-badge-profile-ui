import { useEffect } from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/app/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog'
import type { AdminNavItem } from '@/app/types'

type CommandPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  navigation: AdminNavItem[]
  onNavigate?: (href: string) => void
}

export function CommandPalette({
  open,
  onOpenChange,
  navigation,
  onNavigate,
}: CommandPaletteProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpenChange(!open)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onOpenChange, open])

  const enabledItems = navigation.filter((item) => !item.disabled && item.href)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-lg" showCloseButton>
        <DialogHeader className="sr-only">
          <DialogTitle>Command palette</DialogTitle>
          <DialogDescription>Search navigation and actions</DialogDescription>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Search modules..." />
          <CommandList>
            <CommandEmpty>No modules found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              {enabledItems.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.label}
                  onSelect={() => {
                    if (item.href) {
                      onNavigate?.(item.href)
                      onOpenChange(false)
                    }
                  }}
                >
                  <item.icon className="me-2 size-4 text-muted-foreground" />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem
                value="Close command palette"
                onSelect={() => onOpenChange(false)}
              >
                Close
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
