import { useQuery } from '@tanstack/react-query';
import { getActivity } from '../../api/activity';
import { useUser } from '../account/useUser';

export const useActivity = (id: string) => {
  const { currentUser } = useUser();

  const {
    data: activity,
    isLoading: activityLoading,
    error: activityError,
  } = useQuery({
    queryKey: ['activities', id],
    queryFn: async () => await getActivity(id),
    enabled: !!id && !!currentUser,
  });
  return { activity, activityLoading, activityError };
};
