'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BadgeDollarSignIcon,
  BookOpen,
  ChevronDown,
  Dot,
  IdCardIcon,
  LayoutDashboard,
  UserStarIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { SidebarChild, SidebarItem } from '@/types/slice';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { CourseService } from '@/services/course';
import { Category } from '@/services/course/type';
import { useIsMobile } from '@/hooks/use-mobile';

export default function MemberSidebar() {
  const { open, setOpen } = useSidebar();
  const isMobile = useIsMobile();
  const router = useRouter();
  const [childList, setChildList] = useState<SidebarChild[]>([]);
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

  const showChildMenu = () => {
    return (
      <div
        className={`${
          !isMobile ? 'ml-10 border-r border-white/10 h-full w-64' : ''
        }`}
      >
        <div className="pt-5">
          <div className="font-bold text-orange-500 ml-6 mb-6">
            Courses List
          </div>
          <div className="p-2 space-y-1">
            {childList.map((item) => (
              <ChildItem key={item.href} item={item} pathname={pathname} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Sidebar collapsible="icon" className="min-w-10 border-r border-white/10">
        <SidebarHeader>
          <div className="flex items-center gap-3 p-4">
            <div className="overflow-hidden">
              <Image
                src="/images/logo.webp"
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
              // if (!item.children) {
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="p-5"
                  >
                    {item.children ? (
                      <div
                        onClick={() => {
                          setChildList(item.children || []);
                          setOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-gray-100 bg-white rounded-lg h-6 w-6 flex items-center justify-center">
                            <item.icon className="h-3 w-3 text-black" />
                          </div>
                          <div className="text-gray-100">{item.title}</div>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          router.push(item.href);
                          setChildList([]);
                          setOpen(true);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-gray-100 bg-white rounded-lg h-6 w-6 flex items-center justify-center">
                            <item.icon className="h-3 w-3 text-black" />
                          </div>
                          <div className="text-gray-100">{item.title}</div>
                        </div>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
            {childList.length > 0 && isMobile && showChildMenu()}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      {!open && childList.length > 0 && !isMobile && showChildMenu()}
    </div>
  );
}

function ChildItem({
  item,
  pathname,
  level = 0,
}: {
  item: SidebarChild;
  pathname: string;
  level?: number;
}) {
  const hasChildren = !!item.children?.length;
  const [open, setOpen] = useState(true); // 🔥 default kebuka

  const paddingLeft = 12 + level;

  return (
    <div className="pl-1">
      {/* ================= HEADER ================= */}
      <div
        className={`
          px-1 py-2 rounded-lg cursor-pointer
          transition-colors
          ${pathname === item.href ? 'bg-gray-200/15' : 'hover:bg-gray-200/10'}
        `}
        style={{ paddingLeft }}
      >
        <div className="flex items-center justify-between gap-2">
          <Link
            href={item.href}
            className="flex-1 text-sm text-gray-100 truncate"
          >
            {item.title}
          </Link>

          {/* CHEVRON */}
          {hasChildren && (
            <ChevronDown
              onClick={() => setOpen((v) => !v)}
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                open ? 'rotate-180' : ''
              }`}
            />
          )}
        </div>
      </div>

      {/* ================= CHILDREN ================= */}
      {hasChildren && (
        <div
          className={`
            ml-3 overflow-hidden transition-all duration-300 ease-in-out border-l
            ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="space-y-1 mt-1">
            {item.children!.map((child) => (
              <ChildItem
                key={child.href}
                item={child}
                pathname={pathname}
                level={level + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
