'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMembership } from './hook';
import { useRouter } from 'next/navigation';
import { Membership } from '@/services/order/type';
import { Input } from '@/components/ui/input';
import { ArrowRight, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/helpers';
import { Separator } from '@/components/ui/separator';

export default function MembershipArea() {
  const router = useRouter();
  const list = useMembership();
  const [totals, setTotals] = useState<number>(0);
  const [selected, setSelected] = useState<Membership | null>(null);
  const [form, setForm] = useState({
    membership: '',
    coupon: '',
  });

  const onChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSave = () => {
    list.newOrder({
      membership_id: Number(form.membership),
      coupon: form.coupon,
    });
  };

  const onCheckCoupon = () => {
    if (form.membership && form.coupon) {
      list.checkCoupon({
        membership_id: Number(form.membership),
        coupon: form.coupon,
      });
    } else {
      toast.error('Pilih paket dan isi kupon terlebih dahulu!');
    }
  };

  useEffect(() => {
    if (Number(form.membership)) {
      const dt = list.membership?.data.filter(
        (a) => a.id === Number(form.membership),
      )[0];
      if (dt) {
        setSelected(dt);
      }
    }
  }, [form.membership]);

  useEffect(() => {
    const dtx = list.coupons?.data.discount_amount ?? 0;
    const dtt = selected?.price ?? 0;
    const dt = dtx ? Number(dtt) - Number(dtx) : Number(dtt);
    setTotals(dt);
  }, [list.coupons, selected]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="text-xl font-bold">Pilih paket berlangganan</div>
      </div>
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Paket langganan</Label>
              <Select
                value={form.membership}
                onValueChange={(v) => onChange('membership', v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih membership" />
                </SelectTrigger>
                <SelectContent>
                  {list.membership?.data.map((item, i) => {
                    return (
                      <SelectItem value={String(item.id)} key={i}>
                        {item.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div
              className="text-gray-400"
              dangerouslySetInnerHTML={{
                __html:
                  selected?.description ??
                  '<div className="w-full h-[120px] rounded-xl"></div>',
              }}
            />

            {form.membership && (
              <div className="space-y-3">
                <Label>Kupon</Label>
                <div className="flex flex-row gap-4">
                  <Input
                    value={form.coupon}
                    onChange={(e) => {
                      onChange('coupon', e.target.value);
                      const c = e.target.value;
                      if (c.length < 1) {
                        list.setCouponValid(true);
                      } else {
                        list.setCouponValid(false);
                        onChange('coupon', e.target.value);
                      }
                    }}
                    placeholder="Masukan kupon Anda"
                  />
                  {form.coupon.length > 0 && (
                    <Button
                      variant="secondary"
                      className="py-4"
                      onClick={() => onCheckCoupon()}
                    >
                      {list.loadingCheckCoupon ? (
                        <Loader2 className="animated-spin" />
                      ) : (
                        'Cek Kupon'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between font-semibold">
              <span className="text-sm">Harga Paket</span>
              <span>Rp {formatCurrency(Number(selected?.price))}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-sm">Diskon / Kupon</span>
              <div className="flex gap-4">
                {list.coupons?.data.discount_amount &&
                  list.coupons?.data.discount_amount > 0 && (
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      className="h-6 w-6 rounded-full bg-gradient-to-r from-red-600 to-red-900 cursor-pointer"
                      onClick={() => {
                        list.setCoupons(null);
                        onChange('coupon', '');
                        list.setCouponValid(true);
                      }}
                    >
                      <X className="text-white" />
                    </Button>
                  )}
                Rp{' '}
                {formatCurrency(
                  Number(list.coupons?.data.discount_amount ?? 0),
                )}
              </div>
            </div>

            <div className="flex justify-between font-semibold">
              <span className="text-sm">Total</span>
              <span>Rp {formatCurrency(totals)}</span>
            </div>
          </div>

          <div className="flex justify-between gap-2 pt-4">
            <Button variant="secondary" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              onClick={onSave}
              disabled={!form.membership || !list.couponValid}
              className="bg-gradient-to-r from-red-600 to-red-900 cursor-pointer hover:bg-black text-white flex gap-4"
            >
              Beli Sekarang
              <ArrowRight className="text-white" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
