import { useQuery } from '@tanstack/react-query';
import { getActivities } from '../../api/activity';
import { useUser } from '../account/useUser';
import { useLocation } from 'react-router';

export const useActivities = () => {
  const { currentUser } = useUser();
  const { pathname } = useLocation();
  const {
    data: activities,
    error: activitiesError,
    isLoading: activitiesLoading,
  } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => await getActivities(),
    enabled: !!currentUser && pathname == '/activities',
    select: (data) => {
      return data.value.map((activity) => {
        const host = activity.attendees?.find(
          (x) => x.id == activity.hostUserId
        );
        return {
          ...activity,
          IsGoing: activity.attendees?.some((x) => x.id == currentUser?.id),
          IsHost: activity.hostUserId == currentUser?.id,
          hostImageUrl: host?.imageUrl || '/assets/user.png',
        };
      });
    },
  });
  return { activities, activitiesError, activitiesLoading };
};
