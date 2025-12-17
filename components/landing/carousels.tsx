'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface CaseStudyCarouselProps {
  images: string[];
}

export default function CaseStudyCarousel({ images }: CaseStudyCarouselProps) {
  return (
    <section className="w-full py-3">
      <div className="max-w-7xl mx-auto px-4 relative">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
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
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrow */}
          <CarouselPrevious className="left-4 bg-black/70 border-white/20 text-white hover:bg-black" />
          <CarouselNext className="right-4 bg-black/70 border-white/20 text-white hover:bg-black" />
        </Carousel>
      </div>
    </section>
  );
}
