import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { registerSchema, type RegisterSchema } from './registerSchema';
import InputText from '../../../../App/shared/components/inputs/InputText';
import { useRegister } from '../../../../lib/hooks/account/useRegister';
import RegisterSuccessfullMessage from '../sections/RegisterSuccessfullMessage';

export default function RegisterForm() {
  const { registration, isPending, isSuccess } = useRegister();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting },
    watch,
  } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const email = watch('email');
  const onSubmit = async (data: RegisterSchema) => {
    await registration(data, {
      onError: (errors) => {
        console.log(errors);
        if (Array.isArray(errors)) {
          errors.forEach((error) => {
            if (error.includes('DisplayName'))
              setError('displayName', { message: error });
            if (error.includes('Username') || error.includes('Email'))
              setError('email', { message: error });
            if (error.includes('password'))
              setError('email', { message: error });
          });
        }
      },
    });
  };
  return (
    <>
      {!isSuccess ? (
        <RegisterSuccessfullMessage email={email} />
      ) : (
        <>
          <Typography
            variant="h5"
            color="text.secondary"
            fontWeight={'bold'}
            textTransform={'uppercase'}
          >
            Create your account 🧾
          </Typography>
          <Divider color="secondary" />
          <Box
            component={'form'}
            display={'flex'}
            flexDirection={'column'}
            gap={1}
            width={'100%'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputText label="Name" name="displayName" control={control} />
            <InputText label="Email" name="email" control={control} />
            <InputText
              type="password"
              label="Password"
              name="password"
              control={control}
            />
            <InputText
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              control={control}
            />
            <Box display={'flex'} justifyContent={'space-between'} my={2}>
              <Typography fontSize={'13px'} color="text.secondary">
                Already have account?{' '}
                <Typography
                  component={Link}
                  to={'/login'}
                  color="text.default"
                  fontSize={'inherit'}
                >
                  Login
                </Typography>
              </Typography>
              <Button
                variant="contained"
                type="submit"
                disabled={!isValid || isSubmitting || isPending}
              >
                Create account
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
