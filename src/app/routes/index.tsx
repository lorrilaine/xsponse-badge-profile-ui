import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import { AdminLayout } from '@/app/components/layout'
import { ToastProvider } from '@/app/components/ui/toast'
import { TooltipProvider } from '@/app/components/ui/tooltip'
import { HomePage } from '@/app/pages/HomePage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <ToastProvider>
          <Routes>
            <Route element={<AdminLayout />}>
              <Route index element={<HomePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </TooltipProvider>
    </BrowserRouter>
  )
}
