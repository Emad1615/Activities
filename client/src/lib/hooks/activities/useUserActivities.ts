import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetUserActivities } from '../../api/activity';

export const useUserActivities = () => {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<User>(['user'])?.id;

  const { data: userActivities, isLoading: loadingUserActivities } = useQuery({
    queryKey: ['userActivities'],
    queryFn: GetUserActivities,
    select: (data) => {
      return data.map((activity) => {
        return {
          ...activity,
          isHost: activity.hostUserId == currentUser,
        };
      });
    },
  });
  return { userActivities, loadingUserActivities };
};
