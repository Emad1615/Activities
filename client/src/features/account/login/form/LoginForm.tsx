import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginSchema } from './loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputText from '../../../../App/shared/components/inputs/InputText';
import { Link, useLocation, useNavigate } from 'react-router';
import { useLogin } from '../../../../lib/hooks/account/useLogin';

export default function LoginForm() {
  const { Login, isPending } = useLogin();
  const {state}=useLocation();
  const navigate=useNavigate();
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
      onSuccess:()=>{
        navigate(state?.from || '/activities')
      },
      onError: (errors) => {
        if (Array.isArray(errors)) {
          errors.forEach((error) => {
            if (error.include('email'))
              setError('email', { message: error });
            else if (error.include('password'))
              setError('password', { message: error });
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
