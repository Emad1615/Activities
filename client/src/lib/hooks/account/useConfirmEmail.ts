import { useMutation } from '@tanstack/react-query';
import { confirmEmail as confirmEmailApi } from '../../api/account';

export const useConfirmEmail = () => {
  const {
    mutate: confirmEmail,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async ({ userId, token }: { userId: string; token: string }) =>
      confirmEmailApi({ userId, token }),
  });
  return { confirmEmail, isPending, error, isError };
};
