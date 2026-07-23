import { EmptyState } from '@/app/components/ui/empty-state'
import { PageHeader } from '@/app/components/layout'

export function HomePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Administration Portal"
        description="Shared XSPONSE UI foundation for administration modules."
      />

      <EmptyState
        title="Foundation ready"
        description="Select a module from the sidebar when feature routes are added. Disabled items represent future administration modules."
      />
    </div>
  )
}
