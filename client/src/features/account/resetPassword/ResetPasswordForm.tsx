import { useNavigate, useSearchParams } from 'react-router';
import { useForgotPassword } from '../../../lib/hooks/account/useForgotPassword';
import { toast } from 'react-toastify';
import AccountFormWrapper from '../../../App/shared/components/AccountFormWrapper';
import { LockOpen } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import InputText from '../../../App/shared/components/inputs/InputText';
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from './resetPasswordSchema';
import { Typography } from '@mui/material';

export default function ResetPasswordForm() {
  const { ResetPassword } = useForgotPassword();
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const email = searchParam.get('email');
  const resetCode = searchParam.get('resetCode');
  const handleOnSubmit = async (data: ResetPasswordSchema) => {
    try {
      if (email && resetCode) {
        await ResetPassword.mutate(
          {
            email,
            resetCode,
            newPassword: data.newPassword,
          },
          {
            onSuccess: () => {
              toast.success('Password has been reset successfully');
              navigate('/login', { replace: true });
            },
            onError: (errors) => {
              console.log(errors);
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!email || !resetCode) {
    return (
      <Typography
        variant="h4"
        textAlign={'center'}
        color="textSecondary"
        fontWeight={'bold'}
        mt={4}
      >
        Invalid password reset link.
      </Typography>
    );
  }
  return (
    <AccountFormWrapper<ResetPasswordSchema>
      title="Reset Password"
      icon={<LockOpen fontSize="large" />}
      SubmitButtonText="Reset Password"
      onSubmit={handleOnSubmit}
      reset={true}
      resolver={zodResolver(resetPasswordSchema)}
    >
      <InputText
        label="New password"
        type="password"
        name="newPassword"
        sx={{ py: 1 }}
      />
      <InputText
        label="Confirm password"
        type="password"
        name="confirmPassword"
        sx={{ py: 1 }}
      />
    </AccountFormWrapper>
  );
}
