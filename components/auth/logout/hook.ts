'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

interface LogoutErrorResponse {
  message?: string;
}

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => AuthService.logout(),

    onSuccess: () => {
      // clear auth
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      toast.success('Logout berhasil');

      router.replace('/auth/login');
    },

    onError: (error: AxiosError<LogoutErrorResponse>) => {
      const message =
        error.response?.data?.message || 'Gagal logout';

      // fallback: tetap clear local auth
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      toast.error(message);
      router.replace('/auth/login');
    },
  });
};
