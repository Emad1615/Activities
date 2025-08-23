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
        return {
          ...activity,
          IsGoing: activity.attendees?.some((x) => x.ID == currentUser?.ID),
          IsHost: activity.hostUserId == currentUser?.ID,
        };
      });
    },
  });
  return { activities, activitiesError, activitiesLoading };
};
