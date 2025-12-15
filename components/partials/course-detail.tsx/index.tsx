'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

export default function CourseListDetail() {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <div className="border-b border-zinc-700 pb-8">
            <div className="relative h-[220px] w-[220px] mb-3">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWQbeeeLz1nFVXOPMYFVhx5zhHawIITbYDQ&s"
                alt="image detail"
                fill
                className="object-cover rounded-lg"
              />
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
              <div className="font-bold">Module List</div>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground py-4">
              <div className="flex items-center justify-between"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
