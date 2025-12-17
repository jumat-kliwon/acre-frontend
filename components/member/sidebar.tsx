'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BadgeDollarSignIcon,
  BookOpen,
  ChevronDown,
  IdCardIcon,
  LayoutDashboard,
  UserStarIcon,
} from 'lucide-react';
import { useState } from 'react';
import { SidebarItem } from '@/types/slice';
import Image from 'next/image';

const menuItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/member/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Courses',
    href: '/member/courses',
    icon: BookOpen,
  },
  {
    title: 'Subscriptions',
    href: '/member/subscriptions',
    icon: BadgeDollarSignIcon,
  },
  {
    title: 'Certificates',
    href: '/member/certificates',
    icon: IdCardIcon,
  },
  {
    title: 'Affiliate',
    href: '/member/affiliates',
    icon: UserStarIcon,
  },
];

export default function MemberSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="min-w-10 border-r border-white/10">
      <SidebarHeader>
        <div className="flex items-center gap-3 p-4">
          <div className="overflow-hidden">
            <Image
              src="https://akademicreator.com/wp-content/uploads/2024/07/image-2024-07-10T202308.009.webp"
              alt="ACRE Logo"
              width={150}
              height={20}
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="p-2">
          {menuItems.map((item) => {
            if (!item.children) {
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="p-5"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5 text-gray-500" />
                      <div className="text-gray-100">{item.title}</div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }

            return (
              <SidebarCollapsibleMenu
                key={item.href}
                item={item}
                pathname={pathname}
              />
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

// =============================
// COLLAPSIBLE COMPONENT
// =============================

function SidebarCollapsibleMenu({
  item,
  pathname,
}: {
  item: SidebarItem;
  pathname: string;
}) {
  const [open, setOpen] = useState(
    item.children?.some((c) => c.href === pathname) ?? false,
  );

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="space-y-1">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton isActive={pathname.includes(item.href)}>
            <div className="flex items-center justify-between w-full">
              <span>{item.title}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>

        {item.children && (
          <CollapsibleContent className="ml-4 mt-1 space-y-1">
            {item.children.map((child) => (
              <SidebarMenuButton
                key={child.href}
                asChild
                isActive={pathname === child.href}
                className="text-sm"
              >
                <Link href={child.href}>{child.title}</Link>
              </SidebarMenuButton>
            ))}
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
}
