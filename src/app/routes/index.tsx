import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router'

import { AdminLayout } from '@/app/components/layout'
import { ToastProvider } from '@/app/components/ui/toast'
import { TooltipProvider } from '@/app/components/ui/tooltip'
import { BadgeProfileProvider } from '@/app/features/badge-profiles/BadgeProfileProvider'
import { BadgeProfileManagementPage } from '@/app/pages/BadgeProfileManagementPage'
import { CreateBadgeProfilePage } from '@/app/pages/CreateBadgeProfilePage'
import { DashboardPage } from '@/app/pages/DashboardPage'
import { EmptyContentPage } from '@/app/pages/EmptyContentPage'

function BadgeProfileFormRoute() {
  const { profileId } = useParams()
  return <CreateBadgeProfilePage key={profileId ?? 'create'} />
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <ToastProvider>
          <BadgeProfileProvider>
            <Routes>
              <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="document-library" element={<EmptyContentPage />} />
              <Route path="update-manager" element={<EmptyContentPage />} />
              <Route path="e-mapping" element={<EmptyContentPage />} />
              <Route path="badge-profiles" element={<BadgeProfileManagementPage />} />
              <Route path="badge-profiles/create" element={<BadgeProfileFormRoute />} />
              <Route
                path="badge-profiles/:profileId/edit"
                element={<BadgeProfileFormRoute />}
              />
              <Route path="logs-history" element={<EmptyContentPage />} />
              <Route path="releases/release-notes" element={<EmptyContentPage />} />
              <Route path="help-support" element={<EmptyContentPage />} />
            </Route>

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BadgeProfileProvider>
        </ToastProvider>
      </TooltipProvider>
    </BrowserRouter>
  )
}
