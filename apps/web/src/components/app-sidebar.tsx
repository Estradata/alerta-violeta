'use client'

import * as React from 'react'
import {
  type LucideProps,
  ChevronRight,
  ActivityIcon,
  ShieldIcon,
  MapPinIcon,
  UsersIcon,
  XIcon,
} from 'lucide-react'

import { NavUser } from '@/components/nav-user'
// import { BranchSwitcher } from '@/components/branch-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import type { AuthUser } from '@packages/auth/types'
import { Link, type FileRoutesByPath } from '@tanstack/react-router'

type Item = {
  title: string
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  url: keyof FileRoutesByPath
  items?: Item[]
}

const items: Item[] = [
  {
    title: 'Administradores',
    url: '/app/admins',
    icon: UsersIcon,
  },
  {
    title: 'Usuarios',
    url: '/app/users',
    icon: UsersIcon,
  },
  {
    title: 'Puntos Violeta',
    url: '/app/safe-points',
    icon: MapPinIcon,
  },
  {
    title: '',
    url: '/app/safe-points',
    icon: XIcon,
  },
  {
    title: 'Monitoreo',
    url: '/app/monitoring',
    icon: ActivityIcon,
  },
  {
    title: 'Directorio de Seguridad',
    url: '/app/emergency-contacts',
    icon: ShieldIcon,
  },
]

export function AppSidebar({ user }: { user: AuthUser }) {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        {/* <BranchSwitcher gym={gym} /> */}
        <p>aqui va algo</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Aplicación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.items) {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      // defaultOpen={item.isActive}
                      className='group/collapsible'
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link to={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
