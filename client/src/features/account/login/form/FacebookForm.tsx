import { Phone } from '@mui/icons-material';
import AccountFormWrapper from '../../../../App/shared/components/AccountFormWrapper';
import type { FieldValues } from 'react-hook-form';
import InputText from '../../../../App/shared/components/inputs/InputText';

export default function FacebookForm() {
  const handleSubmit = async (data: FieldValues) => {
    console.log(data.phoneNumber);
  };
  return (
    <AccountFormWrapper
      title="Enter your phone number"
      icon={<Phone color="info" />}
      reset={true}
      SubmitButtonText="Login"
      onSubmit={handleSubmit}
    >
      <InputText
        name="phoneNumber"
        label="Phone number"
        rules={{ required: true }}
        type="text"
      />
    </AccountFormWrapper>
  );
}
