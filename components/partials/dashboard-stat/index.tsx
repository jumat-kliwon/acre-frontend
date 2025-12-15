'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  IdCard,
  SquareDashedMousePointerIcon,
  Timer,
  CheckCheckIcon,
  Search,
  BadgeCheckIcon,
  Settings,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

const stats = [
  {
    title: 'Active Course',
    count: '4',
    icon: SquareDashedMousePointerIcon,
    iconColor: 'bg-sidebar',
    prefix: 'class',
  },
  {
    title: 'Complete Lessons',
    count: '38',
    icon: CheckCheckIcon,
    iconColor: 'bg-sidebar',
    prefix: 'modules',
  },
  {
    title: 'Last Certificates',
    count: '2',
    icon: IdCard,
    iconColor: 'bg-sidebar',
    prefix: 'certificate',
  },
  {
    title: 'Spent Time',
    count: '12',
    icon: Timer,
    prefix: 'hour',
  },
];

const myCourses = [
  {
    id: 1,
    title: 'Mastering Design System',
    lessons: '15/15',
    status: 'complete',
    level: 'Intermediate',
    category: 'Design',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWQbeeeLz1nFVXOPMYFVhx5zhHawIITbYDQ&s',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    lessons: '12/15',
    status: 'ongoing',
    level: 'Beginner',
    category: 'Design',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWQbeeeLz1nFVXOPMYFVhx5zhHawIITbYDQ&s',
  },
  {
    id: 3,
    title: 'Learn Data Analyst',
    lessons: '8/20',
    status: 'ongoing',
    level: 'Expert',
    category: 'Data',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWQbeeeLz1nFVXOPMYFVhx5zhHawIITbYDQ&s',
  },
];

const updates = [
  {
    id: 1,
    date: '22 Dec 2025 11:20',
    message: 'Your subscription already active',
  },
  {
    id: 2,
    date: '21 Dec 2025 14:20',
    message: 'Your subscription already active',
  },
  {
    id: 3,
    date: '20 Dec 2025 09:10',
    message: 'Payment successfully completed',
  },
  {
    id: 4,
    date: '19 Dec 2025 09:10',
    message: 'Payment failed',
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === 'complete') {
    return <Badge className="bg-green-100 text-green-700">Complete</Badge>;
  }

  return <Badge className="bg-blue-100 text-blue-700">Ongoing</Badge>;
}

export function DashboardStats() {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="col-span-2">
            <Card>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-gray-100 text-sm text-center md:text-start">
                      Welcome Back
                    </p>
                    <p className="text-gray-100 text-xl font-bold text-center md:text-start">
                      Moh Asdita
                    </p>
                  </div>
                  <div className="flex gap-2 mt-3 md:mt-0">
                    <Button
                      size="sm"
                      className="bg-orange-600 text-white text-sm"
                    >
                      <Settings />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-600 text-white text-sm"
                    >
                      <BadgeCheckIcon />
                      My Certificate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {stats.map((item, i) => (
            <Card key={i}>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gray-700`}
                    >
                      <item.icon className="h-4 w-4" />
                    </div>
                    <p className="text-gray-100 text-xs md:text-sm font-bold">
                      {item.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold">{item.count}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.prefix}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent>
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-100">Last Updated</p>
                <Button variant="link" className="h-auto p-0 text-sm">
                  View All
                </Button>
              </div>

              {/* List */}
              <ul className="divide-y divide-gray-700">
                {updates.map((item) => (
                  <li key={item.id} className="py-3">
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500">{item.date}</div>
                      <div className="text-sm text-gray-200">
                        {item.message}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold">My Course</h2>

            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="relative w-full overflow-x-auto">
            <Table>
              <TableHeader className="hidden md:table-header-group">
                <TableRow>
                  <TableHead className="pl-6">Course Name</TableHead>
                  <TableHead>Lessons</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                {myCourses.map((course) => (
                  <TableRow key={course.id} className="align-top">
                    {/* ===== MOBILE + DESKTOP MAIN COLUMN ===== */}
                    <TableCell className="pl-6 pr-6 md:pr-0">
                      {/* HEADER (ALWAYS SHOWN) */}
                      <div className="flex items-center gap-3">
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <span className="font-medium">{course.title}</span>
                      </div>

                      {/* ===== MOBILE DETAIL ===== */}
                      <div className="mt-3 grid gap-2 text-sm md:hidden">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lessons</span>
                          <span>{course.lessons}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Status</span>
                          <StatusBadge status={course.status} />
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Level</span>
                          <span>{course.level}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Category
                          </span>
                          <span>{course.category}</span>
                        </div>

                        <div className="pt-2">
                          {course.status === 'complete' ? (
                            <Button
                              size="sm"
                              className="w-full bg-green-600 text-white text-sm"
                            >
                              View Certificate
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="w-full bg-purple-600 text-white text-sm"
                            >
                              Continue
                            </Button>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* ===== DESKTOP ONLY COLUMNS ===== */}
                    <TableCell className="hidden md:table-cell">
                      {course.lessons}
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <StatusBadge status={course.status} />
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      {course.level}
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      {course.category}
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      {course.status === 'complete' ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-green-600 text-white"
                        >
                          View Certificate
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-purple-600 text-white"
                        >
                          Continue
                        </Button>
                      )}
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
