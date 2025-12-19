'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';

type RowData = {
  id: number;
  images: string[];
  reverse?: boolean;
};

const rows: RowData[] = [
  {
    id: 1,
    reverse: false, // kiri
    images: [
      'https://akademicreator.com/wp-content/uploads/2024/09/account_hendra.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_johangarageofficial.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_jody.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_yazid.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_hendra.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_johangarageofficial.webp',
    ],
  },
  {
    id: 2,
    reverse: true, // kanan
    images: [
      'https://akademicreator.com/wp-content/uploads/2024/09/account_azizpict.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_gby.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_jodyadit.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_junara.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_jangfahchiny.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_gby.webp',
    ],
  },
  {
    id: 3,
    reverse: false, // kiri
    images: [
      'https://akademicreator.com/wp-content/uploads/2024/09/account_mudahbergaul.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_bicarapede.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_bahasvideo.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_radenhanif.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_mudahbergaul.webp',
      'https://akademicreator.com/wp-content/uploads/2024/09/account_bicarapede.webp',
    ],
  },
];

function SwiperRow({
  images,
  reverse,
}: {
  images: string[];
  reverse?: boolean;
}) {
  return (
    <Swiper
      modules={[Autoplay]}
      loop
      speed={6000}
      slidesPerView={3.5}
      spaceBetween={24}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverse,
      }}
      breakpoints={{
        768: { slidesPerView: 1.5 },
        1024: { slidesPerView: 4.5 },
      }}
      className="w-full"
    >
      {[...images, ...images].map((img, i) => (
        <SwiperSlide key={i}>
          <div
            className="relative h-[40px] md:h-[120px]
                       rounded-xl overflow-hidden"
          >
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default function MarqueeRow() {
  return (
    <section className="w-full overflow-hidden py-20 space-y-8">
      {rows.map((row) => (
        <SwiperRow key={row.id} images={row.images} reverse={row.reverse} />
      ))}
    </section>
  );
}
