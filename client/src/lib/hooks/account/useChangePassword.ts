import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../../api/account';
import type { ChangePasswordSchema } from '../../../features/account/changePassword/changePasswordSchema';

export const useChangePassword = () => {
  const {
    mutate: ChangePassword,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: ChangePasswordSchema) =>
      await changePassword(data),
  });
  return { ChangePassword, isPending, isError, error, isSuccess };
};
