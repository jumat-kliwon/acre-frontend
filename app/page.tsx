import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, PlayCircle, XCircle } from 'lucide-react';
import CaseStudyCarousel from '@/components/landing/carousels';
import HeaderLanding from '@/components/landing/headers';
import Image from 'next/image';
import Footer from '@/components/partials/footer';

export default function Home() {
  const benefit = [
    {
      img: 'https://akademicreator.com/wp-content/uploads/2025/03/Kenapa-Akademi-Creator-01-1024x870.webp',
      title:
        'Bukan cuma kelas ngonten dan naikin followers. Tapi dibimbing sampai monetisasi.',
      desc: 'Punya followers banyak itu mudah, tapi buat apa kalau gak bisa hasilin duit. Tujuan utamanya escape the rat race, butuh uang. Kalian akan dibimbing sampai berhasil untuk buka lebih dari 1 sumber penghasilan Internet Money. Contoh: Endorse, adsense, jual ebook, webinar, workshop, kelas online, dll.',
    },
    {
      img: 'https://akademicreator.com/wp-content/uploads/2025/03/Kenapa-Akademi-Creator-02b-1024x876.webp',
      title: 'Dibimbing hingga dapat 100k followers pertamamu',
      desc: 'Setelah monetisasi berhasil, baru kamu dibimbing meningkatkan fame agar lebih banyak lagi orang yang kenal kamu. Uangpun makin banyak. Kamu akan dimibing sampai berhasil mendapatkan 100K followers pertama lewat 500+ video pembelajaran yang sudah terbukti berhasil untuk jenis konten apapun di sosial media manapun.',
    },
    {
      img: 'https://akademicreator.com/wp-content/uploads/2025/03/Kenapa-Akademi-Creator-03-1024x799.webp',
      title: 'After Sales Service Kelas Dunia dan Paling Konsisten Sejak 2019.',
      desc: 'Paling tidak enak itu praktek sendiri, makanya Akademi Creator (Acre) sudah konsisten 6 tahun sejak 2019 melayani dan membimbing para member lewat komunitas, chat QnA, Live rutin, bedah akun. Acrea tidak akan bisa melahirkan alumni sukses sebanyak ini jika tidak berkomintmen penuh memberikan materi dan bimbingan terbaik dibanding pesaing lainnya.',
    },
    {
      img: 'https://akademicreator.com/wp-content/uploads/2025/03/Kenapa-Akademi-Creator-04rev-1024x745.webp',
      title: 'Komunitas eksklusif yang saling support dan berbagi insight.',
      desc: 'Kalian akan punya keluarga baru disini, perkumpulan yang saling support dan bisa berpotensi jadi teman seperjuangan dalam bisnis atau bahkan partner dalam bisnis. Kita juga sering mengadakan acara komunitas offline bagi para member.',
    },
  ];

  const materi = [
    {
      img: 'https://akademicreator.com/wp-content/uploads/2024/07/image-37-768x559.webp',
      title: 'FAST TRACK CREATOR',
      watch: 24,
      desc: 'Modul ini akan mengajarkan Kamu untuk meningkatkan followers lewat jalan pintas tercepat. Kami akan ajarkan bagaimana dari orang yang gak pede ngomong di depan kamera sampai bisa pede. Kami juga akan ajar dan pilihkan niche yang punya potensi besar untuk akunmu cepat berkembang. Tidak berhenti disitu, Kamu juga akan belajar meskipun Kamu belum expert, tapi bisa membuat konten daging yang dihargai sama calon followersmu. Diakhiri dengan take video dan edit video di platform sosmed dan juga di capcut (semuanya aplikasi gratis).',
    },
    {
      img: 'https://akademicreator.com/wp-content/uploads/2024/07/image-39-768x559.webp',
      title: 'FUNDAMENTAL CREATOR',
      watch: 70,
      desc: 'Di modul ini Kamu akan belajar pondasi untuk membuat konten apapun diseluruh sosial media manapun. Kami akan ajarkan cara kerja otak manusia saat merespon konten sehingga Kamu bisa menguasai psikologi audience agar engage dan follow. Tidak lupa juga Kamu juga akan belajar The Art of Story Telling, agar audience mu bisa terhanyut mengkonsumsi kontenmu sampai selesai.',
    },
    {
      img: 'https://akademicreator.com/wp-content/uploads/2024/07/image-41-768x559.webp',
      title: 'INSTAGRAM, TIKTOK, & YOUTUBE HACK',
      watch: 24,
      desc: 'Di modul ini Kamu akan belajar cara untuk “hack” algoritma dari platform Instagram, Youtube, dan TikTok agar konten kalian mendapatkan engagement yang tinggi. Di modul ini kalian juga akan diajari cara membuat Hook yang tepat agar relevan dengan audiens. Melalui modul-modul ini Kamu akan belajar cara untuk grow akun dalam kurun waktu 3 bulan.',
    },
    {
      img: 'https://akademicreator.com/wp-content/uploads/2024/07/image-43-768x559.webp',
      title: 'Artificial Intelligence',
      watch: 15,
      desc: 'Kamu akan belajar tools-tools yang mempercepat prosesmu membuat konten. Kami juga akan ajarkanmu membuat prompt untuk masing-masing tools. Kamu akan cakap dalam menggunakan AI tools untuk membuat Ide, Script, sampai mengenerate Image untuk kontenmu.',
    },
    {
      img: 'https://akademicreator.com/wp-content/uploads/2025/03/Materi-ACRE-Monetisasi-rev2-768x559.webp',
      title: 'Monetisasi',
      watch: 10,
      desc: 'Modul ini akan mengajarkanmu bagaimana menentukan rate card untuk endorsement, bagiamana negosiasinya, dan bagaimana flow dari mulai penawaran sampai pembayaran. Tidak hanya pembayarannya saja, Kamu juga akan belajar bagaimana membuat dan menghitung pajak sebagai Influencer.',
    },
    {
      img: 'https://akademicreator.com/wp-content/uploads/2025/03/Materi-ACRE-Personal-Branding-rev3-768x559.webp',
      title: 'PERSONAL BRANDING',
      watch: 17,
      desc: 'Perjalananmu tidak hanya sampai punya followers banyak saja, tetapi Kamu akan belajar bagaimana membangun personal branding. Saat personal brandingmu terbangun, Audiencemu akan selalu ingat denganmu dan mereka menjadi loyal fans. Efeknya, kekuatan dari influencemu meningkat, sehingga di mata audience dan brand, nilaimu sebagai Influencer akan mahal.',
    },
    {
      img: 'https://akademicreator.com/wp-content/uploads/2025/03/Materi-ACRE-Digital-Product-Hack-768x642.webp',
      title: 'Digital product hack',
      watch: 17,
      desc: 'Modul product digital dari mulai membuat ebook sampai kelas online. Kamu akan tau step by step, sampai bisa menghasilkan uang secara detail dari produk digital. Rasakan cuan dari digital product ini, pasti nagih.',
    },
    {
      img: 'https://akademicreator.com/wp-content/uploads/2025/03/Materi-ACRE-Webinar-Hack-768x514.webp',
      title: 'webinar hack',
      watch: 17,
      desc: 'Kamu akan belajar bagaiman membuat webinar yang bikin orang-orang bertekuk lutut untuk membeli produkmu. Modul ini bisa Kamu jadikan untuk jualan webinar itu sendiri atau untuk promosi yang mengarahkan ke produk digital utamamu.',
    },
    {
      img: 'https://akademicreator.com/wp-content/uploads/2025/03/Materi-ACRE-Digital-Product-Marketing-768x518.webp',
      title: 'Digital Product Marketing',
      watch: 17,
      desc: 'Modul ini yang bisa membawamu ke 100jt pertama. Setelah punya produk digital, Kamu akan belajar bagaimana memasarkannya dengan budget minim. Saat Kamu sudah memasarkan produk digitalmu lewat digital marketing, Kamu akan makin ketagihan sama cuannya.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <HeaderLanding />

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center space-y-10">
        <div className="text-center space-y-8 max-w-4xl py-10">
          <h1 className="text-4xl font-bold uppercase">
            Strategi{' '}
            <span className="text-red-600">100K followers & 10jt Pertama</span>{' '}
            dari Content Creator dan Product Digital
          </h1>

          <div className="space-y-1">
            <div className="text-base font-semibold text-gray-200">
              Kelas Online Untuk:
            </div>
            <div className="text-gray-400">
              Naikin Followers ➔ Bangun Personal Brand ➔ Dapat Endorse ➔ Jual
              Product Digital
            </div>
          </div>

          <div className="max-w-4xl mx-auto aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/-LCMbbICJjs?rel=0&controls=1"
              allowFullScreen
            />
          </div>
        </div>

        <div className="pb-10">
          <Button className="h-10 w-[180px] rounded-xl bg-red-600 hover:bg-red-700 text-white text-base">
            Join Now <ArrowRight />
          </Button>
        </div>

        <section className="w-full  py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14">
              Sebelum membeli, pastikan kelas{' '}
              <span className="text-red-600">ini cocok dengan kalian</span>
            </h2>

            {/* Content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Beli Jika */}
              <div className="rounded-2xl border border-black shadow-[0_0_15px_rgba(0,255,0,0.8)] p-6">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-2xl font-semibold text-white">
                    Beli Jika
                  </h3>
                  <CheckCircle2 className="text-green-500 w-7 h-7" />
                </div>

                <ul className="space-y-4">
                  {[
                    'Mau dapet penghasilan tambahan diluar kantor',
                    'Mau switch karir full time bisnis digital/creator',
                    'Mau punya followers banyak',
                    'Expert dalam ilmu tertentu mau monetize',
                    'Followers banyak, monetize susah',
                    'Mau jualan produk digital yang laku keras',
                    'Mau punya banyak waktu untuk keluarga',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-white/90 border-b border-white/10 pb-4"
                    >
                      <CheckCircle2 className="text-green-500 w-5 h-5 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Jangan Beli Jika */}
              <div className="rounded-2xl border border-black shadow-[0_0_15px_rgba(255,0,0,0.8)] p-6">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-2xl font-semibold text-white">
                    Jangan Beli Jika
                  </h3>
                  <XCircle className="text-red-500 w-7 h-7" />
                </div>

                <ul className="space-y-4">
                  {[
                    'Mau bikin konten entertainment',
                    'Mau bikin konten pamer aurat',
                    'Mau jual produk digital hit & run',
                    'Bikin konten atau jual produk ilegal',
                    'Mau belajar ngiklan jualan produk fisik',
                    'Mau dapet followers pakai jalur beli, FLKS',
                    'Mau tenar dan kaya mendadak',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-white/60 border-b border-white/10 pb-4"
                    >
                      <XCircle className="text-red-500 w-5 h-5 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

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
          </div>
        </section>

        <section className="w-full  py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14">
              Kenapa Akademi Creator?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefit.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="rounded-2xl border border-black shadow-[0_0_15px_rgba(255,0,0,0.8)] p-6 relative"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <Image
                        src={item.img}
                        width={200}
                        height={200}
                        alt="img"
                        priority
                        unoptimized
                      />
                      <div className="uppercase font-bold text-xl md:text-2xl text-center md:text-start">
                        {item.title}
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm pt-4 text-center">
                      {item.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full  py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14">
              Jangan Percaya Omongan Kita, Lihat Saja Hasilnya
            </h2>
          </div>
          <div className="mb-5">
            <div className="relative w-full h-[200px] md:h-[400px]">
              <Image
                src="https://akademicreator.com/wp-content/uploads/2025/03/100k-Folllowes-dalam-2-bulan-bged4.webp"
                alt="banner"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14">
              <div className="text-red-600">100K Followers</div>
              <div>Pertama</div>
            </h2>
          </div>
          <div className="mb-5">
            <div className="relative w-full h-[200px] md:h-[400px]">
              <Image
                src="https://akademicreator.com/wp-content/uploads/2025/03/Penghasilan-Alumni-BG-ed.webp"
                alt="banner"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14">
              <span className="text-red-600">penghasilan alumni</span>
              <span>
                {' '}
                dari <br /> endorsement, Adsense, digital <br /> product dan
                digital service
              </span>
            </h2>
          </div>
        </section>

        <div className="w-full md:max-w-1/3 text-center mb-5 flex flex-col justify-center items-center">
          <div className="text-center text-xs">
            Akademi Creator tidak akan bisa melahirkan creatorpreneur sebanyak
            ini jika Kami tidak komitmen dan disiplin mendeliver kurikulum serta
            fasilitas after-sales service terbaik.
          </div>
          <div className="text-center uppercase text-xl font-semibold my-5">
            Mereka sudah memulai, kamu kapan?
          </div>
          <div className="relative w-[0.5px] h-[100px] md:h-[200px]">
            <Image
              src="https://akademicreator.com/wp-content/uploads/2024/07/Vector-7499.webp"
              alt="separator"
              fill
              priority
              unoptimized
            />
          </div>
          <div className="relative w-full h-[100px] md:h-[200px]">
            <Image
              src="https://akademicreator.com/wp-content/uploads/2025/04/video-learnings-facts-rev10.webp"
              alt="separator"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
          <div className="pb-10">
            <Button className="h-10 w-[180px] rounded-xl bg-red-600 hover:bg-red-700 text-white text-base">
              Join Now <ArrowRight />
            </Button>
          </div>
        </div>

        <section className="w-full  py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14">
              Materi Pembelajaran ACRE
            </h2>

            <div>
              {materi.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center gap-6 py-4"
                >
                  {/* IMAGE - LEFT */}
                  <div className="relative w-full md:w-[220px] h-[160px] shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  </div>

                  {/* NUMBER - CENTER */}
                  <div className="w-1/5 flex items-center justify-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full font-bold text-lg shrink-0">
                      {index + 1}
                    </div>
                  </div>

                  {/* CONTENT - RIGHT */}
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <div className="text-white font-bold uppercase">
                      {item.title}
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                      <PlayCircle className="w-4 h-4" />
                      {item.watch}+ Video Pembelajaran
                    </div>

                    <div className="flex items-start justify-center md:justify-start gap-2 text-gray-400 text-xs">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
