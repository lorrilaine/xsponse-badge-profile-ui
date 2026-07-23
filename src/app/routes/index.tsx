import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import { AdminLayout } from '@/app/components/layout'
import { ToastProvider } from '@/app/components/ui/toast'
import { TooltipProvider } from '@/app/components/ui/tooltip'
import { BadgeProfileManagementPage } from '@/app/pages/BadgeProfileManagementPage'
import { DashboardPage } from '@/app/pages/DashboardPage'
import { EmptyContentPage } from '@/app/pages/EmptyContentPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <ToastProvider>
          <Routes>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="document-library" element={<EmptyContentPage />} />
              <Route path="update-manager" element={<EmptyContentPage />} />
              <Route path="e-mapping" element={<EmptyContentPage />} />
              <Route path="badge-profiles" element={<BadgeProfileManagementPage />} />
              <Route path="logs-history" element={<EmptyContentPage />} />
              <Route path="releases/release-notes" element={<EmptyContentPage />} />
              <Route path="help-support" element={<EmptyContentPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </ToastProvider>
      </TooltipProvider>
    </BrowserRouter>
  )
}
