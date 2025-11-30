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
  } = useMutation<unknown, AxiosError, { userId: string; code: string }>({
    mutationFn: async ({ userId, code }) => confirmEmailApi({ userId, code }),
  });
  return { confirmEmail, isPending, error, isError, isSuccess, isIdle };
};
