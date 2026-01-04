'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth';
import type { LoginPayload } from '@/services/auth/type';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

interface LoginErrorResponse {
  message?: string;
}

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      AuthService.login(payload),

    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Login berhasil');

      router.push('/member/dashboard');
    },

    onError: (error: AxiosError<LoginErrorResponse>) => {
      const message =
        error.response?.data?.message || 'Login gagal';

      toast.error(message);
    },
  });
};
