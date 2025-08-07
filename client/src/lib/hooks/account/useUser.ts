import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '../../api/account';
import { useLocation } from 'react-router';
import { isAllowAnonymousPage, isEnabled } from '../../utils/helper';

export const useUser = () => {
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getCurrentUser(),
    enabled:
      !queryClient.getQueryData(['user']) &&
      isAllowAnonymousPage(pathname) &&
      isEnabled(pathname, !!queryClient.getQueryData(['user'])),
  });
  return { currentUser, isLoading, error };
};
