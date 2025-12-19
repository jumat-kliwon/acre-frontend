'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronLeft, PlayCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const COURSES = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  name: `Course ${i + 1} - Lorem Ipsum Dolor ${i + 1}`,
  pass: false,
}));

export default function CourseListDetail() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="col-span-1">
          <div className="border-b border-zinc-700 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
              <div className="relative h-[200px] w-[300px] mb-3">
                <Image
                  src="https://member.akademicreator.com/wp-content/uploads/2023/07/0.-FAST-TRACK-CREATOR-600x400.webp"
                  alt="image detail"
                  fill
                  className="object-cover rounded-lg"
                  priority
                  unoptimized
                />
              </div>
              <div className="space-y-1 mb-5">
                <div className="text-xs text-center">Progress</div>
                <div
                  className="relative flex items-center justify-center"
                  style={{ width: 60, height: 60 }}
                >
                  {/* Background ring */}
                  <div className="absolute inset-0 rounded-xl border border-white/10" />

                  {/* Progress */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden rotate-[-90deg]">
                    <Progress
                      value={32}
                      className={cn(
                        'h-xl w-xl rounded-none bg-transparent',
                        '[&>div]:bg-red-600',
                        '[&>div]:transition-all',
                      )}
                    />
                  </div>

                  {/* Center text */}
                  <span className="absolute text-white font-semibold text-lg">
                    {32}%
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="font-bold text-gray-100 text-xl md:text-2xl mb-3">
                Course Lorem Ipsum Dolor - Development Phase 2025
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm text-gray-500">Category</div>{' '}
                  <div className="text-sm text-gray-100">Development</div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm text-gray-500">Instructor</div>{' '}
                  <div className="text-sm text-gray-100">John Doe</div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm text-gray-500">Level</div>{' '}
                  <div className="text-sm text-gray-100">Beginner</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 py-8">
            <div className="space-y-1">
              <div className="font-semibold text-xl text-gray-300">
                Course Overview
              </div>
              <div className="text-gray-400">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                nobis voluptas maxime ea maiores doloremque quod, illum dolor
                veritatis possimus ipsam mollitia facilis repellendus quo
                impedit ratione architecto aspernatur dolore. illum dolor
                veritatis possimus ipsam mollitia facilis repellendus quo
                impedit ratione architecto aspernatur dolore. illum dolor
                veritatis possimus ipsam mollitia facilis repellendus quo
                impedit ratione architecto aspernatur dolore.
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-xl text-gray-300">
                What You will Learn
              </div>
              <div className="text-gray-400">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                nobis voluptas maxime ea maiores doloremque quod, illum dolor
                veritatis possimus ipsam mollitia facilis repellendus quo
                impedit ratione architecto aspernatur dolore.
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-xl text-gray-300">
                Course Features
              </div>
              <div className="text-gray-400">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                nobis voluptas maxime ea maiores doloremque quod, illum dolor
                veritatis possimus ipsam mollitia facilis repellendus quo
                impedit ratione architecto aspernatur dolore. illum dolor
                veritatis possimus ipsam mollitia facilis repellendus quo
                impedit ratione architecto aspernatur dolore. illum dolor
                veritatis possimus ipsam mollitia facilis repellendus quo
                impedit ratione architecto aspernatur dolore.
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-xl text-gray-300">
                Certification
              </div>
              <div className="text-gray-400">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                nobis voluptas maxime ea maiores doloremque quod, illum dolor
                veritatis possimus ipsam mollitia facilis repellendus quo
                impedit ratione architecto aspernatur dolore.
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="font-bold">Module List</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground py-4">
              {COURSES.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b py-4"
                  >
                    <div className="font-semibold py-2">{item.name}</div>
                    <div>
                      <Button
                        variant="default"
                        size="icon"
                        className="bg-gradient-to-r from-red-600 to-red-900 hover:bg-red-700"
                      >
                        <PlayCircleIcon className="text-white" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
