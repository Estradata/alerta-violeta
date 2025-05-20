import type { NavItem } from '@/components/app-sidebar'
import { MapPinIcon, UsersIcon } from 'lucide-react'

export const navItems: NavItem[] = [
  {
    title: 'Administradores',
    path: '/app/admins',
    icon: UsersIcon,
    module: 'ADMINS',
  },
  {
    title: 'Usuarios',
    path: '/app/users',
    icon: UsersIcon,
    module: 'USERS',
  },
  {
    title: 'Puntos Violeta',
    path: '/app/safe-points',
    icon: MapPinIcon,
    module: 'SAFE_POINTS',
  },
]
