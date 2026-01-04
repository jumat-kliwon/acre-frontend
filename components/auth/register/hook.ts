'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth';
import type { RegisterPayload } from '@/services/auth/type';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

interface RegisterErrorResponse {
  message?: string;
}

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      AuthService.register(payload),

    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success(data.message || 'Registrasi berhasil');

      if (data.order?.payment_url) {
        window.open(data.order.payment_url, '_blank', 'noopener,noreferrer');
      }

      router.push('/member/dashboard');
    },

    onError: (error: AxiosError<RegisterErrorResponse>) => {
      const message =
        error.response?.data?.message ||
        'Registrasi gagal, silakan coba lagi';

      toast.error(message);
    },
  });
};
