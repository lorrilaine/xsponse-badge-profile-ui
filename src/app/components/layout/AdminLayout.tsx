import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { AdminHeader } from '@/app/components/layout/AdminHeader'
import { AdminSidebar } from '@/app/components/layout/AdminSidebar'
import { CommandPalette } from '@/app/components/ui/command-palette'
import { Sheet, SheetContent } from '@/app/components/ui/sheet'
import { ADMIN_NAVIGATION } from '@/app/constants'
import { useIsMobile } from '@/app/hooks'

export function AdminLayout() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  return (
    <>
      <div className="flex min-h-screen bg-background">
        <div className="hidden lg:block">
          <AdminSidebar className="fixed inset-y-0 start-0 z-30" />
        </div>

        <div className="flex min-h-screen flex-1 flex-col lg:ms-64">
          <AdminHeader
            onOpenSidebar={() => setMobileNavOpen(true)}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          />

          <main className="flex-1 px-4 py-6 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>

      <Sheet open={isMobile && mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-64 p-0" showCloseButton={false}>
          <AdminSidebar onNavigate={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>

      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
        navigation={ADMIN_NAVIGATION}
        onNavigate={(href) => navigate(href)}
      />
    </>
  )
}
