import {
  BadgeCheck,
  Gauge,
  MapPinned,
  MonitorSmartphone,
  Settings,
  Shield,
  Users,
} from 'lucide-react'

import type { AdminNavItem } from '@/app/types'

export const APP_NAME = 'XSPONSE Administration'

export const ADMIN_NAVIGATION: AdminNavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: Gauge,
  },
  {
    label: 'Badge Profiles',
    href: '/badge-profiles',
    icon: BadgeCheck,
    disabled: true,
    badge: 'Soon',
  },
  {
    label: 'Badge Groups',
    href: '/badge-groups',
    icon: Shield,
    disabled: true,
    badge: 'Soon',
  },
  {
    label: 'Devices',
    href: '/devices',
    icon: MonitorSmartphone,
    disabled: true,
    badge: 'Soon',
  },
  {
    label: 'Geofences',
    href: '/geofences',
    icon: MapPinned,
    disabled: true,
    badge: 'Soon',
  },
  {
    label: 'Users',
    href: '/users',
    icon: Users,
    disabled: true,
    badge: 'Soon',
  },
  {
    label: 'Administration',
    href: '/administration',
    icon: Settings,
    disabled: true,
    badge: 'Soon',
  },
]
