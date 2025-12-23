import { Suspense } from 'react';
import CourseList from '@/components/partials/course-list';

export default function Course() {
  return (
    <Suspense>
      <CourseList />
    </Suspense>
  );
}
