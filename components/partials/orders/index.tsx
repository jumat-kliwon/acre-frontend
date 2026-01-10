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
import { ArrowRight, BadgeCheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useOrders } from './hook';
import { formatCurrency, formatDate } from '@/lib/helpers';
import { Order } from '@/services/order/type';
import { useRouter } from 'next/navigation';

function StatusBadge({ status }: { status: string }) {
  return <Badge className="bg-gray-100 text-gray-700">{status}</Badge>;
}

export function OrderBill() {
  const router = useRouter();
  const orderData = useOrders();
  const [open, onOpenChange] = useState(false);
  const [detailInvoice, setDetailInvoice] = useState<Order>();

  return (
    <section className="space-y-10">
      <div className="text-center flex flex-col items-center justify-center space-y-3">
        <BadgeCheckIcon className="w-30 h-30" />

        <div className="font-semibold">
          You are currently on a subscription plan
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="bg-gradient-to-r from-zinc-800 to-zinc-900 hover:bg-zinc-700 cursor-pointer text-white text-sm"
          onClick={() => router.push('/member/membership')}
        >
          New Order
          <ArrowRight className="text-white" />
        </Button>
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
                  <TableHead className="pl-6">#</TableHead>
                  <TableHead>Valid Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orderData.orders?.data?.map((item) => (
                  <TableRow key={item.id} className="align-top">
                    {/* ===== MOBILE + DESKTOP MAIN COLUMN ===== */}
                    <TableCell className="pl-6 pr-6 md:pr-0">
                      {/* HEADER (ALWAYS SHOWN) */}
                      <div className="flex items-center gap-3">
                        <span className="font-medium">
                          {item.invoice_number}
                        </span>
                      </div>

                      {/* ===== MOBILE DETAIL ===== */}
                      <div className="mt-3 grid gap-2 text-sm md:hidden">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Valid Date
                          </span>
                          <span>{formatDate(item.updated_at)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Status</span>
                          <StatusBadge status={item.status_label} />
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
                      {formatDate(item.updated_at)}
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <StatusBadge status={item.status_label} />
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-gradient-to-r from-zinc-800 to-zinc-900 hover:bg-zinc-700 cursor-pointer text-white text-sm"
                        onClick={() => {
                          onOpenChange(true);
                          setDetailInvoice(item);
                        }}
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
                <p className="text-muted-foreground">
                  {detailInvoice?.invoice_number}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">Date</p>
                <p className="text-muted-foreground">
                  {formatDate(detailInvoice?.created_at)}
                </p>
              </div>
            </div>

            <Separator />

            {/* Customer */}
            <div className="text-sm">
              <p className="font-medium">Items Order</p>
              {detailInvoice?.order_items.map((item, i) => (
                <div className="flex flex-col md:flex-row gap-3 w-full" key={i}>
                  <div className="text-muted-foreground w-2/3">
                    #{item.id} - {item.name}
                  </div>
                  <div className="text-muted-foreground w-1/3 text-end">
                    {formatCurrency(item.price)}
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>
                Rp {formatCurrency(Number(detailInvoice?.total_amount))}
              </span>
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
