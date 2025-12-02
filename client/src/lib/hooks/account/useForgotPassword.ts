import { useMutation } from '@tanstack/react-query';
import { forgotPassword, resetPassword } from '../../api/account';

export const useForgotPassword = () => {
  const ForgotPassword = useMutation({
    mutationFn: async ({ email }: { email: string }) =>
      await forgotPassword({ email }),
  });
  const ResetPassword = useMutation({
    mutationFn: async (data: ResetPassword) => await resetPassword(data),
  });
  return { ForgotPassword, ResetPassword };
};
