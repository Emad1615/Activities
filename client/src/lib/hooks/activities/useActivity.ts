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
    select: (data) => {
      console.log('Use Activity Hook data is:' + data.hostUserId);
      console.log('current User Hook data is:' + currentUser?.id);
      return {
        ...data,
        IsGoing: data.attendees?.some((x) => x.id == currentUser?.id),
        IsHost: data.hostUserId == currentUser?.id,
      };
    },
  });
  return { activity, activityLoading, activityError };
};
