import { useMutation } from '@tanstack/react-query';
import { confirmEmail as confirmEmailApi } from '../../api/account';
import type { AxiosError } from 'axios';

export const useConfirmEmail = () => {
  const {
    mutate: confirmEmail,
    error,
    isPending,
    isSuccess,
    isError,
    isIdle,
  } = useMutation<unknown, AxiosError, { userId: string; token: string }>({
    mutationFn: async ({ userId, token }) => confirmEmailApi({ userId, token }),
  });
  return { confirmEmail, isPending, error, isError, isSuccess, isIdle };
};
