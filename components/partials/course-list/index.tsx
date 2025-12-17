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
import { useRouter } from 'next/navigation';

/* =====================
   Dummy Data
===================== */
const COURSES = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: `Course ${i + 1}`,
  category: ['Design', 'Development', 'Data'][i % 3],
  instructor: ['John Doe', 'Jane Smith', 'Alex Johnson'][i % 3],
  level: ['Beginner', 'Intermediate', 'Advanced'][i % 3],
}));

const PAGE_SIZE = 12;

export default function CourseList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [instructor, setInstructor] = useState('all');
  const [level, setLevel] = useState('all');
  const [page, setPage] = useState(1);
  const router = useRouter();

  /* =====================
     Filtering Logic
  ===================== */
  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (category !== 'all' && c.category !== category) return false;
      if (instructor !== 'all' && c.instructor !== instructor) return false;
      if (level !== 'all' && c.level !== level) return false;
      return true;
    });
  }, [search, category, instructor, level]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  /* Reset page when filter changes */
  const resetPage = () => setPage(1);

  return (
    <section className="space-y-6">
      {/* ===================== Filters ===================== */}
      <Card>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Input
              placeholder="Search course name"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
            />

            <Select
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
            </Select>

            <Select
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
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ===================== List ===================== */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {paginated.map((course) => (
          <Card
            key={course.id}
            className="relative p-0 gap-0 cursor-pointer"
            onClick={() => {
              router.push(`/member/courses/1`);
            }}
          >
            <CardHeader className="p-0 mb-0">
              <div className="relative h-[100px] w-full">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWQbeeeLz1nFVXOPMYFVhx5zhHawIITbYDQ&s"
                  alt={course.name}
                  fill
                  className="object-cover rounded-t-lg"
                  priority
                  unoptimized
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground py-4">
              <h3 className="font-semibold h-[50px]">
                {course.name} of {course.category}
              </h3>
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs text-gray-500">Category</div>{' '}
                <div className="text-xs text-gray-100">{course.category}</div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs text-gray-500">Instructor</div>{' '}
                <div className="text-xs text-gray-100">{course.instructor}</div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs text-gray-500">Level</div>{' '}
                <div className="text-xs text-gray-100">{course.level}</div>
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

        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
