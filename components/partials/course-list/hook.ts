// hooks/useCourses.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { CourseService } from '@/services/course';

interface UseCoursesParams {
  page: number;
  limit: number;
  search: string;
}

export const useCourses = ({ page, limit, search }: UseCoursesParams) => {
  return useQuery({
    queryKey: ['courses', page, limit, search],
    queryFn: () =>
      CourseService.getCourses({
        page,
        limit,
        search: search || null,
        category_id: null,
      }),
    // keepPreviousData: true,
  });
};
