'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { Button } from '../ui/button';
import { ArrowDownRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const mentors = [
  'https://akademicreator.com/wp-content/uploads/2025/03/Mentor-Ogut1-rev.webp',
  'https://akademicreator.com/wp-content/uploads/2025/03/Mentor-Raden1-rev3.webp',
  'https://akademicreator.com/wp-content/uploads/2025/03/Mentor-Syafiul1-rev2.webp',
  'https://akademicreator.com/wp-content/uploads/2025/03/LP-Mentors-Adjusted-Hendra.webp',
  'https://akademicreator.com/wp-content/uploads/2024/07/a4-1.webp',
  'https://akademicreator.com/wp-content/uploads/2024/07/a5-1.webp',
  'https://akademicreator.com/wp-content/uploads/2025/03/LP-Mentors-Adjusted-Aldela-New.webp',
  'https://akademicreator.com/wp-content/uploads/2025/03/Mentor-Shiffa-Kelana.webp',
];

export default function Mentors() {
  const router = useRouter();
  return (
    <div className="text-center space-y-8 w-full md:max-w-4xl py-10">
      <h1 className="text-5xl font-bold uppercase">Meet the mentors</h1>
      <div className="relative">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
          }}
          className="swiperss pb-14"
        >
          {mentors.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="w-full h-[550px] md:h-[420px]">
                <Image
                  src={item}
                  alt="image"
                  className="mx-auto"
                  fill
                  priority
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="pb-10">
        <Button
          className="h-10 w-[180px] rounded-xl bg-gradient-to-r from-red-600 to-red-900 hover:bg-red-700 text-white text-base"
          onClick={() => router.push('/auth/member')}
        >
          Join Now <ArrowDownRight />
        </Button>
      </div>
    </div>
  );
}
