import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginSchema } from '../../../features/account/login/form/loginSchema';
import { login } from '../../api/account';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    mutate: Login,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (cred: LoginSchema) => await login(cred),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['account'],
      });
      navigate(state.from || '/activities');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { Login, isPending, error };
};
