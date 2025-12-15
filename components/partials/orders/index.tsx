'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BadgeCheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const myCourses = [
  {
    id: 1,
    title: 'Lifetime Subscription',
    valid_date: 'Sep 2025 - Sep 2026',
    status: 'active',
  },
  {
    id: 2,
    title: 'Lifetime Subscription',
    valid_date: 'Jul 2024 - Jul 2025',
    status: 'expired',
  },
  {
    id: 3,
    title: 'Lifetime Subscription',
    valid_date: 'May 2022 - May 2023',
    status: 'expired',
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === 'active') {
    return <Badge className="bg-green-100 text-green-700">Active</Badge>;
  }

  return <Badge className="bg-red-100 text-red-700">Expired</Badge>;
}

export function OrderBill() {
  return (
    <section className="space-y-10">
      <div className="text-center flex flex-col items-center justify-center space-y-3">
        <BadgeCheckIcon className="w-30 h-30" />

        <div className="font-semibold">Your Subscription Already Active</div>
        <div className="text-gray-400">Expired at September 2026</div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold">My Order & Bill</h2>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="relative w-full overflow-x-auto">
            <Table>
              <TableHeader className="hidden md:table-header-group">
                <TableRow>
                  <TableHead className="pl-6">Order Name</TableHead>
                  <TableHead>Valid Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {myCourses.map((course) => (
                  <TableRow key={course.id} className="align-top">
                    {/* ===== MOBILE + DESKTOP MAIN COLUMN ===== */}
                    <TableCell className="pl-6 pr-6 md:pr-0">
                      {/* HEADER (ALWAYS SHOWN) */}
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{course.title}</span>
                      </div>

                      {/* ===== MOBILE DETAIL ===== */}
                      <div className="mt-3 grid gap-2 text-sm md:hidden">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Valid Date
                          </span>
                          <span>{course.valid_date}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Status</span>
                          <StatusBadge status={course.status} />
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-purple-600 text-white text-sm w-full"
                        >
                          View Invoice
                        </Button>
                      </div>
                    </TableCell>

                    {/* ===== DESKTOP ONLY COLUMNS ===== */}
                    <TableCell className="hidden md:table-cell">
                      {course.valid_date}
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <StatusBadge status={course.status} />
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-purple-600 text-white text-sm"
                      >
                        View Invoice
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
