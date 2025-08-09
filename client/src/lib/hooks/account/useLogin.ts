import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginSchema } from '../../../features/account/login/form/loginSchema';
import { login } from '../../api/account';
export const useLogin = () => {
  const queryClient = useQueryClient();
  const {
    mutate: Login,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (cred: LoginSchema) => await login(cred),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['isAuthenticated'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });
  return { Login, isPending, error };
};
