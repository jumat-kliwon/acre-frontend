// hooks/useCourses.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { CourseService } from '@/services/course';

interface UseCoursesParams {
  page: number;
  limit: number;
  search: string;
  category: string;
}

export const useCourses = ({ page, limit, search, category }: UseCoursesParams) => {
  return useQuery({
    queryKey: ['courses', page, limit, search, category],
    queryFn: () =>
      CourseService.getCourses({
        page,
        limit,
        search: search || null,
        category: category,
      }),
    // keepPreviousData: true,
  });
};
