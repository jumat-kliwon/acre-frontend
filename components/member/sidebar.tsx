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
  Dot,
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
    children: [
      {
        title: 'Content Fundamental',
        href: '/member/courses?courses=content-fundamental',
      },
      {
        title: 'Personal Branding',
        href: '/member/courses?courses=personal-branding',
      },
      { title: 'Algorithm', href: '/member/courses?courses=algorithm' },
      {
        title: 'Video & Editing',
        href: '/member/courses?courses=video-editing',
      },
      {
        title: 'Artificial Intelegence',
        href: '/member/courses?courses=artificial-intelegence',
      },
    ],
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
                      <div className="flex items-center gap-3">
                        <div className="text-gray-100 bg-white rounded-lg h-6 w-6 flex items-center justify-center">
                          <item.icon className="h-3 w-3 text-black" />
                        </div>
                        <div className="text-gray-100">{item.title}</div>
                      </div>
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
    item.children?.some((c) => c.href === pathname) ?? true,
  );

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="space-y-1">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={pathname.includes(item.href)}
            className="p-5"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="text-gray-100 bg-white rounded-lg h-6 w-6 flex items-center justify-center">
                  <item.icon className="h-3 w-3 text-black" />
                </div>
                <span>{item.title}</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>

        {item.children && (
          <CollapsibleContent
            className="
              ml-12 mt-1 space-y-1
              overflow-hidden
              data-[state=open]:animate-collapsible-down
              data-[state=closed]:animate-collapsible-up
            "
          >
            {item.children.map((child) => (
              <SidebarMenuButton
                key={child.href}
                asChild
                isActive={pathname === child.href}
                className="text-sm text-gray-200"
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
