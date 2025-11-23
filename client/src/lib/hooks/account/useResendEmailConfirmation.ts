import { useMutation } from '@tanstack/react-query';
import { resendEmailConfirmationLink } from '../../api/account';
import { AxiosError, type AxiosResponse } from 'axios';

export const useResendEmailConfirmation = () => {
  const {
    mutate: resendEmailConfirmation,
    isPending,
    error,
    isError,
  } = useMutation<
    AxiosResponse<unknown>,
    AxiosError,
    { email?: string; userId?: string | null }
  >({
    mutationFn: async ({ email, userId }) =>
      resendEmailConfirmationLink({ email, userId }),
  });
  return { resendEmailConfirmation, isPending, error, isError };
};
