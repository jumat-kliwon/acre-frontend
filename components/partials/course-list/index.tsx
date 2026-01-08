'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { toTitleCase } from '@/lib/helpers';
import { useCourses } from './hook';
import { Course } from '@/services/course/type';
import { CircleDollarSignIcon, LucideLockKeyhole } from 'lucide-react';

const PAGE_SIZE = 12;

export default function CourseList() {
  const searchParams = useSearchParams();
  const overview = searchParams.get('category');
  const router = useRouter();
  const [membershipModal, setMembershipModal] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useCourses({
    page,
    limit: PAGE_SIZE,
    search,
    category: overview ?? '',
  });

  const courses = data?.data ?? [];
  const totalPages = data ? Math.ceil(Number(data.meta.to) / PAGE_SIZE) : 1;

  /* Reset page when filter changes */
  const resetPage = () => setPage(1);

  const clickCourse = (cs: Course) => {
    if (cs.has_access) {
      router.push(`/member/courses/${cs.slug}`);
    } else {
      setMembershipModal(true);
    }
  };

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-2xl text-gray-100 font-semibold col-span-1 md:col-span-2">
          Course of {toTitleCase(overview ?? '')}
        </div>
        <Input
          placeholder="Search course name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            resetPage();
          }}
        />
      </div>

      {/* ===================== List ===================== */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[280px] bg-zinc-800 rounded-lg animate-pulse"
            />
          ))
        ) : courses.length ? (
          courses.map((course) => (
            <Card
              key={course.id}
              className="cursor-pointer py-0 relative"
              onClick={() => clickCourse(course)}
            >
              {!course.has_access && (
                <div className="overlay bg-black/50 z-2 rounded-lg w-full h-full absolute top-0">
                  <div className="flex items-center justify-end">
                    <div className="bg-black/80 p-3 rounded-lg">
                      <LucideLockKeyhole color="#fca903" size={30} />
                    </div>
                  </div>
                </div>
              )}
              <CardHeader className="p-0 z-1">
                <div className="relative h-[200px]">
                  <Image
                    src={
                      course.thumbnail
                        ? `https://lms.acrehub.lol/storage/${course.thumbnail}`
                        : '/images/course-placeholder.png'
                    }
                    alt={course.title}
                    fill
                    className="object-cover rounded-t-lg"
                    unoptimized
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-2 pb-6">
                <h3 className="font-semibold line-clamp-2">{course.title}</h3>

                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Category</span>
                  <span>{course.category.name}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Instructor</span>
                  <span>{course.instructor.name}</span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="h-[280px] rounded-lg col-span-1 sm:col-span-2 lg:col-span-3 flex items-center justify-center">
            Empty List
          </div>
        )}
      </div>

      {/* ===================== Pagination ===================== */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <span className="text-sm">Page {page}</span>

        <Button
          variant="outline"
          disabled={!data?.links.next}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
