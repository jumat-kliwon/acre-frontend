'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, Bell, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useLogout } from '../auth/logout/hook';

export default function MemberHeader() {
  const { mutate, isPending } = useLogout();
  const router = useRouter();

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-black px-4 py-3">
      <div className="flex w-full items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="text-white hover:bg-white/10" />

          <Image
            src="/images/logo.webp"
            alt="ACRE Logo"
            width={150}
            height={20}
            className="object-contain md:hidden"
            priority
            unoptimized
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Notification */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-white hover:bg-white/10 md:inline-flex"
            onClick={() => router.push('/member/notifications')}
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer ring-2 ring-white/20">
                <AvatarImage src="/avatar.png" alt="Profile" />
                <AvatarFallback className="bg-white/10 text-white">
                  CS
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 border-white/10 bg-zinc-900 text-white"
            >
              <DropdownMenuLabel className="text-white/70">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />

              <DropdownMenuItem
                className="hover:bg-white/10"
                onClick={() => router.push('/member/profile')}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                className="hover:bg-white/10"
                onClick={() => router.push('/member/settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex hover:bg-white/10 md:hidden"
                onClick={() => router.push('/member/notifications')}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-white/10" />

              <DropdownMenuItem
                className="text-red-500 hover:bg-red-500/10 focus:text-red-500"
                onClick={() => mutate()}
                disabled={isPending}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isPending ? 'Logging out...' : 'Logout'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
