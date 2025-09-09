import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../api/account';
import { useIsAuthenticated } from './useIsAuthenticated';

export const useUser = () => {
  // const queryClient = useQueryClient();
  const { isAuthenticated } = useIsAuthenticated();
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getCurrentUser(),
    enabled: !!isAuthenticated,
  });
  return { currentUser, isLoading, error };
};
