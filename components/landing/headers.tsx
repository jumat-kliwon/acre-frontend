'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function HeaderLanding() {
  const router = useRouter();
  return (
    <header className="w-full bg-black">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Image
          src="https://akademicreator.com/wp-content/uploads/2024/07/image-2024-07-10T202308.009.webp"
          alt="ACRE Logo"
          width={140}
          height={32}
          className="object-contain"
          priority
          unoptimized
        />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-10 rounded-xl text-base"
            onClick={() => router.push('/auth/login')}
          >
            Login
          </Button>
          <Button
            className="h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base"
            onClick={() => router.push('/auth/login')}
          >
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}
