'use client';

import Image from 'next/image';

const COL_1 = [
  'https://akademicreator.com/wp-content/uploads/2024/07/image-69.webp',
  'https://akademicreator.com/wp-content/uploads/2024/07/image-74.webp',
  'https://akademicreator.com/wp-content/uploads/2024/07/image-75.webp',
  'https://akademicreator.com/wp-content/uploads/2024/07/image-79.webp',
];

const COL_2 = [
  'https://akademicreator.com/wp-content/uploads/2024/07/image-71.webp',
  'https://akademicreator.com/wp-content/uploads/2024/07/image-73.webp',
  'https://akademicreator.com/wp-content/uploads/2024/07/image-77.webp',
  'https://akademicreator.com/wp-content/uploads/2024/07/image-70.webp',
];

const COL_3 = [
  'https://akademicreator.com/wp-content/uploads/2024/07/image-72.webp',
  'https://akademicreator.com/wp-content/uploads/2024/07/image-76.webp',
  'https://akademicreator.com/wp-content/uploads/2024/07/image-78.webp',
  'https://akademicreator.com/wp-content/uploads/2024/07/image-80.webp',
];

export default function ProofGrid() {
  return (
    <section className="w-full py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column images={COL_1} />
          <Column images={COL_2} />
          <Column images={COL_3} />
        </div>
      </div>
    </section>
  );
}

function Column({ images }: { images: string[] }) {
  return (
    <div className="flex flex-col gap-6">
      {images.map((src, i) => (
        <div key={i} className="rounded-xl overflow-hidden bg-black/40">
          <Image
            src={src}
            alt=""
            width={500}
            height={800}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}
