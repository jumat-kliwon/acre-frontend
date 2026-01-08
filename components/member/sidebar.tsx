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
import { SidebarChild, SidebarItem } from '@/types/slice';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { CourseService } from '@/services/course';
import { Category } from '@/services/course/type';

export default function MemberSidebar() {
  const { data: dataCategory, isLoading: loadingDataCategory } = useQuery({
    queryKey: ['dataCategory'],
    queryFn: () => CourseService.getCourseCategory(),
  });

  const mapCategoryToSidebarChildren = (
    categories: Category[] = [],
  ): SidebarChild[] => {
    return categories.map((item) => ({
      title: item.name,
      href: `/member/courses?category=${item.slug}`,
      ...(item.children &&
        item.children.length > 0 && {
          children: mapCategoryToSidebarChildren(item.children),
        }),
    }));
  };

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
      children: mapCategoryToSidebarChildren(dataCategory?.data ?? []),
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

function SidebarRecursiveChild({
  item,
  pathname,
  level = 0,
}: {
  item: SidebarChild;
  pathname: string;
  level?: number;
}) {
  const hasChildren = !!item.children?.length;
  const [open, setOpen] = useState(hasChildren);

  // 👉 LEAF
  if (!hasChildren) {
    return (
      <SidebarMenuButton
        asChild
        isActive={pathname === item.href}
        className="text-sm text-gray-200"
        style={{ paddingLeft: `${16}px` }}
      >
        <Link href={item.href}>{item.title}</Link>
      </SidebarMenuButton>
    );
  }

  // 👉 NODE WITH CHILDREN
  return (
    <div>
      <div
        className="flex items-center justify-between"
        style={{ paddingLeft: `${16}px` }}
      >
        {/* LINK */}
        <SidebarMenuButton
          asChild
          isActive={pathname.startsWith(item.href)}
          className="text-sm text-gray-200 flex-1 p-0"
        >
          <Link href={item.href} className="block truncate">
            {item.title}
          </Link>
        </SidebarMenuButton>

        {/* CHEVRON */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="p-1 text-gray-400 hover:text-white"
        >
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* 🔥 ANIMATED COLLAPSE */}
      <div
        className={`
          ml-3 overflow-hidden transition-all duration-300 ease-in-out
          ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="space-y-1">
          {item.children!.map((child) => (
            <SidebarRecursiveChild
              key={child.href}
              item={child}
              pathname={pathname}
              level={level + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
              ml-6 mt-1 space-y-1
              overflow-hidden
              data-[state=open]:animate-collapsible-down
              data-[state=closed]:animate-collapsible-up
            "
          >
            {item.children.map((child) => (
              <SidebarRecursiveChild
                key={child.href}
                item={child}
                pathname={pathname}
              />
            ))}
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
}
