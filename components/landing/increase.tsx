'use client';

import CaseStudyCarousel from './carousels';

export default function Increase() {
  return (
    <section className="w-full  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14">
          <span className="text-red-600">
            Hasil peningkatan followers dan pendapatan
          </span>
          <br />
          alumni dari product digital. Kalian kapan nyusul?
        </h2>

        <div className="space-y-10">
          <CaseStudyCarousel
            images={[
              'https://akademicreator.com/wp-content/uploads/2024/07/image-2024-07-12T145955.662.webp',
              'https://akademicreator.com/wp-content/uploads/2024/07/image-2024-07-11T142204.937.webp',
              'https://akademicreator.com/wp-content/uploads/2024/07/image-2024-07-11T144240.522.webp',
              'https://akademicreator.com/wp-content/uploads/2024/07/image-2024-07-11T144309.098.webp',
              'https://akademicreator.com/wp-content/uploads/2024/07/image-2024-07-11T144348.963.webp',
              'https://akademicreator.com/wp-content/uploads/2024/07/image-2024-07-11T144421.931.webp',
              'https://akademicreator.com/wp-content/uploads/2024/07/image-2024-07-11T144453.050.webp',
            ]}
          />

          <CaseStudyCarousel
            images={[
              'https://akademicreator.com/wp-content/uploads/2025/03/Pendapatan-Fadli2.webp',
              'https://akademicreator.com/wp-content/uploads/2025/03/Pendapatan-Dimas2.webp',
              'https://akademicreator.com/wp-content/uploads/2025/03/Pendapatan-Anwar-Choladi2.webp',
              'https://akademicreator.com/wp-content/uploads/2025/03/Pendapatan-Sholeh2.webp',
              'https://akademicreator.com/wp-content/uploads/2025/03/Pendapatan-Putri-Mulia2.webp',
              'https://akademicreator.com/wp-content/uploads/2025/03/Pendapatan-Gio2.webp',
            ]}
          />
        </div>
      </div>
    </section>
  );
}
