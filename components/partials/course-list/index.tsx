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

const PAGE_SIZE = 12;

export default function CourseList() {
  const searchParams = useSearchParams();
  const overview = searchParams.get('courses');
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useCourses({
    page,
    limit: PAGE_SIZE,
    search,
  });

  const courses = data?.data ?? [];
  const totalPages = data ? Math.ceil(Number(data.meta.to) / PAGE_SIZE) : 1;

  /* Reset page when filter changes */
  const resetPage = () => setPage(1);

  return (
    <section className="space-y-6">
      <div className="text-2xl text-gray-100 font-semibold">
        Course of {toTitleCase(overview ?? '')}
      </div>
      {/* ===================== Filters ===================== */}
      <Card>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              placeholder="Search course name"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
            />

            {/* <Select
              value={category}
              onValueChange={(v) => {
                setCategory(v);
                resetPage();
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Category</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Data">Data</SelectItem>
              </SelectContent>
            </Select> */}

            {/* <Select
              value={instructor}
              onValueChange={(v) => {
                setInstructor(v);
                resetPage();
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Instructor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Instructor</SelectItem>
                <SelectItem value="John Doe">John Doe</SelectItem>
                <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                <SelectItem value="Alex Johnson">Alex Johnson</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={level}
              onValueChange={(v) => {
                setLevel(v);
                resetPage();
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Level</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        </CardContent>
      </Card>

      {/* ===================== List ===================== */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[280px] bg-zinc-800 rounded-lg animate-pulse"
              />
            ))
          : courses.map((course) => (
              <Card
                key={course.id}
                className="cursor-pointer"
                onClick={() => router.push(`/member/courses/${course.slug}`)}
              >
                <CardHeader className="p-0">
                  <div className="relative h-[200px]">
                    <Image
                      src={
                        course.thumbnail
                          ? `https://lms.acrehub.lol/${course.thumbnail}`
                          : '/images/course-placeholder.png'
                      }
                      alt={course.title}
                      fill
                      className="object-cover rounded-t-lg"
                      unoptimized
                    />
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 py-4">
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
            ))}
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
