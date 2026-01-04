'use client';

import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/user';
import type { UserProfile } from '@/services/user/type';
import { toast } from 'sonner';
import { useEffect } from 'react';
import type { AxiosError } from 'axios';

interface ProfileErrorResponse {
  message?: string;
}

export const useProfile = () => {
  const query = useQuery<UserProfile, AxiosError<ProfileErrorResponse>>({
    queryKey: ['user', 'profile'],
    queryFn: UserService.getProfile,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('token'),
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      localStorage.setItem('user', JSON.stringify(query.data));
    }
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (query.isError) {
      toast.error(
        query.error?.response?.data?.message ??
          'Gagal mengambil profile'
      );
    }
  }, [query.isError, query.error]);

  return query;
};
