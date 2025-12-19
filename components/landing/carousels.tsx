'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface CaseStudyCarouselProps {
  images: string[];
}

export default function CaseStudyCarousel({ images }: CaseStudyCarouselProps) {
  return (
    <section className="w-full py-3">
      <div className="max-w-7xl mx-auto px-4 relative">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={16}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
          }}
          className="swiperss bottom-page pb-14"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[200px] md:h-[600px] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={src}
                  alt={`case-study-${index}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrow LEFT */}
        <button className="case-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 border border-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black transition">
          ‹
        </button>

        {/* Arrow RIGHT */}
        <button className="case-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 border border-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black transition">
          ›
        </button>
      </div>
    </section>
  );
}
