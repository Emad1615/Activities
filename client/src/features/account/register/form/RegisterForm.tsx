import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { registerSchema, type RegisterSchema } from './registerSchema';
import InputText from '../../../../App/shared/components/inputs/InputText';
import { useRegister } from '../../../../lib/hooks/account/useRegister';

export default function RegisterForm() {
  const {registration,isPending}=useRegister();
  const {control,handleSubmit,setError,formState:{isValid,isSubmitting}}=useForm({
    mode:'onTouched',
    resolver:zodResolver(registerSchema),
    defaultValues:{
      displayName:'',
      email:'',
      password:'',
      confirmPassword:'',
    }
  })
  const onSubmit=async(data:RegisterSchema)=>{
    await registration(data,{
      onError:(errors)=>{
        console.log(errors)
        if(Array.isArray(errors)){
          errors.forEach(error=>{
            if(error.includes('DisplayName')) setError("displayName",{message:error})
            if(error.includes('Username') || error.includes('Email')) setError("email",{message:error})
            if(error.includes('password')) setError("email",{message:error})
          })
        }
      }
    })
  }
  return (
    <Box
      component={'form'}
      display={'flex'}
      flexDirection={'column'}
      gap={1}
      width={'100%'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputText label="Name" name='displayName' control={control} />
      <InputText label="Email" name='email' control={control} />
      <InputText type='password' label="Password" name='password' control={control} />
      <InputText type='password' label="Confirm Password" name='confirmPassword' control={control} />
      <Box display={'flex'} justifyContent={'space-between'} >
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
  );
}
