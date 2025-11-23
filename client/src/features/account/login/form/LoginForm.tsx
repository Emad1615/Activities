import { Alert, Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginSchema } from './loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputText from '../../../../App/shared/components/inputs/InputText';
import { Link, useLocation, useNavigate } from 'react-router';
import { useLogin } from '../../../../lib/hooks/account/useLogin';
import { useState } from 'react';
import { useResendEmailConfirmation } from '../../../../lib/hooks/account/useResendEmailConfirmation';

export default function LoginForm() {
  const { Login, isPending } = useLogin();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [notVerified, setNotVerified] = useState(false);
  const {
    resendEmailConfirmation,
    isPending: isPendingConfirmation,
    isError,
    error,
  } = useResendEmailConfirmation();
  const {
    control,
    setError,
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid },
  } = useForm<LoginSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data: LoginSchema) => {
    await Login(data, {
      onSuccess: () => {
        navigate(state?.from || '/activities');
      },
      onError: (errors) => {
        if (errors.message === 'NotAllowed') setNotVerified(true);
        if (Array.isArray(errors)) {
          errors.forEach((error) => {
            if (error.include('email')) setError('email', { message: error });
            else if (error.include('password'))
              setError('password', { message: error });
          });
        }
      },
    });
  };
  const email = watch('email');

  return (
    <Box
      component={'form'}
      display={'flex'}
      flexDirection={'column'}
      gap={1}
      width={'100%'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputText label="Email" name="email" control={control} />
      <InputText
        type="password"
        label="Password"
        name="password"
        control={control}
      />
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography fontSize={'13px'} color="text.secondary">
          Don't have an account?{' '}
          <Typography
            component={Link}
            to="/register"
            color="text.default"
            fontSize={'inherit'}
          >
            Register
          </Typography>
        </Typography>
        <Button
          variant="contained"
          type="submit"
          disabled={!isValid || isSubmitting || isPending}
        >
          Login
        </Button>
      </Box>
      {notVerified && (
        <Box
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
          gap={1}
        >
          <Typography color="error" fontSize={'12px'}>
            Your email is not verified. Please check your inbox.
          </Typography>
          <Button
            variant="text"
            type="submit"
            size="small"
            disabled={isPendingConfirmation}
            onClick={() => resendEmailConfirmation({ email })}
          >
            Resend Verification Email
          </Button>
          {isError && (
            <Alert severity="error">
              {typeof error?.response?.data === 'string'
                ? error.response.data
                : 'An error occurred while resending the confirmation email.'}
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
}
