import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActivity } from "../../api/activity";

export const useActivity = (id: string) => {
      const queryClient = useQueryClient();
  const {
    data: activity,
    isLoading: activityLoading,
    error: activityError,
  } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => await getActivity(id),
    enabled: !!id || !!queryClient.getQueryData(['user']) ,
  });
  return { activity, activityLoading, activityError };
};
