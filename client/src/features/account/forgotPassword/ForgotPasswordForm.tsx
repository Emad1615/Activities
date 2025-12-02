import { useNavigate } from 'react-router';
import { useForgotPassword } from '../../../lib/hooks/account/useForgotPassword';
import { toast } from 'react-toastify';
import type { FieldValues } from 'react-hook-form';
import AccountFormWrapper from '../../../App/shared/components/AccountFormWrapper';
import { Email } from '@mui/icons-material';
import InputText from '../../../App/shared/components/inputs/InputText';

export default function ForgotPasswordForm() {
  const { ForgotPassword } = useForgotPassword();
  const navigate = useNavigate();
  const handleOnSubmit = async (data: FieldValues) => {
    try {
      await ForgotPassword.mutate(
        { email: data.email },
        {
          onSuccess: () => {
            toast.success('Password reset link sent to your email');
            navigate('/login', { replace: true });
          },
          onError: (errors) => {
            console.log(errors);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AccountFormWrapper
      title="Forgot Your Password"
      icon={<Email fontSize="large" />}
      reset={true}
      SubmitButtonText="Send Reset Link"
      onSubmit={handleOnSubmit}
    >
      <InputText
        name="email"
        label="Email"
        type="text"
        rules={{ required: true }}
      />
    </AccountFormWrapper>
  );
}
