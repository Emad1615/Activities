import { useQuery } from '@tanstack/react-query';
import { isAuthenticated as isAuthenticatedFn } from '../../api/account';

export const useIsAuthenticated = () => {
  const { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: async () => await isAuthenticatedFn(),
  });
  return { isAuthenticated, isLoading };
};
