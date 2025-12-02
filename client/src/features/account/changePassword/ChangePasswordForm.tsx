import { Password } from '@mui/icons-material';
import AccountFormWrapper from '../../../App/shared/components/AccountFormWrapper';
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from './changePasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputText from '../../../App/shared/components/inputs/InputText';
import { useChangePassword } from '../../../lib/hooks/account/useChangePassword';
import { toast } from 'react-toastify';

export default function ChangePasswordForm() {
  const { ChangePassword } = useChangePassword();
  const handleOnSubmit = async (data: ChangePasswordSchema) => {
    await ChangePassword(data, {
      onSuccess: () => {
        toast.success('Password changed successfully');
      },
      onError: (errors) => {
        if (Array.isArray(errors)) {
          toast.error(errors[0] || 'Failed to change password');
        }
      },
    });
  };
  return (
    <AccountFormWrapper<ChangePasswordSchema>
      title="Change Password"
      icon={<Password fontSize="large" />}
      reset={true}
      onSubmit={handleOnSubmit}
      resolver={zodResolver(changePasswordSchema)}
      SubmitButtonText="Change password"
    >
      <InputText
        label="Current password"
        type="password"
        name="currentPassword"
        sx={{ py: 1 }}
      />
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
