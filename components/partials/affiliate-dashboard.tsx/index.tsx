'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/helpers';
import { BadgeDollarSign, Copy, UserCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AffiliateDashboard() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [open, onOpenChange] = useState(false);
  const [form, setForm] = useState({
    bankName: '',
    bankOwner: '',
    accountNumber: '',
    amount: '',
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log('withdrawal payload', form);
    // TODO: call API withdrawal
    onOpenChange(false);
  };

  const links = [
    {
      id: 1,
      url: 'https://member.akademicreator.com/register-free-course?id_aff=asditap&utm_source=Affiliate&utm_medium=LP%20Affiliate',
    },
    {
      id: 2,
      url: 'https://member.akademicreator.com/register-free-course?id_aff=asditap&utm_source=Affiliate&utm_medium=LP%20Affiliate',
    },
    {
      id: 3,
      url: 'https://member.akademicreator.com/register-free-course?id_aff=asditap&utm_source=Affiliate&utm_medium=LP%20Affiliate',
    },
  ];

  const data = [
    { date: 'Nov 16', clicks: 1, conversions: 1 },
    { date: 'Nov 18', clicks: 2, conversions: 1 },
    { date: 'Nov 20', clicks: 2, conversions: 0 },
    { date: 'Nov 22', clicks: 2, conversions: 0 },
    { date: 'Nov 24', clicks: 2, conversions: 0 },
    { date: 'Nov 26', clicks: 1, conversions: 4 },
    { date: 'Nov 28', clicks: 1, conversions: 0 },
    { date: 'Dec 2', clicks: 1, conversions: 0 },
    { date: 'Dec 4', clicks: 3, conversions: 0 },
    { date: 'Dec 6', clicks: 2, conversions: 2 },
    { date: 'Dec 8', clicks: 3, conversions: 2 },
    { date: 'Dec 10', clicks: 1, conversions: 0 },
    { date: 'Dec 12', clicks: 1, conversions: 0 },
    { date: 'Dec 14', clicks: 1, conversions: 2 },
  ];

  const truncate = (text: string, max = 30) =>
    text.length > max ? `${text.slice(0, max)}…` : text;

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <section className="space-y-4">
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <Card className="col-span-4 md:col-span-2">
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gray-700`}
                >
                  <BadgeDollarSign className="h-4 w-4" />
                </div>
                <p className="text-gray-100 text-xs md:text-sm font-bold">
                  Current Balance
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 justify-between">
                <p className="text-xl font-bold">
                  IDR {formatCurrency(321300)}
                </p>

                <Button
                  size="sm"
                  className="bg-gradient-to-r from-zinc-800 to-zinc-900 hover:bg-zinc-700 cursor-pointer text-white text-sm"
                  onClick={() => onOpenChange(true)}
                >
                  Withdrawal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-2">
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gray-700`}
                >
                  <UserCircle2 className="h-4 w-4" />
                </div>
                <p className="text-gray-100 text-xs md:text-sm font-bold">
                  Total Referrals
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold">{29}</p>
                <p className="text-sm text-muted-foreground">user</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-4 md:col-span-2">
          <Card>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-100">
                  Affiliate Link
                </p>
                <ul className="divide-y divide-gray-700">
                  {links.map((item) => (
                    <li key={item.id} className="py-3">
                      <div className="flex items-center gap-3 justify-between">
                        <div className="text-sm text-gray-200">
                          {truncate(item.url)}
                        </div>
                        <Button
                          className="cursor-pointer"
                          onClick={() => copyToClipboard(item.url)}
                        >
                          <Copy />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-4 md:col-span-2">
          <Card>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-100">Statisctic</p>
                <ul className="divide-y divide-gray-700">
                  <li className="py-3">
                    <div className="flex items-center gap-3 justify-between">
                      <div className="text-sm">Link Clicks</div>
                      <div className="text-sm font-bold">0</div>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex items-center gap-3 justify-between">
                      <div className="text-sm">Conversion (Buyer)</div>
                      <div className="text-sm font-bold">0</div>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex items-center gap-3 justify-between">
                      <div className="text-sm">Membership Sell (IDR)</div>
                      <div className="text-sm font-bold">0</div>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex items-center gap-3 justify-between">
                      <div className="text-sm">Total Comission</div>
                      <div className="text-sm font-bold">0</div>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-4">
          <Card>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center mb-6">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[260px] justify-start text-left font-normal',
                        !range && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {range?.from ? (
                        range.to ? (
                          <>
                            {format(range.from, 'dd MMM yyyy')} –{' '}
                            {format(range.to, 'dd MMM yyyy')}
                          </>
                        ) : (
                          format(range.from, 'dd MMM yyyy')
                        )
                      ) : (
                        'Pick date range'
                      )}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={range}
                      onSelect={setRange}
                      numberOfMonths={2}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-100 w-1/2">
                    Clicks
                  </p>
                  {/* Clicks Chart */}
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <XAxis
                          dataKey="date"
                          stroke="#6b7280"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 10, fill: '#9ca3af' }}
                        />
                        <YAxis
                          stroke="#6b7280"
                          tickLine={false}
                          axisLine={false}
                          allowDecimals={false}
                          tick={{ fontSize: 10, fill: '#9ca3af' }}
                          width={30}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#111827',
                            border: '1px solid #1f2937',
                            borderRadius: 8,
                          }}
                          labelStyle={{ color: '#e5e7eb' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="clicks"
                          stroke="#38bdf8"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-2">
                  {/* Conversions */}
                  <p className="text-sm font-bold text-gray-100 w-1/2">
                    Conversions
                  </p>

                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data}>
                        <XAxis
                          dataKey="date"
                          stroke="#6b7280"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 10, fill: '#9ca3af' }}
                        />
                        <YAxis
                          stroke="#6b7280"
                          tickLine={false}
                          axisLine={false}
                          allowDecimals={false}
                          tick={{ fontSize: 10, fill: '#9ca3af' }}
                          width={30}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#111827',
                            border: '1px solid #1f2937',
                            borderRadius: 8,
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="conversions"
                          stroke="#ef4444"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Withdrawal Detail</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                placeholder="BCA / BNI / Mandiri"
                value={form.bankName}
                onChange={(e) => handleChange('bankName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankOwner">Bank Owner</Label>
              <Input
                id="bankOwner"
                placeholder="Nama Pemilik Rekening"
                value={form.bankOwner}
                onChange={(e) => handleChange('bankOwner', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="Nomor Rekening"
                value={form.accountNumber}
                onChange={(e) => handleChange('accountNumber', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Nominal</Label>
              <Input
                id="amount"
                placeholder="Rp 0"
                type="number"
                value={form.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="mt-6 flex gap-2">
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit Withdrawal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
