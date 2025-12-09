import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginWithFacebook } from '../../api/account';
import type { AxiosError } from 'axios';

export const useFacebookLogin = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: LoginWithFacebook,
    isPending,
    isError,
    error,
  } = useMutation<
    unknown,
    AxiosError,
    {
      code: string;
      phoneNumber: string;
    }
  >({
    mutationFn: async ({
      code,
      phoneNumber,
    }: {
      code: string;
      phoneNumber: string | null;
    }) => loginWithFacebook(code, phoneNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isAuthenticated', 'user'] });
    },
  });
  return { LoginWithFacebook, isPending, isError, error };
};
