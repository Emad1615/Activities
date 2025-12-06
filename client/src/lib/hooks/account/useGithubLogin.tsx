import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginWithGitHub } from '../../api/account';
import type { AxiosError } from 'axios';

export const useGithubLogin = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: LoginWithGithub,
    isPending,
    isError,
    error,
  } = useMutation<unknown, AxiosError, string>({
    mutationFn: async (code: string) => await loginWithGitHub(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isAuthenticated', 'user'] });
    },
  });
  return { LoginWithGithub, isPending, isError, error };
};
