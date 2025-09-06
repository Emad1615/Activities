import { useForm } from 'react-hook-form';
import { profileFormSchema, type ProfileFormSchema } from './profileFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button } from '@mui/material';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import InputText from '../../../App/shared/components/inputs/InputText';
import SelectInput from '../../../App/shared/components/inputs/SelectInput';
import { genderTypes } from '../mock/genderTypes';
import DateTimeInput from '../../../App/shared/components/inputs/DateTimeInput';
import { useProfile } from '../../../lib/hooks/profile/useProfile';
import { useParams } from 'react-router';
type Props = {
  userInfo: User;
  handleEditMode: Dispatch<SetStateAction<boolean>>;
};
export default function ProfileForm({ userInfo, handleEditMode }: Props) {
  const { id } = useParams();
  const { UpdateProfile, loadingUpdateProfile } = useProfile(id);
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(profileFormSchema),
  });
  useEffect(() => {
    if (userInfo !== null)
      reset({ ...userInfo, gender: userInfo.gender ? 'male' : 'female' });
  }, [userInfo, reset]);
  const onSubmit = (data: ProfileFormSchema) => {
    const userData = {
      ...data,
      id: userInfo.id,
      gender: data.gender === 'male' ? true : false,
    } as User;
    UpdateProfile(userData, {
      onSuccess: () => {
        handleEditMode((prev) => !prev);
      },
    });
  };
  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      display={'flex'}
      flexDirection={'column'}
      gap={2}
    >
      <InputText label="Name" name="displayName" control={control} />
      <DateTimeInput
        label="Birth date"
        name="birthDate"
        control={control}
        format="yyyy-MM-dd"
      />
      <SelectInput
        label={'Gender'}
        control={control}
        name="gender"
        items={genderTypes}
      />
      <InputText label="Phone number" name="phoneNumber" control={control} />
      <InputText
        label="Bio"
        variant="outlined"
        name="bio"
        control={control}
        multiline={true}
        rows={3}
      />
      <Box
        display={'flex'}
        justifyContent={'end'}
        alignItems={'center'}
        gap={1}
      >
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleEditMode((prev) => !prev)}
        >
          cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          disabled={isSubmitting || !isValid || loadingUpdateProfile}
        >
          update
        </Button>
      </Box>
    </Box>
  );
}
