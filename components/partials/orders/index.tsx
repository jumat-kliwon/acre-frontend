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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

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
  const [open, onOpenChange] = useState(false);

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
                          className="bg-gradient-to-r from-zinc-800 to-zinc-900 hover:bg-zinc-700 cursor-pointer text-white text-sm w-full"
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
                        className="bg-gradient-to-r from-zinc-800 to-zinc-900 hover:bg-zinc-700 cursor-pointer text-white text-sm"
                        onClick={() => onOpenChange(true)}
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

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full md:max-w-md">
          <DialogHeader>
            <DialogTitle>Invoice Detail</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Invoice No</p>
                <p className="text-muted-foreground">INV-2025-001</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Date</p>
                <p className="text-muted-foreground">15 Dec 2025</p>
              </div>
            </div>

            <Separator />

            {/* Customer */}
            <div className="text-sm">
              <p className="font-medium">Bill To</p>
              <p className="text-muted-foreground">
                PT Academi Creator Indonesia
              </p>
            </div>

            <Separator />

            {/* Items */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Package</span>
                <span>Rp 2.500.000</span>
              </div>
              <div className="flex justify-between">
                <span>PPN</span>
                <span>Rp 58.000</span>
              </div>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>Rp 2.558.000</span>
            </div>

            {/* Actions */}
            {/* <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary">Close</Button>
              <Button>Download PDF</Button>
            </div> */}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
