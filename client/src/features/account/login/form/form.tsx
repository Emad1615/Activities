import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginSchema } from './loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputText from '../../../../App/shared/components/inputs/InputText';
import { Link } from 'react-router';
import { useLogin } from '../../../../lib/hooks/account/useLogin';

export default function Form() {
  const { Login, isPending } = useLogin();
  const {
    control,
    setError,
    handleSubmit,
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
      onError: (errors) => {
        if (Array.isArray(errors)) {
          errors.forEach((error) => {
            if (error.include('email'))
              setError('email', { message: error.message });
            else if (error.include('password'))
              setError('password', { message: error.message });
          });
        }
      },
    });
  };
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
    </Box>
  );
}
