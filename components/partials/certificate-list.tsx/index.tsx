'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { BadgeCheck, ArrowUpDown } from 'lucide-react';

const PAGE_SIZE = 8;

const COURSES = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `Course ${i + 1}`,
  category: ['Design', 'Development', 'Data'][i % 3],
  instructor: ['John Doe', 'Jane Smith', 'Alex Johnson'][i % 3],
  level: ['Beginner', 'Intermediate', 'Advanced'][i % 3],
  certificateDate: new Date(2025, 10, 1 + i), // Nov 2025 (real date)
}));

export default function CertificateList() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sortDesc, setSortDesc] = useState(true); // true = newest first

  /* ===================== Filter + Sort ===================== */
  const processed = useMemo(() => {
    let data = COURSES.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    );

    data = data.sort((a, b) =>
      sortDesc
        ? b.certificateDate.getTime() - a.certificateDate.getTime()
        : a.certificateDate.getTime() - b.certificateDate.getTime(),
    );

    return data;
  }, [search, sortDesc]);

  const totalPages = Math.ceil(processed.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return processed.slice(start, start + PAGE_SIZE);
  }, [processed, page]);

  const resetPage = () => setPage(1);

  return (
    <section className="space-y-6">
      <div className="font-bold text-lg">Your Last Certificate</div>
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

            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {
                setSortDesc((v) => !v);
                resetPage();
              }}
            >
              <ArrowUpDown className="h-4 w-4" />
              {sortDesc ? 'Newest Certificate' : 'Oldest Certificate'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ===================== List ===================== */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {paginated.map((course) => (
          <Card key={course.id} className="relative p-0 gap-0">
            <CardHeader className="p-0 mb-0">
              <div className="relative h-[140px] w-full">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWQbeeeLz1nFVXOPMYFVhx5zhHawIITbYDQ&s"
                  alt={course.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground py-4">
              <h3 className="font-semibold h-[50px]">
                {course.name} of {course.category} - {course.level}
              </h3>
              <div className="flex items-center justify-between gap-2">
                <BadgeCheck />
                <div className="text-xs text-gray-100">
                  {course.certificateDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ===================== Pagination ===================== */}
      <div className="flex items-center justify-center gap-3">
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
