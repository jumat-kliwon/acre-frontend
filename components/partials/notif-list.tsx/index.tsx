'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Notification = {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

const DUMMY_NOTIFICATIONS: Notification[] = Array.from({ length: 12 }).map(
  (_, i) => ({
    id: i + 1,
    title: `Notification ${i + 1}`,
    message:
      'This is a dummy notification message. It contains more detailed information about the notification content.',
    date: `22 Dec 2025 1${i}:00`,
    read: i % 3 === 0,
  }),
);

export default function NotificationPage() {
  const [selected, setSelected] = useState<Notification | null>(
    DUMMY_NOTIFICATIONS[0],
  );

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* ================= LEFT: LIST ================= */}
      <div className="lg:col-span-6">
        <Card className="h-[70vh]">
          <CardHeader>
            <h2 className="text-lg font-semibold">Notifications</h2>
          </CardHeader>

          <CardContent className="p-0">
            <ul className="divide-y divide-border max-h-[60vh] overflow-y-auto">
              {DUMMY_NOTIFICATIONS.map((notif) => (
                <li
                  key={notif.id}
                  onClick={() => setSelected(notif)}
                  className={cn(
                    'cursor-pointer px-4 py-3 hover:bg-muted transition',
                    selected?.id === notif.id && 'bg-muted',
                  )}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="w-2/3">
                      <p
                        className={cn(
                          'text-sm',
                          notif.read
                            ? 'text-muted-foreground'
                            : 'font-semibold',
                        )}
                      >
                        {notif.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {notif.message}
                      </p>
                    </div>
                    <div className="w-1/3 flex flex-col items-end space-y-2">
                      <span className="text-xs text-muted-foreground">
                        {notif.date}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          !notif.read && 'bg-blue-200'
                        }`}
                      ></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* ================= RIGHT: PREVIEW ================= */}
      <div className="lg:col-span-6">
        <Card className="h-[70vh]">
          <CardHeader>
            <h2 className="text-lg font-semibold">Preview</h2>
          </CardHeader>

          <CardContent>
            {selected ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{selected.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selected.date}
                  </p>
                </div>

                <p className="text-sm leading-relaxed">{selected.message}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a notification to see details
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
