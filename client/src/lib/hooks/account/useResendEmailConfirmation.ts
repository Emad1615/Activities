import { useMutation } from '@tanstack/react-query';
import { resendEmailConfirmationLink } from '../../api/account';

export const useResendEmailConfirmation = () => {
  const {
    mutate: resendEmailConfirmation,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async ({
      email,
      userId,
    }: {
      email?: string;
      userId?: string | null;
    }) => resendEmailConfirmationLink({ email, userId }),
  });
  return { resendEmailConfirmation, isPending, error, isError };
};
