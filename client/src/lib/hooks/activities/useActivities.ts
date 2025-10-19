import { useInfiniteQuery } from '@tanstack/react-query';
import { getActivities } from '../../api/activity';
import { useUser } from '../account/useUser';
import { useLocation } from 'react-router';

export const useActivities = () => {
  const { currentUser } = useUser();
  const { pathname } = useLocation();
  const {
    data: activitiesGroup,
    error: activitiesError,
    isLoading: activitiesLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PagedList<Activity, string>>({
    queryKey: ['activities'],
    queryFn: async ({ pageParam = null }) => await getActivities(pageParam),
    enabled: !!currentUser && pathname == '/activities',
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: page.items.map((activity) => {
          const host = activity.attendees?.find(
            (x) => x.id == activity.hostUserId
          );
          return {
            ...activity,
            IsGoing: activity.attendees?.some((x) => x.id == currentUser?.id),
            IsHost: activity.hostUserId == currentUser?.id,
            hostImageUrl: host?.imageUrl || '/assets/user.png',
          };
        }),
      })),
    }),
  });
  return {
    activitiesGroup,
    activitiesError,
    activitiesLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};
