'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CertificateDetail() {
  const router = useRouter();
  return (
    <section className="space-y-6">
      <Button
        variant="secondary"
        className="flex items-center gap-5"
        onClick={() => router.back()}
      >
        <ChevronLeft />
        <div>Back</div>
      </Button>
      <div className="flex items-center justify-center w-full">
        <div className="w-[600px] h-[400px] bg-white shadow-lg border border-gray-200">
          <div className="bg-black h-1/4 flex items-center justify-center rounded-b-2xl border-b-5 border-red-800">
            <Image
              src="https://akademicreator.com/wp-content/uploads/2024/07/image-2024-07-10T202308.009.webp"
              alt="ACRE Logo"
              width={150}
              height={20}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-center justify-center p-4 gap-4">
            <div className="w-2/3 space-y-6 ">
              <div className="text-gray-800 font-bold text-center">
                Certificate of Course
              </div>
              <div className="text-gray-600 text-xs text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
                laboriosam voluptatibus incidunt a nobis ducimus ipsam? Velit,
                totam perspiciatis! Illum accusamus at quisquam blanditiis.
              </div>

              <div className="text-gray-600 text-xs text-center italic space-y-1">
                <div className="text-2xl text-yellow-600">sign.</div>
                <div>22 December 2025</div>
                <div>Mr. John Doe</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
