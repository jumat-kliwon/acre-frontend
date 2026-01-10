// hooks/useCoursesDetail.ts
'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderService } from '@/services/order';
import { useSlug } from '@/hooks/use-slug';

export function useOrders(){
  const slug = useSlug();
  
  const { data: orders, isLoading: loadingOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => OrderService.getOrder(),
  });

//   const { data: moduleList, isLoading: loadingModuleList } = useQuery({
//     queryKey: ['moduleList', slug],
//     queryFn: () => CourseService.getCourseModule(slug ?? ''),
//     enabled: !!slug,
//   });

//   const { data: lessonDetail, isLoading: loadingLessonDetail } = useQuery({
//     queryKey: ['lessonDetail', idLessons],
//     queryFn: () => CourseService.getCourseLessons(slug ?? '', idLessons),
//     enabled: !!idLessons,
//   });

//   useEffect(() => {
//     if(idLessons){
//       markLessonViewed(idLessons);
//     }
//   },[idLessons])
  
//   const {
//     mutate: markLessonViewed,
//     isPending: loadingMarkViewed,
//   } = useMutation({
//     mutationFn: (idx: number) =>
//       CourseService.markLessonViewed(slug!, idx),

//     onSuccess: () => {
//       // refresh lesson & module progress
//       queryClient.invalidateQueries({
//         queryKey: ['moduleList', slug],
//       });

//       queryClient.invalidateQueries({
//         queryKey: ['lessonDetail', slug, idLessons],
//       });
//     },
//   });

//   const {
//     mutate: markLessonDone,
//     isPending: loadingMarkDone,
//   } = useMutation({
//     mutationFn: (idx: number) =>
//       CourseService.markLessonDone(slug!, idx),

//     onSuccess: () => {
//       // refresh lesson & module progress
//       queryClient.invalidateQueries({
//         queryKey: ['moduleList', slug],
//       });

//       queryClient.invalidateQueries({
//         queryKey: ['lessonDetail', slug, idLessons],
//       });

//       setOpenConfirm(true);
//     },
//   });


  return {
    orders,
    loadingOrders
  }
};
