import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginWithGoogle } from '../../api/account';
import type { AxiosError } from 'axios';

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: LoginWithGoogle,
    isPending,
    isError,
    error,
  } = useMutation<unknown, AxiosError, string>({
    mutationFn: async (code: string) => await loginWithGoogle(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isAuthenticated', 'user'] });
    },
  });
  return { LoginWithGoogle, isPending, isError, error };
};
