import { Password } from '@mui/icons-material';
import AccountFormWrapper from '../../../App/shared/components/AccountFormWrapper';
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from './changePasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputText from '../../../App/shared/components/inputs/InputText';

export default function ChangePasswordForm() {
  const handleOnSubmit = (data: ChangePasswordSchema) => {
    // Handle password change logic here
    console.log(data);
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
