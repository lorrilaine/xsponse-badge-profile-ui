import { Outlet } from 'react-router'

import { Header } from '@/app/components/layout/Header'
import { MAIN_CONTENT_CLASS } from '@/app/components/layout/layout-tokens'

export function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className={MAIN_CONTENT_CLASS}>
        <Outlet />
      </main>
    </div>
  )
}
