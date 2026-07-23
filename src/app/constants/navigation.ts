import { IdCard } from 'lucide-react'

import type { PrimaryNavItem } from '@/app/types'

import {
  AccountsNavIcon,
  BillingNavIcon,
  DashboardNavIcon,
  DocumentLibraryNavIcon,
  HelpSupportNavIcon,
  LogsHistoryNavIcon,
  MappingNavIcon,
  ProductsNavIcon,
  ReleasesNavIcon,
  UpdateManagerNavIcon,
} from '@/app/components/layout/icons/navigation-icons'

export const APP_NAME = 'XSPONSE Administration'

export const LOGGED_IN_ROLE = 'Administrator'

export const PRIMARY_NAVIGATION: PrimaryNavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: DashboardNavIcon,
  },
  {
    label: 'Accounts',
    icon: AccountsNavIcon,
    children: [],
  },
  {
    label: 'Products',
    icon: ProductsNavIcon,
    children: [],
  },
  {
    label: 'Billing & Licenses',
    icon: BillingNavIcon,
    children: [],
  },
  {
    label: 'Document Library',
    href: '/document-library',
    icon: DocumentLibraryNavIcon,
  },
  {
    label: 'Update Manager',
    href: '/update-manager',
    icon: UpdateManagerNavIcon,
  },
  {
    label: 'Mapping',
    href: '/e-mapping',
    icon: MappingNavIcon,
  },
  {
    label: 'Badge Profiles',
    href: '/badge-profiles',
    icon: IdCard,
    matchPaths: ['/badge-profiles'],
  },
  {
    label: 'Logs & History',
    href: '/logs-history',
    icon: LogsHistoryNavIcon,
  },
  {
    label: 'Releases',
    href: '/releases/release-notes',
    icon: ReleasesNavIcon,
    matchPaths: ['/releases'],
  },
  {
    label: 'Help & Support',
    href: '/help-support',
    icon: HelpSupportNavIcon,
  },
]

export const ADMIN_NAVIGATION = PRIMARY_NAVIGATION.filter(
  (item): item is PrimaryNavItem & { href: string } => Boolean(item.href),
).map((item) => ({
  label: item.label,
  href: item.href,
  icon: item.icon,
}))
