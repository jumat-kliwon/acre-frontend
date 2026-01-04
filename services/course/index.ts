// services/course/index.ts
import axios from '@/lib/axios';
import type { CourseListResponse } from './type';

interface GetCoursesParams {
  page?: number;
  limit?: number;
  search?: string | null;
  category_id?: number | null;
}

export const CourseService = {
  getCourses: async (params: GetCoursesParams) => {
    const { data } = await axios.get<CourseListResponse>(
      '/courses',
      { params }
    );
    return data;
  },
};
