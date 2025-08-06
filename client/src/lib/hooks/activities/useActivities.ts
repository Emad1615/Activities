import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActivities } from "../../api/activity";

export const useActivities = () => {
    const queryClient = useQueryClient();

  const {
    data: activities,
    error: activitiesError,
    isLoading: activitiesLoading,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => await getActivities(),
    enabled:!!queryClient.getQueryData(['user'])
  });
  return { activities, activitiesError, activitiesLoading };
};
