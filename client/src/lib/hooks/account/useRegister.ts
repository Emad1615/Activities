import { useMutation } from '@tanstack/react-query';
import { createUser } from '../../api/account';
import type { RegisterSchema } from '../../../features/account/register/form/registerSchema';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router';

export const useRegister = () => {
  //   const navigate = useNavigate();
  const {
    mutate: registration,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (user: RegisterSchema) => await createUser(user),
    // onSuccess: () => {
    //   toast.success('Success! Your account is ready.');
    //   navigate('/login');
    // },
  });
  return { registration, isPending, isSuccess };
};
